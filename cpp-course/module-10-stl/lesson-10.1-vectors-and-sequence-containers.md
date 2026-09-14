---
module: 10
topic: "10.1"
title: "Vectors and Sequence Containers"
slug: "vectors-and-sequence-containers"
difficulty: "Advanced"
prerequisites:
  - Arrays
  - Dynamic Memory Allocation
  - Templates
estimated_minutes: 30
tags:
  - stl
  - vector
  - sequence-containers
---

# 10.1 Vectors and Sequence Containers

## Overview

The STL's **sequence containers** store elements in a linear order: `std::vector`, `std::deque`, `std::list`, and `std::array`. `std::vector` is the default choice — a dynamic array that grows automatically and keeps elements contiguous in memory. This lesson covers vectors in depth and introduces the other sequence containers so you can choose correctly.

## Learning Objectives

After this lesson you will be able to:

- Use `std::vector` operations: push, access, insert, erase, resize
- Explain capacity vs size and how vectors grow
- Choose between `vector`, `deque`, `list`, and `array`
- Pass vectors to functions efficiently
- Avoid iterator invalidation bugs

## Core Concepts

### Creating and filling a vector

```cpp
#include <vector>

std::vector<int> v;                 // empty
std::vector<int> v2(5);             // 5 zeros
std::vector<int> v3(5, 7);          // 5 sevens
std::vector<int> v4 = {1, 2, 3};    // initializer list
std::vector<int> v5(v4);            // copy

v.push_back(10);                    // add to the end
v.emplace_back(20);                 // construct in place (often faster)
```

### Accessing elements

```cpp
std::vector<int> v = {10, 20, 30};

v[0];        // 10 — no bounds check (fast)
v.at(1);     // 20 — throws std::out_of_range if bad
v.front();   // 10
v.back();    // 30
```

### Size vs capacity

```cpp
std::vector<int> v;
for (int i = 0; i < 100; ++i) v.push_back(i);

v.size();       // 100   — how many elements it holds
v.capacity();   // 128   — how many it has memory for
v.reserve(1000);// pre-allocate room for 1000 (avoids reallocation)
v.shrink_to_fit(); // release extra capacity
```

`size()` is the element count; `capacity()` is the allocated slots. **Reallocation** (when size exceeds capacity) copies everything — `reserve()` beforehand prevents repeated reallocations.

### Inserting and erasing

```cpp
std::vector<int> v = {1, 2, 3};

v.insert(v.begin() + 1, 99);     // {1, 99, 2, 3}
v.erase(v.begin());              // {99, 2, 3}
v.pop_back();                    // {99, 2}
v.clear();                       // {}
```

Inserting/erasing in the middle is **O(n)** — elements shift. That's fine occasionally, but use a different container for frequent mid-insertion.

### The other sequence containers

```cpp
#include <array>    // fixed size, compile-time known
std::array<int, 5> a = {1, 2, 3, 4, 5};

#include <deque>    // double-ended queue: fast push/pop at BOTH ends
std::deque<int> d;
d.push_front(1);
d.push_back(2);

#include <list>     // doubly linked list: O(1) insert/erase anywhere
std::list<int> l = {1, 2, 3};
l.push_front(0);
```

| Container | Layout | Strong at | Weak at |
|---|---|---|---|
| `vector` | contiguous | random access, push_back | mid insert/erase |
| `deque` | chunks | push/pop both ends | mid insert/erase |
| `list` | linked nodes | insert/erase anywhere | random access (no `[]`) |
| `array` | fixed array | no allocation, `[]` | fixed size |

## Visual — Vector Growth

```
 size=3, capacity=4          push_back → size=4 (fits, no realloc)
 ┌───┬───┬───┬───┐
 │ 1 │ 2 │ 3 │   │
 └───┴───┴───┴───┘

 push_back again → size would be 5 > capacity 4
   → reallocate: new bigger buffer, COPY all elements, free old
 ┌───┬───┬───┬───┬───┬───┬───┬───┐
 │ 1 │ 2 │ 3 │ 4 │ 5 │   │   │   │
 └───┴───┴───┴───┴───┴───┴───┴───┘
 capacity grew (typically ~2×)
```

