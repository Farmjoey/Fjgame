<?php
session_start();

$file = 'highscores.txt';

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    // Read the current high scores from the file
    $highScores = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $highScores = json_decode($fileContent, true);
    }

    $userHighScore = isset($highScores[$username]) ? $highScores[$username] : 0;

    echo json_encode(['status' => 'success', 'high_score' => $userHighScore]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
