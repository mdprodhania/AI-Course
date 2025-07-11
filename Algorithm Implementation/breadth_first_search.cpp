#include <bits/stdc++.h>
using namespace std;

const int N = 1e5 + 10;
vector<int> g[N];
bool visited[N];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int v = q.front();
        q.pop();
        cout << v << " ";

        for (int child : g[v]) {
            if (!visited[child]) {
                q.push(child);
                visited[child] = true;
            }
        }
    }
}

int main() {
    int v, e;
    cout << "Enter number of vertices and edges: ";
    cin >> v >> e;
    cout << "Enter each edge (two vertices per line):" << endl;
    for (int i = 0; i < e; i++) {
        int n1, n2;
        cin >> n1 >> n2;
        g[n1].push_back(n2);
        g[n2].push_back(n1);
    }

    cout << "BFS traversal: ";
    for (int i = 1; i <= v; i++) {
        if (!visited[i]) {
            bfs(i);
        }
    }
    cout << endl;

    return 0;
}
