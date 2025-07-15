# Sistem Manajemen Magang - Dinas Kominfo Kota Bandar Lampung

Sistem informasi untuk mengelola pendaftaran dan proses magang mahasiswa di Dinas Komunikasi dan Informatika Kota Bandar Lampung.

## 📋 Deskripsi Project

Sistem Manajemen Magang adalah aplikasi web yang dirancang untuk memfasilitasi proses pendaftaran, pengelolaan, dan monitoring program magang mahasiswa. Sistem ini memungkinkan mahasiswa untuk mendaftar secara online dan administrator untuk mengelola aplikasi magang dengan efisien.

### Fitur Utama:

#### 👥 Untuk Mahasiswa:

- **Pendaftaran Online**: Form pendaftaran lengkap dengan upload dokumen
- **Status Tracking**: Cek status aplikasi magang real-time
- **Notifikasi Email**: Pemberitahuan otomatis perubahan status
- **Profile Management**: Kelola data pribadi dan dokumen

#### 🔧 Untuk Administrator:

- **Dashboard Management**: Overview statistik dan data magang
- **Aplikasi Review**: Review dan approve/reject aplikasi
- **Data Export**: Export data ke Excel/PDF untuk laporan
- **Email Notifications**: Kirim notifikasi ke mahasiswa
- **User Management**: Kelola data mahasiswa dan bidang magang

## 🚀 Tech Stack

### Backend:

- **Laravel 12** - PHP Framework
- **PHP 8.2** - Programming Language
- **SQLite/MySQL** - Database
- **Composer** - Dependency Management

### Frontend:

- **React 18** - JavaScript Library
- **TypeScript** - Type Safety
- **Inertia.js** - SPA-like Experience
- **Tailwind CSS** - Styling Framework
- **Vite** - Build Tool

### Additional Tools:

- **Laravel Pint** - Code Style Fixer
- **ESLint** - JavaScript Linting
- **Prettier** - Code Formatting

## 📁 Struktur Project

Untuk memahami struktur project secara detail, silakan baca dokumentasi di setiap folder:

### 🏗️ Core Application

- [**`app/`**](./app/readme-app.md) - Logika aplikasi (Models, Controllers, Services)
- [**`config/`**](./config/readme-config.md) - Konfigurasi aplikasi
- [**`routes/`**](./routes/readme-routes.md) - Definisi routing
- [**`bootstrap/`**](./bootstrap/readme-bootstrap.md) - Bootstrap aplikasi

### 🗄️ Data & Storage

- [**`database/`**](./database/readme-database.md) - Migrations, Seeders, Factories
- [**`storage/`**](./storage/readme-storage.md) - File storage dan logs

### 🎨 Frontend & Assets

- [**`resources/`**](./resources/readme-resources.md) - React components, CSS, Email templates
- [**`public/`**](./public/readme-public.md) - Public assets dan entry point

### 🔧 Development & Deployment

- [**`vendor/`**](./vendor/readme-vendor.md) - Composer dependencies
- [**`.github/`**](./.github/readme-github.md) - GitHub Actions dan workflows
- [**`technical-specs/`**](./technical-specs/readme-technical-specs.md) - Dokumentasi teknis

## 🛠️ Installation & Setup

### Prerequisites:

- PHP 8.2 atau lebih tinggi
- Composer
- Node.js 18+ dan npm
- SQLite (development) atau MySQL (production)

### Setup Development Environment:

1. **Clone Repository**

    ```bash
    git clone https://github.com/falihdzakwanz/sistem-manajemen-magang.git
    cd sistem-manajemen-magang
    ```

2. **Install PHP Dependencies**

    ```bash
    composer install
    ```

3. **Install Frontend Dependencies**

    ```bash
    npm install
    ```

4. **Environment Configuration**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database Setup**

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

6. **Storage Link**

    ```bash
    php artisan storage:link
    ```

7. **Start Development Servers**

    ```bash
    # Terminal 1 - Laravel server
    php artisan serve

    # Terminal 2 - Vite dev server
    npm run dev
    ```

8. **Access Application**
    - Frontend: http://localhost:8000
    - Admin Login: /login (credentials di seeder)

## 📖 Documentation

### Dokumentasi Developer:

Setiap folder memiliki dokumentasi lengkap yang menjelaskan struktur, fungsi, dan cara penggunaan:

- 📂 [**App Documentation**](./app/readme-app.md) - Penjelasan Models, Controllers, dan logika bisnis
- 🗄️ [**Database Documentation**](./database/readme-database.md) - Schema database dan migrations
- 🎨 [**Frontend Documentation**](./resources/readme-resources.md) - React components dan styling
- 🌐 [**Routes Documentation**](./routes/readme-routes.md) - API endpoints dan routing
- ⚙️ [**Config Documentation**](./config/readme-config.md) - Konfigurasi sistem
- 📦 [**Dependencies Documentation**](./vendor/readme-vendor.md) - Package dan libraries

### 📋 User Guides:

- **Student Manual**: Panduan penggunaan untuk mahasiswa
- **Admin Guide**: Panduan untuk administrator
- **API Documentation**: Dokumentasi API endpoints

