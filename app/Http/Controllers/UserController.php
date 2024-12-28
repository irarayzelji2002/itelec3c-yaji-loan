<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function updateVerificationStatus(Request $request, $id)
    {
        Log::info('updateVerificationStatus called', [
            'user_id' => $id,
            'request_data' => $request->all()
        ]);

        try {
            // Find user
            $user = User::findOrFail($id);
            Log::info('User found', ['user_id' => $user->id, 'current_status' => $user->verification_status]);

            // Validate request
            $validatedData = $request->validate([
                'verification_status' => 'required|in:verified,denied,pending'
            ]);
            Log::info('Request validated', ['validated_data' => $validatedData]);

            // Update user verification status
            $user->verification_status = $validatedData['verification_status'];
            $user->save();

            Log::info('Verification status updated successfully', [
                'user_id' => $user->id,
                'new_status' => $user->verification_status
            ]);

            return response()->json([
                'message' => 'Verification status updated successfully',
                'user' => $user
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed', [
                'error' => $e->getMessage(),
                'errors' => $e->errors()
            ]);

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('User not found', ['user_id' => $id]);

            return response()->json([
                'message' => 'User not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Unexpected error in updateVerificationStatus', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to update verification status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
