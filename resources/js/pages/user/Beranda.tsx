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
        data?: {
            category?: string;
        };
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
            category: string; // Added category field
            tugas: string[];
            magangTasks: string[];
            staffFungsional: string[];
        };
    }>;
}

const Beranda = () => {
    const [selectedBidang, setSelectedBidang] = useState<string | null>(null); // Changed from number to string
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

    // Get bidang data for modal
    const getSelectedBidangData = () => {
        if (!selectedBidang || !berandaContent) return null;
        return berandaContent.bidangData.find((bidang) => bidang.key === selectedBidang);
    };

    // Get struktur organisasi data with category grouping
    const getStrukturData = (key: string) => {
        if (!berandaContent) return null;
        return berandaContent.strukturOrganisasi.find((item) => item.key === key);
    };

    // Group struktur organisasi by categories
    const getStrukturByCategory = (category: string) => {
        if (!berandaContent) return [];
        return berandaContent.strukturOrganisasi.filter((item) => {
            // Check if item has category in data field
            if (item.data && item.data.category === category) {
                return true;
            }

            // Fallback to key-based detection for existing items
            switch (category) {
                case 'sub_bagian':
                    return item.key.includes('kasubag');
                case 'jabatan_fungsional':
                    return item.key.includes('perencana') || item.key.includes('ahli');
                case 'kepala_bidang':
                    return item.key.includes('kabid');
                default:
                    return false;
            }
        });
    };

    // Get specific items (for backward compatibility)
    const kepalaDinas = getStrukturData('kepala_dinas');
    const sekretaris = getStrukturData('sekretaris');
    const kabidInformasi = getStrukturData('kabid_informasi');
    const kabidEgovernment = getStrukturData('kabid_egovernment');
    const kabidKeamanan = getStrukturData('kabid_keamanan');
    const kabidStatistik = getStrukturData('kabid_statistik');

    // Get dynamic categories
    const subBagianItems = getStrukturByCategory('sub_bagian');
    const jabatanFungsionalItems = getStrukturByCategory('jabatan_fungsional');
    const kepalaBidangItems = getStrukturByCategory('kepala_bidang');

    const openModal = (bidangKey: string) => {
        setSelectedBidang(bidangKey);
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
                                {/* Render Sub Bagian Items */}
                                {subBagianItems.map((item) => (
                                    <div key={item.id} className="mx-auto flex max-w-xs justify-center">
                                        <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-lg">
                                            <div className="flex flex-col items-center">
                                                {item.photo_url && (
                                                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                        <img src={item.photo_url} alt={item.title} className="h-full w-full object-cover" />
                                                    </div>
                                                )}
                                                {!item.photo_url && (
                                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                                        <User className="h-10 w-10 text-white" />
                                                    </div>
                                                )}
                                                <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                                    Sub Bagian
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center">
                                                <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">{item.title}</h4>
                                                <p className="line-clamp-3 text-sm font-medium text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Render Jabatan Fungsional Items */}
                                {jabatanFungsionalItems.map((item) => (
                                    <div key={item.id} className="mx-auto flex max-w-xs justify-center">
                                        <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 text-center shadow-lg">
                                            <div className="flex flex-col items-center">
                                                {item.photo_url && (
                                                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                        <img src={item.photo_url} alt={item.title} className="h-full w-full object-cover" />
                                                    </div>
                                                )}
                                                {!item.photo_url && (
                                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-md">
                                                        <User className="h-10 w-10 text-white" />
                                                    </div>
                                                )}
                                                <div className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
                                                    Jabatan Fungsional
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-center">
                                                <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">{item.title}</h4>
                                                <p className="line-clamp-3 text-sm font-medium text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Show fallback for existing hardcoded items if no dynamic items found */}
                                {subBagianItems.length === 0 && jabatanFungsionalItems.length === 0 && (
                                    <>
                                        {/* Fallback Kasubbag Umum */}
                                        {getStrukturData('kasubag_umum') && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {getStrukturData('kasubag_umum')?.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={getStrukturData('kasubag_umum')!.photo_url!}
                                                                    alt={getStrukturData('kasubag_umum')!.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!getStrukturData('kasubag_umum')?.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                                                <User className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                                            Sub Bagian
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {getStrukturData('kasubag_umum')?.title || 'Yoranda Tiara Sati, S.STP'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {getStrukturData('kasubag_umum')?.description || 'Kasubbag Umum Dan Kepegawaian'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Kasubbag Keuangan */}
                                        {getStrukturData('kasubag_keuangan') && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-green-100 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {getStrukturData('kasubag_keuangan')?.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={getStrukturData('kasubag_keuangan')!.photo_url!}
                                                                    alt={getStrukturData('kasubag_keuangan')!.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!getStrukturData('kasubag_keuangan')?.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                                                                <User className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                                                            Sub Bagian
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {getStrukturData('kasubag_keuangan')?.title || 'Asha Astriani, S.I.Kom, M.M.'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {getStrukturData('kasubag_keuangan')?.description || 'Kasubbag Keuangan Dan Aset'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Perencana Ahli Muda */}
                                        {getStrukturData('perencana_ahli_muda') && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {getStrukturData('perencana_ahli_muda')?.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={getStrukturData('perencana_ahli_muda')!.photo_url!}
                                                                    alt={getStrukturData('perencana_ahli_muda')!.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!getStrukturData('perencana_ahli_muda')?.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-md">
                                                                <User className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
                                                            Jabatan Fungsional
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {getStrukturData('perencana_ahli_muda')?.title || 'Yesi Herawati, S.Sos, MM.'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {getStrukturData('perencana_ahli_muda')?.description ||
                                                                'Jabatan Fungsional Perencana Ahli Muda'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Kepala Bidang */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Kepala Bidang</h4>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {/* Render dynamic Kepala Bidang items */}
                                {kepalaBidangItems.map((item, index) => {
                                    // Dynamic color schemes for different items matching fallback structure
                                    const colorSchemes = [
                                        {
                                            border: 'blue-100',
                                            gradient: 'from-white to-blue-50',
                                            badge: 'blue-100',
                                            badgeText: 'blue-600',
                                            icon: 'from-blue-500 to-blue-600',
                                        },
                                        {
                                            border: 'purple-100',
                                            gradient: 'from-white to-purple-50',
                                            badge: 'purple-100',
                                            badgeText: 'purple-600',
                                            icon: 'from-purple-500 to-purple-600',
                                        },
                                        {
                                            border: 'red-100',
                                            gradient: 'from-white to-red-50',
                                            badge: 'red-100',
                                            badgeText: 'red-600',
                                            icon: 'from-red-500 to-red-600',
                                        },
                                        {
                                            border: 'teal-100',
                                            gradient: 'from-white to-teal-50',
                                            badge: 'teal-100',
                                            badgeText: 'teal-600',
                                            icon: 'from-teal-500 to-teal-600',
                                        },
                                        {
                                            border: 'green-100',
                                            gradient: 'from-white to-green-50',
                                            badge: 'green-100',
                                            badgeText: 'green-600',
                                            icon: 'from-green-500 to-green-600',
                                        },
                                        {
                                            border: 'indigo-100',
                                            gradient: 'from-white to-indigo-50',
                                            badge: 'indigo-100',
                                            badgeText: 'indigo-600',
                                            icon: 'from-indigo-500 to-indigo-600',
                                        },
                                    ];
                                    const colorScheme = colorSchemes[index % colorSchemes.length];

                                    return (
                                        <div key={item.id} className="mx-auto flex max-w-xs justify-center">
                                            <div
                                                className={`min-h-[280px] w-80 rounded-2xl border-2 border-${colorScheme.border} bg-gradient-to-br ${colorScheme.gradient} flex flex-col justify-between p-6 text-center shadow-lg`}
                                            >
                                                <div className="flex flex-col items-center">
                                                    {item.photo_url && (
                                                        <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                            <img src={item.photo_url} alt={item.title} className="h-full w-full object-cover" />
                                                        </div>
                                                    )}
                                                    {!item.photo_url && (
                                                        <div
                                                            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${colorScheme.icon} shadow-md`}
                                                        >
                                                            <User className="h-10 w-10 text-white" />
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`mb-2 inline-block rounded-full bg-${colorScheme.badge} px-3 py-1 text-xs font-semibold text-${colorScheme.badgeText}`}
                                                    >
                                                        Kepala Bidang {index + 1}
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-center">
                                                    <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">{item.title}</h4>
                                                    <p className="line-clamp-3 text-sm font-medium text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Show fallback for existing hardcoded items if no dynamic items found */}
                                {kepalaBidangItems.length === 0 && (
                                    <>
                                        {/* Fallback Kabid Informasi dan Komunikasi Publik */}
                                        {kabidInformasi && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {kabidInformasi.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={kabidInformasi.photo_url}
                                                                    alt={kabidInformasi.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!kabidInformasi.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                                                                <Megaphone className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                                            Kepala Bidang 1
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {kabidInformasi.title || 'Rudhy Hartono, SE., M.Si.'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {kabidInformasi.description || 'Kepala Bidang Informasi dan Komunikasi Publik'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Kabid Pemberdayaan E-Government */}
                                        {kabidEgovernment && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {kabidEgovernment.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={kabidEgovernment.photo_url}
                                                                    alt={kabidEgovernment.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!kabidEgovernment.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                                                                <Building2 className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                                                            Kepala Bidang 2
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {kabidEgovernment.title || 'Fachrizal, S.Kom, M.Kom.'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {kabidEgovernment.description || 'Kepala Bidang Pemberdayaan E-Government'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Kabid Persandian, Keamanan Informasi dan Siber */}
                                        {kabidKeamanan && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-red-100 bg-gradient-to-br from-white to-red-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {kabidKeamanan.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={kabidKeamanan.photo_url}
                                                                    alt={kabidKeamanan.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!kabidKeamanan.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-md">
                                                                <Shield className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                                                            Kepala Bidang 3
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {kabidKeamanan.title || 'Nursari, S.Sos., MM'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {kabidKeamanan.description || 'Kepala Bidang Persandian, Keamanan Informasi dan Siber'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Kabid Statistik dan Data Elektronik */}
                                        {kabidStatistik && (
                                            <div className="mx-auto flex max-w-xs justify-center">
                                                <div className="flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-teal-100 bg-gradient-to-br from-white to-teal-50 p-6 text-center shadow-lg">
                                                    <div className="flex flex-col items-center">
                                                        {kabidStatistik.photo_url && (
                                                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                                <img
                                                                    src={kabidStatistik.photo_url}
                                                                    alt={kabidStatistik.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {!kabidStatistik.photo_url && (
                                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-md">
                                                                <BarChart3 className="h-10 w-10 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="mb-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
                                                            Kepala Bidang 4
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-center">
                                                        <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">
                                                            {kabidStatistik.title || 'Donny Diaz Rizaldy Praja, SH., MH.'}
                                                        </h4>
                                                        <p className="line-clamp-3 text-sm font-medium text-gray-600">
                                                            {kabidStatistik.description || 'Kepala Bidang Statistik dan Data Elektronik'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Bidang */}
                        <div className="mb-16">
                            <h4 className="mb-10 text-center text-2xl font-bold text-gray-800">Bidang Penempatan</h4>

                            {/* Render all bidang in simple grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {berandaContent?.bidangData.map((bidang, index) => {
                                    // Get color based on bidang's stored color or fallback to color index
                                    const colorIndex = index % 6;

                                    // Define color classes based on stored color or use fallback
                                    let cardClasses = '';
                                    let iconClasses = '';
                                    let badgeClasses = '';
                                    let buttonClasses = '';

                                    // Use stored color if available, otherwise use index-based colors
                                    const colorMap: Record<string, number> = {
                                        orange: 0,
                                        blue: 1,
                                        purple: 2,
                                        green: 3,
                                        red: 4,
                                        indigo: 5,
                                        teal: 5,
                                        yellow: 4,
                                    };
                                    const finalColorIndex = colorMap[bidang.data.color] !== undefined ? colorMap[bidang.data.color] : colorIndex;

                                    switch (finalColorIndex) {
                                        case 0: // Orange
                                            cardClasses = 'border-orange-100 bg-gradient-to-br from-white to-orange-50';
                                            iconClasses = 'bg-gradient-to-br from-orange-500 to-orange-600';
                                            badgeClasses = 'bg-orange-100 text-orange-600';
                                            buttonClasses = 'bg-orange-100 text-orange-600';
                                            break;
                                        case 1: // Blue
                                            cardClasses = 'border-blue-100 bg-gradient-to-br from-white to-blue-50';
                                            iconClasses = 'bg-gradient-to-br from-blue-500 to-blue-600';
                                            badgeClasses = 'bg-blue-100 text-blue-600';
                                            buttonClasses = 'bg-blue-100 text-blue-600';
                                            break;
                                        case 2: // Purple
                                            cardClasses = 'border-purple-100 bg-gradient-to-br from-white to-purple-50';
                                            iconClasses = 'bg-gradient-to-br from-purple-500 to-purple-600';
                                            badgeClasses = 'bg-purple-100 text-purple-600';
                                            buttonClasses = 'bg-purple-100 text-purple-600';
                                            break;
                                        case 3: // Green
                                            cardClasses = 'border-green-100 bg-gradient-to-br from-white to-green-50';
                                            iconClasses = 'bg-gradient-to-br from-green-500 to-green-600';
                                            badgeClasses = 'bg-green-100 text-green-600';
                                            buttonClasses = 'bg-green-100 text-green-600';
                                            break;
                                        case 4: // Red
                                            cardClasses = 'border-red-100 bg-gradient-to-br from-white to-red-50';
                                            iconClasses = 'bg-gradient-to-br from-red-500 to-red-600';
                                            badgeClasses = 'bg-red-100 text-red-600';
                                            buttonClasses = 'bg-red-100 text-red-600';
                                            break;
                                        case 5: // Indigo
                                            cardClasses = 'border-indigo-100 bg-gradient-to-br from-white to-indigo-50';
                                            iconClasses = 'bg-gradient-to-br from-indigo-500 to-indigo-600';
                                            badgeClasses = 'bg-indigo-100 text-indigo-600';
                                            buttonClasses = 'bg-indigo-100 text-indigo-600';
                                            break;
                                        default:
                                            cardClasses = 'border-gray-100 bg-gradient-to-br from-white to-gray-50';
                                            iconClasses = 'bg-gradient-to-br from-gray-500 to-gray-600';
                                            badgeClasses = 'bg-gray-100 text-gray-600';
                                            buttonClasses = 'bg-gray-100 text-gray-600';
                                    }

                                    return (
                                        <div key={bidang.key} className="mx-auto flex max-w-xs justify-center">
                                            <div
                                                className={`flex min-h-[350px] w-80 cursor-pointer flex-col justify-between rounded-2xl border-2 ${cardClasses} p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                                                onClick={() => openModal(bidang.key)}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${iconClasses} shadow-md`}
                                                    >
                                                        <IconDisplay iconName={bidang.data.icon} className="h-10 w-10 text-white" />
                                                    </div>
                                                    {bidang.data.category && (
                                                        <div
                                                            className={`mb-2 inline-block rounded-full ${badgeClasses} px-3 py-1 text-xs font-semibold`}
                                                        >
                                                            {bidang.data.category}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col justify-center">
                                                    <h4 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">{bidang.title}</h4>
                                                    <p className="mb-3 text-sm font-medium text-gray-600">Kepala: {bidang.data.kepala}</p>
                                                    <p className="mb-3 line-clamp-2 text-xs text-gray-500">{bidang.description}</p>
                                                    <div className="text-xs text-gray-400">
                                                        {bidang.data.tugas.length} tugas • {bidang.data.magangTasks.length} kegiatan magang
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <div
                                                        className={`inline-flex items-center rounded-full ${buttonClasses} px-4 py-2 text-xs font-semibold transition-all duration-300 hover:scale-105`}
                                                    >
                                                        Lihat Detail
                                                        <svg
                                                            className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1"
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
            {selectedBidang && getSelectedBidangData() && (
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
                                    orange: 'from-orange-500 to-orange-600',
                                }[getSelectedBidangData()?.data.color || 'blue'] || 'from-blue-500 to-blue-600'
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
                                    <IconDisplay iconName={getSelectedBidangData()?.data.icon || ''} className="mx-auto h-16 w-16 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold">{getSelectedBidangData()?.title}</h2>
                                <p className="mt-2 text-xl opacity-90">Kepala Bidang: {getSelectedBidangData()?.data.kepala}</p>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div ref={modalContentRef} className="max-h-[60vh] overflow-y-auto p-8" style={{ scrollbarWidth: 'thin' }}>
                            {/* Deskripsi Bidang */}
                            <div className="mb-8">
                                <h3 className="mb-4 text-2xl font-bold text-gray-800">Tentang Bidang</h3>
                                <p className="text-lg leading-relaxed text-gray-600">{getSelectedBidangData()?.description}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* Tugas dan Tanggung Jawab */}
                                <div className="rounded-2xl bg-gray-50 p-6">
                                    <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                                        <Target className="mr-3 h-6 w-6 text-blue-600" />
                                        Tugas dan Tanggung Jawab
                                    </h4>
                                    <ul className="space-y-3">
                                        {getSelectedBidangData()?.data.tugas.map((tugas: string, index: number) => (
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
                                        {getSelectedBidangData()?.data.staffFungsional.map((staff: string, index: number) => (
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
                                        {getSelectedBidangData()?.data.magangTasks.map((task: string, index: number) => (
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
