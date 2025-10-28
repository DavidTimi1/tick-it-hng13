<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\Extension\DebugExtension;

// Point Twig to your templates folder
$loader = new FilesystemLoader(__DIR__ . '/../templates');

// Create a new Twig environment
$twig = new Environment($loader, [
    'cache' => false, // disable cache for development
    'debug' => true,
]);

// Enable dump() and other debug functions
$twig->addExtension(new DebugExtension());
