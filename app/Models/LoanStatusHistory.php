<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Loan;

class LoanStatusHistory extends Model
{
    protected $table = 'loan_status_history';
    protected $primaryKey = 'loan_status_history_id';
    protected $fillable = [
        'loan_id',
        'status', //pending, approved, disapproved, discontinued, canceled
        'changed_by',
        'remarks'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class, 'loan_id');
    }

    public function changedByUser()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
