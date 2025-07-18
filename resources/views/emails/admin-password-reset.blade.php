<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Admin</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }

        .email-container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 36px;
            font-weight: bold;
        }

        .title {
            color: #1f2937;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }

        .subtitle {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0 0;
        }

        .content {
            margin: 30px 0;
        }

        .greeting {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }

        .message {
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .reset-button:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .security-notice {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 30px 0;
        }

        .security-notice .icon {
            color: #d97706;
            font-size: 20px;
            margin-right: 8px;
        }

        .security-text {
            color: #92400e;
            font-size: 14px;
            font-weight: 500;
        }

        .alternative-link {
            background: #f3f4f6;
            border-radius: 6px;
            padding: 12px;
            margin: 20px 0;
            font-size: 12px;
            color: #6b7280;
            word-break: break-all;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }

        .contact-info {
            margin: 15px 0;
        }

        .expiry-info {
            background: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 12px;
            margin: 20px 0;
            color: #1e40af;
            font-size: 14px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">🔐</div>
            <h1 class="title">Reset Password & Username Admin</h1>
            <p class="subtitle">Sistem Manajemen Magang - Dinas Kominfo Kota Bandar Lampung</p>
        </div>

        <div class="content">
            <div class="greeting">
                Halo Admin,
            </div>

            <div class="message">
                Kami menerima permintaan untuk reset password dan username akun admin Anda. Jika Anda yang membuat permintaan ini, silakan klik tombol di bawah untuk melanjutkan proses reset kredensial admin.
            </div>

            <div class="button-container">
                <a href="{{ $resetUrl }}" class="reset-button">
                    🔄 Reset Password & Username Sekarang
                </a>
            </div>

            <div class="expiry-info">
                ⏰ Link reset password ini akan kedaluwarsa dalam <strong>60 menit</strong>
            </div>

            <div class="security-notice">
                <div style="display: flex; align-items: center;">
                    <span class="icon">⚠️</span>
                    <div class="security-text">
                        <strong>Penting untuk Keamanan:</strong><br>
                        • Jika Anda tidak membuat permintaan ini, abaikan email ini<br>
                        • Jangan bagikan link ini kepada siapa pun<br>
                        • Gunakan username dan password yang kuat dan unik<br>
                        • Link hanya dapat digunakan sekali
                    </div>
                </div>
            </div>

            <div class="message">
                Jika tombol di atas tidak berfungsi, Anda dapat menyalin dan menempelkan link berikut ke browser Anda:
            </div>

            <div class="alternative-link">
                {{ $resetUrl }}
            </div>
        </div>

        <div class="footer">
            <div class="contact-info">
                <strong>Dinas Komunikasi dan Informatika Kota Bandar Lampung</strong><br>
                📍 Jl. Dr. Susilo No.2, Bandar Lampung, Lampung 35214<br>
                📞 (0721) 253752 | 📧 kominfo@bandarlampungkota.go.id
            </div>
            <div style="margin-top: 15px; color: #9ca3af;">
                Email ini dikirim secara otomatis oleh Sistem Manajemen Magang.<br>
                Harap jangan membalas email ini.
            </div>
        </div>
    </div>
</body>

</html>
