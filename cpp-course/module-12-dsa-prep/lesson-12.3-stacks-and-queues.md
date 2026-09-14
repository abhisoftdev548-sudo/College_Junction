---
module: 12
topic: "12.3"
title: "Stacks and Queues"
slug: "stacks-and-queues"
difficulty: "Advanced"
prerequisites:
  - Linked Lists
  - STL Containers
estimated_minutes: 30
tags:
  - dsa
  - stack
  - queue
  - deque
---

# 12.3 Stacks and Queues

## Overview

A **stack** is Last-In-First-Out (LIFO): the last item pushed is the first popped. A **queue** is First-In-First-Out (FIFO): the first item in is the first out. These two simple structures power expression evaluation, undo/redo, backtracking, BFS, scheduling, and a huge class of interview problems.

## Learning Objectives

After this lesson you will be able to:

- Use `std::stack` and `std::queue` operations
- Solve balanced-bracket and next-greater-element problems with stacks
- Use a queue for breadth-first traversal and scheduling
- Recognize when a monotonic stack applies
- Choose between stack, queue, and deque

## Core Concepts

### std::stack (LIFO)

```cpp
#include <stack>

std::stack<int> s;
s.push(1);
s.push(2);
s.top();    // 2 — the last pushed
s.pop();    // removes 2
s.empty();  // false
s.size();   // 1
```

### std::queue (FIFO)

```cpp
#include <queue>

std::queue<int> q;
q.push(1);
q.push(2);
q.front();  // 1 — the first pushed
q.back();   // 2
q.pop();    // removes 1
```

### std::deque (double-ended)

```cpp
#include <deque>

std::deque<int> d;
d.push_back(1);
d.push_front(0);   // both ends O(1)
d.front();         // 0
d.back();          // 1
```

A deque supports push/pop at both ends — the underlying building block of stacks and queues.

### Balanced brackets (the classic stack problem)

```cpp
bool balanced(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) return false;
        }
    }
    return st.empty();
}
```

### Next greater element (monotonic stack)

```cpp
std::vector<int> nextGreater(const std::vector<int>& a) {
    std::vector<int> res(a.size(), -1);
    std::stack<int> st;               // stores indices, values decreasing
    for (int i = 0; i < (int)a.size(); ++i) {
        while (!st.empty() && a[st.top()] < a[i]) {
            res[st.top()] = a[i];     // a[i] is the next greater for st.top()
            st.pop();
        }
        st.push(i);
    }
    return res;
}
```

### Queue for BFS (level order)

```cpp
std::queue<Node*> q;
q.push(root);
while (!q.empty()) {
    Node* n = q.front(); q.pop();
    process(n);
    for (Node* child : n->children) q.push(child);
}
```

A queue's FIFO order naturally visits nodes level by level.

## Visual — LIFO vs FIFO

```
 Stack (LIFO):            Queue (FIFO):
  push 1,2,3               push 1,2,3
  ┌───┐  ◄─ top            ┌───┬───┬───┐
  │ 3 │                    │ 1 │ 2 │ 3 │
  │ 2 │                    └───┴───┴───┘
  │ 1 │  pop → 3            front=1  back=3
  └───┘                     pop → 1
  last in, first out       first in, first out
```

Both are linear orders; the difference is which end you remove from.

## Code Examples

### Example 1 — Reverse a string with a stack

```cpp
#include <iostream>
#include <stack>
#include <string>

std::string reverse(const std::string& s) {
    std::stack<char> st;
    for (char c : s) st.push(c);
    std::string out;
    while (!st.empty()) { out += st.top(); st.pop(); }
    return out;
}
```

### Example 2 — Evaluate postfix (RPN)

```cpp
#include <stack>
#include <string>

int evalRPN(const std::vector<std::string>& tokens) {
    std::stack<int> st;
    for (const auto& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (t == "+") st.push(a + b);
            else if (t == "-") st.push(a - b);
            else if (t == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(std::stoi(t));
        }
    }
    return st.top();
}
```

### Example 3 — Queue as a buffer (scheduling)

```cpp
#include <iostream>
#include <queue>

int main() {
    std::queue<std::string> tasks;
    tasks.push("download");
    tasks.push("parse");
    tasks.push("render");

    while (!tasks.empty()) {
        std::cout << "processing " << tasks.front() << "\n";
        tasks.pop();      // FIFO: download → parse → render
    }
}
```

## Common Mistakes

1. **Calling `top()`/`front()` on an empty stack/queue** — undefined; check `empty()` first.
2. **Confusing `front()` and `back()`** in a queue — `front` is next out.
3. **Using a stack where a queue is needed** — order matters (DFS vs BFS).
4. **Forgetting to pop after reading** — processing the same element repeatedly.
5. **Monotonic stack storing values instead of indices** — you lose the distance/position info.
6. **Expecting `std::stack` to support iteration** — it doesn't; use `std::vector`/`std::deque` if you need that.

## Best Practices

- Use `std::stack`/`std::queue` adapters; they're built on `std::deque`.
- Check `empty()` before `top()`/`front()`/`pop()`.
- Use a stack for nested/matched structures (brackets, parentheses, calls).
- Use a queue for FIFO ordering (BFS, scheduling, buffers).
- Use a monotonic stack for next-greater/smaller problems.

## Practice Questions

1. Check whether a string of brackets is balanced using a stack.
2. Reverse a string with a stack.
3. Implement next-greater-element using a monotonic stack.
4. Use a queue to simulate a print-job buffer, processing jobs in FIFO order.
5. Implement a stack using two queues (or a queue using two stacks).

## Multiple Choice Questions (MCQs)

### Q1. A stack follows which order?
- a) FIFO
- b) LIFO
- c) Sorted
- d) Random

**Answer:** b

### Q2. `s.top()` returns:
- a) The oldest element
- b) The most recently pushed element (without removing it)
- c) The element and removes it
- d) The middle element

**Answer:** b

### Q3. Which is the classic stack application?
- a) Balanced brackets
- b) Sorting
- c) Hashing
- d) Binary search

**Answer:** a

### Q4. Breadth-first search uses a:
- a) Stack
- b) Queue
- c) Heap
- d) Set only

**Answer:** b

### Q5. A monotonic stack solves:
- a) Next greater/smaller element
- b) Random access
- c) String sorting
- d) Hash collisions

**Answer:** a

## Key Takeaways

- Stack = LIFO (`push`/`top`/`pop`); queue = FIFO (`push`/`front`/`pop`).
- Stacks handle nesting (brackets, RPN, undo, DFS); queues handle ordering (BFS, buffers).
- Monotonic stacks solve next-greater/smaller in O(n).
- Always check `empty()` before accessing the top/front.

## Next Topic

[12.4 Recursion and Backtracking](lesson-12.4-recursion-and-backtracking.md)
