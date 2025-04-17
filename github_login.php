<?php
session_start();

// Your GitHub OAuth App credentials
$client_id = 'Ov23livP802DAkt3M7JY';
// Use your actual domain here
$redirect_uri = 'https://fjgames.glitch.me/github_callback.php';

// Add required scopes for user data
$scopes = 'read:user user:email';

// Redirect to GitHub's authorization page with state parameter for security
$state = bin2hex(random_bytes(16));
$_SESSION['github_state'] = $state;

$github_url = "https://github.com/login/oauth/authorize?" . http_build_query([
    'client_id' => $client_id,
    'redirect_uri' => $redirect_uri,
    'scope' => $scopes,
    'state' => $state,
    'allow_signup' => 'true'
]);

header("Location: " . $github_url);
exit;
?> 