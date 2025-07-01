<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'beranda']);
Route::get('/daftar-magang', [PublicController::class, 'daftarMagang']);
Route::get('/status-pendaftaran', [PublicController::class, 'statusPendaftaran']);
Route::get('/data-mahasiswa', [PublicController::class, 'dataMahasiswa']);

use App\Http\Controllers\PendaftarController;

Route::get('/pendaftar', [PendaftarController::class, 'index'])->name('pendaftar.index');
Route::get('/pendaftar/{id}', [PendaftarController::class, 'show'])->name('pendaftar.show');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
