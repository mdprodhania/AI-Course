#include <bits/stdc++.h>
using namespace std;

// Function to perform Best First Search
vector<int> bestFirstSearch(vector<vector<int>> edges, int src, int target, int n) {
    vector<vector<pair<int, int>>> adj(n);
    for (auto& edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        adj[u].emplace_back(v, w);
        adj[v].emplace_back(u, w); // Undirected graph
    }

    vector<bool> visited(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

    pq.push({0, src});
    visited[src] = true;

    vector<int> path;

    while (!pq.empty()) {
        pair<int, int> top = pq.top();
        int cost = top.first;
        int node = top.second;
        pq.pop();

        path.push_back(node);

        if (node == target) break;
        for (auto &p : adj[node])
        {
            int neighbor = p.first;
            int weight = p.second;
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                pq.push({weight, neighbor});
            }
        }
    }

    return path;
}

int main() {
    int n, e;
    cout << "Enter number of nodes: ";
    cin >> n;

    cout << "Enter number of edges: ";
    cin >> e;

    vector<vector<int>> edgeList;
    cout << "Enter edges in the format u v w (u and v are nodes, w is weight):\n";
    for (int i = 0; i < e; ++i) {
        int u, v, w;
        cin >> u >> v >> w;
        edgeList.push_back({u, v, w});
    }

    int source, target;
    cout << "Enter source node: ";
    cin >> source;

    cout << "Enter target node: ";
    cin >> target;

    vector<int> path = bestFirstSearch(edgeList, source, target, n);

    cout << "Path from " << source << " to " << target << ": ";
    for (int node : path) cout << node << " ";
    cout << endl;

    return 0;
}
