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

        // Get the last payment date or use disbursement date if no payments yet
        $lastDueDate = $this->last_payment_date ?? Carbon::parse($this->date_disbursed);

        // For lump-sum, only return final due date
        if ($this->payment_frequency === 'lump-sum') {
            return $this->calculateFinalDueDate();
        }

        switch($this->payment_frequency) {
            case 'daily':
                return $lastDueDate->copy()->addDay();
            case 'weekly':
                return $lastDueDate->copy()->addWeek();
            case 'bi-weekly':
                return $lastDueDate->copy()->addWeeks(2);
            case 'monthly':
                return $lastDueDate->copy()->addMonth();
            case 'quarterly':
                return $lastDueDate->copy()->addMonths(3);
            case 'semi-annually':
                return $lastDueDate->copy()->addMonths(6);
            case 'annually':
                return $lastDueDate->copy()->addYear();
            default:
                return $lastDueDate->copy()->addMonth();
        }
    }

    public function calculateRemainingTimeBeforeNextDue()
    {
        $nextDueDate = $this->calculateNextDueDate();
        if (!$nextDueDate) {
            return null;
        }

        $now = Carbon::now();
        if ($now->gt($nextDueDate)) {
            return 'Past due';
        }

        return $now->diffForHumans($nextDueDate, [
            'parts' => 2,
            'join' => true,
            'syntax' => true
        ]);

    }

    public function calculatePeriodicPayment()
    {
        if (!$this->loan_amount || !$this->interest_rate || !$this->date_disbursed) {
            return null;
        }

        $principal = $this->loan_amount;
        $annualRate = $this->interest_rate / 100;
        $numberOfPayments = $this->getNumberOfPayments();

        // Return 0 if loan is fully paid
        if ($this->outstanding_balance <= 0) {
            return 0;
        }

        if ($this->loanType->is_amortized) {
            $periodicRate = $this->getPeriodicRate($annualRate);

            // Handle edge case where rate is 0
            if ($periodicRate == 0) {
                return $principal / $numberOfPayments;
            }

            // Standard amortization formula
            $periodicPayment = $principal *
                ($periodicRate * pow(1 + $periodicRate, $numberOfPayments)) /
                (pow(1 + $periodicRate, $numberOfPayments) - 1);
        } else {
            // Simple interest calculation
            $totalInterest = $principal * $annualRate;
            $totalAmount = $principal + $totalInterest;

            $periodicPayment = $this->payment_frequency === 'lump-sum'
                ? $totalAmount
                : $totalAmount / $numberOfPayments;
        }

        return round($periodicPayment, 2);
    }

    public function calculateFinalDueDate()
    {
        if (!$this->date_disbursed) {
            return null;
        }

        $disbursedDate = Carbon::parse($this->date_disbursed);

        // Convert loan term to days for consistent calculation
        $totalDays = match($this->loan_term_unit) {
            'days' => $this->loan_term_period,
            'weeks' => $this->loan_term_period * 7,
            'months' => $this->loan_term_period * 30,
            'years' => $this->loan_term_period * 365,
            default => $this->loan_term_period * 30
        };

        return $disbursedDate->copy()->addDays($totalDays);
    }

    public function calculateRemainingTimeBeforeFinalDue()
    {
        $finalDueDate = $this->calculateFinalDueDate();
        if (!$finalDueDate) {
            return null;
        }

        $now = Carbon::now();
        if ($now->gt($finalDueDate)) {
            return 'Past due';
        }

        return $now->diffForHumans($finalDueDate, [
            'parts' => 2,
            'join' => true,
            'syntax' => true
        ]);
    }

    private function getNumberOfPayments()
    {
        $termInMonths = $this->convertTermToMonths();

        switch($this->payment_frequency) {
            case 'daily':
                return $termInMonths * 30;
            case 'weekly':
                return $termInMonths * 4;
            case 'bi-weekly':
                return $termInMonths * 2;
            case 'monthly':
                return $termInMonths;
            case 'quarterly':
                return ceil($termInMonths / 3);
            case 'semi-annually':
                return ceil($termInMonths / 6);
            case 'annually':
                return ceil($termInMonths / 12);
            case 'lump-sum':
                return 1;
            default:
                return $termInMonths;
        }
    }

    private function getPeriodicRate($annualRate)
    {
        switch($this->payment_frequency) {
            case 'daily':
                return $annualRate / 365;
            case 'weekly':
                return $annualRate / 52;
            case 'bi-weekly':
                return $annualRate / 26;
            case 'monthly':
                return $annualRate / 12;
            case 'quarterly':
                return $annualRate / 4;
            case 'semi-annually':
                return $annualRate / 2;
            case 'annually':
                return $annualRate;
            case 'lump-sum':
                return $annualRate;
            default:
                return $annualRate / 12;
        }
    }

    private function convertTermToMonths()
    {
        switch($this->loan_term_unit) {
            case 'days':
                return ceil($this->loan_term_period / 30);
            case 'weeks':
                return ceil($this->loan_term_period * 7 / 30);
            case 'months':
                return $this->loan_term_period;
            case 'years':
                return $this->loan_term_period * 12;
            default:
                return $this->loan_term_period;
        }
    }

    protected function validateLoanParameters()
    {
        if ($this->loan_amount <= 0) {
            throw new \InvalidArgumentException('Loan amount must be positive');
        }
        if ($this->interest_rate < 0) {
            throw new \InvalidArgumentException('Interest rate cannot be negative');
        }
        if ($this->loan_term_period <= 0) {
            throw new \InvalidArgumentException('Loan term must be positive');
        }
    }

    public function calculateTotalInterest()
    {
        if ($this->loanType->is_amortized) {
            $totalPayments = $this->calculatePeriodicPayment() * $this->getNumberOfPayments();
            return round($totalPayments - $this->loan_amount, 2);
        } else {
            return round($this->loan_amount * ($this->interest_rate / 100), 2);
        }
    }

    public function getPaymentSchedule()
    {
        $schedule = [];
        $remainingBalance = $this->loan_amount;
        $payment = $this->calculatePeriodicPayment();
        $nextDueDate = Carbon::parse($this->date_disbursed);

        for ($i = 1; $i <= $this->getNumberOfPayments(); $i++) {
            $nextDueDate = $this->getNextPaymentDate($nextDueDate);
            $interestPayment = $remainingBalance * $this->getPeriodicRate($this->interest_rate / 100);
            $principalPayment = $payment - $interestPayment;
            $remainingBalance -= $principalPayment;

            $schedule[] = [
                'payment_number' => $i,
                'due_date' => $nextDueDate,
                'payment_amount' => round($payment, 2),
                'principal' => round($principalPayment, 2),
                'interest' => round($interestPayment, 2),
                'remaining_balance' => max(0, round($remainingBalance, 2))
            ];
        }

        return $schedule;
    }
}
