<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    protected $fillable = ['user_id', 'phone', 'nationality', 'country_of_residence', 'date_of_birth', 'gender', 'profile_photo_path', 'profession', 'company', 'bio', 'preferred_language', 'public_profile'];

    protected function casts(): array
    {
        return ['date_of_birth' => 'date', 'public_profile' => 'boolean'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
