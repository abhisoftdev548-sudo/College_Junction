---
module: 16
topic: "16.4"
title: "Graphs and Traversal"
slug: "graphs-and-traversal"
difficulty: "Advanced"
prerequisites:
  - Hashing and HashMap Internals
estimated_minutes: 35
tags:
  - java
  - graphs
  - bfs
  - dfs
---

# 16.4 Graphs and Traversal

## Overview

A **graph** is a set of vertices (nodes) connected by edges — it models networks, maps, dependencies, and social graphs. The two fundamental traversals are **BFS** (breadth-first, level by level, shortest paths in unweighted graphs) and **DFS** (depth-first, exploring paths). This lesson covers representation and both traversals in Java.

## Learning Objectives

After this lesson you will be able to:

- Represent graphs with adjacency lists and matrices
- Implement BFS (iterative, with a queue)
- Implement DFS (recursive and iterative)
- Find shortest paths in unweighted graphs with BFS
- Detect connected components

## Core Concepts

### Representation — adjacency list

```java
Map<Integer, List<Integer>> adj = new HashMap<>();   // node → neighbors

void addEdge(int u, int v) {                         // undirected
    adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
    adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
}
```

An adjacency list stores each node's neighbors — memory-efficient (O(V + E)).

### Representation — adjacency matrix

```java
int[][] matrix = new int[n][n];
matrix[u][v] = 1;   // edge from u to v (or weight)
```

An adjacency matrix is O(V²) space — good for dense graphs, wasteful for sparse.

### BFS — level by level

```java
public static void bfs(Map<Integer, List<Integer>> adj, int start) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    visited.add(start);

    while (!queue.isEmpty()) {
        int u = queue.poll();
        System.out.print(u + " ");
        for (int v : adj.getOrDefault(u, List.of())) {
            if (visited.add(v)) queue.offer(v);
        }
    }
}
```

BFS uses a queue and visits nodes in **increasing distance** order — shortest paths in unweighted graphs.

### DFS — recursive

```java
public static void dfs(Map<Integer, List<Integer>> adj, int u, Set<Integer> visited) {
    visited.add(u);
    System.out.print(u + " ");
    for (int v : adj.getOrDefault(u, List.of())) {
        if (!visited.contains(v)) dfs(adj, v, visited);
    }
}
```

DFS dives deep along a path before backtracking — good for cycle detection, connectivity, topological sort.

### DFS — iterative (stack)

```java
public static void dfsIterative(Map<Integer, List<Integer>> adj, int start) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(start);

    while (!stack.isEmpty()) {
        int u = stack.pop();
        if (!visited.add(u)) continue;
        System.out.print(u + " ");
        for (int v : adj.getOrDefault(u, List.of())) {
            if (!visited.contains(v)) stack.push(v);
        }
    }
}
```

### Connected components

```java
int components = 0;
for (int node : adj.keySet()) {
    if (!visited.contains(node)) {
        components++;
        dfs(adj, node, visited);   // mark the whole component
    }
}
```

Count how many times you start a fresh DFS/BFS — that's the number of connected components.

### Shortest path (unweighted) with BFS

```java
public static int shortestPath(Map<Integer, List<Integer>> adj, int start, int target) {
    Deque<Integer> queue = new ArrayDeque<>();
    Map<Integer, Integer> dist = new HashMap<>();
    queue.offer(start);
    dist.put(start, 0);

    while (!queue.isEmpty()) {
        int u = queue.poll();
        if (u == target) return dist.get(u);
        for (int v : adj.getOrDefault(u, List.of())) {
            if (!dist.containsKey(v)) {
                dist.put(v, dist.get(u) + 1);
                queue.offer(v);
            }
        }
    }
    return -1;   // unreachable
}
```

## Visual — BFS vs DFS

```
 graph:  A ── B ── C
         │    │
         D ── E

 BFS (queue):  A B D C E   ← level by level
 DFS (stack):  A D E B C   ← depth first
```

BFS explores nearest first (shortest paths); DFS explores one branch fully before the next.

## Code Examples

### Example 1 — BFS

