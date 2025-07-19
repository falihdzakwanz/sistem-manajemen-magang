import FileInput, { FileInputHandle } from '@/components/FileInput';
import Layout from '@/components/Layout';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CSS custom untuk responsivitas toast di mobile
const mobileToastStyles = `
    .mobile-responsive-toast {
        z-index: 9999;
    }
    
    @media (max-width: 768px) {
        .mobile-responsive-toast {
            position: fixed !important;
            top: 4.5rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            width: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        
        .mobile-responsive-toast .Toastify__toast {
            border-radius: 0.75rem !important;
            font-size: 0.875rem !important;
            padding: 1rem !important;
            margin-bottom: 0.75rem !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            max-width: 100% !important;
            width: 100% !important;
            word-wrap: break-word !important;
            line-height: 1.5 !important;
            animation: slideInRight 0.3s ease-out !important;
            cursor: pointer !important;
            touch-action: manipulation !important;
            user-select: none !important;
        }
        
        .mobile-responsive-toast .Toastify__toast-body {
            font-size: 0.875rem !important;
            padding: 0 !important;
            margin: 0 !important;
            line-height: 1.5 !important;
        }
        
        .mobile-responsive-toast .Toastify__close-button {
            font-size: 1.25rem !important;
            opacity: 0.8 !important;
            padding: 0.5rem !important;
            background: rgba(0, 0, 0, 0.1) !important;
            border-radius: 50% !important;
            width: 2rem !important;
            height: 2rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-left: 0.5rem !important;
            touch-action: manipulation !important;
        }
        
        .mobile-responsive-toast .Toastify__close-button:hover {
            background: rgba(0, 0, 0, 0.2) !important;
            opacity: 1 !important;
        }
        
        .mobile-responsive-toast .Toastify__progress-bar {
            height: 4px !important;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important;
            animation: progress-bar-fill 2.5s linear !important;
        }
        
        /* Tambahan untuk memastikan toast bisa di-tap untuk close */
        .mobile-responsive-toast .Toastify__toast:active {
            transform: scale(0.98) !important;
            transition: transform 0.1s ease !important;
        }
        
        /* Animasi keluar yang lebih smooth */
        .mobile-responsive-toast .Toastify__toast--slide-out-right {
            animation: slideOutRight 0.3s ease-in !important;
        }
        
        /* Pastikan toast tertutup dengan baik */
        .mobile-responsive-toast .Toastify__toast.Toastify__toast--closing {
            animation: slideOutRight 0.3s ease-in forwards !important;
        }
        
        /* Memaksa auto close setelah progress bar selesai */
        .mobile-responsive-toast .Toastify__toast.Toastify__toast--progress-done {
            animation: slideOutRight 0.3s ease-in forwards !important;
        }
        
        /* Progress bar animation */
        @keyframes progress-bar-fill {
            0% { width: 100%; }
            100% { width: 0%; }
        }
        
        /* File input responsive styles */
        .file-input-mobile {
            word-break: break-all;
            overflow-wrap: break-word;
            max-width: 100%;
            line-height: 1.4;
        }
        
        .file-input-button {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
        }
        
        /* Additional mobile file input styles */
        @media (max-width: 768px) {
            .file-input-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .file-input-display {
                background-color: #f9fafb;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                padding: 0.75rem;
                min-height: 2.5rem;
                display: flex;
                align-items: center;
                word-break: break-all;
                overflow-wrap: break-word;
            }
            
            .file-input-button {
                width: 100%;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
                font-weight: 600;
                text-align: center;
                border-radius: 0.375rem;
                background-color: #2563eb;
                color: white;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s ease-in-out;
                touch-action: manipulation;
                -webkit-appearance: none;
                appearance: none;
            }
            
            .file-input-button:hover,
            .file-input-button:focus {
                background-color: #1d4ed8;
            }
            
            .file-input-button:active {
                background-color: #1e40af;
                transform: translateY(1px);
            }
        }
    }
    
    @media (min-width: 769px) {
        .mobile-responsive-toast {
            top: 1.5rem !important;
            right: 1.5rem !important;
            left: auto !important;
            max-width: 28rem !important;
        }
        
        .mobile-responsive-toast .Toastify__toast {
            font-size: 0.9rem !important;
            padding: 1rem 1.25rem !important;
            border-radius: 0.5rem !important;
        }
        
        .mobile-responsive-toast .Toastify__close-button {
            font-size: 1rem !important;
            width: 1.5rem !important;
            height: 1.5rem !important;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = mobileToastStyles;
    document.head.appendChild(styleElement);
}

interface Bidang {
    id: number;
    nama_bidang: string;
    deskripsi: string;
}

interface EditData {
    id: number;
    nama: string;
    nim: string;
    universitas: string;
    jurusan: string;
    email: string;
    telepon: string;
    tanggal_daftar: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    bidang_id: number;
    linkedin: string;
    motivasi: string;
    surat_pengantar: string;
    cv: string;
    reject_reason: string;
}

interface DaftarMagangProps {
    bidangs: Bidang[];
    editData?: EditData;
    isEdit?: boolean;
}

export default function DaftarMagang({ bidangs = [], editData, isEdit = false }: DaftarMagangProps) {
    const { data, setData, reset, errors } = useForm({
        nama: editData?.nama || '',
        nim: editData?.nim || '',
        universitas: editData?.universitas || '',
        jurusan: editData?.jurusan || '',
        email: editData?.email || '',
        telepon: editData?.telepon || '',
        tanggal_daftar: editData?.tanggal_daftar || '',
        tanggal_mulai: editData?.tanggal_mulai || '',
        tanggal_selesai: editData?.tanggal_selesai || '',
        bidang_id: editData?.bidang_id.toString() || '',
        surat_pengantar: null as File | null,
        cv: null as File | null,
        linkedin: editData?.linkedin || '',
        motivasi: editData?.motivasi || '',
    });

    const { flash } = usePage().props as { flash?: { success?: string } };
    const [processing, setProcessing] = React.useState(false);

    // Custom toast configuration for mobile
    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        // Force dismiss any existing toasts first
        toast.dismiss();

        const toastId = toast[type](message, {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
            className: 'mobile-toast-item',
            progressClassName: 'mobile-toast-progress',
            onOpen: () => {
                // DOM manipulation approach - force close setelah 2.5 detik
                setTimeout(() => {
                    const toastElements = document.querySelectorAll('.Toastify__toast');
                    toastElements.forEach((element) => {
                        const htmlElement = element as HTMLElement;
                        htmlElement.classList.add('Toastify__toast--closing');
                        htmlElement.style.animation = 'slideOutRight 0.3s ease-in forwards';

                        setTimeout(() => {
                            if (htmlElement.parentNode) {
                                htmlElement.parentNode.removeChild(htmlElement);
                            }
                        }, 300);
                    });
                    toast.dismiss();
                }, 2600);
            },
            onClose: () => {
                // Cleanup
                setTimeout(() => {
                    toast.dismiss();
                }, 100);
            },
        });

        // Multiple backup mechanisms
        setTimeout(() => {
            toast.dismiss(toastId);
        }, 2700);

        setTimeout(() => {
            toast.dismiss();
            // Force DOM cleanup
            const remainingToasts = document.querySelectorAll('.Toastify__toast');
            remainingToasts.forEach((element) => {
                const htmlElement = element as HTMLElement;
                if (htmlElement.parentNode) {
                    htmlElement.parentNode.removeChild(htmlElement);
                }
            });
        }, 3000);

        return toastId;
    }; // Debug: log data yang diterima (bisa dihapus setelah testing)
    useEffect(() => {
        if (isEdit && editData) {
            console.log('Edit Mode - Data yang diterima:', editData);
        }
    }, [isEdit, editData]);

    // Fungsi untuk mengubah text menjadi Title Case
    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };

    useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, 'success');
        }
    }, [flash]);

    const suratPengantarRef = useRef<FileInputHandle>(null);
    const cvRef = useRef<FileInputHandle>(null);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('nim', data.nim);
        formData.append('universitas', data.universitas);
        formData.append('jurusan', data.jurusan);
        formData.append('email', data.email);
        formData.append('telepon', data.telepon);
        formData.append('tanggal_daftar', data.tanggal_daftar || new Date().toISOString().slice(0, 10));
        formData.append('tanggal_mulai', data.tanggal_mulai);
        formData.append('tanggal_selesai', data.tanggal_selesai);
        formData.append('bidang_id', parseInt(data.bidang_id).toString());
        formData.append('linkedin', data.linkedin);
        formData.append('motivasi', data.motivasi);

        if (data.surat_pengantar) {
            formData.append('surat_pengantar', data.surat_pengantar);
        }

        if (data.cv) {
            formData.append('cv', data.cv);
        }

        const url = isEdit ? `/update-pendaftaran/${editData?.id}` : '/mahasiswa';

        // Jika isEdit, tambahkan token dari URL parameter
        if (isEdit) {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            if (token) {
                formData.append('token', token);
            }
        }

        // Debug: log the submission
        console.log('Submitting form:', { url, isEdit, editData });

        router.post(url, formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
                console.log('Update berhasil untuk user:', editData?.id);
                showToast(
                    isEdit
                        ? 'Data berhasil diperbaiki dan akan direview ulang!'
                        : 'Pendaftaran magang berhasil disubmit! Kami akan menghubungi Anda segera.',
                    'success',
                );
                if (!isEdit) {
                    reset();
                    suratPengantarRef.current?.reset();
                    cvRef.current?.reset();
                }
            },
            onError: (errors) => {
                setProcessing(false);
                console.error('Error submitting form:', errors);
                // Tampilkan error pertama yang ditemukan
                const firstError = Object.values(errors)[0];
                showToast(firstError ? String(firstError) : 'Terjadi kesalahan saat mengirim data. Silakan coba lagi.', 'error');
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <Layout currentPage="daftar-magang">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 py-16 text-white">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-indigo-600/20"></div>
                <div className="absolute top-0 left-0 h-full w-full">
                    <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>
                    <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                            {isEdit ? 'Perbaikan Data' : 'Pendaftaran Online Tersedia'}
                        </div>
                        <h2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                {isEdit ? 'Perbaiki Data Pendaftaran' : 'Daftar Magang'}
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                            {isEdit
                                ? 'Perbaiki data pendaftaran Anda dan kirim ulang untuk direview oleh admin'
                                : 'Bergabunglah dengan program magang di Dinas Kominfo Kota Bandar Lampung dan kembangkan karir Anda di bidang teknologi'}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Persyaratan Magang */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Persyaratan Magang</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Status Aktif</p>
                                    <p className="text-sm text-gray-600">Mahasiswa/siswa aktif dengan surat keterangan dari institusi</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Surat Pengantar</p>
                                    <p className="text-sm text-gray-600">Memiliki surat resmi dari kampus/sekolah</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Komitmen & Disiplin</p>
                                    <p className="text-sm text-gray-600">Berkomitmen tinggi dan taat pada peraturan yang berlaku</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Kemampuan Dasar</p>
                                    <p className="text-sm text-gray-600">Memiliki skill komputer dan teknologi dasar</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Profesionalisme</p>
                                    <p className="text-sm text-gray-600">Berperilaku sopan dan menjaga nama baik institusi</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Kesediaan Belajar</p>
                                    <p className="text-sm text-gray-600">Aktif, antusias, dan siap menerima bimbingan</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Alur Pendaftaran</h4>
                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="relative flex items-start space-x-3">
                                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">Isi Formulir Online</p>
                                        <p className="text-sm text-gray-600">Lengkapi semua data yang diperlukan di formulir pendaftaran</p>
                                    </div>
                                    {/* Connecting line */}
                                    <div className="absolute top-8 left-4 h-6 w-0.5 bg-gray-300"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex items-start space-x-3">
                                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">Upload Dokumen</p>
                                        <p className="text-sm text-gray-600">Unggah surat pengantar dari kampus/sekolah dan CV</p>
                                    </div>
                                    {/* Connecting line */}
                                    <div className="absolute top-8 left-4 h-6 w-0.5 bg-gray-300"></div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex items-start space-x-3">
                                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-semibold text-yellow-600">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">Proses Verifikasi</p>
                                        <p className="text-sm text-gray-600">Tim admin akan memverifikasi dalam 3-7 hari kerja</p>
                                    </div>
                                    {/* Connecting line */}
                                    <div className="absolute top-8 left-4 h-6 w-0.5 bg-gray-300"></div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex items-start space-x-3">
                                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                                        4
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">Akan Dihubungi</p>
                                        <p className="text-sm text-gray-600">Jika lolos seleksi, akan dihubungi untuk konfirmasi</p>
                                    </div>
                                    {/* Connecting line */}
                                    <div className="absolute top-8 left-4 h-6 w-0.5 bg-gray-300"></div>
                                </div>

                                {/* Step 5 */}
                                <div className="relative flex items-start space-x-3">
                                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                                        5
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">Mulai Magang</p>
                                        <p className="text-sm text-gray-600">Bergabung dengan program magang sesuai jadwal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Pendaftaran */}
                    <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-2">
                        <h3 className="mb-6 text-xl font-bold text-gray-800">{isEdit ? 'Perbaiki Data Pendaftaran' : 'Formulir Pendaftaran'}</h3>

                        {/* Tampilkan alasan penolakan jika dalam mode edit */}
                        {isEdit && editData?.reject_reason && (
                            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                                <h4 className="mb-2 font-semibold text-red-700">Alasan Penolakan:</h4>
                                <p className="text-sm text-red-600">{editData.reject_reason}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Nama Lengkap"
                                    value={data.nama}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const titleCaseName = toTitleCase(e.target.value);
                                        setData('nama', titleCaseName);
                                    }}
                                    error={errors.nama}
                                    placeholder="Masukkan nama lengkap Anda"
                                    required
                                />
                                <Input
                                    label="NIM"
                                    value={data.nim}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nim', e.target.value)}
                                    error={errors.nim}
                                    placeholder="Masukkan NIM"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Asal Universitas/Sekolah"
                                    value={data.universitas}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const titleCaseUniversitas = toTitleCase(e.target.value);
                                        setData('universitas', titleCaseUniversitas);
                                    }}
                                    error={errors.universitas}
                                    placeholder="Masukkan nama universitas/sekolah"
                                    required
                                />
                                <Input
                                    label="Jurusan"
                                    value={data.jurusan}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const titleCaseJurusan = toTitleCase(e.target.value);
                                        setData('jurusan', titleCaseJurusan);
                                    }}
                                    error={errors.jurusan}
                                    placeholder="Masukkan jurusan/program studi"
                                    required
                                />
                            </div>

                            <Select
                                label="Bidang yang Diminati"
                                value={data.bidang_id}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('bidang_id', e.target.value)}
                                error={errors.bidang_id}
                                options={(() => {
                                    // Implementasi deduplikasi multi-level untuk memastikan tidak ada duplikasi

                                    // Level 1: Filter duplikasi berdasarkan ID
                                    const uniqueByIdMap = new Map();
                                    bidangs.forEach((bidang) => {
                                        if (!uniqueByIdMap.has(bidang.id)) {
                                            uniqueByIdMap.set(bidang.id, bidang);
                                        }
                                    });

                                    // Level 2: Filter duplikasi berdasarkan nama_bidang
                                    const uniqueByNameMap = new Map();
                                    Array.from(uniqueByIdMap.values()).forEach((bidang) => {
                                        if (!uniqueByNameMap.has(bidang.nama_bidang)) {
                                            uniqueByNameMap.set(bidang.nama_bidang, bidang);
                                        }
                                    });

                                    const finalUniqueBidangs = Array.from(uniqueByNameMap.values());

                                    return [
                                        { value: '', label: 'Pilih bidang yang diminati' },
                                        ...finalUniqueBidangs.map((bidang) => ({
                                            value: bidang.id.toString(),
                                            label: bidang.nama_bidang,
                                        })),
                                    ];
                                })()}
                                required
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                    error={errors.email}
                                    placeholder="Masukkan alamat email"
                                    required
                                />
                                <Input
                                    label="No. Telepon"
                                    value={data.telepon}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('telepon', e.target.value)}
                                    error={errors.telepon}
                                    placeholder="Masukkan nomor telepon (WhatsApp)"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Tanggal Mulai Magang"
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('tanggal_mulai', e.target.value)}
                                    error={errors.tanggal_mulai}
                                    required
                                />
                                <Input
                                    label="Tanggal Selesai Magang"
                                    type="date"
                                    value={data.tanggal_selesai}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('tanggal_selesai', e.target.value)}
                                    error={errors.tanggal_selesai}
                                    required
                                />
                            </div>

                            <FileInput
                                ref={suratPengantarRef}
                                label="Surat Pengantar dari Kampus/Sekolah"
                                onChange={(file: File | null) => setData('surat_pengantar', file)}
                                error={errors.surat_pengantar}
                                accept=".pdf"
                                helpText={
                                    isEdit && editData?.surat_pengantar
                                        ? `File saat ini: ${editData.surat_pengantar.split('/').pop()} | Format: PDF saja (Max: 2MB)`
                                        : 'Format: PDF saja (Max: 2MB)'
                                }
                                required={!isEdit}
                            />

                            <FileInput
                                ref={cvRef}
                                label="CV (Opsional)"
                                onChange={(file: File | null) => setData('cv', file)}
                                error={errors.cv}
                                accept=".pdf"
                                helpText={
                                    isEdit && editData?.cv
                                        ? `File saat ini: ${editData.cv.split('/').pop()} | Format: PDF saja (Max: 2MB)`
                                        : 'Format: PDF saja (Max: 2MB)'
                                }
                            />

                            <Input
                                label="LinkedIn (Opsional)"
                                value={data.linkedin}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('linkedin', e.target.value)}
                                error={errors.linkedin}
                                placeholder="https://linkedin.com/in/nama-anda"
                            />

                            <Textarea
                                label="Motivasi Magang"
                                value={data.motivasi}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('motivasi', e.target.value)}
                                error={errors.motivasi}
                                placeholder="Jelaskan motivasi dan tujuan Anda mengikuti program magang ini..."
                                rows={4}
                                required
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition duration-200 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : isEdit ? 'Update Data' : 'Daftar Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Notifikasi */}
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                className="mobile-responsive-toast"
                limit={3}
                stacked={false}
                toastClassName="mobile-toast-item"
            />
        </Layout>
    );
}

type InputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
};

function Input({ label, type = 'text', value, onChange, error, required = false, placeholder }: InputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

type SelectProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    required?: boolean;
    options: { value: string; label: string }[];
};

function Select({ label, value, onChange, error, required = false, options }: SelectProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                {options.map((option, index) => (
                    <option key={option.value || `option-${index}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

type TextareaProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
};

function Textarea({ label, value, onChange, error, required = false, placeholder, rows = 3 }: TextareaProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                rows={rows}
                className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
