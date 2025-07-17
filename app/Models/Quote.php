<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug; // <-- Importez le trait
use Spatie\Sluggable\SlugOptions; // <-- Importez les options

class Quote extends Model
{
    use HasFactory, HasSlug; // <-- Ajoutez HasSlug ici

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'text',
        'author',
        'title',
        'proposed_by',
        'is_validated',
        // 'slug', // Le slug sera généré, pas assigné en masse directement par l'utilisateur
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('text') // Génère le slug à partir du champ 'text'
            ->saveSlugsTo('slug')       // Enregistre le slug dans la colonne 'slug'
            ->doNotGenerateSlugsOnUpdate(); // Optionnel: ne pas regénérer le slug si la citation est mise à jour
    }
}