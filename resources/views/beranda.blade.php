@extends('layouts.main')

@section('css')
<style>
/* Contoh CSS, silakan tambahkan/ubah sesuai kebutuhan */
.header {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}
.logo img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}
.logo-text h1 {
  font-size: 1.5rem;
  font-weight: 700;
}
.logo-text p {
  font-size: 0.9rem;
  opacity: 0.9;
}
.navbar {
  display: flex;
  align-items: center;
}
.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.nav-link:hover,
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}
.hamburger span {
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: 0.3s;
}
.main {
  margin-top: 80px;
  min-height: calc(100vh - 80px);
}
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
}
.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.hero-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}
.hero-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.hero-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
.footer {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}
.footer-section h3 {
  margin-bottom: 1rem;
  color: #3498db;
}
.footer-section p {
  margin-bottom: 0.5rem;
  opacity: 0.9;
}
.footer-section i {
  margin-right: 0.5rem;
  color: #3498db;
}
.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
}
/* Responsive */
@media (max-width: 768px) {
  .header .container { padding: 0 15px; }
  .nav-menu {
    position: fixed;
    top: 80px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: linear-gradient(135deg, #2c3e50, #3498db);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 2rem;
    transition: left 0.3s ease;
    gap: 0;
  }
  .nav-menu.active { left: 0; }
  .nav-menu li { width: 100%; text-align: center; }
  .nav-link {
    display: block;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .hamburger { display: flex; }
  .hero .container { grid-template-columns: 1fr; text-align: center; }
}
</style>
@endsection

@section('content')
    {{-- Header --}}
    <header class="header">
      <div class="container">
        <div class="logo">
          <img src="https://via.placeholder.com/60x60?text=LOGO" alt="Logo Bandar Lampung" />
          <div class="logo-text">
            <h1>Dinas Kominfo</h1>
            <p>Kota Bandar Lampung</p>
          </div>
        </div>
        <nav class="navbar">
          <ul class="nav-menu">
            <li><a href="{{ url('/') }}" class="nav-link active">Beranda</a></li>
            <li><a href="{{ route('daftar-magang') }}" class="nav-link">Daftar Magang</a></li>
            <li><a href="{{ route('cek-status') }}" class="nav-link">Cek Status</a></li>
          </ul>
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>

    {{-- Main Content --}}
    <main class="main">
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h2>Selamat Datang di Website Dinas Kominfo Bandar Lampung</h2>
                    <p>Dinas Komunikasi dan Informatika Kota Bandar Lampung berkomitmen untuk memberikan pelayanan terbaik dalam bidang komunikasi dan teknologi informasi.</p>
                    <a href="{{ route('daftar-magang') }}" class="btn-primary">Daftar Magang Sekarang</a>
                </div>
                <div class="hero-image">
                    <img src="https://via.placeholder.com/500x300?text=Gedung+Kominfo" alt="Gedung Dinas Kominfo" />
                </div>
            </div>
        </section>
        {{-- Lanjutkan dengan section about, struktur, bidang, dsb --}}
    </main>

    {{-- Footer --}}
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Dinas Kominfo Bandar Lampung</h3>
            <p>Jl. Raden Intan No.1, Tanjungkarang Pusat, Kota Bandar Lampung, Lampung 35214</p>
          </div>
          <div class="footer-section">
            <h3>Kontak</h3>
            <p><i class="fas fa-phone"></i> (0721) 123456</p>
            <p><i class="fas fa-envelope"></i> kominfo@bandarlampungkota.go.id</p>
          </div>
          <div class="footer-section">
            <h3>Jam Kerja</h3>
            <p>Senin - Jumat: 08:00 - 16:00 WIB</p>
            <p>Sabtu - Minggu: Tutup</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Dinas Kominfo Bandar Lampung. All rights reserved.</p>
        </div>
      </div>
    </footer>
@endsection

@section('scripts')
    {{-- Jika ingin menambah script khusus, bisa di sini --}}
@endsection