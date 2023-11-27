<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("salary");
            $table->integer("age");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};