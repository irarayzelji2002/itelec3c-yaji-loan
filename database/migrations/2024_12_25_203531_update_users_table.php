<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Basic Information
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('gender')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('nationality')->nullable();

            // Contact Information
            $table->string('street')->nullable();
            $table->string('barangay')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();

            // Verification
            $table->string('verification_type')->nullable();
            $table->string('id_photo_front')->nullable();
            $table->string('id_photo_back')->nullable();
            $table->string('id_file')->nullable();
            $table->string('selfie_photo')->nullable();

            // Account Creation
            $table->string('security_question_1')->nullable();
            $table->string('security_answer_1')->nullable();
            $table->string('security_question_2')->nullable();
            $table->string('security_answer_2')->nullable();
            $table->string('role')->nullable();
            $table->string('verification_status')->default('pending');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'middle_name',
                'last_name',
                'gender',
                'birth_date',
                'nationality',
                'street',
                'barangay',
                'city',
                'province',
                'verification_type',
                'id_photo_front',
                'id_photo_back',
                'id_file',
                'selfie_photo',
                'security_question_1',
                'security_answer_1',
                'security_question_2',
                'security_answer_2',
                'role',
                'verification_status'
            ]);
        });
    }
};
