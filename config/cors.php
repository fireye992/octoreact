<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'], // Add paths that need CORS enabled
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5174'], // **Crucial: Add your Vite server URL**
                                                     // You can also use ['*'] for development, but specify it for production.
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // **Very important for session/cookie-based auth**
];