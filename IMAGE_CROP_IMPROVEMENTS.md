# Perbaikan dan Peningkatan Image Crop Feature

## Masalah yang Diperbaiki

### 1. Bug pada ImageCropper

- **Masalah**: Tools crop keluar jalur dari gambar yang dipilih
- **Penyebab**: Perhitungan crop area menggunakan dimensi natural gambar (naturalWidth/naturalHeight) bukan dimensi yang ditampilkan (width/height)
- **Solusi**: Menghitung crop area berdasarkan dimensi gambar yang ditampilkan di browser

### 2. Fitur yang Ditambahkan

#### Tombol Edit Foto

- **Lokasi**: Halaman Edit Beranda → Struktur Organisasi
- **Fungsi**: Memungkinkan user untuk mengedit/re-crop foto yang sudah ada
- **UI**: Tombol hijau dengan icon edit di sebelah tombol "Hapus Foto"

## Perubahan Kode

### 1. ImageCropper.tsx

#### Perbaikan Bug Crop Area

```tsx
// SEBELUM (Bermasalah)
const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const cropSize = Math.min(naturalWidth, naturalHeight);
    const x = (naturalWidth - cropSize) / 2;
    const y = (naturalHeight - cropSize) / 2;

    setCrop({
        unit: 'px',
        width: cropSize,
        height: cropSize,
        x: x,
        y: y,
    });
}, []);

// SESUDAH (Diperbaiki)
const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;

        const displayedWidth = width;
        const displayedHeight = height;

        let cropSize;
        if (aspectRatio === 1) {
            cropSize = Math.min(displayedWidth, displayedHeight) * 0.8;
        } else {
            const maxWidth = displayedWidth * 0.8;
            const maxHeight = displayedHeight * 0.8;

            if (maxWidth / aspectRatio <= maxHeight) {
                cropSize = maxWidth;
            } else {
                cropSize = maxHeight * aspectRatio;
            }
        }

        const x = (displayedWidth - cropSize) / 2;
        const y = (displayedHeight - cropSize / aspectRatio) / 2;

        const initialCrop: Crop = {
            unit: 'px',
            width: cropSize,
            height: cropSize / aspectRatio,
            x: Math.max(0, x),
            y: Math.max(0, y),
        };

        setCrop(initialCrop);
        setImageLoaded(true);
        setCompletedCrop(initialCrop);
    },
    [aspectRatio],
);
```

#### Penambahan Props Title

```tsx
interface ImageCropperProps {
    // ... existing props
    title?: string;
}

// Usage
<h3 className="text-lg font-semibold text-gray-900">{title}</h3>;
```

### 2. EditBeranda.tsx

#### State Tambahan

```tsx
const [isEditingExistingPhoto, setIsEditingExistingPhoto] = useState(false);
```

#### Fungsi Edit Foto

```tsx
const handleEditPhoto = () => {
    if (photoPreview) {
        setImageToCrop(photoPreview);
        setIsEditingExistingPhoto(true);
        setShowCropModal(true);
    }
};
```

#### UI Improvements

```tsx
// Tombol Edit Foto
<button
    onClick={handleEditPhoto}
    className="inline-flex items-center rounded-xl bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:opacity-50"
    disabled={loading}
>
    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
    Edit Foto
</button>

// Title dinamis untuk modal crop
<ImageCropper
    title={isEditingExistingPhoto ? "Edit Foto" : "Crop Foto Baru"}
    // ... other props
/>
```

## Alur Kerja Baru

### 1. Upload Foto Baru

1. User klik "Upload Foto" atau "Ganti Foto"
2. Pilih file gambar
3. Modal crop terbuka dengan title "Crop Foto Baru"
4. User crop sesuai keinginan
5. Klik "Gunakan Foto"

### 2. Edit Foto yang Ada

1. User klik "Edit Foto" (tombol hijau)
2. Modal crop terbuka dengan foto yang sudah ada
3. Modal memiliki title "Edit Foto"
4. User re-crop sesuai keinginan
5. Klik "Gunakan Foto"

## Manfaat Perbaikan

1. **Bug Fix**: Crop area tidak lagi keluar jalur dari gambar
2. **UX Improvement**: User dapat mengedit foto yang sudah ada tanpa harus upload ulang
3. **Visual Enhancement**: Icon dan styling yang lebih baik
4. **Contextual UI**: Title modal yang berbeda untuk upload baru vs edit
5. **Better Guidance**: Tooltip yang menjelaskan fungsi tombol

## Testing

### Test Case untuk Bug Fix

1. Upload gambar dengan berbagai ukuran (landscape, portrait, square)
2. Pastikan crop area selalu berada dalam batas gambar
3. Pastikan crop area dapat dipindah dan diresize dengan benar

### Test Case untuk Edit Foto

1. Upload foto dan crop
2. Klik "Edit Foto" dan pastikan modal terbuka dengan foto yang benar
3. Re-crop dan pastikan hasilnya terupdate
4. Test dengan berbagai ukuran gambar

## Catatan Teknis

- Menggunakan `width` dan `height` dari displayed image, bukan `naturalWidth` dan `naturalHeight`
- Crop area dibatasi 80% dari ukuran gambar untuk memberikan ruang yang cukup
- State `isEditingExistingPhoto` untuk membedakan context modal
- Proper cleanup di semua handler untuk mencegah memory leak
