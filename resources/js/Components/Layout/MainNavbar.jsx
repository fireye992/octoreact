// resources/js/Components/Layout/MainNavbar.jsx

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/ui/button';

import logoLight from '/img/octo/logo-8phyL.gif';
import logoDark from '/img/octo/logo-8phy.gif';

export default function MainNavbar({ user, navigationItems, canLogin, canRegister, isDarkMode, toggleDarkMode }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState);
    };

    // Fonction pour gérer les clics sur les ancres HTML
    const handleAnchorClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
                setIsNavbarOpen(false); // Ferme le menu mobile après le clic
            }
        }
    };
    
    // Un composant de lien pour les ancres avec un style de NavLink responsive
    const ResponsiveAnchorLink = ({ href, children, ...props }) => (
        <a
            href={href}
            onClick={(e) => handleAnchorClick(e, href)}
            className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
            {...props}
        >
            {children}
        </a>
    );

    return (
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
                            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-gray-100">OCTOPUS</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {/* Main Navigation Links */}
                        <div className="flex space-x-8">
                            {navigationItems && navigationItems.map((item) => (
                                // Utilise la logique de route pour les liens desktop
                                <NavLink key={item.label} href={item.href} active={route().current(item.route_name)}>
                                    {item.label}
                                </NavLink>
                            ))}
                            {/* Liens pour l'utilisateur connecté */}
                            {user && (
                                <>
                                    {user.is_admin && (
                                        <NavLink href={route('admin.videos')} active={route().current('admin.videos')}>
                                            Admin Videos
                                        </NavLink>
                                    )}
                                </>
                            )}
                        </div>
                        
                        {/* Theme Toggle & Auth Links/Dropdown */}
                        <div className="flex items-center space-x-4 ml-6">
                            {/* Dark/Light Mode Toggle (Desktop) */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleDarkMode}
                                className="rounded-full"
                            >
                                {isDarkMode ? '☀️' : '🌙'}
                            </Button>

                            {/* User Dropdown or Login/Register links */}
                            {user ? (
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${isDarkMode ? 'text-gray-300 bg-secondary hover:text-gray-100' : 'text-gray-500 bg-white hover:text-gray-700'} focus:outline-none transition ease-in-out duration-150`}
                                                >
                                                    {user.name}
                                                    <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            {user.is_admin && (
                                                <Dropdown.Link href={route('admin.videos')}>Admin-videos</Dropdown.Link>
                                            )}
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
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
                                        <Link href={route('register')} className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                            Register
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center md:hidden">
                        {/* Dark/Light Mode Toggle (Mobile) - TOUJOURS VISIBLE */}
                        <Button
                            variant="ghost" // Use 'ghost' for a transparent background
                            size="icon"
                            onClick={toggleDarkMode}
                            className="rounded-full me-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </Button>
                        <button
                            onClick={toggleNavbar}
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
                    {/* Liens de navigation */}
                    {navigationItems && navigationItems.map((item) => (
                        item.is_anchor ? (
                            <ResponsiveAnchorLink key={item.label} href={item.href}>
                                {item.label}
                            </ResponsiveAnchorLink>
                        ) : (
                            <ResponsiveNavLink key={item.label} href={item.href} active={route().current(item.route_name)}>
                                {item.label}
                            </ResponsiveNavLink>
                        )
                    ))}
                    
                    {/* Liens pour l'utilisateur connecté sur mobile */}
                    {user && (
                        <>
                            {user.is_admin && (
                                <ResponsiveNavLink href={route('admin.videos')} active={route().current('admin.videos')}>
                                    Admin Videos
                                </ResponsiveNavLink>
                            )}
                        </>
                    )}
                </div>

                {/* Menu de profil mobile */}
                {user ? (
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            {/* {user.is_admin && (
                            <ResponsiveNavLink href={route('admin.videos')}>Admin</ResponsiveNavLink>
                            )} */}
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
    );
}