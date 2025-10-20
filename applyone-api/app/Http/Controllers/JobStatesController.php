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

    /**
     * Permite crear un estado nuevo
     */
    public function createJobState(Request $request)
    {
        $validatedData = $request->validate([
            'state_name' => 'nullable|string|max:255'
        ], [
            'state_name.string' => 'El nombre del estado debe ser un texto',
            'state_name.max' => 'El nombre del estado solo puede tener 255 caracteres como maximo'
        ]);

        $jobState = JobState::create($validatedData);

        return response()->json([
            'message' => 'job_state creado exitosamente!',
            'job_state' => $jobState
        ]);
    }
}
