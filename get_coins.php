<?php
session_start();

$file = 'coins.txt';  // File to store coins

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    // Read current coins from file
    $coinsData = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $coinsData = json_decode($fileContent, true);
    }

    // If user has coins stored, return them; otherwise return 0
    $userCoins = isset($coinsData[$username]) ? $coinsData[$username] : 0;

    echo json_encode(['status' => 'success', 'coins' => $userCoins]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
