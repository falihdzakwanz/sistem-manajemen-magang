<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Admin::updateOrCreate(
            ['email' => 'fadhilzarani@gmail.com'],
            [
                'name' => 'Admin Itera',
                'username' => 'adminitera',
                'password' => Hash::make('admin88@@'),
                'email_verified_at' => now(),
            ]
        );
        Admin::updateOrCreate(
            ['email' => 'kominfokotabalam@gmail.com'],
            [
                'name' => 'Admin Kota Bandar Lampung',
                'username' => 'kominfo',
                'password' => Hash::make('kominfo104'),
                'email_verified_at' => now(),
            ]
        );
    }
}
