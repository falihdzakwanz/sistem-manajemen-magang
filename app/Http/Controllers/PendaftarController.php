<?php

namespace App\Http\Controllers;

use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PendaftarController extends Controller
{
    public function dashboardAdmin()
    {
        $pesertaMagangs = Pendaftar::where('status', 'Diterima')->paginate(10);

        return Inertia::render('Admin', [
            'pesertaMagangs' => $pesertaMagangs,
        ]);
    }

    public function cekStatus()
    {
        $cekStatus = Pendaftar::where('status', 'Sedang Diproses')->paginate(10);

        return Inertia::render('Pendaftar/CekStatus', [
            'cekStatus' => $cekStatus,
        ]);
    }

    public function updateStatus(Request $request, Pendaftar $pendaftars)
    {
        try {
             // Validasi input status
            $request->validate([
                'status' => 'required|in:Diterima,Ditolak,Sedang Magang,Selesai Magang',
            ]);

            // Update status pendaftar
            $pendaftars->status = $request->status;
            $pendaftars->save();

            // Redirect dengan pesan sukses
            return redirect()->route('pendaftar.dashboardAdmin')->with('success', 'Statusberhasil diubah');
        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi
            return redirect()->route('pendaftar.dashboardAdmin')->with('error', 'Terjadi kesalahan saat mengubah status: ' . $e->getMessage());
        }
    }

    // Menampilkan detail peserta magang dalam modal
    public function showDetail(Pendaftar $pendaftars)
    {
        // Menampilkan data detail pendaftar
        return Inertia::render('Admin/DetailPesertaMagang', [
            'detailPeserta' => $pendaftars
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

        Pendaftar::create($validated);

        return redirect()->route('pendaftar.index')->with('success', 'Pendaftaran magang berhasil disubmit!');
    }

    public function destroy(Pendaftar $pendaftars)
    {
        try {
            // Pastikan data ditemukan (jika tidak ada, akan melemparkan ModelNotFoundException)
            if (!$pendaftars) {
                throw new ModelNotFoundException("Pendaftar not found");
            }

            // Cek dan hapus surat pengantar jika ada
            if ($pendaftars->surat_pengantar) {
                Storage::disk('public')->delete($pendaftars->surat_pengantar);
            }

            // Cek dan hapus CV jika ada
            if ($pendaftars->cv) {
                Storage::disk('public')->delete($pendaftars->cv);
            }

            // Menghapus data pendaftar
            $pendaftars->delete();

            // Redirect dengan pesan sukses
            return redirect()->route('pendaftar.index')
                ->with('success', 'Data pendaftar berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            // Menangani kasus ketika data tidak ditemukan
            return redirect()->route('pendaftar.index')
                ->with('error', 'Pendaftar tidak ditemukan.');
        } catch (\Exception $e) {
            // Menangani kesalahan lainnya (misalnya file yang tidak bisa dihapus)
            return redirect()->route('pendaftar.index')
                ->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
