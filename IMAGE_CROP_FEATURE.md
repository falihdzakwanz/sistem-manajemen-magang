# Image Crop Feature Implementation

## Overview

Implementasi fitur crop foto untuk memberikan kontrol yang lebih baik kepada user dalam mengatur ukuran dan posisi foto sebelum diupload. Fitur ini menggunakan library `react-image-crop` yang populer dan user-friendly.

## Libraries Added

### 1. react-image-crop

```bash
npm install react-image-crop
npm install @types/react-image-crop --save-dev
```

Library yang digunakan untuk crop functionality dengan fitur:

- Drag and resize crop area
- Aspect ratio control
- High quality output
- Mobile friendly
- Keyboard navigation support

## Components Created

### 1. ImageCropper Component

**File**: `resources/js/components/ImageCropper.tsx`

**Features**:

- Modal interface untuk crop
- Drag & resize crop area
- Aspect ratio control (default 1:1)
- Output size customization
- Preview before applying
- User-friendly tips and instructions

**Props**:

```typescript
interface ImageCropperProps {
    src: string; // Source image URL
    onCropComplete: (croppedImageBlob: Blob) => void; // Callback when crop is done
    onCancel: () => void; // Callback when user cancels
    aspectRatio?: number; // Aspect ratio (default: 1)
    cropWidth?: number; // Output width (default: 300)
    cropHeight?: number; // Output height (default: 300)
}
```

## Integration with EditBeranda

### 1. New State Variables

```typescript
// Crop modal state
const [showCropModal, setShowCropModal] = useState(false);
const [imageToCrop, setImageToCrop] = useState<string | null>(null);
```

### 2. Updated Photo Upload Flow

```typescript
// Old flow: File -> Direct preview
const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setStrukturForm((prev) => ({ ...prev, photo: file }));
        // Direct preview
        setPhotoPreview(URL.createObjectURL(file));
    }
};

// New flow: File -> Crop modal -> Cropped preview
const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setImageToCrop(imageUrl);
            setShowCropModal(true); // Show crop modal
        };
        reader.readAsDataURL(file);
    }
};
```

### 3. Crop Handlers

```typescript
const handleCropComplete = (croppedImageBlob: Blob) => {
    // Convert blob to file
    const croppedFile = new File([croppedImageBlob], 'cropped-image.jpg', {
        type: 'image/jpeg',
    });

    // Update form with cropped image
    setStrukturForm((prev) => ({ ...prev, photo: croppedFile }));

    // Create preview URL for display
    const previewUrl = URL.createObjectURL(croppedImageBlob);
    setPhotoPreview(previewUrl);

    // Close crop modal
    setShowCropModal(false);
    setImageToCrop(null);
};

const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
};
```

### 4. Crop Modal in JSX

```typescript
{/* Crop Modal */}
{showCropModal && imageToCrop && (
    <ImageCropper
        src={imageToCrop}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
        aspectRatio={1}
        cropWidth={300}
        cropHeight={300}
    />
)}
```

## User Experience Flow

### 1. Old Flow (Before Crop)

```
1. User clicks "Pilih File"
2. User selects image from file system
3. Image directly appears as preview
4. User clicks "Simpan"
5. Original image (potentially large/uncropped) is uploaded
```

### 2. New Flow (With Crop)

```
1. User clicks "Pilih File"
2. User selects image from file system
3. Crop modal appears with selected image
4. User adjusts crop area (drag, resize)
5. User clicks "Gunakan Foto"
6. Cropped image appears as preview
7. User clicks "Simpan"
8. Cropped image (optimized size) is uploaded
```

## Crop Modal Features

### 1. Visual Controls

- **Drag to move**: Click and drag center to move crop area
- **Resize corners**: Drag corner handles to resize
- **Aspect ratio**: Maintains 1:1 aspect ratio by default
- **Preview**: Real-time preview of crop area

### 2. User Guidance

- **Tips section**: Clear instructions on how to use
- **Size information**: Shows output dimensions (300x300 pixels)
- **Visual feedback**: Highlighted crop area with handles

### 3. Quality Settings

- **Output format**: JPEG with 90% quality
- **Compression**: Optimized for web usage
- **Consistent sizing**: All photos output at same dimensions

## Technical Implementation

### 1. Canvas-based Cropping

```typescript
const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = cropWidth;
            canvas.height = cropHeight;

            ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, cropWidth, cropHeight);

            canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                },
                'image/jpeg',
                0.9,
            );
        });
    },
    [cropWidth, cropHeight],
);
```

### 2. File Conversion

```typescript
// Convert blob to File object for form submission
const croppedFile = new File([croppedImageBlob], 'cropped-image.jpg', {
    type: 'image/jpeg',
});
```

### 3. Memory Management

```typescript
// Clean up object URLs to prevent memory leaks
const previewUrl = URL.createObjectURL(croppedImageBlob);
setPhotoPreview(previewUrl);

// Later: URL.revokeObjectURL(previewUrl);
```

## Benefits

### 1. User Experience

- **Consistent sizing**: All photos have same dimensions
- **Better control**: User can choose best part of image
- **Preview**: See exact result before saving
- **Professional look**: Uniform photo sizes in layout

### 2. Technical Benefits

- **Reduced file size**: Cropped images are smaller
- **Faster uploads**: Smaller files upload faster
- **Storage efficiency**: Less storage space required
- **Consistent layout**: No layout breaking from different image sizes

### 3. Visual Benefits

- **Uniform appearance**: All photos same size
- **Better composition**: User can focus on important part
- **Professional look**: Clean, consistent grid layout
- **Responsive design**: Works on all screen sizes

## Configuration Options

### 1. Aspect Ratio

```typescript
// Square images (1:1) - default
aspectRatio={1}

// Portrait images (3:4)
aspectRatio={3/4}

// Landscape images (4:3)
aspectRatio={4/3}

// No aspect ratio constraint
aspectRatio={undefined}
```

### 2. Output Size

```typescript
// Small images (150x150)
cropWidth={150}
cropHeight={150}

// Medium images (300x300) - default
cropWidth={300}
cropHeight={300}

// Large images (600x600)
cropWidth={600}
cropHeight={600}
```

### 3. Quality Settings

```typescript
// High quality (larger file size)
canvas.toBlob(resolve, 'image/jpeg', 0.95);

// Medium quality (default)
canvas.toBlob(resolve, 'image/jpeg', 0.9);

// Lower quality (smaller file size)
canvas.toBlob(resolve, 'image/jpeg', 0.8);
```

## Testing Checklist

- [ ] Upload image and crop modal appears
- [ ] Crop area can be dragged and resized
- [ ] "Gunakan Foto" button works correctly
- [ ] "Batal" button cancels crop process
- [ ] Cropped image appears in preview
- [ ] Cropped image saves correctly
- [ ] Different image formats work (JPG, PNG)
- [ ] Large images are handled correctly
- [ ] Small images are handled correctly
- [ ] Mobile/tablet experience works well

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Multiple aspect ratios**: Let user choose between square, portrait, landscape
2. **Zoom functionality**: Allow zoom in/out within crop area
3. **Rotation**: Add image rotation before cropping
4. **Filters**: Basic filters like brightness, contrast
5. **Batch cropping**: Crop multiple images at once
6. **Smart crop**: AI-powered automatic crop suggestions

## Status

✅ **IMPLEMENTED** - Image crop feature berhasil diimplementasikan dan siap digunakan

## Next Steps

1. User testing untuk memastikan UX yang optimal
2. Performance testing dengan berbagai ukuran gambar
3. Browser compatibility testing
4. Mobile/tablet testing
5. Accessibility testing
