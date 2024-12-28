<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Container\Attributes\Log;

class UserController extends Controller
{
    public function updateVerificationStatus(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $request->validate([
                'verification_status' => 'required|in:verified,denied,pending'
            ]);

            $user->verification_status = $request->verification_status;
            $user->save();

            return response()->json([
                'message' => 'Verification status updated successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update verification status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
