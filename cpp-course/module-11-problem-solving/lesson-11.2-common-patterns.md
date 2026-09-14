---
module: 11
topic: "11.2"
title: "Common Patterns"
slug: "common-patterns"
difficulty: "Advanced"
prerequisites:
  - Problem-Solving Approaches
  - STL in Practice
  - Arrays and Strings
estimated_minutes: 30
tags:
  - problem-solving
  - patterns
  - two-pointers
  - sliding-window
---

# 11.2 Common Patterns

## Overview

Many problems, no matter how they're dressed up, reduce to a small set of **recurring patterns**: frequency counting, two pointers, sliding window, prefix sums, and more. Recognizing the pattern behind a problem turns a scary puzzle into a known recipe. This lesson catalogs the most valuable patterns with code.

## Learning Objectives

After this lesson you will be able to:

- Recognize when to apply frequency counting, two pointers, sliding window, and prefix sums
- Implement each pattern in clean C++
- Match a problem to its pattern quickly
- Combine patterns to solve compound problems

## Core Concepts

### Pattern 1 — Frequency counting (hash map)

Use when you must count occurrences, check membership, or find duplicates.

```cpp
std::unordered_map<char, int> freq;
for (char c : s) ++freq[c];

bool hasDuplicate = freq.size() != s.size();
```

### Pattern 2 — Two pointers

Use on **sorted** arrays to find pairs, compare ends, or merge. Linear time instead of O(n²).

```cpp
int i = 0, j = n - 1;
while (i < j) {
    int sum = a[i] + a[j];
    if (sum == target) return true;
    sum < target ? ++i : --j;
}
```

### Pattern 3 — Sliding window

Use for contiguous subarrays/substrings with a constraint (max sum, longest substring, etc.).

```cpp
int left = 0, sum = 0, best = 0;
for (int right = 0; right < n; ++right) {
    sum += a[right];
    while (sum > limit) sum -= a[left++];   // shrink from the left
    best = std::max(best, right - left + 1);
}
```

### Pattern 4 — Prefix sums

Use for range-sum queries. Build an array where `prefix[i] = sum of a[0..i-1]`; then any range sum is `prefix[r+1] - prefix[l]` in O(1).

```cpp
std::vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + a[i];
int rangeSum = prefix[r + 1] - prefix[l];
```

### Pattern 5 — Monotonic stack

Use to find the "next greater/smaller element" for each position.

```cpp
std::vector<int> nextGreater(const std::vector<int>& a) {
    std::vector<int> res(a.size(), -1);
    std::stack<int> st;
    for (int i = 0; i < (int)a.size(); ++i) {
        while (!st.empty() && a[st.top()] < a[i]) {
            res[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}
```

### Pattern 6 — Binary search on the answer

Use when the answer is a number in a range and a check function is monotonic (e.g. "minimum time such that…").

```cpp
int lo = 0, hi = maxValue;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (possible(mid)) hi = mid;   // try smaller
    else lo = mid + 1;
}
```

## Visual — Two Pointers vs Sliding Window

```
 Two pointers (sorted array):   Sliding window (subarray):
  [1, 2, 3, 4, 5]  target 6     [2, 1, 5, 2, 3, 2]  limit 7
   ↑           ↑                 ┌─────────┐
   i           j   1+5=6 ✓        left→right: expand, then shrink
   i and j move inward           window = contiguous block that satisfies
                                 the constraint
```

Two pointers converge on a sorted array; the sliding window expands/shrinks a contiguous range.

## Code Examples

### Example 1 — Two sum (two pointers)

```cpp
#include <algorithm>
#include <vector>

bool hasPairSum(std::vector<int> a, int target) {
    std::sort(a.begin(), a.end());
    int i = 0, j = (int)a.size() - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s == target) return true;
        if (s < target) ++i; else --j;
    }
    return false;
}
```

### Example 2 — Longest subarray with sum ≤ k (sliding window)

```cpp
#include <algorithm>
#include <vector>

int longestSubarraySumLE(const std::vector<int>& a, int k) {
    int left = 0, sum = 0, best = 0;
    for (int right = 0; right < (int)a.size(); ++right) {
        sum += a[right];
        while (sum > k && left <= right) sum -= a[left++];
        best = std::max(best, right - left + 1);
    }
    return best;
}
```

### Example 3 — Range sum queries (prefix sums)

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a = {1, 2, 3, 4, 5};
    std::vector<int> p(a.size() + 1, 0);
    for (int i = 0; i < (int)a.size(); ++i) p[i + 1] = p[i] + a[i];

    std::cout << p[4] - p[1];   // sum of a[1..3] = 2+3+4 = 9
}
```

## Common Mistakes

1. **Two pointers on an unsorted array** — sort first (or use a hash map instead).
2. **Off-by-one in prefix sums** — `range(l, r) = p[r+1] - p[l]`, not `p[r] - p[l]`.
3. **Sliding window forgetting to shrink** — the `while` that moves `left` is essential.
4. **Monotonic stack using values instead of indices** — store indices to compute distances.
5. **Binary search mid overflow** — use `lo + (hi - lo) / 2`, not `(lo + hi) / 2`.
6. **Applying a pattern without checking its preconditions** — e.g. greedy where it isn't valid.

## Best Practices

- Name the pattern when you spot it; the name is a retrieval cue.
- Verify the pattern's preconditions (sorted? contiguous? monotonic?) before coding.
- Solve first with the simplest pattern that meets constraints; optimize after.
- Practice each pattern on 3–5 problems until recognition is automatic.

## Practice Questions

1. Count distinct characters in a string using a frequency map.
2. Check if a sorted array has two elements summing to a target using two pointers.
3. Find the maximum sum of any subarray of length exactly `k` (fixed window).
4. Answer 5 range-sum queries on an array using prefix sums.
5. For each element of `{4, 5, 2, 25}`, find the next greater element.

## Multiple Choice Questions (MCQs)

### Q1. The two-pointer pattern typically requires the array to be:
- a) Sorted
- b) Empty
- c) A linked list
- d) Random

**Answer:** a

### Q2. A prefix sum array allows range-sum queries in:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q3. The sliding window pattern is used for:
- a) Sorted pairs
- b) Contiguous subarray/substring problems
- c) Graph traversal
- d) Hashing passwords

**Answer:** b

### Q4. A monotonic stack helps find:
- a) The sum of an array
- b) The next greater/smaller element
- c) The median
- d) Unique values

**Answer:** b

### Q5. Binary search on the answer works when:
- a) The array is random
- b) A `possible(mid)` check is monotonic
- c) The answer is a string
- d) Recursion is forbidden

**Answer:** b

## Key Takeaways

- Most problems reduce to a known pattern: frequency, two pointers, sliding window, prefix sums, monotonic stack, binary search on the answer.
- Each pattern has preconditions — check them before applying.
- Recognizing the pattern is the biggest speed-up in problem solving.

## Next Topic

[11.3 Complexity Analysis](lesson-11.3-complexity-analysis.md)
