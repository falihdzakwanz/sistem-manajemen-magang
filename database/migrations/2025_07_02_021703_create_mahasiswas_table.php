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
    Schema::create('mahasiswas', function (Blueprint $table) {
        $table->id();
        $table->string('nama');
        $table->string('nim')->unique();
        $table->string('universitas');
        $table->string('jurusan');
        $table->string('email')->unique();
        $table->string('telepon', 20);
        $table->date('tanggal_daftar');
        $table->date('tanggal_mulai');
        $table->date('tanggal_selesai');
        $table->enum('status', ['Sedang Diproses', 'Diterima', 'Ditolak', 'Sedang Magang', 'Selesai Magang'])->default('Sedang Diproses');
        $table->unsignedBigInteger('bidang_id');
        $table->string('surat_pengantar')->nullable(); // path to file
        $table->string('cv')->nullable(); // path to file
        $table->string('linkedin')->nullable();
        $table->text('motivasi');
        $table->timestamps();
        
        // Foreign key constraint (jika tabel bidang sudah ada)
        // $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswas');
    }
};
