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
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn('job_description');
            $table->dropColumn('salary');
            $table->dropColumn('direction');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->longText('job_description')->nullable();
            $table->integer('salary')->unsigned()->nullable();
            $table->string('direction')->nullable();
        });
    }
};
