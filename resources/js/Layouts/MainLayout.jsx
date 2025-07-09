// resources/js/Layouts/MainLayout.jsx

import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/ui/button';

import logoLight from '/img/octo/logo-8phyL.gif';
import logoDark from '/img/octo/logo-8phy.gif';
import Footer from '@/Components/Layout/Footer';


// Nous n'importerons PLUS mainNavigationItems et getUserMenuItems directement ici.
// Ils seront passés en props depuis les pages.
// import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation'; // <-- LIGNE À SUPPRIMER OU COMMENTER

// La prop `navigationItems` et `userMenuItems` est maintenant attendue
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

    // userMenuItemsFinal et mainNavigationItemsFinal SONT MAINTENANT LES PROPS
    // Assurez-vous qu'elles sont définies, sinon utilisez un tableau vide par défaut
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
                                {mainNavigationItemsFinal.map((item) => ( // Utilisez mainNavigationItemsFinal
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

                                {/* User Dropdown or Login/Register links */}
                                {/* Rendre la dropdown seulement s'il y a des items OU si l'utilisateur est connecté */}
                                {(userMenuItemsFinal.length > 0 || user) ? (
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${isDarkMode ? 'text-gray-300 bg-secondary hover:text-gray-100' : 'text-gray-500 bg-white hover:text-gray-700'} focus:outline-none transition ease-in-out duration-150`}
                                                    >
                                                        {user ? user.name : 'Menu'} {/* Affiche 'Menu' si non connecté */}
                                                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content className="z-[60] bg-white dark:bg-stone-700 p-1 min-w-[10rem]">
                                                {userMenuItemsFinal.map((item) => ( // Utilisez userMenuItemsFinal
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
                        {mainNavigationItemsFinal.map((item) => ( // Utilisez mainNavigationItemsFinal
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

                    {/* Menu de profil mobile (userMenuItems) */}
                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500 dark:text-slate-400">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                {userMenuItemsFinal.map((item) => ( // Utilisez userMenuItemsFinal
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

            <main>{children}</main>
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}