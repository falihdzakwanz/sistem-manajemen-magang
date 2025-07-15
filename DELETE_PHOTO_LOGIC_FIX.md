# Fix Delete Photo Logic - Photo Management Update

## Masalah yang Terjadi

1. **Change Detection Tidak Mendeteksi Penghapusan Foto**: Setelah menghapus foto, tombol simpan masih menampilkan "Tidak ada perubahan yang perlu disimpan"
2. **Tombol Batal Tidak Mengembalikan Foto**: Ketika user menghapus foto kemudian klik "Batal", foto tetap terhapus secara permanen

## Penyebab Masalah

1. **Logic Change Detection**: Function `hasStrukturChanges()` tidak mendeteksi perubahan foto yang dihapus
2. **Delete Photo Langsung ke Database**: Function `handleDeletePhoto` langsung menghapus foto dari database, bukan dari preview
3. **Tombol Batal Tidak Reset State**: Tidak mengembalikan foto preview ke kondisi asli

## Solusi yang Diimplementasikan

### 1. Perbaikan Change Detection (Frontend)

```typescript
// SEBELUM
const hasStrukturChanges = (): boolean => {
    return (
        strukturForm.title !== originalStrukturData.title ||
        strukturForm.description !== originalStrukturData.description ||
        strukturForm.photo !== null
    );
};

// SESUDAH
const hasStrukturChanges = (): boolean => {
    return (
        strukturForm.title !== originalStrukturData.title ||
        strukturForm.description !== originalStrukturData.description ||
        strukturForm.photo !== null ||
        // Check if photo was deleted (original had photo but current preview is null)
        (originalStrukturData.photo_url !== null && photoPreview === null)
    );
};
```

### 2. Soft Delete untuk Foto (Frontend)

```typescript
// SEBELUM (delete langsung ke database)
const handleDeletePhoto = async () => {
    router.delete(`/admin/delete-photo`, {
        data: { key: editingItem.key },
        onSuccess: (page) => {
            setPhotoPreview(null);
            alert('✅ Foto berhasil dihapus!');
        },
    });
};

// SESUDAH (soft delete, hanya hapus dari preview)
const handleDeletePhoto = async () => {
    setPhotoPreview(null);
    setStrukturForm((prev) => ({ ...prev, photo: null }));
    alert('✅ Foto akan dihapus setelah Anda menekan tombol "Simpan"');
};
```

### 3. Handle Cancel dengan Reset State

```typescript
// BARU: Function untuk handle cancel
const handleCancelEdit = () => {
    // Reset photo preview to original state
    if (originalStrukturData) {
        setPhotoPreview(originalStrukturData.photo_url);
    }
    setShowModal(false);
};

// Digunakan di tombol Batal dan tombol X
<button onClick={handleCancelEdit}>Batal</button>
<button onClick={handleCancelEdit}>×</button>
```

### 4. Backend Support untuk Delete Photo

```php
// Backend: updateStrukturOrganisasi
public function updateStrukturOrganisasi(Request $request)
{
    $request->validate([
        'key' => 'required|string',
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:500',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'delete_photo' => 'nullable|boolean' // BARU: parameter untuk hapus foto
    ]);

    // Check for photo deletion
    if ($request->delete_photo) {
        // Handle photo deletion
        if ($existingContent && $existingContent->photo_url) {
            $oldPhotoPath = str_replace('/storage/', '', $existingContent->photo_url);
            Storage::disk('public')->delete($oldPhotoPath);
        }
        $data['photo_url'] = null;
    }

    // ... rest of the logic
}
```

### 5. Frontend Request dengan Delete Photo Parameter

```typescript
// Untuk file upload
if (strukturForm.photo) {
    const formData = new FormData();
    formData.append('key', strukturForm.key);
    formData.append('title', strukturForm.title);
    formData.append('description', strukturForm.description);
    formData.append('photo', strukturForm.photo);

    // Add delete_photo parameter if needed
    if (shouldDeletePhoto) {
        formData.append('delete_photo', '1');
    }
}

// Untuk non-file request
const requestData = {
    key: strukturForm.key,
    title: strukturForm.title,
    description: strukturForm.description,
    ...(shouldDeletePhoto && { delete_photo: true }),
};
```

