<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VideoController;
use App\Models\Video;
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
// Cela nous permet de ne pas répéter le code.
function getAuthProps()
{
    return [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ];
}

// --- Route de la Page d'Accueil ---
// Nous nommons la route 'home'.
// ... (le reste de vos 'use' et de votre fonction getAuthProps())

// --- Ancienne route de la Page d'Accueil (à SUPPRIMER ou COMMENTER) ---
// Route::get('/', function () {
//     $navigationItems = [
//         ['label' => 'Accueil', 'href' => '#hero', 'is_anchor' => true],
//         ['label' => 'A propos', 'href' => '#about', 'is_anchor' => true],
//         ['label' => 'Médias', 'href' => '#tutos', 'is_anchor' => true],
//         ['label' => 'Contact', 'href' => '#contact', 'is_anchor' => true],
//     ];
//     $callToActionProps = [ /* ... */ ];
//     $videos = Video::all();
//     $authProps = auth()->check() ? ['auth' => ['user' => auth()->user()]] : [];
//     return Inertia::render('Home', array_merge(
//         getAuthProps(),
//         $authProps,
//         [
//             'navigationItems' => $navigationItems,
//             'laravelVersion' => Application::VERSION,
//             'phpVersion' => PHP_VERSION,
//             'videoTutorials' => $videos->toArray(),
//         ],
//         $callToActionProps
//     ));
// })->name('home');

// --- Nouvelle route de la Page d'Accueil (à AJOUTER) ---
Route::get('/', HomeController::class)->name('home');

// --- Routes pour les utilisateurs authentifiés ---
// Ces routes sont protégées par le middleware 'auth'.
Route::middleware('auth')->group(function () {
    // --- Route du Dashboard ---
    // Elle est protégée par 'auth' et 'verified'.
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', array_merge(
            getAuthProps(), // Passez les props ici aussi
            [
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]
        ));
    })->middleware('verified')->name('dashboard');

    // --- Routes du Profil ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Routes d'Administration des Vidéos ---
    // Nous utilisons un préfixe d'URL 'admin' et un préfixe de nom 'admin.'
    // pour obtenir le nom de route 'admin.videos'.
    Route::prefix('admin')->name('admin.')->group(function () {
        // La route pour la page d'administration des vidéos
        Route::get('/videos', [VideoController::class, 'indexAdmin'])->name('videos'); // Nom de la route : 'admin.videos'

        // Routes pour la gestion des vidéos (store, update, destroy)
        // Les noms seront 'admin.videos.store', 'admin.videos.update', etc.
        Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
        Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');
    });
});

// --- Route pour l'API publique (si utilisée pour des appels AJAX) ---
Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');
Route::get('/api/videos', [VideoController::class, 'index'])->name('api.videos.index');

require __DIR__ . '/auth.php';