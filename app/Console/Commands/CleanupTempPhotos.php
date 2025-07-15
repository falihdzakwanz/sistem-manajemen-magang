<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupTempPhotos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'photos:cleanup-temp {--force : Force deletion without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up temporary photos older than 1 hour';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🧹 Membersihkan foto temporary...');

        try {
            $tempPhotos = Storage::disk('public')->files('photos/temp');
            $deletedCount = 0;
            $now = time();

            if (empty($tempPhotos)) {
                $this->info('ℹ️  Tidak ada foto temporary yang ditemukan.');
                return;
            }

            $this->info('📊 Ditemukan ' . count($tempPhotos) . ' file temporary');

            foreach ($tempPhotos as $photo) {
                $lastModified = Storage::disk('public')->lastModified($photo);
                $ageInHours = ($now - $lastModified) / 3600;

                if ($ageInHours > 1) {
                    $fileName = basename($photo);

                    if ($this->option('force') || $this->confirm("Hapus file: {$fileName} (umur: " . round($ageInHours, 2) . " jam)?")) {
                        Storage::disk('public')->delete($photo);
                        $deletedCount++;
                        $this->line("  🗑️  Deleted: {$fileName}");
                    }
                } else {
                    $this->line("  ⏳ Kept: " . basename($photo) . " (umur: " . round($ageInHours, 2) . " jam)");
                }
            }

            if ($deletedCount > 0) {
                $this->info("✅ Berhasil menghapus {$deletedCount} foto temporary.");
            } else {
                $this->info("ℹ️  Tidak ada foto temporary yang perlu dihapus.");
            }

            $this->info('🎉 Cleanup selesai!');
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