## Alur Kerja Baru

### 1. Saat User Menghapus Foto

- Foto dihapus dari preview (soft delete)
- Muncul pesan "Foto akan dihapus setelah Anda menekan tombol Simpan"
- Change detection mendeteksi perubahan
- Tombol "Simpan" enabled

### 2. Saat User Klik "Simpan" Setelah Hapus Foto

- Backend menerima parameter `delete_photo: true`
- Foto dihapus dari database dan storage
- Data disimpan dengan `photo_url: null`
- Modal tertutup dengan pesan sukses

### 3. Saat User Klik "Batal" Setelah Hapus Foto

- Photo preview dikembalikan ke kondisi asli
- Tidak ada perubahan yang disimpan ke database
- Modal tertutup tanpa menyimpan

### 4. Saat User Klik "X" (Close) Setelah Hapus Foto

- Same behavior dengan tombol "Batal"
- Photo preview dikembalikan ke kondisi asli

## Keuntungan Implementasi Baru

1. **User Experience Konsisten**: Foto tidak langsung hilang dari database saat dihapus
2. **Reversible Action**: User bisa cancel penghapusan foto
3. **Change Detection Akurat**: Mendeteksi semua jenis perubahan termasuk penghapusan foto
4. **Feedback yang Jelas**: User tahu bahwa foto akan dihapus setelah klik simpan
5. **Consistent Behavior**: Tombol "Batal" dan "X" memiliki behavior yang sama

## Test Case untuk Verifikasi

### Test 1: Hapus Foto + Simpan

- [ ] Buka modal edit dengan foto
- [ ] Klik "Hapus Foto"
- [ ] Muncul pesan "Foto akan dihapus setelah Anda menekan tombol Simpan"
- [ ] Foto hilang dari preview
- [ ] Tombol "Simpan" enabled (tidak disabled)
- [ ] Klik "Simpan"
- [ ] Foto dihapus dari database
- [ ] Modal tertutup dengan pesan sukses

### Test 2: Hapus Foto + Batal

- [ ] Buka modal edit dengan foto
- [ ] Klik "Hapus Foto"
- [ ] Foto hilang dari preview
- [ ] Klik "Batal"
- [ ] Foto kembali muncul di preview
- [ ] Modal tertutup tanpa menyimpan
- [ ] Foto tidak dihapus dari database

### Test 3: Hapus Foto + Close (X)

- [ ] Buka modal edit dengan foto
- [ ] Klik "Hapus Foto"
- [ ] Foto hilang dari preview
- [ ] Klik "X" (close button)
- [ ] Foto kembali muncul di preview
- [ ] Modal tertutup tanpa menyimpan
- [ ] Foto tidak dihapus dari database

### Test 4: Change Detection

- [ ] Buka modal edit dengan foto
- [ ] Klik "Hapus Foto"
- [ ] Klik "Simpan" (tanpa ubah data lain)
- [ ] Tidak muncul pesan "Tidak ada perubahan yang perlu disimpan"
- [ ] Foto berhasil dihapus

## File yang Diubah

- `resources/js/pages/admin/EditBeranda.tsx`

    - Function `hasStrukturChanges()` - deteksi penghapusan foto
    - Function `handleDeletePhoto()` - soft delete
    - Function `handleCancelEdit()` - reset state
    - Function `handleSaveStruktur()` - kirim parameter delete_photo
    - Tombol "Batal" dan "X" - gunakan handleCancelEdit

- `app/Http/Controllers/BerandaController.php`
    - Function `updateStrukturOrganisasi()` - handle delete_photo parameter
    - Validation - tambah delete_photo parameter
    - Logic penghapusan foto - handle berdasarkan parameter

## Implementasi Selesai ✅

- [x] Perbaikan change detection untuk deteksi penghapusan foto
- [x] Soft delete untuk foto (tidak langsung hapus dari database)
- [x] Handle cancel dengan reset state foto
- [x] Backend support untuk parameter delete_photo
- [x] Frontend request dengan parameter delete_photo
- [x] Build frontend assets
- [x] Testing manual

Sekarang sistem photo management bekerja dengan benar: **penghapusan foto bisa dibatalkan, dan change detection mendeteksi semua perubahan termasuk penghapusan foto**.
