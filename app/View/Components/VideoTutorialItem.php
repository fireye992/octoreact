<?php

namespace App\View\Components; // Vérifie bien ce namespace, ça pourrait être App\View\Components\Home si tu l'as mis dans un sous-dossier

use Illuminate\View\Component;

class VideoTutorialItem extends Component
{
    public string $video_id; // Propriété : $video_id (snake_case)
    public string $title;
    public string $description;

    /**
     * Crée une nouvelle instance de composant.
     */
    public function __construct(string $videoId, string $title, string $description)
    {
        // Assigne la valeur du paramètre $videoId (camelCase) à la propriété $this->video_id (snake_case)
        $this->video_id = $videoId;
        $this->title = $title;
        $this->description = $description;
    }

    /**
     * Obtenir la vue / le contenu qui représente le composant.
     */
    public function render()
    {
        return view('components.video-tutorial-item');
    }
}