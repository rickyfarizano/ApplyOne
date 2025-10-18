<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Platforms extends Model
{
    use HasFactory;

    protected $fillable = [
        'platform_name',
        'platform_url'
    ];

    // Relacion inversa: una plataforma tiene muchos trabajos
    public function jobs()
    {
        return $this->hasMany(Job::class, 'platform_id');
    }
}

