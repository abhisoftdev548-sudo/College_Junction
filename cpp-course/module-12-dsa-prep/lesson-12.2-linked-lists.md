---
module: 12
topic: "12.2"
title: "Linked Lists"
slug: "linked-lists"
difficulty: "Advanced"
prerequisites:
  - Pointers
  - Dynamic Memory Allocation
  - Classes and Objects
estimated_minutes: 30
tags:
  - dsa
  - linked-list
  - pointers
---

# 12.2 Linked Lists

## Overview

A **linked list** stores each element in a **node** that points to the next node. Unlike arrays, insertion and deletion at any position are O(1) (given a pointer to the node) — at the cost of no random access. Linked lists are the classic exercise in **pointer manipulation** and appear constantly in DSA interviews.

## Learning Objectives

After this lesson you will be able to:

- Build a singly linked list node and list
- Traverse, insert, and delete nodes
- Reverse a list iteratively and recursively
- Detect cycles with the Floyd (tortoise-and-hare) technique
- Choose between arrays and linked lists

## Core Concepts

### The node

```cpp
struct Node {
    int data;
    Node* next;
    Node(int d, Node* n = nullptr) : data(d), next(n) {}
};
```

A node holds data and a pointer to the next node. `nullptr` marks the end.

### Traversal

```cpp
void print(Node* head) {
    for (Node* p = head; p != nullptr; p = p->next) {
        std::cout << p->data << " ";
    }
}
```

### Insertion at the head

```cpp
Node* pushFront(Node* head, int value) {
    return new Node(value, head);   // new node points at old head
}
```

### Deletion

```cpp
Node* remove(Node* head, int value) {
    if (!head) return nullptr;
    if (head->data == value) {      // delete head
        Node* rest = head->next;
        delete head;
        return rest;
    }
    Node* p = head;
    while (p->next && p->next->data != value) p = p->next;
    if (p->next) {                  // found
        Node* toDelete = p->next;
        p->next = toDelete->next;
        delete toDelete;
    }
    return head;
}
```

### Reversal

```cpp
Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* cur = head;
    while (cur) {
        Node* next = cur->next;   // save
        cur->next = prev;         // flip the pointer
        prev = cur;
        cur = next;
    }
    return prev;                  // new head
}
```

### Cycle detection (Floyd's algorithm)

```cpp
bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;        // 1 step
        fast = fast->next->next;  // 2 steps
        if (slow == fast) return true;   // they met → cycle
    }
    return false;
}
```

If there is a cycle, the fast pointer laps the slow one — they meet in O(n).

## Visual — Reversing a Linked List

```
 head → [1]→[2]→[3]→null

 step: flip pointers one by one
   prev  cur   next
   null  [1]→ [2]→[3]→null
         [1]→null,  prev=[1], cur=[2]
   [1]←[2]   next=[3]
   [1]←[2]←[3]  → done: [3]→[2]→[1]→null
```

At each step you save `next`, flip `cur->next` to `prev`, then advance both.

## Code Examples

### Example 1 — Build and print a list

```cpp
#include <iostream>

int main() {
    Node* head = nullptr;
    for (int v : {3, 2, 1}) head = pushFront(head, v);  // 1 → 2 → 3
    print(head);                                         // 1 2 3
}
```

### Example 2 — Find the middle (two pointers)

```cpp
Node* middle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;   // middle (or right-middle for even length)
}
```

### Example 3 — Recursive reversal

```cpp
Node* reverseRecursive(Node* head) {
    if (!head || !head->next) return head;
    Node* newHead = reverseRecursive(head->next);
    head->next->next = head;   // point the next node back at head
    head->next = nullptr;
    return newHead;
}
```

## Common Mistakes

1. **Losing the next pointer** — reversing without saving `next` orphans the rest of the list.
2. **Dereferencing null** — always guard `p` and `p->next` before using them.
3. **Memory leaks** — deleting nodes without `delete`, or losing the head.
4. **Forgetting to update the head** — insert/delete must return (or update) the new head.
5. **Using `head` after modification** — keep the returned head from insert/delete/reverse.
6. **Confusing `Node*` and `Node`** — a list is a pointer to the first node, not the node itself.

## Best Practices

- Draw the pointers before writing insertion/deletion code.
- Use the **sentinel/dummy node** trick to simplify head-edge cases.
- Write iterative solutions first; recursion can overflow on long lists.
- Use `std::list`/`std::forward_list` for real code; raw linked lists are for learning DSA.
- Save `next` before rewiring pointers.

## Practice Questions

1. Write `pushFront`, `pushBack`, and `print` for a singly linked list.
2. Reverse a list iteratively and verify by printing it.
3. Find the middle node using the slow/fast pointer technique.
4. Detect whether a list has a cycle using Floyd's algorithm.
5. Remove the n-th node from the end of a list (use two pointers).

## Multiple Choice Questions (MCQs)

### Q1. A singly linked list node contains:
- a) Data and a previous pointer
- b) Data and a next pointer
- c) Two data fields
- d) An array

**Answer:** b

### Q2. What is the time to insert at the head of a singly linked list?
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** c

### Q3. Reversing a linked list iteratively uses:
- a) O(n) time, O(1) extra space
- b) O(n²) time
- c) O(n) extra space
- d) Sorting

**Answer:** a

### Q4. Floyd's cycle detection uses:
- a) A hash set
- b) Two pointers moving at different speeds
- c) Sorting the list
- d) Doubling the list

**Answer:** b

### Q5. Which operation is a linked list typically BETTER at than an array?
- a) Random access by index
- b) Insert/delete in the middle (given a pointer)
- c) Cache-friendly traversal
- d) Binary search

**Answer:** b

## Key Takeaways

- A linked list is a chain of nodes; no random access, but O(1) insert/delete.
- Save `next` before rewiring; update the head on insert/delete.
- Reverse with prev/cur/next pointers; detect cycles with slow/fast pointers.
- Dummy nodes and diagrams prevent most pointer bugs.

## Next Topic

[12.3 Stacks and Queues](lesson-12.3-stacks-and-queues.md)
