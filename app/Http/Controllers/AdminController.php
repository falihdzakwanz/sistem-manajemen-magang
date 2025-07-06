<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::with('bidang')->get()->map(function ($user) {
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
                'bidang' => $user->bidang ? $user->bidang->nama_bidang : 'Belum ditentukan',
                'motivasi' => $user->motivasi ?? '',
                'linkedin' => $user->linkedin ?? '',
                'surat_pengantar' => $user->surat_pengantar,
                'cv' => $user->cv,
                'reject_reason' => $user->reject_reason ?? '',
            ];
        });

        return Inertia::render('admin/DashboardAdmin', [
            'mahasiswas' => $users
        ]);
    }

    public function updateStatus(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:Sedang Diproses,Diterima,Ditolak,Sedang Magang,Selesai Magang',
            'reject_reason' => 'nullable|string'
        ]);

        $user = User::findOrFail($id);
        
        $updateData = ['status' => $request->status];
        
        // Jika status ditolak, simpan alasan penolakan
        if ($request->status === 'Ditolak' && $request->reject_reason) {
            $updateData['reject_reason'] = $request->reject_reason;
        }
        
        // Jika status bukan ditolak, hapus alasan penolakan jika ada
        if ($request->status !== 'Ditolak') {
            $updateData['reject_reason'] = null;
        }
        
        $user->update($updateData);

        return redirect()->back()->with('success', 'Status user berhasil diupdate');
    }
    public function destroy(User $users)
    {
        try {
            // Pastikan data ditemukan (jika tidak ada, akan melemparkan ModelNotFoundException)
            if (!$users) {
                throw new ModelNotFoundException("User not found");
            }

            // Cek dan hapus surat pengantar jika ada
            if ($users->surat_pengantar) {
                Storage::disk('public')->delete($users->surat_pengantar);
            }

            // Cek dan hapus CV jika ada
            if ($users->cv) {
                Storage::disk('public')->delete($users->cv);
            }

            // Menghapus data user
            $users->delete();

            // Redirect dengan pesan sukses
            return redirect()->route('admin.destroy')
                ->with('success', 'Data user berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            // Menangani kasus ketika data tidak ditemukan
            return redirect()->route('admin.destroy')
                ->with('error', 'User tidak ditemukan.');
        } catch (\Exception $e) {
            // Menangani kesalahan lainnya (misalnya file yang tidak bisa dihapus)
            return redirect()->route('admin.destroy')
                ->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
