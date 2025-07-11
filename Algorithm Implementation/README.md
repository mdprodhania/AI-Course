# AI Search & Optimization Algorithms

This directory showcases a variety of search, game, and optimization algorithms coded in C++. The examples are designed for learning, experimentation, and as a foundation for more advanced AI projects.

## Contents
- Search Strategies
- Game Algorithms
- Optimization Methods
- How to Run
- Building the Code

---

## Search Strategies

### Breadth-First Search (BFS)
- Explores all nodes at the current depth before moving deeper
- Utilizes a queue for node management
- Finds shortest paths in unweighted graphs
- Common uses: tree traversals, social networks, web crawlers

### Depth-First Search (DFS)
- Dives deep into each branch before backtracking
- Uses recursion or a stack
- Useful for puzzles, cycle detection, and connected components

### Depth-Limited & Iterative Deepening
- DFS with a depth cap to avoid infinite loops
- Iterative deepening increases the limit until a solution is found
- Ideal for game trees and unknown solution depths

### Best-First & A* Search
- Prioritize nodes using heuristics
- A* combines path cost and heuristic for optimal solutions
- Used in navigation, games, and robotics

### Bidirectional & Beam Search
- Bidirectional: simultaneous search from start and goal
- Beam: keeps only the top k candidates at each level
- Efficient for large graphs and resource-limited tasks

---

## Game Algorithms

### Minimax & Alpha-Beta Pruning
- Minimax: evaluates game trees for two-player games
- Alpha-Beta: skips unnecessary branches to speed up Minimax
- Applied in chess, tic-tac-toe, and other board games

---

## Optimization Methods

### Hill Climbing
- Moves to the best neighboring state
- May get stuck at local optima
- Used in parameter tuning and combinatorial problems

---

## How to Use
- Each algorithm is a separate C++ file
- Select and compile the desired file
- Run with suitable input (see file comments for details)

## Building
Compile with:
```bash
g++ -o output_name source_file.cpp
```
Example:
```bash
g++ -o bfs breadth_first_search.cpp
g++ -o a_star a_star.cpp
```

---

## Additional Notes
- "Dry run" files provide step-by-step execution for learning
- Standard C++ libraries are used throughout
- Input formats may differ; refer to code comments

## Contributions
- Add new algorithms, improve code, or expand documentation

---

_This collection is a practical resource for anyone interested in the mechanics of AI search and optimization algorithms._
