<?php
session_start(); // Start en session for at holde brugeren logget ind

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = $_POST['password'];

    // Læs brugerdatabase fra filen
    $file = fopen(__DIR__ . "/users.txt", "r");
    if ($file) {
        $loginSuccessful = false;

        while (($line = fgets($file)) !== false) {
            // Split linjen op for at få brugernavn, email og hashet adgangskode
            list($storedUsername, $storedEmail, $storedHashedPassword) = explode(", ", $line);

            // Fjern labels som 'Brugernavn: ' og 'Adgangskode: '
            $storedUsername = str_replace("Brugernavn: ", "", $storedUsername);
            $storedHashedPassword = str_replace("Adgangskode: ", "", trim($storedHashedPassword));

            // Tjek om brugernavn matcher og om adgangskoden er korrekt
            if ($username == trim($storedUsername) && password_verify($password, $storedHashedPassword)) {
                $loginSuccessful = true;
                $_SESSION['username'] = $username; // Gem brugernavn i session
                break;
            }
        }

        fclose($file);

        if ($loginSuccessful) {
            echo "Login succesfuldt! Velkommen, $username!";
            // Redirect til en beskyttet side eller dashboard
            header("Location: index.html");
        } else {
            echo "Forkert brugernavn eller adgangskode!";
        }
    } else {
        echo "Kunne ikke åbne brugerdatabase!";
    }
} else {
    echo "Ugyldig anmodning!";
}
?>
