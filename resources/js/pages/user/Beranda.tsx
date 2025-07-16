import { IconDisplay } from '@/components/IconPicker';
import Layout from '@/components/Layout';
import { BarChart3, Building2, Megaphone, Rocket, Shield, Target, User, Users, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

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
                if (!response.ok) {
                    throw new Error('Failed to fetch beranda content');
                }
                const data = await response.json();
                setBerandaContent(data);
            } catch (error) {
                console.error('Error fetching beranda content:', error);
                // Set empty content instead of fallback
                setBerandaContent({
                    strukturOrganisasi: [],
                    bidangData: [],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBerandaContent();
    }, []);

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
    const kasubagUmum = getStrukturData('kasubag_umum');
    const kasubagKeuangan = getStrukturData('kasubag_keuangan');
    const perencanaAhliMuda = getStrukturData('perencana_ahli_muda');
    const kabidInformasi = getStrukturData('kabid_informasi');
    const kabidEgovernment = getStrukturData('kabid_egovernment');
    const kabidKeamanan = getStrukturData('kabid_keamanan');
    const kabidStatistik = getStrukturData('kabid_statistik');

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
                                            <User className="h-12 w-12 text-white" />
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
                                                <User className="h-10 w-10 text-white" />
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

                        {/* Sub Bagian dan Jabatan Fungsional */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Sub Bagian dan Jabatan Fungsional</h4>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Kasubbag Umum Dan Kepegawaian */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-lg">
                                        {kasubagUmum?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img src={kasubagUmum.photo_url} alt={kasubagUmum.title} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        {!kasubagUmum?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                                <User className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                            Sub Bagian
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">{kasubagUmum?.title || 'Yoranda Tiara Sati, S.STP'}</h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kasubagUmum?.description || 'Kasubbag Umum Dan Kepegawaian'}
                                        </p>
                                    </div>
                                </div>

                                {/* Kasubbag Keuangan Dan Aset */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-lg">
                                        {kasubagKeuangan?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img
                                                    src={kasubagKeuangan.photo_url}
                                                    alt={kasubagKeuangan.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {!kasubagKeuangan?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                                <User className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                            Sub Bagian
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">
                                            {kasubagKeuangan?.title || 'Asha Astriani, S.I.Kom, M.M.'}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kasubagKeuangan?.description || 'Kasubbag Keuangan Dan Aset'}
                                        </p>
                                    </div>
                                </div>

                                {/* Jabatan Fungsional Perencana Ahli Muda */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 text-center shadow-lg">
                                        {perencanaAhliMuda?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img
                                                    src={perencanaAhliMuda.photo_url}
                                                    alt={perencanaAhliMuda.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {!perencanaAhliMuda?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
                                                <User className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
                                            Jabatan Fungsional
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">
                                            {perencanaAhliMuda?.title || 'Yesi Herawati, S.Sos, MM.'}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {perencanaAhliMuda?.description || 'Jabatan Fungsional Perencana Ahli Muda'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kepala Bidang */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Kepala Bidang</h4>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {/* Kabid Informasi dan Komunikasi Publik */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 text-center shadow-lg">
                                        {kabidInformasi?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img
                                                    src={kabidInformasi.photo_url}
                                                    alt={kabidInformasi.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {!kabidInformasi?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                                                <Megaphone className="h-10 w-10 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                            Bidang 1
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">
                                            {kabidInformasi?.title || 'Rudhy Hartono, SE., M.Si.'}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kabidInformasi?.description || 'Kepala Bidang Informasi dan Komunikasi Publik'}
                                        </p>
                                    </div>
                                </div>

                                {/* Kabid Pemberdayaan E-Government */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50 p-6 text-center shadow-lg">
                                        {kabidEgovernment?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img
                                                    src={kabidEgovernment.photo_url}
                                                    alt={kabidEgovernment.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {!kabidEgovernment?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                                                <Building2 className="h-10 w-10 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                                            Bidang 2
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">
                                            {kabidEgovernment?.title || 'Fachrizal, S.Kom, M.Kom.'}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kabidEgovernment?.description || 'Kepala Bidang Pemberdayaan E-Government'}
                                        </p>
                                    </div>
                                </div>

                                {/* Kabid Persandian, Keamanan Informasi dan Siber */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-red-100 bg-gradient-to-br from-white to-red-50 p-6 text-center shadow-lg">
                                        {kabidKeamanan?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img src={kabidKeamanan.photo_url} alt={kabidKeamanan.title} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        {!kabidKeamanan?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-md">
                                                <Shield className="h-10 w-10 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                                            Bidang 3
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">{kabidKeamanan?.title || 'Nursari, S.Sos., MM'}</h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kabidKeamanan?.description || 'Kepala Bidang Persandian, Keamanan Informasi dan Siber'}
                                        </p>
                                    </div>
                                </div>

                                {/* Kabid Statistik dan Data Elektronik */}
                                <div className="mx-auto flex max-w-xs justify-center">
                                    <div className="rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 text-center shadow-lg">
                                        {kabidStatistik?.photo_url && (
                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                <img
                                                    src={kabidStatistik.photo_url}
                                                    alt={kabidStatistik.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        {!kabidStatistik?.photo_url && (
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-md">
                                                <BarChart3 className="h-10 w-10 text-white" />
                                            </div>
                                        )}
                                        <div className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
                                            Bidang 4
                                        </div>
                                        <h4 className="mb-1 text-lg font-bold text-gray-800">
                                            {kabidStatistik?.title || 'Donny Diaz Rizaldy Praja, SH., MH.'}
                                        </h4>
                                        <p className="text-sm font-medium text-gray-600">
                                            {kabidStatistik?.description || 'Kepala Bidang Statistik dan Data Elektronik'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bidang */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Bidang Penempatan</h4>

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
                                                onClick={() => openModal(parseInt(bidangId))}
                                            >
                                                <div className="text-center">
                                                    <div className="mb-4">
                                                        <IconDisplay iconName={bidang.icon} className="mx-auto h-12 w-12 text-white" />
                                                    </div>
                                                    <h4 className="mb-4 text-2xl font-bold">{bidang.title}</h4>
                                                    <p className="mb-4 text-lg opacity-90">Kepala Bidang: {bidang.kepala}</p>
                                                    <div className="mb-6">
                                                        <h5 className="mb-3 text-lg font-semibold">Fokus Kerja:</h5>
                                                        <ul className="space-y-2 text-sm">
                                                            {bidang.tugas.slice(0, 3).map((tugas: string, index: number) => (
                                                                <li key={index} className="flex items-center">
                                                                    <Target className="mr-2 h-4 w-4 text-white/80" /> {tugas.substring(0, 50)}
                                                                    {tugas.length > 50 ? '...' : ''}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="group/btn inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30">
                                                        <span>Lihat Peluang Magang</span>
                                                        <svg
                                                            className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
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
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 rounded-full bg-white/20 p-2 text-white/80 transition-colors hover:bg-white/30 hover:text-white"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <div className="text-center">
                                <div className="mb-4">
                                    <IconDisplay iconName={bidangData[selectedBidang]?.icon || ''} className="mx-auto h-16 w-16 text-white" />
                                </div>
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
                                        <Target className="mr-3 h-6 w-6 text-blue-600" />
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
                                        <Users className="mr-3 h-6 w-6 text-amber-600" />
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
                                        <Rocket className="mr-3 h-6 w-6 text-green-600" />
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
