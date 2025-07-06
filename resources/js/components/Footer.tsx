import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 py-10 text-white">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
                <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="grid grid-cols-1 gap-16 pl-16 md:grid-cols-3">
                    <div className="space-y-4">
                        <div className="mb-4 flex items-center space-x-3">
                            <div className="flex h-12 w-12 transform items-center justify-center rounded-lg bg-gradient-to-br from-white to-blue-50 transition-transform duration-300 hover:scale-110">
                                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="h-10 w-10 object-contain" />
                            </div>
                            <div>
                                <h3 className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-xl font-bold text-transparent">
                                    Dinas Kominfo
                                </h3>
                                <p className="text-sm text-gray-300">Kota Bandar Lampung</p>
                            </div>
                        </div>
                        <p className="leading-relaxed text-gray-300">Jl. Dr. Susilo No.2 Bandar Lampung, Kota Bandar Lampung, Lampung 35214</p>
                        <div className="mt-6 flex space-x-4">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/kominfobandarlampung/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-pink-500/20 transition-colors hover:bg-pink-500/30"
      >
        <FaInstagram className="text-pink-400 text-xl transition-transform group-hover:scale-110" />
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/kominfobandarlampung/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-black/20 transition-colors hover:bg-black/30"
      >
        <FaTiktok className="text-white text-xl transition-transform group-hover:scale-110" />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/kominfobandarlampung/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-blue-500/20 transition-colors hover:bg-blue-500/30"
      >
        <FaFacebook className="text-blue-400 text-xl transition-transform group-hover:scale-110" />
      </a>
    </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="mb-4 text-xl font-bold text-blue-300">Kontak Kami</h3>
                        <div className="space-y-3">
                            <div className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 transition-colors group-hover:bg-blue-500/30">
                                    <span className="text-blue-300">📞</span>
                                </div>
                                <span className="text-gray-300 transition-colors group-hover:text-white">(0721) 481301</span>
                            </div>
                            <div className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 transition-colors group-hover:bg-purple-500/30">
                                    <span className="text-purple-300">✉️</span>
                                </div>
                                <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
                                    diskoinfo@bandarlampungkota.go.id
                                </span>
                            </div>
                            <a
                                href="https://bandarlampungkota.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex cursor-pointer items-center space-x-3 rounded-lg p-3 text-2xl transition-all duration-300 hover:bg-white/5"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 transition-colors group-hover:bg-green-500/30">
                                    <span className="text-green-300">🌐</span>
                                </div>
                                <span className="text-sm text-gray-300 transition-colors group-hover:text-white">bandarlampungkota.go.id</span>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="mb-4 text-xl font-bold text-blue-300">Jam Kerja</h3>
                        <div className="space-y-3">
                            <div className="group flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 transition-colors group-hover:bg-green-500/30">
                                    <span className="text-green-300">🕒</span>
                                </div>
                                <div>
                                    <p className="text-gray-300 transition-colors group-hover:text-white">Senin - Jumat</p>
                                    <p className="text-sm text-gray-400">07:30 - 15:30 WIB</p>
                                </div>
                            </div>
                            <div className="group flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-white/5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 transition-colors group-hover:bg-red-500/30">
                                    <span className="text-red-300">🚫</span>
                                </div>
                                <div>
                                    <p className="text-gray-300 transition-colors group-hover:text-white">Sabtu - Minggu</p>
                                    <p className="text-sm text-gray-400">Tutup</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-15 text-center">
                    <p className="text-gray-400">© 2025 Dinas Kominfo Kota Bandar Lampung. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
