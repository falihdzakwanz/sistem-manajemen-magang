# Database Directory Documentation

## Struktur Folder Database

Folder `database` berisi semua file yang berkaitan dengan struktur dan data database aplikasi.

### Struktur Folder:

```
database/
├── database.sqlite         # SQLite database file
├── .gitignore             # Git ignore untuk database files
├── factories/             # Model factories untuk testing
│   ├── AdminFactory.php   # Factory untuk model Admin
│   └── UserFactory.php    # Factory untuk model User
├── migrations/            # Database migration files
│   ├── 0001_01_01_000000_create_users_table.php
│   ├── 2025_07_04_041239_add_username_to_users_table.php
│   ├── 2025_07_05_192000_create_pesertas_table.php
│   ├── 2025_07_05_192514_create_bidangs_table.php
│   ├── 2025_07_05_192719_add_foreign_key_to_pesertas_table.php
│   ├── 2025_07_06_053005_add_reject_reason_to_pesertas_table.php
│   ├── 2025_07_06_060656_recreate_status_column_fix.php
│   └── 2025_07_06_094127_create_cache_table.php
├── seeders/               # Database seeders
│   ├── AdminSeeder.php    # Seeder untuk data admin
│   ├── BidangSeeder.php   # Seeder untuk data bidang
│   ├── DatabaseSeeder.php # Main seeder class
│   └── UserSeeder.php     # Seeder untuk data user
└── readme-database.md     # Dokumentasi folder ini
```

## Deskripsi Detail File dan Folder:

### 📄 database.sqlite

- **Fungsi**: File database SQLite untuk development
- **Lokasi**: Root folder database
- **Ukuran**: Ringan dan portable
- **Kegunaan**: Development dan testing lokal

### 📁 factories/

Berisi factory classes untuk generate data testing:

#### 📄 AdminFactory.php

- **Fungsi**: Generate data admin untuk testing
- **Menggunakan**: Faker library untuk data dummy
- **Output**: Data admin dengan username, email, password

#### 📄 UserFactory.php

- **Fungsi**: Generate data mahasiswa/peserta magang
- **Fields**: nama, nim, universitas, jurusan, email, dll
- **Relasi**: Terhubung dengan bidang_id

### 📁 migrations/

Berisi file migration untuk struktur database:

#### Urutan Migration (berdasarkan timestamp):

**📄 0001_01_01_000000_create_users_table.php**

- **Fungsi**: Membuat table users untuk admin
- **Fields**: id, name, email, password, username, timestamps
- **Indexes**: Unique pada email dan username

**📄 2025_07_04_041239_add_username_to_users_table.php**

- **Fungsi**: Menambah kolom username ke table users
- **Modifikasi**: Alter table existing

**📄 2025_07_05_192000_create_pesertas_table.php**

- **Fungsi**: Membuat table pesertas (mahasiswa magang)
- **Fields**:
    - id, nama, nim, universitas, jurusan
    - email, telepon
    - tanggal_daftar, tanggal_mulai, tanggal_selesai
    - status, bidang_id
    - surat_pengantar, cv, linkedin, motivasi
    - timestamps

**📄 2025_07_05_192514_create_bidangs_table.php**

- **Fungsi**: Membuat table bidangs (divisi/departemen)
- **Fields**: id, nama_bidang, deskripsi, timestamps
- **Relasi**: One-to-many dengan pesertas

**📄 2025_07_05_192719_add_foreign_key_to_pesertas_table.php**

- **Fungsi**: Menambah foreign key constraint
- **Relasi**: pesertas.bidang_id → bidangs.id
- **Constraint**: CASCADE on delete

**📄 2025_07_06_053005_add_reject_reason_to_pesertas_table.php**

- **Fungsi**: Menambah kolom reject_reason
- **Purpose**: Menyimpan alasan penolakan aplikasi
- **Type**: TEXT nullable

**📄 2025_07_06_060656_recreate_status_column_fix.php**

- **Fungsi**: Memperbaiki kolom status
- **Fix**: Enum atau constraint untuk valid status values
- **Values**: pending, approved, rejected

**📄 2025_07_06_094127_create_cache_table.php**

- **Fungsi**: Membuat table untuk cache storage
- **Purpose**: Database-based caching
- **Fields**: key, value, expiration

### 📁 seeders/

Berisi seeder classes untuk populate data:

#### 📄 DatabaseSeeder.php

- **Fungsi**: Main seeder yang mengatur urutan seeding
- **Calls**: AdminSeeder, BidangSeeder, UserSeeder
- **Usage**: `php artisan db:seed`

#### 📄 AdminSeeder.php

- **Fungsi**: Populate data admin default
- **Data**: Admin user dengan credentials default
- **Security**: Password di-hash dengan bcrypt

#### 📄 BidangSeeder.php

- **Fungsi**: Populate data bidang/divisi
- **Data**: Daftar bidang magang yang tersedia
- **Contoh**: IT, Marketing, HR, Finance, dll

#### 📄 UserSeeder.php

- **Fungsi**: Populate data mahasiswa sample
- **Data**: Sample data peserta magang untuk testing
- **Relasi**: Random assignment ke bidang

## Database Schema Overview:

### Relasi Antar Table:

```
users (Admin)
└── (tidak ada relasi langsung)

bidangs
└── one-to-many → pesertas

pesertas (mahasiswa)
└── belongs-to → bidangs

cache
└── (system table)
```

### Status Flow untuk Pesertas:

1. **pending**: Aplikasi baru diterima
2. **approved**: Aplikasi disetujui
3. **rejected**: Aplikasi ditolak (dengan reject_reason)

## Commands untuk Database:

### Migration Commands:

```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Reset dan re-run semua migrations
php artisan migrate:fresh

# Check migration status
php artisan migrate:status

# Create new migration
php artisan make:migration create_table_name
```

### Seeding Commands:

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=AdminSeeder

# Fresh migrate dengan seeding
php artisan migrate:fresh --seed

# Create new seeder
php artisan make:seeder TableNameSeeder
```

### Factory Commands:

```bash
# Create new factory
php artisan make:factory ModelNameFactory

# Use factory di tinker
php artisan tinker
User::factory(10)->create()
```

## Catatan untuk Developer:

### Best Practices:

1. **Migration Naming**: Gunakan descriptive names dengan timestamp
2. **Rollback Safety**: Selalu buat down() method di migrations
3. **Foreign Keys**: Definisikan dengan proper constraints
4. **Indexes**: Tambahkan index untuk kolom yang sering di-query
5. **Data Types**: Pilih tipe data yang tepat untuk efisiensi

### Database Design:

- **Normalization**: Apply proper database normalization
- **Constraints**: Use database constraints untuk data integrity
- **Soft Deletes**: Consider soft deletes untuk data penting
- **Timestamps**: Gunakan timestamps untuk audit trail

### Performance Tips:

- **Indexing**: Index kolom yang sering digunakan di WHERE clause
- **Query Optimization**: Monitor dan optimize slow queries
- **Connection Pooling**: Configure proper connection pooling
- **Caching**: Implement caching untuk queries yang expensive

### Security Considerations:

- **Sensitive Data**: Encrypt sensitive data di database
- **User Input**: Validate semua input yang masuk ke database
- **SQL Injection**: Gunakan Eloquent ORM untuk prevent SQL injection
- **Backup**: Regular backup database untuk disaster recovery

### Troubleshooting:

- **Migration Errors**: Check syntax dan dependencies
- **Foreign Key Errors**: Verify referenced table exists
- **Seeding Issues**: Check factory definitions dan relationships
- **Connection Issues**: Verify database configuration di .env
