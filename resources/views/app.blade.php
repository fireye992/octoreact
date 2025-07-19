<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>@yield('title', $page['props']['title'] ?? config('app.name', 'OcToPus Philosophe à tentacules'))</title>
    <meta name="description" content="@yield('description', $page['props']['description'] ?? 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.')">
    <meta name="keywords" content="@yield('keywords', $page['props']['keywords'] ?? 'philosophie, séance de philosophie, Strasbourg, développement personnel, réflexion, intuition')">

    <link rel="canonical" href="{{ url()->current() }}" />

    <link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="manifest" href="img/site.webmanifest">

    <link rel="shortcut icon" href="{{ asset('/img/octo/logo-8phy.png') }}" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.bunny.net">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta property="og:title" content="@yield('og:title', $page['props']['og_title'] ?? 'OcToPus Philosophe à tentacules')" />
    <meta property="og:description" content="@yield('og:description', $page['props']['og_description'] ?? 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.')" />
    <meta property="og:type" content="@yield('og:type', $page['props']['og_type'] ?? 'website')" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:image" content="@yield('og:image', $page['props']['og_image'] ?? asset('/img/share-default.jpg'))" />
    <meta property="og:image:width" content="@yield('og:image:width', $page['props']['og_image_width'] ?? '1200')" />
    <meta property="og:image:height" content="@yield('og:image:height', $page['props']['og_image_height'] ?? '630')" />
    <meta name="twitter:card" content="summary_large_image" />

    {{-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-X1F2QJB6E2"></script> --}}
    {{-- <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-X1F2QJB6E2');
    </script> --}}
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-K8X7JRD7');
    </script>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
        rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])

    @inertiaHead

    {{-- <script async src="https://apis.google.com/js/platform.js"></script> --}}

    @stack('head_scripts')
    @stack('head_meta')
</head>

<body class="font-sans antialiased text-primary dark:text-secondary bg-gray-100 dark:bg-stone-900">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K8X7JRD7" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>

    @inertia

    <script defer src="https://unpkg.com/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    @stack('body_scripts')
</body>

</html>
