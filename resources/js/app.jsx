// resources/js/app.jsx

// --- Début des imports de base ---
import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// --- Fin des imports de base ---

// --- Début de l'ajout d'Axios pour une utilisation globale ---
import axios from 'axios';

// On attache l'instance d'Axios à l'objet global 'window'
// Cela le rend disponible dans n'importe quel fichier de votre application
window.axios = axios;

// On configure le header par défaut pour inclure le token CSRF de Laravel
// C'est essentiel pour les requêtes POST, PUT, etc., pour des raisons de sécurité
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// --- Fin de l'ajout d'Axios ---

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});