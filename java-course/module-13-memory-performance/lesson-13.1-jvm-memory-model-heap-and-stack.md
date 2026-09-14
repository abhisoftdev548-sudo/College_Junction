---
module: 13
topic: "13.1"
title: "JVM Memory Model (Heap and Stack)"
slug: "jvm-memory-model-heap-and-stack"
difficulty: "Advanced"
prerequisites:
  - Classes and Objects
  - Methods
estimated_minutes: 30
tags:
  - java
  - memory
  - jvm
  - heap
  - stack
---

# 13.1 JVM Memory Model (Heap and Stack)

## Overview

The JVM divides memory into areas with different jobs. The **stack** holds method calls and local variables (fast, per-thread, auto-freed); the **heap** holds objects (shared, garbage-collected). Understanding this split — and the newer **Metaspace** for class metadata — explains how Java programs allocate, reference, and eventually free memory.

## Learning Objectives

After this lesson you will be able to:

- Distinguish stack vs heap allocation
- Explain where primitives, references, and objects live
- Describe method call frames and recursion's stack usage
- Recognize Metaspace and constant pools
- Understand how Java 25's compact object headers (JEP 519) save heap memory

## Core Concepts

### The two main areas

| | Stack | Heap |
|---|---|---|
| Holds | method frames, local variables, references | objects (and their fields) |
| Speed | very fast (LIFO) | slower (managed) |
| Thread | one stack per thread | shared by all threads |
| Cleanup | automatic on method exit | garbage collector |

### What lives where

```java
public class Memory {
    public static void main(String[] args) {
        int x = 10;                    // x (primitive) lives ON THE STACK
        String name = "Java";          // reference on stack; String object on heap
        Student s = new Student();     // reference on stack; Student object on heap
    }
}
```

- **Primitives** (`int`, `double`) — stored directly on the stack (in a local variable).
- **References** — on the stack; they point to objects on the heap.
- **Objects** — always on the heap.

### The call stack

```java
public static int add(int a, int b) {   // frame pushed when called
    int sum = a + b;                    // local variables in the frame
    return sum;                         // frame popped when returning
}
```

Each method call pushes a **frame** (parameters + locals) onto the stack; returning pops it. Deep recursion can overflow it — `StackOverflowError`:

```java
public static void recurse() { recurse(); }   // infinite → StackOverflowError
```

### The heap and object fields

```java
public class Person {
    String name;      // field — part of the object, lives ON THE HEAP
    int age;          // primitive field — also inside the object on the heap
}
```

An object's fields (including primitive fields) live inside the object on the heap.

### Metaspace — class metadata

Class definitions, method code, and static variables live in **Metaspace** (native memory, replacing the old PermGen). It grows automatically (configurable) and holds `Class` objects, not instances.

### Passing by value — the stack copies

```java
void change(int a, Student s) {
    a = 100;          // copy of the primitive — caller unaffected
    s.name = "x";     // copy of the REFERENCE — same object, so caller SEES this
}
```

Java passes everything **by value** — primitives copy the value; objects copy the reference.

## Modern Java / Java 25 Update

### JEP 519 — Compact Object Headers (Final in Java 25)

Every heap object carries a small **header** (class pointer, mark word for GC/locking). Java 25's **compact object headers** shrink the class pointer (and can compress the mark word), so each object uses **less memory**:

- Meaningful savings for programs with millions of small objects (caches, DTOs, collections).
- Works with the existing G1/Shenandoah collectors; requires a flag to enable (`-XX:+UseCompactObjectHeaders`).

```java
// No code change needed — the JVM lays out objects more densely:
List<Point> many = new ArrayList<>();
// ... millions of small objects now use fewer bytes each
```

> ⚠️ It's a runtime/memory-layout improvement, not a language feature — enable it with the JVM flag.

## Visual — Stack vs Heap

