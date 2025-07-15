<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BerandaContent;

class BerandaContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data struktur organisasi
        $strukturOrganisasi = [
            'kepala_dinas' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kepala_dinas',
                'title' => 'Rizky Agung Arisanto, S.T.',
                'description' => 'Kepala Dinas Komunikasi dan Informatika',
                'photo_url' => '/asset/foto-kepala-dinas.jpg'
            ],
            'sekretaris' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'sekretaris',
                'title' => 'Arienge Rahman, S.Kom., M.M',
                'description' => 'Sekretaris Dinas Komunikasi dan Informatika',
                'photo_url' => '/asset/foto-sekretaris.jpg'
            ],
            'kasubag_umum' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kasubag_umum',
                'title' => 'Yoranda Tiara Sati, S.STP',
                'description' => 'Kasubbag Umum Dan Kepegawaian',
                'photo_url' => null
            ],
            'kasubag_keuangan' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kasubag_keuangan',
                'title' => 'Asha Astriani, S.I.Kom, M.M.',
                'description' => 'Kasubbag Keuangan Dan Aset',
                'photo_url' => null
            ],
            'perencana_ahli_muda' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'perencana_ahli_muda',
                'title' => 'Yesi Herawati, S.Sos, MM.',
                'description' => 'Jabatan Fungsional Perencana Ahli Muda',
                'photo_url' => null
            ],
            'kabid_informasi' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kabid_informasi',
                'title' => 'Rudhy Hartono, SE., M.Si.',
                'description' => 'Kepala Bidang Informasi dan Komunikasi Publik',
                'photo_url' => null
            ],
            'kabid_egovernment' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kabid_egovernment',
                'title' => 'Fachrizal, S.Kom, M.Kom.',
                'description' => 'Kepala Bidang Pemberdayaan E-Government',
                'photo_url' => null
            ],
            'kabid_keamanan' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kabid_keamanan',
                'title' => 'Nursari, S.Sos., MM',
                'description' => 'Kepala Bidang Persandian, Keamanan Informasi dan Siber',
                'photo_url' => null
            ],
            'kabid_statistik' => [
                'content_type' => 'struktur_organisasi',
                'key' => 'kabid_statistik',
                'title' => 'Donny Diaz Rizaldy Praja, SH., MH.',
                'description' => 'Kepala Bidang Statistik dan Data Elektronik',
                'photo_url' => null
            ]
        ];

        // Data bidang dengan detail lengkap
        $bidangData = [
            'bidang_informasi' => [
                'content_type' => 'bidang',
                'key' => 'bidang_informasi',
                'title' => 'Bidang Informasi dan Komunikasi Publik',
                'description' => 'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Informasi dan Komunikasi Publik, bertanggung jawab kepada Kepala Dinas.',
                'data' => [
                    'kepala' => 'Rudhy Hartono, SE., M.Si.',
                    'icon' => '📢',
                    'color' => 'blue',
                    'tugas' => [
                        'Perumusan kebijakan di bidang Informasi dan Komunikasi Publik',
                        'Menyusun program dan model pelayanan informasi dan kehumasan',
                        'Menganalisis konten media terpilih dan isu publik',
                        'Memberikan konsultasi, advokasi, dan negosiasi pelayanan informasi',
                        'Mengevaluasi penyelenggaraan konferensi pers dan seminar',
                        'Mengembangkan standar dan sistem layanan informasi dan kehumasan',
                        'Pengawasan, pembinaan, dan pengendalian kegiatan Informasi dan Komunikasi Publik',
                        'Pelaksanaan koordinasi dan kerjasama antar lembaga/instansi',
                        'Mengelola Laporan Masyarakat melalui SP4N LAPOR',
                    ],
                    'magangTasks' => [
                        'Membantu pembuatan konten media sosial dan publikasi',
                        'Dokumentasi kegiatan dan acara dinas',
                        'Penulisan artikel dan berita untuk website',
                        'Desain grafis untuk publikasi dan media',
                        'Editing video dan foto dokumentasi',
                        'Riset dan analisis media serta isu publik',
                        'Membantu pengelolaan pengaduan masyarakat melalui SP4N LAPOR',
                        'Bantuan dalam persiapan konferensi pers dan seminar',
                    ],
                    'staffFungsional' => [
                        'Farida Herawati, S.E. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                        'DRS. Joko Pratikno, M.M. - Jabatan Fungsional Pranata Hubungan Masyarakat',
                        'Mirda Novitasari, SH, MH - Jabatan Fungsional Pranata Hubungan Masyarakat',
                    ]
                ]
            ],
            'bidang_egovernment' => [
                'content_type' => 'bidang',
                'key' => 'bidang_egovernment',
                'title' => 'Bidang Pemberdayaan E-Government',
                'description' => 'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Pemberdayaan E-Government, meliputi penyelenggaraan sistem dan layanan pemerintahan secara elektronik berbasis Teknologi Informasi dan Komunikasi.',
                'data' => [
                    'kepala' => 'Fachrizal, S.Kom, M.Kom.',
                    'icon' => '🏛️',
                    'color' => 'purple',
                    'tugas' => [
                        'Perumusan kebijakan di bidang pemberdayaan E-Government',
                        'Analisis dampak teknologi informasi dan tren perubahan strategi pemerintah',
                        'Menyusun kerangka kerja strategi teknologi informasi',
                        'Analisis kesenjangan dan roadmap enterprise architecture',
                        'Menyusun dan mengkaji tata kelola teknologi informasi',
                        'Menyusun SOP untuk information technology service management',
                        'Monitoring dan evaluasi ketersediaan layanan teknologi informasi',
                        'Melaksanakan Tata Kelola SPBE (Sistem Pemerintahan Berbasis Elektronik)',
                        'Perancangan dan pengembangan E-Government untuk Smart City Bandar Lampung',
                    ],
                    'magangTasks' => [
                        'Pengembangan aplikasi web dan mobile government',
                        'Testing dan quality assurance sistem informasi',
                        'Dokumentasi sistem dan user manual',
                        'Membantu maintenance dan update aplikasi',
                        'Riset teknologi baru untuk E-Government',
                        'Pembuatan dashboard dan reporting sistem',
                        'Integrasi API antar sistem pemerintahan',
                        'Backup dan recovery data sistem',
                    ],
                    'staffFungsional' => [
                        'Hemalinda Suri, S.STP, M.Si - Jabatan Fungsional Pranata Komputer Ahli Muda',
                    ]
                ]
            ],
            'bidang_keamanan' => [
                'content_type' => 'bidang',
                'key' => 'bidang_keamanan',
                'title' => 'Bidang Persandian, Keamanan Informasi dan Siber',
                'description' => 'Bidang yang bertanggung jawab dalam perumusan dan pelaksanaan kebijakan persandian, keamanan informasi, dan siber, melindungi aset digital pemerintah dan masyarakat dari ancaman siber.',
                'data' => [
                    'kepala' => 'Nursari, S.Sos., MM',
                    'icon' => '🔒',
                    'color' => 'red',
                    'tugas' => [
                        'Perumusan kebijakan persandian, keamanan informasi dan siber',
                        'Implementasi standar keamanan informasi ISO 27001',
                        'Monitoring dan deteksi ancaman keamanan siber',
                        'Pengembangan sistem keamanan jaringan dan infrastruktur',
                        'Audit keamanan sistem informasi pemerintahan',
                        'Incident response dan forensik digital',
                        'Edukasi dan sosialisasi keamanan informasi',
                        'Koordinasi dengan BSSN dan instansi keamanan siber',
                        'Pengelolaan sistem persandian pemerintah daerah',
                    ],
                    'magangTasks' => [
                        'Audit keamanan sistem informasi dan infrastruktur siber',
                        'Implementasi protokol keamanan dan enkripsi data',
                        'Monitoring jaringan dan deteksi ancaman siber',
                        'Dokumentasi kebijakan keamanan informasi dan prosedur NSPK',
                        'Testing vulnerability dan penetration testing sistem',
                        'Penelitian teknologi kriptografi dan keamanan siber terbaru',
                        'Pembuatan laporan insiden keamanan dan analisis forensik digital',
                        'Membantu implementasi standar keamanan informasi ISO 27001',
                        'Riset dan analisis tren ancaman siber global',
                        'Membantu pelatihan awareness keamanan informasi untuk pegawai',
                    ],
                    'staffFungsional' => [
                        'Helman Fatria Gautama, S.E. - Jabatan Fungsional Sandiman Ahli Muda',
                        'M. Ihsan Arisandi, S.H. - Jabatan Fungsional Sandiman Ahli Muda',
                    ]
                ]
            ],
            'bidang_statistik' => [
                'content_type' => 'bidang',
                'key' => 'bidang_statistik',
                'title' => 'Bidang Statistik dan Data Elektronik',
                'description' => 'Bidang yang merumuskan dan melaksanakan kebijakan serta kewenangan Pemerintah Kota di bidang Data dan Statistik, bertanggung jawab kepada Kepala Dinas dalam menghasilkan data yang akurat, mutakhir, terpadu, dan dapat dipertanggungjawabkan.',
                'data' => [
                    'kepala' => 'Donny Diaz Rizaldy Praja, SH., MH.',
                    'icon' => '📊',
                    'color' => 'teal',
                    'tugas' => [
                        'Perumusan kebijakan di bidang Data dan Statistik',
                        'Merancang dan membuat pedoman pengolahan kegiatan statistik untuk validitas data',
                        'Memeriksa tabel/grafik hasil kegiatan statistik tingkat nasional',
                        'Menyusun publikasi dan ringkasan eksekutif statistik tingkat nasional',
                        'Memberikan konsultasi statistik dan pengarahan penyusunan statistik kelembagaan',
                        'Melakukan penyebarluasan hasil pengumpulan data statistik',
                        'Memberikan bimbingan penuh kader statistisi sampai tingkat pascasarjana',
                        'Pelaksanaan kebijakan serta kewenangan di bidang Data dan Statistik',
                        'Melaksanakan Satu Data Indonesia (SDI)',
                    ],
                    'magangTasks' => [
                        'Analisis data dengan tools seperti Excel, SPSS, Python, dan R',
                        'Pembuatan dashboard dan visualisasi data statistik',
                        'Data cleaning, preprocessing, dan validasi data',
                        'Riset dan survei lapangan untuk pengumpulan data',
                        'Pembuatan laporan statistik dan ringkasan eksekutif',
                        'Machine learning dan predictive analytics untuk analisis data',
                        'Dokumentasi metodologi pengolahan statistik',
                        'Membantu implementasi Satu Data Indonesia (SDI)',
                    ],
                    'staffFungsional' => [
                        'Lisma Dewi, S.H., M.H. - Jabatan Fungsional Statistisi Ahli Muda',
                        'Nurqadryah, S.H., M.H. - Jabatan Fungsional Statistisi Ahli Muda',
                    ]
                ]
            ],
            'kesekretariatan' => [
                'content_type' => 'bidang',
                'key' => 'kesekretariatan',
                'title' => 'Kesekretariatan',
                'description' => 'Bagian yang melaksanakan tugas kesekretariatan dinas, mengelola administrasi, koordinasi antar bidang, serta pengelolaan keuangan dan aset.',
                'data' => [
                    'kepala' => 'Arienge Rahman, S.Kom., M.M',
                    'icon' => '🏢',
                    'color' => 'indigo',
                    'tugas' => [
                        'Administrasi dan tata usaha',
                        'Koordinasi kegiatan antar bidang',
                        'Pengelolaan arsip dan dokumen',
                        'Pelayanan administrasi kepegawaian',
                        'Pengelolaan keuangan dan aset',
                        'Koordinasi dengan instansi lain',
                    ],
                    'magangTasks' => [
                        'Membantu administrasi surat menyurat',
                        'Pengarsipan dokumen dan berkas',
                        'Entry data administrasi',
                        'Membantu pelayanan publik',
                        'Dokumentasi kegiatan dinas',
                        'Koordinasi rapat dan acara',
                        'Pembuatan laporan administratif',
                        'Bantuan dalam pengelolaan inventaris',
                    ],
                    'staffFungsional' => [
                        'Yoranda Tiara Sati, S.STP - Kepala Sub Bagian Umum dan Kepegawaian',
                        'Asha Astriani, S.I.Kom, M.M. - Kepala Sub Bagian Keuangan dan Aset',
                        'Yesi Herawati, S.Sos, MM. - Jabatan Fungsional Perencana Ahli Muda',
                    ]
                ]
            ]
        ];

        // Insert data
        foreach ($strukturOrganisasi as $data) {
            BerandaContent::updateOrCreate(
                ['key' => $data['key']],
                $data
            );
        }

        foreach ($bidangData as $data) {
            BerandaContent::updateOrCreate(
                ['key' => $data['key']],
                $data
            );
        }
    }
}
