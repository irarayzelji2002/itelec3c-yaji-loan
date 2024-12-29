<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerificationType extends Model
{
    protected $primaryKey = 'verification_type_id';
    protected $fillable = [
        'valid_id',
        'issuer',
        'order',
        'has_front',
        'has_back',
        'is_pdf',
        'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'verification_type_id');
    }
}
