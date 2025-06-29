// resources/js/Components/Layout/NavbarItem.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

export default function NavbarItem({ href, children }) {
    // Determine if the link is active based on the current URL
    const isActive = route().current(href);

    return (
        <li>
            <Link
                href={href}
                className={`
                    flex py-2 text-base font-medium
                    ${isActive
                        ? 'text-primary dark:text-stone-300' // Active link styles
                        : 'text-stone-700 hover:text-primary dark:text-stone-300 dark:hover:text-amber-500' // Inactive link styles
                    }
                    lg:ml-10 lg:inline-flex
                `}
            >
                {children}
            </Link>
        </li>
    );
}