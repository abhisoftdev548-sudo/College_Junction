---
module: 14
topic: "14.2"
title: "Graph Traversal (BFS and DFS)"
slug: "graph-traversal"
difficulty: "Advanced"
prerequisites:
  - Graph Representation
  - Stacks and Queues
  - Recursion
estimated_minutes: 30
tags:
  - dsa
  - graphs
  - bfs
  - dfs
---

# 14.2 Graph Traversal (BFS and DFS)

## Overview

**Traversal** means visiting every vertex reachable from a start point. **DFS (depth-first search)** goes as deep as possible before backtracking (uses a stack/recursion); **BFS (breadth-first search)** explores level by level (uses a queue). These two routines underlie connected components, cycle detection, shortest paths in unweighted graphs, topological sort, and much more.

## Learning Objectives

After this lesson you will be able to:

- Implement DFS recursively and iteratively
- Implement BFS with a queue
- Count connected components
- Find shortest paths in unweighted graphs with BFS
- Detect cycles in undirected and directed graphs

## Core Concepts

### DFS (recursive)

```cpp
std::vector<bool> visited(n, false);

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v);
    }
}
```

### BFS (queue)

```cpp
void bfs(int start) {
    std::queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

Mark visited **when enqueuing** (not when dequeuing) to avoid re-processing.

### Connected components

```cpp
int components = 0;
for (int u = 0; u < n; ++u) {
    if (!visited[u]) {
        ++components;
        dfs(u);           // explores the whole component
    }
}
```

### Shortest path in an unweighted graph (BFS)

```cpp
std::vector<int> dist(n, -1);
std::queue<int> q;
dist[start] = 0;
q.push(start);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (dist[v] == -1) {       // unvisited
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}
```

BFS visits vertices in order of distance, so `dist[v]` is the shortest path length.

### Cycle detection

```cpp
// Undirected: an edge to an already-visited neighbour that isn't the parent
bool hasCycleUndirected(int u, int parent) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            if (hasCycleUndirected(v, u)) return true;
        } else if (v != parent) {
            return true;              // back edge → cycle
        }
    }
    return false;
}

// Directed: track "on the current recursion stack"
bool hasCycleDirected(int u) {
    state[u] = 1;                      // visiting
    for (int v : adj[u]) {
        if (state[v] == 1) return true;         // back edge
        if (state[v] == 0 && hasCycleDirected(v)) return true;
    }
    state[u] = 2;                      // done
    return false;
}
```

## Visual — DFS vs BFS

```
      0
     / \
    1   2
   / \   \
  3   4   5

 DFS (start 0): 0 → 1 → 3 → 4 → 2 → 5   (go deep first)
 BFS (start 0): 0 → 1 → 2 → 3 → 4 → 5   (level by level)
```

DFS uses a stack (or recursion); BFS uses a queue. Both visit every reachable vertex, but in different orders.

## Code Examples

### Example 1 — Count connected components

```cpp
#include <iostream>
#include <vector>

int main() {
    // ... build adj (n vertices)
    int components = 0;
    std::vector<bool> visited(n, false);
    std::function<void(int)> dfs = [&](int u) {
        visited[u] = true;
        for (int v : adj[u]) if (!visited[v]) dfs(v);
    };
    for (int u = 0; u < n; ++u)
        if (!visited[u]) { ++components; dfs(u); }
    std::cout << components;
}
```

### Example 2 — Shortest path length with BFS

```cpp
#include <queue>
#include <vector>

int shortestPath(const std::vector<std::vector<int>>& adj, int start, int target) {
    int n = adj.size();
    std::vector<int> dist(n, -1);
    std::queue<int> q;
    dist[start] = 0;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == target) return dist[u];
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return -1;   // unreachable
}
```

### Example 3 — Flood fill (DFS on a grid)

```cpp
void floodFill(std::vector<std::vector<int>>& grid, int r, int c, int newColor) {
    int oldColor = grid[r][c];
    if (oldColor == newColor) return;
    grid[r][c] = newColor;
    for (auto [dr, dc] : dirs) {
        int nr = r + dr, nc = c + dc;
        if (inside(nr, nc) && grid[nr][nc] == oldColor)
            floodFill(grid, nr, nc, newColor);
    }
}
```

## Common Mistakes

1. **Not marking visited when enqueuing** — the same vertex is pushed many times.
2. **DFS recursion depth** — deep graphs overflow the stack; use an iterative stack or increase limits.
3. **Forgetting to reset `visited`/`dist`** between multiple traversals.
4. **Cycle detection ignoring the parent** in undirected graphs — every tree edge looks like a cycle otherwise.
5. **BFS for weighted shortest path** — BFS only gives shortest paths in *unweighted* graphs.
6. **Confusing DFS and BFS order** — use a stack for DFS, a queue for BFS.

## Best Practices

- Use recursion for DFS on trees/small graphs; an explicit stack for deep graphs.
- Mark visited at enqueue time in BFS.
- Keep a `parent`/`dist` array when you need paths or distances.
- Use a 3-state array (unvisited/visiting/done) for directed cycle detection.
- For grids, index cells as `r * cols + c` or use `vector<vector<...>>`.

## Practice Questions

1. Traverse a graph with DFS and print vertices in DFS order.
2. Traverse with BFS and print vertices level by level.
3. Count the connected components of a graph.
4. Find the shortest path length between two vertices in an unweighted graph.
5. Detect a cycle in an undirected graph using the parent trick.

## Multiple Choice Questions (MCQs)

### Q1. BFS uses which data structure?
- a) Stack
- b) Queue
- c) Heap
- d) Trie

**Answer:** b

### Q2. In BFS, when should a vertex be marked visited?
- a) When dequeued
- b) When enqueued
- c) At the end
- d) Never

**Answer:** b

### Q3. BFS on an unweighted graph finds:
- a) The longest path
- b) The shortest path (in edges)
- c) A cycle
- d) The maximum degree

**Answer:** b

### Q4. In undirected cycle detection, you must ignore the edge back to:
- a) The root
- b) The parent vertex
- c) The smallest vertex
- d) A leaf

**Answer:** b

### Q5. DFS typically uses:
- a) A queue
- b) Recursion (or an explicit stack)
- c) A priority queue
- d) A hash set only

**Answer:** b

## Key Takeaways

- DFS = go deep (stack/recursion); BFS = go wide (queue).
- BFS gives shortest paths in unweighted graphs; mark visited at enqueue.
- Connected components = count DFS/BFS launches.
- Cycle detection: track parent (undirected) or recursion stack (directed).

## Next Topic

[14.3 Shortest Paths](lesson-14.3-shortest-paths.md)
