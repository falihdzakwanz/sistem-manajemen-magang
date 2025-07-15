import Layout from '@/components/Layout';
import { useRef, useState, useEffect } from 'react';

interface BerandaContentData {
    strukturOrganisasi: Array<{
        id: number;
        key: string;
        title: string;
        description: string;
        photo_url: string | null;
    }>;
    bidangData: Array<{
        id: number;
        key: string;
        title: string;
        description: string;
        data: {
            kepala: string;
            icon: string;
            color: string;
            tugas: string[];
            magangTasks: string[];
            staffFungsional: string[];
        };
    }>;
}

const Beranda = () => {
    const [selectedBidang, setSelectedBidang] = useState<number | null>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [berandaContent, setBerandaContent] = useState<BerandaContentData | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch beranda content from API
    useEffect(() => {
        const fetchBerandaContent = async () => {
            try {
                const response = await fetch('/api/beranda-content');
                const data = await response.json();
                setBerandaContent(data);
            } catch (error) {
                console.error('Error fetching beranda content:', error);
                // Fallback to default static data if API fails
                setBerandaContent(getDefaultBerandaData());
            } finally {
                setLoading(false);
            }
        };

        fetchBerandaContent();
    }, []);

    // Default static data sebagai fallback
    const getDefaultBerandaData = (): BerandaContentData => ({
        strukturOrganisasi: [
            {
                id: 1,
                key: 'kepala_dinas',
                title: 'Rizky Agung Arisanto, S.T.',
                description: 'Kepala Dinas Komunikasi dan Informatika',
                photo_url: null
            },
            {
                id: 2,
                key: 'sekretaris',
                title: 'Arienge Rahman, S.Kom., M.M',
                description: 'Sekretaris Dinas Komunikasi dan Informatika',
                photo_url: null
            }
        ],
        bidangData: [
            {
                id: 1,
                key: 'bidang_informasi',
                title: 'Bidang Informasi dan Komunikasi Publik',
                description: 'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Informasi dan Komunikasi Publik, bertanggung jawab kepada Kepala Dinas.',
                data: {
                    kepala: 'Rudhy Hartono, SE., M.Si.',
                    icon: '📢',
                    color: 'blue',
                    tugas: [
                        'Perumusan kebijakan di bidang Informasi dan Komunikasi Publik',
                        'Menyusun program dan model pelayanan informasi dan kehumasan',
                        'Menganalisis konten media terpilih dan isu publik',
                        'Memberikan konsultasi, advokasi, dan negosiasi pelayanan informasi',
                        'Mengevaluasi penyelenggaraan konferensi pers dan seminar',
                        'Mengembangkan standar dan sistem layanan informasi dan kehumasan',
                        'Pengawasan, pembinaan, dan pengendalian kegiatan Informasi dan Komunikasi Publik',
                        'Pelaksanaan koordinasi dan kerjasama antar lembaga/instansi',
                        'Mengelola Laporan Masyarakat melalui SP4N LAPOR',
                    ],
                    magangTasks: [
                        'Membantu pembuatan konten media sosial dan publikasi',
                        'Dokumentasi kegiatan dan acara dinas',
                        'Penulisan artikel dan berita untuk website',
                        'Desain grafis untuk publikasi dan media',
                        'Editing video dan foto dokumentasi',
                        'Riset dan analisis media serta isu publik',
                        'Membantu pengelolaan pengaduan masyarakat melalui SP4N LAPOR',
                        'Bantuan dalam persiapan konferensi pers dan seminar',
                    ],
                    staffFungsional: [
                        'Farida Herawati, S.E. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                        'DRS. Joko Pratikno, M.M. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                        'Mirda Novitasari, SH, MH - Jabatan Fungsional Pranata Hubungan Masyarakat',
                    ]
                }
            }
        ]
    });

    // Convert beranda content to the format expected by the rest of the component
    const bidangData: Record<number, any> = {};
    if (berandaContent) {
        berandaContent.bidangData.forEach((bidang, index) => {
            bidangData[index + 1] = {
                title: bidang.title,
                kepala: bidang.data.kepala,
                icon: bidang.data.icon,
                color: bidang.data.color,
                description: bidang.description,
                tugas: bidang.data.tugas,
                magangTasks: bidang.data.magangTasks,
                staffFungsional: bidang.data.staffFungsional,
            };
        });
    }

    // Get struktur organisasi data
    const getStrukturData = (key: string) => {
        if (!berandaContent) return null;
        return berandaContent.strukturOrganisasi.find(item => item.key === key);
    };

    const kepalaDinas = getStrukturData('kepala_dinas');
    const sekretaris = getStrukturData('sekretaris');
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
                'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Informasi dan Komunikasi Publik, bertanggung jawab kepada Kepala Dinas.',
            tugas: [
                'Perumusan kebijakan di bidang Informasi dan Komunikasi Publik',
                'Menyusun program dan model pelayanan informasi dan kehumasan',
                'Menganalisis konten media terpilih dan isu publik',
                'Memberikan konsultasi, advokasi, dan negosiasi pelayanan informasi',
                'Mengevaluasi penyelenggaraan konferensi pers dan seminar',
                'Mengembangkan standar dan sistem layanan informasi dan kehumasan',
                'Pengawasan, pembinaan, dan pengendalian kegiatan Informasi dan Komunikasi Publik',
                'Pelaksanaan koordinasi dan kerjasama antar lembaga/instansi',
                'Mengelola Laporan Masyarakat melalui SP4N LAPOR',
            ],
            magangTasks: [
                'Membantu pembuatan konten media sosial dan publikasi',
                'Dokumentasi kegiatan dan acara dinas',
                'Penulisan artikel dan berita untuk website',
                'Desain grafis untuk publikasi dan media',
                'Editing video dan foto dokumentasi',
                'Riset dan analisis media serta isu publik',
                'Membantu pengelolaan pengaduan masyarakat melalui SP4N LAPOR',
                'Bantuan dalam persiapan konferensi pers dan seminar',
            ],
            staffFungsional: [
                'Farida Herawati, S.E. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                'DRS. Joko Pratikno, M.M. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                'Mirda Novitasari, SH, MH - Jabatan Fungsional Pranata Hubungan Masyarakat',
            ],
        },
        2: {
            title: 'Bidang Pemberdayaan E-Government',
            kepala: 'Fachrizal, S.Kom, M.Kom.',
            icon: '🏛️',
            color: 'purple',
            description:
                'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Pemberdayaan E-Government, meliputi penyelenggaraan sistem dan layanan pemerintahan secara elektronik berbasis Teknologi Informasi dan Komunikasi.',
            tugas: [
                'Perumusan kebijakan di bidang pemberdayaan E-Government',
                'Analisis dampak teknologi informasi dan tren perubahan strategi pemerintah',
                'Menyusun kerangka kerja strategi teknologi informasi',
                'Analisis kesenjangan dan roadmap enterprise architecture',
                'Menyusun dan mengkaji tata kelola teknologi informasi',
                'Menyusun SOP untuk information technology service management',
                'Monitoring dan evaluasi ketersediaan layanan teknologi informasi',
                'Menyusun kebijakan data, standar data, dan prosedur pengelolaan data',
                'Menyusun arsitektur integrasi data dan kebijakan keamanan data',
                'Analisis data dan evaluasi audit teknologi informasi',
                'Perancangan dan pengembangan E-Government untuk Smart City Bandar Lampung',
                'Melaksanakan Tata Kelola SPBE (Sistem Pemerintahan Berbasis Elektronik)',
            ],
            magangTasks: [
                'Pengembangan website dan aplikasi pemerintahan',
                'Testing dan quality assurance sistem E-Government',
                'Dokumentasi sistem dan database pemerintahan',
                'Pemeliharaan hardware dan software SPBE',
                'Backup dan recovery data pemerintahan',
                'Monitoring sistem dan jaringan E-Government',
                'Membantu analisis enterprise architecture',
                'Riset teknologi untuk Smart City Bandar Lampung',
                'Dokumentasi SOP dan tata kelola TI',
                'Membantu audit teknologi informasi',
            ],
            staffFungsional: ['Hemalinda Suri, S.STP, M.Si - Jabatan Fungsional Pranata Komputer Ahli Muda'],
        },
        3: {
            title: 'Bidang Persandian, Keamanan Informasi dan Siber',
            kepala: 'Nursari, S.Sos., MM',
            icon: '📱',
            color: 'orange',
            description:
                'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Persandian, Keamanan Informasi dan Siber, bertanggung jawab kepada Kepala Dinas dalam mengamankan informasi rahasia dan infrastruktur siber.',
            tugas: [
                'Perumusan kebijakan di bidang Persandian, Keamanan Informasi dan Siber',
                'Analisis tren Persandian, Keamanan Informasi dan Siber',
                'Kajian kebijakan Persandian, Keamanan Informasi dan Siber',
                'Evaluasi norma, standar, prosedur, kriteria (NSPK) di bidang Persandian',
                'Evaluasi penanggulangan dan pemulihan insiden Keamanan Siber',
                'Evaluasi implementasi Persandian, Keamanan Informasi dan Siber',
                'Desain algoritma kriptografi dan manajemen kunci kriptografi',
                'Pengkajian aspek kriptografis/manajemen kunci perangkat keamanan',
                'Pelaksanaan kebijakan persandian, Keamanan Siber dan Keamanan Informasi',
                'Penentuan standar Persandian dan Keamanan Informasi di Pemerintah Kota',
                'Pengawasan, pembinaan, dan pengendalian kegiatan Persandian dan Keamanan Siber',
                'Koordinasi dan kerjasama antar lembaga terkait Persandian dan Keamanan Siber',
            ],
            magangTasks: [
                'Audit keamanan sistem informasi dan infrastruktur siber',
                'Implementasi protokol keamanan dan enkripsi data',
                'Monitoring jaringan dan deteksi ancaman siber',
                'Dokumentasi kebijakan keamanan informasi dan prosedur NSPK',
                'Testing vulnerability dan penetration testing sistem',
                'Penelitian teknologi kriptografi dan keamanan siber terbaru',
                'Pembuatan laporan insiden keamanan dan analisis forensik digital',
                'Membantu implementasi standar keamanan informasi ISO 27001',
                'Riset dan analisis tren ancaman siber global',
                'Membantu pelatihan awareness keamanan informasi untuk pegawai',
            ],
            staffFungsional: [
                'Helman Fatria Gautama, S.E. - Jabatan Fungsional Sandiman Ahli Muda',
                'M. Ihsan Arisandi, S.H. - Jabatan Fungsional Sandiman Ahli Muda',
            ],
        },
        4: {
            title: 'Bidang Statistik dan Data Elektronik',
            kepala: 'Donny Diaz Rizaldy Praja, SH., MH.',
            icon: '📊',
            color: 'teal',
            description:
                'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Data dan Statistik, bertanggung jawab kepada Kepala Dinas dalam menghasilkan data yang akurat, mutakhir, terpadu, dan dapat dipertanggungjawabkan.',
            tugas: [
                'Perumusan kebijakan di bidang Data dan Statistik',
                'Merancang dan membuat pedoman pengolahan kegiatan statistik untuk validitas data',
                'Memeriksa tabel/grafik hasil kegiatan statistik tingkat nasional',
                'Menyusun publikasi dan ringkasan eksekutif statistik tingkat nasional',
                'Memberikan konsultasi statistik dan pengarahan penyusunan statistik kelembagaan',
                'Melakukan penyebarluasan hasil pengumpulan data statistik',
                'Memberikan bimbingan penuh kader statistisi sampai tingkat pascasarjana',
                'Pelaksanaan kebijakan serta kewenangan di bidang Data dan Statistik',
                'Pengawasan, pembinaan dan pengendalian Data dan Statistik',
                'Koordinasi dan kerjasama antar lembaga/instansi terkait Data dan Statistik',
                'Menangani Statistik Sektoral bidang komunikasi dan informatika',
                'Melaksanakan Satu Data Indonesia (SDI)',
                'Monitoring, evaluasi, dan pelaporan terhadap tugas dan fungsi bidang',
            ],
            magangTasks: [
                'Analisis data dengan tools seperti Excel, SPSS, Python, dan R',
                'Pembuatan dashboard dan visualisasi data statistik',
                'Data cleaning, preprocessing, dan validasi data',
                'Riset dan survei lapangan untuk pengumpulan data',
                'Pembuatan laporan statistik dan ringkasan eksekutif',
                'Machine learning dan predictive analytics untuk analisis data',
                'Dokumentasi metodologi pengolahan statistik',
                'Membantu implementasi Satu Data Indonesia (SDI)',
                'Pengembangan sistem informasi statistik sektoral',
                'Membantu penyusunan publikasi dan infografis statistik',
            ],
            staffFungsional: [
                'Lisma Dewi, S.H., M.H. - Jabatan Fungsional Statistisi Ahli Muda',
                'Nurqadryah, S.H., M.H. - Jabatan Fungsional Statistisi Ahli Muda',
            ],
        },
        5: {
            title: 'Kesekretariatan',
            kepala: 'Arienge Rahman, S.Kom., M.M',
            icon: '🏢',
            color: 'indigo',
            description:
                'Bagian yang melaksanakan tugas kesekretariatan dinas, mengelola administrasi, koordinasi antar bidang, serta pengelolaan keuangan dan aset.',
            tugas: [
                'Administrasi dan tata usaha',
                'Koordinasi kegiatan antar bidang',
                'Pengelolaan arsip dan dokumen',
                'Pelayanan administrasi kepegawaian',
                'Pengelolaan keuangan dan aset',
                'Koordinasi dengan instansi lain',
            ],
            magangTasks: [
                'Membantu administrasi surat menyurat',
                'Pengarsipan dokumen dan berkas',
                'Entry data administrasi',
                'Membantu pelayanan publik',
                'Dokumentasi kegiatan dinas',
                'Koordinasi rapat dan acara',
                'Pembuatan laporan administratif',
                'Bantuan dalam pengelolaan inventaris',
            ],
            staffFungsional: [
                'Yoranda Tiara Sati, S.STP - Kepala Sub Bagian Umum dan Kepegawaian',
                'Asha Astriani, S.I.Kom, M.M. - Kepala Sub Bagian Keuangan dan Aset',
                'Yesi Herawati, S.Sos, MM. - Jabatan Fungsional Perencana Ahli Muda',
            ],
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
                                Informatika Kota Bandar Lampung
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed opacity-90">
                                Dinas Komunikasi dan Informatika Kota Bandar Lampung berkomitmen untuk memberikan pelayanan terbaik dalam bidang
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

                    {/* Leadership - Pimpinan */}
                    <div className="mb-16">
                        <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Pimpinan Dinas</h4>

                        {/* Kepala Dinas - Posisi Utama */}
                        <div className="mb-12">
                            <div className="mx-auto flex max-w-md justify-center">
                                <div className="rounded-3xl border-4 border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-10 text-center shadow-2xl">
                                    <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                                        <span className="text-4xl text-white">👨‍💼</span>
                                    </div>
                                    <div className="mb-3 inline-block rounded-full bg-blue-200 px-6 py-2 text-base font-bold text-blue-700 shadow-md">
                                        Kepala Dinas
                                    </div>
                                    <h4 className="mb-3 text-2xl font-bold text-gray-800">Rizky Agung Arisanto, S.T.</h4>
                                    <p className="text-lg font-semibold text-gray-600">Kepala Dinas Komunikasi dan Informatika</p>
                                </div>
                            </div>
                        </div>

                        {/* Kesekretariatan */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Kesekretariatan</h4>

                            {/* Sekretaris - Posisi Bawahan */}
                            <div>
                                <div className="mx-auto flex max-w-sm justify-center">
                                    <div className="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50 p-8 text-center shadow-xl">
                                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                                            <span className="text-3xl text-white">👨‍💼</span>
                                        </div>
                                        <div className="mb-2 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-600">
                                            Sekretaris
                                        </div>
                                        <h4 className="mb-2 text-xl font-bold text-gray-800">Arienge Rahman, S.Kom., M.M</h4>
                                        <p className="font-medium text-gray-600">Sekretaris Dinas Komunikasi dan Informatika</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sub Bagian Sekretariat dan Keuangan */}
                    <div className="mb-16">
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Sub Bagian Sekretariat */}
                            <div className="rounded-xl border-2 border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4 text-center shadow-lg">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-md">
                                    <span className="text-xl text-white">👥</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-600">
                                    Kasubbag Umum & Kepegawaian
                                </div>
                                <h5 className="mb-2 text-base font-bold text-gray-800">Yoranda Tiara Sati, S.STP</h5>
                                <p className="text-xs leading-relaxed text-gray-600">Kepala Sub Bagian Umum dan Kepegawaian</p>
                            </div>
                            {/* Sub Bagian Keuangan */}
                            <div className="rounded-xl border-2 border-violet-100 bg-gradient-to-br from-white to-violet-50 p-4 text-center shadow-lg">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-md">
                                    <span className="text-xl text-white">💰</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-600">
                                    Kasubbag Keuangan & Asset
                                </div>
                                <h5 className="mb-2 text-base font-bold text-gray-800">Asha Astriani, S.I.Kom, M.M.</h5>
                                <p className="text-xs leading-relaxed text-gray-600">Kepala Sub Bagian Keuangan dan Asset</p>
                            </div>
                            {/* Jabatan Fungsional Perencana */}
                            <div className="rounded-xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-4 text-center shadow-lg">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-md">
                                    <span className="text-xl text-white">📋</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-600">
                                    Perencana Ahli Muda
                                </div>
                                <h5 className="mb-2 text-base font-bold text-gray-800">Yesi Herawati, S.Sos, MM.</h5>
                                <p className="text-xs leading-relaxed text-gray-600">Jabatan Fungsional Perencana Ahli Muda</p>
                            </div>
                        </div>
                    </div>

                    {/* Kepala Bidang */}
                    <div>
                        <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Kepala Bidang</h4>
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                                    <span className="text-2xl text-white">📢</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                    Informasi & Komunikasi
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Rudhy Hartono, SE., M.Si.</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Informasi dan Komunikasi Publik</p>
                            </div>
                            <div className="rounded-2xl border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50 p-6 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
                                    <span className="text-2xl text-white">🏛️</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                                    E-Government
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Fachrizal, S.Kom, M.Kom.</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Pemberdayaan E-Government</p>
                            </div>
                            <div className="rounded-2xl border-2 border-orange-100 bg-gradient-to-br from-white to-orange-50 p-6 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                                    <span className="text-2xl text-white">📱</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                                    Persandian & Keamanan Siber
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Nursari, S.Sos., MM</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Persandian, Keamanan Informasi dan Siber</p>
                            </div>
                            <div className="rounded-2xl border-2 border-cyan-100 bg-gradient-to-br from-white to-cyan-50 p-6 text-center shadow-xl">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg">
                                    <span className="text-2xl text-white">📊</span>
                                </div>
                                <div className="mb-2 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-600">
                                    Data & Statistik
                                </div>
                                <h5 className="mb-3 text-lg font-bold text-gray-800">Donny Diaz Rizaldy Praja, SH., MH.</h5>
                                <p className="text-sm leading-relaxed text-gray-600">Kepala Bidang Statistik dan Data Elektronik</p>
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

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Kesekretariatan */}
                        <div
                            onClick={() => openModal(5)}
                            className="group hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">🏢</div>
                                <h4 className="mb-4 text-2xl font-bold">Kesekretariatan</h4>
                                <p className="mb-4 text-lg opacity-90">Sekretaris: Arienge Rahman, S.Kom., M.M</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">📋</span> Administrasi & Tata Usaha
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">🤝</span> Koordinasi Antar Bidang
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">�</span> Pengelolaan Keuangan & Aset
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(5);
                                    }}
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

                        {/* Bidang 1 */}
                        <div
                            onClick={() => openModal(1)}
                            className="group hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📢</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Informasi dan Komunikasi Publik</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Rudhy Hartono, SE., M.Si.</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">📋</span> Perumusan Kebijakan
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">📺</span> Analisis Media & Isu Publik
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">📞</span> Layanan Informasi & Kehumasan
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(1);
                                    }}
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
                        <div
                            onClick={() => openModal(2)}
                            className="group hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">🏛️</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Pemberdayaan E-Government</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Fachrizal, S.Kom, M.Kom.</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">🏛️</span> SPBE dan Smart City
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">�</span> Layanan Digital
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">⚡</span> Inovasi Teknologi
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(2);
                                    }}
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
                        <div
                            onClick={() => openModal(3)}
                            className="group hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📱</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Persandian, Keamanan Informasi dan Siber</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Nursari, S.Sos., MM</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">�</span> Persandian & Kriptografi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">�️</span> Keamanan Informasi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">⚡</span> Keamanan Siber
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(3);
                                    }}
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
                        <div
                            onClick={() => openModal(4)}
                            className="group hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="mb-6 text-6xl">📊</div>
                                <h4 className="mb-4 text-2xl font-bold">Bidang Statistik dan Data Elektronik</h4>
                                <p className="mb-4 text-lg opacity-90">Kepala Bidang: Donny Diaz Rizaldy Praja, SH., MH.</p>
                                <div className="mb-6">
                                    <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <span className="mr-2">�</span> Statistik Sektoral
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">�️</span> Satu Data Indonesia
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2">📈</span> Analisis Data
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(4);
                                    }}
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
                                            : selectedBidang === 4
                                              ? 'from-teal-500 to-cyan-600'
                                              : 'from-indigo-500 to-purple-600'
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
