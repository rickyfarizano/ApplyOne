<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatformsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('platforms')->insert([
            [
                'id' => 1,
                'platform_name' => 'Computrabajo',
                'platform_url' => 'https://candidato.ar.computrabajo.com/candidate/match/?idapp=3&f=FEE939887FF3D46C',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'platform_name' => 'Bumeran',
                'platform_url' => 'https://www.bumeran.com.ar/postulantes/postulaciones',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'platform_name' => 'ZonaJobs',
                'platform_url' => 'https://www.zonajobs.com.ar/postulantes/postulaciones',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
