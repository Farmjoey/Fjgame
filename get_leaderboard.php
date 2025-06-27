<?php
session_start();

// Read the profile pictures data
$profilePicsFile = 'profile_pics/profile_pics.txt';
$profilePics = [];
if (file_exists($profilePicsFile)) {
    $content = file_get_contents($profilePicsFile);
    if (!empty($content)) {
        $profilePics = json_decode($content, true) ?? [];
    }
}

// Read the high scores data
$highScoresFile = 'highscores.txt';
$scores = [];

if (file_exists($highScoresFile)) {
    $content = file_get_contents($highScoresFile);
    if (!empty($content)) {
        // Parse the JSON data into an associative array
        $highScores = json_decode($content, true) ?? [];
        
        // Convert the associative array into a scores array
        foreach ($highScores as $username => $score) {
            $scores[] = [
                'username' => $username,
                'high_score' => intval($score)
            ];
        }
    }
}

// Sort scores by high_score in descending order
usort($scores, function($a, $b) {
    return $b['high_score'] - $a['high_score'];
});

// Add profile pictures to the scores data
$leaderboard = array_map(function($score) use ($profilePics) {
    $score['profile_pic'] = $profilePics[$score['username']] ?? null;
    return $score;
}, $scores);

// Return only top 10 scores
$leaderboard = array_slice($leaderboard, 0, 3);

echo json_encode([
    'status' => 'success',
    'leaderboard' => $leaderboard
]);
?> 