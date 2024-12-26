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
        Schema::create('verification_types', function (Blueprint $table) {
            $table->id();
            $table->string('valid_id');
            $table->string('issuer')->nullable();
            $table->integer('order');
            $table->boolean('has_front')->default(true);  // Most IDs have a front by default
            $table->boolean('has_back')->default(true);   // Most IDs have a back by default
            $table->boolean('is_pdf')->default(false); // Most IDs don't have multiple pages by default
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verification_types');
    }
};
