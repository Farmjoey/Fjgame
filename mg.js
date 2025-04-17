const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const attemptCounter = document.getElementById('attemptCounter');

// Liste over farver til kortene
const colors = [
    '#FF0909', '#FF0909', '#FF6F09', '#FF6F09',
    '#FFC909', '#FFC909', '#A9FF09', '#A9FF09',
    '#26FF09', '#26FF09', '#09FFF7', '#09FFF7',
    '#0915FF', '#0915FF', '#FF09C5', '#FF09C5'
];

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let coins = 0;
let coinsWon = 0;
let moves = 0;
let matchedPairs = 0;
const totalPairs = colors.length / 2;

// Shuffle cards (same as before)
function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

// Update attempt counter
function updateAttemptCounter() {
    attemptCounter.textContent = `Attempts: ${attempts}`;
}

// Create game board
function createBoard() {
    gameBoard.innerHTML = ''; // Clear the board
    shuffle(colors); // Shuffle farverne

    colors.forEach((color) => {
        const card = document.createElement('div');
        card.classList.add('card', 'shuffle'); // Add shuffle class for animation

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundColor = '#4b4b4b'; // Neutral farve til forsiden

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundColor = color; // Sæt kortets farve

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('shuffle'); // Fjern shuffle-klasse efter animationen
        });
    }, 1000); // Animation varer 1 sekund

    attempts = 0;
    updateAttemptCounter();
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        attempts++;
        updateAttemptCounter();
        checkForMatch();
    }
}

// Check if two cards match
function checkForMatch() {
    let isMatch = firstCard.querySelector('.card-back').style.backgroundColor === secondCard.querySelector('.card-back').style.backgroundColor;

    if (isMatch) {
        matchedPairs++;
        disableCards();
        
        // Check if game is complete
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                awardCoins(attempts);
                // Show completion message instead of alert
                const completionMessage = document.getElementById('completionMessage');
                const finalAttempts = document.getElementById('finalAttempts');
                finalAttempts.textContent = attempts;
                completionMessage.style.display = 'block';
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    completionMessage.style.display = 'none';
                }, 3000);
            }, 500);
        }
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Reset game
function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0; // Reset matched pairs counter
    createBoard();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize game
createBoard();

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

// Add coin management functions
function awardCoins(moves) {
    let coinsEarned = 0;
    
    // More coins for fewer moves
    if (moves <= 12) {
        coinsEarned = 2000; // Perfect memory!
    } else if (moves <= 15) {
        coinsEarned = 1500; // Excellent
    } else if (moves <= 18) {
        coinsEarned = 1000; // Very good
    } else if (moves <= 21) {
        coinsEarned = 750; // Good
    } else if (moves <= 24) {
        coinsEarned = 500; // Not bad
    } else {
        coinsEarned = 250; // At least you completed it
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

// Modify the checkMatch function to track moves
function checkMatch() {
    moves++;
    document.getElementById('moves').textContent = moves;
    
    // ... rest of checkMatch logic ...
    
    // When game is complete
    if (matchedPairs === cards.length / 2) {
        setTimeout(() => {
            awardCoins(moves);
            // Show completion message
            alert(`Congratulations! You completed the game in ${moves} moves!`);
        }, 500);
    }
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    loadCoins();
});

