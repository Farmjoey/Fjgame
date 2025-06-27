let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = ""; // 'solo' for solo play, 'bot' for playing against the bot
let coinsWon = 0;
let coins = 0;

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("board");
const gameModeSelectionElement = document.getElementById("game-mode-selection");
statusDisplay.innerHTML = "Select a game mode to start";

// Winning conditions
const winConditions = [
  [0, 1, 2], // horizontal top
  [3, 4, 5], // horizontal middle
  [6, 7, 8], // horizontal bottom
  [0, 3, 6], // vertical left
  [1, 4, 7], // vertical middle
  [2, 5, 8], // vertical right
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

// Start the game based on selected mode
function startGame(mode) {
  gameMode = mode;
  gameModeSelectionElement.style.display = "none";
  boardElement.style.display = "grid";
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

// Check win or draw
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      if (gameMode === 'bot') {
        if (board[a] === 'X') {
          statusDisplay.innerHTML = "You won!";
          awardCoins('win');
        } else {
          statusDisplay.innerHTML = "Bot wins!";
        }
      } else {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
      }
      gameActive = false;
      return;
    }
  }
  
  if (!board.includes("")) {
    statusDisplay.innerHTML = "Game ended in a tie!";
    if (gameMode === 'bot') {
      awardCoins('draw');
    }
    gameActive = false;
  }
}

// Handle player moves
function makeMove(index) {
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  const cellElement = document.getElementById(`cell-${index}`);
  cellElement.innerHTML = currentPlayer;
  cellElement.classList.add(currentPlayer);
  handleResultValidation();

  if (!gameActive) return;

  if (gameMode === "solo") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else if (gameMode === "bot" && currentPlayer === "X") {
    currentPlayer = "O";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn (Bot)`;
    setTimeout(botMove, 500);
  }

  if (gameActive && currentPlayer === "X") {
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  }
}

// Bot makes a smarter move
function botMove() {
  // Check if the bot can win in the next move
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "O" && board[b] === "O" && board[c] === "") {
      board[c] = currentPlayer;
      const cellElement = document.getElementById(`cell-${c}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[a] === "O" && board[c] === "O" && board[b] === "") {
      board[b] = currentPlayer;
      const cellElement = document.getElementById(`cell-${b}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[b] === "O" && board[c] === "O" && board[a] === "") {
      board[a] = currentPlayer;
      const cellElement = document.getElementById(`cell-${a}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
  }

  // Check if the player could win in the next move and block them
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "X" && board[b] === "X" && board[c] === "") {
      board[c] = currentPlayer;
      const cellElement = document.getElementById(`cell-${c}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[a] === "X" && board[c] === "X" && board[b] === "") {
      board[b] = currentPlayer;
      const cellElement = document.getElementById(`cell-${b}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
    if (board[b] === "X" && board[c] === "X" && board[a] === "") {
      board[a] = currentPlayer;
      const cellElement = document.getElementById(`cell-${a}`);
      cellElement.innerHTML = currentPlayer;
      cellElement.classList.add(currentPlayer);
      handleResultValidation();
      currentPlayer = "X";
      if (gameActive) {
        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
      }
      return;
    }
  }

  // If no immediate win or block, pick a random available spot
  const availableSpots = board.reduce((acc, curr, idx) => {
    if (curr === "") acc.push(idx);
    return acc;
  }, []);

  if (availableSpots.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableSpots.length);
    const bestMove = availableSpots[randomIndex];
    board[bestMove] = currentPlayer;
    const cellElement = document.getElementById(`cell-${bestMove}`);
    cellElement.innerHTML = currentPlayer;
    cellElement.classList.add(currentPlayer);
    handleResultValidation();

    currentPlayer = "X";
    if (gameActive) {
      statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    }
  }
}

// Check for a winning condition
function handleResult(board) {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] === "O" && board[b] === "O" && board[c] === "O") return 1; // Bot wins
    if (board[a] === "X" && board[b] === "X" && board[c] === "X") return -1; // Player wins
  }
  if (!board.includes("")) {
    return 0; // Tie
  }
  return null; // Game still ongoing
}

// Reset the game and ask for game mode again
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("X", "O");
  });
  boardElement.style.display = "none";
  gameModeSelectionElement.style.display = "block";
  statusDisplay.innerHTML = "Select a game mode to start";
}

// JavaScript for toggling the navigation menu on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

function awardCoins(result) {
    let coinsEarned = 0;
    if (result === 'win') {
        coinsEarned = 1000; // Award 1000 coins for winning
    } else if (result === 'draw') {
        coinsEarned = 500;  // Award 500 coins for draw
    }
    
    if (coinsEarned > 0) {
        coins += coinsEarned;
        coinsWon = coinsEarned;
        saveCoins();
        updateCoinsDisplay();
    }
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

function checkGameEnd() {
    const winner = checkWinner();
    if (winner) {
        if (winner === 'X') {
            message.textContent = "You win!";
            awardCoins('win');
        } else {
            message.textContent = "Bot wins!";
        }
        gameActive = false;
    } else if (!board.includes('')) {
        message.textContent = "It's a draw!";
        awardCoins('draw');
        gameActive = false;
    }
    return !gameActive;
}

function loadCoins() {
  const storedCoins = localStorage.getItem('ttt_coins');
  coins = storedCoins ? parseInt(storedCoins) : 0;
  updateCoinsDisplay();
}

function saveCoins() {
  localStorage.setItem('ttt_coins', coins);
}

document.addEventListener('DOMContentLoaded', function() {
    loadCoins();
    // ... rest of initialization code
});

