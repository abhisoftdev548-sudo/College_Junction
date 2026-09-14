---
module: 14
topic: "14.1"
title: "Graph Representation"
slug: "graph-representation"
difficulty: "Advanced"
prerequisites:
  - STL Containers
  - Vectors and Sequence Containers
estimated_minutes: 30
tags:
  - dsa
  - graphs
  - adjacency-list
---

# 14.1 Graph Representation

## Overview

A **graph** is a set of **vertices (nodes)** connected by **edges**. Graphs model networks, maps, social connections, dependencies, and almost any relationship. Before any graph algorithm, you must **represent** the graph in memory — and the choice of representation (adjacency matrix vs adjacency list vs edge list) determines the efficiency of everything that follows.

## Learning Objectives

After this lesson you will be able to:

- Define directed vs undirected, weighted vs unweighted graphs
- Represent graphs with an adjacency list, matrix, and edge list
- Choose the right representation for the problem and constraints
- Store weighted edges and iterate neighbours efficiently
- State the space/time trade-offs of each representation

## Core Concepts

### Graph terminology

- **Vertex (node)** — an entity (e.g. a city).
- **Edge** — a connection (e.g. a road). May be **directed** (one-way) or **undirected** (two-way).
- **Weighted** — edges carry a cost/distance.
- **Degree** — number of edges touching a vertex.

### Adjacency list (usually the best)

```cpp
#include <vector>

int n = 5;                                 // number of vertices
std::vector<std::vector<int>> adj(n);      // adj[u] = neighbours of u

void addEdge(int u, int v) {               // undirected
    adj[u].push_back(v);
    adj[v].push_back(u);
}

void addDirectedEdge(int u, int v) {       // directed
    adj[u].push_back(v);
}
```

For weighted edges, store pairs:

```cpp
std::vector<std::vector<std::pair<int,int>>> adj(n);   // (neighbour, weight)
adj[u].push_back({v, w});
```

### Adjacency matrix

```cpp
std::vector<std::vector<int>> mat(n, std::vector<int>(n, 0));
mat[u][v] = 1;        // edge u→v (or mat[u][v] = w for weighted)
```

`mat[u][v]` answers "is there an edge?" in O(1), but uses O(V²) memory — fine only for dense graphs or small n.

### Edge list

```cpp
struct Edge { int u, v, w; };

std::vector<Edge> edges;
edges.push_back({0, 1, 5});   // edge 0→1 with weight 5
```

