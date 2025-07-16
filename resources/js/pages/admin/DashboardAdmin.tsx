import { IconDisplay } from '@/components/IconPicker';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

/**
 * Interface untuk data bidang magang
 */
interface Bidang {
    id: number;
    nama_bidang: string;
    kepala_bidang: string;
    deskripsi?: string;
}

/**
 * Interface untuk data mahasiswa yang mendaftar magang
 * Berisi semua informasi yang diperlukan untuk proses pendaftaran
 */
interface Mahasiswa {
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
    status: string;
    bidang_id: number;
    bidang: string;
    surat_pengantar?: string; // Optional: file surat pengantar
    cv?: string; // Optional: file CV
    linkedin?: string; // Optional: LinkedIn profile URL
    motivasi?: string; // Optional: motivasi pendaftaran
    reject_reason?: string; // Optional: alasan penolakan jika ditolak
}

/**
 * Props untuk komponen DashboardAdmin
 * Menerima data mahasiswa dan informasi autentikasi admin
 */
interface AdminProps {
    mahasiswas?: Mahasiswa[];
    bidangs?: Bidang[];
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

/**
 * Komponen utama Dashboard Admin untuk mengelola data mahasiswa magang
 *
 * Fitur utama:
 * - Melihat statistik pendaftar magang
 * - Filter dan pencarian mahasiswa berdasarkan status
 * - Menyetujui/menolak pendaftaran mahasiswa
 * - Edit status mahasiswa
 * - Hapus data mahasiswa
 * - Preview dan download dokumen pendaftar
 * - Update status otomatis berdasarkan tanggal
 */
export default function DashboardAdmin({ mahasiswas = [], bidangs = [], auth }: AdminProps) {
    // ===== STATE MANAGEMENT =====
    // State untuk pencarian dan filter
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Menunggu');

    // State untuk modal dan data yang dipilih
    const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // State untuk form input
    const [rejectReason, setRejectReason] = useState('');

    // State untuk edit form data
    const [editData, setEditData] = useState<Partial<Mahasiswa>>({});

    // State untuk pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // ===== EFFECT HOOKS =====

    /**
     * Effect untuk menangani scroll delegation ke modal edit
     * Ketika modal edit terbuka, semua scroll akan diarahkan ke modal edit
     */
    useEffect(() => {
        const handleOverlayScroll = (e: WheelEvent) => {
            // Jika modal edit terbuka, arahkan semua scroll ke modal edit
            if (showEditModal) {
                const modalScrollArea = document.querySelector('.modal-edit-scroll-area');
                if (modalScrollArea) {
                    modalScrollArea.scrollTop += e.deltaY;
                    e.preventDefault();
                }
            }
            // Untuk modal lain, gunakan logic lama
            else if (showModal || showRejectModal || showDeleteModal) {
                const target = e.target as Element;
                const modalContent = document.querySelector('.modal-content-active');

                if (modalContent && !modalContent.contains(target)) {
                    modalContent.scrollTop += e.deltaY;
                    e.preventDefault();
                }
            }
        };

        // Prevent body scroll ketika modal edit terbuka
        if (showEditModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        if (showModal || showRejectModal || showEditModal || showDeleteModal) {
            // Add event listener untuk wheel event pada document
            document.addEventListener('wheel', handleOverlayScroll, { passive: false });
        }

        // Cleanup function untuk remove event listener
        return () => {
            document.removeEventListener('wheel', handleOverlayScroll);
            // Reset body overflow ketika component unmount atau modal ditutup
            document.body.style.overflow = 'unset';
        };
    }, [showModal, showRejectModal, showEditModal, showDeleteModal]);

    /**
     * Effect untuk reset pagination ketika search term atau tab aktif berubah
     * Memastikan user selalu kembali ke halaman pertama saat melakukan filter baru
     */
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]);

    // ===== HELPER FUNCTIONS =====

    /**
     * Mengekstrak nama file dari path lengkap
     * @param filePath - Path lengkap file
     * @returns Nama file saja
     */
    const getFileName = (filePath: string) => {
        return filePath.split('/').pop() || filePath;
    };

    /**
     * Mendapatkan ekstensi file dari path
     * @param filePath - Path file
     * @returns Ekstensi file dalam lowercase
     */
    const getFileExtension = (filePath: string) => {
        return filePath.split('.').pop()?.toLowerCase() || '';
    };

    /**
     * Mendapatkan icon berdasarkan tipe file menggunakan Lucide React icons
     * @param filePath - Path file untuk menentukan ekstensi
     * @returns IconDisplay component dengan icon yang sesuai
     */
    const getFileIcon = (filePath: string) => {
        const ext = getFileExtension(filePath);
        switch (ext) {
            case 'pdf':
                return <IconDisplay iconName="filetext" className="h-4 w-4 text-red-500" />;
            case 'doc':
            case 'docx':
                return <IconDisplay iconName="book" className="h-4 w-4 text-blue-500" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <IconDisplay iconName="image" className="h-4 w-4 text-green-500" />;
            default:
                return <IconDisplay iconName="database" className="h-4 w-4 text-gray-500" />;
        }
    };

