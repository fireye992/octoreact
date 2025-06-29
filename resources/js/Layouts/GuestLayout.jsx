// resources/js/Layouts/GuestLayout.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar'; // <-- Import de la Navbar
import Footer from '@/Components/Layout/Footer'; // <-- Import du Footer

// 1. Assurez-vous que Guest reçoit la prop 'navigationItems'
export default function Guest({ user, children, navigationItems = [] }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* 2. Et qu'il la passe à la Navbar */}
            <Navbar navigationItems={navigationItems} />

            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
}