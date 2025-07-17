<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemberitahuan Status Pendaftaran Magang</title>
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
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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

        .status-badge {
            background: #ef4444;
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

        .reason-box {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .reason-box h3 {
            color: #dc2626;
            margin: 0 0 10px;
            font-size: 18px;
        }

        .reason-text {
            color: #991b1b;
            font-size: 15px;
            line-height: 1.6;
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #ef4444;
        }

        .encouragement {
            background: #f0f9ff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #0ea5e9;
        }

        .encouragement h3 {
            color: #0c4a6e;
            margin: 0 0 15px;
        }

        .next-steps {
            background: #ecfdf5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .next-steps h3 {
            color: #065f46;
            margin: 0 0 15px;
        }

        .next-steps ul {
            margin: 0;
            padding-left: 20px;
        }

        .next-steps li {
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

        .action-section {
            background: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
        }

        .action-section h3 {
            color: #1565c0;
            margin: 0 0 15px;
            font-size: 20px;
        }

        .edit-button {
            display: inline-block;
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            font-size: 16px;
            margin: 15px 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .edit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }

        .warning-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #856404;
        }

        .warning-box strong {
            color: #856404;
        }

        .divider {
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            margin: 30px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>📋 Pemberitahuan Status</h1>
            <p>Pendaftaran Magang Anda</p>
        </div>

        <div class="content">
            <div class="status-badge">❌ TIDAK DITERIMA</div>

            <p>Yth. <strong>{{ $mahasiswa->nama }}</strong>,</p>

            <p>Terima kasih atas minat dan antusiasme Anda untuk mengikuti program magang di <strong>Kementerian Komunikasi dan Informatika</strong>.</p>

            <p>Setelah melalui proses seleksi yang ketat, kami dengan berat hati memberitahukan bahwa pendaftaran magang Anda untuk periode ini <strong>belum dapat kami terima</strong>.</p>

            <div class="info-card">
                <h3 style="margin: 0 0 15px; color: #1e293b;">📋 Detail Pendaftaran:</h3>
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
                    <span class="info-label">Bidang yang Dipilih:</span>
                    <span class="info-value">{{ $mahasiswa->bidang->nama_bidang ?? 'Belum Ditentukan' }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Pendaftaran:</span>
                    <span class="info-value">{{ \Carbon\Carbon::parse($mahasiswa->tanggal_daftar)->format('d F Y') }}</span>
                </div>
            </div>

            @if($rejectReason)
            <div class="reason-box">
                <h3>💬 Alasan Penolakan:</h3>
                <div class="reason-text">
                    {{ $rejectReason }}
                </div>
            </div>
            @endif

            <!-- Action Section -->
            <div class="action-section">
                <h3>🔄 Perbaiki dan Kirim Ulang</h3>
                <p>Jangan berkecil hati! Anda masih memiliki kesempatan untuk memperbaiki data pendaftaran Anda.</p>
                <p>Klik tombol di bawah ini untuk mengakses halaman perbaikan data:</p>

                <a href="{{ url('/edit-pendaftaran/' . $mahasiswa->id . '?token=' . $mahasiswa->edit_token) }}" class="edit-button">
                    ✏️ Perbaiki Data Pendaftaran
                </a>

                <div class="warning-box">
                    <strong>⚠️ Penting:</strong> Link ini hanya dapat digunakan oleh Anda. Jangan bagikan link ini kepada orang lain untuk keamanan data Anda.
                </div>
            </div>

            <div class="divider"></div>

            <div class="encouragement">
                <h3>💪 Jangan Berkecil Hati!</h3>
                <p>Keputusan ini bukan berarti mengakhiri kesempatan Anda. Setiap pengalaman adalah pembelajaran berharga untuk masa depan yang lebih baik.</p>
                <p><strong>Kami mendorong Anda untuk terus berkembang dan memperbaiki data pendaftaran Anda.</strong></p>
            </div>

            <div class="next-steps">
                <h3>🚀 Langkah Selanjutnya:</h3>
                <ul>
                    <li>Klik tombol "Perbaiki Data Pendaftaran" di atas</li>
                    <li>Perbaiki data sesuai dengan alasan penolakan</li>
                    <li>Lengkapi dokumen persyaratan dengan lebih baik</li>
                    <li>Pastikan semua informasi yang diisi sudah benar</li>
                    <li>Kirim ulang pendaftaran Anda</li>
                </ul>
            </div>

            <div class="contact-info">
                <span class="emoji">💡</span>
                <p><strong>Butuh informasi lebih lanjut?</strong></p>
                <p>Hubungi kami di: <strong>admin@kominfo.go.id</strong></p>
                <p>Atau telepon: <strong>(021) 3504040</strong></p>
            </div>

            <p>Kami berterima kasih atas dedikasi dan waktu yang telah Anda investasikan dalam proses pendaftaran ini. Semoga di masa depan kita dapat berkolaborasi dengan cara yang lain.</p>

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