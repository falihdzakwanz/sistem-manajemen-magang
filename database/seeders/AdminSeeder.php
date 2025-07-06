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
        ['email' => 'admin@komdigi.com'],
        [
            'name' => 'Admin Dinas Kominfo',
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]
    );
}
}
