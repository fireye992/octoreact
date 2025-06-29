// src/Layouts/MainLayout.jsx

import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import MainNavbar from '@/Components/Layout/MainNavbar'; // Import de votre barre de nav
import Footer from '@/Components/Layout/Footer';

export default function MainLayout({ user, header, children, navigationItems, canLogin, canRegister }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Synchronise l'état avec la classe 'dark' du <html>
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-secondary' : 'bg-gray-100'}`}>
            
            {/* C'est votre barre de navigation principale qui gère la logique de connexion/inscription */}
            <MainNavbar
                user={user} // Pour les invités, cette prop sera 'null'
                navigationItems={navigationItems}
                canLogin={canLogin} // Ces props seront 'true' pour les invités
                canRegister={canRegister}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

            {/* Le contenu de l'en-tête (si défini) */}
            {header && (
                <header className={`shadow ${isDarkMode ? 'bg-secondary' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Le contenu principal de la page */}
            <main className="flex-grow">{children}</main>

            {/* Le pied de page est toujours présent */}
            <Footer isDarkMode={isDarkMode} />

        </div>
    );
}