# App Directory Documentation

## Struktur Folder App

Folder `app` adalah inti dari aplikasi Laravel yang berisi semua logika bisnis, model, controller, dan komponen aplikasi lainnya.

### Struktur Folder:

```
app/
├── Console/              # Artisan commands
│   ├── Commands/         # Custom artisan commands
│   └── Kernel.php        # Command scheduling kernel
├── Http/                 # HTTP layer components
│   ├── Controllers/      # Application controllers
│   ├── Middleware/       # HTTP middleware
│   └── Requests/         # Form request validation
├── Mail/                 # Email notification classes
├── Models/               # Eloquent model classes
├── Providers/            # Service providers
└── readme-app.md         # Dokumentasi folder ini
```

## Deskripsi Detail Folder dan File:

### 📁 Console/

Berisi semua custom Artisan commands untuk aplikasi.

#### 📄 Kernel.php

- **Fungsi**: Mendefinisikan schedule untuk command yang berjalan secara otomatis
- **Penggunaan**: Mengatur cron jobs dan task scheduling
- **Contoh**: Menjalankan update status magang secara berkala

#### 📁 Commands/

Berisi custom artisan commands:

- **TestEmailCommand.php**: Command untuk testing pengiriman email
- **UpdateStatusMagang.php**: Command untuk update otomatis status magang

### 📁 Http/

#### 📁 Controllers/

Berisi controller yang menangani HTTP requests:

**📄 UserController.php**

```php
// Fungsi utama:
- create(): Menampilkan form pendaftaran magang
- store(): Menyimpan data pendaftaran baru
- Validasi data input mahasiswa
- Upload file surat pengantar dan CV
- Integrasi dengan Inertia.js untuk frontend React
```

**📄 AdminController.php**

- Mengelola dashboard admin
- CRUD operations untuk data mahasiswa
- Approve/reject pendaftaran magang
- Export data ke Excel/PDF

**📄 Controller.php**

- Base controller class
- Shared functionality untuk semua controllers

#### 📁 Auth/

- Authentication controllers
- Login/logout logic
- Password reset functionality

#### 📁 Middleware/

- HTTP middleware untuk filtering requests
- Authentication checks
- Role-based access control

#### 📁 Requests/

- Form request validation classes
- Custom validation rules
- Data sanitization

### 📁 Mail/

**📄 StatusMagangNotification.php**

```php
// Fungsi utama:
- Mengirim email notifikasi perubahan status magang
- Template email untuk approval/rejection
- Personalisasi pesan berdasarkan status
- Integrasi dengan queue system untuk async processing

// Properties:
- $mahasiswa: Data mahasiswa penerima
- $status: Status baru (approved/rejected)
- $rejectReason: Alasan penolakan (jika ditolak)
```

### 📁 Models/

**📄 User.php**

```php
// Model untuk data mahasiswa magang
protected $table = 'pesertas';

// Fillable fields:
- nama, nim, universitas, jurusan
- email, telepon
- tanggal_daftar, tanggal_mulai, tanggal_selesai
- status, bidang_id
- surat_pengantar, cv, linkedin, motivasi
- reject_reason

// Relationships:
- belongsTo(Bidang::class): Relasi ke bidang magang
```

**📄 Admin.php**

```php
// Model untuk admin system
protected $table = 'users';

// Extends Authenticatable untuk login functionality
// Fillable fields: name, email, username, password
// Hidden fields: password, remember_token
```

**📄 Bidang.php**

- Model untuk bidang/divisi magang
- Relationship dengan User model
- Manage available internship fields

### 📁 Providers/

**📄 AppServiceProvider.php**

- Mendaftarkan services ke container
- Global configurations
- Service bindings dan singletons

## Catatan untuk Developer:

### Best Practices:

1. **Controllers**: Gunakan Resource Controllers untuk CRUD operations
2. **Models**: Definisikan relationships dengan jelas
3. **Validation**: Gunakan Form Requests untuk validasi complex
4. **Mail**: Gunakan Queue untuk email notifications
5. **Commands**: Buat commands untuk task yang repetitive

### Struktur Naming:

- Controllers: PascalCase dengan suffix "Controller"
- Models: PascalCase singular form
- Methods: camelCase
- Properties: camelCase

### Security Considerations:

- Selalu validasi input user
- Gunakan fillable/guarded di models
- Implement proper authentication
- Sanitize file uploads

### Debugging Tips:

- Gunakan `dd()` atau `dump()` untuk debugging
- Check Laravel logs di `storage/logs/`
- Gunakan Telescope untuk request monitoring
- Implement proper error handling
