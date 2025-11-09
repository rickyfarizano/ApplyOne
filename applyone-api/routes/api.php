<?PHP
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Bienvenido a la API de ApplyOne']);
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
Route::delete('/job-states/delete-job-state/{id}', [App\Http\Controllers\JobStatesController::class, 'deleteJobState']);

// USERS
Route::get('/users/get-user-with-platforms/{id}', [App\Http\Controllers\UserController::class, 'getUserWithPlatforms']);
Route::post('/users/register-user', [App\Http\Controllers\UserController::class, 'registerUser']);

// PLATFORMS FOR SCRAPPING ACTIONS
Route::post('/linked-platforms/register-platform', [App\Http\Controllers\UserPlatformsDataController::class, 'registerPlatform']);
Route::patch('/linked-platforms/edit-platform/{id}', [App\Http\Controllers\UserPlatformsDataController::class, 'editLinkedPlatform']);
Route::delete('/linked-platforms/delete-platform/{id}', [App\Http\Controllers\UserPlatformsDataController::class, 'deleteLinkedPlatform']);
