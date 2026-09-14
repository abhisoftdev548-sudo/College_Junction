---
module: 4
topic: "4.2"
title: "Function Parameters and Return Values"
slug: "function-parameters-and-return-values"
difficulty: "Beginner"
prerequisites:
  - Introduction to Functions
estimated_minutes: 30
tags:
  - cpp
  - functions
  - parameters
  - pass-by-value
  - pass-by-reference
---

# 4.2 Function Parameters and Return Values

## Overview

Functions exchange data through **parameters** (inputs) and **return values** (outputs). The crucial distinction is **pass-by-value** (a copy is made — the original is untouched) versus **pass-by-reference** (the original is aliased — changes affect it). Mastering this distinction is essential C++.

## Learning Objectives

After this lesson you will be able to:

- Pass arguments by value and by reference
- Use `const` references for efficient read-only parameters
- Return single values and use reference parameters for multiple outputs
- Explain how default arguments work
- Choose the right parameter passing style

## Core Concepts

### Pass-by-value (the default)

```cpp
void increment(int x) {
    x = x + 1;         // modifies the COPY
}

int main() {
    int n = 5;
    increment(n);
    std::cout << n;    // 5 — the original is UNCHANGED
}
```

Pass-by-value copies the argument into the parameter; changes inside the function don't affect the caller.

### Pass-by-reference

```cpp
void increment(int& x) {   // & makes it a reference
    x = x + 1;             // modifies the ORIGINAL
}

int main() {
    int n = 5;
    increment(n);
    std::cout << n;        // 6 — changed!
}
```

A reference parameter (`int& x`) is an **alias** for the original variable — no copy, and changes are visible to the caller.

### const reference — efficient read-only

```cpp
double average(const std::vector<int>& v) {   // no copy, no modification allowed
    // v.push_back(...);  // ERROR — it's const
    int sum = 0;
    for (int x : v) sum += x;
    return static_cast<double>(sum) / v.size();
}
```

For large objects (strings, vectors), pass by `const&` — it avoids a copy but prevents accidental modification.

### Returning values

```cpp
int add(int a, int b) { return a + b; }        // return by value
std::string join(std::string a, std::string b) { return a + b; }
```

Return by value is the norm; modern C++ moves large return values efficiently.

### Multiple outputs via reference parameters

```cpp
void minMax(int a, int b, int& min, int& max) {
    min = (a < b) ? a : b;   // write through the references
    max = (a > b) ? a : b;
}

int lo, hi;
minMax(10, 20, lo, hi);      // lo = 10, hi = 20
```

A function can "return" several values by writing them into reference parameters.

### Default arguments

```cpp
void print(std::string msg, int times = 1) {   // times defaults to 1
    for (int i = 0; i < times; ++i) std::cout << msg << "\n";
}

print("Hi");            // times = 1
print("Hi", 3);         // times = 3
```

Parameters with defaults can be omitted at the call site — but defaults must come **after** non-defaulted parameters.

### swap — the classic reference example

```cpp
void swap(int& a, int& b) {
    int tmp = a;
    a = b;
    b = tmp;
}
```

## Visual — Value vs Reference

```
 pass-by-value:                 pass-by-reference:
 main: n [5]                   main: n [5]◀────────┐
        │ copy                        │ alias       │
        ▼                             │             │
 func:  x [5] → x becomes 6    func:  x ────────────┘
        │                             │
 main: n still 5                main: n now 6 (same box)
```

By value = a separate copy; by reference = the same box under another name.

## Code Examples

### Example 1 — Value vs reference

```cpp
#include <iostream>

void byValue(int x) { x = 100; }
void byRef(int& x) { x = 100; }

int main() {
    int a = 5, b = 5;
    byValue(a);
    byRef(b);
    std::cout << "a=" << a << ", b=" << b << "\n";   // a=5, b=100
    return 0;
}
```

### Example 2 — Swap

```cpp
#include <iostream>

void swap(int& a, int& b) {
    int tmp = a; a = b; b = tmp;
}

int main() {
    int x = 3, y = 9;
    swap(x, y);
    std::cout << x << " " << y << "\n";   // 9 3
    return 0;
}
```

### Example 3 — Default arguments

```cpp
#include <iostream>

void repeat(std::string word, int count = 2) {
    for (int i = 0; i < count; ++i) std::cout << word << " ";
    std::cout << "\n";
}

int main() {
    repeat("hi");        // hi hi
    repeat("yo", 3);     // yo yo yo
    return 0;
}
```

## Common Mistakes

1. **Expecting pass-by-value to modify the caller's variable** — it won't; use `&`.
2. **Copying large objects by value** — use `const&`.
3. **Forgetting `const` on read-only references** — allows accidental modification.
4. **Default arguments before non-defaulted ones** — compile error; defaults go last.
5. **Returning a reference to a local variable** — dangling reference (undefined behaviour).
6. **Confusing `int&` (reference) with `int*` (pointer)** — references are aliases, not pointers (Module 6).

## Best Practices

- Pass small types (`int`, `double`) by value; large objects by `const&`.
- Pass by non-const reference only when the function must modify the argument.
- Use reference parameters for multiple outputs (or return a `struct`).
- Put default arguments in the declaration, not the definition.
- Never return a reference/pointer to a local variable.

## Practice Questions

1. Show that pass-by-value doesn't change the caller's variable.
2. Write a `swap` function using references.
3. Write a `minMax` function that returns two values via reference parameters.
4. Write a function with a default argument and call it both ways.
5. Explain when to use `const&` parameters.

## Multiple Choice Questions (MCQs)

### Q1. Pass-by-value means:
- a) The original is modified
- b) A copy is passed; the original is untouched
- c) A reference is passed
- d) Nothing is passed

**Answer:** b — the parameter is an independent copy.

### Q2. `int& x` declares:
- a) A pointer
- b) A reference (alias) to an int
- c) A copy
- d) A constant

**Answer:** b — `&` after the type makes it a reference.

### Q3. For a large read-only `vector`, pass by:
- a) Value
- b) `const std::vector<int>&`
- c) Non-const reference
- d) Pointer to pointer

**Answer:** b — `const&` avoids copying and prevents modification.

### Q4. Default arguments must appear:
- a) First
- b) After all non-defaulted parameters
- c) Anywhere
- d) Only in the definition

**Answer:** b — defaults must trail non-defaulted parameters.

### Q5. Returning a reference to a local variable:
- a) Is safe
- b) Creates a dangling reference (undefined behaviour)
- c) Copies the value
- d) Is required

**Answer:** b — the local dies when the function returns.

## Key Takeaways

- Pass-by-value copies; pass-by-reference aliases (changes propagate).
- `const&` = efficient read-only for large objects.
- Reference parameters enable multiple outputs; defaults make calls concise.
- Never return references to locals.

## Next Topic

[4.3 Function Overloading](lesson-4.3-function-overloading.md)
