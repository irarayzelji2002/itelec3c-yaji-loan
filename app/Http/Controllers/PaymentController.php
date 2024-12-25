<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $searchPayment = $request->get('search_payment');
        $payments = $searchPayment
            ? Payment::where('loan_id', 'like', '%'.$searchPayment.'%')
                ->orWhere('payment_amount', 'like', '%'.$searchPayment.'%')
                ->orWhere('payment_date', 'like', '%'.$searchPayment.'%')
                ->get()
            : Payment::all();

        return view('viewtables', compact('payments'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'loan_id' => 'required|exists:main_loan_table,loan_id',
            'payment_amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'image' => 'required|image',
        ]);

        $imagePath = $request->file('image')->store('payments', 'public');

        Payment::create([
            'loan_id' => $request->loan_id,
            'payment_amount' => $request->payment_amount,
            'payment_date' => $request->payment_date,
            'image_path' => $imagePath,
        ]);

        return redirect()->route('view.loan')->with('success', 'Payment created successfully.');
    }
}
