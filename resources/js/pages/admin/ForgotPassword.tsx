import { router } from '@inertiajs/react';
import { ArrowLeft, ChevronDown, LoaderCircle, Mail, Shield } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';

interface Admin {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface ForgotPasswordProps {
    status?: string;
    admins: Admin[];
}

export default function ForgotPassword({ status, admins = [] }: ForgotPasswordProps) {
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedAdmin = selectedAdminId ? admins.find((admin) => admin.id === selectedAdminId) : null;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!selectedAdminId || isSubmitting) {
            if (!selectedAdminId) {
                alert('Silakan pilih admin terlebih dahulu');
            }
            return;
        }

        setIsSubmitting(true);

        // Submit using router.post
        router.post(
            route('admin.password.email'),
            {
                admin_id: selectedAdminId,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-6">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-4 shadow-2xl sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 text-center sm:mb-8">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg sm:mb-4 sm:h-20 sm:w-20">
                        <Shield className="h-8 w-8 text-white sm:h-10 sm:w-10" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">Reset Password</h2>
                    <p className="text-sm text-gray-600 sm:text-base">Sistem Manajemen Magang</p>
                    <p className="text-xs text-gray-500 sm:text-sm">Dinas Kominfo Kota Bandar Lampung</p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 sm:mb-6 sm:p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Mail className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
                            </div>
                            <div className="ml-2 sm:ml-3">
                                <p className="text-xs font-medium text-green-800 sm:text-sm">{status}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 sm:mb-6 sm:p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Mail className="mt-0.5 h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
                        </div>
                        <div className="ml-2 sm:ml-3">
                            <h3 className="mb-1 text-xs font-medium text-blue-800 sm:text-sm">Reset Password & Username Admin</h3>
                            <p className="text-xs text-blue-700 sm:text-sm">
                                Pilih akun admin yang ingin direset, kemudian klik tombol untuk mengirim link reset ke email admin yang dipilih. Anda
                                dapat mengubah password dan username admin melalui link tersebut.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-4 sm:space-y-6">
                    {/* Admin Selection */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-xs font-medium text-gray-800 sm:text-sm">Pilih Akun Admin yang akan direset:</label>
                        {admins.length > 0 ? (
                            <div className="relative">
                                <select
                                    value={selectedAdminId || ''}
                                    onChange={(e) => setSelectedAdminId(e.target.value ? Number(e.target.value) : null)}
                                    className="w-full appearance-none truncate rounded-lg border border-gray-300 bg-white px-3 py-3 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:px-4 sm:text-sm"
                                    required
                                >
                                    <option value="">-- Pilih Admin --</option>
                                    {admins.map((admin) => (
                                        <option key={admin.id} value={admin.id} className="truncate">
                                            {admin.name} ({admin.username})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400 sm:right-3" />
                            </div>
                        ) : (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3 sm:p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Shield className="h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="ml-2 sm:ml-3">
                                        <p className="text-xs font-medium text-red-800 sm:text-sm">
                                            Tidak ada data admin yang tersedia. Silakan hubungi administrator sistem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Selected Admin Info */}
                    {selectedAdmin && (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs font-medium text-gray-800 sm:text-sm">Admin yang dipilih:</h4>
                                    <p className="truncate text-xs font-semibold text-gray-700 sm:text-sm">{selectedAdmin.name}</p>
                                    <p className="truncate text-xs text-gray-600 sm:text-sm">Username: {selectedAdmin.username}</p>
                                    <p className="truncate font-mono text-xs text-gray-600 sm:text-sm">Email: {selectedAdmin.email}</p>
                                </div>
                                <div className="ml-2 flex-shrink-0">
                                    <Shield className="h-5 w-5 text-green-500 sm:h-6 sm:w-6" />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Link reset akan dikirim ke email ini untuk keamanan maksimal.</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-auto sm:py-3 sm:text-base"
                        disabled={isSubmitting || !selectedAdminId || admins.length === 0}
                    >
                        <div className="flex items-center justify-center px-2">
                            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 flex-shrink-0 animate-spin" />}
                            <Mail className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="min-w-0 truncate text-center">
                                {admins.length === 0 ? (
                                    'Tidak Ada Data Admin'
                                ) : selectedAdminId ? (
                                    <>
                                        <span className="hidden sm:inline">Kirim Link Reset ke {selectedAdmin?.name}</span>
                                        <span className="sm:hidden">Kirim ke {selectedAdmin?.name?.split(' ')[0] || selectedAdmin?.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Pilih Admin Terlebih Dahulu</span>
                                        <span className="sm:hidden">Pilih Admin</span>
                                    </>
                                )}
                            </span>
                        </div>
                    </Button>
                </form>

                {/* Security Notice */}
                <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 sm:mt-6 sm:p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Shield className="mt-0.5 h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
                        </div>
                        <div className="ml-2 sm:ml-3">
                            <h3 className="mb-1 text-xs font-medium text-yellow-800 sm:text-sm">Catatan Keamanan</h3>
                            <div className="text-xs text-yellow-700 sm:text-sm">
                                <ul className="list-inside list-disc space-y-1">
                                    <li>Link reset akan kedaluwarsa dalam 60 menit</li>
                                    <li>Link hanya dapat digunakan sekali</li>
                                    <li>Jangan bagikan link kepada orang lain</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Login */}
                <div className="mt-6 text-center sm:mt-8">
                    <a
                        href={route('login')}
                        className="inline-flex items-center text-xs font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500 sm:text-sm"
                    >
                        <ArrowLeft className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                        Kembali ke Halaman Login
                    </a>
                </div>

                {/* Footer */}
                <div className="mt-6 border-t border-gray-200 pt-4 text-center sm:mt-8 sm:pt-6">
                    <p className="text-xs text-gray-500">
                        Sistem ini dilindungi dengan enkripsi dan protokol keamanan tinggi.
                        <br />
                        Jika Anda mengalami kesulitan, hubungi administrator sistem.
                    </p>
                </div>
            </div>
        </div>
    );
}
