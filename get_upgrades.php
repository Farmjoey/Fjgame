<?php
session_start();

$file = 'upgrades.txt';  // File to store upgrades

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    // Read current upgrades from file
    $upgradesData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $upgradesData = json_decode($fileContent, true) ?? [];
    }

    // If user has upgrades stored, return them; otherwise return default values
    $defaultUpgrades = [
        'widerPipeGap' => false,
        'slowerPipes' => false,
        'lowerGravity' => false,
        'blueBirdSkin' => false
    ];

    $userUpgrades = isset($upgradesData[$username]) ? $upgradesData[$username] : $defaultUpgrades;

    echo json_encode(['status' => 'success', 'upgrades' => $userUpgrades]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?> 