<?php

namespace App\View\Components\Home;

use Illuminate\View\Component;

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
        $this->videoTutorials = [
            [
                'videoId' => 'IyCAROmExM4',
                'title' => 'L\'intelligence tentaculaire',
                'description' => 'Ulysse: l’homme qui brillait par sa souplesse.
                                  Celui qui arrive à saisir l’instant tout en créant du changement 🦑'
            ],
            [
                'videoId' => 'gHsUHUcCRCw',
                'title' => 'Ulysse, maître du jeu en toutes circonstances',
                'description' => 'Ulysse: l’homme des instants et des changements'
            ],
            [
                'videoId' => '7I7mX9jxYCw',
                'title' => 'Ulysse : la sagesse héroïque 🏹',
                'description' => 'La sagesse d’Ulysse ou l’art de saisir chaque occasion comme la possibilité de faire triompher la liberté.'
            ],
            [
                'videoId' => '2QphWO2xes8',
                'title' => 'Les sensations : voie d’accès à la vérité ou illusions trompeuses ? ✨',
                'description' => 'Comment admettre que les informations transmises par nos sens ne sont que des illusions qui se contredisent entre elles, et donc douter de tout jusqu’à l’existence de notre propre corps, sans tomber dans la folie ? Descartes, un vrai farceur ou un simple moqueur ?'
            ],
            // [
            //     'videoId' => 'bFoWhGJPP8A',
            //     'title' => 'Session paos ordinnaire',
            //     'description' => 'Reda et Bjorn n\'ont jamais refusé un combat!'
            // ],
            // [
            //     'videoId' => 'FMB-Z46i6MM',
            //     'title' => 'Differences Muay Thai & Kick Boxing',
            //     'description' => 'Au dela des coups de coudes et des saisies de jambes, il y a beaucoup de choses qui different entre ces deux sports de combat.'
            // ],
            // [
            //     'videoId' => 'AX9z21e3C3U',
            //     'title' => 'Premier combat de Kevin en Thailande',
            //     'description' => 'Le premier combat de Kevin au Bangla boxing stadium pour le paper street et Chang gym'
            // ],


        ];
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
