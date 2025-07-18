import { useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Mail, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { post, processing } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Langsung kirim ke admin email yang terdaftar tanpa input
        post(route('admin.password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                    <p className="text-gray-600">Sistem Manajemen Magang</p>
                    <p className="text-sm text-gray-500">Dinas Kominfo Kota Bandar Lampung</p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Mail className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{status}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Mail className="mt-0.5 h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="mb-1 text-sm font-medium text-blue-800">Reset Password & Username Admin</h3>
                            <p className="text-sm text-blue-700">
                                Klik tombol di bawah untuk mengirim link reset ke email admin yang terdaftar di sistem. Anda dapat mengubah password
                                dan username admin melalui link tersebut.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-800">Email Admin Terdaftar:</h4>
                                <p className="font-mono text-sm text-gray-600">fadhilzarani@gmail.com</p>
                            </div>
                            <div className="flex-shrink-0">
                                <Shield className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Link reset akan dikirim ke email ini untuk keamanan maksimal.</p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        <Mail className="mr-2 h-4 w-4" />
                        Kirim Link Reset Password & Username
                    </Button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Shield className="mt-0.5 h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="mb-1 text-sm font-medium text-yellow-800">Catatan Keamanan</h3>
                            <div className="text-sm text-yellow-700">
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
                <div className="mt-8 text-center">
                    <a
                        href={route('login')}
                        className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Halaman Login
                    </a>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-gray-200 pt-6 text-center">
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
