<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'SIMAMANG') }}</title>

    <!-- ✅ Open Graph Meta Tags -->
    <meta property="og:title" content="SIMAMANG - Sistem Manajemen Magang" />
    <meta property="og:description" content="Website resmi sistem manajemen magang Dinas Kominfo Bandar Lampung." />
    <meta property="og:image" content="{{ asset('asset/Logo-Kominfo.png') }}" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:type" content="website" />

    <!-- ✅ Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SIMAMANG - Sistem Manajemen Magang">
    <meta name="twitter:description" content="Website resmi sistem manajemen magang Dinas Kominfo Bandar Lampung.">
    <meta name="twitter:image" content="{{ asset('asset/Logo-Kominfo.png') }}">

    <link rel="icon" href="{{ asset('asset/Logo-Kominfo.png') }}" sizes="any">
    <link rel="icon" type="image/png" href="{{ asset('asset/Logo-Kominfo.png') }}">

    <link rel="apple-touch-icon" href="{{ asset('asset/Logo-Kominfo.png') }}">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>