Reallocation copies every element, so reserve space ahead when you know the size.

## Code Examples

### Example 1 — Read and print with a vector

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers;
    int n;
    while (std::cin >> n) {
        numbers.push_back(n);
    }
    for (const auto& x : numbers) std::cout << x << " ";
    return 0;
}
```

### Example 2 — Reserve to avoid reallocation

```cpp
#include <vector>

std::vector<int> build(int count) {
    std::vector<int> v;
    v.reserve(count);              // one allocation, no reallocations
    for (int i = 0; i < count; ++i) {
        v.push_back(i);
    }
    return v;                      // moved (or NRVO'd) — cheap
}
```

### Example 3 — Bounds-checked access

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    try {
        std::cout << v.at(5);      // throws std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "out of range: " << e.what();
    }
}
```

## Common Mistakes

1. **Using `v[i]` out of bounds** — undefined behaviour; prefer `v.at(i)` when unsure.
2. **Inserting/erasing while iterating** — invalidates iterators and skips elements; use the returned iterator or an index loop backwards.
3. **Holding references/iterators across `push_back`** — reallocation invalidates them.
4. **Ignoring capacity** — repeated `push_back` without `reserve` causes many reallocations.
5. **Using `list` for small data** — pointer chasing is slower than vector's contiguous cache-friendly layout; default to vector.
6. **`vector<bool>` surprises** — it's a specialized bit-packed type, not a normal vector; use `std::bitset` or `vector<char>` if needed.

## Best Practices

- Default to `std::vector`; switch only with a measured reason.
- `reserve(n)` when the final size is known or bounded.
- Use `emplace_back(args...)` to construct in place and avoid temporaries.
- Pass vectors by `const&` to read, `&` to modify, by value when taking ownership.
- Use `at()` for safety-critical code and `[]` in hot paths after bounds are established.

## Practice Questions

1. Create a vector of 10 integers, fill with squares (0, 1, 4, …), and print them.
2. Read integers until a sentinel (e.g. -1) and store them, then print in reverse.
3. Demonstrate `size()` vs `capacity()` while growing a vector with and without `reserve`.
4. Remove all even numbers from a vector using an index loop that runs backwards.
5. Compare, in comments, when you'd choose `deque` or `list` over `vector`.

## Multiple Choice Questions (MCQs)

### Q1. `std::vector` stores elements:
- a) In linked nodes
- b) Contiguously in a dynamic array
- c) In a hash table
- d) On the stack only

**Answer:** b

### Q2. `v.size()` returns:
- a) Allocated memory slots
- b) The number of elements currently stored
- c) The maximum possible size
- d) The byte size of the vector

**Answer:** b

### Q3. What does `v.reserve(1000)` do?
- a) Creates 1000 elements
- b) Pre-allocates capacity for 1000 elements without adding any
- c) Removes 1000 elements
- d) Resizes to exactly 1000

**Answer:** b

### Q4. Which access throws on an invalid index?
- a) `v[i]`
- b) `v.at(i)`
- c) `v.front()`
- d) `v.back()`

**Answer:** b

### Q5. Which container gives O(1) insert/erase anywhere but no random access?
- a) `vector`
- b) `deque`
- c) `list`
- d) `array`

**Answer:** c

## Key Takeaways

- `std::vector` is the default dynamic array: contiguous, fast random access, cheap push_back.
- `size()` = elements, `capacity()` = allocated slots; `reserve()` prevents reallocation.
- Mid insert/erase is O(n) in vectors; use `deque` (both ends) or `list` (anywhere) when needed.
- Watch iterator invalidation on reallocation and erase.

## Next Topic

[10.2 Associative Containers (Map/Set)](lesson-10.2-associative-containers.md)
