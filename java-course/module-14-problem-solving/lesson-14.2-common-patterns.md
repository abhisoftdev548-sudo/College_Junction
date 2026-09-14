---
module: 14
topic: "14.2"
title: "Common Patterns"
slug: "common-patterns"
difficulty: "Advanced"
prerequisites:
  - Problem-Solving Approaches
estimated_minutes: 35
tags:
  - java
  - patterns
  - algorithms
---

# 14.2 Common Patterns

## Overview

Most interview and contest problems reduce to a small set of **recurring patterns**. Recognizing them turns "I've never seen this" into "this is two pointers / sliding window / frequency map / prefix sum." This lesson covers the patterns you'll reach for constantly, with Java implementations.

## Learning Objectives

After this lesson you will be able to:

- Recognize and apply two-pointers and sliding-window
- Use frequency maps and sets for lookups
- Apply prefix sums for range queries
- Detect cycles with slow/fast pointers
- Match problems to the right pattern

## Core Concepts

### 1. Two pointers

```java
// sorted pair sum
int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) { /* found */ break; }
    else if (sum < target) left++;
    else right--;
}
```

Two indices move toward each other (or in the same direction) — used for pair sums, palindromes, merging.

### 2. Sliding window

```java
// max sum of k consecutive elements
int window = 0;
for (int i = 0; i < k; i++) window += arr[i];   // first window
int max = window;
for (int i = k; i < arr.length; i++) {          // slide
    window += arr[i] - arr[i - k];
    max = Math.max(max, window);
}
```

A fixed or variable-size window slides over the array — for subarray sums, longest substrings, etc.

### 3. Frequency map / set

```java
Map<Integer, Integer> freq = new HashMap<>();
for (int n : arr) freq.merge(n, 1, Integer::sum);

Set<Integer> seen = new HashSet<>();
for (int n : arr) {
    if (seen.contains(target - n)) { /* pair exists */ }
    seen.add(n);
}
```

Maps/sets give O(1) lookup — the backbone of deduplication, pair-sum, anagram, and first-non-repeating problems.

### 4. Prefix sum

```java
int[] prefix = new int[arr.length + 1];
for (int i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];     // prefix[i] = sum of arr[0..i-1]
}
int rangeSum = prefix[j + 1] - prefix[i];  // sum of arr[i..j]
```

Precompute cumulative sums so any range sum is O(1) — for subarray-sum queries.

### 5. Slow/fast pointers (cycle detection)

```java
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;         // 1 step
    fast = fast.next.next;    // 2 steps
    if (slow == fast) { /* cycle detected */ }
}
```

Two pointers moving at different speeds detect cycles in linked lists (Floyd's algorithm).

### 6. Binary search on the answer

```java
// find the smallest x satisfying a predicate over a sorted range
int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (predicate(mid)) hi = mid;   // feasible → try smaller
    else lo = mid + 1;
}
```

When "can we do it with value x?" is monotonic, binary-search the answer instead of the array.

## Visual — Pattern → Problem Map

```
 two pointers      ──▶ sorted pair sum, palindrome, merge
 sliding window    ──▶ max subarray sum, longest substring
 frequency map     ──▶ anagrams, first non-repeat, pair sum
 prefix sum        ──▶ range sum queries, subarray with sum k
 slow/fast         ──▶ linked-list cycle, middle element
 binary search     ──▶ search, "minimum x such that..."
```

Spot the pattern → reuse its template → solve quickly.

## Code Examples

### Example 1 — Sliding window (max sum of size k)

```java
public class SlidingWindow {
    public static int maxSum(int[] arr, int k) {
        int window = 0;
        for (int i = 0; i < k; i++) window += arr[i];
        int max = window;
        for (int i = k; i < arr.length; i++) {
            window += arr[i] - arr[i - k];
            max = Math.max(max, window);
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println(maxSum(new int[]{2, 1, 5, 1, 3, 2}, 3));   // 9
    }
}
```

### Example 2 — Frequency map (first non-repeating)

```java
import java.util.*;

public class FirstUnique {
    public static char firstUnique(String s) {
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        for (var e : freq.entrySet()) if (e.getValue() == 1) return e.getKey();
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(firstUnique("swiss"));   // w
    }
}
```

### Example 3 — Prefix sum

```java
public class PrefixSum {
    public static int rangeSum(int[] prefix, int i, int j) {
        return prefix[j + 1] - prefix[i];
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] prefix = new int[arr.length + 1];
        for (int i = 0; i < arr.length; i++) prefix[i + 1] = prefix[i] + arr[i];
        System.out.println(rangeSum(prefix, 1, 3));   // 2+3+4 = 9
    }
}
```

## Common Mistakes

1. **Off-by-one in windows and prefix sums** — trace small cases carefully.
2. **Using a `HashSet` when order matters** — use `LinkedHashSet`/`TreeSet`.
3. **O(n²) when a map gives O(n)** — recognize the lookup pattern.
4. **Wrong pointer movement** — re-check the condition logic in two pointers.
5. **Not handling empty/single-element inputs** — edge cases break pointer code.
6. **Forcing a pattern that doesn't fit** — understand why a pattern applies before using it.

## Best Practices

- Learn the templates by heart; adapt them per problem.
- Draw the pointers/window on paper for tricky cases.
- Use `HashMap`/`HashSet` for O(1) lookups; prefix arrays for range queries.
- Verify edge cases (empty, single, all-equal) for every pattern.
- Name the pattern in a comment to communicate intent.

## Practice Questions

1. Solve "sorted pair sum to target" with two pointers.
2. Find the max sum of k consecutive elements using a sliding window.
3. Count the frequency of characters and find the first non-repeating one.
4. Answer range-sum queries with a prefix sum array.
5. Detect a cycle in a linked list with slow/fast pointers.

## Multiple Choice Questions (MCQs)

### Q1. Two pointers is ideal for:
- a) Sorted pair sum
- b) Graph traversal
- c) Hash collisions
- d) Sorting

**Answer:** a

### Q2. A sliding window maintains:
- a) A sorted list
- b) A contiguous subarray (moving window)
- c) A hash map
- d) A tree

**Answer:** b

### Q3. Prefix sums make range-sum queries:
- a) O(n)
- b) O(1)
- c) O(n²)
- d) O(log n)

**Answer:** b

### Q4. Slow/fast pointers detect:
- a) Duplicates in arrays
- b) Cycles in linked lists
- c) Anagrams
- d) Missing numbers

**Answer:** b

### Q5. A frequency map gives:
- a) O(1) element counting/lookup
- b) O(n²) counting
- c) Sorted iteration always
- d) Prefix sums

**Answer:** a

## Key Takeaways

- Patterns: two pointers, sliding window, frequency map/set, prefix sum, slow/fast, binary search.
- Maps/sets = O(1) lookup; prefix sums = O(1) range queries.
- Learn templates, trace edge cases, match problem → pattern.

## Next Topic

[14.3 Complexity Analysis (Big-O)](lesson-14.3-complexity-analysis-big-o.md)
