---
module: 3
topic: "3.3"
title: "Loop Control (break, continue, labels)"
slug: "loop-control"
difficulty: "Beginner"
prerequisites:
  - Loops
estimated_minutes: 25
tags:
  - java
  - control-flow
  - break
  - continue
---

# 3.3 Loop Control (break, continue, labels)

## Overview

**`break`** exits a loop entirely; **`continue`** skips the current iteration and jumps to the next; **labeled** `break`/`continue` control nested loops precisely. These three tools give you fine-grained control over loop flow — used for early exit, skipping invalid items, and multi-level jumps.

## Learning Objectives

After this lesson you will be able to:

- Use `break` to exit a loop early
- Use `continue` to skip an iteration
- Use labeled break/continue for nested loops
- Choose early-exit vs flag variables
- Recognize when a loop condition is clearer than `break`

## Core Concepts

### break — exit the loop

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;         // exit the loop entirely
    System.out.println(i);     // prints 1 2 3 4
}
```

`break` immediately terminates the innermost loop.

### continue — skip to the next iteration

```java
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  // skip even numbers
    System.out.println(i);     // prints 1 3 5 7 9
}
```

`continue` jumps to the update/condition for the next pass — the rest of the body is skipped.

### Labeled break — exit nested loops

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i * j > 4) break outer;   // exit BOTH loops
        System.out.println(i + "x" + j + "=" + (i * j));
    }
}
```

A label (`outer:`) before a loop lets `break outer;` exit that specific loop, not just the innermost.

### Labeled continue

```java
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) continue outer;   // jump to next i
        System.out.println(i + "," + j);
    }
}
```

### break in a switch

`break` also ends a `case` in a classic switch (see 3.1) — a different use of the same keyword.

### Search loops (the classic break pattern)

```java
int[] data = {3, 8, 2, 9, 4};
int target = 2, index = -1;

for (int i = 0; i < data.length; i++) {
    if (data[i] == target) {
        index = i;
        break;              // found — stop searching
    }
}
System.out.println("Found at " + index);
```

## Visual — break vs continue

```
 for i = 1..10:

  break at i==5:        continue at even:
  1 ✓                   1 ✓
  2 ✓                   2 ✗ (skip)
  3 ✓                   3 ✓
  4 ✓                   4 ✗ (skip)
  5 → EXIT loop         5 ✓
  (6..10 never run)     6 ✗ ...
```

`break` stops the whole loop; `continue` only skips the current pass.

## Code Examples

### Example 1 — Find first divisible by 7

```java
public class FirstMultiple {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 7 == 0) {
                System.out.println("First multiple of 7: " + i);   // 7
                break;
            }
        }
    }
}
```

### Example 2 — Skip invalid input

```java
public class SkipNegatives {
    public static void main(String[] args) {
        int[] values = {5, -3, 8, -1, 2};
        int total = 0;
        for (int v : values) {
            if (v < 0) continue;   // ignore negatives
            total += v;
        }
        System.out.println("Sum of positives = " + total);   // 15
    }
}
```

### Example 3 — Labeled break in a 2D search

```java
public class Search2D {
    public static void main(String[] args) {
        int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int target = 5;
        boolean found = false;

        outer:
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == target) {
                    System.out.println("Found at " + i + "," + j);
                    found = true;
                    break outer;      // exit both loops
                }
            }
        }
        if (!found) System.out.println("Not found");
    }
}
```

## Common Mistakes

1. **Confusing `break` and `continue`** — `break` exits, `continue` skips.
2. **Forgetting the label on the target loop** — `break outer;` needs `outer:` defined.
3. **Unreachable code after `break`/`continue`** — statements after them in the same block won't run.
4. **Overusing `break`** — often the loop condition itself is clearer.
5. **`continue` in a `while` skipping the update** — the loop can become infinite.
6. **Label on a statement (not a loop)** — labels work on loops/statements, but `break label` only makes sense on loops.

## Best Practices

- Prefer a clear loop condition over scattered `break`s.
- Use `break` for early exit (search/found), `continue` for filtering invalid items.
- Use labels sparingly — only when a nested loop truly needs a multi-level exit.
- Keep labeled loops short; deep nesting with labels is hard to follow.

## Practice Questions

1. Print 1 to 20 but `break` when you reach a number divisible by 13.
2. Print odd numbers 1 to 20 using `continue`.
3. Search a 2D array for a value using a labeled `break`.
4. Rewrite a flag-variable search using `break` instead.
5. Show why `continue` before a `while` update can cause an infinite loop.

## Multiple Choice Questions (MCQs)

### Q1. `break` inside a loop:
- a) Skips one iteration
- b) Exits the loop entirely
- c) Restarts the loop
- d) Does nothing

**Answer:** b

### Q2. `continue` inside a loop:
- a) Exits the loop
- b) Skips to the next iteration
- c) Stops the program
- d) Repeats the current iteration

**Answer:** b

### Q3. A labeled `break outer;`:
- a) Exits the innermost loop only
- b) Exits the loop labeled `outer`
- c) Skips the `outer` loop
- d) Is a syntax error

**Answer:** b

### Q4. `break` is also used to end a case in:
- a) `if`
- b) `for`
- c) a classic `switch`
- d) a method

**Answer:** c

### Q5. Which is typically clearest for "stop when found"?
- a) A `while(true)` with many breaks
- b) A `for`/`while` with a `break` after finding
- c) A recursive call
- d) No loop at all

**Answer:** b

## Key Takeaways

- `break` exits a loop; `continue` skips an iteration; labels target outer loops.
- Search loops use `break`; filtering uses `continue`.
- Labels are powerful but use them sparingly.
- Prefer clear loop conditions over overusing control keywords.

## Next Topic

[3.4 Nested Loops](lesson-3.4-nested-loops.md)
