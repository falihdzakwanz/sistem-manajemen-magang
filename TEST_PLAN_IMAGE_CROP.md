# Test Plan: Image Crop Feature

## Overview

Test plan komprehensif untuk memvalidasi fitur crop foto yang baru diimplementasikan. Fitur ini memungkinkan user untuk crop foto sebelum upload untuk hasil yang lebih rapi dan konsisten.

## Environment Setup

1. **Start the application**:

    ```bash
    php artisan serve
    npm run dev  # or use built assets
    ```

2. **Access admin panel**:
    - Go to `/dashboard-admin`
    - Navigate to "Edit Beranda" section
    - Click on "Struktur Organisasi" tab

## Test Cases

### Test Case 1: Basic Crop Functionality

**Objective**: Memastikan crop modal muncul dan berfungsi dengan baik

**Steps**:

1. Find any struktur organisasi item
2. Click "Edit" button
3. Click "Pilih File" button
4. Select an image from file system
5. Verify crop modal appears with selected image
6. Verify crop area is visible and interactive
7. Drag crop area to different position
8. Resize crop area using corner handles
9. Click "Gunakan Foto" button
10. Verify cropped image appears in preview
11. Click "Simpan" button

**Expected Result**:

- Crop modal appears after file selection
- Crop area can be moved and resized
- Cropped image shows in preview
- Save operation completes successfully

### Test Case 2: Crop Modal Cancel

**Objective**: Memastikan user dapat membatalkan crop process

**Steps**:

1. Open edit modal for any item
2. Click "Pilih File" and select image
3. Wait for crop modal to appear
4. Adjust crop area
5. Click "Batal" button

**Expected Result**:

- Crop modal closes
- No image appears in preview
- Original form state is maintained
- User can select different image

### Test Case 3: Different Image Formats

**Objective**: Test compatibility dengan berbagai format gambar

**Test Images**:

- JPG/JPEG files
- PNG files
- Different resolutions (small, medium, large)
- Different aspect ratios (square, portrait, landscape)

**Steps**:

1. Test each image format/size
2. Verify crop modal works for all formats
3. Verify cropped output is consistent
4. Verify save operation works for all formats

**Expected Result**:

- All supported formats work correctly
- Consistent output regardless of input format
- No errors or crashes with different image sizes

### Test Case 4: Large Image Handling

**Objective**: Test performance dengan gambar berukuran besar

**Steps**:

1. Select very large image (>5MB)
2. Verify crop modal loads without freezing
3. Test crop functionality with large image
4. Verify output is properly compressed
5. Check save performance

**Expected Result**:

- Large images load smoothly in crop modal
- Crop functionality remains responsive
- Output is appropriately compressed
- Save operation completes without timeout

### Test Case 5: Small Image Handling

**Objective**: Test behavior dengan gambar kecil

**Steps**:

1. Select very small image (<100x100 pixels)
2. Verify crop modal appears
3. Test crop functionality
4. Verify output quality

**Expected Result**:

- Small images display correctly in crop modal
- Crop area adjusts appropriately
- Output maintains reasonable quality
- No pixelation or artifacts

### Test Case 6: Aspect Ratio Constraint

**Objective**: Memastikan aspect ratio 1:1 dipertahankan

**Steps**:

1. Select rectangular image (not square)
2. Verify initial crop area is square
3. Try to resize crop area to non-square
4. Verify aspect ratio is maintained
5. Check final output is square

**Expected Result**:

- Initial crop area is square
- Resizing maintains 1:1 aspect ratio
- Final output is always square (300x300)

### Test Case 7: Crop Quality

**Objective**: Memastikan kualitas hasil crop

**Steps**:

1. Select high-quality image
2. Crop different areas of the image
3. Compare output quality
4. Verify text/details remain readable in output

**Expected Result**:

- Output maintains good quality
- No significant compression artifacts
- Text and details remain clear
- Consistent quality across different crop areas

### Test Case 8: Multiple Crop Operations

**Objective**: Test multiple crop operations dalam satu session

**Steps**:

1. Open edit modal
2. Select image and crop it
3. Click "Pilih File" again
4. Select different image and crop it
5. Repeat process several times

**Expected Result**:

- Each crop operation works independently
- No memory leaks or performance degradation
- Previous crop data is properly cleaned up
- UI remains responsive

### Test Case 9: Crop Area Boundaries

**Objective**: Test crop area tidak bisa keluar dari gambar

**Steps**:

1. Select image and open crop modal
2. Try to drag crop area outside image boundaries
3. Try to resize crop area larger than image
4. Verify boundaries are respected

**Expected Result**:

- Crop area stays within image boundaries
- Cannot resize larger than image allows
- Drag operations respect image limits
- No errors or visual glitches

### Test Case 10: Keyboard Navigation

**Objective**: Test accessibility dengan keyboard

**Steps**:

1. Open crop modal
2. Use Tab key to navigate between buttons
3. Use Enter/Space to activate buttons
4. Test keyboard shortcuts if available

**Expected Result**:

- All buttons are keyboard accessible
- Tab order is logical
- Keyboard shortcuts work as expected
- ARIA labels are present for screen readers

## Mobile/Tablet Testing

### Test Case 11: Mobile Crop Experience

**Objective**: Test crop functionality di mobile devices

**Steps**:

1. Access admin panel on mobile device
2. Open edit modal
3. Select image from mobile gallery
4. Test touch interactions for crop
5. Verify modal fits mobile screen

**Expected Result**:

- Crop modal is responsive on mobile
- Touch interactions work smoothly
- Crop area can be manipulated with touch
- Modal doesn't break mobile layout

