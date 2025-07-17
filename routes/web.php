<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// --- Fonction utilitaire pour récupérer les props de login/register ---
function getAuthProps()
{
    return [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ];
}

// --- Route de la Page d'Accueil ---
Route::get('/', HomeController::class)->name('home');

// --- Routes pour les utilisateurs authentifiés ---
Route::middleware('auth')->group(function () {

    // --- Route du Dashboard (Maintenant gérée par DashboardController) ---
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('verified')
        ->name('dashboard');

    // --- Routes du Profil ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- NOUVEAU: Route pour la soumission d'une nouvelle citation par un utilisateur ---
    // Accessible par tous les utilisateurs authentifiés
    Route::post('/quotes/propose', [QuoteController::class, 'propose'])->name('quotes.propose');


    // --- Routes d'Administration des Vidéos ---
    Route::prefix('admin')->name('admin.')->middleware('can:isAdmin')->group(function () {
        Route::get('/videos', [VideoController::class, 'indexAdmin'])->name('videos');
        Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
        Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');

        // --- Routes d'Administration des Citations (pour Inertia, retournent des redirections) ---
        Route::get('/quotes', [QuoteController::class, 'indexAdminPage'])->name('quotes.index');
        Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');
        Route::put('/quotes/{quote}', [QuoteController::class, 'update'])->name('quotes.update');
        Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy'])->name('quotes.destroy');
        Route::patch('/quotes/{quote}/toggle-validation', [QuoteController::class, 'toggleValidation'])->name('quotes.toggleValidation');
    });
});


// --- Routes API Publiques (qui peuvent être appelées par des requêtes AJAX) ---
Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/api/videos', [VideoController::class, 'index'])->name('api.videos.index');

// Ce fichier contient toutes les routes d'authentification (login, register, logout, password reset, email verification)
require __DIR__ . '/auth.php';