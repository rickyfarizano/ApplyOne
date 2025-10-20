<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_states')->insert([
            [
                'id' => 1,
                'state_name' => 'no contactado',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'state_name' => 'en proceso',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'state_name' => 'contactado',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'state_name' => 'entrevista concretada',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
