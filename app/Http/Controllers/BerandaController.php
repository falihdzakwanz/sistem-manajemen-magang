<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BerandaContent;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Response;
use Illuminate\Validation\ValidationException;
use Exception;

class BerandaController extends Controller
{
    // Constants for content types
    public const CONTENT_TYPE_STRUKTUR_ORGANISASI = 'struktur_organisasi';
    public const CONTENT_TYPE_BIDANG = 'bidang';

    // Constants for photo management
    public const PHOTO_STORAGE_PATH = 'photos/struktur-organisasi';
    public const TEMP_PHOTO_STORAGE_PATH = 'photos/temp';
    public const PHOTO_MAX_SIZE = 2048; // KB
    public const TEMP_PHOTO_LIFETIME = 3600; // 1 hour in seconds

    // Constants for session keys
    public const SESSION_TEMP_PHOTO_PREFIX = 'temp_photo_';
    public const SESSION_TEMP_ORIGINAL_PHOTO_PREFIX = 'temp_original_photo_';

    // Constants for sorting
    public const KESEKRETARIATAN_KEY = 'kesekretariatan';
    /**
     * Display admin edit beranda page
     * 
     * @param Request $request
     * @return Response
     */
    public function adminEdit(Request $request): Response
    {
        // Clean up old temporary photos (older than 1 hour)
        $this->cleanupOldTempPhotos();

        $strukturOrganisasi = $this->getStrukturOrganisasiWithTempPhoto($request);
        $bidangData = $this->getBidangDataSorted();

        return Inertia::render('admin/EditBeranda', [
            'strukturOrganisasi' => $strukturOrganisasi,
            'bidangData' => $bidangData
        ]);
    }

    /**
     * Get struktur organisasi with temporary photo info
     * 
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    private function getStrukturOrganisasiWithTempPhoto(Request $request)
    {
        $strukturOrganisasi = BerandaContent::where('content_type', self::CONTENT_TYPE_STRUKTUR_ORGANISASI)->get();

        // Add temporary photo info to struktur organisasi
        return $strukturOrganisasi->map(function ($item) use ($request) {
            $tempPhotoKey = self::SESSION_TEMP_PHOTO_PREFIX . $item->key;
            if ($request->session()->has($tempPhotoKey)) {
                $tempPhoto = $request->session()->get($tempPhotoKey);
                $item->temp_photo_url = $tempPhoto['url'] ?? null;
                $item->has_temp_photo = true;
            } else {
                $item->has_temp_photo = false;
            }
            return $item;
        });
    }

    /**
     * Get bidang data sorted with Kesekretariatan first
     * 
     * @return \Illuminate\Support\Collection
     */
    private function getBidangDataSorted()
    {
        return BerandaContent::where('content_type', self::CONTENT_TYPE_BIDANG)
            ->get()
            ->sortBy(function ($bidang) {
                return $bidang->key === self::KESEKRETARIATAN_KEY ? 0 : 1;
            })
            ->values(); // Reset index array
    }

    /**
     * Get beranda content for public display
     * 
     * @return JsonResponse
     */
    public function getBerandaContent(): JsonResponse
    {
        $strukturOrganisasi = BerandaContent::where('content_type', self::CONTENT_TYPE_STRUKTUR_ORGANISASI)->get();
        $bidangData = $this->getBidangDataSorted();

        return response()->json([
            'strukturOrganisasi' => $strukturOrganisasi,
            'bidangData' => $bidangData
        ]);
    }

