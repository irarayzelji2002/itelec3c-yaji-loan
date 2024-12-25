<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::rename('main_loan_table', 'loans');
        Schema::rename('loan_table', 'loan_types');
        Schema::rename('payment_table', 'payments');

    }
    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::rename('loans', 'main_loan_table');
        Schema::rename('loan_types', 'loan_table');
        Schema::rename('payments', 'payment_table');

    }
};
