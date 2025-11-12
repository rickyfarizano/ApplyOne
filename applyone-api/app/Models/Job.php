<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'company_name',
        'location',
        'work_modality_id',
        'job_board_id',
        'linked_platform_id',
        'application_start_date',
        'application_end_date',
        'job_state_id'
    ];

    // relacion uno a muchos con job_state
    public function jobState()
    {
        return $this->belongsTo(JobState::class, 'job_state_id');
    }

    // Relacion uno a muchos con works_modality
    public function workModality()
    {
        return $this->belongsTo(workModality::class, 'work_modality_id');
    }

    public function linkedPlatforms()
    {
        return $this->belongsTo(UserPlatformsData::class, 'linked_platform_id');
    }
}
