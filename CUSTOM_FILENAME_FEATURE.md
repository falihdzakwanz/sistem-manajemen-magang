# Fitur Custom Filename untuk Download File

## Deskripsi

Fitur ini memungkinkan admin untuk mendownload file dokumen mahasiswa (surat pengantar dan CV) dengan nama file yang disesuaikan berdasarkan nama lengkap pendaftar magang.

## Implementasi

### 1. Backend (Laravel)

#### Controller Methods

Dua method baru telah ditambahkan di `AdminController.php`:

```php
/**
 * Download file dengan nama yang disesuaikan
 */
public function downloadFile($id, $type)
{
    // Mengambil data mahasiswa berdasarkan ID
    $user = User::findOrFail($id);

    // Menentukan file path dan nama custom berdasarkan type
    if ($type === 'surat_pengantar') {
        $filePath = $user->surat_pengantar;
        $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->nama);
        $cleanName = str_replace(' ', '-', $cleanName);
        $customFileName = 'surat-pengantar_' . $cleanName;
    } elseif ($type === 'cv') {
        $filePath = $user->cv;
        $cleanName = preg_replace('/[^a-zA-Z0-9\s\-_]/', '', $user->nama);
        $cleanName = str_replace(' ', '-', $cleanName);
        $customFileName = 'cv_' . $cleanName;
    }

    // Download file dengan nama yang disesuaikan
    return response()->download($fullPath, $downloadName);
}

/**
 * Preview file dengan nama yang disesuaikan
 */
public function previewFile($id, $type)
{
    // Menampilkan file di browser untuk preview
    return response()->file($fullPath, [
        'Content-Type' => $mimeType,
        'Content-Disposition' => 'inline'
    ]);
}
```

#### Routes

Routes baru telah ditambahkan di `web.php`:

```php
// Download file dengan nama yang disesuaikan
Route::get('/dashboard-admin/download-file/{id}/{type}', [AdminController::class, 'downloadFile'])
    ->name('admin.downloadFile')
    ->where(['id' => '[0-9]+', 'type' => 'surat_pengantar|cv']);

// Preview file
Route::get('/dashboard-admin/preview-file/{id}/{type}', [AdminController::class, 'previewFile'])
    ->name('admin.previewFile')
    ->where(['id' => '[0-9]+', 'type' => 'surat_pengantar|cv']);
```

### 2. Frontend (React TypeScript)

#### Handler Functions

Dua fungsi baru telah ditambahkan di `DashboardAdmin.tsx`:

```typescript
/**
 * Preview file dengan nama yang disesuaikan
 */
const handleFilePreview = (mahasiswaId: number, fileType: string) => {
    const previewUrl = route('admin.previewFile', { id: mahasiswaId, type: fileType });
    window.open(previewUrl, '_blank');
};

/**
 * Download file dengan nama yang disesuaikan
 */
const handleFileDownload = (mahasiswaId: number, fileType: string) => {
    const downloadUrl = route('admin.downloadFile', { id: mahasiswaId, type: fileType });
    window.location.href = downloadUrl;
};
```

#### UI Updates

Tombol preview dan download telah diperbarui untuk menggunakan handler functions yang baru:

```typescript
// Untuk surat pengantar
<button
    onClick={() => handleFilePreview(selectedMahasiswa.id, 'surat_pengantar')}
    className="..."
    title="Lihat File"
>
    Lihat
</button>

<button
    onClick={() => handleFileDownload(selectedMahasiswa.id, 'surat_pengantar')}
    className="..."
    title="Download File"
>
    Download
</button>

// Untuk CV
<button
    onClick={() => handleFilePreview(selectedMahasiswa.id, 'cv')}
    className="..."
    title="Lihat File"
>
    Lihat
</button>

<button
    onClick={() => handleFileDownload(selectedMahasiswa.id, 'cv')}
    className="..."
    title="Download File"
>
    Download
</button>
```

## Format Nama File

### Surat Pengantar

- Format: `surat-pengantar_{nama_lengkap_mahasiswa}.{ekstensi}`
- Contoh: `surat-pengantar_Ahmad-Rizki-Pratama.pdf`

### CV

- Format: `cv_{nama_lengkap_mahasiswa}.{ekstensi}`
- Contoh: `cv_Ahmad-Rizki-Pratama.pdf`

## Pembersihan Nama File

Nama lengkap mahasiswa akan dibersihkan untuk memastikan kompatibilitas dengan sistem file:

1. **Karakter yang dihapus**: Semua karakter selain huruf, angka, spasi, dash (-), dan underscore (\_)
2. **Penggantian spasi**: Semua spasi diganti dengan dash (-)
3. **Contoh transformasi**:
    - `"Ahmad Rizki Pratama"` → `"Ahmad-Rizki-Pratama"`
    - `"Siti Nur'aini"` → `"Siti-Nuraini"`
    - `"Muhammad (Akbar)"` → `"Muhammad-Akbar"`

## Database Query

Data nama lengkap mahasiswa diambil dari tabel `pesertas` dengan field `nama`:

```sql
SELECT nama FROM pesertas WHERE id = ?
```

## Keamanan

1. **Validasi ID**: ID mahasiswa divalidasi sebagai integer
2. **Validasi Type**: Type file dibatasi hanya untuk `surat_pengantar` dan `cv`
3. **File Existence Check**: Memastikan file benar-benar ada sebelum download
4. **Path Traversal Protection**: Menggunakan `storage_path()` untuk mencegah path traversal

## Error Handling

1. **Mahasiswa tidak ditemukan**: Redirect dengan pesan error
2. **File tidak ditemukan**: Redirect dengan pesan error
3. **File tidak ada di server**: Redirect dengan pesan error
4. **Exception handling**: Menangani semua exception dengan graceful error messages

## Testing

Untuk menguji fitur ini:

1. Login sebagai admin
2. Buka dashboard admin
3. Klik "Detail" pada salah satu mahasiswa yang memiliki file
4. Klik tombol "Download" pada surat pengantar atau CV
5. Periksa nama file yang didownload

## Manfaat

1. **Organisasi File**: File yang didownload memiliki nama yang jelas dan terorganisir
2. **Identifikasi Mudah**: Admin dapat dengan mudah mengidentifikasi file milik mahasiswa tertentu
3. **Standarisasi**: Semua file memiliki format nama yang konsisten
4. **User Experience**: Meningkatkan pengalaman pengguna admin dalam mengelola dokumen
