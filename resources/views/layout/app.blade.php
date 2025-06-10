<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <!-- Google Tag Manager -->
    {{-- <script>
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
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-T8343DZ');
    </script> --}}
    <!-- End Google Tag Manager -->

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OcToPus Philosophe à tentacules</title>
    <meta name="description" content="Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.">
    <meta name="keywords" content="philosophie, séance de philosophie, Strasbourg, développement personnel, réflexion, intuition">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('/img/octo/logo-8phy.png') }}" type="image/x-icon">
    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
    <script src="https://apis.google.com/js/platform.js"></script>
</head>
<body class="antialiased text-primary dark:text-secondary ">
    <!-- Google Tag Manager (noscript) -->
    {{-- <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T8343DZ" height="0" width="0"
            style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript> --}}
    <!-- End Google Tag Manager (noscript) -->
    <div class="min-h-screen pt-24 bg-primary dark:bg-secondary">
        <x-layout.navbar></x-layout.navbar>
        {{ $slot }}
        <x-layout.footer></x-layout.footer>
    </div>
    <script defer src="https://unpkg.com/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</body>
</html>
{{-- Code a remettre pour utiliser les mode light et sombre et pensser a supprimer le dark de la class de la ligne 2 en ne mettant tien sute les accolade vide et remettre les differente photo dans le css a la fin --}}
{{-- <script>
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia(
            '(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
</script> --}}