### Test Case 12: Tablet Crop Experience

**Objective**: Test crop functionality di tablet devices

**Steps**:

1. Access admin panel on tablet
2. Test both portrait and landscape orientation
3. Verify crop modal adapts to different orientations
4. Test touch interactions

**Expected Result**:

- Crop modal works in both orientations
- Touch interactions are precise
- Modal scales appropriately for tablet
- No layout issues in either orientation

## Performance Testing

### Test Case 13: Memory Usage

**Objective**: Monitor memory usage during crop operations

**Steps**:

1. Open browser developer tools
2. Monitor memory usage
3. Perform multiple crop operations
4. Check for memory leaks

**Expected Result**:

- Memory usage remains stable
- No significant memory leaks
- Object URLs are properly released
- Performance doesn't degrade over time

### Test Case 14: Loading Performance

**Objective**: Test crop modal loading speed

**Steps**:

1. Select various image sizes
2. Measure time to display crop modal
3. Monitor CPU usage during crop
4. Test with slow network connection

**Expected Result**:

- Crop modal loads quickly
- CPU usage remains reasonable
- Works acceptably on slow connections
- No UI freezing during operations

## Error Handling

### Test Case 15: Invalid File Types

**Objective**: Test behavior dengan file types yang tidak supported

**Steps**:

1. Try to select PDF file
2. Try to select video file
3. Try to select text file
4. Try to select corrupted image file

**Expected Result**:

- Invalid files are rejected gracefully
- Appropriate error messages are shown
- No crashes or unhandled errors
- User can select valid file afterwards

### Test Case 16: Network Errors

**Objective**: Test behavior saat network issues

**Steps**:

1. Crop image successfully
2. Disconnect internet
3. Try to save changes
4. Reconnect internet
5. Retry save operation

**Expected Result**:

- Network errors are handled gracefully
- User is informed about connectivity issues
- Save can be retried after reconnection
- No data loss occurs

## Browser Compatibility

### Test Case 17: Cross-browser Testing

**Browsers to test**:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Steps**:

1. Test crop functionality in each browser
2. Verify visual consistency
3. Check for any browser-specific issues
4. Test performance differences

**Expected Result**:

- Consistent functionality across browsers
- No browser-specific bugs
- Similar performance characteristics
- Visual consistency maintained

## Accessibility Testing

### Test Case 18: Screen Reader Support

**Objective**: Test accessibility untuk users dengan visual impairments

**Steps**:

1. Use screen reader (NVDA, JAWS, VoiceOver)
2. Navigate crop modal using screen reader
3. Verify all elements are announced
4. Test keyboard navigation

**Expected Result**:

- All interactive elements are accessible
- Proper ARIA labels are present
- Keyboard navigation works completely
- Screen reader announces crop area changes

## Integration Testing

### Test Case 19: End-to-End Workflow

**Objective**: Test complete crop-to-save workflow

**Steps**:

1. Open edit modal
2. Select image file
3. Crop image
4. Save changes
5. Verify cropped image appears on frontend
6. Check database for correct image URL
7. Verify old image is cleaned up

**Expected Result**:

- Complete workflow works seamlessly
- Cropped image appears correctly on frontend
- Database is updated correctly
- File cleanup works properly

### Test Case 20: Backend Integration

**Objective**: Test integration dengan backend file handling

**Steps**:

1. Crop and save image
2. Check server logs for any errors
3. Verify image is saved with correct dimensions
4. Check file permissions and ownership
5. Test temporary file cleanup

**Expected Result**:

- Backend processes cropped image correctly
- No server errors in logs
- Image dimensions are exactly 300x300
- File permissions are correct
- Temporary files are cleaned up

## Validation Checklist

- [ ] Crop modal opens when image is selected
- [ ] Crop area can be moved and resized
- [ ] Aspect ratio is maintained (1:1)
- [ ] "Gunakan Foto" button works
- [ ] "Batal" button cancels operation
- [ ] Cropped image appears in preview
- [ ] Save operation works with cropped image
- [ ] Different image formats work (JPG, PNG)
- [ ] Large images are handled properly
- [ ] Small images are handled properly
- [ ] Mobile/tablet experience works
- [ ] No memory leaks detected
- [ ] Performance is acceptable
- [ ] Error handling works
- [ ] Cross-browser compatibility confirmed
- [ ] Accessibility requirements met
- [ ] Integration with backend works
- [ ] File cleanup works properly

## Success Criteria

✅ All test cases pass
✅ No critical bugs found
✅ Performance is acceptable
✅ Mobile experience works well
✅ Accessibility requirements met
✅ Cross-browser compatibility confirmed
✅ Integration with existing code works
✅ User experience is intuitive

## Common Issues & Solutions

### Issue 1: Crop modal doesn't appear

**Solution**: Check console for JavaScript errors, verify react-image-crop CSS is loaded

### Issue 2: Crop area is too small/large

**Solution**: Adjust initial crop size calculation in onImageLoad

### Issue 3: Poor image quality in output

**Solution**: Increase JPEG quality setting in canvas.toBlob

### Issue 4: Memory issues with large images

**Solution**: Add image resizing before crop if needed

### Issue 5: Mobile touch issues

**Solution**: Ensure react-image-crop is configured for touch events

## Status

🔄 **READY FOR TESTING** - Image crop feature implemented and ready for comprehensive testing

## Next Steps

1. Execute all test cases systematically
2. Document any issues found
3. Fix critical issues before release
4. Conduct user acceptance testing
5. Create user documentation if needed
