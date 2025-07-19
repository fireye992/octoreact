// resources/js/Pages/Admin/Quotes/Index.jsx

import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react'; // Retirez 'Link' car il est maintenant dans le composant de pagination
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

// Importez votre nouveau composant de pagination
import InertiaPagination from '@/Components/ui/Pagination'; // <-- Assurez-vous que le chemin est correct !


// --- Composant EditableCell (inchangé) ---
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
export default function AdminQuotesIndex({ auth, quotes: initialPaginatedQuotes }) {
    const { user, flash } = usePage().props;
    const isAdmin = user && user.is_admin;

    const [editingQuoteId, setEditingQuoteId] = useState(null);
    const [editingField, setEditingField] = useState(null);

    const [quotesData, setQuotesData] = useState(initialPaginatedQuotes.data);
    const [paginationLinks, setPaginationLinks] = useState(initialPaginatedQuotes.links);
    const [currentPage, setCurrentPage] = useState(initialPaginatedQuotes.current_page);

    useEffect(() => {
        setQuotesData(initialPaginatedQuotes.data);
        setPaginationLinks(initialPaginatedQuotes.links);
        setCurrentPage(initialPaginatedQuotes.current_page);
    }, [initialPaginatedQuotes]);

    // --- useEffect pour les messages flash, maintenant en pop-ups centrées ---
    useEffect(() => {
        if (flash && flash.success) {
            Swal.fire({
                icon: 'success',
                title: 'Succès !',
                text: flash.success,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
        if (flash && flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur !',
                text: flash.error,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
        if (flash && flash.warning) {
            Swal.fire({
                icon: 'warning',
                title: 'Attention !',
                text: flash.warning,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [flash]);

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
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Vous ne pourrez pas revenir en arrière !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                setQuotesData(prevQuotes => prevQuotes.filter(quote => quote.id !== id));

                Inertia.delete(route('admin.quotes.destroy', id), {
                    onError: (errors) => {
                        console.error('Erreur lors de la suppression :', errors);
                        Swal.fire(
                            'Erreur!',
                            errors.message || 'La suppression a échoué. Veuillez réessayer.',
                            'error'
                        );
                        Inertia.reload({ only: ['quotes'], preserveScroll: true, preserveState: false });
                    },
                    onSuccess: () => {
                        Swal.fire(
                            'Supprimé !',
                            'La citation a été supprimée.',
                            'success'
                        );
                    },
                    preserveScroll: true,
                    preserveState: true,
                });
            }
        });
    };


    const handleUpdate = (id, field, value) => {
        const originalQuotesData = [...quotesData];
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
                Swal.fire(
                    'Erreur de mise à jour',
                    `La mise à jour du champ "${field}" a échoué. Message: ${errors[field] || 'Erreur inconnue'}`,
                    'error'
                );
                setQuotesData(originalQuotesData);
            },
            onSuccess: () => {
                Swal.fire(
                    'Mise à jour réussie !',
                    'La citation a été mise à jour.',
                    'success'
                );
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleToggleValidation = (id) => {
        const originalQuotesData = [...quotesData];
        setQuotesData(prevQuotes =>
            prevQuotes.map(quote =>
                quote.id === id ? { ...quote, is_validated: !quote.is_validated } : quote
            )
        );

        Inertia.patch(route('admin.quotes.toggleValidation', id), {}, {
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du statut de validation :', errors);
                Swal.fire(
                    'Erreur de statut',
                    errors.message || 'La mise à jour du statut de validation a échoué.',
                    'error'
                );
                setQuotesData(originalQuotesData);
            },
            onSuccess: () => {
                Swal.fire(
                    'Statut mis à jour !',
                    'Le statut de validation de la citation a été modifié.',
                    'success'
                );
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const pageNavigationItems = mainNavigationItems;
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href);

    const hasQuotes = quotesData && quotesData.length > 0;


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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Proposée par</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Statut</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-stone-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotesData.map((quote) => (
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

                                {/* Utilisation du composant de pagination réutilisable */}
                                <InertiaPagination paginationLinks={paginationLinks} />

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}