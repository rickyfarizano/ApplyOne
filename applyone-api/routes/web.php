<?php

use App\Http\Controllers\JobsController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de ApplyOne']);
});

// Rutas de obtencion de trabajos
Route::get('/jobs/get-all-jobs', [App\Http\Controllers\JobsController::class, 'getAllJobs']);
Route::get('/jobs/get-job-by-id/{id}', [App\Http\Controllers\JobsController::class, 'getJobById']);
Route::get('/jobs/get-job-by-platform/{platformName}', [App\Http\Controllers\JobsController::class, 'getJobsByPlatform']);

// Ruta de creacion de trabajos
Route::post('/jobs/create-job', [App\Http\Controllers\JobsController::class, 'createJob']);

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});
