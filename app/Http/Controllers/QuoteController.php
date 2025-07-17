<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate; // Pour les autorisations
use Illuminate\Support\Str; // Pour le slug
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia; // Importez Inertia pour le rendu des pages et les redirections

class QuoteController extends Controller
{
    /**
     * Display a listing of quotes for the public API.
     * Quotes are filtered by validation status for non-admin users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $quotes = Quote::query();

        // Si un utilisateur est connecté et n'est PAS un admin,
        // ou si aucun utilisateur n'est connecté, ne montrer que les citations validées.
        if (!Auth::check() || !Auth::user()->is_admin) {
            $quotes->where('is_validated', true);
        }

        $paginatedQuotes = $quotes->latest()->paginate(10);

        return response()->json($paginatedQuotes);
    }

    /**
     * Display the administration page for quotes with pagination.
     * This method is intended to be called by an Inertia route (e.g., /admin/quotes).
     * Only accessible by administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function indexAdminPage(Request $request): \Inertia\Response
    {
        // Autorise l'accès uniquement aux utilisateurs avec la capacité 'isAdmin'.
        Gate::authorize('isAdmin');

        $quotes = Quote::query();

        // Pour la page d'administration, toutes les citations (validées ou non) sont affichées.
        // Aucun filtre 'is_validated' n'est appliqué ici.
        $paginatedQuotes = $quotes->latest()->paginate(10);

        // Rend le composant Inertia spécifique à l'administration des citations.
        return Inertia::render('Admin/Quotes/Index', [
            'quotes' => $paginatedQuotes, // Passe l'objet paginator complet au frontend
            // Vous pouvez ajouter d'autres props nécessaires à la page ici
            // 'filters' => $request->only('search', 'sort')
        ]);
    }

    /**
     * Store a newly created quote in storage.
     * Only accessible by administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validatedData = $request->validate([
            'text' => 'required|string|max:1000',
            'author' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'proposed_by' => 'nullable|string|max:255',
            'is_validated' => 'boolean',
        ]);

        // Assigne 'proposed_by' à l'utilisateur connecté si non fourni
        $validatedData['proposed_by'] = $validatedData['proposed_by'] ?? Auth::user()->name;
        // Définit 'is_validated' à false par défaut si non fourni
        $validatedData['is_validated'] = $validatedData['is_validated'] ?? false;
        // Génère un slug unique basé sur le texte de la citation
        $validatedData['slug'] = Str::slug(Str::limit($validatedData['text'], 50)) . '-' . Str::random(5);

        Quote::create($validatedData);

        // Redirige explicitement vers la page d'index de l'administration des citations.
        // Ceci assure une mise à jour fluide de la page via Inertia sans rechargement complet inattendu.
        return redirect()->route('admin.quotes.index')->with('success', 'Citation ajoutée avec succès.');
    }

    /**
     * Update the specified quote in storage.
     * Only accessible by administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quote  $quote
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Quote $quote): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validatedData = $request->validate([
            'text' => 'required|string|max:1000',
            'author' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'proposed_by' => 'nullable|string|max:255',
            'is_validated' => 'boolean',
        ]);

        // Regénère le slug si le texte de la citation a été modifié
        if ($quote->text !== $validatedData['text']) {
            $newSlugBase = Str::slug(Str::limit($validatedData['text'], 50));
            $newSlug = $newSlugBase;
            $i = 1;
            // Assure l'unicité du slug en ajoutant un suffixe aléatoire si nécessaire
            while (Quote::where('slug', $newSlug)->where('id', '!=', $quote->id)->exists()) {
                $newSlug = $newSlugBase . '-' . $i++;
            }
            $validatedData['slug'] = $newSlug;
        }

        $quote->update($validatedData);

        // Redirige explicitement vers la page d'index de l'administration des citations.
        return redirect()->route('admin.quotes.index')->with('success', 'Citation mise à jour avec succès.');
    }

    /**
     * Remove the specified quote from storage.
     * Only accessible by administrators.
     *
     * @param  \App\Models\Quote  $quote
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Quote $quote): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('isAdmin');
        $quote->delete();

        // Redirige explicitement vers la page d'index de l'administration des citations.
        return redirect()->route('admin.quotes.index')->with('success', 'Citation supprimée avec succès.');
    }

    /**
     * Toggle the validation status of the specified quote.
     * Only accessible by administrators.
     *
     * @param  \App\Models\Quote  $quote
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggleValidation(Quote $quote): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('isAdmin');
        $quote->is_validated = !$quote->is_validated;
        $quote->save();

        // Redirige explicitement vers la page d'index de l'administration des citations.
        return redirect()->route('admin.quotes.index')->with('success', 'Statut de validation mis à jour.');
    }
        public function propose(Request $request): \Illuminate\Http\RedirectResponse
    {
        // Valide les données entrantes du formulaire
        $validatedData = $request->validate([
            'text' => 'required|string|max:1000',
            'author' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255', // Le titre de l'œuvre d'où provient la citation
        ]);

        // Crée une nouvelle citation
        $quote = new Quote();
        $quote->text = $validatedData['text'];
        $quote->author = $validatedData['author'] ?? null;
        $quote->title = $validatedData['title'] ?? null;
        $quote->proposed_by = Auth::user()->name; // Enregistre le nom de l'utilisateur qui propose
        $quote->is_validated = false; // Par défaut, une citation proposée est non validée
        $quote->save();

        // Redirige avec un message de succès
        return redirect()->back()->with('success', 'Votre citation a été proposée avec succès et est en attente de validation !');
    }
}