# Session Expired dan Save Button Fix - Implementasi

## Problem yang Diselesaikan

1. **Session Expired Error**: Terjadi ketika user mengedit struktur organisasi (foto) dan menekan tombol simpan
2. **Save Button Behavior**: Tombol simpan harus disabled ketika belum ada perubahan yang dilakukan

## Solusi yang Diimplementasikan

### 1. Frontend Changes (EditBeranda.tsx)

#### A. Change Detection System

- **State Management**: Ditambahkan `originalStrukturData` dan `originalBidangData` untuk menyimpan data asli
- **Change Detection Functions**:
    - `hasStrukturChanges()`: Mengecek perubahan title, description, dan photo
    - `hasBidangChanges()`: Mengecek perubahan title, description, dan semua field dalam data object

#### B. Modal Opening Functions

- **openEditStruktur()**: Sekarang menyimpan data asli untuk perbandingan
- **openEditBidang()**: Sekarang menyimpan data asli untuk perbandingan

#### C. Save Button Enhancement

- **Disabled State**: Tombol "Simpan" disabled ketika:
    - Sedang loading (seperti sebelumnya)
    - Tidak ada perubahan yang terdeteksi
- **Visual Feedback**:
    - Warna abu-abu ketika disabled
    - Tooltip menunjukkan alasan mengapa disabled
- **Validation**: Sebelum menyimpan, cek apakah ada perubahan

### 2. Backend Changes (BerandaController.php)

#### A. Session Management Improvements

- **Session Save**: Menggunakan `$request->session()->save()` untuk memperpanjang session lifetime
- **Konsisten di semua function**: uploadTempPhoto, deletePhoto, resetTempPhoto, updateStrukturOrganisasi, updateBidang

#### B. Change Detection di Backend

- **updateStrukturOrganisasi()**: Mengecek perubahan sebelum menyimpan
- **updateBidang()**: Mengecek perubahan dengan JSON comparison untuk data yang kompleks
- **Response Handling**: Return dengan pesan "Tidak ada perubahan yang perlu disimpan" jika tidak ada perubahan

#### C. Error Prevention

- **Validation First**: Validasi dilakukan sebelum pengecekan perubahan
- **Consistent Error Handling**: Semua function menggunakan try-catch yang konsisten

## Code Changes Detail

### Frontend (EditBeranda.tsx)

```typescript
// Added change detection states
const [originalStrukturData, setOriginalStrukturData] = useState<StrukturOrganisasi | null>(null);
const [originalBidangData, setOriginalBidangData] = useState<BidangData | null>(null);

// Change detection functions
const hasStrukturChanges = (): boolean => {
    if (!originalStrukturData) return false;
    return (
        strukturForm.title !== originalStrukturData.title ||
        strukturForm.description !== originalStrukturData.description ||
        strukturForm.photo !== null
    );
};

// Enhanced save button
<button
    onClick={activeTab === 'struktur' ? handleSaveStruktur : handleSaveBidang}
    className={`rounded-xl px-6 py-2 text-white ${
        loading ||
        (activeTab === 'struktur' && !hasStrukturChanges()) ||
        (activeTab === 'bidang' && !hasBidangChanges())
            ? 'cursor-not-allowed bg-gray-400 opacity-50'
            : 'bg-blue-500 hover:bg-blue-600'
    }`}
    disabled={
        loading ||
        (activeTab === 'struktur' && !hasStrukturChanges()) ||
        (activeTab === 'bidang' && !hasBidangChanges())
    }
>
    {loading ? 'Menyimpan...' : 'Simpan'}
</button>
```

### Backend (BerandaController.php)

```php
// Session management improvement
$request->session()->save();

// Change detection
$hasChanges = false;
if ($existingContent) {
    if ($existingContent->title !== $request->title ||
        $existingContent->description !== $request->description ||
        $request->hasFile('photo') ||
        $request->session()->has('temp_photo_' . $request->key)) {
        $hasChanges = true;
    }
} else {
    $hasChanges = true; // New content
}

// Prevent unnecessary saves
if (!$hasChanges) {
    return redirect()->back()->with('info', 'Tidak ada perubahan yang perlu disimpan.');
}
```

## Testing Guidelines

### 1. Test Cases untuk Save Button

- [ ] Buka modal edit struktur organisasi
- [ ] Tombol "Simpan" harus disabled (abu-abu)
- [ ] Ubah nama atau jabatan
- [ ] Tombol "Simpan" harus enabled (biru)
- [ ] Klik "Simpan" tanpa mengubah apapun
- [ ] Harus muncul pesan "Tidak ada perubahan yang perlu disimpan"

### 2. Test Cases untuk Session Expired

- [ ] Buka modal edit struktur organisasi
- [ ] Upload foto atau ubah data
- [ ] Tunggu beberapa menit (simulasi long editing)
- [ ] Klik "Simpan"
- [ ] Tidak boleh muncul "Session expired" error
- [ ] Data berhasil tersimpan dengan sukses

### 3. Test Cases untuk Photo Upload

- [ ] Upload foto temporary
- [ ] Tombol "Simpan" harus enabled
- [ ] Klik "Simpan"
- [ ] Foto berhasil disimpan permanent
- [ ] Tidak ada session expired error

## File-file yang Diubah

1. `resources/js/pages/admin/EditBeranda.tsx` - Frontend logic
2. `app/Http/Controllers/BerandaController.php` - Backend logic
3. Frontend assets di-build ulang

## Manfaat Implementasi

1. **User Experience**: Tombol Save disabled ketika tidak ada perubahan mencegah aksi yang tidak perlu
2. **Session Stability**: Session management yang lebih baik mencegah timeout error
3. **Data Integrity**: Double-check di frontend dan backend memastikan hanya perubahan yang valid disimpan
4. **Performance**: Menghindari database write yang tidak perlu
5. **Error Prevention**: Mengurangi kemungkinan session expired error pada operasi photo upload

## Notes

- Session timeout default masih 120 menit (2 jam)
- Implementasi menggunakan `$request->session()->save()` untuk memperpanjang session
- Frontend change detection real-time untuk immediate feedback
- Backend validation tetap ada sebagai safety net
