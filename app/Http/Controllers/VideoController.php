<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia; // N'oublie pas d'importer Inertia

class VideoController extends Controller
{
    /**
     * Affiche la liste des vidéos pour la page d'administration Inertia.
     * C'est cette méthode qui sera appelée par la route web.
     */
    public function indexAdmin() // <-- NOUVELLE MÉTHODE POUR LA VUE ADMIN INERTIA
    {
        $videos = Video::all(); // Récupère toutes les vidéos

        return Inertia::render('Admin/VideoAdmin', [
            'videos' => $videos->toArray(), // Passe les vidéos comme props au composant React
            'robots' => 'noindex, nofollow',
        ]);
    }

    /**
     * Affiche une liste de ressources (API).
     * Cette méthode sera utilisée si vous faites un appel AJAX (fetch) depuis votre frontend
     * pour rafraîchir les données APRÈS le chargement initial de la page.
     * Elle ne retourne PAS une vue Inertia.
     */
    public function index() // <-- MÉTHODE EXISTANTE MODIFIÉE POUR RETOURNER DU JSON
    {
        $videos = Video::all();
        return response()->json($videos); // Retourne les vidéos au format JSON
    }


    /**
     * Show the form for creating a new resource.
     * (Pas de changement ici, vous pouvez la laisser telle quelle si elle n'est pas utilisée)
     */
    public function create()
    {
        // ... (votre code existant)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_id' => 'required|string|max:255|unique:videos',
        ]);

        Video::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'video_id' => $request->input('video_id'),
        ]);

        // Redirige vers la page d'admin des vidéos après un ajout réussi
        return redirect()->route('admin.videos')
                         ->with('success', 'Vidéo ajoutée avec succès !');
    }

    /**
     * Display the specified resource.
     * (Pas de changement ici, utile si vous avez une page de détail)
     */
    public function show(Video $video)
    {
        // ... (votre code existant)
    }

    /**
     * Show the form for editing the specified resource.
     * (Pas de changement ici)
     */
    public function edit(Video $video)
    {
        // ... (votre code existant)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_id' => 'required|string|max:255|unique:videos,video_id,' . $video->id,
        ]);

        $video->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'video_id' => $request->input('video_id'),
        ]);

        // Redirige vers la page d'admin des vidéos après une mise à jour réussie
        return redirect()->route('admin.videos')
                         ->with('success', 'Vidéo mise à jour avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->delete();

        // Redirige vers la page d'admin des vidéos après une suppression réussie
        return redirect()->route('admin.videos')
                         ->with('success', 'Vidéo supprimée avec succès !');
    }
    
    
}