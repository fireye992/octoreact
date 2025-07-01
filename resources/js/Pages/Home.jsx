// resources/js/Pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Home/Hero';
import Experience from '@/Components/Home/Experience';
import About from '@/Components/Home/About';
// import VideoTutorials from '@/Components/Home/VideoTutorials'; // Ce composant semble être remplacé par CardsSection, on peut le commenter ou le supprimer
import ContactForm from '@/Components/ContactForm';
import CallToAction from '@/Components/CallToAction'; // Chemin corrigé ici
import CardsSection from '@/Components/CardsSection';

export default function Home({
    auth,
    navigationItems,
    canLogin,
    canRegister,
    videoTutorials, // <-- On garde cette prop car votre code original la gère
    callToActionTitle,
    button1Href,
    button1Text,
    button2Href,
    button2Text,
    // latestVideos, // <-- Cette prop n'est plus nécessaire si le contrôleur envoie 'videoTutorials'
    // Props SEO passées par le contrôleur
    title,
    description,
    keywords,
    og_title,
    og_description,
    og_image,
    og_type,
    og_image_width,
    og_image_height,
}) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <MainLayout
            user={auth.user}
            navigationItems={navigationItems}
            canLogin={canLogin}
            canRegister={canRegister}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            title={title} // Passe le titre dynamique au MainLayout
        >
            {/* Balises <Head> pour le SEO */}
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={og_title} />
                <meta property="og:description" content={og_description} />
                <meta property="og:type" content={og_type} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={og_image} />
                <meta property="og:image:width" content={og_image_width} />
                <meta property="og:image:height" content={og_image_height} />
                <meta name="twitter:card" content="summary_large_image" />

                {/* JSON-LD pour les vidéos - Utilise 'videoTutorials' */}
                {videoTutorials && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": title,
                            "description": description,
                            "url": window.location.href,
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": window.location.href
                            },
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "/search?q={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            },
                            "video": videoTutorials.map(video => ({ // Utilise videoTutorials ici
                                "@type": "VideoObject",
                                "name": video.title,
                                "description": video.description,
                                "uploadDate": new Date(video.created_at).toISOString().split('T')[0],
                                "thumbnailUrl": `https://img.youtube.com/vi/$${video.video_id}/maxresdefault.jpg`,
                                "embedUrl": `https://img.youtube.com/vi/$${video.video_id}`,
                                "interactionStatistic": {
                                    "@type": "InteractionCounter",
                                    "interactionType": "https://schema.org/WatchAction",
                                    "userInteractionCount": 0
                                },
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "OcToPus Philosophe",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": `${window.location.origin}/img/octo/logo-8phy.png`
                                    }
                                }
                            }))
                        })}
                    </script>
                )}
            </Head>

            <Hero />
            {/* <Experience /> */}
            <CallToAction
                title={callToActionTitle}
                button1Href={button1Href}
                button1Text={button1Text}
                button2Href={button2Href}
                button2Text={button2Text}
            />
            <About />

            {/* Utilise le composant CardsSection avec la prop videoTutorials */}
            <CardsSection videoTutorials={videoTutorials} />

            {/* Utilisation du composant ContactForm avec la prop isDarkMode */}
            <ContactForm isDarkMode={isDarkMode} />

        </MainLayout>
    );
}