#include <bits/stdc++.h>
using namespace std;

// Function to perform Best First Search
vector<int> bestFirstSearch(vector<vector<int>> edges, int src, int target, int n)
{
    // cout << "=== Starting Best First Search ===" << endl;
    // cout << "Source: " << src << ", Target: " << target << endl;

    // Adjacency list: adj[node] = vector of {neighbor, weight}
    vector<vector<pair<int, int>>> adj(n);
    for (auto &edge : edges)
    {
        int u = edge[0], v = edge[1], w = edge[2];
        adj[u].emplace_back(v, w);
        adj[v].emplace_back(u, w); // Undirected graph
    }

    // Print adjacency list
    // cout << "\n=== Adjacency List ===" << endl;
    // for (int i = 0; i < n; ++i) {
    //     cout << "Node " << i << " -> ";
    //     for (auto& p : adj[i]) {
    //         cout << "(" << p.first << ", w:" << p.second << ") ";
    //     }
    //     cout << endl;
    // }

    vector<bool> visited(n, false);
    // Min-heap: stores {cost, node}

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

    pq.push({0, src});
    visited[src] = true;

    vector<int> path;
    // int step = 1;

    // cout << "\n=== Search Progress ===" << endl;

    while (!pq.empty())
    {
        // cout << "\n--- Step " << step++ << " ---" << endl;

        // Get the node with the lowest cost
        pair<int, int> top = pq.top();
        int cost = top.first;
        int node = top.second;
        pq.pop();

        // cout << "Processing node " << node << " with cost " << cost << endl;

        path.push_back(node);

        if (node == target)
        {
            // cout << "Target node " << target << " found! Search complete." << endl;
            break;
        }

        // cout << "Checking neighbors of node " << node << ":" << endl;
        for (auto &p : adj[node])
        {
            int neighbor = p.first;
            int weight = p.second; if (!visited[neighbor])
            {
                visited[neighbor] = true;
                pq.push({weight, neighbor});
                cout << "  Added node " << neighbor << " to queue with cost " << weight << endl;
            }
            else
            {
                cout << "  Neighbor " << neighbor << " already visited, skipping" << endl;
            }
        }

        // // Show path progress
        // cout << "Current path: ";
        // for (int x : path) cout << x << " ";
        cout << endl;
    }

    // cout << "\n=== Search Finished ===" << endl;
    // cout << "Final path: ";
    // for (int x : path) cout << x << " ";
    // cout << endl;

    return path;
}

int main()
{
    int n = 14;
    vector<vector<int>> edgeList = {
        {0, 1, 3}, {0, 2, 6}, {0, 3, 5}, {1, 4, 9}, {1, 5, 8}, {2, 6, 12}, {2, 7, 14}, {3, 8, 7}, {8, 9, 5}, {8, 10, 6}, {9, 11, 1}, {9, 12, 10}, {9, 13, 2}};

    int source = 0;
    int target = 9;

    cout << "=== Best First Search Example ===" << endl;
    cout << "Graph has " << n << " nodes" << endl;

    vector<int> path = bestFirstSearch(edgeList, source, target, n);

    // cout << "\n=== Result ===" << endl;
    // cout << "Path from " << source << " to " << target << ": ";
    for (int node : path)
        cout << node << " ";
    cout << endl;

    return 0;
}