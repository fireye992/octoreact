<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController; // N'oublie pas d'importer ton contrôleur

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
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index'); // <-- Garde cette ligne telle quelle
Route::get('/videos/{video}', [VideoController::class, 'show']); // <-- Garde cette ligne telle quelle

// Routes d'administration pour les vidéos (protégées par middleware 'auth:sanctum' et 'admin')
// Ces routes sont appelées par Inertia pour les opérations CRUD (post, put, delete)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/videos', [VideoController::class, 'store']); // <-- Garde cette ligne telle quelle
    Route::put('/videos/{video}', [VideoController::class, 'update']); // <-- Garde cette ligne telle quelle
    Route::delete('/videos/{video}', [VideoController::class, 'destroy']); // <-- Garde cette ligne telle quelle
});