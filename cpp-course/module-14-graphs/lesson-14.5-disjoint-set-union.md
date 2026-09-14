---
module: 14
topic: "14.5"
title: "Disjoint Set Union (Union-Find)"
slug: "disjoint-set-union"
difficulty: "Advanced"
prerequisites:
  - Vectors and Sequence Containers
  - Minimum Spanning Tree
estimated_minutes: 30
tags:
  - dsa
  - union-find
  - dsu
---

# 14.5 Disjoint Set Union (Union-Find)

## Overview

**Disjoint Set Union (DSU)**, also called Union-Find, maintains a collection of **disjoint sets** and answers two questions fast: are these two elements in the same set? (find) and merge two sets into one (union). With **path compression** and **union by size/rank**, both operations are nearly **O(1)** (inverse-Ackermann). DSU powers Kruskal's MST, connectivity queries, and dynamic grouping.

## Learning Objectives

After this lesson you will be able to:

- Explain the parent-array and tree-of-sets model
- Implement `find` with **path compression**
- Implement `union` with **union by size/rank**
- Answer connectivity queries in near-O(1)
- Count connected components dynamically

## Core Concepts

### The model

```cpp
struct DSU {
    std::vector<int> parent, sz;

    DSU(int n) : parent(n), sz(n, 1) {
        for (int i = 0; i < n; ++i) parent[i] = i;   // each element its own set
    }

    int find(int x) {
        if (parent[x] == x) return x;          // root of its set
        return parent[x] = find(parent[x]);    // path compression
    }

    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;              // already same set
        if (sz[a] < sz[b]) std::swap(a, b);    // union by size
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }

    bool connected(int a, int b) { return find(a) == find(b); }
};
```

### find with path compression

Every `find(x)` makes every node on the path point **directly at the root**, flattening the tree:

```cpp
return parent[x] = find(parent[x]);   // memoize the root on the way up
```

After enough finds, the tree is nearly flat — making subsequent operations nearly O(1).

### union by size (or rank)

Always attach the **smaller** set under the **larger** one, keeping trees shallow:

```cpp
if (sz[a] < sz[b]) std::swap(a, b);
parent[b] = a;
sz[a] += sz[b];
```

### Complexity

With both optimizations, `find`/`unite` are amortized **O(α(n))** — the inverse Ackermann function, effectively constant for any realistic n.

### Counting components

```cpp
int components = n;
for (auto& e : edges)
    if (dsu.unite(e.u, e.v)) --components;   // each successful union merges two sets
```

## Visual — Find, Path Compression, Union

```
  find(4) with path compression:

  before:  1 ← 2 ← 3 ← 4           find(4) walks up to root 1
  after:   1 ← 2                   and rewires 4 (and 3) to point at 1
           ↑   ↑
           3   4

  union by size: attach the SMALLER tree under the LARGER root
   rootA (size 5)  ←  rootB (size 2)
```

Both optimizations keep the forest flat, which is the entire trick to near-O(1) performance.

## Code Examples

### Example 1 — Dynamic connectivity

```cpp
#include <iostream>
#include <vector>

int main() {
    DSU dsu(6);
    dsu.unite(0, 1);
    dsu.unite(1, 2);
    dsu.unite(3, 4);

    std::cout << dsu.connected(0, 2);   // 1 (same set)
    std::cout << dsu.connected(0, 3);   // 0 (different sets)
    dsu.unite(2, 3);
    std::cout << dsu.connected(0, 4);   // 1 (now merged)
}
```

### Example 2 — Count connected components

```cpp
int countComponents(int n, const std::vector<std::pair<int,int>>& edges) {
    DSU dsu(n);
    int comps = n;
    for (auto [u, v] : edges)
        if (dsu.unite(u, v)) --comps;
    return comps;
}
```

### Example 3 — Find the size of a set

```cpp
int setSize(DSU& dsu, int x) {
    return dsu.sz[dsu.find(x)];   // size stored at the root
}
```

## Common Mistakes

1. **Forgetting to initialize `parent[i] = i`** — every element must start as its own root.
2. **`find` without path compression** — trees grow tall and operations degrade to O(n).
3. **Union by size without swapping** — attaching the big tree under the small one deepens the tree.
4. **Comparing `a` and `b` before finding their roots** — always `find` both first.
5. **Returning the wrong value from `unite`** — return whether a merge actually happened (used to count components).
6. **Recursive `find` on deep trees** — with path compression it's fine, but an iterative version avoids stack limits in edge cases.

## Best Practices

- Always implement both path compression and union by size/rank.
- Store set size at the root; update it only on successful unions.
- Use `unite`'s return value to detect cycles (Kruskal) or count components.
- Prefer a struct (`DSU`) so the invariants live in one place.

## Practice Questions

1. Implement a `DSU` struct with `find`, `unite`, and `connected`.
2. Process a list of edge additions and report connectivity after each.
3. Count the number of connected components in a graph using DSU.
4. Use DSU to detect a cycle while adding edges one by one.
5. Explain how path compression + union by size makes operations nearly O(1).

## Multiple Choice Questions (MCQs)

### Q1. Initially, in a DSU of size n, each element:
- a) Points to element 0
- b) Is its own parent (its own set)
- c) Points to null
- d) Has no parent

**Answer:** b

### Q2. Path compression makes `find`:
- a) O(n)
- b) Nearly O(1) amortized
- c) O(n²)
- d) Unusable

**Answer:** b

### Q3. Union by size attaches:
- a) The larger set under the smaller
- b) The smaller set under the larger
- c) Both at random
- d) The root under itself

**Answer:** b

### Q4. `unite(a, b)` returning `false` means:
- a) An error occurred
- b) `a` and `b` were already in the same set
- c) The sets merged
- d) `a` equals `b`

**Answer:** b

### Q5. The number of components after k successful unions starting from n is:
- a) n + k
- b) n − k
- c) k
- d) n

**Answer:** b

## Key Takeaways

- DSU = parent array + `find` (path compression) + `union` (by size/rank).
- Amortized near-O(1) for find/unite.
- `unite` returns whether a merge happened — use it for cycle detection and component counting.
- DSU is the engine inside Kruskal's MST.

## Module 14 Complete 🎉

You've finished **Module 14 — Graphs**. Next up: **Module 15 — Hashing and Advanced Topics**.
