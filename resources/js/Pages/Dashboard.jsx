// resources/js/Pages/Dashboard.jsx

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

// Importez les définitions de navigation
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation';

export default function Dashboard({ auth, canLogin, canRegister }) {
    // Utilisez les définitions importées
    const pageNavigationItems = mainNavigationItems; // Les mêmes liens principaux que Home
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href); // La même logique de menu utilisateur que Home

    return (
        <MainLayout
            user={auth.user}
            navigationItems={pageNavigationItems} // Passe les liens de navigation principale définis ci-dessus
            userMenuItems={pageUserMenuItems}     // Passe les liens du menu utilisateur définis ci-dessus
            title="Dashboard"
            canLogin={canLogin}
            canRegister={canRegister}
            // Suggestion pour l'en-tête (voir explication précédente)
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-stone-500 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-stone-100">Bienvenue dans la grotte du poulpe ! </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}