<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class UpdateStatusMagang extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'magang:update-status {--dry-run : Tampilkan perubahan tanpa mengupdate database}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update status magang secara otomatis berdasarkan tanggal mulai dan selesai';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $today = Carbon::today();
        
        $this->info("🚀 Memulai update status magang untuk tanggal: " . $today->format('d-m-Y'));
        
        if ($isDryRun) {
            $this->warn("⚠️  MODE DRY RUN - Tidak akan mengupdate database");
        }
        
        // Counter untuk tracking perubahan
        $updatedToSedangMagang = 0;
        $updatedToSelesaiMagang = 0;
        
        // 1. Update status dari "Diterima" ke "Sedang Magang"
        $this->info("\n📋 Mengecek mahasiswa yang perlu diubah dari 'Diterima' ke 'Sedang Magang'...");
        
        $mahasiswaDiterima = User::where('status', 'Diterima')
            ->whereDate('tanggal_mulai', '<=', $today)
            ->get();
            
        if ($mahasiswaDiterima->count() > 0) {
            $this->table(
                ['ID', 'Nama', 'Tanggal Mulai', 'Status Lama', 'Status Baru'],
                $mahasiswaDiterima->map(function ($user) {
                    return [
                        $user->id,
                        $user->nama,
                        Carbon::parse($user->tanggal_mulai)->format('d-m-Y'),
                        'Diterima',
                        'Sedang Magang'
                    ];
                })
            );
            
            if (!$isDryRun) {
                $updated = User::where('status', 'Diterima')
                    ->whereDate('tanggal_mulai', '<=', $today)
                    ->update(['status' => 'Sedang Magang']);
                $updatedToSedangMagang = $updated;
                $this->info("✅ Berhasil mengupdate {$updated} mahasiswa ke status 'Sedang Magang'");
            } else {
                $updatedToSedangMagang = $mahasiswaDiterima->count();
                $this->info("📊 Akan mengupdate {$updatedToSedangMagang} mahasiswa ke status 'Sedang Magang'");
            }
        } else {
            $this->info("ℹ️  Tidak ada mahasiswa yang perlu diubah ke 'Sedang Magang'");
        }
        
        // 2. Update status dari "Sedang Magang" ke "Selesai Magang"
        $this->info("\n📋 Mengecek mahasiswa yang perlu diubah dari 'Sedang Magang' ke 'Selesai Magang'...");
        
        $mahasiswaSedangMagang = User::where('status', 'Sedang Magang')
            ->whereDate('tanggal_selesai', '<', $today)
            ->get();
            
        if ($mahasiswaSedangMagang->count() > 0) {
            $this->table(
                ['ID', 'Nama', 'Tanggal Selesai', 'Status Lama', 'Status Baru'],
                $mahasiswaSedangMagang->map(function ($user) {
                    return [
                        $user->id,
                        $user->nama,
                        Carbon::parse($user->tanggal_selesai)->format('d-m-Y'),
                        'Sedang Magang',
                        'Selesai Magang'
                    ];
                })
            );
            
            if (!$isDryRun) {
                $updated = User::where('status', 'Sedang Magang')
                    ->whereDate('tanggal_selesai', '<', $today)
                    ->update(['status' => 'Selesai Magang']);
                $updatedToSelesaiMagang = $updated;
                $this->info("✅ Berhasil mengupdate {$updated} mahasiswa ke status 'Selesai Magang'");
            } else {
                $updatedToSelesaiMagang = $mahasiswaSedangMagang->count();
                $this->info("📊 Akan mengupdate {$updatedToSelesaiMagang} mahasiswa ke status 'Selesai Magang'");
            }
        } else {
            $this->info("ℹ️  Tidak ada mahasiswa yang perlu diubah ke 'Selesai Magang'");
        }
        
        // Summary
        $this->info("\n" . str_repeat("=", 60));
        $this->info("📊 RINGKASAN UPDATE STATUS MAGANG");
        $this->info(str_repeat("=", 60));
        $this->info("📅 Tanggal: " . $today->format('d-m-Y H:i:s'));
        $this->info("🔄 Diterima → Sedang Magang: {$updatedToSedangMagang} mahasiswa");
        $this->info("🎓 Sedang Magang → Selesai Magang: {$updatedToSelesaiMagang} mahasiswa");
        $this->info("📈 Total perubahan: " . ($updatedToSedangMagang + $updatedToSelesaiMagang) . " mahasiswa");
        
        if ($isDryRun) {
            $this->warn("⚠️  Mode dry-run aktif - Data tidak disimpan ke database");
            $this->info("💡 Jalankan tanpa --dry-run untuk mengupdate database");
        } else {
            $this->info("✅ Update status berhasil disimpan ke database");
        }
        
        return Command::SUCCESS;
    }
}