    /**
     * Update struktur organisasi
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateStrukturOrganisasi(Request $request): RedirectResponse
    {
        try {
            $this->validateStrukturOrganisasiRequest($request);

            // Regenerate session to prevent session expiration
            $request->session()->regenerate();

            // Get existing content untuk referensi
            $existingContent = BerandaContent::getByKey($request->key);

            $data = $this->prepareStrukturOrganisasiData($request, $existingContent);

            BerandaContent::updateOrCreateByKey($request->key, $data);

            return redirect()->back()->with('success', 'Struktur organisasi berhasil diupdate!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (Exception $e) {
            Log::error('Error updating struktur organisasi: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan sistem. Silakan coba lagi.'])->withInput();
        }
    }

    /**
     * Validate struktur organisasi request
     * 
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    private function validateStrukturOrganisasiRequest(Request $request): void
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:' . self::PHOTO_MAX_SIZE,
            'original_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:' . self::PHOTO_MAX_SIZE,
            'delete_photo' => 'nullable|boolean'
        ]);
    }

    /**
     * Prepare struktur organisasi data for saving
     * 
     * @param Request $request
     * @param BerandaContent|null $existingContent
     * @return array
     */
    private function prepareStrukturOrganisasiData(Request $request, ?BerandaContent $existingContent): array
    {
        $data = [
            'content_type' => self::CONTENT_TYPE_STRUKTUR_ORGANISASI,
            'key' => $request->key,
            'title' => $request->title,
            'description' => $request->description,
        ];

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data = array_merge($data, $this->handlePhotoUpload($request, $existingContent));
        } elseif ($request->delete_photo) {
            $this->handlePhotoDeletion($existingContent);
            $data['photo_url'] = null;
            $data['original_photo_url'] = null;
        } else {
            // No changes to photo, preserve existing data
            if ($existingContent) {
                $data['photo_url'] = $existingContent->photo_url;
                $data['original_photo_url'] = $existingContent->original_photo_url;
            }
        }

