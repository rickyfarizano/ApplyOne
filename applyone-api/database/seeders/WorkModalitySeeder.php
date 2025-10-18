<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkModalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('work_modality')->insert([
            [
                'id' => 1,
                'modality_name' => 'presencial',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'modality_name' => 'hibrido',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'modality_name' => 'online',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
