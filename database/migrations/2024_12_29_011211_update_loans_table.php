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
        Schema::table('loans', function (Blueprint $table) {
            // Rename existing columns
            $table->renameColumn('loan_term', 'loan_term_period');
            $table->renameColumn('date_approved', 'date_status_changed');

            // Add new columns
            $table->string('loan_term_unit')->default('months')->after('loan_term_period');
            $table->foreignId('loan_type_id')
                ->references('loan_type_id')
                ->on('loan_types')
                ->onDelete('restrict')
                ->onUpdate('cascade')
                ->after('borrower_id');
            $table->enum('payment_status', ['paid', 'unpaid', 'partially_paid'])->default('unpaid');
            $table->foreignId('approved_by')
                ->nullable()
                ->references('user_id')
                ->on('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
            $table->foreignId('disbursed_by')
                ->nullable()
                ->references('user_id')
                ->on('users')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            // Rename columns back to their original names
            $table->renameColumn('loan_term_period', 'loan_term');
            $table->renameColumn('date_status_changed', 'date_approved');

            // Drop newly added columns
            $table->dropColumn('loan_term_unit');
            $table->dropForeign(['loan_type_id']); // Drop foreign key for loan_type_id
            $table->dropColumn('loan_type_id');
            $table->dropColumn('payment_status');
            $table->dropForeign(['approved_by']); // Drop foreign key for approved_by
            $table->dropColumn('approved_by');
            $table->dropForeign(['disbursed_by']); // Drop foreign key for disbursed_by
            $table->dropColumn('disbursed_by');
        });
    }
};
