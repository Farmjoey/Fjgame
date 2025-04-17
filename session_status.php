<?php
session_start();

$response = array();

if (isset($_SESSION['username'])) {
    // Returner brugernavnet, hvis sessionen er aktiv
    $response['loggedIn'] = true;
    $response['username'] = $_SESSION['username'];
} else {
    // Returner loggedIn = false, hvis ingen session
    $response['loggedIn'] = false;
}

echo json_encode($response);
?>
