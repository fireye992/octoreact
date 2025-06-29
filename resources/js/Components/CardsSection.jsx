// src/Components/CardsSection.jsx ou un nom similaire

import React from 'react';
import VideoTutorialItem from '@/Components/VideoTutorialItem'; // Importez le composant de carte
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button'; // Assurez-vous que le composant Button est bien importé

export default function CardsSection({ videoTutorials }) {
    return (
        // La section principale avec les classes Tailwind
        <section id="tutos" className="pt-16 pb-16 bg-stone-100 dark:bg-stone-800 text-stone-900">
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                            <h2 className="mb-4 text-3xl font-bold text-stone-900 dark:text-gray-300">
                                Les médias à tentacules
                            </h2>
                            <p className="text-base text-body-color">
                                Il faut savoir s'arrêter
                            </p>
                        </div>
                    </div>
                </div>

                {/* La boucle pour afficher les cartes */}
                <div className="flex flex-wrap -mx-4">
                    {videoTutorials.map((video) => (
                        <VideoTutorialItem
                            key={video.video_id} // Clé unique pour chaque élément de la liste
                            videoId={video.video_id}
                            title={video.title}
                            description={video.description}
                        />
                    ))}
                </div>

                {/* Le bouton "Voir toutes les vidéos" */}
                <div className="flex justify-center">
                    <Button asChild className="rounded-lg">
                        <Link href="https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw" target="_blank">
                            Voir toutes les vidéos
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}