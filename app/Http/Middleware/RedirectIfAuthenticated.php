<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                if (collect(['member'])->contains(function($role) use ($request) {
                    return $request->user()->hasRole($role);
                })) {
                    return redirect()->intended(route('member.dashboard', absolute: false));
                } else {
                    return redirect()->intended(route('dashboard', absolute: false));
                }
            }
        }

        return $next($request);
    }
}
