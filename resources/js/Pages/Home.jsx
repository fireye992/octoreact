// resources/js/Pages/Home.jsx

import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Home/Hero';
import About from '@/Components/Home/About';
import ContactForm from '@/Components/ContactForm';
import CallToAction from '@/Components/CallToAction';
import CardsSection from '@/Components/CardsSection';
import QuotesSection from '@/Components/Home/QuotesSection'; // <-- AJOUTÉ : Import du composant QuotesSection
import { mainNavigationItems, getUserMenuItems } from '@/Config/navigation'

export default function Home({
    auth,
    canLogin,
    canRegister,
    videoTutorials,
    allVideoTutorials,
    callToActionTitle,
    button1Href,
    button1Text,
    button2Href,
    button2Text,
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
    // Props pour les messages de formulaire
    successMessage,
    errorMessage,
    errors,
    quotes,
}) {
    const pageNavigationItems = mainNavigationItems;
    const pageUserMenuItems = getUserMenuItems(auth, window.location.href);

    return (
        <MainLayout
            user={auth.user}
            navigationItems={pageNavigationItems}
            userMenuItems={pageUserMenuItems}
            canLogin={canLogin}
            canRegister={canRegister}
            title={title}
        >
            {/* Balises <Head> pour le SEO */}
            <Head>
                <meta property="og:title" content={og_title} />
                <meta property="og:description" content={og_description} />
                <meta property="og:type" content={og_type} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={og_image} />
                <meta property="og:image:width" content={og_image_width} />
                <meta property="og:image:height" content={og_image_height} />
                <meta name="twitter:card" content="summary_large_image" />

                {/* JSON-LD pour les vidéos */}
                {videoTutorials && videoTutorials.length > 0 && (
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
                            "video": videoTutorials.map(video => ({
                                "@type": "VideoObject",
                                "name": video.title,
                                "description": video.description,
                                "uploadDate": new Date(video.created_at).toISOString().split('T')[0],
                                // URLs CORRIGÉES ICI pour les miniatures et les embeds YouTube
                                "thumbnailUrl": `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`, // <-- CORRECTION ICI
                                "embedUrl": `https://www.youtube.com/embed/${video.video_id}`, // <-- CORRECTION ICI
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

            {/* Composants de la page d'accueil avec leurs IDs pour les liens ancre */}
            <Hero id="hero" />
            <CallToAction
                title={callToActionTitle}
                button1Href={button1Href}
                button1Text={button1Text}
                button2Href={button2Href}
                button2Text={button2Text}
            />
            <About id="about" />
            <CardsSection
                id="tutos"
                videoTutorials={videoTutorials}
                allVideoTutorials={allVideoTutorials}
            />
            <QuotesSection id="quotes" quotes={quotes} />
            <ContactForm
                id="contact"
                initialSuccessMessage={successMessage}
                initialErrorMessage={errorMessage}
                initialErrors={errors}
            />

        </MainLayout>
    );
}