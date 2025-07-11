// Chess pieces Unicode characters
const PIECES = {
  white: {
    pawn: "♙",
    rook: "♖",
    knight: "♘",
    bishop: "♗",
    queen: "♕",
    king: "♔",
  },
  black: {
    pawn: "♟",
    rook: "♜",
    knight: "♞",
    bishop: "♝",
    queen: "♛",
    king: "♚",
  },
};

// Initial board setup
const INITIAL_BOARD = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

// Game state
let board = [];
let selectedPiece = null;
let currentPlayer = "white";
let validMoves = [];
let gameOver = false;

// DOM elements
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");
const difficultySelect = document.getElementById("difficulty");

// Initialize the game
function initGame() {
  board = JSON.parse(JSON.stringify(INITIAL_BOARD));
  selectedPiece = null;
  currentPlayer = "white";
  validMoves = [];
  gameOver = false;
  statusElement.textContent = "Your turn (White)";
  renderBoard();
}

// Render the chess board
function renderBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${(row + col) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = row;
      square.dataset.col = col;

      if (board[row][col]) {
        const piece = board[row][col];
        const color = piece[0] === "w" ? "white" : "black";
        const type = getPieceType(piece[1]);
        square.textContent = PIECES[color][type];
      }

      if (
        selectedPiece &&
        selectedPiece.row === row &&
        selectedPiece.col === col
      ) {
        square.classList.add("selected");
      }

      if (validMoves.some((move) => move.row === row && move.col === col)) {
        square.classList.add("valid-move");
      }

      square.addEventListener("click", () => handleSquareClick(row, col));
      boardElement.appendChild(square);
    }
  }
}

// Handle click on a square
function handleSquareClick(row, col) {
  if (gameOver || currentPlayer === "black") return;

  const piece = board[row][col];

  // If a piece is already selected
  if (selectedPiece) {
    // Check if clicked on a valid move
    const moveIndex = validMoves.findIndex(
      (move) => move.row === row && move.col === col
    );

    if (moveIndex !== -1) {
      // Make the move
      const move = validMoves[moveIndex];
      makeMove(selectedPiece.row, selectedPiece.col, move.row, move.col);

      // Reset selection
      selectedPiece = null;
      validMoves = [];

      // Check if game is over
      if (isCheckmate("black")) {
        gameOver = true;
        statusElement.textContent = "Checkmate! You win!";
        return;
      }

      // AI's turn
      currentPlayer = "black";
      statusElement.textContent = "AI is thinking...";
      renderBoard();

      // Allow UI to update before AI makes a move
      setTimeout(makeAIMove, 500);
      return;
    }

    // Clicked on another square, reset selection
    selectedPiece = null;
    validMoves = [];
  }

  // Select a piece if it belongs to the current player
  if (piece && piece[0] === "w") {
    selectedPiece = { row, col };
    validMoves = getValidMoves(row, col);
  }

  renderBoard();
}

// Make AI move using minimax algorithm
function makeAIMove() {
  const depth = parseInt(difficultySelect.value);
  const bestMove = findBestMove(depth);

  if (bestMove) {
    makeMove(
      bestMove.fromRow,
      bestMove.fromCol,
      bestMove.toRow,
      bestMove.toCol
    );

    // Check if game is over
    if (isCheckmate("white")) {
      gameOver = true;
      statusElement.textContent = "Checkmate! AI wins!";
      renderBoard();
      return;
    }

    currentPlayer = "white";
    statusElement.textContent = "Your turn (White)";
  } else {
    // No valid moves for AI
    if (isCheck("black")) {
      gameOver = true;
      statusElement.textContent = "Checkmate! You win!";
    } else {
      gameOver = true;
      statusElement.textContent = "Stalemate! Game is a draw!";
    }
  }

  renderBoard();
}

// Find the best move for AI using minimax algorithm
function findBestMove(depth) {
  let bestScore = -Infinity;
  let bestMove = null;

  // For each piece of the AI
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece[0] === "b") {
        const moves = getValidMoves(row, col);

        // For each valid move
        for (const move of moves) {
          // Make the move temporarily
          const savedPiece = board[move.row][move.col];
          board[move.row][move.col] = board[row][col];
          board[row][col] = "";

          // Evaluate the move using minimax
          const score = minimax(depth - 1, false, -Infinity, Infinity);

          // Undo the move
          board[row][col] = board[move.row][move.col];
          board[move.row][move.col] = savedPiece;

          // Update best move if found
          if (score > bestScore) {
            bestScore = score;
            bestMove = {
              fromRow: row,
              fromCol: col,
              toRow: move.row,
              toCol: move.col,
            };
          }
        }
      }
    }
  }

  return bestMove;
}

