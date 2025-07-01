<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::create('pendaftar', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nim')->unique();
            $table->string('universitas');
            $table->string('jurusan');
            $table->string('email')->unique();
            $table->string('telepon');
            $table->date('tanggal_daftar')->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->enum('status', ['diproses', 'diterima', 'ditolak', 'aktif', 'selesai'])->default('diproses');
            $table->unsignedBigInteger('bidang_id')->nullable();
            $table->string('surat_pengantar')->nullable(); // file upload
            $table->timestamps();

            $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('set null');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftar');
    }
};
