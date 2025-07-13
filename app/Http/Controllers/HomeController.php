<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function __invoke()
    {
        $getAuthProps = function() {
            return [
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ];
        };

        $navigationItems = [
            ['label' => 'Accueil', 'href' => '#hero', 'is_anchor' => true],
            ['label' => 'A propos', 'href' => '#about', 'is_anchor' => true],
            ['label' => 'Médias', 'href' => '#tutos', 'is_anchor' => true],
            ['label' => 'Contact', 'href' => '#contact', 'is_anchor' => true],
        ];

        $callToActionProps = [
            'callToActionTitle' => 'RÉVÉLATEUR D’IDÉES, CHARMEUR DE PENSÉES, CATALYSEUR D’ESPRITS LIBRES',
            'button1Href' => 'https://form.jotform.com/fireye/octopus',
            'button1Text' => 'Prise de rendez-vous',
            'button2Href' => 'https://www.youtube.com/channel/UCCF2FQG9YT4vBkgsFZdnMZw',
            'button2Text' => 'Mes videos sur Youtube',
        ];

        // Charger TOUTES les vidéos dans une prop séparée
        $allVideos = Video::all()->toArray(); // Toutes les vidéos
        // Charger les vidéos pour l'affichage initial (limitées à 6)
        $initialVideos = Video::orderBy('created_at', 'desc')->take(3)->get()->toArray();

        $authProps = auth()->check() ? ['auth' => ['user' => auth()->user()]] : [];

        return Inertia::render('Home', array_merge(
            $getAuthProps(),
            $authProps,
            [
                'navigationItems' => $navigationItems,
                'laravelVersion' => Application::VERSION,
                'phpVersion' => PHP_VERSION,
                'videoTutorials' => $initialVideos, // Initialement, on envoie les 6 vidéos
                'allVideoTutorials' => $allVideos, // Toutes les vidéos pour l'expansion
                // --- AJOUTS ICI POUR LE SEO/OPEN GRAPH ---
                'title' => 'OcToPuS',
                'description' => 'Le Philosophe à Tentacules - Dialoguez et explorez la réalité pour une vie plus belle. Séances de philosophie en solo ou en groupe à Strasbourg ou en visio.',
                'keywords' => 'Philosophie, séance de philosophie, Thérapie, Psychologie, Philo, Psycho, Strasbourg, développement personnel, réflexion, accueil',
                'og_title' => 'OcToPuS Philosophe : Séances, Réflexions et Vidéos',
                'og_description' => 'Le Philosophe à Tentacules vous accompagne dans l\'exploration de la réalité. Séances individuelles et de groupe à Strasbourg et en visio.',
                'og_image' => asset('/img/share-home.jpg'),
                'og_type' => 'website',
                'og_image_width' => '1200',
                'og_image_height' => '630',
            ],
            $callToActionProps
        ));
    }
}