// Minimax algorithm with alpha-beta pruning
function minimax(depth, isMaximizing, alpha, beta) {
  // Base case: reached maximum depth
  if (depth === 0) {
    return evaluateBoard();
  }

  if (isMaximizing) {
    // AI's turn (maximizing)
    let maxScore = -Infinity;

    // For each piece of the AI
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece[0] === "b") {
          const moves = getValidMoves(row, col);

          // For each valid move
          for (const move of moves) {
            // Make the move temporarily
            const savedPiece = board[move.row][move.col];
            board[move.row][move.col] = board[row][col];
            board[row][col] = "";

            // Recursively call minimax
            const score = minimax(depth - 1, false, alpha, beta);

            // Undo the move
            board[row][col] = board[move.row][move.col];
            board[move.row][move.col] = savedPiece;

            // Update max score
            maxScore = Math.max(maxScore, score);
            alpha = Math.max(alpha, score);

            // Alpha-beta pruning
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
    }

    return maxScore;
  } else {
    // Human's turn (minimizing)
    let minScore = Infinity;

    // For each piece of the human
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece[0] === "w") {
          const moves = getValidMoves(row, col);

          // For each valid move
          for (const move of moves) {
            // Make the move temporarily
            const savedPiece = board[move.row][move.col];
            board[move.row][move.col] = board[row][col];
            board[row][col] = "";

            // Recursively call minimax
            const score = minimax(depth - 1, true, alpha, beta);

            // Undo the move
            board[row][col] = board[move.row][move.col];
            board[move.row][move.col] = savedPiece;

            // Update min score
            minScore = Math.min(minScore, score);
            beta = Math.min(beta, score);

            // Alpha-beta pruning
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
    }

    return minScore;
  }
}

// Evaluate the current board state
function evaluateBoard() {
  let score = 0;

  // Piece values
  const pieceValues = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900,
  };

  // Count material for both sides
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = pieceValues[piece[1]];
        if (piece[0] === "b") {
          score += value;
        } else {
          score -= value;
        }
      }
    }
  }

  // Add a small random factor to prevent repetitive moves
  score += Math.random() - 0.5;

  return score;
}

// Make a move
function makeMove(fromRow, fromCol, toRow, toCol) {
  board[toRow][toCol] = board[fromRow][fromCol];
  board[fromRow][fromCol] = "";

  // Check for pawn promotion
  if (board[toRow][toCol] === "wp" && toRow === 0) {
    board[toRow][toCol] = "wq"; // Promote to queen
  } else if (board[toRow][toCol] === "bp" && toRow === 7) {
    board[toRow][toCol] = "bq"; // Promote to queen
  }
}

// Get valid moves for a piece
function getValidMoves(row, col) {
  const piece = board[row][col];
  if (!piece) return [];

  const color = piece[0];
  const type = piece[1];
  const moves = [];

  // Get potential moves based on piece type
  switch (type) {
    case "p":
      getPawnMoves(row, col, color, moves);
      break;
    case "r":
      getRookMoves(row, col, color, moves);
      break;
    case "n":
      getKnightMoves(row, col, color, moves);
      break;
    case "b":
      getBishopMoves(row, col, color, moves);
      break;
    case "q":
      getQueenMoves(row, col, color, moves);
      break;
    case "k":
      getKingMoves(row, col, color, moves);
      break;
  }

  // Filter out moves that would put or leave the king in check
  return moves.filter((move) => {
    // Make the move temporarily
    const savedPiece = board[move.row][move.col];
    board[move.row][move.col] = board[row][col];
    board[row][col] = "";

    // Check if the king is in check after the move
    const inCheck = isCheck(color);

    // Undo the move
    board[row][col] = board[move.row][move.col];
    board[move.row][move.col] = savedPiece;

    return !inCheck;
  });
}

// Get pawn moves
function getPawnMoves(row, col, color, moves) {
  const direction = color === "w" ? -1 : 1;
  const startRow = color === "w" ? 6 : 1;

  // Move forward one square
  if (isInBoard(row + direction, col) && !board[row + direction][col]) {
    moves.push({ row: row + direction, col });

    // Move forward two squares from starting position
    if (row === startRow && !board[row + 2 * direction][col]) {
      moves.push({ row: row + 2 * direction, col });
    }
  }

  // Capture diagonally
  for (let i = -1; i <= 1; i += 2) {
    if (
      isInBoard(row + direction, col + i) &&
      board[row + direction][col + i] &&
      board[row + direction][col + i][0] !== color
    ) {
      moves.push({ row: row + direction, col: col + i });
    }
  }
}

