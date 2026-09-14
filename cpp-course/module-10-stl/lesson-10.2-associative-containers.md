---
module: 10
topic: "10.2"
title: "Associative Containers (Map and Set)"
slug: "associative-containers"
difficulty: "Advanced"
prerequisites:
  - Vectors and Sequence Containers
  - Templates
estimated_minutes: 30
tags:
  - stl
  - map
  - set
  - unordered-map
---

# 10.2 Associative Containers (Map and Set)

## Overview

**Associative containers** store elements **keyed by value** with fast lookup, instead of by position. `std::set` keeps unique, sorted keys; `std::map` maps unique, sorted keys to values; `std::unordered_map`/`unordered_set` use hash tables for O(1) average lookup. These are your tools for dictionaries, deduplication, membership checks, and counting.

## Learning Objectives

After this lesson you will be able to:

- Use `std::set` for sorted unique values
- Use `std::map` for key→value lookups
- Choose between ordered (`map`/`set`) and unordered (`unordered_map`/`unordered_set`)
- Use `find`, `insert`, `erase`, and `count` correctly
- Avoid the common pitfalls of `operator[]` on maps

## Core Concepts

### std::set — unique, sorted values

```cpp
#include <set>

std::set<int> s = {5, 1, 3, 1, 5};   // duplicates removed, sorted
// s contains {1, 3, 5}

s.insert(7);              // add
s.insert(3);              // ignored — already present
s.erase(1);               // remove

if (s.find(3) != s.end()) { /* found */ }
std::cout << s.count(5);  // 0 or 1 (set has unique elements)
```

`std::set` is backed by a **balanced binary tree**: insert/find/erase are **O(log n)**, and iteration is **sorted**.

### std::map — key → value

```cpp
#include <map>
#include <string>

std::map<std::string, int> ages;
ages["Ankit"] = 21;            // insert or update
ages["Riya"] = 20;
ages.insert({"Rohan", 22});    // insert (ignored if key exists)

std::cout << ages["Ankit"];    // 21

auto it = ages.find("Riya");   // find without inserting
if (it != ages.end()) {
    std::cout << it->second;   // 20
}
```

Keys are unique and sorted; each element is a `std::pair<const Key, Value>`.

### The operator[] gotcha

```cpp
std::map<std::string, int> m;

m["missing"];     // CAREFUL: this INSERTS "missing" -> 0!
std::cout << m.size();   // 1

// Read without inserting:
if (m.find("missing") != m.end()) { /* ... */ }
```

`operator[]` **inserts a default value** when the key is absent. For read-only lookups use `find()` or `at()` (`at` throws if missing).

### unordered_map / unordered_set

```cpp
#include <unordered_map>
#include <unordered_set>

std::unordered_map<std::string, int> m;   // hash table
m["apple"] = 5;
std::cout << m["apple"];                  // 5 — O(1) average

std::unordered_set<std::string> words;    // membership, no order
words.insert("hello");
if (words.count("hello")) { /* found */ }
```

Unordered containers use **hash tables**: O(1) average lookup, but **no sorted order** and more memory overhead.

### map vs unordered_map

| | `std::map` | `std::unordered_map` |
|---|---|---|
| Structure | balanced tree | hash table |
| Lookup | O(log n) | O(1) average |
| Iteration order | sorted by key | unspecified |
| Key requirement | `operator<` | `std::hash` + `operator==` |

## Visual — Ordered vs Unordered

```
 std::map (tree, sorted)          std::unordered_map (hash table)
      ┌───┐                        hash("apple") → bucket 2
      │ 4 │                        ┌─────────┬─────────┬─────────┐
    ┌─┴─┐                         │ bucket0 │ apple:5 │ bucket2 │
    │ 2 │  8                      │         │ banana:3│         │
    └───┘                         └─────────┴─────────┴─────────┘
  keys iterate: 2, 4, 8           keys iterate: unspecified order
```

