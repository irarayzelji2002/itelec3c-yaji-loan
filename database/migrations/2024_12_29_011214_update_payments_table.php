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
        Schema::table('payments', function (Blueprint $table) {
            // Rename existing column
            $table->renameColumn('image_path', 'proof_of_payment');

            // Add new columns
            $table->string('payment_method');
            $table->string('payment_reference')->nullable();
            $table->boolean('is_confirmed')->default(false);
            $table->foreignId('confirmed_by')->nullable()->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Rename column back to its original name
            $table->renameColumn('proof_of_payment', 'image_path');

            // Drop newly added columns
            $table->dropColumn('payment_method');
            $table->dropColumn('payment_reference');
            $table->dropColumn('is_confirmed');
            $table->dropForeign(['confirmed_by']); // Drop foreign key for confirmed_by
            $table->dropColumn('confirmed_by');
        });
    }
};
