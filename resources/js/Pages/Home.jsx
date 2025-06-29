// resources/js/Pages/Home.jsx

import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout'; // Use the correct MainLayout
import React from 'react';
import Hero from '@/Components/Home/Hero';
import Experience from '@/Components/Home/Experience';
import About from '@/Components/Home/About';
// You were importing VideoTutorials and CardsSection, which might be the same thing.
// Let's assume CardsSection is the one you want.
import VideoTutorials from '@/Components/Home/VideoTutorials'; // Keep this import if you still need the component
import Contact from '@/Components/Home/Contact';
import CallToAction from '@/Components/CallToAction'; 
import CardsSection from '@/Components/CardsSection'; // <-- Let's re-verify this path

export default function Home({ auth, navigationItems, canLogin, canRegister, videoTutorials, callToActionTitle, button1Href, button1Text, button2Href, button2Text }) {
    return (
        <MainLayout 
            user={auth.user}
            navigationItems={navigationItems}
            canLogin={canLogin}
            canRegister={canRegister}
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
            
            {/* Use the CardsSection component with the data */}
            <CardsSection videoTutorials={videoTutorials} />
            
            {/* You had a VideoTutorials component here. You might want to replace it with CardsSection. */}
            {/* <VideoTutorials /> */}
            
            <Contact />
        </MainLayout>
    );
}