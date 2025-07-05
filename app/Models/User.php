<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $table = 'mahasiswas';
    
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
    
    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }
}
