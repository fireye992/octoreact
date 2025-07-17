import React, { useEffect, useRef } from 'react';
import ButtonLink from '@/Components/ButtonLink';
import SocialIcons from '@/Components/SocialIcons';
import { Button } from '@/Components/ui/button';
import heroBg from "/img/octo2/oct.webp";

export default function Hero({id}) {
    // useRef pour stocker l'ID de l'intervalle et le rendre persistant entre les rendus,
    // permettant de le nettoyer correctement.
    const checkGapiIntervalRef = useRef(null);

    // Le useEffect s'exécute une fois au montage du composant.
    useEffect(() => {
        const loadAndRenderYouTubeButton = () => {
            // Si window.gapi n'est pas encore défini ou ne contient pas la méthode .load,
            // cela signifie que platform.js n'a pas encore fini de charger.
            if (typeof window.gapi === 'undefined' || typeof window.gapi.load !== 'function') {
                // Si l'intervalle n'est pas déjà en cours, on le démarre pour vérifier régulièrement.
                if (checkGapiIntervalRef.current === null) {
                    // console.warn("gapi not found, setting up interval to check..."); // Pour le debug si besoin
                    checkGapiIntervalRef.current = setInterval(() => {
                        loadAndRenderYouTubeButton(); // Tente à nouveau de charger/rendre le bouton
                    }, 200); // Vérifie toutes les 200ms
                }
                return; // Sort de la fonction si gapi n'est pas prêt, l'intervalle rappellera la fonction.
            }

            // Si gapi est maintenant disponible, on nettoie l'intervalle s'il était actif.
            if (checkGapiIntervalRef.current !== null) {
                clearInterval(checkGapiIntervalRef.current);
                checkGapiIntervalRef.current = null;
            }

            // Charge le module spécifique 'client:ytsubscribe' de l'API Google.
            window.gapi.load('client:ytsubscribe', () => {
                const buttonContainer = document.querySelector('.g-ytsubscribe');

                // Si le conteneur du bouton est trouvé, on le rend.
                if (buttonContainer) {
                    window.gapi.ytsubscribe.render(buttonContainer, {
                        'channelid': 'UCCF2FQG9YT4vBkgsFZdnMZw',
                        'layout': 'default',
                        'count': 'default'
                    });
                }
                // Pas besoin de 'else' ici, si le conteneur n'existe pas, on ne fait rien.
            });
        };

        // Détermine le moment initial pour tenter de charger et rendre le bouton.
        // Utilise 'interactive' ou 'complete' pour s'assurer que le DOM est suffisamment prêt.
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            loadAndRenderYouTubeButton();
        } else {
            // Si le DOM n'est pas encore prêt, on ajoute un écouteur pour l'événement 'load'.
            window.addEventListener('load', loadAndRenderYouTubeButton);
        }

        // Fonction de nettoyage pour useEffect, exécutée au démontage du composant.
        return () => {
            // Supprime l'écouteur d'événements pour éviter les fuites de mémoire.
            window.removeEventListener('load', loadAndRenderYouTubeButton);
            // Nettoie l'intervalle si jamais il était encore actif.
            if (checkGapiIntervalRef.current !== null) {
                clearInterval(checkGapiIntervalRef.current);
                checkGapiIntervalRef.current = null;
            }
        };
    }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une fois au montage.

    return (
        <section
            id={id}
            className="relative pt-[140px] lg:pt-[160px] pb-[110px] hero-bg"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 21%',
                minHeight: '25vh',
            }}
        >
            <div className="absolute inset-0 z-[1] transition-colors duration-500 bg-white/10 dark:bg-black/40"></div>
            {/* Le bouton YouTube est positionné ici, en dehors du flux principal du texte */}
            <div className="absolute top-20 right-8 z-20">
                <div
                    className="g-ytsubscribe"
                    data-channelid="UCCF2FQG9YT4vBkgsFZdnMZw"
                    data-layout="default"
                    data-count="default"
                ></div>
            </div>
            <div className="overlay"></div>
            <div className="container relative z-10 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    {/* C'est ICI que nous allons ajuster le padding */}
                    <div className="w-full px-4 p-3 lg:w-5/12 lg:p-12"> {/* AJOUT de lg:p-12 ici */}
                        <div className="hero-content">
                            <h1 className="text-stone-50 dark:text-stone-200 font-bold text-4xl sm:text-[42px] lg:text-[40px] xl:text-[42px] leading-snug mb-6">
                                Le philosophe à tentacules.
                            </h1>
                            <p className="text-base mb-8 max-w-[520px] text-white">
                                (Re)créer nos vies grâce à la philosophie
                                <br />
                                Explorer le monde pour le (ré)habiter 🎳
                            </p>
                            <ul className="flex flex-wrap items-center">
                                <li>
                                    <Button asChild variant="default" className="rounded-md">
                                        <a href="https://form.jotform.com/fireye/octopus" target="_blank" rel="noopener noreferrer">
                                            Prévoyez un rendez-vous
                                        </a>
                                    </Button>
                                </li>
                            </ul>
                            <div className="pt-16 clients">
                                <h6 className="flex items-center mb-4 text-xs font-normal text-body-color text-secondary dark:text-gray-400">
                                    Suivez-le sur les réseaux
                                    <span className="w-8 h-[1px] bg-body-color inline-block ml-2"></span>
                                </h6>
                                <SocialIcons />
                            </div>
                        </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-1/12"></div>
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="lg:text-right lg:ml-auto sm:flex justify-end me-12">
                            <div className="relative z-10 inline-block pt-11">
                                <img src="/img/octo2/ly-yo2.webp" alt="Emilie" className="opacity-60 dark:opacity-40 max-w-full lg:ml-auto" />
                                <span className="absolute -left-4 -bottom-2 z-[-1] text-amber-600">
                                    <svg width="93" height="93" viewBox="0 0 93 93" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2.5" cy="2.5" r="2.5" />
                                        <circle cx="2.5" cy="24.5" r="2.5" />
                                        <circle cx="2.5" cy="46.5" r="2.5" />
                                        <circle cx="2.5" cy="68.5" r="2.5" />
                                        <circle cx="2.5" cy="90.5" r="2.5" />
                                        <circle cx="24.5" cy="2.5" r="2.5" />
                                        <circle cx="24.5" cy="24.5" r="2.5" />
                                        <circle cx="24.5" cy="46.5" r="2.5" />
                                        <circle cx="24.5" cy="68.5" r="2.5" />
                                        <circle cx="24.5" cy="90.5" r="2.5" />
                                        <circle cx="46.5" cy="2.5" r="2.5" />
                                        <circle cx="46.5" cy="24.5" r="2.5" />
                                        <circle cx="46.5" cy="46.5" r="2.5" />
                                        <circle cx="46.5" cy="68.5" r="2.5" />
                                        <circle cx="46.5" cy="90.5" r="2.5" />
                                        <circle cx="68.5" cy="2.5" r="2.5" />
                                        <circle cx="68.5" cy="24.5" r="2.5" />
                                        <circle cx="68.5" cy="46.5" r="2.5" />
                                        <circle cx="68.5" cy="68.5" r="2.5" />
                                        <circle cx="68.5" cy="90.5" r="2.5" />
                                        <circle cx="90.5" cy="2.5" r="2.5" />
                                        <circle cx="90.5" cy="24.5" r="2.5" />
                                        <circle cx="90.5" cy="46.5" r="2.5" />
                                        <circle cx="90.5" cy="68.5" r="2.5" />
                                        <circle cx="90.5" cy="90.5" r="2.5" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}