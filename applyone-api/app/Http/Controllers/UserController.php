<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|',
            'password' => 'required|string|min:8|confirmed'
        ], [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser un texto válido.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',

            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser un texto válido.',
            'email.email' => 'Debes ingresar un correo electrónico válido.',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
            'email.unique' => 'Este correo electrónico ya está registrado.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser un texto válido.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
        ]);

        $user = User::create([
            'name'     => $validateData['name'],
            'email'    => $validateData['email'],
            'password' => Hash::make($validateData['password']),
        ]);

        return response()->json([
            'message' => 'usuario registrado exitosamente!',
            'user' => $user,
        ]);
    }

    /**
     * Permite obtener todos los datos de un usuario especifico
     */
    public function getUserById($id)
    {
        $user = User::with([
            'platformsData',
            'jobs.linkedPlatform',
            'jobs.jobState',
            'jobs.workModality'
        ])->find($id);

        if(!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        $groupedJobs = [];
        foreach ($user->jobs as $job) {
            $platformName = $job->linkedPlatform->platform_name ?? 'Sin plataforma';
            $groupedJobs[$platformName][] = [
                'id' => $job->id,
                'job_title' => $job->job_title,
                'company_name' => $job->company_name,
                'location' => $job->location,
                'application_start_date' => $job->application_start_date,
                'application_end_date' => $job->application_end_date,
                'state' => $job->jobState ? $job->jobState->state_name : null,
                'modality' => $job->workModality ? $job->workModality->modality_name : null,
            ];
        }

        return response()->json([
            'message' => 'usuario encontrado exitosamente!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'platforms' => $user->platformsData,
                'jobs_by_platform' => $groupedJobs,
            ]
        ], 200);
    }

    public function getAllUsersWithData()
    {
        // Cargar usuarios con sus plataformas y trabajos relacionados
        $users = \App\Models\User::with([
            'platformsData',
            'jobs.linkedPlatform',
            'jobs.jobState',
            'jobs.workModality'
        ])->get();

        // Reestructurar la data para agrupar trabajos por plataforma
        $users = $users->map(function ($user) {
            $groupedJobs = [];

            foreach ($user->jobs as $job) {
                $platformName = $job->linkedPlatform ? $job->linkedPlatform->platform_name : 'Sin plataforma';
                $groupedJobs[$platformName][] = [
                    'id' => $job->id,
                    'job_title' => $job->job_title,
                    'company_name' => $job->company_name,
                    'location' => $job->location,
                    'application_start_date' => $job->application_start_date,
                    'application_end_date' => $job->application_end_date,
                    'state' => $job->jobState ? $job->jobState->state_name : null,
                    'modality' => $job->workModality ? $job->workModality->modality_name : null,
                ];
            }

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'platforms' => $user->platformsData,
                'jobs_by_platform' => $groupedJobs,
            ];
        });

        return response()->json([
            'message' => 'Usuarios obtenidos exitosamente',
            'users' => $users
        ], 200);
    }

}
