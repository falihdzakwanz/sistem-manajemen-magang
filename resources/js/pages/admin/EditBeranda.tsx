import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface StrukturOrganisasi {
    id: number;
    key: string;
    title: string;
    description: string;
    photo_url: string | null;
}

interface BidangData {
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
}

interface EditBerandaProps {
    strukturOrganisasi: StrukturOrganisasi[];
    bidangData: BidangData[];
}

export default function EditBeranda({ strukturOrganisasi = [], bidangData = [] }: EditBerandaProps) {
    const [activeTab, setActiveTab] = useState<'struktur' | 'bidang'>('struktur');
    const [editingItem, setEditingItem] = useState<StrukturOrganisasi | BidangData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Form data for struktur organisasi
    const [strukturForm, setStrukturForm] = useState({
        key: '',
        title: '',
        description: '',
        photo: null as File | null,
    });

    // Form data for bidang
    const [bidangForm, setBidangForm] = useState({
        key: '',
        title: '',
        description: '',
        data: {
            kepala: '',
            icon: '',
            color: '',
            tugas: [''],
            magangTasks: [''],
            staffFungsional: [''],
        },
    });

    const handleBack = () => {
        router.get('/dashboard-admin');
    };

    const openEditStruktur = (item: StrukturOrganisasi) => {
        setEditingItem(item);
        setStrukturForm({
            key: item.key,
            title: item.title,
            description: item.description,
            photo: null,
        });
        setPhotoPreview(item.photo_url);
        setActiveTab('struktur');
        setShowModal(true);
    };

    const openEditBidang = (item: BidangData) => {
        setEditingItem(item);
        setBidangForm({
            key: item.key,
            title: item.title,
            description: item.description,
            data: {
                kepala: item.data.kepala,
                icon: item.data.icon,
                color: item.data.color,
                tugas: [...item.data.tugas],
                magangTasks: [...item.data.magangTasks],
                staffFungsional: [...item.data.staffFungsional],
            },
        });
        setActiveTab('bidang');
        setShowModal(true);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setStrukturForm((prev) => ({ ...prev, photo: file }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = async () => {
        if (!editingItem) return;

        setLoading(true);
        try {
            const response = await fetch('/admin/delete-photo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ key: editingItem.key }),
            });

            if (response.ok) {
                setPhotoPreview(null);
                setStrukturForm((prev) => ({ ...prev, photo: null }));
                alert('Foto berhasil dihapus!');
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Gagal menghapus foto!');
        }
        setLoading(false);
    };

    const handleSaveStruktur = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('key', strukturForm.key);
        formData.append('title', strukturForm.title);
        formData.append('description', strukturForm.description);
        if (strukturForm.photo) {
            formData.append('photo', strukturForm.photo);
        }

        try {
            const response = await fetch('/admin/update-struktur-organisasi', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            if (response.ok) {
                alert('Struktur organisasi berhasil diupdate!');
                setShowModal(false);
                router.reload();
            } else {
                alert('Gagal mengupdate struktur organisasi!');
            }
        } catch (error) {
            console.error('Error updating struktur:', error);
            alert('Gagal mengupdate struktur organisasi!');
        }

        setLoading(false);
    };

    const handleSaveBidang = async () => {
        setLoading(true);

        try {
            const response = await fetch('/admin/update-bidang', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(bidangForm),
            });

            if (response.ok) {
                alert('Data bidang berhasil diupdate!');
                setShowModal(false);
                router.reload();
            } else {
                alert('Gagal mengupdate data bidang!');
            }
        } catch (error) {
            console.error('Error updating bidang:', error);
            alert('Gagal mengupdate data bidang!');
        }

        setLoading(false);
    };

    const addArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional') => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: [...prev.data[field], ''],
            },
        }));
    };

    const removeArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional', index: number) => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: prev.data[field].filter((_, i) => i !== index),
            },
        }));
    };

    const updateArrayItem = (field: 'tugas' | 'magangTasks' | 'staffFungsional', index: number, value: string) => {
        setBidangForm((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                [field]: prev.data[field].map((item, i) => (i === index ? value : item)),
            },
        }));
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
            style={{
            overflow: showModal ? 'hidden' : undefined,
            height: showModal ? '100vh' : undefined,
            }}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg">
                    <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                    </div>
                    <div>
                    <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                        Edit Beranda
                    </h1>
                    <p className="text-sm font-medium opacity-90">Kelola konten struktur organisasi dan bidang</p>
                    </div>
                </div>

                <button
                    onClick={handleBack}
                    className="flex items-center space-x-2 rounded-xl bg-gray-500 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-600"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Kembali</span>
                </button>
                </div>
            </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
            {/* Tab Navigation */}
            <div className="mb-8 flex space-x-4">
                <button
                onClick={() => setActiveTab('struktur')}
                className={`rounded-xl px-6 py-3 font-medium transition-colors ${
                    activeTab === 'struktur' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                >
                📋 Struktur Organisasi
                </button>
                <button
                onClick={() => setActiveTab('bidang')}
                className={`rounded-xl px-6 py-3 font-medium transition-colors ${
                    activeTab === 'bidang' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                >
                🏢 Data Bidang
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'struktur' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {strukturOrganisasi.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800">{item.key === 'kepala_dinas' ? 'Kepala Dinas' : 'Sekretaris'}</h3>
                        <button
                        onClick={() => openEditStruktur(item)}
                        className="rounded-lg bg-blue-100 px-3 py-1 text-blue-600 hover:bg-blue-200"
                        >
                        Edit
                        </button>
                    </div>

                    {item.photo_url && (
                        <div className="mb-4 flex justify-center">
                        <img src={item.photo_url} alt={item.title} className="h-24 w-24 rounded-full object-cover" />
                        </div>
                    )}

                    <div className="text-center">
                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {activeTab === 'bidang' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {bidangData.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-2xl">{item.data.icon}</span>
                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                        </div>
                        <button
                        onClick={() => openEditBidang(item)}
                        className="rounded-lg bg-blue-100 px-3 py-1 text-blue-600 hover:bg-blue-200"
                        >
                        Edit
                        </button>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm font-medium">Kepala: {item.data.kepala}</p>
                        <p className="text-xs text-gray-500">
                        {item.data.tugas.length} tugas, {item.data.magangTasks.length} kegiatan magang
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>

            {/* Modal Edit */}
            {showModal && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                style={{
                overscrollBehavior: 'contain',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                }}
            >
                <style>
                {`
                /* Hide scrollbar for modal overlay and modal content */
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
                </style>
                <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white hide-scrollbar">
                {/* Modal Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">
                        {activeTab === 'struktur' ? 'Edit Struktur Organisasi' : 'Edit Data Bidang'}
                    </h3>
                    <button onClick={() => setShowModal(false)} className="text-2xl text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {activeTab === 'struktur' ? (
                    /* Struktur Organisasi Form */
                    <div className="space-y-6">
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            type="text"
                            value={strukturForm.title}
                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, title: e.target.value }))}
                            className="mt-1 w-full rounded-xl text-gray-800 border border-gray-300 px-4 py-3"
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                        <input
                            type="text"
                            value={strukturForm.description}
                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, description: e.target.value }))}
                            className="mt-1 w-full rounded-xl text-gray-800 border border-gray-300 px-4 py-3"
                        />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">Foto</label>
                        <div className="mt-2 space-y-4">
                            {photoPreview && (
                            <div className="flex items-center space-x-4">
                                <img src={photoPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
                                <button
                                onClick={handleDeletePhoto}
                                className="rounded-xl bg-red-500 px-6 py-2 text-white hover:bg-red-600 disabled:opacity-50"
                                disabled={loading}
                                >
                                Hapus Foto
                                </button>
                                <label className="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
                                Input Foto
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                    disabled={loading}
                                />
                                </label>
                            </div>
                            )}
                        </div>
                        </div>
                    </div>
                    ) : (
                    /* Bidang Form */
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Bidang</label>
                            <input
                            type="text"
                            value={bidangForm.title}
                            onChange={(e) => setBidangForm((prev) => ({ ...prev, title: e.target.value }))}
                            className="text-gray-800 mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kepala Bidang</label>
                            <input
                            type="text"
                            value={bidangForm.data.kepala}
                            onChange={(e) =>
                                setBidangForm((prev) => ({
                                ...prev,
                                data: { ...prev.data, kepala: e.target.value },
                                }))
                            }
                            className="text-gray-800 mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Icon (Emoji)</label>
                            <input
                            type="text"
                            value={bidangForm.data.icon}
                            onChange={(e) =>
                                setBidangForm((prev) => ({
                                ...prev,
                                data: { ...prev.data, icon: e.target.value },
                                }))
                            }
                            className="text-gray-800 mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="📢"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Warna</label>
                            <select
                            value={bidangForm.data.color}
                            onChange={(e) =>
                                setBidangForm((prev) => ({
                                ...prev,
                                data: { ...prev.data, color: e.target.value },
                                }))
                            }
                            className="text-gray-800 mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            >
                            <option value="blue">Biru</option>
                            <option value="purple">Ungu</option>
                            <option value="green">Hijau</option>
                            <option value="red">Merah</option>
                            <option value="yellow">Kuning</option>
                            <option value="indigo">Indigo</option>
                            <option value="teal">Teal</option>
                            </select>
                        </div>
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea
                            value={bidangForm.description}
                            onChange={(e) => setBidangForm((prev) => ({ ...prev, description: e.target.value }))}
                            className="text-gray-800 mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            rows={3}
                        />
                        </div>

                        {/* Tugas dan Tanggung Jawab */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Tugas dan Tanggung Jawab</label>
                        <div className="mt-2 space-y-2">
                            {bidangForm.data.tugas.map((tugas, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                type="text"
                                value={tugas}
                                onChange={(e) => updateArrayItem('tugas', index, e.target.value)}
                                className="text-gray-800 flex-1 rounded-lg border border-gray-300 px-3 py-2"
                                />
                                <button
                                onClick={() => removeArrayItem('tugas', index)}
                                className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                >
                                ✕
                                </button>
                            </div>
                            ))}
                            <button
                            onClick={() => addArrayItem('tugas')}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                            >
                            + Tambah Tugas
                            </button>
                        </div>
                        </div>

                        {/* Kegiatan Magang */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Kegiatan Magang</label>
                        <div className="mt-2 space-y-2">
                            {bidangForm.data.magangTasks.map((task, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                type="text"
                                value={task}
                                onChange={(e) => updateArrayItem('magangTasks', index, e.target.value)}
                                className="text-gray-800 flex-1 rounded-lg border border-gray-300 px-3 py-2"
                                />
                                <button
                                onClick={() => removeArrayItem('magangTasks', index)}
                                className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                >
                                ✕
                                </button>
                            </div>
                            ))}
                            <button
                            onClick={() => addArrayItem('magangTasks')}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                            >
                            + Tambah Kegiatan
                            </button>
                        </div>
                        </div>

                        {/* Staff Fungsional */}
                        <div>
                        <label className="block text-sm font-medium text-gray-700">Staff Fungsional</label>
                        <div className="mt-2 space-y-2">
                            {bidangForm.data.staffFungsional.map((staff, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                type="text"
                                value={staff}
                                onChange={(e) => updateArrayItem('staffFungsional', index, e.target.value)}
                                className="text-gray-800 flex-1 rounded-lg border border-gray-300 px-3 py-2"
                                />
                                <button
                                onClick={() => removeArrayItem('staffFungsional', index)}
                                className="rounded-lg bg-red-100 px-2 py-2 text-red-600 hover:bg-red-200"
                                >
                                ✕
                                </button>
                            </div>
                            ))}
                            <button
                            onClick={() => addArrayItem('staffFungsional')}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-200"
                            >
                            + Tambah Staff
                            </button>
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-6">
                    <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400"
                        disabled={loading}
                    >
                        Batal
                    </button>
                    <button
                        onClick={activeTab === 'struktur' ? handleSaveStruktur : handleSaveBidang}
                        className="rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}
