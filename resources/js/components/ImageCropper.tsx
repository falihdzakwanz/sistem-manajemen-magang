import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../../css/circular-crop.css';

interface ImageCropperProps {
    src: string;
    onCropComplete: (croppedImageBlob: Blob) => void;
    onCancel: () => void;
    aspectRatio?: number;
    cropWidth?: number;
    cropHeight?: number;
    title?: string;
    circularCrop?: boolean;
}

export default function ImageCropper({
    src,
    onCropComplete,
    onCancel,
    aspectRatio = 1,
    cropWidth = 300,
    cropHeight = 300,
    title = 'Crop Foto',
    circularCrop = true,
}: ImageCropperProps) {
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 80,
        height: 80,
        x: 10,
        y: 10,
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth auto-scroll with enhanced smoothness for portrait images
    const scrollToCropArea = useCallback(() => {
        if (!containerRef.current || !completedCrop) return;

        const container = containerRef.current;
        const cropElement = container.querySelector('.ReactCrop__crop-selection') as HTMLElement;
        const imageElement = container.querySelector('img') as HTMLElement;

        if (cropElement && imageElement) {
            const containerRect = container.getBoundingClientRect();
            const cropRect = cropElement.getBoundingClientRect();
            const imageRect = imageElement.getBoundingClientRect();

            // Detect portrait orientation (9:16 ratio)
            const imageAspectRatio = imageRect.width / imageRect.height;
            const isPortrait = imageAspectRatio < 0.8;

            // Get container scroll info
            const containerScrollTop = container.scrollTop;
            const containerScrollHeight = container.scrollHeight;
            const containerClientHeight = container.clientHeight;

            // Calculate crop center position relative to container
            const cropCenterY = cropRect.top + cropRect.height / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            // For portrait images, use gentler scrolling with smaller steps
            const padding = isPortrait ? 150 : 100;
            const maxScrollStep = isPortrait ? containerClientHeight * 0.25 : containerClientHeight * 0.4;

            // Calculate how far crop center is from container center
            const offsetFromCenter = cropCenterY - containerCenterY;

            // Only scroll if crop is significantly off-center
            if (Math.abs(offsetFromCenter) > padding) {
                // Calculate gentle scroll distance (limited for smooth movement)
                const scrollDistance = Math.sign(offsetFromCenter) * Math.min(Math.abs(offsetFromCenter), maxScrollStep);
                const targetScrollTop = containerScrollTop + scrollDistance;

                // Clamp to valid scroll range
                const clampedScrollTop = Math.max(0, Math.min(targetScrollTop, containerScrollHeight - containerClientHeight));

                // Use smooth scrollTo with controlled movement
                container.scrollTo({
                    top: clampedScrollTop,
                    behavior: 'smooth',
                });
            }
        }
    }, [completedCrop]);

    // Click-to-move crop functionality with smooth scrolling
    const handleImageClick = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => {
            const img = imgRef.current;
            if (!img || isDragging) return; // Don't move if currently dragging

            // Get image dimensions and position
            const rect = img.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            // Get current crop size in display coordinates
            const currentCropSize = completedCrop ? Math.min(completedCrop.width, completedCrop.height) : Math.min(img.width, img.height) * 0.6;

            // Calculate new crop position (center crop on click position)
            const newX = Math.max(0, Math.min(clickX - currentCropSize / 2, img.width - currentCropSize));
            const newY = Math.max(0, Math.min(clickY - currentCropSize / 2, img.height - currentCropSize));

            // Create new crop object
            const newCrop: Crop = {
                unit: 'px',
                width: currentCropSize,
                height: currentCropSize,
                x: newX,
                y: newY,
            };

            // Update crop state
            setCrop(newCrop);

            // Update completed crop for immediate effect
            const newCompletedCrop: PixelCrop = {
                unit: 'px',
                width: currentCropSize,
                height: currentCropSize,
                x: newX,
                y: newY,
            };

            setCompletedCrop(newCompletedCrop);

            // Smooth scroll to new crop position with a slight delay for rendering
            setTimeout(() => {
                scrollToCropArea();
            }, 50); // Increased delay for smoother animation
        },
        [completedCrop, scrollToCropArea, isDragging],
    );

    // Auto-scroll to crop position when modal opens with smooth animation
    useEffect(() => {
        if (imageLoaded && completedCrop && containerRef.current) {
            // Single smooth scroll attempt with proper timing
            const scrollToCrop = () => {
                scrollToCropArea();
            };

            // Delayed smooth scroll for better reliability
            setTimeout(scrollToCrop, 200); // Single scroll with adequate delay
        }
    }, [imageLoaded, completedCrop, scrollToCropArea]);

    // Ultra-responsive drag detection with immediate scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;

        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('ReactCrop__drag-handle') || target.classList.contains('ReactCrop__crop-selection')) {
                setIsDragging(true);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };

        const handleMouseMove = () => {
            if (isDragging) {
                // Cancel previous frame to prevent stacking
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                // Immediate scroll with animation frame for smoothness
                animationFrameId = requestAnimationFrame(() => {
                    scrollToCropArea();
                });
            }
        };

        // Add passive listeners for better performance
        container.addEventListener('mousedown', handleMouseDown, { passive: true });
        window.addEventListener('mouseup', handleMouseUp, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isDragging, scrollToCropArea]);

    // Enhanced crop change handler
    const handleCropChange = useCallback((newCrop: Crop) => {
        setCrop(newCrop);
    }, []);

    // Instant crop complete handler - zero delay
    const handleCropCompleteInternal = useCallback(
        (newCompletedCrop: PixelCrop) => {
            setCompletedCrop(newCompletedCrop);

            // Immediate scroll - no delay for maximum responsiveness
            scrollToCropArea();
        },
        [scrollToCropArea],
    );

    const onImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { width, height } = e.currentTarget;

            // Calculate initial crop based on aspect ratio and displayed image dimensions
            const displayedWidth = width;
            const displayedHeight = height;
            const imageAspectRatio = displayedWidth / displayedHeight;

            // Calculate crop size based on aspect ratio
            let cropSize;
            if (aspectRatio === 1) {
                // For square/circular crops, use smaller dimension for perfect circle
                cropSize = Math.min(displayedWidth, displayedHeight) * 0.6; // Reduced for better proportion
            } else {
                // For other aspect ratios, calculate accordingly
                const maxWidth = displayedWidth * 0.8;
                const maxHeight = displayedHeight * 0.8;

                if (maxWidth / aspectRatio <= maxHeight) {
                    cropSize = maxWidth;
                } else {
                    cropSize = maxHeight * aspectRatio;
                }
            }

            // Smart positioning based on image orientation
            let x, y;

            if (imageAspectRatio < 0.8) {
                // Portrait image (like 9:16) - position crop at top-center
                x = (displayedWidth - cropSize) / 2; // Center horizontally
                y = displayedHeight * 0.15; // Position at top (15% from top)
            } else if (imageAspectRatio > 1.2) {
                // Landscape image - center the crop
                x = (displayedWidth - cropSize) / 2;
                y = (displayedHeight - cropSize / aspectRatio) / 2;
            } else {
                // Square-ish image - center the crop
                x = (displayedWidth - cropSize) / 2;
                y = (displayedHeight - cropSize / aspectRatio) / 2;
            }

            const initialCrop: Crop = {
                unit: 'px',
                width: cropSize,
                height: cropSize / aspectRatio,
                x: Math.max(0, x),
                y: Math.max(0, y),
            };

            setCrop(initialCrop);
            setImageLoaded(true);

            // Set initial completed crop
            const initialCompletedCrop = {
                unit: 'px' as const,
                width: cropSize,
                height: cropSize / aspectRatio,
                x: Math.max(0, x),
                y: Math.max(0, y),
            };

            setCompletedCrop(initialCompletedCrop);

            // Auto-scroll to initial crop position after image loads
            setTimeout(() => {
                scrollToCropArea();
            }, 100); // Small delay to ensure crop is rendered properly
        },
        [aspectRatio, scrollToCropArea],
    );

    const getCroppedImg = useCallback(
        (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error('No 2d context');
                }

                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;

                canvas.width = cropWidth;
                canvas.height = cropHeight;

                // Clear canvas
                ctx.clearRect(0, 0, cropWidth, cropHeight);

                if (circularCrop) {
                    // Create circular crop
                    ctx.save();

                    // Create circular clipping path
                    const centerX = cropWidth / 2;
                    const centerY = cropHeight / 2;
                    const radius = Math.min(cropWidth, cropHeight) / 2;

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    ctx.clip();
                }

                // Draw the cropped image
                ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, cropWidth, cropHeight);

                if (circularCrop) {
                    ctx.restore();
                }

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        }
                    },
                    'image/png', // Use PNG for transparency in circular crops
                    0.9,
                );
            });
        },
        [cropWidth, cropHeight, circularCrop],
    );

    const handleCropComplete = useCallback(async () => {
        if (!completedCrop || !imgRef.current) return;

        try {
            const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
            onCropComplete(croppedImageBlob);
        } catch (error) {
            console.error('Error cropping image:', error);
            alert('Gagal memotong gambar. Silakan coba lagi.');
        }
    }, [completedCrop, getCroppedImg, onCropComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="flex max-h-[95vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button onClick={onCancel} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div ref={containerRef} className="crop-container flex-1 overflow-y-auto p-6" style={{ scrollBehavior: 'smooth' }}>
                    <div className="mb-4 text-sm text-gray-600">
                        Seret dan resize lingkaran untuk memotong foto sesuai keinginan Anda.
                        <span className="text-blue-600"> Hasil akan berbentuk bulat sempurna.</span>
                        <br />
                        <span className="text-green-600">💡 Klik di manapun pada foto untuk memindahkan crop lingkaran ke posisi tersebut!</span>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <ReactCrop
                                crop={crop}
                                onChange={handleCropChange}
                                onComplete={handleCropCompleteInternal}
                                aspect={1} // Always use 1:1 aspect ratio for circular crop
                                minWidth={50}
                                minHeight={50}
                                keepSelection
                                circularCrop={true} // Always use circular crop
                                className="circular-crop"
                            >
                                <img
                                    ref={imgRef}
                                    src={src}
                                    alt="Crop preview"
                                    onLoad={onImageLoad}
                                    onClick={handleImageClick}
                                    className="max-h-[60vh] max-w-full cursor-pointer"
                                    style={{ userSelect: 'none' }}
                                />
                            </ReactCrop>
                        </div>
                    </div>

                    <div className="mb-4 rounded-lg bg-blue-50 p-4">
                        <h4 className="mb-2 font-medium text-blue-900">Tips:</h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                            <li>
                                • <strong>Klik di foto</strong> untuk memindahkan crop lingkaran ke posisi tersebut
                            </li>
                            <li>• Seret sudut lingkaran untuk mengubah ukuran crop</li>
                            <li>• Seret tengah lingkaran untuk memindahkan posisi secara manual</li>
                            <li>• Modal otomatis scroll mengikuti crop tanpa delay</li>
                            <li>• Drag handles ultra-responsif untuk pengalaman terbaik</li>
                            <li>• Untuk foto portrait (9:16), crop otomatis di bagian atas-tengah</li>
                            <li>
                                • Hasil akan disesuaikan ke ukuran {cropWidth}x{cropHeight} pixels berbentuk bulat sempurna
                            </li>
                            <li>• Gunakan foto dengan kualitas baik untuk hasil terbaik</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
                    <button onClick={onCancel} className="rounded-xl border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <button
                        onClick={handleCropComplete}
                        className="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                        disabled={!completedCrop || !imageLoaded}
                    >
                        Gunakan Foto
                    </button>
                </div>
            </div>
        </div>
    );
}
