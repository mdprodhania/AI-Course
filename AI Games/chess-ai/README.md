# Human vs AI Chess Game

A web-based chess game where you play as White against an AI opponent that uses the minimax algorithm with alpha-beta pruning. The AI can be set to different difficulty levels by adjusting the search depth.

## How to Run

Running this chess game is simple and requires no installation of additional software. Follow these steps:

### Method 1: Direct File Opening

1. **Download/Clone** the project files to your computer
2. **Navigate** to the `chess-ai` folder
3. **Open** the `index.html` file in any modern web browser:
   - **Windows**: Double-click `index.html` or right-click → "Open with" → Choose your browser
   - **Mac**: Double-click `index.html` or right-click → "Open With" → Choose your browser
   - **Linux**: Double-click `index.html` or use `xdg-open index.html` in terminal

## Prerequisites

This chess game requires **no additional software installation**. You only need:

### Required

- **Modern Web Browser**: Any recent version of:
  - Google Chrome (recommended)
  - Mozilla Firefox
  - Microsoft Edge
  - Safari
  - Opera

### Optional (for development)

- **Text Editor**: If you want to modify the code:
  - Visual Studio Code (recommended)
  - Any text editor

### No External Dependencies

- No libraries or frameworks required
- No internet connection needed (after downloading)
- No package managers (npm, yarn, etc.)
- No build tools or compilation step

## How to Play the Game

This is a classic chess game where you (White pieces) play against an AI opponent (Black pieces).

### Basic Rules

- **Objective**: Checkmate the opponent's king
- **You play as White** and always move first
- **AI plays as Black** and responds to your moves

### Making Moves

1. **Select a Piece**: Click on any of your white pieces
2. **See Valid Moves**: Legal moves are highlighted with small dots
3. **Make Your Move**: Click on any highlighted square to move your piece
4. **AI Response**: The AI will automatically make its move after yours

### Game Controls

- **Restart Button**: Start a new game at any time
- **Difficulty Selector**: Choose AI search depth:
  - Easy (Depth 1): AI looks 1 move ahead
  - Medium (Depth 2): AI looks 2 moves ahead (default)
  - Hard (Depth 3): AI looks 3 moves ahead

### Special Rules Implemented

- **Pawn Promotion**: Pawns reaching the opposite end automatically become queens
- **Check Detection**: You cannot make moves that leave your king in check
- **Checkmate**: Game ends when the king is in check with no legal moves
- **Stalemate**: Game ends in a draw when no legal moves exist but king isn't in check

## Algorithm Used

This chess game implements a sophisticated AI using the **Minimax Algorithm with Alpha-Beta Pruning**.

### Minimax Algorithm

The core AI decision-making algorithm that:

- **Creates a game tree** of possible moves up to a specified depth (1-3 moves ahead)
- **Alternates between players**: AI tries to maximize score, Human tries to minimize score
- **Evaluates positions** recursively until maximum depth is reached
- **Selects the best move** based on the assumption that both players play optimally

### Alpha-Beta Pruning

An optimization technique that:

- **Reduces search time** by eliminating branches that won't affect the final decision
- **Produces identical results** to pure minimax but significantly faster
- **Allows deeper search** in the same amount of time
- **Improves performance** from O(b^d) to O(b^(d/2)) in best case

### Position Evaluation

The AI evaluates chess positions using:

- **Material Count**: Assigns point values to pieces (Pawn: 10, Knight/Bishop: 30, Rook: 50, Queen: 90, King: 900)
- **Score Calculation**: AI pieces add to score, Human pieces subtract from score
- **Random Factor**: Small random element prevents repetitive play

### Algorithm Complexity

- **Time Complexity**: O(b^d) where b ≈ 35 (average chess branching factor), d = depth
- **With Alpha-Beta**: Average case O(b^(d/2)), significantly faster
- **Adjustable Difficulty**: Depth parameter (1-3) controls AI strength

## Screenshots

Below are screenshots showing the chess game in action:

### Main Game Interface

![Chess Game Main Interface](screenshots/chess-main.png)

_The main game interface showing the chess board with pieces in starting position_

### Key Features Shown

- **Clean Interface**: Modern, intuitive design
- **Visual Feedback**: Selected pieces highlighted, valid moves marked with dots
- **Status Updates**: Clear indication of game state and whose turn it is
- **Responsive Design**: Works well on different screen sizes
- **Professional Appearance**: Uses Unicode chess symbols for authentic look

_Note: Screenshots are stored in the `screenshots` folder within the project directory._

---

## Additional Resources

For detailed technical documentation, implementation details, and advanced topics, see:

- **[DETAILED_GUIDE.md](DETAILED_GUIDE.md)** - Comprehensive technical documentation with code explanations, advanced AI techniques, and implementation details.
