<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * NOTE: This seeder is disabled by default.
     * Only real user registrations will be used.
     */
    public function run(): void
    {
        // No dummy data - only use real user registrations
        // All data will come from actual user submissions through the registration form
    }
}
