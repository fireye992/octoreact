<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [ // Utilise array_merge pour fusionner proprement
            'auth' => fn () => [ // Utilise une closure pour évaluer l'utilisateur à la demande
                'user' => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
                // Ajoute d'autres propriétés de l'utilisateur si nécessaire, par exemple 'is_admin'
                // 'is_admin' => $request->user() ? $request->user()->is_admin : false,
            ],
            // Si tu as d'autres props globales que tu veux partager, ajoute-les ici
            // Par exemple, les messages flash, les routes Ziggy, etc.
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'ziggy' => fn () => [
                ...(new \Tighten\Ziggy\Ziggy())->toArray(),
                'location' => $request->url(),
            ],
            // Si tu veux que canLogin/canRegister soient des props globales
            'canLogin' => fn () => \Route::has('login'),
            'canRegister' => fn () => \Route::has('register'),
        ]);
    }
}