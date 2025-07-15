# Storage Directory Documentation

## Struktur Folder Storage

Folder `storage` adalah tempat penyimpanan untuk file-file yang di-generate atau di-upload oleh aplikasi, termasuk cache, logs, sessions, dan user uploads.

### Struktur Folder:

```
storage/
├── app/                    # Application storage
│   ├── .gitignore         # Git ignore untuk app storage
│   ├── private/           # Private file storage
│   └── public/            # Public accessible storage
├── framework/             # Framework cache dan temporary files
│   ├── .gitignore         # Git ignore untuk framework files
│   ├── cache/             # Framework cache
│   ├── sessions/          # Session storage
│   ├── testing/           # Testing storage
│   └── views/             # Compiled view cache
├── logs/                  # Application logs
│   ├── .gitignore         # Git ignore untuk log files
│   └── laravel.log        # Main application log
└── readme-storage.md      # Dokumentasi folder ini
```

## Deskripsi Detail Folder dan File:

### 📁 app/

**Application file storage area**

#### 📁 private/

- **Fungsi**: Penyimpanan file private yang tidak dapat diakses langsung dari web
- **Usage**:
    - Document uploads yang perlu authorization
    - CV dan surat pengantar mahasiswa
    - Internal reports
    - Backup files
- **Security**: Files tidak dapat diakses langsung via URL

#### 📁 public/

- **Fungsi**: Penyimpanan file yang dapat diakses public
- **Symbolic Link**: Linked ke `public/storage`
- **Usage**:
    - Profile pictures
    - Public documents
    - Generated reports untuk download
    - Export files (Excel, PDF)
- **Access**: Files dapat diakses via URL `domain.com/storage/filename`

### 📁 framework/

**Laravel framework internal storage**

#### 📁 cache/

- **Fungsi**: Framework-level cache storage
- **Content**:
    - Application cache data
    - Route cache
    - Config cache
    - Event cache
- **Performance**: Mempercepat response time aplikasi

#### 📁 sessions/

- **Fungsi**: File-based session storage
- **Content**: User session data
- **Format**: Serialized PHP data
- **Cleanup**: Garbage collection otomatis

#### 📁 testing/

- **Fungsi**: Storage khusus untuk testing environment
- **Content**: Test files, mock data
- **Isolation**: Terpisah dari data production

#### 📁 views/

- **Fungsi**: Compiled Blade view cache
- **Content**: Compiled PHP dari Blade templates
- **Performance**: Menghindari re-compilation views
- **Auto-generated**: Dibuat otomatis saat view di-load

### 📁 logs/

**Application logging directory**

#### 📄 laravel.log

- **Fungsi**: Main application log file
- **Content**:
    - Error messages
    - Debug information
    - User actions (jika di-log)
    - System events
- **Format**: Laravel standard log format dengan timestamp
- **Rotation**: Daily rotation (laravel-YYYY-MM-DD.log)

## File Permissions:

### Recommended Permissions:

```bash
# Storage folder structure
chmod -R 755 storage/
chmod -R 644 storage/logs/
chmod -R 755 storage/app/
chmod -R 755 storage/framework/
```

### Web Server Access:

- **Owner**: Application user (www-data, apache, nginx)
- **Group**: Web server group
- **Writable**: All storage subdirectories harus writable

## Storage Configuration:

### Filesystem Configuration (config/filesystems.php):

```php
'disks' => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'),
    ],

    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],

    'private' => [
        'driver' => 'local',
        'root' => storage_path('app/private'),
        'visibility' => 'private',
    ],
]
```

### Storage Link:

```bash
# Create symbolic link
php artisan storage:link

# Verify link
ls -la public/storage
```

## File Operations:

### Storing Files:

```php
// Public storage
Storage::disk('public')->put('uploads/cv.pdf', $file);

// Private storage
Storage::disk('private')->put('documents/surat.pdf', $file);

// Local storage (default)
Storage::put('file.txt', $content);
```

### Retrieving Files:

```php
// Get file content
$content = Storage::disk('private')->get('documents/file.pdf');

// Get file URL (public only)
$url = Storage::disk('public')->url('uploads/image.jpg');

// Download response
return Storage::disk('private')->download('documents/file.pdf');
```

### File Management:

```php
// Check if file exists
if (Storage::disk('public')->exists('uploads/file.pdf')) {
    // File exists
}

// Delete file
Storage::disk('public')->delete('uploads/old-file.pdf');

// Move file
Storage::disk('public')->move('old-path/file.pdf', 'new-path/file.pdf');

// Copy file
Storage::disk('public')->copy('source/file.pdf', 'destination/file.pdf');
```

