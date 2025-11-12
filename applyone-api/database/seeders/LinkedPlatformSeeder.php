<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LinkedPlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_platforms_data')->insert([
            [
                'id' => 1,
                'user_id' => 1,
                'platform_name' => 'Computrabajo',
                'platform_link' => 'https://ar.computrabajo.com/',
                'platform_username' => 'rickyfarizano@gmail.com',
                'platform_password' => 'ejemplo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'platform_name' => 'Bumeran',
                'platform_link' => 'https://www.bumeran.com.ar/',
                'platform_username' => 'rickyfarizano@gmail.com',
                'platform_password' => 'ejemplo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
