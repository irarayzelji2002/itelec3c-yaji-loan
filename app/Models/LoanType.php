<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Loan;

class LoanType extends Model
{
    protected $table = 'loan_types';
    protected $primaryKey = 'loan_type_id';
    protected $fillable = [
        'loan_type_name',
        'description',
        'image_path',
        'min_loan_amount',
        'max_loan_amount',
        'default_interest_rate',
        'default_loan_term_unit',
        'default_loan_term_period',
        'is_amortized',
        'status'
    ];

    protected $casts = [
        'max_loan_amount' => 'decimal:2',
        'default_interest_rate' => 'decimal:2',
        'is_amortized' => 'boolean',
        'status' => 'string'
    ];

    public function loans()
    {
        return $this->hasMany(Loan::class, 'loan_type_id');
    }
}
