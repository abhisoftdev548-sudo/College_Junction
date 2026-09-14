---
module: 4
topic: "4.1"
title: "Introduction to Methods"
slug: "introduction-to-methods"
difficulty: "Beginner"
prerequisites:
  - Control Flow
estimated_minutes: 30
tags:
  - java
  - methods
  - functions
---

# 4.1 Introduction to Methods

## Overview

A **method** is a named block of code that performs one task and can be called (invoked) from anywhere in your program. Methods are the foundation of code reuse: write once, use many times, and give a complex operation a readable name. Every Java program you've written has already used one — `main`.

## Learning Objectives

After this lesson you will be able to:

- Explain why methods matter (reuse, readability, organization)
- Declare a method and call it
- Distinguish methods that return a value from `void` methods
- Follow Java naming conventions for methods
- Understand the role of `main` as the entry-point method

## Core Concepts

### Anatomy of a method

```java
public static void greet() {        // method signature + body
    System.out.println("Hello!");
}
```

```text
[modifiers] returnType name(parameters) { body }
    public static  void  greet ( )  { ... }
```

- **Modifiers** — `public`/`private`, `static`, etc. (access control, Module 6).
- **Return type** — the type of value the method gives back, or `void` for nothing.
- **Name** — follows **camelCase**, usually a verb (`calculateTotal`, `sendEmail`).
- **Parameters** — inputs in parentheses (can be empty).
- **Body** — the statements to run.

### Calling a method

```java
public class Main {
    public static void greet() {
        System.out.println("Hello!");
    }

    public static void main(String[] args) {
        greet();          // call the method
        greet();          // call again — reuse!
    }
}
```

A `static` method is called by name from `main` (since `main` is also static). Non-static (instance) methods come in Module 6.

### Return value vs void

```java
public static int add(int a, int b) {   // returns an int
    return a + b;
}

public static void show(int x) {        // returns nothing
    System.out.println(x);
}
```

A method with a return type **must** `return` a value of that type; a `void` method must not return a value (but may `return;` early).

### Method naming conventions

```java
getValue();        // verbs, camelCase
calculateArea();
isValid();         // boolean methods often "is"/"has"/"can"
printReport();
```

## Visual — Calling a Method

```
 main() {
     greet();            ──┐
 }                        │  control jumps to the method
                          ▼
 void greet() {
     System.out.println("Hello!");
 }                        ──┐
                            │  method ends, control returns
     greet();            ◀──┘  (back to the call site)
 }
```

Each call jumps to the method, runs its body, and returns to the next statement.

## Code Examples

### Example 1 — Reuse with a method

```java
public class Reuse {
    public static void printSeparator() {
        System.out.println("------------------------");
    }

    public static void main(String[] args) {
        System.out.println("Section 1");
        printSeparator();
        System.out.println("Section 2");
        printSeparator();
    }
}
```

### Example 2 — Method that returns a value

```java
public class ReturnDemo {
    public static int doubleIt(int x) {
        return x * 2;
    }

    public static void main(String[] args) {
        int result = doubleIt(21);
        System.out.println(result);   // 42
    }
}
```

### Example 3 — Organizing a program into methods

```java
public class Calculator {
    public static void printMenu() {
        System.out.println("1. Add  2. Subtract  3. Quit");
    }

    public static void main(String[] args) {
        printMenu();
        // ... rest of the calculator
    }
}
```

## Common Mistakes

1. **Calling a method without declaring it** — the method must exist (or be declared) before use.
2. **Forgetting the return type** — `public static add(...)` is invalid; every method needs a type or `void`.
3. **Void method used as a value** — `int x = printSomething();` fails; `void` returns nothing.
4. **Missing `return` in a non-void method** — the compiler rejects paths without a return.
5. **Wrong case convention** — methods are `camelCase` (not `CamelCase` or `snake_case`).
6. **Writing a method inside another method** — Java methods can't be nested inside method bodies.

## Best Practices

- One method = one clear task (name it with a verb).
- Keep methods short (a screenful or less).
- Reuse instead of copy-pasting the same code.
- Return values rather than printing inside methods (more flexible).
- Declare methods in a readable order and group related ones.

## Practice Questions

1. Write a `greet(String name)` method and call it twice with different names.
2. Write a method `square(int n)` that returns `n * n` and print its result.
3. Write a `printHeader(String title)` method used by a small program.
4. Explain the difference between a `void` method and one that returns a value.
5. Refactor a small program you wrote earlier so its repeated logic is in a method.

## Multiple Choice Questions (MCQs)

### Q1. Which is the correct method declaration?
- a) `public void greet()`
- b) `public greet()`
- c) `void public greet()`
- d) `public static greet`

**Answer:** a

### Q2. A method that returns nothing uses which return type?
- a) `null`
- b) `void`
- c) `empty`
- d) `none`

**Answer:** b

### Q3. Method names conventionally use:
- a) camelCase
- b) UPPER_SNAKE_CASE
- c) PascalCase
- d) kebab-case

**Answer:** a

### Q4. A non-void method must:
- a) Print its result
- b) Return a value of its declared type
- c) Take parameters
- d) Be `static`

**Answer:** b

### Q5. The entry point of every Java program is:
- a) `start()`
- b) `run()`
- c) `main()`
- d) `execute()`

**Answer:** c

## Key Takeaways

- Methods = named, reusable blocks: `[modifiers] returnType name(params) { body }`.
- `void` methods do work; non-void methods return a value.
- Name methods with verbs in camelCase; keep them short and single-purpose.
- `main` is the special entry-point method the JVM calls first.

## Next Topic

[4.2 Parameters and Return Values](lesson-4.2-parameters-and-return-values.md)
