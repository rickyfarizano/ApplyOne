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
        'salary',
        'location',
        'direction',
        'work_modality_id',
        'job_board_id',
        'application_start_date',
        'application_end_date',
        'job_state_id'
    ];

    public function jobState()
    {
        return $this->belongsTo(JobState::class, 'job_state_id');
    }
}
