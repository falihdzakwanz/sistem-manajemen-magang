@echo off
cd /d "d:\Kuliah\KP\Website Magang\sistem-manajemen-magang"
php artisan magang:update-status >> storage\logs\status-update.log 2>&1
