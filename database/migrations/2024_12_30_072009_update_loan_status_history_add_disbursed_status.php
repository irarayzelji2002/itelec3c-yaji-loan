<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, modify the enum to include the new status
        DB::statement("ALTER TABLE loan_status_history MODIFY COLUMN status ENUM('pending', 'approved', 'disbursed', 'completed', 'disapproved', 'discontinued', 'canceled')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    // Include all possible values to prevent data truncation
    DB::statement("ALTER TABLE loan_status_history MODIFY COLUMN status ENUM('pending', 'approved', 'disapproved', 'discontinued', 'canceled', 'disbursed', 'completed')");
}
};
