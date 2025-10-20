<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Platforms;

class PlatformsController extends Controller
{
    /**
     * Permite obtener todas las plataformas
     */
    public function getAllPlatforms()
    {
        $platforms = Platforms::get();
        // dd($platforms);
        return response()->json($platforms);
    }

    /**
     * Permite crear nuevas plataformas
     */
    public function createPlatforms(Request $request)
    {
        $validateData = $request->validate([
            'platform_name' => 'nullable|string|max:255',
            'platform_url' => 'nullable|string'
        ], [
            'platform_name.string' => 'El nombre de la plataforma debe ser un texto',
            'platform_name.max' => 'El nombre de la plataforma no puede superar los 255 caracteres',

            'platform_url.string' => 'La url debe ser un texto'
        ]);

        $platform = Platforms::create($validateData);

        return response()->json([
            'message' => 'plataforma creada exitosamente!',
            'platform' => $platform
        ]);
    }

    public function editPlatforms(Request $request, $id)
    {
        $platform = Platforms::findOrFail($id);

        // dd($platform);

         $validateData = $request->validate([
            'platform_name' => 'nullable|string|max:255',
            'platform_url' => 'nullable|string'
        ], [
            'platform_name.string' => 'El nombre de la plataforma debe ser un texto',
            'platform_name.max' => 'El nombre de la plataforma no puede superar los 255 caracteres',

            'platform_url.string' => 'La url debe ser un texto'
        ]);

        $platform->update($validateData);

        return response()->json([
            'message' => 'plataforma actualizada exitosamente!',
            'platform' => $platform
        ]);
    }

    public function deletePlatforms($id)
    {
        $platform = Platforms::findOrFail($id);
        $platform->delete();
        return response()->json([
            'message' => 'plataforma eliminada exitosamente!',
            'platform' => $id
        ]);
    }
}
