<?php

// app/Http/Controllers/PostController.php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Pendaftar;
use Illuminate\Http\Request;

class PendaftarController extends Controller
{
    public function index()
    {
        $posts = Pendaftar::all();  // Mengambil semua data dari tabel pendaftar
        return view('daftar.magang', compact('posts'));
    }

    public function show($id)
    {
        $post = Pendaftar::find($id);  // Mengambil satu data berdasarkan ID
        return view('daftar.show', compact('post'));
    }

    public function create()
    {
        return view('daftar.create');  // Menampilkan form untuk membuat pendaftar baru
    }
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:20',
            'universitas' => 'required|string|max:255',
            'jurusan' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:pendaftar',
            'telepon' => 'required|string|max:20',
            'tanggal_mulai' => 'required|date', // Tambahkan validasi tanggal_mulai
            'tanggal_selesai' => 'required|date', // Tambahkan validasi tanggal_selesai
        ]);

        $post = new Pendaftar([
            'nama' => $request->input('nama'),
            'nim' => $request->input('nim'),
            'universitas' => $request->input('universitas'),
            'jurusan' => $request->input('jurusan'),
            'email' => $request->input('email'),
            'telepon' => $request->input('telepon'),
            'tanggal_mulai' => $request->input('tanggal_mulai'),
            'tanggal_selesai' => $request->input('tanggal_selesai'),
        ]);

        $post->save();

        return redirect()->route('pendaftar.index')->with('success', 'Pendaftar berhasil ditambahkan.');
    }
}
