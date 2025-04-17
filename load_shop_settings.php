<?php
session_start();

$file = 'shop_settings.txt';  // File will be read from the same directory

if (file_exists($file)) {
    $settings = file_get_contents($file);
    echo json_encode(['status' => 'success', 'settings' => $settings]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Settings file not found']);
}
?> 