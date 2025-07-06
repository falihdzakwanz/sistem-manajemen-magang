import { router } from '@inertiajs/react';
import { useState } from 'react';

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
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

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
            motivasi: 'Ingin belajar tentang teknologi informasi dan komunikasi',
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
            status: 'Sedang Diproses',
            bidang_id: 2,
            bidang: 'Web Development',
            motivasi: 'Tertarik untuk mengembangkan skill web development',
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
            motivasi: 'Ingin memahami infrastruktur jaringan pemerintahan',
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
            motivasi: 'Passion dalam bidang desain dan user experience',
            reject_reason: 'Kuota untuk bidang UI/UX Design sudah penuh untuk periode ini',
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
            motivasi: 'Ingin belajar analisis data untuk smart city',
        },
    ];

    const data = mahasiswas.length > 0 ? mahasiswas : defaultData;

    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nim.includes(searchTerm) ||
            item.universitas.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Diterima':
                return 'bg-green-100 text-green-800';
            case 'Sedang Diproses':
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

    const statistik = {
        total: data.length,
        diterima: data.filter((m) => m.status === 'Diterima').length,
        sedangProses: data.filter((m) => m.status === 'Sedang Diproses').length,
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
                            <div className="text-3xl font-bold text-yellow-600">{statistik.sedangProses}</div>
                            <div className="mt-1 text-sm text-gray-600">Sedang Diproses</div>
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

                {/* Search and Filter */}
                <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama, NIM, atau universitas..."
                                className="border-black-300 w-full rounded-xl border px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="md:w-64">
                            <select
                                className="border-black-300 w-full rounded-xl border px-4 py-3 text-black transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Semua Status</option>
                                <option value="Diterima">Diterima</option>
                                <option value="Sedang Diproses">Sedang Diproses</option>
                                <option value="Sedang Magang">Sedang Magang</option>
                                <option value="Selesai Magang">Selesai Magang</option>
                                <option value="Ditolak">Ditolak</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                        <h3 className="text-xl font-bold text-gray-800">Data Pendaftar Magang</h3>
                        <p className="mt-1 text-sm text-gray-600">Kelola data mahasiswa yang mendaftar program magang</p>
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
                                {filteredData.length > 0 ? (
                                    filteredData.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.id} className="transition-colors duration-200 hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
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
                </div>
            </div>

            {/* Detail Modal */}
            {showModal && selectedMahasiswa && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white">
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Detail Mahasiswa</h3>
                                <button onClick={closeModal} className="text-2xl text-gray-500 hover:text-gray-700">
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
                                    <p className="mt-1 text-sm text-gray-900">{selectedMahasiswa.motivasi}</p>
                                </div>
                            )}
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
                                {selectedMahasiswa.status === 'Sedang Diproses' && (
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
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white">
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
        </div>
    );
}
