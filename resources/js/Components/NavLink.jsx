import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, href, is_anchor = false, ...props }) {
    const baseClasses =
        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ';

    const activeClasses =
        'border-transparent text-gray-500 dark:text-stone-300 hover:text-gray-700 dark:hover:text-stone-100 hover:border-gray-300 dark:hover:border-stone-600 focus:text-gray-700 focus:border-gray-300 ';

    const inactiveClasses =
        'border-transparent text-gray-500 dark:text-stone-300 hover:text-gray-700 dark:hover:text-stone-100 hover:border-gray-300 dark:hover:border-stone-600 focus:text-gray-700 focus:border-gray-300 ';

    if (is_anchor) {
        return (
            <a
                href={href}
                className={baseClasses + (active ? activeClasses : inactiveClasses) + className}
                onClick={(e) => {
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const id = href.substring(1);
                        const element = document.getElementById(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            window.history.pushState(null, '', href);
                        }
                    }
                    if (props.onClick) props.onClick(e);
                }}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className={baseClasses + (active ? activeClasses : inactiveClasses) + className}
            {...props}
        >
            {children}
        </Link>
    );
}