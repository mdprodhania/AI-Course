#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main()
{
    // Get number of nodes and edges from user
    int n, e;
    cout << "Enter number of nodes and edges: ";
    cin >> n >> e;

    // Initialize heuristic values for each node and adjacency list representation of graph
    vector<int> heuristic(n);
    vector<vector<int>> graph(n);

    // Get heuristic values for each node (smaller values are better)
    cout << "Enter heuristic values:\n";
    for (int i = 0; i < n; ++i)
    {
        cin >> heuristic[i];
    }

    // Build graph from edge list
    cout << "Enter edges (u v):\n";
    for (int i = 0; i < e; ++i)
    {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v); // Directed edge from u to v
    }

    // Get search parameters
    int start, goal, beam_width;
    cout << "Enter start, goal, and beam width: ";
    cin >> start >> goal >> beam_width;

    // Initialize search queue with start node
    queue<int> q;
    q.push(start);

    // Begin beam search
    while (!q.empty())
    {
        // Collect all nodes at the current level
        vector<int> next_level;
        while (!q.empty())
        {
            int node = q.front();
            q.pop();

            // Check if current node is goal
            if (node == goal)
            {
                cout << "Goal found at node " << node << endl;
                return 0;
            }

            // Add all neighbors to next_level for evaluation
            next_level.insert(next_level.end(), graph[node].begin(), graph[node].end());
        }

        // Sort nodes by heuristic value (better nodes first)
        sort(next_level.begin(), next_level.end(), [&](int a, int b)
             { return heuristic[a] < heuristic[b]; });

        // Select the best k nodes (where k = beam_width)
        q = queue<int>();
        for (int i = 0; i < min(beam_width, (int)next_level.size()); ++i)
        {
            q.push(next_level[i]);
        }
    }

    // If search terminates without finding goal
    cout << "Goal not found within beam width.\n";
    return 0;
}