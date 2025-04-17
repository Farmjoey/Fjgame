<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate trade data
if (!isset($data['player1']) || !isset($data['player2'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid trade data']);
    exit;
}

// Load current inventories and coins
$upgrades = json_decode(file_get_contents('upgrades.txt'), true) ?: [];
$coins = json_decode(file_get_contents('coins.txt'), true) ?: [];

// Verify both players have their offered items
foreach (['player1', 'player2'] as $player) {
    $username = $data[$player]['username'];
    $userCoins = $coins[$username] ?? 0;
    
    if ($data[$player]['coins'] > $userCoins) {
        echo json_encode(['status' => 'error', 'message' => "$username has insufficient coins"]);
        exit;
    }

    foreach ($data[$player]['skins'] as $skin) {
        if (!isset($upgrades[$username][$skin]) || !$upgrades[$username][$skin]) {
            echo json_encode(['status' => 'error', 'message' => "$username doesn't own all offered skins"]);
            exit;
        }
    }
}

// Execute the trade
// 1. Exchange coins
$coins[$data['player1']['username']] -= $data['player1']['coins'];
$coins[$data['player1']['username']] += $data['player2']['coins'];
$coins[$data['player2']['username']] -= $data['player2']['coins'];
$coins[$data['player2']['username']] += $data['player1']['coins'];

// 2. Exchange skins
foreach ($data['player1']['skins'] as $skin) {
    $upgrades[$data['player1']['username']][$skin] = false;
    $upgrades[$data['player2']['username']][$skin] = true;
}

foreach ($data['player2']['skins'] as $skin) {
    $upgrades[$data['player2']['username']][$skin] = false;
    $upgrades[$data['player1']['username']][$skin] = true;
}

// Save changes
file_put_contents('coins.txt', json_encode($coins));
file_put_contents('upgrades.txt', json_encode($upgrades));

echo json_encode(['status' => 'success', 'message' => 'Trade completed successfully']);
?> 