<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $table = 'loans';
    protected $primaryKey = 'loan_id';
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
    public function borrower()
    {
        return $this->belongsTo(User::class, 'borrower_id', 'user_id');
    }
}
