<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'nama' => $user->nama,
                'nim' => $user->nim,
                'universitas' => $user->universitas,
                'jurusan' => $user->jurusan,
                'email' => $user->email,
                'telepon' => $user->telepon,
                'tanggal_daftar' => $user->tanggal_daftar,
                'tanggal_mulai' => $user->tanggal_mulai,
                'tanggal_selesai' => $user->tanggal_selesai,
                'status' => $user->status,
                'bidang_id' => $user->bidang_id,
                'bidang' => $this->getBidangName($user->bidang_id),
                'motivasi' => $user->motivasi ?? '',
                'linkedin' => $user->linkedin ?? '',
                'surat_pengantar' => $user->surat_pengantar,
                'cv' => $user->cv,
            ];
        });

        return Inertia::render('admin/DashboardAdmin', [
            'mahasiswas' => $users
        ]);
    }

    public function updateStatus(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:Sedang Diproses,Diterima,Ditolak,Sedang Magang,Selesai Magang'
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('success', 'Status user berhasil diupdate');
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
