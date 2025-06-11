<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller  
{
    public function submit(Request $request)
    {
        // Valider les données  
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Ici vous pouvez traiter les données (ex: envoyer un email)

        // En cas de succès, vous pouvez renvoyer une réponse JSON  
        return response()->json(['success' => 'Votre message a été envoyé avec succès !']);
    }
}
Définir la route : Assurez-vous que vous avez une route définie pour votre méthode de soumission dans routes/web.php ou routes/api.php, selon votre configuration.

Dans le fichier routes/web.php, ajoutez :

use App\Http\Controllers\ContactController;

Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');
Modifier le formulaire dans le composant React : Assurez-vous que vous utilisez axios ou fetch pour envoyer les données du formulaire à votre route Laravel. Voici un exemple de méthode submitForm que vous pourriez avoir dans votre fichier React :

import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                message: '',
            },
            successMessage: '',
            errors: {}
        };
    },
    methods: {
        async submitForm() {
            this.successMessage = ''; // Réinitialiser le message de succès  
            this.errors = {}; // Réinitialiser les erreurs

            try {
                const response = await axios.post('/contact/submit', this.formData, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    }
                });
                this.successMessage = response.data.success; // Afficher le message de succès  
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    // Si validation échoue, stocker les erreurs  
                    this.errors = error.response.data.errors;
                } else {
                    // Gérer d'autres erreurs  
                    this.successMessage = 'Une erreur est survenue, veuillez réessayer.';
                }
            }
        }
    }
};
