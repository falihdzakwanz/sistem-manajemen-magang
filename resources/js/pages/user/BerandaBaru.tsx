import Layout from '@/components/Layout';
import { useEffect, useRef, useState } from 'react';

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
                photo_url: null,
            },
            {
                id: 2,
                key: 'sekretaris',
                title: 'Arienge Rahman, S.Kom., M.M',
                description: 'Sekretaris Dinas Komunikasi dan Informatika',
                photo_url: null,
            },
        ],
        bidangData: [
            {
                id: 1,
                key: 'bidang_informasi',
                title: 'Bidang Informasi dan Komunikasi Publik',
                description:
                    'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Informasi dan Komunikasi Publik, bertanggung jawab kepada Kepala Dinas.',
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
                    ],
                },
            },
            {
                id: 2,
                key: 'bidang_egovernment',
                title: 'Bidang Pemberdayaan E-Government',
                description:
                    'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Pemberdayaan E-Government, bertanggung jawab kepada Kepala Dinas.',
                data: {
                    kepala: 'Fachrizal, S.Kom, M.Kom.',
                    icon: '🏛️',
                    color: 'purple',
                    tugas: [
                        'Perumusan kebijakan di bidang Pemberdayaan E-Government',
                        'Menyusun pedoman dan standar operasional prosedur E-Government',
                        'Mengembangkan sistem informasi dan aplikasi pemerintahan',
                        'Memberikan konsultasi dan bimbingan teknis E-Government',
                        'Melakukan pengawasan dan evaluasi implementasi E-Government',
                        'Koordinasi integrasi sistem informasi antar SKPD',
                        'Pengembangan infrastruktur teknologi informasi pemerintahan',
                        'Pelaksanaan kebijakan serta kewenangan di bidang E-Government',
                        'Pengawasan, pembinaan dan pengendalian E-Government',
                    ],
                    magangTasks: [
                        'Pengembangan aplikasi web dan mobile government',
                        'Testing dan quality assurance sistem informasi',
                        'Dokumentasi sistem dan user manual',
                        'Membantu maintenance dan update aplikasi',
                        'Riset teknologi baru untuk E-Government',
                        'Pembuatan dashboard dan reporting sistem',
                        'Integrasi API antar sistem pemerintahan',
                        'Backup dan recovery data sistem',
                    ],
                    staffFungsional: [
                        'Dimas Indra Kusuma, S.Kom - Jabatan Fungsional Pranata Komputer Ahli Muda',
                        'Ridho Pratama, S.T. - Jabatan Fungsional Pranata Komputer Ahli Muda',
                    ],
                },
            },
        ],
    });

    // Convert beranda content to the format expected by the rest of the component
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
    > = {};
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
        return berandaContent.strukturOrganisasi.find((item) => item.key === key);
    };

    const kepalaDinas = getStrukturData('kepala_dinas');
    const sekretaris = getStrukturData('sekretaris');

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

    if (loading) {
        return (
            <Layout currentPage="beranda">
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Memuat konten...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout currentPage="beranda">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Sistem Manajemen <span className="text-yellow-300">Magang</span>
                            </h1>
                            <p className="mb-8 text-lg opacity-90 md:text-xl">
                                Dinas Komunikasi dan Informatika Kota Bandar Lampung menyediakan program magang yang komprehensif untuk mengembangkan
                                kemampuan mahasiswa di bidang teknologi informasi, komunikasi, dan pelayanan publik.
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
                                    {kepalaDinas?.photo_url && (
                                        <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full shadow-xl">
                                            <img src={kepalaDinas.photo_url} alt={kepalaDinas.title} className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    {!kepalaDinas?.photo_url && (
                                        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                                            <span className="text-4xl text-white">👨‍💼</span>
                                        </div>
                                    )}
                                    <div className="mb-3 inline-block rounded-full bg-blue-200 px-6 py-2 text-base font-bold text-blue-700 shadow-md">
                                        Kepala Dinas
                                    </div>
                                    <h4 className="mb-3 text-2xl font-bold text-gray-800">{kepalaDinas?.title || 'Rizky Agung Arisanto, S.T.'}</h4>
                                    <p className="text-lg font-semibold text-gray-600">
                                        {kepalaDinas?.description || 'Kepala Dinas Komunikasi dan Informatika'}
                                    </p>
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
                                        {sekretaris?.photo_url && (
                                            <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full shadow-lg">
                                                <img src={sekretaris.photo_url} alt={sekretaris.title} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        {!sekretaris?.photo_url && (
                                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                                                <span className="text-3xl text-white">👨‍💼</span>
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-600">
                                            Sekretaris
                                        </div>
                                        <h4 className="mb-2 text-xl font-bold text-gray-800">{sekretaris?.title || 'Arienge Rahman, S.Kom., M.M'}</h4>
                                        <p className="font-medium text-gray-600">
                                            {sekretaris?.description || 'Sekretaris Dinas Komunikasi dan Informatika'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bidang */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Bidang</h4>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                                {Object.entries(bidangData).map(([bidangId, bidang]) => {
                                    const colorClass =
                                        {
                                            blue: 'from-blue-500 to-blue-600',
                                            purple: 'from-purple-500 to-purple-600',
                                            green: 'from-green-500 to-green-600',
                                            red: 'from-red-500 to-red-600',
                                            yellow: 'from-yellow-500 to-yellow-600',
                                            indigo: 'from-indigo-500 to-indigo-600',
                                            teal: 'from-teal-500 to-teal-600',
                                        }[bidang.color] || 'from-blue-500 to-blue-600';

                                    return (
                                        <div key={bidangId} className="group relative">
                                            <div
                                                className={`cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br ${colorClass} hover:shadow-3xl p-8 text-white shadow-2xl transition-all duration-300 hover:scale-105`}
                                            >
                                                <div className="text-center">
                                                    <div className="mb-4 text-5xl">{bidang.icon}</div>
                                                    <h4 className="mb-4 text-2xl font-bold">{bidang.title}</h4>
                                                    <p className="mb-4 text-lg opacity-90">Kepala Bidang: {bidang.kepala}</p>
                                                    <div className="mb-6">
                                                        <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                                        <ul className="space-y-2 text-sm">
                                                            {bidang.tugas.slice(0, 3).map((tugas: string, index: number) => (
                                                                <li key={index} className="flex items-center">
                                                                    <span className="mr-2">🎯</span> {tugas.substring(0, 50)}
                                                                    {tugas.length > 50 ? '...' : ''}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openModal(parseInt(bidangId));
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
                                    );
                                })}
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
                    >
                        {/* Modal Header */}
                        <div
                            className={`bg-gradient-to-r ${
                                {
                                    blue: 'from-blue-500 to-blue-600',
                                    purple: 'from-purple-500 to-purple-600',
                                    green: 'from-green-500 to-green-600',
                                    red: 'from-red-500 to-red-600',
                                    yellow: 'from-yellow-500 to-yellow-600',
                                    indigo: 'from-indigo-500 to-indigo-600',
                                    teal: 'from-teal-500 to-teal-600',
                                }[bidangData[selectedBidang]?.color] || 'from-blue-500 to-blue-600'
                            } p-8 text-white`}
                        >
                            <button onClick={closeModal} className="absolute top-6 right-6 text-3xl text-white/80 transition-colors hover:text-white">
                                ×
                            </button>
                            <div className="text-center">
                                <div className="mb-4 text-6xl">{bidangData[selectedBidang]?.icon}</div>
                                <h2 className="text-3xl font-bold">{bidangData[selectedBidang]?.title}</h2>
                                <p className="mt-2 text-xl opacity-90">Kepala Bidang: {bidangData[selectedBidang]?.kepala}</p>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div ref={modalContentRef} className="max-h-[60vh] overflow-y-auto p-8" style={{ scrollbarWidth: 'thin' }}>
                            {/* Deskripsi Bidang */}
                            <div className="mb-8">
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">Tentang Bidang</h3>
                                <p className="text-lg leading-relaxed text-gray-600">{bidangData[selectedBidang]?.description}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* Tugas dan Tanggung Jawab */}
                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                        <span className="mr-3 text-2xl">🎯</span>
                                        Tugas dan Tanggung Jawab
                                    </h4>
                                    <ul className="space-y-3">
                                        {bidangData[selectedBidang]?.tugas.map((tugas: string, index: number) => (
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
                                        {bidangData[selectedBidang]?.staffFungsional.map((staff: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-sm font-semibold text-yellow-600">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700">{staff}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Kegiatan Magang */}
                                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                                    <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                        <span className="mr-3 text-2xl">🚀</span>
                                        Kegiatan Magang
                                    </h4>
                                    <ul className="space-y-3">
                                        {bidangData[selectedBidang]?.magangTasks.map((task: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-700">{task}</span>
                                            </li>
                                        ))}
                                    </ul>
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
