# Config Directory Documentation

## Struktur Folder Config

Folder `config` berisi semua file konfigurasi aplikasi Laravel yang mengatur berbagai aspek sistem.

### Struktur Folder:

```
config/
├── app.php              # Konfigurasi aplikasi utama
├── auth.php             # Konfigurasi authentication
├── cache.php            # Konfigurasi cache system
├── database.php         # Konfigurasi database connections
├── filesystems.php      # Konfigurasi file storage
├── inertia.php          # Konfigurasi Inertia.js
├── logging.php          # Konfigurasi logging system
├── mail.php             # Konfigurasi email/mail
├── queue.php            # Konfigurasi queue system
├── services.php         # Konfigurasi third-party services
├── session.php          # Konfigurasi session management
└── readme-config.md     # Dokumentasi folder ini
```

## Deskripsi Detail File Konfigurasi:

### 📄 app.php

**Konfigurasi aplikasi utama**

- **name**: Nama aplikasi
- **env**: Environment (local, staging, production)
- **debug**: Mode debugging
- **url**: Base URL aplikasi
- **timezone**: Timezone aplikasi
- **locale**: Bahasa default
- **providers**: Service providers yang di-load
- **aliases**: Class aliases untuk kemudahan akses

### 📄 auth.php

**Konfigurasi sistem authentication**

- **defaults**: Guard dan password broker default
- **guards**: Definisi authentication guards (web, api)
- **providers**: User providers (eloquent, database)
- **passwords**: Password reset configuration
- **password_timeout**: Timeout untuk konfirmasi password

### 📄 cache.php

**Konfigurasi cache system**

- **default**: Cache driver default (redis, file, database)
- **stores**: Definisi cache stores
- **prefix**: Prefix untuk cache keys
- **Drivers**: file, database, redis, memcached, array

### 📄 database.php

**Konfigurasi koneksi database**

- **default**: Koneksi database default
- **connections**: Definisi multiple database connections
    - **sqlite**: Untuk development/testing
    - **mysql**: Untuk production
    - **pgsql**: PostgreSQL connection
- **migrations**: Table untuk tracking migrations
- **redis**: Redis configuration untuk cache/queue

### 📄 filesystems.php

**Konfigurasi file storage**

- **default**: Disk storage default
- **disks**: Definisi storage disks
    - **local**: Local file storage
    - **public**: Public accessible storage
    - **s3**: Amazon S3 storage
- **links**: Symbolic links untuk storage

### 📄 inertia.php

**Konfigurasi Inertia.js (untuk React frontend)**

- **middleware**: Middleware untuk Inertia requests
- **ssr**: Server-side rendering configuration
- **testing**: Page untuk testing mode

### 📄 logging.php

**Konfigurasi sistem logging**

- **default**: Channel logging default
- **deprecations**: Handling deprecation warnings
- **channels**: Definisi logging channels
    - **stack**: Multiple channels
    - **single**: Single file log
    - **daily**: Daily rotating logs
    - **slack**: Slack notifications
    - **papertrail**: Papertrail service
    - **stderr**: Standard error output

### 📄 mail.php

**Konfigurasi sistem email**

- **default**: Mailer default
- **mailers**: Definisi mail drivers
    - **smtp**: SMTP configuration
    - **ses**: Amazon SES
    - **mailgun**: Mailgun service
    - **postmark**: Postmark service
    - **sendmail**: Local sendmail
    - **log**: Log emails (development)
- **from**: Default from address
- **markdown**: Markdown mail templates

### 📄 queue.php

**Konfigurasi queue system**

- **default**: Queue connection default
- **connections**: Definisi queue connections
    - **sync**: Synchronous (no queue)
    - **database**: Database-based queue
    - **beanstalkd**: Beanstalkd queue
    - **sqs**: Amazon SQS
    - **redis**: Redis queue
- **batching**: Configuration untuk job batching
- **failed**: Configuration untuk failed jobs

### 📄 services.php

**Konfigurasi third-party services**

- **postmark**: Postmark email service
- **ses**: Amazon Simple Email Service
- **resend**: Resend email service
- **slack**: Slack integration
- **stripe**: Stripe payment processing
- **facebook**: Facebook API
- **google**: Google services API

### 📄 session.php

**Konfigurasi session management**

- **driver**: Session driver (file, cookie, database, redis)
- **lifetime**: Session lifetime (minutes)
- **expire_on_close**: Expire ketika browser ditutup
- **encrypt**: Enkripsi session data
- **files**: Path untuk file-based sessions
- **connection**: Database connection untuk session
- **table**: Table untuk database sessions
- **store**: Redis store untuk session
- **lottery**: Session garbage collection
- **cookie**: Cookie configuration
- **path**: Cookie path
- **domain**: Cookie domain
- **secure**: HTTPS only cookies
- **http_only**: HTTP only cookies
- **same_site**: SameSite cookie attribute

## Environment Variables:

Sebagian besar konfigurasi menggunakan environment variables dari file `.env`:

### Database Configuration:

```env
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
```

### Mail Configuration:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
```

### Cache Configuration:

```env
CACHE_STORE=file
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## Catatan untuk Developer:

### Best Practices:

1. **Jangan hardcode sensitive data** - Gunakan environment variables
2. **Environment specific configs** - Gunakan config caching di production
3. **Validation**: Validate semua config values
4. **Documentation**: Document custom configuration options

### Configuration Caching:

```bash
# Cache configuration (production)
php artisan config:cache

# Clear configuration cache
php artisan config:clear

# View current configuration
php artisan config:show
```

### Custom Configuration:

- Buat file config baru untuk custom settings
- Gunakan `config()` helper untuk akses values
- Publish vendor configs jika perlu customize

### Security Notes:

- Jangan commit file .env ke repository
- Gunakan .env.example sebagai template
- Rotate API keys dan secrets secara berkala
- Set proper file permissions untuk config files

### Troubleshooting:

- **Config not updating**: Clear config cache
- **Environment variables not working**: Check .env file syntax
- **Service not connecting**: Verify credentials dan network access
- **Performance issues**: Enable config caching di production
