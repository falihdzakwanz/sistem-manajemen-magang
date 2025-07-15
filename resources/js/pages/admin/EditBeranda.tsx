import { router } from '@inertiajs/react';
import React, { useState } from 'react';

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

// Helper function to get fresh CSRF token with retry mechanism
const getCsrfToken = () => {
    // Try to get token from multiple sources
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    const token = metaTag?.getAttribute('content');

    // If token is empty or not found, try to reload it
    if (!token) {
        // Force a page refresh to get new CSRF token
        console.warn('CSRF token not found, reloading page...');
        window.location.reload();
        return '';
    }

    return token;
};

interface StrukturOrganisasi {
    id: number;
    key: string;
    title: string;
    description: string;
    photo_url: string | null;
}

interface BidangData {
    id: number;
    key: string;
    title: string;
    description: string;
    data: {
        kepala: string;
        icon: string;
        color: string;
        tugas: string[];
        magangTasks: string[];
        staffFungsional: string[];
    };
}

interface EditBerandaProps {
    strukturOrganisasi: StrukturOrganisasi[];
    bidangData: BidangData[];
}

export default function EditBeranda({ strukturOrganisasi = [], bidangData = [] }: EditBerandaProps) {
    const [activeTab, setActiveTab] = useState<'struktur' | 'bidang'>('struktur');
    const [editingItem, setEditingItem] = useState<StrukturOrganisasi | BidangData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Form data for struktur organisasi
    const [strukturForm, setStrukturForm] = useState({
        key: '',
        title: '',
        description: '',
        photo: null as File | null,
    });

    // Form data for bidang
    const [bidangForm, setBidangForm] = useState({
        key: '',
        title: '',
        description: '',
        data: {
            kepala: '',
            icon: '',
            color: '',
            tugas: [''],
            magangTasks: [''],
            staffFungsional: [''],
        },
    });

    const handleBack = () => {
        router.get('/dashboard-admin');
    };

    const openEditStruktur = (item: StrukturOrganisasi) => {
        setEditingItem(item);
        setStrukturForm({
            key: item.key,
            title: item.title,
            description: item.description,
            photo: null,
        });
        setPhotoPreview(item.photo_url);
        setActiveTab('struktur');
        setShowModal(true);
    };

    const openEditBidang = (item: BidangData) => {
        setEditingItem(item);
        setBidangForm({
            key: item.key,
            title: item.title,
            description: item.description,
            data: {
                kepala: item.data.kepala,
                icon: item.data.icon,
                color: item.data.color,
                tugas: [...item.data.tugas],
                magangTasks: [...item.data.magangTasks],
                staffFungsional: [...item.data.staffFungsional],
            },
        });
        setActiveTab('bidang');
        setShowModal(true);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setStrukturForm((prev) => ({ ...prev, photo: file }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = async () => {
        if (!editingItem) return;

        setLoading(true);

        // Use Inertia.js for better session handling
        router.delete(`/admin/delete-photo`, {
            data: { key: editingItem.key },
            onSuccess: (page: InertiaPage) => {
                setPhotoPreview(null);
                setStrukturForm((prev) => ({ ...prev, photo: null }));
                // Check for flash message
                const flashSuccess = page.props?.flash?.success;
                if (flashSuccess) {
                    alert(`✅ ${flashSuccess}`);
                } else {
                    alert('✅ Foto berhasil dihapus!');
                }
                setLoading(false);
            },
            onError: (errors) => {
                console.error('Delete photo errors:', errors);
                // Check for error flash message
                const errorMessage = errors?.error || 'Gagal menghapus foto! Silakan coba lagi.';
                alert(`❌ ${errorMessage}`);
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const handleSaveStruktur = async () => {
        if (!strukturForm.title.trim() || !strukturForm.description.trim()) {
            alert('Mohon lengkapi nama dan jabatan!');
            return;
        }

        setLoading(true);

        // Alternative approach: Use Inertia.js for better session handling
        if (strukturForm.photo) {
            // Use Inertia for file uploads with automatic CSRF handling
            const formData = new FormData();
            formData.append('key', strukturForm.key);
            formData.append('title', strukturForm.title);
            formData.append('description', strukturForm.description);
            formData.append('photo', strukturForm.photo);

            router.post('/admin/update-struktur-organisasi', Object.fromEntries(formData), {
                forceFormData: true,
                onSuccess: (page: InertiaPage) => {
                    const flashSuccess = page.props?.flash?.success;
                    if (flashSuccess) {
                        alert(`✅ ${flashSuccess}\n\nPerubahan akan langsung terlihat di halaman beranda user.`);
                    } else {
                        alert('✅ Struktur organisasi berhasil diperbarui!\n\nPerubahan akan langsung terlihat di halaman beranda user.');
                    }
                    setShowModal(false);
                    setLoading(false);
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                    alert('❌ Gagal memperbarui struktur organisasi!\n\nSilakan periksa input Anda.');
                    setLoading(false);
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
            return;
        }

        // For non-file uploads, try fetch API with better error handling
        try {
            const csrfToken = getCsrfToken();

            const response = await fetch('/admin/update-struktur-organisasi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    key: strukturForm.key,
                    title: strukturForm.title,
                    description: strukturForm.description,
                }),
            });

            if (response.ok) {
                alert('✅ Struktur organisasi berhasil diperbarui!\n\nPerubahan akan langsung terlihat di halaman beranda user.');
                setShowModal(false);
                router.reload();
            } else {
                const errorData = await response.json().catch(() => ({}));

                if (response.status === 419) {
                    alert('⚠️ Session expired. Silakan logout dan login kembali.');
                    router.visit('/logout', { method: 'post' });
                } else if (response.status === 401) {
                    alert('⚠️ Anda tidak memiliki akses. Silakan login kembali.');
                    router.visit('/login');
                } else {
                    alert(`❌ Gagal memperbarui struktur organisasi!\n\nError: ${errorData.message || 'Server error'}`);
                }
            }
        } catch (error) {
            console.error('Error updating struktur:', error);
            alert('❌ Terjadi kesalahan jaringan!\n\nSilakan periksa koneksi internet dan coba lagi.');
        }

        setLoading(false);
    };

    const handleSaveBidang = async () => {
        if (!bidangForm.title.trim() || !bidangForm.description.trim() || !bidangForm.data.kepala.trim()) {
            alert('Mohon lengkapi nama bidang, deskripsi, dan nama kepala bidang!');
            return;
        }

        // Validasi array tidak boleh kosong
        const hasEmptyTugas = bidangForm.data.tugas.some((tugas) => !tugas.trim());
        const hasEmptyMagangTasks = bidangForm.data.magangTasks.some((task) => !task.trim());
        const hasEmptyStaff = bidangForm.data.staffFungsional.some((staff) => !staff.trim());

        if (hasEmptyTugas || hasEmptyMagangTasks || hasEmptyStaff) {
            alert('Mohon lengkapi semua field atau hapus yang kosong!');
            return;
        }

        setLoading(true);

        // Filter out empty strings
        const cleanedBidangForm = {
            ...bidangForm,
            data: {
                ...bidangForm.data,
                tugas: bidangForm.data.tugas.filter((tugas) => tugas.trim()),
                magangTasks: bidangForm.data.magangTasks.filter((task) => task.trim()),
                staffFungsional: bidangForm.data.staffFungsional.filter((staff) => staff.trim()),
            },
        };

        // Use Inertia.js for better session handling
        router.post('/admin/update-bidang', cleanedBidangForm, {
            onSuccess: (page: InertiaPage) => {
                const flashSuccess = page.props?.flash?.success;
                if (flashSuccess) {
                    alert(`✅ ${flashSuccess}\n\nPerubahan akan langsung terlihat di halaman beranda user.`);
                } else {
                    alert('✅ Data bidang berhasil diperbarui!\n\nPerubahan akan langsung terlihat di halaman beranda user.');
                }
                setShowModal(false);
                setLoading(false);
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                if (errors.message) {
                    alert(`❌ Gagal memperbarui data bidang!\n\nError: ${errors.message}`);
                } else {
                    alert('❌ Gagal memperbarui data bidang!\n\nSilakan periksa input Anda.');
                }
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const addArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional') => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: [...prev.data[field], ''],
            },
        }));
    };

    const removeArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional', index: number) => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: prev.data[field].filter((_, i) => i !== index),
            },
        }));
    };

    const updateArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional', index: number, value: string) => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: prev.data[field].map((item, i) => (i === index ? value : item)),
            },
        }));
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
            style={{
                overflow: showModal ? 'hidden' : undefined,
                height: showModal ? '100vh' : undefined,
            }}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg">
                                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                                    Edit Beranda
                                </h1>
                                <p className="text-sm font-medium opacity-90">Kelola konten dinamis untuk tampilan beranda user</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Statistics */}
                            <div className="hidden items-center space-x-4 text-sm md:flex">
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Struktur:</span>
                                    <span className="ml-1 font-semibold">{strukturOrganisasi.length}</span>
                                </div>
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Bidang:</span>
                                    <span className="ml-1 font-semibold">{bidangData.length}</span>
                                </div>
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Status:</span>
                                    <span className="ml-1 font-semibold text-green-300">Sinkron</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBack}
                                className="flex items-center space-x-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Kembali</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Info Banner */}
                <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Sistem Beranda Dinamis</h3>
                            <p className="mb-3 text-gray-700">
                                Semua perubahan yang Anda lakukan di sini akan <strong>langsung tersinkronisasi</strong> dengan halaman beranda yang
                                dilihat oleh user. Data tidak lagi statis dan akan mengambil informasi terbaru dari database.
                            </p>
                            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-600">Real-time sync dengan halaman user</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-600">Data tersimpan di database</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-600">Upload foto untuk struktur organisasi</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">✓</span>
                                    <span className="text-gray-600">Kelola tugas dan kegiatan magang</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8 flex space-x-4">
                    <button
                        onClick={() => setActiveTab('struktur')}
                        className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-colors ${
                            activeTab === 'struktur'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <span>📋</span>
                        <span>Struktur Organisasi</span>
                        <span className={`rounded-full px-2 py-1 text-xs ${activeTab === 'struktur' ? 'bg-white/20' : 'bg-gray-100'}`}>
                            {strukturOrganisasi.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('bidang')}
                        className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-colors ${
                            activeTab === 'bidang'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <span>🏢</span>
                        <span>Data Bidang</span>
                        <span className={`rounded-full px-2 py-1 text-xs ${activeTab === 'bidang' ? 'bg-white/20' : 'bg-gray-100'}`}>
                            {bidangData.length}
                        </span>
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'struktur' && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {strukturOrganisasi.map((item) => {
                            // Dynamic display configuration based on key
                            const getItemConfig = (key: string) => {
                                const configs: Record<string, { displayName: string; category: string; bgColor: string; badgeColor: string }> = {
                                    kepala_dinas: {
                                        displayName: 'Kepala Dinas',
                                        category: 'Pimpinan',
                                        bgColor: 'bg-blue-50',
                                        badgeColor: 'bg-blue-100 text-blue-600',
                                    },
                                    sekretaris: {
                                        displayName: 'Sekretaris',
                                        category: 'Kesekretariatan',
                                        bgColor: 'bg-purple-50',
                                        badgeColor: 'bg-purple-100 text-purple-600',
                                    },
                                    kasubag_umum: {
                                        displayName: 'Kasubbag Umum Dan Kepegawaian',
                                        category: 'Sub Bagian',
                                        bgColor: 'bg-green-50',
                                        badgeColor: 'bg-green-100 text-green-600',
                                    },
                                    kasubag_keuangan: {
                                        displayName: 'Kasubbag Keuangan Dan Aset',
                                        category: 'Sub Bagian',
                                        bgColor: 'bg-green-50',
                                        badgeColor: 'bg-green-100 text-green-600',
                                    },
                                    kasubag_program: {
                                        displayName: 'Kasubag Program & Pelaporan',
                                        category: 'Sub Bagian',
                                        bgColor: 'bg-green-50',
                                        badgeColor: 'bg-green-100 text-green-600',
                                    },
                                    perencana_ahli_muda: {
                                        displayName: 'Jabatan Fungsional Perencana Ahli Muda',
                                        category: 'Jabatan Fungsional',
                                        bgColor: 'bg-teal-50',
                                        badgeColor: 'bg-teal-100 text-teal-600',
                                    },
                                    kabid_informasi: {
                                        displayName: 'Kepala Bidang Informasi dan Komunikasi Publik',
                                        category: 'Kepala Bidang',
                                        bgColor: 'bg-orange-50',
                                        badgeColor: 'bg-orange-100 text-orange-600',
                                    },
                                    kabid_egovernment: {
                                        displayName: 'Kepala Bidang Pemberdayaan E-Government',
                                        category: 'Kepala Bidang',
                                        bgColor: 'bg-orange-50',
                                        badgeColor: 'bg-orange-100 text-orange-600',
                                    },
                                    kabid_keamanan: {
                                        displayName: 'Kepala Bidang Persandian, Keamanan Informasi dan Siber',
                                        category: 'Kepala Bidang',
                                        bgColor: 'bg-orange-50',
                                        badgeColor: 'bg-orange-100 text-orange-600',
                                    },
                                    kabid_statistik: {
                                        displayName: 'Kepala Bidang Statistik dan Data Elektronik',
                                        category: 'Kepala Bidang',
                                        bgColor: 'bg-orange-50',
                                        badgeColor: 'bg-orange-100 text-orange-600',
                                    },
                                };

                                return (
                                    configs[key] || {
                                        displayName: item.description,
                                        category: 'Lainnya',
                                        bgColor: 'bg-gray-50',
                                        badgeColor: 'bg-gray-100 text-gray-600',
                                    }
                                );
                            };

                            const config = getItemConfig(item.key);

                            return (
                                <div key={item.id} className={`rounded-3xl border border-gray-100 ${config.bgColor} p-6 shadow-xl`}>
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${config.badgeColor}`}>
                                                {config.category}
                                            </span>
                                            <h3 className="mt-2 text-lg font-bold text-gray-800">{config.displayName}</h3>
                                        </div>
                                        <button
                                            onClick={() => openEditStruktur(item)}
                                            className="rounded-lg bg-blue-100 px-3 py-1 text-blue-600 hover:bg-blue-200"
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    {item.photo_url && (
                                        <div className="mb-4 flex justify-center">
                                            <img src={item.photo_url} alt={item.title} className="h-24 w-24 rounded-full object-cover shadow-md" />
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-800">{item.title || 'Belum diisi'}</h4>
                                        <p className="text-sm text-gray-600">{item.description || 'Belum ada deskripsi'}</p>
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="mt-3 flex justify-center">
                                        <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs ${
                                                item.title && item.description ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                        >
                                            {item.title && item.description ? '✓ Lengkap' : '⚠ Perlu dilengkapi'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'bidang' && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {bidangData.map((item) => {
                            // Color mapping untuk background berdasarkan data.color
                            const getColorConfig = (color: string) => {
                                const colorMap: Record<string, { bg: string; text: string }> = {
                                    blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
                                    purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
                                    green: { bg: 'bg-green-50', text: 'text-green-700' },
                                    red: { bg: 'bg-red-50', text: 'text-red-700' },
                                    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
                                    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
                                    teal: { bg: 'bg-teal-50', text: 'text-teal-700' },
                                };
                                return colorMap[color] || { bg: 'bg-gray-50', text: 'text-gray-700' };
                            };

                            const colorConfig = getColorConfig(item.data?.color || 'gray');
                            const isComplete =
                                item.title &&
                                item.description &&
                                item.data?.kepala &&
                                item.data?.tugas?.length > 0 &&
                                item.data?.magangTasks?.length > 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`rounded-3xl border border-gray-100 ${colorConfig.bg} p-6 shadow-xl transition-all hover:shadow-2xl`}
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-3xl">{item.data?.icon || '🏢'}</span>
                                            <div>
                                                <h3 className={`text-lg font-bold ${colorConfig.text}`}>{item.title || 'Belum diisi'}</h3>
                                                <span
                                                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                        isComplete ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                    }`}
                                                >
                                                    {isComplete ? '✓ Lengkap' : '⚠ Perlu dilengkapi'}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => openEditBidang(item)}
                                            className="rounded-lg bg-blue-100 px-3 py-1 text-blue-600 transition-colors hover:bg-blue-200"
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600">{item.description || 'Belum ada deskripsi'}</p>

                                        <div className="grid grid-cols-1 gap-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-700">Kepala Bidang:</span>
                                                <span className="text-gray-600">{item.data?.kepala || 'Belum diisi'}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-700">Tugas:</span>
                                                <span className="text-gray-600">{item.data?.tugas?.length || 0} item</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-700">Kegiatan Magang:</span>
                                                <span className="text-gray-600">{item.data?.magangTasks?.length || 0} item</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-700">Staff Fungsional:</span>
                                                <span className="text-gray-600">{item.data?.staffFungsional?.length || 0} orang</span>
                                            </div>
                                        </div>

                                        {/* Preview singkat tugas */}
                                        {item.data?.tugas && item.data.tugas.length > 0 && (
                                            <div className="mt-3 border-t border-gray-200 pt-3">
                                                <p className="mb-1 text-xs font-medium text-gray-500">Preview Tugas:</p>
                                                <p className="line-clamp-2 text-xs text-gray-600">
                                                    {item.data.tugas[0]}
                                                    {item.data.tugas.length > 1 && ` (+${item.data.tugas.length - 1} lainnya)`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Empty state jika tidak ada data bidang */}
                        {bidangData.length === 0 && (
                            <div className="col-span-full">
                                <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                                    <div className="mb-4 text-6xl">🏢</div>
                                    <h3 className="mb-2 text-lg font-medium text-gray-700">Belum Ada Data Bidang</h3>
                                    <p className="text-gray-500">Data bidang akan ditampilkan setelah diisi melalui seeder atau database</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal Edit */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    style={{
                        overscrollBehavior: 'contain',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>
                        {`
                /* Hide scrollbar for modal overlay and modal content */
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
                    </style>
                    <div className="hide-scrollbar max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white">
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {activeTab === 'struktur' ? 'Edit Struktur Organisasi' : 'Edit Data Bidang'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {activeTab === 'struktur' ? (
                                /* Struktur Organisasi Form */
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            value={strukturForm.title}
                                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, title: e.target.value }))}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                        <input
                                            type="text"
                                            value={strukturForm.description}
                                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, description: e.target.value }))}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Foto</label>
                                        <div className="mt-2 space-y-4">
                                            {photoPreview && (
                                                <div className="flex items-center space-x-4">
                                                    <img src={photoPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
                                                    <button
                                                        onClick={handleDeletePhoto}
                                                        className="rounded-xl bg-red-500 px-6 py-2 text-white hover:bg-red-600 disabled:opacity-50"
                                                        disabled={loading}
                                                    >
                                                        Hapus Foto
                                                    </button>
                                                </div>
                                            )}
                                            <div>
                                                <label className="cursor-pointer rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
                                                    {photoPreview ? 'Ganti Foto' : 'Upload Foto'}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoChange}
                                                        className="hidden"
                                                        disabled={loading}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Bidang Form */
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nama Bidang</label>
                                            <input
                                                type="text"
                                                value={bidangForm.title}
                                                onChange={(e) => setBidangForm((prev) => ({ ...prev, title: e.target.value }))}
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Kepala Bidang</label>
                                            <input
                                                type="text"
                                                value={bidangForm.data.kepala}
                                                onChange={(e) =>
                                                    setBidangForm((prev) => ({
                                                        ...prev,
                                                        data: { ...prev.data, kepala: e.target.value },
                                                    }))
                                                }
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Icon (Emoji)</label>
                                            <select
                                                value={bidangForm.data.icon}
                                                onChange={(e) =>
                                                    setBidangForm((prev) => ({
                                                        ...prev,
                                                        data: { ...prev.data, icon: e.target.value },
                                                    }))
                                                }
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            >
                                                <option value="📢">📢 Megaphone</option>
                                                <option value="🏛️">🏛️ Government</option>
                                                <option value="💻">💻 Computer</option>
                                                <option value="📊">📊 Chart</option>
                                                <option value="🏢">🏢 Building</option>
                                                <option value="🔧">🔧 Tool</option>
                                                <option value="📋">📋 Clipboard</option>
                                                <option value="🎯">🎯 Target</option>
                                                <option value="📈">📈 Graph</option>
                                                <option value="⚙️">⚙️ Gear</option>
                                                <option value="🌐">🌐 Globe</option>
                                                <option value="📱">📱 Phone</option>
                                                <option value="🎨">🎨 Art</option>
                                                <option value="🔍">🔍 Search</option>
                                                <option value="📞">📞 Telephone</option>
                                                <option value="🏆">🏆 Trophy</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Warna</label>
                                            <select
                                                value={bidangForm.data.color}
                                                onChange={(e) =>
                                                    setBidangForm((prev) => ({
                                                        ...prev,
                                                        data: { ...prev.data, color: e.target.value },
                                                    }))
                                                }
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            >
                                                <option value="blue">Biru</option>
                                                <option value="purple">Ungu</option>
                                                <option value="green">Hijau</option>
                                                <option value="red">Merah</option>
                                                <option value="yellow">Kuning</option>
                                                <option value="indigo">Indigo</option>
                                                <option value="teal">Teal</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                        <textarea
                                            value={bidangForm.description}
                                            onChange={(e) => setBidangForm((prev) => ({ ...prev, description: e.target.value }))}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Tugas dan Tanggung Jawab */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tugas dan Tanggung Jawab</label>
                                        <div className="mt-2 space-y-2">
                                            {bidangForm.data.tugas.map((tugas, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={tugas}
                                                        onChange={(e) => updateArrayItem('tugas', index, e.target.value)}
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
                                                    />
                                                    <button
                                                        onClick={() => removeArrayItem('tugas', index)}
                                                        className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addArrayItem('tugas')}
                                                className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                                            >
                                                + Tambah Tugas
                                            </button>
                                        </div>
                                    </div>

                                    {/* Kegiatan Magang */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kegiatan Magang</label>
                                        <div className="mt-2 space-y-2">
                                            {bidangForm.data.magangTasks.map((task, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={task}
                                                        onChange={(e) => updateArrayItem('magangTasks', index, e.target.value)}
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
                                                    />
                                                    <button
                                                        onClick={() => removeArrayItem('magangTasks', index)}
                                                        className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addArrayItem('magangTasks')}
                                                className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                                            >
                                                + Tambah Kegiatan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Staff Fungsional */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Staff Fungsional</label>
                                        <div className="mt-2 space-y-2">
                                            {bidangForm.data.staffFungsional.map((staff, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={staff}
                                                        onChange={(e) => updateArrayItem('staffFungsional', index, e.target.value)}
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
                                                    />
                                                    <button
                                                        onClick={() => removeArrayItem('staffFungsional', index)}
                                                        className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addArrayItem('staffFungsional')}
                                                className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                                            >
                                                + Tambah Staff
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 p-6">
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400"
                                    disabled={loading}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={activeTab === 'struktur' ? handleSaveStruktur : handleSaveBidang}
                                    className="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
