<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;
use App\Models\User; // Importez le modèle User

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route pour récupérer l'utilisateur connecté (par défaut avec Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes publiques pour récupérer les vidéos (si tu veux les afficher sans authentification)
// Cette route est bien pour ton `fetchVideos` dans le frontend
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/videos/{video}', [VideoController::class, 'show']);

// Routes d'administration pour les vidéos (protégées par middleware 'auth:sanctum' et 'admin')
// Ces routes sont appelées par Inertia pour les opérations CRUD (post, put, delete)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/videos', [VideoController::class, 'store']);
    Route::put('/videos/{video}', [VideoController::class, 'update']);
    Route::delete('/videos/{video}', [VideoController::class, 'destroy']);
});

// Ajout de la route pour récupérer la liste des utilisateurs
Route::get('/users', function () {
    // La méthode 'all()' du modèle User récupère tous les utilisateurs de la base de données
    return User::all();
});