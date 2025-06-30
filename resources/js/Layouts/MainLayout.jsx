import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainNavbar from '@/Components/Layout/MainNavbar';
import Footer from '@/Components/Layout/Footer';

export default function MainLayout({ user, header, children, navigationItems, canLogin, canRegister, title }) {
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
        // Utilise flex-col pour un layout en colonne et pt-16 pour éviter le chevauchement de la navbar fixe (h-16)
          <div className="min-h-screen flex flex-col pt-4">
        <Head title={title} />
            
            {/* 1. La barre de navigation principale (fixe en haut) */}
            <MainNavbar
                user={user} // 'null' pour les invités, ou l'objet user pour les connectés
                navigationItems={navigationItems}
                canLogin={canLogin}
                canRegister={canRegister}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

          <header className={`shadow ${isDarkMode ? 'bg-stone-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>
            {/* 3. Le contenu principal de la page (prend tout l'espace disponible) */}
            <main className="flex-grow">
                {children}
            </main>

            {/* 4. Le pied de page (fixé en bas de la page) */}
            <Footer isDarkMode={isDarkMode} />
            
        </div>
    );
}