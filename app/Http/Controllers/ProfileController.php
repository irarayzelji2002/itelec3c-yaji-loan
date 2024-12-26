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

            // Handle file uploads if present
            if ($request->hasFile('id_photo_front')) {
                if ($user->id_photo_front) {
                    Storage::disk('public')->delete($user->id_photo_front);
                }
                $path = $request->file('id_photo_front')->store('id-photos', 'public');
                if ($path) $user->id_photo_front = $path;
            }

            if ($request->hasFile('id_photo_back')) {
                if ($user->id_photo_back) {
                    Storage::disk('public')->delete($user->id_photo_back);
                }
                $path = $request->file('id_photo_back')->store('id-photos', 'public');
                if ($path) $user->id_photo_back = $path;
            }

            if ($request->hasFile('selfie_photo')) {
                if ($user->selfie_photo) {
                    Storage::disk('public')->delete($user->selfie_photo);
                }
                $path = $request->file('selfie_photo')->store('selfies', 'public');
                if ($path) $user->selfie_photo = $path;
            }

            if ($request->hasFile('profile_picture')) {
                if ($user->profile_picture) {
                    Storage::disk('public')->delete($user->profile_picture);
                }
                $path = $request->file('profile_picture')->store('profile-pictures', 'public');
                if ($path) $user->profile_picture = $path;
            }

            $validated = $request->validated();
            unset($validated['profile_picture']);
            $user->fill($validated);

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

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
