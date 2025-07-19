// resources/js/Components/InertiaPagination.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

const InertiaPagination = ({ paginationLinks }) => {
    // Vérifier si des liens de pagination existent et s'il y en a plus de 3 (précédent, 1, suivant)
    if (!paginationLinks || paginationLinks.length <= 3) {
        return null; // Ne rien afficher si pas de pagination ou trop peu de liens
    }

    return (
        <nav className="mt-4 flex justify-center flex-wrap gap-2">
            {paginationLinks.map((link, key) => (
                <div key={key}>
                    {/* Utilisation de <Link> d'Inertia */}
                    <Link
                        href={link.url || '#'} // Utilise '#' si l'URL est null (pour les liens désactivés comme la page courante)
                        className={`
                            px-4 py-2 text-sm leading-4 border rounded-md shadow-sm
                            ${link.active
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100 dark:hover:bg-stone-600'}
                            ${link.url === null
                                ? 'opacity-50 cursor-not-allowed'
                                : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                        `}
                        // dangerouslySetInnerHTML est nécessaire car Laravel renvoie souvent les symboles comme &laquo; ou &raquo;
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        preserveScroll // Conserve la position de défilement lors de la navigation
                        preserveState // Conserve l'état du composant après la navigation
                    />
                </div>
            ))}
        </nav>
    );
};

export default InertiaPagination;