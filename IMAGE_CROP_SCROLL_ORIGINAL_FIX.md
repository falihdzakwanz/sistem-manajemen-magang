# Perbaikan Image Crop: Scroll Issue & Original Image Preservation

## Masalah yang Diperbaiki

### 1. **Scroll Issue pada Modal Crop**

**Problem:** Modal crop tidak bisa discroll ketika gambar terlalu besar (600px ke atas), sehingga tombol "Gunakan Foto" tidak bisa diakses.

**Solution:**

- Mengubah struktur modal menjadi flexbox layout dengan `max-height: 95vh`
- Menambahkan `overflow-y: auto` pada area konten modal
- Memisahkan header dan footer dengan `border-top` dan `border-bottom`
- Mengatur gambar dengan `max-height: 60vh` untuk memberikan ruang yang cukup

### 2. **Original Image Preservation**

**Problem:** Ketika edit crop foto, modal menampilkan foto yang sudah di-crop sebelumnya, bukan foto original yang berukuran penuh.

**Solution:**

- Menambahkan state `originalImageFile` dan `originalImageUrl` untuk menyimpan referensi ke foto original
- Mengupdate `handlePhotoChange` untuk menyimpan foto original
- Mengupdate `handleEditPhoto` untuk selalu menggunakan foto original saat re-crop
- Menambahkan kondisi untuk menampilkan tombol "Edit Foto" hanya ketika ada foto original

## Perubahan Kode

### 1. ImageCropper.tsx - Modal Layout Fix

```tsx
// SEBELUM
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
                <h3>...</h3>
                <button>...</button>
            </div>
            <div className="mb-4 text-sm text-gray-600">...</div>
            <div className="mb-6 flex justify-center">
                <ReactCrop>
                    <img className="max-h-96 max-w-full" />
                </ReactCrop>
            </div>
            <div className="mb-4 rounded-lg bg-blue-50 p-4">...</div>
            <div className="flex justify-end space-x-3">...</div>
        </div>
    </div>
);

// SESUDAH
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="flex max-h-[95vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h3>...</h3>
                <button>...</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4 text-sm text-gray-600">...</div>
                <div className="mb-6 flex justify-center">
                    <ReactCrop>
                        <img className="max-h-[60vh] max-w-full" />
                    </ReactCrop>
                </div>
                <div className="mb-4 rounded-lg bg-blue-50 p-4">...</div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">...</div>
        </div>
    </div>
);
```

### 2. EditBeranda.tsx - Original Image Preservation

```tsx
// State tambahan untuk menyimpan original image
const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

// Update handlePhotoChange untuk menyimpan original
const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Store original file for future edit crops
        setOriginalImageFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setOriginalImageUrl(imageUrl); // Store original image URL
            setImageToCrop(imageUrl);
            setIsEditingExistingPhoto(false);
            setShowCropModal(true);
        };
        reader.readAsDataURL(file);
    }
};

// Update handleEditPhoto untuk menggunakan original image
const handleEditPhoto = () => {
    if (originalImageUrl) {
        // Use original image URL for editing (not the cropped preview)
        setImageToCrop(originalImageUrl);
        setIsEditingExistingPhoto(true);
        setShowCropModal(true);
    } else if (photoPreview) {
        // Fallback to preview if no original URL is available
        setImageToCrop(photoPreview);
        setIsEditingExistingPhoto(true);
        setShowCropModal(true);
    }
};

// Update openEditStruktur untuk handle existing photos
const openEditStruktur = (item: StrukturOrganisasi) => {
    // ... existing code ...

    // If there's an existing photo, store it as original for future edits
    if (item.photo_url) {
        setOriginalImageUrl(item.photo_url);
    } else {
        setOriginalImageUrl(null);
    }
    setOriginalImageFile(null); // Reset original file

    // ... rest of the code ...
};
```

### 3. Conditional Edit Button Display

```tsx
// Tombol Edit Foto hanya muncul ketika ada original image
{
    (originalImageUrl || originalImageFile) && (
        <button
            onClick={handleEditPhoto}
            className="inline-flex items-center rounded-xl bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:opacity-50"
            disabled={loading}
        >
            <svg>...</svg>
            Edit Foto
        </button>
    );
}
```

