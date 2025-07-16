# Login Route dengan Auto-Redirect

## Deskripsi

Route `/login` telah dimodifikasi untuk memberikan fungsionalitas auto-redirect berdasarkan status autentikasi pengguna.

## Cara Kerja

### 1. User Belum Login

- Ketika mengakses `/login`, sistem akan memeriksa status autentikasi
- Jika user **belum login**, sistem akan menampilkan halaman login Laravel default
- User dapat melakukan login seperti biasa

### 2. User Sudah Login

- Ketika mengakses `/login`, sistem akan memeriksa status autentikasi
- Jika user **sudah login**, sistem akan secara otomatis redirect ke `/dashboard-admin`
- User tidak akan melihat halaman login lagi

## Implementasi Teknis

### Lokasi: `routes/web.php`

```php
// Route login dengan pengecekan autentikasi
Route::get('/login', function () {
    // Jika user sudah login, langsung redirect ke dashboard admin
    if (Auth::check()) {
        return redirect('/dashboard-admin');
    }

    // Jika belum login, tampilkan halaman login
    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('login');
```

## Fitur yang Ditambahkan

### ✅ Auto-Redirect untuk User yang Sudah Login

- User yang sudah login akan langsung diarahkan ke dashboard admin
- Mencegah user melihat halaman login yang tidak perlu

### ✅ Mempertahankan Fungsionalitas Login Default

- User yang belum login tetap dapat mengakses form login
- Semua fitur login Laravel tetap berfungsi (reset password, dll)

### ✅ Override Route auth.php

- Route custom ditempatkan setelah `require __DIR__ . '/auth.php'`
- Mengoverride route login default dari Laravel auth

## Manfaat

1. **User Experience**: User yang sudah login tidak perlu melihat halaman login lagi
2. **Keamanan**: Mencegah kebingungan user yang sudah login
3. **Efisiensi**: Langsung redirect ke dashboard yang relevan
4. **Kompatibilitas**: Mempertahankan semua fitur autentikasi Laravel

## Testing

### Test Case 1: User Belum Login

- Akses `http://localhost:8000/login`
- **Expected**: Menampilkan halaman login
- **Actual**: ✅ Menampilkan form login

### Test Case 2: User Sudah Login

- Login terlebih dahulu
- Akses `http://localhost:8000/login`
- **Expected**: Redirect ke `/dashboard-admin`
- **Actual**: ✅ Redirect otomatis ke dashboard admin

## Catatan

- Route ini akan mengoverride route login default dari `auth.php`
- Pastikan untuk clear route cache setelah perubahan: `php artisan route:clear && php artisan route:cache`
