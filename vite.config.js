import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx', // C'est ton point d'entrée React/Inertia principal
                // Si tu avais 'resources/js/app.js' et que tu n'en as plus besoin, assure-toi qu'il n'est plus ici.
            ],
            refresh: true,
        }),
        react(), // Indispensable pour le support de React
    ],
    // C'EST CETTE SECTION QUI EST LA CLÉ POUR LES PROBLÈMES CORS AVEC SAIL/DOCKER
    server: {
        host: '0.0.0.0', // Permet à Vite d'écouter sur toutes les interfaces réseau du conteneur
        hmr: {
            host: 'localhost', // URL que ton navigateur utilisera pour se connecter à Vite via le Hot Module Replacement
                               // C'est crucial pour résoudre le problème CORS pour les connexions HMR.
            protocol: 'ws',    // Utilise le protocole WebSocket
        },
        watch: {
            usePolling: true // Sur certains systèmes de fichiers (comme WSL), c'est nécessaire pour que le rafraîchissement fonctionne bien.
        }
    }
});