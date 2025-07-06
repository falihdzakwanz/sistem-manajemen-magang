<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pesertas', function (Blueprint $table) {
            // Tambah kolom temporary untuk backup data
            $table->string('status_temp')->nullable();
        });

        // Copy data ke kolom temporary dengan mapping status baru
        DB::statement("UPDATE pesertas SET status_temp = 
            CASE 
                WHEN status = 'Sedang Diproses' THEN 'Menunggu'
                WHEN status = 'Selesai Magang' THEN 'Selesai Magang'
                WHEN status = 'Selesai' THEN 'Selesai Magang'
                ELSE status
            END");

        Schema::table('pesertas', function (Blueprint $table) {
            // Drop kolom status lama
            $table->dropColumn('status');
        });

        Schema::table('pesertas', function (Blueprint $table) {
            // Buat kolom status baru dengan enum yang benar
            $table->enum('status', ['Menunggu', 'Diterima', 'Ditolak', 'Sedang Magang', 'Selesai Magang'])->default('Menunggu')->after('tanggal_selesai');
        });

        // Copy data kembali dari kolom temporary
        DB::statement("UPDATE pesertas SET status = status_temp");

        Schema::table('pesertas', function (Blueprint $table) {
            // Drop kolom temporary
            $table->dropColumn('status_temp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pesertas', function (Blueprint $table) {
            $table->string('status_temp')->nullable();
        });

        DB::statement("UPDATE pesertas SET status_temp = 
            CASE 
                WHEN status = 'Menunggu' THEN 'Sedang Diproses'
                WHEN status = 'Selesai Magang' THEN 'Selesai Magang'
                ELSE status
            END");

        Schema::table('pesertas', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('pesertas', function (Blueprint $table) {
            $table->enum('status', ['Sedang Diproses', 'Diterima', 'Ditolak', 'Sedang Magang', 'Selesai Magang'])->default('Sedang Diproses')->after('tanggal_selesai');
        });

        DB::statement("UPDATE pesertas SET status = status_temp");

        Schema::table('pesertas', function (Blueprint $table) {
            $table->dropColumn('status_temp');
        });
    }
};
