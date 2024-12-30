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
        Schema::create('loan_status_history', function (Blueprint $table) {
            $table->id('loan_status_history_id');
            $table->foreignId('loan_id')
                ->references('loan_id')
                ->on('loans')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->enum('status', ['pending', 'approved', 'disapproved', 'discontinued', 'canceled']);
            $table->foreignId('changed_by')
                ->references('user_id')
                ->on('users')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_status_history');
    }
};
