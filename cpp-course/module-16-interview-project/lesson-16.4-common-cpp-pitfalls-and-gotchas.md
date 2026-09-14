---
module: 16
topic: "16.4"
title: "Common C++ Pitfalls and Gotchas"
slug: "common-cpp-pitfalls-and-gotchas"
difficulty: "Advanced"
prerequisites:
  - All previous modules
  - Pointers and References
  - Dynamic Memory Allocation
estimated_minutes: 30
tags:
  - pitfalls
  - gotchas
  - undefined-behaviour
---

# 16.4 Common C++ Pitfalls and Gotchas

## Overview

C++ gives you power, and with power come footguns. Many "impossible" bugs trace back to a small set of classic mistakes: undefined behaviour, object lifetime issues, signed/unsigned mismatches, and surprising syntax. This lesson collects the gotchas that trip up every C++ programmer, with the idioms that avoid them.

## Learning Objectives

After this lesson you will be able to:

- Recognize undefined behaviour and its consequences
- Avoid dangling pointers/references and use-after-free
- Handle signed/unsigned comparison safely
- Understand the most vexing parse and initializer pitfalls
- Apply modern idioms (RAII, smart pointers, `auto`) that sidestep the gotchas

## Core Concepts

### Undefined behaviour (UB)

```cpp
int a[5];
a[10] = 1;          // UB: out-of-bounds write
int* p = nullptr;
*p = 5;             // UB: null dereference
int x;
std::cout << x;     // UB: reading an uninitialized value
int y = INT_MAX;
y += 1;             // UB: signed overflow
```

UB means the compiler may do **anything** — including appearing to work today and failing tomorrow. It is the root of the worst bugs.

### Dangling pointers and references

```cpp
int* makeDangling() {
    int local = 42;
    return &local;        // BAD: local dies when the function returns
}

int& makeDanglingRef() {
    int local = 5;
    return local;         // BAD: same — dangling reference
}

std::vector<int> v = {1, 2, 3};
int& r = v[0];
v.push_back(4);           // reallocation → r now dangles
```

Never return pointers/references to locals; beware references into a vector across `push_back`.

### Signed/unsigned mismatch

```cpp
std::vector<int> v = {1, 2, 3};
for (int i = 0; i < v.size(); ++i) { ... }   // warning: int vs size_t

// Worse: -1 < v.size() is TRUE (unsigned comparison wraps!)
if (-1 < v.size()) { /* unexpectedly true */ }
```

`v.size()` is `size_t` (unsigned). Mixing with `int` can flip comparisons. Use `std::size_t` or `std::ssize(v)` (C++20).

### The most vexing parse

```cpp
Widget w();      // declares a FUNCTION returning Widget — not an object!
Widget w{};      // correct: default-constructs an object
```

`T name();` looks like an object but is a function declaration. Use brace initialization `T name{};`.

### Narrowing and initialization surprises

```cpp
int x = 3.7;        // silently truncates to 3
// int y{3.7};      // error — brace init prevents narrowing (good!)
double d = 1 / 3;   // 0.0 — integer division!
double d2 = 1.0 / 3.0; // 0.333...
```

Brace initialization catches narrowing; watch integer vs floating division.

### Copying raw-resource classes

```cpp
class Buffer {
    int* data;
public:
    Buffer(int n) : data(new int[n]) {}
    ~Buffer() { delete[] data; }
    // NO copy constructor/assignment → default shallow copy → double free!
};
```

Any class owning a raw resource needs the **Rule of Five** (or better, use `std::vector`/smart pointers).

## Visual — Lifetime and UB

```
 dangling:
  makeDangling() ──▶ &local ──▶ (local destroyed at return) ──▶ dangling pointer
                            ✗ using it = UB

 signed/unsigned:
  v.size() = 0 (unsigned), int i = -1
  -1 < 0u  →  converts -1 to a huge unsigned → TRUE (surprise!)
```

These two diagrams cover a large fraction of real-world C++ crashes.

## Code Examples

### Example 1 — The fix for each gotcha

```cpp
// Dangling → return by value
std::vector<int> makeValues() {
    return {1, 2, 3};        // safe: moved/NRVO'd
}

// Signed/unsigned → use size_t
for (std::size_t i = 0; i < v.size(); ++i) { ... }

// Most vexing parse → braces
Widget w{};

// Narrowing → brace init
double d = 1.0 / 3.0;
```

### Example 2 — Rule of Five or RAII

```cpp
#include <vector>

class Buffer {
    std::vector<int> data;         // RAII: no manual new/delete
public:
    Buffer(int n) : data(n) {}
    // no destructor/copy needed — the vector handles everything
};
```

### Example 3 — Safe vector reference pattern

```cpp
std::vector<int> v = {1, 2, 3};
// reserve enough up front so push_back can't invalidate references
v.reserve(100);
int& r = v[0];
v.push_back(4);      // safe — no reallocation happened
```

## Common Mistakes

1. **Returning references/pointers to locals** — the #1 lifetime bug.
2. **`T name();` thinking it's an object** — it's a function declaration.
3. **Comparing signed and unsigned** — flips the logic in subtle ways.
4. **Shallow-copying resource-owning classes** — double free.
5. **Signed integer overflow** — UB, not wraparound (unlike unsigned).
6. **Holding references/iterators across container mutation** — invalidation.

## Best Practices

- Use RAII (containers, smart pointers) so you rarely manage raw resources.
- Compile with `-Wall -Wextra -Werror` and run `-fsanitize=address,undefined`.
- Use brace initialization `{}` to avoid vexing parse and narrowing.
- Use `std::size_t` (or `std::ssize`) for sizes; avoid mixed signed/unsigned.
- Return by value; never return addresses/references to locals.
- Follow the Rule of Five — or better, the Rule of Zero (let members manage themselves).

## Practice Questions

1. Write a function that returns a dangling pointer, then fix it to return by value.
2. Demonstrate a signed/unsigned comparison surprise and fix it.
3. Show the most vexing parse and its brace-initialization fix.
4. Write a resource-owning class and apply the Rule of Five, then convert it to RAII.
5. List three kinds of undefined behaviour and how to avoid each.

## Multiple Choice Questions (MCQs)

### Q1. Undefined behaviour means:
- a) A compile error
- b) The program's behaviour is unpredictable (anything may happen)
- c) A runtime exception
- d) A warning

**Answer:** b

### Q2. Returning a reference to a local variable produces:
- a) A copy
- b) A dangling reference
- c) `nullptr`
- d) A compile error always

**Answer:** b

### Q3. `Widget w();` declares:
- a) A default-constructed object
- b) A function named `w` returning a `Widget`
- c) A pointer
- d) Nothing

**Answer:** b — the most vexing parse.

### Q4. Signed integer overflow is:
- a) Wraparound like unsigned
- b) Undefined behaviour
- c) A compile error
- d) Always zero

**Answer:** b

### Q5. The Rule of Five applies to classes that:
- a) Are empty
- b) Manage a raw resource
- c) Only contain `int`s
- d) Are `final`

**Answer:** b

## Key Takeaways

- UB (out-of-bounds, null deref, uninitialized reads, signed overflow) is the worst bug class.
- Never return locals by reference/pointer; watch vector reallocation invalidation.
- Signed/unsigned mixing flips comparisons; use `size_t`/`ssize`.
- Brace initialization, RAII, smart pointers, and sanitizers sidestep most gotchas.

## Next Topic

[16.5 Course Wrap-Up and Next Steps](lesson-16.5-course-wrap-up-and-next-steps.md)
