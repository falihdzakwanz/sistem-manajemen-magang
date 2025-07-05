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

const FileInput = forwardRef<FileInputHandle, FileInputProps>(
    ({ label, onChange, error, required = false, accept, helpText }, ref) => {
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
    }
);

export default FileInput;
