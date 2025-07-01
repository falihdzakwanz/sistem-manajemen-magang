index.html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dinas Kominfo Bandar Lampung</title>
    <link rel="stylesheet" href="style.css" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <img
            src="https://via.placeholder.com/60x60?text=LOGO"
            alt="Logo Bandar Lampung"
          />
          <div class="logo-text">
            <h1>Dinas Kominfo</h1>
            <p>Kota Bandar Lampung</p>
          </div>
        </div>
        <nav class="navbar">
          <ul class="nav-menu">
            <li><a href="#home" class="nav-link active">Beranda</a></li>
            <li>
              <a href="#" class="nav-link" onclick="showPage('daftar-magang')"
                >Daftar Magang</a
              >
            </li>
            <li>
              <a href="#" class="nav-link" onclick="showPage('cek-status')"
                >Cek Status</a
              >
            </li>
            <li>
              <a href="#" class="nav-link" onclick="showPage('data-mahasiswa')"
                >Data Mahasiswa</a
              >
            </li>
          </ul>
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- Halaman Beranda -->
      <section id="home" class="page active">
        <!-- Hero Section -->
        <section class="hero">
          <div class="container">
            <div class="hero-content">
              <h2>Selamat Datang di Website Dinas Kominfo Bandar Lampung</h2>
              <p>
                Dinas Komunikasi dan Informatika Kota Bandar Lampung berkomitmen
                untuk memberikan pelayanan terbaik dalam bidang komunikasi dan
                teknologi informasi.
              </p>
              <button class="btn-primary" onclick="showPage('daftar-magang')">
                Daftar Magang Sekarang
              </button>
            </div>
            <div class="hero-image">
              <img
                src="https://via.placeholder.com/500x300?text=Gedung+Kominfo"
                alt="Gedung Dinas Kominfo"
              />
            </div>
          </div>
        </section>

        <!-- Tentang Section -->
        <section class="about">
          <div class="container">
            <h2>Tentang Dinas Kominfo Bandar Lampung</h2>
            <div class="about-grid">
              <div class="about-text">
                <p>
                  Dinas Komunikasi dan Informatika Kota Bandar Lampung merupakan
                  unsur pelaksana urusan pemerintahan di bidang komunikasi dan
                  informatika yang menjadi kewenangan daerah.
                </p>
                <p>
                  Dinas ini memiliki tugas melaksanakan urusan pemerintahan di
                  bidang komunikasi dan informatika berdasarkan asas otonomi dan
                  tugas pembantuan.
                </p>
              </div>
              <div class="stats">
                <div class="stat-item">
                  <i class="fas fa-users"></i>
                  <h3>50+</h3>
                  <p>Pegawai</p>
                </div>
                <div class="stat-item">
                  <i class="fas fa-building"></i>
                  <h3>5</h3>
                  <p>Bidang</p>
                </div>
                <div class="stat-item">
                  <i class="fas fa-graduation-cap"></i>
                  <h3>100+</h3>
                  <p>Alumni Magang</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Struktur Organisasi -->
        <section class="struktur">
          <div class="container">
            <h2>Struktur Organisasi</h2>
            <div class="struktur-chart">
              <div class="chart-placeholder">
                <img
                  src="https://via.placeholder.com/800x600?text=Bagan+Struktur+Organisasi"
                  alt="Struktur Organisasi"
                />
                <p>
                  <em>Pohon struktur organisasi akan ditempatkan di sini</em>
                </p>
              </div>
            </div>

            <!-- Pimpinan -->
            <div class="leadership">
              <div class="leader-card">
                <img
                  src="https://via.placeholder.com/120x120?text=Foto"
                  alt="Kepala Dinas"
                />
                <h3>Rizky Agung Arisanto, S.T.</h3>
                <p>Kepala Dinas</p>
              </div>
              <div class="leader-card">
                <img
                  src="https://via.placeholder.com/120x120?text=Foto"
                  alt="Sekretaris"
                />
                <h3>Arienge Rahman, S.Kom., M.M</h3>
                <p>Sekretaris Dinas</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Bidang-bidang -->
        <section class="bidang">
          <div class="container">
            <h2>Bidang-bidang di Dinas Kominfo</h2>
            <div class="bidang-grid">
              <div class="bidang-card">
                <i class="fas fa-broadcast-tower"></i>
                <h3>Bidang Informasi dan Komunikasi Publik</h3>
                <p>Kepala Bidang: Rudhy Hartono, SE., M.Si.</p>
                <ul>
                  <li>Hubungan Media</li>
                  <li>Publikasi Informasi</li>
                  <li>Dokumentasi Kegiatan</li>
                </ul>
              </div>
              <div class="bidang-card">
                <i class="fas fa-server"></i>
                <h3>Bidang Pemberdayaan E-Government</h3>
                <p>Kepala Bidang: Fachrizal, S.Kom, M.Kom</p>
                <ul>
                  <li>Jaringan Komputer</li>
                  <li>Data Center</li>
                  <li>Keamanan Sistem</li>
                </ul>
              </div>
              <div class="bidang-card">
                <i class="fas fa-mobile-alt"></i>
                <h3>Bidang Persandian, Pos dan Telekomunikasi</h3>
                <p>Kepala Bidang: Nursari, S.Sos., MM</p>
                <ul>
                  <li>Pengembangan Aplikasi</li>
                  <li>E-Government</li>
                  <li>Smart City</li>
                </ul>
              </div>
              <div class="bidang-card">
                <i class="fas fa-shield-alt"></i>
                <h3>Bidang Persandian dan Keamanan Informasi</h3>
                <p>Kepala Bidang: Dr. Andi Pratama, M.Eng</p>
                <ul>
                  <li>Keamanan Siber</li>
                  <li>Enkripsi Data</li>
                  <li>Audit Keamanan</li>
                </ul>
              </div>
              <div class="bidang-card">
                <i class="fas fa-chart-line"></i>
                <h3>Bidang Statistik dan Persandian</h3>
                <p>Kepala Bidang: Lina Marlina, S.Si, M.Stat</p>
                <ul>
                  <li>Analisis Data</li>
                  <li>Statistik Daerah</li>
                  <li>Big Data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Jabatan Fungsional -->
        <section class="fungsional">
          <div class="container">
            <h2>Jabatan Fungsional</h2>
            <div class="fungsional-grid">
              <div class="fungsional-item">
                <h4>Pranata Hubungan Masyarakat</h4>
                <p>5 orang</p>
              </div>
              <div class="fungsional-item">
                <h4>Analis Sistem</h4>
                <p>3 orang</p>
              </div>
              <div class="fungsional-item">
                <h4>Programmer</h4>
                <p>8 orang</p>
              </div>
              <div class="fungsional-item">
                <h4>Network Administrator</h4>
                <p>4 orang</p>
              </div>
              <div class="fungsional-item">
                <h4>Database Administrator</h4>
                <p>2 orang</p>
              </div>
              <div class="fungsional-item">
                <h4>Web Designer</h4>
                <p>3 orang</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- Halaman Daftar Magang -->
      <section id="daftar-magang" class="page">
        <div class="container">
          <div class="page-header">
            <h2>Pendaftaran Magang</h2>
            <p>
              Bergabunglah dengan program magang di Dinas Kominfo Bandar Lampung
            </p>
          </div>

          <div class="registration-content">
            <div class="requirements">
              <h3>Persyaratan Magang</h3>
              <ul>
                <li>
                  Mahasiswa aktif S1/D3/D4 bidang Informatika, Komputer, atau
                  bidang terkait
                </li>
                <li>Minimal semester 5 untuk S1 atau semester 3 untuk D3/D4</li>
                <li>Memiliki IPK minimal 3.0</li>
                <li>Menyertakan surat pengantar dari kampus/sekolah</li>
                <li>Bersedia mengikuti program magang minimal 2 bulan</li>
                <li>Memiliki kemampuan dasar komputer dan teknologi</li>
              </ul>

              <h3>Alur Pendaftaran</h3>
              <ol>
                <li>Isi formulir pendaftaran di bawah ini</li>
                <li>Upload surat pengantar dari kampus/sekolah</li>
                <li>Tunggu konfirmasi dari admin (maksimal 7 hari kerja)</li>
                <li>Jika diterima, akan dihubungi untuk interview</li>
                <li>Mulai program magang sesuai jadwal yang ditentukan</li>
              </ol>
            </div>

            <div class="registration-form">
              <h3>Formulir Pendaftaran</h3>
              <form id="magangForm">
                <div class="form-group">
                  <label for="namaLengkap">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="namaLengkap"
                    name="namaLengkap"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="nim">NIM *</label>
                  <input type="text" id="nim" name="nim" required />
                </div>

                <div class="form-group">
                  <label for="asalSekolah">Asal Universitas/Sekolah *</label>
                  <input
                    type="text"
                    id="asalSekolah"
                    name="asalSekolah"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="jurusan">Jurusan *</label>
                  <input type="text" id="jurusan" name="jurusan" required />
                </div>

                <div class="form-group">
                  <label for="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div class="form-group">
                  <label for="telepon">No. Telepon *</label>
                  <input type="tel" id="telepon" name="telepon" required />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="tanggalMulai">Tanggal Mulai Magang *</label>
                    <input
                      type="date"
                      id="tanggalMulai"
                      name="tanggalMulai"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="tanggalSelesai">Tanggal Selesai Magang *</label>
                    <input
                      type="date"
                      id="tanggalSelesai"
                      name="tanggalSelesai"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="suratPengantar"
                    >Surat Pengantar dari Kampus/Sekolah *</label
                  >
                  <input
                    type="file"
                    id="suratPengantar"
                    name="suratPengantar"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <small>Format: PDF, DOC, DOCX (Max: 5MB)</small>
                </div>

                <div class="form-group">
                  <label for="cv">CV (Opsional)</label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                  />
                  <small>Format: PDF, DOC, DOCX (Max: 5MB)</small>
                </div>

                <div class="form-group">
                  <label for="linkedin">LinkedIn (Opsional)</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div class="form-group">
                  <label for="motivasi">Motivasi Magang</label>
                  <textarea
                    id="motivasi"
                    name="motivasi"
                    rows="4"
                    placeholder="Ceritakan motivasi Anda mengikuti program magang di Dinas Kominfo..."
                  ></textarea>
                </div>

                <button type="submit" class="btn-primary">
                  Daftar Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Halaman Cek Status -->
      <section id="cek-status" class="page">
        <div class="container">
          <div class="page-header">
            <h2>Status Pendaftaran Magang</h2>
            <p>Cek status pendaftaran magang yang telah diajukan</p>
          </div>

          <div class="status-table">
            <table id="statusTable">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Universitas</th>
                  <th>Tanggal Daftar</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="statusTableBody">
                <!-- Data akan diisi oleh JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Halaman Data Mahasiswa -->
      <section id="data-mahasiswa" class="page">
        <div class="container">
          <div class="page-header">
            <h2>Data Mahasiswa Magang</h2>
            <p>
              Daftar mahasiswa yang sedang atau telah menyelesaikan program
              magang
            </p>
          </div>

          <div class="mahasiswa-table">
            <table id="mahasiswaTable">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Universitas</th>
                  <th>Jurusan</th>
                  <th>Bidang Penempatan</th>
                  <th>Periode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="mahasiswaTableBody">
                <!-- Data akan diisi oleh JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Dinas Kominfo Bandar Lampung</h3>
            <p>
              Jl. Raden Intan No.1, Tanjungkarang Pusat, Kota Bandar Lampung,
              Lampung 35214
            </p>
          </div>
          <div class="footer-section">
            <h3>Kontak</h3>
            <p><i class="fas fa-phone"></i> (0721) 123456</p>
            <p>
              <i class="fas fa-envelope"></i> kominfo@bandarlampungkota.go.id
            </p>
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

    <script src="script.js"></script>
  </body>
