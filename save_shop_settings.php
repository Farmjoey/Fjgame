<?php
session_start();

// Only allow Farmjoey to save settings
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'Farmjoey') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// Get the JSON data from the request
$shopData = file_get_contents('php://input');

// Save to file
$file = 'shop_settings.txt';  // File will be saved in the same directory
if (file_put_contents($file, $shopData)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save settings']);
}
?> 