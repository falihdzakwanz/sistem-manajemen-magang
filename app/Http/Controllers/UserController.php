<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class UserController extends Controller
{
    public function create()
    {
        // Ambil data bidang untuk dropdown di form, dengan deduplikasi eksplisit
        $bidangs = \App\Models\Bidang::select('id', 'nama_bidang', 'deskripsi')
            ->distinct()
            ->get()
            ->unique('id') // Pastikan ID unik
            ->sortBy(function ($bidang) {
                if ($bidang->nama_bidang === 'Kesekretariatan') {
                    return 0; // Kesekretariatan di urutan pertama
                }
                return 1; // Bidang lainnya di urutan berikutnya
            })
            ->values(); // Reset index array

        return Inertia::render('user/DaftarMagang', [
            'bidangs' => $bidangs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama'             => 'required|string|max:255',
            'nim'              => 'required|string',
            'universitas'      => 'required|string|max:255',
            'jurusan'          => 'required|string|max:255',
            'email'            => 'required|email',
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

    /**
     * Tampilkan form edit untuk user yang ditolak
     */
    public function edit($id, Request $request)
    {
        try {
            $user = User::with('bidang')->findOrFail($id);

            // Hanya user dengan status 'Ditolak' yang bisa diedit
            if ($user->status !== 'Ditolak') {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Hanya pendaftaran yang ditolak yang dapat diperbaiki');
            }

            // Validasi token edit
            $token = $request->query('token');
            if (!$token || $user->edit_token !== $token) {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Token akses tidak valid atau telah kedaluwarsa');
            }

            // Cek apakah token masih berlaku
            if (!$user->edit_token_expires_at || now()->isAfter($user->edit_token_expires_at)) {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Token akses telah kedaluwarsa. Silakan hubungi admin untuk mendapatkan token baru');
            }

            // Ambil data bidang untuk dropdown dengan deduplikasi eksplisit
            $bidangs = \App\Models\Bidang::select('id', 'nama_bidang', 'deskripsi')
                ->distinct()
                ->get()
                ->unique('id') // Pastikan ID unik
                ->sortBy(function ($bidang) {
                    return $bidang->nama_bidang === 'Kesekretariatan' ? 0 : 1;
                })
                ->values();

            return Inertia::render('user/DaftarMagang', [
                'bidangs' => $bidangs,
                'editData' => [
                    'id' => $user->id,
                    'nama' => $user->nama,
                    'nim' => $user->nim,
                    'universitas' => $user->universitas,
                    'jurusan' => $user->jurusan,
                    'email' => $user->email,
                    'telepon' => $user->telepon,
                    'tanggal_daftar' => $user->tanggal_daftar ? date('Y-m-d', strtotime($user->tanggal_daftar)) : '',
                    'tanggal_mulai' => $user->tanggal_mulai ? date('Y-m-d', strtotime($user->tanggal_mulai)) : '',
                    'tanggal_selesai' => $user->tanggal_selesai ? date('Y-m-d', strtotime($user->tanggal_selesai)) : '',
                    'bidang_id' => $user->bidang_id,
                    'linkedin' => $user->linkedin ?? '',
                    'motivasi' => $user->motivasi,
                    'surat_pengantar' => $user->surat_pengantar,
                    'cv' => $user->cv,
                    'reject_reason' => $user->reject_reason,
                ],
                'isEdit' => true
            ]);
        } catch (\Exception $e) {
            return redirect()->route('status-pendaftaran')
                ->with('error', 'Data pendaftaran tidak ditemukan');
        }
    }

    /**
     * Update data user yang sudah diperbaiki
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            // Hanya user dengan status 'Ditolak' yang bisa diupdate
            if ($user->status !== 'Ditolak') {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Hanya pendaftaran yang ditolak yang dapat diperbaiki');
            }

            // Validasi token edit
            $token = $request->input('token');
            if (!$token || $user->edit_token !== $token) {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Token akses tidak valid atau telah kedaluwarsa');
            }

            // Cek apakah token masih berlaku
            if (!$user->edit_token_expires_at || now()->isAfter($user->edit_token_expires_at)) {
                return redirect()->route('status-pendaftaran')
                    ->with('error', 'Token akses telah kedaluwarsa. Silakan hubungi admin untuk mendapatkan token baru');
            }

            $validated = $request->validate([
                'nama'             => 'required|string|max:255',
                'nim'              => 'required|string',
                'universitas'      => 'required|string|max:255',
                'jurusan'          => 'required|string|max:255',
                'email'            => 'required|email',
                'telepon'          => 'required|string|max:20',
                'tanggal_daftar'   => 'required|date',
                'tanggal_mulai'    => 'required|date',
                'tanggal_selesai'  => 'required|date|after_or_equal:tanggal_mulai',
                'bidang_id'        => 'required|integer',
                'surat_pengantar'  => 'nullable|file|mimes:pdf,doc,docx|max:5120',
                'cv'               => 'nullable|file|mimes:pdf,doc,docx|max:5120',
                'linkedin'         => 'nullable|url|max:255',
                'motivasi'         => 'required|string|max:1000',
            ]);

            // Handle file uploads
            if ($request->hasFile('surat_pengantar')) {
                // Hapus file lama jika ada
                if ($user->surat_pengantar && Storage::disk('public')->exists($user->surat_pengantar)) {
                    Storage::disk('public')->delete($user->surat_pengantar);
                }

                $file = $request->file('surat_pengantar');
                $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $file->getClientOriginalExtension();
                $validated['surat_pengantar'] = $file->storeAs('surat-pengantar', $filename, 'public');
            }

            if ($request->hasFile('cv')) {
                // Hapus file lama jika ada
                if ($user->cv && Storage::disk('public')->exists($user->cv)) {
                    Storage::disk('public')->delete($user->cv);
                }

                $cv = $request->file('cv');
                $cvname = pathinfo($cv->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $cv->getClientOriginalExtension();
                $validated['cv'] = $cv->storeAs('cv', $cvname, 'public');
            }

            // Reset status ke 'Menunggu' dan hapus alasan penolakan serta token edit
            $validated['status'] = 'Menunggu';
            $validated['reject_reason'] = null;
            $validated['rejected_at'] = null;
            $validated['edit_token'] = null;
            $validated['edit_token_expires_at'] = null;

            // Debug logging
            Log::info('Updating user data', [
                'user_id' => $user->id,
                'old_status' => $user->status,
                'new_status' => $validated['status'],
                'validated_data' => $validated
            ]);

            $user->update($validated);

            // Verify update berhasil
            $user->refresh();
            Log::info('User updated successfully', [
                'user_id' => $user->id,
                'current_status' => $user->status,
                'current_data' => $user->toArray()
            ]);

            return redirect()->route('status-pendaftaran')
                ->with('success', 'Data pendaftaran berhasil diperbaiki dan akan direview ulang oleh admin!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Gagal memperbaiki data pendaftaran: ' . $e->getMessage());
        }
    }

    public function getStatusPendaftaran()
    {
        // Auto update status sebelum menampilkan data
        $this->autoUpdateStatus();

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
            'motivasi',
            'reject_reason'
        ])->whereIn('status', $allowedStatuses)
            ->orderBy('tanggal_daftar', 'desc')
            ->get();

        return Inertia::render('user/StatusPendaftaran', [
            'pendaftars' => $users,
        ]);
    }

    public function getDataMahasiswa()
    {
        // Auto update status sebelum menampilkan data
        $this->autoUpdateStatus();

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

    /**
     * Auto update status before displaying data
     */
    private function autoUpdateStatus()
    {
        $today = Carbon::today();

        // Update Diterima -> Sedang Magang (jika tanggal mulai sudah tiba)
        User::where('status', 'Diterima')
            ->whereDate('tanggal_mulai', '<=', $today)
            ->update(['status' => 'Sedang Magang']);

        // Update Sedang Magang -> Selesai Magang (jika tanggal selesai sudah lewat)
        User::where('status', 'Sedang Magang')
            ->whereDate('tanggal_selesai', '<', $today)
            ->update(['status' => 'Selesai Magang']);
    }
}
