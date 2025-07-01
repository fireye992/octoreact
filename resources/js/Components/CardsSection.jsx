// resources/js/Components/CardsSection.jsx

import React from 'react';
import VideoTutorialItem from '@/Components/VideoTutorialItem';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function CardsSection({ videoTutorials }) {
    // Ajout d'une vérification pour s'assurer que videoTutorials est un tableau et n'est pas undefined/null
    if (!videoTutorials || !Array.isArray(videoTutorials) || videoTutorials.length === 0) {
        return (
            <section id="tutos" className="pt-16 pb-16 bg-gray-300 dark:bg-stone-800">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                                <h2 className="mb-4 text-3xl font-bold text-stone-900 dark:text-gray-300">
                                    Les médias à tentacules
                                </h2>
                                <p className="text-gray-400 dark:text-stone-500 text-body-color">
                                    Il est nécessaire de s'arrêter! "Aristote"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-48">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Aucune vidéo disponible pour le moment. Revenez bientôt !
                        </p>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Button asChild className="rounded-lg">
                            <Link href="https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw" target="_blank">
                                Voir notre chaîne YouTube
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="tutos" className="pt-16 pb-16 bg-gray-300 dark:bg-stone-800">
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                            <h2 className="mb-4 text-3xl font-bold text-stone-900 dark:text-gray-300">
                                Les médias à tentacules
                            </h2>
                            <p className="text-gray-400 dark:text-stone-500 text-body-color">
                                Il est nécessaire de s'arrêter! "Aristote"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                    {videoTutorials.map((video) => (
                        <VideoTutorialItem
                            key={video.video_id}
                            videoId={video.video_id}
                            title={video.title}
                            description={video.description}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-8">
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