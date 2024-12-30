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
        Schema::create('loan_files', function (Blueprint $table) {
            $table->id('loan_file_id');
            $table->foreignId('loan_id')
                ->references('loan_id')
                ->on('loans')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('file_type');
            $table->string('file_path');
            $table->foreignId('uploaded_by')
                ->references('user_id')
                ->on('users')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_files');
    }
};
