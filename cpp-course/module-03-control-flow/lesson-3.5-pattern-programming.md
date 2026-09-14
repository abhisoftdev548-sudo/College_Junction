---
module: 3
topic: "3.5"
title: "Pattern Programming"
slug: "pattern-programming"
difficulty: "Beginner"
prerequisites:
  - Nested Loops
estimated_minutes: 30
tags:
  - cpp
  - control-flow
  - patterns
  - nested-loops
---

# 3.5 Pattern Programming

## Overview

**Pattern programming** prints shapes (stars, numbers, letters) using nested loops. It's a classic way to sharpen loop logic — and a favourite in coding interviews and placements. The skill is the same everywhere: figure out, for each row, **how many characters of what kind** to print, in what order.

## Learning Objectives

After this lesson you will be able to:

- Print right, inverted, and full pyramids
- Print number and diamond patterns
- Derive loop bounds from row position
- Print spaces + symbols to centre shapes
- Approach any pattern methodically

## Core Concepts

### The general approach

For a shape of `n` rows, row `i` (0-based) usually needs:

1. A number of **spaces** (for centring).
2. A number of **symbols** (stars, digits).
3. A **newline** at the end of the row.

Derive each count as a function of `i` and `n`.

### Right triangle (growing stars)

```cpp
int n = 5;
for (int i = 1; i <= n; ++i) {
    for (int j = 1; j <= i; ++j) std::cout << "*";
    std::cout << "\n";
}
// *
// **
// ***
// ****
// *****
```

### Inverted triangle

```cpp
for (int i = n; i >= 1; --i) {
    for (int j = 1; j <= i; ++j) std::cout << "*";
    std::cout << "\n";
}
// *****
// ****
// ***
// **
// *
```

### Pyramid (spaces + stars)

```cpp
int n = 5;
for (int i = 1; i <= n; ++i) {
    for (int s = 1; s <= n - i; ++s) std::cout << " ";   // leading spaces
    for (int j = 1; j <= 2 * i - 1; ++j) std::cout << "*"; // odd stars
    std::cout << "\n";
}
//     *
//    ***
//   *****
//  *******
// *********
```

Row `i` has `n - i` spaces and `2*i - 1` stars — that's the pyramid formula.

### Number triangle

```cpp
for (int i = 1; i <= 5; ++i) {
    for (int j = 1; j <= i; ++j) std::cout << j;
    std::cout << "\n";
}
// 1
// 12
// 123
// 1234
// 12345
```

### Diamond (two halves)

```cpp
int n = 5;
// upper half (including middle)
for (int i = 1; i <= n; ++i) {
    for (int s = 1; s <= n - i; ++s) std::cout << " ";
    for (int j = 1; j <= 2 * i - 1; ++j) std::cout << "*";
    std::cout << "\n";
}
// lower half
for (int i = n - 1; i >= 1; --i) {
    for (int s = 1; s <= n - i; ++s) std::cout << " ";
    for (int j = 1; j <= 2 * i - 1; ++j) std::cout << "*";
    std::cout << "\n";
}
```

### Hollow rectangle

```cpp
int rows = 4, cols = 6;
for (int r = 0; r < rows; ++r) {
    for (int c = 0; c < cols; ++c) {
        if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1)
            std::cout << "*";       // border
        else
            std::cout << " ";       // hollow inside
    }
    std::cout << "\n";
}
```

## Visual — The Pyramid Formula

```
 row i   spaces (n-i)   stars (2i-1)
   1         4               1          "    *"
   2         3               3          "   ***"
   3         2               5          "  *****"
   4         1               7          " *******"
   5         0               9          "*********"
```

Spaces decrease by 1 each row; stars increase by 2 — the pyramid emerges.

## Code Examples

### Example 1 — Full pyramid

```cpp
#include <iostream>

int main() {
    int n = 5;
    for (int i = 1; i <= n; ++i) {
        for (int s = 1; s <= n - i; ++s) std::cout << " ";
        for (int j = 1; j <= 2 * i - 1; ++j) std::cout << "*";
        std::cout << "\n";
    }
    return 0;
}
```

### Example 2 — Floyd's triangle (numbers)

```cpp
#include <iostream>

int main() {
    int num = 1;
    for (int i = 1; i <= 4; ++i) {
        for (int j = 1; j <= i; ++j) {
            std::cout << num++ << " ";
        }
        std::cout << "\n";
    }
    // 1
    // 2 3
    // 4 5 6
    // 7 8 9 10
    return 0;
}
```

### Example 3 — Hollow square

```cpp
#include <iostream>

int main() {
    int n = 5;
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < n; ++c) {
            if (r == 0 || r == n - 1 || c == 0 || c == n - 1)
                std::cout << "*";
            else
                std::cout << " ";
        }
        std::cout << "\n";
    }
    return 0;
}
```

## Common Mistakes

1. **Wrong space count** — off-by-one in `n - i` shifts the whole shape.
2. **Even number of stars in a pyramid row** — pyramids use `2*i - 1` (odd).
3. **Forgetting the newline** — everything prints on one line.
4. **Mixing 0-based and 1-based row counting** — pick one and stay consistent.
5. **Hardcoding when `n` should vary** — parametrize by `n`.
6. **Adding spaces after stars** — usually unnecessary; only leading spaces matter.

## Best Practices

- Derive the formula for each row before coding.
- Use `n` as a variable; don't hardcode sizes.
- Print spaces first, then symbols, then a newline.
- Trace the first and last rows to verify the bounds.
- Build complex shapes (diamond) from two simpler halves.

## Practice Questions

1. Print a right triangle of stars with `n` rows.
2. Print an inverted right triangle.
3. Print a full pyramid with spaces and stars.
4. Print a diamond pattern.
5. Print Floyd's triangle of numbers.

## Multiple Choice Questions (MCQs)

### Q1. A pyramid row `i` (1-based, `n` rows) has how many stars?
- a) `i`
- b) `2*i - 1`
- c) `n - i`
- d) `i*i`

**Answer:** b — odd counts: 1, 3, 5, ...

### Q2. The number of leading spaces in row `i` of a pyramid is:
- a) `i`
- b) `n - i`
- c) `2*i`
- d) `n + i`

**Answer:** b — spaces shrink as `i` grows.

### Q3. A diamond is usually built from:
- a) One loop
- b) Two halves (upper + lower)
- c) Recursion only
- d) A single nested loop

**Answer:** b — upper half then lower half.

### Q4. In a hollow square, stars print only when:
- a) Inside the shape
- b) On the border (first/last row or column)
- c) Row equals column
- d) Always

**Answer:** b — border cells are stars; interior is spaces.

### Q5. Floyd's triangle prints:
- a) Only stars
- b) Consecutive numbers
- c) Letters
- d) A diamond

**Answer:** b — a running counter of numbers.

## Key Takeaways

- Patterns = derive per-row counts of spaces and symbols.
- Pyramid: `n - i` spaces, `2*i - 1` stars.
- Build diamonds from two halves; hollow shapes via border conditions.
- Parametrize by `n`; trace edge rows to verify.

## Module 3 Complete 🎉

You've finished **Module 3 — Control Flow**. Next up: **Module 4 — Functions**.
