import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    username: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {
                reset();
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4 py-6">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-6 text-center">
                    <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="mx-auto mb-4 h-12 w-12 object-contain sm:h-16 sm:w-16" />
                    <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">Admin Dashboard</h2>
                    <p className="text-sm text-gray-500 sm:text-base">Sistem Manajemen Magang</p>
                    <p className="text-xs text-gray-400 sm:text-sm">Dinas Kominfo Kota Bandar Lampung</p>
                </div>
                <form className="flex flex-col gap-4 sm:gap-6" onSubmit={submit}>
                    <div className="grid gap-3 sm:gap-4">
                        <div>
                            <Label htmlFor="username" className="mb-1 block text-sm font-bold text-black">
                                Username
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                autoFocus
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="Masukkan username"
                                className="h-11 border-gray-300 text-base focus:ring-2 focus:ring-blue-500 sm:h-10 sm:text-sm"
                            />
                            <InputError message={errors.username} />
                        </div>
                        <div>
                            <Label htmlFor="password" className="mb-1 block text-sm font-bold text-black">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan password"
                                className="h-11 border-gray-300 text-base focus:ring-2 focus:ring-blue-500 sm:h-10 sm:text-sm"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                id="show_password"
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword((prev) => !prev)}
                                className="h-4 w-4 accent-blue-600"
                                disabled={processing}
                            />
                            <span className="text-sm text-black select-none sm:text-xs">Tampilkan Password</span>
                        </div>
                        <Button
                            type="submit"
                            className="mt-3 h-11 w-full rounded-lg bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-4 sm:h-10 sm:text-sm"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Masuk
                        </Button>
                    </div>
                </form>

                {/* Status Message */}
                {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}

                {/* Link Lupa Password */}
                <div className="mt-4 text-center sm:mt-6">
                    <a
                        href={route('admin.password.request')}
                        className="text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                    >
                        Lupa password atau username?
                    </a>
                </div>
            </div>
        </div>
    );
}
