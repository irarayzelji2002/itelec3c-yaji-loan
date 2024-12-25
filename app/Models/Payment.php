<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{

    protected $table = 'payment_table';
    protected $fillable = [
        'loan_id',
        'payment_amount',
        'payment_date',
        'image_path'
    ];
}
