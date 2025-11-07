<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPlatformsData extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'platform_name',
        'platform_link',
        'platform_username',
        'platform_password',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