</html>

style.css
/* Reset dan Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
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

/* Main Content */
.main {
  margin-top: 80px;
  min-height: calc(100vh - 80px);
}

.page {
  display: none;
}

.page.active {
  display: block;
}

/* Hero Section */
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

/* About Section */
.about {
  padding: 4rem 0;
  background: white;
}

.about h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.stats {
  display: grid;
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-item i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stat-item h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

/* Struktur Section */
.struktur {
  padding: 4rem 0;
  background: #f8f9fa;
}

.struktur h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.struktur-chart {
  margin-bottom: 3rem;
}

.chart-placeholder {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.chart-placeholder img {
  max-width: 100%;
  border-radius: 10px;
}

.leadership {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.leader-card {
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.leader-card:hover {
  transform: translateY(-5px);
}

.leader-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
}

.leader-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.leader-card p {
  color: #7f8c8d;
  font-weight: 600;
}

/* Bidang Section */
.bidang {
  padding: 4rem 0;
  background: white;
}

.bidang h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.bidang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.bidang-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.bidang-card:hover {
  transform: translateY(-5px);
}

.bidang-card i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.bidang-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.bidang-card p {
  margin-bottom: 1rem;
  font-weight: 600;
  opacity: 0.9;
}

.bidang-card ul {
  list-style: none;
  padding-left: 0;
}

.bidang-card li {
  padding: 0.3rem 0;
  padding-left: 1rem;
  position: relative;
}

.bidang-card li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #ffd700;
  font-weight: bold;
}

/* Fungsional Section */
.fungsional {
  padding: 4rem 0;
  background: #f8f9fa;
}

.fungsional h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.fungsional-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.fungsional-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.fungsional-item:hover {
  transform: translateY(-3px);
}

.fungsional-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.fungsional-item p {
  color: #3498db;
  font-weight: 600;
}

/* Page Header */
.page-header {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  margin-bottom: 3rem;
}

.page-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Registration Content */
.registration-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.requirements {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.requirements h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.requirements ul,
.requirements ol {
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.requirements li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Form Styles */
.registration-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.registration-form h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.form-group input[type="file"] {
  padding: 8px;
  background: #f8f9fa;
}

/* Table Styles */
.status-table,
.mahasiswa-table {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

table td {
  padding: 1rem;
  border-bottom: 1px solid #e1e8ed;
}

table tr:hover {
  background-color: #f8f9fa;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.status-diproses {
  background-color: #fff3cd;
  color: #856404;
}

.status-diterima {
  background-color: #d4edda;
  color: #155724;
}

.status-ditolak {
  background-color: #f8d7da;
  color: #721c24;
}

.status-selesai {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-aktif {
  background-color: #d4edda;
  color: #155724;
}

/* Footer */
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

/* Success/Error Messages */
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.message-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header .container {
    padding: 0 15px;
  }

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

  .nav-menu.active {
    left: 0;
  }

  .nav-menu li {
    width: 100%;
    text-align: center;
  }

  .nav-link {
    display: block;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hamburger {
    display: flex;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .leadership {
    gap: 2rem;
  }

  .bidang-grid {
    grid-template-columns: 1fr;
  }

  .fungsional-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .registration-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .page-header h2 {
    font-size: 2rem;
  }

  table {
    font-size: 0.9rem;
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .hero-content h2 {
    font-size: 1.6rem;
  }

  .page-header h2 {
    font-size: 1.8rem;
  }

  .logo-text h1 {
    font-size: 1.2rem;
  }

  .stat-item {
    padding: 1rem;
  }

  table th,
  table td {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .registration-form,
  .requirements {
    padding: 1.5rem;
  }
}

/* Animation Classes */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Loading Spinner */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Utilities */
.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 1rem;
}

.mb-2 {
  margin-bottom: 1rem;
}

.hidden {
  display: none;
}

.visible {
  display: block;
}

<!-- script.js
// Data Storage (menggunakan variabel global karena tidak ada backend)
let pendaftaranData = [
  {
    id: 1,
    nama: "Ahmad Rizki Pratama",
    nim: "19104001",
    universitas: "Universitas Lampung",
    jurusan: "Teknik Informatika",
    email: "ahmad.rizki@email.com",
    telepon: "08123456789",
    tanggalDaftar: "2025-06-01",
    tanggalMulai: "2025-07-01",
    tanggalSelesai: "2025-09-01",
    status: "diterima",
    bidangPenempatan: "Bidang Aplikasi dan Layanan Digital",
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    nim: "20104002",
    universitas: "Institut Teknologi Sumatera",
    jurusan: "Sistem Informasi",
    email: "siti.nurhaliza@email.com",
    telepon: "08234567890",
    tanggalDaftar: "2025-06-05",
    tanggalMulai: "2025-07-15",
    tanggalSelesai: "2025-09-15",
    status: "diproses",
    bidangPenempatan: "",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    nim: "19104003",
    universitas: "Universitas Bandar Lampung",
    jurusan: "Teknik Komputer",
    email: "budi.santoso@email.com",
    telepon: "08345678901",
    tanggalDaftar: "2025-05-20",
    tanggalMulai: "2025-06-15",
    tanggalSelesai: "2025-08-15",
    status: "selesai",
    bidangPenempatan: "Bidang Infrastruktur TIK",
  },
  {
    id: 4,
    nama: "Maya Dewi",
    nim: "20104004",
    universitas: "Universitas Lampung",
    jurusan: "Ilmu Komputer",
    email: "maya.dewi@email.com",
    telepon: "08456789012",
    tanggalDaftar: "2025-06-10",
    tanggalMulai: "2025-08-01",
    tanggalSelesai: "2025-10-01",
    status: "ditolak",
    bidangPenempatan: "",
  },
  {
    id: 5,
    nama: "Rendra Wijaya",
    nim: "19104005",
    universitas: "Institut Teknologi Sumatera",
    jurusan: "Teknik Informatika",
    email: "rendra.wijaya@email.com",
    telepon: "08567890123",
    tanggalDaftar: "2025-05-15",
    tanggalMulai: "2025-06-01",
    tanggalSelesai: "2025-08-01",
    status: "aktif",
    bidangPenempatan: "Bidang Persandian dan Keamanan Informasi",
  },
];

// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const magangForm = document.getElementById("magangForm");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  loadStatusTable();
  loadMahasiswaTable();
  showPage("home");
});

// Event Listeners
function initializeEventListeners() {
  // Hamburger menu
  hamburger.addEventListener("click", toggleMobileMenu);

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
  });

  // Form submission
  if (magangForm) {
    magangForm.addEventListener("submit", handleFormSubmit);
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Navigation Handler
function handleNavClick(e) {
  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to clicked link
  e.target.classList.add("active");

  // Close mobile menu
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
}

// Show Page Function
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    targetPage.classList.add("fade-in");
  }

  // Update navigation
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("onclick") &&
      link.getAttribute("onclick").includes(pageId)
    ) {
      link.classList.add("active");
    }
  });

  // Special case for home page
  if (pageId === "home") {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }
}

// Form Submission Handler
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(magangForm);
  const data = {};

  // Convert FormData to object
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // Validation
  const requiredFields = [
    "namaLengkap",
    "nim",
    "asalSekolah",
    "jurusan",
    "email",
    "telepon",
    "tanggalMulai",
    "tanggalSelesai",
    "suratPengantar",
  ];
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field] === "") {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    showMessage("Mohon lengkapi semua field yang wajib diisi!", "error");
    return;
  }

  // Validate date range
  const startDate = new Date(data.tanggalMulai);
  const endDate = new Date(data.tanggalSelesai);
  const today = new Date();

  if (startDate < today) {
    showMessage(
      "Tanggal mulai magang tidak boleh kurang dari hari ini!",
      "error"
    );
    return;
  }

  if (endDate <= startDate) {
    showMessage(
      "Tanggal selesai harus lebih besar dari tanggal mulai!",
      "error"
    );
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showMessage("Format email tidak valid!", "error");
    return;
  }

  // Add to data storage
  const newId = Math.max(...pendaftaranData.map((item) => item.id), 0) + 1;
  const newRegistration = {
    id: newId,
    nama: data.namaLengkap,
    nim: data.nim,
    universitas: data.asalSekolah,
    jurusan: data.jurusan,
    email: data.email,
    telepon: data.telepon,
    tanggalDaftar: new Date().toISOString().split("T")[0],
    tanggalMulai: data.tanggalMulai,
    tanggalSelesai: data.tanggalSelesai,
    status: "diproses",
    bidangPenempatan: "",
  };

  pendaftaranData.push(newRegistration);

  // Show success message
  showMessage(
    "Pendaftaran berhasil! Silakan cek status pendaftaran secara berkala.",
    "success"
  );

  // Reset form
  magangForm.reset();

  // Update tables
  loadStatusTable();
  loadMahasiswaTable();
}

