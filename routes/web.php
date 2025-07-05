<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\AdminController;

// User Routes
Route::get('/', function () {
    return Inertia::render('user/Beranda');
})->name('home');

Route::get('/daftar-magang', [MahasiswaController::class, 'index'])->name('daftar-magang');
Route::post('/daftar-magang', [MahasiswaController::class, 'store'])->name('daftar-magang.store');

Route::get('/status-pendaftaran', function () {
    return Inertia::render('user/StatusPendaftaran');
})->name('status-pendaftaran');

Route::get('/data-mahasiswa', function () {
    return Inertia::render('user/DataMahasiswa');
})->name('data-mahasiswa');

// Legacy routes dengan redirect ke route baru
Route::get('/mahasiswa', function () {
    return redirect('/daftar-magang');
})->name('mahasiswa.index');

Route::post('/mahasiswa', [MahasiswaController::class, 'store'])->name('mahasiswa.store');
Route::delete('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'destroy'])->name('mahasiswa.destroy');

Route::get('/dashboard-user', function () {
    return redirect('/data-mahasiswa');
})->name('dashboard-user');

// Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::patch('/dashboard-admin/mahasiswa/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.updateStatus');
});

// Legacy admin route redirect
Route::get('/admin', function () {
    return redirect('/dashboard-admin');
});

require __DIR__.'/auth.php';
