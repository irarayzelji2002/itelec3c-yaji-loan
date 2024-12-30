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
        Log::info('Starting loans index method', ['filters' => $request->all()]);

        // Base query with relationships for all loans (unfiltered)
        $baseQuery = Loan::with([
            'borrower:user_id,first_name,middle_name,last_name',
            'loanType:loan_type_id,loan_type_name,is_amortized',
            'approvedBy:user_id,first_name,middle_name,last_name',
            'disbursedBy:user_id,first_name,middle_name,last_name',
            'statusHistory',
            'loanFiles'
        ]);

        // Get all loans for status counts before applying any filters
        $allLoans = $baseQuery->get();

        // Create a new query for filtered results
        $query = clone $baseQuery;

        // Apply loan status filter
        if ($request->loan_status && $request->loan_status !== 'all_loan') {
            Log::info('Applying loan status filter', ['status' => $request->loan_status]);
            $query->whereHas('statusHistory', function($q) use ($request) {
                $q->where('status', $request->loan_status)
                ->whereIn('loan_status_history_id', function($sub) {
                    $sub->select(DB::raw('MAX(loan_status_history_id)'))
                        ->from('loan_status_history')
                        ->groupBy('loan_id');
                });
            });
        }

        // Apply payment status filter
        if ($request->payment_status && $request->payment_status !== 'all_payment') {
            Log::info('Applying payment status filter', ['status' => $request->payment_status]);
            $query->where('payment_status', $request->payment_status);
        }

        // Apply next due date filter
        if ($request->next_due_status && $request->next_due_status !== 'all_next_due') {
            Log::info('Applying next due date filter', ['status' => $request->next_due_status]);
            $now = now();

            $query->where(function($query) use ($request, $now) {
                switch ($request->next_due_status) {
                    case 'overdue':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATEDIFF(NOW(), date_disbursed) % (loan_term_period * 30) > 0');
                        break;
                    case 'due_today':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATEDIFF(NOW(), date_disbursed) % (loan_term_period * 30) = 0');
                        break;
                    case 'due_this_week':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATEDIFF(NOW(), date_disbursed) % (loan_term_period * 30) BETWEEN 1 AND 7');
                        break;
                }
            });
        }

        // Apply final due date filter
        if ($request->final_due_status && $request->final_due_status !== 'all_final_due') {
            Log::info('Applying final due date filter', ['status' => $request->final_due_status]);
            $now = now();

            $query->where(function($query) use ($request, $now) {
                switch ($request->final_due_status) {
                    case 'overdue':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATE_ADD(date_disbursed, INTERVAL loan_term_period MONTH) < NOW()');
                        break;
                    case 'due_this_month':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATE_ADD(date_disbursed, INTERVAL loan_term_period MONTH) BETWEEN NOW() AND LAST_DAY(NOW())');
                        break;
                    case 'due_next_month':
                        $query->whereNotNull('date_disbursed')
                            ->where('outstanding_balance', '>', 0)
                            ->whereRaw('DATE_ADD(date_disbursed, INTERVAL loan_term_period MONTH) BETWEEN DATE_ADD(NOW(), INTERVAL 1 MONTH) AND LAST_DAY(DATE_ADD(NOW(), INTERVAL 1 MONTH))');
                        break;
                }
            });
        }

        // Get filtered loans
        $loans = $query->get();
        Log::info('Retrieved loans count: ' . $loans->count());

        $formattedLoans = $loans->map(function($loan) {
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
                'current_status' => $loan->statusHistory->last()->status ?? '-',
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
                'status_history' => $loan->statusHistory,
                'next_due_date' => $loan->calculateNextDueDate(),
                'remaining_time_before_next_due' => $loan->calculateRemainingTimeBeforeNextDue(),
                'periodic_payment_amount' => $loan->calculatePeriodicPayment(),
                'final_due_date' => $loan->calculateFinalDueDate(),
                'remaining_time_before_final_due' => $loan->calculateRemainingTimeBeforeFinalDue(),
            ];
        });

        // Calculate status counts from unfiltered loans ($allLoans)
        $statusCounts = [
            'loan_status' => [
                'all_loan' => $allLoans->count(),
                'pending' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'pending';
                })->count(),
                'approved' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'approved';
                })->count(),
                'disbursed' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'disbursed';
                })->count(),
                'completed' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'completed';
                })->count(),
                'disapproved' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'disapproved';
                })->count(),
                'discontinued' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'discontinued';
                })->count(),
                'canceled' => $allLoans->filter(function($loan) {
                    return $loan->statusHistory->last()->status === 'canceled';
                })->count(),
            ],
            'payment_status' => [
                'all_payment' => $allLoans->count(),
                'paid' => $allLoans->where('payment_status', 'paid')->count(),
                'unpaid' => $allLoans->where('payment_status', 'unpaid')->count(),
                'partially_paid' => $allLoans->where('payment_status', 'partially_paid')->count(),
            ],
            'next_due_status' => [
                'all_next_due' => $allLoans->count(),
                'overdue' => $allLoans->filter(function($loan) {
                    $nextDueDate = $loan->calculateNextDueDate();
                    return $nextDueDate && $nextDueDate < now();
                })->count(),
                'due_today' => $allLoans->filter(function($loan) {
                    $nextDueDate = $loan->calculateNextDueDate();
                    return $nextDueDate && $nextDueDate->isToday();
                })->count(),
                'due_this_week' => $allLoans->filter(function($loan) {
                    $nextDueDate = $loan->calculateNextDueDate();
                    return $nextDueDate &&
                        $nextDueDate >= now() &&
                        $nextDueDate <= now()->endOfWeek();
                })->count(),
            ],
            'final_due_status' => [
                'all_final_due' => $allLoans->count(),
                'overdue' => $allLoans->filter(function($loan) {
                    $finalDueDate = $loan->calculateFinalDueDate();
                    return $finalDueDate && $finalDueDate < now();
                })->count(),
                'due_this_month' => $allLoans->filter(function($loan) {
                    $finalDueDate = $loan->calculateFinalDueDate();
                    return $finalDueDate &&
                        $finalDueDate >= now() &&
                        $finalDueDate <= now()->endOfMonth();
                })->count(),
                'due_next_month' => $allLoans->filter(function($loan) {
                    $finalDueDate = $loan->calculateFinalDueDate();
                    return $finalDueDate &&
                        $finalDueDate >= now()->addMonth()->startOfMonth() &&
                        $finalDueDate <= now()->addMonth()->endOfMonth();
                })->count(),
            ],
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
                'loan_files.*' => 'required|file|mimes:jpg,jpeg,png,pdf',
                'loan_files' => 'max:5',
                'payment_frequency' => 'required|in:daily,weekly,bi-weekly,monthly,quarterly,semi-annually,annually,lump-sum',
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
                    'payment_frequency' => $request->payment_frequency,
                ]);
                Log::info('Loan record created', ['loan_id' => $loan->loan_id]);

                // Create initial loan status history (pending)
                LoanStatusHistory::create([
                    'loan_id' => $loan->loan_id,
                    'status' => 'pending',
                    'remarks' => 'Loan pending appoval',
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
        Log::info('Starting loan status update', [
            'loan_id' => $loanId,
            'requested_status' => $request->status,
            'user_id' => Auth::id()
        ]);

        try {
            $request->validate([
                'status' => 'required|string',
                'remarks' => 'nullable|string'
            ]);

            $loan = Loan::findOrFail($loanId);
            $user = Auth::user();

            Log::info('Found loan for status update', [
                'loan_id' => $loan->loan_id,
                'current_status' => $loan->statusHistory()->latest()->first()?->status,
                'new_status' => $request->status
            ]);

            // Create status history record
            $statusHistory = LoanStatusHistory::create([
                'loan_id' => $loanId,
                'status' => $request->status,
                'remarks' => $request->remarks,
                'changed_by' => $user->user_id
            ]);

            Log::info('Created status history record', [
                'status_history_id' => $statusHistory->loan_status_history_id,
                'changed_by' => $user->user_id
            ]);

            // Prepare update data
            $updateData = [
                'date_status_changed' => now()
            ];

            // Handle approved status
            if ($request->status === 'approved') {
                $updateData['approved_by'] = $user->user_id;
                Log::info('Setting approved_by', [
                    'user_id' => $user->user_id
                ]);
            }

            // Handle disbursed status
            if ($request->status === 'disbursed') {
                $updateData['date_disbursed'] = now();
                $updateData['disbursed_by'] = $user->user_id;
                Log::info('Setting disbursement details', [
                    'date_disbursed' => $updateData['date_disbursed'],
                    'disbursed_by' => $user->user_id
                ]);
            }

            // Update the loan
            $loan->update($updateData);

            Log::info('Successfully updated loan status', [
                'loan_id' => $loanId,
                'status' => $request->status,
                'changed_by' => $user->user_id,
                'update_data' => $updateData
            ]);

            return response()->json([
                'success' => 'Loan status updated successfully',
                'status' => $request->status,
                'approved_by' => $request->status === 'approved' ? $user->user_id : null,
                'date_disbursed' => $request->status === 'disbursed' ? now() : null,
                'disbursed_by' => $request->status === 'disbursed' ? $user->user_id : null
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating loan status', [
                'loan_id' => $loanId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => $e->getMessage(),
                'loan_id' => $loanId,
                'status' => $request->status
            ], 500);
        }
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
            ->with('uploadedBy:user_id,first_name,middle_name,last_name')
            ->get()
            ->map(function($file) {
                return [
                    'loan_file_id' => $file->loan_file_id,
                    'file_type' => $file->file_type,
                    'file_path' => $file->file_path,
                    'uploaded_by' => $file->uploadedBy->full_name,
                    'uploaded_at' => $file->created_at,
                ];
            });

        return response()->json($loanFiles);
    }
}
