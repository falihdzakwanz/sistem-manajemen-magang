<?php

/*
|--------------------------------------------------------------------------
| Web Routes - Sistem Manajemen Magang Kominfo
|--------------------------------------------------------------------------
|
| File ini berisi definisi semua rute web untuk aplikasi Sistem Manajemen 
| Magang. Rute dibagi menjadi dua kategori utama:
| 1. Rute Publik - untuk mahasiswa/pendaftar magang
| 2. Rute Admin - untuk pengelolaan aplikasi magang (dilindungi autentikasi)
|
*/

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BerandaController;

/*
|--------------------------------------------------------------------------
| Rute Publik untuk Mahasiswa/Pendaftar
|--------------------------------------------------------------------------
|
| Rute-rute ini dapat diakses oleh siapa saja tanpa autentikasi.
| Meliputi halaman utama, pendaftaran, dan pengecekan status.
|
*/

// Halaman beranda/landing page untuk calon peserta magang
Route::get('/', function () {
    return Inertia::render('user/Beranda');
})->name('home');

// Halaman formulir pendaftaran magang (GET - tampilkan form)
Route::get('/daftar-magang', [UserController::class, 'create'])
    ->name('daftar-magang');

// Proses pendaftaran magang (POST - simpan data)
Route::post('/daftar-magang', [UserController::class, 'store'])
    ->name('daftar-magang.store');

// Endpoint alternatif untuk penyimpanan data mahasiswa (untuk kompatibilitas)
Route::post('/mahasiswa', [UserController::class, 'store'])
    ->name('mahasiswa.store');

// Halaman untuk cek status pendaftaran berdasarkan NIM
Route::get('/status-pendaftaran', [UserController::class, 'getStatusPendaftaran'])
    ->name('status-pendaftaran');

// API endpoint untuk mengambil data mahasiswa (untuk keperluan frontend)
Route::get('/data-mahasiswa', [UserController::class, 'getDataMahasiswa'])
    ->name('data-mahasiswa');

// API endpoint untuk mengambil konten beranda
Route::get('/api/beranda-content', [BerandaController::class, 'getBerandaContent'])
    ->name('beranda.content');

/*
|--------------------------------------------------------------------------
| Rute Admin - Dilindungi Autentikasi
|--------------------------------------------------------------------------
|
| Rute-rute ini hanya dapat diakses oleh admin yang telah login dan
| memiliki email yang terverifikasi. Meliputi dashboard dan manajemen data.
|
*/

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard utama admin - menampilkan statistik dan daftar mahasiswa
    Route::get('/dashboard-admin', [AdminController::class, 'index'])
        ->name('admin.dashboard');

    // Hapus data pendaftar (soft delete atau hard delete)
    Route::delete('/dashboard-admin/pendaftar/{user}', [UserController::class, 'destroy'])
        ->name('admin.destroy');

    // Update status pendaftaran mahasiswa (Menunggu, Diterima, Ditolak, dll)
    Route::patch('/dashboard-admin/pendaftar/{id}/status', [AdminController::class, 'updateStatus'])
        ->name('admin.updateStatus');

    // Update data lengkap mahasiswa
    Route::patch('/dashboard-admin/mahasiswa/{id}', [AdminController::class, 'updateMahasiswa'])
        ->name('admin.updateMahasiswa');

    // Update data lengkap mahasiswa
    Route::patch('/dashboard-admin/mahasiswa/{id}', [AdminController::class, 'updateMahasiswa'])
        ->name('admin.updateMahasiswa');

    // Hapus data mahasiswa secara permanen
    Route::delete('/dashboard-admin/mahasiswa/{id}', [AdminController::class, 'deleteMahasiswa'])
        ->name('admin.deleteMahasiswa');

    // Update status magang secara otomatis berdasarkan tanggal
    // (Sedang Magang -> Selesai Magang)
    Route::post('/dashboard-admin/update-status-manual', [AdminController::class, 'updateStatusMagangManual'])
        ->name('admin.updateStatusManual');

    // Download file dengan nama yang disesuaikan
    Route::get('/dashboard-admin/download-file/{id}/{type}', [AdminController::class, 'downloadFile'])
        ->name('admin.downloadFile')
        ->where(['id' => '[0-9]+', 'type' => 'surat_pengantar|cv']);

    // Preview file
    Route::get('/dashboard-admin/preview-file/{id}/{type}', [AdminController::class, 'previewFile'])
        ->name('admin.previewFile')
        ->where(['id' => '[0-9]+', 'type' => 'surat_pengantar|cv']);

    // ===== RUTE EDIT BERANDA =====

    // Halaman edit beranda
    Route::get('/admin/edit-beranda', [BerandaController::class, 'adminEdit'])
        ->name('admin.edit-beranda');

    // Update struktur organisasi
    Route::post('/admin/update-struktur-organisasi', [BerandaController::class, 'updateStrukturOrganisasi'])
        ->name('admin.update-struktur-organisasi');

    // Update data bidang
    Route::post('/admin/update-bidang', [BerandaController::class, 'updateBidang'])
        ->name('admin.update-bidang');

    // Upload foto sementara
    Route::post('/admin/upload-temp-photo', [BerandaController::class, 'uploadTempPhoto'])
        ->name('admin.upload-temp-photo');

    // Reset foto sementara
    Route::post('/admin/reset-temp-photo', [BerandaController::class, 'resetTempPhoto'])
        ->name('admin.reset-temp-photo');

    // Hapus foto struktur organisasi (baru - support temp photos)
    Route::delete('/admin/delete-photo', [BerandaController::class, 'deletePhoto'])
        ->name('admin.delete-photo');
});

/*
|--------------------------------------------------------------------------
| Rute Legacy dan Utilitas
|--------------------------------------------------------------------------
*/

// Redirect berbagai URL ke dashboard admin (untuk kemudahan akses dan kompatibilitas)
Route::get('/admin', function () {
    // Jika user belum login, redirect ke halaman login
    if (!Auth::check()) {
        return redirect('/login');
    }

    // Jika sudah login, redirect ke dashboard admin
    return redirect('/dashboard-admin');
});

Route::get('/dashboard', function () {
    // Jika user belum login, redirect ke halaman login
    if (!Auth::check()) {
        return redirect('/login');
    }

    // Jika sudah login, redirect ke dashboard admin
    return redirect('/dashboard-admin');
});

/*
|--------------------------------------------------------------------------
| Rute Autentikasi
|--------------------------------------------------------------------------
|
| Menyertakan semua rute autentikasi Laravel (login, logout, register,
| forgot password, email verification, dll) dari file auth.php
|
*/

require __DIR__ . '/auth.php';

/*
|--------------------------------------------------------------------------
| Override Login Route untuk Redirect Otomatis
|--------------------------------------------------------------------------
|
| Route ini akan mengoverride route login dari auth.php untuk memberikan
| fungsionalitas redirect otomatis jika user sudah login
|
*/

// Route login dengan pengecekan autentikasi
Route::get('/login', function () {
    // Jika user sudah login, langsung redirect ke dashboard admin
    if (Auth::check()) {
        return redirect('/dashboard-admin');
    }

    // Jika belum login, tampilkan halaman login
    return Inertia::render('admin/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('login');
