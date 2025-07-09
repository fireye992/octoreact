// resources/js/Config/navigation.js

// Définition des liens de navigation principale (inchangée)
export const mainNavigationItems = [
    // { label: 'Accueil', href: route('home'), route_name: 'home' },
    // { label: 'Services', href: '#hero', is_anchor: true },
    { label: 'À Propos', href: '#about', is_anchor: true },
    { label: 'Médias', href: '#tutos', is_anchor: true },
    { label: 'Contact', href: '#contact', is_anchor: true },
];

// Définition de la logique pour les liens du menu utilisateur
// Cette fonction prend maintenant 'auth' et 'currentUrl' en paramètres
export const getUserMenuItems = (auth, currentUrl) => {
    const userMenuItems = [];

    if (auth.user) {
        // Dashboard
        const dashboardItem = { label: 'Dashboard', href: route('dashboard'), route_name: 'dashboard' };
        if (currentUrl !== route('dashboard')) {
            userMenuItems.push(dashboardItem);
        }

        // Profile
        const profileItem = { label: 'Profile', href: route('profile.edit'), route_name: 'profile.edit' };
        if (currentUrl !== route('profile.edit')) {
            userMenuItems.push(profileItem);
        }

        // Admin Videos (uniquement si admin)
        if (auth.user.is_admin) {
            const adminVideosItem = { label: 'Admin Videos', href: route('admin.videos'), route_name: 'admin.videos' };
            if (currentUrl !== route('admin.videos')) {
                userMenuItems.push(adminVideosItem);
            }
        }

        // Log Out (toujours visible)
        userMenuItems.push({ label: 'Log Out', href: route('logout'), route_name: 'logout', method: 'post', as: 'button' });
    }
    return userMenuItems;
};