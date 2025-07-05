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
        <div className="flex min-h-screen items-center justify-center bg-blue-50">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-6 text-center">
                    <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="mx-auto mb-4 h-16 w-16 object-contain" />
                    <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
                    <p className="text-gray-500">Sistem Manajemen Magang</p>
                    <p className="text-sm text-gray-400">Dinas Kominfo Kota Bandar Lampung</p>
                </div>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-4">
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
                                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                id="show_password"
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword((prev) => !prev)}
                                className="accent-blue-600"
                                disabled={processing}
                            />
                            <span className="text-xs text-black select-none">Tampilkan Password</span>
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Masuk
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Demo Login: <br />
                        Username: admin <br />
                        Password: admin123
                    </div>
                </form>
                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </div>
        </div>
    );
}
