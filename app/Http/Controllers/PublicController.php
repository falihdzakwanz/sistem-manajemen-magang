<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function beranda() {
        return view('beranda');
    }

    public function daftarMagang() {
        return view('daftar-magang');
    }

    public function statusPendaftaran() {
        return view('status-pendaftaran');
    }

    public function dataMahasiswa() {
        return view('data-mahasiswa');
    }
}
