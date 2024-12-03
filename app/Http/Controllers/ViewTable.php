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
        $searchPayment = $request->get('search_payment');
        $searchLoanType = $request->get('search_loan_type');

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

        if($searchPayment){
            $payment_model = payment_model::where('loan_id', 'like', '%'.$searchPayment.'%')
                ->orWhere('payment_amount', 'like', '%'.$searchPayment.'%')
                ->orWhere('payment_date', 'like', '%'.$searchPayment.'%')
                ->get();
        } else {
            $payment_model = payment_model::all();
        }

        if($searchLoanType){
            $Loan_Model = Loan_Model::where('loan_type_name', 'like', '%'.$searchLoanType.'%')
                ->orWhere('description', 'like', '%'.$searchLoanType.'%')
                ->get();
        } else {
            $Loan_Model = Loan_Model::all();
        }

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
            'image' => 'required|image', // Validate that the image is required and is an image file
        ]);
    
        $imagePath = $request->file('image')->store('prod', 'public');
    
        Loan::create([
            'borrower_id' => $request->borrower_id,
            'loan_amount' => $request->loan_amount,
            'interest_rate' => $request->interest_rate,
            'loan_term' => $request->loan_term,
            'date_applied' => $request->date_applied,
            'date_approved' => $request->date_approved,
            'date_disbursed' => $request->date_disbursed,
            'outstanding_balance' => $request->outstanding_balance,
            'image_path' => $imagePath, // Save the stored image path
        ]);
    
        return redirect()->back()->with('success', 'Loan created successfully.');
    }

    public function storePayment(Request $request) {
        $request->validate([
            'loan_id' => 'required|exists:main_loan_table,loan_id',
            'payment_amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'image' => 'required|image', // Validate that the image is required and is an image file
        ]);

        $imagePath = $request->file('image')->store('payments', 'public');

        payment_model::create([
            'loan_id' => $request->loan_id,
            'payment_amount' => $request->payment_amount,
            'payment_date' => $request->payment_date,
            'image_path' => $imagePath, // Save the stored image path
        ]);

        return redirect()->route('view.loan')->with('success', 'Payment created successfully.');
    }

    public function storeLoanType(Request $request) {
        $request->validate([
            'loan_type_name' => 'required',
            'description' => 'required',
            'image' => 'required|image', // Validate that the image is required and is an image file
        ]);

        $imagePath = $request->file('image')->store('loan_types', 'public');

        Loan_Model::create([
            'loan_type_name' => $request->loan_type_name,
            'description' => $request->description,
            'image_path' => $imagePath, // Save the stored image path
        ]);

        return redirect()->route('view.loan')->with('success', 'Loan type created successfully.');
    }
}
