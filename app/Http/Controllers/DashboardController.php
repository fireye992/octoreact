<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Utilisez Illuminate\Support\Facades\Auth
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Affiche la page du dashboard avec les citations paginées.
     * Pour les admins, toutes les citations. Pour les non-admins, seulement les validées.
     */
    public function index(Request $request): \Inertia\Response
    {
        $user = Auth::user(); // Utilisez la façade Auth pour récupérer l'utilisateur

        $quotesQuery = Quote::query(); // Initialise la requête

        // Applique la logique de filtrage et de tri basée sur le statut d'admin
        if ($user && $user->is_admin) {
            // Pour les administrateurs : toutes les citations, non validées en premier, puis par les plus récentes
            $quotesQuery->orderBy('is_validated', 'asc') // False (0) avant True (1)
                        ->latest(); // Ensuite par 'created_at' DESC
            $perPage = 05; // Ou une autre valeur, si vous voulez une pagination différente pour l'admin
        } else {
            // Pour les utilisateurs non-admins ou non connectés : seulement les citations validées, les plus récentes
            $quotesQuery->where('is_validated', true)
                        ->latest();
            $perPage = 5; // Nombre de citations pour les utilisateurs standards
        }

        // Récupère les citations paginées
        $paginatedQuotes = $quotesQuery->paginate($perPage);

        // Passe les données à la page Inertia
        return Inertia::render('Dashboard', [
            'quotes' => $paginatedQuotes, // Passe l'objet paginator complet
            // Auth::user() est déjà automatiquement partagé par Inertia avec @inertia,
            // mais le passer explicitement ici ne fait pas de mal et peut être utile si Jetstream n'est pas utilisé.
            // Cependant, la prop 'auth' est généralement déjà disponible via usePage().props.auth.
            // Gardons-le si vous le passez explicitement dans votre app.blade.php pour Inertia::share().
            'canLogin' => app('router')->has('login'),
            'canRegister' => app('router')->has('register'),
        ]);
    }
}