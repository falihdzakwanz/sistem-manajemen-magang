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
                'nama_bidang' => 'Bidang Persandian, Keamanan Informasi dan Siber',
                'kepala_bidang' => 'Nursari, S.Sos., MM',
                'deskripsi' => 'Mengelola sistem persandian, keamanan informasi, dan infrastruktur siber.'
            ],
            [
                'nama_bidang' => 'Bidang Statistik dan Data Elektronik',
                'kepala_bidang' => 'Donny Diaz Rizaldy Praja, SH., MH.',
                'deskripsi' => 'Mengelola dan menganalisis data serta statistik untuk mendukung pengambilan keputusan.'
            ],
            [
                'nama_bidang' => 'Kesekretariatan',
                'kepala_bidang' => 'Arienge Rahman, S.Kom., M.M',
                'deskripsi' => 'Mengelola administrasi, koordinasi, dan layanan kesekretariatan untuk mendukung operasional dinas.'
            ]
        ];

        foreach ($bidangs as $bidang) {
            Bidang::create($bidang);
        }
    }
}
