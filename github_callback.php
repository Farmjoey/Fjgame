<?php
session_start();

// Set up error logging
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_log("GitHub login attempt started");

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    
    // Your GitHub OAuth App credentials
    $client_id = 'Ov23livP802DAkt3M7JY';
    $client_secret = 'fd32d304ebee9198d44104b5292251890d78f830';
    
    // Exchange code for access token
    $token_url = 'https://github.com/login/oauth/access_token';
    $data = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code
    );
    
    $ch = curl_init($token_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
    
    $result = curl_exec($ch);
    curl_close($ch);
    
    $token_data = json_decode($result, true);
    
    if (isset($token_data['access_token'])) {
        // Get user emails from GitHub
        $ch = curl_init('https://api.github.com/user/emails');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'User-Agent: FJGames',
            'Authorization: Bearer ' . $token_data['access_token']
        ));
        
        $email_response = curl_exec($ch);
        curl_close($ch);
        
        $emails = json_decode($email_response, true);
        
        // Get primary verified email
        $github_email = '';
        foreach ($emails as $email) {
            if ($email['primary'] && $email['verified']) {
                $github_email = $email['email'];
                break;
            }
        }
        
        if (!$github_email) {
            header('Location: login.html?error=' . urlencode('No verified GitHub email found'));
            exit;
        }
        
        // Read users.txt
        if (!file_exists('users.txt')) {
            header('Location: login.html?error=' . urlencode('System error'));
            exit;
        }
        
        $users = file('users.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $found = false;
        
        foreach ($users as $user) {
            if (strpos($user, 'Email: ' . $github_email) !== false) {
                // Found matching email, extract username
                preg_match('/Brugernavn: ([^,]+)/', $user, $matches);
                if (isset($matches[1])) {
                    $_SESSION['username'] = trim($matches[1]);
                    $_SESSION['logged_in'] = true;
                    $found = true;
                    break;
                }
            }
        }
        
        if ($found) {
            header('Location: index.html');
        } else {
            header('Location: login.html?error=' . urlencode('No account found with email: ' . $github_email));
        }
        exit;
    }
    
    header('Location: login.html?error=' . urlencode('GitHub authentication failed'));
    exit;
}

header('Location: login.html?error=' . urlencode('Invalid request'));
exit;
?> 