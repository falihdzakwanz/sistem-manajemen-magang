const Beranda = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                                <span className="text-lg font-bold text-blue-600">K</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">KOMDIGI</h1>
                                <p className="text-sm opacity-90">Kota Bandar Lampung</p>
                            </div>
                        </div>
                        <nav className="hidden space-x-6 md:flex">
                            <a href="/" className="rounded-lg bg-blue-500 px-4 py-2 font-medium transition-colors hover:bg-blue-400">
                                Beranda
                            </a>
                            <a href="/mahasiswa" className="rounded-lg px-4 py-2 font-medium transition-colors hover:bg-blue-500">
                                Daftar Magang
                            </a>
                            <a href="/cek-status" className="rounded-lg px-4 py-2 font-medium transition-colors hover:bg-blue-500">
                                Cek Status
                            </a>
                            <a href="/data-mahasiswa" className="rounded-lg px-4 py-2 font-medium transition-colors hover:bg-blue-500">
                                Data Mahasiswa
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-16 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
                                Selamat Datang di Website
                                <br />
                                Kementerian Komunikasi dan
                                <br />
                                Digital Kota Bandar Lampung
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed opacity-90">
                                Kementerian Komunikasi dan Digital Kota Bandar Lampung berkomitmen untuk memberikan pelayanan terbaik dalam bidang
                                komunikasi dan teknologi informasi.
                            </p>
                            <a
                                href="/mahasiswa"
                                className="inline-block transform rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:scale-105 hover:bg-orange-600"
                            >
                                Daftar Magang Sekarang
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <img src="/asset/gedung-kominfo-balam.png" alt="Gedung KOMDIGI" className="h-auto max-w-full rounded-lg shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Struktur Organisasi */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h3 className="mb-12 text-center text-3xl font-bold text-gray-800">Struktur Organisasi</h3>

                    {/* Struktur Organisasi Chart */}
                    <div className="mb-12 text-center">
                        <div className="inline-block rounded-lg border-2 border-gray-300 bg-gray-100 p-8">
                            <p className="font-semibold text-gray-600">Struktur Organisasi</p>
                        </div>
                    </div>

                    {/* Leadership */}
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-2xl text-gray-600">👨‍💼</span>
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-gray-800">Kepala Dinas</h4>
                            <p className="text-gray-600">Rizky Agung Arisanto, S.T.</p>
                            <p className="text-sm text-gray-500">Kepala Dinas</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-2xl text-gray-600">👨‍💼</span>
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-gray-800">Sekretaris</h4>
                            <p className="text-gray-600">Arienge Rahman, S.Kom., M.M</p>
                            <p className="text-sm text-gray-500">Sekretaris Dinas</p>
                        </div>
                    </div>

                    {/* Sub Bagian */}
                    <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Rizky Agung Arisanto, S.T</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang 1</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Rizky Agung Arisanto, S.T</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang 2</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Rizky Agung Arisanto, S.T</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang 3</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Rizky Agung Arisanto, S.T</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang 4</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bidang-bidang di KOMDIGI */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="mb-12 text-center text-3xl font-bold text-gray-800">Bidang-bidang di KOMDIGI Kota Bandar Lampung</h3>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Bidang 1 */}
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">�</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Informasi dan Komunikasi Publik</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Rudhy Hartono, SE., M.Si</p>
                            <ul className="space-y-2 text-sm">
                                <li>• Hubungan Media</li>
                                <li>• Publikasi Informasi</li>
                                <li>• Dokumentasi Kegiatan</li>
                            </ul>
                        </div>

                        {/* Bidang 2 */}
                        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">🏛️</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Pemberdayaan E-Government</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Fachrizal, S.Kom, M.Kom</p>
                            <ul className="space-y-2 text-sm">
                                <li>• Jaringan Komputer</li>
                                <li>• Data Center</li>
                                <li>• Keamanan Sistem</li>
                            </ul>
                        </div>

                        {/* Bidang 3 */}
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">📱</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Persandian, Pos dan Telekomunikasi</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Nursari, S.Sos., MM</p>
                            <ul className="space-y-2 text-sm">
                                <li>• E-Government</li>
                                <li>• Smart City</li>
                            </ul>
                        </div>

                        {/* Bidang 4 */}
                        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">🛡️</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Persandian dan Keamanan Informasi</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Dr. Andi Pratama, M.Eng</p>
                            <ul className="space-y-2 text-sm">
                                <li>• Keamanan Siber</li>
                                <li>• Enkripsi Data</li>
                                <li>• Audit Keamanan</li>
                            </ul>
                        </div>

                        {/* Bidang 5 */}
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">📊</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Statistik dan Persandian</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Lina Marlina, S.Si, M.Stat</p>
                            <ul className="space-y-2 text-sm">
                                <li>• Analisis Data</li>
                                <li>• Statistik Daerah</li>
                                <li>• Big Data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jabatan Fungsional */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h3 className="mb-12 text-center text-3xl font-bold text-gray-800">Jabatan Fungsional</h3>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Pranata Hubungan Masyarakat</h4>
                            <p className="font-semibold text-blue-600">5 orang</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Analis Sistem</h4>
                            <p className="font-semibold text-blue-600">3 orang</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Programmer</h4>
                            <p className="font-semibold text-blue-600">8 orang</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Network Administrator</h4>
                            <p className="font-semibold text-blue-600">4 orang</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Database Administrator</h4>
                            <p className="font-semibold text-blue-600">2 orang</p>
                        </div>
                        <div className="rounded-lg border bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl">
                            <h4 className="mb-2 font-bold text-gray-800">Web Designer</h4>
                            <p className="font-semibold text-blue-600">3 orang</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-blue-800 to-blue-900 py-12 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="mb-4 text-xl font-bold text-blue-300">KOMDIGI Kota Bandar Lampung</h3>
                            <p className="text-sm leading-relaxed opacity-90">Jl. Dr. Susilo No.2 Bandar Lampung, Kota Bandar Lampung</p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-xl font-bold text-blue-300">Kontak</h3>
                            <p className="mb-2 text-sm opacity-90">📞 (0721) 481301</p>
                            <p className="text-sm opacity-90">✉️ diskoinfo@bandarlampungkota.go.id</p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-xl font-bold text-blue-300">Jam Kerja</h3>
                            <p className="mb-2 text-sm opacity-90">Senin - Jumat: 08:00 - 16:00 WIB</p>
                            <p className="text-sm opacity-90">Sabtu - Minggu: Tutup</p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-blue-700 pt-6 text-center">
                        <p className="text-sm opacity-80">© 2025 KOMDIGI Kota Bandar Lampung. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Beranda;
