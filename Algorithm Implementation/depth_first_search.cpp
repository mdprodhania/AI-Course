#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
bool visited[N];
vector<int> g[N];

void dfs(int v)
{
    // take action on vertex before entering the vertex
    visited[v] = true;
    cout << v << " ";
    for (int child : g[v])
    {
        if (visited[child])
            continue;
        // take action on child before entering the child node

        dfs(child);
        // take action on child after exiting the child node
    }
    // take action on vertex before exiting the vertex
}
int main()
{
    int v, e;
    cout << "Enter number of vertices and edges: ";
    cin >> v >> e;
    cout << "Enter edges (each as two space-separated vertices):" << endl;
    for (int i = 0; i < e; i++)
    {
        int n1, n2;
        cin >> n1 >> n2;
        g[n1].push_back(n2);
        g[n2].push_back(n1);
    }

    cout << "DFS traversal starting from node 1: ";
    dfs(1);
    cout << endl;
}
