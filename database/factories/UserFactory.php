<?php

namespace Database\Factories;

use App\Models\Bidang;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tanggalDaftar = fake()->dateTimeBetween('-3 months', 'now');
        $tanggalMulai = fake()->dateTimeBetween($tanggalDaftar, '+1 month');
        $tanggalSelesai = (clone $tanggalMulai)->modify('+2 months');

        return [
            'nama' => fake()->name(),
            'nim' => fake()->unique()->numerify('########'),
            'universitas' => fake()->randomElement([
                'Universitas Lampung',
                'Universitas Teknokrat Indonesia',
                'Institut Teknologi Sumatera',
                'Universitas Malahayati',
                'Universitas Bandar Lampung'
            ]),
            'jurusan' => fake()->randomElement([
                'Teknik Informatika',
                'Sistem Informasi',
                'Teknik Komputer',
                'Manajemen Informatika',
                'Ilmu Komputer'
            ]),
            'email' => fake()->unique()->safeEmail(),
            'telepon' => fake()->phoneNumber(),
            'tanggal_daftar' => $tanggalDaftar,
            'tanggal_mulai' => $tanggalMulai,
            'tanggal_selesai' => $tanggalSelesai,
            'status' => fake()->randomElement(['Sedang Diproses', 'Diterima', 'Ditolak']),
            'bidang_id' => Bidang::factory(),
            'motivasi' => fake()->paragraph(3),
            'linkedin' => 'https://linkedin.com/in/' . fake()->userName(),
            'surat_pengantar' => 'storage/surat/' . fake()->word() . '.pdf',
            'cv' => 'storage/cv/' . fake()->word() . '.pdf',
        ];
    }
}
