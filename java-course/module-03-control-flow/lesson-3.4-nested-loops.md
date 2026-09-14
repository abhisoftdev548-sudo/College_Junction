---
module: 3
topic: "3.4"
title: "Nested Loops"
slug: "nested-loops"
difficulty: "Beginner"
prerequisites:
  - Loop Control
  - Multidimensional Arrays
estimated_minutes: 25
tags:
  - java
  - control-flow
  - nested-loops
---

# 3.4 Nested Loops

## Overview

A **nested loop** is a loop inside another loop — the inner loop runs completely for every iteration of the outer loop. Nested loops are how you process grids, tables, matrices, and combinations. They're also where **O(n²)** complexity (Module 14) and off-by-one bugs commonly appear.

## Learning Objectives

After this lesson you will be able to:

- Write nested `for`/`while` loops
- Trace the execution order of inner vs outer loops
- Iterate 2D arrays (matrices) row by row
- Print tables and rectangular grids
- Recognize the O(n²) cost of nested loops

## Core Concepts

### The basic pattern

```java
for (int i = 0; i < 3; i++) {        // outer: rows
    for (int j = 0; j < 3; j++) {    // inner: columns
        System.out.print("(" + i + "," + j + ") ");
    }
    System.out.println();            // newline after each row
}
```

For each `i`, the inner `j` loop runs fully. Total iterations = `3 × 3 = 9`.

### Multiplication table

```java
for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        System.out.print(i * j + "\t");
    }
    System.out.println();
}
```

### Iterating a 2D array (matrix)

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < matrix.length; i++) {          // rows
    for (int j = 0; j < matrix[i].length; j++) {   // columns
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
```

`matrix.length` = rows; `matrix[i].length` = columns in row `i`.

### Nested enhanced for

```java
for (int[] row : matrix) {           // each row is an int[]
    for (int value : row) {          // each element in the row
        System.out.print(value + " ");
    }
    System.out.println();
}
```

Cleaner than index loops when you don't need positions.

### Triangular (inner depends on outer)

```java
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {   // inner runs i times
        System.out.print("*");
    }
    System.out.println();
}
// *
// **
// ***
// ****
// *****
```

The inner loop's bound can depend on the outer counter — the key to patterns (3.5).

## Visual — Nested Loop Execution

```
 i=0: j=0  j=1  j=2   (inner runs 3 times)
 i=1: j=0  j=1  j=2
 i=2: j=0  j=1  j=2

 total = 3 outer × 3 inner = 9 iterations
```

The outer loop advances only after the inner loop completes.

## Code Examples

### Example 1 — A grid of coordinates

```java
public class Grid {
    public static void main(String[] args) {
        for (int r = 1; r <= 3; r++) {
            for (int c = 1; c <= 4; c++) {
                System.out.print("(" + r + "," + c + ") ");
            }
            System.out.println();
        }
    }
}
```

### Example 2 — Sum all elements of a matrix

```java
public class MatrixSum {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5, 6}};
        int sum = 0;
        for (int[] row : m) {
            for (int v : row) {
                sum += v;
            }
        }
        System.out.println("Sum = " + sum);   // 21
    }
}
```

### Example 3 — Number triangle

```java
public class Triangle {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}
// 1
// 1 2
// 1 2 3
// 1 2 3 4
// 1 2 3 4 5
```

## Common Mistakes

1. **Swapping row and column indices** — `matrix[j][i]` reads the wrong direction.
2. **Using `matrix.length` for the inner bound** — ragged arrays need `matrix[i].length`.
3. **Off-by-one** — `j <= matrix[i].length` walks past the end.
4. **Forgetting the inner newline** — everything prints on one line.
5. **Confusing which loop is outer** — the outer loop controls rows/major steps.
6. **Nesting too deep** — triple/quadruple loops are slow (O(n³)+) and hard to read.

## Best Practices

- Name loop variables meaningfully (`row`/`col`, `i`/`j`).
- Prefer nested enhanced `for` when indices aren't needed.
- Use `matrix.length` (rows) and `matrix[i].length` (columns) correctly.
- Be aware of the complexity: two nested loops over n = O(n²).
- Keep nesting shallow; extract inner logic to a method if it gets long.

## Practice Questions

1. Print a 10×10 multiplication table.
2. Print the elements of a 3×3 matrix row by row.
3. Sum the elements of each row of a matrix and print the row sums.
4. Print a right triangle of `*` with 6 rows.
5. Count how many elements in a 2D array are greater than a given value.

## Multiple Choice Questions (MCQs)

### Q1. Two nested loops each running n times execute:
- a) n iterations
- b) 2n iterations
- c) n² iterations
- d) log n iterations

**Answer:** c

### Q2. In `matrix[i][j]`, `i` is typically the:
- a) Column
- b) Row
- c) Element value
- d) Length

**Answer:** b

### Q3. For a ragged 2D array, the inner loop bound should be:
- a) `matrix.length`
- b) `matrix[i].length`
- c) `matrix[j].length`
- d) A constant

**Answer:** b

### Q4. A triangular pattern uses:
- a) A constant inner bound
- b) An inner bound that depends on the outer counter
- c) No inner loop
- d) A `do-while` only

**Answer:** b

### Q5. Nested enhanced for over a matrix looks like:
- a) `for (int[] row : m) for (int v : row)`
- b) `for (int v : m)`
- c) `for (int i : m.length)`
- d) `for (m)`

**Answer:** a

## Key Takeaways

- Nested loops = loop inside a loop; total work is the product of iterations.
- Outer = rows/major steps; inner = columns/minor steps.
- Use `matrix.length` and `matrix[i].length` correctly.
- Nested loops are O(n²) when both bounds are n — a key complexity fact.

## Next Topic

[3.5 Pattern Programming](lesson-3.5-pattern-programming.md)
