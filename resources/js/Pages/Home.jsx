// resources/js/Pages/Home.jsx

import React, { useState, useEffect } from 'react'; // Imports React et hooks
import { Head } from '@inertiajs/react'; // Import Head d'Inertia
import MainLayout from '@/Layouts/MainLayout'; // Import du MainLayout
import Hero from '@/Components/Home/Hero';
import Experience from '@/Components/Home/Experience';
import About from '@/Components/Home/About';
import VideoTutorials from '@/Components/Home/VideoTutorials';
import ContactForm from '@/Components/ContactForm'; // Import du composant de contact
import CallToAction from '@/Components/CallToAction'; 
import CardsSection from '@/Components/CardsSection';

export default function Home({ auth, navigationItems, canLogin, canRegister, videoTutorials, callToActionTitle, button1Href, button1Text, button2Href, button2Text }) {
    // État pour gérer le mode sombre
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Synchronise l'état isDarkMode avec la classe 'dark' du <html>
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Fonction pour basculer le mode sombre
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <MainLayout 
            user={auth.user}
            navigationItems={navigationItems}
            canLogin={canLogin}
            canRegister={canRegister}
            isDarkMode={isDarkMode} // Passez la prop isDarkMode au MainLayout
            toggleDarkMode={toggleDarkMode} // Passez la fonction toggleDarkMode au MainLayout
            title="Welcome" // Le titre pour la page
        > 
            <Head title="Welcome" />
            
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
            
            {/* Utilisez le composant CardsSection avec les données */}
            <CardsSection videoTutorials={videoTutorials} />
            
            {/* Utilisation du composant ContactForm avec la prop isDarkMode */}
            <ContactForm isDarkMode={isDarkMode} /> 
            
        </MainLayout>
    );
}
