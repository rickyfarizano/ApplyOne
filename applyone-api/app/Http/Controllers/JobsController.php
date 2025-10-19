<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;

class JobsController extends Controller
{
    /**
     * Permite obtener todos los trabajos de la base de datos
     */
    public function getAllJobs() : object
    {
        $jobs = Job::with([
            'jobState:id,state_name',
            'platforms:id,platform_name,platform_url'
        ])->get();

        // dd($jobs);

        return response()->json($jobs);
    }
}
