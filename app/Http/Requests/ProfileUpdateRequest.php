<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array {
        $rules = [];

        // Only validate name and email if they are present in the request
        if ($this->has('name') || $this->has('email')) {
            $rules['name'] = ['required', 'string', 'max:255'];
            $rules['email'] = [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ];
        }

        // Add profile picture validation if it's present
        if ($this->hasFile('profile_picture')) {
            $rules['profile_picture'] = ['nullable','image', 'max:2048']; // max 2MB
        }

        return $rules;
    }
}




