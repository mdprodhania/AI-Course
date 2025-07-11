#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int alphaBeta(int depth, int nodeIndex, bool isMax,
              vector<int> &leaves, int height, int alpha, int beta)
{
    // Print function call details
    cout << "Call -> depth: " << depth
         << ", nodeIndex: " << nodeIndex
         << ", isMax: " << (isMax ? "Max" : "Min")
         << ", alpha: " << alpha
         << ", beta: " << beta << endl;

    // Base case: if we reached the leaf node
    if (depth == height) {
        cout << "  Leaf reached. Returning leaves[" << nodeIndex << "] = " << leaves[nodeIndex] << endl;
        return leaves[nodeIndex];
    }

    if (isMax) {
        int best = -1000; // Maximize the value

        // Left child
        int val = alphaBeta(depth + 1, nodeIndex * 2, false, leaves, height, alpha, beta);
        best = max(best, val);
        alpha = max(alpha, best); // Update alpha

        // Pruning condition
        if (beta <= alpha) {
            cout << "  Pruning right child at Max node. (beta <= alpha)\n";
            return best;
        }

        // Right child
        val = alphaBeta(depth + 1, nodeIndex * 2 + 1, false, leaves, height, alpha, beta);
        best = max(best, val);
        alpha = max(alpha, best); // Update alpha

        cout << "  Returning from Max node: " << best << endl;
        return best;
    }
    else {
        int best = 1000; // Minimize the value

        // Left child
        int val = alphaBeta(depth + 1, nodeIndex * 2, true, leaves, height, alpha, beta);
        best = min(best, val);
        beta = min(beta, best); // Update beta

        // Pruning condition
        if (beta <= alpha) {
            cout << "  Pruning right child at Min node. (beta <= alpha)\n";
            return best;
        }

        // Right child
        val = alphaBeta(depth + 1, nodeIndex * 2 + 1, true, leaves, height, alpha, beta);
        best = min(best, val);
        beta = min(beta, best); // Update beta

        cout << "  Returning from Min node: " << best << endl;
        return best;
    }
}

int main()
{
    // Height of the tree (depth of the game tree)
    int height = 2;
    // Leaf nodes values
    vector<int> leaves = {3, 5, 2, 9};

    // Initial alpha and beta values
    int alpha = -1000, beta = 1000;

    // Call alphaBeta function starting from depth 0 and root node index 0
    int optimalValue = alphaBeta(0, 0, true, leaves, height, alpha, beta);

    // Output the optimal value after Alpha-Beta Pruning
    cout << "Optimal value using Alpha-Beta Pruning: " << optimalValue << endl;


}