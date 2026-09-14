---
module: 3
topic: "3.2"
title: "Loops (for, while, do-while)"
slug: "loops"
difficulty: "Beginner"
prerequisites:
  - Conditional Statements
estimated_minutes: 30
tags:
  - java
  - control-flow
  - loops
---

# 3.2 Loops (for, while, do-while)

## Overview

**Loops** repeat a block of code. Java has three: `for` (known count), `while` (condition-first), and `do-while` (body-first). There's also the **enhanced for** (for-each) for iterating collections — the workhorse of modern Java. This lesson covers all four and when to use each.

## Learning Objectives

After this lesson you will be able to:

- Write `for`, `while`, and `do-while` loops
- Choose the right loop for the situation
- Iterate arrays and collections with the enhanced `for`
- Use `var` inside loops (Java 10+)
- Avoid infinite loops and off-by-one errors

## Core Concepts

### for — when you know the count

```java
for (int i = 0; i < 5; i++) {       // init; condition; update
    System.out.println(i);          // 0 1 2 3 4
}
```

Three parts: **initialization**, **condition** (checked before each iteration), **update**.

### while — when the condition decides

```java
int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;                   // don't forget to update!
}
```

Use `while` when you don't know the count in advance (e.g. reading until sentinel).

### do-while — run at least once

```java
int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);
```

The body runs **before** the condition is checked — guaranteed at least once.

### Enhanced for (for-each) — iterate a collection

```java
int[] numbers = {10, 20, 30};
for (int n : numbers) {
    System.out.println(n);          // 10 20 30
}
```

No index, no off-by-one — the cleanest way to read every element. Works on arrays, `List`, `Set`, and any `Iterable`.

### var in the enhanced for (Java 10)

```java
for (var n : numbers) {     // n inferred as int
    System.out.println(n);
}
```

### Choosing a loop

| Situation | Loop |
|---|---|
| Known number of iterations | `for` |
| Condition decides; may be zero times | `while` |
| Must run at least once | `do-while` |
| Reading every element of a collection | enhanced `for` |

## Visual — Loop Flow

```
 for (int i = 0; i < 5; i++)
      │         │      │
      ▼         ▼      ▼
   start at 0  check < 5   i++ after each body
      │
   ┌──▼───────────┐
   │ body (print) │──▶ i++ ──▶ check again
   └──────────────┘            │
                      true ◀───┘   false → exit
```

Init once, check before each pass, update after each pass, exit when the condition is false.

## Code Examples

### Example 1 — Sum with a for loop

```java
public class Sum {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("Sum 1..100 = " + sum);   // 5050
    }
}
```

### Example 2 — while until sentinel

```java
import java.util.Scanner;

public class Sentinel {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = 0;
        System.out.println("Enter numbers (0 to stop):");
        int n = sc.nextInt();
        while (n != 0) {
            total += n;
            n = sc.nextInt();
        }
        System.out.println("Total = " + total);
        sc.close();
    }
}
```

### Example 3 — Enhanced for over an array

```java
public class ForEach {
    public static void main(String[] args) {
        String[] fruits = {"apple", "banana", "cherry"};
        for (String f : fruits) {
            System.out.println(f.toUpperCase());   // APPLE BANANA CHERRY
        }
    }
}
```

## Common Mistakes

1. **Infinite loop** — forgetting the update in `while`, or a condition that never turns false.
2. **Off-by-one** — `i <= n` instead of `i < n` runs one extra iteration.
3. **Wrong condition in do-while** — the body runs once even if the condition is false.
4. **Modifying a collection while iterating** — causes `ConcurrentModificationException`.
5. **Using enhanced for when you need the index** — use a classic `for` for index access.
6. **Empty-body loop** — `for (int i = 0; i < 5; i++);` — the stray semicolon is an empty body.

## Best Practices

- Use enhanced `for` whenever you don't need the index.
- Use `for` for counted loops; `while` for condition-driven loops.
- Declare the loop variable in the loop header (`for (int i ...)`) to limit its scope.
- Avoid mutating the collection you're iterating.
- Keep loop bodies small and single-purpose.

## Practice Questions

1. Print the numbers 1 to 10 with a `for` loop.
2. Print the even numbers 2 to 20 with a `while` loop.
3. Read numbers until the user enters -1 and print their average.
4. Iterate a `String[]` with the enhanced for and print each length.
5. Write a `do-while` loop that asks for a positive number until one is entered.

## Multiple Choice Questions (MCQs)

### Q1. Which loop runs at least once?
- a) `for`
- b) `while`
- c) `do-while`
- d) Enhanced for

**Answer:** c

### Q2. The enhanced for loop is best for:
- a) Index-based access
- b) Reading every element of a collection
- c) Modifying the collection size
- d) Infinite loops

**Answer:** b

### Q3. `for (int i = 0; i < 5; i++)` runs how many times?
- a) 4
- b) 5
- c) 6
- d) Infinite

**Answer:** b

### Q4. A `while` loop with a missing update usually causes:
- a) A compile error
- b) An infinite loop
- c) Zero iterations
- d) A warning

**Answer:** b

### Q5. `var` in an enhanced for (`for (var x : list)`) is available since:
- a) Java 5
- b) Java 8
- c) Java 10
- d) Java 25

**Answer:** c

## Key Takeaways

- `for` = counted; `while` = condition-first; `do-while` = body-first (at least once).
- Enhanced `for` (for-each) is the cleanest way to read collections.
- Watch for infinite loops and off-by-one errors.
- Choose the loop that matches the situation.

## Next Topic

[3.3 Loop Control (break, continue, labels)](lesson-3.3-loop-control.md)
