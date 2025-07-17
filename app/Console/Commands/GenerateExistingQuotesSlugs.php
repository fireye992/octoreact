<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Quote;
use Illuminate\Support\Str; // Pour la fonction slug

class GenerateExistingQuotesSlugs extends Command
{
    protected $signature = 'quotes:generate-slugs';
    protected $description = 'Génère les slugs pour les citations existantes qui n\'en ont pas.';

    public function handle()
    {
        $this->info('Génération des slugs pour les citations existantes...');

        // Récupère les citations qui n'ont pas de slug (ou où le slug est vide)
        $quotesWithoutSlug = Quote::whereNull('slug')
                                ->orWhere('slug', '')
                                ->get();

        $count = 0;
        foreach ($quotesWithoutSlug as $quote) {
            // Spatie\Sluggable s'occupe de la logique ici
            // Il suffit de sauvegarder le modèle, le trait HasSlug fera le reste
            // en générant le slug si le champ slug est null ou vide.
            $quote->save();
            $count++;
        }

        $this->info("{$count} slugs de citations ont été générés et mis à jour.");
        return Command::SUCCESS;
    }
}