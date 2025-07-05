import Layout from '@/components/Layout';

const Beranda = () => {
    return (
        <Layout currentPage="beranda">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-16 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
                                Selamat Datang di Website
                                <br />
                                Dinas Komunikasi dan
                                <br />
                                Digital Kota Bandar Lampung
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed opacity-90">
                                Dinas Komunikasi dan Digital Kota Bandar Lampung berkomitmen untuk memberikan pelayanan terbaik dalam bidang
                                komunikasi dan teknologi informasi.
                            </p>
                            <a
                                href="/daftar-magang"
                                className="inline-block transform rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:scale-105 hover:bg-orange-600"
                            >
                                Daftar Magang Sekarang
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="/asset/gedung-kominfo-balam.png"
                                alt="Gedung Dinas Kominfo"
                                className="h-auto max-w-full rounded-lg shadow-2xl"
                            />
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
                    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Rudhy Hartono, SE., M.Si.</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang Informasi dan Komunikasi Publik</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Fachrizal, S.Kom, M.Kom.</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang Pemberdayaan E-Government</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Nursari, S.Sos., MM</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang Persandian, Pos dan Telekomunikasi</p>
                        </div>
                        <div className="rounded-lg border bg-white p-4 text-center shadow-md">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                <span className="text-lg text-gray-600">👨‍💼</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-800">Donny, S.H</h5>
                            <p className="text-xs text-gray-600">Kepala Bidang Data dan Statistik</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bidang-bidang di Dinas Kominfo */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6">
                    <h3 className="mb-12 text-center text-3xl font-bold text-gray-800">Bidang-bidang di Dinas Kominfo Kota Bandar Lampung</h3>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {/* Bidang 1 */}
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">📢</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Informasi dan Komunikasi Publik</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Rudhy Hartono, SE., M.Si.</p>
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
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Fachrizal, S.Kom, M.Kom.</p>
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
                                <li>• Persandian</li>
                                <li>• Layanan Pos</li>
                                <li>• Telekomunikasi</li>
                            </ul>
                        </div>

                        {/* Bidang 4 */}
                        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 p-6 text-white shadow-lg">
                            <div className="mb-4 text-4xl">📊</div>
                            <h4 className="mb-3 text-lg font-bold">Bidang Data dan Statistik</h4>
                            <p className="mb-4 text-sm opacity-90">Kepala Bidang: Donny, S.H</p>
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
        </Layout>
    );
};

export default Beranda;
