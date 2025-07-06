import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, href, is_anchor = false, ...props }) {
    const baseClasses =
        'w-full flex items-start ps-3 pe-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out ';

    const activeClasses =
        'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700';

    const inactiveClasses =
        'border-transparent text-gray-600 dark:text-stone-200 hover:text-gray-800 hover:dark:text-stone-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300';

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