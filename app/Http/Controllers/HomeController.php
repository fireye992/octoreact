<?php

namespace App\Http\Controllers;
use App\Models\Video;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $navigationItems = [
            ['label' => 'A propos', 'href' => '#about'],
            ['label' => 'Médias', 'href' => '#tutos'],
            ['label' => 'Contact', 'href' => '#contact'],
        ];

        $latestVideos = Video::orderBy('created_at', 'desc')->take(5)->get(); // Limitez pour ne pas surcharger les props

        return Inertia::render('Home', [
            'navigationItems' => $navigationItems,
            'videoTutorials' => $latestVideos->toArray(),// Passez les vidéos à votre composant React Home
            // --- AJOUTS ICI POUR LE SEO/OPEN GRAPH ---
            'title' => 'Accueil - OcToPus Philosophe à tentacules',
            'description' => 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.',
            'keywords' => 'philosophie, séance de philosophie, Strasbourg, développement personnel, réflexion, intuition, accueil', // Ajoutez des mots-clés pertinents pour l'accueil
            'og_title' => 'OcToPus Philosophe : Séances, Réflexions et Vidéos',
            'og_description' => 'Le Philosophe à Tentacules vous accompagne dans l\'exploration de la réalité. Séances individuelles et de groupe à Strasbourg et en visio.',
            'og_image' => asset('/img/share-home.jpg'), // Créez une image de partage qui représente bien la page d'accueil AVEC les vidéos
            'og_type' => 'website',
            'og_image_width' => '1200',
            'og_image_height' => '630',
        ]);
    }
}