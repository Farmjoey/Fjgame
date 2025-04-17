<?php
session_start();
header('Content-Type: application/json');

$isAdmin = isset($_SESSION['username']) && ($_SESSION['username'] === 'Farmjoey';

echo json_encode(['isAdmin' => $isAdmin]);
?> 