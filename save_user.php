<?php
session_start(); // Start en session til at gemme fejlbeskeder
$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Tjek om adgangskoderne matcher
    if ($password !== $confirmPassword) {
        $_SESSION['error'] = "Adgangskoderne stemmer ikke overens!";
    } else {
        // Åbn filen og tjek om brugernavnet allerede eksisterer
        $file = fopen(__DIR__ . "/users.txt", "r");
        if ($file) {
            while (($line = fgets($file)) !== false) {
                list($storedUsername) = explode(", ", $line);
                $storedUsername = str_replace("Brugernavn: ", "", trim($storedUsername));

                // Tjek om brugernavnet allerede findes
                if ($username == $storedUsername) {
                    $_SESSION['error'] = "Brugernavnet er allerede i brug";
                    break;
                }
            }
            fclose($file);
        }

        if (empty($_SESSION['error'])) {
            // Hash adgangskoden
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Saml dataene
            $userData = "Brugernavn: $username, Email: $email, Adgangskode: $hashedPassword\n";

            // Gem dataene i en tekstfil
            $file = fopen(__DIR__ . "/users.txt", "a");
            if ($file) {
                fwrite($file, $userData);
                fclose($file);

                // Ryd sessionen efter succes
                unset($_SESSION['error']);
                
                // Efter succesfuld oprettelse af bruger omdirigeres til index.html
                header("Location: index.html");
                exit();
            } else {
                $_SESSION['error'] = "Kunne ikke gemme oplysninger!";
            }
        }
    }

    // Omdiriger til signup.html for at vise fejlen
    header("Location: signup.html");
    exit();
}
?>
