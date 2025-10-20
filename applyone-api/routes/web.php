<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\PlatformsController;
use App\Http\Controllers\JobStatesController;

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de ApplyOne']);
});

// Ruta para obtener token de validacion csrf
Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});

// JOBS
// Rutas de obtencion de trabajos
Route::get('/jobs/get-all-jobs', [App\Http\Controllers\JobsController::class, 'getAllJobs']);
Route::get('/jobs/get-job-by-id/{id}', [App\Http\Controllers\JobsController::class, 'getJobById']);
Route::get('/jobs/get-job-by-platform/{platformName}', [App\Http\Controllers\JobsController::class, 'getJobsByPlatform']);
// Ruta de creacion de trabajos
Route::post('/jobs/create-job', [App\Http\Controllers\JobsController::class, 'createJob']);
// Ruta de edicion de trabajos -> enviar campos a editar en json
Route::patch('/jobs/edit-job/{id}', [App\Http\Controllers\JobsController::class, 'editJob']);
// Ruta de eliminacion de trabajos
Route::delete('jobs/delete-job/{id}', [App\Http\Controllers\JobsController::class, 'deleteJob']);

// PLATFORMS
// Rutas de obtencion de plataformas
Route::get('/platforms/get-all-platforms', [App\Http\Controllers\PlatformsController::class, 'getAllPlatforms']);
Route::post('/platforms/create-platforms', [App\Http\Controllers\PlatformsController::class, 'createPlatforms']);
Route::patch('/platforms/edit-platforms/{id}', [App\Http\Controllers\PlatformsController::class, 'editPlatforms']);
Route::delete('/platforms/delete-platforms/{id}', [App\Http\Controllers\PlatformsController::class, 'deletePlatforms']);

// JOB STATES
Route::get('/job-states/get-all-states', [App\Http\Controllers\JobStatesController::class, 'getAllStates']);
Route::post('/job-states/create-job-state', [App\Http\Controllers\JobStatesController::class, 'createJobState']);
Route::put('/job-states/edit-job-state/{id}', [App\Http\Controllers\JobStatesController::class, 'editJobState']);
