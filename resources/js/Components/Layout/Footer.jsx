// resources/js/Components/Layout/Footer.jsx

import React from 'react';
import SocialIcons from '@/Components/SocialIcons'; // Importez le nouveau composant SocialIcons

export default function Footer({ isDarkMode }) {
    return (
        <footer className={`relative z-10 py-8 ${isDarkMode ? 'bg-stone-800 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center flex-wrap">
                    <span className="inline-flex items-center text-xl text-gray-800 dark:text-gray-300">
                        Suivez le poulpe sur les réseaux sociaux
                    </span>
                    {/* Utilisez le composant SocialIcons */}
                    <SocialIcons className="mb-0" /> {/* Passez className pour d'éventuels styles */}
                </div>

                <div className="mt-4 text-center">
                    <span className="absolute left-0 bottom-0 z-[-1]">
                        <svg
                            width="217"
                            height="229"
                            viewBox="0 0 217 229"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
                                fill="url(#paint0_linear_1179_5)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1179_5"
                                    x1="76.5"
                                    y1="281"
                                    x2="76.5"
                                    y2="1.22829e-05"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#FF7F50" stopOpacity="0.33" />
                                    <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="absolute top-0 right-10 z-[-1]">
                        <svg
                            width="75"
                            height="75"
                            viewBox="0 0 75 75"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
                                fill="url(#paint0_linear_1179_4)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_1179_4"
                                    x1="-1.63917e-06"
                                    y1="37.5"
                                    x2="75"
                                    y2="37.5"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#AAA333" stopOpacity="0.31" />
                                    <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <small className="text-sm text-slate-400">
                        &copy;2025 Made with <span style={{ color: 'red' }}>♥</span> by{' '}
                        <a href="https://www.linkedin.com/in/eric-colotte-3ab159112/" className="text-amber-500 font-bold" target="_blank" rel="noopener noreferrer">
                            Fenrir992
                        </a>
                    </small>
                </div>
            </div>
        </footer>
    );
}
