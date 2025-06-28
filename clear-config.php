<?php
// Supprime les fichiers de cache de configuration
$files_to_delete = [
    'bootstrap/cache/config.php',
    'bootstrap/cache/services.php',
    'bootstrap/cache/packages.php',
    'bootstrap/cache/routes.php'
];

foreach ($files_to_delete as $file) {
    if (file_exists($file)) {
        unlink($file);
        echo "Deleted: $file<br>";
    }
}

echo "Config cache cleared!";
