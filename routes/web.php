<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\LoanType;
use App\Models\Loan;
use App\Models\Payment;
use App\Http\Controllers\ViewTable;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\LoanTypeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post( '/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/loan-requests', function () {
        return Inertia::render('LoanRequests');
    })->name('loan.requests');
    Route::get('/member-dashboard', function () {
        return Inertia::render('MemberView');
    })->name('member.dashboard');
    Route::get('/loan-breakdown', function () {
        return Inertia::render('LoanBreakdown');
    })->name('loan.breakdown');
    Route::get('/payment', function () {
        return Inertia::render('PaymentPage');
    })->name('payment.page');
    Route::get('/application-form', function () {
        return Inertia::render('ApplicationForm', [
            'loanTypes' => LoanType::where('status', 'active')->get()
        ]);
    })->name('loan.application');
    Route::post('/application-form', [LoanController::class, 'store'])->name('loan.store');
    Route::get('/success', function () {
        return Inertia::render('SuccessPage');
    })->name('success.page');
    Route::get('/success-loan', function () {
        return Inertia::render('SuccessLoan');
    })->name('success.loan');
     Route::get('/success-loan-download', function () {
        return Inertia::render('SuccessLoanDownload');
    })->name('success.loan.download');
    Route::get('/employee-form', function () {
        return Inertia::render('EmployeeForm');
    })->name('employee.form');


    // API routes (starts with /api)
    Route::prefix('api')->group(function () {
        Route::get('/users', function () {
            return User::with(['roles', 'verificationType'])->get();
        });

        Route::get('/loans/{loan_id}/files', [LoanController::class, 'getLoanFiles'])->name('loans.files');
        Route::get('/loans/{loan}/status-history', [LoanController::class, 'getStatusHistory'])->name('loans.status-history');

        // Admin/Employee only routes (starts with /api/employee)
        Route::middleware(['role:admin,employee'])->prefix('employee')->group(function () {
            Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');
            Route::get('/users', function () {
                return User::with(['roles', 'verificationType'])->get();
            });
            Route::put('/users/{user_id}/verification-status', [UserController::class, 'updateVerificationStatus']);
            Route::put('/users/{user_id}/role', [UserController::class, 'updateRole']);
            Route::post('/register-employee', [RegisteredUserController::class, 'storeEmployee'])->name('register.employee');
            Route::put('/loans/{loan_id}/status', [LoanController::class, 'updateStatus'])->name('loans.update-status');
        });
    });

    // Role page routes
    // Admin/Employee only page routes
    Route::middleware(['role:admin,employee'])->group(function () {
        Route::get('/users-table', function () {
            return Inertia::render('TableViewUsers');
        })->name('view.users-table');
        Route::get('/loans-table', function () {
            $loans = Loan::with([
                'borrower:user_id,first_name,middle_name,last_name',
                'loanType:loan_type_id,loan_type_name,is_amortized',
                'approvedBy:user_id,first_name,middle_name,last_name',
                'disbursedBy:user_id,first_name,middle_name,last_name',
                'statusHistory',
                'loanFiles'
            ])->get();

            return Inertia::render('TableViewLoans', [
                'loans' => $loans
            ]);
        })->name('view.loans-table');
    });
});

Route::get('/loan', [ViewTable::class, 'ViewTables'])->name('view.loan');
Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');
Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
Route::get('/loan-types', [LoanTypeController::class, 'index'])->name('loan-types.index');

// Public routes
Route::get('/landing', [ViewTable::class, 'showLanding']);
Route::get('/signUp', [ViewTable::class, 'register']);
Route::get('/terms-of-service', function () {
    return Inertia::render('TermsofService');
})->name('terms.of.service');
Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy.policy');

require __DIR__.'/auth.php';
