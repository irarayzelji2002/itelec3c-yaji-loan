<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('PaymentController@index started', [
                'request_data' => $request->all()
            ]);

            $query = Payment::with(['loan', 'confirmedBy']);
            Log::info('Initial query built with relationships');

            // Get all payments
            $payments = $query->get(); // This line was missing

            // Transform data
            Log::info('Starting data transformation');
            $transformedData = $payments->map(function ($payment) {
                return [
                    'payment_id' => $payment->payment_id,
                    'loan_id' => $payment->loan_id,
                    'payment_amount' => $payment->payment_amount,
                    'payment_date' => $payment->payment_date,
                    'payment_method' => $payment->payment_method,
                    'payment_reference' => $payment->payment_reference,
                    'is_confirmed' => $payment->is_confirmed,
                    'proof_of_payment' => $payment->proof_of_payment ? asset('storage/' . $payment->proof_of_payment) : null,
                    'created_at' => $payment->created_at,
                    'updated_at' => $payment->updated_at,
                    'loan' => $payment->loan ? [
                        'loan_id' => $payment->loan->loan_id,
                    ] : null,
                    'confirmed_by' => $payment->confirmedBy ? [
                        'user_id' => $payment->confirmedBy->user_id,
                        'full_name' => $payment->confirmedBy->full_name,
                    ] : null,
                ];
            });
            Log::info('Data transformation completed', [
                'transformed_count' => $transformedData->count()
            ]);

            return response()->json([
                'payments' => $transformedData,
            ]);

        } catch (\Exception $e) {
            Log::error('Error in PaymentController@index', [
                'error_message' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_file' => $e->getFile(),
                'stack_trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An error occurred while fetching payments',
                'error' => $e->getMessage()
            ], 500);
        }
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
