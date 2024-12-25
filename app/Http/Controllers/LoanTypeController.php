<?php

namespace App\Http\Controllers;

use App\Models\LoanType;
use Illuminate\Http\Request;

class LoanTypeController extends Controller
{
    public function index(Request $request)
    {
        $searchLoanType = $request->get('search_loan_type');
        $loanTypes = $searchLoanType
            ? LoanType::where('loan_type_name', 'like', '%'.$searchLoanType.'%')
                ->orWhere('description', 'like', '%'.$searchLoanType.'%')
                ->get()
            : LoanType::all();

        return view('viewtables', compact('loanTypes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'loan_type_name' => 'required',
            'description' => 'required',
            'image' => 'required|image',
        ]);

        $imagePath = $request->file('image')->store('loan_types', 'public');

        LoanType::create([
            'loan_type_name' => $request->loan_type_name,
            'description' => $request->description,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('view.loan')->with('success', 'Loan type created successfully.');
    }
}
