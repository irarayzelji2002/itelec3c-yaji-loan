<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\User;
use App\Models\LoanType;
use App\Models\LoanStatusHistory;
use App\Models\LoanFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class LoanController extends Controller
{
    public function index(Request $request)
    {
        Log::info('Starting loans index method');
        $query = Loan::with([
            'borrower:user_id,first_name,middle_name,last_name',
            'loanType:loan_type_id,loan_type_name,is_amortized',
            'approvedBy:user_id,first_name,middle_name,last_name',
            'disbursedBy:user_id,first_name,middle_name,last_name',
            'statusHistory',
            'loanFiles'
        ]);
        Log::info('Initial query built', ['query' => $query->toSql()]);

        // Apply filters if provided
        if ($request->loan_status) {
            Log::info('Applying loan status filter', ['status' => $request->loan_status]);
            $query->whereHas('statusHistory', function($q) use ($request) {
                $q->where('status', $request->loan_status)
                  ->latest();
            });
        }

        if ($request->payment_status) {
            Log::info('Applying payment status filter', ['status' => $request->payment_status]);
            $query->where('payment_status', $request->payment_status);
        }

        // Get the loans
        $formattedLoans = $query->get();
        Log::info('Retrieved loans count: ' . $formattedLoans->count());
        $formattedLoans = $formattedLoans->map(function($loan) {
            Log::info('Formatting loan', ['loan_id' => $loan->loan_id]);

            return [
                'loan_id' => $loan->loan_id,
                'borrower_name' => $loan->borrower->full_name ?? '-',
                'loan_amount' => $loan->loan_amount,
                'interest_rate' => $loan->interest_rate,
                'loan_term_unit' => $loan->loan_term_unit,
                'loan_term_period' => $loan->loan_term_period,
                'date_applied' => $loan->date_applied,
                'date_status_changed' => $loan->date_status_changed,
                'current_status' => $loan->statusHistory->last()->loan_status ?? '-',
                'current_remarks' => $loan->statusHistory->last()->remarks ?? '-',
                'date_disbursed' => $loan->date_disbursed,
                'outstanding_balance' => $loan->outstanding_balance,
                'created_at' => $loan->created_at,
                'updated_at' => $loan->updated_at,
                'loan_type_name' => $loan->loanType->loan_type_name ?? '-',
                'is_amortized' => $loan->loanType->is_amortized ?? false,
                'payment_status' => $loan->payment_status,
                'approved_by' => $loan->approvedBy?->full_name ?? '-',
                'disbursed_by' => $loan->disbursedBy?->full_name ?? '-',
                'loan_files' => $loan->loanFiles,
                'next_due_date' => $loan->calculateNextDueDate(),
                'remaining_time_before_next_due' => $loan->calculateRemainingTimeBeforeNextDue(),
                'periodic_payment_amount' => $loan->calculatePeriodicPayment(),
                'final_due_date' => $loan->calculateFinalDueDate(),
                'remaining_time_before_final_due' => $loan->calculateRemainingTimeBeforeFinalDue(),
            ];
        });

        Log::info('Formatted loans data', [
            'count' => $formattedLoans->count(),
            'sample' => $formattedLoans->first()
        ]);

        // Get status counts
        $statusCounts = [
            'loan_status' => [
                'pending' => Loan::whereHas('statusHistory', function($q) {
                    $q->where('status', 'pending')->latest();
                })->count(),
                'approved' => Loan::whereHas('statusHistory', function($q) {
                    $q->where('status', 'approved')->latest();
                })->count(),
                // Add other status counts
            ],
            'payment_status' => [
                'paid' => Loan::where('payment_status', 'Paid')->count(),
                'unpaid' => Loan::where('payment_status', 'Unpaid')->count(),
                'partially_paid' => Loan::where('payment_status', 'Partially Paid')->count(),
            ],
            // Add due date status counts
        ];

        return response()->json([
            'loans' => $formattedLoans,
            'statusCounts' => $statusCounts
        ]);
    }

    public function store(Request $request)
    {
        try {
            Log::info('Loan application received', [
                'request_data' => $request->all(),
                'files' => $request->hasFile('loan_files') ? 'Yes' : 'No'
            ]);
            $request->validate([
                'loan_type_id' => 'required|exists:loan_types,loan_type_id',
                'loan_amount' => 'required|numeric|min:0',
                'loan_term_period' => 'required|numeric|min:1',
                'loan_term_unit' => 'required|in:days,weeks,months,years',
                'purpose' => 'required|string|max:500',
                'loan_files.*' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                'loan_files' => 'max:5'
            ]);
            Log::info('Validation passed');

            // Validate loan amount against loan type's range
            $loanType = LoanType::findOrFail($request->loan_type_id);
            if ($request->loan_amount < $loanType->min_loan_amount ||
                $request->loan_amount > $loanType->max_loan_amount) {
                Log::warning('Loan amount validation failed', [
                    'amount' => $request->loan_amount,
                    'min' => $loanType->min_loan_amount,
                    'max' => $loanType->max_loan_amount
                ]);
                return back()->withErrors([
                    'loan_amount' => "Loan amount must be between ₱{$loanType->min_loan_amount} and ₱{$loanType->max_loan_amount} for this loan type."
                ]);
            }

            // Start a database transaction
            DB::beginTransaction();

            try {
                $user = Auth::user();
                Log::info('Creating loan record for user', ['user_id' => $user->user_id]);
                // Create the loan record
                $loan = Loan::create([
                    'borrower_id' => $user->user_id,
                    'loan_type_id' => $request->loan_type_id,
                    'loan_amount' => $request->loan_amount,
                    'loan_term_period' => $request->loan_term_period,
                    'loan_term_unit' => $request->loan_term_unit,
                    'interest_rate' => $request->interest_rate,
                    'purpose' => $request->purpose,
                    'purpose_details' => $request->purpose_details,
                    'date_applied' => now(),
                    'date_status_changed' => now(),
                    'payment_status' => 'unpaid',
                    'outstanding_balance' => $request->loan_amount,
                ]);
                Log::info('Loan record created', ['loan_id' => $loan->loan_id]);

                // Create initial loan status history (pending)
                LoanStatusHistory::create([
                    'loan_id' => $loan->loan_id,
                    'status' => 'pending',
                    'remarks' => 'Loan application submitted',
                    'changed_by' => $user->user_id
                ]);

                // Handle file uploads
                if ($request->hasFile('loan_files')) {
                    Log::info('Processing file uploads', [
                        'file_count' => count($request->file('loan_files'))
                    ]);
                    foreach ($request->file('loan_files') as $file) {
                        $path = $file->store('loan-files', 'public');
                        LoanFile::create([
                            'loan_id' => $loan->loan_id,
                            'file_path' => $path,
                            'file_type' => $file->getClientOriginalExtension(),
                            'file_name' => $file->getClientOriginalName(),
                            'uploaded_by' => $user->user_id
                        ]);
                    }
                }

                DB::commit();
                Log::info('Loan application completed successfully', ['loan_id' => $loan->loan_id]);
                if (request()->wantsJson()) {
                    return response()->json([
                        'message' => 'Loan application submitted successfully!',
                        'loan' => [
                            'loan_id' => $loan->loan_id,
                            'created_at' => $loan->created_at->format('M d, Y g:iA')
                        ]
                    ]);
                }

                return redirect()->route('success.loan')
                    ->with('success', 'Loan application submitted successfully!')
                    ->with('loan', [
                        'loan_id' => $loan->loan_id,
                        'created_at' => $loan->created_at->format('M d, Y g:iA')
                    ]);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Error creating loan record', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['error' => 'Failed to submit loan application. Please try again.']);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed', ['errors' => $e->errors()]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Unexpected error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function updateStatus(Request $request, $loanId)
    {
        $request->validate([
            'status' => 'required|string',
            'remarks' => 'required|string'
        ]);

        $loan = Loan::findOrFail($loanId);
        $user = Auth::user();

        LoanStatusHistory::create([
            'loan_id' => $loanId,
            'status' => $request->status,
            'remarks' => $request->remarks,
            'changed_by' => $user->user_id
        ]);

        $loan->update([
            'date_status_changed' => now()
        ]);

        return redirect()->back()->with('success', 'Loan status updated successfully');
    }

    public function getStatusHistory($loanId)
    {
        $history = LoanStatusHistory::where('loan_id', $loanId)
            ->with('changedBy:user_id,first_name,middle_name,last_name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($history);
    }

    public function getLoanFiles($loanId)
    {
        $loanFiles = LoanFile::where('loan_id', $loanId)
            ->with('uploadedByUser:user_id,first_name,middle_name,last_name')
            ->get()
            ->map(function($file) {
                return [
                    'loan_file_id' => $file->loan_file_id,
                    'file_type' => $file->file_type,
                    'file_path' => $file->file_path,
                    'uploaded_by' => $file->uploadedByUser->full_name,
                    'uploaded_at' => $file->created_at,
                ];
            });

        return response()->json($loanFiles);
    }
}
