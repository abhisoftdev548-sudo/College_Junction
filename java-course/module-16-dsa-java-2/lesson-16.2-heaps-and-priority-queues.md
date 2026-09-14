---
module: 16
topic: "16.2"
title: "Heaps and Priority Queues"
slug: "heaps-and-priority-queues"
difficulty: "Advanced"
prerequisites:
  - Trees and Binary Search Trees
estimated_minutes: 35
tags:
  - java
  - dsa
  - heap
  - priority-queue
---

# 16.2 Heaps and Priority Queues

## Overview

A **heap** is a complete binary tree satisfying the **heap property** (min-heap: parent ≤ children; max-heap: parent ≥ children). Java's `PriorityQueue` is a min-heap that always returns the smallest element in O(log n). Heaps power priority scheduling, top-k problems, and heap sort.

## Learning Objectives

After this lesson you will be able to:

- Explain the heap property and complete-binary-tree layout
- Use `PriorityQueue` for min and max heaps
- Solve top-k and kth-largest problems
- Implement heap sort
- Build a heap from an array

## Core Concepts

### The heap property

```
 min-heap:                     array representation:
        1                     index:  0  1  2  3  4  5
      /   \                   value: [1, 3, 2, 7, 5, 9]
     3     2
    / \   /                   left(i)  = 2*i + 1
   7   5 9                    right(i) = 2*i + 2
                              parent(i)= (i-1)/2
```

A heap is stored in a flat array; parent/child positions are computed, not pointers.

### PriorityQueue (min-heap by default)

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(1);
minHeap.offer(3);
minHeap.poll();   // 1 (smallest)
minHeap.poll();   // 3
```

### Max-heap

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
maxHeap.offer(5);
maxHeap.offer(1);
maxHeap.poll();   // 5 (largest)
```

### Top-k problem (k largest)

```java
public static List<Integer> topK(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();   // keep k largest
    for (int n : nums) {
        minHeap.offer(n);
        if (minHeap.size() > k) minHeap.poll();   // drop the smallest of k+1
    }
    return new ArrayList<>(minHeap);
}
```

A min-heap of size k keeps the k **largest** elements (polling out the smallest whenever it exceeds k).

### Kth largest

```java
// min-heap of size k → its peek is the kth largest
PriorityQueue<Integer> heap = new PriorityQueue<>();
for (int n : nums) {
    heap.offer(n);
    if (heap.size() > k) heap.poll();
}
int kthLargest = heap.peek();
```

### Custom priority (objects)

```java
record Task(String name, int priority) { }

PriorityQueue<Task> pq = new PriorityQueue<>(
    Comparator.comparingInt(Task::priority).reversed()   // highest priority first
);
pq.offer(new Task("email", 1));
pq.offer(new Task("alert", 10));
pq.poll();   // Task[alert, 10]
```

### Heap sort — O(n log n)

```java
public static void heapSort(int[] arr) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int n : arr) heap.offer(n);       // O(n log n)
    for (int i = 0; i < arr.length; i++) arr[i] = heap.poll();   // sorted
}
```

Using a `PriorityQueue` gives a clean heap sort — build the heap, then poll in order.

## Visual — Heap as Array

```
 min-heap tree:               array:
        1                     [1, 3, 2, 7, 5, 9]
      /   \                   parent(i) = (i-1)/2
     3     2                  left(i)  = 2i+1
    / \   /                   right(i) = 2i+2
   7   5 9

 poll() → remove root(1), move last(9) to root, "sift down" → 2 becomes root
```

`offer` = add at end + sift up; `poll` = remove root + sift down. Both O(log n).

## Code Examples

### Example 1 — Min and max heaps

```java
import java.util.*;

public class Heaps {
    public static void main(String[] args) {
        PriorityQueue<Integer> min = new PriorityQueue<>();
        min.addAll(List.of(5, 1, 3, 9));
        System.out.println(min.poll());   // 1 (smallest)

        PriorityQueue<Integer> max = new PriorityQueue<>(Comparator.reverseOrder());
        max.addAll(List.of(5, 1, 3, 9));
        System.out.println(max.poll());   // 9 (largest)
    }
}
```

### Example 2 — Top 3

```java
import java.util.*;

public class TopK {
    public static List<Integer> topK(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int n : nums) {
            minHeap.offer(n);
            if (minHeap.size() > k) minHeap.poll();
        }
        return new ArrayList<>(minHeap);
    }

    public static void main(String[] args) {
        System.out.println(topK(new int[]{3, 1, 5, 12, 2, 11}, 3));   // [5, 11, 12]
    }
}
```

### Example 3 — Kth largest

```java
import java.util.*;

public class KthLargest {
    public static int kthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int n : nums) {
            heap.offer(n);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }

    public static void main(String[] args) {
        System.out.println(kthLargest(new int[]{3, 2, 1, 5, 6, 4}, 2));   // 5
    }
}
```

## Common Mistakes

1. **Assuming `PriorityQueue` iterates sorted** — iteration is heap order; only `poll` is sorted.
2. **Forgetting `Comparator.reverseOrder()` for a max-heap** — default is min-heap.
3. **Top-k with a max-heap** — that keeps k smallest; use a min-heap for k largest.
4. **Using `remove`/`element` instead of `poll`/`peek`** — prefer the non-throwing forms.
5. **Modifying objects' priority after insertion** — corrupts the heap order.
6. **Confusing heap with sorted list** — a heap is partially ordered, not fully sorted.

## Best Practices

- Use `PriorityQueue` for min-heap; `Comparator.reverseOrder()` for max-heap.
- Solve top-k / kth-largest with a bounded min-heap (O(n log k)).
- Use custom comparators for object priorities.
- Never mutate priority keys after insertion.
- Remember `poll`/`peek` return the smallest (min-heap) or largest (max-heap).

## Practice Questions

1. Create a min-heap and a max-heap and poll from each.
2. Find the 3 largest numbers in an array with a bounded heap.
3. Find the kth largest element.
4. Implement heap sort with a `PriorityQueue`.
5. Write a custom comparator to order `Task` objects by priority (descending).

## Multiple Choice Questions (MCQs)

### Q1. A min-heap's root is:
- a) The largest element
- b) The smallest element
- c) The middle element
- d) Null

**Answer:** b

### Q2. `PriorityQueue` operations `offer`/`poll` are:
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** b

### Q3. A max-heap uses:
- a) `new PriorityQueue<>()`
- b) `new PriorityQueue<>(Comparator.reverseOrder())`
- c) `new ArrayDeque<>()`
- d) `new TreeSet<>()`

**Answer:** b

### Q4. To keep the k largest elements, use:
- a) A max-heap of size k
- b) A min-heap of size k
- c) A stack
- d) A queue

**Answer:** b

### Q5. The kth largest element (with a bounded min-heap of size k) is:
- a) The heap's root (`peek`)
- b) The heap's last element
- c) The sum
- d) The max of the array

**Answer:** a

## Key Takeaways

- Heap = complete binary tree with the heap property, stored in an array.
- `PriorityQueue` = min-heap; max via `Comparator.reverseOrder()`.
- Top-k / kth-largest via bounded min-heap (O(n log k)).
- `offer`/`poll` are O(log n); heap sort is O(n log n).

## Next Topic

[16.3 Hashing and HashMap Internals](lesson-16.3-hashing-and-hashmap-internals.md)
