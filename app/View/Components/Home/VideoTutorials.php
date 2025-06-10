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
                'title' => 'L\'intelligence tenataculaire',
                'description' => 'Ulysse: l’homme qui brillait par sa souplesse 
                                  Celui qui arrive à saisir l’instant tout en créant du changement 🦑'
            ],
            // [
            //     'videoId' => 'Vfw--fBs5h0',
            //     'title' => 'Rentrer en corps à corps avec un coup de pied',
            //     'description' => 'Cours muay Thai intermediaire: Rentrer en corps à corps pour placer des genoux et éviter les coudes grace à un coup de pied.'
            // ],
            // [
            //     'videoId' => '2g_4gaUbViI',
            //     'title' => 'Low kick push & sweep',
            //     'description' => 'Exercice Muay Thai de la semaine, avec Quentin et Reda.'
            // ],
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
