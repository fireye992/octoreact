// resources/js/Components/Layout/Footer.jsx

import React from 'react';

export default function Footer() {
    return (
        <footer className="p-6 bg-gray-200 text-center text-gray-600 mt-auto">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} Footer (placeholder). All rights reserved.</p>
            </div>
        </footer>
    );
}