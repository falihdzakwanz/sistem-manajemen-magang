# 🔍 VERIFICATION SCRIPT - DATA CONNECTIONS

## Tujuan

Script ini memverifikasi bahwa semua data terhubung dengan benar antar halaman dan tidak ada data dummy yang tersisa.

## ✅ Checklist Verifikasi

### 1. Database Status

```bash
# Cek tabel yang ada
php artisan tinker
DB::table('pesertas')->count();  # Harus 0 (no dummy data)
DB::table('bidangs')->count();   # Harus 5 (data bidang)
DB::table('users')->count();     # Harus 1 (admin)
```

### 2. Data Flow Test

1. **Form Pendaftaran** (`/daftar-magang`)

    - [x] Load bidang dari database (bukan hardcode)
    - [x] Submit form → data masuk ke tabel `pesertas`
    - [x] Status default: 'Menunggu'

2. **Status Pendaftaran** (`/status-pendaftaran`)

    - [x] Menampilkan data dari form yang baru disubmit
    - [x] Filter dan pencarian berfungsi
    - [x] Auto-update status berdasarkan tanggal

3. **Admin Dashboard** (`/dashboard-admin`)

    - [x] Menampilkan data pendaftar real-time
    - [x] Update status berpengaruh ke halaman status
    - [x] Delete data berfungsi

4. **Data Mahasiswa** (`/data-mahasiswa`)
    - [x] Menampilkan mahasiswa dengan status 'Sedang Magang' & 'Selesai Magang'
    - [x] Statistik berdasarkan data real

### 3. Test Scenario

#### Scenario 1: User Registration Flow

1. User mengisi form di `/daftar-magang`
2. Data tersimpan di database dengan status 'Menunggu'
3. Data muncul di `/status-pendaftaran`
4. Admin melihat data di `/dashboard-admin`
5. Admin approve → status berubah ke 'Diterima'
6. Saat tanggal mulai tiba → auto-update ke 'Sedang Magang'
7. Data muncul di `/data-mahasiswa`
8. Saat tanggal selesai → auto-update ke 'Selesai Magang'

#### Scenario 2: Data Integrity

1. No dummy data in database
2. All pages show real data only
3. Form bidang options loaded from database
4. Auto-update status works correctly

### 4. Manual Testing Steps

1. **Test Form Submission:**

    ```
    - Go to /daftar-magang
    - Fill all fields with real data
    - Upload documents
    - Submit form
    - Check if data appears in /status-pendaftaran
    ```

2. **Test Admin Functions:**

    ```
    - Login to /dashboard-admin
    - Verify new registration appears
    - Update status to 'Diterima'
    - Check if status updated in /status-pendaftaran
    ```

3. **Test Data Flow:**
    ```
    - Create test data with future start date
    - Update status to 'Diterima'
    - Wait for auto-update or manually trigger
    - Verify data appears in /data-mahasiswa
    ```

### 5. Expected Results

- ✅ No dummy data in any table
- ✅ All forms use database-driven options
- ✅ Real-time data synchronization between pages
- ✅ Auto-update status functionality works
- ✅ Email notifications sent on status changes
- ✅ File uploads work correctly
- ✅ All CRUD operations functional

### 6. Common Issues & Solutions

**Issue:** Bidang dropdown empty in form
**Solution:** Ensure BidangSeeder ran correctly

**Issue:** No data showing in pages
**Solution:** Check if any real registrations exist

**Issue:** Auto-update not working
**Solution:** Check date formats and auto-update logic

**Issue:** Email not sending
**Solution:** Configure mail settings in .env

### 7. Monitoring Commands

```bash
# Check database state
php artisan tinker

# Count records
DB::table('pesertas')->count();
DB::table('bidangs')->get();

# Check recent registrations
DB::table('pesertas')->latest()->take(5)->get();

# Test auto-update
php artisan schedule:run
```

### 8. Final Verification

- [ ] Database contains only essential data (bidang, admin)
- [ ] No dummy peserta data
- [ ] Form loads bidang from database
- [ ] All pages show real data
- [ ] Data flow works end-to-end
- [ ] Status updates propagate correctly
- [ ] File uploads work
- [ ] Email notifications functional
