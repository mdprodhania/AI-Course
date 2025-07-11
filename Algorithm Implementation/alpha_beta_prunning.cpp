#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int cnt = 0;
// Alpha-Beta Pruning implementation
int alphaBeta(int depth, int nodeIndex, bool isMax,
              vector<int> &leaves, int height, int alpha, int beta)
{
    // Base case: reached a leaf node
    if (depth == height)
        return leaves[nodeIndex];

    if (isMax)
    {
        int best = -1000;
        // Left child
        int val = alphaBeta(depth + 1, nodeIndex * 2, false, leaves, height, alpha, beta);
        best = max(best, val);
        alpha = max(alpha, best);
        if (beta <= alpha)
        {
            cnt++;
            return best;
        } // Prune
        // Right child
        val = alphaBeta(depth + 1, nodeIndex * 2 + 1, false, leaves, height, alpha, beta);
        best = max(best, val);
        alpha = max(alpha, best);
        return best;
    }
    else
    {
        int best = 1000;
        // Left child
        int val = alphaBeta(depth + 1, nodeIndex * 2, true, leaves, height, alpha, beta);
        best = min(best, val);
        beta = min(beta, best);
        if (beta <= alpha)
        {
          
            return best;
        } // Prune
        // Right child
        val = alphaBeta(depth + 1, nodeIndex * 2 + 1, true, leaves, height, alpha, beta);
        best = min(best, val);
        beta = min(beta, best);
        return best;
    }
}

int main()
{
    int height;
    cout << "Enter height of the game tree (e.g., 3): ";
    cin >> height;

    int leafCount = 1 << height; // 2^height
    vector<int> leaves(leafCount);

    cout << "Enter " << leafCount << " leaf node values:\n";
    for (int i = 0; i < leafCount; ++i)
    {
        cin >> leaves[i];
    }

    int alpha = -1000, beta = 1000;
    int optimalValue = alphaBeta(0, 0, true, leaves, height, alpha, beta);

    cout << "Optimal value using Alpha-Beta Pruning: " << optimalValue << endl;
    cout << "Prunned nodes: " << cnt << endl;
    return 0;
}
