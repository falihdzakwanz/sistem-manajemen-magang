# Public Directory Documentation

## Struktur Folder Public

Folder `public` adalah document root web server yang berisi file-file yang dapat diakses langsung oleh browser.

### Struktur Folder:

```
public/
├── index.php               # Entry point aplikasi Laravel
├── .htaccess              # Apache rewrite rules
├── storage                # Symbolic link ke storage/app/public
├── hot                    # Vite development server info
├── robots.txt             # Search engine crawler rules
├── favicon.ico            # Browser favicon (ICO format)
├── favicon.svg            # Modern favicon (SVG format)
├── apple-touch-icon.png   # iOS home screen icon
├── logo.svg               # Application logo
├── asset/                 # Static assets folder
│   ├── gedung-kominfo-balam.png  # Building image
│   └── Logo-Kominfo.png          # Official Kominfo logo
├── build/                 # Compiled frontend assets (Vite)
│   ├── manifest.json      # Asset manifest
│   └── assets/            # Compiled JS/CSS files
└── readme-public.md       # Dokumentasi folder ini
```

## Deskripsi Detail File dan Folder:

### 📄 index.php

- **Fungsi**: Entry point utama aplikasi Laravel
- **Proses**:
    1. Load Composer autoloader
    2. Bootstrap Laravel application
    3. Handle HTTP request
    4. Return HTTP response
- **Security**: Semua request diarahkan melalui file ini

### 📄 .htaccess

- **Fungsi**: Apache server configuration
- **Aturan**:
    - Redirect semua request ke index.php
    - Pretty URLs (remove index.php dari URL)
    - Security headers
    - File access restrictions
- **Note**: Hanya untuk Apache server

### 📄 storage (Symbolic Link)

- **Fungsi**: Link ke storage/app/public
- **Purpose**: Akses public ke uploaded files
- **Create**: `php artisan storage:link`
- **Contains**: User uploaded files (CV, surat pengantar, dll)

### 📄 hot

- **Fungsi**: Vite development server information
- **Content**: URL development server
- **Auto-generated**: Dibuat saat `npm run dev`
- **Production**: File ini tidak ada di production

### 📄 robots.txt

- **Fungsi**: Instruksi untuk search engine crawlers
- **Content**:
    ```
    User-agent: *
    Disallow: /admin
    Disallow: /storage
    ```
- **SEO**: Mengontrol indexing search engines

### Favicon Files:

#### 📄 favicon.ico

- **Format**: ICO (legacy browsers)
- **Size**: 16x16, 32x32 pixels
- **Support**: Semua browsers

#### 📄 favicon.svg

- **Format**: SVG (modern browsers)
- **Advantages**: Scalable, smaller file size
- **Support**: Modern browsers

#### 📄 apple-touch-icon.png

- **Purpose**: iOS home screen icon
- **Size**: 180x180 pixels
- **Usage**: Saat user add to home screen di iOS

### 📄 logo.svg

- **Fungsi**: Application logo
- **Format**: SVG untuk scalability
- **Usage**: Di header, loading screen, branding

### 📁 asset/

Folder untuk static assets yang tidak di-compile:

#### 📄 gedung-kominfo-balam.png

- **Purpose**: Gambar gedung Kominfo Batam
- **Usage**: Halaman about, contact, branding
- **Format**: PNG untuk quality

#### 📄 Logo-Kominfo.png

- **Purpose**: Logo resmi Kementerian Komunikasi dan Informatika
- **Usage**: Official branding, headers, footers
- **Format**: PNG dengan transparansi

### 📁 build/

Folder untuk compiled frontend assets (Vite):

#### 📄 manifest.json

- **Fungsi**: Asset manifest untuk production
- **Content**: Mapping original filename → hashed filename
- **Purpose**: Cache busting, asset versioning
- **Example**:
    ```json
    {
        "resources/js/app.tsx": {
            "file": "assets/app-abc123.js",
            "css": ["assets/app-def456.css"]
        }
    }
    ```

#### 📁 assets/

- **Content**: Compiled dan minified JS/CSS files
- **Naming**: Includes hash untuk cache busting
- **Production**: Optimized untuk performance

## Web Server Configuration:

### Apache (.htaccess):

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

### Nginx:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
}
```

## Asset Management:

### Development:

```bash
# Start development server
npm run dev

# Build for development
npm run build
```

### Production:

```bash
# Build optimized assets
npm run build

# Create storage link
php artisan storage:link
```

## Security Considerations:

### File Access:

- **Allowed**: CSS, JS, images, fonts
- **Blocked**: PHP files (except index.php), .env, composer files
- **Uploads**: Process melalui Laravel, bukan direct access

### Headers:

```apache
# Security headers di .htaccess
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

### File Uploads:

- **Validation**: Type, size, content validation
- **Storage**: Store di storage/, bukan public/
- **Access**: Control melalui Laravel routes

## Performance Optimization:

### Static Assets:

- **Compression**: Enable gzip/brotli compression
- **Caching**: Set proper cache headers
- **CDN**: Consider CDN untuk static assets
- **Minification**: Vite handles JS/CSS minification

### Images:

- **Optimization**: Compress images sebelum upload
- **Format**: WebP untuk modern browsers
- **Lazy Loading**: Implement lazy loading untuk images
- **Responsive**: Use responsive images

## Troubleshooting:

### Common Issues:

1. **404 Errors**: Check .htaccess atau web server config
2. **Assets not loading**: Verify build process dan manifest
3. **Storage link broken**: Run `php artisan storage:link`
4. **Permission issues**: Check file permissions (755 for folders, 644 for files)

### File Permissions:

```bash
# Set proper permissions
chmod -R 755 public/
chmod -R 644 public/*.php
chmod -R 644 public/*.txt
```

## Catatan untuk Developer:

### Best Practices:

1. **Never store sensitive files** di public directory
2. **Optimize images** sebelum put di public
3. **Use asset versioning** untuk cache busting
4. **Implement security headers** di web server
5. **Regular cleanup** untuk unused assets

### Deployment:

- Build assets sebelum deploy
- Set proper file permissions
- Configure web server pointing ke public/
- Create storage symbolic link
- Optimize images dan static assets
