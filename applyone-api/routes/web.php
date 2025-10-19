<?php

use App\Http\Controllers\JobsController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de ApplyOne']);
});

Route::get('/jobs/get-all-jobs', [App\Http\Controllers\JobsController::class, 'getAllJobs']);