Compact and natural for algorithms that process edges directly (Kruskal's MST, Bellman-Ford).

### Choosing a representation

| Representation | Space | Edge check | Iterate neighbours | Best for |
|---|---|---|---|---|
| Adjacency list | O(V + E) | O(degree) | O(degree) | sparse graphs, BFS/DFS/Dijkstra |
| Adjacency matrix | O(V²) | O(1) | O(V) | dense graphs, Floyd-Warshall |
| Edge list | O(E) | O(E) | O(E) | MST, Bellman-Ford |

## Visual — The Same Graph, Three Ways

```
  undirected, unweighted:
    0 — 1
    |   |
    2 — 3

 adjacency list:            adjacency matrix:
  0: [1, 2]                   0 1 2 3
  1: [0, 3]                 0 0 1 1 0
  2: [0, 3]                 1 1 0 0 1
  3: [1, 2]                 2 1 0 0 1
                             3 0 1 1 0

 edge list: [(0,1), (0,2), (1,3), (2,3)]
```

All three describe the identical graph; each makes a different operation fast.

## Code Examples

### Example 1 — Read a graph and print neighbours

```cpp
#include <iostream>
#include <vector>

int main() {
    int n, m;                       // n vertices, m edges
    std::cin >> n >> m;
    std::vector<std::vector<int>> adj(n);
    for (int i = 0; i < m; ++i) {
        int u, v;
        std::cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);        // undirected
    }
    for (int u = 0; u < n; ++u) {
        std::cout << u << ": ";
        for (int v : adj[u]) std::cout << v << " ";
        std::cout << "\n";
    }
}
```

### Example 2 — Weighted adjacency list

```cpp
#include <vector>
#include <utility>

using Edge = std::pair<int,int>;              // (to, weight)

std::vector<std::vector<Edge>> buildWeighted(int n,
        const std::vector<std::tuple<int,int,int>>& edges) {
    std::vector<std::vector<Edge>> adj(n);
    for (auto [u, v, w] : edges) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});             // undirected weighted
    }
    return adj;
}
```

### Example 3 — Convert edge list to adjacency matrix

```cpp
std::vector<std::vector<int>> toMatrix(int n, const std::vector<Edge>& edges) {
    std::vector<std::vector<int>> mat(n, std::vector<int>(n, 0));
    for (const auto& e : edges) {
        mat[e.u][e.v] = 1;
        mat[e.v][e.u] = 1;                    // undirected
    }
    return mat;
}
```

## Common Mistakes

1. **Forgetting the reverse edge** for undirected graphs — traversal will miss half the connections.
2. **0-based vs 1-based indexing** — many problem statements number vertices from 1; adjust or use `n + 1` arrays.
3. **Using a matrix for a sparse graph** — O(V²) memory blows up for V = 10⁵.
4. **Self-loops and parallel edges** — know whether the problem allows them; adjacency lists handle duplicates, matrices collapse them.
5. **Storing weights but iterating as unweighted** — keep `(to, weight)` pairs consistent.
6. **Adjacency matrix as `bool` where weights are needed** — use `int`/`long long` for weighted matrices.

## Best Practices

- Default to an **adjacency list** — it's the right answer for most problems.
- Use `vector<vector<pair<int,int>>>` for weighted graphs.
- Use an edge list for Kruskal/Bellman-Ford; a matrix for Floyd-Warshall/dense graphs.
- Normalize to 0-based indexing early in the solution.
- Name variables clearly: `adj`, `n`, `m`, `u`, `v`, `w`.

## Practice Questions

1. Read an undirected graph and print each vertex's degree.
2. Represent the same graph as a list, matrix, and edge list, and verify they agree.
3. Build a weighted directed graph from an edge list and print each vertex's outgoing neighbours with weights.
4. Write a function that checks (with a matrix) whether an edge u→v exists in O(1).
5. For n = 10⁵ with a sparse graph, explain which representation you'd choose and why.

## Multiple Choice Questions (MCQs)

### Q1. An adjacency list uses space:
- a) O(V²)
- b) O(V + E)
- c) O(E²)
- d) O(1)

**Answer:** b

### Q2. Checking "is there an edge u→v?" is O(1) with:
- a) An adjacency list
- b) An edge list
- c) An adjacency matrix
- d) A stack

**Answer:** c

### Q3. For an undirected edge (u, v), you must add:
- a) Only `adj[u].push_back(v)`
- b) Both `adj[u].push_back(v)` and `adj[v].push_back(u)`
- c) Only the weight
- d) Nothing

**Answer:** b

### Q4. Kruskal's MST algorithm is most natural with:
- a) An adjacency matrix
- b) An edge list
- c) A binary tree
- d) A trie

**Answer:** b

### Q5. A weighted adjacency list stores each neighbour as:
- a) Just an index
- b) A `(to, weight)` pair
- c) A boolean
- d) A string

**Answer:** b

## Key Takeaways

- Graphs = vertices + edges; directed/undirected, weighted/unweighted.
- Adjacency list (O(V+E)) is the default; matrix (O(V²)) for dense/edge-checks; edge list for edge-processing algorithms.
- Undirected edges must be added both ways; watch 0-based vs 1-based indexing.

## Next Topic

[14.2 Graph Traversal (BFS and DFS)](lesson-14.2-graph-traversal.md)