// Get rook moves
function getRookMoves(row, col, color, moves) {
  // Directions: up, right, down, left
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  for (const [dRow, dCol] of directions) {
    let newRow = row + dRow;
    let newCol = col + dCol;

    while (isInBoard(newRow, newCol)) {
      if (!board[newRow][newCol]) {
        // Empty square
        moves.push({ row: newRow, col: newCol });
      } else {
        // Square has a piece
        if (board[newRow][newCol][0] !== color) {
          // Opponent's piece, can capture
          moves.push({ row: newRow, col: newCol });
        }
        break; // Can't move further in this direction
      }

      newRow += dRow;
      newCol += dCol;
    }
  }
}

// Get knight moves
function getKnightMoves(row, col, color, moves) {
  // All possible knight moves
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  for (const [dRow, dCol] of knightMoves) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      isInBoard(newRow, newCol) &&
      (!board[newRow][newCol] || board[newRow][newCol][0] !== color)
    ) {
      moves.push({ row: newRow, col: newCol });
    }
  }
}

// Get bishop moves
function getBishopMoves(row, col, color, moves) {
  // Directions: up-left, up-right, down-right, down-left
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  for (const [dRow, dCol] of directions) {
    let newRow = row + dRow;
    let newCol = col + dCol;

    while (isInBoard(newRow, newCol)) {
      if (!board[newRow][newCol]) {
        // Empty square
        moves.push({ row: newRow, col: newCol });
      } else {
        // Square has a piece
        if (board[newRow][newCol][0] !== color) {
          // Opponent's piece, can capture
          moves.push({ row: newRow, col: newCol });
        }
        break; // Can't move further in this direction
      }

      newRow += dRow;
      newCol += dCol;
    }
  }
}

// Get queen moves (combination of rook and bishop)
function getQueenMoves(row, col, color, moves) {
  getRookMoves(row, col, color, moves);
  getBishopMoves(row, col, color, moves);
}

// Get king moves
function getKingMoves(row, col, color, moves) {
  // All possible king moves
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue;

      const newRow = row + dRow;
      const newCol = col + dCol;

      if (
        isInBoard(newRow, newCol) &&
        (!board[newRow][newCol] || board[newRow][newCol][0] !== color)
      ) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
}

// Check if a position is in the board
function isInBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Get piece type from piece code
function getPieceType(code) {
  switch (code) {
    case "p":
      return "pawn";
    case "r":
      return "rook";
    case "n":
      return "knight";
    case "b":
      return "bishop";
    case "q":
      return "queen";
    case "k":
      return "king";
    default:
      return "";
  }
}

// Check if a player is in check
function isCheck(color) {
  // Find the king's position
  let kingRow = -1;
  let kingCol = -1;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === `${color}k`) {
        kingRow = row;
        kingCol = col;
        break;
      }
    }
    if (kingRow !== -1) break;
  }

  // Check if any opponent's piece can capture the king
  const opponentColor = color === "w" ? "b" : "w";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece[0] === opponentColor) {
        // Get all moves without considering check
        const moves = [];
        switch (piece[1]) {
          case "p":
            getPawnMoves(row, col, opponentColor, moves);
            break;
          case "r":
            getRookMoves(row, col, opponentColor, moves);
            break;
          case "n":
            getKnightMoves(row, col, opponentColor, moves);
            break;
          case "b":
            getBishopMoves(row, col, opponentColor, moves);
            break;
          case "q":
            getQueenMoves(row, col, opponentColor, moves);
            break;
          case "k":
            getKingMoves(row, col, opponentColor, moves);
            break;
        }

        // Check if any move can capture the king
        for (const move of moves) {
          if (move.row === kingRow && move.col === kingCol) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

// Check if a player is in checkmate
function isCheckmate(color) {
  // Check if the player is in check
  if (!isCheck(color)) return false;

  // Check if any move can get the player out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece[0] === color) {
        const moves = getValidMoves(row, col);
        if (moves.length > 0) {
          return false; // At least one legal move exists
        }
      }
    }
  }

  return true; // No legal moves, it's checkmate
}

// Event listeners
restartButton.addEventListener("click", initGame);

// Initialize the game
initGame();
