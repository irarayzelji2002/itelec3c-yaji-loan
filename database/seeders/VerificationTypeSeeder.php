<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\VerificationType;

class VerificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['valid_id' => 'Philippine Passport', 'issuer' => 'Department of Foreign Affairs (DFA)', 'order' => 1, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'National ID (PhilID)', 'issuer' => 'Philippine Identification System (PhilSys)', 'order' => 2, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'SSS ID or SSS UMID Card', 'issuer' => 'Social Security System (SSS)', 'order' => 3, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'GSIS ID or GSIS UMID Card', 'issuer' => 'Government Service Insurance System (GSIS)', 'order' => 4, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Driver\'s License', 'issuer' => 'Land Transportation Office (LTO)', 'order' => 5, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'PRC ID', 'issuer' => 'Professional Regulatory Commission (PRC)', 'order' => 6, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'OWWA ID', 'issuer' => 'Overseas Workers Welfare Administration (OWWA)', 'order' => 7, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'IDOLE Card', 'issuer' => 'Department of Labor and Employment (IDOLE)', 'order' => 8, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Voter\'s ID', 'issuer' => 'Commission on Elections (COMELEC)', 'order' => 9, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Voter\'s Certification', 'issuer' => 'Office of the Election Officer', 'order' => 10, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Firearms License', 'issuer' => 'Philippine National Police (PNP)', 'order' => 11, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Senior Citizen ID', 'issuer' => 'Local Government Unit (LGU)', 'order' => 12, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Persons with Disabilities (PWD) ID', 'issuer' => 'Local Government Unit (LGU)', 'order' => 13, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'NBI Clearance', 'issuer' => 'National Bureau of Investigation (NBI)', 'order' => 14, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Alien Certification of Registration', 'issuer' => 'Bureau of Immigration (BI)', 'order' => 15, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'PhilHealth ID', 'issuer' => 'Philippine Health Insurance Corporation (PhilHealth)', 'order' => 16, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Government Office and GOCC ID', 'issuer' => 'Government-Owned and Controlled Corporations (GOCC)', 'order' => 17, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Integrated Bar of the Philippines ID', 'issuer' => 'Integrated Bar of the Philippines (IBP)', 'order' => 18, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'School ID', 'issuer' => 'Current School or University', 'order' => 19, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'TIN ID', 'issuer' => 'Bureau of Internal Revenue (BIR)', 'order' => 20, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Postal ID', 'issuer' => 'Philippine Postal Corporation (PHLPost)', 'order' => 21, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Barangay Certification', 'issuer' => 'Respective Barangay', 'order' => 22, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'GSIS e-Card', 'issuer' => 'Government Service Insurance System (GSIS)', 'order' => 23, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Seaman\'s Book', 'issuer' => 'Maritime Industry Authority (MARINA)', 'order' => 24, 'has_front' => true, 'has_back' => true, 'is_pdf' => true, 'status' => 'active'],
            ['valid_id' => 'NCWDP Certification', 'issuer' => 'National Council for the Welfare of Disabled Persons (NCWDP)', 'order' => 25, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'DSWD Certification', 'issuer' => 'Department of Social Welfare and Development (DSWD)', 'order' => 26, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Company ID', 'issuer' => 'Private Entities or Institutions', 'order' => 27, 'has_front' => true, 'has_back' => true, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Police Clearance', 'issuer' => 'Respective Police Station', 'order' => 28, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Barangay Clearance', 'issuer' => 'Respective Barangay', 'order' => 29, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Cedula', 'issuer' => 'Cities or Municipalities', 'order' => 30, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'Government Service Record', 'issuer' => 'Local Government Unit (LGU)', 'order' => 31, 'has_front' => true, 'has_back' => false, 'is_pdf' => true, 'status' => 'active'],
            ['valid_id' => 'Form 137', 'issuer' => 'School', 'order' => 32, 'has_front' => true, 'has_back' => false, 'is_pdf' => true, 'status' => 'active'],
            ['valid_id' => 'Transcript of Records', 'issuer' => 'University or College', 'order' => 33, 'has_front' => true, 'has_back' => false, 'is_pdf' => true, 'status' => 'active'],
            ['valid_id' => 'Land Title', 'issuer' => 'Land Registration Authority (LRA)', 'order' => 34, 'has_front' => true, 'has_back' => false, 'is_pdf' => true, 'status' => 'active'],
            ['valid_id' => 'PSA Marriage Contract', 'issuer' => 'Philippine Statistics Authority (PSA)', 'order' => 35, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active'],
            ['valid_id' => 'PSA Birth Certificate', 'issuer' => 'Philippine Statistics Authority (PSA)', 'order' => 36, 'has_front' => true, 'has_back' => false, 'is_pdf' => false, 'status' => 'active']
        ];

        foreach ($types as $type) {
            DB::table('verification_types')->insert($type);
        }
    }
}


        $types = [
            ['valid_id' => 'Philippine Passport', 'issuer' => 'Department of Foreign Affairs (DFA)', 'order' => 1],
            ['valid_id' => 'National ID (PhilID)', 'issuer' => 'Philippine Identification System (PhilSys)', 'order' => 2],
            ['valid_id' => 'SSS ID or SSS UMID Card', 'issuer' => 'Social Security System (SSS)', 'order' => 3],
            ['valid_id' => 'GSIS ID or GSIS UMID Card', 'issuer' => 'Government Service Insurance System (GSIS)', 'order' => 4],
            ['valid_id' => 'Driver\'s License', 'issuer' => 'Land Transportation Office (LTO)', 'order' => 5],
            ['valid_id' => 'PRC ID', 'issuer' => 'Professional Regulatory Commission (PRC)', 'order' => 6],
            ['valid_id' => 'OWWA ID', 'issuer' => 'Overseas Workers Welfare Administration (OWWA)', 'order' => 7],
            ['valid_id' => 'IDOLE Card', 'issuer' => 'Department of Labor and Employment (IDOLE)', 'order' => 8],
            ['valid_id' => 'Voter\'s ID', 'issuer' => 'Commission on Elections (COMELEC)', 'order' => 9],
            ['valid_id' => 'Voter\'s Certification', 'issuer' => 'Office of the Election Officer', 'order' => 10],
            ['valid_id' => 'Firearms License', 'issuer' => 'Philippine National Police (PNP)', 'order' => 11],
            ['valid_id' => 'Senior Citizen ID', 'issuer' => 'Local Government Unit (LGU)', 'order' => 12],
            ['valid_id' => 'Persons with Disabilities (PWD) ID', 'issuer' => 'Local Government Unit (LGU)', 'order' => 13],
            ['valid_id' => 'NBI Clearance', 'issuer' => 'National Bureau of Investigation (NBI)', 'order' => 14],
            ['valid_id' => 'Alien Certification of Registration', 'issuer' => 'Bureau of Immigration (BI)', 'order' => 15],
            ['valid_id' => 'PhilHealth ID', 'issuer' => 'Philippine Health Insurance Corporation (PhilHealth)', 'order' => 16],
            ['valid_id' => 'Government Office and GOCC ID', 'issuer' => 'Government-Owned and Controlled Corporations (GOCC)', 'order' => 17],
            ['valid_id' => 'Integrated Bar of the Philippines ID', 'issuer' => 'Integrated Bar of the Philippines (IBP)', 'order' => 18],
            ['valid_id' => 'School ID', 'issuer' => 'Current School or University', 'order' => 19],
            ['valid_id' => 'TIN ID', 'issuer' => 'Bureau of Internal Revenue (BIR)', 'order' => 20],
            ['valid_id' => 'Postal ID', 'issuer' => 'Philippine Postal Corporation (PHLPost)', 'order' => 21],
            ['valid_id' => 'Barangay Certification', 'issuer' => 'Respective Barangay', 'order' => 22],
            ['valid_id' => 'GSIS e-Card', 'issuer' => 'Government Service Insurance System (GSIS)', 'order' => 23],
            ['valid_id' => 'Seaman\'s Book', 'issuer' => 'Maritime Industry Authority (MARINA)', 'order' => 24],
            ['valid_id' => 'NCWDP Certification', 'issuer' => 'National Council for the Welfare of Disabled Persons (NCWDP)', 'order' => 25],
            ['valid_id' => 'DSWD Certification', 'issuer' => 'Department of Social Welfare and Development (DSWD)', 'order' => 26],
            ['valid_id' => 'Company ID', 'issuer' => 'Private Entities or Institutions', 'order' => 27],
            ['valid_id' => 'Police Clearance', 'issuer' => 'Respective Police Station', 'order' => 28],
            ['valid_id' => 'Barangay Clearance', 'issuer' => 'Respective Barangay', 'order' => 29],
            ['valid_id' => 'Cedula', 'issuer' => 'Cities or Municipalities', 'order' => 30],
            ['valid_id' => 'Government Service Record', 'issuer' => 'Local Government Unit (LGU)', 'order' => 31],
            ['valid_id' => 'Form 137', 'issuer' => 'School', 'order' => 32],
            ['valid_id' => 'Transcript of Records', 'issuer' => 'University or College', 'order' => 33],
            ['valid_id' => 'Land Title', 'issuer' => 'Land Registration Authority (LRA)', 'order' => 34],
            ['valid_id' => 'PSA Marriage Contract', 'issuer' => 'Philippine Statistics Authority (PSA)', 'order' => 35],
            ['valid_id' => 'PSA Birth Certificate', 'issuer' => 'Philippine Statistics Authority (PSA)', 'order' => 36],
        ];

