<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\LoanType;
use App\Models\Payment;
use App\Http\Controllers\ViewTable;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\LoanTypeController;
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
    Route::get('/api/users', function () {
        // abort_if(!Auth::user()->hasRole('admin'), 403);
        return User::with('roles')->get();
    });
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
});

Route::get('/loan', [ViewTable::class, 'ViewTables'])->name('view.loan');
Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');
Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
Route::get('/loan-types', [LoanTypeController::class, 'index'])->name('loan-types.index');

Route::get('/landing', [ViewTable::class, 'showLanding']);
Route::get('/signUp', [ViewTable::class, 'register']);

// Add the new route for TableView
Route::get('/table-view', function () {
    return Inertia::render('TableView');
})->middleware(['auth', 'verified'])->name('table.view');

require __DIR__.'/auth.php';
