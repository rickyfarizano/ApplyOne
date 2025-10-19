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

    /**
     * Permite obtener un trabajo en base a su id
     * @param $id identificador del trabajo a buscar
     */
    public function getJobById($id)
    {
        $job = Job::with([
            'jobState:id,state_name',
            'platforms:id,platform_name,platform_url'
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
            'platforms:id,platform_name,platform_url'
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
}
