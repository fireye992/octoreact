// resources/js/Components/Layout/NavbarHamburger.jsx

import React from 'react';

export default function NavbarHamburger({ onClick, className }) {
    return (
        <button
            id="navbarToggler"
            onClick={onClick}
            className={`
                block absolute right-0 px-3 py-[6px] rounded-lg top-1/2 -translate-y-1/2
                ring-primary focus:ring-2 lg:hidden
                ${className}
            `}
        >
            <span className="relative w-[30px] h-[2px] my-[6px] block bg-secondary dark:bg-stone-300"></span>
            <span className="relative w-[30px] h-[1px] my-[6px] block bg-secondary dark:bg-stone-100"></span>
            <span className="relative w-[30px] h-[2px] my-[6px] block bg-secondary dark:bg-stone-300"></span>
        </button>
    );
}