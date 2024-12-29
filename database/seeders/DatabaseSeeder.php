<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\LoanType;
use App\Models\Payment;
use App\Models\Loan;
use App\Models\LoanStatusHistory;
use App\Models\LoanFile;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call VerificationTypeSeeder
        $this->call([
            VerificationTypeSeeder::class,
        ]);

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);
        $memberRole = Role::firstOrCreate(['name' => 'member']);

        // Create an admin user
        $adminUser = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@yaji.com',
            'password' => bcrypt('admin123'),
            'gender' => 'Male',
            'birth_date' => '1990-01-01',
            'nationality' => 'Philippines',
            'phone_number' => '09123456789',
            'street' => 'Sample Street',
            'barangay' => 'Sample Barangay',
            'city' => 'Manila',
            'province' => 'Metro Manila',
            'verification_status' => 'verified'
        ]);
        $adminUser->assignRole($adminRole);

        // Create an employee user
        $employeeUser = User::factory()->create([
            'first_name' => 'Employee',
            'last_name' => 'User',
            'email' => 'employee@yaji.com',
            'password' => bcrypt('admin123'),
            'gender' => 'Male',
            'birth_date' => '1990-01-01',
            'nationality' => 'Philippines',
            'phone_number' => '09999999999',
            'street' => 'Sample Street',
            'barangay' => 'Sample Barangay',
            'city' => 'Meycauayan',
            'province' => 'Bulacan',
            'verification_status' => 'verified'
        ]);
        $employeeUser->assignRole($employeeRole);

        // Create a member user
        $memberUser = User::factory()->create([
            'first_name' => 'Member',
            'last_name' => 'User',
            'email' => 'member@yaji.com',
            'password' => bcrypt('admin123'),
            'gender' => 'Male',
            'birth_date' => '1990-01-01',
            'nationality' => 'Philippines',
            'phone_number' => '09888888888',
            'street' => 'Sample Street',
            'barangay' => 'Sample Barangay',
            'city' => 'Makati',
            'province' => 'Metro Manila',
            'verification_status' => 'verified'
        ]);
        $memberUser->assignRole($memberRole);

        // Create loan types
        $loanTypes = [
            [
                'loan_type_name' => 'Personal Loan',
                'description' => 'A loan for personal use.',
                'image_path' => 'images/loan_type1.jpg',
                'max_loan_amount' => 50000,
                'default_interest_rate' => 12.00,
                'default_loan_term_period' => 12,
                'default_loan_term_unit' => 'months',
                'is_amortized' => true,
                'status' => 'active'
            ],
            [
                'loan_type_name' => 'Home Loan',
                'description' => 'A loan for home purchase.',
                'image_path' => 'images/loan_type2.jpg',
                'max_loan_amount' => 500000,
                'default_interest_rate' => 10.00,
                'default_loan_term_period' => 36,
                'default_loan_term_unit' => 'months',
                'is_amortized' => true,
                'status' => 'active'
            ],
            [
                'loan_type_name' => 'Car Loan',
                'description' => 'A loan for car purchase.',
                'image_path' => 'images/loan_type3.jpg',
                'max_loan_amount' => 300000,
                'default_interest_rate' => 8.00,
                'default_loan_term_period' => 24,
                'default_loan_term_unit' => 'months',
                'is_amortized' => true,
                'status' => 'active'
            ],
            [
                'loan_type_name' => 'Education Loan',
                'description' => 'A loan for education purposes.',
                'image_path' => 'images/loan_type4.jpg',
                'max_loan_amount' => 200000,
                'default_interest_rate' => 7.00,
                'default_loan_term_period' => 48,
                'default_loan_term_unit' => 'months',
                'is_amortized' => true,
                'status' => 'active'
            ],
            [
                'loan_type_name' => 'Business Loan',
                'description' => 'A loan for business purposes.',
                'image_path' => 'images/loan_type5.jpg',
                'max_loan_amount' => 1000000,
                'default_interest_rate' => 15.00,
                'default_loan_term_period' => 60,
                'default_loan_term_unit' => 'months',
                'is_amortized' => true,
                'status' => 'active'
            ],
            [
                'loan_type_name' => 'Short-term Business Loan',
                'description' => 'A non-amortized short-term loan for business purposes with lump sum payment.',
                'image_path' => 'images/loan_type6.jpg',
                'max_loan_amount' => 100000,
                'default_interest_rate' => 18.00,
                'default_loan_term_period' => 6,
                'default_loan_term_unit' => 'months',
                'is_amortized' => false,
                'status' => 'active'
            ]
        ];

        foreach ($loanTypes as $loanType) {
            LoanType::create($loanType);
        }

        // Create loans
        $loans = [
            [
                'borrower_id' => $memberUser->user_id,
                'loan_type_id' => 1,
                'loan_amount' => 20000,
                'interest_rate' => 12.00,
                'loan_term_period' => 12,
                'loan_term_unit' => 'months',
                'date_applied' => now(),
                'date_status_changed' => now(),
                'outstanding_balance' => 20000,
                'payment_status' => 'unpaid',
            ]
        ];

        foreach ($loans as $loan) {
            $createdLoan = Loan::create($loan);

            // Create loan status history
            LoanStatusHistory::create([
                'loan_id' => $createdLoan->loan_id,
                'status' => 'pending',
                'changed_by' => $employeeUser->user_id,
                'remarks' => 'Initial loan application'
            ]);

            // Create loan files
            LoanFile::create([
                'loan_id' => $createdLoan->loan_id,
                'file_type' => 'application_form',
                'file_path' => 'files/loan1_application.pdf',
                'uploaded_by' => $memberUser->user_id
            ]);
        }

        // Create payments
        $payments = [
            [
                'loan_id' => 1,
                'payment_amount' => 2000,
                'payment_date' => now(),
                'proof_of_payment' => 'images/payment1.jpg',
                'payment_method' => 'bank_transfer',
                'payment_reference' => 'REF123456',
                'is_confirmed' => false
            ]
        ];

        foreach ($payments as $payment) {
            Payment::create($payment);
        }
    }
}
