---
module: 3
topic: "3.2"
title: "Loops"
slug: "loops"
difficulty: "Beginner"
prerequisites:
  - Conditional Statements
estimated_minutes: 30
tags:
  - cpp
  - control-flow
  - loops
---

# 3.2 Loops

## Overview

**Loops** repeat a block of code. C++ offers three: **`for`** (count-based), **`while`** (condition-first), and **`do-while`** (body-first, runs at least once). Plus the **range-based `for`** for cleanly iterating containers. Loops are how you process collections, compute sums, and avoid copy-pasting code.

## Learning Objectives

After this lesson you will be able to:

- Write `for`, `while`, and `do-while` loops
- Use the range-based `for` loop
- Choose the right loop for a task
- Avoid infinite loops and off-by-one errors
- Accumulate sums and counts with loops

## Core Concepts

### The for loop

```cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << " ";    // 0 1 2 3 4
}
```

Three parts: **initialization** (`int i = 0`), **condition** (`i < 5`), **update** (`++i`). Runs while the condition is true.

### The while loop

```cpp
int i = 0;
while (i < 5) {
    std::cout << i << " ";
    ++i;
}
```

`while` checks the condition **before** each iteration — it may run zero times.

### The do-while loop

```cpp
int i = 0;
do {
    std::cout << i << " ";
    ++i;
} while (i < 5);
```

`do-while` runs the body **first**, then checks the condition — it always runs **at least once** (ideal for menus and input validation).

### Range-based for (modern C++)

```cpp
int arr[] = {10, 20, 30, 40};
for (int x : arr) {
    std::cout << x << " ";    // 10 20 30 40
}
```

The range-based `for` iterates over every element of an array or container — no index, no off-by-one.

### Accumulator pattern

```cpp
int sum = 0;
for (int i = 1; i <= 100; ++i) {
    sum += i;                  // accumulate into sum
}
std::cout << sum;              // 5050
```

### Counting matches

```cpp
int count = 0;
for (int x : arr) {
    if (x % 2 == 0) ++count;   // count evens
}
```

### Choosing a loop

| Situation | Loop |
|---|---|
| Known number of iterations | `for` |
| Loop while a condition holds | `while` |
| Run at least once | `do-while` |
| Every element of a container | range-based `for` |

## Visual — Loop Anatomy

```
 for (init; condition; update)
      │       │          │
      │       ├── check BEFORE each iteration
      │       └── when false → exit
      └── runs once at the start
             │
        ┌────▼────┐
        │  body   │──▶ update ──▶ check condition ──▶ repeat or exit
        └─────────┘
```

Initialization runs once; then condition → body → update repeat until the condition is false.

## Code Examples

### Example 1 — Sum of 1..n

```cpp
#include <iostream>

int main() {
    int n;
    std::cout << "n: ";
    std::cin >> n;

    int sum = 0;
    for (int i = 1; i <= n; ++i) sum += i;
    std::cout << "Sum: " << sum << "\n";
    return 0;
}
```

### Example 2 — Menu with do-while

```cpp
#include <iostream>

int main() {
    int choice;
    do {
        std::cout << "1. Play  2. Quit\nChoice: ";
        std::cin >> choice;
    } while (choice != 2);
    std::cout << "Goodbye!\n";
    return 0;
}
```

### Example 3 — Range-based for over an array

```cpp
#include <iostream>

int main() {
    int scores[] = {85, 90, 78, 92};
    int total = 0;
    for (int s : scores) total += s;
    std::cout << "Average: " << total / 4.0 << "\n";
    return 0;
}
```

## Common Mistakes

1. **Off-by-one** — `<` vs `<=` changes the iteration count; trace small cases.
2. **Infinite loop** — forgetting the update (`++i`) in `while`/`for`.
3. **Using `=` in the condition** — `while (i = 5)` assigns and loops forever.
4. **Wrong semicolon** — `for (...);` creates an empty loop body.
5. **Modifying the loop variable inside the body** — confusing and error-prone.
6. **Range-based for on a decayed pointer** — it only works on actual arrays/containers.

## Best Practices

- Use `for` for counted loops; range-based `for` for containers.
- Use `do-while` for at-least-once logic (menus, input).
- Keep loop bodies small; extract work into functions (Module 4).
- Avoid magic numbers in the condition; use named constants.
- Trace the first and last iterations to catch off-by-one errors.

## Practice Questions

1. Print numbers 1 to 10 with a `for` loop.
2. Print even numbers from 2 to 20 with a `while` loop.
3. Use a `do-while` loop for a menu that repeats until "quit".
4. Sum all elements of an array with a range-based `for`.
5. Write a loop that counts how many array elements are greater than 50.

## Multiple Choice Questions (MCQs)

### Q1. A `for` loop's condition is checked:
- a) Once
- b) Before each iteration
- c) After the loop ends
- d) Never

**Answer:** b — the condition gates every iteration.

### Q2. A `do-while` loop:
- a) May run zero times
- b) Always runs at least once
- c) Never runs
- d) Runs exactly twice

**Answer:** b — the body runs before the first check.

### Q3. The range-based `for (int x : arr)`:
- a) Requires an index
- b) Iterates each element of `arr`
- c) Runs once
- d) Is invalid C++

**Answer:** b — it visits every element in order.

### Q4. `for (int i = 0; i < 5; ++i)` runs the body:
- a) 4 times
- b) 5 times
- c) 6 times
- d) Once

**Answer:** b — i = 0,1,2,3,4 → 5 iterations.

### Q5. Which loop is best when the iteration count is unknown but a condition holds?
- a) `for`
- b) `while`
- c) range-based `for`
- d) none

**Answer:** b — `while` repeats while a condition is true.

## Key Takeaways

- `for` = counted; `while` = condition-first; `do-while` = body-first (runs once).
- Range-based `for` cleanly iterates containers.
- Accumulator and counter patterns power sums and tallies.
- Watch for off-by-one errors and missing updates.

## Next Topic

[3.3 Loop Control Statements](lesson-3.3-loop-control-statements.md)
