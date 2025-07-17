<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Quote;

class QuotePolicy
{
    /**
     * Détermine si l'utilisateur peut voir n'importe quelle citation (lister les citations).
     *
     * @param  \App\Models\User|null  $user  // Peut être null pour les utilisateurs non connectés
     * @return bool
     */
    public function viewAny(?User $user): bool
    {
        // Cette ligne est LA CLÉ. Elle permet à TOUT LE MONDE (connecté ou non)
        // d'accéder à la liste des citations.
        // La méthode `index` de votre contrôleur s'occupe ensuite de filtrer
        // quelles citations sont affichées (validées ou toutes).
        return true;
    }

    // --- Les méthodes suivantes ne doivent être accessibles qu'aux administrateurs ---

    /**
     * Détermine si l'utilisateur peut créer des citations.
     */
    public function create(User $user): bool
    {
        return $user->is_admin;
    }

    /**
     * Détermine si l'utilisateur peut mettre à jour une citation.
     */
    public function update(User $user, Quote $quote): bool
    {
        return $user->is_admin;
    }

    /**
     * Détermine si l'utilisateur peut supprimer une citation.
     */
    public function delete(User $user, Quote $quote): bool
    {
        return $user->is_admin;
    }

    // --- Gestion des permissions globales via `before` (si vous l'utilisez) ---

    /**
     * Intercepte toutes les vérifications de policy.
     * Permet aux administrateurs d'avoir toutes les permissions.
     */
    public function before(?User $user, string $ability)
    {
        if ($user?->is_admin) {
            return true; // Un admin a toutes les permissions
        }

        // Si l'utilisateur n'est pas admin, on ne retourne rien (null) ici.
        // Cela permet à Laravel de passer la vérification aux méthodes spécifiques
        // (comme viewAny, create, update, etc.).
        return null;
    }
}