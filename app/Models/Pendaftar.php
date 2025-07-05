<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftar extends Model
{
    // Tentukan nama tabel jika diperlukan
    protected $table = 'pendaftars';

    // Tentukan kolom yang dapat diisi (fillable)
    protected $fillable = [
        'nama',
        'nim',
        'universitas',
        'jurusan',
        'email',
        'telepon',
        'tanggal_daftar',
        'tanggal_mulai',
        'tanggal_selesai',
        'status',
        'bidang_id',
        'surat_pengantar',
        'cv',
        'linkedin',
        'motivasi',
    ];
}
