---
module: 5
topic: "5.2"
title: "Multidimensional Arrays"
slug: "multidimensional-arrays"
difficulty: "Beginner"
prerequisites:
  - Arrays (1D)
  - Nested Loops
estimated_minutes: 25
tags:
  - arrays
  - 2d-arrays
  - matrices
---

# 5.2 Multidimensional Arrays

## Overview

A **multidimensional array** is an array of arrays. The most common form is the **two-dimensional (2D)** array, which models a **table or matrix** with rows and columns. 2D arrays are the workhorse for grid-based problems, game boards, images, and matrices in linear algebra.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize 2D arrays
- Explain **row-major** memory layout
- Access elements with `array[row][column]`
- Traverse a 2D array with nested loops
- Recognize when to use `std::vector` or a flat 1D array instead

## Core Concepts

### Declaration

```cpp
type name[rows][cols];

int grid[3][4];      // 3 rows, 4 columns (12 ints)
double matrix[5][5]; // 5×5
```

Read the declaration **row first, then column**.

### Initialization

```cpp
// Nested-brace form (recommended — each inner brace is one row)
int grid[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

// Flat form (fills row by row)
int flat[2][3] = {1, 2, 3, 4, 5, 6};

// Partial initialization zero-fills the rest
int zeros[3][3] = {};
```

The compiler can infer the **first** dimension from the initializer, but not later ones:

```cpp
int ok[][3] = { {1,2,3}, {4,5,6} }; // rows inferred = 2
```

### Accessing Elements

```cpp
int grid[3][4] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };
std::cout << grid[0][0];  // 1  (first row, first column)
std::cout << grid[1][2];  // 7  (second row, third column)
std::cout << grid[2][3];  // 12 (last row, last column)
grid[1][1] = 99;          // modify element at row 1, col 1
```

### Traversal

```cpp
for (int r = 0; r < 3; ++r) {          // outer loop = rows
    for (int c = 0; c < 4; ++c) {      // inner loop = columns
        std::cout << grid[r][c] << " ";
    }
    std::cout << "\n";                 // newline after each row
}
```

## Memory Layout (Visual)

Despite looking like a table, a 2D array is still **one contiguous block** in memory, laid out **row by row** (row-major order).

```
int grid[3][4] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };

 logical view:                      actual memory (row-major):
  ┌─────────────────┐               0x100  1  2  3  4
  │  1   2   3   4  │  row 0        0x110  5  6  7  8
  │  5   6   7   8  │  row 1        0x120  9 10 11 12
  │  9  10  11  12  │  row 2
  └─────────────────┘
```

Element `grid[r][c]` lives at `base + (r * cols + c) * sizeof(int)`. This is why the compiler needs to know `cols` when a 2D array is passed to a function.

## Code Examples

### Example 1 — Sum of all elements

```cpp
#include <iostream>

int main() {
    int grid[3][4] = {
        {1,  2,  3,  4},
        {5,  6,  7,  8},
        {9, 10, 11, 12}
    };
    int sum = 0;
    for (int r = 0; r < 3; ++r)
        for (int c = 0; c < 4; ++c)
            sum += grid[r][c];
    std::cout << "Sum = " << sum << "\n"; // 78
    return 0;
}
```

### Example 2 — Sum of each row

```cpp
for (int r = 0; r < 3; ++r) {
    int rowSum = 0;
    for (int c = 0; c < 4; ++c)
        rowSum += grid[r][c];
    std::cout << "Row " << r << " sum = " << rowSum << "\n";
}
```

### Example 3 — Transpose of a square matrix

```cpp
int m[3][3] = { {1,2,3}, {4,5,6}, {7,8,9} };
for (int r = 0; r < 3; ++r)
    for (int c = r + 1; c < 3; ++c)   // only swap above the diagonal
        std::swap(m[r][c], m[c][r]);
```

## Common Mistakes

1. **Swapping row and column indices** — writing `grid[col][row]` and reading out of bounds.
2. **Wrong loop bounds** — using the row count for the inner (column) loop or vice versa.
3. **Assuming row-major when you meant column-major** — nested-loop order (`r`-outer vs `c`-outer) affects cache performance for large arrays.
4. **Forgetting the column dimension when passing to a function** — `void f(int g[][])` is a compile error; you must write `void f(int g[][4], int rows)`.
5. **Partial initialization confusion** — `int a[3][3] = {1,2,3}` fills the first row then zero-fills the rest, it does **not** fill a column.
6. **Using `=` to copy** — like 1D arrays, 2D raw arrays cannot be assigned with `=`.

## Best Practices

- For fixed-size grids, prefer `std::array<std::array<int, 4>, 3>` — copyable, bounds-checkable with `.at()`.
- For dynamic grids, use `std::vector<std::vector<int>>` or a **flat** `std::vector<int>` of size `rows * cols` (one allocation, cache-friendlier).
- Index with `r`/`c` or `row`/`col` names to keep the order obvious.
- Prefer nested-brace initializers so each row is visually explicit.

## Practice Questions

1. Print a 3×3 matrix in **column-major** order (all of column 0, then column 1, then column 2).
2. Compute the sum of the **main diagonal** of a square matrix `{ {1,2,3}, {4,5,6}, {7,8,9} }` (answer: 15).
3. Write code to multiply every element of a 2×3 matrix by 2 in place.
4. Given a 3×3 matrix, print the **transpose** without modifying the original.
5. Read a 3×3 grid of integers and print the maximum value in **each column**.

## Multiple Choice Questions (MCQs)

### Q1. How many elements does `int arr[3][4];` hold?
- a) 7
- b) 12
- c) 34
- d) 16

**Answer:** b — rows × columns = 3 × 4.

### Q2. In a 2D array `int a[3][4]`, which is a valid element access?
- a) `a[3][4]`
- b) `a[2][3]`
- c) `a[0][4]`
- d) `a[4][2]`

**Answer:** b — valid indices are rows 0–2 and columns 0–3.

### Q3. C++ stores a 2D array in memory using which order?
- a) Column-major
- b) Row-major
- c) Random order
- d) Depends on the compiler flag

**Answer:** b — rows are stored contiguously, one after another.

### Q4. Which correctly initializes a 2×2 array with `{ {1,2}, {3,4} }`?
- a) `int a[2][2] = {{1,2},{3,4}};`
- b) `int a[2][2] = {1,2,3,4};`
- c) `int a[][2] = {{1,2},{3,4}};`
- d) All of the above

**Answer:** d — all three forms are valid and equivalent.

### Q5. When passing a 2D array to a function, which dimension must always be specified?
- a) The number of rows
- b) The number of columns
- c) Both
- d) Neither

**Answer:** b — the compiler needs the column count to compute element offsets.

## Key Takeaways

- A 2D array is an **array of arrays**, addressed as `a[row][col]`.
- Memory is **row-major**: all of row 0, then row 1, and so on, in one contiguous block.
- Traversal uses **nested loops** — rows outer, columns inner.
- When passed to a function, the **column count** must be stated explicitly.

## Next Topic

[5.3 Strings](lesson-5.3-strings.md)
