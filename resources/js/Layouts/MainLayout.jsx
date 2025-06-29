// src/Layouts/MainLayout.jsx

import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/ui/button'; // Assurez-vous d'avoir ce composant

export default function MainLayout({ user, header, children, navigationItems, canLogin, canRegister }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
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
        <div className={`min-h-screen ${isDarkMode ? 'bg-secondary' : 'bg-gray-100'}`}>
            <nav className={`border-b ${isDarkMode ? 'bg-secondary border-stone-700' : 'bg-white border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                {/* Votre logo personnalisé */}
                                <Link href="/" className="flex items-center">
                                    <img src="/images/logo.png" alt="Logo The-L-Box" className="h-9 w-auto" />
                                    <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">THE-L-BOX</span>
                                </Link>
                            </div>

                            {/* Liens de navigation pour utilisateurs connectés ou invités */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* Lien Dashboard pour les utilisateurs authentifiés */}
                                {user && (
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Dashboard
                                    </NavLink>
                                )}
                                {/* Liens de la page d'accueil (à propos, médias, etc.) */}
                                {navigationItems && navigationItems.map((item) => (
                                    <NavLink key={item.label} href={item.href} active={route().current(item.route_name)}>
                                        {item.label}
                                    </NavLink>
                                ))}
                                {/* Lien Admin Videos pour les utilisateurs authentifiés */}
                                {user && (
                                    <NavLink href={route('admin.videos')} active={route().current('admin.videos')}>
                                        Admin Videos
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Bouton pour basculer le mode sombre */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="mr-4 rounded-full"
                            >
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </Button>

                            {/* Liens de connexion/inscription pour les invités ou menu déroulant pour l'utilisateur */}
                            {user ? (
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${isDarkMode ? 'text-gray-300 bg-secondary hover:text-gray-100' : 'text-gray-500 bg-white hover:text-gray-700'} focus:outline-none transition ease-in-out duration-150`}
                                                >
                                                    {user.name}
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div className="space-x-4">
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className={`font-semibold ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500`}
                                        >
                                            Log in
                                        </Link>
                                    )}
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className={`font-semibold ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500`}
                                        >
                                            Register
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bouton du menu mobile */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile responsive */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {/* Lien Dashboard mobile */}
                        {user && (
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        )}
                        {/* Liens de navigation mobile */}
                        {navigationItems && navigationItems.map((item) => (
                            <ResponsiveNavLink key={item.label} href={item.href} active={route().current(item.route_name)}>
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                        {/* Lien Admin Videos mobile */}
                        {user && (
                            <ResponsiveNavLink href={route('admin.videos')} active={route().current('admin.videos')}>
                                Admin Videos
                            </ResponsiveNavLink>
                        )}
                    </div>

                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            {canLogin && (
                                <ResponsiveNavLink href={route('login')}>Log in</ResponsiveNavLink>
                            )}
                            {canRegister && (
                                <ResponsiveNavLink href={route('register')}>Register</ResponsiveNavLink>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className={`shadow ${isDarkMode ? 'bg-secondary' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}