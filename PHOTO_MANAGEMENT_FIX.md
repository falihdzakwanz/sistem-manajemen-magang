# 🔧 Perbaikan Upload Foto dan Session Management

## ✅ Masalah yang Diperbaiki

### 1. **Session Berakhir Saat Menekan Tombol Simpan**

- **Penyebab**: Session timeout karena proses upload yang lama
- **Solusi**: Menambahkan `$request->session()->regenerate()` di method update
- **Lokasi**: `updateStrukturOrganisasi()` dan `updateBidang()`

### 2. **Error "Foto Tidak Ditemukan" Setelah Upload**

- **Penyebab**: Foto yang baru diupload belum tersimpan di database
- **Solusi**: Implementasi sistem temporary photo dengan session storage
- **Fitur Baru**: Upload foto sementara dengan preview

### 3. **Tidak Bisa Hapus Foto Sebelum Simpan**

- **Penyebab**: System hanya bisa hapus foto yang sudah ada di database
- **Solusi**: Method `deletePhoto()` yang bisa hapus foto sementara dan permanen
- **Fitur Baru**: Reset foto yang baru diupload

## 🚀 Fitur Baru yang Ditambahkan

### 1. **Upload Foto Sementara**

```php
// Route: POST /admin/upload-temp-photo
public function uploadTempPhoto(Request $request)
```

- Upload foto untuk preview tanpa save ke database
- Foto disimpan di `storage/app/public/photos/temp/`
- Info foto disimpan di session dengan key `temp_photo_{key}`

### 2. **Delete Foto yang Diperbaiki**

```php
// Route: DELETE /admin/delete-photo
public function deletePhoto(Request $request)
```

- Bisa hapus foto sementara (dari session)
- Bisa hapus foto permanen (dari database)
- Bisa hapus keduanya sekaligus

### 3. **Reset Foto Sementara**

```php
// Route: POST /admin/reset-temp-photo
public function resetTempPhoto(Request $request)
```

- Hapus foto sementara dari session
- Hapus file foto dari storage temp
- Via AJAX untuk UX yang lebih baik

### 4. **Auto Cleanup Foto Lama**

```php
private function cleanupOldTempPhotos()
```

- Otomatis hapus foto temp yang lebih dari 1 jam
- Dijalankan setiap kali akses halaman admin edit

## 🔄 Alur Kerja yang Diperbaiki

### Alur Lama (Bermasalah):

```
1. User upload foto → Langsung ke database
2. User hapus foto → Error jika belum save
3. Session timeout → Error saat save
```

### Alur Baru (Diperbaiki):

```
1. User upload foto → Simpan sementara di session + temp folder
2. User preview foto → Tampilkan foto sementara
3. User hapus foto → Hapus foto sementara dan/atau permanen
4. User simpan → Pindah foto temp ke permanent, hapus dari session
5. Auto cleanup → Hapus foto temp yang sudah lama
```

## 📁 Struktur File yang Berubah

### Controller:

- `app/Http/Controllers/BerandaController.php` ✅ Updated
    - `adminEdit()` - Tambah cleanup dan info temp photo
    - `updateStrukturOrganisasi()` - Tambah session regenerate dan temp photo handling
    - `updateBidang()` - Tambah session regenerate dan error handling
    - `uploadTempPhoto()` - NEW: Upload foto sementara
    - `deletePhoto()` - UPDATED: Support temp dan permanent photo
    - `resetTempPhoto()` - NEW: Reset foto sementara
    - `cleanupOldTempPhotos()` - NEW: Auto cleanup

### Routes:

- `routes/web.php` ✅ Updated
    - `POST /admin/upload-temp-photo` - NEW
    - `POST /admin/reset-temp-photo` - NEW
    - `DELETE /admin/delete-photo` - UPDATED

### Storage:

- `storage/app/public/photos/temp/` - NEW: Folder untuk foto sementara
- `storage/app/public/photos/struktur-organisasi/` - Existing: Foto permanen

## 🛠️ Penggunaan di Frontend

### 1. Upload Foto Sementara (AJAX):

```javascript
// Upload foto untuk preview
fetch('/admin/upload-temp-photo', {
    method: 'POST',
    body: formData,
})
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Tampilkan preview foto
            showPhotoPreview(data.photo_url);
        }
    });
```

### 2. Hapus Foto (Form):

```html
<!-- Tombol hapus yang bisa hapus foto temp dan permanen -->
<form action="/admin/delete-photo" method="POST">
    @csrf @method('DELETE')
    <input type="hidden" name="key" value="kepala-dinas" />
    <button type="submit">Hapus Foto</button>
</form>
```

### 3. Reset Foto Sementara (AJAX):

```javascript
// Reset foto yang baru diupload
fetch('/admin/reset-temp-photo', {
    method: 'POST',
    body: formData,
})
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            // Hapus preview foto
            resetPhotoPreview();
        }
    });
```

## 🔒 Security & Performance

### Security:

- ✅ File validation (image, max 2MB)
- ✅ Secure file naming dengan timestamp
- ✅ CSRF protection untuk semua routes
- ✅ Session regeneration untuk mencegah session fixation

### Performance:

- ✅ Auto cleanup foto temp yang lama
- ✅ Efficient file handling dengan Storage facade
- ✅ Session-based temporary storage
- ✅ Optimized database queries

## 🧪 Testing

### Test Case 1: Upload dan Hapus Foto Sementara

1. Upload foto → Lihat preview
2. Hapus foto → Foto hilang dari preview
3. Upload lagi → Foto baru muncul di preview
4. Simpan → Foto tersimpan permanent

### Test Case 2: Session Management

1. Upload foto
2. Tunggu (simulasi proses lama)
3. Klik simpan → Tidak ada session timeout error

### Test Case 3: Cleanup Temp Files

1. Upload foto tapi tidak disimpan
2. Tunggu 1+ jam
3. Akses halaman admin → Foto temp otomatis terhapus

## 📝 Changelog

### v1.1.0 - Photo Management Update

- ✅ FIX: Session timeout saat simpan
- ✅ FIX: Error foto tidak ditemukan
- ✅ FEAT: Upload foto sementara
- ✅ FEAT: Hapus foto yang fleksibel
- ✅ FEAT: Reset foto sementara
- ✅ FEAT: Auto cleanup foto lama
- ✅ IMPROVEMENT: Better error handling
- ✅ IMPROVEMENT: Session regeneration

---

**Status: READY FOR TESTING** ✅

_Semua perbaikan telah diimplementasikan dan siap untuk diuji._
