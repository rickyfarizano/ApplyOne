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
     * Permite obtener un usuario junto con todas sus plataformas vinculadas
     */
    public function getUserWithPlatforms($id)
    {
        $user = User::with('platformsData')->find($id);

        if(!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json([
            'message' => 'usuario encontrado exitosamente!',
            'user' => $user
        ], 200);
    }
}
