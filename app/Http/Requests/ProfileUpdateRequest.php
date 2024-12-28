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
    public function rules(): array
    {
        $rules = [];

        if ($this->has('first_name') ||
            $this->has('middle_name') ||
            $this->has('last_name') ||
            $this->has('email') ||
            $this->has('gender') ||
            $this->has('birth_date') ||
            $this->has('nationality') ||
            $this->has('phone_number') ||
            $this->has('street') ||
            $this->has('barangay') ||
            $this->has('city') ||
            $this->has('province')) {

            $rules['first_name'] = ['required', 'string', 'max:255'];
            $rules['middle_name'] = ['nullable', 'string', 'max:255'];
            $rules['last_name'] = ['required', 'string', 'max:255'];
            $rules['email'] = ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)];
            $rules['gender'] = ['required', 'string', Rule::in(['Male', 'Female', 'Other'])];
            $rules['birth_date'] = ['required', 'date', 'before:today'];
            $rules['nationality'] = ['required', 'string', 'max:255'];
            $rules['phone_number'] = ['required', 'string', 'max:255'];
            $rules['street'] = ['required', 'string', 'max:255'];
            $rules['barangay'] = ['required', 'string', 'max:255'];
            $rules['city'] = ['required', 'string', 'max:255'];
            $rules['province'] = ['required', 'string', 'max:255'];
            $rules['security_question_1'] = ['required', 'string', 'different:security_question_2', Rule::in([
                'What is your mother\'s maiden name?',
                'What was your first pet\'s name?',
                'What city were you born in?',
                'What is your favorite book?',
                'What was the name of your first school?'
            ])];

            $rules['security_question_2'] = ['required', 'string', 'different:security_question_1', Rule::in([
                'What is your mother\'s maiden name?',
                'What was your first pet\'s name?',
                'What city were you born in?',
                'What is your favorite book?',
                'What was the name of your first school?'
            ])];
            $rules['security_answer_1'] = ['required', 'string', 'max:255'];
            $rules['security_answer_2'] = ['required', 'string', 'max:255'];
        }

        if ($this->hasFile('profile_picture')) {
            $rules['profile_picture'] = ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'];
        }

        return $rules;
    }
}
