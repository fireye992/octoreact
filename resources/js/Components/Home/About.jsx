// resources/js/Components/Home/About.jsx

import React from 'react';
import AboutDots from '@/Components/AboutDots'; // On va créer ce composant après
import ButtonLink from '@/Components/ButtonLink'; // Supposons que vous ayez un composant ButtonLink

export default function About({id}) {
    return (
        <section id={id} className="py-16 bg-gradient-to-br from-gray-100 to-zinc-400
                                     dark:bg-gradient-to-br dark:from-stone-700 dark:to-stone-900
                                     dark:text-gray-100 
                                     transition-colors duration-500">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between -mx-4">
                    {/* Colonne de gauche avec les images */}
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="flex items-center -mx-3 sm:-mx-4">
                            <div className="w-full px-3 xl:w-1/2 sm:px-4">
                                <div className="py-3 sm:py-4">
                                    {/* Remplacez {{ url(...) }} par un chemin d'image statique ou un import */}
                                    <img
                                     src="img/octo2/WhatsApp-Image-1.webp" 
                                     alt="Image 1" 
                                     className="w-full rounded-2xl" 
                                     loading="lazy"/>
                                </div>
                                <div className="py-3 sm:py-4">
                                    <img
                                     src="/img/octo2/WhatsApp-Image-2.webp" 
                                     alt="Image 2" 
                                     className="w-full rounded-2xl" 
                                     loading="lazy"/>
                                </div>
                            </div>
                            <div className="w-full px-3 xl:w-1/2 sm:px-4">
                                <div className="relative z-10 my-4">
                                    <img
                                     src="/img/octo2/WhatsApp-Image-3.webp" 
                                     alt="Image 3" 
                                     className="w-full rounded-2xl" 
                                     loading="lazy"/>
                                    {/* Remplacer le composant Blade par son équivalent React */}
                                    <AboutDots />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Colonne de droite avec le texte */}
                    <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                        <div className="mt-10 lg:mt-0">
                            <span className="block mb-2 text-lg font-semibold text-primary">
                                <blockquote className="px-3 py-2 text-sm italic text-amber-700 border-l-4 border-amber-500">
                                    LE PHILOSOPHE À TENTACULES 🦑.
                                </blockquote>
                            </span>
                            <h2 className="mb-8 text-xl font-bold sm:text-2xl dark:text-gray-400">
                                Qui suis-je
                            </h2>
                            <div className="mb-8 text-base dark:text-gray-400">
                                <p>
                                    Le concept:<br/>
                                    dialoguer, même avec tes représentations cachées<br/>
                                    explorer la réalité<br/>
                                    manipuler nos concepts<br/>
                                    sans règles du jeu
                                </p>
                                <br/> 
                                <p>
                                    «C’est à l’intérieur même de la vie que nous conduit l’intuition.»<br/>
                                    <small> Henry Bergson </small>
                                </p>
                                <br/> 
                                <p>
                                    Pourquoi:<br/>
                                    La philosophie : un questionnement éternel pour une vie plus belle<br/>
                                    un cadre qui nous apprend à en sortir
                                </p>
                                <br/> 
                                <p>
                                    (re)travailler la souplesse de ta pensée<br/>
                                    (ré)inventer le possible<br/>
                                    réer pour te (trans)former<br/>
                                    (re)trouver ton élan vital
                                </p>
                                <br/> 
                                <p>
                                    Pour un résultat tentaculaire
                                </p>
                                <br/>
                                <p>
                                    « le génie réside dans l’instinct. » <br />
                                    <small>Nietzsche.</small>
                                </p>
                                <br/> 
                                <p>
                                    Les séances en solo:<br/>
                                    T’ES SOLO COMME ROUSSEAU<br/>
                                    Octopus , un espace dans lequel<br/>
                                    philosopher et boire un café,<br/>
                                    philosopher et créer des objets<br/>
                                    ou philosopher et boxer/te défouler
                                </p>
                                <br/> 
                                <p>
                                    Que tu veuilles enlacer un sujet en particulier<br/>
                                    Ou te laisser porter pour arrêter de tout contrôler
                                </p>
                                <br/> 
                                <p>
                                    En gardant une trace (parce que l’oubli, ça asservi)<br/>
                                    Ou pour que ça passe :
                                </p>
                                <br/> 
                                <p>
                                    CACHETTE 21-23<br />
                                    RUE STE MADELEINE, STRASBOURG <br />
                                    OU SANS BOUGER DE LA TIENNE (visio-philo) <br />
                                </p>
                            </div>
                            {/* Remplacer le composant Blade par son équivalent React */}
                            <ButtonLink href="https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw" variant="destructive" target="_blank">
                                Ma chaine you-tube
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}