---
module: 12
topic: "12.1"
title: "Arrays and Strings in DSA"
slug: "arrays-strings-dsa"
difficulty: "Advanced"
prerequisites:
  - Arrays and Strings
  - Complexity Analysis
  - Common Patterns
estimated_minutes: 30
tags:
  - dsa
  - arrays
  - strings
---

# 12.1 Arrays and Strings in DSA

## Overview

Arrays and strings are the most common data structures in interviews and problem sets. This lesson focuses on the **algorithmic** side — the classic techniques and problems (rotations, two-pointer scans, subarray sums, string matching) that appear constantly in DSA preparation.

## Learning Objectives

After this lesson you will be able to:

- Rotate and reverse arrays/strings efficiently
- Solve subarray-sum and two-sum problems optimally
- Use in-place techniques to save space
- Apply string-specific patterns (counting, window, comparison)
- Recognize the "array is just a lookup table" trick

## Core Concepts

### Reverse and rotate

```cpp
#include <algorithm>

std::reverse(a.begin(), a.end());

// Left-rotate by k: reverse three ranges
// [1 2 3 4 5], k=2 → [3 4 5 1 2]
std::reverse(a.begin(), a.begin() + k);   // [2 1 3 4 5]
std::reverse(a.begin() + k, a.end());     // [2 1 5 4 3]
std::reverse(a.begin(), a.end());         // [3 4 5 1 2]
```

Rotation by reversal is O(n) time, O(1) space — the standard trick.

### Kadane's algorithm (maximum subarray sum)

```cpp
int maxSubarraySum(const std::vector<int>& a) {
    int best = a[0], current = a[0];
    for (int i = 1; i < (int)a.size(); ++i) {
        current = std::max(a[i], current + a[i]);  // extend or start fresh
        best = std::max(best, current);
    }
    return best;
}
```

O(n) time, O(1) space — the canonical dynamic-programming-flavoured array problem.

### In-place dedup of a sorted array (two pointers)

```cpp
int removeDuplicates(std::vector<int>& a) {   // returns new length
    if (a.empty()) return 0;
    int write = 0;
    for (int read = 1; read < (int)a.size(); ++read) {
        if (a[read] != a[write]) a[++write] = a[read];
    }
    return write + 1;
}
```

### String counting with a fixed alphabet

```cpp
int firstUniqueChar(const std::string& s) {
    int count[256] = {0};               // O(1) space for ASCII
    for (char c : s) ++count[(unsigned char)c];
    for (int i = 0; i < (int)s.size(); ++i)
        if (count[(unsigned char)s[i]] == 1) return i;
    return -1;
}
```

When the alphabet is small and fixed, an array of counts beats a hash map.

### "Array as lookup table" trick

```cpp
// find if a pair sums to target using index hashing (not sorting)
std::unordered_set<int> seen;
for (int x : a) {
    if (seen.count(target - x)) return true;
    seen.insert(x);
}
```

Using a hash table turns "find a partner" from O(n²) into O(n).

## Visual — Rotation by Three Reversals

```
 [1 2 3 4 5]  k=2  (rotate left by 2)

 step 1: reverse [0,k)   → [2 1 | 3 4 5]
 step 2: reverse [k,n)   → [2 1 | 5 4 3]
 step 3: reverse whole   → [3 4 5 1 2]   ✓
```

Each step is O(n); three passes and no extra array — the elegant in-place rotation.

## Code Examples

### Example 1 — Kadane's maximum subarray

```cpp
#include <iostream>
#include <vector>
#include <climits>

int maxSubarray(const std::vector<int>& a) {
    int best = INT_MIN, cur = 0;
    for (int x : a) {
        cur = std::max(x, cur + x);
        best = std::max(best, cur);
    }
    return best;
}

int main() {
    std::cout << maxSubarray({-2, 1, -3, 4, -1, 2, 1, -5, 4});  // 6
}
```

### Example 2 — Check if a string has all unique characters

```cpp
#include <string>

bool allUnique(const std::string& s) {
    int seen[256] = {0};
    for (char c : s) {
        if (seen[(unsigned char)c]++) return false;
    }
    return true;
}
```

### Example 3 — Merge two sorted arrays in place

```cpp
#include <vector>

void merge(std::vector<int>& a, const std::vector<int>& b) {
    a.resize(a.size() + b.size());
    int i = (int)(a.size() - b.size()) - 1, j = (int)b.size() - 1;
    int k = (int)a.size() - 1;
    while (j >= 0) {
        if (i >= 0 && a[i] > b[j]) a[k--] = a[i--];
        else a[k--] = b[j--];
    }
}
```

## Common Mistakes

1. **O(n²) two-sum** when a hash map gives O(n) — know the trade-offs.
2. **Off-by-one in rotations** — `k % n` first (k can exceed n).
3. **Allocating a copy for in-place problems** — many array problems expect O(1) extra space.
4. **Ignoring negative numbers in Kadane** — initialize with `INT_MIN`/first element, not 0.
5. **String indexing with signed char** — negative `char` values break array indexing; cast to `unsigned char`.
6. **Forgetting empty/single-element edge cases** — these are the classic failure points.

## Best Practices

- Memorize the small toolbox: reverse-rotate, Kadane, two-pointer dedup, count arrays, hash-for-pairs.
- Prefer O(1) extra space in array/string problems when possible.
- Handle edge cases (empty, one element, all equal, negatives) explicitly.
- For strings with fixed alphabets, use a 256-slot count array rather than a map.

## Practice Questions

1. Rotate an array right by k positions using the three-reversal method.
2. Implement Kadane's algorithm and test it on an all-negative array.
3. Remove duplicates in place from a sorted vector and return the new length.
4. Find the first non-repeating character in a string using a count array.
5. Merge two sorted vectors into one sorted vector without using `std::sort`.

## Multiple Choice Questions (MCQs)

### Q1. Rotating an array by three reversals uses:
- a) O(n) time and O(n) space
- b) O(n) time and O(1) space
- c) O(n²) time and O(1) space
- d) O(1) time and O(n) space

**Answer:** b

### Q2. Kadane's algorithm finds:
- a) The longest subarray
- b) The maximum subarray sum
- c) The minimum element
- d) The median

**Answer:** b

### Q3. To check if a pair sums to a target in O(n), use:
- a) Nested loops
- b) A hash set of "seen" values
- c) `std::sort` only
- d) Recursion

**Answer:** b

### Q4. For a fixed small alphabet, counting characters is fastest with:
- a) A hash map
- b) An array of size 256
- c) A linked list
- d) Sorting the string

**Answer:** b

### Q5. In-place array algorithms are valued because they:
- a) Run slower
- b) Avoid allocating extra memory (O(1) space)
- c) Are always simpler
- d) Cannot have bugs

**Answer:** b

## Key Takeaways

- Master reverse-rotate, Kadane, two-pointer dedup, count arrays, and hash-based pair finding.
- Prefer O(1) extra space in array/string problems.
- Handle empty, single-element, and negative-value edge cases.
- Fixed alphabets → count arrays; arbitrary keys → hash maps.

## Next Topic

[12.2 Linked Lists](lesson-12.2-linked-lists.md)
