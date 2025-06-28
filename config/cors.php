<?php

return [
    /*
     * You can enable CORS for specific paths.
     *
     * The loopback address 127.0.0.1 also includes ::1.
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie', '/'], // Allow CORS for all API routes and CSRF cookie
    'allowed_methods' => ['*'], // Or specify methods like ['GET', 'POST', 'PUT', 'DELETE']
     'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://octopus-philosophie.fr', // Ajoutez votre domaine HTTPS de production
        'http://octopus-philosophie.fr',  // Ajoutez votre domaine HTTP de production si nécessaire (mais HTTPS est préférable)
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Or specify headers like ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With']
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // **Very important for session/cookie-based auth**
];