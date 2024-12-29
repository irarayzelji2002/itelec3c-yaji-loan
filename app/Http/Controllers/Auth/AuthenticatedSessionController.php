<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            // Find the user by email first
            $user = User::where('email', $request->email)->first();

            // Check verification status before attempting authentication
            if ($user) {
                if ($user->verification_status === 'pending') {
                    return Redirect::back()->withErrors([
                        'general' => 'Your account is pending verification. Please wait for approval.',
                    ])->withInput();
                }

                if ($user->verification_status === 'denied') {
                    return Redirect::back()->withErrors([
                        'general' => 'Your account has been denied. Please contact support or register again.',
                    ])->withInput();
                }
            }

            // Proceed with normal authentication if verification status is verified
            $request->authenticate();
            $request->session()->regenerate();

            // Redirect based on user role
            if ($user->hasRole('member')) {
                return redirect()->intended(route('member.dashboard', absolute: false));
            } else {
                return redirect()->intended(route('dashboard', absolute: false));
            }
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'general' => 'Incorrect credentials provided.',
            ])->withInput();
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
