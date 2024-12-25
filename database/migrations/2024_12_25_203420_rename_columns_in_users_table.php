<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'first_name');
            $table->renameColumn('contact_information', 'phone_number');
            // Drop the address column if it exists
            if (Schema::hasColumn('users', 'address')) {
                $table->dropColumn('address');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('first_name', 'name');
            $table->renameColumn('phone_number', 'contact_information');
            $table->string('address')->nullable();
        });
    }
};