## 🔐 Default Credentials

### Admin Login:

- **Username**: admin
- **Password**: password
- **Email**: admin@kominfo.go.id

> ⚠️ **Penting**: Ubah credentials default sebelum deploy ke production!

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=UserControllerTest

# Frontend tests
npm run test
```

## 🚀 Deployment

### Production Build:

```bash
# Build frontend assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer install --optimize-autoloader --no-dev
```

### Server Requirements:

- PHP 8.2+ dengan extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- Web server (Apache/Nginx)
- Database (MySQL 8.0+ atau PostgreSQL 13+)
- SSL certificate untuk HTTPS

## 📊 Database Schema

### Main Tables:

- **users**: Admin accounts
- **pesertas**: Student applications (nama, nim, universitas, dll)
- **bidangs**: Internship departments
- **cache**: Application cache storage

Untuk detail schema lengkap, lihat [Database Documentation](./database/readme-database.md).

## 🔄 Workflow

### Student Application Flow:

1. Student mengisi form pendaftaran online
2. Upload CV dan surat pengantar
3. Sistem generate aplikasi dengan status "pending"
4. Admin review aplikasi
5. Admin approve/reject dengan notifikasi email
6. Student dapat cek status via website

### Admin Management Flow:

1. Login ke admin dashboard
2. View semua aplikasi mahasiswa
3. Filter berdasarkan status, bidang, tanggal
4. Review detail aplikasi dan dokumen
5. Approve/reject dengan catatan
6. Export laporan untuk dokumentasi

## 🤝 Contributing

### Code Style:

- Follow PSR-12 untuk PHP
- Use Laravel best practices
- Follow React/TypeScript conventions
- Run linting sebelum commit

### Git Workflow:

```bash
# Format code
composer pint
npm run format

# Run tests
php artisan test
npm run test

# Commit changes
git add .
git commit -m "feat: add new feature"
git push origin feature-branch
```

## 📝 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk history perubahan dan updates.

## 📄 License

Project ini dilisensikan di bawah [MIT License](./LICENSE).

## 👥 Team

**Developer**: Falih Dzakwan  
**Organization**: Dinas Komunikasi dan Informatika Kota Bandar Lampung  
**Year**: 2025

## 📞 Support

Untuk pertanyaan, bug reports, atau feature requests:

- **GitHub Issues**: [Create new issue](https://github.com/falihdzakwanz/sistem-manajemen-magang/issues)
- **Email**: falihdzakwanz@example.com
- **Documentation**: Baca dokumentasi di setiap folder

## 🎯 Roadmap

### Phase 1 (Current):

- ✅ Basic registration system
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ Document upload

### Phase 2 (Planned):

- 📋 Interview scheduling
- 📊 Advanced reporting
- 🔔 Real-time notifications
- 📱 Mobile responsive UI

### Phase 3 (Future):

- 📱 Mobile app
- 🔗 API for integrations
- 📈 Analytics dashboard
- 🤖 Automated processes

---

## 🗂️ Quick Navigation

**📖 Baca dokumentasi lengkap di folder-folder berikut:**

| Folder             | Deskripsi                            | Link                                                         |
| ------------------ | ------------------------------------ | ------------------------------------------------------------ |
| `app/`             | Logika aplikasi, Models, Controllers | [📖 App Docs](./app/readme-app.md)                           |
| `database/`        | Schema, Migrations, Seeders          | [📖 Database Docs](./database/readme-database.md)            |
| `resources/`       | Frontend React, CSS, Templates       | [📖 Frontend Docs](./resources/readme-resources.md)          |
| `routes/`          | Web Routes, API, Authentication      | [📖 Routes Docs](./routes/readme-routes.md)                  |
| `config/`          | App Configuration, Services          | [📖 Config Docs](./config/readme-config.md)                  |
| `public/`          | Assets, Entry Point                  | [📖 Public Docs](./public/readme-public.md)                  |
| `storage/`         | File Storage, Logs, Cache            | [📖 Storage Docs](./storage/readme-storage.md)               |
| `vendor/`          | Composer Dependencies                | [📖 Vendor Docs](./vendor/readme-vendor.md)                  |
| `.github/`         | GitHub Actions, Workflows            | [📖 GitHub Docs](./.github/readme-github.md)                 |
| `technical-specs/` | Technical Documentation              | [📖 Tech Specs](./technical-specs/readme-technical-specs.md) |

**🔧 Untuk memulai development, baca terlebih dahulu:**

1. [Setup Guide](#-installation--setup)
2. [App Documentation](./app/readme-app.md) - Pahami struktur aplikasi
3. [Database Documentation](./database/readme-database.md) - Pahami schema database
4. [Frontend Documentation](./resources/readme-resources.md) - Pahami React components

**📋 Untuk menggunakan aplikasi:**

- **Mahasiswa**: Akses halaman utama dan ikuti form pendaftaran
- **Admin**: Login di `/login` dengan credentials default

---

⭐ **Jika dokumentasi ini membantu, jangan lupa berikan star di repository!**
