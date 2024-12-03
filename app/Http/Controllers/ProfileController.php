<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('Profile/Show', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user()->load('roles')
        ]);

    }

    /**
     * Display the user's edit profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user()->load('roles')
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        try {
            $user = $request->user();
            Log::info('Profile update started for user:', ['user_id' => $user->id]);
            Log::info('Request data:', $request->all());

            // Handle profile picture upload
            if ($request->hasFile('profile_picture')) {
                Log::info('Profile picture upload detected');

                // Delete old profile picture if exists
                if ($user->profile_picture) {
                    Log::info('Deleting old profile picture:', ['path' => $user->profile_picture]);
                    Storage::disk('public')->delete($user->profile_picture);
                }

                // Store new profile picture
                $path = $request->file('profile_picture')->store('profile-pictures', 'public');
                Log::info('New profile picture stored:', ['path' => $path]);
                $user->profile_picture = $path;
            }

            $validated = $request->validated();
            Log::info('Validated data:', $validated);

            $user->fill($validated);

            if ($user->isDirty('email')) {
                Log::info('Email changed, resetting verification');
                $user->email_verified_at = null;
            }

            $result = $user->save();
            Log::info('Save operation result:', ['success' => $result]);
            Log::info('Updated user data:', $user->toArray());

            return Redirect::route('profile.edit');
        } catch (\Exception $e) {
            Log::error('Error in profile update:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
