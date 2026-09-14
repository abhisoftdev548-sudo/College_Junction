---
module: 14
topic: "14.3"
title: "Shortest Paths"
slug: "shortest-paths"
difficulty: "Advanced"
prerequisites:
  - Graph Traversal
  - Heaps and Priority Queues
  - Graph Representation
estimated_minutes: 30
tags:
  - dsa
  - graphs
  - dijkstra
  - bellman-ford
  - floyd-warshall
---

# 14.3 Shortest Paths

## Overview

Finding the **shortest path** between vertices is one of the most important graph problems — routing, navigation, and network design all depend on it. Different algorithms apply depending on the graph: **Dijkstra** for non-negative weights, **Bellman-Ford** for graphs with negative edges, and **Floyd-Warshall** for all-pairs distances.

## Learning Objectives

After this lesson you will be able to:

- Run Dijkstra's algorithm with a priority queue
- Run Bellman-Ford and detect negative cycles
- Run Floyd-Warshall for all-pairs shortest paths
- Reconstruct the actual path (not just the distance)
- Choose the right algorithm for the graph's properties

## Core Concepts

### Dijkstra (non-negative weights)

```cpp
#include <queue>
#include <vector>

std::vector<int> dijkstra(int start, const std::vector<std::vector<std::pair<int,int>>>& adj) {
    int n = adj.size();
    std::vector<int> dist(n, INT_MAX);
    using P = std::pair<int,int>;                  // (distance, vertex)
    std::priority_queue<P, std::vector<P>, std::greater<P>> pq;

    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;                 // stale entry — skip
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {           // relax
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

Greedily expands the closest unvisited vertex; O((V + E) log V). Requires **non-negative** weights.

### Bellman-Ford (handles negative edges)

```cpp
std::vector<int> bellmanFord(int start, int n, const std::vector<Edge>& edges) {
    std::vector<int> dist(n, INT_MAX);
    dist[start] = 0;
    for (int i = 0; i < n - 1; ++i) {              // relax all edges V-1 times
        for (auto& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
                dist[e.v] = dist[e.u] + e.w;
        }
    }
    // one more pass → if anything improves, a negative cycle exists
    return dist;
}
```

O(V·E). Works with negative weights and detects negative cycles.

### Floyd-Warshall (all pairs)

```cpp
// dist[i][j] initialized to edge weight or INF (0 on diagonal)
for (int k = 0; k < n; ++k)
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            if (dist[i][k] + dist[k][j] < dist[i][j])
                dist[i][j] = dist[i][k] + dist[k][j];
```

O(V³). After the triple loop, `dist[i][j]` is the shortest distance for **every** pair.

### Reconstructing the path

Keep a `parent[v]` updated on every relaxation; then walk backwards from target:

```cpp
std::vector<int> path;
for (int v = target; v != -1; v = parent[v]) path.push_back(v);
std::reverse(path.begin(), path.end());
```

### Choosing the algorithm

| Graph | Algorithm |
|---|---|
| Unweighted | BFS |
| Non-negative weights | Dijkstra |
| Negative edges | Bellman-Ford |
| All pairs | Floyd-Warshall |

## Visual — Dijkstra's Greedy Expansion

```
 start 0, weights on edges
        (2)   (1)
   0 ──────► 1 ──────► 2
    \        ▲
     (5)     │ (1)
      \      │
       └──► 3

 settled order: 0 (d=0) → 1 (d=2) → 2 (d=3) → 3 (d=4)
 (via 1, not directly: 5 > 2+1 = 3 → 3 via 1 is better)
```

Each step finalizes the closest unsettled vertex and relaxes its edges — a "wavefront" of certainty.

## Code Examples

### Example 1 — Dijkstra from a source

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <climits>

int main() {
    // adj as vector<vector<pair<int,int>>>
    auto dist = dijkstra(0, adj);
    for (int i = 0; i < (int)dist.size(); ++i)
        std::cout << "0 → " << i << " = " << dist[i] << "\n";
}
```