```java
import java.util.*;

public class BFS {
    public static void main(String[] args) {
        Map<Integer, List<Integer>> adj = buildGraph();
        bfs(adj, 0);   // 0 1 3 2 4
    }

    static Map<Integer, List<Integer>> buildGraph() {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        adj.put(0, List.of(1, 3));
        adj.put(1, List.of(0, 2));
        adj.put(2, List.of(1, 4));
        adj.put(3, List.of(0));
        adj.put(4, List.of(2));
        return adj;
    }

    static void bfs(Map<Integer, List<Integer>> adj, int start) {
        Set<Integer> visited = new HashSet<>();
        Deque<Integer> q = new ArrayDeque<>();
        q.offer(start);
        visited.add(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v : adj.getOrDefault(u, List.of()))
                if (visited.add(v)) q.offer(v);
        }
    }
}
```

### Example 2 — DFS (recursive)

```java
import java.util.*;

public class DFS {
    static void dfs(Map<Integer, List<Integer>> adj, int u, Set<Integer> visited) {
        visited.add(u);
        System.out.print(u + " ");
        for (int v : adj.getOrDefault(u, List.of()))
            if (!visited.contains(v)) dfs(adj, v, visited);
    }

    public static void main(String[] args) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        adj.put(0, List.of(1, 3));
        adj.put(1, List.of(0, 2));
        adj.put(2, List.of(1, 4));
        adj.put(3, List.of(0));
        adj.put(4, List.of(2));

        dfs(adj, 0, new HashSet<>());   // 0 1 2 4 3
    }
}
```

### Example 3 — Shortest path (unweighted)

```java
import java.util.*;

public class ShortestPath {
    public static int shortestPath(Map<Integer, List<Integer>> adj, int start, int target) {
        Deque<Integer> q = new ArrayDeque<>();
        Map<Integer, Integer> dist = new HashMap<>();
        q.offer(start);
        dist.put(start, 0);
        while (!q.isEmpty()) {
            int u = q.poll();
            if (u == target) return dist.get(u);
            for (int v : adj.getOrDefault(u, List.of())) {
                if (!dist.containsKey(v)) {
                    dist.put(v, dist.get(u) + 1);
                    q.offer(v);
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        adj.put(0, List.of(1));
        adj.put(1, List.of(0, 2, 3));
        adj.put(2, List.of(1, 3));
        adj.put(3, List.of(1, 2));
        System.out.println(shortestPath(adj, 0, 3));   // 2
    }
}
```

## Common Mistakes

1. **Forgetting the visited set** — infinite loops on cycles.
2. **BFS with a stack / DFS with a queue** — mixing them up changes the traversal.
3. **Unvisited/absent neighbors** — use `getOrDefault(u, List.of())`.
4. **Not marking a node visited when enqueueing** — duplicates in the queue.
5. **Matrix for sparse graphs** — wastes O(V²) memory; use adjacency lists.
6. **DFS recursion depth on large graphs** — may overflow the stack; prefer iterative DFS for deep graphs.

## Best Practices

- Use adjacency lists for sparse graphs; matrices for dense ones.
- Always track visited nodes.
- BFS for shortest paths (unweighted); DFS for connectivity/cycles.
- Mark visited when adding to the queue/stack, not when removing.
- Use iterative DFS for deep graphs to avoid stack overflow.

## Practice Questions

1. Build an adjacency-list graph and add undirected edges.
2. Traverse it with BFS and DFS and compare orders.
3. Find the shortest path between two nodes in an unweighted graph.
4. Count connected components.
5. Write iterative DFS and explain when to prefer it.

## Multiple Choice Questions (MCQs)

### Q1. An adjacency list stores:
- a) All pairs
- b) Each node's neighbors
- c) Only weights
- d) Only edges

**Answer:** b

### Q2. BFS uses:
- a) A stack
- b) A queue
- c) Recursion only
- d) A heap

**Answer:** b

### Q3. In an unweighted graph, BFS finds:
- a) Longest paths
- b) Shortest paths (by edge count)
- c) Cycles only
- d) Sorted nodes

**Answer:** b

### Q4. DFS is typically implemented with:
- a) A queue
- b) Recursion (or a stack)
- c) A heap
- d) A priority queue

**Answer:** b

### Q5. The visited set prevents:
- a) Sorting
- b) Infinite loops on cycles
- c) Shortest paths
- d) Memory usage

**Answer:** b

## Key Takeaways

- Graphs: vertices + edges; adjacency list (sparse) vs matrix (dense).
- BFS (queue) = level order, shortest paths; DFS (recursion/stack) = depth-first.
- Always track visited; mark when enqueueing.
- Connected components = count of fresh DFS/BFS starts.

## Next Topic

[16.5 Interview Prep and Course Wrap-Up](lesson-16.5-interview-prep-and-course-wrap-up.md)
