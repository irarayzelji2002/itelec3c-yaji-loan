<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Loan;
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
            'loan_id' => 'required|exists:loans,loan_id',
            'payment_amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|max:255',
            'payment_reference' => 'nullable|string|max:255',
        ]);

        // Generate reference number
        $latestPayment = Payment::latest()->first();
        $referenceNumber = 'P-' . str_pad(($latestPayment ? $latestPayment->payment_id + 1 : 1), 7, '0', STR_PAD_LEFT);

        // Create payment record
        $payment = Payment::create([
            'loan_id' => $request->loan_id,
            'payment_amount' => $request->payment_amount,
            'payment_date' => now(),
            'payment_method' => $request->payment_method,
            'payment_reference' => $referenceNumber,
            'is_confirmed' => false,
            'confirmed_by' => null,
        ]);

        // Reduce outstanding balance of the loan
        $loan = Loan::findOrFail($request->loan_id);
        $loan->outstanding_balance -= $request->payment_amount;
        $loan->save();

        return response()->json(['success' => 'Payment recorded successfully', 'payment' => $payment]);
    }
}
