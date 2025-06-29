// resources/js/Components/Layout/MainNavbar.jsx

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { Button } from '@/Components/ui/button';

export default function MainNavbar({ user, navigationItems, canLogin, canRegister, isDarkMode, toggleDarkMode }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    
    // Use the isDarkMode prop from the parent layout, no need for local state
    // const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState);
    };
    
    const logoSrcLight = '/img/octo/logo-8phyL.gif';
    const logoSrcDark = '/img/octo/logo-8phy.gif';

    return (
        <header
            className={`fixed top-0 left-0 z-50 flex items-center w-full h-24 backdrop-blur-md transition-all duration-300`}
        >
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between mx-4">
                    <div className="max-w-full pl-4 w-100">
                        <Link href="/" className="flex items-center w-full py-2">
                            {/* Logos pour les modes clair et sombre */}
                            <img
                                src={isDarkMode ? logoSrcDark : logoSrcLight}
                                alt="logo"
                                className="w-[70px] lg:w-[70px] inline-block"
                            />
                            {/* Titre du logo, si nécessaire */}
                            <span className="ml-2 text-xl xl:text-2xl font-bold text-amber-600 dark:text-secondary">THE-L-BOX</span>
                        </Link>
                    </div>
                    
                    <div className="flex items-center justify-end w-full px-4">
                        <div>
                            <nav
                                id="navbarCollapse"
                                className={`${!isNavbarOpen && 'hidden'} absolute right-0 z-50 w-full px-6 py-5 bg-secondary rounded-lg shadow top-full dark:bg-secondary dark:text-secondary lg:px-0 lg:max-w-full lg:right-4 lg:block lg:static lg:shadow-none`}
                            >
                                <ul className="block lg:flex lg:items-center">
                                    {/* Liens de navigation */}
                                    {navigationItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={`
                                                    flex py-2 text-base font-medium
                                                    ${route().current(item.route_name)
                                                        ? 'text-primary dark:text-stone-300' // Active
                                                        : 'text-stone-700 hover:text-primary dark:text-stone-300 dark:hover:text-amber-500' // Inactive
                                                    }
                                                    lg:ml-10 lg:inline-flex
                                                `}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                    {/* Bouton de souscription YouTube */}
                                    <div className="relative ml-0 lg:ml-10 xl:ml-16 top-1">
                                        <div className="g-ytsubscribe" data-channelid="UCCF2FQG9YT4vBkgsFZdnMZw" data-layout="defaut" data-count="defaut"></div>
                                    </div>
                                    
                                    {/* Bouton pour le mode clair/sombre */}
                                    <button
                                        onClick={toggleDarkMode}
                                        className="ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                                    >
                                        {isDarkMode ? '☀️' : '🌙'}
                                    </button>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    
                    {/* Bouton Hamburger pour mobile */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleNavbar}
                            id="navbarToggler"
                            className={`
                                block absolute right-0 px-3 py-[6px] rounded-lg top-1/2 -translate-y-1/2
                                ring-primary focus:ring-2
                            `}
                        >
                            <span className={`relative w-[30px] h-[2px] my-[6px] block bg-secondary dark:bg-stone-300 ${isNavbarOpen ? 'absolute top-[13px] rotate-45' : ''}`}></span>
                            <span className={`relative w-[30px] h-[1px] my-[6px] block bg-secondary dark:bg-stone-100 ${isNavbarOpen ? 'hidden' : ''}`}></span>
                            <span className={`relative w-[30px] h-[2px] my-[6px] block bg-secondary dark:bg-stone-300 ${isNavbarOpen ? 'absolute bottom-[13px] -rotate-45' : ''}`}></span>
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}