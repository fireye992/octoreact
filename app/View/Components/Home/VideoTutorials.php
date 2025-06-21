<?php

namespace App\View\Components\Home;

use Illuminate\View\Component;
use App\Models\Video; // N'oublie pas d'importer ton modèle Video

class VideoTutorials extends Component
{
    public array $videoTutorials = [];

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Récupérer toutes les vidéos de la base de données
        $this->videoTutorials = Video::all()->toArray();
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.home.video-tutorials');
    }
}