// >========== DOM SELECTORS ===========>>
const board = document.querySelector(".board");
let currentPlayer = "⚡";
let cells = Array.from({ length: 9 });
//
// <<==================== END ===================================<<
//
//  ---------- handleClick ------>>-----
const handleClick = (e) => {
  const cellIndex = e.target.dataset.index;
  if (cells[cellIndex]) return;
  updateCell(cellIndex, currentPlayer);
  const winner = checkWinner();
  if (winner || !cells.includes(undefined)) {
    alert(winner ? `Player ${winner} Wins!` : "It's a Draw!");
    resetGame();
  }
};
//  ---------- updateCell ------>>-----
const updateCell = (index, value) => {
  cells[index] = value;
  const cell = board.querySelector(`[data-index = "${index}"]`);
  cell.textContent = value;
  cell.classList.add(value === "⚡" ? "player-x" : "player-o");
  //   switch player
  currentPlayer = currentPlayer === "⚡" ? "🅾️" : "⚡";
};
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
  currentPlayer = "🅾️";
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
};
//  ----<>----
//  ----<>----
//  ---------- ESC Key to Reset The Game ------>>-----
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") resetGame();
});
//  ----<>----
//  ----<>----
cells.forEach((cell, index) => {
  cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  //   cell.textContent = index;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
});
checkWinner();
