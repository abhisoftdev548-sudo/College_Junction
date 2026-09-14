---
module: 10
topic: "10.4"
title: "STL Algorithms"
slug: "stl-algorithms"
difficulty: "Advanced"
prerequisites:
  - Iterators and Ranges
  - Lambda Expressions
  - Containers
estimated_minutes: 30
tags:
  - stl
  - algorithms
  - sorting
---

# 10.4 STL Algorithms

## Overview

The `<algorithm>` header provides over 100 ready-made functions — `sort`, `find`, `count`, `accumulate`, `transform`, and more — that operate on iterator ranges. Using them is usually **shorter, clearer, and less bug-prone** than hand-written loops. This lesson covers the most important algorithms you'll use daily.

## Learning Objectives

After this lesson you will be able to:

- Sort with `std::sort` and custom comparators
- Search with `find`, `find_if`, `binary_search`
- Count and check with `count`, `count_if`, `all_of`, `any_of`
- Transform ranges with `std::transform` and aggregate with `std::accumulate`
- Remove elements with the erase–remove idiom

## Core Concepts

### Sorting

```cpp
#include <algorithm>

std::vector<int> v = {5, 1, 4, 2, 3};
std::sort(v.begin(), v.end());               // ascending
std::sort(v.begin(), v.end(), std::greater<int>()); // descending

std::vector<std::string> w = {"banana", "apple"};
std::sort(w.begin(), w.end(),
          [](const auto& a, const auto& b) { return a.size() < b.size(); });
```

`std::sort` is O(n log n) and requires **random-access** iterators. The comparator returns `true` if `a` should come before `b`.

### Searching

```cpp
auto it = std::find(v.begin(), v.end(), 3);              // first match
auto it2 = std::find_if(v.begin(), v.end(),
                        [](int x) { return x % 2 == 0; }); // first even

if (std::binary_search(v.begin(), v.end(), 3)) { /* present */ } // sorted range!
```

`find`/`find_if` scan linearly; `binary_search` needs a **sorted** range but is O(log n).

### Counting and checking

```cpp
int n = std::count(v.begin(), v.end(), 7);               // how many 7s
int evens = std::count_if(v.begin(), v.end(),
                          [](int x) { return x % 2 == 0; });

bool allPos = std::all_of(v.begin(), v.end(), [](int x) { return x > 0; });
bool anyBig = std::any_of(v.begin(), v.end(), [](int x) { return x > 100; });
bool noneNeg = std::none_of(v.begin(), v.end(), [](int x) { return x < 0; });
```

### Transforming and reducing

```cpp
#include <numeric>

std::transform(v.begin(), v.end(), v.begin(),
               [](int x) { return x * x; });            // square in place

int sum = std::accumulate(v.begin(), v.end(), 0);       // sum (from <numeric>)
int prod = std::accumulate(v.begin(), v.end(), 1,
                           [](int a, int b) { return a * b; });
```

### The erase–remove idiom

```cpp
std::vector<int> v = {1, 2, 3, 2, 4, 2};

// remove_if only MOVES matching elements to the end and returns a new end;
// erase actually deletes them:
v.erase(std::remove(v.begin(), v.end(), 2), v.end());   // {1, 3, 4}
```

This is the canonical way to delete all elements matching a condition.

### More essentials

```cpp
std::reverse(v.begin(), v.end());
std::fill(v.begin(), v.end(), 0);
std::min_element / std::max_element;   // returns an iterator to the extreme
std::min / std::max;                   // returns values (with initializer lists too)
std::unique(v.begin(), v.end());       // collapse adjacent duplicates (sorted first)
```

## Visual — How std::sort and the Erase-Remove Idiom Work

```
  std::sort([5, 1, 4, 2, 3])  →  [1, 2, 3, 4, 5]

  erase–remove for value 2:
  before: [1, 2, 3, 2, 4, 2]
  remove: [1, 3, 4, ?, ?, ?]   ← keeps first three, returns iterator at ?
  erase:  [1, 3, 4]            ← actually deletes the tail
```

`remove` doesn't shrink anything (it can't — it only sees iterators); pairing it with `erase` does the real deletion.

## Code Examples

### Example 1 — Sort, find, and count

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {5, 1, 4, 2, 3, 5};
    std::sort(v.begin(), v.end());

    std::cout << "count of 5: " << std::count(v.begin(), v.end(), 5) << "\n";
    auto it = std::find(v.begin(), v.end(), 3);
    if (it != v.end()) std::cout << "found 3\n";
    for (int x : v) std::cout << x << " ";   // 1 2 3 4 5 5
}
```

### Example 2 — all_of validation

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {85, 92, 78, 95};
    bool allPass = std::all_of(scores.begin(), scores.end(),
                               [](int s) { return s >= 40; });
    std::cout << (allPass ? "all pass" : "someone failed");
}
```

### Example 3 — transform + accumulate

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::transform(v.begin(), v.end(), v.begin(),
                   [](int x) { return x * x; });      // {1, 4, 9, 16}
    int total = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "sum of squares = " << total;        // 30
}
```

## Common Mistakes

1. **`binary_search` on an unsorted range** — undefined results; sort first.
2. **Forgetting `erase` after `remove`** — elements remain (the idiom needs both).
3. **Wrong comparator** — a comparator that isn't a strict weak ordering causes crashes in `sort`.
4. **`accumulate` on empty range** — returns the initial value; know what your init means.
5. **O(n²) from `find` in a loop** — use a `set`/`map` or sort + `binary_search` for repeated lookups.
6. **Algorithms needing the wrong iterator category** — `std::sort` fails on `std::list` (use `list::sort`).

## Best Practices

- Prefer algorithms over hand-written loops — they're less error-prone and self-documenting.
- Pass lambdas for custom predicates; keep them short.
- Use `const auto&` parameters in lambdas to avoid copies.
- Prefer `std::accumulate` over manual sum loops; `std::any_of`/`all_of` over flag loops.
- Remember the erase–remove idiom when filtering containers.

## Practice Questions

1. Sort a vector of strings first by length, then alphabetically for equal lengths.
2. Count how many elements of a vector are within a range `[10, 20]` using `count_if`.
3. Use `std::accumulate` to compute the product of a vector's elements.
4. Remove all negative numbers from a vector with the erase–remove idiom.
5. Check with `all_of` whether every word in a vector has more than 2 characters.

## Multiple Choice Questions (MCQs)

### Q1. `std::sort` requires:
- a) Input iterators
- b) Random-access iterators
- c) A linked list
- d) A hash table

**Answer:** b

### Q2. The erase–remove idiom is:
- a) `v.erase(std::remove(...), v.end())`
- b) `std::remove(v)` alone
- c) `v.remove(...)`
- d) `std::erase(v)`

**Answer:** a

### Q3. `std::binary_search` assumes the range is:
- a) Empty
- b) Sorted
- c) Reversed
- d) A set

**Answer:** b

### Q4. Which algorithm checks if every element satisfies a predicate?
- a) `any_of`
- b) `count_if`
- c) `all_of`
- d) `find_if`

**Answer:** c

### Q5. `std::accumulate(v.begin(), v.end(), 0)` computes:
- a) The product
- b) The sum
- c) The maximum
- d) The average

**Answer:** b

## Key Takeaways

- `<algorithm>` + `<numeric>` cover sort, find, count, transform, accumulate, and more.
- `sort` is O(n log n) and needs random-access iterators; comparators must be strict weak orderings.
- Filter with the **erase–remove idiom**.
- Prefer algorithms over manual loops for clarity and correctness.

## Next Topic

[10.5 STL in Practice](lesson-10.5-stl-in-practice.md)
