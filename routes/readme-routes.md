# Routes Directory Documentation

## Struktur Folder Routes

Folder `routes` berisi semua definisi routing untuk aplikasi Laravel, menentukan bagaimana URL di-handle oleh aplikasi.

### Struktur Folder:

```
routes/
├── web.php              # Web routes untuk browser
├── auth.php             # Authentication routes
├── console.php          # Artisan command routes
└── readme-routes.md     # Dokumentasi folder ini
```

## Deskripsi Detail File Routes:

### 📄 web.php

**Main web routes untuk aplikasi sistem manajemen magang**

#### Rute Publik (Tanpa Authentication):

```php
// Halaman beranda
Route::get('/', function () {
    return Inertia::render('user/Beranda');
})->name('home');

// Form pendaftaran magang
Route::get('/daftar-magang', [UserController::class, 'create'])
    ->name('daftar-magang');

// Proses pendaftaran
Route::post('/daftar-magang', [UserController::class, 'store'])
    ->name('daftar-magang.store');

// Endpoint alternatif penyimpanan
Route::post('/mahasiswa', [UserController::class, 'store'])
    ->name('mahasiswa.store');

// Cek status pendaftaran
Route::get('/status-pendaftaran', [UserController::class, 'getStatusPendaftaran'])
    ->name('status-pendaftaran');
```

#### Rute Admin (Dengan Authentication):

```php
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard admin
    Route::get('/dashboard', [AdminController::class, 'dashboard'])
        ->name('dashboard');

    // Manajemen data mahasiswa
    Route::get('/mahasiswa', [AdminController::class, 'index'])
        ->name('mahasiswa.index');

    // Detail mahasiswa
    Route::get('/mahasiswa/{id}', [AdminController::class, 'show'])
        ->name('mahasiswa.show');

    // Update status mahasiswa
    Route::patch('/mahasiswa/{id}/status', [AdminController::class, 'updateStatus'])
        ->name('mahasiswa.updateStatus');

    // Export data
    Route::get('/export', [AdminController::class, 'export'])
        ->name('export');
});
```

### 📄 auth.php

**Authentication routes untuk sistem login/logout**

#### Guest Routes (Belum Login):

```php
Route::middleware('guest')->group(function () {
    // Form registrasi
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    // Proses registrasi
    Route::post('register', [RegisteredUserController::class, 'store']);

    // Form login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    // Proses login
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Forgot password
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    // Send reset link
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Reset password form
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    // Process reset password
    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});
```

#### Authenticated Routes (Sudah Login):

```php
Route::middleware('auth')->group(function () {
    // Email verification
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Confirm password
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Update password
    Route::put('password', [PasswordController::class, 'update'])
        ->name('password.update');

    // Logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
```

### 📄 console.php

**Artisan console command routes**

```php
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Inspiring command
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Scheduled commands
Schedule::command('app:update-status-magang')->daily();
```

## Route Patterns dan Konvensi:

### Naming Convention:

- **Resource Routes**: `resource.action` (e.g., `mahasiswa.index`, `mahasiswa.show`)
- **Admin Routes**: `admin.resource.action` (e.g., `admin.mahasiswa.index`)
- **Auth Routes**: Mengikuti Laravel convention (`login`, `register`, dll)

### HTTP Methods:

- **GET**: Retrieve data (index, show, create, edit)
- **POST**: Create new data (store)
- **PUT/PATCH**: Update existing data (update)
- **DELETE**: Remove data (destroy)

### Route Parameters:

```php
// Required parameter
Route::get('/mahasiswa/{id}', [Controller::class, 'show']);

// Optional parameter
Route::get('/mahasiswa/{id?}', [Controller::class, 'show']);

// Parameter dengan constraint
Route::get('/mahasiswa/{id}', [Controller::class, 'show'])
    ->where('id', '[0-9]+');
```

## Middleware Usage:

### Authentication:

```php
// Protect single route
Route::get('/admin', [AdminController::class, 'index'])
    ->middleware('auth');

// Protect route group
Route::middleware(['auth'])->group(function () {
    // Protected routes
});
```

### Guest Only:

```php
Route::middleware('guest')->group(function () {
    // Login, register routes
});
```

### Custom Middleware:

```php
Route::middleware(['auth', 'admin'])->group(function () {
    // Admin only routes
});
```

## Route Model Binding:

### Implicit Binding:

```php
Route::get('/mahasiswa/{user}', function (User $user) {
    return $user;
});
```

### Explicit Binding:

```php
Route::bind('user', function ($value) {
    return User::where('nim', $value)->firstOrFail();
});
```

## Route Caching:

### Production Optimization:

```bash
# Cache routes
php artisan route:cache

# Clear route cache
php artisan route:clear

# List all routes
php artisan route:list
```

## API Routes (Future Implementation):

Jika diperlukan API endpoints:

```php
// api.php
Route::prefix('api/v1')->group(function () {
    Route::get('/mahasiswa', [ApiController::class, 'index']);
    Route::post('/mahasiswa', [ApiController::class, 'store']);
});
```

## Catatan untuk Developer:

### Best Practices:

1. **Route Grouping**: Group related routes untuk maintainability
2. **Middleware**: Apply appropriate middleware untuk security
3. **Route Names**: Gunakan descriptive route names
4. **RESTful Design**: Follow RESTful conventions
5. **Parameter Validation**: Validate route parameters

### Security Considerations:

- **CSRF Protection**: Enabled by default untuk POST/PUT/DELETE
- **Rate Limiting**: Implement untuk prevent abuse
- **Input Validation**: Validate semua input di controller
- **Authorization**: Check user permissions di controller

### Performance Tips:

- **Route Caching**: Enable di production
- **Middleware Optimization**: Order middleware efficiently
- **Controller Action**: Keep controller actions focused
- **Database Queries**: Optimize queries di controller

### Testing Routes:

```php
// Feature test example
public function test_admin_can_view_dashboard()
{
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)
                    ->get(route('admin.dashboard'));

    $response->assertStatus(200);
}
```

### Route Documentation:

- **Comments**: Document complex routes
- **OpenAPI**: Consider API documentation tools
- **Route List**: Maintain updated route documentation
- **Postman**: Create collections untuk API testing

### Troubleshooting:

- **404 Errors**: Check route definition dan parameters
- **Middleware Issues**: Verify middleware order dan logic
- **Parameter Binding**: Check model binding configuration
- **CSRF Errors**: Ensure CSRF token di forms
