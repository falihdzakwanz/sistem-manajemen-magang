import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface Pendaftar {
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
    status: 'Menunggu' | 'Diterima' | 'Ditolak' | 'Sedang Magang' | 'Selesai Magang';
    bidang_id: number;
    bidang?: {
        id: number;
        nama_bidang: string;
        kepala_bidang: string;
        deskripsi: string;
    };
    linkedin?: string;
    motivasi: string;
    reject_reason?: string;
}

interface StatusPendaftaranProps {
    pendaftars: Pendaftar[];
}

const StatusPendaftaran = ({ pendaftars = [] }: StatusPendaftaranProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRejectReason, setSelectedRejectReason] = useState('');
    const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
    const itemsPerPage = 10;

    // Fungsi untuk mendapatkan warna berdasarkan status
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

    // Format tanggal
    const formatTanggal = (tanggal: string) => {
        const date = new Date(tanggal);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString('id-ID', options);
    };

    // Hitung statistik status - hanya untuk status yang ditampilkan
    const getStatusStats = () => {
        const stats = {
            Menunggu: 0,
            Diterima: 0,
            Ditolak: 0,
        };

        pendaftars.forEach((pendaftar) => {
            if (pendaftar.status in stats) {
                stats[pendaftar.status as keyof typeof stats]++;
            }
        });

        return stats;
    };

    const statusStats = getStatusStats();

    // Filter data untuk hanya menampilkan status tertentu
    const allowedStatuses = ['Menunggu', 'Diterima', 'Ditolak'];

    // Pertama filter data berdasarkan kriteria
    const filteredPendaftars = pendaftars.filter((item) => {
        // Hanya tampilkan status yang diizinkan
        const isAllowedStatus = allowedStatuses.includes(item.status);

        // Pencarian yang lebih robust dengan trim dan normalisasi
        const searchQuery = searchTerm.toLowerCase().trim();
        const matchesSearch =
            searchQuery === '' ||
            item.nama.toLowerCase().trim().includes(searchQuery) ||
            item.nim.toLowerCase().trim().includes(searchQuery) ||
            item.universitas.toLowerCase().trim().includes(searchQuery) ||
            item.jurusan.toLowerCase().trim().includes(searchQuery) ||
            item.email.toLowerCase().trim().includes(searchQuery) ||
            (item.bidang?.nama_bidang && item.bidang.nama_bidang.toLowerCase().trim().includes(searchQuery));

        // Filter berdasarkan status
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return isAllowedStatus && matchesSearch && matchesStatus;
    });

    // Kemudian data yang sudah difilter
    const filteredData = filteredPendaftars;

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Reset to page 1 when filter or search changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Reset page when filters change
    const resetToFirstPage = () => {
        setCurrentPage(1);
    };

    // Auto reset when search or filter changes
    useEffect(() => {
        resetToFirstPage();
    }, [searchTerm, statusFilter]);

    // Function to handle clicking "Ditolak" status
    const handleRejectStatusClick = (pendaftar: Pendaftar) => {
        if (pendaftar.status === 'Ditolak' && pendaftar.reject_reason) {
            setSelectedPendaftar(pendaftar);
            setSelectedRejectReason(pendaftar.reject_reason);
            setShowRejectModal(true);
        }
    };

    // Function to close reject modal
    const closeRejectModal = () => {
        setShowRejectModal(false);
        setSelectedPendaftar(null);
        setSelectedRejectReason('');
    };

    return (
        <Layout currentPage="cek-status">
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
                            Status Pendaftaran Real-time
                        </div>
                        <h2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                Status Pendaftaran Magang
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                            Lihat status terkini dari semua pendaftaran magang yang telah masuk ke Kominfo Lampung
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {/* Search and Filter */}
                    <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                        <div className="flex flex-col gap-6 md:flex-row">
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Cari berdasarkan Nama, NIM, Universitas, Jurusan, Email, atau Bidang
                                </label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Masukkan nama, NIM, universitas, jurusan, email, atau bidang..."
                                        className="w-full text-black"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <svg
                                        className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="md:w-64">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Filter Status</label>
                                <select
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Diterima">Diterima</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <div className="flex items-start space-x-2">
                                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-sm text-blue-700">
                                    <strong>Tip:</strong> Klik pada status "Ditolak" untuk melihat alasan penolakan dari admin.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistik Cards */}
                    {pendaftars.length > 0 && (
                        <div className="mb-8 grid grid-cols-3 gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-800">{statusStats['Menunggu']}</div>
                                <div className="text-sm text-yellow-600">Menunggu</div>
                            </div>
                            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
                                <div className="text-2xl font-bold text-green-800">{statusStats['Diterima']}</div>
                                <div className="text-sm text-green-600">Diterima</div>
                            </div>
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                                <div className="text-2xl font-bold text-red-800">{statusStats['Ditolak']}</div>
                                <div className="text-sm text-red-600">Ditolak</div>
                            </div>
                        </div>
                    )}

                    {/* Status Table */}
                    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                        {/* Header dengan statistik */}
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Data Pendaftar Magang</h3>
                                <div className="text-sm text-gray-600">
                                    Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} pendaftar
                                    {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">NIM</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Universitas</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Jurusan</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Bidang</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Periode Magang</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Kontak</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item, index) => (
                                            <tr key={item.id} className="transition-colors duration-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{startIndex + index + 1}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.nim}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.universitas}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.jurusan}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                        {item.bidang?.nama_bidang || 'Belum ditentukan'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{formatTanggal(item.tanggal_mulai)}</div>
                                                    <div className="text-xs text-gray-500">s/d {formatTanggal(item.tanggal_selesai)}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{item.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.status === 'Ditolak' && item.reject_reason ? (
                                                        <button
                                                            onClick={() => handleRejectStatusClick(item)}
                                                            className={`inline-flex cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:opacity-80 ${getStatusColor(item.status)}`}
                                                            title="Klik untuk melihat alasan penolakan"
                                                        >
                                                            {item.status}
                                                        </button>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(item.status)}`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center">
                                                    <svg
                                                        className="mb-4 h-12 w-12 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                    <p className="text-lg font-medium">
                                                        {pendaftars.length === 0 ? 'Belum ada pendaftar' : 'Tidak ada data ditemukan'}
                                                    </p>
                                                    <p className="text-sm">
                                                        {pendaftars.length === 0
                                                            ? 'Belum ada yang mendaftar magang'
                                                            : 'Coba ubah kata kunci pencarian atau filter status'}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between rounded-3xl border border-gray-100 bg-white px-6 py-4 shadow-xl">
                            <div className="text-sm text-gray-600">
                                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} pendaftar
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        currentPage === 1
                                            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Sebelumnya
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                                currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        currentPage === totalPages
                                            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    Selanjutnya
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Status Legend */}
                    <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">Keterangan Status</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                                    Menunggu ({statusStats['Menunggu']})
                                </span>
                                <span className="text-sm text-gray-600">Dalam review</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                    Diterima ({statusStats['Diterima']})
                                </span>
                                <span className="text-sm text-gray-600">Pendaftaran diterima</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                    Ditolak ({statusStats['Ditolak']})
                                </span>
                                <span className="text-sm text-gray-600">Tidak memenuhi syarat</span>
                                <span className="text-xs font-medium text-blue-600">(Klik untuk melihat alasan)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal Alasan Penolakan */}
            {showRejectModal && selectedPendaftar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeRejectModal}>
                    <div className="w-full max-w-md rounded-3xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-red-600">Alasan Penolakan</h3>
                                <button onClick={closeRejectModal} className="text-2xl text-gray-500 transition-colors hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="mb-4">
                                <h4 className="mb-2 font-semibold text-gray-800">Pendaftar:</h4>
                                <div className="text-sm text-gray-600">
                                    <p>
                                        <strong>Nama:</strong> {selectedPendaftar.nama}
                                    </p>
                                    <p>
                                        <strong>NIM:</strong> {selectedPendaftar.nim}
                                    </p>
                                    <p>
                                        <strong>Universitas:</strong> {selectedPendaftar.universitas}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="mb-2 font-semibold text-red-700">Alasan Penolakan:</h4>
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm leading-relaxed text-red-800">{selectedRejectReason}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 p-6 text-center">
                            <button
                                onClick={closeRejectModal}
                                className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default StatusPendaftaran;
