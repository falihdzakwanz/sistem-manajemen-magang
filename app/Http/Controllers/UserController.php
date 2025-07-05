<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('user/DaftarMagang', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'             => 'required|string|max:255',
            'nim'              => 'required|string|unique:mahasiswas,nim',
            'universitas'      => 'required|string|max:255',
            'jurusan'          => 'required|string|max:255',
            'email'            => 'required|email|unique:mahasiswas,email',
            'telepon'          => 'required|string|max:20',
            'tanggal_daftar'   => 'required|date',
            'tanggal_mulai'    => 'required|date',
            'tanggal_selesai'  => 'required|date|after_or_equal:tanggal_mulai',
            'bidang_id'        => 'required|string',
            'surat_pengantar'  => 'required|file|mimes:pdf,doc,docx|max:5120',
            'cv'               => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'linkedin'         => 'nullable|url|max:255',
            'motivasi'         => 'required|string|max:1000',
        ]);

        // Simpan file surat pengantar
        if ($request->hasFile('surat_pengantar')) {
            $file = $request->file('surat_pengantar');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
            $validated['surat_pengantar'] = $file->storeAs('surat-pengantar', $filename, 'public');
        }

        // Simpan file CV jika ada
        if ($request->hasFile('cv')) {
            $cv = $request->file('cv');
            $cvname = pathinfo($cv->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $cv->getClientOriginalExtension();
            $validated['cv'] = $cv->storeAs('cv', $cvname, 'public');
        }

        // Tambahkan status default
        $validated['status'] = 'Sedang Diproses';

        User::create($validated);

        return redirect()->route('daftar-magang')->with('success', 'Pendaftaran magang berhasil disubmit!');
    }

    public function destroy(User $user)
    {
        if ($user->surat_pengantar) {
            Storage::disk('public')->delete($user->surat_pengantar);
        }

        if ($user->cv) {
            Storage::disk('public')->delete($user->cv);
        }

        $user->delete();

        return redirect()->route('daftar-magang')->with('success', 'Data user berhasil dihapus');
    }

    public function getStatusPendaftaran()
    {
        // Status yang diizinkan untuk ditampilkan
        $allowedStatuses = ['Sedang Diproses', 'Diterima', 'Ditolak'];
        
        // Ambil data dari tabel mahasiswas dengan status yang diizinkan
        $users = User::select([
            'id',
            'nama',
            'nim',
            'universitas',
            'tanggal_daftar',
            'status'
        ])->whereIn('status', $allowedStatuses)
          ->orderBy('tanggal_daftar', 'desc')
          ->get();

        return Inertia::render('user/StatusPendaftaran', [
            'pendaftars' => $users,
        ]);
    }
}
