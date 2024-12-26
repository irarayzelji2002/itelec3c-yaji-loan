<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VerificationType extends Model
{
    protected $fillable = ['valid_id', 'issuer', 'order', 'has_front', 'has_back', 'is_pdf'];
}
