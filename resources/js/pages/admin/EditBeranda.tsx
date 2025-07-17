import { router } from '@inertiajs/react';
import { AlertTriangle, Building2, Camera, Check, ClipboardList, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { IconDisplay, IconPickerWithLabel } from '../../components/IconPicker';
import ImageCropper from '../../components/ImageCropper';

// Type untuk flash messages
interface FlashMessages {
    success?: string;
    error?: string;
}

interface InertiaPage {
    props: {
        flash?: FlashMessages;
        [key: string]: unknown;
    };
}

interface StrukturOrganisasi {
    id: number;
    key: string;
    title: string;
    description: string;
    photo_url: string | null;
    original_photo_url?: string | null;
    data?: {
        category?: string;
        [key: string]: unknown;
    };
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

    // Filter states
    const [filterCategory, setFilterCategory] = useState<string>('semua');
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StrukturOrganisasi | null>(null);

    // Crop modal state
    const [showCropModal, setShowCropModal] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [isEditingExistingPhoto, setIsEditingExistingPhoto] = useState(false);
    const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

    // Form data for struktur organisasi
    const [strukturForm, setStrukturForm] = useState({
        key: '',
        title: '',
        description: '',
        category: '', // Untuk dropdown kategori
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

    // Original data for change detection
    const [originalStrukturData, setOriginalStrukturData] = useState<StrukturOrganisasi | null>(null);
    const [originalBidangData, setOriginalBidangData] = useState<BidangData | null>(null);

    // Function to detect changes in struktur form
    const hasStrukturChanges = (): boolean => {
        if (!originalStrukturData) return true; // Allow save for new items or if no original data

        return (
            strukturForm.title !== originalStrukturData.title ||
            strukturForm.description !== originalStrukturData.description ||
            strukturForm.photo !== null ||
            // Check if photo was deleted (original had photo but current preview is null)
            (originalStrukturData.photo_url !== null && photoPreview === null)
        );
    };

    // Function to detect changes in bidang form
    const hasBidangChanges = (): boolean => {
        if (!originalBidangData) return true; // Allow save for new items or if no original data

        return (
            bidangForm.title !== originalBidangData.title ||
            bidangForm.description !== originalBidangData.description ||
            bidangForm.data.kepala !== originalBidangData.data.kepala ||
            bidangForm.data.icon !== originalBidangData.data.icon ||
            bidangForm.data.color !== originalBidangData.data.color ||
            JSON.stringify(bidangForm.data.tugas) !== JSON.stringify(originalBidangData.data.tugas) ||
            JSON.stringify(bidangForm.data.magangTasks) !== JSON.stringify(originalBidangData.data.magangTasks) ||
            JSON.stringify(bidangForm.data.staffFungsional) !== JSON.stringify(originalBidangData.data.staffFungsional)
        );
    };

    // Get filtered struktur organisasi based on category
    const getFilteredStrukturOrganisasi = () => {
        if (filterCategory === 'semua') {
            return strukturOrganisasi;
        }

        return strukturOrganisasi.filter((item) => {
            const getItemCategory = (item: StrukturOrganisasi) => {
                const key = item.key;

                // Check hardcoded items first
                const hardcodedCategories: Record<string, string> = {
                    kepala_dinas: 'pimpinan',
                    sekretaris: 'kesekretariatan',
                    kasubag_umum: 'sub_bagian',
                    kasubag_keuangan: 'sub_bagian',
                    kasubag_program: 'sub_bagian',
                    perencana_ahli_muda: 'jabatan_fungsional',
                    kabid_informasi: 'kepala_bidang',
                    kabid_egovernment: 'kepala_bidang',
                    kabid_keamanan: 'kepala_bidang',
                    kabid_statistik: 'kepala_bidang',
                };

                if (hardcodedCategories[key]) {
                    return hardcodedCategories[key];
                }

                // Check stored category in data field
                if (item.data && typeof item.data === 'object' && 'category' in item.data) {
                    return item.data.category as string;
                }

                // Fallback to key-based detection
                if (key.includes('kasubag')) return 'sub_bagian';
                if (key.includes('perencana') || key.includes('ahli')) return 'jabatan_fungsional';
                if (key.includes('kabid') || key.includes('kepala')) return 'kepala_bidang';

                return 'lainnya';
            };

            return getItemCategory(item) === filterCategory;
        });
    };

    // Get category counts for filter display
    const getCategoryCounts = () => {
        const counts: Record<string, number> = {
            semua: strukturOrganisasi.length,
            pimpinan: 0,
            kesekretariatan: 0,
            sub_bagian: 0,
            jabatan_fungsional: 0,
            kepala_bidang: 0,
            lainnya: 0,
        };

        strukturOrganisasi.forEach((item) => {
            const key = item.key;

            // Check hardcoded items first
            const hardcodedCategories: Record<string, string> = {
                kepala_dinas: 'pimpinan',
                sekretaris: 'kesekretariatan',
                kasubag_umum: 'sub_bagian',
                kasubag_keuangan: 'sub_bagian',
                kasubag_program: 'sub_bagian',
                perencana_ahli_muda: 'jabatan_fungsional',
                kabid_informasi: 'kepala_bidang',
                kabid_egovernment: 'kepala_bidang',
                kabid_keamanan: 'kepala_bidang',
                kabid_statistik: 'kepala_bidang',
            };

            let category = 'lainnya';

            if (hardcodedCategories[key]) {
                category = hardcodedCategories[key];
            } else if (item.data && typeof item.data === 'object' && 'category' in item.data) {
                category = item.data.category as string;
            } else if (key.includes('kasubag')) {
                category = 'sub_bagian';
            } else if (key.includes('perencana') || key.includes('ahli')) {
                category = 'jabatan_fungsional';
            } else if (key.includes('kabid')) {
                category = 'kepala_bidang';
            }

            counts[category]++;
        });

        return counts;
    };

    // Handle delete single item
    const handleDeleteItem = (item: StrukturOrganisasi) => {
        setItemToDelete(item);
        setShowDeleteItemModal(true);
    };

    // Confirm delete single item
    const confirmDeleteItem = async () => {
        if (!itemToDelete) return;

        setLoading(true);
        try {
            router.delete(`/admin/delete-struktur-organisasi/${itemToDelete.key}`, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    alert('✅ Data berhasil dihapus!');
                    setShowDeleteItemModal(false);
                    setItemToDelete(null);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    alert('❌ Gagal menghapus data!\n\nSilakan coba lagi.');
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('❌ Terjadi kesalahan!\n\nSilakan coba lagi.');
            setLoading(false);
        }
    };

    // Handle delete all data
    const handleDeleteAll = () => {
        if (strukturOrganisasi.length === 0) {
            alert('📭 Tidak ada data untuk dihapus.');
            return;
        }
        setShowDeleteAllModal(true);
    };

    // Confirm delete all data
    const confirmDeleteAll = async () => {
        setLoading(true);
        try {
            router.delete('/admin/delete-all-struktur-organisasi', {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    alert('✅ Semua data berhasil dihapus!');
                    setShowDeleteAllModal(false);
                },
                onError: (errors) => {
                    console.error('Delete all error:', errors);
                    alert('❌ Gagal menghapus semua data!\n\nSilakan coba lagi.');
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } catch (error) {
            console.error('Error deleting all:', error);
            alert('❌ Terjadi kesalahan!\n\nSilakan coba lagi.');
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.get('/dashboard-admin');
    };

    const handleCancelEdit = () => {
        // Reset photo preview to original state
        if (originalStrukturData) {
            setPhotoPreview(originalStrukturData.photo_url);
        }

        // Reset crop states
        setOriginalImageFile(null);
        setOriginalImageUrl(null);
        setImageToCrop(null);
        setIsEditingExistingPhoto(false);
        setShowCropModal(false);

        setShowModal(false);
    };

    const openEditStruktur = (item: StrukturOrganisasi) => {
        setEditingItem(item);
        setOriginalStrukturData(item); // Store original data for comparison

        // Determine category based on stored data field first, then fallback to key detection
        let category = '';

        // First check if category is stored in data field (for new items)
        if (item.data && typeof item.data === 'object' && 'category' in item.data) {
            category = item.data.category as string;
        } else {
            // Fallback to key-based detection for existing items
            if (item.key.includes('kasubag')) {
                category = 'sub_bagian';
            } else if (item.key.includes('perencana') || item.key.includes('ahli')) {
                category = 'jabatan_fungsional';
            } else if (item.key.includes('kabid')) {
                category = 'kepala_bidang';
            }
        }

        setStrukturForm({
            key: item.key,
            title: item.title,
            description: item.description,
            category: category,
            photo: null,
        });
        setPhotoPreview(item.photo_url);

        // If there's an existing photo, store original photo URL for future edits
        if (item.original_photo_url) {
            // Use original photo URL if available (for re-cropping)
            setOriginalImageUrl(item.original_photo_url);
        } else if (item.photo_url) {
            // Fallback to current photo if no original photo URL
            setOriginalImageUrl(item.photo_url);
        } else {
            setOriginalImageUrl(null);
        }
        setOriginalImageFile(null); // Reset original file

        setActiveTab('struktur');
        setShowModal(true);
    };

    const openEditBidang = (item: BidangData) => {
        setEditingItem(item);
        setOriginalBidangData(item); // Store original data for comparison
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

    const openAddStruktur = () => {
        setEditingItem(null);
        setOriginalStrukturData(null);
        setStrukturForm({
            key: '',
            title: '',
            description: '',
            category: '',
            photo: null,
        });
        setPhotoPreview(null);
        setOriginalImageFile(null);
        setOriginalImageUrl(null);
        setActiveTab('struktur');
        setShowModal(true);
    };

    const openAddBidang = () => {
        setEditingItem(null);
        setOriginalBidangData(null);
        setBidangForm({
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
        setActiveTab('bidang');
        setShowModal(true);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('handlePhotoChange: storing original file', file.name, file.size);
            // Store original file for future edit crops
            setOriginalImageFile(file);

            // Create preview for cropping
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                console.log('handlePhotoChange: storing original image URL');
                setOriginalImageUrl(imageUrl); // Store original image URL
                setImageToCrop(imageUrl);
                setIsEditingExistingPhoto(false);
                setShowCropModal(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedImageBlob: Blob) => {
        console.log('handleCropComplete: crop completed');
        // Convert blob to file
        const croppedFile = new File([croppedImageBlob], 'cropped-image.jpg', {
            type: 'image/jpeg',
        });

        // Update form with cropped image
        setStrukturForm((prev) => ({ ...prev, photo: croppedFile }));

        // Create preview URL for display
        const previewUrl = URL.createObjectURL(croppedImageBlob);
        setPhotoPreview(previewUrl);

        // Close crop modal
        setShowCropModal(false);
        setImageToCrop(null);
        setIsEditingExistingPhoto(false);

        // IMPORTANT: Do NOT reset originalImageFile and originalImageUrl here
        // They should be preserved for future edit operations
        console.log('handleCropComplete: preserving original file/url for future edits');
    };

    const handleCropCancel = () => {
        setShowCropModal(false);
        setImageToCrop(null);
        setIsEditingExistingPhoto(false);
    };

    const handleEditPhoto = () => {
        console.log('handleEditPhoto called:', {
            originalImageFile: originalImageFile ? 'exists' : 'null',
            originalImageUrl: originalImageUrl ? 'exists' : 'null',
            photoPreview: photoPreview ? 'exists' : 'null',
        });

        // Priority: originalImageFile (dari upload baru) > originalImageUrl (dari foto existing)
        if (originalImageFile) {
            console.log('Using originalImageFile for edit');
            // Use original file for editing (untuk foto yang baru di-upload)
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                setImageToCrop(imageUrl);
                setIsEditingExistingPhoto(true);
                setShowCropModal(true);
            };
            reader.readAsDataURL(originalImageFile);
        } else if (originalImageUrl) {
            console.log('Using originalImageUrl for edit');
            // Use original image URL for editing (untuk foto existing dari database)
            setImageToCrop(originalImageUrl);
            setIsEditingExistingPhoto(true);
            setShowCropModal(true);
        } else if (photoPreview) {
            console.log('Using photoPreview as fallback');
            // Fallback to preview if no original is available
            setImageToCrop(photoPreview);
            setIsEditingExistingPhoto(true);
            setShowCropModal(true);
        }
    };

    const handleDeletePhoto = async () => {
        if (!editingItem && !strukturForm.photo) return; // If new item and no photo, nothing to delete

        // Instead of deleting from database immediately, just remove from preview
        // The actual deletion will happen when user clicks "Simpan"
        setPhotoPreview(null);
        setStrukturForm((prev) => ({ ...prev, photo: null }));

        if (editingItem) {
            alert('✅ Foto akan dihapus setelah Anda menekan tombol "Simpan"');
        } else {
            alert('✅ Foto dihapus dari pratinjau');
        }
    };

    const handleSaveStruktur = async () => {
        if (!strukturForm.title.trim() || !strukturForm.description.trim()) {
            alert('Mohon lengkapi nama dan jabatan!');
            return;
        }

        // For new items, validate required fields
        if (!editingItem) {
            if (!strukturForm.category.trim()) {
                alert('Mohon pilih kategori struktur organisasi!');
                return;
            }
            if (!strukturForm.key.trim()) {
                alert('Mohon masukkan key/ID unik untuk struktur organisasi!');
                return;
            }
        }

        setLoading(true);

        // Check if photo needs to be deleted (only for existing items)
        const shouldDeletePhoto = editingItem && originalStrukturData?.photo_url && !photoPreview;

        try {
            // Always use Inertia.js for better session handling
            const formData = {
                key: strukturForm.key,
                title: strukturForm.title,
                description: strukturForm.description,
                category: strukturForm.category, // Include category
                ...(shouldDeletePhoto && { delete_photo: true }),
            };

            // If there's a photo to upload
            if (strukturForm.photo) {
                // Create FormData for file upload
                const uploadFormData = new FormData();
                uploadFormData.append('key', strukturForm.key);
                uploadFormData.append('title', strukturForm.title);
                uploadFormData.append('description', strukturForm.description);
                uploadFormData.append('category', strukturForm.category); // Include category
                uploadFormData.append('photo', strukturForm.photo);

                // Add original photo if available
                if (originalImageFile) {
                    uploadFormData.append('original_photo', originalImageFile);
                } else if (originalImageUrl) {
                    // Convert original image URL to blob and append
                    try {
                        const response = await fetch(originalImageUrl);
                        const blob = await response.blob();
                        const originalFile = new File([blob], 'original-photo.jpg', { type: 'image/jpeg' });
                        uploadFormData.append('original_photo', originalFile);
                    } catch (error) {
                        console.warn('Failed to fetch original image:', error);
                    }
                }

                // Add delete_photo parameter if needed
                if (shouldDeletePhoto) {
                    uploadFormData.append('delete_photo', '1');
                }

                // Use Inertia for file upload
                router.post('/admin/update-struktur-organisasi', uploadFormData, {
                    forceFormData: true,
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page: InertiaPage) => {
                        const flashSuccess = page.props?.flash?.success;
                        if (flashSuccess) {
                            alert(flashSuccess);
                        } else {
                            const action = editingItem ? 'diperbarui' : 'ditambahkan';
                            alert(`✅ Struktur organisasi berhasil ${action}! 🔄 Data telah tersinkronisasi dengan halaman beranda user.`);
                        }
                        setShowModal(false);
                    },
                    onError: (errors) => {
                        console.error('Validation errors:', errors);
                        if (errors.message) {
                            alert(`❌ Gagal memperbarui struktur organisasi!\n\nError: ${errors.message}`);
                        } else {
                            alert('❌ Gagal memperbarui struktur organisasi!\n\nSilakan periksa input Anda.');
                        }
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            } else {
                // No file upload, use regular form data
                router.post('/admin/update-struktur-organisasi', formData, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page: InertiaPage) => {
                        const flashSuccess = page.props?.flash?.success;
                        if (flashSuccess) {
                            alert(flashSuccess);
                        } else {
                            const action = editingItem ? 'diperbarui' : 'ditambahkan';
                            alert(`✅ Struktur organisasi berhasil ${action}! 🔄 Data telah tersinkronisasi dengan halaman beranda user.`);
                        }
                        setShowModal(false);
                    },
                    onError: (errors) => {
                        console.error('Validation errors:', errors);
                        if (errors.message) {
                            alert(`❌ Gagal memperbarui struktur organisasi!\n\nError: ${errors.message}`);
                        } else {
                            alert('❌ Gagal memperbarui struktur organisasi!\n\nSilakan periksa input Anda.');
                        }
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            }
        } catch (error) {
            console.error('Error updating struktur:', error);
            alert('❌ Terjadi kesalahan!\n\nSilakan coba lagi.');
            setLoading(false);
        }
    };

    const handleSaveBidang = async () => {
        if (!bidangForm.title.trim() || !bidangForm.description.trim() || !bidangForm.data.kepala.trim()) {
            alert('Mohon lengkapi nama bidang, deskripsi, dan nama kepala bidang!');
            return;
        }

        // For new items, key is required
        if (!editingItem && !bidangForm.key.trim()) {
            alert('Mohon masukkan key/ID unik untuk bidang!');
            return;
        }

        // Validasi array tidak boleh kosong
        const hasEmptyTugas = bidangForm.data.tugas.some((tugas) => !tugas.trim());
        const hasEmptyMagangTasks = bidangForm.data.magangTasks.some((task) => !task.trim());
        const hasEmptyStaff = bidangForm.data.staffFungsional.some((staff) => !staff.trim());

        if (hasEmptyTugas || hasEmptyMagangTasks || hasEmptyStaff) {
            alert('Mohon lengkapi semua field atau hapus yang kosong!');
            return;
        }

        setLoading(true);

        try {
            // Filter out empty strings
            const cleanedBidangForm = {
                ...bidangForm,
                data: {
                    ...bidangForm.data,
                    tugas: bidangForm.data.tugas.filter((tugas) => tugas.trim()),
                    magangTasks: bidangForm.data.magangTasks.filter((task) => task.trim()),
                    staffFungsional: bidangForm.data.staffFungsional.filter((staff) => staff.trim()),
                },
            };

            // Use Inertia.js for better session handling
            router.post('/admin/update-bidang', cleanedBidangForm, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page: InertiaPage) => {
                    const flashSuccess = page.props?.flash?.success;
                    if (flashSuccess) {
                        alert(`✅ ${flashSuccess}\n\nPerubahan akan langsung terlihat di halaman beranda user.`);
                    } else {
                        const action = editingItem ? 'diperbarui' : 'ditambahkan';
                        alert(`✅ Data bidang berhasil ${action}!\n\nPerubahan akan langsung terlihat di halaman beranda user.`);
                    }
                    setShowModal(false);
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                    if (errors.message) {
                        alert(`❌ Gagal memperbarui data bidang!\n\nError: ${errors.message}`);
                    } else {
                        alert('❌ Gagal memperbarui data bidang!\n\nSilakan periksa input Anda.');
                    }
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        } catch (error) {
            console.error('Error updating bidang:', error);
            alert('❌ Terjadi kesalahan!\n\nSilakan coba lagi.');
            setLoading(false);
        }
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
                            <button
                                onClick={() => router.get('/dashboard-admin')}
                                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-6"
                                title="Kembali ke Dashboard Admin"
                            >
                                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                            </button>
                            <div>
                                <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                                    Edit Beranda
                                </h1>
                                <p className="text-sm font-medium opacity-90">Kelola konten dinamis untuk tampilan beranda user</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Statistics */}
                            <div className="hidden items-center space-x-4 text-sm md:flex">
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Struktur:</span>
                                    <span className="ml-1 font-semibold">{strukturOrganisasi.length}</span>
                                </div>
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Bidang:</span>
                                    <span className="ml-1 font-semibold">{bidangData.length}</span>
                                </div>
                                <div className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                                    <span className="opacity-75">Status:</span>
                                    <span className="ml-1 font-semibold text-green-300">Sinkron</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBack}
                                className="flex items-center space-x-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/20"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Kembali</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Info Banner */}
                <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Sistem Beranda Dinamis</h3>
                            <p className="mb-3 text-gray-700">
                                Semua perubahan yang Anda lakukan di sini akan <strong>langsung tersinkronisasi</strong> dengan halaman beranda yang
                                dilihat oleh user. Data tidak lagi statis dan akan mengambil informasi terbaru dari database.
                            </p>
                            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    <span className="text-gray-600">Real-time sync dengan halaman user</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    <span className="text-gray-600">Data tersimpan di database</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    <span className="text-gray-600">Upload foto untuk struktur organisasi</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-green-100 text-green-600">
                                        <Check className="h-3 w-3" />
                                    </span>
                                    <span className="text-gray-600">Kelola tugas dan kegiatan magang</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8 flex space-x-4">
                    <button
                        onClick={() => setActiveTab('struktur')}
                        className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-colors ${
                            activeTab === 'struktur'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <ClipboardList className="h-5 w-5" />
                        <span>Struktur Organisasi</span>
                        <span className={`rounded-full px-2 py-1 text-xs ${activeTab === 'struktur' ? 'bg-white/20' : 'bg-gray-100'}`}>
                            {strukturOrganisasi.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('bidang')}
                        className={`flex items-center space-x-2 rounded-xl px-6 py-3 font-medium transition-colors ${
                            activeTab === 'bidang'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <Building2 className="h-5 w-5" />
                        <span>Data Bidang</span>
                        <span className={`rounded-full px-2 py-1 text-xs ${activeTab === 'bidang' ? 'bg-white/20' : 'bg-gray-100'}`}>
                            {bidangData.length}
                        </span>
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'struktur' && (
                    <div>
                        {/* Header Section with Add Button, Filter, and Delete All */}
                        <div className="mb-6 space-y-4">
                            {/* Action Buttons Row */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <button
                                    onClick={openAddStruktur}
                                    className="flex items-center space-x-2 rounded-xl bg-green-500 px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-green-600"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Tambah Struktur Organisasi</span>
                                </button>

                                <button
                                    onClick={handleDeleteAll}
                                    disabled={strukturOrganisasi.length === 0}
                                    className="flex items-center space-x-2 rounded-xl bg-red-500 px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    <span>Hapus Semua Data</span>
                                </button>
                            </div>

                            {/* Filter Section */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-medium text-gray-700">Filter Kategori:</span>
                                        <select
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        >
                                            <option value="semua">Semua Kategori ({getCategoryCounts().semua})</option>
                                            <option value="pimpinan">Pimpinan ({getCategoryCounts().pimpinan})</option>
                                            <option value="kesekretariatan">Kesekretariatan ({getCategoryCounts().kesekretariatan})</option>
                                            <option value="sub_bagian">Sub Bagian ({getCategoryCounts().sub_bagian})</option>
                                            <option value="jabatan_fungsional">Jabatan Fungsional ({getCategoryCounts().jabatan_fungsional})</option>
                                            <option value="kepala_bidang">Kepala Bidang ({getCategoryCounts().kepala_bidang})</option>
                                            <option value="lainnya">Lainnya ({getCategoryCounts().lainnya})</option>
                                        </select>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        Menampilkan {getFilteredStrukturOrganisasi().length} dari {strukturOrganisasi.length} data
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {getFilteredStrukturOrganisasi()
                                .sort((a, b) => {
                                    // Define category order based on organizational hierarchy
                                    const getItemConfig = (item: StrukturOrganisasi) => {
                                        const key = item.key;

                                        // First check for hardcoded existing items
                                        const configs: Record<
                                            string,
                                            { displayName: string; category: string; bgColor: string; badgeColor: string; categoryOrder: number }
                                        > = {
                                            kepala_dinas: {
                                                displayName: 'Kepala Dinas',
                                                category: 'Pimpinan',
                                                bgColor: 'bg-blue-50',
                                                badgeColor: 'bg-blue-100 text-blue-600',
                                                categoryOrder: 1,
                                            },
                                            sekretaris: {
                                                displayName: 'Sekretaris',
                                                category: 'Kesekretariatan',
                                                bgColor: 'bg-purple-50',
                                                badgeColor: 'bg-purple-100 text-purple-600',
                                                categoryOrder: 2,
                                            },
                                            kasubag_umum: {
                                                displayName: 'Kasubbag Umum Dan Kepegawaian',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                                categoryOrder: 3,
                                            },
                                            kasubag_keuangan: {
                                                displayName: 'Kasubbag Keuangan Dan Aset',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                                categoryOrder: 3,
                                            },
                                            kasubag_program: {
                                                displayName: 'Kasubag Program & Pelaporan',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                                categoryOrder: 3,
                                            },
                                            perencana_ahli_muda: {
                                                displayName: 'Jabatan Fungsional Perencana Ahli Muda',
                                                category: 'Jabatan Fungsional',
                                                bgColor: 'bg-teal-50',
                                                badgeColor: 'bg-teal-100 text-teal-600',
                                                categoryOrder: 4,
                                            },
                                            kabid_informasi: {
                                                displayName: 'Kepala Bidang Informasi dan Komunikasi Publik',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                                categoryOrder: 5,
                                            },
                                            kabid_egovernment: {
                                                displayName: 'Kepala Bidang Pemberdayaan E-Government',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                                categoryOrder: 5,
                                            },
                                            kabid_keamanan: {
                                                displayName: 'Kepala Bidang Persandian, Keamanan Informasi dan Siber',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                                categoryOrder: 5,
                                            },
                                            kabid_statistik: {
                                                displayName: 'Kepala Bidang Statistik dan Data Elektronik',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                                categoryOrder: 5,
                                            },
                                        };

                                        // If found in configs, return it
                                        if (configs[key]) {
                                            return configs[key];
                                        }

                                        // For new items, use stored category first, then fallback to key patterns
                                        let category = 'Lainnya';
                                        let categoryOrderValue = 6;

                                        // Check if category is stored in data field (for new items)
                                        if (item.data && typeof item.data === 'object' && 'category' in item.data) {
                                            const storedCategory = item.data.category as string;

                                            // Map stored categories to display categories
                                            switch (storedCategory) {
                                                case 'sub_bagian':
                                                    category = 'Sub Bagian';
                                                    categoryOrderValue = 3;
                                                    break;
                                                case 'jabatan_fungsional':
                                                    category = 'Jabatan Fungsional';
                                                    categoryOrderValue = 4;
                                                    break;
                                                case 'kepala_bidang':
                                                    category = 'Kepala Bidang';
                                                    categoryOrderValue = 5;
                                                    break;
                                            }
                                        } else {
                                            // Fallback to key-based detection for existing items
                                            if (key.includes('kasubag')) {
                                                category = 'Sub Bagian';
                                                categoryOrderValue = 3;
                                            } else if (key.includes('perencana') || key.includes('ahli') || key.includes('fungsional')) {
                                                category = 'Jabatan Fungsional';
                                                categoryOrderValue = 4;
                                            } else if (key.includes('kabid') || key.includes('kepala_bidang')) {
                                                category = 'Kepala Bidang';
                                                categoryOrderValue = 5;
                                            }
                                        }

                                        return {
                                            displayName: item.description,
                                            category: category,
                                            bgColor: 'bg-gray-50',
                                            badgeColor: 'bg-gray-100 text-gray-600',
                                            categoryOrder: categoryOrderValue,
                                        };
                                    };

                                    const configA = getItemConfig(a);
                                    const configB = getItemConfig(b);

                                    // Primary sort by category order
                                    if (configA.categoryOrder !== configB.categoryOrder) {
                                        return configA.categoryOrder - configB.categoryOrder;
                                    }

                                    // Secondary sort by key for items in same category (for consistent ordering)
                                    return a.key.localeCompare(b.key);
                                })
                                .map((item) => {
                                    // Dynamic display configuration based on stored category data first, then key detection
                                    const getItemConfig = (item: StrukturOrganisasi) => {
                                        const key = item.key;

                                        // First check for hardcoded existing items
                                        const configs: Record<
                                            string,
                                            { displayName: string; category: string; bgColor: string; badgeColor: string }
                                        > = {
                                            kepala_dinas: {
                                                displayName: 'Kepala Dinas',
                                                category: 'Pimpinan',
                                                bgColor: 'bg-blue-50',
                                                badgeColor: 'bg-blue-100 text-blue-600',
                                            },
                                            sekretaris: {
                                                displayName: 'Sekretaris',
                                                category: 'Kesekretariatan',
                                                bgColor: 'bg-purple-50',
                                                badgeColor: 'bg-purple-100 text-purple-600',
                                            },
                                            kasubag_umum: {
                                                displayName: 'Kasubbag Umum Dan Kepegawaian',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                            },
                                            kasubag_keuangan: {
                                                displayName: 'Kasubbag Keuangan Dan Aset',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                            },
                                            kasubag_program: {
                                                displayName: 'Kasubag Program & Pelaporan',
                                                category: 'Sub Bagian',
                                                bgColor: 'bg-green-50',
                                                badgeColor: 'bg-green-100 text-green-600',
                                            },
                                            perencana_ahli_muda: {
                                                displayName: 'Jabatan Fungsional Perencana Ahli Muda',
                                                category: 'Jabatan Fungsional',
                                                bgColor: 'bg-teal-50',
                                                badgeColor: 'bg-teal-100 text-teal-600',
                                            },
                                            kabid_informasi: {
                                                displayName: 'Kepala Bidang Informasi dan Komunikasi Publik',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                            },
                                            kabid_egovernment: {
                                                displayName: 'Kepala Bidang Pemberdayaan E-Government',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                            },
                                            kabid_keamanan: {
                                                displayName: 'Kepala Bidang Persandian, Keamanan Informasi dan Siber',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                            },
                                            kabid_statistik: {
                                                displayName: 'Kepala Bidang Statistik dan Data Elektronik',
                                                category: 'Kepala Bidang',
                                                bgColor: 'bg-orange-50',
                                                badgeColor: 'bg-orange-100 text-orange-600',
                                            },
                                        };

                                        // If found in configs, return it
                                        if (configs[key]) {
                                            return configs[key];
                                        }

                                        // For new items, use stored category first, then fallback to key patterns
                                        let category = 'Lainnya';
                                        let bgColor = 'bg-gray-50';
                                        let badgeColor = 'bg-gray-100 text-gray-600';

                                        // Check if category is stored in data field (for new items)
                                        if (item.data && typeof item.data === 'object' && 'category' in item.data) {
                                            const storedCategory = item.data.category as string;

                                            // Map stored categories to display categories
                                            switch (storedCategory) {
                                                case 'sub_bagian':
                                                    category = 'Sub Bagian';
                                                    bgColor = 'bg-green-50';
                                                    badgeColor = 'bg-green-100 text-green-600';
                                                    break;
                                                case 'jabatan_fungsional':
                                                    category = 'Jabatan Fungsional';
                                                    bgColor = 'bg-teal-50';
                                                    badgeColor = 'bg-teal-100 text-teal-600';
                                                    break;
                                                case 'kepala_bidang':
                                                    category = 'Kepala Bidang';
                                                    bgColor = 'bg-orange-50';
                                                    badgeColor = 'bg-orange-100 text-orange-600';
                                                    break;
                                            }
                                        } else {
                                            // Fallback to key-based detection for existing items
                                            if (key.includes('kasubag')) {
                                                category = 'Sub Bagian';
                                                bgColor = 'bg-green-50';
                                                badgeColor = 'bg-green-100 text-green-600';
                                            } else if (key.includes('perencana') || key.includes('ahli') || key.includes('fungsional')) {
                                                category = 'Jabatan Fungsional';
                                                bgColor = 'bg-teal-50';
                                                badgeColor = 'bg-teal-100 text-teal-600';
                                            } else if (key.includes('kabid') || key.includes('kepala_bidang')) {
                                                category = 'Kepala Bidang';
                                                bgColor = 'bg-orange-50';
                                                badgeColor = 'bg-orange-100 text-orange-600';
                                            }
                                        }

                                        return {
                                            displayName: item.description,
                                            category: category,
                                            bgColor: bgColor,
                                            badgeColor: badgeColor,
                                        };
                                    };

                                    const config = getItemConfig(item);

                                    // Calculate Kepala Bidang number for display
                                    const getKepalaBidangNumber = () => {
                                        if (config.category !== 'Kepala Bidang') return null;

                                        // Filter all Kepala Bidang items and find the index of current item
                                        const kepalaBidangItems = strukturOrganisasi
                                            .filter((strukturItem) => {
                                                const strukturConfig = getItemConfig(strukturItem);
                                                return strukturConfig.category === 'Kepala Bidang';
                                            })
                                            .sort((a, b) => a.key.localeCompare(b.key)); // Sort by key for consistent ordering

                                        const currentIndex = kepalaBidangItems.findIndex((bidangItem) => bidangItem.id === item.id);
                                        return currentIndex >= 0 ? currentIndex + 1 : null;
                                    };

                                    const bidangNumber = getKepalaBidangNumber();

                                    return (
                                        <div key={item.id} className="mx-auto flex max-w-xs justify-center">
                                            <div
                                                className={`flex min-h-[280px] w-80 flex-col justify-between rounded-2xl border-2 border-gray-100 ${config.bgColor} p-6 text-center shadow-lg`}
                                            >
                                                {/* Header section with category badge and actions */}
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-4 flex w-full items-center justify-between">
                                                        <span
                                                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${config.badgeColor}`}
                                                        >
                                                            {config.category === 'Kepala Bidang' && bidangNumber
                                                                ? `Kepala Bidang ${bidangNumber}`
                                                                : config.category}
                                                        </span>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => openEditStruktur(item)}
                                                                className="rounded-lg bg-blue-100 px-3 py-2 text-xs text-blue-600 transition-colors hover:bg-blue-200"
                                                                title="Edit item ini"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteItem(item)}
                                                                className="rounded-lg bg-red-100 px-3 py-2 text-xs text-red-600 transition-colors hover:bg-red-200"
                                                                title="Hapus item ini"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Photo section */}
                                                    {item.photo_url && (
                                                        <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full shadow-md">
                                                            <img src={item.photo_url} alt={item.title} className="h-full w-full object-cover" />
                                                        </div>
                                                    )}
                                                    {!item.photo_url && (
                                                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-md">
                                                            <svg
                                                                className="h-10 w-10 text-white"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content section */}
                                                <div className="flex flex-1 flex-col justify-center">
                                                    <h4 className="mb-1 line-clamp-2 text-lg font-bold text-gray-800">{item.title}</h4>
                                                    <p className="line-clamp-3 text-sm font-medium text-gray-600">{item.description}</p>
                                                </div>

                                                {/* Photo Status Indicator */}
                                                <div className="mt-3 flex justify-center">
                                                    <span
                                                        className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs ${
                                                            item.photo_url ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                        }`}
                                                    >
                                                        <Camera className="h-3 w-3" />
                                                        <span>{item.photo_url ? 'Foto tersedia' : 'Belum ada foto'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}

                {activeTab === 'bidang' && (
                    <div>
                        {/* Add Button for Bidang */}
                        <div className="mb-6">
                            <button
                                onClick={openAddBidang}
                                className="flex items-center space-x-2 rounded-xl bg-green-500 px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-green-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Tambah Data Bidang</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {bidangData.map((item) => {
                                // Color mapping untuk background berdasarkan data.color
                                const getColorConfig = (color: string) => {
                                    const colorMap: Record<string, { bg: string; text: string }> = {
                                        blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
                                        purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
                                        green: { bg: 'bg-green-50', text: 'text-green-700' },
                                        red: { bg: 'bg-red-50', text: 'text-red-700' },
                                        yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
                                        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
                                        teal: { bg: 'bg-teal-50', text: 'text-teal-700' },
                                    };
                                    return colorMap[color] || { bg: 'bg-gray-50', text: 'text-gray-700' };
                                };

                                const colorConfig = getColorConfig(item.data?.color || 'gray');
                                const isComplete =
                                    item.title &&
                                    item.description &&
                                    item.data?.kepala &&
                                    item.data?.tugas?.length > 0 &&
                                    item.data?.magangTasks?.length > 0;

                                return (
                                    <div
                                        key={item.id}
                                        className={`rounded-3xl border border-gray-100 ${colorConfig.bg} p-6 shadow-xl transition-all hover:shadow-2xl`}
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center justify-center">
                                                    <IconDisplay iconName={item.data?.icon || 'building2'} className="h-8 w-8 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h3 className={`text-lg font-bold ${colorConfig.text}`}>{item.title || 'Belum diisi'}</h3>
                                                    <span
                                                        className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                                                            isComplete ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                        }`}
                                                    >
                                                        {isComplete ? <Check className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                                                        <span>{isComplete ? 'Lengkap' : 'Perlu dilengkapi'}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => openEditBidang(item)}
                                                className="rounded-lg bg-blue-100 px-3 py-1 text-blue-600 transition-colors hover:bg-blue-200"
                                            >
                                                Edit
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-sm text-gray-600">{item.description || 'Belum ada deskripsi'}</p>

                                            <div className="grid grid-cols-1 gap-2 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-700">Kepala Bidang:</span>
                                                    <span className="text-gray-600">{item.data?.kepala || 'Belum diisi'}</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-700">Tugas:</span>
                                                    <span className="text-gray-600">{item.data?.tugas?.length || 0} item</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-700">Kegiatan Magang:</span>
                                                    <span className="text-gray-600">{item.data?.magangTasks?.length || 0} item</span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-700">Staff Fungsional:</span>
                                                    <span className="text-gray-600">{item.data?.staffFungsional?.length || 0} orang</span>
                                                </div>
                                            </div>

                                            {/* Preview singkat tugas */}
                                            {item.data?.tugas && item.data.tugas.length > 0 && (
                                                <div className="mt-3 border-t border-gray-200 pt-3">
                                                    <p className="mb-1 text-xs font-medium text-gray-500">Preview Tugas:</p>
                                                    <p className="line-clamp-2 text-xs text-gray-600">
                                                        {item.data.tugas[0]}
                                                        {item.data.tugas.length > 1 && ` (+${item.data.tugas.length - 1} lainnya)`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty state jika tidak ada data bidang */}
                            {bidangData.length === 0 && (
                                <div className="col-span-full">
                                    <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                                        <div className="mb-4 flex justify-center">
                                            <Building2 className="h-16 w-16 text-gray-400" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-700">Belum Ada Data Bidang</h3>
                                        <p className="text-gray-500">Data bidang akan ditampilkan setelah diisi melalui seeder atau database</p>
                                    </div>
                                </div>
                            )}
                        </div>
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
                    <div className="hide-scrollbar max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white">
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {activeTab === 'struktur'
                                        ? editingItem
                                            ? 'Edit Struktur Organisasi'
                                            : 'Tambah Struktur Organisasi'
                                        : editingItem
                                          ? 'Edit Data Bidang'
                                          : 'Tambah Data Bidang'}
                                </h3>
                                <button onClick={handleCancelEdit} className="text-2xl text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {activeTab === 'struktur' ? (
                                /* Struktur Organisasi Form */
                                <div className="space-y-6">
                                    {!editingItem && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                                <select
                                                    value={strukturForm.category}
                                                    onChange={(e) => setStrukturForm((prev) => ({ ...prev, category: e.target.value }))}
                                                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                                >
                                                    <option value="">-- Pilih Kategori --</option>
                                                    <option value="sub_bagian">Sub Bagian</option>
                                                    <option value="jabatan_fungsional">Jabatan Fungsional</option>
                                                    <option value="kepala_bidang">Kepala Bidang</option>
                                                </select>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Pilih kategori struktur organisasi (urutan: Sub Bagian → Jabatan Fungsional → Kepala Bidang)
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Key/ID Unik</label>
                                                <input
                                                    type="text"
                                                    value={strukturForm.key}
                                                    onChange={(e) => setStrukturForm((prev) => ({ ...prev, key: e.target.value }))}
                                                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                                    placeholder="contoh: kabid_statistik"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Key unik untuk identifikasi (gunakan format: posisi_singkat, contoh: kabid_statistik)
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            value={strukturForm.title}
                                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, title: e.target.value }))}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                        <input
                                            type="text"
                                            value={strukturForm.description}
                                            onChange={(e) => setStrukturForm((prev) => ({ ...prev, description: e.target.value }))}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Foto</label>
                                        <div className="mt-2 space-y-4">
                                            {photoPreview && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={photoPreview}
                                                            alt="Preview"
                                                            className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
                                                        />
                                                        <div className="flex space-x-2">
                                                            {(originalImageUrl || originalImageFile) && (
                                                                <button
                                                                    onClick={handleEditPhoto}
                                                                    className="inline-flex items-center rounded-xl bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:opacity-50"
                                                                    disabled={loading}
                                                                >
                                                                    <svg
                                                                        className="mr-2 h-4 w-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                        />
                                                                    </svg>
                                                                    Edit Foto
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={handleDeletePhoto}
                                                                className="inline-flex items-center rounded-xl bg-red-500 px-6 py-2 text-white hover:bg-red-600 disabled:opacity-50"
                                                                disabled={loading}
                                                            >
                                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                                Hapus Foto
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        <p>
                                                            💡{' '}
                                                            {originalImageUrl || originalImageFile
                                                                ? 'Klik "Edit Foto" untuk mengubah crop foto original, atau'
                                                                : ''}{' '}
                                                            Klik "Ganti Foto" untuk mengunggah foto baru.
                                                        </p>
                                                        {(originalImageUrl || originalImageFile) && (
                                                            <p className="mt-1 flex items-center space-x-1 text-xs text-blue-600">
                                                                <Camera className="h-3 w-3" />
                                                                <span>
                                                                    Edit foto akan menggunakan gambar original untuk crop yang lebih fleksibel.
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <label className="inline-flex cursor-pointer items-center rounded-xl bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
                                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    {photoPreview ? 'Ganti Foto' : 'Upload Foto'}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoChange}
                                                        className="hidden"
                                                        disabled={loading}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Bidang Form */
                                <div className="space-y-6">
                                    {!editingItem && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Key/ID Unik</label>
                                            <input
                                                type="text"
                                                value={bidangForm.key}
                                                onChange={(e) => setBidangForm((prev) => ({ ...prev, key: e.target.value }))}
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                                placeholder="contoh: bidang_statistik"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Key unik untuk identifikasi (gunakan format: bidang_nama, contoh: bidang_statistik)
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nama Bidang</label>
                                            <input
                                                type="text"
                                                value={bidangForm.title}
                                                onChange={(e) => setBidangForm((prev) => ({ ...prev, title: e.target.value }))}
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
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
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
                                            />
                                        </div>

                                        <IconPickerWithLabel
                                            label="Icon"
                                            selectedIcon={bidangForm.data.icon}
                                            onIconSelect={(iconKey) =>
                                                setBidangForm((prev) => ({
                                                    ...prev,
                                                    data: { ...prev.data, icon: iconKey },
                                                }))
                                            }
                                        />

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
                                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
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
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
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
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
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
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
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
                                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-800"
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
                                    onClick={handleCancelEdit}
                                    className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400"
                                    disabled={loading}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={activeTab === 'struktur' ? handleSaveStruktur : handleSaveBidang}
                                    className={`rounded-xl px-6 py-2 text-white ${
                                        loading ||
                                        (activeTab === 'struktur' && !hasStrukturChanges()) ||
                                        (activeTab === 'bidang' && !hasBidangChanges())
                                            ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                    disabled={
                                        loading ||
                                        (activeTab === 'struktur' && !hasStrukturChanges()) ||
                                        (activeTab === 'bidang' && !hasBidangChanges())
                                    }
                                    title={
                                        loading
                                            ? 'Sedang menyimpan...'
                                            : (activeTab === 'struktur' && !hasStrukturChanges()) || (activeTab === 'bidang' && !hasBidangChanges())
                                              ? 'Tidak ada perubahan untuk disimpan'
                                              : 'Simpan perubahan'
                                    }
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Crop Modal */}
            {showCropModal && imageToCrop && (
                <ImageCropper
                    src={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                    aspectRatio={1}
                    cropWidth={300}
                    cropHeight={300}
                    title={isEditingExistingPhoto ? 'Edit Foto' : 'Crop Foto Baru'}
                />
            )}

            {/* Delete Item Confirmation Modal */}
            {showDeleteItemModal && itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">Konfirmasi Hapus Data</h3>
                            <p className="text-gray-600">
                                Apakah Anda yakin ingin menghapus data <strong>"{itemToDelete.title}"</strong>?
                            </p>
                            <p className="mt-2 text-sm text-red-600">
                                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data termasuk foto.
                            </p>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setShowDeleteItemModal(false);
                                    setItemToDelete(null);
                                }}
                                className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                                disabled={loading}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteItem}
                                className="rounded-xl bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                                disabled={loading}
                            >
                                {loading ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete All Confirmation Modal */}
            {showDeleteAllModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">Konfirmasi Hapus Semua Data</h3>
                            <p className="text-gray-600">
                                Apakah Anda yakin ingin menghapus <strong>SEMUA</strong> data struktur organisasi?
                            </p>
                            <p className="mt-2 text-sm text-red-600">
                                Tindakan ini akan menghapus <strong>{strukturOrganisasi.length} data</strong> secara permanen dan tidak dapat
                                dibatalkan!
                            </p>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteAllModal(false)}
                                className="rounded-xl bg-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                                disabled={loading}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteAll}
                                className="rounded-xl bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                                disabled={loading}
                            >
                                {loading ? 'Menghapus...' : 'Ya, Hapus Semua'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
