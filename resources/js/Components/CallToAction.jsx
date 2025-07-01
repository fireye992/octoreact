// resources/js/Components/CallToAction.jsx

import React from 'react';
import { Button } from '@/Components/ui/button'; // Importez le bouton Shadcn

export default function CallToAction({ title, button1Href, button1Text, button2Href, button2Text }) {
    return (
        <section>
            <div className="bg-gray-200 dark:bg-stone-700 relative rounded overflow-hidden py-12 px-8 md:p-[70px] z-10">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full lg:w-1/2 px-4">
                            <span className="font-bold text-amber-600">{title}</span>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="flex flex-wrap lg:justify-end">
                                {button1Href && (
                                    <Button asChild href={button1Href} className="w-full mb-3 mr-3 text-center lg:w-auto" target="_blank">
                                        {button1Text}
                                    </Button>
                                )}
                                {button2Href && (
                                    <Button asChild href={button2Href} className="w-full mb-3 mr-3 text-center lg:w-auto" target="_blank" variant="destructive">
                                        {button2Text}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="absolute top-0 left-0 z-[-1]">
                        <svg width="189" height="162" viewBox="0 0 189 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="16" cy="-16.5" rx="173" ry="178.5" transform="rotate(180 16 -16.5)" fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="-157" y1="-107.754" x2="98.5011" y2="-106.425" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="gray" stopOpacity="0.4" />
                                    <stop offset="1" stopColor="stone" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="absolute bottom-0 right-0 z-[-1]">
                        <svg width="191" height="208" viewBox="0 0 191 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="173" cy="178.5" rx="173" ry="178.5" fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="-3.27832e-05" y1="87.2457" x2="255.501" y2="88.5747" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.07" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    );
}