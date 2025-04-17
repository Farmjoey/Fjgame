<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$historyFile = 'gift_history.txt';
if (!file_exists($historyFile)) {
    file_put_contents($historyFile, json_encode([]));
}

$history = json_decode(file_get_contents($historyFile), true) ?: [];

// Get only relevant history for the current user
$userHistory = array_filter($history, function($item) {
    return strpos($item['message'], $_SESSION['username']) !== false;
});

// Sort by most recent first
$userHistory = array_reverse($userHistory);

echo json_encode([
    'status' => 'success',
    'history' => array_values($userHistory)
]);
?> 