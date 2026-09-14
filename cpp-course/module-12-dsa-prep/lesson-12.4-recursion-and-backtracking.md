---
module: 12
topic: "12.4"
title: "Recursion and Backtracking"
slug: "recursion-and-backtracking"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Complexity Analysis
  - Stacks
estimated_minutes: 30
tags:
  - dsa
  - recursion
  - backtracking
---

# 12.4 Recursion and Backtracking

## Overview

**Recursion** is a function calling itself to solve smaller instances of a problem. **Backtracking** is a systematic way to explore all candidate solutions: build a partial solution, and when it can't lead to a valid answer, **undo** the last step and try the next option. Recursion + backtracking solve permutations, subsets, N-Queens, mazes, and many other search problems.

## Learning Objectives

After this lesson you will be able to:

- Write recursive functions with a correct **base case**
- Explain how the call stack makes recursion work
- Use backtracking to enumerate subsets and permutations
- Apply pruning to skip dead branches early
- Convert simple recursion to iteration (and know when to)

## Core Concepts

### Anatomy of recursion

```cpp
int factorial(int n) {
    if (n <= 1) return 1;         // BASE CASE — stops the recursion
    return n * factorial(n - 1);  // RECURSIVE CASE — smaller subproblem
}
```

Every recursive function needs a base case and a step that moves **toward** it — otherwise it recurses forever (stack overflow).

### The call stack

```cpp
factorial(3)
  → 3 * factorial(2)
       → 2 * factorial(1)
            → 1                  // base case reached
       ← 2 * 1 = 2
  ← 3 * 2 = 6
```

Each call's local state is saved on the **call stack**; results unwind back up.

### Backtracking template

```cpp
void backtrack(state) {
    if (isComplete(state)) { record(state); return; }
    for (option : candidates(state)) {
        apply(option, state);        // choose
        backtrack(state);            // explore
        undo(option, state);         // backtrack — un-choose
    }
}
```

The signature of backtracking is **choose → explore → un-choose**.

### Generating subsets

```cpp
void subsets(const std::vector<int>& a, int i, std::vector<int>& cur,
             std::vector<std::vector<int>>& out) {
    out.push_back(cur);                 // record current subset
    for (int j = i; j < (int)a.size(); ++j) {
        cur.push_back(a[j]);            // choose
        subsets(a, j + 1, cur, out);    // explore (only later elements)
        cur.pop_back();                 // un-choose
    }
}
```

### Generating permutations

```cpp
void permute(std::vector<int>& a, int start,
             std::vector<std::vector<int>>& out) {
    if (start == (int)a.size()) { out.push_back(a); return; }
    for (int i = start; i < (int)a.size(); ++i) {
        std::swap(a[start], a[i]);      // choose
        permute(a, start + 1, out);     // explore
        std::swap(a[start], a[i]);      // un-choose (restore)
    }
}
```

### Pruning

In N-Queens, don't try placing a queen that attacks an existing one — **skip** that branch instead of exploring it. Pruning is what makes backtracking fast enough in practice.

## Visual — Backtracking as a Search Tree

```
                  []
          ┌───────┼───────┐
         [1]     [2]     [3]      choose next element
         / \      |
       [1,2] [1,3] [2,3]          keep choosing
        |
      [1,2,3]                     complete → record, then UNWIND
```

Each path from root to leaf is one candidate; backtracking walks the tree, undoing choices to try siblings.

## Code Examples

### Example 1 — Fibonacci with memoization

```cpp
#include <unordered_map>

long long fib(int n, std::unordered_map<int, long long>& memo) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];           // already computed
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}
// O(n) instead of O(2^n)
```

### Example 2 — Generate all subsets

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a = {1, 2, 3};
    std::vector<std::vector<int>> out;
    std::vector<int> cur;
    subsets(a, 0, cur, out);
    for (const auto& s : out) {
        for (int x : s) std::cout << x;
        std::cout << "\n";   // [] 1 12 123 13 2 23 3
    }
}
```

### Example 3 — Solve a maze (DFS backtracking)

```cpp
bool solve(std::vector<std::vector<int>>& maze, int r, int c,
           std::vector<std::vector<bool>>& visited) {
    if (r == rows - 1 && c == cols - 1) return true;   // reached goal
    visited[r][c] = true;
    for (auto [dr, dc] : dirs) {
        int nr = r + dr, nc = c + dc;
        if (inside(nr, nc) && !visited[nr][nc] && maze[nr][nc] == 0) {
            if (solve(maze, nr, nc, visited)) return true;
        }
    }
    visited[r][c] = false;   // backtrack
    return false;
}
```

## Common Mistakes

1. **Missing base case** — infinite recursion → stack overflow.
2. **Wrong movement toward the base case** — the subproblem must get smaller.
3. **Forgetting to undo** — without `pop_back`/`swap` back, state leaks between branches.
4. **Recalculating overlapping subproblems** — use memoization (Fibonacci, grid paths).
5. **Deep recursion on large inputs** — recursion depth can overflow the stack; convert to iteration.
6. **Copying state on every call** — pass references/indices to avoid O(n) copies per level.

## Best Practices

- Always write the base case first.
- Follow the choose → explore → un-choose template.
- Prune aggressively — reject invalid candidates as early as possible.
- Memoize overlapping subproblems (turns exponential into polynomial).
- For simple linear recursion, prefer an iterative loop.

## Practice Questions

1. Write a recursive `sumOfDigits(n)` and trace it for 123.
2. Generate all subsets of `{1, 2, 3, 4}` using backtracking.
3. Generate all permutations of `"abc"` and print them.
4. Solve the N-Queens problem for n = 4 with pruning (count solutions).
5. Compute Fibonacci with memoization and compare to the naive version's speed.

## Multiple Choice Questions (MCQs)

### Q1. The base case in recursion:
- a) Makes the problem bigger
- b) Stops the recursion
- c) Is optional
- d) Runs first every call

**Answer:** b

### Q2. Backtracking is:
- a) Choose → explore → un-choose
- b) Sort → search → return
- c) Push → pop → peek
- d) Divide → conquer → merge

**Answer:** a

### Q3. Without a base case, recursion causes:
- a) A compile error
- b) Stack overflow (infinite recursion)
- c) Slower but correct results
- d) Nothing

**Answer:** b

### Q4. Memoization converts many recursive solutions from exponential to:
- a) Logarithmic
- b) Polynomial
- c) Constant
- d) Factorial

**Answer:** b

### Q5. Pruning in backtracking means:
- a) Trying every option
- b) Skipping branches that can't lead to a solution
- c) Deleting the output
- d) Sorting first

**Answer:** b

## Key Takeaways

- Recursion = base case + a step toward it; it runs on the call stack.
- Backtracking = choose → explore → un-choose; undo is essential.
- Prune invalid branches early; memoize overlapping subproblems.
- Watch recursion depth and prefer iteration for simple linear cases.

## Next Topic

[12.5 Sorting and Searching](lesson-12.5-sorting-and-searching.md)
