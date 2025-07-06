# Fitur Edit Status dan Hapus Data Mahasiswa

## Deskripsi

Fitur ini memungkinkan admin untuk mengedit status mahasiswa dan menghapus data mahasiswa langsung dari modal detail di Dashboard Admin.

## Fitur yang Ditambahkan

### 1. Edit Status

- **Akses**: Tersedia untuk mahasiswa dengan status "Menunggu", "Diterima", dan "Ditolak"
- **Fungsi**: Admin dapat mengubah status mahasiswa ke status lain
- **Status yang tersedia**:
    - Menunggu
    - Diterima
    - Ditolak
    - Sedang Magang
    - Selesai Magang

### 2. Hapus Data

- **Akses**: Tersedia untuk mahasiswa dengan status "Menunggu", "Diterima", dan "Ditolak"
- **Fungsi**: Admin dapat menghapus data mahasiswa beserta file dokumennya
- **Konfirmasi**: Modal konfirmasi untuk mencegah penghapusan tidak sengaja
- **File handling**: Otomatis menghapus file surat pengantar dan CV dari storage

## Cara Penggunaan

### Edit Status:

1. Buka detail mahasiswa dengan mengklik ikon mata
2. Klik tombol "Edit Status" (biru) di bagian bawah modal
3. Pilih status baru dari dropdown
4. Klik "Simpan Perubahan"

### Hapus Data:

1. Buka detail mahasiswa dengan mengklik ikon mata
2. Klik tombol "Hapus Data" (merah) di bagian bawah modal
3. Konfirmasi penghapusan di modal yang muncul
4. Klik "Ya, Hapus Data"

## Perubahan Kode

### Frontend (DashboardAdmin.tsx)

- Menambah state untuk modal edit dan hapus
- Menambah fungsi `openEditModal`, `closeEditModal`, `handleEditStatus`
- Menambah fungsi `openDeleteModal`, `closeDeleteModal`, `handleDeleteMahasiswa`
- Menambah tombol Edit Status dan Hapus Data di modal detail
- Menambah modal edit status dan modal konfirmasi hapus

### Backend (AdminController.php)

- Menambah method `deleteMahasiswa` untuk menghapus data mahasiswa
- Otomatis menghapus file dokumen saat menghapus data mahasiswa

### Routes (web.php)

- Menambah route DELETE untuk hapus mahasiswa: `/dashboard-admin/mahasiswa/{id}`

## Keamanan

- Semua aksi dilindungi middleware auth dan verified
- Konfirmasi sebelum penghapusan data
- Validasi status sebelum mengubah
- Error handling untuk kasus data tidak ditemukan

## File yang Dimodifikasi

1. `resources/js/pages/admin/DashboardAdmin.tsx`
2. `app/Http/Controllers/AdminController.php`
3. `routes/web.php`

## Catatan

- Fitur ini hanya tersedia untuk mahasiswa dengan status tertentu
- Penghapusan data bersifat permanen dan tidak dapat dibatalkan
- File dokumen akan otomatis terhapus saat data mahasiswa dihapus
