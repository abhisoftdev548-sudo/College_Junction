---
module: 4
topic: "4.5"
title: "Introduction to Recursion"
slug: "introduction-to-recursion"
difficulty: "Beginner"
prerequisites:
  - Function Parameters and Return Values
  - Scope and Lifetime
estimated_minutes: 30
tags:
  - cpp
  - functions
  - recursion
---

# 4.5 Introduction to Recursion

## Overview

**Recursion** is a function calling itself. Problems that can be broken into smaller, self-similar versions of themselves — factorials, counting down, tree structures — are naturally recursive. Every recursion needs a **base case** (to stop) and a **recursive case** (to make progress). This lesson introduces the concept; DSA modules use it heavily.

## Learning Objectives

After this lesson you will be able to:

- Explain base case vs recursive case
- Write recursive functions (factorial, countdown, sum)
- Trace the call stack during recursion
- Recognize infinite recursion and stack overflow
- Compare recursion with iteration

## Core Concepts

### The two essential parts

```cpp
int factorial(int n) {
    if (n <= 1) return 1;            // BASE CASE — stops the recursion
    return n * factorial(n - 1);     // RECURSIVE CASE — smaller problem
}
```

- **Base case** — the simplest input; returns directly, no recursion.
- **Recursive case** — reduces the problem toward the base case.

### How it runs — the call stack

```
 factorial(3)
   = 3 * factorial(2)
          = 2 * factorial(1)
                 = 1          ← base case reached
          = 2 * 1 = 2
   = 3 * 2 = 6
```

Each call pauses until its sub-call returns, then combines results — like a stack of frames that unwinds.

### Countdown

```cpp
void countdown(int n) {
    if (n == 0) {                  // base case
        std::cout << "Liftoff!\n";
        return;
    }
    std::cout << n << "\n";
    countdown(n - 1);              // recursive case
}
// 3 2 1 Liftoff!
```

### Sum of 1..n

```cpp
int sumTo(int n) {
    if (n == 0) return 0;          // base case
    return n + sumTo(n - 1);       // recursive case
}
```

### Missing base case → infinite recursion

```cpp
int bad(int n) {
    return bad(n);   // no base case, no progress → STACK OVERFLOW
}
```

Without a base case (or with no progress toward it), recursion never stops and eventually overflows the stack.

### Recursion vs iteration

```cpp
// Iterative factorial:
int fact_iter(int n) {
    int result = 1;
    for (int i = 1; i <= n; ++i) result *= i;
    return result;
}

// Recursive factorial:
int fact_rec(int n) {
    return n <= 1 ? 1 : n * fact_rec(n - 1);
}
```

Both compute the same thing. Recursion is elegant for self-similar problems (trees, divide-and-conquer); iteration is often faster and can't overflow the stack. Choose by clarity.

### When recursion shines

```cpp
// Fibonacci (though naive — see DSA modules for memoization):
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

Recursion is the natural fit for problems with a self-similar structure (fibonacci, tree traversal, backtracking — Modules 13+).

## Visual — The Unwinding Stack

```
 factorial(3)
   ┌─────────────┐
   │ f(3): 3 * ? │  pushes f(2)
   │  f(2): 2 * ?│  pushes f(1)
   │   f(1) = 1  │  base case!
   │  f(2) = 2   │  unwinds
   │ f(3) = 6    │  unwinds
   └─────────────┘
```

Calls stack up until the base case, then unwind, combining results on the way back.

## Code Examples

### Example 1 — Factorial

```cpp
#include <iostream>

int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

int main() {
    std::cout << factorial(5) << "\n";   // 120
    return 0;
}
```

### Example 2 — Countdown

```cpp
#include <iostream>

void countdown(int n) {
    if (n == 0) {
        std::cout << "Liftoff!\n";
        return;
    }
    std::cout << n << " ";
    countdown(n - 1);
}

int main() {
    countdown(5);   // 5 4 3 2 1 Liftoff!
    return 0;
}
```

### Example 3 — Power

```cpp
#include <iostream>

int power(int base, int exp) {
    if (exp == 0) return 1;                // base case
    return base * power(base, exp - 1);    // recursive case
}

int main() {
    std::cout << power(2, 10) << "\n";   // 1024
    return 0;
}
```

## Common Mistakes

1. **Missing base case** — infinite recursion → stack overflow.
2. **No progress toward the base case** — same infinite loop, via recursion.
3. **Wrong base case** — off-by-one (`n == 0` vs `n == 1`).
4. **Forgetting to return in the recursive case** — result is lost.
5. **Recursing on a huge input** — deep recursion overflows the stack; prefer iteration.
6. **Computing overlapping subproblems repeatedly** — naive fib is O(2ⁿ); memoize (DSA modules).

## Best Practices

- Write the base case first; verify it handles the smallest input.
- Ensure each recursive call makes real progress toward the base case.
- Prefer iteration for simple linear problems; recursion for self-similar structures.
- Watch stack depth for large inputs.
- Add memoization when subproblems overlap (later modules).

## Practice Questions

1. Write a recursive `factorial` and trace `factorial(4)`.
2. Write a recursive `countdown` that prints `n` down to 1.
3. Write a recursive `sumTo(n)` that sums 1..n.
4. Write a recursive `power(base, exp)`.
5. Explain what happens without a base case, and how to spot it.

## Multiple Choice Questions (MCQs)

### Q1. Every recursive function needs:
- a) A loop
- b) A base case and a recursive case
- c) A global variable
- d) Two return statements

**Answer:** b — base case stops; recursive case progresses.

### Q2. The base case:
- a) Calls the function again
- b) Returns directly without recursing
- c) Is optional
- d) Runs last

**Answer:** b — it terminates the recursion.

### Q3. Infinite recursion leads to:
- a) A compile error
- b) Stack overflow
- c) Returning zero
- d) Nothing

**Answer:** b — unbounded calls exhaust the call stack.

### Q4. `factorial(4)` makes how many recursive calls (excluding the base)?
- a) 3
- b) 4
- c) 5
- d) 1

**Answer:** a — factorial(3), factorial(2), factorial(1) then the base.

### Q5. A downside of recursion vs iteration:
- a) Always wrong
- b) Can overflow the stack for deep recursion
- c) Cannot compute sums
- d) Requires global variables

**Answer:** b — deep recursion consumes stack space.

## Key Takeaways

- Recursion = base case (stop) + recursive case (progress).
- Calls stack up and unwind; each waits for its sub-result.
- Missing base case → stack overflow; deep recursion is risky.
- Use recursion for self-similar problems; iteration for simple linear ones.

## Module 4 Complete 🎉

You've finished **Module 4 — Functions**. Next up: **Module 5 — Arrays and Strings**.
