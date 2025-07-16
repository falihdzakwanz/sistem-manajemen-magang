import React, { useCallback, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    src: string;
    onCropComplete: (croppedImageBlob: Blob) => void;
    onCancel: () => void;
    aspectRatio?: number;
    cropWidth?: number;
    cropHeight?: number;
    title?: string;
}

export default function ImageCropper({
    src,
    onCropComplete,
    onCancel,
    aspectRatio = 1,
    cropWidth = 300,
    cropHeight = 300,
    title = 'Crop Foto',
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
    const imgRef = useRef<HTMLImageElement>(null);

    const onImageLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const { width, height } = e.currentTarget;

            // Calculate initial crop based on aspect ratio and displayed image dimensions
            const displayedWidth = width;
            const displayedHeight = height;

            // Calculate crop size based on aspect ratio
            let cropSize;
            if (aspectRatio === 1) {
                // For square crops, use the smaller dimension
                cropSize = Math.min(displayedWidth, displayedHeight) * 0.8;
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

            // Center the crop
            const x = (displayedWidth - cropSize) / 2;
            const y = (displayedHeight - cropSize / aspectRatio) / 2;

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
            setCompletedCrop({
                unit: 'px',
                width: cropSize,
                height: cropSize / aspectRatio,
                x: Math.max(0, x),
                y: Math.max(0, y),
            });
        },
        [aspectRatio],
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

                ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, cropWidth, cropHeight);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        }
                    },
                    'image/jpeg',
                    0.9,
                );
            });
        },
        [cropWidth, cropHeight],
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

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-4 text-sm text-gray-600">Seret dan resize area untuk memotong foto sesuai keinginan Anda.</div>

                    <div className="mb-6 flex justify-center">
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspectRatio}
                            minWidth={50}
                            minHeight={50}
                            keepSelection
                        >
                            <img ref={imgRef} src={src} alt="Crop preview" onLoad={onImageLoad} className="max-h-[60vh] max-w-full" />
                        </ReactCrop>
                    </div>

                    <div className="mb-4 rounded-lg bg-blue-50 p-4">
                        <h4 className="mb-2 font-medium text-blue-900">Tips:</h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                            <li>• Seret sudut untuk mengubah ukuran area crop</li>
                            <li>• Seret tengah area untuk memindahkan posisi</li>
                            <li>
                                • Hasil akan disesuaikan ke ukuran {cropWidth}x{cropHeight} pixels
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
