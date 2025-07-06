# 🤖 OTOMATISASI STATUS MAGANG

Sistem otomatisasi untuk mengubah status magang berdasarkan tanggal mulai dan selesai.

## 📋 Fitur Otomatisasi

### 1. Perubahan Status Otomatis

- **Diterima → Sedang Magang**: Ketika `tanggal_mulai` sudah tiba atau lewat
- **Sedang Magang → Selesai Magang**: Ketika `tanggal_selesai` sudah lewat

### 2. Mode Eksekusi

- **Real-time**: Otomatis dijalankan setiap kali halaman dimuat
- **Scheduled**: Dijadwalkan setiap hari jam 00:01
- **Manual**: Admin dapat trigger manual dari dashboard

## 🚀 Cara Menggunakan

### Manual Command Testing

```bash
# Test dengan dry-run (tidak mengubah database)
php artisan magang:update-status --dry-run

# Jalankan update sesungguhnya
php artisan magang:update-status
```

### Scheduling (Laravel)

Command akan otomatis berjalan setiap hari jam 00:01 jika Laravel scheduler aktif:

```bash
# Jalankan scheduler Laravel
php artisan schedule:run

# Atau setup cron job (Linux/Mac)
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

### Windows Task Scheduler

1. Buka Windows Task Scheduler
2. Create Basic Task
3. Trigger: Daily at 00:01
4. Action: Start a program
5. Program: `d:\Kuliah\KP\Website Magang\sistem-manajemen-magang\update-status-magang.bat`

### Real-time Update

Otomatisasi akan berjalan otomatis setiap kali:

- Halaman Status Pendaftaran dimuat
- Halaman Data Mahasiswa dimuat
- Dashboard Admin dimuat

## 📊 Monitoring & Logging

### Log Files

- `storage/logs/magang-status-update.log` - Log otomatis scheduler
- `storage/logs/status-update.log` - Log manual command

### Output Command

Command akan menampilkan:

- Daftar mahasiswa yang akan diupdate
- Jumlah perubahan status
- Ringkasan hasil update

## ⚙️ Konfigurasi

### Jadwal Scheduler

Edit `app/Console/Kernel.php` untuk mengubah jadwal:

```php
// Setiap hari jam 00:01
$schedule->command('magang:update-status')->dailyAt('00:01');

// Setiap 6 jam
$schedule->command('magang:update-status')->everySixHours();

// Setiap jam
$schedule->command('magang:update-status')->hourly();
```

### Auto-update Real-time

Untuk menonaktifkan auto-update real-time, hapus atau comment baris berikut:

- `AdminController::index()` → `$this->autoUpdateStatusIfNeeded();`
- `UserController::getStatusPendaftaran()` → `$this->autoUpdateStatus();`
- `UserController::getDataMahasiswa()` → `$this->autoUpdateStatus();`

## 🔧 Troubleshooting

### Command Error

```bash
# Clear cache jika ada error
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Permissions (Linux/Mac)

```bash
# Set executable permission
chmod +x update-status-magang.bat
```

### Windows Path Issues

Pastikan path di `update-status-magang.bat` sesuai dengan lokasi project Anda.

## 📝 Logic Flowchart

```
Mahasiswa Status "Diterima"
         ↓
   tanggal_mulai <= today?
         ↓ YES
   Status → "Sedang Magang"
         ↓
   tanggal_selesai < today?
         ↓ YES
   Status → "Selesai Magang"
```

## 🚨 Important Notes

1. **Backup Database**: Selalu backup database sebelum menjalankan update massal
2. **Testing**: Gunakan `--dry-run` untuk testing sebelum update sesungguhnya
3. **Timezone**: Pastikan timezone server sesuai dengan timezone lokal
4. **Permissions**: Pastikan Laravel memiliki permission write ke folder logs

## 📞 Support

Jika ada pertanyaan atau masalah, hubungi developer atau cek log error di:

- `storage/logs/laravel.log`
- `storage/logs/magang-status-update.log`
