<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\UserController;

Route::middleware(['auth'])->prefix('api')->group(function () {
    // Public routes for authenticated users
    Route::get('/users', function () {
        return User::with('roles')->get();
    });

    // Admin only routes
    Route::middleware(['checkRole:admin'])->prefix('admin')->group(function () {
        Route::put('/users/{id}/verification-status', [UserController::class, 'updateVerificationStatus']);
    });
});
