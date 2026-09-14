---
module: 1
topic: "1.4"
title: "Variables and Data Types"
slug: "variables-and-data-types"
difficulty: "Beginner"
prerequisites:
  - Your First Program and Program Structure
estimated_minutes: 30
tags:
  - java
  - variables
  - data-types
---

# 1.4 Variables and Data Types

## Overview

A **variable** is a named container that stores a value; its **data type** determines what kind of value it can hold and how much memory it uses. Java is **statically typed**: every variable has a fixed type declared upfront. Java has eight **primitive types** plus **reference types** for objects.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize variables
- List the eight primitive types and their sizes/ranges
- Distinguish primitive types from reference types
- Declare constants with `final`
- Follow Java naming conventions (and use `var` where appropriate)

## Core Concepts

### Declaring and initializing

```java
int age;            // declaration
age = 21;           // assignment
int score = 90;     // declaration + initialization
String name = "Ankit";
```

### The eight primitive types

| Type | Size | Range / Notes | Example |
|---|---|---|---|
| `byte` | 1 byte | -128 to 127 | `byte b = 100;` |
| `short` | 2 bytes | -32,768 to 32,767 | `short s = 30000;` |
| `int` | 4 bytes | ~±2.1 billion | `int i = 100000;` |
| `long` | 8 bytes | huge integers | `long l = 10000000000L;` |
| `float` | 4 bytes | single precision | `float f = 3.14f;` |
| `double` | 8 bytes | double precision | `double d = 3.14159;` |
| `char` | 2 bytes | single character (Unicode) | `char c = 'A';` |
| `boolean` | 1 bit (logical) | `true` / `false` | `boolean ok = true;` |

Notes:

- Integer literals default to `int`; use `L` for `long`.
- Floating literals default to `double`; use `f` for `float`.
- `char` uses **single quotes**; `String` uses **double quotes**.

### Reference types

```java
String s = "hello";          // String is a class — a reference type
int[] arr = {1, 2, 3};       // arrays are reference types too
```

Primitives store the value directly; reference variables store a **reference** to an object in memory.

### Constants with final

```java
final double PI = 3.14159;   // cannot be changed after assignment
final int MAX_SCORE = 100;
```

`final` makes a variable a constant — the compiler rejects any reassignment.

### Naming conventions

```java
int studentAge = 20;         // variables: camelCase
double averageMarks = 85.5;
final int DAYS_IN_WEEK = 7;  // constants: UPPER_SNAKE_CASE
```

### var (Java 10+)

```java
var count = 10;              // type inferred as int
var name = "Java";           // inferred as String
```

`var` infers the type from the initializer — but the variable is still **statically typed**.

## Visual — Primitive vs Reference

```
 int x = 42;              String s = "hello";
 ┌─────────┐              ┌─────────┐      ┌──────────────┐
 │   42    │              │ ref ────┼────▶ │ "hello" obj  │
 └─────────┘              └─────────┘      └──────────────┘
 stores the VALUE          stores a REFERENCE to an object
```

Primitives hold data directly; reference variables point at objects on the heap.

## Code Examples

### Example 1 — Using several types

```java
public class Types {
    public static void main(String[] args) {
        int age = 21;
        double height = 5.9;
        char grade = 'A';
        boolean passed = true;
        String name = "Ankit";

        System.out.println(name + " is " + age + " years old, grade " + grade);
    }
}
```

### Example 2 — Constants

```java
public class Circle {
    public static void main(String[] args) {
        final double PI = 3.14159;
        double radius = 5.0;
        double area = PI * radius * radius;
        System.out.println("Area = " + area);
        // PI = 3.14;  // compile error — final
    }
}
```

### Example 3 — Overflow demonstration

```java
public class Overflow {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;      // 2147483647
        System.out.println(max + 1);      // -2147483648 (wraps around!)
        long big = 10000000000L;          // needs L for long
        System.out.println(big);
    }
}
```

## Common Mistakes

1. **`long x = 10000000000;`** without `L` — the literal is an `int` and overflows.
2. **`float f = 3.14;`** without `f` — a `double` literal can't auto-narrow to `float`.
3. **`char c = "A";`** — `char` uses single quotes; `"A"` is a `String`.
4. **Using `int` for large sums/products** — overflow; use `long`.
5. **Forgetting `final` on intended constants** — they can be silently reassigned.
6. **Confusing `==` with value comparison for reference types** — `==` on objects compares references (later lessons).

## Best Practices

- Use the smallest type that safely holds your values (`int` by default for integers, `double` for decimals).
- Declare variables close to where they're used.
- Initialize variables when you declare them.
- Mark true constants `final` and name them `UPPER_SNAKE_CASE`.
- Prefer `double` over `float` unless memory is critical.

## Practice Questions

1. Declare variables for: an age (int), a price (double), an initial (char), and a flag (boolean).
2. Explain why `long big = 5000000000;` fails and fix it.
3. Write a program that computes the area and circumference of a circle using a `final` PI.
4. What is the difference between a primitive and a reference type? Give one example of each.
5. Show the overflow of `byte b = 127; b++;` and explain the result.

## Multiple Choice Questions (MCQs)

### Q1. How many primitive types does Java have?
- a) 6
- b) 7
- c) 8
- d) 9

**Answer:** c

### Q2. Which literal is a valid `long`?
- a) `10000000000`
- b) `10000000000L`
- c) `10000000000d`
- d) `10000000000f`

**Answer:** b

### Q3. `String` in Java is a:
- a) Primitive type
- b) Reference type (a class)
- c) Keyword for char
- d) Numeric type

**Answer:** b

### Q4. A variable that cannot be reassigned is declared with:
- a) `static`
- b) `const`
- c) `final`
- d) `var`

**Answer:** c

### Q5. `char` values are written with:
- a) Double quotes
- b) Single quotes
- c) Parentheses
- d) Brackets

**Answer:** b

## Key Takeaways

- Java is statically typed; every variable has one fixed type.
- Eight primitives: byte, short, int, long, float, double, char, boolean.
- `long` literals use `L`, `float` use `f`; `final` makes constants.
- Primitives store values; reference types store references to objects.

## Next Topic

[1.5 Input and Output](lesson-1.5-input-and-output.md)
