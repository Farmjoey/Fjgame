<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Load the upgrades and coins files
$upgradesFile = 'upgrades.txt';
$coinsFile = 'coins.txt';

$upgrades = [];
if (file_exists($upgradesFile)) {
    $upgradesContent = file_get_contents($upgradesFile);
    if (!empty($upgradesContent)) {
        $upgrades = json_decode($upgradesContent, true) ?: [];
    }
}

$coins = [];
if (file_exists($coinsFile)) {
    $coinsContent = file_get_contents($coinsFile);
    if (!empty($coinsContent)) {
        $coins = json_decode($coinsContent, true) ?: [];
    }
}

// Initialize gift history file if it doesn't exist
$historyFile = 'gift_history.txt';
if (!file_exists($historyFile)) {
    file_put_contents($historyFile, json_encode([]));
}

$history = json_decode(file_get_contents($historyFile), true) ?: [];

if ($data['type'] === 'coins') {
    // Handle coins gift
    $amount = intval($data['amount']);
    
    // Check if sender has enough coins
    if (!isset($coins[$_SESSION['username']]) || $coins[$_SESSION['username']] < $amount) {
        echo json_encode(['status' => 'error', 'message' => 'Insufficient coins']);
        exit;
    }
    
    // Transfer coins
    $coins[$_SESSION['username']] -= $amount;
    if (!isset($coins[$data['username']])) {
        $coins[$data['username']] = 0;
    }
    $coins[$data['username']] += $amount;
    
    // Save coins
    file_put_contents($coinsFile, json_encode($coins));
    
    // Add to history
    $history[] = [
        'message' => "{$_SESSION['username']} sent {$amount} coins to {$data['username']}",
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
} elseif ($data['type'] === 'skin') {
    // Handle skin gift
    foreach ($data['skins'] as $skin) {
        // Check if sender owns the skin
        if (!isset($upgrades[$_SESSION['username']][$skin]) || 
            !$upgrades[$_SESSION['username']][$skin]) {
            echo json_encode(['status' => 'error', 'message' => 'You do not own this skin']);
            exit;
        }
        
        // Check if receiver already has the skin
        if (isset($upgrades[$data['username']][$skin]) && 
            $upgrades[$data['username']][$skin] === true) {
            echo json_encode([
                'status' => 'error', 
                'message' => $data['username'] . ' already owns the skin: ' . str_replace('BirdSkin', '', $skin)
            ]);
            exit;
        }
        
        // Remove skin from sender
        $upgrades[$_SESSION['username']][$skin] = false;
        
        // Add skin to receiver
        if (!isset($upgrades[$data['username']])) {
            $upgrades[$data['username']] = [];
        }
        $upgrades[$data['username']][$skin] = true;
        
        // Add to history
        $history[] = [
            'message' => "{$_SESSION['username']} sent {$skin} to {$data['username']}",
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
    
    // Save upgrades
    file_put_contents($upgradesFile, json_encode($upgrades));
}

// Save history
file_put_contents($historyFile, json_encode($history));

echo json_encode(['status' => 'success', 'message' => 'Gift sent successfully']);
?> 