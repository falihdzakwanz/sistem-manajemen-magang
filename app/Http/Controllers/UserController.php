<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function create()
    {
        return Inertia::render('user/DaftarMagang');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'             => 'required|string|max:255',
            'nim'              => 'required|string|unique:pesertas,nim',
            'universitas'      => 'required|string|max:255',
            'jurusan'          => 'required|string|max:255',
            'email'            => 'required|email|unique:pesertas,email',
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
        $validated['status'] = 'Menunggu';

        User::create($validated);

        return redirect()->route('daftar-magang')->with('success', 'Pendaftaran magang berhasil disubmit!');
    }

    public function getStatusPendaftaran()
    {
        // Status yang diizinkan untuk ditampilkan
        $allowedStatuses = ['Menunggu', 'Diterima', 'Ditolak'];

        // Ambil data dari tabel pesertas dengan status yang diizinkan dan relasi bidang
        $users = User::with('bidang')->select([
            'id',
            'nama',
            'nim',
            'universitas',
            'jurusan',
            'email',
            'telepon',
            'tanggal_daftar',
            'tanggal_mulai',
            'tanggal_selesai',
            'status',
            'bidang_id',
            'linkedin',
            'motivasi'
        ])->whereIn('status', $allowedStatuses)
            ->orderBy('tanggal_daftar', 'desc')
            ->get();

        return Inertia::render('user/StatusPendaftaran', [
            'pendaftars' => $users,
        ]);
    }

    public function getDataMahasiswa()
    {
        // Ambil data mahasiswa yang statusnya 'Sedang Magang' (sedang aktif) atau 'Selesai Magang'
        $mahasiswa = User::with('bidang')
            ->whereIn('status', ['Sedang Magang', 'Selesai Magang'])
            ->orderBy('tanggal_mulai', 'desc')
            ->get();

        // Hitung statistik
        $totalMahasiswa = $mahasiswa->count();
        $sedangAktif = $mahasiswa->where('status', 'Sedang Magang')->count();
        $telahSelesai = $mahasiswa->where('status', 'Selesai Magang')->count();
        $totalUniversitas = $mahasiswa->pluck('universitas')->unique()->count();

        // Distribusi bidang
        $distribusiBidang = $mahasiswa->groupBy('bidang.nama_bidang')
            ->map(function ($items) {
                return $items->count();
            })
            ->sortDesc();

        // Distribusi universitas
        $distribusiUniversitas = $mahasiswa->groupBy('universitas')
            ->map(function ($items) {
                return $items->count();
            })
            ->sortDesc();

        return Inertia::render('user/DataMahasiswa', [
            'mahasiswa' => $mahasiswa,
            'statistik' => [
                'total_mahasiswa' => $totalMahasiswa,
                'sedang_aktif' => $sedangAktif,
                'telah_selesai' => $telahSelesai,
                'total_universitas' => $totalUniversitas,
            ],
            'distribusi_bidang' => $distribusiBidang,
            'distribusi_universitas' => $distribusiUniversitas,
        ]);
    }
}
