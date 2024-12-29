<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VerificationType;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register/Register', [
            'verificationTypes' => VerificationType::where('status', 'active')
                ->orderBy('order')
                ->get()
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string|in:Male,Female,Other',
            'birth_date' => 'required|date|before:today',
            'nationality' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'street' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'verification_type_id' => 'required|exists:verification_types,verification_type_id',
            'id_photo_front' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // 2MB
            'id_photo_back' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // 2MB
            'id_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB
            'selfie_photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'password' => ['required', Rules\Password::defaults()],
            'security_question_1' => 'required|string|max:255',
            'security_answer_1' => 'required|string|max:255',
            'security_question_2' => 'required|string|max:255',
            'security_answer_2' => 'required|string|max:255',
        ]);

        // Handle file uploads
        $idPhotoFrontPath = null;
        $idPhotoBackPath = null;
        $idFilePath = null;
        if($request->hasFile('id_photo_front')) {
            $request->validate([
                'id_photo_front' => 'required|image|mimes:jpeg,png,jpg|max:2048', // 2MB
            ]);
            $idPhotoFrontPath = $request->file('id_photo_front')->store('id-photos', 'public');
        }
        if($request->hasFile('id_photo_back')) {
            $request->validate([
                'id_photo_back' => 'required|image|mimes:jpeg,png,jpg|max:2048', // 2MB
            ]);
            $idPhotoBackPath = $request->file('id_photo_back')->store('id-photos', 'public');
        }
        if($request->hasFile('id_file')) {
            $request->validate([
                'id_file' => 'required|file|mimes:pdf|max:10240', // 10MB
            ]);
            $idFilePath = $request->file('id_file')->store('id-photos', 'public');
        }
        $selfiePhotoPath = $request->file('selfie_photo')->store('selfies', 'public');

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'nationality' => $request->nationality,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'street' => $request->street,
            'barangay' => $request->barangay,
            'city' => $request->city,
            'province' => $request->province,
            'verification_type_id' => $request->verification_type_id,
            'id_photo_front' => $idPhotoFrontPath,
            'id_photo_back' => $idPhotoBackPath,
            'id_file' => $idFilePath,
            'selfie_photo' => $selfiePhotoPath,
            'password' => Hash::make($request->password),
            'security_question_1' => $request->security_question_1,
            'security_answer_1' => $request->security_answer_1,
            'security_question_2' => $request->security_question_2,
            'security_answer_2' => $request->security_answer_2,
            'role' => 'member',
            'verification_status' => 'pending'
        ]);

        // Assign default member role
        $user->assignRole('member');

        event(new Registered($user));
        // Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Handle an incoming registration request for employee.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeEmployee(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string|in:Male,Female,Other',
            'birth_date' => 'required|date|before:today',
            'nationality' => 'required|string|max:255',
            'phone_number' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'street' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|string|in:admin,employee,member',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'nationality' => $request->nationality,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'street' => $request->street,
            'barangay' => $request->barangay,
            'city' => $request->city,
            'province' => $request->province,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'verification_status' => 'verified'
        ]);

        // Assign role
        $user->assignRole($request->role);

        event(new Registered($user));

        return redirect(route('view.users-table', absolute: false));
    }
}
