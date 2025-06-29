<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer un utilisateur standard
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('passworduser'), // Mot de passe par défaut
        ]);

        // Créer un utilisateur ADMINISTRATEUR
        User::factory()->create([
            'name' => 'Emilie',
            'email' => 'ly@octopus.fr',
            'password' => Hash::make('octOpute'), // Mot de passe pour l'admin
            'is_admin' => 1, // Assurez-vous que le champ is_admin est défini dans votre modèle User
        ]);
    }
}