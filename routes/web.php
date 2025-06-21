<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VideoController; // Assure-toi d'importer ton contrôleur ici

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// --- Routes Publiques (pas d'authentification requise) ---

Route::get('/', function () {
    return view('home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// --- Routes Protégées (authentification requise) ---

// Routes par défaut de Breeze pour le tableau de bord et le profil
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- TA PAGE D'ADMINISTRATION DES VIDÉOS (authentification ET admin requises) ---
Route::middleware(['auth', 'admin'])->group(function () {
    // MODIFIE CETTE LIGNE :
    // Appel à la nouvelle méthode indexAdmin qui rend le composant VideoAdmin avec les données
    Route::get('/admin/videos', [VideoController::class, 'indexAdmin'])->name('admin.videos');

    // Ces routes POST, PUT, DELETE sont pour les actions CRUD via Inertia
    // Elles doivent utiliser les noms de routes spécifiques si vous les appelez via route() dans le frontend
    // Si elles sont appelées via des formulaires Inertia (useForm), le nom de route dans Inertia
    // doit correspondre à la route web.
    Route::post('/admin/videos', [VideoController::class, 'store'])->name('videos.store');
    Route::put('/admin/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
    Route::delete('/admin/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');
});


// Inclut toutes les routes d'authentification de Laravel Breeze
require __DIR__.'/auth.php';