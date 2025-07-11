#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 10;
bool visited[N];
vector<int> g[N];
int target, maxDepth;
bool found = false;

void dfs(int v, int depth)
{
    if (depth > maxDepth || found)
        return;

    visited[v] = true;
    cout << v << " ";

    if (v == target)
    {
        found = true;
        return;
    }

    for (int child : g[v])
    {
        if (visited[child])
            continue;
        dfs(child, depth + 1);
    }
}

int main()
{
    int v, e;
    cout << "Enter number of vertices and edges: ";
    cin >> v >> e;
    cout << "Enter the edges (u v):\n";
    for (int i = 0; i < e; i++)
    {
        int n1, n2;
        cin >> n1 >> n2;
        g[n1].push_back(n2);
        g[n2].push_back(n1);
    }

    int start;
    cout << "Enter start node, target node, and max depth: ";
    cin >> start >> target >> maxDepth;

    dfs(start, 0);

    if (found)
        cout << "\nTarget found\n";
    else
        cout << "\nTarget not found within depth\n";
}
