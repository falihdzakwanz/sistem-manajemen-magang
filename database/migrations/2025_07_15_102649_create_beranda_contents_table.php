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
        Schema::create('beranda_contents', function (Blueprint $table) {
            $table->id();
            $table->string('content_type'); // 'struktur_organisasi' atau 'bidang'
            $table->string('key')->unique(); // identifier unik untuk konten
            $table->text('title')->nullable(); // judul
            $table->text('description')->nullable(); // deskripsi
            $table->text('photo_url')->nullable(); // URL foto untuk struktur organisasi
            $table->json('data')->nullable(); // data JSON untuk menyimpan konten kompleks
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beranda_contents');
    }
};
