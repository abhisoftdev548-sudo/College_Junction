---
module: 15
topic: "15.2"
title: "Greedy Algorithms"
slug: "greedy-algorithms"
difficulty: "Advanced"
prerequisites:
  - Sorting and Searching
  - Problem-Solving Approaches
estimated_minutes: 30
tags:
  - algorithms
  - greedy
  - optimization
---

# 15.2 Greedy Algorithms

## Overview

A **greedy algorithm** builds a solution step by step, always making the choice that looks **best right now** — never looking back. Greedy is simple and fast, but it only produces the optimal answer when the problem has the right structure (optimal substructure + a "greedy choice" property). Many classic problems — activity selection, interval scheduling, Huffman coding — are solved perfectly by greed.

## Learning Objectives

After this lesson you will be able to:

- Explain the greedy paradigm and when it works
- Solve activity selection and interval problems
- Apply greedy to job scheduling and coin change (with caveats)
- Prove (informally) why a greedy choice is safe
- Recognize problems where greedy fails and DP is needed

## Core Concepts

### The greedy loop

```cpp
// 1. sort/order candidates
// 2. iterate, taking each locally-best, feasible choice
// 3. never reconsider earlier choices
```

### Activity selection (classic)

Given intervals `[start, end)`, pick the maximum number of **non-overlapping** activities.

```cpp
int maxActivities(std::vector<std::pair<int,int>> acts) {
    // sort by END time (the key greedy insight)
    std::sort(acts.begin(), acts.end(),
              [](auto& a, auto& b) { return a.second < b.second; });

    int count = 0, lastEnd = -1;
    for (auto [s, e] : acts) {
        if (s >= lastEnd) {        // doesn't overlap the last chosen
            ++count;
            lastEnd = e;
        }
    }
    return count;
}
```

Choosing the activity that finishes **earliest** always leaves the most room for the rest — that's the greedy choice.

### Fractional knapsack (greedy works)

```cpp
// Sort items by value/weight ratio, take as much as fits, then a fraction.
double fractionalKnapsack(std::vector<Item> items, double capacity) {
    std::sort(items.begin(), items.end(),
              [](const Item& a, const Item& b) {
                  return a.value / a.weight > b.value / b.weight;
              });
    double total = 0;
    for (auto& it : items) {
        if (capacity >= it.weight) { total += it.value; capacity -= it.weight; }
        else { total += (it.value / it.weight) * capacity; break; }
    }
    return total;
}
```

Because you can take a **fraction**, the greedy "highest ratio first" choice is provably optimal.

### Coin change — greedy only sometimes

```cpp
// Works for canonical systems (e.g. {1,5,10,25}); FAILS for e.g. {1,3,4} amount 6
// {1,3,4}: greedy 4+1+1 = 3 coins, but optimal 3+3 = 2 coins → DP needed
```

This is the canonical warning: greedy looks right but can be wrong without the right structure.

### When greedy is safe (informal proof)

A greedy choice is safe if there's always an optimal solution that **includes** the greedy choice (the "exchange argument": swap the greedy choice into any optimal solution without making it worse).

## Visual — Activity Selection Greedy

```
 intervals:        sorted by end:
 [0,3) [1,4)        [0,3) [3,5) [1,4) [4,6) [5,7)
 [3,5) [4,6)        choose [0,3) (earliest end)
 [5,7)              next start >= 3 → [3,5) ✓
                    next start >= 5 → [5,7) ✓   → 3 activities
                    ([1,4),[4,6) would overlap)
```

Always take the activity that ends soonest, then repeat — never revisit earlier choices.

## Code Examples

