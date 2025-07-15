<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $table = 'pesertas'; 
    
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
        'reject_reason',
        'rejected_at',
    ];
    
    protected $dates = [
        'tanggal_daftar',
        'tanggal_mulai', 
        'tanggal_selesai',
        'rejected_at',
        'created_at',
        'updated_at',
    ];
    
    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }
}
