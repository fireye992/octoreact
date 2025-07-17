// resources/js/Components/CardsSection.jsx

import React, { useState } from 'react'; // Import useState
import VideoTutorialItem from '@/Components/VideoTutorialItem';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

// The component now expects both videoTutorials (initial set) and allVideoTutorials (full set)
export default function CardsSection({ videoTutorials, allVideoTutorials, id }) {
    // State to control whether all videos are shown or only the initial set
    const [showAllVideos, setShowAllVideos] = useState(false);

    // Determine which list of videos to display based on the state
    // Use the limited videoTutorials by default, switch to allVideoTutorials if showAllVideos is true
    const videosToDisplay = showAllVideos ? allVideoTutorials : videoTutorials;

    // Check if there are no videos to display at all. This covers both initial and expanded states.
    if (!videosToDisplay || !Array.isArray(videosToDisplay) || videosToDisplay.length === 0) {
        return (
            <section id= {id} className="pt-16 pb-16 bg-zinc-400 dark:bg-stone-900">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                                <h2 className="mb-4 text-3xl font-bold text-neutral-700 dark:text-gray-300">
                                    Les médias à tentacules
                                </h2>
                                <p className="text-zinc-600 dark:text-stone-500 text-body-color">
                                    Il est nécessaire de s'arrêter! "Aristote"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-48">
                        <p className="text-xl text-neutral-600 dark:text-gray-400">
                            Aucune vidéo disponible pour le moment. Revenez bientôt !
                        </p>
                    </div>
                    {/* The YouTube button remains as a fallback if no videos are present */}
                    <div className="flex justify-center mt-8">
                        <Button asChild className="rounded-md">
                            <a href="https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw" 
                               rel="noopener noreferrer" 
                               target="_blank">
                                Voir notre chaîne YouTube
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
            <section id= {id} className="pt-16 pb-16 bg-zinc-400 dark:bg-stone-900">
                  <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="text-center mx-auto mb-[60px] max-w-[510px]">
                                <h2 className="mb-4 text-3xl font-bold text-neutral-700 dark:text-gray-300">
                                    Les médias à tentacules
                                </h2>
                                <p className="text-zinc-600 dark:text-stone-500 text-body-color">
                                    Il est nécessaire de s'arrêter! "Aristote"
                                </p>
                            </div>
                        </div>
                    </div>

                <div className="flex flex-wrap -mx-4">
                    {/* Map over videosToDisplay, which dynamically changes based on showAllVideos state */}
                    {videosToDisplay.map((video) => (
                        <VideoTutorialItem
                            key={video.video_id}
                            videoId={video.video_id}
                            title={video.title}
                            description={video.description}
                        />
                    ))}
                </div>

                {/* Show "See all videos" button only if there are more videos than initially displayed
                    AND if we are not already showing all videos */}
                {allVideoTutorials.length > videoTutorials.length && !showAllVideos && (
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={() => setShowAllVideos(true)} // Set state to true to display all videos
                            className="rounded-md"
                        >
                            Voir toutes les vidéos
                        </Button>
                    </div>
                )}

                {/* Show "Show less videos" button only if all videos are currently displayed */}
                {showAllVideos && (
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={() => setShowAllVideos(false)} // Set state to false to show initial videos
                            className="rounded-md"
                        >
                            Moins de vidéos
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}