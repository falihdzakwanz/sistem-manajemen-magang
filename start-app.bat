@echo off
echo ========================================
echo SISTEM MANAJEMEN MAGANG - STARTUP
echo ========================================
echo.
echo Memulai aplikasi dengan data bersih...
echo.

REM Check if we're in the right directory
if not exist "artisan" (
    echo Error: File artisan tidak ditemukan. Pastikan Anda berada di direktori root Laravel.
    pause
    exit /b 1
)

echo [1/5] Checking database connection...
php artisan migrate:status
if %errorlevel% neq 0 (
    echo Error: Database tidak terhubung. Periksa konfigurasi .env
    pause
    exit /b 1
)

echo.
echo [2/5] Building frontend assets...
npm run build
if %errorlevel% neq 0 (
    echo Error: Build frontend gagal
    pause
    exit /b 1
)

echo.
echo [3/5] Starting Laravel development server...
start "Laravel Server" cmd /c "php artisan serve --host=127.0.0.1 --port=8000"

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

echo.
echo [4/5] Starting Vite development server...
start "Vite Server" cmd /c "npm run dev"

echo.
echo [5/5] Opening application in browser...
timeout /t 5 /nobreak >nul
start http://127.0.0.1:8000

echo.
echo ========================================
echo APLIKASI BERHASIL DIJALANKAN!
echo ========================================
echo.
echo URL Aplikasi:
echo - Frontend: http://127.0.0.1:8000
echo - Admin Login: http://127.0.0.1:8000/login
echo   Username: admin@komdigi.com
echo   Password: admin123
echo.
echo Halaman Yang Tersedia:
echo - Beranda: /
echo - Daftar Magang: /daftar-magang
echo - Status Pendaftaran: /status-pendaftaran
echo - Data Mahasiswa: /data-mahasiswa
echo - Admin Dashboard: /dashboard-admin (perlu login)
echo.
echo Database Status:
echo - Peserta: Hanya data asli dari form
echo - Bidang: 5 bidang tersedia
echo - Admin: 1 akun admin
echo.
echo Tekan Ctrl+C di terminal server untuk menghentikan aplikasi.
echo.
pause
