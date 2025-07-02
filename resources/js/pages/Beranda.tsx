const Beranda = () => {
    return (
        <div className="bg-gray-50">
            <header className="bg-blue-600 p-4 text-white">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-bold">KOMDIGI Kota Bandar Lampung</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="/" className="hover:underline">
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="/daftar-magang" className="hover:underline">
                                    Daftar Magang
                                </a>
                            </li>
                            <li>
                                <a href="/cek-status" className="hover:underline">
                                    Cek Status
                                </a>
                            </li>
                            <li>
                                <a href="/data-mahasiswa" className="hover:underline">
                                    Data Mahasiswa
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <section className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-md">
                    <h2 className="text-2xl font-semibold">Selamat Datang di Website Kementerian Komunikasi dan Digital Kota Bandar Lampung</h2>
                    <p>
                        Kementerian Komunikasi dan Digital Kota Bandar Lampung bekerjasama untuk memberikan pelayanan terbaik dalam bidang komunikasi
                        dan teknologi informasi.
                    </p>
                    <a href="/daftar-magang" className="mt-4 inline-block rounded-lg bg-orange-500 px-6 py-2 text-white">
                        Daftar Magang Sekarang
                    </a>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold">Struktur Organisasi</h3>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        {/* Ulangi struktur ini untuk setiap peran dalam organisasi */}
                        <div className="rounded-lg bg-white p-4 shadow-md">
                            <h4 className="font-bold">Kepala Dinas</h4>
                            <p>Rizky Agung Arisanto, S.T.</p>
                        </div>
                        {/* Tambahkan kartu lain untuk peran lainnya */}
                    </div>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold">Bidang-bidang di KOMDIGI Kota Bandar Lampung</h3>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        {/* Ulangi struktur ini untuk setiap bidang */}
                        <div className="rounded-lg bg-purple-500 p-4 text-white shadow-md">
                            <h4 className="font-bold">Bidang Informasi dan Komunikasi Publik</h4>
                            <p>Kepala Bidang: Rudhy Hartono, SE., M.Si</p>
                            <ul>
                                <li>Hubungan Media</li>
                                <li>Publikasi Informasi</li>
                                <li>Dokumentasi Kegiatan</li>
                            </ul>
                        </div>
                        {/* Tambahkan kartu lain untuk bidang lainnya */}
                    </div>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold">Jabatan Fungsional</h3>
                    <div className="mt-4 grid grid-cols-3 gap-6">
                        {/* Ulangi untuk setiap jabatan */}
                        <div className="rounded-lg bg-white p-4 shadow-md">
                            <h4 className="font-bold">Pranata Hubungan Masyarakat</h4>
                            <p>5 orang</p>
                        </div>
                        {/* Tambahkan kartu lain untuk jabatan lainnya */}
                    </div>
                </section>
            </main>

            <footer className="mt-8 bg-gray-800 p-4 text-white">
                <div className="container mx-auto flex items-center justify-between">
                    <p>© 2023 KOMDIGI Kota Bandar Lampung. All rights reserved.</p>
                    <p>Jalan: Dr. Susilo No.2 Bandar Lampung, Kota Bandar Lampung</p>
                    <div>
                        <p>Kontak: (0721) 481301</p>
                        <p>Email: diskoinfo@bandarlampungkota.go.id</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Beranda;
