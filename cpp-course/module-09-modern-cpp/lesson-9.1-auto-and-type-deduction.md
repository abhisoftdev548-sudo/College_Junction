---
module: 9
topic: "9.1"
title: "Auto and Type Deduction"
slug: "auto-and-type-deduction"
difficulty: "Advanced"
prerequisites:
  - Data Types
  - Templates
  - Pointers and References
estimated_minutes: 25
tags:
  - modern-cpp
  - auto
  - type-deduction
---

# 9.1 Auto and Type Deduction

## Overview

Modern C++ lets the compiler **deduce types** for you with `auto` and `decltype`. Instead of spelling out long or unnameable types (like iterator or lambda types), you write `auto` and the compiler fills in the correct type at compile time. This makes code shorter, more maintainable, and immune to certain type bugs — while keeping full static typing.

## Learning Objectives

After this lesson you will be able to:

- Use `auto` for variables and function return types
- Explain how `auto` strips references and constness
- Use `auto&` and `const auto&` to preserve references
- Apply `decltype` to query the type of an expression
- Avoid the most common `auto` pitfalls

## Core Concepts

### auto for variables

```cpp
auto i = 42;              // int
auto d = 3.14;            // double
auto s = std::string("x");// std::string
auto v = std::vector<int>{1, 2, 3}; // std::vector<int>

std::map<std::string, int> m;
auto it = m.begin();      // std::map<std::string,int>::iterator — huge type!
```

`auto` deduces the type **from the initializer** at compile time. There is no runtime cost and no dynamic typing — the variable still has one concrete type.

### auto strips references and const

```cpp
const std::string name = "Ankit";
auto a = name;           // a is std::string — const is DROPPED, copies
auto& b = name;          // b is const std::string& — reference preserved
const auto& c = name;    // const std::string&

std::vector<int> v = {1, 2, 3};
for (auto x : v) { /* x is int (a copy) */ }
for (auto& x : v) { x *= 2; }              // modifies v
for (const auto& x : v) { /* read-only, no copy */ }
```

Plain `auto` copies and drops `const`/reference. Add `&` or `const&` to keep them.

### auto function return type (C++14)

```cpp
auto add(int a, int b) {      // return type deduced from the return statement
    return a + b;             // int
}

auto makePi() {
    return 3.14159;           // double
}
```

### decltype — the type of an expression

```cpp
int x = 5;
decltype(x) y = 10;           // y is int
decltype(x + 1.5) z = 0;      // z is double

const std::string s = "hi";
decltype(s) r = s;            // r is const std::string (keeps const!)
```

Unlike `auto`, `decltype` keeps references and constness — it reports the expression's exact type.

### auto vs decltype

| | `auto` | `decltype` |
|---|---|---|
| Uses initializer? | Yes (deduces from value) | Uses expression's declared type |
| Keeps `const`/`&`? | Drops them | Keeps them |
| Needs a value? | Yes | No |

## Visual — What auto Deduces

```
  auto x = 10;         →  x : int
  auto y = 2.5;        →  y : double
  auto s = "hi";       →  s : const char*      (a string literal!)
  auto t = std::string("hi"); → t : std::string

  const int n = 7;
  auto a = n;          →  a : int              (const dropped)
  auto& b = n;         →  b : const int&       (reference + const kept)
```

The compiler resolves `auto` to one fixed type during compilation — after that, the code is identical to one written with explicit types.

## Code Examples

### Example 1 — auto with STL types

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores = { {"Ankit", 90}, {"Riya", 85} };

    for (auto it = scores.begin(); it != scores.end(); ++it) {
        std::cout << it->first << ": " << it->second << "\n";
    }

    for (const auto& [name, score] : scores) {  // C++17 structured binding
        std::cout << name << " got " << score << "\n";
    }
}
```

### Example 2 — auto& to modify elements

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    for (auto& x : v) x *= 10;      // reference → modifies the vector
    for (const auto& x : v) std::cout << x << " "; // 10 20 30 40
}
```

### Example 3 — decltype in generic code

```cpp
#include <iostream>
#include <vector>

template <typename C>
auto firstElement(C& c) -> decltype(c[0]) {   // trailing return type
    return c[0];
}

int main() {
    std::vector<int> v = {7, 8, 9};
    firstElement(v) = 100;      // decltype gives int& → v[0] becomes 100
    std::cout << v[0];          // 100
}
```

## Common Mistakes

1. **`auto s = "text";`** — deduces `const char*`, not `std::string`; use `auto s = std::string("text")` or `"text"s`.
2. **Copying in loops** — `for (auto x : v)` copies each element; use `auto&`/`const auto&`.
3. **Expecting `auto` to be dynamic** — the type is fixed at compile time; you can't change `auto x = 1;` to a string later.
4. **Dropping const accidentally** — `auto a = someConstObject;` copies and loses const; use `const auto&` to keep it read-only.
5. **`auto&` binding to a temporary** — `auto& r = getTemporary();` won't compile; use `const auto&` or a value.
6. **Confusing `auto` and `decltype` semantics** — `decltype` keeps references/const; `auto` does not.

## Best Practices

- Use `auto` for long, obvious, or unnameable types (iterators, lambdas).
- Keep explicit types for simple primitives where clarity matters (`int count = 0;`).
- Use `auto&` to mutate and `const auto&` to read in range-based loops.
- Use `auto` for function return types when the type is obvious from the name/body.
- Remember the "auto drops const/ref" rule before using it with references.

## Practice Questions

1. Declare variables with `auto` for: an `int`, a `double`, a `std::vector<int>`, and an iterator to a `std::list<std::string>`.
2. Write a loop that doubles each element of a `std::vector<int>` using `auto&`.
3. Explain what type `auto s = "hello";` gives and how to get a `std::string` instead.
4. Use `decltype` to create a variable with the same type as `someVector[0]` (including reference-ness).
5. Write a function with a deduced return type that returns the product of two doubles.

## Multiple Choice Questions (MCQs)

### Q1. `auto x = 3.14;` makes `x` a:
- a) `float`
- b) `double`
- c) `int`
- d) `const double`

**Answer:** b — a floating literal is `double`.

### Q2. For `const int n = 5;`, what type is `auto a = n;`?
- a) `const int`
- b) `int&`
- c) `int` — const is dropped
- d) `const int&`

**Answer:** c — plain `auto` copies and drops const.

### Q3. To modify vector elements in a range-based loop, use:
- a) `for (auto x : v)`
- b) `for (auto& x : v)`
- c) `for (const auto x : v)`
- d) `for (auto* x : v)`

**Answer:** b

### Q4. What does `auto s = "hello";` deduce?
- a) `std::string`
- b) `char*`
- c) `const char*`
- d) `char[6]`

**Answer:** c — string literals are `const char*`.

### Q5. `decltype` differs from `auto` because it:
- a) Is evaluated at runtime
- b) Preserves references and constness
- c) Requires C++20
- d) Cannot be used with templates

**Answer:** b

## Key Takeaways

- `auto` deduces a variable's type at compile time from its initializer.
- Plain `auto` copies and drops `const`/references; `auto&`/`const auto&` preserve them.
- `decltype` reports an expression's exact type, keeping references and const.
- Use `auto` for unwieldy types and in loops — but stay aware of what it drops.

## Next Topic

[9.2 Lambda Expressions](lesson-9.2-lambda-expressions.md)
