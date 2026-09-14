---
module: 11
topic: "11.3"
title: "Complexity Analysis (Big-O)"
slug: "complexity-analysis"
difficulty: "Advanced"
prerequisites:
  - Loops
  - Recursion
  - Problem-Solving Approaches
estimated_minutes: 30
tags:
  - complexity
  - big-o
  - analysis
---

# 11.3 Complexity Analysis (Big-O)

## Overview

**Big-O notation** describes how an algorithm's time or memory grows as the input size grows — the difference between a solution that finishes instantly and one that runs for hours. Complexity analysis lets you **predict performance before running code**, choose between algorithms, and explain *why* one approach beats another.

## Learning Objectives

After this lesson you will be able to:

- Read and write Big-O notation
- Compute the complexity of loops, nested loops, and simple recursion
- Compare common complexity classes and their practical limits
- Analyze both time and space
- Estimate whether an algorithm meets given constraints

## Core Concepts

### What Big-O measures

Big-O ignores constants and lower-order terms and asks: **how does the work scale with input size n?**

```cpp
// O(1) — constant: independent of n
int first = a[0];

// O(n) — linear: one pass
for (int x : a) { /* work */ }

// O(n^2) — quadratic: nested full loops
for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j) { /* work */ }

// O(log n) — logarithmic: halving each step
while (n > 1) { n /= 2; }

// O(n log n) — linearithmic: sort
std::sort(a.begin(), a.end());
```

### Common classes and their limits

| Complexity | Name | n ≈ 10⁶ | Example |
|---|---|---|---|
| O(1) | constant | instant | array access |
| O(log n) | logarithmic | instant | binary search |
| O(n) | linear | ~0.01 s | one pass |
| O(n log n) | linearithmic | ~0.1 s | efficient sort |
| O(n²) | quadratic | ~minutes | nested loops |
| O(2ⁿ) | exponential | forever | brute-force subsets |

These are rough, but they explain why constraints matter: n = 10⁵ rules out O(n²).

### Adding and multiplying work

```cpp
// O(n + m): two independent passes ADD
for (int x : a) { ... }        // O(n)
for (int y : b) { ... }        // O(m)

// O(n * m): nested loops MULTIPLY
for (int x : a)                // O(n)
    for (int y : b) { ... }    // O(m)
```

Drop constants (O(2n) → O(n)) and keep only the dominant term (O(n² + n) → O(n²)).

### Recursion

```cpp
int fib(int n) {                       // O(2^n): two recursive calls each level
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int factorial(int n) {                 // O(n): one recursive call per level
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

Recurrence intuition: **one call per level → O(n)**; **branching calls → exponential** (unless memoized).

### Space complexity

```cpp
std::vector<int> v(n);     // O(n) extra space
int total = 0;             // O(1) extra space
```

Space counts **extra** memory the algorithm allocates beyond the input itself.

### The master method (intuition)

- T(n) = T(n/2) + O(1) → O(log n) — binary search
- T(n) = 2T(n/2) + O(n) → O(n log n) — merge sort
- T(n) = T(n-1) + O(1) → O(n) — linear recursion

Halving + constant work is logarithmic; splitting + linear merge is linearithmic.

## Visual — Growth Curves

```
 time
  │
  │                        O(n²)
  │                      /
  │                    /
  │          O(n log n)─
  │        /
  │      O(n)
  │    /
  │  O(log n)
  └────────────────────────────── n (input size)
```

Small n hides differences; large n makes the class the whole story. That's why constraints decide the algorithm.

## Code Examples

### Example 1 — Analyzing a function

```cpp
int countPairs(const std::vector<int>& a) {      // O(n^2) time, O(1) space
    int count = 0;
    for (std::size_t i = 0; i < a.size(); ++i)          // n iterations
        for (std::size_t j = i + 1; j < a.size(); ++j)  // ~n/2 avg
            ++count;
    return count;
}
// Inner loop runs about n(n-1)/2 times → O(n^2)
```

### Example 2 — Binary search is O(log n)

```cpp
int binarySearch(const std::vector<int>& a, int target) {
    int lo = 0, hi = a.size() - 1;
    while (lo <= hi) {               // each step halves the range
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
// Range halves each iteration: O(log n)
```

### Example 3 — Space analysis

```cpp
std::vector<int> squares(const std::vector<int>& a) {   // O(n) time, O(n) space
    std::vector<int> out;
    out.reserve(a.size());         // output vector is O(n) extra
    for (int x : a) out.push_back(x * x);
    return out;
}
```

## Common Mistakes

1. **Counting constants in Big-O** — O(2n) is written O(n); constants don't matter.
2. **Assuming nested loops are always O(n²)** — the inner loop may depend differently (e.g. `j *= 2` → O(n log n)).
3. **Ignoring hidden costs** — string concatenation in a loop can be O(n²) due to reallocations.
4. **Forgetting space** — a copy of the input doubles memory even if time is linear.
5. **Recursion depth** — deep recursion can overflow the stack; depth is also a cost.
6. **Judging by small inputs** — an O(n²) and O(n log n) look identical at n = 100.

## Best Practices

- State the complexity of every nontrivial function you write (in a comment).
- Focus on the **dominant** term; drop constants and lower-order terms.
- Match the algorithm to the constraint: n ≤ 10⁵ → target O(n log n) or better.
- Track space as carefully as time.
- Use Big-O to *compare* algorithms, not to measure absolute speed.

## Practice Questions

1. What is the time complexity of a loop that halves `n` each iteration?
2. Analyze `for i in 0..n: for j in i..n: work` — give the exact count and the Big-O.
3. Compute the complexity of binary search and explain why it's O(log n).
4. For the recursive Fibonacci function, explain why it's exponential.
5. Compare two solutions (nested loops vs sorting) for "count pairs with sum = target" and state both complexities.

## Multiple Choice Questions (MCQs)

### Q1. O(n) means the work grows:
- a) Exponentially with n
- b) Linearly with n
- c) Quadratically with n
- d) Not at all

**Answer:** b

### Q2. `for (int i = 0; i < n; i *= 2)` runs:
- a) O(n)
- b) O(log n)
- c) O(n log n)
- d) O(1)

**Answer:** b — i doubles (multiplicative), halving the remaining steps.

### Q3. Two nested loops over n each are:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** c

### Q4. Which is the largest growth rate?
- a) O(n log n)
- b) O(n²)
- c) O(2ⁿ)
- d) O(n!)

**Answer:** d — factorial grows fastest among these.

### Q5. Big-O notation is used to:
- a) Measure exact nanoseconds
- b) Describe growth as input size increases
- c) Count lines of code
- d) Debug memory leaks

**Answer:** b

## Key Takeaways

- Big-O describes **growth**: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).
- Nested loops multiply; sequential passes add; halving is logarithmic.
- Drop constants and lower-order terms.
- Constraints pick the algorithm: n ≤ 10⁵ usually rules out O(n²).

## Next Topic

[11.4 Debugging and Testing](lesson-11.4-debugging-and-testing.md)
