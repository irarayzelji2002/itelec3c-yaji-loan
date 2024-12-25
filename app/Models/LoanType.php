<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanType extends Model
{

    protected $table = 'loan_table';
    protected $fillable = [
        'loan_type_name',
        'description',
        'image_path'
    ];
}
