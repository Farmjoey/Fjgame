<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

// Get user's skins from upgrades.txt
$upgrades = [];
if (file_exists('upgrades.txt')) {
    $upgradesContent = file_get_contents('upgrades.txt');
    $upgrades = json_decode($upgradesContent, true) ?: [];
}

// Get user's coins from coins.txt
$coins = [];
if (file_exists('coins.txt')) {
    $coinsContent = file_get_contents('coins.txt');
    $coins = json_decode($coinsContent, true) ?: [];
}

$userSkins = [];
if (isset($upgrades[$_SESSION['username']])) {
    foreach ($upgrades[$_SESSION['username']] as $upgrade => $value) {
        if (strpos($upgrade, 'BirdSkin') !== false && $value === true) {
            $userSkins[] = [
                'id' => $upgrade,
                'name' => str_replace('BirdSkin', ' Bird', $upgrade)
            ];
        }
    }
}

echo json_encode([
    'status' => 'success',
    'skins' => $userSkins,
    'coins' => $coins[$_SESSION['username']] ?? 0
]);
?> 