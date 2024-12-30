<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Payment::with(['loan', 'confirmer']); // confirmer is the user who confirmed the payment

            // Handle search if provided
            if ($request->has('search')) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('payment_id', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('loan_id', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('payment_amount', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('payment_reference', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('payment_method', 'LIKE', "%{$searchTerm}%");
                });
            }

            // Handle sorting
            if ($request->has('sort_by') && $request->has('sort_direction')) {
                $query->orderBy($request->sort_by, $request->sort_direction);
            } else {
                $query->orderBy('created_at', 'desc');
            }

            // Get paginated results
            $payments = $query->paginate($request->input('per_page', 10));

            // Transform the data to include formatted values
            $payments->getCollection()->transform(function ($payment) {
                return [
                    'payment_id' => $payment->payment_id,
                    'loan_id' => $payment->loan_id,
                    'payment_amount' => $payment->payment_amount,
                    'payment_date' => $payment->payment_date,
                    'payment_method' => $payment->payment_method,
                    'payment_reference' => $payment->payment_reference,
                    'is_confirmed' => $payment->is_confirmed,
                    'confirmed_by' => $payment->confirmed_by,
                    'proof_of_payment' => $payment->proof_of_payment ? asset('storage/' . $payment->proof_of_payment) : null,
                    'created_at' => $payment->created_at,
                    'updated_at' => $payment->updated_at,
                    'loan' => $payment->loan ? [
                        'loan_id' => $payment->loan->loan_id,
                        // Add other needed loan details
                    ] : null,
                    'confirmer' => $payment->confirmer ? [
                        'user_id' => $payment->confirmer->user_id,
                        'full_name' => $payment->confirmer->full_name,
                    ] : null,
                ];
            });

            return response()->json($payments);

        } catch (\Exception $e) {
            Log::error('Error in PaymentController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while fetching payments',
                'error' => $e->getMessage()
            ], 500);
        }
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
