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
  - java
  - arrays
  - 2d-arrays
  - matrices
---

# 5.2 Multidimensional Arrays

## Overview

A **multidimensional array** is an array of arrays — most commonly a **2D array**, which models a table or matrix of rows and columns. In Java, a 2D array is literally an array where each element is itself an array, which allows **ragged** (uneven) rows — a useful Java-specific flexibility.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize 2D arrays
- Access elements with `array[row][column]`
- Traverse with nested loops and nested enhanced `for`
- Understand ragged (jagged) arrays
- Compute row/column sums and totals

## Core Concepts

### Declaration and initialization

```java
int[][] grid = new int[3][4];        // 3 rows × 4 columns (all zeros)

int[][] matrix = {                   // literal initialization
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};
```

### Accessing elements

```java
System.out.println(matrix[0][0]);   // 1
System.out.println(matrix[1][2]);   // 7
System.out.println(matrix[2][3]);   // 12
matrix[1][1] = 99;                  // modify
```

`matrix[i][j]` = row `i`, column `j` (both zero-based).

### Traversal

```java
// classic nested loops
for (int r = 0; r < matrix.length; r++) {           // rows
    for (int c = 0; c < matrix[r].length; c++) {    // columns
        System.out.print(matrix[r][c] + " ");
    }
    System.out.println();
}

// nested enhanced for
for (int[] row : matrix) {              // each row is an int[]
    for (int value : row) {
        System.out.print(value + " ");
    }
    System.out.println();
}
```

### Ragged (jagged) arrays

```java
int[][] ragged = {
    {1, 2, 3},
    {4, 5},
    {6, 7, 8, 9}
};

// rows have DIFFERENT lengths — use matrix[i].length per row
for (int i = 0; i < ragged.length; i++) {
    System.out.println("Row " + i + " has " + ragged[i].length + " elements");
}
```

Because each "row" is an independent array, Java allows uneven rows — always use `matrix[i].length` for the inner bound.

### Sum of all elements

```java
int sum = 0;
for (int[] row : matrix)
    for (int v : row)
        sum += v;
```

## Visual — A 2D Array as Array-of-Arrays

```
 int[][] m = { {1,2,3}, {4,5,6} };

 m ──▶ ┌─────────┬─────────┐
        │ row[0] ─┼─▶ {1,2,3}
        │ row[1] ─┼─▶ {4,5,6}
        └─────────┴─────────┘

 m[1][2] → row 1, column 2 → 6
```

`m` is an array of row-arrays; `m[i]` is one row; `m[i][j]` is one element.

## Code Examples

### Example 1 — Print a matrix

```java
public class PrintMatrix {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        for (int[] row : m) {
            for (int v : row) {
                System.out.print(v + " ");
            }
            System.out.println();
        }
    }
}
```

### Example 2 — Sum of each row

```java
public class RowSums {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5, 6}};
        for (int i = 0; i < m.length; i++) {
            int rowSum = 0;
            for (int j = 0; j < m[i].length; j++) rowSum += m[i][j];
            System.out.println("Row " + i + " sum = " + rowSum);
        }
    }
}
```

### Example 3 — Ragged array

```java
public class Ragged {
    public static void main(String[] args) {
        int[][] triangle = {
            {1},
            {2, 3},
            {4, 5, 6},
            {7, 8, 9, 10}
        };
        for (int[] row : triangle) {
            for (int v : row) System.out.print(v + " ");
            System.out.println();
        }
    }
}
```

## Common Mistakes

1. **Swapping row and column** — `m[col][row]` reads the wrong element.
2. **Using `m.length` for the inner bound** — ragged arrays need `m[i].length`.
3. **Off-by-one** — `c <= m[i].length` walks past the end.
4. **Assuming all rows equal** — in ragged arrays they aren't.
5. **`m[0][0]` on an empty array** — throws if `m.length == 0`.
6. **Forgetting the inner newline** — the whole matrix prints on one line.

## Best Practices

- Use `matrix.length` (rows) and `matrix[i].length` (columns) — never hardcode.
- Prefer nested enhanced `for` when indices aren't needed.
- Name indices `row`/`col` for clarity.
- Use `Arrays.deepToString(m)` to print a 2D array quickly:

```java
System.out.println(Arrays.deepToString(m));   // [[1, 2], [3, 4]]
```

## Practice Questions

1. Print a 3×3 matrix in column-major order (all of column 0, then column 1, ...).
2. Compute the sum of the main diagonal of a square matrix.
3. Print the transpose of a 2×3 matrix.
4. Create a ragged array with 3 rows of lengths 2, 4, 1 and print it.
5. Find the maximum element in a 2D array and its position.

## Multiple Choice Questions (MCQs)

### Q1. `int[][] a = new int[3][4];` has how many elements?
- a) 7
- b) 12
- c) 34
- d) 16

**Answer:** b

### Q2. In `m[r][c]`, the first index is the:
- a) Column
- b) Row
- c) Value
- d) Length

**Answer:** b

### Q3. A ragged array has:
- a) Equal-length rows
- b) Rows of possibly different lengths
- c) Only one row
- d) No rows

**Answer:** b

### Q4. The correct inner-loop bound for a ragged array is:
- a) `m.length`
- b) `m[i].length`
- c) `m[j].length`
- d) A constant

**Answer:** b

### Q5. `Arrays.deepToString(m)` prints:
- a) The reference
- b) A 2D array's contents
- c) Only the first row
- d) The memory address

**Answer:** b

## Key Takeaways

- A 2D array is an **array of arrays**: `m[row][col]`.
- Traverse with nested loops; use `m.length` and `m[i].length`.
- Java supports **ragged arrays** (uneven rows).
- `Arrays.deepToString` prints nested arrays.

## Next Topic

[5.3 The String Class](lesson-5.3-the-string-class.md)
