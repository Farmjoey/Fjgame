<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$profilePic = $data['profilePic'];
$username = $_SESSION['username'];

// Create a directory for profile pictures if it doesn't exist
$dir = 'profile_pics';
if (!file_exists($dir)) {
    mkdir($dir, 0777, true);
}

// Save to text file
$filename = $dir . '/profile_pics.txt';
$profiles = [];

// Read existing profiles if file exists
if (file_exists($filename)) {
    $content = file_get_contents($filename);
    if (!empty($content)) {
        $profiles = json_decode($content, true) ?? [];
    }
}

// Update or add new profile picture
$profiles[$username] = $profilePic;

// Save back to file
if (file_put_contents($filename, json_encode($profiles))) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error saving profile picture']);
}
?> 