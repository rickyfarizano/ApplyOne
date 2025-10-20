<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('work_modality', 'work_modalities');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('work_modalities', 'work_modality');
    }
};
