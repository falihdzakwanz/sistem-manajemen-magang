import { useForm } from '@inertiajs/react';
import { ArrowLeft, Check, Eye, EyeOff, LoaderCircle, Shield, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { route } from 'ziggy-js';

interface ResetPasswordProps {
    token: string;
    email: string;
    currentUsername?: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email, currentUsername }: ResetPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token: token,
        email: email,
        username: currentUsername || 'admin', // Use current username or fallback to 'admin'
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.password.update'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    // Password validation helper
    const validatePassword = (password: string) => {
        const rules = [
            {
                test: password.length >= 8,
                message: 'Minimal 8 karakter',
                key: 'length',
            },
            {
                test: /[A-Z]/.test(password),
                message: 'Huruf besar (A-Z)',
                key: 'uppercase',
            },
            {
                test: /[a-z]/.test(password),
                message: 'Huruf kecil (a-z)',
                key: 'lowercase',
            },
            {
                test: /\d/.test(password),
                message: 'Angka (0-9)',
                key: 'number',
            },
            {
                test: /[@$!%*?&]/.test(password),
                message: 'Karakter khusus (@$!%*?&)',
                key: 'special',
            },
        ];
        return rules;
    };

    const passwordRules = validatePassword(data.password);
    const isPasswordValid = passwordRules.every((rule) => rule.test);
    const isPasswordMatch = data.password === data.password_confirmation && data.password_confirmation !== '';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Buat Password Baru</h2>
                    <p className="text-gray-600">Sistem Manajemen Magang</p>
                    <p className="text-sm text-gray-500">Dinas Kominfo Kota Bandar Lampung</p>
                </div>

                {/* Info Box */}
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Shield className="mt-0.5 h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <h3 className="mb-1 text-sm font-medium text-blue-800">Reset Password & Username untuk:</h3>
                            <p className="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-700">{email}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-700">
                            Username Admin Baru
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder={currentUsername ? `Username saat ini: ${currentUsername}` : 'Masukkan username admin baru'}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && <div className="mt-1 text-sm text-red-600">{errors.username}</div>}
                        <div className="mt-1 space-y-1">
                            {currentUsername && (
                                <p className="text-xs text-blue-600">
                                    💡 Username sebelumnya: <strong>{currentUsername}</strong>
                                </p>
                            )}
                            <p className="text-xs text-gray-500">Username akan digunakan untuk login ke sistem admin.</p>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                            Password Baru
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoFocus
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan password baru"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.password && <div className="mt-1 text-sm text-red-600">{errors.password}</div>}
                    </div>

                    {/* Password Confirmation */}
                    <div>
                        <label htmlFor="password_confirmation" className="mb-2 block text-sm font-semibold text-gray-700">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input
                                id="password_confirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Konfirmasi password baru"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            >
                                {showPasswordConfirmation ? (
                                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.password_confirmation && <div className="mt-1 text-sm text-red-600">{errors.password_confirmation}</div>}
                    </div>

                    {/* Password Requirements */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h4 className="mb-3 text-sm font-medium text-gray-800">Persyaratan Password:</h4>
                        <div className="space-y-2">
                            {passwordRules.map((rule) => (
                                <div key={rule.key} className="flex items-center">
                                    {rule.test ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <X className="mr-2 h-4 w-4 text-red-500" />}
                                    <span className={`text-sm ${rule.test ? 'text-green-700' : 'text-red-700'}`}>{rule.message}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Password Match Indicator */}
                    {data.password_confirmation && (
                        <div className="rounded-lg border p-4">
                            <div className="flex items-center">
                                {isPasswordMatch ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <X className="mr-2 h-4 w-4 text-red-500" />}
                                <span className={`text-sm ${isPasswordMatch ? 'text-green-700' : 'text-red-700'}`}>
                                    {isPasswordMatch ? 'Password cocok' : 'Password tidak cocok'}
                                </span>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        disabled={processing || !isPasswordValid || !isPasswordMatch}
                    >
                        {processing && <LoaderCircle className="mr-2 inline h-4 w-4 animate-spin" />}
                        {processing ? 'Memperbarui...' : 'Perbarui Password & Username'}
                    </button>
                </form>

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
            </div>
        </div>
    );
}
