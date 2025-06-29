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
Route::get('/', function () {
    $navigationItems = [
        ['label' => 'A propos', 'href' => '#about'],
        ['label' => 'Médias', 'href' => '#tutos'],
        ['label' => 'Contact', 'href' => '#contact'],
    ];

    $callToActionProps = [
        'callToActionTitle' => 'RÉVÉLATEUR D’IDÉES, CHARMEUR DE PENSÉES, CATALYSEUR D’ESPRITS LIBRES',
        'button1Href' => 'https://www.superprof.fr/cours-individuels-professionnels-ring-vraie-salle-boxe-sacs-frappes.html',
        'button1Text' => 'Super Prof',
        'button2Href' => 'https://www.youtube.com/watch?v=6LI-JQuyiZU&t=9s',
        'button2Text' => 'interview sur YouTube',
    ];

    // Récupérez les vidéos pour les passer à votre composant
    $videos = Video::all();

    // Nous passons l'utilisateur authentifié (s'il existe) à la vue.
    // Cela garantit que MainNavbar a toujours les informations user, canLogin, canRegister.
    $authProps = auth()->check() ? ['auth' => ['user' => auth()->user()]] : [];

    return Inertia::render('Home', array_merge(
        getAuthProps(),
        $authProps,
        [
            'navigationItems' => $navigationItems,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'videoTutorials' => $videos->toArray(),
        ],
        $callToActionProps
    ));
})->name('home');

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