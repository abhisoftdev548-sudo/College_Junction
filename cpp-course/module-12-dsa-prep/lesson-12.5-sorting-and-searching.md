---
module: 12
topic: "12.5"
title: "Sorting and Searching"
slug: "sorting-and-searching"
difficulty: "Advanced"
prerequisites:
  - STL Algorithms
  - Complexity Analysis
  - Recursion
estimated_minutes: 30
tags:
  - dsa
  - sorting
  - searching
  - binary-search
---

# 12.5 Sorting and Searching

## Overview

**Sorting** reorders data to enable efficient processing; **searching** finds elements quickly. In practice you'll use `std::sort` and `std::binary_search`, but understanding *how* they work — merge sort's divide-and-conquer, quicksort's partitioning, binary search's halving — is core DSA knowledge and a favourite interview topic.

## Learning Objectives

After this lesson you will be able to:

- Explain merge sort and quicksort and their complexities
- Implement binary search correctly (including off-by-one pitfalls)
- Use `std::sort`, `lower_bound`, and `upper_bound` idiomatically
- Apply binary search to non-array "search on answer" problems
- Compare sorting algorithms and choose appropriately

## Core Concepts

### Merge sort (O(n log n), stable, divide-and-conquer)

```cpp
void mergeSort(std::vector<int>& a, int lo, int hi) {
    if (hi - lo <= 1) return;                 // base: 0 or 1 element
    int mid = lo + (hi - lo) / 2;
    mergeSort(a, lo, mid);                    // sort left
    mergeSort(a, mid, hi);                    // sort right
    merge(a, lo, mid, hi);                    // combine (O(n))
}
```

Split into halves, sort each, merge the two sorted halves. Guaranteed O(n log n), stable, but uses O(n) extra space.

### Quicksort (O(n log n) average, in-place)

```cpp
// Partition: elements < pivot go left, > pivot go right; returns pivot index
int partition(std::vector<int>& a, int lo, int hi) {
    int pivot = a[hi];
    int i = lo;
    for (int j = lo; j < hi; ++j)
        if (a[j] < pivot) std::swap(a[i++], a[j]);
    std::swap(a[i], a[hi]);
    return i;
}

void quickSort(std::vector<int>& a, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
}
```

In-place, average O(n log n), but **worst case O(n²)** on already-sorted input (mitigated by randomized pivots).

### Binary search (O(log n))

```cpp
int binarySearch(const std::vector<int>& a, int target) {
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;     // avoids overflow
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

Each step halves the range → O(log n). Requires a **sorted** array.

### lower_bound / upper_bound

```cpp
auto lb = std::lower_bound(v.begin(), v.end(), x);   // first element >= x
auto ub = std::upper_bound(v.begin(), v.end(), x);   // first element > x
int count = ub - lb;                                  // number of x's
```

These return iterators, not bool — perfect for counting and range queries.

### Binary search on the answer

```cpp
int lo = 0, hi = maxPossible;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (feasible(mid)) hi = mid;     // can we do it with "mid"?
    else lo = mid + 1;
}
return lo;   // smallest feasible value
```

When the answer is a number and `feasible(x)` is monotonic, binary-search the answer instead of the array.

## Visual — Merge Sort Tree

```
                 [3, 1, 4, 2]
                /            \
           [3, 1]            [4, 2]
          /      \          /      \
        [3]      [1]      [4]      [2]     ← split to singletons
          \      /          \      /
           [1, 3]            [2, 4]        ← merge sorted halves
                \            /
                 [1, 2, 3, 4]              ← final merge
```

Divide (log n levels) × merge (O(n) per level) = O(n log n).

## Code Examples

### Example 1 — Count occurrences with bounds

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 2, 2, 3, 4};
    auto lb = std::lower_bound(v.begin(), v.end(), 2);
    auto ub = std::upper_bound(v.begin(), v.end(), 2);
    std::cout << (ub - lb);   // 3 — three 2s
}
```

### Example 2 — Find first index where a[i] >= x (search on answer style)

```cpp
int firstAtLeast(const std::vector<int>& a, int x) {
    int lo = 0, hi = (int)a.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= x) hi = mid;
        else lo = mid + 1;
    }
    return lo;   // first index with a[i] >= x (or a.size() if none)
}
```

### Example 3 — Merge sort in C++

```cpp
#include <vector>

void merge(std::vector<int>& a, int lo, int mid, int hi) {
    std::vector<int> left(a.begin() + lo, a.begin() + mid);
    std::vector<int> right(a.begin() + mid, a.begin() + hi);
    int i = 0, j = 0, k = lo;
    while (i < (int)left.size() && j < (int)right.size())
        a[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < (int)left.size()) a[k++] = left[i++];
    while (j < (int)right.size()) a[k++] = right[j++];
}
```

## Common Mistakes

1. **Binary search off-by-one** — `lo <= hi` vs `lo < hi`, and the `mid ± 1` updates.
2. **`(lo + hi) / 2` overflow** — use `lo + (hi - lo) / 2`.
3. **Binary searching an unsorted array** — sort first or the result is garbage.
4. **Quicksort worst case** — always-pivot-last on sorted data is O(n²); randomize the pivot.
5. **Confusing `lower_bound` and `upper_bound`** — `>=` vs `>`.
6. **O(n²) sorts for large n** — bubble/insertion/selection are only fine for tiny inputs or teaching.

## Best Practices

- In real code, use `std::sort` (introsort, O(n log n)) and `std::stable_sort` when stability matters.
- Use `lower_bound`/`upper_bound` for sorted-range queries.
- Know merge sort (stable, divide-and-conquer) and quicksort (in-place) for interviews.
- For "minimum/maximum that satisfies a condition," consider binary search on the answer.

## Practice Questions

1. Implement merge sort and verify it on a random vector.
2. Implement iterative binary search and test the edge cases (empty, single, not found).
3. Count how many times a value appears in a sorted vector using `lower_bound`/`upper_bound`.
4. Implement quicksort and explain its worst case.
5. Solve "minimum pages to allocate" (a binary-search-on-answer problem) in pseudocode or code.

## Multiple Choice Questions (MCQs)

### Q1. Merge sort's time complexity is:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** b

### Q2. Binary search requires the array to be:
- a) Empty
- b) Sorted
- c) Random
- d) A linked list

**Answer:** b

### Q3. `std::lower_bound(v, x)` returns an iterator to:
- a) The last element < x
- b) The first element >= x
- c) The first element > x
- d) The element == x only

**Answer:** b

### Q4. Quicksort's worst case is:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(2ⁿ)

**Answer:** c

### Q5. Why use `lo + (hi - lo) / 2` instead of `(lo + hi) / 2`?
- a) It's faster
- b) It avoids integer overflow
- c) It's required syntax
- d) It sorts the array

**Answer:** b

## Key Takeaways

- Merge sort: O(n log n), stable, divide-and-conquer; quicksort: in-place, O(n²) worst.
- Binary search halves the range: O(log n); mind the off-by-one and overflow.
- Use `std::sort`, `lower_bound`, `upper_bound` in practice.
- Binary search on the answer solves a whole family of optimization problems.

## Module 12 Complete 🎉

You've finished **Module 12 — DSA Preparation**. This completes the core DSA foundations: arrays/strings, linked lists, stacks/queues, recursion/backtracking, and sorting/searching.

## Next Topic

[13.1 Trees](lesson-13.1-trees.md)
