@echo off
echo ========================================
echo CLEANUP DUMMY DATA
echo ========================================
echo.
echo This script will:
echo 1. Remove all dummy/sample data from database
echo 2. Keep only bidang and admin data
echo 3. Reset to fresh state with only real user registrations
echo.
echo WARNING: This will delete all peserta data!
echo.
set /p "confirm=Are you sure you want to continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo Cleaning up dummy data...
echo.

REM Fresh migrate with only essential data
echo Refreshing database...
php artisan migrate:fresh

echo.
echo Seeding only essential data (bidang and admin)...
php artisan db:seed --class=BidangSeeder
php artisan db:seed --class=AdminSeeder

echo.
echo ========================================
echo CLEANUP COMPLETED
echo ========================================
echo.
echo Database now contains only:
echo - Bidang data (for form options)
echo - Admin data (for admin login)
echo - NO dummy peserta data
echo.
echo All future data will come from real user registrations.
echo.
pause
