<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nama
 * @property string $nim
 * @property string $universitas
 * @property string $jurusan
 * @property string $email
 * @property string $telepon
 * @property string $tanggal_daftar
 * @property string $tanggal_mulai
 * @property string $tanggal_selesai
 * @property string $status
 * @property int $bidang_id
 * @property string|null $surat_pengantar
 * @property string|null $cv
 * @property string|null $linkedin
 * @property string|null $motivasi
 * @property string|null $reject_reason
 * @property string|null $rejected_at
 * @property \DateTime $created_at
 * @property \DateTime $updated_at
 * @property-read \App\Models\Bidang $bidang
 */
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
