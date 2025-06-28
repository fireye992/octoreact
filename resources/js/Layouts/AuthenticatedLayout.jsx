import { useState } from 'react';
import { Link } from '@inertiajs/react';

// Importe tes images de logo
import logoLight from '/img/octo/logo-8phyL.gif';
import logoDark from '/img/octo/logo-8phy.gif';

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
        <div className="min-h-screen bg-gray-100 dark:bg-stone-400">
            <header className="fixed top-0 left-0 z-50 flex items-center w-full h-24 bg-white shadow-md dark:bg-stone-800">
                <div className="container mx-auto">
                    <div className="relative flex items-center justify-between mx-4">
                        <div className="max-w-full pl-4 w-auto">
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
                            {/* NOUVEAU BOUTON HAMBURGER */}
                            <div className="flex lg:hidden pt-8">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    id="navbarToggler"
                                    className="relative right-0 top-1/2 -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 focus:outline-none"
                                >
                                    <span
                                        className={`relative my-[6px] block h-[2px] w-[30px] bg-secondary dark:bg-stone-300 transition-all duration-300 ease-out ${showingNavigationDropdown ? 'top-[8px] rotate-45' : ''}`}
                                    ></span>
                                    <span
                                        className={`relative my-[6px] block h-[1px] w-[30px] bg-secondary dark:bg-stone-100 transition-all duration-300 ease-out ${showingNavigationDropdown ? 'opacity-0' : ''}`}
                                    ></span>
                                    <span
                                        className={`relative my-[6px] block h-[2px] w-[30px] bg-secondary dark:bg-stone-300 transition-all duration-300 ease-out ${showingNavigationDropdown ? 'top-[-8px] -rotate-45' : ''}`}
                                    ></span>
                                </button>
                            </div>
                            {/* FIN DU NOUVEAU BOUTON HAMBURGER */}

                            {/* NAVIGATION CORRIGÉE */}
                            <nav
                                id="navbarCollapse"
                                className={`absolute right-0 top-full z-50 w-full rounded-lg bg-white px-6 py-5 shadow dark:bg-stone-700 dark:text-gray-200 lg:static lg:block lg:max-w-full lg:px-0 lg:right-4 lg:shadow-none
                                    ${showingNavigationDropdown ? 'block' : 'hidden'}`}
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-stone-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg--100 dark:text-stone-700 dark:hover:text-gray-300"
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
                                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-stone-700">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <Link
                                                            href={route('profile.edit')}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-stone-400"
                                                            onClick={() => setProfileDropdownOpen(false)}
                                                        >
                                                            Profile
                                                        </Link>
                                                        <Link
                                                            href={route('logout')}
                                                            method="post"
                                                            as="button"
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-stone-400"
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
                            {/* FIN DE LA NAVIGATION CORRIGÉE */}
                        </div>
                    </div>
                </div>
            </header>

            {header && (
                <header className="bg-white pt-24 shadow dark:bg-stone-700">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-stone-200">{header}</h2>
                    </div>
                </header>
            )}

            <main className="mt-8">{children}</main>
        </div>
    );
}