<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\User;
use app\Models\LoanType;
use app\Models\LoanStatusHistory;
use app\Models\LoanFile;

class Loan extends Model
{
    protected $table = 'loans';
    protected $primaryKey = 'loan_id';
    protected $fillable = [
        'borrower_id',
        'loan_type_id',
        'loan_amount',
        'interest_rate',
        'loan_term_period',
        'loan_term_unit',
        'purpose',
        'purpose_details',
        'date_applied',
        'date_status_changed',
        'date_disbursed',
        'outstanding_balance',
        'payment_status',
        'approved_by',
        'disbursed_by',
    ];

    protected $casts = [
        'date_applied' => 'datetime',
        'date_status_changed' => 'datetime',
        'date_disbursed' => 'datetime',
        'payment_status' => 'string'
    ];

    public function borrower()
    {
        return $this->belongsTo(User::class, 'borrower_id', 'user_id');
    }

    public function loanType()
    {
        return $this->belongsTo(LoanType::class, 'loan_type_id');
    }

    public function approvedByUser()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function disbursedByUser()
    {
        return $this->belongsTo(User::class, 'disbursed_by');
    }

    public function statusHistory()
    {
        return $this->hasMany(LoanStatusHistory::class, 'loan_id');
    }

    public function files()
    {
        return $this->hasMany(LoanFile::class, 'loan_id');
    }
}