### Example 2 — Detect a negative cycle

```cpp
bool hasNegativeCycle(int n, const std::vector<Edge>& edges) {
    std::vector<int> dist(n, 0);             // virtual source everywhere
    for (int i = 0; i < n - 1; ++i)
        for (auto& e : edges)
            if (dist[e.u] + e.w < dist[e.v])
                dist[e.v] = dist[e.u] + e.w;
    for (auto& e : edges)                    // one extra pass
        if (dist[e.u] + e.w < dist[e.v])
            return true;                     // still improving → negative cycle
    return false;
}
```

### Example 3 — All-pairs with Floyd-Warshall

```cpp
#include <vector>
#include <climits>

std::vector<std::vector<long long>> floyd(int n,
        const std::vector<std::vector<long long>>& w) {
    auto d = w;
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                if (d[i][k] < LLONG_MAX && d[k][j] < LLONG_MAX)
                    d[i][j] = std::min(d[i][j], d[i][k] + d[k][j]);
    return d;
}
```

## Common Mistakes

1. **Dijkstra with negative edges** — it can settle a vertex too early; use Bellman-Ford.
2. **Not skipping stale heap entries** — `if (d > dist[u]) continue;` is essential.
3. **Off-by-one in Bellman-Ford iterations** — relax exactly V−1 times, then one extra pass for the cycle check.
4. **Forgetting the diagonal zeros** in Floyd-Warshall — `dist[i][i] = 0`.
5. **`INT_MAX` overflow** — `dist[u] + w` overflows; use `long long` or guard with `!= INT_MAX`.
6. **Reconstructing without parent updates** — track parents during relaxation.

## Best Practices

- Pick the algorithm from the table: BFS / Dijkstra / Bellman-Ford / Floyd-Warshall.
- Use `long long` for distances to avoid overflow.
- Keep a `parent` array if you need the path, not just the length.
- Skip stale priority-queue entries with the `d > dist[u]` check.

## Practice Questions

1. Run Dijkstra on a weighted graph and print all distances from a source.
2. Implement Bellman-Ford and test it on a graph with a negative edge (but no negative cycle).
3. Detect whether a graph contains a negative-weight cycle.
4. Compute all-pairs shortest paths with Floyd-Warshall.
5. Reconstruct the shortest path from source to target and print the vertices.

## Multiple Choice Questions (MCQs)

### Q1. Dijkstra's algorithm requires:
- a) Negative weights
- b) Non-negative weights
- c) Unweighted edges
- d) A tree

**Answer:** b

### Q2. Dijkstra with a priority queue runs in:
- a) O(V·E)
- b) O((V + E) log V)
- c) O(V³)
- d) O(E²)

**Answer:** b

### Q3. Which algorithm handles negative edges (and detects negative cycles)?
- a) Dijkstra
- b) BFS
- c) Bellman-Ford
- d) Prim's

**Answer:** c

### Q4. Floyd-Warshall computes:
- a) Single-source shortest paths
- b) All-pairs shortest paths
- c) Minimum spanning tree
- d) Topological order

**Answer:** b

### Q5. In Dijkstra, a stale heap entry is skipped with:
- a) `if (d < dist[u]) continue;`
- b) `if (d > dist[u]) continue;`
- c) `if (d == 0) break;`
- d) No check is needed

**Answer:** b

## Key Takeaways

- Unweighted → BFS; non-negative → Dijkstra; negative → Bellman-Ford; all-pairs → Floyd-Warshall.
- Dijkstra uses a min-heap and the `d > dist[u]` stale check.
- Bellman-Ford relaxes V−1 times and detects negative cycles with an extra pass.
- Track parents to reconstruct paths; use `long long` distances.

## Next Topic

[14.4 Minimum Spanning Tree](lesson-14.4-minimum-spanning-tree.md)
