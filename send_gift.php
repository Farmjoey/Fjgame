<?php
session_start();

// Check if the user is Farmjoey
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'Farmjoey') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized access']);
    exit;
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($data['type'] === 'coins') {
    // Handle coins gift
    $username = $data['username'];
    $amount = intval($data['amount']);
    
    // Read the current coins file
    $coinsFile = 'coins.txt';
    $coins = [];
    if (file_exists($coinsFile)) {
        $coinsContent = file_get_contents($coinsFile);
        if (!empty($coinsContent)) {
            $coins = json_decode($coinsContent, true) ?: [];
        }
    }
    
    // Add coins to the user's balance
    if (!isset($coins[$username])) {
        $coins[$username] = 0;
    }
    $coins[$username] += $amount;
    
    // Save the updated coins
    if (file_put_contents($coinsFile, json_encode($coins))) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save coins']);
    }
    
} else if ($data['type'] === 'skin') {
    // Handle skin gift
    $username = $data['username'];
    $skin = $data['skin'];
    
    // Read the current upgrades file
    $upgradesFile = 'upgrades.txt';
    $upgrades = [];
    if (file_exists($upgradesFile)) {
        $upgradesContent = file_get_contents($upgradesFile);
        if (!empty($upgradesContent)) {
            $upgrades = json_decode($upgradesContent, true) ?: [];
        }
    }
    
    // Initialize user's upgrades if not exists
    if (!isset($upgrades[$username])) {
        $upgrades[$username] = [];
    }
    
    // Add the skin to the user's upgrades
    $upgrades[$username][$skin] = true;
    
    // Save the updated upgrades
    if (file_put_contents($upgradesFile, json_encode($upgrades))) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save upgrade']);
    }
    
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid gift type']);
}
?> 