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
        Schema::create('main_loan_table', function (Blueprint $table) {
            $table->id('loan_id');
            $table->unsignedBigInteger('borrower_id');
            $table->decimal('loan_amount', 15, 2);
            $table->decimal('interest_rate', 5, 2);
            $table->integer('loan_term');
            $table->date('date_applied');
            $table->date('date_approved')->nullable();
            $table->date('date_disbursed')->nullable();
            $table->decimal('outstanding_balance', 15, 2);
            $table->string('image_path')->nullable(); // Add this line
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_loan_table');
    }
};