### Example 1 — Maximum number of meetings

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::pair<int,int>> meetings = {{0,3},{1,4},{3,5},{4,6},{5,7}};
    std::sort(meetings.begin(), meetings.end(),
              [](auto& a, auto& b) { return a.second < b.second; });
    int count = 0, end = -1;
    for (auto [s, e] : meetings)
        if (s >= end) { ++count; end = e; }
    std::cout << count;   // 3
}
```

### Example 2 — Minimum platforms (greedy sweep)

```cpp
// Sort arrivals and departures; sweep with two pointers.
int minPlatforms(std::vector<int> arr, std::vector<int> dep) {
    std::sort(arr.begin(), arr.end());
    std::sort(dep.begin(), dep.end());
    int i = 0, j = 0, need = 0, maxNeed = 0;
    while (i < (int)arr.size()) {
        if (arr[i] <= dep[j]) { ++need; ++i; }
        else { --need; ++j; }
        maxNeed = std::max(maxNeed, need);
    }
    return maxNeed;
}
```

### Example 3 — Fractional knapsack

```cpp
#include <algorithm>
#include <vector>

struct Item { double weight, value; };

double fill(const std::vector<Item>& items, double cap) {
    auto byRatio = items;
    std::sort(byRatio.begin(), byRatio.end(),
              [](const Item& a, const Item& b) {
                  return a.value / a.weight > b.value / b.weight;
              });
    double total = 0;
    for (const auto& it : byRatio) {
        if (cap >= it.weight) { total += it.value; cap -= it.weight; }
        else { total += (it.value / it.weight) * cap; break; }
    }
    return total;
}
```

## Common Mistakes

1. **Applying greedy where it's incorrect** — coin change, 0/1 knapsack, and shortest paths need DP or other tools.
2. **Sorting by the wrong criterion** — activity selection needs end-time (or start-time descending), not start-time ascending.
3. **Skipping the feasibility check** — take a choice only if it's still valid (e.g. doesn't overlap).
4. **Assuming greedy = "obviously optimal"** — always ask for the exchange/counterexample.
5. **Floating-point comparisons** — comparing ratios exactly can bite; scale to integers when possible.
6. **Not proving (or at least testing) the greedy** — verify against brute force on small inputs.

## Best Practices

- Identify the **locally optimal choice** and the **ordering** that exposes it.
- Verify with a counterexample hunt: try to construct a case where greedy fails.
- Test greedy against a brute-force reference on small random inputs.
- If greedy isn't provably safe, reach for dynamic programming.

## Practice Questions

1. Solve activity selection for a given set of intervals.
2. Solve the minimum-platforms problem with the two-pointer sweep.
3. Compute the fractional knapsack value for a set of items.
4. Show a coin system where greedy fails and explain why.
5. Write a brute-force checker and verify your greedy activity selection on random intervals.

## Multiple Choice Questions (MCQs)

### Q1. A greedy algorithm:
- a) Tries all options
- b) Makes the locally optimal choice at each step
- c) Always backtracks
- d) Uses memoization

**Answer:** b

### Q2. Activity selection sorts intervals by:
- a) Start time
- b) End time
- c) Length
- d) Random

**Answer:** b

### Q3. Fractional knapsack works greedily because:
- a) Items are integers
- b) You can take fractions, so highest-ratio-first is optimal
- c) Weights are equal
- d) It never works greedily

**Answer:** b

### Q4. Greedy coin change with denominations {1, 3, 4} for amount 6:
- a) Gives the optimal answer
- b) Gives 4+1+1 (3 coins), but the optimum is 3+3 (2 coins)
- c) Cannot run
- d) Returns 0

**Answer:** b — the classic greedy failure.

### Q5. The "exchange argument" is used to:
- a) Debug code
- b) Prove a greedy choice can be part of an optimal solution
- c) Sort the input
- d) Measure complexity

**Answer:** b

## Key Takeaways

- Greedy = locally best choice, never revisited; fast but not always optimal.
- Activity selection (sort by end), fractional knapsack (sort by ratio) are classic winners.
- Coin change and 0/1 knapsack show where greedy fails → use DP.
- Always validate greedy with counterexamples or a brute-force reference.

## Next Topic

[15.3 Dynamic Programming](lesson-15.3-dynamic-programming.md)
