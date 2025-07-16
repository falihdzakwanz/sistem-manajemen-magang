<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BerandaContent;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BerandaController extends Controller
{
    /**
     * Display admin edit beranda page
     */
    public function adminEdit(Request $request)
    {
        // Clean up old temporary photos (older than 1 hour)
        $this->cleanupOldTempPhotos();

        $strukturOrganisasi = BerandaContent::where('content_type', 'struktur_organisasi')->get();

        // Add temporary photo info to struktur organisasi
        $strukturOrganisasi = $strukturOrganisasi->map(function ($item) use ($request) {
            $tempPhotoKey = 'temp_photo_' . $item->key;
            if ($request->session()->has($tempPhotoKey)) {
                $tempPhoto = $request->session()->get($tempPhotoKey);
                $item->temp_photo_url = $tempPhoto['url'];
                $item->has_temp_photo = true;
            } else {
                $item->has_temp_photo = false;
            }
            return $item;
        });

        // Urutkan bidang data dengan Kesekretariatan di posisi pertama
        $bidangData = BerandaContent::where('content_type', 'bidang')
            ->get()
            ->sortBy(function ($bidang) {
                if ($bidang->key === 'kesekretariatan') {
                    return 0; // Kesekretariatan di urutan pertama
                }
                return 1; // Bidang lainnya di urutan berikutnya
            })
            ->values(); // Reset index array

        return Inertia::render('admin/EditBeranda', [
            'strukturOrganisasi' => $strukturOrganisasi,
            'bidangData' => $bidangData
        ]);
    }

    /**
     * Get beranda content for public display
     */
    public function getBerandaContent()
    {
        $strukturOrganisasi = BerandaContent::where('content_type', 'struktur_organisasi')->get();

        // Urutkan bidang data dengan Kesekretariatan di posisi pertama
        $bidangData = BerandaContent::where('content_type', 'bidang')
            ->get()
            ->sortBy(function ($bidang) {
                if ($bidang->key === 'kesekretariatan') {
                    return 0; // Kesekretariatan di urutan pertama
                }
                return 1; // Bidang lainnya di urutan berikutnya
            })
            ->values(); // Reset index array

        return response()->json([
            'strukturOrganisasi' => $strukturOrganisasi,
            'bidangData' => $bidangData
        ]);
    }

    /**
     * Update struktur organisasi
     */
    public function updateStrukturOrganisasi(Request $request)
    {
        try {
            $request->validate([
                'key' => 'required|string',
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:500',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'original_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'delete_photo' => 'nullable|boolean'
            ]);

            // Extend session lifetime dan keep session data
            $request->session()->save();

            // Get existing content untuk referensi
            $existingContent = BerandaContent::getByKey($request->key);

            $data = [
                'content_type' => 'struktur_organisasi',
                'key' => $request->key,
                'title' => $request->title,
                'description' => $request->description,
            ];

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $photoName = time() . '_' . $request->key . '.' . $photo->getClientOriginalExtension();
                $photoPath = $photo->storeAs('photos/struktur-organisasi', $photoName, 'public');
                $data['photo_url'] = '/storage/' . $photoPath;

                // Handle original photo
                if ($request->hasFile('original_photo')) {
                    $originalPhoto = $request->file('original_photo');
                    $originalPhotoName = time() . '_original_' . $request->key . '.' . $originalPhoto->getClientOriginalExtension();
                    $originalPhotoPath = $originalPhoto->storeAs('photos/struktur-organisasi', $originalPhotoName, 'public');
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

                // Delete old cropped photo if exists (but preserve original photo)
                if ($existingContent && $existingContent->photo_url) {
                    $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                    Storage::disk('public')->delete($oldPhotoPath);
                }

                // Only delete old original photo if we have a new one
                if (
                    $existingContent && $existingContent->original_photo_url &&
                    $request->hasFile('original_photo') &&
                    $existingContent->original_photo_url !== $data['original_photo_url']
                ) {
                    $oldOriginalPhotoPath = str_replace('/storage/', '', $existingContent->original_photo_url);
                    Storage::disk('public')->delete($oldOriginalPhotoPath);
                }
            } elseif ($request->delete_photo) {
                // Handle photo deletion
                if ($existingContent && $existingContent->photo_url) {
                    $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                    Storage::disk('public')->delete($oldPhotoPath);
                }

                // Also delete original photo if different
                if ($existingContent && $existingContent->original_photo_url && $existingContent->original_photo_url !== $existingContent->photo_url) {
                    $oldOriginalPhotoPath = str_replace('/storage/', '', $existingContent->original_photo_url);
                    Storage::disk('public')->delete($oldOriginalPhotoPath);
                }

                $data['photo_url'] = null;
                $data['original_photo_url'] = null;
            } else {
                // Check if there's temporary photo in session
                $tempPhotoKey = 'temp_photo_' . $request->key;
                if ($request->session()->has($tempPhotoKey)) {
                    $tempPhoto = $request->session()->get($tempPhotoKey);

                    // Move temp photo to permanent location
                    $newPhotoName = time() . '_' . $request->key . '.' . pathinfo($tempPhoto['path'], PATHINFO_EXTENSION);
                    $newPhotoPath = 'photos/struktur-organisasi/' . $newPhotoName;

                    // Copy temp photo to permanent location
                    Storage::disk('public')->copy($tempPhoto['path'], $newPhotoPath);
                    $data['photo_url'] = '/storage/' . $newPhotoPath;

                    // Check if we have original photo in session, otherwise preserve existing original_photo_url
                    $tempOriginalPhotoKey = 'temp_original_photo_' . $request->key;
                    if ($request->session()->has($tempOriginalPhotoKey)) {
                        $tempOriginalPhoto = $request->session()->get($tempOriginalPhotoKey);

                        // Move original temp photo to permanent location
                        $originalPhotoName = time() . '_original_' . $request->key . '.' . pathinfo($tempOriginalPhoto['path'], PATHINFO_EXTENSION);
                        $originalPhotoPath = 'photos/struktur-organisasi/' . $originalPhotoName;

                        Storage::disk('public')->copy($tempOriginalPhoto['path'], $originalPhotoPath);
                        $data['original_photo_url'] = '/storage/' . $originalPhotoPath;

                        // Delete temp original photo
                        Storage::disk('public')->delete($tempOriginalPhoto['path']);

                        // Remove temp original photo from session
                        $request->session()->forget($tempOriginalPhotoKey);
                    } else {
                        // IMPORTANT: Preserve existing original_photo_url if it exists
                        // This ensures that we always keep the original photo for future edits
                        if ($existingContent && $existingContent->original_photo_url) {
                            $data['original_photo_url'] = $existingContent->original_photo_url;
                        } else {
                            // If no existing original photo, use the current photo as original
                            $data['original_photo_url'] = '/storage/' . $newPhotoPath;
                        }
                    }

                    // Delete temp photo
                    Storage::disk('public')->delete($tempPhoto['path']);

                    // Remove temp photo from session
                    $request->session()->forget($tempPhotoKey);

                    // Delete old cropped photo if exists (but preserve original photo)
                    if ($existingContent && $existingContent->photo_url) {
                        $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                        Storage::disk('public')->delete($oldPhotoPath);
                    }

                    // Only delete old original photo if we have a new one and it's different
                    if (
                        $existingContent && $existingContent->original_photo_url &&
                        $request->session()->has('temp_original_photo_' . $request->key) &&
                        $existingContent->original_photo_url !== $data['original_photo_url']
                    ) {
                        $oldOriginalPhotoPath = str_replace('/storage/', '', $existingContent->original_photo_url);
                        Storage::disk('public')->delete($oldOriginalPhotoPath);
                    }
                }
            }

            BerandaContent::updateOrCreateByKey($request->key, $data);

            return redirect()->back()->with('success', 'Struktur organisasi berhasil diupdate!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Update bidang data
     */
    public function updateBidang(Request $request)
    {
        try {
            $request->validate([
                'key' => 'required|string',
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

            // Extend session lifetime dan keep session data
            $request->session()->save();

            // Get existing content untuk referensi
            $existingContent = BerandaContent::getByKey($request->key);

            $data = [
                'content_type' => 'bidang',
                'key' => $request->key,
                'title' => $request->title,
                'description' => $request->description,
                'data' => $request->data
            ];

            BerandaContent::updateOrCreateByKey($request->key, $data);

            return redirect()->back()->with('success', 'Data bidang berhasil diupdate!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Upload foto sementara (preview sebelum save)
     */
    public function uploadTempPhoto(Request $request)
    {
        try {
            $request->validate([
                'key' => 'required|string',
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'original_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
            ]);

            // Extend session lifetime dan keep session data
            $request->session()->save();

            $photo = $request->file('photo');
            $photoName = 'temp_' . time() . '_' . $request->key . '.' . $photo->getClientOriginalExtension();
            $photoPath = $photo->storeAs('photos/temp', $photoName, 'public');
            $photoUrl = '/storage/' . $photoPath;

            // Simpan info foto sementara di session
            $request->session()->put('temp_photo_' . $request->key, [
                'path' => $photoPath,
                'url' => $photoUrl,
                'uploaded_at' => now()
            ]);

            // Handle original photo if provided
            if ($request->hasFile('original_photo')) {
                $originalPhoto = $request->file('original_photo');
                $originalPhotoName = 'temp_original_' . time() . '_' . $request->key . '.' . $originalPhoto->getClientOriginalExtension();
                $originalPhotoPath = $originalPhoto->storeAs('photos/temp', $originalPhotoName, 'public');
                $originalPhotoUrl = '/storage/' . $originalPhotoPath;

                // Simpan info original foto sementara di session
                $request->session()->put('temp_original_photo_' . $request->key, [
                    'path' => $originalPhotoPath,
                    'url' => $originalPhotoUrl,
                    'uploaded_at' => now()
                ]);
            }

            return response()->json([
                'success' => true,
                'photo_url' => $photoUrl,
                'message' => 'Foto berhasil diupload. Klik Simpan untuk menyimpan perubahan.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal upload foto: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete foto (baik yang sudah disimpan maupun yang sementara)
     */
    public function deletePhoto(Request $request)
    {
        try {
            $request->validate([
                'key' => 'required|string'
            ]);

            $key = $request->key;
            $deleted = false;
            $message = '';

            // Extend session lifetime dan keep session data
            $request->session()->save();

            // Cek apakah ada foto sementara di session
            $tempPhotoKey = 'temp_photo_' . $key;
            if ($request->session()->has($tempPhotoKey)) {
                $tempPhoto = $request->session()->get($tempPhotoKey);

                // Hapus foto sementara dari storage
                if (Storage::disk('public')->exists($tempPhoto['path'])) {
                    Storage::disk('public')->delete($tempPhoto['path']);
                }

                // Hapus dari session
                $request->session()->forget($tempPhotoKey);
                $deleted = true;
                $message = 'Foto sementara berhasil dihapus!';
            }

            // Cek apakah ada original foto sementara di session
            $tempOriginalPhotoKey = 'temp_original_photo_' . $key;
            if ($request->session()->has($tempOriginalPhotoKey)) {
                $tempOriginalPhoto = $request->session()->get($tempOriginalPhotoKey);

                // Hapus original foto sementara dari storage
                if (Storage::disk('public')->exists($tempOriginalPhoto['path'])) {
                    Storage::disk('public')->delete($tempOriginalPhoto['path']);
                }

                // Hapus dari session
                $request->session()->forget($tempOriginalPhotoKey);
                $deleted = true;
                $message = $message ? $message . ' Original foto sementara juga berhasil dihapus!' : 'Original foto sementara berhasil dihapus!';
            }

            // Cek apakah ada foto yang sudah disimpan di database
            $content = BerandaContent::getByKey($key);
            if ($content && $content->photo_url) {
                // Delete photo file
                $photoPath = str_replace('/storage/', '', $content->photo_url);
                if (Storage::disk('public')->exists($photoPath)) {
                    Storage::disk('public')->delete($photoPath);
                }

                // Update database
                $content->update(['photo_url' => null]);
                $deleted = true;
                $message = $message ? $message . ' Foto yang tersimpan juga berhasil dihapus!' : 'Foto berhasil dihapus!';
            }

            // Cek apakah ada original foto yang sudah disimpan di database
            if ($content && $content->original_photo_url && $content->original_photo_url !== $content->photo_url) {
                // Delete original photo file
                $originalPhotoPath = str_replace('/storage/', '', $content->original_photo_url);
                if (Storage::disk('public')->exists($originalPhotoPath)) {
                    Storage::disk('public')->delete($originalPhotoPath);
                }

                // Update database
                $content->update(['original_photo_url' => null]);
                $deleted = true;
                $message = $message ? $message . ' Original foto yang tersimpan juga berhasil dihapus!' : 'Original foto berhasil dihapus!';
            }

            if ($deleted) {
                return redirect()->back()->with('success', $message);
            } else {
                return redirect()->back()->with('info', 'Tidak ada foto yang perlu dihapus.');
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Reset foto sementara
     */
    public function resetTempPhoto(Request $request)
    {
        try {
            $request->validate([
                'key' => 'required|string'
            ]);

            // Extend session lifetime dan keep session data
            $request->session()->save();

            $key = $request->key;
            $tempPhotoKey = 'temp_photo_' . $key;
            $tempOriginalPhotoKey = 'temp_original_photo_' . $key;

            // Cek apakah ada foto sementara di session
            if ($request->session()->has($tempPhotoKey)) {
                $tempPhoto = $request->session()->get($tempPhotoKey);

                // Hapus foto sementara dari storage
                if (Storage::disk('public')->exists($tempPhoto['path'])) {
                    Storage::disk('public')->delete($tempPhoto['path']);
                }

                // Hapus dari session
                $request->session()->forget($tempPhotoKey);
            }

            // Cek apakah ada original foto sementara di session
            if ($request->session()->has($tempOriginalPhotoKey)) {
                $tempOriginalPhoto = $request->session()->get($tempOriginalPhotoKey);

                // Hapus original foto sementara dari storage
                if (Storage::disk('public')->exists($tempOriginalPhoto['path'])) {
                    Storage::disk('public')->delete($tempOriginalPhoto['path']);
                }

                // Hapus dari session
                $request->session()->forget($tempOriginalPhotoKey);

                return response()->json([
                    'success' => true,
                    'message' => 'Foto sementara dan original foto berhasil direset!'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Tidak ada foto sementara yang perlu direset.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clean up old temporary photos
     */
    private function cleanupOldTempPhotos()
    {
        try {
            $tempPhotos = Storage::disk('public')->files('photos/temp');

            foreach ($tempPhotos as $photo) {
                $lastModified = Storage::disk('public')->lastModified($photo);

                // Delete photos older than 1 hour
                if (time() - $lastModified > 3600) {
                    Storage::disk('public')->delete($photo);
                }
            }
        } catch (\Exception $e) {
            // Log error but don't throw exception
            Log::error('Error cleaning up temp photos: ' . $e->getMessage());
        }
    }
}