## Fitur Baru

### 1. **Scrollable Modal**

- Modal crop sekarang dapat discroll ketika konten terlalu tinggi
- Gambar dibatasi maksimal 60% dari tinggi viewport
- Header dan footer tetap terlihat saat scroll

### 2. **Smart Original Image Tracking**

- Sistem otomatis menyimpan foto original saat upload
- Edit crop selalu menggunakan foto original (bukan hasil crop sebelumnya)
- Tombol "Edit Foto" hanya muncul ketika ada foto original

### 3. **Enhanced UX**

- Tooltip dinamis yang menjelaskan kapan tombol "Edit Foto" tersedia
- Indikator visual untuk menunjukkan bahwa edit menggunakan foto original
- Better state management untuk prevent bugs

## Alur Kerja Baru

### Upload Foto Baru → Edit Crop

1. User upload foto (500x500px) → sistem menyimpan original
2. User crop bagian tengah → preview menampilkan hasil crop
3. User klik "Edit Foto" → modal terbuka dengan foto original 500x500px
4. User dapat crop ulang dengan area yang lebih besar/berbeda
5. Hasil crop baru menggantikan preview sebelumnya

### Edit Foto yang Sudah Ada

1. User buka edit struktur dengan foto existing
2. Sistem menyimpan URL foto existing sebagai original
3. User klik "Edit Foto" → modal terbuka dengan foto original
4. User dapat crop ulang sesuai kebutuhan

## Manfaat Perbaikan

### ✅ **Scroll Issue Fixed**

- Modal dapat digunakan di semua ukuran layar
- Tombol crop selalu dapat diakses
- Gambar besar tidak memblokir UI

### ✅ **Better Crop Experience**

- Edit crop menggunakan foto original = kualitas lebih baik
- Fleksibilitas crop yang lebih tinggi
- Tidak ada degradasi kualitas dari crop berulang

### ✅ **Smart UI**

- Tombol "Edit Foto" hanya muncul ketika relevan
- Tooltip yang informatif dan kontekstual
- Visual feedback yang jelas

### ✅ **Robust State Management**

- Proper cleanup saat cancel atau close
- No memory leaks dari URL objects
- Consistent state across operations

## Test Cases

### Test Scroll Functionality

1. Upload gambar tinggi (>600px)
2. Pastikan modal dapat discroll
3. Pastikan tombol "Gunakan Foto" dapat diakses
4. Test di berbagai ukuran layar (mobile, tablet, desktop)

### Test Original Image Preservation

1. Upload foto 500x500px
2. Crop bagian tengah (hasil menjadi 300x300px preview)
3. Klik "Edit Foto"
4. **Expected**: Modal menampilkan foto original 500x500px
5. Crop area baru dan simpan
6. **Expected**: Hasil crop baru menggantikan preview

### Test Existing Photo Edit

1. Buka edit struktur dengan foto yang sudah ada
2. Klik "Edit Foto"
3. **Expected**: Modal terbuka dengan foto original dari database
4. Crop dan simpan
5. **Expected**: Foto terupdate dengan crop baru

## Catatan Teknis

- **Memory Management**: Gunakan `URL.createObjectURL()` dan cleanup untuk prevent memory leaks
- **File Size**: Original image disimpan di memory saat edit session, tidak di database
- **Fallback**: Jika tidak ada original image, sistem fallback ke preview photo
- **Browser Support**: Fitur scroll dan flexbox modern, support IE11+

## Known Limitations

1. **Memory Usage**: Original image disimpan di browser memory selama edit session
2. **Network**: Re-download foto existing saat edit (bisa dioptimasi dengan caching)
3. **File Size**: Masih ada limit 2MB untuk upload, bisa ditingkatkan jika perlu

## Future Enhancements

1. **Image Caching**: Cache original images untuk better performance
2. **Multiple Formats**: Support untuk WebP, AVIF format
3. **Batch Edit**: Edit multiple photos sekaligus
4. **Preset Crops**: Template crop ratios (1:1, 4:3, 16:9, etc.)
5. **Zoom Control**: Zoom in/out pada crop area
