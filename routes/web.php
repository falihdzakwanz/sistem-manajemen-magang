<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

// User Routes
Route::get('/', function () {
    return Inertia::render('user/Beranda');
})->name('home');

Route::get('/daftar-magang', [UserController::class, 'index'])->name('daftar-magang');
Route::post('/daftar-magang', [UserController::class, 'store'])->name('daftar-magang.store');

Route::get('/status-pendaftaran', [UserController::class, 'getStatusPendaftaran'])->name('status-pendaftaran');

Route::get('/data-mahasiswa', function () {
    return Inertia::render('user/DataMahasiswa');
})->name('data-mahasiswa');

// Legacy routes dengan redirect ke route baru
Route::get('/mahasiswa', function () {
    return redirect('/daftar-magang');
})->name('mahasiswa.index');

Route::post('/mahasiswa', [UserController::class, 'store'])->name('mahasiswa.store');
Route::delete('/mahasiswa/{user}', [UserController::class, 'destroy'])->name('mahasiswa.destroy');

Route::get('/dashboard-user', function () {
    return redirect('/data-mahasiswa');
})->name('dashboard-user');

// Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::patch('/dashboard-admin/pendaftar/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.updateStatus');
});

// Legacy admin route redirect
Route::get('/admin', function () {
    return redirect('/dashboard-admin');
});

require __DIR__.'/auth.php';
