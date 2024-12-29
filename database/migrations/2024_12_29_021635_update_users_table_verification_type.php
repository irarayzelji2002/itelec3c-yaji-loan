<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // First drop the verification_type column to recreate as FK
            $table->dropColumn('verification_type');

            // Add verification_type_id as FK, referencing verification_type_id instead of id
            $table->foreignId('verification_type_id')
                ->nullable()
                ->references('verification_type_id')  // Change this line
                ->on('verification_types')           // Add this line
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['verification_type_id']);
            $table->dropColumn('verification_type_id');
            $table->string('verification_type')->nullable();
        });
    }
};
