<?php

namespace Database\Factories;

use App\Models\Quote; // Important : importe le modèle Quote
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class QuoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quote::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Une liste de citations philosophiques
        $quotes = [
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
                'author' => "William Shakespeare", // Bien que non philosophe à la base, cette citation est très philosophique
            ],
            [
                'text' => "Il n'est point de bonheur sans liberté, ni de liberté sans courage.",
                'author' => "Périclès",
            ],
            [
                'text' => "Celui qui n'a pas d'ennemis n'a jamais dit la vérité.",
                'author' => "Oscar Wilde", // Plus littéraire, mais souvent cité philosophiquement
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

        // Sélectionne une citation aléatoire
        $randomQuote = fake()->randomElement($quotes);

        // Crée un slug unique à partir du texte de la citation
        // On tronque le texte pour le slug pour éviter des slugs trop longs
        $slugBase = Str::slug(Str::limit($randomQuote['text'], 50, ''));
        $slug = $slugBase;
        $i = 1;
        while (Quote::where('slug', $slug)->exists()) {
            $slug = $slugBase . '-' . $i++;
        }

        return [
            'slug' => $slug,
            'title' => Str::limit($randomQuote['text'], 80), // Prend une partie de la citation comme titre
            'text' => $randomQuote['text'],
            'author' => $randomQuote['author'],
            'proposed_by' => fake()->name(), // Un nom d'utilisateur aléatoire qui a proposé la citation
            'is_validated' => fake()->boolean(80), // 80% de chances d'être validée
        ];
    }
}
