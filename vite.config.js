// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            // Assurez-vous que refresh est à true
            refresh: true, 
        }),
        react(),
    ],
    server: {
        // C'est pour que le serveur de dev écoute sur toutes les interfaces réseau
        host: '0.0.0.0', 
        // Ceci active les en-têtes CORS nécessaires pour que le navigateur accepte la connexion
        cors: true, 
        // Configuration plus explicite pour le Hot Module Replacement (HMR)
        hmr: {
            // Force le protocole à WebSocket
            protocol: 'ws', 
            // Utilise le nom de domaine de votre application (très important)
            host: 'laravel.test', 
            // Indique le port client pour le HMR, qui est celui exposé
            clientPort: 5173, 
        },
        // Ceci est la configuration du proxy pour les appels API, elle ne change pas
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});