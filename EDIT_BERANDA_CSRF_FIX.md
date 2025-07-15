# Fix Error Tombol Simpan Edit Beranda Setelah Logout/Login

## Problem yang Diperbaiki

Setelah logout dan login ulang, tombol simpan di halaman Edit Beranda mengalami error karena:

1. **CSRF Token Expired/Invalid**: Session baru setelah login membuat CSRF token lama tidak valid
2. **Session Regeneration**: Laravel me-regenerate session setelah login/logout
3. **Manual Fetch API**: Tidak menggunakan Inertia.js yang handle CSRF secara otomatis

## Solusi yang Diimplementasikan

### 1. Improved CSRF Token Handling

```tsx
// Helper function untuk get fresh CSRF token dengan retry mechanism
const getCsrfToken = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    const token = metaTag?.getAttribute('content');

    if (!token) {
        console.warn('CSRF token not found, reloading page...');
        window.location.reload();
        return '';
    }

    return token;
};
```

### 2. Hybrid Approach: Inertia.js + Fetch API

- **Untuk data bidang**: Menggunakan `router.post()` (Inertia.js) - automatic CSRF handling
- **Untuk struktur dengan foto**: Hybrid approach untuk file upload
- **Untuk delete foto**: Menggunakan `router.delete()` (Inertia.js)

### 3. Enhanced Error Handling

```tsx
// Error 419 (CSRF Token Mismatch)
if (response.status === 419) {
    alert('⚠️ Session expired. Silakan logout dan login kembali.');
    router.visit('/logout', { method: 'post' });
}

// Error 401 (Unauthorized)
else if (response.status === 401) {
    alert('⚠️ Anda tidak memiliki akses. Silakan login kembali.');
    router.visit('/login');
}
```

### 4. Specific Changes Made

#### handleSaveStruktur()

- **With Photo**: Menggunakan Inertia.js dengan `forceFormData: true`
- **Without Photo**: Fetch API dengan enhanced error handling
- **Error 419**: Redirect ke logout
- **Error 401**: Redirect ke login

#### handleSaveBidang()

- **Sepenuhnya menggunakan Inertia.js**: `router.post()`
- **Automatic CSRF handling**
- **Better error messages**

#### handleDeletePhoto()

- **Menggunakan Inertia.js**: `router.delete()`
- **Data passed via `data` parameter**
- **Automatic CSRF handling**

## Benefits dari Fix ini

1. **No More CSRF Errors**: CSRF token di-handle otomatis oleh Inertia.js
2. **Better Session Management**: Automatic redirect jika session expired
3. **Improved UX**: Error messages yang lebih informatif
4. **Consistent Approach**: Menggunakan Inertia.js sebagai primary method
5. **Fallback Mechanism**: Masih support fetch API untuk kasus khusus

## Testing Recommendations

1. **Test Normal Flow**:

    - Login → Edit beranda → Simpan ✓

2. **Test Session Expiry**:

    - Login → Edit beranda → Logout di tab lain → Simpan ✓

3. **Test After Fresh Login**:

    - Logout → Login → Langsung edit beranda → Simpan ✓

4. **Test File Upload**:

    - Upload foto struktur organisasi ✓

5. **Test Delete Photo**:
    - Delete foto yang sudah ada ✓

## Additional Notes

- **Backwards Compatible**: Tidak mengubah API routes yang sudah ada
- **Performance**: Inertia.js lebih efficient untuk SPA navigation
- **Security**: Better CSRF protection dan session handling
- **Maintainability**: Code lebih consistent dan mudah di-maintain

## Route yang Terlibat

```php
// routes/web.php
Route::post('/admin/update-struktur-organisasi', [BerandaController::class, 'updateStrukturOrganisasi']);
Route::post('/admin/update-bidang', [BerandaController::class, 'updateBidang']);
Route::delete('/admin/delete-photo', [BerandaController::class, 'deletePhoto']);
```

Semua route sudah protected dengan middleware `['auth', 'verified']` di `routes/web.php`.
