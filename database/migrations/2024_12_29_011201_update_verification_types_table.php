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
        Schema::table('verification_types', function (Blueprint $table) {
            // Rename existing column
            $table->renameColumn('id', 'verification_type_id');

            // Add new columns
            $table->enum('status', ['active', 'inactive'])->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('verification_types', function (Blueprint $table) {
            // Rename column back to its original name
            $table->renameColumn('verification_type_id', 'id');

            // Drop newly added column
            $table->dropColumn('status');
        });
    }
};
