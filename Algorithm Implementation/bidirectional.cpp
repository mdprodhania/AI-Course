#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>

using namespace std;

pair<bool, int> bidirectionalSearch(int start, int target, vector<vector<int>> &graph)
{
    unordered_set<int> visitedStart, visitedTarget;
    queue<int> queueStart, queueTarget;

    queueStart.push(start);
    queueTarget.push(target);
    visitedStart.insert(start);
    visitedTarget.insert(target);

    int depth = 0;

    while (!queueStart.empty() && !queueTarget.empty())
    {
        int sizeStart = queueStart.size();
        int sizeTarget = queueTarget.size();

        for (int i = 0; i < sizeStart; i++)
        {
            int vertex = queueStart.front();
            queueStart.pop();

            if (visitedTarget.find(vertex) != visitedTarget.end())
            {
                return make_pair(true, depth);
            }

            for (int neighbor : graph[vertex])
            {
                if (visitedStart.find(neighbor) == visitedStart.end())
                {
                    queueStart.push(neighbor);
                    visitedStart.insert(neighbor);
                }
            }
        }

        for (int i = 0; i < sizeTarget; i++)
        {
            int vertex = queueTarget.front();
            queueTarget.pop();

            if (visitedStart.find(vertex) != visitedStart.end())
            {
                return make_pair(true, depth);
            }

            for (int neighbor : graph[vertex])
            {
                if (visitedTarget.find(neighbor) == visitedTarget.end())
                {
                    queueTarget.push(neighbor);
                    visitedTarget.insert(neighbor);
                }
            }
        }

        depth++;
    }

    return make_pair(false, -1);
}

int main()
{
    int numVertices, numEdges, startVertex, targetVertex;

    cout << "Enter the number of vertices: ";
    cin >> numVertices;

    vector<vector<int>> graph(numVertices);

    cout << "Enter the number of edges: ";
    cin >> numEdges;

    cout << "Enter the edges (vertex1 vertex2):\n";
    for (int i = 0; i < numEdges; i++)
    {
        int vertex1, vertex2;
        cin >> vertex1 >> vertex2;
        graph[vertex1].push_back(vertex2);
        graph[vertex2].push_back(vertex1);
    }

    cout << "Enter the starting vertex: ";
    cin >> startVertex;

    cout << "Enter the target vertex: ";
    cin >> targetVertex;

    pair<bool, int> result = bidirectionalSearch(startVertex, targetVertex, graph);

    if (result.first)
    {
        cout << "Target vertex found at depth " << result.second << endl;
    }
    else
    {
        cout << "Target vertex not found" << endl;
    }

    return 0;
}