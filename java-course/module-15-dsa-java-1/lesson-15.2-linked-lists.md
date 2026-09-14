---
module: 15
topic: "15.2"
title: "Linked Lists"
slug: "linked-lists"
difficulty: "Advanced"
prerequisites:
  - Arrays and Strings in DSA
estimated_minutes: 35
tags:
  - java
  - dsa
  - linked-list
---

# 15.2 Linked Lists

## Overview

A **linked list** is a chain of nodes, each holding a value and a reference to the next node. Unlike arrays, insertion and deletion are O(1) once you're at the right spot (no shifting) — but random access is O(n). This lesson covers building, traversing, and the classic operations: reverse, find middle, detect cycles, and merge.

## Learning Objectives

After this lesson you will be able to:

- Define a `Node` and build a linked list
- Traverse and print a list
- Reverse a list (iteratively and recursively)
- Find the middle with slow/fast pointers
- Detect cycles with Floyd's algorithm and merge sorted lists

## Core Concepts

### The Node

```java
class Node {
    int data;
    Node next;

    Node(int data) { this.data = data; }
}
```

Each node stores data and a `next` pointer. The list is identified by its **head**.

### Building and traversing

```java
Node head = new Node(10);
head.next = new Node(20);
head.next.next = new Node(30);

for (Node cur = head; cur != null; cur = cur.next) {
    System.out.println(cur.data);
}
```

### Reverse a list (iterative)

```java
public static Node reverse(Node head) {
    Node prev = null, cur = head;
    while (cur != null) {
        Node next = cur.next;   // save the rest
        cur.next = prev;        // point backward
        prev = cur;             // advance prev
        cur = next;             // advance cur
    }
    return prev;                // new head
}
```

### Find the middle (slow/fast)

```java
public static Node middle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;        // 1 step
        fast = fast.next.next;   // 2 steps
    }
    return slow;                 // middle when fast reaches the end
}
```

### Detect a cycle (Floyd's)

```java
public static boolean hasCycle(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;   // they meet → cycle
    }
    return false;
}
```

### Merge two sorted lists

```java
public static Node merge(Node a, Node b) {
    if (a == null) return b;
    if (b == null) return a;
    if (a.data <= b.data) {
        a.next = merge(a.next, b);   // recursive
        return a;
    } else {
        b.next = merge(a, b.next);
        return b;
    }
}
```

### Insertion and deletion (O(1) at a known node)

```java
// insert after node p:
newNode.next = p.next;
p.next = newNode;

// delete the node after p:
p.next = p.next.next;
```

## Visual — A Linked List

```
 head
  │
 [10] ──▶ [20] ──▶ [30] ──▶ null
  │        │        │
 data    next     data/next (last next = null)

 reverse:
 null ◀── [10] ◀── [20] ◀── [30]   (new head)
```

Each node points to the next; reversal rewires every `next` pointer.

## Code Examples

### Example 1 — Build, print, reverse

```java
public class LinkedList {
    static class Node {
        int data; Node next;
        Node(int d) { data = d; }
    }

    static Node reverse(Node head) {
        Node prev = null, cur = head;
        while (cur != null) {
            Node next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }

    static void print(Node head) {
        for (Node c = head; c != null; c = c.next)
            System.out.print(c.data + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        print(head);             // 1 2 3
        print(reverse(head));    // 3 2 1
    }
}
```

### Example 2 — Find middle

```java
public class Middle {
    static class Node { int data; Node next; Node(int d){ data = d; } }

    static Node middle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) {
        Node head = new Node(1);
        Node cur = head;
        for (int v = 2; v <= 5; v++) { cur.next = new Node(v); cur = cur.next; }
        System.out.println(middle(head).data);   // 3
    }
}
```

### Example 3 — Cycle detection

```java
public class Cycle {
    static class Node { int data; Node next; Node(int d){ data = d; } }

    static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Node a = new Node(1), b = new Node(2), c = new Node(3);
        a.next = b; b.next = c;
        System.out.println(hasCycle(a));   // false
        c.next = b;                        // create a cycle b → c → b
        System.out.println(hasCycle(a));   // true
    }
}
```

## Common Mistakes

1. **Losing the next pointer before rewiring in reverse** — save `next` first.
2. **Null-pointer on `fast.next.next`** — check `fast != null && fast.next != null`.
3. **Returning the wrong node in reverse** — return `prev` (the new head).
4. **Iterating with `cur.next != null`** — skips the last node; use `cur != null`.
5. **Comparing nodes with `==` vs data** — `slow == fast` compares references (intended for cycles).
6. **Forgetting the base case in recursive merge** — handle null lists first.

## Best Practices

- Always guard `fast != null && fast.next != null` for slow/fast.
- Save `next` before rewiring pointers.
- Draw the pointers before writing reverse/merge.
- Return the correct head after structural changes.
- Test edge cases: empty list, single node, two nodes, cycles.

## Practice Questions

1. Build a linked list from an array and print it.
2. Reverse it iteratively and recursively.
3. Find the middle node with slow/fast pointers.
4. Detect a cycle with Floyd's algorithm.
5. Merge two sorted linked lists.

## Multiple Choice Questions (MCQs)

### Q1. A linked list node contains:
- a) An index
- b) Data and a `next` pointer
- c) A fixed array
- d) Only a pointer

**Answer:** b

### Q2. Random access in a linked list is:
- a) O(1)
- b) O(n)
- c) O(log n)
- d) O(n log n)

**Answer:** b

### Q3. In iterative reversal, you must first:
- a) Print the list
- b) Save `cur.next` before rewiring
- c) Delete the head
- d) Sort the list

**Answer:** b

### Q4. Slow/fast pointers find the middle in:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** a

### Q5. Floyd's algorithm detects:
- a) Duplicates
- b) Cycles
- c) The tail
- d) The minimum

**Answer:** b

## Key Takeaways

- Node = data + next; list = head; random access O(n), insertion/deletion O(1) at a node.
- Templates: reverse, middle (slow/fast), cycle detection (Floyd's), merge.
- Save `next` before rewiring; guard `fast.next`; return the correct head.

## Next Topic

[15.3 Stacks and Queues](lesson-15.3-stacks-and-queues.md)
