---
module: 11
topic: "11.1"
title: "Problem-Solving Approaches"
slug: "problem-solving-approaches"
difficulty: "Advanced"
prerequisites:
  - Functions
  - STL Containers and Algorithms
estimated_minutes: 30
tags:
  - problem-solving
  - approaches
  - methodology
---

# 11.1 Problem-Solving Approaches

## Overview

Programming is not just syntax — it's a **method for breaking problems into solvable steps**. This lesson lays out a repeatable approach: understand, explore, plan, implement, verify. Whether it's a coursework exercise or an interview question, the same discipline gets you from "I don't know where to start" to a working solution.

## Learning Objectives

After this lesson you will be able to:

- Apply a structured 5-step approach to any problem
- Distinguish the main strategy families (brute force, greedy, divide-and-conquer, dynamic programming)
- Choose a strategy based on problem characteristics
- Turn a vague requirement into precise inputs, outputs, and constraints
- Validate your approach with small examples before coding

## Core Concepts

### The 5-step method

1. **Understand** — restate the problem in your own words; identify inputs, outputs, constraints, and edge cases.
2. **Explore** — work through examples by hand; look for patterns.
3. **Plan** — pick a strategy and sketch the algorithm in pseudocode.
4. **Implement** — translate the plan into clean, small functions.
5. **Verify** — test against examples, edge cases, and brute-force where possible.

### Strategy families

| Strategy | Idea | When to use |
|---|---|---|
| Brute force | Try all possibilities | Small inputs; to verify smarter solutions |
| Greedy | Make the locally best choice | Problems with optimal substructure (e.g. coin change with canonical denominations) |
| Divide & conquer | Split, solve subproblems, combine | Sorting (merge sort), binary search |
| Dynamic programming | Store subproblem results | Overlapping subproblems (Fibonacci, knapsack) |
| Backtracking | Explore, prune, undo | Constraint search (N-queens, permutations) |

### Understanding: the spec in one sentence

```
Problem: "Find the largest number in a list."
Inputs:  a list of numbers, length ≥ 1
Outputs: the maximum number
Edge cases: all equal, negative numbers, single element, empty list (is it allowed?)
```

Writing these down first prevents most "wrong answer" bugs.

### Exploring: solve a small case by hand

```
[3, 7, 2, 9, 4]
max so far = 3
7 > 3 → 7
2 → 7
9 → 9
4 → 9
answer: 9
```

Tracing by hand reveals the algorithm: keep a running maximum.

### Planning: pseudocode before code

```text
function max(list):
    best = list[0]
    for each x in list:
        if x > best: best = x
    return best
```

Pseudocode separates **thinking** from **syntax** — solve the problem before you fight the compiler.

## Visual — The Problem-Solving Loop

```
  Understand ──▶ Explore ──▶ Plan ──▶ Implement ──▶ Verify
      ▲                                              │
      └────────────── (fix & retest) ◀───────────────┘

  Each stage has a concrete output:
  Understand → spec      Explore → worked examples
  Plan       → pseudocode Implement → working code
  Verify     → tests passed
```

If verification fails, you loop back to the earliest stage that was wrong — not always the code.

## Code Examples

### Example 1 — Apply the method: sum of digits

```cpp
// Understand: input = non-negative int n, output = sum of its digits
// Explore:   123 → 1+2+3 = 6 ;  0 → 0 ;  1001 → 2
// Plan:      while n > 0: sum += n % 10; n /= 10

#include <iostream>

int digitSum(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;   // last digit
        n /= 10;         // remove it
    }
    return sum;
}

int main() {
    std::cout << digitSum(123);   // 6
}
```

### Example 2 — Greedy: minimum coins (canonical denominations)

```cpp
#include <iostream>
#include <vector>

int minCoins(std::vector<int> coins, int amount) {
    int count = 0;
    for (int c : coins) {          // assume sorted descending
        count += amount / c;       // take as many of this coin as possible
        amount %= c;
    }
    return count;
}

int main() {
    std::cout << minCoins({25, 10, 5, 1}, 87);   // 25*3 + 10*1 + 1*2 = 6
}
```

### Example 3 — Brute force to verify a smarter idea

```cpp
#include <iostream>
#include <vector>

// O(n^2) brute force: check every pair — always correct, used as a reference
int maxPairSum(const std::vector<int>& v) {
    int best = v[0] + v[1];
    for (std::size_t i = 0; i < v.size(); ++i)
        for (std::size_t j = i + 1; j < v.size(); ++j)
            best = std::max(best, v[i] + v[j]);
    return best;
}
```

## Common Mistakes

1. **Coding before understanding** — jumping in leads to solving the wrong problem.
2. **Skipping edge cases** — empty input, zero, negative, duplicates, extremes.
3. **Over-engineering** — applying DP where a simple loop would do.
4. **Ignoring constraints** — an O(n²) solution on n = 10⁵ will time out.
5. **No worked example** — you can't verify code without a known answer.
6. **One-shot testing** — testing only the happy path misses most bugs.

## Best Practices

- Write the spec (inputs/outputs/constraints/edge cases) before any code.
- Trace at least one example by hand.
- Prefer pseudocode or comments outlining the plan first.
- Implement in small functions; test each piece.
- Keep a brute-force reference to check optimized solutions on small inputs.

## Practice Questions

1. Apply the 5-step method to "check whether a string is a palindrome," writing the spec, example trace, and code.
2. Write a brute-force solution to count pairs in a vector that sum to a target.
3. Solve "reverse an integer's digits" using the plan-first approach and test with edge cases (negative, trailing zeros).
4. Identify which strategy (greedy, divide-and-conquer, DP, backtracking) fits each: binary search, Fibonacci, N-queens, minimum coins.
5. Write pseudocode (not code) for "find the longest word in a sentence."

## Multiple Choice Questions (MCQs)

### Q1. The first step of the problem-solving method is:
- a) Write code
- b) Understand the problem
- c) Choose a language
- d) Optimize

**Answer:** b

### Q2. A greedy strategy:
- a) Tries all possibilities
- b) Makes the locally optimal choice at each step
- c) Always uses recursion
- d) Never works

**Answer:** b

### Q3. Pseudocode is useful because it:
- a) Runs faster than code
- b) Separates thinking from syntax
- c) Replaces the compiler
- d) Requires no logic

**Answer:** b

### Q4. Which strategy stores results of overlapping subproblems?
- a) Greedy
- b) Divide and conquer
- c) Dynamic programming
- d) Brute force

**Answer:** c

### Q5. Constraints (e.g. n ≤ 10⁵) matter because they:
- a) Are cosmetic
- b) Determine whether an algorithm's complexity is fast enough
- c) Only matter in interviews
- d) Are always wrong

**Answer:** b

## Key Takeaways

- Use a repeatable method: understand → explore → plan → implement → verify.
- Match the strategy (brute force, greedy, divide-and-conquer, DP, backtracking) to the problem.
- Specs, hand-traced examples, and pseudocode prevent most bugs before they're written.
- Verify with edge cases and, where possible, a brute-force reference.

## Next Topic

[11.2 Common Patterns](lesson-11.2-common-patterns.md)
