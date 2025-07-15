# GitHub Configuration Documentation

## Struktur Folder .github

Folder `.github` berisi konfigurasi khusus untuk GitHub repository dan GitHub Actions.

### Struktur Folder:

```
.github/
├── workflows/        # GitHub Actions workflow files
└── readme-github.md  # Dokumentasi folder ini
```

### Deskripsi Folder dan File:

#### 📁 workflows/

Folder ini berisi file-file konfigurasi untuk GitHub Actions yang mengotomatisasi berbagai proses seperti:

- Continuous Integration (CI)
- Continuous Deployment (CD)
- Testing otomatis
- Code quality checks
- Security scanning

File workflow biasanya berformat `.yml` atau `.yaml` dan mendefinisikan langkah-langkah yang akan dijalankan ketika ada event tertentu di repository (seperti push, pull request, dll).

### Catatan untuk Developer:

- Semua file di folder `.github` akan dibaca otomatis oleh GitHub
- File workflow harus ditempatkan di subfolder `workflows/`
- Gunakan sintaks YAML yang valid untuk file workflow
- Pastikan untuk menguji workflow di branch terpisah sebelum merge ke main

### Contoh Penggunaan:

- Setup automated testing untuk setiap pull request
- Deploy otomatis ke server staging/production
- Code formatting dan linting checks
- Security vulnerability scanning
