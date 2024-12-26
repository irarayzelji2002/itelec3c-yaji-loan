<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
        protected $fillable = [

        // Basic Information
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'birth_date',
        'nationality',

        // Contact Information
        'phone_number',
        'email',
        'street',
        'barangay',
        'city',
        'province',

        // Verification
        'verification_type',
        'id_photo_front',
        'id_photo_back',
        'id_file',
        'selfie_photo',

        // Account Creation
        'password',
        'security_question_1',
        'security_answer_1',
        'security_question_2',
        'security_answer_2',
        'role',
        'verification_status',
        'profile_picture'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
        ];
    }

    protected $appends = [
        'full_name',
        'full_address',
        'role_name',
    ];

    // Get full name accessor
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }

    // Get full address accessor
    public function getFullAddressAttribute()
    {
        return "{$this->street}, Brgy. {$this->barangay}, {$this->city}, {$this->province}";
    }

    // Get role name accessor
    public function getRoleNameAttribute()
    {
        return $this->roles->first()->name ?? 'No Role';
    }

    // Hash the password when creating a user
    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (!isset($user->password) || empty($user->password)) {
                // Set a default password if none is provided
                $user->password = bcrypt('admin123');
            }
        });
    }
}
