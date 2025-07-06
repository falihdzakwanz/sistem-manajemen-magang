<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

// User Routes
Route::get('/', function () {
    return Inertia::render('user/Beranda');
})->name('home');

Route::get('/daftar-magang', [UserController::class, 'create'])->name('daftar-magang');
Route::post('/daftar-magang', [UserController::class, 'store'])->name('daftar-magang.store');
Route::post('/mahasiswa', [UserController::class, 'store'])->name('mahasiswa.store');
Route::get('/status-pendaftaran', [UserController::class, 'getStatusPendaftaran'])->name('status-pendaftaran');
Route::get('/data-mahasiswa', [UserController::class, 'getDataMahasiswa'])->name('data-mahasiswa');

// Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::delete('/dashboard-admin/pendaftar/{user}', [UserController::class, 'destroy'])->name('admin.destroy');
    Route::patch('/dashboard-admin/pendaftar/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.updateStatus');
    Route::delete('/dashboard-admin/mahasiswa/{id}', [AdminController::class, 'deleteMahasiswa'])->name('admin.deleteMahasiswa');
    Route::post('/dashboard-admin/update-status-manual', [AdminController::class, 'updateStatusMagangManual'])->name('admin.updateStatusManual');
});

// Legacy admin route redirect
Route::get('/admin', function () {
    return redirect('/dashboard-admin');
});

require __DIR__ . '/auth.php';
