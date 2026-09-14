---
module: 9
topic: "9.4"
title: "Queue, Deque, and PriorityQueue"
slug: "queue-deque-priorityqueue"
difficulty: "Intermediate"
prerequisites:
  - Map — HashMap, TreeMap, LinkedHashMap
estimated_minutes: 30
tags:
  - java
  - collections
  - queue
  - deque
  - priorityqueue
---

# 9.4 Queue, Deque, and PriorityQueue

## Overview

A **Queue** models FIFO (first-in-first-out) behaviour — like a line of people. A **Deque** (double-ended queue) supports adding/removing at both ends, and is the recommended replacement for `Stack`. A **PriorityQueue** orders elements by priority (a heap), popping the smallest (or highest-priority) element first. These are essential for task scheduling, BFS, and buffering.

## Learning Objectives

After this lesson you will be able to:

- Use `offer`/`poll`/`peek` on a Queue
- Use `ArrayDeque` as a queue and as a stack
- Order elements with a `PriorityQueue` and custom comparator
- Distinguish throwing vs returning-null methods
- Choose the right queue for a problem

## Core Concepts

### Queue basics

```java
import java.util.ArrayDeque;
import java.util.Queue;

Queue<String> queue = new ArrayDeque<>();

queue.offer("A");      // add to the back
queue.offer("B");
queue.offer("C");
queue.peek();          // "A" — look at front (without removing)
queue.poll();          // "A" — remove and return front
queue.size();          // 2
```

FIFO: `offer` adds at the back, `poll` removes from the front, `peek` views the front.

### Throwing vs null-returning methods

| Operation | Throws on failure | Returns special value |
|---|---|---|
| add | `add(e)` → exception | `offer(e)` → false |
| remove | `remove()` → exception | `poll()` → null |
| inspect | `element()` → exception | `peek()` → null |

Prefer the `offer`/`poll`/`peek` forms — they fail gracefully instead of throwing.

### ArrayDeque as a stack (modern replacement for Stack)

```java
Deque<String> stack = new ArrayDeque<>();

stack.push("first");     // push onto the "top"
stack.push("second");
stack.peek();            // "second" — top of stack (LIFO)
stack.pop();             // "second" — remove top
```

`ArrayDeque` is faster than the legacy `Stack` class — it's the recommended stack today.

### Double-ended operations (Deque)

```java
Deque<String> dq = new ArrayDeque<>();

dq.addFirst("start");
dq.addLast("end");
dq.removeFirst();        // from the front
dq.removeLast();         // from the back
dq.peekFirst();
dq.peekLast();
```

### PriorityQueue — ordered by priority

```java
import java.util.PriorityQueue;
import java.util.Queue;

Queue<Integer> pq = new PriorityQueue<>();    // min-heap by default
pq.offer(5);
pq.offer(1);
pq.offer(3);

pq.poll();   // 1 — smallest first
pq.poll();   // 3
pq.poll();   // 5
```

A `PriorityQueue` pops the **smallest** element (natural order) first — it's a heap, not a sorted list.

### Custom comparator (max-heap)

```java
Queue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);   // largest first
maxHeap.offer(5);
maxHeap.offer(1);
maxHeap.poll();   // 5

// or with Comparator:
Queue<Integer> max2 = new PriorityQueue<>(Comparator.reverseOrder());
```

## Visual — Queue, Deque, PriorityQueue

```
 Queue (FIFO):        offer → [ A | B | C ] → poll
                      back ──────── front

 Deque (both ends):   addFirst ⇄ [ A | B | C ] ⇄ addLast

 PriorityQueue (heap):   [1, 3, 5]  → poll() always pops smallest (1)
```

FIFO for queues, both-ends for deques, smallest-first for priority queues.

## Code Examples

### Example 1 — Print queue (FIFO)

```java
import java.util.*;

public class PrintQueue {
    public static void main(String[] args) {
        Queue<String> jobs = new ArrayDeque<>();
        jobs.offer("job1");
        jobs.offer("job2");
        jobs.offer("job3");

        while (!jobs.isEmpty()) {
            System.out.println("Processing " + jobs.poll());   // job1, job2, job3
        }
    }
}
```

### Example 2 — Stack via ArrayDeque

```java
import java.util.*;

public class StackDemo {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        while (!stack.isEmpty()) {
            System.out.println(stack.pop());   // 30, 20, 10 (LIFO)
        }
    }
}
```

### Example 3 — Top-K with a max-heap

```java
import java.util.*;

public class TopScores {
    public static void main(String[] args) {
        Queue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.addAll(List.of(42, 88, 75, 91, 60));

        for (int i = 0; i < 3; i++) {
            System.out.println(maxHeap.poll());   // 91, 88, 75 (top 3)
        }
    }
}
```

## Common Mistakes

1. **Using `add`/`remove`/`element` and catching exceptions** — prefer `offer`/`poll`/`peek`.
2. **Assuming `PriorityQueue` iterates sorted** — iteration order is heap order; only `poll` is sorted.
3. **Using the legacy `Stack` class** — prefer `ArrayDeque` (faster, better API).
4. **Modifying the comparator's objects after insertion** — corrupts heap order.
5. **`poll()` on an empty queue** — returns `null`; check `isEmpty()`.
6. **Confusing FIFO and LIFO** — Queue is FIFO; a Deque used as a stack is LIFO.

## Best Practices

- Use `ArrayDeque` for both queues and stacks (not `LinkedList`/`Stack`).
- Use `offer`/`poll`/`peek` for graceful failure.
- Use `PriorityQueue` for "next smallest/largest" problems (top-k, task scheduling).
- Pass an explicit comparator for max-heaps or custom priorities.
- Check `isEmpty()` before `poll` when null is meaningful.

## Practice Questions

1. Simulate a FIFO print queue with `offer`/`poll`.
2. Reverse a list using an `ArrayDeque` as a stack.
3. Find the top 3 elements of a list using a max-heap `PriorityQueue`.
4. Explain the difference between `add`/`remove`/`element` and `offer`/`poll`/`peek`.
5. Write a custom comparator to order a `PriorityQueue` of tasks by priority level.

## Multiple Choice Questions (MCQs)

### Q1. A Queue is:
- a) LIFO
- b) FIFO (first-in-first-out)
- c) Random access
- d) Sorted

**Answer:** b

### Q2. `poll()` on an empty queue returns:
- a) An exception
- b) `null`
- c) `0`
- d) `false`

**Answer:** b

### Q3. The recommended stack implementation is:
- a) `Stack`
- b) `ArrayDeque`
- c) `PriorityQueue`
- d) `LinkedList` (only)

**Answer:** b

### Q4. A default `PriorityQueue<Integer>` pops:
- a) The largest first
- b) The smallest first
- c) The first inserted
- d) The last inserted

**Answer:** b

### Q5. To make a max-heap, use:
- a) `new PriorityQueue<>()`
- b) `new PriorityQueue<>(Comparator.reverseOrder())`
- c) `new ArrayDeque<>()`
- d) `new TreeSet<>()`

**Answer:** b

## Key Takeaways

- Queue = FIFO; `offer`/`poll`/`peek` (graceful) vs `add`/`remove`/`element` (throwing).
- `ArrayDeque` = queue + stack (replaces `Stack`).
- `PriorityQueue` = heap; pops smallest by default, max-heap via reverse comparator.
- Iteration order of a PriorityQueue is not sorted — only `poll` is.

## Next Topic

[9.5 Iterators and Collections Utilities](lesson-9.5-iterators-and-collections-utilities.md)
