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
            $table->string('slug')->nullable()->change(); // Rend la colonne slug nullable
        });
    }

    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $table) {
            // Revertir le changement si nécessaire, par exemple, la rendre non nullable à nouveau
            // Attention: cela échouera si vous avez des lignes avec des slugs null.
            // $table->string('slug')->nullable(false)->change();
        });
    }
};
