<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    //
    protected $table = 'main_loan_table';
    protected $fillable = [
        'loan_id',
        'borrower_id',
        'loan_amount',
        'interest_rate',
        'loan_term',
        'date_applied',
        'date_approved',
        'date_disbursed',
        'outstanding_balance',
        'image_path' // Add this line
    ];
}
