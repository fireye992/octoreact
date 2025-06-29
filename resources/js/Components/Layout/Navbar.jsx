// resources/js/Components/Layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import NavbarHamburger from '@/Components/Layout/NavbarHamburger'; // You will need to migrate this component next
import NavbarItem from '@/Components/Layout/NavbarItem'; // You will need to migrate this component next

export default function Navbar({ navigationItems = [] }) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    // Function to toggle dark mode class on the <html> element
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setTheme(newTheme);
    };
    
    // This effect handles the YouTube script logic
    useEffect(() => {
        // This is a placeholder for the YouTube subscribe button script.
        // You would typically load the script dynamically here if needed.
        // For now, let's assume the script is loaded globally in your main layout.
        // If it's not, you might need a more complex solution or a React library.
        // Let's add a log to check if it's there.
        if (window.gapi) {
            console.log('YouTube GAPI is available.');
            // gapi.ytsubscribe.render... (actual rendering logic would go here)
        } else {
            console.log('YouTube GAPI not available. Make sure the script is loaded.');
        }
    }, []);

    const logoSrcLight = '/img/octo/logo-8phyL.png';
    const logoSrcDark = '/img/octo/logo-8phy.png';

    return (
        <header
            className={`fixed top-0 left-0 z-50 flex items-center w-full h-24 bg-secondary shadow-md dark:bg-secondary`}
        >
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between mx-4">
                    <div className="max-w-full pl-4 w-100">
                        <Link href="/" className="flex items-center w-full py-2">
                            {/* Logos for light and dark mode */}
                            <img
                                src={logoSrcLight}
                                alt="logo"
                                className={`w-[70px] lg:w-[70px] inline-block ${theme === 'dark' ? 'hidden' : 'dark:hidden'}`}
                            />
                            <img
                                src={logoSrcDark}
                                alt="logo"
                                className={`w-[70px] lg:w-[70px] ${theme === 'dark' ? 'inline-block' : 'hidden dark:inline-block'}`}
                            />
                            {/* Note: The span had an empty text content based on the comment */}
                            <span className="ml-2 text-xl xl:text-2xl font-bold text-amber-600 dark:secondary"></span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-end w-full px-4">
                        <div>
                            {/* Alpine.js toggler migrated to React state */}
                            <NavbarHamburger
                                onClick={() => setNavbarOpen(!navbarOpen)}
                                className={navbarOpen ? 'navbarTogglerActive' : ''}
                            />
                            <nav
                                id="navbarCollapse"
                                className={`${!navbarOpen && 'hidden'} absolute right-0 z-50 w-full px-6 py-5 bg-stone-300 rounded-lg shadow top-full dark:bg-secondary dark:text-secondary lg:px-0 lg:max-w-full lg:right-4 lg:block lg:static lg:shadow-none`}
                            >
                                <ul className="block lg:flex lg:items-center">
                                    {/* Blade @foreach migrated to JavaScript .map() */}
                                    {navigationItems.map((item, index) => (
                                        <NavbarItem key={index} href={item.href}>
                                            {item.label}
                                        </NavbarItem>
                                    ))}
                                    {/* YouTube subscribe button - handled with a div. You need to ensure the JS loads. */}
                                    <div className="relative ml-0 lg:ml-10 xl:ml-16 top-1">
                                        <div className="g-ytsubscribe" data-channelid="UCCF2FQG9YT4vBkgsFZdnMZw" data-layout="defaut" data-count="defaut"></div>
                                    </div>
                                    
                                    {/* Light/Dark mode toggle button */}
                                    <button
                                        onClick={toggleTheme}
                                        className="ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                                    >
                                        {theme === 'dark' ? '☀️' : '🌙'}
                                    </button>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}