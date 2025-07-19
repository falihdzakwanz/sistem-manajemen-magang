<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Bidang;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\StatusMagangNotification;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function index()
    {
        // Jalankan auto-update status jika diperlukan
        $this->autoUpdateStatusIfNeeded();

        // Optimasi dengan select specific columns dan eager loading
        $users = User::with(['bidang:id,nama_bidang'])
            ->select([
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
                'motivasi',
                'linkedin',
                'surat_pengantar',
                'cv',
                'reject_reason'
            ])
            ->get()
            ->map(function ($user) {
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

        // Cache bidang data untuk 5 menit
        $bidangs = cache()->remember('bidangs_sorted', 300, function () {
            return Bidang::select('id', 'nama_bidang')
                ->get()
                ->sortBy(function ($bidang) {
                    if ($bidang->nama_bidang === 'Kesekretariatan') {
                        return 0; // Kesekretariatan di urutan pertama
                    }
                    return 1; // Bidang lainnya di urutan berikutnya
                })
                ->values(); // Reset index array
        });

        return Inertia::render('admin/DashboardAdmin', [
            'mahasiswas' => $users,
            'bidangs' => $bidangs
        ]);
    }

    public function updateStatus(Request $request, $id): RedirectResponse
    {
        try {
            $request->validate([
                'status' => 'required|in:Menunggu,Diterima,Ditolak,Sedang Magang,Selesai Magang',
                'reject_reason' => 'nullable|string'
            ]);

            $user = User::findOrFail($id);
            $oldStatus = $user->status;

            // Validasi status transition berdasarkan aturan bisnis
            $this->validateStatusTransition($oldStatus, $request->input('status'));

            $updateData = ['status' => $request->input('status')];

            // Jika status ditolak, simpan alasan penolakan dan buat token edit
            if ($request->input('status') === 'Ditolak' && $request->input('reject_reason')) {
                $updateData['reject_reason'] = $request->input('reject_reason');
                // Buat token edit yang valid selama 30 hari
                $updateData['edit_token'] = \Illuminate\Support\Str::random(60);
                $updateData['edit_token_expires_at'] = now()->addDays(30);
            }

            // Jika status bukan ditolak, hapus alasan penolakan dan token edit
            if ($request->input('status') !== 'Ditolak') {
                $updateData['reject_reason'] = null;
                $updateData['edit_token'] = null;
                $updateData['edit_token_expires_at'] = null;
            }

            $user->update($updateData);

            // Kirim email notifikasi jika status berubah dari Menunggu ke Diterima atau Ditolak
            if ($oldStatus === 'Menunggu' && in_array($request->input('status'), ['Diterima', 'Ditolak'])) {
                try {
                    // Refresh user data untuk memastikan token sudah tersimpan
                    $user->refresh();
                    $rejectReason = $request->input('status') === 'Ditolak' ? $request->input('reject_reason') : null;
                    Mail::to($user->email)->send(new StatusMagangNotification($user, $request->input('status'), $rejectReason));

                    $emailMessage = $request->input('status') === 'Diterima'
                        ? 'Status berhasil diupdate dan email pemberitahuan telah dikirim ke mahasiswa'
                        : 'Status berhasil diupdate dan email pemberitahuan penolakan telah dikirim ke mahasiswa';

                    return redirect()->back()->with('success', $emailMessage);
                } catch (\Exception $e) {
                    Log::error('Failed to send email notification: ' . $e->getMessage());
                    return redirect()->back()->with('success', 'Status berhasil diupdate, namun email notifikasi gagal dikirim');
                }
            }

            return redirect()->back()->with('success', 'Status user berhasil diupdate');
        } catch (\InvalidArgumentException $e) {
            // Error dari validasi status transition
            return redirect()->back()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            // Error lainnya
            Log::error('Error updating status: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal mengupdate status mahasiswa');
        }
    }

    public function updateMahasiswa(Request $request, $id): RedirectResponse
    {
        try {
            $user = User::findOrFail($id);
            $currentStatus = $user->status;

            // Validasi status transition berdasarkan aturan bisnis
            $this->validateStatusTransition($currentStatus, $request->input('status'));

            $request->validate([
                'nama' => 'required|string|max:255',
                'nim' => 'required|string|max:20',
                'universitas' => 'required|string|max:255',
                'jurusan' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'telepon' => 'required|string|max:20',
                'tanggal_mulai' => 'required|date',
                'tanggal_selesai' => 'required|date|after:tanggal_mulai',
                'status' => 'required|in:Menunggu,Diterima,Ditolak,Sedang Magang,Selesai Magang',
                'bidang_id' => 'required|exists:bidangs,id',
                'motivasi' => 'nullable|string',
                'linkedin' => 'nullable|url',
            ]);

            $oldStatus = $user->status;

            $updateData = [
                'nama' => $request->input('nama'),
                'nim' => $request->input('nim'),
                'universitas' => $request->input('universitas'),
                'jurusan' => $request->input('jurusan'),
                'email' => $request->input('email'),
                'telepon' => $request->input('telepon'),
                'tanggal_mulai' => $request->input('tanggal_mulai'),
                'tanggal_selesai' => $request->input('tanggal_selesai'),
                'status' => $request->input('status'),
                'bidang_id' => $request->input('bidang_id'),
                'motivasi' => $request->input('motivasi'),
                'linkedin' => $request->input('linkedin'),
            ];

            // Jika status ditolak, simpan alasan penolakan jika ada
            if ($request->input('status') === 'Ditolak' && $request->input('reject_reason')) {
                $updateData['reject_reason'] = $request->input('reject_reason');
            }

            // Jika status bukan ditolak, hapus alasan penolakan jika ada
            if ($request->input('status') !== 'Ditolak') {
                $updateData['reject_reason'] = null;
            }

            $user->update($updateData);

            // Kirim email notifikasi jika status berubah dari Menunggu ke Diterima atau Ditolak
            if ($oldStatus === 'Menunggu' && in_array($request->input('status'), ['Diterima', 'Ditolak'])) {
                try {
                    $rejectReason = $request->input('status') === 'Ditolak' ? $request->input('reject_reason') : null;
                    Mail::to($user->email)->send(new StatusMagangNotification($user, $request->input('status'), $rejectReason));

                    $emailMessage = $request->input('status') === 'Diterima'
                        ? 'Data mahasiswa berhasil diupdate dan email pemberitahuan telah dikirim'
                        : 'Data mahasiswa berhasil diupdate dan email pemberitahuan penolakan telah dikirim';

                    return redirect()->back()->with('success', $emailMessage);
                } catch (\Exception $e) {
                    Log::error('Failed to send email notification: ' . $e->getMessage());
                    return redirect()->back()->with('success', 'Data mahasiswa berhasil diupdate, namun email notifikasi gagal dikirim');
                }
            }

            return redirect()->back()->with('success', 'Data mahasiswa berhasil diupdate');
        } catch (\InvalidArgumentException $e) {
            // Error dari validasi status transition
            return redirect()->back()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            // Error lainnya
            Log::error('Error updating mahasiswa: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal mengupdate data mahasiswa');
        }
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

    /**
     * Trigger manual update status magang
     */
    public function updateStatusMagangManual(Request $request): RedirectResponse
    {
        try {
            // Jalankan command update status
            Artisan::call('magang:update-status');
            $output = Artisan::output();

            // Parse output untuk mendapatkan informasi update
            $lines = explode("\n", $output);
            $summary = [];
            foreach ($lines as $line) {
                if (strpos($line, 'Total perubahan:') !== false) {
                    $summary['total'] = trim(str_replace(['Total perubahan:', 'mahasiswa'], '', $line));
                }
            }

            $message = isset($summary['total'])
                ? "Status magang berhasil diupdate untuk {$summary['total']} mahasiswa"
                : "Update status magang berhasil dijalankan";

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengupdate status: ' . $e->getMessage());
        }
    }

    /**
     * Otomatisasi real-time - dipanggil setiap kali load dashboard
     */
    private function autoUpdateStatusIfNeeded()
    {
        $today = Carbon::today();
        $lastUpdate = cache()->get('last_status_update_check');

        // Cek apakah sudah diupdate hari ini
        if (!$lastUpdate || !$lastUpdate->isSameDay($today)) {
            try {
                // Update status otomatis
                $this->performStatusUpdate();

                // Simpan waktu update terakhir
                cache()->put('last_status_update_check', $today, now()->endOfDay());
            } catch (\Exception $e) {
                // Log error tapi jangan stop aplikasi
                Log::error('Auto update status failed: ' . $e->getMessage());
            }
        }
    }

    /**
     * Perform actual status update
     */
    private function performStatusUpdate()
    {
        $today = Carbon::today();

        // Update Diterima -> Sedang Magang
        User::where('status', 'Diterima')
            ->whereDate('tanggal_mulai', '<=', $today)
            ->update(['status' => 'Sedang Magang']);

        // Update Sedang Magang -> Selesai Magang  
        User::where('status', 'Sedang Magang')
            ->whereDate('tanggal_selesai', '<', $today)
            ->update(['status' => 'Selesai Magang']);
    }

    /**
     * Delete mahasiswa data
     */
    public function deleteMahasiswa($id): RedirectResponse
    {
        try {
            $user = User::findOrFail($id);

            // Hapus file dokumen jika ada
            if ($user->surat_pengantar && Storage::exists('public/' . $user->surat_pengantar)) {
                Storage::delete('public/' . $user->surat_pengantar);
            }

            if ($user->cv && Storage::exists('public/' . $user->cv)) {
                Storage::delete('public/' . $user->cv);
            }

            // Hapus data mahasiswa
            $user->delete();

            return redirect()->back()->with('success', 'Data mahasiswa berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Data mahasiswa tidak ditemukan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus data mahasiswa');
        }
    }

    /**
     * Download file dengan nama yang disesuaikan
     */
    public function downloadFile($id, $type)
    {
        try {
            $user = User::findOrFail($id);

            // Tentukan file path berdasarkan type
            $filePath = null;
            $customFileName = null;

            if ($type === 'surat_pengantar' && !empty($user->getAttribute('surat_pengantar'))) {
                $filePath = $user->getAttribute('surat_pengantar');
                // Bersihkan nama untuk filename (hapus karakter yang tidak diinginkan)
                $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->getAttribute('nama'));
                $cleanName = str_replace(' ', '-', $cleanName);
                $customFileName = 'surat-pengantar_' . $cleanName;
            } elseif ($type === 'cv' && !empty($user->getAttribute('cv'))) {
                $filePath = $user->getAttribute('cv');
                // Bersihkan nama untuk filename (hapus karakter yang tidak diinginkan)
                $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->getAttribute('nama'));
                $cleanName = str_replace(' ', '-', $cleanName);
                $customFileName = 'cv_' . $cleanName;
            }

            if (!$filePath) {
                return redirect()->back()->with('error', 'File tidak ditemukan');
            }

            $fullPath = storage_path('app/public/' . $filePath);

            if (!file_exists($fullPath)) {
                return redirect()->back()->with('error', 'File tidak ditemukan di server');
            }

            // Dapatkan ekstensi file asli
            $originalExtension = pathinfo($filePath, PATHINFO_EXTENSION);
            $downloadName = $customFileName . '.' . $originalExtension;

            return response()->download($fullPath, $downloadName);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Data mahasiswa tidak ditemukan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mendownload file: ' . $e->getMessage());
        }
    }

    /**
     * Validasi transisi status berdasarkan aturan bisnis
     */
    private function validateStatusTransition(string $currentStatus, string $newStatus): void
    {
        // Aturan transisi status yang diizinkan
        $allowedTransitions = [
            'Menunggu' => ['Menunggu', 'Diterima', 'Ditolak'],
            'Diterima' => ['Diterima', 'Sedang Magang'],
            'Ditolak' => ['Ditolak'], // Tidak bisa diubah
            'Sedang Magang' => ['Sedang Magang', 'Selesai Magang'],
            'Selesai Magang' => ['Selesai Magang'], // Final state
        ];

        // Jika status saat ini tidak ada dalam aturan, allow semua untuk backward compatibility
        if (!isset($allowedTransitions[$currentStatus])) {
            return;
        }

        // Cek apakah transisi diizinkan
        if (!in_array($newStatus, $allowedTransitions[$currentStatus])) {
            $errorMessages = [
                'Ditolak' => 'Status "Ditolak" tidak dapat diubah karena sudah final.',
                'Selesai Magang' => 'Status "Selesai Magang" tidak dapat diubah karena sudah final.',
            ];

            $message = $errorMessages[$currentStatus] ??
                "Tidak dapat mengubah status dari \"{$currentStatus}\" ke \"{$newStatus}\". " .
                "Status yang diizinkan: " . implode(', ', $allowedTransitions[$currentStatus]);

            throw new \InvalidArgumentException($message);
        }
    }

    /**
     * Preview file dengan nama yang disesuaikan
     */
    public function previewFile($id, $type)
    {
        try {
            $user = User::findOrFail($id);

            // Tentukan file path berdasarkan type
            $filePath = null;
            $customFileName = null;

            if ($type === 'surat_pengantar' && !empty($user->getAttribute('surat_pengantar'))) {
                $filePath = $user->getAttribute('surat_pengantar');
                // Bersihkan nama untuk filename (hapus karakter yang tidak diinginkan)
                $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->getAttribute('nama'));
                $cleanName = str_replace(' ', '-', $cleanName);
                $customFileName = 'surat-pengantar_' . $cleanName;
            } elseif ($type === 'cv' && !empty($user->getAttribute('cv'))) {
                $filePath = $user->getAttribute('cv');
                // Bersihkan nama untuk filename (hapus karakter yang tidak diinginkan)
                $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->getAttribute('nama'));
                $cleanName = str_replace(' ', '-', $cleanName);
                $customFileName = 'cv_' . $cleanName;
            }

            if (!$filePath) {
                return redirect()->back()->with('error', 'File tidak ditemukan');
            }

            $fullPath = storage_path('app/public/' . $filePath);

            if (!file_exists($fullPath)) {
                return redirect()->back()->with('error', 'File tidak ditemukan di server');
            }

            // Dapatkan ekstensi file asli
            $originalExtension = pathinfo($filePath, PATHINFO_EXTENSION);
            $previewName = $customFileName . '.' . $originalExtension;

            // Dapatkan MIME type
            $mimeType = mime_content_type($fullPath);

            return response()->file($fullPath, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'inline; filename="' . $previewName . '"'
            ]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Data mahasiswa tidak ditemukan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal preview file: ' . $e->getMessage());
        }
    }
}
