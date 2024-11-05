<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $employeeRole = Role::create(['name' => 'employee']);
        $memberRole = Role::create(['name' => 'member']);

        // Create an admin user
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@yaji.com',
            'password' => bcrypt('admin123'),
            'contact_information' => '09123456789',
            'address' => 'Manila, Philippines',
        ]);
        $adminUser->assignRole($adminRole);

        // Create an employee user
        $employeeUser = User::factory()->create([
            'name' => 'Employee User',
            'email' => 'employee@yaji.com',
            'password' => bcrypt('admin123'),
            'contact_information' => '09999999999',
            'address' => 'Bulacan, Philippines',
        ]);
        $employeeUser->assignRole($employeeRole);

        // Create a member user
        $memberUser = User::factory()->create([
            'name' => 'Member User',
            'email' => 'member@yaji.com',
            'password' => bcrypt('admin123'),
            'contact_information' => '09888888888',
            'address' => 'Makati, Philippines',
        ]);
        $memberUser->assignRole($memberRole);
    }
}
