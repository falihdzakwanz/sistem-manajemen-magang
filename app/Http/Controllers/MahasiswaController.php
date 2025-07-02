<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswas = Mahasiswa::all();

        return Inertia::render('Mahasiswa/Index', [
            'mahasiswas' => $mahasiswas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
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

        $suratPengantarPath = null;
        $cvPath = null;

        if ($request->hasFile('surat_pengantar')) {
            $suratFile = $request->file('surat_pengantar');
            $filename = pathinfo($suratFile->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $suratFile->getClientOriginalExtension();
            $suratPengantarPath = $suratFile->storeAs('surat-pengantar', $filename, 'public');
        }

        if ($request->hasFile('cv')) {
            $cvFile = $request->file('cv');
            $filename = pathinfo($cvFile->getClientOriginalName(), PATHINFO_FILENAME) . '_' . time() . '.' . $cvFile->getClientOriginalExtension();
            $cvPath = $cvFile->storeAs('cv', $filename, 'public');
        }

        Mahasiswa::create([
            'nama'             => $request->nama,
            'nim'              => $request->nim,
            'universitas'      => $request->universitas,
            'jurusan'          => $request->jurusan,
            'email'            => $request->email,
            'telepon'          => $request->telepon,
            'tanggal_daftar'   => $request->tanggal_daftar,
            'tanggal_mulai'    => $request->tanggal_mulai,
            'tanggal_selesai'  => $request->tanggal_selesai,
            'status'           => 'pending',
            'bidang_id'        => $request->bidang_id,
            'surat_pengantar'  => $suratPengantarPath,
            'cv'               => $cvPath,
            'linkedin'         => $request->linkedin,
            'motivasi'         => $request->motivasi,
        ]);

        return redirect()->route('mahasiswa.index')->with('success', 'Pendaftaran magang berhasil disubmit');
    }

    public function destroy(Mahasiswa $mahasiswa)
    {
        // Hapus file dari storage jika ada
        if ($mahasiswa->surat_pengantar) {
            Storage::disk('public')->delete($mahasiswa->surat_pengantar);
        }

        if ($mahasiswa->cv) {
            Storage::disk('public')->delete($mahasiswa->cv);
        }

        $mahasiswa->delete();

        return redirect()->route('mahasiswa.index')->with('success', 'Data mahasiswa berhasil dihapus');
    }
}
