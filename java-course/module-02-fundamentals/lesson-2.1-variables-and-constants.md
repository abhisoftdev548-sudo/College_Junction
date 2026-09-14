---
module: 2
topic: "2.1"
title: "Variables and Constants (final)"
slug: "variables-and-constants"
difficulty: "Beginner"
prerequisites:
  - Input and Output
estimated_minutes: 30
tags:
  - java
  - variables
  - final
  - var
---

# 2.1 Variables and Constants (`final`)

## Overview

A **variable** is a named container that holds a value; a **constant** is a variable whose value can never change. In Java, `final` marks a constant. This lesson covers declaring and initializing variables, the `final` keyword, naming conventions, and how modern Java (`var`, and Java 25's compact `main`) makes code shorter while keeping it type-safe.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize variables of any type
- Use `final` to create true constants
- Explain `static final` class constants
- Apply Java naming conventions (camelCase, UPPER_SNAKE_CASE)
- Use `var` (Java 10) and understand Java 25's simplified `main`

## Core Concepts

### Declaring and initializing

```java
int age;            // declaration
age = 21;           // assignment
int score = 90;     // declaration + initialization (preferred)
```

### final — a constant

```java
final double PI = 3.14159;      // cannot be reassigned
final int MAX_RETRIES = 3;

// PI = 3.14;   // COMPILE ERROR — final
```

`final` means "assign once." The compiler rejects any second assignment.

### static final — class-level constants

```java
public class Config {
    public static final String APP_NAME = "College Junction";
    public static final int PAGE_SIZE = 20;
}

// Usage:
System.out.println(Config.APP_NAME);   // no object needed
```

`static final` is the Java idiom for constants shared by the whole class.

### Naming conventions

```java
int studentAge = 20;            // variables & parameters: camelCase
double averageMarks = 85.5;
final int DAYS_IN_WEEK = 7;     // constants: UPPER_SNAKE_CASE
```

### var — local type inference (Java 10)

```java
var count = 10;                 // int
var name = "Java";              // String
var list = new ArrayList<String>();  // ArrayList<String>
```

`var` lets the compiler infer the type **from the initializer**. The variable is still statically typed — `count` is an `int`, forever. `var` works only for **local variables** with an initializer.

## Modern Java / Java 25 Update

### JEP 512 — Compact Source Files and Instance Main Methods (Final in Java 25)

Since Java 21, you could simplify `main`. Java 25 **finalized** the compact form — you can now write:

```java
// Before (classic, still valid):
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}

// Java 25 compact form (single file — no class, no static, no args):
void main() {
    IO.println("Hello");   // IO is java.io.IO (new in Java 25)
}
```

Key points of the compact form:

- `void main()` — no `public static`, no `String[] args` needed.
- A source file with only methods/fields runs as an **implicit class**.
- The new **`java.io.IO`** class offers short static I/O: `IO.println`, `IO.print`, `IO.readln`, `IO.readInt`.

> ⚠️ This compact form is great for scripts/learning; real projects still use normal classes with `public static void main`.

## Visual — Variable vs Constant

```
 int score = 90;              final int MAX = 100;
 ┌────────────┐               ┌────────────┐
 │  90  (can  │               │  100 (locked│
 │  change)  │               │  forever)  │
 └────────────┘               └────────────┘
   score = 95;  ✓              MAX = 99;  ✗ (compile error)
```

A variable is a mutable box; a `final` constant is a locked box.

## Code Examples

### Example 1 — Variables and a final constant

```java
public class Circle {
    public static void main(String[] args) {
        final double PI = 3.14159;
        double radius = 5.0;
        double area = PI * radius * radius;
        System.out.println("Area = " + area);
    }
}
```

### Example 2 — static final constants

```java
public class Config {
    public static final String APP_NAME = "College Junction";
    public static final int PAGE_SIZE = 20;
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Config.APP_NAME + " (page size " + Config.PAGE_SIZE + ")");
    }
}
```

### Example 3 — var for local inference

```java
import java.util.List;

public class VarDemo {
    public static void main(String[] args) {
        var name = "Ankit";          // String
        var marks = 92.5;            // double
        var subjects = List.of("Math", "CS", "Physics");   // List<String>
        System.out.println(name + " scored " + marks + " in " + subjects.size() + " subjects");
    }
}
```

## Common Mistakes

1. **Reassigning a `final` variable** — compile error; pick `final` only for true constants.
2. **Forgetting `static` on class constants** — instance `final` is per-object, not a shared constant.
3. **`var` without an initializer** — `var x;` won't compile; the type must be inferable.
4. **Wrong case convention** — constants should be `UPPER_SNAKE_CASE`, variables `camelCase`.
5. **Using `var` for fields/parameters** — `var` is for local variables only.
6. **Declaring unused variables** — the compiler warns; keep declarations close to use.

## Best Practices

- Initialize variables at declaration when possible.
- Use `final` liberally — it documents intent and prevents bugs.
- Prefer `static final` for shared constants (never magic numbers).
- Use `var` when the type is obvious; keep explicit types where clarity matters.
- Declare variables as close to first use as possible.

## Practice Questions

1. Declare a `final double PI` and compute a circle's circumference.
2. Write a class with two `static final` constants and print them from `main`.
3. Explain why `final int x = 5; x = 6;` fails to compile.
4. Use `var` to declare a `String`, an `int`, and a `List<Integer>`.
5. Convert a classic `public static void main(String[] args)` program into Java 25's compact `void main()` form.

## Multiple Choice Questions (MCQs)

### Q1. Which keyword makes a variable a constant (assign-once)?
- a) `static`
- b) `const`
- c) `final`
- d) `var`

**Answer:** c

### Q2. A shared class-level constant is best written as:
- a) `int MAX = 10;`
- b) `static final int MAX = 10;`
- c) `final int MAX = 10;`
- d) `var MAX = 10;`

**Answer:** b

### Q3. `var name = "Java";` makes `name` a:
- a) Dynamically typed variable
- b) `String` (statically typed, inferred)
- c) `Object`
- d) `char[]`

**Answer:** b

### Q4. `var` can be used for:
- a) Fields and parameters
- b) Local variables with an initializer
- c) Class names
- d) Return types only

**Answer:** b

### Q5. Java 25's compact `main` allows:
- a) No method at all
- b) `void main()` without `public static` (implicit class)
- c) `main()` returning `int` only
- d) Running `.class` without a JVM

**Answer:** b

## Key Takeaways

- Declare with `type name = value;`; mark constants `final`.
- `static final` = class constant, named `UPPER_SNAKE_CASE`.
- `var` (Java 10) infers local types; Java 25 finalizes compact `void main()` + `IO` class.
- Core Java stays fully valid — the new syntax is optional sugar.

## Next Topic

[2.2 Primitive Data Types](lesson-2.2-primitive-data-types.md)
