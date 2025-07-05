<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bidang;

class BidangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bidangs = [
            [
                'nama_bidang' => 'Bidang Informasi dan Komunikasi Publik',
                'kepala_bidang' => 'Rudhy Hartono, SE., M.Si.',
                'deskripsi' => 'Mengelola informasi dan komunikasi publik untuk meningkatkan transparansi pemerintahan.'
            ],
            [
                'nama_bidang' => 'Bidang Pemberdayaan E-Government',
                'kepala_bidang' => 'Fachrizal, S.Kom, M.Kom.',
                'deskripsi' => 'Mengembangkan dan memberdayakan sistem e-government untuk pelayanan publik yang lebih efisien.'
            ],
            [
                'nama_bidang' => 'Bidang Persandian, Pos dan Telekomunikasi',
                'kepala_bidang' => 'Nursari, S.Sos., MM',
                'deskripsi' => 'Mengelola sistem persandian, layanan pos, dan infrastruktur telekomunikasi.'
            ],
            [
                'nama_bidang' => 'Bidang Data dan Statistik',
                'kepala_bidang' => 'Donny, S.H',
                'deskripsi' => 'Mengelola dan menganalisis data serta statistik untuk mendukung pengambilan keputusan.'
            ]
        ];

        foreach ($bidangs as $bidang) {
            Bidang::create($bidang);
        }
    }
}