// Show Message Function
function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".message");
  existingMessages.forEach((msg) => msg.remove());

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  // Insert message before form
  const form = document.querySelector(".registration-form");
  if (form) {
    form.insertBefore(messageDiv, form.firstChild);

    // Auto remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth" });
  }
}

// Load Status Table
function loadStatusTable() {
  const tableBody = document.getElementById("statusTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  pendaftaranData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.universitas}</td>
            <td>${formatDate(item.tanggalDaftar)}</td>
            <td><span class="status-badge status-${
              item.status
            }">${getStatusText(item.status)}</span></td>
        `;
    tableBody.appendChild(row);
  });
}

// Load Mahasiswa Table
function loadMahasiswaTable() {
  const tableBody = document.getElementById("mahasiswaTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  // Filter only accepted students
  const acceptedStudents = pendaftaranData.filter(
    (item) =>
      item.status === "diterima" ||
      item.status === "aktif" ||
      item.status === "selesai"
  );

  acceptedStudents.forEach((item, index) => {
    const row = document.createElement("tr");
    const periode = `${formatDate(item.tanggalMulai)} - ${formatDate(
      item.tanggalSelesai
    )}`;
    const statusMagang = item.status === "selesai" ? "selesai" : "aktif";

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.universitas}</td>
            <td>${item.jurusan}</td>
            <td>${item.bidangPenempatan || "Belum ditentukan"}</td>
            <td>${periode}</td>
            <td><span class="status-badge status-${statusMagang}">${getStatusText(
      statusMagang
    )}</span></td>
        `;
    tableBody.appendChild(row);
  });
}

