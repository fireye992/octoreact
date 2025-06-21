import { useState } from 'react';
import { Link } from '@inertiajs/react';

// Importe tes images de logo
import logoLight from '/img/octo/logo-8phyL.png';
import logoDark from '/img/octo/logo-8phy.png';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const navigationItems = [
        { label: 'A propos', href: route('home') + '#about', isAnchor: true },
        { label: 'Médias', href: route('home') + '#tutos', isAnchor: true },
        { label: 'Contact', href: route('home') + '#contact', isAnchor: true },
    ];

    const handleAnchorClick = (e, href) => {
        const url = new URL(href);
        const hash = url.hash;
        if (hash) {
            e.preventDefault();
            window.location.href = href;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="fixed top-0 left-0 z-50 flex items-center w-full h-24 bg-white shadow-md dark:bg-gray-800">
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between mx-4">
                        <div className="max-w-full pl-4 w-auto">
                            {/* C'est ICI que nous allons changer le href ! */}
                             <a href="/" className="flex items-center w-full py-2">
                                <img
                                    src={logoLight}
                                    alt="logo"
                                    className="w-[70px] lg:w-[70px] inline-block dark:hidden"
                                />
                                <img
                                    src={logoDark}
                                    alt="logo"
                                    className="w-[70px] lg:w-[70px] hidden dark:inline-block"
                                />
                                <span className="ml-2 text-xl xl:text-2xl font-bold text-amber-600 dark:text-gray-200"></span>
                            </a>
                        </div>

                        <div className="flex items-center justify-end w-full px-4">
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="block text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
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

                            <nav
                                id="navbarCollapse"
                                className={`absolute right-0 z-50 w-full px-6 py-5 bg-white rounded-lg shadow top-full dark:bg-gray-800 dark:text-gray-200 lg:px-0 lg:max-w-full lg:right-4 lg:block lg:static lg:shadow-none ${!showingNavigationDropdown ? 'hidden' : ''} lg:block`}
                            >
                                <ul className="block lg:flex lg:items-center">
                                    {navigationItems.map((item, index) => (
                                        <li key={index}>
                                            {item.isAnchor ? (
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => handleAnchorClick(e, item.href)}
                                                    className="text-xs font-medium text-dark py-2 flex hover:text-primary dark:text-gray-200 lg:inline-flex lg:ml-6 xl:ml-12"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="text-xs font-medium text-dark py-2 flex hover:text-primary dark:text-gray-200 lg:inline-flex lg:ml-6 xl:ml-12"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}

                                    {user && (
                                        <li>
                                            <Link
                                                href={route('dashboard')}
                                                className={`text-xs font-medium py-2 flex hover:text-primary dark:text-gray-200 lg:inline-flex lg:ml-6 xl:ml-12 ${route().current('dashboard') ? 'text-primary dark:text-amber-500' : 'text-dark'}`}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    {user && user.is_admin && (
                                        <li className="lg:ml-auto">
                                            <Link
                                                href={route('admin.videos')}
                                                className={`text-xs font-medium py-2 flex hover:text-primary dark:text-gray-200 lg:inline-flex lg:ml-6 xl:ml-12 ${route().current('admin.videos') ? 'text-primary dark:text-amber-500' : 'text-dark'}`}
                                            >
                                                Admin Vidéos
                                            </Link>
                                        </li>
                                    )}

                                    {user && (
                                        <li className="relative lg:pl-10">
                                            <button
                                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
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

                                            {profileDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-700">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <Link
                                                            href={route('profile.edit')}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                            onClick={() => setProfileDropdownOpen(false)}
                                                        >
                                                            Profile
                                                        </Link>
                                                        <Link
                                                            href={route('logout')}
                                                            method="post"
                                                            as="button"
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                            onClick={() => setProfileDropdownOpen(false)}
                                                        >
                                                            Déconnexion
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            {header && (
                <header className="bg-white shadow pt-24 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-gray-200">{header}</h2>
                    </div>
                </header>
            )}

            <main className="mt-8">{children}</main>
        </div>
    );
}