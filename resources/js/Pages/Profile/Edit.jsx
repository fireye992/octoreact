// resources/js/Pages/Profile/Edit.jsx

import MainLayout from '@/Layouts/MainLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

// Importez les définitions de navigation
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const pageNavigationItems = mainNavigationItems;
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href);

    return (
        <MainLayout
            user={auth.user}
            navigationItems={pageNavigationItems}
            userMenuItems={pageUserMenuItems}
            header={<h2 className="font-semibold text-xl text-stone-800 dark:text-gray-200 leading-tight">Profile</h2>}
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
                    </div> {/* <-- LA LIGNE CORRIGÉE EST ICI */}
                </div>
            </div>
        </MainLayout>
    );
}