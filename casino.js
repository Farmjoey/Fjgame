let coins = 0;  // Initialize to 0, will be updated from server
const symbols = ['7', '🍒', '🍋', '💎', '⭐', '🍀'];
let isSpinning = false;
let isRolling = false;
let isFlipping = false;

// Initialize the display
document.addEventListener('DOMContentLoaded', () => {
    loadCoins();
    
    // Add event listeners for game buttons
    const spinButton = document.getElementById('spinButton');
    const rollButton = document.getElementById('rollButton');
    const flipButton = document.getElementById('flipButton');
    
    if (spinButton) {
        spinButton.addEventListener('click', spinSlotMachine);
    }
    if (rollButton) {
        rollButton.addEventListener('click', rollDice);
    }
    if (flipButton) {
        flipButton.addEventListener('click', flipCoin);
    }


});

function loadCoins() {
    fetch('get_coins.php')
        .then(response => response.json())
        .then(data => {
            console.log('Coin data received:', data); // Debug log
            if (data.status === 'success') {
                coins = parseInt(data.coins);
                updateCoinsDisplay();
                console.log('Coins loaded:', coins); // Debug log
            } else {
                console.error('Error loading coins:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching coins:', error);
        });
}

function updateCoinsDisplay() {
    const display = document.getElementById('gamblingCoinsDisplay');
    if (display) {
        display.textContent = coins;
        console.log('Display updated with coins:', coins); // Debug log
    }
    // Save to server
    saveCoins();
}

function saveCoins() {
    const formData = new FormData();
    formData.append('coins', coins);

    fetch('save_coins.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Save response:', data); // Debug log
        if (data.status !== 'success') {
            console.error('Error saving coins:', data.message);
        }
    })
    .catch(error => {
        console.error('Error saving coins:', error);
    });
}

// Slot Machine Logic
async function spinSlotMachine() {
    if (isSpinning) return;
    
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const slotResult = document.getElementById('slotResult');
    
    if (isNaN(betAmount) || betAmount < 100) {
        slotResult.textContent = 'Minimum bet is 100 coins!';
        slotResult.style.color = '#ff3d3d';
        return;
    }
    
    if (coins < betAmount) {
        slotResult.textContent = 'Not enough coins!';
        slotResult.style.color = '#ff3d3d';
        return;
    }
    
    isSpinning = true;
    coins -= betAmount;
    updateCoinsDisplay();
    
    const wheels = [
        document.getElementById('wheel1'),
        document.getElementById('wheel2'),
        document.getElementById('wheel3')
    ];
    
    let results = [];
    let spinCount = 0;
    
    wheels.forEach((wheel, index) => {
        let spins = 0;
        const maxSpins = Math.floor(Math.random() * 5) + 10; // 10-14 spins for more suspense
        
        const spinInterval = setInterval(() => {
            const rand = Math.random();
            let randomSymbol;
            if (rand < 0.55) { // 55% chance for common symbols
                randomSymbol = symbols[Math.floor(Math.random() * 2) + 1]; // 🍒 or 🍋
            } else if (rand < 0.85) { // 30% chance for medium symbols
                randomSymbol = symbols[Math.floor(Math.random() * 2) + 3]; // ⭐ or 🍀
            } else if (rand < 0.98) { // 13% chance for 💎
                randomSymbol = symbols[2];
            } else { // 2% chance for 7
                randomSymbol = symbols[0];
            }
            
            wheel.textContent = randomSymbol;
            spins++;
            
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                results[index] = randomSymbol;
                spinCount++;
                
                if (spinCount === 3) {
                    setTimeout(() => {
                        checkWinnings(results, betAmount, slotResult);
                        isSpinning = false;
                    }, 500);
                }
            }
        }, 150);
    });
}

function checkWinnings(results, betAmount, slotResult) {
    const [a, b, c] = results;
    let winAmount = 0;
    let message = '';
    
    // Reduce payouts for three of a kind
    if (a === b && b === c) {
        switch(a) {
            case '7':
                winAmount = betAmount * 10; // Reduced from 10x
                message = 'JACKPOT! 10x win!';
                break;
            case '💎':
                winAmount = betAmount * 6; // Reduced from 8x
                message = 'Diamond Triple! 6x win!';
                break;
            case '⭐':
                winAmount = betAmount * 4; // Reduced from 6x
                message = 'Star Triple! 4x win!';
                break;
            case '🍀':
                winAmount = betAmount * 3; // Reduced from 5x
                message = 'Lucky Clover! 3x win!';
                break;
            case '🍒':
                winAmount = betAmount * 2; // Reduced from 4x
                message = 'Cherry Triple! 2x win!';
                break;
            case '🍋':
                winAmount = betAmount * 1.5; // Reduced from 3x
                message = 'Lemon Triple! 1.5x win!';
                break;
        }
    }
    // Reduce payouts for pairs
    else if (a === b || b === c || a === c) {
        if (results.includes('💎')) {
            winAmount = betAmount * 1.5; // Reduced from 2x
            message = 'Diamond Pair! 1.5x win!';
        } else if (results.includes('⭐')) {
            winAmount = betAmount * 1.2; // Reduced from 1.5x
            message = 'Star Pair! 1.2x win!';
        } else {
            winAmount = betAmount * 1.1; // Reduced from 1.2x
            message = 'Pair! 1.1x win!';
        }
    }
    
    if (winAmount > 0) {
        coins += winAmount;
        slotResult.textContent = `${message} Won ${winAmount} coins!`;
        slotResult.style.color = '#4CAF50';
    } else {
        slotResult.textContent = 'Try again!';
        slotResult.style.color = '#ff3d3d';
    }
    
    updateCoinsDisplay();
}

