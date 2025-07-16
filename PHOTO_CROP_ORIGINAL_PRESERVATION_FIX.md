# Photo Crop Original Preservation Fix

## Overview

Fixed the issue where photo crop editing would use the previously cropped image instead of the original photo for subsequent crop operations.

## Problem

When user:

1. Uploaded a photo and cropped it (first time) → saved
2. Edited the photo to crop again → correctly used original photo
3. Saved the second crop → saved
4. Tried to edit/crop again → **INCORRECTLY** used the second crop result instead of original photo

## Root Cause

The system was not properly preserving the `original_photo_url` after saving cropped images, causing subsequent edits to use the cropped result as the source.

## Solution

### 1. **Backend Fix (BerandaController.php)**

#### A. Updated `updateStrukturOrganisasi` method for direct photo uploads:

```php
// Check if there's existing original photo to preserve
if ($existingContent && $existingContent->original_photo_url) {
    // Preserve existing original photo
    $data['original_photo_url'] = $existingContent->original_photo_url;
} else {
    // If no existing original photo, use the main photo as original
    $data['original_photo_url'] = '/storage/' . $photoPath;
}
```

#### B. Updated temporary photo handling:

```php
// IMPORTANT: Preserve existing original_photo_url if it exists
// This ensures that we always keep the original photo for future edits
if ($existingContent && $existingContent->original_photo_url) {
    $data['original_photo_url'] = $existingContent->original_photo_url;
} else {
    // If no existing original photo, use the current photo as original
    $data['original_photo_url'] = '/storage/' . $newPhotoPath;
}
```

#### C. Updated photo deletion logic:

```php
// Only delete old original photo if we have a new one
if ($existingContent && $existingContent->original_photo_url &&
    $request->hasFile('original_photo') &&
    $existingContent->original_photo_url !== $data['original_photo_url']) {
    $oldOriginalPhotoPath = str_replace('/storage/', '', $existingContent->original_photo_url);
    Storage::disk('public')->delete($oldOriginalPhotoPath);
}
```

### 2. **Frontend Fix (EditBeranda.tsx)**

#### A. Enhanced `handleSaveStruktur` method:

```typescript
// Add original photo if available (prioritize originalImageFile, then originalImageUrl)
if (originalImageFile) {
    uploadFormData.append('original_photo', originalImageFile);
} else if (originalImageUrl) {
    // Convert original image URL to blob and append
    try {
        const response = await fetch(originalImageUrl);
        const blob = await response.blob();
        const originalFile = new File([blob], 'original-photo.jpg', { type: 'image/jpeg' });
        uploadFormData.append('original_photo', originalFile);
    } catch (error) {
        console.warn('Failed to fetch original image, will use current photo as original:', error);
    }
}
```

#### B. Maintained existing logic in `handleCropComplete`:

```typescript
// IMPORTANT: Do NOT reset originalImageFile and originalImageUrl here
// They should be preserved for future edit operations
console.log('handleCropComplete: preserving original file/url for future edits');
```

## Key Improvements

### 1. **Original Photo Preservation**

- ✅ `original_photo_url` is now preserved across all save operations
- ✅ Only gets updated when a completely new photo is uploaded
- ✅ Never gets overwritten by cropped versions

### 2. **Smart Photo Source Detection**

- ✅ Frontend prioritizes `originalImageFile` (new uploads) over `originalImageUrl` (existing photos)
- ✅ Automatically converts `originalImageUrl` to file for upload if needed
- ✅ Fallback mechanisms ensure original photo is always available

### 3. **Database Consistency**

- ✅ `photo_url` contains the cropped/current photo
- ✅ `original_photo_url` always contains the original uploaded photo
- ✅ Original photo is preserved indefinitely for future edits

## Files Modified

1. **app/Http/Controllers/BerandaController.php**

    - Enhanced `updateStrukturOrganisasi` method
    - Improved original photo preservation logic
    - Better photo deletion management

2. **resources/js/pages/admin/EditBeranda.tsx**

    - Enhanced `handleSaveStruktur` method
    - Improved original photo handling
    - Better integration with temporary photo upload

3. **app/Models/BerandaContent.php** (Already had PHPDoc)
    - Contains proper property definitions

## Testing Scenarios

### ✅ **Scenario 1: First Upload and Crop**

1. Upload photo → crop → save
2. Result: `photo_url` = cropped, `original_photo_url` = original

### ✅ **Scenario 2: Edit Existing Photo**

1. Edit photo → crop differently → save
2. Result: `photo_url` = new crop, `original_photo_url` = **same original**

### ✅ **Scenario 3: Multiple Edits**

1. Edit photo → crop → save → edit again → crop → save
2. Result: `photo_url` = latest crop, `original_photo_url` = **always original**

### ✅ **Scenario 4: Re-crop After Multiple Saves**

1. After any number of saves, click "Edit Foto"
2. Result: **Always uses original photo as crop source**

## Benefits

- ✅ **Consistent User Experience**: Edit foto always uses original photo
- ✅ **Quality Preservation**: No degradation from multiple crop operations
- ✅ **Data Integrity**: Original photos preserved in database
- ✅ **Flexibility**: Users can always go back to original photo quality
- ✅ **Performance**: Efficient handling of photo operations

## Impact

This fix ensures that no matter how many times a user crops and saves a photo, they can always edit from the original high-quality image, providing the best possible user experience and image quality retention.
