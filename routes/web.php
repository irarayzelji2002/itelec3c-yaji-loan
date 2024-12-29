<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\LoanType;
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
});

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
    Route::get('/member-view', function () {
        return Inertia::render('MemberView');
    })->name('member.view');
    Route::get('/loan-breakdown', function () {
        return Inertia::render('LoanBreakdown');
    })->name('loan.breakdown');
    Route::get('/payment', function () {
        return Inertia::render('PaymentPage');
    })->name('payment.page');
    Route::get('/application-form', function () {
        return Inertia::render('ApplicationForm');
    })->name('application.form');
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

        // Admin only routes (starts with /api/admin)
        Route::middleware(['role:admin'])->prefix('admin')->group(function () {
            Route::put('/users/{user_id}/verification-status', [UserController::class, 'updateVerificationStatus']);
            Route::put('/users/{user_id}/role', [UserController::class, 'updateRole']);
            Route::post('/register-employee', [RegisteredUserController::class, 'storeEmployee'])->name('register.employee');
        });

        // Member only routes (starts with /api/member)
        Route::middleware(['role:member'])->prefix('member')->group(function () {
            // Add member only routes here
        });
    });

    // Role page routes
    // Admin only page routes
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/users-table', function () {
            return Inertia::render('TableViewUsers');
        })->name('view.users-table');
    });

    // Member only page routes
    Route::middleware(['role:member'])->group(function () {
        // Add member only routes here
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
