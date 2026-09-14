---
module: 10
topic: "10.3"
title: "Iterators and Ranges"
slug: "iterators-and-ranges"
difficulty: "Advanced"
prerequisites:
  - Vectors and Sequence Containers
  - Pointers
estimated_minutes: 30
tags:
  - stl
  - iterators
  - ranges
---

# 10.3 Iterators and Ranges

## Overview

An **iterator** is a generalized pointer that lets you move through a container and access its elements without knowing how the container is stored. Iterators are the glue between containers and algorithms — `std::sort(v.begin(), v.end())` works on a vector, a deque, an array, or your own container. A **[begin, end) range** is the universal way to describe "these elements."

## Learning Objectives

After this lesson you will be able to:

- Explain the `[begin, end)` half-open range convention
- Use the main iterator categories (input, forward, bidirectional, random-access)
- Get iterators with `begin()`/`end()` and `std::begin`/`std::end`
- Use reverse iterators
- Write your own simple iterator-aware loops

## Core Concepts

### The half-open range

```cpp
std::vector<int> v = {10, 20, 30, 40};

v.begin();  // → points at 10
v.end();    // → one PAST 40 (not an element!)
```

A range `[begin, end)` includes `begin` but **not** `end`. This is why loops stop at `it != end` — the end is a sentinel, not a real element.

### Basic iteration

```cpp
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " ";   // dereference like a pointer
}
```

`*it` accesses the element, `++it` advances, `it->member` accesses members — identical to pointer syntax.

### Iterator categories

| Category | What it can do | Example |
|---|---|---|
| Input | read, single pass, `++` | reading from a stream |
| Forward | read, multi-pass, `++` | `std::forward_list` |
| Bidirectional | `++` and `--` | `std::list`, `std::set` |
| Random-access | `+ n`, `- n`, `<`, `[]` | `std::vector`, `std::deque`, arrays |

Algorithms document which category they need — `std::sort` requires random-access, `std::find` only needs input.

### Free functions and const

```cpp
#include <iterator>

auto b = std::begin(v);   // works for C arrays too
auto e = std::end(v);

std::vector<int> cv = {1, 2, 3};
auto cit = cv.cbegin();   // const_iterator — read-only
auto ce  = cv.cend();
```

`std::begin`/`std::end` work on raw arrays and any container — preferred for generic code. `cbegin()`/`cend()` give read-only iterators.

### Reverse iterators

```cpp
std::vector<int> v = {1, 2, 3, 4};

for (auto it = v.rbegin(); it != v.rend(); ++it) {
    std::cout << *it;   // 4 3 2 1
}
```

`rbegin()` points at the last element; `rend()` is one before the first. `++` on a reverse iterator moves **backwards**.

### Iterators as the container/algorithm glue

```cpp
#include <algorithm>

std::sort(v.begin(), v.end());                 // sort whole vector
std::sort(v.begin() + 1, v.begin() + 4);       // sort a subrange
```

Because algorithms talk to iterators, not containers, the same algorithm works on any compatible range.

## Visual — The [begin, end) Range

```
 std::vector<int> v = {10, 20, 30, 40};

  begin ──▶ ┌────┬────┬────┬────┐ ◀── end (one past last)
             │ 10 │ 20 │ 30 │ 40 │
             └────┴────┴────┴────┘
   included: 10, 20, 30, 40
   excluded: (nothing — end is a sentinel)

  loop: for (auto it = begin; it != end; ++it)
        stops when it == end — no out-of-bounds access.
```

The half-open convention means an empty range is `[begin, begin)` — clean and always valid.

## Code Examples

### Example 1 — Manual iteration and modification

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    for (auto it = v.begin(); it != v.end(); ++it) {
        *it *= 10;                 // modify through the iterator
    }
    for (auto it = v.cbegin(); it != v.cend(); ++it) {
        std::cout << *it << " ";   // 10 20 30 40
    }
}
```

### Example 2 — Reverse traversal

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::string> days = {"Mon", "Tue", "Wed"};
    for (auto it = days.rbegin(); it != days.rend(); ++it) {
        std::cout << *it << " ";   // Wed Tue Mon
    }
}
```

### Example 3 — Using a subrange with an algorithm

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {5, 1, 4, 2, 3};
    std::sort(v.begin() + 1, v.begin() + 4);   // sort only [1, 4)
    for (int x : v) std::cout << x << " ";     // 5 1 2 4 3
}
```

## Common Mistakes

1. **Dereferencing `end()`** — `*v.end()` is undefined behaviour; `end()` is a sentinel.
2. **Invalidating iterators** — inserting/erasing can invalidate iterators into a vector.
3. **Comparing iterators from different containers** — undefined behaviour.
4. **Using random-access ops on the wrong category** — `it + 5` fails on a `std::list` iterator.
5. **`--v.begin()`** — moving before `begin()` is undefined.
6. **Forgetting `cbegin()`** — accidentally mutating through a const context or losing const-correctness.

## Best Practices

- Prefer range-based `for` when you don't need the iterator itself.
- Use `cbegin()`/`cend()` for read-only traversal.
- Pass `[begin, end)` pairs to algorithms — they're the universal interface.
- Prefer `std::begin`/`std::end` for generic code that may get C arrays.
- Learn the iterator category you're working with before applying operations.

## Practice Questions

1. Iterate a `std::list<int>` with an explicit iterator and print each value.
2. Print a vector in reverse using `rbegin()`/`rend()`.
3. Sort only the first three elements of a vector and print the result.
4. Use `std::begin`/`std::end` to iterate a raw C array.
5. Explain the difference between `begin()` and `cbegin()`, with an example.

## Multiple Choice Questions (MCQs)

### Q1. In the range `[begin, end)`, `end` points to:
- a) The last element
- b) One past the last element
- c) The first element
- d) A null element

**Answer:** b

### Q2. Which iterator category supports `it + 3`?
- a) Input
- b) Forward
- c) Bidirectional
- d) Random-access

**Answer:** d

### Q3. `v.rbegin()` points to:
- a) The first element
- b) The last element
- c) One before the first
- d) One past the last

**Answer:** b — reverse iterators start at the back.

### Q4. `std::begin(arr)` works on a raw C array:
- a) True
- b) False
- c) Only for `std::array`
- d) Only with `std::end`

**Answer:** a — `std::begin`/`std::end` support arrays.

### Q5. Dereferencing `v.end()` is:
- a) Safe, returns 0
- b) Undefined behaviour
- c) A compile error
- d) Returns the last element

**Answer:** b

## Key Takeaways

- Iterators are generalized pointers; ranges are half-open `[begin, end)`.
- Four main categories: input, forward, bidirectional, random-access.
- `cbegin()`/`cend()` for read-only; `rbegin()`/`rend()` for reverse.
- Algorithms operate on iterator ranges, decoupling them from any specific container.

## Next Topic

[10.4 Algorithms](lesson-10.4-algorithms.md)
