<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class CleanupRejectedData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'magang:cleanup-rejected {--dry-run : Tampilkan data yang akan dihapus tanpa menghapus database} {--days=30 : Jumlah hari untuk menghapus data ditolak (default: 30)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menghapus data pendaftar yang ditolak lebih dari periode tertentu (default: 30 hari)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $days = (int) $this->option('days');
        $cutoffDate = Carbon::now()->subDays($days);
        
        $this->info("🧹 Memulai cleanup data yang ditolak untuk periode lebih dari {$days} hari");
        $this->info("📅 Data yang ditolak sebelum: " . $cutoffDate->format('d-m-Y H:i:s'));
        
        if ($isDryRun) {
            $this->warn("⚠️  MODE DRY RUN - Tidak akan menghapus data dari database");
        }
        
        // Cari data yang ditolak lebih dari periode yang ditentukan
        // Prioritas: gunakan rejected_at jika ada, jika tidak gunakan updated_at
        $rejectedData = User::where('status', 'Ditolak')
            ->where(function($query) use ($cutoffDate) {
                $query->where(function($q) use ($cutoffDate) {
                    // Jika rejected_at ada dan tidak null, gunakan itu
                    $q->whereNotNull('rejected_at')
                      ->where('rejected_at', '<', $cutoffDate);
                })->orWhere(function($q) use ($cutoffDate) {
                    // Jika rejected_at null, gunakan updated_at sebagai fallback
                    $q->whereNull('rejected_at')
                      ->where('updated_at', '<', $cutoffDate);
                });
            })
            ->get();
            
        if ($rejectedData->count() === 0) {
            $this->info("✅ Tidak ada data yang perlu dihapus");
            return 0;
        }
        
        $this->info("📊 Ditemukan {$rejectedData->count()} data yang akan dihapus:");
        
        // Tampilkan detail data yang akan dihapus
        $headers = ['ID', 'Nama', 'NIM', 'Email', 'Tanggal Ditolak', 'Hari Berlalu'];
        $tableData = [];
        
        foreach ($rejectedData as $data) {
            $rejectedDate = $data->rejected_at ?: $data->updated_at;
            $daysPassed = $rejectedDate->diffInDays(Carbon::now());
            $tableData[] = [
                $data->id,
                $data->nama,
                $data->nim,
                $data->email,
                $rejectedDate->format('d-m-Y H:i:s'),
                $daysPassed . ' hari'
            ];
        }
        
        $this->table($headers, $tableData);
        
        if (!$isDryRun) {
            // Konfirmasi sebelum menghapus (kecuali jika dijalankan via scheduler)
            if (!$this->option('no-interaction')) {
                if (!$this->confirm('Apakah Anda yakin ingin menghapus data tersebut?')) {
                    $this->info('❌ Operasi dibatalkan');
                    return 0;
                }
            }
            
            $deletedFiles = [];
            $deletedCount = 0;
            
            foreach ($rejectedData as $data) {
                // Hapus file terkait jika ada
                $filesToDelete = [];
                
                if ($data->surat_pengantar) {
                    $filesToDelete[] = $data->surat_pengantar;
                }
                
                if ($data->cv) {
                    $filesToDelete[] = $data->cv;
                }
                
                // Hapus file dari storage
                foreach ($filesToDelete as $file) {
                    if (Storage::disk('public')->exists($file)) {
                        Storage::disk('public')->delete($file);
                        $deletedFiles[] = $file;
                        $this->line("🗑️  File dihapus: {$file}");
                    }
                }
                
                // Hapus record dari database
                $data->delete();
                $deletedCount++;
                
                $this->line("✅ Data dihapus: {$data->nama} ({$data->nim})");
            }
            
            $this->info("\n🎉 Cleanup selesai!");
            $this->info("📄 {$deletedCount} record dihapus");
            $this->info("📁 " . count($deletedFiles) . " file dihapus");
            
            // Log aktivitas
            $logMessage = sprintf(
                "[%s] Cleanup rejected data: %d records deleted, %d files deleted (older than %d days)",
                Carbon::now()->format('Y-m-d H:i:s'),
                $deletedCount,
                count($deletedFiles),
                $days
            );
            
            \Log::info($logMessage);
            
        } else {
            $this->info("\n🔍 Mode dry-run: {$rejectedData->count()} data akan dihapus jika command dijalankan tanpa --dry-run");
        }
        
        return 0;
    }
}
