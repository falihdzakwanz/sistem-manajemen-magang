import Footer from "@/components/Footer";

const DataMahasiswa = () => {
    // Data dummy untuk demo
    const mahasiswaData = [
        {
            id: 1,
            nama: 'Ahmad Rizki Pratama',
            nim: '19104001',
            universitas: 'Universitas Lampung',
            jurusan: 'Teknik Informatika',
            email: 'ahmad.rizki@example.com',
            telepon: '08123456789',
            bidang: 'IT Support',
            status: 'Aktif',
            tanggal_mulai: '1 Juli 2025',
            tanggal_selesai: '31 Agustus 2025',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 2,
            nama: 'Siti Nurhaliza',
            nim: '20104002',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Sistem Informasi',
            email: 'siti.nur@example.com',
            telepon: '08234567890',
            bidang: 'Web Development',
            status: 'Selesai',
            tanggal_mulai: '1 Juni 2025',
            tanggal_selesai: '31 Juli 2025',
            statusColor: 'bg-blue-100 text-blue-800',
        },
        {
            id: 3,
            nama: 'Budi Santoso',
            nim: '19104003',
            universitas: 'Universitas Bandar Lampung',
            jurusan: 'Teknik Komputer',
            email: 'budi.santoso@example.com',
            telepon: '08345678901',
            bidang: 'Network Administration',
            status: 'Aktif',
            tanggal_mulai: '15 Juli 2025',
            tanggal_selesai: '15 September 2025',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 4,
            nama: 'Maya Dewi',
            nim: '20104004',
            universitas: 'Universitas Lampung',
            jurusan: 'Desain Komunikasi Visual',
            email: 'maya.dewi@example.com',
            telepon: '08456789012',
            bidang: 'UI/UX Design',
            status: 'Aktif',
            tanggal_mulai: '10 Juli 2025',
            tanggal_selesai: '10 September 2025',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 5,
            nama: 'Rentra Wijaya',
            nim: '19104005',
            universitas: 'Institut Teknologi Sumatera',
            jurusan: 'Teknik Informatika',
            email: 'rentra.wijaya@example.com',
            telepon: '08567890123',
            bidang: 'Data Analysis',
            status: 'Selesai',
            tanggal_mulai: '15 Mei 2025',
            tanggal_selesai: '15 Juli 2025',
            statusColor: 'bg-blue-100 text-blue-800',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl backdrop-blur-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex h-14 w-14 transform items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-6">
                                <span className="text-xl font-bold text-blue-600">K</span>
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">KOMDIGI</h1>
                                <p className="text-sm font-medium opacity-90">Kota Bandar Lampung</p>
                            </div>
                        </div>
                        <nav className="hidden space-x-2 md:flex">
                            <a
                                href="/"
                                className="rounded-xl border border-transparent px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/10 hover:bg-white/20 hover:shadow-lg"
                            >
                                Beranda
                            </a>
                            <a
                                href="/mahasiswa"
                                className="rounded-xl border border-transparent px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/10 hover:bg-white/20 hover:shadow-lg"
                            >
                                Daftar Magang
                            </a>
                            <a
                                href="/status-pendaftaran"
                                className="rounded-xl border border-transparent px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/10 hover:bg-white/20 hover:shadow-lg"
                            >
                                Cek Status
                            </a>
                            <a
                                href="/data-mahasiswa"
                                className="rounded-xl border border-white/10 bg-white/20 px-6 py-3 font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-xl"
                            >
                                Data Mahasiswa
                            </a>
                        </nav>
                        {/* Mobile menu button */}
                        <button className="rounded-lg bg-white/20 p-2 transition-all hover:bg-white/30 md:hidden">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

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
                            Informasi lengkap mahasiswa yang sedang dan telah menyelesaikan program magang di KOMDIGI
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
                                    <p className="text-2xl font-bold text-gray-800">24</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <span className="text-xl text-blue-600">👥</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sedang Aktif</p>
                                    <p className="text-2xl font-bold text-green-600">18</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <span className="text-xl text-green-600">✅</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Telah Selesai</p>
                                    <p className="text-2xl font-bold text-blue-600">6</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <span className="text-xl text-blue-600">🎓</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Universitas</p>
                                    <p className="text-2xl font-bold text-purple-600">5</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                    <span className="text-xl text-purple-600">🏫</span>
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
                                    {mahasiswaData.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.id} className="transition-colors duration-200 hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{mahasiswa.nama}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.nim}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.universitas}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{mahasiswa.jurusan}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    {mahasiswa.bidang}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{mahasiswa.tanggal_mulai}</div>
                                                <div className="text-xs text-gray-500">s/d {mahasiswa.tanggal_selesai}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${mahasiswa.statusColor}`}>
                                                    {mahasiswa.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{mahasiswa.email}</div>
                                                <div className="text-xs text-gray-500">{mahasiswa.telepon}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bidang Statistics */}
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Distribusi Bidang</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">IT Support</span>
                                    <span className="text-sm font-medium text-blue-600">8 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Web Development</span>
                                    <span className="text-sm font-medium text-purple-600">6 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Network Admin</span>
                                    <span className="text-sm font-medium text-green-600">5 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">UI/UX Design</span>
                                    <span className="text-sm font-medium text-orange-600">3 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Data Analysis</span>
                                    <span className="text-sm font-medium text-red-600">2 orang</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Universitas Asal</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Universitas Lampung</span>
                                    <span className="text-sm font-medium text-blue-600">10 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Institut Teknologi Sumatera</span>
                                    <span className="text-sm font-medium text-purple-600">8 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Universitas Bandar Lampung</span>
                                    <span className="text-sm font-medium text-green-600">4 orang</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Universitas Teknokrat</span>
                                    <span className="text-sm font-medium text-orange-600">2 orang</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:col-span-2">
                            <h4 className="mb-4 text-lg font-semibold text-gray-800">Timeline Magang</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Periode Juli - September 2025</p>
                                        <p className="text-xs text-gray-600">18 mahasiswa sedang aktif</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Periode Mei - Juli 2025</p>
                                        <p className="text-xs text-gray-600">6 mahasiswa telah selesai</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">Periode September - November 2025</p>
                                        <p className="text-xs text-gray-600">Pendaftaran akan dibuka</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default DataMahasiswa;
