// vite.config.js

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
            ],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    // Configuration CRUCIALE ET DÉFINITIVE pour Docker/Sail
    server: {
        // Oblige Vite à écouter sur toutes les interfaces du conteneur (essentiel)
        host: '0.0.0.0', 
        hmr: {
            // Indique au client Vite de se connecter à la machine hôte.
            // 'host.docker.internal' est le nom d'hôte standard de Docker pour cela.
            host: 'host.docker.internal',
            // Utilisez 'wss' si vous accédez à votre site via HTTPS (https://laravel.test).
            // Si vous utilisez HTTP (http://laravel.test), utilisez 'ws'.
            // Sail configure souvent le HTTPS par défaut.
            protocol: 'ws',
        },
        // Active le "polling" pour la détection des changements de fichiers sous Docker,
        // ce qui résout les problèmes de rafraîchissement.
        watch: {
            usePolling: true,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'), 
        },
    },
});