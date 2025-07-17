// resources/js/Pages/Dashboard.jsx
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation';

export default function Dashboard({ auth, canLogin, canRegister, quotes: paginatedQuotes }) {
    const { user } = usePage().props.auth;
    const isAdmin = user && user.is_admin;
    const { flash } = usePage().props;

    // État du formulaire de proposition de citation
    const { data, setData, post, processing, errors, reset } = useForm({
        text: '',
        author: '',
        title: '', // Laisser le champ 'title' dans l'état du formulaire
    });

    const submitQuote = (e) => {
        e.preventDefault();
        post(route('quotes.propose'), {
            onSuccess: () => {
                reset(); // Réinitialise le formulaire après succès
            },
            onError: () => {
                // Les erreurs seront affichées automatiquement par les helpers {errors.field}
            },
            preserveScroll: true,
        });
    };

    const pageNavigationItems = mainNavigationItems;
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href);

    return (
        <MainLayout
            user={user}
            navigationItems={pageNavigationItems}
            userMenuItems={pageUserMenuItems}
            title={isAdmin ? "Dashboard Administrateur" : "Dashboard Utilisateur"}
            canLogin={canLogin}
            canRegister={canRegister}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {isAdmin ? "Dashboard Administrateur" : "Bienvenue sur votre Dashboard !"}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Message Flash de succès/erreur */}
                    {flash.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{flash.error}</span>
                        </div>
                    )}

                   

                    <div className="bg-white dark:bg-stone-500 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-stone-100 mb-4">
                            {isAdmin ? "Toutes les citations :" : "Quelques citations validées pour vous :"}
                        </h3>
                        {paginatedQuotes && paginatedQuotes.data.length > 0 ? (
                            <div className="space-y-4">
                                {paginatedQuotes.data.map((quote) => (
                                    <div key={quote.id} className="p-4 bg-gray-50 dark:bg-stone-600 rounded-md shadow-sm">
                                        <p className="text-gray-800 dark:text-stone-100 italic">"{quote.text}"</p>
                                        <p className="text-right text-sm text-gray-600 dark:text-stone-300">
                                            - {quote.author || 'Anonyme'}
                                            {quote.title && ( // <-- La modification est ici
                                                <span className="block text-xs mt-1 italic">
                                                    Œuvre: {quote.title}
                                                </span>
                                            )}
                                            {quote.proposed_by && (
                                                <span className="block text-xs mt-1">Proposée par : {quote.proposed_by}</span>
                                            )}
                                        </p>

                                        {/* Badges de validation conditionnels pour l'admin */}
                                        {isAdmin && (
                                            <div className="mt-2 text-right">
                                                {quote.is_validated ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                                                        Validée ✅
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100">
                                                        En attente 🔴
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Pagination pour les citations du dashboard */}
                                {paginatedQuotes.links && paginatedQuotes.links.length > 3 && (
                                    <nav className="mt-4 flex justify-center flex-wrap gap-2">
                                        {paginatedQuotes.links.map((link, key) => (
                                            <div key={key}>
                                                <Link
                                                    href={link.url || '#'}
                                                    className={`
                                                        px-4 py-2 text-sm leading-4 border rounded-md shadow-sm
                                                        ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100 dark:hover:bg-stone-600'}
                                                        ${link.url === null ? 'opacity-50 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                                    `}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    preserveScroll
                                                />
                                            </div>
                                        ))}
                                    </nav>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-stone-300">
                                {isAdmin ? "Aucune citation à afficher pour le moment." : "Aucune citation validée à afficher pour le moment."}
                            </p>
                        )}

                        {/* Lien vers la page d'administration des citations si l'utilisateur est admin */}
                        {isAdmin && (
                            <div className="mt-6 border-t pt-4 border-gray-200 dark:border-stone-700">
                                <Link
                                    href={route('admin.quotes.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Accéder à l'administration des citations
                                </Link>
                            </div>
                        )}
                    </div>
                     <div className="bg-white dark:bg-stone-500 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-8">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-stone-100 mb-4">
                            Proposer une nouvelle citation 🖊️
                        </h3>
                        <form onSubmit={submitQuote} className="space-y-4">
                            <div>
                                <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                                    Citation <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="text"
                                    name="text"
                                    rows="3"
                                    value={data.text}
                                    onChange={(e) => setData('text', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100"
                                    required
                                ></textarea>
                                {errors.text && <div className="text-red-500 text-sm mt-1">{errors.text}</div>}
                            </div>
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                                    Auteur
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100"
                                />
                                {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-stone-200">
                                    Titre de l'œuvre (optionnel)
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-stone-700 dark:border-stone-600 dark:text-stone-100"
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:bg-indigo-600 dark:active:bg-indigo-700 dark:focus:ring-offset-stone-800 transition ease-in-out duration-150"
                            >
                                {processing ? 'Envoi...' : 'Proposer la citation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}