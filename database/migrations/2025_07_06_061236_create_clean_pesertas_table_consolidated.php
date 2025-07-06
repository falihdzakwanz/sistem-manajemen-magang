<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Migration konsolidasi untuk tabel pesertas yang menggabungkan:
     * - create_pesertas_table
     * - add_foreign_key_to_pesertas_table  
     * - add_reject_reason_to_pesertas_table
     * - update status enum ke format final
     */
    public function up(): void
    {
        Schema::create('pesertas_new', function (Blueprint $table) {
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
            $table->enum('status', ['Menunggu', 'Diterima', 'Ditolak', 'Sedang Magang', 'Selesai Magang'])->default('Menunggu');
            $table->unsignedBigInteger('bidang_id');
            $table->string('surat_pengantar')->nullable();
            $table->string('cv')->nullable();
            $table->string('linkedin')->nullable();
            $table->text('motivasi');
            $table->text('reject_reason')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->unique(['nim', 'email']);
            
            // Foreign key
            $table->foreign('bidang_id')->references('id')->on('bidangs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesertas_new');
    }
};
