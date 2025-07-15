<?php

namespace Database\Factories;

use App\Models\Bidang;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 * NOTE: This factory is disabled to ensure only real user data is used.
 * All data should come from actual user registrations through the form.
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     * NOTE: This factory is disabled to prevent dummy data generation.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Factory disabled - only use real user registrations
        return [];
    }
}
