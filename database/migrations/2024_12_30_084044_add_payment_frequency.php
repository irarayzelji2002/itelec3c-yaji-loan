<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('loan_types', function (Blueprint $table) {
            $table->enum('default_payment_frequency', ['daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'semi-annually', 'annually', 'lump-sum'])
                  ->default('monthly')
                  ->after('loan_type_name');
        });

        Schema::table('loans', function (Blueprint $table) {
            $table->enum('payment_frequency', ['daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'semi-annually', 'annually', 'lump-sum'])
                  ->default('monthly')
                  ->after('loan_type_id');
        });

        // daily         - Payments made every day
        // weekly        - Payments made once a week
        // bi-weekly     - Payments made every two weeks
        // monthly       - Payments made once a month
        // quarterly     - Payments made every 3 months
        // semi-annually - Payments made every 6 months
        // annually      - Payments made once a year
        // lump-sum'     - Single payment at the end of the term
    }

    public function down(): void
    {
        Schema::table('loan_types', function (Blueprint $table) {
            $table->dropColumn('default_payment_frequency');
        });

        Schema::table('loans', function (Blueprint $table) {
            $table->dropColumn('payment_frequency');
        });
    }
};
