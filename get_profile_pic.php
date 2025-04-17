<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$username = $_SESSION['username'];
$filename = 'profile_pics/profile_pics.txt';

// Check if file exists and read profile picture
if (file_exists($filename)) {
    $content = file_get_contents($filename);
    if (!empty($content)) {
        $profiles = json_decode($content, true) ?? [];
        if (isset($profiles[$username])) {
            echo json_encode(['status' => 'success', 'profilePic' => $profiles[$username]]);
            exit;
        }
    }
}

// Return default profile picture if no custom one is found
echo json_encode([
    'status' => 'success', 
    'profilePic' => 'https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/default-profile.jpg?v=1740405798099'
]);
?> 