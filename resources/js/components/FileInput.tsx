// components/FileInput.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export interface FileInputProps {
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
    accept?: string;
    helpText?: string;
}

export interface FileInputHandle {
    reset: () => void;
}

const FileInput = forwardRef<FileInputHandle, FileInputProps>(({ label, onChange, error, required = false, accept, helpText }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>('No file chosen');

    useImperativeHandle(ref, () => ({
        reset: () => {
            if (inputRef.current) {
                inputRef.current.value = '';
                setFileName('No file chosen');
            }
        },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            console.log('File info:', {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
            });

            // Validasi ukuran file (2MB = 2 * 1024 * 1024 bytes)
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                alert(`Ukuran file terlalu besar! File Anda: ${fileSizeMB}MB, Maksimal: 2MB.`);
                e.target.value = ''; // Reset input
                setFileName('No file chosen');
                onChange(null);
                return;
            }

            // Validasi tipe file - strict untuk keamanan (hanya PDF asli)
            if (file.type !== 'application/pdf') {
                alert(`Format file tidak didukung! File type: ${file.type}. Hanya file PDF asli yang diizinkan.`);
                e.target.value = ''; // Reset input
                setFileName('No file chosen');
                onChange(null);
                return;
            }

            // Validasi ekstensi file untuk double security
            if (!file.name.toLowerCase().endsWith('.pdf')) {
                alert('Ekstensi file harus .pdf');
                e.target.value = ''; // Reset input
                setFileName('No file chosen');
                onChange(null);
                return;
            }

            // Validasi nama file untuk mencegah path traversal attack
            const dangerousChars = /[<>:"/\\|?*]/;
            const hasControlChars = file.name.split('').some((char) => char.charCodeAt(0) < 32);
            if (dangerousChars.test(file.name) || hasControlChars) {
                alert('Nama file mengandung karakter yang tidak diizinkan.');
                e.target.value = ''; // Reset input
                setFileName('No file chosen');
                onChange(null);
                return;
            }
        }

        setFileName(file?.name || 'No file chosen');
        onChange(file);
    };

    return (
        <div className="w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="flex items-center space-x-3">
                <label
                    htmlFor={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
                    className="inline-block cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Choose File
                </label>
                <span className="text-sm text-gray-700">{fileName}</span>
            </div>

            <input
                id={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
                ref={inputRef}
                type="file"
                onChange={handleChange}
                required={required}
                accept={accept}
                className="hidden"
            />

            {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

export default FileInput;
