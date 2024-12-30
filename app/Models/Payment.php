<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Loan;

class Payment extends Model
{
    protected $table = 'payments';
    protected $primaryKey = 'payment_id';
    protected $fillable = [
        'loan_id',
        'payment_amount',
        'payment_date',
        'proof_of_payment',
        'payment_method',
        'payment_reference',
        'is_confirmed',
        'confirmed_by'
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'is_confirmed' => 'boolean'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class, 'loan_id');
    }

    public function confirmedByUser()
    {
        return $this->belongsTo(User::class, 'confirmed_by', 'user_id');
    }
}
