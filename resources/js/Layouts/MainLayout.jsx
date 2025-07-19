// resources/js/Layouts/MainLayout.jsx

import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react'; // <-- Assurez-vous que usePage est bien importé
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/ui/button';

import logoLight from '/img/octo/logo-8phyL.gif';
import logoDark from '/img/octo/logo-8phy.gif';
import Footer from '@/Components/Layout/Footer';

export default function MainLayout({ user, header, children, canLogin, canRegister, title, navigationItems, userMenuItems }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // --- DÉBUT DE L'AJOUT POUR LES MESSAGES FLASH ---
    const { flash } = usePage().props; // Récupère l'objet flash des props de la page
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // Pour les messages d'erreur manuels

    useEffect(() => {
        // Gère les messages de succès
        if (flash && flash.success) {
            setSuccessMessage(flash.success);
            const timer = setTimeout(() => {
                setSuccessMessage(null); // Masque le message après 5 secondes
            }, 5000);
            return () => clearTimeout(timer); // Nettoyage du timer à la suppression du composant ou nouveau flash
        } else {
            setSuccessMessage(null); // S'il n'y a plus de flash.success, on s'assure qu'il n'est pas affiché
        }

        // Gère les messages d'erreur (si vous en envoyez manuellement depuis Laravel avec ->with('error', '...'))
        if (flash && flash.error) {
            setErrorMessage(flash.error);
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setErrorMessage(null);
        }
    }, [flash]); // Ce useEffect s'exécute à chaque fois que l'objet `flash` change
    // --- FIN DE L'AJOUT POUR LES MESSAGES FLASH ---

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const { url: currentUrl } = usePage();
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    const userMenuItemsFinal = userMenuItems || [];
    const mainNavigationItemsFinal = navigationItems || [];

    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-stone-900">
            <Head title={title || 'Octopus'} />

            <nav className={`fixed top-0 left-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-secondary/70' : 'bg-white/70'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo & Site Title */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src={isDarkMode ? logoDark : logoLight}
                                    alt="logo"
                                    className="h-9 w-auto"
                                />
                                <span className="ml-3 text-2xl font-bold text-stone-500 dark:text-stone-400">OCTOPUS</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            {/* Main Navigation Links */}
                            <div className="flex space-x-8">
                                {mainNavigationItemsFinal.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        href={item.href}
                                        is_anchor={item.is_anchor || false}
                                        active={
                                            item.is_anchor
                                                ? currentHash === item.href
                                                : currentUrl === item.href || (item.route_name && route().current(item.route_name))
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Theme Toggle & Auth Links/Dropdown */}
                            <div className="flex items-center space-x-4 ml-6">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleDarkMode}
                                    className="rounded-full"
                                >
                                    {isDarkMode ? '☀️' : '🌙'}
                                </Button>

                                {(userMenuItemsFinal.length > 0 || user) ? (
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${isDarkMode ? 'text-gray-300 bg-secondary hover:text-gray-100' : 'text-gray-500 bg-white hover:text-gray-700'} focus:outline-none transition ease-in-out duration-150`}
                                                    >
                                                        {user ? user.name : 'Menu'}
                                                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content className="z-[60] bg-white dark:bg-stone-700 p-1 min-w-[10rem]">
                                                {userMenuItemsFinal.map((item) => (
                                                    item.method ? (
                                                        <Dropdown.Link
                                                            key={item.label}
                                                            href={item.href}
                                                            method={item.method}
                                                            as={item.as}
                                                            className={item.className || ''}
                                                        >
                                                            {item.label}
                                                        </Dropdown.Link>
                                                    ) : (
                                                        <Dropdown.Link
                                                            key={item.label}
                                                            href={item.href}
                                                            className={item.className || ''}
                                                        >
                                                            {item.label}
                                                        </Dropdown.Link>
                                                    )
                                                ))}
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <div className="space-x-4">
                                        {canLogin && (
                                            <Link href={route('login')} className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                                Log in
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link href={route('register')} className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                                Register
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <div className="flex items-center md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="rounded-full me-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                            >
                                {isDarkMode ? '☀️' : '🌙'}
                            </Button>
                            <button
                                onClick={() => setIsNavbarOpen(prev => !prev)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!isNavbarOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={isNavbarOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Mobile Navigation */}
                <div className={(isNavbarOpen ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {mainNavigationItemsFinal.map((item) => (
                            <ResponsiveNavLink
                                key={item.label}
                                href={item.href}
                                is_anchor={item.is_anchor || false}
                                active={
                                    item.is_anchor
                                        ? currentHash === item.href
                                        : currentUrl === item.href || (item.route_name && route().current(item.route_name))
                                }
                                onClick={handleNavLinkClick}
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    {/* Mobile Profile Menu (userMenuItems) */}
                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500 dark:text-slate-400">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                {userMenuItemsFinal.map((item) => (
                                    item.method ? (
                                        <ResponsiveNavLink
                                            key={item.label}
                                            href={item.href}
                                            method={item.method}
                                            as={item.as}
                                            className={item.className || ''}
                                            onClick={handleNavLinkClick}
                                        >
                                            {item.label}
                                        </ResponsiveNavLink>
                                    ) : (
                                        <ResponsiveNavLink
                                            key={item.label}
                                            href={item.href}
                                            className={item.className || ''}
                                            onClick={handleNavLinkClick}
                                        >
                                            {item.label}
                                        </ResponsiveNavLink>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            {canLogin && (
                                <ResponsiveNavLink href={route('login')} onClick={handleNavLinkClick}>Log in</ResponsiveNavLink>
                            )}
                            {canRegister && (
                                <ResponsiveNavLink href={route('register')} onClick={handleNavLinkClick}>Register</ResponsiveNavLink>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-stone-800 shadow pt-16">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* --- DÉBUT DE L'AFFICHAGE DES MESSAGES FLASH --- */}
            {/* {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4" role="alert">
                    <strong className="font-bold">Succès !</strong>
                    <span className="block sm:inline ml-2">{successMessage}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setSuccessMessage(null)}>
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.029a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4" role="alert">
                    <strong className="font-bold">Erreur !</strong>
                    <span className="block sm:inline ml-2">{errorMessage}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setErrorMessage(null)}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.029a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            )} */}
            {/* --- FIN DE L'AFFICHAGE DES MESSAGES FLASH --- */}

            <main>{children}</main>
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}