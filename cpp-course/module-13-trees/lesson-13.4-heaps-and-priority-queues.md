---
module: 13
topic: "13.4"
title: "Heaps and Priority Queues"
slug: "heaps-and-priority-queues"
difficulty: "Advanced"
prerequisites:
  - Binary Trees
  - Vectors and Sequence Containers
  - Complexity Analysis
estimated_minutes: 30
tags:
  - dsa
  - heap
  - priority-queue
---

# 13.4 Heaps and Priority Queues

## Overview

A **heap** is a complete binary tree that maintains the **heap property**: every parent is ≤ (min-heap) or ≥ (max-heap) its children. A **priority queue** is the abstract "always pop the most important element" interface, and `std::priority_queue` is its heap-based implementation. Heaps power scheduling, top-K queries, Dijkstra's algorithm, and heap sort.

## Learning Objectives

After this lesson you will be able to:

- Explain the heap property and complete-tree layout
- Use `std::priority_queue` for min/max behaviour
- Solve top-K and k-th largest problems with heaps
- Understand `push`/`pop` as O(log n) bubble operations
- Recognize when a heap is the right tool

## Core Concepts

### The heap property and array layout

A heap is stored in an **array** (no pointers): for a node at index `i`:

```
parent     = (i - 1) / 2
left child  = 2*i + 1
right child = 2*i + 2
```

The tree is **complete** (filled level by level, left to right), which is what makes the array representation work.

### std::priority_queue (max-heap by default)

```cpp
#include <queue>

std::priority_queue<int> maxHeap;
maxHeap.push(3);
maxHeap.push(1);
maxHeap.push(5);
maxHeap.top();     // 5 — largest
maxHeap.pop();     // removes 5
```

### Min-heap

```cpp
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(3);
minHeap.push(1);
minHeap.top();     // 1 — smallest
```

### Custom comparator

```cpp
auto cmp = [](const auto& a, const auto& b) { return a.second > b.second; };
std::priority_queue<std::pair<int,int>,
                    std::vector<std::pair<int,int>>,
                    decltype(cmp)> pq(cmp);
```

### Complexity

| Operation | Complexity |
|---|---|
| `push` | O(log n) |
| `pop` | O(log n) |
| `top` | O(1) |
| build heap | O(n) |

`push`/`pop` do a **bubble-up / bubble-down** along one root-to-leaf path — hence O(log n).

### Top-K pattern

```cpp
// k largest of n elements using a MIN-heap of size k
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
for (int x : data) {
    minHeap.push(x);
    if ((int)minHeap.size() > k) minHeap.pop();   // evict smallest
}
// minHeap now holds the k largest
```

Keeping only k elements makes the work O(n log k) instead of O(n log n).

## Visual — A Min-Heap

```
 array: [1, 3, 2, 7, 6, 5]

         1          ← smallest (top)
       /   \
      3     2
     / \   /
    7   6 5

 parent ≤ children at every node (min-heap)
 push(0): place at end, bubble up → 0 becomes root
 pop():  remove root, move last to root, bubble down
```

The array order *is* the tree order — no pointers needed.

## Code Examples

### Example 1 — k-th largest element

```cpp
#include <functional>
#include <queue>
#include <vector>

int kthLargest(const std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int x : nums) {
        minHeap.push(x);
        if ((int)minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();   // the smallest among the k largest
}
```

### Example 2 — Top-K frequent elements

```cpp
#include <queue>
#include <unordered_map>
#include <vector>

std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> freq;
    for (int x : nums) ++freq[x];

    using P = std::pair<int, int>;
    auto cmp = [](const P& a, const P& b) { return a.second > b.second; };
    std::priority_queue<P, std::vector<P>, decltype(cmp)> minHeap(cmp);

    for (auto& [num, count] : freq) {
        minHeap.push({num, count});
        if ((int)minHeap.size() > k) minHeap.pop();
    }

    std::vector<int> out;
    while (!minHeap.empty()) { out.push_back(minHeap.top().first); minHeap.pop(); }
    return out;
}
```

### Example 3 — Merge k sorted lists (heap)

```cpp
// push each list's head (value, listIndex) into a min-heap;
// repeatedly pop the smallest and push that list's next element.
// This merges in O(n log k) instead of O(n k).
```

## Common Mistakes

1. **Forgetting the comparator** — `priority_queue` is a **max**-heap by default; use `std::greater<>` for a min-heap.
2. **Confusing `top()` and `pop()` order** — read `top()` first, then `pop()`.
3. **Using a max-heap for top-K smallest** (or vice versa) — the *opposite* heap of size k does the job.
4. **O(n log n) when O(n log k) suffices** — cap the heap at k.
5. **Wrong child/parent index math** — `2*i+1`, `2*i+2`, `(i-1)/2`.
6. **Assuming iteration order is sorted** — a heap only guarantees the top, not a fully sorted sequence.

## Best Practices

- Use `std::priority_queue` rather than hand-rolling heap operations.
- For top-K: keep a heap of size **k**, evicting when it overflows.
- Store pairs/tuples with a custom comparator for "priority by some score."
- Remember: min-heap = `std::greater<>`; max-heap = default.

## Practice Questions

1. Use a min-heap to find the k-th smallest element in a vector.
2. Use a max-heap (default) to find the k-th largest element.
3. Find the top-3 most frequent words using a size-3 min-heap.
4. Merge two sorted vectors using a priority queue.
5. Explain, with index math, where the parent of index `i` lives in the array layout.

## Multiple Choice Questions (MCQs)

### Q1. `std::priority_queue` is by default a:
- a) Min-heap
- b) Max-heap
- c) FIFO queue
- d) Stack

**Answer:** b

### Q2. `push` and `pop` on a heap are:
- a) O(1)
- b) O(log n)
- c) O(n)
- d) O(n log n)

**Answer:** b

### Q3. In the array layout, the left child of index `i` is:
- a) `i + 1`
- b) `2*i + 1`
- c) `2*i + 2`
- d) `i / 2`

**Answer:** b

### Q4. To find the k LARGEST elements efficiently, use a:
- a) Max-heap of size n
- b) Min-heap of size k
- c) Stack
- d) Queue

**Answer:** b

### Q5. Which is guaranteed by a heap?
- a) The whole array is sorted
- b) The top element is the extreme (min or max)
- c) Every node has two children
- d) O(1) search by value

**Answer:** b

## Key Takeaways

- Heap = complete binary tree in an array with the parent/child ordering invariant.
- `priority_queue` gives O(1) top, O(log n) push/pop; max-heap by default.
- Top-K problems use an **opposite** heap capped at size k.
- Children of i: `2i+1`, `2i+2`; parent: `(i-1)/2`.

## Next Topic

[13.5 Tries](lesson-13.5-tries.md)
