<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LoanType;
use App\Models\LoanStatusHistory;
use App\Models\LoanFile;
use Carbon\Carbon;

class Loan extends Model
{
    protected $table = 'loans';
    protected $primaryKey = 'loan_id';
    protected $fillable = [
        'borrower_id',
        'loan_type_id',
        'loan_amount',
        'payment_frequency',
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

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function disbursedBy()
    {
        return $this->belongsTo(User::class, 'disbursed_by');
    }

    public function statusHistory()
    {
        return $this->hasMany(LoanStatusHistory::class, 'loan_id');
    }

    public function loanFiles()
    {
        return $this->hasMany(LoanFile::class, 'loan_id');
    }

    public function calculateNextDueDate()
    {
        if (!$this->date_disbursed) {
            return null;
        }

        $disbursedDate = \Carbon\Carbon::parse($this->date_disbursed);

        switch ($this->loan_term_unit) {
            case 'days':
                return $disbursedDate->addDays($this->loan_term_period);
            case 'weeks':
                return $disbursedDate->addWeeks($this->loan_term_period);
            case 'months':
                return $disbursedDate->addMonths($this->loan_term_period);
            case 'years':
                return $disbursedDate->addYears($this->loan_term_period);
            default:
                return null;
        }
    }

    public function calculateRemainingTimeBeforeNextDue()
    {
        $nextDueDate = $this->calculateNextDueDate();
        if (!$nextDueDate) {
            return null;
        }

        return now()->diffForHumans($nextDueDate, ['syntax' => true]);
    }

    public function calculatePeriodicPayment()
    {
        if (!$this->loan_amount || !$this->interest_rate || !$this->loan_term_period) {
            return null;
        }

        // Simple interest calculation
        $principal = $this->loan_amount;
        $rate = $this->interest_rate / 100; // Convert percentage to decimal
        $totalAmount = $principal * (1 + $rate);

        return $totalAmount / $this->loan_term_period;
    }

    public function calculateFinalDueDate()
    {
        if (!$this->date_disbursed) {
            return null;
        }

        $disbursedDate = \Carbon\Carbon::parse($this->date_disbursed);

        switch ($this->loan_term_unit) {
            case 'days':
                return $disbursedDate->addDays($this->loan_term_period);
            case 'weeks':
                return $disbursedDate->addWeeks($this->loan_term_period);
            case 'months':
                return $disbursedDate->addMonths($this->loan_term_period);
            case 'years':
                return $disbursedDate->addYears($this->loan_term_period);
            default:
                return null;
        }
    }

    public function calculateRemainingTimeBeforeFinalDue()
    {
        $finalDueDate = $this->calculateFinalDueDate();
        if (!$finalDueDate) {
            return null;
        }

        return now()->diffForHumans($finalDueDate, ['syntax' => true]);
    }
}
