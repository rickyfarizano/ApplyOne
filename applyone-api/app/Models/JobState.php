<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobState extends Model
{
    use HasFactory;

    protected $fillable = ['state_name'];

    // Relación inversa: un estado tiene muchos trabajos
    public function jobs()
    {
        return $this->hasMany(Job::class, 'job_state_id');
    }
}