// Helper Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

function getStatusText(status) {
  const statusMap = {
    diproses: "Sedang Diproses",
    diterima: "Diterima",
    ditolak: "Ditolak",
    aktif: "Sedang Magang",
    selesai: "Selesai Magang",
  };
  return statusMap[status] || status;
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#home") {
      e.preventDefault();
      showPage("home");
    }
  });
});

// Form Validation Helpers
function validateFileSize(file, maxSizeMB = 5) {
  if (file && file.size > maxSizeMB * 1024 * 1024) {
    return false;
  }
  return true;
}

function validateFileType(file, allowedTypes = [".pdf", ".doc", ".docx"]) {
  if (!file) return true;

  const fileName = file.name.toLowerCase();
  return allowedTypes.some((type) => fileName.endsWith(type.toLowerCase()));
}

// File Upload Handlers
document.addEventListener("change", function (e) {
  if (e.target.type === "file") {
    const file = e.target.files[0];
    const maxSize = 5; // MB
    const allowedTypes = [".pdf", ".doc", ".docx"];

    if (file) {
      if (!validateFileSize(file, maxSize)) {
        alert(`Ukuran file terlalu besar. Maksimal ${maxSize}MB.`);
        e.target.value = "";
        return;
      }

      if (!validateFileType(file, allowedTypes)) {
        alert(`Tipe file tidak didukung. Gunakan: ${allowedTypes.join(", ")}`);
        e.target.value = "";
        return;
      }
    }
  }
});

