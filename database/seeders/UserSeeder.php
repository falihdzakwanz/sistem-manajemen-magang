<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mahasiswas = [
            [
                'nama' => 'Ahmad Rizki Pratama',
                'nim' => '19104001',
                'universitas' => 'Universitas Lampung',
                'jurusan' => 'Teknik Informatika',
                'email' => 'ahmad.rizki@example.com',
                'telepon' => '08123456789',
                'tanggal_daftar' => Carbon::create(2025, 6, 1),
                'tanggal_mulai' => Carbon::create(2025, 7, 1),
                'tanggal_selesai' => Carbon::create(2025, 8, 31),
                'status' => 'Diterima',
                'bidang_id' => 1,
                'motivasi' => 'Ingin belajar tentang teknologi informasi dan komunikasi di instansi pemerintahan',
                'linkedin' => 'https://linkedin.com/in/ahmad-rizki',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Siti Nurhaliza',
                'nim' => '20104002',
                'universitas' => 'Institut Teknologi Sumatera',
                'jurusan' => 'Sistem Informasi',
                'email' => 'siti.nur@example.com',
                'telepon' => '08234567890',
                'tanggal_daftar' => Carbon::create(2025, 6, 5),
                'tanggal_mulai' => Carbon::create(2025, 7, 15),
                'tanggal_selesai' => Carbon::create(2025, 9, 15),
                'status' => 'Sedang Diproses',
                'bidang_id' => 2,
                'motivasi' => 'Tertarik untuk mengembangkan skill web development untuk smart city',
                'linkedin' => 'https://linkedin.com/in/siti-nurhaliza',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Budi Santoso',
                'nim' => '19104003',
                'universitas' => 'Universitas Bandar Lampung',
                'jurusan' => 'Teknik Komputer',
                'email' => 'budi.santoso@example.com',
                'telepon' => '08345678901',
                'tanggal_daftar' => Carbon::create(2025, 5, 20),
                'tanggal_mulai' => Carbon::create(2025, 6, 1),
                'tanggal_selesai' => Carbon::create(2025, 7, 31),
                'status' => 'Selesai Magang',
                'bidang_id' => 3,
                'motivasi' => 'Ingin memahami infrastruktur jaringan pemerintahan dan digitalisasi',
                'linkedin' => 'https://linkedin.com/in/budi-santoso',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Maya Dewi',
                'nim' => '20104004',
                'universitas' => 'Universitas Lampung',
                'jurusan' => 'Desain Komunikasi Visual',
                'email' => 'maya.dewi@example.com',
                'telepon' => '08456789012',
                'tanggal_daftar' => Carbon::create(2025, 6, 10),
                'tanggal_mulai' => Carbon::create(2025, 7, 10),
                'tanggal_selesai' => Carbon::create(2025, 9, 10),
                'status' => 'Ditolak',
                'bidang_id' => 4,
                'motivasi' => 'Passion dalam bidang desain dan user experience untuk aplikasi pemerintahan',
                'linkedin' => 'https://linkedin.com/in/maya-dewi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Rentra Wijaya',
                'nim' => '19104005',
                'universitas' => 'Institut Teknologi Sumatera',
                'jurusan' => 'Teknik Informatika',
                'email' => 'rentra.wijaya@example.com',
                'telepon' => '08567890123',
                'tanggal_daftar' => Carbon::create(2025, 5, 15),
                'tanggal_mulai' => Carbon::create(2025, 6, 15),
                'tanggal_selesai' => Carbon::create(2025, 8, 15),
                'status' => 'Sedang Magang',
                'bidang_id' => 4,
                'motivasi' => 'Ingin belajar analisis data untuk smart city dan digitalisasi pemerintahan',
                'linkedin' => 'https://linkedin.com/in/rentra-wijaya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Dinda Permata',
                'nim' => '20104006',
                'universitas' => 'Universitas Technokrat Indonesia',
                'jurusan' => 'Informatika',
                'email' => 'dinda.permata@example.com',
                'telepon' => '08678901234',
                'tanggal_daftar' => Carbon::create(2025, 6, 15),
                'tanggal_mulai' => Carbon::create(2025, 7, 20),
                'tanggal_selesai' => Carbon::create(2025, 9, 20),
                'status' => 'Sedang Diproses',
                'bidang_id' => 4,
                'motivasi' => 'Ingin mengembangkan aplikasi mobile untuk pelayanan publik',
                'linkedin' => 'https://linkedin.com/in/dinda-permata',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Fajar Ramadhan',
                'nim' => '19104007',
                'universitas' => 'Universitas Lampung',
                'jurusan' => 'Teknik Elektro',
                'email' => 'fajar.ramadhan@example.com',
                'telepon' => '08789012345',
                'tanggal_daftar' => Carbon::create(2025, 6, 20),
                'tanggal_mulai' => Carbon::create(2025, 8, 1),
                'tanggal_selesai' => Carbon::create(2025, 9, 30),
                'status' => 'Diterima',
                'bidang_id' => 4,
                'motivasi' => 'Tertarik dengan cybersecurity untuk melindungi infrastruktur digital pemerintah',
                'linkedin' => 'https://linkedin.com/in/fajar-ramadhan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($mahasiswas as $mahasiswa) {
            User::create($mahasiswa);
        }
    }
}
