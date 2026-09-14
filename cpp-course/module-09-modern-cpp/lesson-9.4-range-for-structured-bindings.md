---
module: 9
topic: "9.4"
title: "Range-based For and Structured Bindings"
slug: "range-for-structured-bindings"
difficulty: "Advanced"
prerequisites:
  - Loops
  - Auto and Type Deduction
  - Containers
estimated_minutes: 25
tags:
  - modern-cpp
  - range-for
  - structured-bindings
---

# 9.4 Range-based For and Structured Bindings

## Overview

Two C++11/17 features make loops dramatically cleaner. The **range-based `for`** loop iterates a whole container without indices or iterators. **Structured bindings** (C++17) unpack a pair, tuple, struct, or array into named variables in one line. Together they remove most of the boilerplate from everyday iteration.

## Learning Objectives

After this lesson you will be able to:

- Write range-based `for` loops over any container
- Choose `auto`, `auto&`, and `const auto&` appropriately
- Unpack `std::pair`/`std::tuple` and structs with structured bindings
- Use `std::tie` for comparison-style unpacking
- Avoid the classic loop mistakes

## Core Concepts

### Range-based for

```cpp
std::vector<int> v = {1, 2, 3, 4};

for (int x : v) {          // copy of each element
    std::cout << x;
}

for (auto& x : v) {        // reference — can modify
    x *= 2;
}

for (const auto& x : v) {  // const reference — read-only, no copy
    std::cout << x;
}
```

It works for any type with `begin()`/`end()` — arrays, `std::vector`, `std::string`, `std::map`, and user containers.

### Structured bindings

```cpp
std::pair<std::string, int> p = {"Ankit", 21};

auto [name, age] = p;       // name = "Ankit", age = 21
std::cout << name << " is " << age;

std::tuple<int, double, char> t = {1, 2.5, 'x'};
auto [i, d, c] = t;         // unpacks all three
```

### Unpacking structs

```cpp
struct Point { int x; int y; };

Point p = {3, 4};
auto [px, py] = p;          // px = 3, py = 4
```

For a struct, structured bindings bind to the **data members in declaration order**.

### With maps (the killer use case)

```cpp
std::map<std::string, int> scores = { {"Ankit", 90}, {"Riya", 85} };

for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << "\n";
}
```

Each map element is a `std::pair<const Key, Value>` — structured bindings turn `first`/`second` into meaningful names.

### std::tie (pre-C++17 unpacking)

```cpp
std::tuple<int, int, int> rgb = {255, 128, 0};
int r, g, b;
std::tie(r, g, b) = rgb;    // assign into existing variables
```

`std::tie` is still handy when you want to assign into **pre-existing** variables rather than declare new ones.

## Visual — Structured Bindings

```
  std::pair<std::string, int> p = {"Ankit", 21};

  auto [name, age] = p;
        │     │
        ▼     ▼
      "Ankit" 21

  std::map element:  pair<const string,int>
        │
  for (const auto& [k, v] : m)  →  k = key, v = value
```

One declaration splits a composite value into individually named, typed variables.

## Code Examples

### Example 1 — Iterate a map cleanly

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, std::string> capitals = {
        {"India", "New Delhi"},
        {"Japan", "Tokyo"},
        {"France", "Paris"}
    };

    for (const auto& [country, capital] : capitals) {
        std::cout << country << " → " << capital << "\n";
    }
}
```

### Example 2 — Modify elements in place

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    for (auto& x : v) x = x * x;      // square in place
    for (const auto& x : v) std::cout << x << " "; // 1 4 9 16 25
}
```

### Example 3 — Unpack a tuple

```cpp
#include <iostream>
#include <string>
#include <tuple>

std::tuple<std::string, int, double> student() {
    return {"Ankit", 21, 8.9};
}

int main() {
    auto [name, roll, gpa] = student();
    std::cout << name << " (roll " << roll << ") has GPA " << gpa << "\n";
}
```

## Common Mistakes

1. **Copying in the loop** — `for (auto x : v)` copies; use `auto&` to modify or `const auto&` to avoid copies.
2. **Modifying a container during iteration** — adding/removing elements invalidates the range.
3. **Wrong capture of map keys** — the key is `const`; use `const auto& [k, v]`.
4. **Binding order mismatch** — structured bindings follow declaration order, so rename carefully.
5. **Using structured bindings pre-C++17** — requires `-std=c++17`.
6. **Expecting `auto [a, b]` to be references by default** — plain `auto` makes copies; add `auto&` to bind by reference.

## Best Practices

- Default to `const auto&` in range loops when you only read.
- Use `auto&` to modify; use plain `auto` only for small trivially-copyable types.
- Use structured bindings for pairs/tuples/structs to replace cryptic `.first`/`.second`.
- Iterate maps with `const auto& [key, value]`.
- Prefer range-based `for` over index loops when you don't need the index.

## Practice Questions

1. Write a range-based loop that prints every element of a `std::list<std::string>`.
2. Double every element of a `std::vector<double>` using `auto&`.
3. Unpack a `std::pair<int, std::string>` into named variables and print them.
4. Iterate a `std::map<std::string, int>` with structured bindings and print key-value pairs.
5. Use `std::tie` to compare two dates represented as tuples.

## Multiple Choice Questions (MCQs)

### Q1. To modify elements in a range-based loop, the loop variable should be:
- a) `auto`
- b) `auto&`
- c) `const auto&`
- d) `const auto`

**Answer:** b

### Q2. Structured bindings are available since:
- a) C++11
- b) C++14
- c) C++17
- d) C++20

**Answer:** c

### Q3. For `std::pair<std::string,int> p;`, `auto [s, n] = p;` gives:
- a) `s` is `std::string`, `n` is `int`
- b) Both are references
- c) `s` is `int`, `n` is `std::string`
- d) A compile error

**Answer:** a — binds in order.

### Q4. In `for (const auto& [k, v] : myMap)`, what are `k` and `v`?
- a) The key and value of each map element
- b) The map's iterators
- c) Indices
- d) A pair of references to the whole map

**Answer:** a

### Q5. `std::tie(r, g, b) = tuple;` is used to:
- a) Declare new variables
- b) Assign tuple elements into existing variables
- c) Move the tuple
- d) Delete the tuple

**Answer:** b

## Key Takeaways

- Range-based `for` iterates any container: `for (const auto& x : c)`.
- Choose `auto&` to modify, `const auto&` to read, `auto` only for cheap copies.
- Structured bindings unpack pairs/tuples/structs: `auto [a, b] = value;`.
- Iterate maps with `const auto& [key, value]`.

## Next Topic

[9.5 constexpr and Compile-Time Programming](lesson-9.5-constexpr.md)
