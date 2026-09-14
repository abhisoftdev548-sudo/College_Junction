---
module: 14
topic: "14.4"
title: "Minimum Spanning Tree"
slug: "minimum-spanning-tree"
difficulty: "Advanced"
prerequisites:
  - Graph Representation
  - Heaps and Priority Queues
  - Disjoint Set Union
estimated_minutes: 30
tags:
  - dsa
  - graphs
  - mst
  - kruskal
  - prim
---

# 14.4 Minimum Spanning Tree

## Overview

A **spanning tree** of a connected graph is a subgraph that includes every vertex with the minimum number of edges (V−1) and no cycles. The **minimum spanning tree (MST)** is the spanning tree with the smallest total edge weight — the cheapest way to connect everything. MSTs solve network wiring, clustering, and circuit design problems.

## Learning Objectives

After this lesson you will be able to:

- Define a spanning tree and the MST
- Build an MST with **Kruskal's** algorithm (edge sorting + DSU)
- Build an MST with **Prim's** algorithm (priority queue)
- Compare the two algorithms
- Apply the "cut property" intuition behind MSTs

## Core Concepts

### Kruskal's algorithm (sort edges + DSU)

```cpp
// 1. Sort all edges by weight
// 2. Add an edge if it connects two different components (checked with DSU)
// 3. Stop after V-1 edges

int kruskal(int n, std::vector<Edge> edges) {
    std::sort(edges.begin(), edges.end(),
              [](const Edge& a, const Edge& b) { return a.w < b.w; });
    DSU dsu(n);
    int total = 0, count = 0;
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {   // different components → safe to add
            total += e.w;
            if (++count == n - 1) break;
        }
    }
    return total;
}
```

Greedy on edge weights; the DSU makes "does this edge create a cycle?" fast. O(E log E).

### Prim's algorithm (grow one tree)

```cpp
int prim(int n, const std::vector<std::vector<std::pair<int,int>>>& adj) {
    std::vector<bool> inTree(n, false);
    using P = std::pair<int,int>;   // (weight, vertex)
    std::priority_queue<P, std::vector<P>, std::greater<P>> pq;
    pq.push({0, 0});
    int total = 0, added = 0;
    while (!pq.empty() && added < n) {
        auto [w, u] = pq.top(); pq.pop();
        if (inTree[u]) continue;    // already connected
        inTree[u] = true;
        total += w;
        ++added;
        for (auto [v, w2] : adj[u])
            if (!inTree[v]) pq.push({w2, v});
    }
    return total;
}
```

Grows one tree from a start vertex, always adding the cheapest edge leaving the tree. O(E log V).

### The cut property (why greedy works)

For any cut (a partition of vertices into two groups), the **minimum-weight edge crossing the cut is always part of some MST**. Both Kruskal and Prim repeatedly exploit this fact.

### Kruskal vs Prim

| | Kruskal | Prim |
|---|---|---|
| Data | edge list | adjacency list |
| Structure | sort + DSU | priority queue |
| Complexity | O(E log E) | O(E log V) |
| Best for | sparse graphs | dense graphs |

## Visual — Building an MST

```
 edges sorted: (2,3,4), (0,1,2), (1,2,3), (0,3,5), (2,3,1)...

 Kruskal: pick cheapest that doesn't make a cycle
  1. (2,3,1) ✓
  2. (0,1,2) ✓
  3. (1,2,3) ✓   (now 0-1-2-3 all connected)
  stop after V-1 = 3 edges → total weight 6
```

The result is the cheapest set of V−1 edges that still connects every vertex.

## Code Examples

### Example 1 — Kruskal's MST

```cpp
#include <algorithm>
#include <vector>

struct Edge { int u, v, w; };

int mstWeight(int n, std::vector<Edge> edges) {
    std::sort(edges.begin(), edges.end(),
              [](const Edge& a, const Edge& b) { return a.w < b.w; });
    DSU dsu(n);
    int total = 0, used = 0;
    for (const auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total += e.w;
            if (++used == n - 1) break;
        }
    }
    return total;   // (if used < n-1, the graph was disconnected)
}
```

### Example 2 — Prim's MST

```cpp
#include <queue>
#include <vector>

int prim(int n, const std::vector<std::vector<std::pair<int,int>>>& adj) {
    std::vector<bool> inTree(n, false);
    using P = std::pair<int,int>;
    std::priority_queue<P, std::vector<P>, std::greater<P>> pq;
    pq.push({0, 0});
    int total = 0, added = 0;
    while (!pq.empty() && added < n) {
        auto [w, u] = pq.top(); pq.pop();
        if (inTree[u]) continue;
        inTree[u] = true;
        total += w;
        ++added;
        for (auto [v, w2] : adj[u])
            if (!inTree[v]) pq.push({w2, v});
    }
    return total;
}
```

### Example 3 — Check if an edge is "safe" (cut property)

```cpp
// Any minimum edge crossing a cut is in some MST — this is the
// invariant that makes both Kruskal's and Prim's greedy choices correct.
```

## Common Mistakes

1. **Forgetting to skip edges already in the same component** — Kruskal must ignore edges whose endpoints are already united.
2. **Not stopping at V−1 edges** — extra edges create a cycle.
3. **Prim without the `inTree` check** — stale heap entries get processed twice.
4. **MST vs shortest path confusion** — MST minimizes total edge weight; it does **not** minimize any single path.
5. **Assuming the graph is connected** — a disconnected graph has no spanning tree (used < V−1 signals it).
6. **Sorting comparator on the wrong field** — sort by weight (`w`), not by vertex id.

## Best Practices

- Use Kruskal for sparse graphs (edge list + DSU), Prim for dense graphs (adjacency list + heap).
- Skip stale/invalid candidates with `inTree`/DSU checks.
- Track how many edges you've added; stop at V−1.
- Remember the distinction: MST connects everything cheaply; shortest path optimizes one route.

## Practice Questions

1. Implement Kruskal's MST and test it on a small weighted graph.
2. Implement Prim's MST with a priority queue.
3. Explain why a minimum spanning tree always has exactly V−1 edges.
4. Build the MST of a given graph and print its total weight and edges.
5. Explain the cut property in your own words with a small diagram.

## Multiple Choice Questions (MCQs)

### Q1. A spanning tree of a connected graph with V vertices has:
- a) V edges
- b) V−1 edges
- c) V+1 edges
- d) E edges

**Answer:** b

### Q2. Kruskal's algorithm uses:
- a) A priority queue only
- b) Edge sorting + disjoint set union
- c) A stack
- d) Topological sort

**Answer:** b

### Q3. Prim's algorithm grows:
- a) Multiple trees at once
- b) One tree from a start vertex
- c) Only cycles
- d) The edge list

**Answer:** b

### Q4. An edge is skipped in Kruskal when its endpoints are:
- a) Both leaves
- b) Already in the same component
- c) Both unvisited
- d) The same weight

**Answer:** b

### Q5. The MST minimizes:
- a) The longest path
- b) The total edge weight connecting all vertices
- c) The number of edges
- d) The shortest path between two nodes

**Answer:** b

## Key Takeaways

- MST = cheapest V−1 edges connecting all vertices, no cycles.
- Kruskal: sort edges, add if they join different components (DSU). O(E log E).
- Prim: grow one tree with a min-heap. O(E log V).
- The cut property justifies both greedy algorithms.

## Next Topic

[14.5 Disjoint Set Union (Union-Find)](lesson-14.5-disjoint-set-union.md)
