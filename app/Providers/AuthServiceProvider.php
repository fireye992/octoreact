<?php // This MUST be the first thing in the file, on line 1

namespace App\Providers; // This MUST be on line 3 or 4, no extra lines/spaces before it

use App\Models\User;
use App\Models\Quote; // <-- NOUVEAU : Importez le modèle Quote
use App\Policies\QuotePolicy; // <-- NOUVEAU : Importez votre QuotePolicy
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // Enregistrez votre QuotePolicy ici pour l'associer au modèle Quote
        Quote::class => QuotePolicy::class, // <-- C'EST LA LIGNE CLÉ À AJOUTER OU DÉCOMMENTER
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // Définition de la "Gate" 'isAdmin'
        // Cette Gate est utilisée pour protéger les routes d'administration.
        Gate::define('isAdmin', function (User $user) {
            return $user->is_admin;
        });

        // Les policies sont automatiquement découvertes si elles suivent les conventions de nommage
        // (e.g., UserPolicy pour User model), mais il est bon de les enregistrer explicitement
        // si vous utilisez des noms personnalisés ou pour une meilleure clarté.
        // Puisque nous avons une QuotePolicy, l'enregistrement ci-dessus est important.
    }
}