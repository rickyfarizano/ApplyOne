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
            'user_platforms_data:id, user_id, platform_name, _platform_link, platform_username, platform_password'
        ])->get();

        // dd($jobs);

        return response()->json($jobs);
    }

    /**
     * Permite obtener un trabajo en base a su id
     * @param $id identificador del trabajo a buscar
     */
    public function getJobById($id)
    {
        $job = Job::with([
            'jobState:id,state_name',
            'user_platforms_data:id, user_id, platform_name, _platform_link, platform_username, platform_password'
        ])->findOrFail($id);

        if(!$job) {
            return response()->json(['message' => 'trabajo no encontrados'], 404);
        }

        // dd($job);

        return response()->json($job);
    }


    /**
     * Permite obtener trabajos en base a una plataforma
     * @param $platformName nombre de la plataforma
     */
    public function getJobsByPlatform($platformName)
    {
        $jobs = Job::with([
            'jobState:id,state_name',
            'user_platforms_data:id, user_id, platform_name, _platform_link, platform_username, platform_password'
        ])
        ->whereHas('platforms', function($query) use ($platformName) {
            $query->where('platform_name', $platformName);
        })
        ->get();

        if($jobs->isEmpty()) {
            return response()->json(['message' => 'No se encontraron trabajos asociados a esta plataforma'], 404);
        }

        // dd($jobs);

        return response()->json($jobs);
    }

    public function createJob(Request $request)
    {
        $validatedData = $request->validate([
            'job_title' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'direction' => 'nullable|string|max:255',
            'work_modality_id' => 'nullable|integer|exists:work_modalities,id',
            'job_board_id' => 'nullable|integer',
            'linked_platform_id' => 'nullable|integer|exists:platforms,id',
            'application_start_date' => 'nullable|date',
            'application_end_date' => 'nullable|date',
            'job_state_id' => 'nullable|integer|exists:job_states,id',
        ], [
            'job_title.required' => 'El título del trabajo es obligatorio.',
            'job_title.string' => 'El título del trabajo debe ser una cadena de texto.',
            'job_title.max' => 'El título del trabajo no puede superar los 255 caracteres.',

            'company_name.required' => 'El nombre de la empresa es obligatorio.',
            'company_name.string' => 'El nombre de la empresa debe ser una cadena de texto.',
            'company_name.max' => 'El nombre de la empresa no puede superar los 255 caracteres.',

            'location.string' => 'La ubicación debe ser una cadena de texto.',
            'location.max' => 'La ubicación no puede superar los 150 caracteres.',

            'work_modality_id.integer' => 'La modalidad de trabajo debe ser un número entero.',
            'work_modality_id.exists' => 'La modalidad de trabajo seleccionada no existe.',

            'job_board_id.integer' => 'El ID del portal de empleo debe ser un número entero.',

            'linked_platform_id.integer' => 'La plataforma debe ser un número entero.',
            'linked_platform_id.exists' => 'La plataforma seleccionada no existe.',

            'application_start_date.date' => 'La fecha de inicio de la postulación debe ser una fecha válida.',
            'application_end_date.date' => 'La fecha de fin de la postulación debe ser una fecha válida.',

            'job_state_id.integer' => 'El estado del trabajo debe ser un número entero.',
            'job_state_id.exists' => 'El estado del trabajo seleccionado no existe.',
        ]);

        $job = Job::create($validatedData);

        return response()->json([
            'message' => 'trabajo creado exitosamente!',
            'job' => $job->load(['jobState', 'workModality', 'platforms'])
        ]);
    }

    /**
     * Permite editar un trabajo
     * @param $request datos a editar
     * @param $id identificador del trabajo a editar
     */
    public function editJob(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        // dd($job);

        $validatedData = $request->validate([
            'job_title' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'location' => 'nullable|string|max:150',
            'work_modality_id' => 'nullable|integer|exists:work_modalities,id',
            'job_board_id' => 'nullable|integer',
            'platform_id' => 'nullable|integer|exists:platforms,id',
            'application_start_date' => 'nullable|date',
            'application_end_date' => 'nullable|date',
            'job_state_id' => 'nullable|integer|exists:job_states,id',
        ], [
            'job_title.required' => 'El título del trabajo es obligatorio.',
            'job_title.string' => 'El título del trabajo debe ser una cadena de texto.',
            'job_title.max' => 'El título del trabajo no puede superar los 255 caracteres.',

            'company_name.required' => 'El nombre de la empresa es obligatorio.',
            'company_name.string' => 'El nombre de la empresa debe ser una cadena de texto.',
            'company_name.max' => 'El nombre de la empresa no puede superar los 255 caracteres.',


            'location.string' => 'La ubicación debe ser una cadena de texto.',
            'location.max' => 'La ubicación no puede superar los 150 caracteres.',

            'work_modality_id.integer' => 'La modalidad de trabajo debe ser un número entero.',
            'work_modality_id.exists' => 'La modalidad de trabajo seleccionada no existe.',

            'job_board_id.integer' => 'El ID del portal de empleo debe ser un número entero.',

            'linked_platform_id.integer' => 'La plataforma debe ser un número entero.',
            'linked_platform_id.exists' => 'La plataforma seleccionada no existe.',

            'application_start_date.date' => 'La fecha de inicio de la postulación debe ser una fecha válida.',
            'application_end_date.date' => 'La fecha de fin de la postulación debe ser una fecha válida.',

            'job_state_id.integer' => 'El estado del trabajo debe ser un número entero.',
            'job_state_id.exists' => 'El estado del trabajo seleccionado no existe.',
        ]);

        $job->update($validatedData);

        return response()->json([
            'message' => 'trabajo editado con exito!',
            'job' => $job->load(['jobState', 'workModality', 'platforms'])
        ]);
    }

    /**
     * Permite eliminar un trabajo
     * @param $id identificador del trabajo a eliminar
     */
    public function deleteJob($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json([
            'message' => 'Trabajo eliminado exitosamente!',
            'job' => $id
        ]);
    }
}
