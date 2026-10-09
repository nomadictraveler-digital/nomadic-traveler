<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\View\View;

class AuthController
{
    public function showLogin(): View { return view('auth.login'); }
    public function showRegister(): View { return view('auth.register'); }

    public function register(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:120'],
            'email' => ['required','email:rfc,dns','max:190','unique:users,email'],
            'password' => ['required','confirmed', Password::min(10)->letters()->numbers()],
            'terms' => ['accepted'],
        ]);
        $user = User::create(['name'=>$data['name'], 'email'=>strtolower($data['email']), 'password'=>Hash::make($data['password']), 'status'=>'active']);
        Profile::create(['user_id'=>$user->id]);
        $memberRole = Role::query()->where('name','member')->first();
        if ($memberRole) $user->roles()->syncWithoutDetaching([$memberRole->id]);
        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->route('dashboard')->with('status','Welcome to Nomadic Traveler.');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate(['email'=>['required','email'], 'password'=>['required','string']]);
        $credentials['email'] = strtolower($credentials['email']);
        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors(['email'=>'The supplied login details are incorrect.'])->onlyInput('email');
        }
        if (Auth::user()->status !== 'active') {
            Auth::logout();
            return back()->withErrors(['email'=>'This account is not active. Please contact support.'])->onlyInput('email');
        }
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }
}
