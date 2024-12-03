<?php

use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewTable;
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
});

Route::get('/loan', [ViewTable::class, 'ViewTables'])->name('view.loan');
Route::post('/loan', [ViewTable::class, 'store'])->name('loan.store');
Route::post('/payment', [ViewTable::class, 'storePayment'])->name('payment.store');
Route::post('/loan_type', [ViewTable::class, 'storeLoanType'])->name('loan_type.store');

Route::get('/landing', [ViewTable::class, 'showLanding']);
Route::get('/signUp', [ViewTable::class, 'register']);

require __DIR__.'/auth.php';
