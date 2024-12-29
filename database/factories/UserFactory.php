<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Basic Information
            'first_name' => fake()->firstName(),
            'middle_name' => null,
            'last_name' => fake()->lastName(),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'birth_date' => fake()->date(),
            'nationality' => 'Filipino',

            // Contact Information
            'phone_number' => fake()->numerify('09#########'),
            'email' => fake()->unique()->safeEmail(),
            'street' => fake()->streetAddress(),
            'barangay' => 'test',
            'city' => fake()->city(),
            'province' => fake()->state(),

            // Verification
            'verification_type_id' => null,
            'id_photo_front' => null,
            'id_photo_back' => null,
            'id_file' => null,
            'selfie_photo' => null,

            // Account Creation
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'security_question_1' => 'What is your mother\'s maiden name?',
            'security_answer_1' => 'test',
            'security_question_2' => 'What was your first pet\'s name?',
            'security_answer_2' => 'test',
            'role' => null,
            'verification_status' => 'pending',
            'profile_picture' => null,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
