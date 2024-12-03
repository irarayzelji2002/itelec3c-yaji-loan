<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\payment_model;
use App\Models\Loan_Model;
use App\Models\Member;
use Inertia\Inertia;

class ViewTable extends Controller
{
    //
    public function ViewTables(Request $request){
        $search = $request->get('search');
        if($search){
            $Loan = Loan::where('loan_id', 'like', '%'.$search.'%')
                ->orWhere('borrower_id', 'like', '%'.$search.'%')
                ->orWhere('loan_amount', 'like', '%'.$search.'%')
                ->orWhere('interest_rate', 'like', '%'.$search.'%')
                ->orWhere('loan_term', 'like', '%'.$search.'%')
                ->orWhere('date_applied', 'like', '%'.$search.'%')
                ->orWhere('date_approved', 'like', '%'.$search.'%')
                ->orWhere('date_disbursed', 'like', '%'.$search.'%')
                ->orWhere('outstanding_balance', 'like', '%'.$search.'%')
                ->get();
        } else {
            $Loan = Loan::all();
        }
        $payment_model = payment_model::all();
        $Loan_Model = Loan_Model::all();

        return view('viewtables', compact('Loan', 'payment_model', 'Loan_Model'));
    }

    public function showLanding() {
        return Inertia::render('Register/Landing');
    }
    public function register() {
        return Inertia::render('Register/Register');
    }

    public function store(Request $request) {
        $request->validate([
            'borrower_id' => 'required',
            'loan_amount' => 'required|numeric',
            'interest_rate' => 'required|numeric',
            'loan_term' => 'required',
            'date_applied' => 'required|date',
            'date_approved' => 'nullable|date',
            'date_disbursed' => 'nullable|date',
            'outstanding_balance' => 'required|numeric',
        ]);

        Loan::create($request->all());

        return redirect()->route('view.loan')->with('success', 'Loan created successfully.');
    }
}
