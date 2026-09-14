---
module: 4
topic: "4.4"
title: "Scope and Lifetime"
slug: "scope-and-lifetime"
difficulty: "Beginner"
prerequisites:
  - Method Overloading
estimated_minutes: 25
tags:
  - java
  - scope
  - lifetime
  - blocks
---

# 4.4 Scope and Lifetime

## Overview

**Scope** is the region of code where a variable is visible and usable; **lifetime** is how long it exists. Java uses **block scoping**: a variable declared inside `{}` exists only within that block. Understanding scope prevents "cannot find symbol" errors, accidental shadowing, and bugs from using variables outside their intended range.

## Learning Objectives

After this lesson you will be able to:

- Explain block, method, and class scope
- Describe a variable's lifetime
- Recognize and avoid variable shadowing
- Declare variables in the smallest scope needed
- Fix "cannot find symbol" scope errors

## Core Concepts

### Block scope

```java
public static void main(String[] args) {
    int x = 10;              // visible from here...

    if (x > 5) {
        int y = 20;          // y exists ONLY inside this block
        System.out.println(y);   // 20 — fine
    }

    // System.out.println(y);  // ERROR — y is out of scope here
    System.out.println(x);      // 10 — still in scope
}
```

A variable is visible from its declaration to the end of the enclosing `{}` block.

### Method scope and parameters

```java
public static void method(int param) {   // param is local to this method
    int local = 5;                       // local variable
    // param and local exist only while the method runs
}
```

**Local variables** (declared in a method) and **parameters** live for the duration of one method call.

### Lifetime

```java
public static void each() {
    int temp = 0;     // created on entry
    // ... use temp ...
}                     // destroyed on exit — next call starts fresh
```

A local variable's **lifetime** matches its scope: created when the block is entered, discarded when it exits.

### Class scope (fields)

```java
public class Counter {
    int count = 0;         // field: class scope — lives with the object

    void increment() {
        count++;           // visible in every method of the class
    }
}
```

**Fields** (declared in the class body, outside methods) have class scope — visible to all methods and alive as long as the object exists (Module 6 covers fields in depth).

### Shadowing

```java
int x = 10;                // outer x
{
    int x = 20;            // shadows the outer x inside this block
    System.out.println(x); // 20
}
System.out.println(x);     // 10 — outer x visible again
```

Shadowing is legal but confusing — avoid reusing a name in an inner block.

### The smallest-scope principle

```java
// Bad: declared far from use
int i;
// ... many lines ...
for (i = 0; i < 10; i++) { ... }

// Good: declared in the loop header
for (int i = 0; i < 10; i++) { ... }
```

## Visual — Scope Regions

```
 class Scope {                 ← class scope (fields live here)
     int field = 1;
     void method(int p) {      ← method scope (p and locals)
         int local = 2;
         {                    ← nested block scope
             int inner = 3;    (only here)
         }
         // inner is gone here
     }
 }
```

Inner blocks can see outer variables; outer code cannot see inner ones.

## Code Examples

### Example 1 — Scope in action

```java
public class ScopeDemo {
    public static void main(String[] args) {
        int a = 1;
        if (a == 1) {
            int b = 2;
            System.out.println(a + b);   // 3 (both visible)
        }
        System.out.println(a);           // 1
        // System.out.println(b);        // compile error — b out of scope
    }
}
```

### Example 2 — Loop variable scope

```java
public class LoopScope {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.print(i + " ");   // 0 1 2
        }
        // System.out.println(i);        // error — i gone after the loop
    }
}
```

### Example 3 — Shadowing (and why to avoid it)

```java
public class Shadow {
    public static void main(String[] args) {
        int value = 100;
        if (true) {
            int value = 200;              // shadows the outer value
            System.out.println(value);    // 200
        }
        System.out.println(value);        // 100
    }
}
```

## Common Mistakes

1. **Using a variable outside its block** — "cannot find symbol" error.
2. **Declaring the same name twice in the same block** — duplicate variable error.
3. **Assuming a loop variable survives the loop** — it's scoped to the loop.
4. **Shadowing accidentally** — two variables with the same name in nested blocks.
5. **Declaring variables too early** — widens scope and invites misuse.
6. **Confusing fields and locals** — a local with the same name as a field shadows it (use `this.` in classes).

## Best Practices

- Declare variables in the **smallest scope** possible (loop headers, nearest block).
- Initialize variables at declaration.
- Avoid shadowing — use distinct, meaningful names.
- Limit method length so scope is easy to track.
- Prefer locals over fields when the value is method-specific.

## Practice Questions

1. Write a program with a variable in a block and show where it becomes invalid.
2. Explain why a `for`-loop variable can't be used after the loop.
3. Demonstrate shadowing with an outer and inner variable of the same name.
4. Refactor a snippet so a variable is declared in the smallest scope.
5. Explain the difference between a local variable and a field's lifetime.

## Multiple Choice Questions (MCQs)

### Q1. A variable declared inside an `if` block is visible:
- a) Everywhere in the method
- b) Only within that block
- c) In the whole class
- d) In other methods

**Answer:** b

### Q2. "Cannot find symbol" usually means:
- a) A type mismatch
- b) A variable is used outside its scope (or undeclared)
- c) A runtime error
- d) An infinite loop

**Answer:** b

### Q3. A local variable's lifetime:
- a) Lasts the whole program
- b) Matches its block — it's discarded on exit
- c) Is infinite
- d) Spans all method calls

**Answer:** b

### Q4. Shadowing occurs when:
- a) A method is overridden
- b) An inner variable reuses an outer variable's name
- c) A field is final
- d) A loop runs twice

**Answer:** b

### Q5. The best practice is to declare a variable:
- a) As early as possible
- b) In the smallest scope needed
- c) At the top of the class always
- d) Only as a field

**Answer:** b

## Key Takeaways

- Scope = where a variable is visible; lifetime = how long it exists.
- Block `{}` defines scope; locals/parameters live for one method call.
- Fields have class scope and object lifetime.
- Declare in the smallest scope; avoid shadowing.

## Next Topic

[4.5 Introduction to Recursion](lesson-4.5-introduction-to-recursion.md)
