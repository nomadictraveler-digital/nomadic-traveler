<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_creates_an_account_and_redirects_to_dashboard(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test Traveller',
            'email' => 'traveller@example.com',
            'password' => 'TravellerPass123',
            'password_confirmation' => 'TravellerPass123',
            'terms' => '1',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', ['email' => 'traveller@example.com', 'status' => 'active']);
    }

    public function test_guest_cannot_open_member_dashboard(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_regular_member_cannot_open_admin_dashboard(): void
    {
        $user = User::create([
            'name' => 'Regular Member',
            'email' => 'member@example.com',
            'password' => 'MemberPass123',
            'status' => 'active',
        ]);

        $this->actingAs($user)->get('/admin')->assertForbidden();
    }
}
