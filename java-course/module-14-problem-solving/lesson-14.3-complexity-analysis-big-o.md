---
module: 14
topic: "14.3"
title: "Complexity Analysis (Big-O)"
slug: "complexity-analysis-big-o"
difficulty: "Advanced"
prerequisites:
  - Common Patterns
estimated_minutes: 30
tags:
  - java
  - big-o
  - complexity
---

# 14.3 Complexity Analysis (Big-O)

## Overview

**Big-O notation** describes how an algorithm's time or space grows as the input grows — the key to choosing the right approach before you code. O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). This lesson teaches you to read, compute, and reason with complexity.

## Learning Objectives

After this lesson you will be able to:

- Read and rank Big-O classes
- Compute time complexity from code (loops, nesting, recursion)
- Estimate space complexity
- Recognize typical complexities of common operations
- Use constraints to predict required complexity

## Core Concepts

### The growth classes

| Complexity | Example | n = 10⁶ feasibility |
|---|---|---|
| O(1) | array access | instant |
| O(log n) | binary search | instant |
| O(n) | single loop | fine |
| O(n log n) | efficient sort | fine |
| O(n²) | nested loops | too slow |
| O(2ⁿ) | brute-force subsets | impossible |

### Reading loops

```java
for (int i = 0; i < n; i++) { ... }        // O(n)

for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { ... }    // O(n²)

for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++) { ... }    // O(n²) (n + n-1 + ... + 1)

for (int i = 1; i < n; i *= 2) { ... }     // O(log n)
```

Nested loops **multiply**; sequential loops **add**.

### Dropping constants and lower terms

```java
// 3n + 5  →  O(n)
// n² + 100n + 500  →  O(n²)   (only the dominant term matters)
```

Big-O ignores constants and lower-order terms — it's about **growth rate**, not exact time.

### Recursion

```java
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);   // O(2ⁿ) — two calls each level
}
```

Recurrences: one recursive call halving n → O(log n); two calls → often O(2ⁿ).

### Space complexity

```java
int[] arr = new int[n];      // O(n) space
Map<String, Integer> m = new HashMap<>();   // up to O(n) space
```

Count auxiliary memory (arrays, maps, recursion stack) that grows with n. In-place algorithms use O(1) extra space.

### Common operation costs

| Operation | Cost |
|---|---|
| `ArrayList.get/set` | O(1) |
| `ArrayList.add` (end) | O(1) amortized |
| `ArrayList.add/remove` (middle) | O(n) |
| `LinkedList.get` | O(n) |
| `HashMap`/`HashSet` get/put | O(1) average |
| `TreeMap`/`TreeSet` ops | O(log n) |
| sort (`Arrays.sort`/`Collections.sort`) | O(n log n) |
| `contains` on a List | O(n) |

### Constraints → complexity

- n ≤ 10 → O(n!) or O(2ⁿ) acceptable.
- n ≤ 10⁵ → need O(n log n) or O(n).
- n ≤ 10⁶ → O(n) or O(log n).

Use the constraints to know which approach is viable **before** coding.

## Visual — Growth Curves

```
 time
  ▲                O(2ⁿ)
  │             ╱
  │           ╱   O(n²)
  │         ╱    ╱
  │       ╱    ╱  O(n log n)
  │     ╱    ╱   ╱  O(n)
  │   ╱    ╱   ╱  ╱   O(log n)
  │ ╱    ╱   ╱  ╱   ╱  O(1)
  └──────────────────────────▶ n
```

The gap between classes widens as n grows — that's why Big-O matters.

## Code Examples

### Example 1 — Find the complexity

```java
public static int sum(int[] arr) {          // O(n) time, O(1) space
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

public static boolean hasDuplicates(int[] arr) {   // O(n) time, O(n) space
    Set<Integer> seen = new HashSet<>();
    for (int x : arr) {
        if (!seen.add(x)) return true;
    }
    return false;
}
```

### Example 2 — Nested vs sequential

```java
public static void nested(int n) {
    for (int i = 0; i < n; i++)          // O(n)
        for (int j = 0; j < n; j++)      // O(n)
            doWork();                    // total O(n²)
}

public static void sequential(int n) {
    for (int i = 0; i < n; i++) doWork();   // O(n)
    for (int j = 0; j < n; j++) doWork();   // O(n) → total O(n)
}
```

### Example 3 — Binary search (O(log n))

```java
public static int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

## Common Mistakes

1. **Saying O(2n) or O(3n²)** — drop constants; it's O(n) / O(n²).
2. **Adding where you should multiply** — nested loops multiply.
3. **Ignoring `contains` on a List** — it's O(n), not O(1); use a Set.
4. **Forgetting space complexity** — maps and recursion stack count.
5. **Using `LinkedList.get(i)` in a loop** — that's O(n²).
6. **Worst-case vs average** — hash maps are O(1) average, O(n) worst-case.

## Best Practices

- Always state both time and space complexity.
- Compute complexity from the *dominant* term; drop constants.
- Use `HashMap`/`HashSet` for O(1) lookup; beware list `contains`.
- Read constraints to pick a viable approach before coding.
- Know the cost of your collections (14.2, 9.x).

## Practice Questions

1. State the complexity of: a single loop, nested loops, and a loop that halves each iteration.
2. Give the time and space complexity of finding duplicates with a HashSet.
3. Explain why `list.contains(x)` in a loop over the same list is O(n²).
4. Given n ≤ 10⁵, which complexities are acceptable?
5. Compute the complexity of binary search and explain why it's O(log n).

## Multiple Choice Questions (MCQs)

### Q1. Big-O describes:
- a) Exact runtime
- b) Growth rate as input size grows
- c) Memory only
- d) Compile time

**Answer:** b

### Q2. Two nested loops (each n iterations) are:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** b

### Q3. `HashMap.get` is on average:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q4. A loop that halves n each iteration is:
- a) O(n)
- b) O(log n)
- c) O(n²)
- d) O(1)

**Answer:** b

### Q5. In Big-O, we drop:
- a) The dominant term
- b) Constants and lower-order terms
- c) The variable n
- d) Everything

**Answer:** b

## Key Takeaways

- Big-O = growth rate; rank: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).
- Nested loops multiply; sequential adds; drop constants.
- Know collection costs; count space too.
- Constraints dictate viable complexity — analyze before coding.

## Next Topic

[14.4 Debugging and Testing (JUnit)](lesson-14.4-debugging-and-testing-junit.md)
