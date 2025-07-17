// resources/js/Pages/Admin/Quotes/Index.jsx

import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Assurez-vous d'importer Inertia

// --- Composant EditableCell (inchangé, gardez votre version si déjà complète) ---
// (Votre code EditableCell ici)
const EditableCell = ({ value, onSave, isEditing, onToggleEdit, type = 'text', className = '' }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSave(inputValue);
            onToggleEdit();
        }
        if (e.key === 'Escape') {
            setInputValue(value);
            onToggleEdit();
        }
    };

    return (
        <div className={`flex items-center justify-between ${className}`}>
            {isEditing ? (
                <input
                    type={type}
                    value={inputValue || ''}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => {
                        onSave(inputValue);
                        onToggleEdit();
                    }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-grow border-gray-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 rounded-md shadow-sm text-sm"
                />
            ) : (
                <span className="flex-grow cursor-pointer" onClick={onToggleEdit}>
                    {value || '-'}
                </span>
            )}
        </div>
    );
};


// --- Composant principal AdminQuotesIndex ---
export default function AdminQuotesIndex({ auth, quotes: initialPaginatedQuotes }) { // Renommez la prop pour utiliser un état local
    const { user } = usePage().props.auth;
    const isAdmin = user && user.is_admin;

    const [editingQuoteId, setEditingQuoteId] = useState(null);
    const [editingField, setEditingField] = useState(null);

    // Nouvel état local pour les citations, initialisé avec les props
    const [quotesData, setQuotesData] = useState(initialPaginatedQuotes.data);
    const [paginationLinks, setPaginationLinks] = useState(initialPaginatedQuotes.links);
    const [currentPage, setCurrentPage] = useState(initialPaginatedQuotes.current_page);


    // Met à jour l'état local si les props changent (par exemple, lors du changement de page ou si le serveur renvoie de nouvelles données)
    useEffect(() => {
        setQuotesData(initialPaginatedQuotes.data);
        setPaginationLinks(initialPaginatedQuotes.links);
        setCurrentPage(initialPaginatedQuotes.current_page);
    }, [initialPaginatedQuotes]);


    const toggleEdit = (quoteId, fieldName) => {
        if (editingQuoteId === quoteId && editingField === fieldName) {
            setEditingQuoteId(null);
            setEditingField(null);
        } else {
            setEditingQuoteId(quoteId);
            setEditingField(fieldName);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette citation ?')) {
            // Mise à jour optimiste: retire la citation de la liste immédiatement
            setQuotesData(prevQuotes => prevQuotes.filter(quote => quote.id !== id));

            Inertia.delete(route('admin.quotes.destroy', id), {
                onError: (errors) => {
                    console.error('Erreur lors de la suppression :', errors);
                    // Rollback si erreur: recharger la page pour restaurer l'état
                    Inertia.reload({ only: ['quotes'], preserveScroll: true, preserveState: false }); // preserveState: false pour forcer le refresh complet de la prop 'quotes'
                },
                onSuccess: () => {
                    // Si succès, Inertia devrait recharger les props 'quotes' et le useEffect les mettra à jour
                    // Cependant, pour la suppression, si la liste est vide ou si un élément de la page précédente est supprimé
                    // il est souvent préférable de laisser Inertia recharger la page complète ou au moins la prop quotes
                    // Si onDelete vous souhaitez rester sur la même page mais avec un element de moins alors :
                    // Inertia.reload({ only: ['quotes'], preserveScroll: true }); // Cela suffit
                },
                preserveScroll: true,
                preserveState: true, // Permet à Inertia de gérer le reste de l'état
            });
        }
    };


    const handleUpdate = (id, field, value) => {
        // Optimistic update for text, author, title, proposed_by
        const originalQuotesData = [...quotesData]; // Sauvegarde l'état original
        setQuotesData(prevQuotes =>
            prevQuotes.map(quote =>
                quote.id === id ? { ...quote, [field]: value } : quote
            )
        );

        Inertia.put(route('admin.quotes.update', id), {
            id: id,
            [field]: value,
        }, {
            onError: (errors) => {
                console.error(`Erreur lors de la mise à jour du champ ${field}:`, errors);
                alert(`Erreur de mise à jour: ${errors[field] || 'Erreur inconnue'}`);
                setQuotesData(originalQuotesData); // Rollback en cas d'erreur
            },
            preserveScroll: true,
            preserveState: true, // Nécessaire pour ne pas réinitialiser d'autres états (comme l'édition)
        });
    };

    const handleToggleValidation = (id) => {
        // Optimistic update for is_validated
        const originalQuotesData = [...quotesData]; // Sauvegarde l'état original
        setQuotesData(prevQuotes =>
            prevQuotes.map(quote =>
                quote.id === id ? { ...quote, is_validated: !quote.is_validated } : quote
            )
        );

        Inertia.patch(route('admin.quotes.toggleValidation', id), {}, {
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du statut de validation :', errors);
                alert('Erreur lors de la mise à jour du statut.');
                setQuotesData(originalQuotesData); // Rollback en cas d'erreur
            },
            // onSuccess n'est pas strictement nécessaire ici grâce à l'update optimiste,
            // mais Inertia rafraîchira les props en arrière-plan, ce qui est bien pour la cohérence.
            // Si le serveur change l'ordre des citations validées/non validées,
            // un Inertia.reload({ only: ['quotes'] }) pourrait être envisagé ici,
            // mais le `preserveState: true` devrait éviter un rafraîchissement visuel brutal.
            preserveScroll: true,
            preserveState: true,
        });
    };

    const pageNavigationItems = mainNavigationItems;
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href);

    const hasQuotes = quotesData && quotesData.length > 0; // Utiliser quotesData pour vérifier


    return (
        <MainLayout
            user={user}
            navigationItems={pageNavigationItems}
            userMenuItems={pageUserMenuItems}
            title="Administration des Citations"
            canLogin={auth.canLogin}
            canRegister={auth.canRegister}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Administration des Citations
                </h2>
            }
        >
            <Head title="Admin Citations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-stone-500 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-stone-100 mb-4">
                            Gestion des Citations
                        </h3>

                        {!hasQuotes ? (
                            <p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-stone-300 text-center">
                                Aucune citation trouvée.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-stone-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Texte</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Auteur</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Titre</th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Proposée par</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Statut</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotesData.map((quote) => ( // Utilisez quotesData ici
                                            <tr key={quote.id} className="odd:bg-white odd:dark:bg-stone-600 even:bg-gray-50 even:dark:bg-stone-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-stone-100">
                                                    {quote.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-stone-100 max-w-xs truncate">
                                                    <EditableCell
                                                        value={quote.text}
                                                        onSave={(newValue) => handleUpdate(quote.id, 'text', newValue)}
                                                        isEditing={editingQuoteId === quote.id && editingField === 'text'}
                                                        onToggleEdit={() => toggleEdit(quote.id, 'text')}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100">
                                                    <EditableCell
                                                        value={quote.author}
                                                        onSave={(newValue) => handleUpdate(quote.id, 'author', newValue)}
                                                        isEditing={editingQuoteId === quote.id && editingField === 'author'}
                                                        onToggleEdit={() => toggleEdit(quote.id, 'author')}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100">
                                                    <EditableCell
                                                        value={quote.title}
                                                        onSave={(newValue) => handleUpdate(quote.id, 'title', newValue)}
                                                        isEditing={editingQuoteId === quote.id && editingField === 'title'}
                                                        onToggleEdit={() => toggleEdit(quote.id, 'title')}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-stone-100">
                                                    <EditableCell
                                                        value={quote.proposed_by}
                                                        onSave={(newValue) => handleUpdate(quote.id, 'proposed_by', newValue)}
                                                        isEditing={editingQuoteId === quote.id && editingField === 'proposed_by'}
                                                        onToggleEdit={() => toggleEdit(quote.id, 'proposed_by')}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {quote.is_validated ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                                                            Validée ✅
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
                                                            En attente 🔴
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleToggleValidation(quote.id)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150
                                                                   mr-2
                                                                   bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900
                                                                   dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:focus:bg-indigo-500 dark:active:bg-indigo-600 dark:text-white"
                                                    >
                                                        {quote.is_validated ? 'Invalider' : 'Valider'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(quote.id)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded-md text-white dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150
                                                                   bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900
                                                                   dark:bg-red-400 dark:hover:bg-red-500 dark:focus:bg-red-500 dark:active:bg-red-600 dark:text-white"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Section de pagination, utilisant les liens de l'état local */}
                                {paginationLinks && paginationLinks.length > 3 && (
                                    <nav className="mt-4 flex justify-center flex-wrap gap-2">
                                        {paginationLinks.map((link, key) => (
                                            <div key={key}>
                                                <Link
                                                    href={link.url || '#'}
                                                    className={`
                                                        px-4 py-2 text-sm leading-4 border rounded-md shadow-sm
                                                        ${link.active
                                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                                            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100 dark:hover:bg-stone-600'}
                                                        ${link.url === null
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                                    `}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    preserveScroll
                                                    // IMPORTANT: pour les liens de pagination, preserveState: true n'est pas toujours souhaitable
                                                    // si le backend renvoie un nouvel ensemble de données (ce qui est le cas pour la pagination)
                                                    // Laissez Inertia gérer le rechargement de la prop 'quotes' via la navigation.
                                                    // Si vous avez des filtres qui doivent persister, là on utilise `preserveState`.
                                                />
                                            </div>
                                        ))}
                                    </nav>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}