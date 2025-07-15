# Bootstrap Directory Documentation

## Struktur Folder Bootstrap

Folder `bootstrap` berisi file-file yang diperlukan untuk menginisialisasi dan bootstrap aplikasi Laravel.

### Struktur Folder:

```
bootstrap/
├── app.php              # Application bootstrap file
├── providers.php        # Service providers configuration
├── cache/               # Bootstrap cache files
│   ├── packages.php     # Package discovery cache
│   └── services.php     # Services cache
└── readme-bootstrap.md  # Dokumentasi folder ini
```

## Deskripsi Detail Folder dan File:

### 📄 app.php

- **Fungsi**: File bootstrap utama yang menginisialisasi aplikasi Laravel
- **Tanggung Jawab**:
    - Membuat instance Application container
    - Mendaftarkan service providers
    - Mengonfigurasi middleware global
    - Setup error handling
    - Menentukan environment configuration

### 📄 providers.php

- **Fungsi**: Mendaftarkan service providers yang akan di-load saat aplikasi start
- **Isi**: Array berisi daftar service providers
- **Contoh Providers**:
    - App\Providers\AppServiceProvider
    - Illuminate\Foundation\Providers\*
    - Third-party package providers

### 📁 cache/

Folder ini berisi file cache untuk mempercepat bootstrap process:

#### 📄 packages.php

- **Fungsi**: Cache hasil package discovery
- **Isi**: Array berisi informasi packages yang terinstall
- **Auto-generated**: File ini dibuat otomatis oleh Composer
- **Regenerasi**: Hapus file ini untuk refresh package discovery

#### 📄 services.php

- **Fungsi**: Cache untuk service providers
- **Isi**: Array berisi mapping service providers
- **Performance**: Mempercepat loading aplikasi dengan cache providers
- **Regenerasi**: Gunakan `php artisan config:cache` untuk refresh

## Catatan untuk Developer:

### Bootstrap Process Flow:

1. **app.php** diload pertama kali
2. Application container dibuat
3. **providers.php** diload untuk mendaftarkan providers
4. Cache files (packages.php, services.php) digunakan jika ada
5. Middleware dan routes didaftarkan
6. Aplikasi siap menerima requests

### File Cache Management:

- **Development**: Cache files dapat dihapus untuk debugging
- **Production**: Cache files penting untuk performance
- **Commands**:
    ```bash
    php artisan config:cache    # Cache configuration
    php artisan config:clear    # Clear configuration cache
    php artisan package:discover # Refresh package discovery
    ```

### Security Notes:

- File di folder bootstrap dieksekusi early dalam lifecycle
- Jangan menyimpan sensitive data di file bootstrap
- Validasi semua konfigurasi yang masuk

### Performance Tips:

- Gunakan config caching di production
- Jangan modify cache files secara manual
- Monitor bootstrap time dengan Laravel Debugbar/Telescope

### Troubleshooting:

- **Error saat bootstrap**: Check syntax di app.php dan providers.php
- **Package not found**: Hapus cache/packages.php dan run composer dump-autoload
- **Service provider issues**: Clear semua cache dan restart application

### Best Practices:

1. Jangan edit file cache secara manual
2. Gunakan service providers untuk dependency injection
3. Keep bootstrap files clean dan focused
4. Test aplikasi setelah modify bootstrap configurations
5. Document custom bootstrap modifications
