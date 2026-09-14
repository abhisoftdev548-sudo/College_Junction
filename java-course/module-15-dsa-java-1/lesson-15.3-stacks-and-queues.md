---
module: 15
topic: "15.3"
title: "Stacks and Queues"
slug: "stacks-and-queues"
difficulty: "Advanced"
prerequisites:
  - Linked Lists
estimated_minutes: 35
tags:
  - java
  - dsa
  - stack
  - queue
---

# 15.3 Stacks and Queues

## Overview

A **stack** is LIFO (last-in, first-out) — like a pile of plates; a **queue** is FIFO (first-in, first-out) — like a line. Both are built with `ArrayDeque` in Java, and both drive classic problems: balanced parentheses, evaluating expressions, monotonic stacks, and level-order traversal.

## Learning Objectives

After this lesson you will be able to:

- Use `ArrayDeque` as a stack and as a queue
- Validate balanced parentheses
- Evaluate postfix expressions
- Build a monotonic stack (next greater element)
- Implement a queue using stacks (and vice versa)

## Core Concepts

### Stack via ArrayDeque (LIFO)

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.peek();    // 3 (top)
stack.pop();     // 3 (remove top)
stack.pop();     // 2
```

### Queue via ArrayDeque (FIFO)

```java
Deque<Integer> queue = new ArrayDeque<>();
queue.offer(1);   // add to the back
queue.offer(2);
queue.peek();     // 1 (front)
queue.poll();     // 1 (remove front)
```

### Balanced parentheses (classic stack problem)

```java
public static boolean isBalanced(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char open = stack.pop();
            if (!matches(open, c)) return false;
        }
    }
    return stack.isEmpty();
}

static boolean matches(char open, char close) {
    return (open == '(' && close == ')')
        || (open == '{' && close == '}')
        || (open == '[' && close == ']');
}
```

### Evaluate postfix (Reverse Polish Notation)

```java
public static int evalPostfix(String[] tokens) {
    Deque<Integer> stack = new ArrayDeque<>();
    for (String t : tokens) {
        switch (t) {
            case "+" -> {
                int b = stack.pop(), a = stack.pop();
                stack.push(a + b);
            }
            case "-" -> {
                int b = stack.pop(), a = stack.pop();
                stack.push(a - b);
            }
            case "*" -> {
                int b = stack.pop(), a = stack.pop();
                stack.push(a * b);
            }
            case "/" -> {
                int b = stack.pop(), a = stack.pop();
                stack.push(a / b);
            }
            default -> stack.push(Integer.parseInt(t));
        }
    }
    return stack.pop();
}
```

### Monotonic stack — next greater element

```java
public static int[] nextGreater(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();   // indices, decreasing values

    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];       // nums[i] is the next greater
        }
        stack.push(i);
    }
    return result;
}
```

A **monotonic stack** keeps values in order to find next-greater/smaller in O(n).

### Queue using two stacks

```java
class MyQueue {
    Deque<Integer> in = new ArrayDeque<>();
    Deque<Integer> out = new ArrayDeque<>();

    void push(int x) { in.push(x); }

    int pop() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) out.push(in.pop());   // flip order
        }
        return out.pop();
    }
}
```

## Visual — Stack vs Queue

```
 Stack (LIFO):          Queue (FIFO):
   push ↓  ↑ pop          offer →  [1][2][3]  → poll
   ┌─────┐                 back           front
   │  3  │ top
   │  2  │
   │  1  │
   └─────┘
```

Stack: last in, first out (top). Queue: first in, first out (front).

## Code Examples

### Example 1 — Balanced parentheses

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Balanced {
    public static boolean isBalanced(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if ("({[".indexOf(c) != -1) {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if (open == '(' && c != ')' ||
                    open == '{' && c != '}' ||
                    open == '[' && c != ']') return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("{[()]}"));    // true
        System.out.println(isBalanced("{[(])}"));    // false
    }
}
```

### Example 2 — Postfix evaluation

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Postfix {
    public static void main(String[] args) {
        String[] expr = {"2", "3", "+", "4", "*"};   // (2+3)*4
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : expr) {
            switch (t) {
                case "+" -> { int b = stack.pop(), a = stack.pop(); stack.push(a + b); }
                case "-" -> { int b = stack.pop(), a = stack.pop(); stack.push(a - b); }
                case "*" -> { int b = stack.pop(), a = stack.pop(); stack.push(a * b); }
                case "/" -> { int b = stack.pop(), a = stack.pop(); stack.push(a / b); }
                default -> stack.push(Integer.parseInt(t));
            }
        }
        System.out.println(stack.pop());   // 20
    }
}
```

### Example 3 — Next greater element

```java
import java.util.*;

public class NextGreater {
    public static int[] nextGreater(int[] nums) {
        int[] res = new int[nums.length];
        Arrays.fill(res, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
                res[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(nextGreater(new int[]{2, 1, 5})));  // [5, 5, -1]
    }
}
```

## Common Mistakes

1. **Using `add`/`remove` on a stack expecting LIFO** — `push`/`pop`/`peek` are the LIFO operations.
2. **Forgetting the empty-check before `pop`/`peek`** — throws `NoSuchElementException`.
3. **Confusing `offer`/`poll` (queue) with `push`/`pop` (stack)** — both use `ArrayDeque`, but the operations differ.
4. **Not checking `stack.isEmpty()` after processing parentheses** — extra opens mean unbalanced.
5. **Using the legacy `Stack` class** — prefer `ArrayDeque`.
6. **Off-by-one in monotonic stack logic** — the stack stores indices, not values.

## Best Practices

- Use `ArrayDeque` for both stack (`push`/`pop`/`peek`) and queue (`offer`/`poll`/`peek`).
- Always check `isEmpty()` before pop/peek.
- Recognize parentheses/expression problems as stack problems.
- Use monotonic stacks for next-greater/smaller in O(n).
- Test with empty input, single element, and edge nesting.

## Practice Questions

1. Implement a stack with `ArrayDeque` and push/pop values.
2. Validate balanced parentheses of three types.
3. Evaluate a postfix expression.
4. Find the next greater element for each array position with a monotonic stack.
5. Implement a queue using two stacks.

## Multiple Choice Questions (MCQs)

### Q1. A stack is:
- a) FIFO
- b) LIFO
- c) Random access
- d) Sorted

**Answer:** b

### Q2. A queue is:
- a) LIFO
- b) FIFO
- c) Random access
- d) Unsorted only

**Answer:** b

### Q3. `ArrayDeque` stack operations are:
- a) `offer`/`poll`
- b) `push`/`pop`/`peek`
- c) `add`/`remove`
- d) `enqueue`/`dequeue`

**Answer:** b

### Q4. Balanced parentheses use a stack to:
- a) Count characters
- b) Match closing brackets to the most recent open
- c) Sort brackets
- d) Reverse the string

**Answer:** b

### Q5. A monotonic stack finds next-greater elements in:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(n log n)

**Answer:** a

## Key Takeaways

- Stack = LIFO, Queue = FIFO; both via `ArrayDeque` (push/pop vs offer/poll).
- Classic stack problems: balanced parentheses, postfix evaluation.
- Monotonic stack → next greater/smaller in O(n).
- Queue via two stacks: flip with a second stack.

## Next Topic

[15.4 Recursion and Backtracking](lesson-15.4-recursion-and-backtracking.md)
