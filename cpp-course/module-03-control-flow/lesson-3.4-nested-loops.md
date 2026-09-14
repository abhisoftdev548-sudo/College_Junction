---
module: 3
topic: "3.4"
title: "Nested Loops"
slug: "nested-loops"
difficulty: "Beginner"
prerequisites:
  - Loops
  - Loop Control Statements
estimated_minutes: 25
tags:
  - cpp
  - control-flow
  - nested-loops
---

# 3.4 Nested Loops

## Overview

A **nested loop** is a loop inside another loop. For each iteration of the outer loop, the inner loop runs completely. Nested loops power 2D work — tables, grids, matrices, and the pattern printing you'll master next. Understanding the iteration order is the key.

## Learning Objectives

After this lesson you will be able to:

- Write nested `for`/`while` loops
- Predict the order of iterations
- Process 2D arrays (rows and columns)
- Print multiplication tables
- Analyze the O(n²) cost of nested loops

## Core Concepts

### Basic nested loop

```cpp
for (int i = 0; i < 3; ++i) {
    for (int j = 0; j < 3; ++j) {
        std::cout << "(" << i << "," << j << ") ";
    }
    std::cout << "\n";
}
// (0,0) (0,1) (0,2)
// (1,0) (1,1) (1,2)
// (2,0) (2,1) (2,2)
```

The **outer** loop (`i`) runs slowly; the **inner** loop (`j`) runs fully for each `i`. Total iterations: 3 × 3 = 9.

### Iteration order

```
 i=0: j=0, j=1, j=2   ← inner loop completes
 i=1: j=0, j=1, j=2
 i=2: j=0, j=1, j=2
```

The inner loop restarts from its initial value on every outer iteration.

### Multiplication table

```cpp
for (int i = 1; i <= 10; ++i) {
    for (int j = 1; j <= 10; ++j) {
        std::cout << i * j << "\t";
    }
    std::cout << "\n";
}
```

### Processing a 2D array

```cpp
int grid[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
for (int r = 0; r < 3; ++r) {
    for (int c = 0; c < 3; ++c) {
        std::cout << grid[r][c] << " ";
    }
    std::cout << "\n";
}
```

Outer loop = rows (`r`), inner loop = columns (`c`) — the standard way to walk a 2D structure.

### Variable inner bounds

```cpp
for (int i = 0; i < 5; ++i) {
    for (int j = 0; j <= i; ++j) {   // inner bound depends on i
        std::cout << "*";
    }
    std::cout << "\n";
}
// *
// **
// ***
// ****
// *****
```

The inner loop's limit can depend on the outer counter — the basis of triangle patterns.

### Complexity — O(n²)

```cpp
int count = 0;
for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j)
        ++count;        // runs n × n = n² times
```

Two nested loops over `n` each = O(n²). For n = 10,000 that's 100 million iterations — nested loops get expensive fast.

## Visual — Nested Iteration Order

```
 outer i ────────▶
         j=0 j=1 j=2
 i=0  →  (0,0)(0,1)(0,2)
 i=1  →  (1,0)(1,1)(1,2)
 i=2  →  (2,0)(2,1)(2,2)
 │
 inner j runs to completion for EACH i
```

Think of it as a grid: the outer loop picks the row, the inner loop walks its columns.

## Code Examples

### Example 1 — Multiplication table (5×5)

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 5; ++i) {
        for (int j = 1; j <= 5; ++j) {
            std::cout << i * j << "\t";
        }
        std::cout << "\n";
    }
    return 0;
}
```

### Example 2 — Sum of a 2D array

```cpp
#include <iostream>

int main() {
    int grid[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int sum = 0;

    for (int r = 0; r < 3; ++r)
        for (int c = 0; c < 3; ++c)
            sum += grid[r][c];

    std::cout << "Sum: " << sum << "\n";   // 45
    return 0;
}
```

### Example 3 — Right triangle of stars

```cpp
#include <iostream>

int main() {
    int rows = 5;
    for (int i = 1; i <= rows; ++i) {
        for (int j = 1; j <= i; ++j) {
            std::cout << "*";
        }
        std::cout << "\n";
    }
    return 0;
}
```

## Common Mistakes

1. **Swapping rows and columns** — trace which index is the row.
2. **Wrong inner bound** — `j < 3` vs `j <= 3` changes the shape.
3. **Reusing the same loop variable** — `for (int i...) for (int i...)` shadows and confuses.
4. **Forgetting the newline after the inner loop** — output jumbles into one line.
5. **Deep nesting without need** — three+ levels are hard to read.
6. **Underestimating O(n²)** — nested loops over large n are slow.

## Best Practices

- Use `r`/`c` (or `i`/`j`) consistently for outer/inner loops.
- Print a newline after each inner loop when outputting rows.
- Keep nesting to two levels when possible.
- Watch the complexity — nested loops over n are O(n²).
- Draw the output for the first few iterations to verify logic.

## Practice Questions

1. Print a 10×10 multiplication table.
2. Sum all elements of a 3×3 matrix using nested loops.
3. Print a right triangle of stars with 5 rows.
4. Print the coordinates (i, j) for a 4×4 grid.
5. Explain the time complexity of two nested loops over n.

## Multiple Choice Questions (MCQs)

### Q1. For an outer loop (3×) and inner loop (3×), the inner body runs:
- a) 3 times
- b) 6 times
- c) 9 times
- d) 27 times

**Answer:** c — 3 × 3 = 9 total iterations.

### Q2. In 2D array processing, the outer loop usually represents:
- a) Columns
- b) Rows
- c) Values
- d) Nothing

**Answer:** b — outer = rows, inner = columns.

### Q3. Two nested loops over n are:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** b — n × n iterations.

### Q4. `for (int j = 0; j <= i; ++j)` produces:
- a) A square
- b) A growing triangle
- c) A shrinking triangle
- d) A diagonal only

**Answer:** b — the inner bound grows with i.

### Q5. To print rows on separate lines, add:
- a) A space
- b) `std::cout << "\n"` after the inner loop
- c) A tab
- d) Nothing

**Answer:** b — the newline separates rows.

## Key Takeaways

- Nested loops: inner loop completes for each outer iteration.
- Outer = rows, inner = columns for 2D structures.
- Variable inner bounds create triangle shapes.
- Nested loops over n are O(n²) — mind the cost.

## Next Topic

[3.5 Pattern Programming](lesson-3.5-pattern-programming.md)
