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
        Schema::create('pesertas', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT, PRIMARY KEY
            $table->string('nama'); // VARCHAR(255)
            $table->string('nim'); // VARCHAR(255)
            $table->string('universitas'); // VARCHAR(255)
            $table->string('jurusan'); // VARCHAR(255)
            $table->string('email'); // VARCHAR(255)
            $table->string('telepon', 20); // VARCHAR(20)
            $table->date('tanggal_daftar'); // DATE
            $table->date('tanggal_mulai'); // DATE
            $table->date('tanggal_selesai'); // DATE
            $table->enum('status', ['Sedang Diproses', 'Diterima', 'Ditolak', 'Sedang Magang', 'Selesai Magang'])->default('Sedang Diproses'); // ENUM
            $table->unsignedBigInteger('bidang_id'); // BIGINT UNSIGNED, FOREIGN KEY
            $table->string('surat_pengantar')->nullable(); // VARCHAR(255), NULLABLE
            $table->string('cv')->nullable(); // VARCHAR(255), NULLABLE
            $table->string('linkedin')->nullable(); // VARCHAR(255), NULLABLE
            $table->text('motivasi'); // TEXT
            $table->timestamps(); // created_at, updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesertas');
    }
};