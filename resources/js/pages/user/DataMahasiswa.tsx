import { IconDisplay } from '@/components/IconPicker';
import Layout from '@/components/Layout';
import { PageProps } from '@/types';

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

    return (
        <Layout currentPage="data-mahasiswa">
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
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                            Data Terintegrasi
                        </div>
                        <h2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                Data Mahasiswa Magang
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                            Informasi lengkap mahasiswa yang sedang dan telah menyelesaikan program magang di Dinas Kominfo Kota Bandar Lampung
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {/* Statistics Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Mahasiswa</p>
                                    <p className="text-2xl font-bold text-gray-800">{statistik.total_mahasiswa}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <IconDisplay iconName="users" className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sedang Aktif</p>
                                    <p className="text-2xl font-bold text-green-600">{statistik.sedang_aktif}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <IconDisplay iconName="rocket" className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Telah Selesai</p>
                                    <p className="text-2xl font-bold text-blue-600">{statistik.telah_selesai}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <IconDisplay iconName="trophy" className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Universitas</p>
                                    <p className="text-2xl font-bold text-purple-600">{statistik.total_universitas}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                    <IconDisplay iconName="building2" className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                            <h3 className="text-xl font-bold text-gray-800">Daftar Mahasiswa Magang</h3>
                            <p className="mt-1 text-sm text-gray-600">Data mahasiswa yang sedang dan telah menjalani program magang</p>
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
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Periode</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Kontak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mahasiswa.length > 0 ? (
                                        mahasiswa.map((mhs, index) => (
                                            <tr key={mhs.id} className="transition-colors duration-200 hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
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
                                            <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <IconDisplay iconName="database" className="mb-2 h-12 w-12 text-gray-400" />
                                                    <p className="text-lg font-medium">Belum ada data mahasiswa</p>
                                                    <p className="text-sm">Data akan muncul setelah ada mahasiswa yang diterima</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bidang Statistics */}
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:col-span-1 lg:col-span-2">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Distribusi Bidang</h4>
                            <div className="space-y-3">
                                {Object.entries(distribusi_bidang).length > 0 ? (
                                    Object.entries(distribusi_bidang)
                                        .slice(0, 5)
                                        .map(([bidang, jumlah], index) => (
                                            <div key={bidang} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{bidang}</span>
                                                <span
                                                    className={`text-sm font-medium ${
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
                                    <p className="text-sm text-gray-500">Belum ada data bidang</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:col-span-1 lg:col-span-2">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Universitas Asal</h4>
                            <div className="space-y-3">
                                {Object.entries(distribusi_universitas).length > 0 ? (
                                    Object.entries(distribusi_universitas)
                                        .slice(0, 4)
                                        .map(([universitas, jumlah], index) => (
                                            <div key={universitas} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{universitas}</span>
                                                <span
                                                    className={`text-sm font-medium ${
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
                                    <p className="text-sm text-gray-500">Belum ada data universitas</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:col-span-1 lg:col-span-1">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Status Magang</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Sedang Aktif</p>
                                        <p className="text-xs text-gray-600">{statistik.sedang_aktif} mahasiswa</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Telah Selesai</p>
                                        <p className="text-xs text-gray-600">{statistik.telah_selesai} mahasiswa</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Kerjasama</p>
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
