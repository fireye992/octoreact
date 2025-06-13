<?php

namespace App\View\Components\Home;

use Illuminate\Support\Arr;
use Illuminate\View\Component;
use function url;
use function view;

class Portfolio extends Component
{
    public array $items = [];

    public array $tabs = [];

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->items = [
            [
                'category' => ['Compétition'],
                'title' => ' Muay thai, k-1 & MMA ',
                'image' => url('/img/Ivan.webp'),
                'github' => 'https://muaythai67.fr/competition'
            ],
            [
                'category' => ['Muay thai loisir', 'Kick-boxing loisir'],
                'title' => 'Pour bien démarer.',
                'image' => url('/img/new-tof/dreamteam.webp'),
                'github' => 'https://muaythai67.fr'
            ],
/*             [
                'category' => ['Remise en forme'],
                'title' => 'Quand le combat continue au sol.',
                'image' => url('/img/MMA-MD.webp'),
                'github' => 'https://muaythai67.fr'
            ], */
            [
                'category' => ['Musculation', 'Fitness'],
                'title' => "Pour la forme et les formes.",
                'image' => url('/img/new-tof/sac-ret.webp'),
                'github' => 'https://www.superprof.fr/coach-sportif-preparateur-physique-diplome-remets-forme-methodes-boxe-pied-poing-adaptees-vraie.html'
            ],

        ];

        $this->tabs = array_unique(Arr::flatten(Arr::pluck($this->items, 'category')));
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.home.portfolio');
    }
}
