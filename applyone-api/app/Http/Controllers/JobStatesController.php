<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobState;

class JobStatesController extends Controller
{
    /**
     * Permite obtener todos los posibles estados para un trabajo
     */
    public function getAllStates()
    {
        $jobStates = JobState::get();
        // dd($jobStates);
        return response()->json($jobStates);
    }
}
