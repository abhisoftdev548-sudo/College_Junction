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
  - java
  - control-flow
  - patterns
---

# 3.5 Pattern Programming

## Overview

**Pattern programming** — printing triangles, diamonds, and number/character shapes with nested loops — is the classic way to master loop logic. Every pattern is a formula: how many characters per row, how many spaces, and how they change with the row number. Once you see the formula, the code follows.

## Learning Objectives

After this lesson you will be able to:

- Derive the row formula for any pattern
- Print right, inverted, and centered (pyramid) triangles
- Print a diamond and number patterns
- Combine spaces + stars + numbers in one pattern
- Debug off-by-one issues in patterns

## Core Concepts

### The universal recipe

For every pattern, answer three questions per row `i`:

1. How many **spaces**?
2. How many **characters** (stars/numbers)?
3. What **value** at each position?

Then nest three inner loops: spaces, then characters, then a newline.

### Right triangle

```java
int n = 5;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}
```

Row `i` has `i` stars.

### Inverted right triangle

```java
for (int i = n; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println();
}
```

### Pyramid (centered triangle)

```java
for (int i = 1; i <= n; i++) {
    for (int s = 1; s <= n - i; s++) System.out.print(" ");   // spaces
    for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*"); // stars
    System.out.println();
}
//     *
//    ***
//   *****
//  *******
// *********
```

Row `i`: `n - i` spaces, `2i - 1` stars.

### Number triangle (value = j or i)

```java
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + " ");   // print the column number
    }
    System.out.println();
}
```

### Diamond (two pyramids)

```java
// top half: rows 1..n (increasing)
// bottom half: rows n-1..1 (decreasing)
// combine the pyramid loop twice with a mirrored bound
```

## Visual — The Pyramid Formula

```
 row i   spaces (n-i)   stars (2i-1)
  1          4               1        →     *
  2          3               3        →    ***
  3          2               5        →   *****
  4          1               7        →  *******
  5          0               9        → *********
```

Once you fill this table, the code is just three loops: spaces, stars, newline.

## Code Examples

### Example 1 — Full pyramid

```java
public class Pyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}
```

### Example 2 — Number pyramid

```java
public class NumberPyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print(j + " ");
            System.out.println();
        }
    }
}
//     1
//    1 2
//   1 2 3
//  1 2 3 4
// 1 2 3 4 5
```

### Example 3 — Diamond

```java
public class Diamond {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {                 // top half
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {             // bottom half
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}
```

## Common Mistakes

1. **Off-by-one in stars** — the pyramid uses `2i - 1`, not `i`.
2. **Wrong spaces count** — centered patterns need `n - i` leading spaces.
3. **Forgetting the newline** — all rows print on one line.
4. **Printing `println` in the inner loop** — that breaks every character onto its own line.
5. **Mixing up row and column counters** — printing `i` vs `j` changes the pattern.
6. **Diamond bottom loop starting at `n` instead of `n-1`** — doubles the middle row.

## Best Practices

- **Derive the table first** (row → spaces → chars → value), then code.
- Use three inner loops: spaces, characters, newline.
- Keep `n` in one variable; change only the bounds.
- Test with a small `n` (like 3) and compare against the expected shape.
- For complex patterns, print `-` instead of spaces while debugging to see alignment.

## Practice Questions

1. Print a right triangle of `*` with 6 rows.
2. Print an inverted right triangle with 6 rows.
3. Print a centered pyramid with 5 rows.
4. Print a number triangle where each row shows `i` repeated `i` times.
5. Print a full diamond with 4 rows in the top half.

## Multiple Choice Questions (MCQs)

### Q1. In a pyramid of height n, row i has how many stars?
- a) `i`
- b) `2 * i - 1`
- c) `i * 2`
- d) `n - i`

**Answer:** b

### Q2. In a centered pyramid, row i has how many leading spaces?
- a) `i`
- b) `2 * i`
- c) `n - i`
- d) `n`

**Answer:** c

### Q3. A diamond is made of:
- a) Two mirrored pyramids
- b) One square
- c) A single triangle
- d) A diagonal line

**Answer:** a

### Q4. To print a row of a pattern on its own line, you should:
- a) `println` after the inner loops
- b) `println` inside the inner loop
- c) `print` once
- d) Add spaces only

**Answer:** a

### Q5. Printing `j` (vs `i`) in a number triangle produces:
- a) The row number repeated
- b) Increasing column numbers
- c) The same number every row
- d) Random values

**Answer:** b

## Key Takeaways

- Every pattern = a per-row formula for spaces, characters, and values.
- Pyramid: `n - i` spaces, `2i - 1` stars.
- Diamond = two mirrored pyramids.
- Derive the table first; then write spaces loop + chars loop + newline.

## Module 3 Complete 🎉

You've finished **Module 3 — Control Flow**. Next up: **Module 4 — Methods (Functions)**.
