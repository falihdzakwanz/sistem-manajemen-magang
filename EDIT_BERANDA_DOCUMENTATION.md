# Dokumentasi Fitur Edit Beranda

## Overview

Fitur Edit Beranda memungkinkan admin untuk mengedit konten beranda website magang, termasuk struktur organisasi dan data bidang secara real-time.

## Fitur yang Tersedia

### 1. Edit Struktur Organisasi

Admin dapat mengubah:

- **Nama**: Nama lengkap pejabat
- **Jabatan**: Deskripsi jabatan
- **Foto**: Upload foto profil (JPG, PNG, max 2MB)

**Cara Menggunakan:**

1. Login ke dashboard admin
2. Klik tombol "Edit Beranda" di header
3. Pilih tab "Struktur Organisasi"
4. Klik tombol "Edit" pada kartu yang ingin diubah
5. Isi form dan upload foto jika diperlukan
6. Klik "Simpan"

### 2. Edit Data Bidang

Admin dapat mengubah:

- **Nama Bidang**: Nama lengkap bidang
- **Kepala Bidang**: Nama kepala bidang
- **Icon**: Emoji untuk representasi visual
- **Warna**: Pilihan warna tema bidang
- **Deskripsi**: Deskripsi singkat bidang
- **Tugas dan Tanggung Jawab**: Daftar tugas utama
- **Kegiatan Magang**: Daftar kegiatan untuk peserta magang
- **Staff Fungsional**: Daftar staff dan jabatan

**Cara Menggunakan:**

1. Login ke dashboard admin
2. Klik tombol "Edit Beranda" di header
3. Pilih tab "Data Bidang"
4. Klik tombol "Edit" pada kartu bidang yang ingin diubah
5. Isi semua field yang diperlukan
6. Gunakan tombol "+ Tambah" untuk menambah item baru
7. Gunakan tombol "✕" untuk menghapus item
8. Klik "Simpan"

## Technical Details

### Database Structure

Tabel: `beranda_contents`

- `id`: Primary key
- `content_type`: Jenis konten ('struktur_organisasi' atau 'bidang')
- `key`: Identifier unik untuk konten
- `title`: Judul/nama
- `description`: Deskripsi
- `photo_url`: URL foto (untuk struktur organisasi)
- `data`: Data JSON kompleks (untuk bidang)

### File Storage

- Foto disimpan di: `storage/app/public/photos/struktur-organisasi/`
- Akses melalui: `/storage/photos/struktur-organisasi/{filename}`
- Format yang didukung: JPG, PNG
- Ukuran maksimal: 2MB

### API Endpoints

- `GET /api/beranda-content`: Mengambil data beranda
- `POST /admin/update-struktur-organisasi`: Update struktur organisasi
- `POST /admin/update-bidang`: Update data bidang
- `DELETE /admin/delete-photo`: Hapus foto

## Troubleshooting

### 1. Foto tidak muncul

- Pastikan symbolic link storage sudah dibuat: `php artisan storage:link`
- Periksa permission folder storage
- Pastikan file foto ada di direktori yang benar

### 2. Data tidak tersimpan

- Periksa log Laravel di `storage/logs/laravel.log`
- Pastikan validasi form terpenuhi
- Periksa koneksi database

### 3. Error 500

- Periksa log error di browser console
- Periksa log Laravel
- Pastikan semua dependencies terinstall

## Security Features

- CSRF protection pada semua form
- Validasi file upload (type dan size)
- Autentikasi required untuk akses admin
- Sanitasi input data

## Backup Recommendations

- Backup database sebelum melakukan perubahan besar
- Backup folder `storage/app/public/photos/` secara berkala
- Test perubahan di environment development terlebih dahulu
