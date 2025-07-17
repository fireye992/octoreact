<?php

namespace Database\Seeders;

// Assurez-vous que les modèles User et Hash sont COMMENTÉS ou SUPPRIMÉS
// si vous ne les utilisez PAS directement dans ce fichier
// use App\Models\User;
use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // COMMENTEZ OU SUPPRIMEZ les lignes qui créent des utilisateurs :
        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => Hash::make('passworduser'),
        //     ]
        // );

        // User::firstOrCreate(
        //     ['email' => 'ly@octopus.fr'],
        //     [
        //         'name' => 'Emilie',
        //         'password' => Hash::make('octOpute'),
        //         'is_admin' => 1,
        //     ]
        // );

        // COMMENTEZ OU SUPPRIMEZ tout appel à un seeder de vidéos si vous en avez un :
        // $this->call([
        //     VideoSeeder::class, // Exemple si vous aviez un seeder de vidéos
        // ]);

        // Gardez UNIQUEMENT cette ligne pour appeler votre QuoteSeeder :
        $this->call([
            QuoteSeeder::class,
        ]);
    }
}