Choose `map` when you need sorted iteration; choose `unordered_map` for pure key→value speed.

## Code Examples

### Example 1 — Word frequency counter

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> freq;
    std::string word;
    while (std::cin >> word) {
        ++freq[word];              // increments (default 0 on first sight)
    }
    for (const auto& [w, count] : freq) {
        std::cout << w << ": " << count << "\n";
    }
}
```

### Example 2 — Membership with a set

```cpp
#include <iostream>
#include <set>

int main() {
    std::set<std::string> banned = {"spam", "ads", "scam"};
    std::string s = "spam";
    if (banned.find(s) != banned.end()) {
        std::cout << s << " is banned\n";
    }
}
```

### Example 3 — Safe lookup with find

```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores = {{"Ankit", 90}};

    auto it = scores.find("Riya");
    if (it != scores.end()) {
        std::cout << it->second;    // only prints if present
    } else {
        std::cout << "not found";
    }
}
```

## Common Mistakes

1. **Using `m[k]` for lookups** — it silently inserts a default; use `find()`/`at()` for read-only.
2. **Expecting unordered iteration order** — `unordered_map` has no guaranteed order; use `map` for sorted output.
3. **Modifying keys in place** — map keys are `const`; you can't change them through iterators.
4. **Confusing `count` in set vs multiset** — `set::count` is 0/1; `multiset::count` can exceed 1.
5. **Assuming `insert` updates** — `insert` ignores existing keys; use `m[k] = v` or `insert_or_assign` to update.
6. **Forgetting custom hash for custom keys** — unordered containers need a hash function for user types.

## Best Practices

- Use `unordered_map`/`unordered_set` for fast lookup; `map`/`set` for sorted order.
- Prefer `find()` for reads; use `operator[]` only when insert-on-miss is intended.
- Use `at()` when a missing key is a logic error (it throws).
- Iterate with structured bindings: `for (const auto& [k, v] : m)`.
- Provide a good `std::hash` (or use existing standard types) for custom keys in unordered containers.

## Practice Questions

1. Read words and count the frequency of each using `std::map`, then print in alphabetical order.
2. Deduplicate a list of integers using `std::set` and print the unique sorted values.
3. Build a `std::map<std::string, int>` of student scores and look one up safely with `find`.
4. Demonstrate the difference between `m["key"]` and `m.at("key")` when the key is missing.
5. Store pairs in an `unordered_map` and explain why the iteration order differs from a `map`.

## Multiple Choice Questions (MCQs)

### Q1. `std::set` stores:
- a) Sorted, unique keys
- b) Unsorted duplicates
- c) Key-value pairs
- d) A fixed array

**Answer:** a

### Q2. `std::map<std::string,int>` lookup with `find` has complexity:
- a) O(1)
- b) O(log n)
- c) O(n)
- d) O(n log n)

**Answer:** b — a balanced tree.

### Q3. What does `m["newkey"]` do when the key is absent?
- a) Throws an exception
- b) Returns an error
- c) Inserts the key with a default value
- d) Returns `nullptr`

**Answer:** c — `operator[]` default-constructs the value.

### Q4. Which gives O(1) average lookup?
- a) `std::map`
- b) `std::unordered_map`
- c) `std::set`
- d) `std::list`

**Answer:** b — hash table.

### Q5. To check membership without inserting, use:
- a) `m[key]`
- b) `m.find(key) != m.end()`
- c) `m.at(key)`
- d) `m[key] = 0`

**Answer:** b

## Key Takeaways

- `set` = unique sorted keys; `map` = unique sorted key→value pairs.
- `map`/`set` are tree-based (O(log n), sorted); `unordered_*` are hash-based (O(1), unordered).
- `operator[]` inserts on miss — use `find()`/`at()` for safe reads.
- Iterate maps with structured bindings.

## Next Topic

[10.3 Iterators and Ranges](lesson-10.3-iterators-and-ranges.md)
