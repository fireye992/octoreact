import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

// Ajoutez les props canLogin et canRegister ici
export default function Dashboard({ auth, canLogin, canRegister }) {
    const navigationItems = [
        // Mettez à jour le nom de la route pour correspondre à celui de Laravel
        { label: 'Accueil', href: route('home'), route_name: 'home' },
        // { label: 'Portfolio', href: '#', route_name: '' },
        // { label: 'Contact', href: '#', route_name: '' },
    ];

    return (
        <MainLayout
            user={auth.user}
            navigationItems={navigationItems}
            title="Dashboard"
            canLogin={canLogin} // <-- Passez la prop au layout
            canRegister={canRegister} // <-- Passez la prop au layout
        >
            <Head title="Dashboard" />

            {/* Le contenu de l'en-tête */}
            <header className="shadow bg-white dark:bg-stone-800">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Dashboard
                    </h2>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-stone-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}