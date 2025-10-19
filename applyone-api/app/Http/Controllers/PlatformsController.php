<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Platforms;

class PlatformsController extends Controller
{
    public function getAllPlatforms()
    {
        $platforms = Platforms::get();
        // dd($platforms);
        return response()->json($platforms);
    }
}
