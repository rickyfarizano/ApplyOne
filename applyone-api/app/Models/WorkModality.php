<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkModality extends Model
{
    use HasFactory;

    protected $fillable = ['modality_name'];

    // Relacion uno a muchos con jobs
    public function jobs()
    {
        return $this->hasMany(Job::class, 'work_modality_id');
    }
}
