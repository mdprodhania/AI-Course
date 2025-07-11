#include<bits/stdc++.h>
using namespace std;

vector<int> leaves; // Global declaration of leaves

// Minimax function
int minimax(int depth, int nodeIndex, bool isMax, int height)
{
    // Base case: leaf node
    if (depth == height)
        return leaves[nodeIndex];

    if (isMax)
    {
        // Maximizer's move
        return max(
            minimax(depth + 1, nodeIndex * 2, false, height),
            minimax(depth + 1, nodeIndex * 2 + 1, false, height));
    }
    else
    {
        // Minimizer's move
        return min(
            minimax(depth + 1, nodeIndex * 2, true, height),
            minimax(depth + 1, nodeIndex * 2 + 1, true, height));
    }
}

int main()
{
    int height;
    cout << "Enter height of the game tree (e.g., 3): ";
    cin >> height;

    int leafCount = 1 << height; // 2^height
    leaves.resize(leafCount);

    cout << "Enter " << leafCount << " leaf node values (game scores):\n";
    for (int i = 0; i < leafCount; ++i)
    {
        cin >> leaves[i];
    }

    int optimalValue = minimax(0, 0, true, height);
    cout << "Optimal value using Minimax: " << optimalValue << endl;

    return 0;
}
