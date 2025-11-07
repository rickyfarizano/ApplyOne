<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\UserPlatformsData;

class UserPlatformsDataController extends Controller
{
    public function registerPlatform(Request $request)
    {
        $validateData = $request->validate([
            'user_id' => 'required|integer',
            'platform_name' => 'required|string|max:255',
            'platform_link' => 'required|string|max:255',
            'platform_username' => 'required|string|max:255',
            'platform_password' => 'required|string|max:255'
        ], [
            'user_id.required' => 'El ID del usuario es obligatorio.',
            'user_id.integer' => 'El ID del usuario debe ser un número entero válido.',

            'platform_name.required' => 'El nombre de la plataforma es obligatorio.',
            'platform_name.string' => 'El nombre de la plataforma debe ser un texto válido.',
            'platform_name.max' => 'El nombre de la plataforma no puede tener más de 255 caracteres.',

            'platform_link.required' => 'El enlace de la plataforma es obligatorio.',
            'platform_link.string' => 'El enlace de la plataforma debe ser un texto válido.',
            'platform_link.max' => 'El enlace de la plataforma no puede tener más de 255 caracteres.',

            'platform_username.required' => 'El nombre de usuario de la plataforma es obligatorio.',
            'platform_username.string' => 'El nombre de usuario debe ser un texto válido.',
            'platform_username.max' => 'El nombre de usuario no puede tener más de 255 caracteres.',

            'platform_password.required' => 'La contraseña de la plataforma es obligatoria.',
            'platform_password.string' => 'La contraseña debe ser un texto válido.',
            'platform_password.max' => 'La contraseña no puede tener más de 255 caracteres.',
        ]);

        $linkedPlatform = UserPlatformsData::create([
            'user_id' => $validateData['user_id'],
            'platform_name' => $validateData['platform_name'],
            'platform_link' => $validateData['platform_link'],
            'platform_username' => $validateData['platform_name'],
            'platform_password' => Hash::make($validateData['platform_password']),
        ]);

        return response()->json([
            'message' => 'plataforma registrada exitosamente!',
            'linked platform' => $linkedPlatform
        ]);
    }
}
