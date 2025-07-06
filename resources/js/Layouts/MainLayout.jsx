// MainLayout.jsx - Solution avec gestion dans le layout
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainNavbar from '@/Components/Layout/MainNavbar';
import Footer from '@/Components/Layout/Footer';

export default function MainLayout({ user, header, children, navigationItems, canLogin, canRegister, title }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialiser le dark mode au chargement du layout
    useEffect(() => {
        // Vérifier si une préférence est sauvegardée
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            // Si une préférence est trouvée, l'utiliser
            setIsDarkMode(JSON.parse(savedMode));
        } else {
            // --- MODIFICATION ICI : DÉFINIR LE MODE CLAIR PAR DÉFAUT SI AUCUNE PRÉFÉRENCE N'EST SAUVEGARDÉE ---
            // Au lieu de window.matchMedia, nous forçons à false (mode clair)
            setIsDarkMode(false); 
            // C'est une bonne pratique de sauvegarder ce "faux" par défaut immédiatement,
            // pour que la prochaine visite sans préférence système soit également claire.
            localStorage.setItem('darkMode', JSON.stringify(false));
            // --- FIN DE LA MODIFICATION ---
        }
    }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une seule fois au montage

    // Appliquer le dark mode au DOM et sauvegarder la préférence à chaque changement
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Sauvegarder la préférence actuelle à chaque fois qu'elle change
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]); // Cet effet s'exécute à chaque fois que isDarkMode change

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="min-h-screen flex flex-col pt-4">
            <Head title={title} />
            
            <MainNavbar
                user={user}
                navigationItems={navigationItems}
                canLogin={canLogin}
                canRegister={canRegister}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />

            <header className={`shadow ${isDarkMode ? 'bg-stone-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}