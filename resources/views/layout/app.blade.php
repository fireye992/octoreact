<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'OcToPus Philosophe à tentacules')</title>
    <meta name="description" content="@yield('description', 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.')">
    <meta name="keywords" content="@yield('keywords', 'philosophie, séance de philosophie, Strasbourg, développement personnel, réflexion, intuition')">
    <link rel="canonical" href="{{ url()->current() }}" />
    <link rel="shortcut icon" href="{{ asset('/img/octo/logo-8phy.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-X1F2QJB6E2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-X1F2QJB6E2');
    </script>
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-K8X7JRD7');
    </script>
    <meta property="og:title" content="@yield('og:title', 'OcToPus Philosophe à tentacules')" />
    <meta property="og:description" content="@yield('og:description', 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.')" />
    <meta property="og:type" content="@yield('og:type', 'website')" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:image" content="@yield('og:image', asset('/img/octo/logo-8phy.png'))" />
    <meta property="og:image:width" content="@yield('og:image:width', '1200')" />
    <meta property="og:image:height" content="@yield('og:image:height', '630')" />

    @stack('head_scripts')
    @stack('head_meta')
    {{-- @vite(['resources/css/app.css', 'resources/js/app.jsx']) --}}
    {{-- Important pour les assets classiques --}}
<script src="https://apis.google.com/js/platform.js?v=20250710"></script>
</head>
<body class="antialiased text-primary dark:text-secondary ">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K8X7JRD7" height="0" width="0"
                        style="display:none;visibility:hidden"></iframe></noscript>
    <div class="min-h-screen pt-24 bg-primary dark:bg-secondary">
        <x-layout.navbar></x-layout.navbar>
        {{ $slot }}
        <x-layout.footer></x-layout.footer>
    </div>
    <script defer src="https://unpkg.com/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    @stack('body_scripts')
</body>
</html>