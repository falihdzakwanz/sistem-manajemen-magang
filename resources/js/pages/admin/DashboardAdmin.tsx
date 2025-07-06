import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    surat_pengantar?: string;
    cv?: string;
    linkedin?: string;
    motivasi?: string;
    reject_reason?: string;
}

interface AdminProps {
    mahasiswas?: Mahasiswa[];
    auth?: {
        user?: {
            name: string;
            email: string;
        };
    };
}

export default function DashboardAdmin({ mahasiswas = [], auth }: AdminProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Menunggu');
    const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editStatus, setEditStatus] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Effect untuk menangani scroll delegation dari overlay ke modal content
    useEffect(() => {
        const handleOverlayScroll = (e: WheelEvent) => {
            if (showModal || showRejectModal || showEditModal || showDeleteModal) {
                // Cari modal content yang sedang aktif
                const modalContent = document.querySelector('.modal-content-active');
                if (modalContent) {
                    // Delegate scroll event ke modal content
                    modalContent.scrollTop += e.deltaY;
                    e.preventDefault();
                }
            }
        };

        if (showModal || showRejectModal || showEditModal || showDeleteModal) {
            // Add event listener untuk wheel event pada document
            document.addEventListener('wheel', handleOverlayScroll, { passive: false });
        }

        // Cleanup
        return () => {
            document.removeEventListener('wheel', handleOverlayScroll);
        };
    }, [showModal, showRejectModal, showEditModal, showDeleteModal]);

    // Reset pagination when search term or active tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]);

    // Helper function untuk mendapatkan URL file storage
    const getFileUrl = (filePath: string) => {
        return `/storage/${filePath}`;
    };

    // Helper function untuk mendapatkan nama file dari path
    const getFileName = (filePath: string) => {
        return filePath.split('/').pop() || filePath;
    };

    // Helper function untuk mendapatkan extension file
    const getFileExtension = (filePath: string) => {
        return filePath.split('.').pop()?.toLowerCase() || '';
    };

    // Helper function untuk mendapatkan icon berdasarkan tipe file
    const getFileIcon = (filePath: string) => {
        const ext = getFileExtension(filePath);
        switch (ext) {
            case 'pdf':
                return '📄';
            case 'doc':
            case 'docx':
                return '📝';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return '🖼️';
            default:
                return '📁';
        }
    };

    // Helper function untuk membuka/preview file
    const handleFilePreview = (filePath: string) => {
        const url = getFileUrl(filePath);
        window.open(url, '_blank');
    };

    // Data dummy jika tidak ada data dari props
    const defaultData: Mahasiswa[] = [
        {
            id: 1,
            nama: 'Ahmad Rizki Pratama',
            nim: '19104001',
            universitas: 'Universitas Lampung',
            jurusan: 'Teknik Informatika',
            email: 'ahmad.rizki@example.com',
            telepon: '08123456789',
            tanggal_daftar: '2025-06-01',
            tanggal_mulai: '2025-07-01',
            tanggal_selesai: '2025-08-31',
            status: 'Diterima',
            bidang_id: 1,
            bidang: 'IT Support',
            motivasi: 'Ingin belajar tentang teknologi informasi dan komunikasi untuk meningkatkan skill dalam bidang IT',
            surat_pengantar: 'surat-pengantar/ahmad_rizki_surat_pengantar_1625097600.pdf',
            cv: 'cv/ahmad_rizki_cv_1625097600.pdf',
            linkedin: 'https://linkedin.com/in/ahmad-rizki-pratama',
        },
        {
            id: 2,
            nama: 'Siti Nurhaliza',
            nim: '20104002',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Sistem Informasi',
            email: 'siti.nur@example.com',
            telepon: '08234567890',
            tanggal_daftar: '2025-06-05',
            tanggal_mulai: '2025-07-15',
            tanggal_selesai: '2025-09-15',
            status: 'Menunggu',
            bidang_id: 2,
            bidang: 'Web Development',
            motivasi: 'Tertarik untuk mengembangkan skill web development dan ingin berkontribusi dalam digitalisasi pemerintahan',
            surat_pengantar: 'surat-pengantar/siti_nurhaliza_surat_pengantar_1625184000.pdf',
            cv: 'cv/siti_nurhaliza_cv_1625184000.docx',
            linkedin: 'https://linkedin.com/in/siti-nurhaliza',
        },
        {
            id: 3,
            nama: 'Budi Santoso',
            nim: '19104003',
            universitas: 'Universitas Bandar Lampung',
            jurusan: 'Teknik Komputer',
            email: 'budi.santoso@example.com',
            telepon: '08345678901',
            tanggal_daftar: '2025-05-20',
            tanggal_mulai: '2025-06-01',
            tanggal_selesai: '2025-07-31',
            status: 'Selesai Magang',
            bidang_id: 3,
            bidang: 'Network Administration',
            motivasi: 'Ingin memahami infrastruktur jaringan pemerintahan dan meningkatkan kemampuan troubleshooting',
            surat_pengantar: 'surat-pengantar/budi_santoso_surat_pengantar_1621468800.pdf',
            cv: 'cv/budi_santoso_cv_1621468800.pdf',
        },
        {
            id: 4,
            nama: 'Maya Dewi',
            nim: '20104004',
            universitas: 'Universitas Lampung',
            jurusan: 'Desain Komunikasi Visual',
            email: 'maya.dewi@example.com',
            telepon: '08456789012',
            tanggal_daftar: '2025-06-10',
            tanggal_mulai: '2025-07-10',
            tanggal_selesai: '2025-09-10',
            status: 'Ditolak',
            bidang_id: 4,
            bidang: 'UI/UX Design',
            motivasi: 'Passion dalam bidang desain dan user experience, ingin membantu meningkatkan tampilan website pemerintah',
            reject_reason: 'Kuota untuk bidang UI/UX Design sudah penuh untuk periode ini. Silakan mendaftar pada periode berikutnya.',
            surat_pengantar: 'surat-pengantar/maya_dewi_surat_pengantar_1625270400.pdf',
            linkedin: 'https://linkedin.com/in/maya-dewi-dkv',
        },
        {
            id: 5,
            nama: 'Rentra Wijaya',
            nim: '19104005',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Teknik Informatika',
            email: 'rentra.wijaya@example.com',
            telepon: '08567890123',
            tanggal_daftar: '2025-05-15',
            tanggal_mulai: '2025-06-15',
            tanggal_selesai: '2025-08-15',
            status: 'Sedang Magang',
            bidang_id: 5,
            bidang: 'Data Analysis',
            motivasi: 'Ingin belajar analisis data untuk smart city dan membantu pengambilan keputusan berbasis data',
            surat_pengantar: 'surat-pengantar/rentra_wijaya_surat_pengantar_1621036800.pdf',
            cv: 'cv/rentra_wijaya_cv_1621036800.pdf',
            linkedin: 'https://linkedin.com/in/rentra-wijaya',
        },
        {
            id: 6,
            nama: 'Andi Prasetyo',
            nim: '19104006',
            universitas: 'Universitas Lampung',
            jurusan: 'Teknik Elektro',
            email: 'andi.prasetyo@example.com',
            telepon: '08678901234',
            tanggal_daftar: '2025-06-12',
            tanggal_mulai: '2025-07-20',
            tanggal_selesai: '2025-09-20',
            status: 'Menunggu',
            bidang_id: 1,
            bidang: 'IT Support',
            motivasi: 'Ingin mengembangkan kemampuan troubleshooting dan maintenance hardware',
            surat_pengantar: 'surat-pengantar/andi_prasetyo_surat_pengantar_1625356800.pdf',
            cv: 'cv/andi_prasetyo_cv_1625356800.pdf',
            linkedin: 'https://linkedin.com/in/andi-prasetyo',
        },
        {
            id: 7,
            nama: 'Dewi Sartika',
            nim: '20104007',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Teknik Informatika',
            email: 'dewi.sartika@example.com',
            telepon: '08789012345',
            tanggal_daftar: '2025-06-08',
            tanggal_mulai: '2025-07-05',
            tanggal_selesai: '2025-09-05',
            status: 'Diterima',
            bidang_id: 2,
            bidang: 'Web Development',
            motivasi: 'Passionate tentang frontend development dan ingin berkontribusi pada digitalisasi layanan publik',
            surat_pengantar: 'surat-pengantar/dewi_sartika_surat_pengantar_1625270400.pdf',
            cv: 'cv/dewi_sartika_cv_1625270400.pdf',
            linkedin: 'https://linkedin.com/in/dewi-sartika',
        },
        {
            id: 8,
            nama: 'Rio Firmansyah',
            nim: '19104008',
            universitas: 'Universitas Bandar Lampung',
            jurusan: 'Sistem Informasi',
            email: 'rio.firmansyah@example.com',
            telepon: '08890123456',
            tanggal_daftar: '2025-05-25',
            tanggal_mulai: '2025-06-25',
            tanggal_selesai: '2025-08-25',
            status: 'Sedang Magang',
            bidang_id: 3,
            bidang: 'Network Administration',
            motivasi: 'Tertarik dengan infrastruktur jaringan dan keamanan sistem informasi',
            surat_pengantar: 'surat-pengantar/rio_firmansyah_surat_pengantar_1621900800.pdf',
            cv: 'cv/rio_firmansyah_cv_1621900800.pdf',
            linkedin: 'https://linkedin.com/in/rio-firmansyah',
        },
        {
            id: 9,
            nama: 'Indah Permata',
            nim: '20104009',
            universitas: 'Universitas Lampung',
            jurusan: 'Desain Komunikasi Visual',
            email: 'indah.permata@example.com',
            telepon: '08901234567',
            tanggal_daftar: '2025-06-15',
            tanggal_mulai: '2025-07-25',
            tanggal_selesai: '2025-09-25',
            status: 'Menunggu',
            bidang_id: 4,
            bidang: 'UI/UX Design',
            motivasi: 'Ingin mengaplikasikan ilmu desain untuk meningkatkan user experience aplikasi pemerintah',
            surat_pengantar: 'surat-pengantar/indah_permata_surat_pengantar_1625443200.pdf',
            cv: 'cv/indah_permata_cv_1625443200.pdf',
            linkedin: 'https://linkedin.com/in/indah-permata',
        },
        {
            id: 10,
            nama: 'Fajar Nugroho',
            nim: '19104010',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Teknik Informatika',
            email: 'fajar.nugroho@example.com',
            telepon: '08012345678',
            tanggal_daftar: '2025-05-30',
            tanggal_mulai: '2025-06-30',
            tanggal_selesai: '2025-08-30',
            status: 'Selesai Magang',
            bidang_id: 5,
            bidang: 'Data Analysis',
            motivasi: 'Ingin mendalami analisis data untuk mendukung pengambilan keputusan berbasis data',
            surat_pengantar: 'surat-pengantar/fajar_nugroho_surat_pengantar_1622332800.pdf',
            cv: 'cv/fajar_nugroho_cv_1622332800.pdf',
            linkedin: 'https://linkedin.com/in/fajar-nugroho',
        },
        {
            id: 11,
            nama: 'Sari Wulandari',
            nim: '20104011',
            universitas: 'Universitas Lampung',
            jurusan: 'Teknik Komputer',
            email: 'sari.wulandari@example.com',
            telepon: '08123456780',
            tanggal_daftar: '2025-06-18',
            tanggal_mulai: '2025-07-30',
            tanggal_selesai: '2025-09-30',
            status: 'Menunggu',
            bidang_id: 1,
            bidang: 'IT Support',
            motivasi: 'Ingin belajar maintenance sistem dan hardware komputer di lingkungan pemerintahan',
            surat_pengantar: 'surat-pengantar/sari_wulandari_surat_pengantar_1625702400.pdf',
            cv: 'cv/sari_wulandari_cv_1625702400.pdf',
            linkedin: 'https://linkedin.com/in/sari-wulandari',
        },
        {
            id: 12,
            nama: 'Dimas Setiawan',
            nim: '19104012',
            universitas: 'Universitas Bandar Lampung',
            jurusan: 'Sistem Informasi',
            email: 'dimas.setiawan@example.com',
            telepon: '08234567891',
            tanggal_daftar: '2025-06-20',
            tanggal_mulai: '2025-08-01',
            tanggal_selesai: '2025-10-01',
            status: 'Diterima',
            bidang_id: 2,
            bidang: 'Web Development',
            motivasi: 'Passionate dalam backend development dan ingin mengembangkan sistem informasi yang robust',
            surat_pengantar: 'surat-pengantar/dimas_setiawan_surat_pengantar_1625875200.pdf',
            cv: 'cv/dimas_setiawan_cv_1625875200.pdf',
            linkedin: 'https://linkedin.com/in/dimas-setiawan',
        },
        {
            id: 13,
            nama: 'Putri Maharani',
            nim: '20104013',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Teknik Informatika',
            email: 'putri.maharani@example.com',
            telepon: '08345678902',
            tanggal_daftar: '2025-06-22',
            tanggal_mulai: '2025-08-05',
            tanggal_selesai: '2025-10-05',
            status: 'Menunggu',
            bidang_id: 5,
            bidang: 'Data Analysis',
            motivasi: 'Tertarik dengan machine learning dan data science untuk smart governance',
            surat_pengantar: 'surat-pengantar/putri_maharani_surat_pengantar_1626048000.pdf',
            cv: 'cv/putri_maharani_cv_1626048000.pdf',
            linkedin: 'https://linkedin.com/in/putri-maharani',
        },
        {
            id: 14,
            nama: 'Agus Salim',
            nim: '19104014',
            universitas: 'Universitas Lampung',
            jurusan: 'Teknik Elektro',
            email: 'agus.salim@example.com',
            telepon: '08456789013',
            tanggal_daftar: '2025-06-25',
            tanggal_mulai: '2025-08-10',
            tanggal_selesai: '2025-10-10',
            status: 'Ditolak',
            bidang_id: 3,
            bidang: 'Network Administration',
            motivasi: 'Ingin mempelajari administrasi jaringan dan cybersecurity',
            reject_reason: 'Dokumen persyaratan belum lengkap. Mohon melengkapi dokumen dan mendaftar kembali.',
            surat_pengantar: 'surat-pengantar/agus_salim_surat_pengantar_1626307200.pdf',
            linkedin: 'https://linkedin.com/in/agus-salim',
        },
        {
            id: 15,
            nama: 'Lina Handayani',
            nim: '20104015',
            universitas: 'Universitas Bandar Lampung',
            jurusan: 'Desain Komunikasi Visual',
            email: 'lina.handayani@example.com',
            telepon: '08567890124',
            tanggal_daftar: '2025-06-28',
            tanggal_mulai: '2025-08-15',
            tanggal_selesai: '2025-10-15',
            status: 'Menunggu',
            bidang_id: 4,
            bidang: 'UI/UX Design',
            motivasi: 'Ingin berkontribusi dalam pembuatan interface yang user-friendly untuk aplikasi pemerintah',
            surat_pengantar: 'surat-pengantar/lina_handayani_surat_pengantar_1626566400.pdf',
            cv: 'cv/lina_handayani_cv_1626566400.pdf',
            linkedin: 'https://linkedin.com/in/lina-handayani',
        },
    ];

    const data = mahasiswas.length > 0 ? mahasiswas : defaultData;

    // Fungsi untuk mendapatkan data berdasarkan status dan search
    const getDataByStatus = (status: string) => {
        return data.filter((item) => {
            const matchesSearch =
                item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.nim.includes(searchTerm) ||
                item.universitas.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = item.status === status;

            return matchesSearch && matchesStatus;
        });
    };

    // Data untuk tab yang aktif
    const activeTabData = getDataByStatus(activeTab);

    // Pagination logic
    const totalPages = Math.ceil(activeTabData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = activeTabData.slice(startIndex, endIndex);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

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

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const openModal = (mahasiswa: Mahasiswa) => {
        setSelectedMahasiswa(mahasiswa);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedMahasiswa(null);
        setShowModal(false);
    };

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

    const openRejectModal = () => {
        setShowRejectModal(true);
    };

    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectReason('');
    };

    const confirmReject = () => {
        if (selectedMahasiswa && rejectReason.trim()) {
            handleReject(selectedMahasiswa.id, rejectReason);
        }
    };

    const openEditModal = () => {
        if (selectedMahasiswa) {
            setEditStatus(selectedMahasiswa.status);
            setShowEditModal(true);
        }
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditStatus('');
    };

    const handleEditStatus = () => {
        if (selectedMahasiswa && editStatus.trim()) {
            router.patch(
                route('admin.updateStatus', selectedMahasiswa.id),
                {
                    status: editStatus,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        console.log('Status berhasil diubah');
                        closeEditModal();
                        closeModal();
                    },
                    onError: (errors) => {
                        console.error('Gagal mengubah status:', errors);
                    },
                },
            );
        }
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

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

    const statistik = {
        total: data.length,
        diterima: data.filter((m) => m.status === 'Diterima').length,
        menunggu: data.filter((m) => m.status === 'Menunggu').length,
        selesai: data.filter((m) => m.status === 'Selesai Magang').length,
        ditolak: data.filter((m) => m.status === 'Ditolak').length,
        sedangMagang: data.filter((m) => m.status === 'Sedang Magang').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
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
                        <div className="flex items-center space-x-4">
                            <div className="hidden items-center space-x-2 rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm md:flex">
                                <span className="text-sm">👋 Selamat datang,</span>
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

            {/* Dashboard Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Statistics Cards */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">{statistik.total}</div>
                            <div className="mt-1 text-sm text-gray-600">Total Pendaftar</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{statistik.diterima}</div>
                            <div className="mt-1 text-sm text-gray-600">Diterima</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600">{statistik.menunggu}</div>
                            <div className="mt-1 text-sm text-gray-600">Menunggu</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{statistik.sedangMagang}</div>
                            <div className="mt-1 text-sm text-gray-600">Sedang Magang</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{statistik.selesai}</div>
                            <div className="mt-1 text-sm text-gray-600">Selesai</div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">{statistik.ditolak}</div>
                            <div className="mt-1 text-sm text-gray-600">Ditolak</div>
                        </div>
                    </div>
                </div>

                {/* Automation Info */}
                <div className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-green-50 p-6 shadow-xl">
                    <div className="flex items-start space-x-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">🤖 Otomatisasi Status Aktif</h3>
                            <p className="mt-1 text-sm text-gray-600">Sistem otomatis mengupdate status mahasiswa setiap hari berdasarkan tanggal:</p>
                            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="flex items-center space-x-2 rounded-lg bg-green-100 p-2">
                                    <span className="text-green-600">✅</span>
                                    <span className="text-sm text-green-800">
                                        <strong>Diterima → Sedang Magang</strong> (saat tanggal mulai tiba)
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 rounded-lg bg-blue-100 p-2">
                                    <span className="text-blue-600">🎯</span>
                                    <span className="text-sm text-blue-800">
                                        <strong>Sedang Magang → Selesai</strong> (saat tanggal selesai tiba)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Tab Navigation */}
                <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama, NIM, atau universitas..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tab Navigation */}
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

                {/* Data Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                        <h3 className="text-xl font-bold text-gray-800">Data Mahasiswa - Status: {activeTab}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Menampilkan {activeTabData.length} mahasiswa dengan status "{activeTab}"
                            {activeTabData.length !== getDataByStatus(activeTab).length &&
                                ` (${getDataByStatus(activeTab).length} total, ${activeTabData.length} hasil pencarian)`}
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
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
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.id} className="transition-colors duration-200 hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{startIndex + index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{mahasiswa.nama}</div>
                                                <div className="text-xs text-gray-500">{mahasiswa.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.nim}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.universitas}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    {mahasiswa.bidang}
                                                </span>
                                            </td>{' '}
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{new Date(mahasiswa.tanggal_mulai).toLocaleDateString('id-ID')}</div>
                                                <div className="text-xs text-gray-500">
                                                    s/d {new Date(mahasiswa.tanggal_selesai).toLocaleDateString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(mahasiswa.status)}`}
                                                >
                                                    {mahasiswa.status}
                                                </span>
                                            </td>
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

                    {/* Pagination */}
                    {activeTabData.length > itemsPerPage && (
                        <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
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
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                            <span className="font-medium">{Math.min(endIndex, activeTabData.length)}</span> of{' '}
                                            <span className="font-medium">{activeTabData.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
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
                                                                ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                                : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            })}

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
            </div>

            {/* Detail Modal */}
            {showModal && selectedMahasiswa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={closeModal}>
                    <div
                        className="modal-content-active scrollbar-hide max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                        <div className="space-y-4 p-6">
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
                            {selectedMahasiswa.motivasi && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Motivasi</label>
                                    <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                        <p className="text-sm text-gray-900">{selectedMahasiswa.motivasi}</p>
                                    </div>
                                </div>
                            )}

                            {/* File and Documents Section */}
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
                                                        onClick={() => handleFilePreview(selectedMahasiswa.surat_pengantar!)}
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
                                                    <a
                                                        href={getFileUrl(selectedMahasiswa.surat_pengantar)}
                                                        download
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
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="text-center">
                                                <span className="text-2xl text-gray-400">📄</span>
                                                <p className="mt-1 text-sm text-gray-500">Surat Pengantar</p>
                                                <p className="text-xs text-gray-400">Tidak ada file</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* CV */}
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
                                                        onClick={() => handleFilePreview(selectedMahasiswa.cv!)}
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
                                                    <a
                                                        href={getFileUrl(selectedMahasiswa.cv)}
                                                        download
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
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <div className="text-center">
                                                <span className="text-2xl text-gray-400">📝</span>
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
                                                    <span className="text-2xl">🔗</span>
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
                                                            // Optional: Add toast notification here
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
                                                <span className="text-2xl text-gray-400">🔗</span>
                                                <p className="mt-1 text-sm text-gray-500">LinkedIn Profile</p>
                                                <p className="text-xs text-gray-400">Tidak ada profile LinkedIn</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* File Info */}
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
                            {selectedMahasiswa.status === 'Ditolak' && selectedMahasiswa.reject_reason && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-red-700">Alasan Penolakan</label>
                                    <div className="mt-1 rounded-lg border border-red-200 bg-red-50 p-3">
                                        <p className="text-sm text-red-800">{selectedMahasiswa.reject_reason}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between border-t border-gray-200 p-6">
                            <div className="flex space-x-3">
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
                                {(selectedMahasiswa.status === 'Menunggu' ||
                                    selectedMahasiswa.status === 'Diterima' ||
                                    selectedMahasiswa.status === 'Ditolak') && (
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

            {/* Reject Reason Modal */}
            {showRejectModal && selectedMahasiswa && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeRejectModal}>
                    <div className="modal-content-active w-full max-w-md rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Alasan Penolakan</h3>
                                <button onClick={closeRejectModal} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>
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

            {/* Edit Status Modal */}
            {showEditModal && selectedMahasiswa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={closeModal}>
                    <div className="modal-content-active w-full max-w-md rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Edit Status</h3>
                                <button onClick={closeEditModal} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <p className="mb-3 text-sm text-gray-600">
                                    Ubah status untuk <strong>{selectedMahasiswa.nama}</strong>:
                                </p>
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
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
                        </div>
                        <div className="flex justify-between border-t border-gray-200 p-6">
                            <button
                                onClick={closeEditModal}
                                className="rounded-xl bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleEditStatus}
                                disabled={!editStatus.trim()}
                                className="rounded-xl bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedMahasiswa && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeDeleteModal}>
                    <div className="modal-content-active w-full max-w-md rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-red-600">Konfirmasi Hapus</h3>
                                <button onClick={closeDeleteModal} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
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
                                <p className="text-center text-sm text-gray-600">Apakah Anda yakin ingin menghapus data mahasiswa:</p>
                                <p className="mt-2 text-center text-lg font-medium text-gray-900">{selectedMahasiswa.nama}</p>
                                <p className="mt-1 text-center text-sm text-gray-500">NIM: {selectedMahasiswa.nim}</p>
                                <p className="mt-4 text-center text-sm font-medium text-red-600">Tindakan ini tidak dapat dibatalkan!</p>
                            </div>
                        </div>
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
