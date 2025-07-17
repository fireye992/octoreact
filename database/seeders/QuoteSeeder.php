<?php

namespace Database\Seeders;

use App\Models\Quote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
// Supprimez ou commentez la ligne suivante si elle existe :
// use Illuminate\Foundation\Testing\WithFaker; 
use Faker\Factory as Faker; // <-- AJOUTEZ CETTE LIGNE

class QuoteSeeder extends Seeder
{
    // Supprimez ou commentez la ligne suivante si elle existe :
    // use WithFaker;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // AJOUTEZ CETTE LIGNE pour instancier Faker
        $faker = Faker::create('fr_FR'); // Utilisez la locale de votre choix, par exemple 'fr_FR' pour le français

        $quotes = [
            // ... votre tableau de citations existant ...
            [
                'text' => "Je pense, donc je suis.",
                'author' => "René Descartes",
            ],
            [
                'text' => "Connais-toi toi-même.",
                'author' => "Socrate",
            ],
            [
                'text' => "L'homme est condamné à être libre.",
                'author' => "Jean-Paul Sartre",
            ],
            [
                'text' => "Le bonheur est le but de la vie.",
                'author' => "Aristote",
            ],
            [
                'text' => "La vie n'est qu'une ombre qui passe, un pauvre acteur qui se pavane et s'agite une heure sur la scène et qu'ensuite on n'entend plus.",
                'author' => "William Shakespeare",
            ],
            [
                'text' => "Il n'est point de bonheur sans liberté, ni de liberté sans courage.",
                'author' => "Périclès",
            ],
            [
                'text' => "Celui qui n'a pas d'ennemis n'a jamais dit la vérité.",
                'author' => "Oscar Wilde",
            ],
            [
                'text' => "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.",
                'author' => "Antoine de Saint-Exupéry",
            ],
            [
                'text' => "L'existence précède l'essence.",
                'author' => "Jean-Paul Sartre",
            ],
            [
                'text' => "Le monde n'est que vanité.",
                'author' => "Blaise Pascal",
            ],
        ];

        foreach ($quotes as $quoteData) {
            $slugBase = Str::slug(Str::limit($quoteData['text'], 50, ''));
            $slug = $slugBase;
            $i = 1;
            while (Quote::where('slug', $slug)->exists()) {
                $slug = $slugBase . '-' . $i++;
            }

            Quote::firstOrCreate(
                ['slug' => $slug],
                [
                    'title' => Str::limit($quoteData['text'], 80),
                    'text' => $quoteData['text'],
                    'author' => $quoteData['author'],
                    'proposed_by' => $faker->name(), // <-- UTILISEZ LA NOUVELLE VARIABLE $faker
                    'is_validated' => $faker->boolean(80), // <-- UTILISEZ LA NOUVELLE VARIABLE $faker
                ]
            );
        }
    }
}
