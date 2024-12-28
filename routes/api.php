<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\UserController;

/*Note:
- all routes here has "/api" in front
- run "php artisan route:list" to see all routes
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Public routes for authenticated users
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', function () {
        return User::with('roles')->get();
    });

    // Admin only routes
    Route::middleware(['checkRole:admin'])->prefix('admin')->group(function () {
        Route::put('/users/{id}/verification-status', [UserController::class, 'updateVerificationStatus']);
    });
});
