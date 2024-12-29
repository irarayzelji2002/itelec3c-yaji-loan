<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanType extends Model
{
    protected $table = 'loan_types';
    protected $primaryKey = 'loan_type_id';
    protected $fillable = [
        'loan_type_name',
        'description',
        'image_path'
    ];
}