// Dice Game Logic
function rollDice() {
    if (isRolling) return;
    
    const betAmount = parseInt(document.getElementById('diceBet').value);
    const guess = parseInt(document.getElementById('diceGuess').value);
    const diceResult = document.getElementById('diceResult');
    
    if (isNaN(betAmount) || betAmount < 100) {
        diceResult.textContent = 'Minimum bet is 100 coins!';
        diceResult.style.color = '#ff3d3d';
        return;
    }
    
    if (coins < betAmount) {
        diceResult.textContent = 'Not enough coins!';
        diceResult.style.color = '#ff3d3d';
        return;
    }
    
    if (guess < 2 || guess > 12) {
        diceResult.textContent = 'Guess must be between 2 and 12!';
        diceResult.style.color = '#ff3d3d';
        return;
    }
    
    isRolling = true;
    coins -= betAmount;
    updateCoinsDisplay();
    
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    
    let rolls = 0;
    const maxRolls = 20;
    diceResult.textContent = 'Rolling...';
    diceResult.style.color = 'white';
    
    const interval = setInterval(() => {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        const sum = roll1 + roll2;
        
        dice1.textContent = roll1;
        dice2.textContent = roll2;
        
        rolls++;
        if (rolls >= maxRolls) {
            clearInterval(interval);
            if (sum === guess) {
                const winAmount = betAmount * 2; // Reduced from 3x
                coins += winAmount;
                diceResult.textContent = `Perfect guess! You won ${winAmount} coins!`;
                diceResult.style.color = '#4CAF50';
            } else if (Math.abs(sum - guess) === 1) {
                const winAmount = Math.floor(betAmount * 1.2); // Reduced from 1.5x
                coins += winAmount;
                diceResult.textContent = `Close! You won ${winAmount} coins!`;
                diceResult.style.color = '#ff9800';
            } else {
                diceResult.textContent = `Try again! The sum was ${sum}`;
                diceResult.style.color = '#ff3d3d';
            }
            
            updateCoinsDisplay();
            isRolling = false;
        }
    }, 100);
}

// Coin Flip Logic
function flipCoin() {
    if (isFlipping) return;
    
    const betAmount = parseInt(document.getElementById('coinBet').value);
    const choice = document.getElementById('coinChoice').value;
    const coinResult = document.getElementById('coinResult');
    const coin = document.getElementById('coin');
    
    if (isNaN(betAmount) || betAmount < 100) {
        coinResult.textContent = 'Minimum bet is 100 coins!';
        coinResult.style.color = '#ff3d3d';
        return;
    }
    
    if (coins < betAmount) {
        coinResult.textContent = 'Not enough coins!';
        coinResult.style.color = '#ff3d3d';
        return;
    }
    
    isFlipping = true;
    coins -= betAmount;
    updateCoinsDisplay();
    
    const flips = Math.floor(Math.random() * 5) + 5; // 5-10 flips
    const rand = Math.random();
    const result = rand < 0.45 ? choice : (choice === 'heads' ? 'tails' : 'heads'); // 45% win rate
    const totalRotation = flips * 360 + (result === 'heads' ? 0 : 180);
    
    coinResult.textContent = 'Flipping...';
    coinResult.style.color = 'white';
    
    coin.style.transform = `rotateY(${totalRotation}deg)`;
    
    setTimeout(() => {
        if (result === choice) {
            const winAmount = Math.floor(betAmount * 1.5); // Reduced from 1.8x
            coins += winAmount;
            coinResult.textContent = `You won ${winAmount} coins!`;
            coinResult.style.color = '#4CAF50';
        } else {
            coinResult.textContent = `Try again! It was ${result}`;
            coinResult.style.color = '#ff3d3d';
        }
        
        updateCoinsDisplay();
        isFlipping = false;
    }, 1500);
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