#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 10;
vector<int> g[N];
bool visited[N];
int target;

bool dfs(int v, int depth, int maxDepth)
{
    if (depth > maxDepth)
        return false;

    visited[v] = true;
    cout << v << " ";
    if (v == target)
        return true;

    for (int child : g[v])
    {
        if (visited[child])
            continue;
        if (dfs(child, depth + 1, maxDepth))
            return true;
    }

    return false;
}

bool iddfs(int start, int maxDepth)
{
    for (int d = 0; d <= maxDepth; d++)
    {
        memset(visited, false, sizeof(visited));
        cout << "Depth " << d << ": ";
        if (dfs(start, 0, d))
        {
            cout << "\nTarget found at depth " << d << endl;
            return true;
        }
        cout << endl;
    }
    return false;
}

int main()
{
    int v, e, start;
    cout << "Enter number of vertices and edges: ";
    cin >> v >> e;
    cout << "Enter the edges (each as two vertex numbers):" << endl;
    for (int i = 0; i < e; i++)
    {
        int n1, n2;
        cin >> n1 >> n2;
        g[n1].push_back(n2);
        g[n2].push_back(n1);
    }

    int maxDepth;
    cout << "Enter start vertex, target vertex, and maximum depth: ";
    cin >> start >> target >> maxDepth;

    cout << "Iterative Deepening DFS traversal:" << endl;
    if (!iddfs(start, maxDepth))
    {
        cout << "Target vertex not found within the maximum depth." << endl;
    }

    return 0;
}
