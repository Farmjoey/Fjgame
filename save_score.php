<?php
session_start();

// Path to the file where high scores will be saved
$file = 'highscores.txt';

// Check if the user is logged in (you can customize this)
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $newHighScore = intval($_POST['high_score']);

    // Read the current high scores from the file
    $highScores = [];
    if (file_exists($file)) {
        $fileContent = file_get_contents($file);
        $highScores = json_decode($fileContent, true);
    }

    // Only add the score if it is greater than 0
    if (!isset($highScores[$username])) {
        $highScores[$username] = 0;
    }
    if ($newHighScore > 0) {
        $highScores[$username] += $newHighScore;
    }
    
    // Write the updated high scores back to the file
    file_put_contents($file, json_encode($highScores));

    echo json_encode(['status' => 'success', 'new_high_score' => $highScores[$username]]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}
?>
