<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VideoController;
use App\Models\Video; // <-- ADD THIS LINE

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

// Nouvelle route pour la page d'accueil, avec les données passées à la page React
Route::get('/', function () {
    // 1. Définissez le tableau de navigation ici, dans la closure de la route
    $navigationItems = [
        ['label' => 'A propos', 'href' => '#about'],
        ['label' => 'Médias', 'href' => '#tutos'],
        ['label' => 'Contact', 'href' => '#contact'],
    ];

    // 2. Ajoutez les données pour la section 'Call to Action' à votre tableau de props
    $callToActionProps = [
        'callToActionTitle' => 'RÉVÉLATEUR D’IDÉES, CHARMEUR DE PENSÉES, CATALYSEUR D’ESPRITS LIBRES',
        'button1Href' => 'https://www.superprof.fr/cours-individuels-professionnels-ring-vraie-salle-boxe-sacs-frappes.html',
        'button1Text' => 'Super Prof',
        'button2Href' => 'https://www.youtube.com/watch?v=6LI-JQuyiZU&t=9s',
        'button2Text' => 'interview sur YouTube',
    ];
    
    // 3. Récupérez les vidéos pour les passer à votre composant
    $videos = Video::all();

    // 4. Fusionnez tous les tableaux de props avant de les passer à Inertia
    return Inertia::render('Home', array_merge([
        'navigationItems' => $navigationItems,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'videoTutorials' => $videos->toArray(), // <-- Passez les données des vidéos ici
    ], $callToActionProps));
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Routes pour l'administration des vidéos (ajoutées ici, dans le groupe middleware 'auth')
    Route::get('/admin/videos', [VideoController::class, 'indexAdmin'])->name('admin.videos');
    Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
    Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
    Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');
});

// Route pour l'API publique (si utilisée pour des appels AJAX)
// Elle retourne du JSON et n'est pas protégée par défaut
Route::get('/api/videos', [VideoController::class, 'index'])->name('api.videos.index');

require __DIR__.'/auth.php';