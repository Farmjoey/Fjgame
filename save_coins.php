<?php
session_start();

$file = 'coins.txt';  // File to store coins

// Check if user is logged in
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $newCoins = intval($_POST['coins']);  // New coins sent from client

    // Read current coins from file
    $coinsData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $coinsData = json_decode($fileContent, true);
    }

    // Update user's coins
    $coinsData[$username] = $newCoins;

    // Write updated coins back to file
    file_put_contents($file, json_encode($coinsData));

    echo json_encode(['status' => 'success', 'new_coins' => $coinsData[$username]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
