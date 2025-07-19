import { router } from '@inertiajs/react';
import { FileText, Home, Search, Users } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
    currentPage: 'beranda' | 'daftar-magang' | 'cek-status' | 'data-mahasiswa';
}

const Navbar = ({ currentPage }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavigation = (path: string) => {
        router.get(path);
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleNavigation('/')}
                            className="flex h-14 w-14 transform cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-6"
                            title="Kembali ke Beranda"
                        >
                            <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                        </button>
                        <div>
                            <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                                Dinas Kominfo
                            </h1>
                            <p className="text-sm font-medium opacity-90">Kota Bandar Lampung</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden space-x-2 md:flex">
                        <button
                            onClick={() => handleNavigation('/')}
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'beranda'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Beranda
                        </button>
                        <button
                            onClick={() => handleNavigation('/daftar-magang')}
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'daftar-magang'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Daftar Magang
                        </button>
                        <button
                            onClick={() => handleNavigation('/status-pendaftaran')}
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'cek-status'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Cek Status
                        </button>
                        <button
                            onClick={() => handleNavigation('/data-mahasiswa')}
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'data-mahasiswa'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Data Mahasiswa
                        </button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="rounded-lg bg-white/20 p-2 transition-all hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none md:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    className={`transition-all duration-300 ease-in-out md:hidden ${
                        isMobileMenuOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                    }`}
                >
                    <nav className="flex flex-col space-y-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <button
                            onClick={() => handleNavigation('/')}
                            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-300 hover:bg-white/20 ${
                                currentPage === 'beranda' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                            }`}
                        >
                            <Home size={18} />
                            <span>Beranda</span>
                        </button>
                        <button
                            onClick={() => handleNavigation('/daftar-magang')}
                            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-300 hover:bg-white/20 ${
                                currentPage === 'daftar-magang' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                            }`}
                        >
                            <FileText size={18} />
                            <span>Daftar Magang</span>
                        </button>
                        <button
                            onClick={() => handleNavigation('/status-pendaftaran')}
                            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-300 hover:bg-white/20 ${
                                currentPage === 'cek-status' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                            }`}
                        >
                            <Search size={18} />
                            <span>Cek Status</span>
                        </button>
                        <button
                            onClick={() => handleNavigation('/data-mahasiswa')}
                            className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-300 hover:bg-white/20 ${
                                currentPage === 'data-mahasiswa' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
                            }`}
                        >
                            <Users size={18} />
                            <span>Data Mahasiswa</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
