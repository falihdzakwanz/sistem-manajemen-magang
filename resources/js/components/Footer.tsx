import { Github } from 'lucide-react';
import { IconDisplay } from './IconPicker';

const Footer = () => {
    const developers = [
        { name: 'Falih Dzakwan Zuhdi', url: 'https://github.com/falihdzakwanz' },
        { name: 'Bayu Ega Ferdana', url: 'https://github.com/Yuuggaa' },
        { name: 'Sakti Mujahid Imani', url: 'https://github.com/Sakti-122140123' },
        {
            name: 'Muhammad Fadhil Zurani',
            url: 'https://github.com/mfadhilzurani122140146',
        },
    ];
    return (
        <footer className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 py-12 text-white">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
                <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    {/* Organization Info */}
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="flex flex-col items-center space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                            <div className="flex h-16 w-16 transform items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition-transform duration-300 hover:scale-110">
                                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-12 w-12 object-contain" />
                            </div>
                            <div>
                                <h3 className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-2xl font-bold text-transparent">
                                    Dinas Kominfo
                                </h3>
                                <p className="text-base text-gray-300">Kota Bandar Lampung</p>
                            </div>
                        </div>
                        <p className="mx-auto max-w-sm leading-relaxed text-gray-300 lg:mx-0">
                            Jl. Dr. Susilo No.2 Bandar Lampung, Kota Bandar Lampung, Lampung 35214
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h3 className="text-center text-xl font-bold text-blue-300 lg:text-left">Kontak Kami</h3>
                        <div className="mx-auto max-w-sm space-y-3 lg:mx-0 lg:max-w-none">
                            <a
                                href="tel:(0721) 481301"
                                className="group flex w-full items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20 transition-colors group-hover:bg-blue-500/30">
                                    <IconDisplay iconName="phone" className="h-5 w-5 text-blue-300" />
                                </div>
                                <span className="min-w-0 flex-1 text-gray-300 transition-colors group-hover:text-white">(0721) 481301</span>
                            </a>
                            <a
                                href="mailto:diskoinfo@bandarlampungkota.go.id"
                                className="group flex w-full items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/20 transition-colors group-hover:bg-purple-500/30">
                                    <IconDisplay iconName="mail" className="h-5 w-5 text-purple-300" />
                                </div>
                                <span className="min-w-0 flex-1 text-sm break-words text-gray-300 transition-colors group-hover:text-white">
                                    diskoinfo@bandarlampungkota.go.id
                                </span>
                            </a>
                            <a
                                href="https://bandarlampungkota.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5"
                            >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/20 transition-colors group-hover:bg-green-500/30">
                                    <IconDisplay iconName="globe" className="h-5 w-5 text-green-300" />
                                </div>
                                <span className="min-w-0 flex-1 text-sm text-gray-300 transition-colors group-hover:text-white">
                                    bandarlampungkota.go.id
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-6">
                        <h3 className="text-center text-xl font-bold text-blue-300 lg:text-left">Jam Kerja</h3>
                        <div className="mx-auto max-w-sm space-y-3 lg:mx-0 lg:max-w-none">
                            <div className="flex w-full items-center space-x-3 rounded-lg p-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/20">
                                    <IconDisplay iconName="clock" className="h-5 w-5 text-green-300" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-gray-300">Senin - Jumat</p>
                                    <p className="text-sm text-gray-400">07:30 - 15:30 WIB</p>
                                </div>
                            </div>
                            <div className="flex w-full items-center space-x-3 rounded-lg p-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                                    <IconDisplay iconName="x" className="h-5 w-5 text-red-300" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-gray-300">Sabtu - Minggu</p>
                                    <p className="text-sm text-gray-400">Tutup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developers Section */}
                <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="text-center">
                        <h3 className="mb-6 text-lg font-bold text-blue-300">Daftar Pengembang</h3>
                        <div className="mx-auto max-w-4xl">
                            {/* Desktop Layout - Grid */}
                            <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
                                {developers.map((developer, index) => (
                                    <a
                                        key={index}
                                        href={developer.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center space-y-2 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:bg-white/5"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-colors group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                                            <Github className="h-6 w-6 text-blue-300 group-hover:text-blue-200" />
                                        </div>
                                        <span className="text-center text-sm leading-tight font-medium text-gray-300 transition-colors group-hover:text-white">
                                            {developer.name}
                                        </span>
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Layout - Vertical List */}
                            <div className="space-y-3 md:hidden">
                                {developers.map((developer, index) => (
                                    <a
                                        key={index}
                                        href={developer.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group mx-auto flex max-w-sm items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-colors group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                                            <Github className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                                        </div>
                                        <span className="min-w-0 flex-1 text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                                            {developer.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 border-t border-white/10 pt-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-400">© 2025 Dinas Kominfo Kota Bandar Lampung. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
