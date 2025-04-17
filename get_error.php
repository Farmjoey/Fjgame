<?php
session_start();

// Tjek om der er en fejlbesked gemt i sessionen
if (isset($_SESSION['error'])) {
    echo htmlspecialchars($_SESSION['error']);
    // Ryd sessionen efter at fejlen er vist
    unset($_SESSION['error']);
}
?>
