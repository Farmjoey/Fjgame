<?php
session_start();

$file = 'upgrades.txt';  // File to store upgrades

// Check if user is logged in
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $newUpgrades = json_decode($_POST['upgrades'], true);  // Decode the JSON string

    // Read current upgrades from file
    $upgradesData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        if (!empty($fileContent)) {
            $upgradesData = json_decode($fileContent, true) ?? [];
        }
    }

    // Update user's upgrades
    $upgradesData[$username] = $newUpgrades;

    // Write updated upgrades back to file
    if (file_put_contents($file, json_encode($upgradesData, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success', 'upgrades' => $upgradesData[$username]]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save upgrades']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?> 