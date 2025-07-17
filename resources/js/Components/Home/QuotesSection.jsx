// resources/js/Components/Home/QuotesSection.jsx

import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { Button } from '@/Components/ui/button';

export default function QuotesSection({ quotes, id }) {
    const [showAllQuotes, setShowAllQuotes] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null); // L'état qui contient la citation pour la modale

    // Gère l'affichage de seulement 6 citations ou de toutes les citations
    const quotesToDisplay = showAllQuotes ? quotes : quotes.slice(0, 6);

    const MAX_LENGTH = 77; // Longueur maximale pour le texte tronqué dans la carte

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) {
            return text;
        }
        const truncated = text.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        if (lastSpaceIndex !== -1 && lastSpaceIndex > maxLength * 0.8) {
            return truncated.substring(0, lastSpaceIndex) + '...';
        }
        return truncated + '...';
    };

    const openModal = (quote) => {
        setSelectedQuote(quote);
    };

    const closeModal = () => {
        setSelectedQuote(null);
    };

    return (
        <section id={id} className="py-16 bg-gradient-to-br from-zinc-400 to-gray-200
                                     dark:bg-gradient-to-br dark:from-stone-900 dark:to-stone-800
                                     dark:text-gray-100 
                                     transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-neutral-700 dark:text-stone-300 mb-12">
                    Vos citations
                </h2>

                {quotes && quotes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {quotesToDisplay.map((quote) => (
                                <div
                                    key={quote.id}
                                    // La carte entière est maintenant cliquable pour la modale
                                    onClick={() => openModal(quote)}
                                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-300 ease-in-out border border-neutral-400 cursor-pointer
                                               dark:bg-stone-800 dark:border-stone-500"
                                >
                                    <div>
                                        <p className="text-xl italic text-neutral-800 leading-relaxed mb-4 dark:text-neutral-300 break-words">
                                            "{truncateText(quote.text, MAX_LENGTH)}"
                                        </p>
                                    </div>
                                    <div className="text-right mt-4">
                                        <p className="text-md font-semibold text-amber-600 dark:text-amber-600">
                                            - {quote.author}
                                        </p>
                                        {quote.proposed_by && (
                                            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                                                Proposée par: {quote.proposed_by}
                                            </p>
                                        )}
                                    </div>
                                    {/* Le bouton "Lire la suite" par carte n'est plus nécessaire car la carte est cliquable */}
                                </div>
                            ))}
                        </div>

                        {/* Boutons "Voir toutes les citations" / "Voir moins" réintégrés */}
                        {quotes.length > 6 && (
                            <div className="flex justify-center mt-12">
                                {!showAllQuotes && (
                                    <Button
                                        onClick={() => setShowAllQuotes(true)}
                                        className="rounded-md"
                                    >
                                        Afficher toutes les citations ({quotes.length})
                                    </Button>
                                )}
                                {showAllQuotes && (
                                    <Button
                                        onClick={() => setShowAllQuotes(false)}
                                        className="rounded-md"
                                    >
                                        Afficher moins de citations
                                    </Button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-600 text-lg dark:text-gray-400">
                        Aucune citation n'est disponible pour le moment.
                    </p>
                )}
            </div>

            {/* La modale reste la même, elle s'ouvre avec la citation sélectionnée */}
            <Modal
                show={!!selectedQuote}
                onClose={closeModal}
                maxWidth="lg"
            >
                <div className="p-6 dark:text-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-neutral-100">
                        Citation de {selectedQuote?.author}
                    </h3>
 
                    <p className="text-lg italic leading-relaxed text-gray-800 dark:text-neutral-200 whitespace-pre-wrap break-words">
                        "{selectedQuote?.text}"
                    </p>
                    <div className="flex justify-between items-center mt-8">
                        {selectedQuote?.proposed_by && (
                            // "Proposée par" moved here, aligned to start (left)
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Proposée par: {selectedQuote.proposed_by}
                            </p>
                        )}
                        <Button
                            onClick={closeModal}
                            className="rounded-lg"
                        >
                            Fermer
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}