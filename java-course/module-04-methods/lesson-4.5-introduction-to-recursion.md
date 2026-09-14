---
module: 4
topic: "4.5"
title: "Introduction to Recursion"
slug: "introduction-to-recursion"
difficulty: "Beginner"
prerequisites:
  - Scope and Lifetime
estimated_minutes: 30
tags:
  - java
  - recursion
  - methods
---

# 4.5 Introduction to Recursion

## Overview

**Recursion** is a method calling itself to solve a smaller version of the same problem. It's the natural tool for tasks with self-similar structure — factorials, Fibonacci, tree walking, and divide-and-conquer. Every recursive method needs a **base case** to stop and a **recursive case** that moves toward it.

## Learning Objectives

After this lesson you will be able to:

- Write a recursive method with a correct base case
- Explain the call stack and how recursion unwinds
- Trace recursive calls step by step
- Convert simple recursion to iteration
- Recognize when recursion is (and isn't) the right tool

## Core Concepts

### The two required parts

```java
public static int factorial(int n) {
    if (n <= 1) return 1;             // BASE CASE — stops the recursion
    return n * factorial(n - 1);      // RECURSIVE CASE — smaller problem
}
```

Without a base case, recursion never stops → `StackOverflowError`.

### Tracing factorial(3)

```text
factorial(3) → 3 * factorial(2)
                    → 2 * factorial(1)
                         → 1            (base case)
                    ← 2 * 1 = 2
              ← 3 * 2 = 6
```

Calls go *down* to the base case, then results multiply back *up*.

### The call stack

Each call gets its own **stack frame** (parameters + local variables). Java's stack has a size limit — too many nested calls throws `StackOverflowError`. This is why deep recursion needs care.

### Fibonacci (two recursive calls)

```java
public static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);   // two branches — exponential without memo
}
```

### Recursion vs iteration

```java
// recursive
public static int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// iterative (equivalent)
public static int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}
```

Simple linear recursion can usually be rewritten as a loop — often more efficient (no stack frames).

### When recursion shines

- **Trees and graphs** (traversal, Module 15/16)
- **Divide and conquer** (merge sort, binary search)
- **Backtracking** (permutations, maze solving)
- Problems with self-similar structure

## Visual — The Recursive Call Stack

```
 factorial(3)
   → factorial(2)
      → factorial(1)   ← base case reached
      ← returns 1
   ← returns 2
 ← returns 6

 stack grows downward, then unwinds upward.
```

Each frame waits for the result of the next — the stack is the "pending work" list.

## Code Examples

### Example 1 — Factorial

```java
public class Factorial {
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));   // 120
    }
}
```

### Example 2 — Sum of digits

```java
public class DigitSum {
    public static int sumDigits(int n) {
        if (n == 0) return 0;                       // base case
        return n % 10 + sumDigits(n / 10);          // last digit + rest
    }

    public static void main(String[] args) {
        System.out.println(sumDigits(1234));        // 10
    }
}
```

### Example 3 — Countdown (print on the way down vs up)

```java
public class Countdown {
    public static void down(int n) {
        if (n < 0) return;
        System.out.println(n);   // printed BEFORE the recursive call
        down(n - 1);
    }

    public static void up(int n) {
        if (n < 0) return;
        up(n - 1);
        System.out.println(n);   // printed AFTER the recursive call
    }
    // down(3): 3 2 1 0     up(3): 0 1 2 3
}
```

## Common Mistakes

1. **Missing base case** — infinite recursion → `StackOverflowError`.
2. **Recursive step not shrinking** — `factorial(n)` calling `factorial(n)` never ends.
3. **Too-deep recursion** — large inputs overflow the stack.
4. **Confusing print-before vs print-after** — changes the output order entirely.
5. **Recalculating the same subproblem** — Fibonacci without memoization is exponential.
6. **Using recursion where a loop is simpler** — linear tasks often don't need recursion.

## Best Practices

- Always write the **base case first**.
- Ensure the recursive step makes real progress toward the base case.
- Prefer iteration for simple linear recursion.
- Use recursion for trees, divide-and-conquer, and backtracking.
- Keep recursion depth in mind; memoize overlapping subproblems (Module 15).

## Practice Questions

1. Write a recursive `power(base, exp)` method.
2. Write a recursive `sum(int n)` that returns 1 + 2 + ... + n.
3. Trace `fib(4)` by hand, showing every call.
4. Rewrite `factorial` as an iterative loop.
5. Write a recursive method that reverses a string.

## Multiple Choice Questions (MCQs)

### Q1. The base case in recursion:
- a) Makes the problem bigger
- b) Stops the recursion
- c) Is optional
- d) Runs last

**Answer:** b

### Q2. Missing a base case causes:
- a) A compile error
- b) `StackOverflowError`
- c) A `NullPointerException`
- d) Nothing

**Answer:** b

### Q3. In `factorial(3)`, the base case is reached at:
- a) `factorial(3)`
- b) `factorial(0)`
- c) `factorial(1)` (or `n <= 1`)
- d) Never

**Answer:** c

### Q4. Naive recursive Fibonacci is inefficient because it:
- a) Uses too little memory
- b) Recomputes the same subproblems
- c) Never terminates
- d) Uses arrays

**Answer:** b

### Q5. A linear recursion (like factorial) is often better written as:
- a) A loop
- b) A class
- c) A lambda
- d) A switch

**Answer:** a

## Key Takeaways

- Recursion = base case + a recursive case that shrinks toward it.
- Each call gets a stack frame; deep recursion risks `StackOverflowError`.
- Print-before vs print-after changes output order (down vs up).
- Use recursion for trees/divide-and-conquer/backtracking; prefer loops for linear tasks.

## Module 4 Complete 🎉

You've finished **Module 4 — Methods (Functions)**. Next up: **Module 5 — Arrays and Strings**.
