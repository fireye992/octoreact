// resources/js/Layouts/MainLayout.jsx

// --- IMPORTS : Supprimez 'useState' et 'useEffect' ici ---
// import { useState, useEffect } from 'react'; // <-- SUPPRIMEZ CETTE LIGNE !

import { Head } from '@inertiajs/react';
import MainNavbar from '@/Components/Layout/MainNavbar';
import Footer from '@/Components/Layout/Footer';

// --- PROPS : 'isDarkMode' et 'toggleDarkMode' sont maintenant passées en tant que props ---
export default function MainLayout({ user, header, children, navigationItems, canLogin, canRegister, title, isDarkMode, toggleDarkMode }) {
    // --- LOGIQUE DU MODE SOMBRE : SUPPRIMEZ TOUT CE BLOC ! ---
    // const [isDarkMode, setIsDarkMode] = useState(false);
    // useEffect(() => {
    //     if (isDarkMode) {
    //         document.documentElement.classList.add('dark');
    //     } else {
    //         document.documentElement.classList.remove('dark');
    //     }
    // }, [isDarkMode]);
    // const toggleDarkMode = () => {
    //     setIsDarkMode(prevMode => !prevMode);
    // };
    // --- FIN DU BLOC À SUPPRIMER ---

    return (
        // Utilise flex-col pour un layout en colonne et pt-16 pour éviter le chevauchement de la navbar fixe (h-16)
        // NOTE: Les couleurs de fond globales du <body> sont gérées par app.css et les classes 'dark:'
        // Ici, on gère le padding top, qui est correct.
        <div className="min-h-screen flex flex-col pt-4">
            <Head title={title} />
            
            {/* 1. La barre de navigation principale (fixe en haut) */}
            <MainNavbar
                user={user}
                navigationItems={navigationItems}
                canLogin={canLogin}
                canRegister={canRegister}
                isDarkMode={isDarkMode} // <-- Utilisez la prop isDarkMode
                toggleDarkMode={toggleDarkMode} // <-- Utilisez la prop toggleDarkMode
            />

            {/* Header: Appliquez les styles conditionnels directement ici */}
            <header className={`shadow ${isDarkMode ? 'bg-stone-800' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>

            {/* 3. Le contenu principal de la page (prend tout l'espace disponible) */}
            <main className="flex-grow">
                {children}
            </main>

            {/* 4. Le pied de page (fixé en bas de la page) */}
            <Footer isDarkMode={isDarkMode} />
            
            {/* Si vous avez un bouton toggle ici dans MainLayout, il peut l'utiliser */}
            {/* Exemple d'un bouton de bascule s'il est dans MainLayout, sinon retirez-le */}
            {/* <button
                onClick={toggleDarkMode} // Utilise la prop toggleDarkMode
                className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50
                            ${isDarkMode ? 'bg-amber-500 text-gray-900' : 'bg-blue-600 text-white'}`}
            >
                {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button> */}
        </div>
    );
}