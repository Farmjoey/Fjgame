<?php
// Get players from coins.txt, upgrades.txt, and users.txt
$players = [];

// Get players from coins file
if (file_exists('coins.txt')) {
    $coinsContent = file_get_contents('coins.txt');
    if (!empty($coinsContent)) {
        $coinsData = json_decode($coinsContent, true) ?: [];
        $players = array_merge($players, array_keys($coinsData));
    }
}

// Get players from upgrades file
if (file_exists('upgrades.txt')) {
    $upgradesContent = file_get_contents('upgrades.txt');
    if (!empty($upgradesContent)) {
        $upgradesData = json_decode($upgradesContent, true) ?: [];
        $players = array_merge($players, array_keys($upgradesData));
    }
}

// Get players from users.txt
if (file_exists('users.txt')) {
    $usersContent = file_get_contents('users.txt');
    if (!empty($usersContent)) {
        // Try JSON format first
        $usersData = json_decode($usersContent, true);
        if ($usersData) {
            $players = array_merge($players, array_keys($usersData));
        } else {
            // If not JSON, try line by line format
            $lines = explode("\n", $usersContent);
            foreach ($lines as $line) {
                $line = trim($line);
                if (!empty($line)) {
                    // Try to parse each line based on common formats
                    if (strpos($line, ':') !== false) {
                        // Format: username:password
                        $parts = explode(':', $line);
                        $players[] = trim($parts[0]);
                    } else {
                        // Just username per line
                        $players[] = $line;
                    }
                }
            }
        }
    }
}

// Debug output
error_log("Found players: " . print_r($players, true));

// Remove duplicates and sort
$players = array_unique($players);
sort($players);

echo json_encode(['status' => 'success', 'players' => array_values($players)]);
?> 