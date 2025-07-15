# Auto Cleanup Data Ditolak - Documentation

## Overview

Fitur ini secara otomatis menghapus data pendaftar yang statusnya "Ditolak" setelah melewati periode tertentu (default: 30 hari). Fitur ini membantu menjaga database tetap bersih dan mengurangi storage yang digunakan.

## Fitur Utama

- ✅ Hapus data pendaftar yang ditolak > 30 hari (konfigurabel)
- ✅ Hapus file terkait (CV, surat pengantar) dari storage
- ✅ Mode dry-run untuk testing
- ✅ Logging aktivitas cleanup
- ✅ Tracking tanggal penolakan yang akurat
- ✅ Schedule otomatis setiap hari

## Command Manual

### Dry Run (Testing)

```bash
php artisan magang:cleanup-rejected --dry-run
```

### Cleanup Real (Hapus Data)

```bash
php artisan magang:cleanup-rejected
```

### Custom Period

```bash
# Hapus data yang ditolak > 60 hari
php artisan magang:cleanup-rejected --days=60

# Hapus data yang ditolak > 7 hari (testing)
php artisan magang:cleanup-rejected --days=7 --dry-run
```

## Schedule Otomatis

Command akan dijalankan otomatis setiap hari jam 02:00 WIB.

Konfigurasi di `app/Console/Kernel.php`:

```php
$schedule->command('magang:cleanup-rejected --no-interaction')
    ->dailyAt('02:00')
    ->name('cleanup-rejected-data')
    ->emailOutputOnFailure(config('mail.admin_email', 'admin@example.com'))
    ->appendOutputTo(storage_path('logs/magang-cleanup.log'));
```

## Database Changes

### Migration Baru

- **File**: `add_rejected_at_to_pesertas_table.php`
- **Kolom Baru**: `rejected_at` (timestamp, nullable)
- **Tujuan**: Tracking kapan data ditolak dengan lebih akurat

### Model Update

- Model `User` ditambahkan kolom `rejected_at` di `$fillable` dan `$dates`

## File Yang Terlibat

### Command Baru

- `app/Console/Commands/CleanupRejectedData.php`

### Migration

- `database/migrations/2025_07_15_032755_add_rejected_at_to_pesertas_table.php`

### Updated Files

- `app/Console/Kernel.php` (schedule)
- `app/Models/User.php` (model)

### Testing

- `test-cleanup-rejected.bat` (Windows batch file untuk testing)

## Cara Kerja

1. **Identifikasi Data**: Mencari data dengan status "Ditolak"
2. **Cek Tanggal**:
    - Prioritas: gunakan `rejected_at` jika ada
    - Fallback: gunakan `updated_at` jika `rejected_at` kosong
3. **Filter Periode**: Ambil data yang sudah lewat periode yang ditentukan
4. **Hapus File**: Hapus CV dan surat pengantar dari storage
5. **Hapus Record**: Hapus data dari database
6. **Logging**: Catat aktivitas di log file

## Safety Features

### Dry Run Mode

- Tampilkan data yang akan dihapus tanpa menghapus
- Testing aman sebelum cleanup real

### Konfirmasi Interactive

- Meminta konfirmasi sebelum menghapus (mode manual)
- Otomatis dilewati saat dijalankan via scheduler

### Logging

- Semua aktivitas dicatat di log
- Email notifikasi jika terjadi error

## Monitoring

### Log File

```
storage/logs/magang-cleanup.log
```

### Laravel Log

```
storage/logs/laravel.log
```

### Command Output Sample

```
🧹 Memulai cleanup data yang ditolak untuk periode lebih dari 30 hari
📅 Data yang ditolak sebelum: 15-06-2025 10:30:25
📊 Ditemukan 5 data yang akan dihapus:

+----+----------------+----------+------------------+-------------------+-----------+
| ID | Nama           | NIM      | Email            | Tanggal Ditolak   | Hari Berlalu |
+----+----------------+----------+------------------+-------------------+-----------+
| 15 | John Doe       | 12345678 | john@example.com | 10-05-2025 14:20:10 | 36 hari   |
+----+----------------+----------+------------------+-------------------+-----------+

🎉 Cleanup selesai!
📄 5 record dihapus
📁 10 file dihapus
```

## Konfigurasi

### Ubah Period Default

Edit command signature di `CleanupRejectedData.php`:

```php
protected $signature = 'magang:cleanup-rejected {--days=60}'; // Ubah dari 30 ke 60
```

### Ubah Schedule Time

Edit di `app/Console/Kernel.php`:

```php
$schedule->command('magang:cleanup-rejected --no-interaction')
    ->dailyAt('03:00') // Ubah dari 02:00 ke 03:00
```

### Email Notifications

Set di `.env`:

```
MAIL_ADMIN_EMAIL=admin@company.com
```

## Migration Commands

### Run Migration

```bash
php artisan migrate
```

### Rollback (Jika Diperlukan)

```bash
php artisan migrate:rollback --step=1
```

## Testing

### 1. Testing Dry Run

```bash
php artisan magang:cleanup-rejected --dry-run
```

### 2. Testing dengan Period Pendek

```bash
php artisan magang:cleanup-rejected --days=1 --dry-run
```

### 3. Testing Schedule

```bash
php artisan schedule:work
```

### 4. Testing via Batch File

```bash
test-cleanup-rejected.bat
```

## Troubleshooting

### Command Not Found

```bash
php artisan list | grep cleanup
```

### Permission Issues

```bash
chmod +x storage/logs/
```

### Storage Issues

```bash
php artisan storage:link
```

## Best Practices

1. **Selalu Testing Dulu**: Gunakan `--dry-run` sebelum cleanup real
2. **Backup Database**: Backup database sebelum cleanup pertama kali
3. **Monitor Log**: Periksa log file secara berkala
4. **Set Email Alert**: Konfigurasi email admin untuk notifikasi error
5. **Custom Period**: Sesuaikan period cleanup dengan kebutuhan bisnis

## Future Enhancements

- [ ] Soft delete option (archive instead of permanent delete)
- [ ] Admin notification email untuk cleanup summary
- [ ] Web interface untuk manage cleanup settings
- [ ] Restore functionality untuk data yang salah terhapus
- [ ] Export data sebelum dihapus (backup otomatis)
