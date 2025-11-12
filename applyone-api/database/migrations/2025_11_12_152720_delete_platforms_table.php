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
        Schema::table('platforms', function(Blueprint $table) {
            $table->dropIfExists('platforms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('platforms', function(Blueprint $table) {
            $table->id()->unsigned();
            $table->string('platform_name')->nullable();
            $table->text('platform_url')->nullable();
            $table->timestamps();
        });
    }
};
