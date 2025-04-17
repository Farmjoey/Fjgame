<?php
session_start();
header('Content-Type: application/json');

// Only allow Farmjoey to access this
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'Farmjoey') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// Read the upgrades file
$upgradesFile = 'upgrades.txt';
$upgrades = [];

if (file_exists($upgradesFile)) {
    $content = file_get_contents($upgradesFile);
    if (!empty($content)) {
        $upgrades = json_decode($content, true) ?: [];
    }
}

echo json_encode([
    'status' => 'success',
    'players' => $upgrades
]);
?> 