    /**
     * Preview file dengan nama yang disesuaikan
     * @param mahasiswaId - ID mahasiswa
     * @param fileType - Tipe file (surat_pengantar atau cv)
     */
    const handleFilePreview = (mahasiswaId: number, fileType: string) => {
        const previewUrl = route('admin.previewFile', { id: mahasiswaId, type: fileType });
        window.open(previewUrl, '_blank');
    };

    /**
     * Download file dengan nama yang disesuaikan
     * @param mahasiswaId - ID mahasiswa
     * @param fileType - Tipe file (surat_pengantar atau cv)
     */
    const handleFileDownload = (mahasiswaId: number, fileType: string) => {
        const downloadUrl = route('admin.downloadFile', { id: mahasiswaId, type: fileType });
        window.location.href = downloadUrl;
    };

    // ===== DATA PROCESSING =====

    // Inisialisasi data mahasiswa (fallback ke array kosong jika tidak ada data)
    const data: Mahasiswa[] = mahasiswas.length > 0 ? mahasiswas : [];

    /**
     * Filter data mahasiswa berdasarkan status dan kata kunci pencarian
     * @param status - Status mahasiswa yang ingin difilter
     * @returns Array mahasiswa yang sesuai filter
     */
    const getDataByStatus = (status: string) => {
        return data.filter((item) => {
            // Filter berdasarkan pencarian (nama, NIM, universitas)
            const matchesSearch =
                item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.nim.includes(searchTerm) ||
                item.universitas.toLowerCase().includes(searchTerm.toLowerCase());

            // Filter berdasarkan status
            const matchesStatus = item.status === status;

            return matchesSearch && matchesStatus;
        });
    };

    // Data untuk tab yang aktif saat ini
    const activeTabData = getDataByStatus(activeTab);

    // ===== PAGINATION LOGIC =====
    const totalPages = Math.ceil(activeTabData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = activeTabData.slice(startIndex, endIndex);

    /**
     * Navigasi ke halaman selanjutnya
     */
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    /**
     * Navigasi ke halaman sebelumnya
     */
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    /**
     * Navigasi ke halaman tertentu
     * @param page - Nomor halaman yang dituju
     */
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    /**
     * Menentukan warna badge berdasarkan status mahasiswa
     * @param status - Status mahasiswa
     * @returns Class CSS untuk styling badge
     */
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Diterima':
                return 'bg-green-100 text-green-800';
            case 'Menunggu':
                return 'bg-yellow-100 text-yellow-800';
            case 'Selesai Magang':
                return 'bg-blue-100 text-blue-800';
            case 'Ditolak':
                return 'bg-red-100 text-red-800';
            case 'Sedang Magang':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // ===== EVENT HANDLERS =====

    /**
     * Handle logout admin
     */
    const handleLogout = () => {
        router.post(route('logout'));
    };

    // ===== MODAL HANDLERS =====

    /**
     * Membuka modal detail mahasiswa
     * @param mahasiswa - Data mahasiswa yang akan ditampilkan
     */
    const openModal = (mahasiswa: Mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setShowModal(true);
    };

    /**
     * Menutup modal detail mahasiswa
     */
    const closeModal = () => {
        setSelectedMahasiswa(null);
        setShowModal(false);
    };

    /**
     * Membuka modal untuk input alasan penolakan
     */
    const openRejectModal = () => {
        setShowRejectModal(true);
    };

    /**
     * Menutup modal penolakan dan reset form
     */
    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectReason('');
    };

    /**
     * Membuka modal edit untuk mengedit semua data mahasiswa
     */
    const openEditModal = () => {
        if (selectedMahasiswa) {
            setEditData({
                nama: selectedMahasiswa.nama,
                nim: selectedMahasiswa.nim,
                universitas: selectedMahasiswa.universitas,
                jurusan: selectedMahasiswa.jurusan,
                email: selectedMahasiswa.email,
                telepon: selectedMahasiswa.telepon,
                tanggal_mulai: selectedMahasiswa.tanggal_mulai,
                tanggal_selesai: selectedMahasiswa.tanggal_selesai,
                status: selectedMahasiswa.status,
                bidang_id: selectedMahasiswa.bidang_id,
                motivasi: selectedMahasiswa.motivasi || '',
                linkedin: selectedMahasiswa.linkedin || '',
            });
            setShowEditModal(true);
        }
    };

    /**
     * Menutup modal edit dan reset form
     */
    const closeEditModal = () => {
        setShowEditModal(false);
        setEditData({});
    };

    /**
     * Mengupdate field tertentu di editData
     */
    const updateEditData = (field: keyof Mahasiswa, value: string | number) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /**
     * Membuka modal konfirmasi hapus data
     */
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    /**
     * Menutup modal konfirmasi hapus
     */
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    // ===== ACTION HANDLERS =====

