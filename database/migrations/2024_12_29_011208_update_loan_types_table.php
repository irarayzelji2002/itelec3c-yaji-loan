<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('loan_types', function (Blueprint $table) {
            $table->decimal('max_loan_amount', 15, 2);
            $table->decimal('default_interest_rate', 5, 2);
            $table->string('default_loan_term_unit')->default('months');
            $table->integer('default_loan_term_period');
            $table->boolean('is_amortized')->default(true);
            $table->enum('status', ['active', 'inactive'])->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_types', function (Blueprint $table) {
            // Drop newly added columns
            $table->dropColumn('max_loan_amount');
            $table->dropColumn('default_interest_rate');
            $table->dropColumn('default_loan_term_unit');
            $table->dropColumn('default_loan_term_period');
            $table->dropColumn('is_amortized');
            $table->dropColumn('status');
        });
    }
};
