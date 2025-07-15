# Fix: Inertia Response Error - Plain JSON Response

## Problem

Error: "All Inertia requests must receive a valid Inertia response, however a plain JSON response was received."

```json
{ "success": false, "message": "Foto tidak ditemukan!" }
```

## Root Cause

Controller `BerandaController` mengembalikan response JSON biasa (`response()->json()`) sedangkan Inertia.js mengharapkan response yang kompatibel dengan Inertia routing system.

## Solution Implemented

### 1. Backend Changes (BerandaController.php)

#### Before (Incorrect):

```php
// Struktur Organisasi Update
return response()->json([
    'success' => true,
    'message' => 'Struktur organisasi berhasil diupdate!'
]);

// Bidang Update
return response()->json([
    'success' => true,
    'message' => 'Data bidang berhasil diupdate!'
]);

// Delete Photo Success
return response()->json([
    'success' => true,
    'message' => 'Foto berhasil dihapus!'
]);

// Delete Photo Error
return response()->json([
    'success' => false,
    'message' => 'Foto tidak ditemukan!'
], 404);
```

#### After (Correct):

```php
// Struktur Organisasi Update
return redirect()->back()->with('success', 'Struktur organisasi berhasil diupdate!');

// Bidang Update
return redirect()->back()->with('success', 'Data bidang berhasil diupdate!');

// Delete Photo Success
return redirect()->back()->with('success', 'Foto berhasil dihapus!');

// Delete Photo Error
return redirect()->back()->withErrors(['error' => 'Foto tidak ditemukan!']);
```

### 2. Frontend Changes (EditBeranda.tsx)

#### TypeScript Interface Definition:

```tsx
// Type untuk flash messages
interface FlashMessages {
    success?: string;
    error?: string;
}

interface InertiaPage {
    props: {
        flash?: FlashMessages;
        [key: string]: unknown;
    };
}
```

#### Updated Callback Handlers:

```tsx
// Delete Photo
onSuccess: (page: InertiaPage) => {
    const flashSuccess = page.props?.flash?.success;
    if (flashSuccess) {
        alert(`✅ ${flashSuccess}`);
    } else {
        alert('✅ Foto berhasil dihapus!');
    }
    // ... rest of logic
};

// Update Struktur/Bidang
onSuccess: (page: InertiaPage) => {
    const flashSuccess = page.props?.flash?.success;
    if (flashSuccess) {
        alert(`✅ ${flashSuccess}\n\nPerubahan akan langsung terlihat di halaman beranda user.`);
    } else {
        alert('✅ Data berhasil diperbarui!\n\nPerubahan akan langsung terlihat di halaman beranda user.');
    }
    // ... rest of logic
};
```

## Benefits of This Fix

### ✅ Inertia Compatibility

- **Before**: JSON responses caused Inertia routing errors
- **After**: Proper Inertia-compatible responses using `redirect()->back()`

### ✅ Laravel Session Flash Messages

- **Before**: Manual JSON message handling
- **After**: Laravel's built-in flash message system

### ✅ Better Error Handling

- **Before**: Generic JSON error responses
- **After**: Proper error handling with `withErrors()`

### ✅ Consistent Response Format

- **Before**: Mixed response types (some JSON, some redirects)
- **After**: All responses use redirect with flash messages

## Technical Details

### Why This Error Occurred:

1. **Inertia.js Expectation**: Inertia expects responses to be either:

    - HTML pages (for full page loads)
    - Redirects with session data
    - Inertia-specific JSON responses

2. **Plain JSON Problem**: `response()->json()` returns pure JSON which breaks Inertia's routing flow

3. **Session Management**: Inertia handles CSRF tokens and session state through its own response cycle

### Laravel Flash Messages vs JSON:

```php
// ❌ Breaks Inertia flow
return response()->json(['success' => true, 'message' => 'Success!']);

// ✅ Works with Inertia
return redirect()->back()->with('success', 'Success!');
return redirect()->back()->withErrors(['error' => 'Error message']);
```

### Frontend Flash Message Access:

```tsx
// Access flash messages from Inertia page props
const flashSuccess = page.props?.flash?.success;
const flashError = page.props?.flash?.error;
```

## Testing Scenarios

1. **Update Struktur Organisasi** ✅

    - With photo upload
    - Without photo upload
    - Validation errors

2. **Update Bidang Data** ✅

    - All fields validation
    - Array field validation
    - Success response

3. **Delete Photo** ✅

    - Photo exists → Success flash message
    - Photo not found → Error flash message

4. **Session Persistence** ✅
    - Messages survive page redirects
    - CSRF tokens remain valid
    - No more "plain JSON response" errors

## Files Modified

- `app/Http/Controllers/BerandaController.php`
- `resources/js/pages/admin/EditBeranda.tsx`

This fix ensures complete compatibility between Laravel backend and Inertia.js frontend for the Edit Beranda functionality.
