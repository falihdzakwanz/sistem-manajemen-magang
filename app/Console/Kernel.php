<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Jalankan update status magang setiap hari jam 00:01
        $schedule->command('magang:update-status')
            ->dailyAt('00:01')
            ->name('update-status-magang')
            ->emailOutputOnFailure(config('mail.admin_email', 'admin@example.com'))
            ->appendOutputTo(storage_path('logs/magang-status-update.log'));
            
        // Jalankan cleanup data ditolak setiap hari jam 02:00
        $schedule->command('magang:cleanup-rejected --no-interaction')
            ->dailyAt('02:00')
            ->name('cleanup-rejected-data')
            ->emailOutputOnFailure(config('mail.admin_email', 'admin@example.com'))
            ->appendOutputTo(storage_path('logs/magang-cleanup.log'));
            
        // Alternative: Jalankan setiap 6 jam untuk update yang lebih real-time
        // $schedule->command('magang:update-status')
        //     ->everySixHours()
        //     ->name('update-status-magang')
        //     ->appendOutputTo(storage_path('logs/magang-status-update.log'));
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
