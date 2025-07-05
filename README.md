# Struktur Folder Pages

Folder `pages` telah direorganisasi untuk memisahkan halaman admin dan user:

## 📁 Admin Pages (`/admin`)

- **Login.tsx** - Halaman login untuk admin
- **DashboardAdmin.tsx** - Dashboard admin untuk mengelola data mahasiswa magang

## 📁 User Pages (`/user`)

- **Beranda.tsx** - Landing page/beranda utama
- **DaftarMagang.tsx** - Halaman formulir pendaftaran magang
- **StatusPendaftaran.tsx** - Halaman untuk cek status pendaftaran
- **DataMahasiswa.tsx** - Halaman data mahasiswa yang sedang/telah magang

## 🔗 Routing yang Tersedia

### User Routes:

- `/` - Beranda (Closure)
- `/daftar-magang` - Form pendaftaran magang (UserController)
- `/status-pendaftaran` - Cek status pendaftaran (UserController)
- `/data-mahasiswa` - Data mahasiswa magang (Closure)

### Admin Routes (Perlu Login):

- `/login` - Login admin (AuthController)
- `/dashboard-admin` - Dashboard admin (AdminController)

## 📝 Catatan Penting

- Semua halaman user dapat diakses tanpa login
- Halaman admin memerlukan autentikasi
- Data mahasiswa/pendaftar menggunakan model `User` dengan tabel `mahasiswas`
- Model `Admin` untuk autentikasi admin dengan tabel `users`
- Status yang ditampilkan: Sedang Diproses, Diterima, Ditolak

## 🧹 Struktur yang Telah Dibersihkan

Hanya menyisakan file yang diperlukan untuk 6 page utama:

### Models:

- **User.php** - Model untuk data mahasiswa/pendaftar magang (tabel: `mahasiswas`)
- **Admin.php** - Model untuk autentikasi admin (tabel: `users`)
- **Bidang.php** - Model untuk referensi bidang magang

### Controllers:

- **UserController.php** - Mengelola halaman user (daftar magang, status)
- **AdminController.php** - Mengelola halaman admin (dashboard)
- **Auth Controllers** - Mengelola autentikasi admin

### Frontend Components (Yang Digunakan):

- **Layout.tsx** - Layout utama untuk halaman user
- **Navbar.tsx** - Navigasi header
- **Footer.tsx** - Footer halaman
- **FileInput.tsx** - Component upload file
- **input-error.tsx** - Component error message
- **UI Components**: button, input, label

### Database:

- **Migrations**: users, mahasiswas, bidangs, dan foreign keys
- **Seeders**: AdminSeeder, UserSeeder, BidangSeeder
- **Factories**: UserFactory, AdminFactory

### File/Folder yang Dihapus:

❌ **Components**: app-logo, icon, card, checkbox, dialog, dropdown-menu, select, separator  
❌ **Layouts**: Seluruh folder layouts (auth, app, settings)  
❌ **Hooks**: Seluruh folder hooks  
❌ **Migrations**: cache_table, jobs_table  
❌ **Routes**: console.php  
❌ **Assets**: logo.jpg yang tidak digunakan  
❌ **GitHub Workflows**: tests.yml  
❌ **Types**: BreadcrumbItem, NavGroup, NavItem, SharedData

## 🔄 Perubahan Model Setelah Refactoring

**Sebelum:**

- Model `Mahasiswa` untuk data mahasiswa
- Model `Pendaftar` untuk data pendaftar
- Model `User` untuk admin

**Setelah:**

- Model `User` untuk data mahasiswa/pendaftar (konsolidasi)
- Model `Admin` untuk autentikasi admin
- Menghapus duplikasi dan konsistensi penamaan