```
 STACK (per thread)               HEAP (shared)
 ┌────────────────────┐          ┌────────────────────┐
 │ main frame         │          │  "Java" (String)   │
 │  int x = 10   ─────┼─(value)─▶│  Student object    │
 │  String name  ─────┼─(ref)───▶│   name/rollNo      │
 │  Student s    ─────┼─(ref)───▶│  Person objects    │
 └────────────────────┘          └────────────────────┘
  primitives/references live here   objects live here (GC-managed)
```

Stack frames are fast and per-call; objects persist on the heap until unreachable.

## Code Examples

### Example 1 — Where things live

```java
public class Layout {
    public static void main(String[] args) {
        int local = 42;               // stack
        int[] arr = new int[3];       // reference on stack, array object on heap
        arr[0] = local;               // heap array stores the value
        System.out.println(arr[0]);
    }
}
```

### Example 2 — Stack overflow

```java
public class Overflow {
    static int depth = 0;

    public static void recurse() {
        depth++;
        recurse();                     // never returns
    }

    public static void main(String[] args) {
        try {
            recurse();
        } catch (StackOverflowError e) {
            System.out.println("Stack overflowed at depth " + depth);
        }
    }
}
```

### Example 3 — Pass-by-value

```java
public class PassByValue {
    static void modify(int n, StringBuilder sb) {
        n = 999;                 // local copy — caller unaffected
        sb.append("!");          // same object — caller affected
    }

    public static void main(String[] args) {
        int n = 1;
        StringBuilder sb = new StringBuilder("hi");
        modify(n, sb);
        System.out.println(n);    // 1 (unchanged)
        System.out.println(sb);   // hi! (changed)
    }
}
```

## Common Mistakes

1. **Thinking objects live on the stack** — objects always live on the heap.
2. **Assuming Java passes objects by reference** — it passes references by value.
3. **Ignoring recursion depth** — deep recursion causes `StackOverflowError`.
4. **Confusing primitive fields with locals** — fields live in the object (heap); locals on the stack.
5. **Forgetting static variables live in Metaspace** — not the heap, not the stack.
6. **Assuming stack and heap sizes are infinite** — both are finite and configurable (`-Xss`, `-Xmx`).

## Best Practices

- Keep objects small and short-lived where possible (they're cheap to collect).
- Avoid deep recursion for large inputs; prefer iteration when depth can be large.
- Understand pass-by-value when mutating objects in methods.
- Size the heap with `-Xmx` and stack with `-Xss` for your workload.
- Enable `-XX:+UseCompactObjectHeaders` (Java 25) for object-heavy workloads.

## Practice Questions

1. Classify (stack/heap/Metaspace): a local int, a `String` reference, a `new Student()`, a static field.
2. Demonstrate pass-by-value with a primitive and an object.
3. Write a program that throws `StackOverflowError` and explain why.
4. Explain the difference between stack and heap cleanup.
5. Describe (in a comment) Java 25's compact object headers and their benefit.

## Multiple Choice Questions (MCQs)

### Q1. Local variables live on the:
- a) Heap
- b) Stack
- c) Metaspace
- d) Disk

**Answer:** b

### Q2. Objects are always allocated on the:
- a) Stack
- b) Heap
- c) Metaspace
- d) CPU cache

**Answer:** b

### Q3. Java passes arguments:
- a) By reference
- b) By value (copies)
- c) By pointer
- d) Never

**Answer:** b

### Q4. Class metadata lives in:
- a) The stack
- b) Metaspace
- c) The heap (only)
- d) Registers

**Answer:** b

### Q5. JEP 519 (Java 25) compact object headers:
- a) Add methods to Object
- b) Reduce per-object memory overhead
- c) Remove the GC
- d) Change the language syntax

**Answer:** b

## Key Takeaways

- Stack = method frames + locals (fast, per-thread); heap = objects (shared, GC).
- Primitives/refs on stack; objects + fields on heap; class metadata in Metaspace.
- Pass-by-value everywhere; deep recursion → `StackOverflowError`.
- Java 25's compact object headers (JEP 519) shrink per-object overhead.

## Next Topic

[13.2 Garbage Collection](lesson-13.2-garbage-collection.md)
