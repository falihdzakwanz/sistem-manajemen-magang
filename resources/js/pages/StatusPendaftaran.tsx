import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const StatusPendaftaran = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Data dummy untuk demo
    const pendaftaranData = [
        {
            id: 1,
            nama: 'Ahmad Rizki Pratama',
            nim: '19104001',
            universitas: 'Universitas Lampung',
            tanggalDaftar: '1 Juni 2025',
            status: 'Diterima',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 2,
            nama: 'Siti Nurhaliza',
            nim: '20104002',
            universitas: 'Institut Teknologi Sumatera',
            tanggalDaftar: '5 Juni 2025',
            status: 'Sedang Diproses',
            statusColor: 'bg-yellow-100 text-yellow-800',
        },
        {
            id: 3,
            nama: 'Budi Santoso',
            nim: '19104003',
            universitas: 'Universitas Bandar Lampung',
            tanggalDaftar: '20 Mei 2025',
            status: 'Selesai Magang',
            statusColor: 'bg-blue-100 text-blue-800',
        },
        {
            id: 4,
            nama: 'Maya Dewi',
            nim: '20104004',
            universitas: 'Universitas Lampung',
            tanggalDaftar: '10 Juni 2025',
            status: 'Ditolak',
            statusColor: 'bg-red-100 text-red-800',
        },
        {
            id: 5,
            nama: 'Rentra Wijaya',
            nim: '19104005',
            universitas: 'Institut Teknologi Sumatera',
            tanggalDaftar: '15 Mei 2025',
            status: 'Sedang Magang',
            statusColor: 'bg-purple-100 text-purple-800',
        },
    ];

    const filteredData = pendaftaranData.filter((item) => {
        const matchesSearch =
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nim.includes(searchTerm) ||
            item.universitas.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
                            Cek status pendaftaran magang yang telah diajukan dengan memasukkan informasi yang diperlukan
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
                                <label className="mb-2 block text-sm font-medium text-gray-700">Cari berdasarkan Nama, NIM, atau Universitas</label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Masukkan nama, NIM, atau universitas..."
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
                                    <option value="Diterima">Diterima</option>
                                    <option value="Sedang Diproses">Sedang Diproses</option>
                                    <option value="Selesai Magang">Selesai Magang</option>
                                    <option value="Ditolak">Ditolak</option>
                                    <option value="Sedang Magang">Sedang Magang</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Status Table */}
                    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">NIM</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Universitas</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal Daftar</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={item.id} className="transition-colors duration-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.nim}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.universitas}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.tanggalDaftar}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${item.statusColor}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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

                    {/* Status Legend */}
                    <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">Keterangan Status</h3>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Diterima</span>
                                <span className="text-sm text-gray-600">Pendaftaran diterima</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                                    Sedang Diproses
                                </span>
                                <span className="text-sm text-gray-600">Dalam review</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                    Selesai Magang
                                </span>
                                <span className="text-sm text-gray-600">Telah selesai</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">Ditolak</span>
                                <span className="text-sm text-gray-600">Tidak memenuhi syarat</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                                    Sedang Magang
                                </span>
                                <span className="text-sm text-gray-600">Sedang berlangsung</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default StatusPendaftaran;
