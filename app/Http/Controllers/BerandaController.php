<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BerandaContent;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BerandaController extends Controller
{
    /**
     * Display admin edit beranda page
     */
    public function adminEdit()
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
        $request->validate([
            'key' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

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
        }

        BerandaContent::updateOrCreateByKey($request->key, $data);

        return redirect()->back()->with('success', 'Struktur organisasi berhasil diupdate!');
    }

    /**
     * Update bidang data
     */
    public function updateBidang(Request $request)
    {
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

        $data = [
            'content_type' => 'bidang',
            'key' => $request->key,
            'title' => $request->title,
            'description' => $request->description,
            'data' => $request->data
        ];

        BerandaContent::updateOrCreateByKey($request->key, $data);

        return redirect()->back()->with('success', 'Data bidang berhasil diupdate!');
    }

    /**
     * Delete struktur organisasi photo
     */
    public function deletePhoto(Request $request)
    {
        $request->validate([
            'key' => 'required|string'
        ]);

        $content = BerandaContent::getByKey($request->key);
        
        if ($content && $content->photo_url) {
            // Delete photo file
            $photoPath = str_replace('/storage/', '', $content->photo_url);
            Storage::disk('public')->delete($photoPath);

            // Update database
            $content->update(['photo_url' => null]);

            return redirect()->back()->with('success', 'Foto berhasil dihapus!');
        }

        return redirect()->back()->withErrors(['error' => 'Foto tidak ditemukan!']);
    }
}
