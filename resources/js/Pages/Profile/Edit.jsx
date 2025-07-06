import MainLayout from '@/Layouts/MainLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    // Les props isDarkMode et toggleDarkMode ne sont PAS nécessaires ici
    // car MainLayout gère la classe 'dark' sur <html>.
    // Les composants enfants n'ont qu'à utiliser les classes Tailwind CSS 'dark:'.
        const navigationItems = [
        { label: 'Accueil', href: route('home'), route_name: 'home' },
        { label: 'Dashboard', href: route('dashboard'), route_name: 'dashboard' },
        { label: 'Admin Videos', href: route('admin.videos'), route_name: 'admin.videos' }, // <-- Correction pour le lien de navigation aussi
    ];

    return (
        <MainLayout
            user={auth.user}
            navigationItems={navigationItems}

            header={<h2 className="font-semibold text-xl text-stone-800 dark:text-gray-200 leading-tight">Profile</h2>}
            // Tu n'as pas besoin de passer isDarkMode ou toggleDarkMode à MainLayout ici
            // car MainLayout gère son propre état interne pour le thème.
            // Si le header a besoin de changer de couleur de texte, il doit aussi utiliser dark:
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Ajoute les classes dark: pour le fond et le texte */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-stone-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Ajoute les classes dark: pour le fond et le texte */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-stone-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Ajoute les classes dark: pour le fond et le texte */}
                    <div className="p-4 sm:p-8 bg-white dark:bg-stone-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}