<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    public function index()
    {
        $mahasiswas = Mahasiswa::all()->map(function ($mahasiswa) {
            return [
                'id' => $mahasiswa->id,
                'nama' => $mahasiswa->nama,
                'nim' => $mahasiswa->nim,
                'universitas' => $mahasiswa->universitas,
                'jurusan' => $mahasiswa->jurusan,
                'email' => $mahasiswa->email,
                'telepon' => $mahasiswa->telepon,
                'tanggal_daftar' => $mahasiswa->tanggal_daftar,
                'tanggal_mulai' => $mahasiswa->tanggal_mulai,
                'tanggal_selesai' => $mahasiswa->tanggal_selesai,
                'status' => $mahasiswa->status,
                'bidang_id' => $mahasiswa->bidang_id,
                'bidang' => $this->getBidangName($mahasiswa->bidang_id),
                'motivasi' => $mahasiswa->motivasi ?? '',
                'linkedin' => $mahasiswa->linkedin ?? '',
                'surat_pengantar' => $mahasiswa->surat_pengantar,
                'cv' => $mahasiswa->cv,
            ];
        });

        return Inertia::render('admin/DashboardAdmin', [
            'mahasiswas' => $mahasiswas
        ]);
    }

    public function updateStatus(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:Sedang Diproses,Diterima,Ditolak,Sedang Magang,Selesai Magang'
        ]);

        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('success', 'Status mahasiswa berhasil diupdate');
    }

    private function getBidangName($bidangId)
    {
        $bidangNames = [
            1 => 'IT Support',
            2 => 'Web Development', 
            3 => 'Network Administration',
            4 => 'UI/UX Design',
            5 => 'Data Analysis',
            6 => 'Mobile Development',
            7 => 'Database Administration',
            8 => 'Cybersecurity',
            9 => 'Digital Marketing',
            10 => 'Project Management'
        ];

        return $bidangNames[$bidangId] ?? 'Unknown';
    }
}
