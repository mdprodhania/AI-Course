#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>

using namespace std;

// Function declaration for reconstructPath
vector<int> reconstructPath(unordered_map<int, int> &parentStart, unordered_map<int, int> &parentTarget, int meetingPoint);

pair<bool, vector<int>> bidirectionalSearch(int start, int target, vector<vector<int>> &graph)
{
    unordered_set<int> visitedStart, visitedTarget;
    queue<int> queueStart, queueTarget;
    unordered_map<int, int> parentStart, parentTarget;

    queueStart.push(start);
    queueTarget.push(target);
    visitedStart.insert(start);
    visitedTarget.insert(target);
    parentStart[start] = -1;   // Start node has no parent
    parentTarget[target] = -1; // Target node has no parent when searching backwards

    int depth = 0;
    int meetingPoint = -1;

    while (!queueStart.empty() && !queueTarget.empty())
    {
        int sizeStart = queueStart.size();
        int sizeTarget = queueTarget.size();

        // Forward search from start
        for (int i = 0; i < sizeStart; i++)
        {
            int vertex = queueStart.front();
            queueStart.pop();

            if (visitedTarget.find(vertex) != visitedTarget.end())
            {
                meetingPoint = vertex;
                vector<int> path = reconstructPath(parentStart, parentTarget, meetingPoint);
                return make_pair(true, path);
            }

            for (int neighbor : graph[vertex])
            {
                if (visitedStart.find(neighbor) == visitedStart.end())
                {
                    queueStart.push(neighbor);
                    visitedStart.insert(neighbor);
                    parentStart[neighbor] = vertex;
                }
            }
        }

        // Backward search from target
        for (int i = 0; i < sizeTarget; i++)
        {
            int vertex = queueTarget.front();
            queueTarget.pop();

            if (visitedStart.find(vertex) != visitedStart.end())
            {
                meetingPoint = vertex;
                vector<int> path = reconstructPath(parentStart, parentTarget, meetingPoint);
                return make_pair(true, path);
            }

            for (int neighbor : graph[vertex])
            {
                if (visitedTarget.find(neighbor) == visitedTarget.end())
                {
                    queueTarget.push(neighbor);
                    visitedTarget.insert(neighbor);
                    parentTarget[neighbor] = vertex;
                }
            }
        }

        depth++;
    }

    return make_pair(false, vector<int>());
}

vector<int> reconstructPath(unordered_map<int, int> &parentStart, unordered_map<int, int> &parentTarget, int meetingPoint)
{
    // Build path from start to meeting point
    vector<int> pathStart;
    int current = meetingPoint;
    while (current != -1)
    {
        pathStart.push_back(current);
        current = parentStart[current];
    }

    // Reverse to get path from start to meeting point
    reverse(pathStart.begin(), pathStart.end());

    // Build path from meeting point to target
    vector<int> pathEnd;
    current = parentTarget[meetingPoint];
    while (current != -1)
    {
        pathEnd.push_back(current);
        current = parentTarget[current];
    }

    // Combine both paths
    vector<int> completePath = pathStart;
    completePath.insert(completePath.end(), pathEnd.begin(), pathEnd.end());

    return completePath;
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

    pair<bool, vector<int>> result = bidirectionalSearch(startVertex, targetVertex, graph);

    if (result.first)
    {
        cout << "Target vertex found!" << endl;
        cout << "Path: ";
        for (int vertex : result.second)
        {
            cout << vertex << " ";
        }
        cout << endl;
        cout << "Path length: " << result.second.size() - 1 << endl;
    }
    else
    {
        cout << "Target vertex not found" << endl;
    }

    return 0;
}