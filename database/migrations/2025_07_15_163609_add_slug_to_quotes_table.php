<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            // Vérifiez si la colonne n'existe pas déjà pour éviter les erreurs
            if (!Schema::hasColumn('quotes', 'slug')) {
                // Ajoute la colonne 'slug' APRES la colonne 'text' (ou 'title' si vous préférez)
                // Elle doit être NON NULLABLE et UNIQUE
                $table->string('slug')->unique()->after('text');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            // Retire la colonne 'slug' si la migration est annulée
            if (Schema::hasColumn('quotes', 'slug')) {
                $table->dropColumn('slug');
            }
        });
    }
};