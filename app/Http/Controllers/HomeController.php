<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Home', [
            'navigationItems' => $navigationItems,
        ]);
    }
}