<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MahasiswaController;

Route::get('/mahasiswa', [MahasiswaController::class, 'index'])->name('mahasiswa.index');
Route::post('/mahasiswa', [MahasiswaController::class, 'store'])->name('mahasiswa.store');
Route::delete('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'destroy'])->name('mahasiswa.destroy');

Route::get('/', function () {
    return Inertia::render('Beranda');
})->name('home');

Route::get('/status-pendaftaran', function () {
    return Inertia::render('StatusPendaftaran');
})->name('status-pendaftaran');

Route::get('/data-mahasiswa', function () {
    return Inertia::render('DataMahasiswa');
})->name('data-mahasiswa');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