// Search Functionality (for future enhancement)
function searchTable(tableId, searchTerm) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let found = false;

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(searchTerm.toLowerCase())) {
        found = true;
        break;
      }
    }

    row.style.display = found ? "" : "none";
  }
}

// Auto-refresh tables every 30 seconds (simulate real-time updates)
setInterval(function () {
  loadStatusTable();
  loadMahasiswaTable();
}, 30000);

// Add loading animation to buttons
function addLoadingState(button) {
  const originalText = button.textContent;
  button.innerHTML = '<span class="loading"></span> Memproses...';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, 2000);
}

// Enhanced form submission with loading state
const originalHandleFormSubmit = handleFormSubmit;
handleFormSubmit = function (e) {
  e.preventDefault();

  const submitButton = magangForm.querySelector('button[type="submit"]');
  addLoadingState(submitButton);

  setTimeout(() => {
    originalHandleFormSubmit(e);
  }, 1000);
};

// Print functionality for tables
function printTable(tableId) {
  const table = document.getElementById(tableId);
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
        <html>
            <head>
                <title>Data Magang - Dinas Kominfo Bandar Lampung</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
                    th { background-color: #f5f5f5; }
                    .status-badge { padding: 4px 8px; border-radius: 4px; }
                </style>
            </head>
            <body>
                <h2>Data Magang - Dinas Kominfo Bandar Lampung</h2>
                ${table.outerHTML}
            </body>
        </html>
    `);

  printWindow.document.close();
  printWindow.print();
}

// Export to CSV functionality
function exportToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  const rows = Array.from(table.rows);

  const csvContent = rows
    .map((row) => {
      const cells = Array.from(row.cells);
      return cells
        .map((cell) => {
          // Remove HTML tags and clean text
          const text = cell.textContent.replace(/"/g, '""');
          return `"${text}"`;
        })
        .join(",");
    })
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
} -->