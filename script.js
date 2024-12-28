// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let gameState = Array(9).fill(null);

function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  // Place current player's marker
  if (!gameState[cellIndex]) {
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin(currentPlayer)) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
      return;
    }

    if (gameState.every(cell => cell !== null)) {
      setTimeout(() => alert('It\'s a draw!'), 100);
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turns
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => 
    combination.every(index => gameState[index] === player)
  );
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
