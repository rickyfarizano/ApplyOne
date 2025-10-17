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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('job_title');
            $table->string('company_name');
            $table->integer('salary')->nullable()->unsigned();
            $table->string('location', 150)->nullable();
            $table->string('direction')->nullable();
            $table->foreignId('work_modality_id')->index();
            $table->foreignId('job_board_id')->index();
            $table->date('application_start_date')->nullable();
            $table->date('application_end_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
