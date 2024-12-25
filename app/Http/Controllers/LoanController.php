<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $loans = $search
            ? Loan::where('loan_id', 'like', '%'.$search.'%')
                ->orWhere('borrower_id', 'like', '%'.$search.'%')
                ->orWhere('loan_amount', 'like', '%'.$search.'%')
                ->orWhere('interest_rate', 'like', '%'.$search.'%')
                ->orWhere('loan_term', 'like', '%'.$search.'%')
                ->orWhere('date_applied', 'like', '%'.$search.'%')
                ->orWhere('date_approved', 'like', '%'.$search.'%')
                ->orWhere('date_disbursed', 'like', '%'.$search.'%')
                ->orWhere('outstanding_balance', 'like', '%'.$search.'%')
                ->get()
            : Loan::all();

        return view('viewtables', compact('loans'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'borrower_id' => 'required',
            'loan_amount' => 'required|numeric',
            'interest_rate' => 'required|numeric',
            'loan_term' => 'required',
            'date_applied' => 'required|date',
            'date_approved' => 'nullable|date',
            'date_disbursed' => 'nullable|date',
            'outstanding_balance' => 'required|numeric',
            'image' => 'required|image',
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
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Loan created successfully.');
    }
}
