<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\QuoteController; // Assurez-vous que QuoteController est importé
use App\Models\User; // Assurez-vous que User model est importé

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

// --- Routes Publiques API ---
// Ces routes sont accessibles à n'importe qui, authentifié ou non.

// Public route for Quotes: Anyone can get quotes.
// The QuoteController's index method handles filtering for validated quotes for non-admins.
Route::get('/quotes', [QuoteController::class, 'index'])->name('quotes.index');

// Public routes for Videos: Anyone can view videos.
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/videos/{video}', [VideoController::class, 'show'])->name('videos.show');

// Public route for Users list: Be cautious with this!
// Currently, this returns ALL user data publicly. If this is not intended
// (e.g., if only admins should see all users), move it into the admin-protected group below.
Route::get('/users', function () {
    return User::all();
})->name('users.index');


// --- Routes API Protégées (Admin-Only) ---
// Ces routes nécessitent à la fois l'authentification Sanctum ET le middleware 'admin'.
// Le middleware 'admin' doit vérifier si l'utilisateur authentifié a les privilèges d'administrateur.
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Admin routes for Quotes: Only admins can manage quotes (create, update, delete, toggle validation).
    Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');
    Route::put('/quotes/{quote}', [QuoteController::class, 'update'])->name('quotes.update');
    Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy'])->name('quotes.destroy');
    Route::patch('/quotes/{quote}/toggle-validation', [QuoteController::class, 'toggleValidation'])->name('quotes.toggleValidation');

    // Admin routes for Videos: Only admins can manage videos (create, update, delete).
    Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
    Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
    Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');

    // Si vous voulez restreindre la liste '/users' aux admins uniquement, déplacez-la ici :
    // Route::get('/users', function () {
    //     return User::all();
    // })->name('users.index.admin');
});