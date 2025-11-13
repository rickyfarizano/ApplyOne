<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jobs')->insert([
            [
                'id' => 1,
                'job_title' => 'Desarrollador Frontend',
                'company_name' => 'Google',
                'location' => 'Estados Unidos',
                'work_modality_id' => 3,
                'job_board_id' => 1,
                'linked_platform_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
                'job_state_id' => 2,
                'user_id' => 1
            ],
            [
                'id' => 2,
                'job_title' => 'Desarrollador Backend',
                'company_name' => 'Amazon',
                'location' => 'Argentina',
                'work_modality_id' => 1,
                'job_board_id' => 1,
                'linked_platform_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
                'job_state_id' => 2,
                'user_id' => 1
            ],
            [
                'id' => 3,
                'job_title' => 'Barista',
                'company_name' => 'Starbucks',
                'location' => 'Nueva Zelanda',
                'work_modality_id' => 1,
                'job_board_id' => 1,
                'linked_platform_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
                'job_state_id' => 2,
                'user_id' => 1
            ],
            [
                'id' => 4,
                'job_title' => 'DevOps',
                'company_name' => 'OpenAI',
                'location' => 'Estados Unidos',
                'work_modality_id' => 3,
                'job_board_id' => 1,
                'linked_platform_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
                'job_state_id' => 2,
                'user_id' => 1
            ],
        ]);
    }
}
