<?php
session_start();
require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Devid\TickitTwig\Controllers\UserController;
use Devid\TickitTwig\Controllers\TicketController;

// Set up Twig
$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig = new Environment($loader, [
    'cache' => false, // disable cache during development
]);

// Example variable for authentication check (replace with real session logic)
$isAuthenticated = isset($_SESSION['user']);
// $userEmail = 'test@example.com';
// $userName = 'John Doe';

// Determine which page to show
$page = $_GET['page'] ?? 'landing';

// Handle signup and login POSTs
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userController = new UserController();

    if ($page === 'signup') {
        $response = $userController->signup($_POST);
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    if ($page === 'login') {
        $response = $userController->login($_POST);
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}

// Redirect unauthenticated users away from protected pages 
$protectedPages = ['dashboard', 'tickets'];
if (in_array($page, $protectedPages) && !$isAuthenticated) {
    header('Location: /?page=landing');
    exit;
}

$template = match ($page) {
    'signup' => 'pages/signup.twig',
    'login' => 'pages/login.twig',
    'dashboard' => 'pages/dashboard.twig',
    'tickets' => 'pages/tickets.twig',
    default => 'pages/landing.twig',
};

if ($page === 'dashboard') {
    $ticketController = new TicketController($userEmail);
    $tickets = $ticketController->index();

    // Compute stats
    $stats = [
        'total' => count($tickets),
        'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
        'in_progress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
        'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed')),
    ];

    // Sort tickets by most recent (id used as timestamp)
    usort($tickets, fn($a, $b) => $b['id'] <=> $a['id']);

    // Show only last 5
    $recentTickets = array_slice($tickets, 0, 5);

    echo $twig->render('pages/dashboard.twig', [
        'userName' => $userName,
        'stats' => $stats,
        'recentTickets' => $recentTickets,
        'page' => $page,
        'isAuthenticated' => $isAuthenticated,
    ]);
    exit;
}

// Handle tickets page
if ($page === 'tickets') {
    $userEmail = 'test@example.com'; // Replace with session user
    $ticketController = new TicketController($userEmail);
    $response = null;
    $editTicket = null;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'] ?? '';

        switch ($action) {
            case 'create':
                $response = $ticketController->create($_POST);
                break;

            case 'update':
                $response = $ticketController->update((int)$_POST['id'], $_POST);
                break;

            case 'delete':
                $response = $ticketController->delete((int)$_POST['id']);
                break;

            case 'edit':
                $editTicket = $ticketController->getTicketById((int)$_POST['id']);
                break;
        }
    }

    $tickets = $ticketController->index();

    echo $twig->render('pages/tickets.twig', [
        'tickets' => $tickets,
        'response' => $response,
        'editTicket' => $editTicket,
        'page' => $page,
        'isAuthenticated' => $isAuthenticated,
    ]);
    exit;
}

// Default render for other pages
echo $twig->render($template, [
    'page' => $page,
    'isAuthenticated' => $isAuthenticated,
]);