        return $data;
    }

    /**
     * Handle photo upload for struktur organisasi
     * 
     * @param Request $request
     * @param BerandaContent|null $existingContent
     * @return array
     */
    private function handlePhotoUpload(Request $request, ?BerandaContent $existingContent): array
    {
        $photo = $request->file('photo');
        $photoName = time() . '_' . $request->key . '.' . $photo->getClientOriginalExtension();
        $photoPath = $photo->storeAs(self::PHOTO_STORAGE_PATH, $photoName, 'public');

        $data = ['photo_url' => '/storage/' . $photoPath];

        // Handle original photo
        if ($request->hasFile('original_photo')) {
            $originalPhoto = $request->file('original_photo');
            $originalPhotoName = time() . '_original_' . $request->key . '.' . $originalPhoto->getClientOriginalExtension();
            $originalPhotoPath = $originalPhoto->storeAs(self::PHOTO_STORAGE_PATH, $originalPhotoName, 'public');
            $data['original_photo_url'] = '/storage/' . $originalPhotoPath;
        } else {
            // Check if there's existing original photo to preserve
            if ($existingContent && $existingContent->original_photo_url) {
                // Preserve existing original photo
                $data['original_photo_url'] = $existingContent->original_photo_url;
            } else {
                // If no existing original photo, use the main photo as original
                $data['original_photo_url'] = '/storage/' . $photoPath;
            }
        }

        // Clean up old photos
        $this->cleanupOldPhotos($request, $existingContent, $data);

        return $data;
    }

    /**
     * Clean up old photos when uploading new ones
     * 
     * @param Request $request
     * @param BerandaContent|null $existingContent
     * @param array $newData
     * @return void
     */
    private function cleanupOldPhotos(Request $request, ?BerandaContent $existingContent, array $newData): void
    {
        if (!$existingContent) {
            return;
        }

        // Delete old cropped photo if exists (but preserve original photo)
        if ($existingContent->photo_url) {
            $this->deletePhotoFile($existingContent->photo_url);
        }

        // Only delete old original photo if we have a new one
        if (
            $request->hasFile('original_photo') &&
            $existingContent->original_photo_url &&
            $existingContent->original_photo_url !== ($newData['original_photo_url'] ?? null)
        ) {
            $this->deletePhotoFile($existingContent->original_photo_url);
        }
    }

    /**
     * Handle photo deletion
     * 
     * @param BerandaContent|null $existingContent
     * @return void
     */
    private function handlePhotoDeletion(?BerandaContent $existingContent): void
    {
        if (!$existingContent) {
            return;
        }

        // Delete main photo
        if ($existingContent->photo_url) {
            $this->deletePhotoFile($existingContent->photo_url);
        }

        // Delete original photo if different from main photo
        if (
            $existingContent->original_photo_url &&
            $existingContent->original_photo_url !== $existingContent->photo_url
        ) {
            $this->deletePhotoFile($existingContent->original_photo_url);
        }
    }

    /**
     * Delete a photo file from storage
     * 
     * @param string $photoUrl
     * @return void
     */
    private function deletePhotoFile(string $photoUrl): void
    {
        $photoPath = str_replace('/storage/', '', $photoUrl);
        if (Storage::disk('public')->exists($photoPath)) {
            Storage::disk('public')->delete($photoPath);
        }
    }

    /**
     * Update bidang data
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateBidang(Request $request): RedirectResponse
    {
        try {
            $this->validateBidangRequest($request);

            // Regenerate session to prevent session expiration
            $request->session()->regenerate();

            $data = [
                'content_type' => self::CONTENT_TYPE_BIDANG,
                'key' => $request->key,
                'title' => $request->title,
                'description' => $request->description,
                'data' => $request->data
            ];

            BerandaContent::updateOrCreateByKey($request->key, $data);

            return redirect()->back()->with('success', 'Data bidang berhasil diupdate!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (Exception $e) {
            Log::error('Error updating bidang: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan sistem. Silakan coba lagi.'])->withInput();
        }
    }

    /**
     * Validate bidang request
     * 
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    private function validateBidangRequest(Request $request): void
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'data' => 'required|array',
            'data.kepala' => 'required|string|max:255',
            'data.icon' => 'required|string|max:10',
            'data.color' => 'required|string|max:50',
            'data.tugas' => 'required|array|min:1',
            'data.tugas.*' => 'required|string|max:500',
            'data.magangTasks' => 'required|array|min:1',
            'data.magangTasks.*' => 'required|string|max:500',
            'data.staffFungsional' => 'required|array|min:1',
            'data.staffFungsional.*' => 'required|string|max:500',
        ]);
    }

    /**
     * Upload foto sementara (preview sebelum save)
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadTempPhoto(Request $request): JsonResponse
    {
        try {
            $this->validateTempPhotoRequest($request);

            // Extend session lifetime dan keep session data
            $request->session()->save();

            $photoData = $this->processTempPhotoUpload($request);

            return response()->json([
                'success' => true,
                'photo_url' => $photoData['photo_url'],
                'message' => 'Foto berhasil diupload. Klik Simpan untuk menyimpan perubahan.'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal: ' . implode(', ', $e->errors())
            ], 422);
        } catch (Exception $e) {
            Log::error('Error uploading temp photo: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Gagal upload foto: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validate temp photo request
     * 
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    private function validateTempPhotoRequest(Request $request): void
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:' . self::PHOTO_MAX_SIZE,
            'original_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:' . self::PHOTO_MAX_SIZE
        ]);
    }

    /**
     * Process temporary photo upload
     * 
     * @param Request $request
     * @return array
     */
    private function processTempPhotoUpload(Request $request): array
    {
        $photo = $request->file('photo');
        $photoName = 'temp_' . time() . '_' . $request->key . '.' . $photo->getClientOriginalExtension();
        $photoPath = $photo->storeAs(self::TEMP_PHOTO_STORAGE_PATH, $photoName, 'public');
        $photoUrl = '/storage/' . $photoPath;

        // Simpan info foto sementara di session
        $request->session()->put(self::SESSION_TEMP_PHOTO_PREFIX . $request->key, [
            'path' => $photoPath,
            'url' => $photoUrl,
            'uploaded_at' => now()
        ]);

        // Handle original photo if provided
        if ($request->hasFile('original_photo')) {
            $this->processTempOriginalPhoto($request);
        }

        return ['photo_url' => $photoUrl];
    }

    /**
     * Process temporary original photo upload
     * 
     * @param Request $request
     * @return void
     */
    private function processTempOriginalPhoto(Request $request): void
    {
        $originalPhoto = $request->file('original_photo');
        $originalPhotoName = 'temp_original_' . time() . '_' . $request->key . '.' . $originalPhoto->getClientOriginalExtension();
        $originalPhotoPath = $originalPhoto->storeAs(self::TEMP_PHOTO_STORAGE_PATH, $originalPhotoName, 'public');
        $originalPhotoUrl = '/storage/' . $originalPhotoPath;

        // Simpan info original foto sementara di session
        $request->session()->put(self::SESSION_TEMP_ORIGINAL_PHOTO_PREFIX . $request->key, [
            'path' => $originalPhotoPath,
            'url' => $originalPhotoUrl,
            'uploaded_at' => now()
        ]);
    }

    /**
     * Delete foto (baik yang sudah disimpan maupun yang sementara)
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function deletePhoto(Request $request): RedirectResponse
    {
        try {
            $this->validateDeletePhotoRequest($request);

            $key = $request->key;
            $deleted = false;
            $message = '';

            // Extend session lifetime dan keep session data
            $request->session()->save();

            // Delete temporary photos
            $tempDeleted = $this->deleteTempPhotos($request, $key);
            if ($tempDeleted['deleted']) {
                $deleted = true;
                $message = $tempDeleted['message'];
            }

            // Delete saved photos
            $savedDeleted = $this->deleteSavedPhotos($key);
            if ($savedDeleted['deleted']) {
                $deleted = true;
                $message = $message ? $message . ' ' . $savedDeleted['message'] : $savedDeleted['message'];
            }

            if ($deleted) {
                return redirect()->back()->with('success', $message);
            } else {
                return redirect()->back()->with('info', 'Tidak ada foto yang perlu dihapus.');
            }
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (Exception $e) {
            Log::error('Error deleting photo: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Validate delete photo request
     * 
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    private function validateDeletePhotoRequest(Request $request): void
    {
        $request->validate([
            'key' => 'required|string|max:255'
        ]);
    }

    /**
     * Delete temporary photos from session and storage
     * 
     * @param Request $request
     * @param string $key
     * @return array
     */
    private function deleteTempPhotos(Request $request, string $key): array
    {
        $deleted = false;
        $message = '';

        // Delete temporary photo
        $tempPhotoKey = self::SESSION_TEMP_PHOTO_PREFIX . $key;
        if ($request->session()->has($tempPhotoKey)) {
            $tempPhoto = $request->session()->get($tempPhotoKey);

            if (isset($tempPhoto['path']) && Storage::disk('public')->exists($tempPhoto['path'])) {
                Storage::disk('public')->delete($tempPhoto['path']);
            }

            $request->session()->forget($tempPhotoKey);
            $deleted = true;
            $message = 'Foto sementara berhasil dihapus!';
        }

        // Delete temporary original photo
        $tempOriginalPhotoKey = self::SESSION_TEMP_ORIGINAL_PHOTO_PREFIX . $key;
        if ($request->session()->has($tempOriginalPhotoKey)) {
            $tempOriginalPhoto = $request->session()->get($tempOriginalPhotoKey);

            if (isset($tempOriginalPhoto['path']) && Storage::disk('public')->exists($tempOriginalPhoto['path'])) {
                Storage::disk('public')->delete($tempOriginalPhoto['path']);
            }

            $request->session()->forget($tempOriginalPhotoKey);
            $deleted = true;
            $message = $message ? $message . ' Original foto sementara juga berhasil dihapus!' : 'Original foto sementara berhasil dihapus!';
        }

        return ['deleted' => $deleted, 'message' => $message];
    }

    /**
     * Delete saved photos from database and storage
     * 
     * @param string $key
     * @return array
     */
    private function deleteSavedPhotos(string $key): array
    {
        $deleted = false;
        $message = '';

        $content = BerandaContent::getByKey($key);
        if (!$content) {
            return ['deleted' => false, 'message' => ''];
        }

        // Delete main photo
        if ($content->photo_url) {
            $this->deletePhotoFile($content->photo_url);
            $content->update(['photo_url' => null]);
            $deleted = true;
            $message = 'Foto yang tersimpan berhasil dihapus!';
        }

        // Delete original photo if different from main photo
        if ($content->original_photo_url && $content->original_photo_url !== $content->photo_url) {
            $this->deletePhotoFile($content->original_photo_url);
            $content->update(['original_photo_url' => null]);
            $deleted = true;
            $message = $message ? $message . ' Original foto yang tersimpan juga berhasil dihapus!' : 'Original foto berhasil dihapus!';
        }

        return ['deleted' => $deleted, 'message' => $message];
    }

    /**
     * Reset foto sementara
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function resetTempPhoto(Request $request): JsonResponse
    {
        try {
            $this->validateResetTempPhotoRequest($request);

            // Extend session lifetime dan keep session data
            $request->session()->save();

            $key = $request->key;
            $result = $this->resetTempPhotosByKey($request, $key);

            return response()->json([
                'success' => $result['success'],
                'message' => $result['message']
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal: ' . implode(', ', $e->errors())
            ], 422);
        } catch (Exception $e) {
            Log::error('Error resetting temp photo: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validate reset temp photo request
     * 
     * @param Request $request
     * @return void
     * @throws ValidationException
     */
    private function validateResetTempPhotoRequest(Request $request): void
    {
        $request->validate([
            'key' => 'required|string|max:255'
        ]);
    }

    /**
     * Reset temporary photos by key
     * 
     * @param Request $request
     * @param string $key
     * @return array
     */
    private function resetTempPhotosByKey(Request $request, string $key): array
    {
        $tempPhotoKey = self::SESSION_TEMP_PHOTO_PREFIX . $key;
        $tempOriginalPhotoKey = self::SESSION_TEMP_ORIGINAL_PHOTO_PREFIX . $key;

        // Reset main temp photo
        if ($request->session()->has($tempPhotoKey)) {
            $tempPhoto = $request->session()->get($tempPhotoKey);

            if (isset($tempPhoto['path']) && Storage::disk('public')->exists($tempPhoto['path'])) {
                Storage::disk('public')->delete($tempPhoto['path']);
            }

            $request->session()->forget($tempPhotoKey);
        }

        // Reset original temp photo
        if ($request->session()->has($tempOriginalPhotoKey)) {
            $tempOriginalPhoto = $request->session()->get($tempOriginalPhotoKey);

            if (isset($tempOriginalPhoto['path']) && Storage::disk('public')->exists($tempOriginalPhoto['path'])) {
                Storage::disk('public')->delete($tempOriginalPhoto['path']);
            }

            $request->session()->forget($tempOriginalPhotoKey);

            return [
                'success' => true,
                'message' => 'Foto sementara dan original foto berhasil direset!'
            ];
        }

        return [
            'success' => false,
            'message' => 'Tidak ada foto sementara yang perlu direset.'
        ];
    }

    /**
     * Clean up old temporary photos
     * 
     * @return void
     */
    private function cleanupOldTempPhotos(): void
    {
        try {
            $tempPhotos = Storage::disk('public')->files(self::TEMP_PHOTO_STORAGE_PATH);

            foreach ($tempPhotos as $photo) {
                $lastModified = Storage::disk('public')->lastModified($photo);

                // Delete photos older than the defined lifetime
                if (time() - $lastModified > self::TEMP_PHOTO_LIFETIME) {
                    Storage::disk('public')->delete($photo);
                }
            }
        } catch (Exception $e) {
            // Log error but don't throw exception to avoid disrupting the main flow
            Log::error('Error cleaning up temp photos: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Generate unique filename for photo
     * 
     * @param string $key
     * @param string $extension
     * @param string $prefix
     * @return string
     */
    private function generatePhotoFilename(string $key, string $extension, string $prefix = ''): string
    {
        $timestamp = time();
        $prefix = $prefix ? $prefix . '_' : '';
        return $prefix . $timestamp . '_' . $key . '.' . $extension;
    }

    /**
     * Get session key for temporary photo
     * 
     * @param string $key
     * @param bool $isOriginal
     * @return string
     */
    private function getSessionPhotoKey(string $key, bool $isOriginal = false): string
    {
        return ($isOriginal ? self::SESSION_TEMP_ORIGINAL_PHOTO_PREFIX : self::SESSION_TEMP_PHOTO_PREFIX) . $key;
    }
}
