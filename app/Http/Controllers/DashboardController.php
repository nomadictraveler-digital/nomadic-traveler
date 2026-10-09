<?php

namespace App\Http\Controllers;

use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

    public function admin()
    {
        return view('admin.dashboard', [
            'members' => User::count(),
            'activeMembers' => User::where('status', 'active')->count(),
            'pendingMembers' => User::where('status', 'pending')->count(),
        ]);
    }
}