    /**
     * Menyetujui pendaftaran mahasiswa (ubah status ke "Diterima")
     * @param id - ID mahasiswa yang akan disetujui
     */
    const handleApprove = (id: number) => {
        router.patch(
            route('admin.updateStatus', id),
            {
                status: 'Diterima',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Mahasiswa berhasil diterima');
                    closeModal();
                },
                onError: (errors) => {
                    console.error('Gagal menerima mahasiswa:', errors);
                },
            },
        );
    };

    /**
     * Menolak pendaftaran mahasiswa dengan alasan
     * @param id - ID mahasiswa yang akan ditolak
     * @param reason - Alasan penolakan
     */
    const handleReject = (id: number, reason: string) => {
        router.patch(
            route('admin.updateStatus', id),
            {
                status: 'Ditolak',
                reject_reason: reason,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Mahasiswa berhasil ditolak');
                    setShowRejectModal(false);
                    setRejectReason('');
                    closeModal();
                },
                onError: (errors) => {
                    console.error('Gagal menolak mahasiswa:', errors);
                },
            },
        );
    };

    /**
     * Konfirmasi penolakan mahasiswa (dari modal)
     */
    const confirmReject = () => {
        if (selectedMahasiswa && rejectReason.trim()) {
            handleReject(selectedMahasiswa.id, rejectReason);
        }
    };

    /**
     * Menyimpan perubahan data mahasiswa (dari modal edit)
     */
    const handleEditStatus = () => {
        if (selectedMahasiswa && editData) {
            router.patch(route('admin.updateMahasiswa', selectedMahasiswa.id), editData, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Data mahasiswa berhasil diupdate');
                    closeEditModal();
                    closeModal();
                },
                onError: (errors) => {
                    console.error('Gagal mengupdate data mahasiswa:', errors);
                },
            });
        }
    };

    /**
     * Menghapus data mahasiswa
     */
    const handleDeleteMahasiswa = () => {
        if (selectedMahasiswa) {
            router.delete(route('admin.deleteMahasiswa', selectedMahasiswa.id), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Data mahasiswa berhasil dihapus');
                    closeDeleteModal();
                    closeModal();
                },
                onError: (errors) => {
                    console.error('Gagal menghapus data mahasiswa:', errors);
                },
            });
        }
    };

    // ===== STATISTIK DATA =====

    /**
     * Menghitung statistik data mahasiswa berdasarkan status
     * Digunakan untuk menampilkan cards statistik di dashboard
     */
    const statistik = {
        total: data.length,
        diterima: data.filter((m) => m.status === 'Diterima').length,
        menunggu: data.filter((m) => m.status === 'Menunggu').length,
        selesai: data.filter((m) => m.status === 'Selesai Magang').length,
        ditolak: data.filter((m) => m.status === 'Ditolak').length,
        sedangMagang: data.filter((m) => m.status === 'Sedang Magang').length,
    };

    // ===== DISTRIBUSI DATA MAHASISWA SEDANG MAGANG =====

    /**
     * Menghitung distribusi bidang untuk mahasiswa yang sedang magang
     */
    const sedangMagangData = data.filter((m) => m.status === 'Sedang Magang');

    const distribusiBidang = sedangMagangData.reduce(
        (acc, mahasiswa) => {
            const bidang = mahasiswa.bidang;
            acc[bidang] = (acc[bidang] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    /**
     * Menghitung distribusi universitas untuk mahasiswa yang sedang magang
     */
    const distribusiUniversitas = sedangMagangData.reduce(
        (acc, mahasiswa) => {
            const universitas = mahasiswa.universitas;
            acc[universitas] = (acc[universitas] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    /**
     * Menghitung distribusi periode untuk mahasiswa yang sedang magang
     */
    const distribusiPeriode = sedangMagangData.reduce(
        (acc, mahasiswa) => {
            const tanggalMulai = new Date(mahasiswa.tanggal_mulai);
            const bulan = tanggalMulai.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
            acc[bulan] = (acc[bulan] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    /**
     * Convert distribusi ke array dan sort berdasarkan jumlah (descending)
     */
    const bidangList = Object.entries(distribusiBidang)
        .map(([bidang, count]) => ({ bidang, count }))
        .sort((a, b) => b.count - a.count);

    const universitasList = Object.entries(distribusiUniversitas)
        .map(([universitas, count]) => ({ universitas, count }))
        .sort((a, b) => b.count - a.count);

    const periodeList = Object.entries(distribusiPeriode)
        .map(([periode, count]) => ({ periode, count }))
        .sort((a, b) => b.count - a.count);

    /**
     * Mendapatkan text color untuk chart berdasarkan index
     */
    const getChartTextColor = (index: number) => {
        const colors = [
            'text-blue-600',
            'text-green-600',
            'text-purple-600',
            'text-yellow-600',
            'text-red-600',
            'text-indigo-600',
            'text-pink-600',
            'text-orange-600',
            'text-teal-600',
            'text-cyan-600',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* ===== HEADER SECTION ===== */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo dan Judul */}
                        <div className="flex items-center space-x-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg">
                                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm font-medium opacity-90">Sistem Manajemen Magang - Kominfo</p>
                            </div>
                        </div>

                        {/* Header Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Welcome Message */}
                            <div className="hidden items-center space-x-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm md:flex">
                                <IconDisplay iconName="smile" className="h-4 w-4 text-white" />
                                <span className="text-sm">Selamat datang,</span>
                                <span className="font-medium">{auth?.user?.name || 'Admin'}</span>
                            </div>

                            {/* Manual Update Status Button */}
                            <button
                                onClick={() => {
                                    router.post(
                                        '/dashboard-admin/update-status-manual',
                                        {},
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                console.log('Status berhasil diupdate otomatis');
                                            },
                                            onError: (errors) => {
                                                console.error('Gagal update status:', errors);
                                            },
                                        },
                                    );
                                }}
                                className="flex items-center space-x-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-600"
                                title="Update status mahasiswa berdasarkan tanggal"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                <span>Sync Status</span>
                            </button>

                            {/* Edit Beranda Button */}
                            <button
                                onClick={() => {
                                    router.get('/admin/edit-beranda');
                                }}
                                className="flex items-center space-x-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-green-600"
                                title="Edit konten beranda dan struktur organisasi"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                <span>Edit Beranda</span>
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ===== MAIN DASHBOARD CONTENT ===== */}
            <div className="container mx-auto px-6 py-8">
                {/* ===== STATISTICS CARDS ===== */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {/* Total Pendaftar */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">{statistik.total}</div>
                            <div className="mt-1 text-sm text-gray-600">Total Pendaftar</div>
                        </div>
                    </div>

                    {/* Diterima */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{statistik.diterima}</div>
                            <div className="mt-1 text-sm text-gray-600">Diterima</div>
                        </div>
                    </div>

                    {/* Menunggu */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600">{statistik.menunggu}</div>
                            <div className="mt-1 text-sm text-gray-600">Menunggu</div>
                        </div>
                    </div>

                    {/* Sedang Magang */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{statistik.sedangMagang}</div>
                            <div className="mt-1 text-sm text-gray-600">Sedang Magang</div>
                        </div>
                    </div>

                    {/* Selesai */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{statistik.selesai}</div>
                            <div className="mt-1 text-sm text-gray-600">Selesai</div>
                        </div>
                    </div>

                    {/* Ditolak */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{statistik.ditolak}</div>
                            <div className="mt-1 text-sm text-gray-600">Ditolak</div>
                        </div>
                    </div>
                </div>

                {/* ===== AUTOMATION INFO SECTION ===== */}
                <div className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-green-50 p-6 shadow-xl">
                    <div className="flex items-start space-x-4">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <IconDisplay iconName="bot" className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-800">Otomatisasi Status Aktif</h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">Sistem otomatis mengupdate status mahasiswa setiap hari berdasarkan tanggal:</p>
                            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                {/* Transisi Diterima ke Sedang Magang */}
                                <div className="flex items-center space-x-2 rounded-lg bg-green-100 p-2">
                                    <IconDisplay iconName="checkcircle" className="h-4 w-4 text-green-600" />
                                    <span className="text-sm text-green-800">
                                        <strong>Diterima → Sedang Magang</strong> (saat tanggal mulai tiba)
                                    </span>
                                </div>
                                {/* Transisi Sedang Magang ke Selesai */}
                                <div className="flex items-center space-x-2 rounded-lg bg-blue-100 p-2">
                                    <IconDisplay iconName="edit" className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-blue-800">
                                        <strong>Sedang Magang → Selesai</strong> (saat tanggal selesai tiba)
                                    </span>
                                </div>
                                {/* Penghapusan Data Ditolak */}
                                <div className="flex items-center space-x-2 rounded-lg bg-red-100 p-2">
                                    <IconDisplay iconName="trash2" className="h-4 w-4 text-red-600" />
                                    <span className="text-sm text-red-800">
                                        <strong>Hapus Data Ditolak</strong> (setelah 30 hari)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== SEARCH AND FILTER SECTION ===== */}
                <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                    {/* Search Input */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama, NIM, atau universitas..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tab Navigation untuk Filter Status */}
                    <div className="flex flex-wrap gap-2 text-white">
                        {[
                            { status: 'Menunggu', count: statistik.menunggu, color: 'orange' },
                            { status: 'Diterima', count: statistik.diterima, color: 'green' },
                            { status: 'Sedang Magang', count: statistik.sedangMagang, color: 'purple' },
                            { status: 'Selesai Magang', count: statistik.selesai, color: 'blue' },
                            { status: 'Ditolak', count: statistik.ditolak, color: 'red' },
                        ].map((tab) => (
                            <button
                                key={tab.status}
                                onClick={() => setActiveTab(tab.status)}
                                className={`relative flex items-center space-x-2 rounded-xl px-4 py-3 text-sm font-medium duration-200 ${
                                    activeTab === tab.status
                                        ? `bg-${tab.color}-500 text-white-700 hover:bg-${tab.color}-600`
                                        : `bg-${tab.color}-500 text-white-700 hover:bg-${tab.color}-600`
                                }`}
                            >
                                <span>{tab.status}</span>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-bold text-white ${
                                        activeTab === tab.status ? 'bg-white/20 text-white' : `bg-${tab.color}-200 text-${tab.color}-800`
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ===== DATA TABLE SECTION ===== */}
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                    {/* Table Header */}
                    <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                        <h3 className="text-xl font-bold text-gray-800">Data Mahasiswa - Status: {activeTab}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Menampilkan {paginatedData.length} dari {activeTabData.length} mahasiswa dengan status "{activeTab}"
                            {searchTerm && <span className="ml-1 text-blue-600">(hasil pencarian: "{searchTerm}")</span>}
                        </p>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Table Header */}
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">NIM</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Universitas</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Bidang</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Periode Magang</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Detail</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.id} className="transition-colors duration-200 hover:bg-gray-50">
                                            {/* Nomor Urut */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{startIndex + index + 1}</td>

                                            {/* Nama dan Email */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{mahasiswa.nama}</div>
                                                <div className="text-xs text-gray-500">{mahasiswa.email}</div>
                                            </td>

                                            {/* NIM */}
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.nim}</td>

                                            {/* Universitas */}
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.universitas}</td>

                                            {/* Bidang */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    {mahasiswa.bidang}
                                                </span>
                                            </td>

                                            {/* Periode Magang */}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{new Date(mahasiswa.tanggal_mulai).toLocaleDateString('id-ID')}</div>
                                                <div className="text-xs text-gray-500">
                                                    s/d {new Date(mahasiswa.tanggal_selesai).toLocaleDateString('id-ID')}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(mahasiswa.status)}`}
                                                >
                                                    {mahasiswa.status}
                                                </span>
                                            </td>

                                            {/* Action Button */}
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openModal(mahasiswa)}
                                                    className="flex items-center justify-center rounded-lg bg-blue-100 p-2 text-blue-600 transition-all duration-200 hover:bg-blue-200 hover:text-blue-800"
                                                    title="Lihat Detail"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <svg className="mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <p className="text-lg font-medium">Tidak ada data ditemukan</p>
                                                <p className="text-sm">Coba ubah kata kunci pencarian atau filter status</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== PAGINATION SECTION ===== */}
                    {activeTabData.length > itemsPerPage && (
                        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
                                {/* Mobile Pagination */}
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>

                                {/* Desktop Pagination */}
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    {/* Pagination Info */}
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                            <span className="font-medium">{Math.min(endIndex, activeTabData.length)}</span> of{' '}
                                            <span className="font-medium">{activeTabData.length}</span> results
                                        </p>
                                    </div>

                                    {/* Pagination Controls */}
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            {/* Previous Button */}
                                            <button
                                                onClick={goToPreviousPage}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Page Numbers */}
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNumber;
                                                if (totalPages <= 5) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNumber = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNumber = totalPages - 4 + i;
                                                } else {
                                                    pageNumber = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() => goToPage(pageNumber)}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                            currentPage === pageNumber
                                                                ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                                : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            })}

                                            {/* Next Button */}
                                            <button
                                                onClick={goToNextPage}
                                                disabled={currentPage === totalPages}
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== DISTRIBUSI MAHASISWA SEDANG MAGANG ===== */}
                {sedangMagangData.length > 0 && (
                    <div className="mt-12 mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Distribusi Bidang */}
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="mb-6">
                                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                                    <IconDisplay iconName="barchart3" className="mr-2 h-4 w-4" />
                                    Distribusi Bidang Magang
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sebaran mahasiswa yang sedang magang berdasarkan bidang ({sedangMagangData.length} mahasiswa)
                                </p>
                            </div>

                            <div className="space-y-4">
                                {bidangList.slice(0, 6).map((item, index) => {
                                    return (
                                        <div
                                            key={item.bidang}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <span className="text-sm font-medium text-gray-700">{item.bidang}</span>
                                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getChartTextColor(index)} bg-gray-100`}>
                                                {item.count} mahasiswa
                                            </span>
                                        </div>
                                    );
                                })}

                                {bidangList.length > 6 && (
                                    <div className="border-t border-gray-100 pt-2">
                                        <p className="text-center text-xs text-gray-500">+{bidangList.length - 6} bidang lainnya</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Distribusi Universitas */}
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="mb-6">
                                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                                    <IconDisplay iconName="building2" className="mr-2 h-4 w-4" />
                                    Distribusi Universitas Asal
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sebaran mahasiswa yang sedang magang berdasarkan universitas asal ({universitasList.length} universitas)
                                </p>
                            </div>

                            <div className="space-y-4">
                                {universitasList.slice(0, 6).map((item, index) => {
                                    return (
                                        <div
                                            key={item.universitas}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <span className="text-sm font-medium text-gray-700" title={item.universitas}>
                                                {item.universitas.length > 30 ? `${item.universitas.substring(0, 30)}...` : item.universitas}
                                            </span>
                                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getChartTextColor(index)} bg-gray-100`}>
                                                {item.count} mahasiswa
                                            </span>
                                        </div>
                                    );
                                })}

                                {universitasList.length > 6 && (
                                    <div className="border-t border-gray-100 pt-2">
                                        <p className="text-center text-xs text-gray-500">+{universitasList.length - 6} universitas lainnya</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Distribusi Periode Mulai Magang */}
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="mb-6">
                                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                                    <IconDisplay iconName="clock" className="mr-2 h-4 w-4" />
                                    Distribusi Periode Mulai Magang
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sebaran mahasiswa yang sedang magang berdasarkan bulan mulai magang ({periodeList.length} periode)
                                </p>
                            </div>

                            <div className="space-y-4">
                                {periodeList.slice(0, 6).map((item, index) => {
                                    return (
                                        <div
                                            key={item.periode}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <span className="text-sm font-medium text-gray-700">{item.periode}</span>
                                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getChartTextColor(index)} bg-gray-100`}>
                                                {item.count} mahasiswa
                                            </span>
                                        </div>
                                    );
                                })}

                                {periodeList.length > 6 && (
                                    <div className="border-t border-gray-100 pt-2">
                                        <p className="text-center text-xs text-gray-500">+{periodeList.length - 6} periode lainnya</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Info jika tidak ada mahasiswa yang sedang magang */}
                {sedangMagangData.length === 0 && (
                    <div className="mt-12 mb-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-center">
                        <div className="flex flex-col items-center">
                            <IconDisplay iconName="barchart3" className="mb-3 h-12 w-12 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-700">Belum Ada Mahasiswa yang Sedang Magang</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Distribusi bidang, universitas, dan periode akan muncul ketika ada mahasiswa dengan status "Sedang Magang"
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ===== MODAL DETAIL MAHASISWA ===== */}
            {showModal && selectedMahasiswa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        className="modal-content-active scrollbar-hide max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Detail Mahasiswa</h3>
                                    <p className="mt-1 text-sm text-gray-600">Informasi lengkap pendaftar magang</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="rounded-full p-2 text-2xl text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700"
                                    title="Tutup Modal"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-4 p-6">
                            {/* Informasi Dasar Mahasiswa */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.nama}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">NIM</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.nim}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Universitas</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.universitas}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.jurusan}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Telepon</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.telepon}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bidang Magang</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.bidang}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(selectedMahasiswa.status)}`}
                                    >
                                        {selectedMahasiswa.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(selectedMahasiswa.tanggal_mulai).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(selectedMahasiswa.tanggal_selesai).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Daftar</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(selectedMahasiswa.tanggal_daftar).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            {/* Motivasi Mahasiswa */}
                            {selectedMahasiswa.motivasi && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Motivasi</label>
                                    <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                        <p className="text-sm text-gray-900">{selectedMahasiswa.motivasi}</p>
                                    </div>
                                </div>
                            )}

                            {/* ===== SECTION DOKUMEN DAN PROFILE ===== */}
                            <div className="col-span-2">
                                <label className="mb-3 block text-sm font-medium text-gray-700">Dokumen dan Profile</label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Surat Pengantar */}
                                    {selectedMahasiswa.surat_pengantar ? (
                                        <div className="rounded-lg border border-gray-200 bg-blue-50 p-4 transition-colors duration-200 hover:bg-blue-100">
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{getFileIcon(selectedMahasiswa.surat_pengantar)}</span>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">Surat Pengantar</p>
                                                        <p className="truncate text-xs text-gray-500">
                                                            {getFileName(selectedMahasiswa.surat_pengantar)}
                                                        </p>
                                                        <p className="text-xs text-blue-600 uppercase">
                                                            {getFileExtension(selectedMahasiswa.surat_pengantar)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleFilePreview(selectedMahasiswa.id, 'surat_pengantar')}
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                                        title="Lihat File"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                        Lihat
                                                    </button>
                                                    <button
                                                        onClick={() => handleFileDownload(selectedMahasiswa.id, 'surat_pengantar')}
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors duration-200 hover:bg-green-200"
                                                        title="Download File"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="text-center">
                                                <IconDisplay iconName="filetext" className="mx-auto h-8 w-8 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">Surat Pengantar</p>
                                                <p className="text-xs text-gray-400">Tidak ada file</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Curriculum Vitae (CV) */}
                                    {selectedMahasiswa.cv ? (
                                        <div className="rounded-lg border border-gray-200 bg-green-50 p-4 transition-colors duration-200 hover:bg-green-100">
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">{getFileIcon(selectedMahasiswa.cv)}</span>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">Curriculum Vitae</p>
                                                        <p className="truncate text-xs text-gray-500">{getFileName(selectedMahasiswa.cv)}</p>
                                                        <p className="text-xs text-green-600 uppercase">{getFileExtension(selectedMahasiswa.cv)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleFilePreview(selectedMahasiswa.id, 'cv')}
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                                        title="Lihat File"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                        Lihat
                                                    </button>
                                                    <button
                                                        onClick={() => handleFileDownload(selectedMahasiswa.id, 'cv')}
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors duration-200 hover:bg-green-200"
                                                        title="Download File"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="text-center">
                                                <IconDisplay iconName="user" className="mx-auto h-8 w-8 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">Curriculum Vitae (CV)</p>
                                                <p className="text-xs text-gray-400">Tidak ada file (opsional)</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* LinkedIn Profile */}
                                    {selectedMahasiswa.linkedin ? (
                                        <div className="rounded-lg border border-gray-200 bg-purple-50 p-4 transition-colors duration-200 hover:bg-purple-100">
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <IconDisplay iconName="link" className="h-6 w-6 text-purple-600" />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-gray-900">LinkedIn Profile</p>
                                                        <p className="truncate text-xs text-gray-500">{selectedMahasiswa.linkedin}</p>
                                                        <p className="text-xs text-purple-600 uppercase">URL</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <a
                                                        href={selectedMahasiswa.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                                        title="Buka LinkedIn Profile"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                        </svg>
                                                        Buka
                                                    </a>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(selectedMahasiswa.linkedin || '');
                                                            // TODO: Tambahkan notifikasi toast di sini jika diperlukan
                                                        }}
                                                        className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-700 transition-colors duration-200 hover:bg-green-200"
                                                        title="Copy Link"
                                                    >
                                                        <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="text-center">
                                                <IconDisplay iconName="link" className="mx-auto h-6 w-6 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">LinkedIn Profile</p>
                                                <p className="text-xs text-gray-400">Tidak ada profile LinkedIn</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Info Dokumentasi File */}
                                <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                    <div className="flex items-start space-x-2">
                                        <svg
                                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <div className="text-xs text-blue-700">
                                            <p className="font-medium">Informasi Dokumen & Profile:</p>
                                            <ul className="mt-1 space-y-1">
                                                <li>• Klik "Lihat" untuk preview file dalam tab baru</li>
                                                <li>• Klik "Download" untuk mengunduh file ke komputer</li>
                                                <li>• Klik "Buka" untuk membuka LinkedIn Profile</li>
                                                <li>• Klik "Copy" untuk menyalin link LinkedIn</li>
                                                <li>• File yang valid: PDF, DOC, DOCX (maksimal 5MB)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Alasan Penolakan (jika status ditolak) */}
                            {selectedMahasiswa.status === 'Ditolak' && selectedMahasiswa.reject_reason && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-red-700">Alasan Penolakan</label>
                                    <div className="mt-1 rounded-lg border border-red-200 bg-red-50 p-3">
                                        <p className="text-sm text-red-800">{selectedMahasiswa.reject_reason}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer - Action Buttons */}
                        <div className="flex justify-between border-t border-gray-200 p-6">
                            {/* Action Buttons untuk status tertentu */}
                            <div className="flex space-x-3">
                                {/* Tombol Terima dan Tolak untuk status Menunggu */}
                                {selectedMahasiswa.status === 'Menunggu' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(selectedMahasiswa.id)}
                                            className="flex items-center space-x-2 rounded-xl bg-green-500 px-6 py-2 font-medium text-white transition-colors hover:bg-green-600"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Terima</span>
                                        </button>
                                        <button
                                            onClick={openRejectModal}
                                            className="flex items-center space-x-2 rounded-xl bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span>Tolak</span>
                                        </button>
                                    </>
                                )}

                                {/* Tombol Edit dan Hapus untuk semua status kecuali yang tidak diperlukan */}
                                {(selectedMahasiswa.status === 'Menunggu' ||
                                    selectedMahasiswa.status === 'Diterima' ||
                                    selectedMahasiswa.status === 'Ditolak' ||
                                    selectedMahasiswa.status === 'Sedang Magang' ||
                                    selectedMahasiswa.status === 'Selesai Magang') && (
                                    <>
                                        <button
                                            onClick={openEditModal}
                                            className="flex items-center space-x-2 rounded-xl bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={openDeleteModal}
                                            className="flex items-center space-x-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            <span>Hapus</span>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Tombol Tutup Modal */}
                            <button
                                onClick={closeModal}
                                className="rounded-xl bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL PENOLAKAN MAHASISWA ===== */}
            {showRejectModal && selectedMahasiswa && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeRejectModal}>
                    <div className="modal-content-active w-full max-w-md rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Alasan Penolakan</h3>
                                <button onClick={closeRejectModal} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="mb-3 text-sm text-gray-600">
                                    Anda akan menolak pendaftaran dari <strong>{selectedMahasiswa.nama}</strong>. Silakan berikan alasan penolakan:
                                </p>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Masukkan alasan penolakan..."
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-red-500"
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between border-t border-gray-200 p-6">
                            <button
                                onClick={closeRejectModal}
                                className="rounded-xl bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmReject}
                                disabled={!rejectReason.trim()}
                                className="rounded-xl bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                Konfirmasi Tolak
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL EDIT DATA MAHASISWA ===== */}
            {showEditModal && selectedMahasiswa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={closeEditModal}>
                    <div
                        className="modal-content-active relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header - Fixed */}
                        <div className="sticky top-0 z-10 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Edit Data Mahasiswa</h3>
                                    <p className="mt-1 text-sm text-gray-600">Edit informasi lengkap mahasiswa</p>
                                </div>
                                <button
                                    onClick={closeEditModal}
                                    className="rounded-full p-2 text-2xl text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700"
                                    title="Tutup Modal"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div
                            className="modal-edit-scroll-area max-h-[calc(90vh-180px)] overflow-y-auto p-6"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <style>{`
                                .modal-edit-scroll-area::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            <div className="space-y-6">
                                {/* Informasi Dasar Mahasiswa */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={editData.nama || ''}
                                            onChange={(e) => updateEditData('nama', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">NIM</label>
                                        <input
                                            type="text"
                                            value={editData.nim || ''}
                                            onChange={(e) => updateEditData('nim', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan NIM"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Universitas</label>
                                        <input
                                            type="text"
                                            value={editData.universitas || ''}
                                            onChange={(e) => updateEditData('universitas', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nama universitas"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Jurusan</label>
                                        <input
                                            type="text"
                                            value={editData.jurusan || ''}
                                            onChange={(e) => updateEditData('jurusan', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan jurusan"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={editData.email || ''}
                                            onChange={(e) => updateEditData('email', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan email"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Telepon</label>
                                        <input
                                            type="tel"
                                            value={editData.telepon || ''}
                                            onChange={(e) => updateEditData('telepon', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nomor telepon"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Bidang Magang</label>
                                        <select
                                            value={editData.bidang_id || ''}
                                            onChange={(e) => updateEditData('bidang_id', e.target.value ? parseInt(e.target.value) : 0)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih Bidang</option>
                                            {bidangs.map((bidang) => (
                                                <option key={bidang.id} value={bidang.id}>
                                                    {bidang.nama_bidang}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            value={editData.status || ''}
                                            onChange={(e) => updateEditData('status', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="Menunggu">Menunggu</option>
                                            <option value="Diterima">Diterima</option>
                                            <option value="Ditolak">Ditolak</option>
                                            <option value="Sedang Magang">Sedang Magang</option>
                                            <option value="Selesai Magang">Selesai Magang</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                        <input
                                            type="date"
                                            value={editData.tanggal_mulai || ''}
                                            onChange={(e) => updateEditData('tanggal_mulai', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                        <input
                                            type="date"
                                            value={editData.tanggal_selesai || ''}
                                            onChange={(e) => updateEditData('tanggal_selesai', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* LinkedIn Profile */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">LinkedIn Profile (Opsional)</label>
                                    <input
                                        type="url"
                                        value={editData.linkedin || ''}
                                        onChange={(e) => updateEditData('linkedin', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>

                                {/* Motivasi Mahasiswa */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Motivasi</label>
                                    <textarea
                                        value={editData.motivasi || ''}
                                        onChange={(e) => updateEditData('motivasi', e.target.value)}
                                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                        placeholder="Masukkan motivasi magang..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer - Fixed */}
                        <div className="sticky bottom-0 flex justify-between border-t border-gray-200 bg-white p-6">
                            <button
                                onClick={closeEditModal}
                                className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleEditStatus}
                                className="rounded-xl bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL KONFIRMASI HAPUS DATA ===== */}
            {showDeleteModal && selectedMahasiswa && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeDeleteModal}>
                    <div className="modal-content-active w-full max-w-md rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-red-600">Konfirmasi Hapus</h3>
                                <button onClick={closeDeleteModal} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                {/* Warning Icon */}
                                <div className="mb-4 flex items-center justify-center">
                                    <div className="rounded-full bg-red-100 p-3">
                                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Confirmation Message */}
                                <p className="text-center text-sm text-gray-600">Apakah Anda yakin ingin menghapus data mahasiswa:</p>
                                <p className="mt-2 text-center text-lg font-medium text-gray-900">{selectedMahasiswa.nama}</p>
                                <p className="mt-1 text-center text-sm text-gray-500">NIM: {selectedMahasiswa.nim}</p>
                                <p className="mt-4 text-center text-sm font-medium text-red-600">Tindakan ini tidak dapat dibatalkan!</p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between border-t border-gray-200 p-6">
                            <button
                                onClick={closeDeleteModal}
                                className="rounded-xl bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDeleteMahasiswa}
                                className="rounded-xl bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600"
                            >
                                Ya, Hapus Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
