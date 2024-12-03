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
        Schema::create('loan_table', function (Blueprint $table) {
            $table->id('loan_type_id');
            $table->string('loan_type_name');
            $table->text('description')->nullable();
            $table->string('image_path')->nullable(); // Add this line
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_table');
    }
};
