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
        Schema::create('payment_table', function (Blueprint $table) {
            $table->id('payment_id');
            $table->unsignedBigInteger('loan_id');
            $table->decimal('payment_amount', 8, 2);
            $table->date('payment_date');
            $table->string('image_path')->nullable(); // Add this line
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_table');
    }
};
