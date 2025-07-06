<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Magang Diterima</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .success-badge {
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        .info-card {
            background: #f1f5f9;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 6px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 8px;
        }
        .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
        }
        .info-value {
            color: #1e293b;
            text-align: right;
        }
        .important-info {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .important-info h3 {
            color: #92400e;
            margin: 0 0 10px;
            font-size: 18px;
        }
        .steps {
            background: #ecfdf5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .steps h3 {
            color: #065f46;
            margin: 0 0 15px;
        }
        .steps ol {
            margin: 0;
            padding-left: 20px;
        }
        .steps li {
            margin-bottom: 8px;
            color: #047857;
        }
        .footer {
            background: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
        }
        .contact-info {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
        }
        .emoji {
            font-size: 24px;
            margin-bottom: 10px;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Selamat!</h1>
            <p>Pendaftaran Magang Anda Telah Diterima</p>
        </div>
        
        <div class="content">
            <div class="success-badge">✅ DITERIMA</div>
            
            <p>Yth. <strong>{{ $mahasiswa->nama }}</strong>,</p>
            
            <p>Kami dengan senang hati memberitahukan bahwa pendaftaran magang Anda di <strong>Kementerian Komunikasi dan Informatika</strong> telah <strong>DITERIMA</strong>!</p>
            
            <div class="info-card">
                <h3 style="margin: 0 0 15px; color: #1e293b;">📋 Detail Magang Anda:</h3>
                <div class="info-row">
                    <span class="info-label">Nama Lengkap:</span>
                    <span class="info-value">{{ $mahasiswa->nama }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">NIM:</span>
                    <span class="info-value">{{ $mahasiswa->nim }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Universitas:</span>
                    <span class="info-value">{{ $mahasiswa->universitas }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Bidang Magang:</span>
                    <span class="info-value">{{ $mahasiswa->bidang->nama_bidang ?? 'Belum Ditentukan' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Mulai:</span>
                    <span class="info-value">{{ \Carbon\Carbon::parse($mahasiswa->tanggal_mulai)->format('d F Y') }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Selesai:</span>
                    <span class="info-value">{{ \Carbon\Carbon::parse($mahasiswa->tanggal_selesai)->format('d F Y') }}</span>
                </div>
            </div>
            
            <div class="important-info">
                <h3>⚠️ Informasi Penting</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Status Anda akan otomatis berubah menjadi <strong>"Sedang Magang"</strong> pada tanggal mulai magang</li>
                    <li>Pastikan Anda hadir tepat waktu pada hari pertama</li>
                    <li>Bawa dokumen identitas dan surat pengantar asli</li>
                    <li>Patuhi semua peraturan dan tata tertib yang berlaku</li>
                </ul>
            </div>
            
            <div class="steps">
                <h3>📝 Langkah Selanjutnya:</h3>
                <ol>
                    <li>Konfirmasi kehadiran Anda melalui email atau telepon</li>
                    <li>Siapkan dokumen yang diperlukan</li>
                    <li>Datang ke lokasi magang sesuai jadwal</li>
                    <li>Ikuti orientasi dan pengarahan dari pembimbing</li>
                </ol>
            </div>
            
            <div class="contact-info">
                <span class="emoji">📞</span>
                <p><strong>Butuh bantuan?</strong></p>
                <p>Hubungi kami di: <strong>admin@kominfo.go.id</strong></p>
                <p>Atau telepon: <strong>(021) 3504040</strong></p>
            </div>
            
            <p>Kami sangat menantikan kontribusi Anda selama program magang berlangsung. Semoga pengalaman magang ini dapat memberikan manfaat besar bagi pengembangan karir Anda di masa depan.</p>
            
            <p style="margin-top: 30px;">
                Salam hormat,<br>
                <strong>Tim Administrasi Magang</strong><br>
                <strong>Kementerian Komunikasi dan Informatika</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>Email ini dikirim otomatis oleh sistem. Mohon jangan membalas email ini.</p>
            <p style="margin-top: 10px;">© 2025 Kementerian Komunikasi dan Informatika</p>
        </div>
    </div>
</body>
</html>
