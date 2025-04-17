let coins = 0;
let coinsWon = 0;
let canPlay = true;
let cooldownTime = 5000; // 5 seconds in milliseconds

function playGame(playerChoice) {
    if (!canPlay) return; // Don't allow play during cooldown
    canPlay = false; // Start cooldown

    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const resultDisplay = document.getElementById("result");
    const playerChoiceImg = document.getElementById("playerChoiceImg");
    const computerChoiceImg = document.getElementById("computerChoiceImg");
    const choicesDiv = document.querySelector(".choices");

    // Set image URLs based on choices
    const imageUrls = {
        Rock: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/rock.png?v=1729429391131",
        Paper: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/paper.png?v=1729429393422",
        Scissors: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/scissors.png?v=1729429396366",
    };

    // Update images based on choices
    playerChoiceImg.src = imageUrls[playerChoice];
    computerChoiceImg.src = imageUrls[computerChoice];

    // Show images
    playerChoiceImg.style.display = "block";
    computerChoiceImg.style.display = "block";

    // Determine the result and award coins
    if (playerChoice === computerChoice) {
        resultDisplay.innerHTML = `It's a draw! Both chose ${playerChoice}.`;
        awardCoins('draw');
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Scissors" && computerChoice === "Paper") ||
        (playerChoice === "Paper" && computerChoice === "Rock")
    ) {
        resultDisplay.innerHTML = `You win! ${playerChoice} beats ${computerChoice}.`;
        awardCoins('win');
        confetti();
    } else {
        resultDisplay.innerHTML = `You lose! ${computerChoice} beats ${playerChoice}.`;
        awardCoins('lose');
    }

    // Show result with animation
    resultDisplay.classList.add("show");
    choicesDiv.style.display = "none";

    // Start cooldown timer
    const cooldownDisplay = document.getElementById('cooldown');
    let timeLeft = cooldownTime / 1000;
    
    cooldownDisplay.textContent = `Wait ${timeLeft} seconds...`;
    cooldownDisplay.style.display = 'block';
    
    const timer = setInterval(() => {
        timeLeft--;
        cooldownDisplay.textContent = `Wait ${timeLeft} seconds...`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            cooldownDisplay.style.display = 'none';
            canPlay = true;
            choicesDiv.style.display = "block";
        }
    }, 1000);

    // Show restart button with animation
    const restartButton = document.getElementById("restartButton");
    restartButton.classList.add("show-restart");
}

function restartGame() {
    if (!canPlay) return; // Don't allow restart during cooldown
    
    document.getElementById("result").innerHTML = ""; // Clear the result
    document.getElementById("restartButton").classList.remove("show-restart"); // Hide restart button
    document.getElementById("choices").style.display = "block"; // Show choices again
    document.getElementById("result").classList.remove("show"); // Hide result for next round
}

document.addEventListener("DOMContentLoaded", function () {
  // Fetch both session status and profile picture
  Promise.all([
    fetch('session_status.php').then(res => res.json()),
    fetch('get_profile_pic.php').then(res => res.json())
  ])
    .then(([sessionData, profileData]) => {
      const userInfo = document.getElementById('user-info');

      if (sessionData.loggedIn) {
        // If user is logged in, show welcome message with profile pic and logout
        const profilePic = profileData.status === 'success' ? profileData.profilePic : 'https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/sigma.png?v=1740408925158';
        userInfo.innerHTML = `
          <img src="${profilePic}" alt="Profile" class="nav-profile-pic">
          <a class="welcome-message">Velkommen, ${sessionData.username}!</a>
          <a class="login" href="logout.php" class="logout-btn">Logout</a>
        `;
      } else {
        // If not logged in, show login and signup buttons
        userInfo.innerHTML = `
          <a class="login" href="/login.html" class="login-btn">Login</a>
          <a class="login" href="/signup.html" class="signup-btn">Sign up</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// JavaScript for toggling the navigation menu on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

function awardCoins(result) {
    let coinsEarned = 0;
    
    if (result === 'win') {
        coinsEarned = 500; // Win bonus
    } else if (result === 'draw') {
        coinsEarned = 100; // Draw bonus
    } else {
        coinsEarned = 50;  // Participation bonus for losing
    }
    
    coins += coinsEarned;
    coinsWon = coinsEarned;
    saveCoins();
    updateCoinsDisplay();
}

function updateCoinsDisplay() {
    const coinsDisplay = document.getElementById('coinsDisplay');
    if (coinsDisplay) {
        coinsDisplay.textContent = coins;
    }
    
    if (coinsWon > 0) {
        const coinsWonDisplay = document.getElementById('coinsWonDisplay');
        if (coinsWonDisplay) {
            coinsWonDisplay.textContent = `+${coinsWon}`;
            coinsWonDisplay.style.display = 'block';
            setTimeout(() => {
                coinsWonDisplay.style.display = 'none';
                coinsWon = 0;
            }, 2000);
        }
    }
}

function loadCoins() {
    fetch('get_coins.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                coins = parseInt(data.coins);
                updateCoinsDisplay();
            }
        })
        .catch(error => console.error('Error loading coins:', error));
}

function saveCoins() {
    fetch('save_coins.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `coins=${coins}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Coins saved successfully');
        }
    })
    .catch(error => console.error('Error saving coins:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    loadCoins();
});