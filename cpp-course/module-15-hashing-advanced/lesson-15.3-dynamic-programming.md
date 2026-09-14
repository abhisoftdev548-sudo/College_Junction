---
module: 15
topic: "15.3"
title: "Dynamic Programming"
slug: "dynamic-programming"
difficulty: "Advanced"
prerequisites:
  - Recursion and Backtracking
  - Complexity Analysis
  - Greedy Algorithms
estimated_minutes: 35
tags:
  - algorithms
  - dynamic-programming
  - memoization
---

# 15.3 Dynamic Programming

## Overview

**Dynamic Programming (DP)** solves problems by breaking them into **overlapping subproblems** and storing their results instead of recomputing them. Where greedy takes one fixed path, DP considers all paths and picks the best — giving optimal answers to problems (knapsack, LIS, LCS, edit distance, coin change) that greedy can't handle.

## Learning Objectives

After this lesson you will be able to:

- Recognize overlapping subproblems and optimal substructure
- Apply **memoization** (top-down) and **tabulation** (bottom-up)
- Solve classic problems: Fibonacci, coin change, knapsack, LIS, LCS
- Derive a DP recurrence from a problem statement
- Choose top-down vs bottom-up and state the complexities

## Core Concepts

### The two DP ingredients

1. **Optimal substructure** — an optimal solution is built from optimal solutions of subproblems.
2. **Overlapping subproblems** — the same subproblem is needed many times.

### Memoization (top-down)

```cpp
std::unordered_map<int, long long> memo;

long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];        // already solved
    return memo[n] = fib(n - 1) + fib(n - 2); // solve + store
}
```

### Tabulation (bottom-up)

```cpp
long long fib(int n) {
    if (n <= 1) return n;
    std::vector<long long> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; ++i)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}
```

### Coin change (minimum coins)

```cpp
int minCoins(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);   // "infinity"
    dp[0] = 0;
    for (int a = 1; a <= amount; ++a)
        for (int c : coins)
            if (c <= a)
                dp[a] = std::min(dp[a], dp[a - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}
```

### 0/1 knapsack

```cpp
int knapsack(const std::vector<int>& wt, const std::vector<int>& val, int W) {
    int n = wt.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int w = 0; w <= W; ++w) {
            dp[i][w] = dp[i - 1][w];                  // skip item i
            if (wt[i - 1] <= w)
                dp[i][w] = std::max(dp[i][w],
                                    dp[i - 1][w - wt[i - 1]] + val[i - 1]);
        }
    return dp[n][W];
}
```

### Longest increasing subsequence (LIS)

```cpp
int lis(const std::vector<int>& a) {
    int n = a.size();
    std::vector<int> dp(n, 1);        // dp[i] = LIS ending at i
    int best = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < i; ++j)
            if (a[j] < a[i]) dp[i] = std::max(dp[i], dp[j] + 1);
        best = std::max(best, dp[i]);
    }
    return best;
}
```

### Longest common subsequence (LCS)

```cpp
int lcs(const std::string& a, const std::string& b) {
    int n = a.size(), m = b.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1])
                       ? dp[i-1][j-1] + 1
                       : std::max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}
```

## Visual — DP as a Filled Table

```
 0/1 knapsack, W=5, items (w,v): (2,3), (3,4), (4,5)

        capacity w →
  item ↓   0  1  2  3  4  5
   none    0  0  0  0  0  0
   (2,3)   0  0  3  3  3  3
   (3,4)   0  0  3  4  4  7
   (4,5)   0  0  3  4  5  7    ← answer dp[3][5] = 7

  each cell = best value using first i items with capacity w
```

DP turns an exponential enumeration into a polynomial table fill: each cell is one subproblem, computed once.

## Code Examples

### Example 1 — Climbing stairs (ways to reach n)

```cpp
int climbStairs(int n) {
    if (n <= 1) return 1;
    int a = 1, b = 1;
    for (int i = 2; i <= n; ++i) {
        int c = a + b;    // ways(i) = ways(i-1) + ways(i-2)
        a = b; b = c;
    }
    return b;
}
```

### Example 2 — Edit distance (Levenshtein)

```cpp
int editDistance(const std::string& a, const std::string& b) {
    int n = a.size(), m = b.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1));
    for (int i = 0; i <= n; ++i) dp[i][0] = i;    // deletions
    for (int j = 0; j <= m; ++j) dp[0][j] = j;    // insertions
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1])
                       ? dp[i-1][j-1]
                       : 1 + std::min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
    return dp[n][m];
}
```

### Example 3 — Maximum path sum in a triangle (bottom-up)

```cpp
int trianglePath(std::vector<std::vector<int>> t) {
    for (int r = t.size() - 2; r >= 0; --r)
        for (int c = 0; c < (int)t[r].size(); ++c)
            t[r][c] += std::max(t[r+1][c], t[r+1][c+1]);
    return t[0][0];
}
```

## Common Mistakes

1. **No memoization** — the naive recursion re-explodes to exponential time.
2. **Wrong base cases** — DP is only as correct as its base row/column.
3. **Off-by-one in indices** — especially converting 1-based `dp` tables to 0-based inputs.
4. **Wrong dimension order** — mixing up which index is the item and which is the capacity.
5. **Solving greedily instead of with DP** — 0/1 knapsack and coin change need DP.
6. **Memory blow-up** — full 2D tables; often you only need the previous row (space optimization).

## Best Practices

- Derive the **recurrence** in words before coding.
- Start top-down (memoization) to get the recurrence right, then convert to bottom-up.
- Initialize base cases carefully; test with small examples against brute force.
- Optimize space by keeping only the previous row(s) when possible.
- State the time/space complexity of your DP explicitly.

## Practice Questions

1. Compute the n-th Fibonacci number with both memoization and tabulation.
2. Solve minimum coin change for a given amount and denominations.
3. Implement 0/1 knapsack and test it on a small example.
4. Compute the LIS and LCS of given sequences.
5. Implement edit distance and verify on `"kitten"` → `"sitting"` (answer 3).

## Multiple Choice Questions (MCQs)

### Q1. DP requires:
- a) Random subproblems
- b) Optimal substructure and overlapping subproblems
- c) A sorted input
- d) Greedy choices

**Answer:** b

### Q2. Memoization is:
- a) Bottom-up table filling
- b) Top-down caching of subproblem results
- c) Sorting the input
- d) Removing duplicates

**Answer:** b

### Q3. 0/1 knapsack solved by DP runs in:
- a) O(n)
- b) O(n·W)
- c) O(2ⁿ)
- d) O(W log n)

**Answer:** b

### Q4. The recurrence `dp[i] = dp[i-1] + dp[i-2]` (with base 1,1) computes:
- a) Factorials
- b) Fibonacci/climbing-stairs counts
- c) Coin change
- d) LCS

**Answer:** b

### Q5. A common DP space optimization is:
- a) Using a 3D array
- b) Keeping only the previous row(s)
- c) Sorting the table
- d) Using a linked list

**Answer:** b

## Key Takeaways

- DP = optimal substructure + overlapping subproblems, solved once and stored.
- Top-down (memoization) and bottom-up (tabulation) are equivalent.
- Master the classics: Fibonacci, coin change, knapsack, LIS, LCS, edit distance.
- Derive the recurrence first; mind base cases and indices.

## Next Topic

[15.4 Two Pointers and Sliding Windows](lesson-15.4-two-pointers-sliding-windows.md)
