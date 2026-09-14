---
module: 10
topic: "10.5"
title: "STL in Practice"
slug: "stl-in-practice"
difficulty: "Advanced"
prerequisites:
  - Vectors and Sequence Containers
  - Associative Containers
  - Iterators and Ranges
  - STL Algorithms
estimated_minutes: 30
tags:
  - stl
  - practice
  - problem-solving
---

# 10.5 STL in Practice

## Overview

Real problems are solved by **composing** the tools from the last four lessons: choose the right container, traverse with iterators, and shape data with algorithms. This lesson walks through realistic scenarios — deduplication, grouping, ranking, two-pointer patterns, and command-line argument parsing — showing the idiomatic STL solution for each.

## Learning Objectives

After this lesson you will be able to:

- Choose the right container for a given problem
- Combine containers, iterators, and algorithms into clean solutions
- Apply common patterns: dedup, frequency counting, sorting by value, two-pointer
- Parse simple input into structured data
- Refactor loop-heavy code into STL expressions

## Core Concepts

### Choosing the right tool

| You need to… | Use |
|---|---|
| Store a list, access by index | `std::vector` |
| Fast key→value lookup, no order | `std::unordered_map` |
| Sorted unique values | `std::set` |
| Key→value with sorted keys | `std::map` |
| Queue / stack behaviour | `std::queue` / `std::stack` / `std::deque` |
| Min/max priority | `std::priority_queue` |

### Pattern 1 — Deduplicate and sort

```cpp
std::vector<int> v = {3, 1, 3, 2, 1, 2, 3};
std::set<int> s(v.begin(), v.end());   // {1, 2, 3} — unique + sorted
std::vector<int> unique(s.begin(), s.end());
```

### Pattern 2 — Frequency counting

```cpp
std::unordered_map<std::string, int> freq;
for (const auto& word : words) ++freq[word];
```

### Pattern 3 — Sort by frequency (descending)

```cpp
std::vector<std::pair<std::string, int>> items(freq.begin(), freq.end());
std::sort(items.begin(), items.end(),
          [](const auto& a, const auto& b) { return a.second > b.second; });
```

### Pattern 4 — Two-pointer on a sorted vector

```cpp
// find a pair that sums to target (classic two-pointer)
int i = 0, j = v.size() - 1;
while (i < j) {
    int sum = v[i] + v[j];
    if (sum == target) { /* found v[i], v[j] */ break; }
    else if (sum < target) ++i;
    else --j;
}
```

### Pattern 5 — Parse and structure input

```cpp
std::string line;
while (std::getline(std::cin, line)) {
    std::istringstream iss(line);
    std::string token;
    while (iss >> token) { /* process token */ }
}
```

## Visual — Compose the STL

```
  problem: "most frequent word"

  input → std::vector<std::string> words
            │
            ▼  std::unordered_map<std::string,int> freq
            │     ++freq[word] for each word
            ▼  std::vector<pair> from freq
            │     std::sort by .second (descending)
            ▼  answer = items[0].first
```

Most STL solutions are a short pipeline: container → algorithm → container → algorithm.

## Code Examples

### Example 1 — Top-K frequent elements

```cpp
#include <algorithm>
#include <iostream>
#include <unordered_map>
#include <vector>

std::vector<std::string> topWords(const std::vector<std::string>& words, int k) {
    std::unordered_map<std::string, int> freq;
    for (const auto& w : words) ++freq[w];

    std::vector<std::pair<std::string, int>> items(freq.begin(), freq.end());
    std::sort(items.begin(), items.end(),
              [](const auto& a, const auto& b) { return a.second > b.second; });

    std::vector<std::string> result;
    for (int i = 0; i < k && i < static_cast<int>(items.size()); ++i) {
        result.push_back(items[i].first);
    }
    return result;
}
```

### Example 2 — Two-sum using a hash map

```cpp
#include <unordered_map>
#include <vector>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;   // value → index
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}
```

### Example 3 — Filter, transform, aggregate pipeline

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6};
    // keep evens, square them, sum
    std::vector<int> evens;
    std::copy_if(v.begin(), v.end(), std::back_inserter(evens),
                 [](int x) { return x % 2 == 0; });
    std::transform(evens.begin(), evens.end(), evens.begin(),
                   [](int x) { return x * x; });
    int total = std::accumulate(evens.begin(), evens.end(), 0);
    std::cout << total;   // 4 + 16 + 36 = 56
}
```

## Common Mistakes

1. **Premature optimization** — obsessing over `map` vs `unordered_map` before measuring.
2. **Rebuilding containers in loops** — construct once, then reuse.
3. **Using `[]` on maps for reads** — accidentally inserts keys.
4. **Ignoring iterator invalidation** when erasing from a vector while iterating.
5. **O(n²) lookups** — a `vector` scan where a `set`/`unordered_map` lookup belongs.
6. **Complex custom code where an algorithm exists** — e.g. hand-rolled max instead of `std::max_element`.

## Best Practices

- Sketch the pipeline first: which containers and algorithms compose to the answer?
- Default to `vector` + `sort` + algorithms; optimize to hash tables/trees when needed.
- Prefer `count`/`find`/`transform` over manual loops.
- Use `std::back_inserter` to append results into an empty container.
- Keep problem-solving code readable — the STL should make intent obvious, not obscure it.

## Practice Questions

1. Given a vector of integers, return the **second largest** distinct value (handle ties).
2. Count the frequency of characters in a string and print the most common one.
3. Merge two sorted vectors into one sorted vector (use `std::merge`).
4. Find all pairs `(a, b)` in a vector that sum to a target using a hash map.
5. Parse a CSV-like line `"Ankit,21,8.9"` into a struct using `std::istringstream` and `std::getline`.

## Multiple Choice Questions (MCQs)

### Q1. To deduplicate and sort a vector, the cleanest tool is:
- a) `std::sort` only
- b) `std::set`
- c) `std::list`
- d) `std::queue`

**Answer:** b — a set removes duplicates and keeps order.

### Q2. For O(1) average key lookup, use:
- a) `std::map`
- b) `std::vector`
- c) `std::unordered_map`
- d) `std::deque`

**Answer:** c

### Q3. `std::back_inserter(v)` is used to:
- a) Read from the back
- b) Append elements to `v` via an output iterator
- c) Reverse `v`
- d) Sort `v`

**Answer:** b

### Q4. The two-pointer pattern requires the array to be:
- a) Sorted
- b) A hash map
- c) Empty
- d) Linked

**Answer:** a

### Q5. Which is the idiomatic way to count word frequencies?
- a) Nested loops over a vector
- b) `std::unordered_map` with `++freq[word]`
- c) `std::set` only
- d) `std::sort` only

**Answer:** b

## Key Takeaways

- STL solutions are **pipelines**: choose containers, then shape data with algorithms.
- Memorize the common patterns: dedup (set), frequency (map), top-K (sort pairs), two-pointer, parse (stringstream).
- Prefer O(1) hash lookup for repeated searches; keep vectors for indexed/sequential data.
- Readability first — optimize only after measuring.

## Module 10 Complete 🎉

You've finished **Module 10 — The Standard Template Library (STL)**. Next up: **Module 11 — Problem Solving**.
