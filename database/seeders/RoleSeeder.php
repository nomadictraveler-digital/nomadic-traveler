<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => 'member', 'label' => 'Member'],
            ['name' => 'premium_member', 'label' => 'Premium Member'],
            ['name' => 'visa_officer', 'label' => 'Visa Officer'],
            ['name' => 'flight_agent', 'label' => 'Flight Agent'],
            ['name' => 'hotel_agent', 'label' => 'Hotel Agent'],
            ['name' => 'support_agent', 'label' => 'Support Agent'],
            ['name' => 'content_editor', 'label' => 'Content Editor'],
            ['name' => 'accountant', 'label' => 'Accountant'],
            ['name' => 'community_manager', 'label' => 'Community Manager'],
            ['name' => 'super_admin', 'label' => 'Super Admin'],
        ] as $role) {
            Role::query()->firstOrCreate(['name' => $role['name']], ['label' => $role['label']]);
        }
    }
}
