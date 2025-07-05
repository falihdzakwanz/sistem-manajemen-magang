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
    public function run(): void
    {
        Admin::create([
            'name' => 'Admin Dinas Kominfo',
            'email' => 'admin@komdigi.com',
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);
    }
}
