<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\payment_model;
use App\Models\Loan_Model;
use App\Models\Member;

class ViewTable extends Controller
{
    //
    public function ViewTables(){
        $Loan = Loan::all();
        $payment_model = payment_model::all();
        $Loan_Model = Loan_Model::all();


        return view('viewtables', compact('Loan', 'payment_model', 'Loan_Model'));
    }
}
