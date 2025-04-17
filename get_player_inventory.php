<?php
session_start();

if (!isset($_GET['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'No username provided']);
    exit;
}

$username = $_GET['username'];

// Get player's skins from upgrades.txt
$upgrades = [];
if (file_exists('upgrades.txt')) {
    $upgradesContent = file_get_contents('upgrades.txt');
    $upgrades = json_decode($upgradesContent, true) ?: [];
}

// Get player's coins from coins.txt
$coins = [];
if (file_exists('coins.txt')) {
    $coinsContent = file_get_contents('coins.txt');
    $coins = json_decode($coinsContent, true) ?: [];
}

$playerSkins = [];
if (isset($upgrades[$username])) {
    foreach ($upgrades[$username] as $upgrade => $value) {
        if (strpos($upgrade, 'BirdSkin') !== false && $value === true) {
            $playerSkins[] = [
                'id' => $upgrade,
                'name' => str_replace('BirdSkin', ' Bird', $upgrade)
            ];
        }
    }
}

echo json_encode([
    'status' => 'success',
    'skins' => $playerSkins,
    'coins' => $coins[$username] ?? 0
]);
?> 