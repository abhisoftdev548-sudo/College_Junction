---
module: 4
topic: "4.3"
title: "Method Overloading"
slug: "method-overloading"
difficulty: "Beginner"
prerequisites:
  - Parameters and Return Values
estimated_minutes: 25
tags:
  - java
  - methods
  - overloading
---

# 4.3 Method Overloading

## Overview

**Method overloading** lets you define **multiple methods with the same name** but different parameter lists. The compiler picks the right one based on the arguments you pass. It's how `println` can accept an `int`, a `String`, or a `double` — one name, many signatures. Overloading makes APIs intuitive and code cleaner.

## Learning Objectives

After this lesson you will be able to:

- Define overloaded methods
- Explain how the compiler chooses an overload
- Overload on number and type of parameters
- Recognize what does *not* count as overloading
- Use overloading idiomatically (multiple constructors come in Module 6)

## Core Concepts

### Overloading by number of parameters

```java
public static int add(int a, int b) { return a + b; }
public static int add(int a, int b, int c) { return a + b + c; }

add(2, 3);        // calls the 2-param version
add(2, 3, 4);     // calls the 3-param version
```

### Overloading by type of parameters

```java
public static int add(int a, int b) { return a + b; }
public static double add(double a, double b) { return a + b; }

add(2, 3);          // int version
add(2.5, 3.5);      // double version
```

### How Java picks an overload

The compiler matches the **number and types** of arguments to the most specific applicable method. With mixed types it may widen (`int` → `double`) or choose the closest match:

```java
add(2, 3.5);        // int can widen to double → double version
```

### The signature rule

A method's **signature** = name + parameter types. **Return type is NOT part of the signature**:

```java
// ILLEGAL — same name and parameters, only return type differs:
public static int foo(int x) { return x; }
public static double foo(int x) { return x * 1.0; }   // compile error!
```

### Real-world examples

```java
System.out.println(42);        // println(int)
System.out.println(3.14);      // println(double)
System.out.println("hi");      // println(String)

Math.max(3, 5);                // max(int, int)
Math.max(3.5, 2.1);            // max(double, double)
```

The standard library is full of overloads — that's why one name works for many types.

## Visual — Which Overload Runs?

```
 call: add(2, 3)
          │
   ┌──────▼──────┬──────────────┐
   │ add(int,int)│ add(double,double)
   │  EXACT match│  (needs widening)
   └─────────────┘
        runs this one

 call: add(2.5, 3.5)  →  exact match is add(double,double)
```

The compiler prefers the most specific match; it widens only when no exact match exists.

## Code Examples

### Example 1 — Overloaded max

```java
public class Max {
    public static int max(int a, int b) { return a > b ? a : b; }
    public static double max(double a, double b) { return a > b ? a : b; }
    public static int max(int a, int b, int c) {
        return max(max(a, b), c);
    }

    public static void main(String[] args) {
        System.out.println(max(3, 7));          // 7
        System.out.println(max(2.5, 1.5));      // 2.5
        System.out.println(max(1, 9, 4));       // 9
    }
}
```

### Example 2 — Overloaded area

```java
public class Area {
    public static double area(double side) {              // square
        return side * side;
    }
    public static double area(double length, double width) {  // rectangle
        return length * width;
    }
    public static double area(double r, boolean isCircle) {   // circle
        return Math.PI * r * r;
    }

    public static void main(String[] args) {
        System.out.println(area(5.0));              // square
        System.out.println(area(5.0, 3.0));         // rectangle
        System.out.println(area(5.0, true));        // circle
    }
}
```

### Example 3 — Overloads with widening

```java
public class Widening {
    public static void show(int x) { System.out.println("int: " + x); }
    public static void show(double x) { System.out.println("double: " + x); }

    public static void main(String[] args) {
        show(10);       // int: 10 (exact match)
        show(10.5);     // double: 10.5 (exact match)
        show('A');      // int: 65 (char widens to int)
    }
}
```

## Common Mistakes

1. **Changing only the return type** — not overloading; a compile error.
2. **Expecting the return type to disambiguate** — the compiler ignores it.
3. **Ambiguous calls** — `max(1, 2)` might match multiple overloads ambiguously in edge cases.
4. **Too many overloads** — makes the API hard to navigate; consider varargs or generics.
5. **Forgetting widening** — `show('A')` calls the `int` overload, which can surprise.
6. **Overloading by parameter names only** — names don't matter, only types/count.

## Best Practices

- Overload when the **same operation** applies to different types/counts (like `max`, `add`).
- Keep overloads consistent in behaviour — every `add` should add.
- Avoid ambiguous overloads; keep widening in mind.
- Prefer clear, distinct names over clever overloads when behaviour differs.
- Use overloads for constructors (Module 6) to provide flexible creation options.

## Practice Questions

1. Write overloaded `area` methods for circle, square, and rectangle.
2. Write overloaded `print` methods for `int`, `double`, and `String`.
3. Explain why two methods differing only in return type don't compile.
4. Predict which overload runs for `show('A')`, `show(5)`, `show(5.0)`.
5. Overload a `format` method to take a `String` or a `String` plus an `int` padding.

## Multiple Choice Questions (MCQs)

### Q1. Overloading means multiple methods with the same name but different:
- a) Return types
- b) Parameter lists
- c) Bodies
- d) Modifiers

**Answer:** b

### Q2. A method's signature includes:
- a) Name + return type
- b) Name + parameter types
- c) Name only
- d) Return type only

**Answer:** b

### Q3. Which pair is valid overloading?
- a) `foo(int)` and `foo(String)`
- b) `foo(int)` and `foo(int)` (different return type)
- c) `foo(int a)` and `foo(int b)`
- d) `foo()` and `void foo()`

**Answer:** a

### Q4. `Math.max(3, 5)` and `Math.max(3.5, 2.1)` are examples of:
- a) Recursion
- b) Overloading
- c) Varargs
- d) Casting

**Answer:** b

### Q5. Given `show(int)` and `show(double)`, calling `show(10)` runs:
- a) `show(double)`
- b) `show(int)` (exact match)
- c) Neither
- d) Both

**Answer:** b

## Key Takeaways

- Overloading = same name, different parameter types/count.
- The compiler picks the most specific match, widening when needed.
- Return type is not part of the signature.
- Overloading gives one intuitive name to a family of related operations.

## Next Topic

[4.4 Scope and Lifetime](lesson-4.4-scope-and-lifetime.md)
