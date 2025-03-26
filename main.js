// >========== DOM SELECTORS ===========>>
const board = document.querySelector(".board");
const selectUser = document.querySelector(".select-user");
const currentPlayerStatus = document.querySelector(".currentPlayer");
const mainBoard = document.querySelector("main");
const userBtn = document.querySelectorAll(".btn-wrapper button");
let currentPlayer; // Will be set when a player chooses their symbol
let player1Symbol = "🅾️";
let player2Symbol = "⚡";
let cells = Array.from({ length: 9 });
//
// <<==================== DOM SELECTORS END ===================================<<
//
//  ---------- Select user and start game  ------>>-----
userBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Set the player symbols based on which button was clicked
    if (index === 0) {
      player1Symbol = "🅾️";
      player2Symbol = "⚡";
    } else {
      player1Symbol = "⚡";
      player2Symbol = "🅾️";
    }
    
    // Always start with player 1
    currentPlayer = player1Symbol;
    
    // Show the game board and hide the selection screen
    mainBoard.classList.remove("hidden");
    selectUser.classList.add("hidden");
    
    // Update the player turn display
    updatePlayerTurnDisplay();
  });
});

//  ---------- handleClick ------>>-----
const handleClick = (e) => {
  const cellIndex = e.target.dataset.index;
  if (cells[cellIndex]) return;
  updateCell(cellIndex, currentPlayer);
  const winner = checkWinner();
  if (winner || !cells.includes(undefined)) {
    showWinnerPopup(winner);
  }
};
//  ---------- updateCell ------>>-----
const updateCell = (index, value) => {
  cells[index] = value;
  const cell = board.querySelector(`[data-index = "${index}"]`);
  cell.textContent = value;
  cell.classList.add(value === "⚡" ? "player-x" : "player-o");
  //   switch player
  currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
  // Update the player turn display
  updatePlayerTurnDisplay();
};

// Function to update the player turn display
function updatePlayerTurnDisplay() {
  // Clear previous content
  currentPlayerStatus.innerHTML = '';
  
  // Create player indicators
  const player1Container = document.createElement('div');
  player1Container.classList.add('player-indicator');
  player1Container.classList.add(currentPlayer === player1Symbol ? 'active-player' : 'inactive-player');
  
  const player1Label = document.createElement('span');
  player1Label.textContent = "P1: ";
  player1Label.classList.add('player-label');
  
  const player1Symbol_span = document.createElement('span');
  player1Symbol_span.textContent = player1Symbol;
  player1Symbol_span.classList.add('player-symbol');
  
  player1Container.appendChild(player1Label);
  player1Container.appendChild(player1Symbol_span);
  
  // Create player 2 indicator
  const player2Container = document.createElement('div');
  player2Container.classList.add('player-indicator');
  player2Container.classList.add(currentPlayer === player2Symbol ? 'active-player' : 'inactive-player');
  
  const player2Label = document.createElement('span');
  player2Label.textContent = "P2: ";
  player2Label.classList.add('player-label');
  
  const player2Symbol_span = document.createElement('span');
  player2Symbol_span.textContent = player2Symbol;
  player2Symbol_span.classList.add('player-symbol');
  
  player2Container.appendChild(player2Label);
  player2Container.appendChild(player2Symbol_span);
  
  // Create the current turn indicator
  const currentTurn = document.createElement('div');
  currentTurn.classList.add('current-turn');
  currentTurn.textContent = "→ " + currentPlayer + " turn";
  
  // Add all elements to the status display
  currentPlayerStatus.appendChild(player1Container);
  currentPlayerStatus.appendChild(player2Container);
  currentPlayerStatus.appendChild(currentTurn);
}
//  ----<>----
//  ----<>----
//  ---------- Check Winner ------>>-----
const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
};
//  ----<>----
//  ----<>----
//  ---------- Reset Game ------>>-----
const resetGame = () => {
  cells = Array.from({ length: 9 });
  // Show the selection screen again
  selectUser.classList.remove("hidden");
  mainBoard.classList.add("hidden");
  
  // Clear the board
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
  
  // Reset the current player display
  currentPlayerStatus.innerHTML = '';
};
//  ----<>----
//  ----<>----
//  ---------- ESC Key to Reset The Game ------>>-----
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") resetGame();
});
//  ---------- Show Winner Popup ------>>-----
const showWinnerPopup = (winner) => {
  const winnerPopup = document.querySelector('.winner-popup');
  const winnerMessage = document.querySelector('.winner-message');
  const winnerSymbol = document.querySelector('.winner-symbol');
  
  // Set the appropriate message and symbol
  if (winner) {
    winnerMessage.textContent = "Player Wins!";
    winnerSymbol.textContent = winner;
  } else {
    winnerMessage.textContent = "It's a Draw!";
    winnerSymbol.textContent = "🤝";
  }
  
  // Show the popup with animation
  winnerPopup.classList.remove('hidden');
  setTimeout(() => {
    winnerPopup.classList.add('show');
  }, 10);
};

//  ---------- Hide Winner Popup and Reset ------>>-----
const hideWinnerPopup = () => {
  const winnerPopup = document.querySelector('.winner-popup');
  
  // Hide with animation
  winnerPopup.classList.remove('show');
  setTimeout(() => {
    winnerPopup.classList.add('hidden');
    resetGame();
  }, 300);
};

//  ----<>----
//  ----<>----
// Create the game board cells
cells.forEach((cell, index) => {
  cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  //   cell.textContent = index;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
});