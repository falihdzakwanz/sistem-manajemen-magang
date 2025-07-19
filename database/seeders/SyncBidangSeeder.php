<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BerandaContent;
use App\Models\Bidang;

class SyncBidangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua data bidang dari beranda_contents
        $berandaBidangs = BerandaContent::where('content_type', 'bidang')->get();

        foreach ($berandaBidangs as $berandaBidang) {
            // Ambil data kepala bidang dari field data
            $kepalaBidang = 'Belum Ditentukan';
            if ($berandaBidang->data && isset($berandaBidang->data['kepala'])) {
                $kepalaBidang = $berandaBidang->data['kepala'];
            }

            // Update atau create entry di tabel bidangs
            Bidang::updateOrCreate(
                ['key' => $berandaBidang->key],
                [
                    'nama_bidang' => $berandaBidang->title,
                    'kepala_bidang' => $kepalaBidang,
                    'deskripsi' => $berandaBidang->description
                ]
            );
        }

        $this->command->info('Bidang data synchronized successfully!');
    }
}
