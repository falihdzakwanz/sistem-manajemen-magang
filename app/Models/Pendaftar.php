<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class pendaftar extends Model
{
    protected $table = 'pendaftar';

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
        'surat_pengantar'
    ];

    public function bidang()
    {
        return $this->belongsTo(Bidang::class, 'bidang_id');
    }
}
