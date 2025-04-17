<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate trade data
if (!$data['partner'] || !isset($data['yourOffer']) || !isset($data['partnerOffer'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid trade data']);
    exit;
}

// Load current inventories and coins
$upgrades = json_decode(file_get_contents('upgrades.txt'), true) ?: [];
$coins = json_decode(file_get_contents('coins.txt'), true) ?: [];

// Verify user has the offered items
$userCoins = $coins[$_SESSION['username']] ?? 0;
if ($data['yourOffer']['coins'] > $userCoins) {
    echo json_encode(['status' => 'error', 'message' => 'Insufficient coins']);
    exit;
}

foreach ($data['yourOffer']['skins'] as $skin) {
    if (!isset($upgrades[$_SESSION['username']][$skin]) || !$upgrades[$_SESSION['username']][$skin]) {
        echo json_encode(['status' => 'error', 'message' => 'You don\'t own all offered skins']);
        exit;
    }
}

// Verify partner has the requested items
$partnerCoins = $coins[$data['partner']] ?? 0;
if ($data['partnerOffer']['coins'] > $partnerCoins) {
    echo json_encode(['status' => 'error', 'message' => 'Partner has insufficient coins']);
    exit;
}

foreach ($data['partnerOffer']['skins'] as $skin) {
    if (!isset($upgrades[$data['partner']][$skin]) || !$upgrades[$data['partner']][$skin]) {
        echo json_encode(['status' => 'error', 'message' => 'Partner doesn\'t own all requested skins']);
        exit;
    }
}

// Store the trade proposal
$trades = json_decode(file_get_contents('trades.txt'), true) ?: [];
$tradeId = uniqid();
$trades[$tradeId] = [
    'from' => $_SESSION['username'],
    'to' => $data['partner'],
    'yourOffer' => $data['yourOffer'],
    'partnerOffer' => $data['partnerOffer'],
    'status' => 'pending',
    'timestamp' => time()
];

file_put_contents('trades.txt', json_encode($trades));

echo json_encode(['status' => 'success', 'message' => 'Trade proposal sent']);
?> 