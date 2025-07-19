import { IconDisplay } from '@/components/IconPicker';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';

interface Bidang {
    id: number;
    nama_bidang: string;
    kepala_bidang: string;
    deskripsi: string;
}

interface Mahasiswa {
    id: number;
    nama: string;
    nim: string;
    universitas: string;
    jurusan: string;
    email: string;
    telepon: string;
    bidang: Bidang;
    status: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
}

interface Statistik {
    total_mahasiswa: number;
    sedang_aktif: number;
    telah_selesai: number;
    total_universitas: number;
}

interface DataMahasiswaPageProps extends PageProps {
    mahasiswa: Mahasiswa[];
    statistik: Statistik;
    distribusi_bidang: Record<string, number>;
    distribusi_universitas: Record<string, number>;
}

const DataMahasiswa = ({ mahasiswa, statistik, distribusi_bidang, distribusi_universitas }: DataMahasiswaPageProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fungsi untuk menentukan warna status
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

    // Fungsi untuk format tanggal
    const formatTanggal = (tanggal: string) => {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Filter dan pencarian mahasiswa
    const filteredMahasiswa = mahasiswa.filter((item) => {
        const searchQuery = searchTerm.toLowerCase().trim();
        const matchesSearch =
            searchQuery === '' ||
            item.nama.toLowerCase().trim().includes(searchQuery) ||
            item.nim.toLowerCase().trim().includes(searchQuery) ||
            item.universitas.toLowerCase().trim().includes(searchQuery) ||
            item.jurusan.toLowerCase().trim().includes(searchQuery) ||
            item.email.toLowerCase().trim().includes(searchQuery) ||
            (item.bidang?.nama_bidang && item.bidang.nama_bidang.toLowerCase().trim().includes(searchQuery));

        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredMahasiswa.slice(startIndex, endIndex);

    // Pagination handlers
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const resetToFirstPage = () => {
        setCurrentPage(1);
    };

    // Auto reset when search or filter changes
    useEffect(() => {
        resetToFirstPage();
    }, [searchTerm, statusFilter]);

    return (
        <Layout currentPage="data-mahasiswa">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 py-12 text-white sm:py-16">
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-indigo-600/20"></div>
                <div className="absolute top-0 left-0 h-full w-full">
                    <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>
                    <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6">
                    <div className="text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                            <span className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 sm:mr-2 sm:h-2 sm:w-2"></span>
                            Data Terintegrasi
                        </div>
                        <h2 className="mb-3 text-2xl leading-tight font-bold sm:mb-4 sm:text-4xl md:text-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                Data Mahasiswa Magang
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed opacity-90 sm:text-xl">
                            Informasi lengkap mahasiswa yang sedang dan telah menyelesaikan program magang di Dinas Kominfo Kota Bandar Lampung
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Search and Filter */}
                    <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:p-8">
                        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    <span className="hidden sm:inline">Cari berdasarkan Nama, NIM, Universitas, Jurusan, Email, atau Bidang</span>
                                    <span className="sm:hidden">Cari Mahasiswa</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Masukkan kata kunci pencarian..."
                                        className="w-full pr-10 text-sm text-black sm:text-base"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <svg
                                        className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 sm:h-5 sm:w-5"
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
                            <div className="w-full sm:w-auto md:w-64">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Filter Status</label>
                                <select
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="Sedang Magang">Sedang Magang</option>
                                    <option value="Selesai Magang">Selesai Magang</option>
                                    <option value="Diterima">Diterima</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-6 md:grid-cols-4">
                        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl sm:rounded-3xl sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 sm:text-sm">Total Mahasiswa</p>
                                    <p className="text-lg font-bold text-gray-800 sm:text-2xl">{statistik.total_mahasiswa}</p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 sm:h-12 sm:w-12">
                                    <IconDisplay iconName="users" className="h-4 w-4 text-blue-600 sm:h-6 sm:w-6" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl sm:rounded-3xl sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 sm:text-sm">Sedang Aktif</p>
                                    <p className="text-lg font-bold text-green-600 sm:text-2xl">{statistik.sedang_aktif}</p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 sm:h-12 sm:w-12">
                                    <IconDisplay iconName="rocket" className="h-4 w-4 text-green-600 sm:h-6 sm:w-6" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl sm:rounded-3xl sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 sm:text-sm">Telah Selesai</p>
                                    <p className="text-lg font-bold text-blue-600 sm:text-2xl">{statistik.telah_selesai}</p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 sm:h-12 sm:w-12">
                                    <IconDisplay iconName="trophy" className="h-4 w-4 text-blue-600 sm:h-6 sm:w-6" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl sm:rounded-3xl sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 sm:text-sm">Universitas</p>
                                    <p className="text-lg font-bold text-purple-600 sm:text-2xl">{statistik.total_universitas}</p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 sm:h-12 sm:w-12">
                                    <IconDisplay iconName="building2" className="h-4 w-4 text-purple-600 sm:h-6 sm:w-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table/Cards */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-3xl">
                        {/* Header dengan statistik */}
                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Daftar Mahasiswa Magang</h3>
                                <div className="text-xs text-gray-600 sm:text-sm">
                                    Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredMahasiswa.length)} dari {filteredMahasiswa.length}{' '}
                                    mahasiswa
                                    {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">NIM</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Universitas</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Jurusan</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Bidang</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Periode</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Kontak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((mhs, index) => (
                                            <tr key={mhs.id} className="transition-colors duration-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{startIndex + index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{mhs.nama}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{mhs.nim}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{mhs.universitas}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{mhs.jurusan}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                        {mhs.bidang?.nama_bidang || 'Tidak Ada Bidang'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{formatTanggal(mhs.tanggal_mulai)}</div>
                                                    <div className="text-xs text-gray-500">s/d {formatTanggal(mhs.tanggal_selesai)}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(mhs.status)}`}
                                                    >
                                                        {mhs.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{mhs.email}</div>
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
                                                        {mahasiswa.length === 0 ? 'Belum ada data mahasiswa' : 'Tidak ada data ditemukan'}
                                                    </p>
                                                    <p className="text-sm">
                                                        {mahasiswa.length === 0
                                                            ? 'Data akan muncul setelah ada mahasiswa yang diterima'
                                                            : 'Coba ubah kata kunci pencarian atau filter status'}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden">
                            {paginatedData.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {paginatedData.map((mhs, index) => (
                                        <div key={mhs.id} className="p-4 transition-colors duration-200 hover:bg-gray-50 sm:p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-500">#{startIndex + index + 1}</span>
                                                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{mhs.nama}</h3>
                                                    </div>
                                                    <p className="mb-2 text-sm text-gray-600">
                                                        {mhs.nim} • {mhs.universitas}
                                                    </p>
                                                </div>
                                                <div className="ml-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(mhs.status)}`}
                                                    >
                                                        {mhs.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                                <div>
                                                    <span className="font-medium text-gray-500">Jurusan:</span>
                                                    <p className="text-gray-900">{mhs.jurusan}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-500">Bidang:</span>
                                                    <div className="mt-1">
                                                        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                            {mhs.bidang?.nama_bidang || 'Tidak Ada Bidang'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-500">Periode:</span>
                                                    <p className="text-xs text-gray-900">
                                                        {formatTanggal(mhs.tanggal_mulai)} - {formatTanggal(mhs.tanggal_selesai)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-500">Email:</span>
                                                    <p className="text-xs break-all text-gray-900">{mhs.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center text-gray-500 sm:p-12">
                                    <div className="flex flex-col items-center">
                                        <svg className="mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-base font-medium sm:text-lg">
                                            {mahasiswa.length === 0 ? 'Belum ada data mahasiswa' : 'Tidak ada data ditemukan'}
                                        </p>
                                        <p className="text-sm">
                                            {mahasiswa.length === 0
                                                ? 'Data akan muncul setelah ada mahasiswa yang diterima'
                                                : 'Coba ubah kata kunci pencarian atau filter status'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:mt-6 sm:rounded-3xl sm:px-6 sm:py-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                <div className="text-center text-xs text-gray-600 sm:text-left sm:text-sm">
                                    <span className="hidden sm:inline">
                                        Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredMahasiswa.length)} dari {filteredMahasiswa.length}{' '}
                                        mahasiswa
                                    </span>
                                    <span className="sm:hidden">
                                        Halaman {currentPage} dari {totalPages}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center space-x-1 sm:justify-end sm:space-x-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`flex items-center rounded-lg px-2 py-2 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm ${
                                            currentPage === 1
                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        <svg className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span className="hidden sm:inline">Sebelumnya</span>
                                        <span className="sm:hidden">Prev</span>
                                    </button>

                                    {/* Page Numbers - Show limited on mobile */}
                                    <div className="flex items-center space-x-1">
                                        {/* Mobile: Show only current page and adjacent pages */}
                                        <div className="flex items-center space-x-1 sm:hidden">
                                            {currentPage > 1 && (
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    className="rounded-lg bg-gray-100 px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
                                                >
                                                    {currentPage - 1}
                                                </button>
                                            )}
                                            <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white">{currentPage}</button>
                                            {currentPage < totalPages && (
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    className="rounded-lg bg-gray-100 px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
                                                >
                                                    {currentPage + 1}
                                                </button>
                                            )}
                                        </div>

                                        {/* Desktop: Show all pages */}
                                        <div className="hidden items-center space-x-1 sm:flex">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                                        currentPage === page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center rounded-lg px-2 py-2 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm ${
                                            currentPage === totalPages
                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        <span className="hidden sm:inline">Selanjutnya</span>
                                        <span className="sm:hidden">Next</span>
                                        <svg className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bidang Statistics */}
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-6 md:col-span-1 lg:col-span-2">
                            <h4 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">Distribusi Bidang</h4>
                            <div className="space-y-2 sm:space-y-3">
                                {Object.entries(distribusi_bidang).length > 0 ? (
                                    Object.entries(distribusi_bidang)
                                        .slice(0, 5)
                                        .map(([bidang, jumlah], index) => (
                                            <div key={bidang} className="flex items-center justify-between">
                                                <span className="text-xs text-gray-600 sm:text-sm">{bidang}</span>
                                                <span
                                                    className={`text-xs font-medium sm:text-sm ${
                                                        index === 0
                                                            ? 'text-blue-600'
                                                            : index === 1
                                                              ? 'text-purple-600'
                                                              : index === 2
                                                                ? 'text-green-600'
                                                                : index === 3
                                                                  ? 'text-orange-600'
                                                                  : 'text-red-600'
                                                    }`}
                                                >
                                                    {jumlah} orang
                                                </span>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-xs text-gray-500 sm:text-sm">Belum ada data bidang</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-6 md:col-span-1 lg:col-span-2">
                            <h4 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">Universitas Asal</h4>
                            <div className="space-y-2 sm:space-y-3">
                                {Object.entries(distribusi_universitas).length > 0 ? (
                                    Object.entries(distribusi_universitas)
                                        .slice(0, 4)
                                        .map(([universitas, jumlah], index) => (
                                            <div key={universitas} className="flex items-center justify-between">
                                                <span className="text-xs text-gray-600 sm:text-sm">{universitas}</span>
                                                <span
                                                    className={`text-xs font-medium sm:text-sm ${
                                                        index === 0
                                                            ? 'text-blue-600'
                                                            : index === 1
                                                              ? 'text-purple-600'
                                                              : index === 2
                                                                ? 'text-green-600'
                                                                : 'text-orange-600'
                                                    }`}
                                                >
                                                    {jumlah} orang
                                                </span>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-xs text-gray-500 sm:text-sm">Belum ada data universitas</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:rounded-3xl sm:p-6 md:col-span-1 lg:col-span-1">
                            <h4 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg">Status Magang</h4>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-gray-800 sm:text-sm">Sedang Aktif</p>
                                        <p className="text-xs text-gray-600">{statistik.sedang_aktif} mahasiswa</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 sm:h-3 sm:w-3"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-gray-800 sm:text-sm">Telah Selesai</p>
                                        <p className="text-xs text-gray-600">{statistik.telah_selesai} mahasiswa</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="h-2 w-2 rounded-full bg-purple-500 sm:h-3 sm:w-3"></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-gray-800 sm:text-sm">Kerjasama</p>
                                        <p className="text-xs text-gray-600">{statistik.total_universitas} universitas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DataMahasiswa;
