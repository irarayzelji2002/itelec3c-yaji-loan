<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\Loan_Model;
use App\Models\payment_model;
use App\Models\Loan;

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

        // Create loan types
        Loan_Model::create([
            'loan_type_name' => 'Personal Loan',
            'description' => 'A loan for personal use.',
            'image_path' => 'images/loan_type1.jpg'
        ]);

        Loan_Model::create([
            'loan_type_name' => 'Home Loan',
            'description' => 'A loan for home purchase.',
            'image_path' => 'images/loan_type2.jpg'
        ]);

        Loan_Model::create([
            'loan_type_name' => 'Car Loan',
            'description' => 'A loan for car purchase.',
            'image_path' => 'images/loan_type3.jpg'
        ]);

        Loan_Model::create([
            'loan_type_name' => 'Education Loan',
            'description' => 'A loan for education purposes.',
            'image_path' => 'images/loan_type4.jpg'
        ]);

        Loan_Model::create([
            'loan_type_name' => 'Business Loan',
            'description' => 'A loan for business purposes.',
            'image_path' => 'images/loan_type5.jpg'
        ]);

        // Create payments
        payment_model::create([
            'loan_id' => 1,
            'payment_amount' => 5000,
            'payment_date' => '2021-12-01',
            'image_path' => 'images/payment1.jpg'
        ]);
        payment_model::create([
            'loan_id' => 2,
            'payment_amount' => 6000,
            'payment_date' => '2021-12-02',
            'image_path' => 'images/payment2.jpg'
        ]);
        payment_model::create([
            'loan_id' => 3,
            'payment_amount' => 7000,
            'payment_date' => '2021-12-03',
            'image_path' => 'images/payment3.jpg'
        ]);
        payment_model::create([
            'loan_id' => 4,
            'payment_amount' => 8000,
            'payment_date' => '2021-12-04',
            'image_path' => 'images/payment4.jpg'
        ]);
        payment_model::create([
            'loan_id' => 5,
            'payment_amount' => 9000,
            'payment_date' => '2021-12-05',
            'image_path' => 'images/payment5.jpg'
        ]);

        // Create loans
        Loan::create([
            'borrower_id' => 1,
            'loan_amount' => 10000,
            'interest_rate' => 0.1,
            'loan_term' => 12,
            'date_applied' => '2021-11-01',
            'date_approved' => '2021-11-05',
            'date_disbursed' => '2021-11-10',
            'outstanding_balance' => 9000,
            'image_path' => 'images/loan1.jpg'
        ]);
        Loan::create([
            'borrower_id' => 2,
            'loan_amount' => 20000,
            'interest_rate' => 0.15,
            'loan_term' => 24,
            'date_applied' => '2021-11-02',
            'date_approved' => '2021-11-06',
            'date_disbursed' => '2021-11-11',
            'outstanding_balance' => 18000,
            'image_path' => 'images/loan2.jpg'
        ]);
        Loan::create([
            'borrower_id' => 3,
            'loan_amount' => 30000,
            'interest_rate' => 0.2,
            'loan_term' => 36,
            'date_applied' => '2021-11-03',
            'date_approved' => '2021-11-07',
            'date_disbursed' => '2021-11-12',
            'outstanding_balance' => 27000,
            'image_path' => 'images/loan3.jpg'
        ]);
        Loan::create([
            'borrower_id' => 4,
            'loan_amount' => 40000,
            'interest_rate' => 0.25,
            'loan_term' => 48,
            'date_applied' => '2021-11-04',
            'date_approved' => '2021-11-08',
            'date_disbursed' => '2021-11-13',
            'outstanding_balance' => 36000,
            'image_path' => 'images/loan4.jpg'
        ]);
        Loan::create([
            'borrower_id' => 5,
            'loan_amount' => 50000,
            'interest_rate' => 0.3,
            'loan_term' => 60,
            'date_applied' => '2021-11-05',
            'date_approved' => '2021-11-09',
            'date_disbursed' => '2021-11-14',
            'outstanding_balance' => 45000,
            'image_path' => 'images/loan5.jpg'
        ]);
    }
}
