/**
 * Implements the minimax algorithm for AI decision-making
 *
 * @function minimax
 * @param {Array<Array<string>>} board - 2D array representing the game board
 * @param {number} depth - Current depth of the recursion tree
 * @param {boolean} isMaximizing - Whether the current move is maximizing (AI) or minimizing (player)
 * @description Advanced recursive algorithm that explores all possible future game states to find optimal moves.
 *              The minimax algorithm works by:
 *              1. Assigning scores to terminal states: win (+1), loss (-1), draw (0)
 *              2. Recursively evaluating all possible moves from the current state
 *              3. For maximizing player (AI/O), choosing the move with the highest score
 *              4. For minimizing player (human/X), choosing the move with the lowest score
 *
 *              This creates an AI that always makes the optimal move, assuming perfect play from both sides.
 *              The algorithm simulates both players playing optimally and chooses the best move based on
 *              that simulation.
 * @returns {number} The score of the best move from the current position
 */
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1, // Human player win (bad for AI)
    O: 1, // AI win (good for AI)
    tie: 0, // Draw (neutral)
  };

  // Check if game is over (terminal state)
  let result = checkWinner(board);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    // AI's turn (maximizing player)
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O"; // AI is O
          let score = minimax(board, depth + 1, false);
          board[i][j] = ""; // Undo move
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    // Human's turn (minimizing player)
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "X"; // Player is X
          let score = minimax(board, depth + 1, true);
          board[i][j] = ""; // Undo move
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

/**
 * Checks if the current board state has a winner or is a tie
 *
 * @function checkWinner
 * @param {Array<Array<string>>} board - 2D array representing the game board
 * @description Evaluates the 2D game board to determine if:
 *              1. Any player has achieved a winning combination (three in a row)
 *              2. The game is a tie (all cells filled with no winner)
 *              3. The game is still in progress
 *
 *              The function checks all possible winning combinations (rows, columns,
 *              and diagonals) using coordinates for the 3x3 board.
 *
 * @returns {string|null} Returns:
 *                      - "X" if player X has won
 *                      - "O" if player O has won
 *                      - "tie" if the game is a draw
 *                      - null if the game is still in progress
 */
function checkWinner(board) {
  // All possible winning combinations as 2D coordinates
  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ], // top row
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ], // middle row
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ], // bottom row
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ], // left column
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ], // middle column
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ], // right column
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ], // diagonal top-left to bottom-right
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ], // diagonal top-right to bottom-left
  ];

  // Check for a winner
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]]; // Return the winner (X or O)
    }
  }

  // Check for a tie (all cells filled)
  if (board.flat().every((cell) => cell !== "")) {
    return "tie";
  }

  // Game still in progress
  return null;
}

/**
 * Determines the best possible move for the AI
 *
 * @function bestMove
 * @param {Array<Array<string>>} board - 2D array representing the game board
 * @description Entry point for the AI's decision-making process:
 *              1. Iterates through all empty cells on the board
 *              2. Simulates placing the AI's symbol ('O') in each cell
 *              3. Uses the minimax algorithm to evaluate the long-term value of each move
 *              4. Selects the move with the highest score (most likely to lead to AI win)
 *
 *              The function uses the minimax algorithm to explore the game tree and find
 *              the optimal move based on the assumption that both players play perfectly.
 *
 * @returns {Object|undefined} Returns coordinates of the best move as {i, j} object,
 *                            where i is the row and j is the column, or undefined
 *                            if no moves are available
 */
function bestMove(board) {
  let bestScore = -Infinity;
  let move;

  // Try each available position on the board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // Is the spot available?
      if (board[i][j] === "") {
        board[i][j] = "O"; // AI is O
        // Calculate move value through minimax
        let score = minimax(board, 0, false);
        board[i][j] = ""; // Undo move
        // If this move is better than the best found so far
        if (score > bestScore) {
          bestScore = score;
          move = { i, j }; // Save the coordinates
        }
      }
    }
  }

  return move; // Return the best move coordinates
}
