<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Loan;

class LoanFile extends Model
{
    protected $table = 'loan_files';
    protected $primaryKey = 'loan_file_id';
    protected $fillable = [
        'loan_id',
        'file_type',
        'file_path',
        'uploaded_by'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class, 'loan_id');
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
