<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bidang extends Model
{
    protected $fillable = [
        'key',
        'nama_bidang',
        'kepala_bidang',
        'deskripsi'
    ];
}
