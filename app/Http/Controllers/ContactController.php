<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log; // Don't forget to import Log

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        // Use try-catch for validation as well, in case it throws an exception (though less common for validate())
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255', // Add max length for good measure
                'email' => ['required', 'email', 'max:255'], // Add max length
                'message' => 'required|string|max:1000' // Add max length
            ]);

            Mail::to('ly@octopus-philosophie.fr') // Ensure this is your correct recipient email
                ->send(new ContactMail($validated['name'], $validated['email'], $validated['message']));

            // If successful, redirect back with a success flash message.
            // Inertia will intercept this redirect and make the 'success' message available.
            // withFragment('contact') is used to hint Inertia where to scroll if preserveScroll fails or for direct URL access.
            return redirect()->back()->with('success', 'Merci pour votre message, je vous contacterai au plus vite.')->withFragment('contact');

        } catch (\Illuminate\Validation\ValidationException $e) {
            // If validation fails, Laravel's $request->validate() automatically redirects back
            // with errors flashed. Inertia handles these automatically.
            // We just need to ensure the fragment is added for scrolling.
            return redirect()->back()->withErrors($e->errors())->withFragment('contact');

        } catch (\Exception $e) {
            // Log any other unexpected errors (e.g., mail server issues)
            Log::error('Erreur lors de l\'envoi du message de contact: ' . $e->getMessage());

            // Redirect back with an error flash message.
            return redirect()->back()->with('error', 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.')->withFragment('contact');
        }
    }
}