interface NavbarProps {
    currentPage: 'beranda' | 'daftar-magang' | 'cek-status' | 'data-mahasiswa';
}

const Navbar = ({ currentPage }: NavbarProps) => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-2xl backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-14 w-14 transform items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-6">
                            <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-2xl font-bold text-transparent">
                                Dinas Kominfo
                            </h1>
                            <p className="text-sm font-medium opacity-90">Kota Bandar Lampung</p>
                        </div>
                    </div>
                    <nav className="hidden space-x-2 md:flex">
                        <a
                            href="/"
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'beranda'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Beranda
                        </a>
                        <a
                            href="/daftar-magang"
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'daftar-magang'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Daftar Magang
                        </a>
                        <a
                            href="/status-pendaftaran"
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'cek-status'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
                        >
                            Cek Status
                        </a>
                        <a
                            href="/data-mahasiswa"
                            className={`rounded-xl border px-6 py-3 font-medium transition-all duration-300 hover:scale-105 ${
                                currentPage === 'data-mahasiswa'
                                    ? 'border-white/10 bg-white/20 shadow-lg backdrop-blur-sm hover:bg-white/30 hover:shadow-xl'
                                    : 'border-transparent backdrop-blur-sm hover:border-white/10 hover:bg-white/20 hover:shadow-lg'
                            }`}
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
    );
};

export default Navbar;
