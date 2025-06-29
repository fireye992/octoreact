// resources/js/Components/Home/Hero.jsx

import React from 'react';
import ButtonLink from '@/Components/ButtonLink'; // Assuming you have a ButtonLink
import SocialIcons from '@/Components/SocialIcons'; // Assuming you have a SocialIcons component
import { Button } from '@/Components/ui/button'; // The Shadcn Button component
import heroBg from "/img/octo/oct.jpg";
export default function Hero() {
    // We can use props later if needed, for now we keep the text hardcoded
    return (
     <section
            className="relative pt-[140px] lg:pt-[160px] pb-[110px] hero-bg dark:dark-hero-bg"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                // --- MISE À JOUR ICI ---
                backgroundPosition: 'center 21%', // Le centrage horizontal et le positionnement vertical
                minHeight: '25vh',                // La hauteur minimale de la section
            }}
            >
                 <div className="absolute inset-0 z-[1] transition-colors duration-500 dark:bg-black/50"></div>
            <div className="overlay"></div>
            <div className="container relative z-10 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4 lg:w-5/12">
                        <div className="hero-content">
                            <h1
                                className="text-stone-50 dark:text-stone-200 font-bold text-4xl sm:text-[42px] lg:text-[40px] xl:text-[42px] leading-snug mb-6">
                                <a className="rounded-md text-amber-600" href="https://www.instagram.com/octopus_le_philosophe/"
                                    target="_blank">OcToPuS</a>
                                <br />
                                Le philosophe à tentacules.
                            </h1>
                            <p className="text-base mb-8 max-w-[520px] text-white"> {/* Added text-white for visibility */}
                                (Re)créer nos vies grâce à la philosophie
                                <br />
                                Explorer le monde pour le (ré)habiter 🎳
                            </p>
                            <ul className="flex flex-wrap items-center">
                                <li>
                                    {/* Using Shadcn's Button as a link, just like we did with ButtonLink */}
                                    <Button asChild variant="default" className="rounded-lg">
                                        <a href="https://form.jotform.com/221463184068355" target="_blank" rel="noopener noreferrer">
                                            Programmez un coaching
                                        </a>
                                    </Button>
                                </li>
                            </ul>
                            <div className="pt-16 clients">
                                <h6 className="flex items-center mb-4 text-xs font-normal text-body-color dark:text-gray-300">
                                    Suivez-le sur les réseaux
                                    <span className="w-8 h-[1px] bg-body-color inline-block ml-2"></span>
                                </h6>
                                <SocialIcons /> {/* Assuming SocialIcons is a React component */}
                            </div>
                        </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-1/12"></div>
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="lg:text-right lg:ml-auto">
                            <div className="relative z-10 inline-block pt-11 lg:pt-0">
                                <img src="/img/octo/ly2.gif" alt="hero" className="max-w-full lg:ml-auto dark-mode-image" />
                                <span className="absolute -left-8 -bottom-8 z-[-1] text-amber-600">
                                    <svg width="93" height="93" viewBox="0 0 93 93" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        {/* Your SVG here - I'll assume you'll replace fill="none" with fill="currentColor" */}
                                        <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor"/>
                                        <circle cx="2.5" cy="24.5" r="2.5" fill="currentColor"/>
                                        <circle cx="2.5" cy="46.5" r="2.5" fill="currentColor"/>
                                        <circle cx="2.5" cy="68.5" r="2.5" fill="currentColor"/>
                                        <circle cx="2.5" cy="90.5" r="2.5" fill="currentColor"/>
                                        <circle cx="24.5" cy="2.5" r="2.5" fill="currentColor"/>
                                        <circle cx="24.5" cy="24.5" r="2.5" fill="currentColor"/>
                                        <circle cx="24.5" cy="46.5" r="2.5" fill="currentColor"/>
                                        <circle cx="24.5" cy="68.5" r="2.5" fill="currentColor"/>
                                        <circle cx="24.5" cy="90.5" r="2.5" fill="currentColor"/>
                                        <circle cx="46.5" cy="2.5" r="2.5" fill="currentColor"/>
                                        <circle cx="46.5" cy="24.5" r="2.5" fill="currentColor"/>
                                        <circle cx="46.5" cy="46.5" r="2.5" fill="currentColor"/>
                                        <circle cx="46.5" cy="68.5" r="2.5" fill="currentColor"/>
                                        <circle cx="46.5" cy="90.5" r="2.5" fill="currentColor"/>
                                        <circle cx="68.5" cy="2.5" r="2.5" fill="currentColor"/>
                                        <circle cx="68.5" cy="24.5" r="2.5" fill="currentColor"/>
                                        <circle cx="68.5" cy="46.5" r="2.5" fill="currentColor"/>
                                        <circle cx="68.5" cy="68.5" r="2.5" fill="currentColor"/>
                                        <circle cx="68.5" cy="90.5" r="2.5" fill="currentColor"/>
                                        <circle cx="90.5" cy="2.5" r="2.5" fill="currentColor"/>
                                        <circle cx="90.5" cy="24.5" r="2.5" fill="currentColor"/>
                                        <circle cx="90.5" cy="46.5" r="2.5" fill="currentColor"/>
                                        <circle cx="90.5" cy="68.5" r="2.5" fill="currentColor"/>
                                        <circle cx="90.5" cy="90.5" r="2.5" fill="currentColor"/>
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