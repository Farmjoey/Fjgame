let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let coins = 0;
let coinsWon = 0;

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = Number(guessInput.value);
  const resultDisplay = document.getElementById("result");

  attempts++;

  if (guess === randomNumber) {
    resultDisplay.innerHTML = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts!`;
    document.getElementById("restartButton").style.display = "block"; // Show restart button
    document.getElementById("guessInput").style.display = "none"; // Hide input field
    document.querySelector('button[onclick="checkGuess()"]').style.display =
      "none"; // Hide submit button
    awardCoins(attempts); // Award coins based on attempts
  } else if (guess < randomNumber) {
    resultDisplay.innerHTML = "Too low! Try again.";
  } else if (guess > randomNumber) {
    resultDisplay.innerHTML = "Too high! Try again.";
  }

  guessInput.value = ""; // Clear the input after each guess
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("result").innerHTML = ""; // Clear the result
  document.getElementById("restartButton").style.display = "none"; // Hide restart button

  // Show input field and button again
  document.getElementById("guessInput").style.display = "block"; // Show input field
  document.querySelector('button[onclick="checkGuess()"]').style.display =
    "inline-block"; // Show submit button

  // Clear the input field
  document.getElementById("guessInput").value = "";
}

function awardCoins(attempts) {
  let coinsEarned = 0;
  
  // More coins for fewer attempts
  if (attempts <= 3) {
    coinsEarned = 1000; // Excellent guessing
  } else if (attempts <= 5) {
    coinsEarned = 750; // Very good
  } else if (attempts <= 7) {
    coinsEarned = 500; // Good
  } else if (attempts <= 10) {
    coinsEarned = 250; // Not bad
  } else {
    coinsEarned = 100; // At least you got it
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
  const storedCoins = localStorage.getItem('gtn_coins');
  coins = storedCoins ? parseInt(storedCoins) : 0;
  updateCoinsDisplay();
}

function saveCoins() {
  localStorage.setItem('gtn_coins', coins);
}

// JavaScript for toggling the navigation menu on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});