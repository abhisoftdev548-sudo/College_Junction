---
module: 11
topic: "11.5"
title: "Competitive Programming Tips"
slug: "competitive-programming-tips"
difficulty: "Advanced"
prerequisites:
  - Complexity Analysis
  - Common Patterns
  - STL
estimated_minutes: 30
tags:
  - competitive-programming
  - tips
  - fast-io
---

# 11.5 Competitive Programming Tips

## Overview

Competitive programming (and coding rounds) reward **speed and correctness under constraints**. Beyond algorithms, success depends on fast I/O, knowing your language's limits, reading constraints carefully, and practicing deliberately. This lesson distills the practical habits that shave minutes and prevent wrong submissions.

## Learning Objectives

After this lesson you will be able to:

- Speed up I/O for large inputs
- Read constraints to pick the right algorithm quickly
- Avoid integer overflow and precision pitfalls
- Structure your main loop for fast, correct submissions
- Practice deliberately to improve rating/performance

## Core Concepts

### Fast I/O

```cpp
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);   // decouple from C stdio → much faster
    std::cin.tie(nullptr);              // don't flush cout before reading
    // ... use cin/cout normally
}
```

For very large inputs, `scanf`/`printf` or these two lines make a big difference. Avoid mixing C and C++ I/O after calling `sync_with_stdio(false)`.

### Read the constraints first

```
n ≤ 10^5          →  O(n log n) or O(n) is fine; O(n²) is not
n ≤ 100           →  O(n³) acceptable
n ≤ 20            →  O(2^n) acceptable (bitmask/subset)
values ≤ 10^9     →  use long long for sums/counts
```

Constraints tell you the intended complexity before you read the problem body in detail.

### Integer overflow

```cpp
int a = 100000, b = 100000;
long long product = 1LL * a * b;   // 1LL forces 64-bit math
// a * b alone would overflow int → undefined behaviour
```

Use `long long` (64-bit) for anything that could exceed ~2.1 × 10⁹, especially products and sums.

### Precision

```cpp
double x = 0.1 + 0.2;   // NOT exactly 0.3 — floating point is approximate
// Compare with tolerance:
if (std::fabs(x - 0.3) < 1e-9) { /* equal enough */ }
// Or use integer math / scaled integers when exactness matters.
```

### A clean main loop

```cpp
int t; std::cin >> t;
while (t--) {
    // read one test case
    // solve and print
}
```

Most problems give multiple test cases — structure `main` around them, and put the per-case logic in a function.

### Modulo arithmetic (when answers are huge)

```cpp
const long long MOD = 1000000007;
long long ans = (a + b) % MOD;                 // addition
ans = (a * b) % MOD;                           // multiplication
// (a - b + MOD) % MOD for subtraction to keep it non-negative
```

### Common utility snippets

```cpp
using ll = long long;
#define all(v) (v).begin(), (v).end()          // prefer a function/variable in real code

template <typename T> T read() { T x; std::cin >> x; return x; }
```

Build a personal template: fast I/O, `ll` alias, and the snippets you reuse most.

## Visual — Reading Constraints → Algorithm

```
  n ≤ 10^5        → O(n log n): sort, binary search, heaps
  n ≤ 10^3        → O(n²): nested loops, simple DP
  n ≤ 20          → O(2^n): bitmask, subset enumeration
  n ≤ 10^9, few ops → O(log n): binary search, math

  values ≤ 10^9   → long long for sums/products
  "answer mod M"  → apply M after each operation
```

The constraint block is a cheat sheet for the intended solution.

## Code Examples

### Example 1 — Fast I/O template with test cases

```cpp
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    int t;
    std::cin >> t;
    while (t--) {
        long long n;
        std::cin >> n;
        std::cout << n * (n + 1) / 2 << "\n";   // sum 1..n, use long long
    }
}
```

### Example 2 — Overflow-safe average

```cpp
long long average(long long a, long long b) {
    // (a + b) / 2 could overflow; use the safe form:
    return a / 2 + b / 2 + (a % 2 + b % 2) / 2;
}
```

### Example 3 — Modulo-safe power (fast exponentiation)

```cpp
const long long MOD = 1000000007;

long long modPow(long long base, long long exp) {
    long long result = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp & 1) result = result * base % MOD;
        base = base * base % MOD;
        exp >>= 1;
    }
    return result;
}
```

## Common Mistakes

1. **Ignoring constraints** — submitting O(n²) where n = 10⁵ → time limit exceeded.
2. **int overflow** — sums/products of large ints silently wrap around.
3. **Printing debug output** in the final submission — wrong answer.
4. **Slow I/O** — `endl` flushes the stream every time; use `"\n"`.
5. **Forgetting modulo in intermediate steps** — the number explodes before the final `%`.
6. **Off-by-one in binary search / loops** — the classic 20-minute bug.

## Best Practices

- Write (or copy) a personal template with fast I/O and `ll` once.
- Read constraints *first* and derive the target complexity.
- Use `"\n"` not `std::endl`; keep output buffered.
- Test edge cases: n = 0, n = 1, negatives, maximum values.
- After a wrong answer, construct the smallest failing case — don't guess.

## Practice Questions

1. Write a fast-I/O template that reads `t` test cases and sums two integers each.
2. Compute `n * (n + 1) / 2` for n = 10⁹ correctly using `long long`.
3. Implement `modPow` and compute 2^100 mod (10^9 + 7).
4. Explain why `0.1 + 0.2 == 0.3` is false and show a tolerance-based comparison.
5. For a problem with n ≤ 10⁵, argue why an O(n²) solution is unacceptable and name a better approach.

## Multiple Choice Questions (MCQs)

### Q1. `std::ios::sync_with_stdio(false)` is used to:
- a) Disable output
- b) Speed up C++ stream I/O
- c) Enable threads
- d) Compress input

**Answer:** b

### Q2. For n = 10⁵, which complexity is generally too slow?
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** c

### Q3. To avoid overflow when multiplying two large `int`s, use:
- a) `float`
- b) `long long` (e.g. `1LL * a * b`)
- c) `short`
- d) `char`

**Answer:** b

### Q4. Which is faster for repeated line output?
- a) `std::cout << "\n";`
- b) `std::cout << std::endl;`
- c) They are identical
- d) `printf` is always slow

**Answer:** a — `endl` also flushes, which is costly.

### Q5. When an answer must be mod M, you should:
- a) Apply mod only at the end
- b) Apply mod after each operation to avoid overflow
- c) Never use mod
- d) Use a float

**Answer:** b

## Key Takeaways

- Constraints dictate complexity; read them first.
- Fast I/O + `"\n"` + `long long` prevent the most common practical failures.
- Guard against overflow, precision, and modulo mistakes.
- A personal template and deliberate practice are the biggest competitive advantages.

## Module 11 Complete 🎉

You've finished **Module 11 — Problem Solving**. Next up: **Module 12 — DSA Preparation**.
