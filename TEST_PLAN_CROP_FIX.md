# Test Plan: Image Crop Bug Fix & Edit Photo Feature

## Test Environment

- Browser: Chrome, Firefox, Safari, Edge
- Device: Desktop dan Mobile
- File format: JPEG, PNG, JPG
- File size: 100KB - 2MB

## Test Case 1: Bug Fix - Crop Area Positioning

### TC1.1: Upload Gambar Landscape

**Steps:**

1. Buka halaman Edit Beranda
2. Klik edit pada struktur organisasi
3. Klik "Upload Foto"
4. Pilih gambar landscape (contoh: 1920x1080)
5. Pastikan modal crop terbuka

**Expected Result:**

- Crop area berada di dalam gambar
- Crop area dapat dipindah tanpa keluar dari batas gambar
- Crop area dapat diresize tanpa keluar dari batas gambar

### TC1.2: Upload Gambar Portrait

**Steps:**

1. Ulangi TC1.1 dengan gambar portrait (contoh: 1080x1920)

**Expected Result:**

- Crop area berada di dalam gambar
- Crop area proporsional dengan gambar
- Tidak ada bagian crop yang keluar dari gambar

### TC1.3: Upload Gambar Square

**Steps:**

1. Ulangi TC1.1 dengan gambar square (contoh: 1080x1080)

**Expected Result:**

- Crop area terpusat di gambar
- Crop area maksimal 80% dari ukuran gambar

## Test Case 2: Edit Photo Feature

### TC2.1: Edit Foto yang Sudah Ada

**Steps:**

1. Upload foto dan crop
2. Klik "Simpan" untuk menyimpan
3. Buka kembali modal edit
4. Klik tombol "Edit Foto" (hijau)
5. Pastikan modal crop terbuka

**Expected Result:**

- Modal terbuka dengan title "Edit Foto"
- Gambar yang ditampilkan sesuai dengan foto yang sudah ada
- Crop area sudah terset pada posisi sebelumnya

### TC2.2: Re-crop Existing Photo

**Steps:**

1. Lanjutkan dari TC2.1
2. Ubah posisi dan ukuran crop area
3. Klik "Gunakan Foto"
4. Pastikan preview terupdate

**Expected Result:**

- Preview foto berubah sesuai crop baru
- Tombol "Simpan" dapat diklik
- Perubahan tersimpan setelah klik "Simpan"

### TC2.3: Cancel Edit Photo

**Steps:**

1. Buka modal edit foto
2. Klik "Edit Foto"
3. Ubah crop area
4. Klik "Batal"

**Expected Result:**

- Modal crop tertutup
- Foto preview tidak berubah
- Kembali ke state sebelumnya

## Test Case 3: UI/UX Improvements

### TC3.1: Button States

**Steps:**

1. Upload foto
2. Pastikan tombol "Edit Foto" muncul
3. Pastikan tombol "Hapus Foto" muncul
4. Pastikan tombol "Ganti Foto" muncul

**Expected Result:**

- Semua tombol memiliki icon yang sesuai
- Hover effect bekerja dengan baik
- Disabled state bekerja saat loading

### TC3.2: Modal Title Context

**Steps:**

1. Upload foto baru → pastikan title "Crop Foto Baru"
2. Edit foto existing → pastikan title "Edit Foto"

**Expected Result:**

- Title modal berubah sesuai konteks
- Title jelas dan informatif

### TC3.3: Tooltip/Help Text

**Steps:**

1. Upload foto
2. Pastikan tooltip muncul di bawah preview foto

**Expected Result:**

- Tooltip memberikan petunjuk yang jelas
- Text mudah dibaca dan informatif

## Test Case 4: Edge Cases

### TC4.1: File Size Validation

**Steps:**

1. Upload file > 2MB
2. Upload file corrupt
3. Upload file non-image

**Expected Result:**

- Error message yang jelas
- Tidak crash atau hang
- User dapat upload file lain

### TC4.2: Network Issues

**Steps:**

1. Upload foto dengan koneksi lambat
2. Upload foto dengan koneksi terputus saat proses

**Expected Result:**

- Loading indicator muncul
- Error handling yang baik
- User dapat retry

### TC4.3: Multiple Operations

**Steps:**

1. Upload → Edit → Upload lagi → Edit lagi
2. Upload → Delete → Upload lagi
3. Upload → Edit → Cancel → Edit lagi

**Expected Result:**

- Semua operasi bekerja dengan baik
- Tidak ada memory leak
- State management konsisten

## Test Case 5: Mobile Responsiveness

### TC5.1: Mobile Crop Interface

**Steps:**

1. Buka di mobile device
2. Upload foto dan crop
3. Test touch interaction untuk resize dan move

**Expected Result:**

- Crop area responsive di mobile
- Touch interaction bekerja dengan baik
- Modal tidak terlalu besar untuk mobile

### TC5.2: Mobile Edit Photo

**Steps:**

1. Test fitur edit foto di mobile
2. Pastikan tombol mudah diklik
3. Pastikan modal crop usable di mobile

**Expected Result:**

- Button sizing cocok untuk touch
- Modal crop dapat digunakan dengan baik
- No horizontal scrolling

## Test Case 6: Performance

### TC6.1: Large Image Handling

**Steps:**

1. Upload image 2MB
2. Crop multiple times
3. Monitor memory usage

**Expected Result:**

- Smooth performance
- No memory leak
- Reasonable processing time

### TC6.2: Multiple Images

**Steps:**

1. Edit multiple struktur organisasi
2. Upload dan crop untuk setiap item
3. Monitor overall performance

**Expected Result:**

- Konsisten performance
- No cumulative slowdown
- Proper cleanup

## Acceptance Criteria

### ✅ Bug Fix

- [ ] Crop area selalu berada dalam batas gambar
- [ ] Crop area dapat dipindah dan diresize dengan benar
- [ ] Bekerja di semua ukuran gambar (landscape, portrait, square)

### ✅ Edit Photo Feature

- [ ] Tombol "Edit Foto" muncul saat ada foto preview
- [ ] Modal crop terbuka dengan foto yang benar
- [ ] Re-crop mengupdate preview dengan benar
- [ ] Context title yang berbeda untuk upload vs edit

### ✅ UI/UX

- [ ] Icon dan styling yang konsisten
- [ ] Hover effects bekerja dengan baik
- [ ] Tooltip memberikan guidance yang jelas
- [ ] Responsive di desktop dan mobile

### ✅ Error Handling

- [ ] Validation untuk file size dan format
- [ ] Error message yang user-friendly
- [ ] Graceful handling untuk network issues

## Test Results Log

| Test Case | Status | Browser | Notes        |
| --------- | ------ | ------- | ------------ |
| TC1.1     | ⏳     | Chrome  | To be tested |
| TC1.2     | ⏳     | Chrome  | To be tested |
| TC1.3     | ⏳     | Chrome  | To be tested |
| TC2.1     | ⏳     | Chrome  | To be tested |
| TC2.2     | ⏳     | Chrome  | To be tested |
| TC2.3     | ⏳     | Chrome  | To be tested |
| TC3.1     | ⏳     | Chrome  | To be tested |
| TC3.2     | ⏳     | Chrome  | To be tested |
| TC3.3     | ⏳     | Chrome  | To be tested |

## Notes

- Test dengan berbagai ukuran gambar
- Pastikan crop area tidak pernah keluar dari gambar
- Verifikasi bahwa edit foto feature mudah digunakan
- Check performance dengan gambar besar
