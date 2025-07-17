<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Route; // Importe la façade Route pour Route::has

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
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): string|null
    {
        // Cette méthode gère la mise en cache des assets côté client.
        // Inertia utilise par défaut le timestamp de la dernière modification du fichier mix-manifest.json
        // ou des fichiers Vite si vous utilisez Vite.
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default to all Inertia responses.
     * These props are available in your frontend React components via `usePage().props`.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // Partage les informations de l'utilisateur authentifié.
            // La closure assure que les données ne sont récupérées que si nécessaire (lazy loading).
            'auth' => fn () => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    // Ajoutez 'is_admin' ici si vous avez cette propriété sur votre modèle User
                    // et que vous souhaitez l'utiliser globalement dans votre frontend.
                    'is_admin' => $request->user()->is_admin ?? false,
                ] : null,
            ],

            // Partage les messages flash de la session.
            // Utile pour afficher des notifications (succès, erreur, info) après une redirection.
            'flash' => [
                // 'message' est un nom générique, 'success' et 'error' sont plus spécifiques.
                // Vous pouvez garder 'message' si vous l'utilisez pour des notifications non-spécifiques.
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],

            // Partage les routes définies par Ziggy, permettant d'utiliser `route()` dans le frontend.
            'ziggy' => fn () => [
                ...(new \Tighten\Ziggy\Ziggy())->toArray(),
                // Ajoute l'URL actuelle, utile pour la logique de navigation ou de redirection.
                'location' => $request->url(),
            ],

            // Partage l'existence des routes de connexion et d'enregistrement.
            // Permet au frontend de conditionner l'affichage des liens "Login" / "Register".
            'canLogin' => fn () => Route::has('login'),
            'canRegister' => fn () => Route::has('register'),
        ]);
    }
}