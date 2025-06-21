<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Video; // Assure-toi d'importer ton modèle Video

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Video::create([
            'title' => 'Mon Premier Tutoriel Vidéo',
            'description' => 'Ceci est une description de mon premier tutoriel.',
            'videoId' => 'dQw4w9WgXcQ', // Un ID YouTube valide pour le test (Rick Astley - Never Gonna Give You Up)
            // 'autres_colonnes' => 'valeurs',
        ]);

        Video::create([
            'title' => 'Tutoriel Laravel Sail',
            'description' => 'Apprenez à utiliser Docker avec Laravel Sail.',
            'videoId' => 'VIDEO_ID_2', // Remplace par un vrai ID
        ]);

        // Ajoute d'autres vidéos si nécessaire
    }
}