## Use Cases dalam Aplikasi:

### Upload CV dan Surat Pengantar:

```php
// Controller method
public function store(Request $request)
{
    $cvPath = $request->file('cv')->store('cv', 'private');
    $suratPath = $request->file('surat_pengantar')->store('surat-pengantar', 'private');

    User::create([
        'cv' => $cvPath,
        'surat_pengantar' => $suratPath,
        // other fields...
    ]);
}
```

### Download Protected Files:

```php
// Admin dapat download CV mahasiswa
public function downloadCV($userId)
{
    $user = User::findOrFail($userId);

    if (!Storage::disk('private')->exists($user->cv)) {
        abort(404);
    }

    return Storage::disk('private')->download($user->cv);
}
```

### Export Reports:

```php
// Generate dan store report
public function exportReport()
{
    $data = User::all();
    $excel = Excel::raw($data, \Maatwebsite\Excel\Excel::XLSX);

    $filename = 'report-' . date('Y-m-d') . '.xlsx';
    Storage::disk('public')->put('exports/' . $filename, $excel);

    return Storage::disk('public')->url('exports/' . $filename);
}
```

## Logging Best Practices:

### Custom Log Channels:

```php
// config/logging.php
'channels' => [
    'magang' => [
        'driver' => 'single',
        'path' => storage_path('logs/magang.log'),
        'level' => 'debug',
    ],
]

// Usage
Log::channel('magang')->info('Mahasiswa registered', ['nim' => $nim]);
```

### Log Levels:

- **emergency**: System unusable
- **alert**: Action must be taken immediately
- **critical**: Critical conditions
- **error**: Error conditions
- **warning**: Warning conditions
- **notice**: Normal but significant condition
- **info**: Informational messages
- **debug**: Debug-level messages

## Storage Cleanup:

### Automated Cleanup:

```php
// Artisan command untuk cleanup
php artisan schedule:run

// Custom cleanup command
Artisan::command('storage:cleanup', function () {
    // Delete old temporary files
    $files = Storage::disk('public')->files('temp');
    foreach ($files as $file) {
        if (Storage::disk('public')->lastModified($file) < now()->subDays(7)->timestamp) {
            Storage::disk('public')->delete($file);
        }
    }
});
```

### Manual Cleanup:

```bash
# Clear framework cache
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# Clear logs (be careful!)
php artisan log:clear
```

## Backup Strategy:

### Important Directories:

- `storage/app/private/` - User uploaded documents
- `storage/logs/` - Application logs (untuk debugging)
- Database file (jika menggunakan SQLite)

### Backup Script:

```bash
#!/bin/bash
# Backup storage
tar -czf backup-storage-$(date +%Y%m%d).tar.gz storage/app/private/
tar -czf backup-logs-$(date +%Y%m%d).tar.gz storage/logs/
```

## Security Considerations:

### File Upload Security:

1. **Validate file types**: Check MIME types dan extensions
2. **Limit file sizes**: Set max upload size
3. **Scan for malware**: Implement virus scanning
4. **Private storage**: Store sensitive files di private disk
5. **Access control**: Implement proper authorization

### File Access Control:

```php
// Middleware untuk protect file access
public function handle($request, Closure $next)
{
    $user = auth()->user();
    $fileOwner = // determine file owner

    if (!$user || $user->id !== $fileOwner) {
        abort(403);
    }

    return $next($request);
}
```

## Monitoring dan Maintenance:

### Storage Monitoring:

```php
// Check storage usage
$totalSize = 0;
$files = Storage::disk('private')->allFiles();
foreach ($files as $file) {
    $totalSize += Storage::disk('private')->size($file);
}

// Log storage usage
Log::info('Storage usage', ['size' => $totalSize, 'files' => count($files)]);
```

### Log Rotation:

```php
// config/logging.php
'daily' => [
    'driver' => 'daily',
    'path' => storage_path('logs/laravel.log'),
    'level' => 'debug',
    'days' => 14,
],
```

## Troubleshooting:

### Common Issues:

1. **Permission denied**: Check file permissions
2. **Storage link broken**: Re-create dengan `php artisan storage:link`
3. **File not found**: Verify file path dan disk configuration
4. **Upload fails**: Check upload_max_filesize di php.ini
5. **Disk full**: Monitor storage usage dan implement cleanup

### Debug Commands:

```bash
# Check storage link
ls -la public/storage

# Check permissions
ls -la storage/

# Check disk usage
du -sh storage/*

# View recent logs
tail -f storage/logs/laravel.log
```
