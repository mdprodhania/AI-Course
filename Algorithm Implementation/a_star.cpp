#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <functional>
#include <cmath>
#include <algorithm>

using namespace std;

// Hash function for pair<int, int>
struct pair_hash
{
    size_t operator()(const pair<int, int> &p) const
    {
        return hash<int>()(p.first) ^ (hash<int>()(p.second) << 1);
    }
};

// Function to calculate the Manhattan distance between two points
double manhattanDistance(pair<int, int> a, pair<int, int> b)
{
    return abs(a.first - b.first) + abs(a.second - b.second);
}

// A* Search Algorithm
pair<bool, vector<pair<int, int>>> aStarSearch(
    pair<int, int> start,
    pair<int, int> target,
    vector<vector<vector<pair<int, int>>>> &graph,
    function<double(pair<int, int>, pair<int, int>)> heuristic)
{
    unordered_map<pair<int, int>, double, pair_hash> cost;
    unordered_map<pair<int, int>, pair<int, int>, pair_hash> parent;
    priority_queue<pair<double, pair<int, int>>, vector<pair<double, pair<int, int>>>, greater<>> queue;

    cost[start] = 0;
    queue.push({heuristic(start, target), start});

    while (!queue.empty())
    {
        pair<int, int> current = queue.top().second;
        queue.pop();

        if (current == target)
        {
            vector<pair<int, int>> path;
            while (current != start)
            {
                path.push_back(current);
                current = parent[current];
            }
            path.push_back(start);
            reverse(path.begin(), path.end());
            return {true, path};
        }

        for (pair<int, int> neighbor : graph[current.first][current.second])
        {
            double newCost = cost[current] + 1; // Assuming unit cost
            if (cost.find(neighbor) == cost.end() || newCost < cost[neighbor])
            {
                cost[neighbor] = newCost;
                parent[neighbor] = current;
                queue.push({newCost + heuristic(neighbor, target), neighbor});
            }
        }
    }

    return {false, {}};
}

int main()
{
    int numRows, numCols;
    cout << "Enter number of rows: ";
    cin >> numRows;
    cout << "Enter number of columns: ";
    cin >> numCols;

    vector<vector<vector<pair<int, int>>>> graph(numRows, vector<vector<pair<int, int>>>(numCols));

    cout << "Enter adjacency (1 = connected, 0 = not):\n";
    for (int i = 0; i < numRows; i++)
    {
        for (int j = 0; j < numCols; j++)
        {
            for (int k = 0; k < numRows; k++)
            {
                for (int l = 0; l < numCols; l++)
                {
                    int connected;
                    cin >> connected;
                    if (connected == 1)
                    {
                        graph[i][j].push_back({k, l});
                    }
                }
            }
        }
    }

    int startRow, startCol, targetRow, targetCol;
    cout << "Enter start row and column: ";
    cin >> startRow >> startCol;
    cout << "Enter target row and column: ";
    cin >> targetRow >> targetCol;

    pair<int, int> start = {startRow, startCol};
    pair<int, int> target = {targetRow, targetCol};

    auto heuristic = manhattanDistance;

    auto result = aStarSearch(start, target, graph, heuristic);

    if (result.first)
    {
        cout << "Path found:\n";
        for (auto cell : result.second)
        {
            cout << "(" << cell.first << ", " << cell.second << ") ";
        }
        cout << endl;
    }
    else
    {
        cout << "No path found.\n";
    }

    return 0;
}
