---
module: 9
topic: "9.5"
title: "constexpr and Compile-Time Programming"
slug: "constexpr"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Templates
  - Auto and Type Deduction
estimated_minutes: 30
tags:
  - modern-cpp
  - constexpr
  - compile-time
---

# 9.5 constexpr and Compile-Time Programming

## Overview

`constexpr` tells the compiler "evaluate this **at compile time** if you can." A `constexpr` variable is a compile-time constant; a `constexpr` function can run either at compile time (when its arguments are constant) or at runtime (when they aren't). C++ has grown this into a powerful tool for shifting work and validation to compilation.

## Learning Objectives

After this lesson you will be able to:

- Declare `constexpr` variables and functions
- Explain when a `constexpr` function runs at compile time vs runtime
- Use `constexpr` with classes (C++14) and `if constexpr` (C++17)
- Use `static_assert` for compile-time checks
- Recognize the difference between `const`, `constexpr`, and `consteval`

## Core Concepts

### constexpr variables

```cpp
constexpr int MAX = 100;          // compile-time constant
constexpr double PI = 3.14159;
constexpr int SIZE = MAX * 2;     // computed at compile time

int arr[SIZE];                    // SIZE is a valid array bound
```

Unlike `const` (which just means "won't change after init"), `constexpr` guarantees the value is known at **compile time**.

### constexpr functions

```cpp
constexpr int square(int x) {
    return x * x;
}

constexpr int a = square(5);      // computed at COMPILE time
int n;
std::cin >> n;
int b = square(n);                // computed at RUNTIME (fine too)
```

A `constexpr` function may be called in both contexts. For the result to be a compile-time constant, all inputs must be constant.

### constexpr constructors (C++14)

```cpp
class Point {
public:
    int x, y;
    constexpr Point(int a, int b) : x(a), y(b) {}   // compile-time object
    constexpr int sum() const { return x + y; }
};

constexpr Point p(3, 4);
constexpr int total = p.sum();    // 7 — computed at compile time
static_assert(p.x == 3, "x must be 3");
```

A `constexpr` constructor lets you build objects that exist entirely at compile time.

### static_assert

```cpp
static_assert(sizeof(int) >= 4, "int must be at least 4 bytes");
static_assert(square(5) == 25, "square(5) must be 25");
```

`static_assert` fails the **build** (with your message) if the condition is false — a compile-time unit test.

### if constexpr (C++17)

```cpp
template <typename T>
auto describe(const T& v) {
    if constexpr (std::is_integral_v<T>) {
        return "integer";
    } else {
        return "non-integer";
    }
}

describe(5);        // "integer"  — the else branch is DISCARDED at compile time
describe(3.14);     // "non-integer"
```

`if constexpr` keeps only the branch matching the type — so both branches can even use type-specific operations that would not compile for the other type.

### constexpr vs const vs consteval

```cpp
const int a = readFromUser();     // const: fixed after init, value maybe runtime
constexpr int b = 5 * 5;          // constexpr: must be compile-time
consteval int c() { return 7; }   // consteval (C++20): ALWAYS compile-time only
```

## Visual — Compile-time vs Runtime

```
  constexpr int area = square(5);
        │
        ▼  compiler evaluates 5*5 = 25 during compilation
  area = 25   (no runtime computation at all)

  int n; std::cin >> n;
  int r = square(n);
        │
        ▼  compiled to a normal function call, runs at runtime
```

The same function serves both worlds: constant inputs fold into a constant; variable inputs compile to ordinary code.

## Code Examples

### Example 1 — Compile-time factorial

```cpp
#include <iostream>

constexpr unsigned long long factorial(unsigned n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

int main() {
    constexpr auto f10 = factorial(10);   // computed at compile time
    static_assert(factorial(5) == 120, "factorial(5) must be 120");
    std::cout << f10;                     // 3628800
}
```

### Example 2 — constexpr Point

```cpp
#include <iostream>

class Point {
public:
    int x, y;
    constexpr Point(int a, int b) : x(a), y(b) {}
    constexpr Point operator+(const Point& o) const {
        return Point(x + o.x, y + o.y);
    }
};

int main() {
    constexpr Point a(1, 2), b(3, 4);
    constexpr Point c = a + b;            // compile-time addition
    static_assert(c.x == 4 && c.y == 6, "sum is wrong");
    std::cout << "(" << c.x << ", " << c.y << ")"; // (4, 6)
}
```

### Example 3 — if constexpr type dispatch

```cpp
#include <iostream>
#include <string>
#include <type_traits>

template <typename T>
std::string label(const T& v) {
    if constexpr (std::is_floating_point_v<T>) {
        return "floating-point";
    } else if constexpr (std::is_integral_v<T>) {
        return "integer";
    } else {
        return "other";
    }
}

int main() {
    std::cout << label(5) << " " << label(2.5) << " " << label("x");
    // integer floating-point other
}
```

## Common Mistakes

1. **Confusing `const` with `constexpr`** — a `const` variable may hold a runtime value; `constexpr` never does.
2. **Using non-constant inputs** — `constexpr int x = square(readInput());` fails because the input isn't constant.
3. **Pre-C++14 expectations** — `constexpr` functions were single-statement only before C++14.
4. **Side effects in `constexpr` functions** — I/O and dynamic allocation are not allowed at compile time (mostly).
5. **Forgetting `static_assert` messages** — always include a clear message.
6. **Assuming `if constexpr` still compiles the discarded branch** — it doesn't; that's the whole point.

## Best Practices

- Mark genuinely compile-time values `constexpr` (sizes, limits, constants).
- Write small pure functions as `constexpr` so they work in both contexts.
- Use `static_assert` to document and enforce invariants at build time.
- Use `if constexpr` to write branchy generic code without runtime cost.
- Reach for `consteval` (C++20) when a function must **only** run at compile time.

## Practice Questions

1. Write a `constexpr` function for the nth Fibonacci number and verify it with `static_assert`.
2. Declare a `constexpr` array size and use it as a real array bound.
3. Write a `constexpr` `Vector3` class with a `constexpr` dot product.
4. Use `if constexpr` to print a different message for `int`, `double`, and other types.
5. Explain the difference between `const`, `constexpr`, and `consteval` with short examples.

## Multiple Choice Questions (MCQs)

### Q1. `constexpr` means a value or function can be evaluated:
- a) Only at runtime
- b) At compile time (when inputs are constant)
- c) Only in templates
- d) Never

**Answer:** b

### Q2. `constexpr int x = square(5);` computes `square(5)`:
- a) At runtime
- b) At compile time
- c) Lazily on first use
- d) It is a compile error

**Answer:** b

### Q3. `static_assert(cond, "msg")` fails:
- a) At runtime
- b) At compile time
- c) Only in debug builds
- d) Never

**Answer:** b

### Q4. `if constexpr` selects a branch based on:
- a) Runtime values
- b) A compile-time (type-dependent) condition, discarding other branches
- c) User input
- d) Random choice

**Answer:** b

### Q5. Which requires evaluation ONLY at compile time (C++20)?
- a) `const`
- b) `constexpr`
- c) `consteval`
- d) `static`

**Answer:** c

## Key Takeaways

- `constexpr` variables are compile-time constants; `constexpr` functions run at compile time when inputs are constant.
- `static_assert` enforces invariants at build time.
- `if constexpr` keeps only the matching branch in generic code.
- `const` ≠ `constexpr`; `consteval` (C++20) is compile-time-only.

## Module 9 Complete 🎉

You've finished **Module 9 — Modern C++**. Next up: **Module 10 — The Standard Template Library (STL)**.
