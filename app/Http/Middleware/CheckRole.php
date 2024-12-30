<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user() || !collect($roles)->contains(function($role) use ($request) {
            return $request->user()->hasRole($role);
        })) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
