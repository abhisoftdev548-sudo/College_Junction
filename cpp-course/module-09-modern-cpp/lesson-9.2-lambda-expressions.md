---
module: 9
topic: "9.2"
title: "Lambda Expressions"
slug: "lambda-expressions"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Auto and Type Deduction
  - STL Algorithms
estimated_minutes: 30
tags:
  - modern-cpp
  - lambdas
  - functional
---

# 9.2 Lambda Expressions

## Overview

A **lambda expression** is an unnamed function you can write **inline**, right where you need it. They shine with STL algorithms like `std::sort`, `std::find_if`, and `std::for_each`, where a tiny one-off function would otherwise require a separate named function or function object. Lambdas make code local, readable, and expressive.

## Learning Objectives

After this lesson you will be able to:

- Write a basic lambda with the `[](){}` syntax
- Use capture lists (`[]`, `[=]`, `[&]`, `[x]`) correctly
- Pass lambdas to STL algorithms
- Use generic lambdas with `auto` parameters
- Explain mutable lambdas and return-type deduction

## Core Concepts

### Basic syntax

```cpp
[capture](parameters) -> return_type { body };

auto add = [](int a, int b) { return a + b; };
std::cout << add(2, 3);   // 5
```

The parts, in order: **capture list**, **parameters**, optional **return type**, and **body**.

### Capture list

```cpp
int threshold = 10;

auto above = [threshold](int x) { return x > threshold; };   // capture by VALUE
auto aboveRef = [&threshold](int x) { return x > threshold; }; // capture by REF
auto everythingByValue = [=](int x) { /* copies all used locals */ };
auto everythingByRef   = [&](int x) { /* refers to all used locals */ };
```

- `[threshold]` — capture `threshold` by value (a copy).
- `[&threshold]` — capture by reference.
- `[=]` / `[&]` — capture everything used, by value / by reference.
- `[]` — capture nothing.

### With STL algorithms

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {5, 1, 4, 2, 3};
std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; }); // descending

auto it = std::find_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; });
```

### Generic lambdas (C++14)

```cpp
auto identity = [](auto x) { return x; };
identity(42);
identity(3.14);
identity(std::string("hi"));
```

`auto` parameters make a lambda a template — it works with any type that supports the body's operations.

### Mutable lambdas

```cpp
int counter = 0;
auto inc = [counter]() mutable { return ++counter; }; // captured copy can change
std::cout << inc(); // 1
std::cout << inc(); // 2
// the outer counter is still 0
```

By default a by-value capture is `const` inside the lambda; `mutable` lets the lambda modify its own copy (not the original).

## Visual — Anatomy of a Lambda

```
  auto f = [  x, &y  ] ( int n ) -> int { return n + x + y; };
            └───┬───┘  └──┬──┘    └─┬──┘   └──────┬──────┘
            capture    parameters  return       body
            list       (like a fn)  type

  [=]  capture all by value      (copies)
  [&]  capture all by reference  (aliases)
  [x, &y]  x by value, y by ref  (mixed)
  []   capture nothing
```

The capture list decides what surrounding variables the lambda can "see" and whether it copies or references them.

## Code Examples

### Example 1 — Sort strings by length

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> words = {"banana", "apple", "kiwi", "grape"};
    std::sort(words.begin(), words.end(),
              [](const std::string& a, const std::string& b) {
                  return a.size() < b.size();
              });
    for (const auto& w : words) std::cout << w << " ";
    // kiwi apple grape banana
}
```

### Example 2 — Capture by value vs reference

```cpp
#include <iostream>

int main() {
    int n = 10;

    auto byValue = [n]() mutable { n += 5; return n; };
    auto byRef   = [&n]() { n += 5; return n; };

    std::cout << byValue() << " ";  // 15 (modifies its own copy)
    std::cout << n << " ";          // 10 (original unchanged)
    std::cout << byRef() << " ";    // 15 (modifies original)
    std::cout << n;                 // 15
}
```

### Example 3 — find_if with a captured threshold

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 5, 8, 12, 3};
    int min = 6;
    auto it = std::find_if(v.begin(), v.end(),
                           [min](int x) { return x >= min; });
    if (it != v.end()) std::cout << "First >= " << min << " is " << *it; // 8
}
```

## Common Mistakes

1. **Forgetting to capture a used variable** — using `n` inside a `[]` lambda is a compile error.
2. **Capturing by value then expecting the original to change** — `[n]() { n = 5; }` won't compile without `mutable`, and never changes the outer `n`.
3. **Dangling reference captures** — `[&x]` where `x` goes out of scope before the lambda runs.
4. **Capturing too much with `[=]`/`[&]`** — can accidentally capture `this` or large objects.
5. **Forgetting `mutable`** — by-value captures are const by default.
6. **Confusing parameter vs capture** — `[](int x)` takes a parameter; `[x]` captures a variable from the enclosing scope.

## Best Practices

- Prefer narrow captures (`[x, &y]`) over blanket `[=]`/`[&]`.
- Use lambdas for short, local logic; name a function for anything reused or complex.
- Prefer `const auto&` parameters for non-mutating generic lambdas.
- Keep lambdas short — if it's more than a few lines, consider a named function or function object.
- Watch lifetimes when capturing by reference, especially in async/threaded code.

## Practice Questions

1. Write a lambda that squares a number and call it on 7.
2. Use a lambda with `std::sort` to sort integers in descending order.
3. Write a lambda that captures an `int` by reference and increments it, then demonstrate the change.
4. Use `std::count_if` with a lambda to count even numbers in a vector.
5. Write a generic lambda `[](auto a, auto b) { return a > b; }` and test it with `int` and `std::string`.

## Multiple Choice Questions (MCQs)

### Q1. Which part of a lambda determines what surrounding variables it can access?
- a) Parameter list
- b) Capture list
- c) Return type
- d) Body

**Answer:** b

### Q2. `[=]` captures:
- a) Nothing
- b) All used variables by value
- c) All used variables by reference
- d) Only `this`

**Answer:** b

### Q3. A by-value capture is by default:
- a) Mutable
- b) Const inside the lambda
- c) A reference
- d) Deleted

**Answer:** b — use `mutable` to allow modification of the copy.

### Q4. `[](auto x) { return x; }` is called a:
- a) Const lambda
- b) Generic lambda (C++14)
- c) Capture-less lambda
- d) Mutable lambda

**Answer:** b

### Q5. Modifying a `[&n]` captured variable inside the lambda:
- a) Changes the original `n`
- b) Changes a copy only
- c) Is a compile error
- d) Deletes `n`

**Answer:** a — reference capture aliases the original.

## Key Takeaways

- Lambdas are inline anonymous functions: `[capture](params){ body }`.
- Captures control access: `[x]`, `[&x]`, `[=]`, `[&]`, `[]`.
- By-value captures are const unless `mutable`; by-reference captures alias the original.
- Lambdas pair naturally with STL algorithms (`sort`, `find_if`, `count_if`).

## Next Topic

[9.3 Move Semantics](lesson-9.3-move-semantics.md)
