import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Mahasiswa = {
    id: number;
    nama: string;
    nim: string;
    universitas: string;
    jurusan: string;
    email: string;
    telepon: string;
    tanggal_daftar: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    status: string;
    bidang_id: number;
    surat_pengantar: string;
};

interface IndexProps {
    mahasiswas: Mahasiswa[];
}

import React from 'react';
import Footer from '@/components/Footer';

export default function Index({ mahasiswas }: IndexProps) {
    const { data, setData, reset, errors } = useForm({
        nama: '',
        nim: '',
        universitas: '',
        jurusan: '',
        email: '',
        telepon: '',
        tanggal_daftar: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        bidang_id: '',
        surat_pengantar: null as File | null,
        cv: null as File | null,
        linkedin: '',
        motivasi: '',
    });

    const { flash } = usePage().props as { flash?: { success?: string } };
    const [processing, setProcessing] = React.useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('nim', data.nim);
        formData.append('universitas', data.universitas);
        formData.append('jurusan', data.jurusan);
        formData.append('email', data.email);
        formData.append('telepon', data.telepon);
        formData.append('tanggal_daftar', data.tanggal_daftar || new Date().toISOString().slice(0, 10));
        formData.append('tanggal_mulai', data.tanggal_mulai);
        formData.append('tanggal_selesai', data.tanggal_selesai);
        formData.append('bidang_id', data.bidang_id);
        formData.append('linkedin', data.linkedin);
        formData.append('motivasi', data.motivasi);

        if (data.surat_pengantar) {
            formData.append('surat_pengantar', data.surat_pengantar);
        }

        if (data.cv) {
            formData.append('cv', data.cv);
        }

        router.post('/mahasiswa', formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
                toast.success('Pendaftaran magang berhasil disubmit! Kami akan menghubungi Anda segera.');
                reset();
            },
            onError: (errors) => {
                setProcessing(false);
                // Tampilkan error pertama yang ditemukan
                const firstError = Object.values(errors)[0];
                toast.error(firstError ? String(firstError) : 'Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

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
                                className="rounded-xl border border-white/10 bg-white/20 px-6 py-3 font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-xl"
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
                                className="rounded-xl border border-transparent px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/10 hover:bg-white/20 hover:shadow-lg"
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
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                            Pendaftaran Online Tersedia
                        </div>
                        <h2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                Pendaftaran Magang
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                            Bergabunglah dengan program magang di KOMDIGI Kota Bandar Lampung dan kembangkan karir Anda di bidang teknologi
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Persyaratan Magang */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Persyaratan Magang</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start space-x-2">
                                <span className="mt-1 text-green-500">•</span>
                                <span>Siswa dan Mahasiswa Aktif</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="mt-1 text-green-500">•</span>
                                <span>Memiliki surat persetujuan dari kampus/sekolah</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="mt-1 text-green-500">•</span>
                                <span>Bersedia mengikuti program magang minimal 1 bulan</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="mt-1 text-green-500">•</span>
                                <span>Memiliki kemampuan dasar komputer dan teknologi</span>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h4 className="mb-3 text-lg font-semibold text-gray-800">Alur Pendaftaran</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>1. Isi formulir pendaftaran di Situs ini</li>
                                <li>2. Upload surat pengantar dari kampus/sekolah</li>
                                <li>3. Tunggu konfirmasi dari admin (maksimal 7 hari kerja)</li>
                                <li>4. Jika diterima, akan dihubungi untuk interview</li>
                                <li>5. Mulai program magang sesuai jadwal yang ditentukan</li>
                            </ul>
                        </div>
                    </div>

                    {/* Form Pendaftaran */}
                    <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-2">
                        <h3 className="mb-6 text-xl font-bold text-gray-800">Formulir Pendaftaran</h3>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Nama Lengkap *"
                                    value={data.nama}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nama', e.target.value)}
                                    error={errors.nama}
                                    required
                                />
                                <Input
                                    label="NIM *"
                                    value={data.nim}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nim', e.target.value)}
                                    error={errors.nim}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Asal Universitas/Sekolah *"
                                    value={data.universitas}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('universitas', e.target.value)}
                                    error={errors.universitas}
                                    required
                                />
                                <Input
                                    label="Jurusan *"
                                    value={data.jurusan}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('jurusan', e.target.value)}
                                    error={errors.jurusan}
                                    required
                                />
                            </div>

                            <Select
                                label="Bidang yang Diminati *"
                                value={data.bidang_id}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('bidang_id', e.target.value)}
                                error={errors.bidang_id}
                                options={[
                                    { value: '', label: 'Pilih bidang yang diminati' },
                                    { value: '1', label: 'Web Development' },
                                    { value: '2', label: 'Mobile Development' },
                                    { value: '3', label: 'UI/UX Design' },
                                    { value: '4', label: 'Data Analytics' },
                                    { value: '5', label: 'Digital Marketing' },
                                ]}
                                required
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Email *"
                                    type="email"
                                    value={data.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                    error={errors.email}
                                    required
                                />
                                <Input
                                    label="No. Telepon *"
                                    value={data.telepon}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('telepon', e.target.value)}
                                    error={errors.telepon}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input
                                    label="Tanggal Mulai Magang *"
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('tanggal_mulai', e.target.value)}
                                    error={errors.tanggal_mulai}
                                    required
                                />
                                <Input
                                    label="Tanggal Selesai Magang *"
                                    type="date"
                                    value={data.tanggal_selesai}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('tanggal_selesai', e.target.value)}
                                    error={errors.tanggal_selesai}
                                    required
                                />
                            </div>

                            <FileInput
                                label="Surat Pengantar dari Kampus/Sekolah *"
                                onChange={(file: File | null) => setData('surat_pengantar', file)}
                                error={errors.surat_pengantar}
                                accept=".pdf,.doc,.docx"
                                helpText="Format: PDF, DOC, DOCX (Max: 5MB)"
                                required
                            />

                            <FileInput
                                label="CV (Opsional)"
                                onChange={(file: File | null) => setData('cv', file)}
                                error={errors.cv}
                                accept=".pdf,.doc,.docx"
                                helpText="Format: PDF, DOC, DOCX (Max: 5MB)"
                            />

                            <Input
                                label="LinkedIn (Opsional)"
                                value={data.linkedin}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('linkedin', e.target.value)}
                                error={errors.linkedin}
                                placeholder="https://linkedin.com/in/username"
                            />

                            <Textarea
                                label="Motivasi Magang"
                                value={data.motivasi}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('motivasi', e.target.value)}
                                error={errors.motivasi}
                                placeholder="Ceritakan motivasi Anda mengikuti program magang di KOMDIGI Kota Bandar Lampung."
                                rows={4}
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition duration-200 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
                            >
                                {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
            {/* Notifikasi */}
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
        </div>
    );
}

type InputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
};

function Input({ label, type = 'text', value, onChange, error, required = false, placeholder }: InputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

type SelectProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    required?: boolean;
    options: { value: string; label: string }[];
};

function Select({ label, value, onChange, error, required = false, options }: SelectProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

type FileInputProps = {
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
    accept?: string;
    helpText?: string;
};

function FileInput({ label, onChange, error, required = false, accept, helpText }: FileInputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="file"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                required={required}
                accept={accept}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}

type TextareaProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
};

function Textarea({ label, value, onChange, error, required = false, placeholder, rows = 3 }: TextareaProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                rows={rows}
                className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
