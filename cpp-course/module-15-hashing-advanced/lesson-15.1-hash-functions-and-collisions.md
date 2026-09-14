---
module: 15
topic: "15.1"
title: "Hash Functions and Collisions"
slug: "hash-functions-and-collisions"
difficulty: "Advanced"
prerequisites:
  - Associative Containers
  - Strings
  - Complexity Analysis
estimated_minutes: 30
tags:
  - hashing
  - hash-functions
  - collisions
---

# 15.1 Hash Functions and Collisions

## Overview

A **hash function** maps a key of arbitrary size to a fixed-size integer — the **hash value**. Hash tables use that value to decide which **bucket** a key goes into, giving O(1) average lookup. But two different keys can map to the same bucket — a **collision** — and how a hash table handles collisions determines its real-world performance. Understanding this makes you a better user of `unordered_map` and lets you write custom hashes when needed.

## Learning Objectives

After this lesson you will be able to:

- Explain what a hash function does and what makes one good
- Describe collision handling: chaining and open addressing
- Analyze the average vs worst-case cost of hash operations
- Write a custom `std::hash` for a user-defined type
- Recognize when a bad hash degrades to O(n)

## Core Concepts

### What a hash function does

```cpp
// key → integer index (the bucket)
size_t h = hash(key);        // e.g. 0..HASH_MAX
size_t bucket = h % tableSize;
```

A good hash function:

1. Is **deterministic** (same key → same hash).
2. Is **fast** to compute.
3. **Spreads** keys uniformly across buckets (minimizes collisions).

### Collision handling

**Chaining** — each bucket is a linked list (or vector) of keys:

```
 bucket 0: [k3] → [k7]     ← k3 and k7 both hashed to bucket 0
 bucket 1: [k1]
 bucket 2: [k5] → [k2]
```

Lookup scans the bucket's list. This is what most C++ implementations (libstdc++, MSVC) use.

**Open addressing** — on collision, probe for another empty slot (linear/quadratic probing, double hashing). Keys live directly in the table array.

### Average vs worst case

```cpp
// Average: O(1) lookup when the load factor is low and the hash is good.
// Worst case: O(n) — every key in one bucket (bad hash or adversarial keys).
```

**Load factor** = entries / buckets. Hash tables rehash (grow) when the load factor exceeds a threshold (commonly 0.75–1.0) to keep buckets short.

### Custom hash for a user type

```cpp
struct Point {
    int x, y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};

struct PointHash {
    std::size_t operator()(const Point& p) const {
        // combine two ints (boost::hash_combine style)
        std::size_t h = std::hash<int>{}(p.x);
        h ^= std::hash<int>{}(p.y) + 0x9e3779b9 + (h << 6) + (h >> 2);
        return h;
    }
};

std::unordered_map<Point, std::string, PointHash> m;
```

The custom type needs **both** `operator==` and a `std::hash` specialization (or a custom hasher).

### Common hash-combine pattern

```cpp
std::size_t hashCombine(std::size_t seed, std::size_t v) {
    return seed ^ (v + 0x9e3779b9 + (seed << 6) + (seed >> 2));
}
```

## Visual — Hashing and Chaining

```
 keys: "apple", "banana", "apricot"

 hash("apple")   → 2      bucket 0: []
 hash("banana")  → 0      bucket 1: []
 hash("apricot") → 2      bucket 2: ["apple"] → ["apricot"]   ← collision!
                          bucket 3: ["banana"]

 lookup("apricot"): hash → bucket 2, then scan the chain
```

The hash decides the bucket; the chain resolves collisions. With a good hash and low load factor, chains stay tiny.

## Code Examples

### Example 1 — Hash a string manually (djb2-style)

```cpp
std::size_t djb2(const std::string& s) {
    std::size_t hash = 5381;
    for (char c : s) {
        hash = hash * 33 + static_cast<unsigned char>(c);
    }
    return hash;
}
```

### Example 2 — Custom key with a combined hash

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

struct Person {
    std::string first, last;
    bool operator==(const Person& o) const {
        return first == o.first && last == o.last;
    }
};

struct PersonHash {
    std::size_t operator()(const Person& p) const {
        std::size_t h = std::hash<std::string>{}(p.first);
        h ^= std::hash<std::string>{}(p.last) + 0x9e3779b9 + (h << 6) + (h >> 2);
        return h;
    }
};

int main() {
    std::unordered_map<Person, int, PersonHash> ages;
    ages[{"Ankit", "Sharma"}] = 21;
    std::cout << ages[{"Ankit", "Sharma"}];   // 21
}
```

### Example 3 — Observe load factor and rehash

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, int> m;
    for (int i = 0; i < 100; ++i) m[i] = i;
    std::cout << "size=" << m.size()
              << " buckets=" << m.bucket_count()
              << " load_factor=" << m.load_factor() << "\n";
    m.reserve(1000);          // pre-size buckets to keep the load factor low
    std::cout << "buckets after reserve=" << m.bucket_count() << "\n";
}
```

## Common Mistakes

1. **Using a type with no `hash` or `operator==`** in `unordered_map` — won't compile.
2. **Defining `==` but forgetting the hash** (or vice versa) — both are required.
3. **A hash that returns 0 for everything** — every key collides; O(n) lookups.
4. **Ignoring the load factor** — not reserving for known-large maps forces many rehashes.
5. **Hash dependent on object identity, not value** — two equal objects must hash equal (the `==`/hash contract).
6. **Assuming `unordered_map` iteration is ordered** — it's bucket order, not insertion or sorted order.

## Best Practices

- Let the standard library hash standard types; specialize `std::hash` only for your own types.
- If two objects are `==`, their hashes **must** be equal (the contract).
- Combine member hashes with a mixing function (shift/XOR) — don't just XOR raw hashes.
- `reserve(expected_size)` to control rehashing.
- For adversarial-key scenarios (security), consider a randomized or cryptographic hash.

## Practice Questions

1. Explain why a good hash function should spread keys uniformly.
2. Write a custom `std::hash` for a `struct Student { int id; std::string name; }`.
3. Demonstrate chaining by printing `bucket_count()` and `load_factor()` of a growing map.
4. Show that two equal `Point` objects produce the same hash.
5. Explain the difference between average and worst-case lookup in a hash table.

## Multiple Choice Questions (MCQs)

### Q1. A hash function maps a key to:
- a) A sorted position
- b) A fixed-size integer (hash value)
- c) A linked list
- d) A string

**Answer:** b

### Q2. A collision occurs when:
- a) The table is empty
- b) Two different keys hash to the same bucket
- c) A key is deleted
- d) The map is iterated

**Answer:** b

### Q3. Chaining resolves collisions by:
- a) Rehashing all keys
- b) Storing multiple keys in a bucket's list
- c) Deleting one key
- d) Sorting the table

**Answer:** b

### Q4. Average-case lookup in a hash table is:
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** c

### Q5. For two equal objects used as keys, their hashes must be:
- a) Different
- b) Equal
- c) Zero
- d) Unrelated

**Answer:** b — this is the `==`/hash contract.

## Key Takeaways

- Hash functions map keys to buckets; good ones are fast, deterministic, and uniform.
- Collisions are handled by chaining or open addressing; C++ uses chaining.
- Average O(1), worst O(n) with a bad hash; load factor drives rehashing.
- Custom keys need both `operator==` and a hash; equal objects must hash equal.

## Next Topic

[15.2 Greedy Algorithms](lesson-15.2-greedy-algorithms.md)
