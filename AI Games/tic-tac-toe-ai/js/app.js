
const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");
const newGameBtn = document.getElementById("new-btn");
const resetBtn = document.getElementById("reset-btn");
const playerNameDisplay = document.getElementById("player-name");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");

let playerName = "";
let scores = {
  player: 0,
  computer: 0,
};

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Get player name when the page loads
/**
 * Prompts the user to enter their name when the game loads
 *
 * @function getPlayerName
 * @description Asks user for their name via a prompt dialog and displays it in the UI.
 *              If no name is provided, sets a default "Player" name.
 *              Also ensures the player name display doesn't show "X" which is the player symbol.
 * @returns {void}
 */
function getPlayerName() {
  let name = prompt("Enter your name:", "Player");
  if (!name) name = "Player";
  playerName = name;
  playerNameDisplay.textContent = playerName;

  // Clear default "X" from player name display
  if (playerNameDisplay.textContent === "X") {
    playerNameDisplay.textContent = playerName;
  }
}

// Initialize player name
window.addEventListener("load", getPlayerName);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Handles player clicks on the game board cells
 *
 * @function handleBoxClick
 * @param {Event} event - The click event object
 * @description Processes a player's move when they click on a cell:
 *              1. Identifies the clicked box and its position in the game array
 *              2. Validates if the move is legal (empty cell and game is active)
 *              3. Updates the game state with the player's move
 *              4. Checks if the move resulted in a win or draw
 *              5. If game continues, switches to the AI player and triggers its move
 * @returns {void}
 */
function handleBoxClick(event) {
  const clickedBox = event.target;
  const boxIndex = Array.from(boxes).indexOf(clickedBox);

  if (gameState[boxIndex] !== "" || !gameActive) {
    return;
  }

  updateGameState(boxIndex);
  checkResult();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
      aiMove();
    }
  }
}

/**
 * Updates the game state after a move is made
 *
 * @function updateGameState
 * @param {number} index - The position in the game board array (0-8)
 * @description Updates both the logical game state and the visual display:
 *              1. Stores the player's symbol in the game state array
 *              2. Updates the visual text content of the box
 *              3. Applies appropriate CSS styling based on whether it's X or O
 *                 (player-x for human player, player-o for computer)
 * @returns {void}
 */
function updateGameState(index) {
  gameState[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  // Add player-specific class for styling
  if (currentPlayer === "X") {
    boxes[index].classList.add("player-x");
  } else {
    boxes[index].classList.add("player-o");
  }
}

/**
 * Checks if the current game state results in a win or draw
 *
 * @function checkResult
 * @description Analyzes the current state of the game board to determine if:
 *              1. There is a winning combination (3 in a row of the same symbol)
 *              2. The game is a draw (all cells filled with no winner)
 *              3. The game should continue
 *
 *              If a player has won:
 *              - Updates the score for the appropriate player
 *              - Displays the winner message
 *              - Adds animation effect to the score display
 *              - Sets gameActive to false to stop further moves
 *
 *              If it's a draw:
 *              - Displays draw message
 *              - Sets gameActive to false
 * @returns {void}
 */
function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer === "X") {
      msg.textContent = `${playerName} has won!`;
      scores.player++;
      playerScoreDisplay.textContent = scores.player;
      // Add animation effect to player score
      const playerScoreContainer = document.querySelector(
        ".player-score-container"
      );
      playerScoreContainer.classList.add("score-updated");
      setTimeout(() => {
        playerScoreContainer.classList.remove("score-updated");
      }, 1000);
    } else {
      msg.textContent = `Computer has won!`;
      scores.computer++;
      computerScoreDisplay.textContent = scores.computer;
      // Add animation effect to computer score
      const computerScoreContainer = document.querySelector(
        ".computer-score-container"
      );
      computerScoreContainer.classList.add("score-updated");
      setTimeout(() => {
        computerScoreContainer.classList.remove("score-updated");
      }, 1000);
    }
    gameActive = false;
    msgContainer.classList.remove("hide");
    return;
  }

  if (!gameState.includes("")) {
    msg.textContent = "It's a draw!";
    gameActive = false;
    msgContainer.classList.remove("hide");
  }
}

/**
 * Handles the computer's AI move in the game
 *
 * @function aiMove
 * @description Controls how the AI opponent makes its move:
 *              1. Converts the game's 1D array to a 2D board format for the minimax algorithm
 *              2. Calls the bestMove function from ai.js to determine the optimal move
 *              3. Converts the resulting 2D coordinates back to 1D index
 *              4. Updates the game state and checks for win/draw conditions
 *              5. Switches back to the player's turn if game continues
 *
 *              The minimax algorithm in ai.js ensures the AI makes the most strategic move possible,
 *              making it very difficult to beat.
 * @returns {void}
 */
function aiMove() {
  // Convert 1D gameState array to 2D board for minimax algorithm
  const board2D = [
    [gameState[0], gameState[1], gameState[2]],
    [gameState[3], gameState[4], gameState[5]],
    [gameState[6], gameState[7], gameState[8]],
  ];

  // Call the minimax AI function from ai.js to determine the best move
  const move = bestMove(board2D);

  if (move) {
    // Convert 2D coordinates back to 1D index
    const index = move.i * 3 + move.j;
    updateGameState(index);
    checkResult();
    if (gameActive) {
      currentPlayer = "X";
    }
  }
}

/**
 * Resets the game to its initial state for a new round
 *
 * @function resetGame
 * @description Prepares the game for a new round by:
 *              1. Setting gameActive flag to true to allow moves
 *              2. Resetting currentPlayer to "X" (human player goes first)
 *              3. Clearing the gameState array (9 empty squares)
 *              4. Resetting the visual elements (box text and CSS classes)
 *              5. Hiding any winner/draw message
 *              6. Ensuring the player name is correctly displayed
 *
 *              Called when either the "New Game" or "Reset Game" buttons are clicked.
 *              Does not reset the score - scores persist between rounds.
 * @returns {void}
 */
function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("player-x", "player-o");
  });
  msgContainer.classList.add("hide");

  // Always ensure player name is displayed correctly
  playerNameDisplay.textContent = playerName;
}

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
