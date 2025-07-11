#include <iostream>
using namespace std;

// The objective function to maximize
int f(int x)
{
    return -x * x + 10 * x;
}

// Hill Climbing algorithm
void hillClimbing(int start, int stepSize, int maxIterations)
{
    int current = start;
    int currentVal = f(current);

    for (int i = 0; i < maxIterations; i++)
    {
        int next = current + stepSize;
        int nextVal = f(next);

        cout << "Iteration " << i + 1 << ": x = " << current << ", f(x) = " << currentVal << endl;

        if (nextVal > currentVal)
        {
            current = next;
            currentVal = nextVal;
        }
        else
        {
            break; // No improvement, reached peak
        }
    }

    cout << "Hill Climbing stopped at x = " << current << " with value f(x) = " << currentVal << endl;
}

int main()
{
    int start, stepSize, maxIterations;

    cout << "Enter starting value of x: ";
    cin >> start;

    cout << "Enter step size: ";
    cin >> stepSize;

    cout << "Enter maximum number of iterations: ";
    cin >> maxIterations;

    hillClimbing(start, stepSize, maxIterations);

    return 0;
}
