import Layout from '@/components/Layout';
import { useRef, useState } from 'react';

const Beranda = () => {
    const [selectedBidang, setSelectedBidang] = useState<number | null>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    const bidangData: Record<
        number,
        {
            title: string;
            kepala: string;
            icon: string;
            color: string;
            description: string;
            tugas: string[];
            magangTasks: string[];
            staffFungsional: string[];
        }
    > = {
        1: {
            title: 'Bidang Informasi dan Komunikasi Publik',
            kepala: 'Rudhy Hartono, SE., M.Si.',
            icon: '📢',
            color: 'blue',
            description:
                'Bidang yang bertanggung jawab atas pengelolaan informasi dan komunikasi publik untuk membangun transparansi dan keterbukaan informasi kepada masyarakat.',
            tugas: [
                'Pengelolaan hubungan media dan pers',
                'Publikasi informasi kegiatan pemerintah',
                'Dokumentasi dan arsip kegiatan',
                'Pengelolaan website dan media sosial',
                'Pembuatan konten kreatif dan informatif',
            ],
            magangTasks: [
                'Membantu pembuatan konten media sosial',
                'Dokumentasi kegiatan dan acara',
                'Penulisan artikel dan berita',
                'Desain grafis untuk publikasi',
                'Editing video dan foto',
                'Riset dan analisis media',
            ],
            staffFungsional: [
                'Farida Herawati, S.E. - Pranata Hubungan Masyarakat',
                'DRS. Joko Pratikno, M.M. - Pranata Hubungan Masyarakat',
                'Mirda Novitasari, SH, MH - Pranata Hubungan Masyarakat',
            ],
        },
        2: {
            title: 'Bidang Pemberdayaan E-Government',
            kepala: 'Fachrizal, S.Kom, M.Kom.',
            icon: '🏛️',
            color: 'purple',
            description:
                'Bidang yang mengembangkan dan mengelola sistem teknologi informasi untuk mendukung pelayanan pemerintahan digital yang efisien dan terintegrasi.',
            tugas: [
                'Pengembangan sistem informasi pemerintahan',
                'Pengelolaan infrastruktur TI',
                'Integrasi sistem antar SKPD',
                'Pemeliharaan jaringan komputer',
                'Pengembangan aplikasi pelayanan publik',
            ],
            magangTasks: [
                'Pengembangan website dan aplikasi',
                'Testing dan quality assurance sistem',
                'Dokumentasi sistem dan database',
                'Pemeliharaan hardware dan software',
                'Backup dan recovery data',
                'Monitoring sistem dan jaringan',
            ],
            staffFungsional: ['Tim Programmer dan Developer', 'Tim Network Administrator', 'Tim Database Administrator', 'Tim System Analyst'],
        },
        3: {
            title: 'Bidang Persandian, Pos dan Telekomunikasi',
            kepala: 'Nursari, S.Sos., MM',
            icon: '📱',
            color: 'orange',
            description:
                'Bidang yang mengelola keamanan informasi, layanan pos, dan infrastruktur telekomunikasi untuk mendukung komunikasi yang aman dan terpercaya.',
            tugas: [
                'Pengelolaan sistem keamanan informasi',
                'Implementasi kebijakan persandian',
                'Koordinasi layanan pos dan telekomunikasi',
                'Pengawasan frekuensi radio',
                'Sertifikasi keamanan sistem',
            ],
            magangTasks: [
                'Audit keamanan sistem informasi',
                'Implementasi protokol keamanan',
                'Monitoring jaringan telekomunikasi',
                'Dokumentasi kebijakan keamanan',
                'Testing vulnerability sistem',
                'Penelitian teknologi keamanan terbaru',
            ],
            staffFungsional: ['Helman Fatria Gautama, S.E. - Sandiman Ahli Muda', 'M. Ihsan Arisandi, S.H. - Sandiman Ahli Muda'],
        },
        4: {
            title: 'Bidang Data dan Statistik',
            kepala: 'Donny, S.H',
            icon: '📊',
            color: 'teal',
            description:
                'Bidang yang mengelola, menganalisis, dan menyajikan data statistik untuk mendukung pengambilan keputusan berbasis data dalam pemerintahan.',
            tugas: [
                'Pengumpulan dan validasi data',
                'Analisis statistik dan big data',
                'Pembuatan dashboard dan visualisasi',
                'Riset dan survei masyarakat',
                'Pengelolaan data warehouse',
            ],
            magangTasks: [
                'Analisis data dengan tools seperti Excel, Python, R',
                'Pembuatan dashboard dan visualisasi data',
                'Data cleaning dan preprocessing',
                'Riset dan survei lapangan',
                'Pembuatan laporan statistik',
                'Machine learning dan predictive analytics',
            ],
            staffFungsional: ['Isma Dewi, S.H., M.H. - Statistisi Ahli Muda', 'Nurqadryah, S.H., M.H. - Statistisi Ahli Muda'],
        },
    };

    const openModal = (bidangId: number) => {
        setSelectedBidang(bidangId);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedBidang(null);
        document.body.style.overflow = 'unset';
    };

    const handleOverlayScroll = (e: React.WheelEvent) => {
        e.preventDefault();
        if (modalContentRef.current) {
            modalContentRef.current.scrollTop += e.deltaY;
        }
    };
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
            <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h3 className="mb-4 text-4xl font-bold text-gray-800">Struktur Organisasi</h3>
                        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <p className="mt-4 text-lg text-gray-600">Pimpinan dan Struktur Organisasi Dinas Kominfo Kota Bandar Lampung</p>
                    </div>

                    {/* Walikota - Posisi Teratas dan Menonjol */}
                    <div className="mb-20">
                        <div className="mx-auto flex max-w-lg justify-center">
                            <div className="group shadow-3xl hover:shadow-4xl rounded-3xl border-4 border-amber-200 bg-gradient-to-br from-white via-amber-50 to-amber-100 p-12 text-center transition-all duration-500 hover:scale-105">
                                <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-2xl">
                                    <span className="text-5xl text-white">👑</span>
                                </div>
                                <div className="mb-4 inline-block rounded-full bg-amber-200 px-6 py-3 text-lg font-bold text-amber-700 shadow-lg">
                                    Walikota Bandar Lampung
                                </div>
                                <h4 className="mb-4 text-3xl font-bold text-gray-800">Hj. Eva Dwiana</h4>
                                <p className="text-xl font-semibold text-gray-600">Pimpinan Tertinggi Kota Bandar Lampung</p>
                            </div>
                        </div>
                    </div>

                    {/* Leadership - Pimpinan */}
                    <div className="mb-16">
                        <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Pimpinan Dinas</h4>
                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Kepala Dinas */}
                            <div className="group rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                    <span className="text-3xl text-white">👨‍💼</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
                                    Kepala Dinas
                                </div>
                                <h4 className="mb-2 text-xl font-bold text-gray-800">Rizky Agung Arisanto, S.T.</h4>
                                <p className="font-medium text-gray-600">Kepala Dinas Komunikasi dan Digital</p>
                            </div>
                            {/* Sekretaris */}
                            <div className="group rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50 p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                                    <span className="text-3xl text-white">👨‍💼</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-600">
                                    Sekretaris
                                </div>
                                <h4 className="mb-2 text-xl font-bold text-gray-800">Arienge Rahman, S.Kom., M.M</h4>
                                <p className="font-medium text-gray-600">Sekretaris Dinas</p>
                            </div>
                        </div>
                    </div>

                    {/* Sub Bagian Sekretariat dan Keuangan */}
                    <div className="mb-16">
                        <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Sub Bagian Sekretariat dan Keuangan</h4>
                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Sub Bagian Sekretariat */}
                            <div className="group rounded-xl border-2 border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-md">
                                    <span className="text-xl text-white">👥</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-600">
                                    Kasubbag Umum & Kepegawaian
                                </div>
                                <h5 className="mb-2 text-base font-bold text-gray-800">Saputra Tirta Mega, S.Kom, M.M.</h5>
                                <p className="text-xs leading-relaxed text-gray-600">Kepala Sub Bagian Umum dan Kepegawaian</p>
                            </div>
                            {/* Sub Bagian Keuangan */}
                            <div className="group rounded-xl border-2 border-violet-100 bg-gradient-to-br from-white to-violet-50 p-4 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-md">
                                    <span className="text-xl text-white">💰</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-600">
                                    Kasubbag Keuangan & Asset
                                </div>
                                <h5 className="mb-2 text-base font-bold text-gray-800">Asha Astriani, S.I.Kom, M.M.</h5>
                                <p className="text-xs leading-relaxed text-gray-600">Kepala Sub Bagian Keuangan dan Asset</p>
                            </div>
                        </div>
                    </div>

                    {/* Kepala Bidang */}
                    <div>
                        <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Kepala Bidang</h4>
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="group rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                                    <span className="text-2xl text-white">📢</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                    Informasi & Komunikasi
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Rudhy Hartono, SE., M.Si.</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Informasi dan Komunikasi Publik</p>
                            </div>
                            <div className="group rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-6 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
                                    <span className="text-2xl text-white">🏛️</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                                    E-Government
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Fachrizal, S.Kom, M.Kom.</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Pemberdayaan E-Government</p>
                            </div>
                            <div className="group rounded-2xl border-2 border-orange-100 bg-gradient-to-br from-white to-orange-50 p-6 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                                    <span className="text-2xl text-white">📱</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                                    Persandian & Telkom
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Nursari, S.Sos., MM</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Persandian, Pos dan Telekomunikasi</p>
                            </div>
                            <div className="group rounded-2xl border-2 border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-6 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg">
                                    <span className="text-2xl text-white">📊</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-600">
                                    Data & Statistik
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Donny, S.H</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Data dan Statistik</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bidang-bidang di Dinas Kominfo */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h3 className="mb-4 text-4xl font-bold text-gray-800">Bidang-bidang di Dinas Kominfo</h3>
                        <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <p className="mt-4 text-lg text-gray-600">Temukan peluang magang yang sesuai dengan minat dan keahlian Anda</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Bidang 1 */}
                        <div className="group hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📢</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Informasi dan Komunikasi Publik</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Rudhy Hartono, SE., M.Si.</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">✨</span> Hubungan Media & Pers
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✨</span> Publikasi & Dokumentasi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">✨</span> Konten Kreatif
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => openModal(1)}
                                    className="group/btn inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
                                >
                                    <span>Lihat Peluang Magang</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Bidang 2 */}
                        <div className="group hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">🏛️</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Pemberdayaan E-Government</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Fachrizal, S.Kom, M.Kom.</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">🚀</span> Pengembangan Sistem
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">🚀</span> Infrastruktur TI
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">🚀</span> Aplikasi Digital
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => openModal(2)}
                                    className="group/btn inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
                                >
                                    <span>Lihat Peluang Magang</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Bidang 3 */}
                        <div className="group hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📱</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Persandian, Pos dan Telekomunikasi</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Nursari, S.Sos., MM</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">🔒</span> Keamanan Informasi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">🔒</span> Persandian & Enkripsi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">🔒</span> Telekomunikasi
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => openModal(3)}
                                    className="group/btn inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
                                >
                                    <span>Lihat Peluang Magang</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Bidang 4 */}
                        <div className="group hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📊</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Data dan Statistik</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Donny, S.H</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">📈</span> Analisis Big Data
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">📈</span> Visualisasi Data
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">📈</span> Machine Learning
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => openModal(4)}
                                    className="group/btn inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
                                >
                                    <span>Lihat Peluang Magang</span>
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal Detail Bidang */}
            {selectedBidang && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={closeModal}
                    onWheel={handleOverlayScroll}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <div ref={modalContentRef} className="scrollbar-hide max-h-[90vh] overflow-y-auto">
                            {/* Header Modal */}
                            <div
                                className={`bg-gradient-to-r ${
                                    selectedBidang === 1
                                        ? 'from-blue-500 to-purple-600'
                                        : selectedBidang === 2
                                          ? 'from-purple-500 to-indigo-600'
                                          : selectedBidang === 3
                                            ? 'from-orange-500 to-red-500'
                                            : 'from-teal-500 to-cyan-600'
                                } p-8 text-white`}
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="flex items-start space-x-6">
                                    <div className="text-8xl">{bidangData[selectedBidang].icon}</div>
                                    <div>
                                        <h2 className="mb-2 text-3xl font-bold">{bidangData[selectedBidang].title}</h2>
                                        <p className="text-xl opacity-90">Kepala Bidang: {bidangData[selectedBidang].kepala}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Modal */}
                            <div className="p-8">
                                {/* Deskripsi Bidang */}
                                <div className="mb-8">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-800">Tentang Bidang</h3>
                                    <p className="text-lg leading-relaxed text-gray-600">{bidangData[selectedBidang].description}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                    {/* Tugas dan Tanggung Jawab */}
                                    <div className="rounded-2xl bg-gray-50 p-6">
                                        <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                            <span className="mr-3 text-2xl">🎯</span>
                                            Tugas dan Tanggung Jawab
                                        </h4>
                                        <ul className="space-y-3">
                                            {bidangData[selectedBidang].tugas.map((tugas, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700">{tugas}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Staff Fungsional */}
                                    <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 p-6">
                                        <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                            <span className="mr-3 text-2xl">👥</span>
                                            Staff Fungsional
                                        </h4>
                                        <ul className="space-y-3">
                                            {bidangData[selectedBidang].staffFungsional.map((staff, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm font-semibold text-yellow-600">
                                                        👤
                                                    </span>
                                                    <span className="text-sm text-gray-700">{staff}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Peluang Magang */}
                                    <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                                        <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                            <span className="mr-3 text-2xl">🚀</span>
                                            Peluang Magang
                                        </h4>
                                        <ul className="space-y-3">
                                            {bidangData[selectedBidang].magangTasks.map((task, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                                                        ✓
                                                    </span>
                                                    <span className="text-gray-700">{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center">
                                    <h4 className="mb-3 text-xl font-bold text-gray-800">Tertarik Magang di Bidang Ini?</h4>
                                    <p className="mb-4 text-gray-600">
                                        Bergabunglah dengan tim kami dan kembangkan kemampuan Anda di bidang yang menarik!
                                    </p>
                                    <a
                                        href="/daftar-magang"
                                        className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <span>Daftar Magang Sekarang</span>
                                        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Beranda;
