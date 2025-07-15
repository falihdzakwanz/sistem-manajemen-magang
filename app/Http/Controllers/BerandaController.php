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

                // Delete old photo if exists
                $existingContent = BerandaContent::getByKey($request->key);
                if ($existingContent && $existingContent->photo_url) {
                    $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                    Storage::disk('public')->delete($oldPhotoPath);
                }
            } elseif ($request->delete_photo) {
                // Handle photo deletion
                if ($existingContent && $existingContent->photo_url) {
                    $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                    Storage::disk('public')->delete($oldPhotoPath);
                }
                $data['photo_url'] = null;
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

                    // Delete temp photo
                    Storage::disk('public')->delete($tempPhoto['path']);

                    // Remove temp photo from session
                    $request->session()->forget($tempPhotoKey);

                    // Delete old photo if exists
                    $existingContent = BerandaContent::getByKey($request->key);
                    if ($existingContent && $existingContent->photo_url) {
                        $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
                        Storage::disk('public')->delete($oldPhotoPath);
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
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048'
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

            // Cek apakah ada foto sementara di session
            if ($request->session()->has($tempPhotoKey)) {
                $tempPhoto = $request->session()->get($tempPhotoKey);

                // Hapus foto sementara dari storage
                if (Storage::disk('public')->exists($tempPhoto['path'])) {
                    Storage::disk('public')->delete($tempPhoto['path']);
                }

                // Hapus dari session
                $request->session()->forget($tempPhotoKey);

                return response()->json([
                    'success' => true,
                    'message' => 'Foto sementara berhasil direset!'
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
