---
module: 15
topic: "15.4"
title: "Two Pointers and Sliding Windows"
slug: "two-pointers-sliding-windows"
difficulty: "Advanced"
prerequisites:
  - Arrays and Strings in DSA
  - Common Patterns
  - Complexity Analysis
estimated_minutes: 30
tags:
  - algorithms
  - two-pointers
  - sliding-window
---

# 15.4 Two Pointers and Sliding Windows

## Overview

**Two pointers** and the **sliding window** are the two most effective techniques for turning O(n²) array/string problems into O(n). Two pointers move inward or in tandem through a sorted array; a sliding window maintains a contiguous subarray that expands and shrinks to satisfy a constraint. This lesson goes deeper than the pattern overview, with the harder variations.

## Learning Objectives

After this lesson you will be able to:

- Distinguish the two-pointer variants (opposite ends, same direction, tandem)
- Implement variable-size and fixed-size sliding windows
- Solve maximum-sum, longest-substring, and two-sum problems in O(n)
- Handle the "shrink the window" condition correctly
- Recognize when a hash map must accompany the window

## Core Concepts

### Two-pointer variants

```cpp
// 1. Opposite ends (sorted arrays): pair sums, container with most water
int i = 0, j = n - 1;
while (i < j) { /* move one pointer based on the condition */ }

// 2. Same direction (fast/sslow): remove duplicates, in-place dedup
int write = 0;
for (int read = 0; read < n; ++read) { /* ... */ }

// 3. Tandem (two sequences): merge, intersection of sorted arrays
int i = 0, j = 0;
while (i < n && j < m) { /* compare a[i] and b[j] */ }
```

### Variable-size sliding window

```cpp
int left = 0, sum = 0, best = 0;
for (int right = 0; right < n; ++right) {
    sum += a[right];                        // expand
    while (sum > limit) sum -= a[left++];   // shrink while invalid
    best = std::max(best, right - left + 1);
}
```

### Fixed-size window

```cpp
int sum = 0;
for (int i = 0; i < k; ++i) sum += a[i];      // first window
int best = sum;
for (int i = k; i < n; ++i) {
    sum += a[i] - a[i - k];                   // slide: add right, drop left
    best = std::max(best, sum);
}
```

### Window with a hash map (longest substring, k distinct)

```cpp
// longest substring with at most k distinct characters
std::unordered_map<char,int> freq;
int left = 0, best = 0;
for (int right = 0; right < (int)s.size(); ++right) {
    ++freq[s[right]];
    while ((int)freq.size() > k) {            // too many distinct
        if (--freq[s[left]] == 0) freq.erase(s[left]);
        ++left;
    }
    best = std::max(best, right - left + 1);
}
```

The hash map tracks *what's inside the window*, so the shrink condition is "while invalid."

### The key invariant

At every step, the window `[left, right]` is the **longest valid window ending at `right`**. Shrinking from the left only as much as needed keeps the total work O(n) — each element enters and leaves the window once.

## Visual — Expanding and Shrinking

```
 array: [2, 1, 5, 2, 3, 2],  limit sum ≤ 7

 right=0: [2]         sum=2  ✓
 right=1: [2,1]       sum=3  ✓
 right=2: [2,1,5]     sum=8  ✗ → shrink: [1,5]=6 ✓
 right=3: [1,5,2]     sum=8  ✗ → [5,2]=7 ✓
 right=4: [5,2,3]     sum=10 ✗ → [2,3]=5 ✓
 right=5: [2,3,2]     sum=7  ✓
 longest = 3
```

Expand rightward every step; shrink from the left only while the constraint is violated.

## Code Examples

### Example 1 — Container with most water (opposite pointers)

```cpp
int maxArea(const std::vector<int>& h) {
    int i = 0, j = h.size() - 1, best = 0;
    while (i < j) {
        int area = std::min(h[i], h[j]) * (j - i);
        best = std::max(best, area);
        if (h[i] < h[j]) ++i; else --j;   // move the shorter side
    }
    return best;
}
```

### Example 2 — Longest substring without repeating characters

```cpp
#include <string>
#include <unordered_map>
#include <algorithm>

int lengthOfLongestSubstring(const std::string& s) {
    std::unordered_map<char,int> last;   // last seen index
    int left = 0, best = 0;
    for (int right = 0; right < (int)s.size(); ++right) {
        if (last.count(s[right]))
            left = std::max(left, last[s[right]] + 1);   // jump past the duplicate
        last[s[right]] = right;
        best = std::max(best, right - left + 1);
    }
    return best;
}
```

### Example 3 — Maximum average of a fixed-size subarray

```cpp
double maxAverage(const std::vector<int>& a, int k) {
    int sum = 0;
    for (int i = 0; i < k; ++i) sum += a[i];
    int best = sum;
    for (int i = k; i < (int)a.size(); ++i) {
        sum += a[i] - a[i - k];
        best = std::max(best, sum);
    }
    return static_cast<double>(best) / k;
}
```

## Common Mistakes

1. **Two pointers on an unsorted array** — sort first, or use a hash-map approach.
2. **Forgetting to shrink the window** — the `while (invalid)` step is what keeps it a window.
3. **Off-by-one in fixed windows** — the window is `[i-k+1, i]` of length k; verify the first window.
4. **Shrinking by one when many are needed** — use `while`, not `if`, when multiple removals are required.
5. **Not updating the map when removing** — decrement and erase keys at zero, or the "distinct count" is wrong.
6. **Returning the window size when a sum/other metric is asked** — know what the problem wants.

## Best Practices

- Decide the variant first: opposite, same-direction, tandem, or window.
- Keep the invariant explicit: the window is the longest valid ending at `right`.
- Use a hash map/set for "distinct/unique" constraints inside the window.
- Prefer the fixed-window formula for constant-k problems (it's O(1) space for the window).

## Practice Questions

1. Find the maximum sum of any subarray of length exactly k.
2. Find the longest subarray with sum ≤ S.
3. Find the longest substring with at most k distinct characters.
4. Solve "container with most water" with opposite pointers.
5. Find the longest substring without repeating characters.

## Multiple Choice Questions (MCQs)

### Q1. The opposite-ends two-pointer pattern typically requires a:
- a) Sorted array
- b) Hash map
- c) Linked list
- d) Heap

**Answer:** a

### Q2. A sliding window is useful for:
- a) Sorted pair sums
- b) Contiguous subarray/substring constraints
- c) Tree traversal
- d) Hashing passwords

**Answer:** b

### Q3. The shrink step in a variable window should be:
- a) `if` (shrink once)
- b) `while` (shrink until valid)
- c) Never
- d) `for` over all elements

**Answer:** b

### Q4. The overall complexity of a well-implemented sliding window is:
- a) O(n²)
- b) O(n)
- c) O(n log n)
- d) O(log n)

**Answer:** b

### Q5. For "at most k distinct characters," you also need:
- a) A hash map tracking counts inside the window
- b) A stack
- c) A priority queue
- d) Sorting

**Answer:** a

## Key Takeaways

- Two pointers: opposite (sorted), same-direction (dedup), tandem (merge).
- Sliding window: expand right, shrink left while invalid; O(n) total.
- Fixed windows use the add-right/drop-left formula.
- Pair a hash map with the window for distinct/unique constraints.

## Next Topic

[15.5 Bit Manipulation](lesson-15.5-bit-manipulation.md)
