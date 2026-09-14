---
module: 10
topic: "10.4"
title: "Lambda Expressions"
slug: "lambda-expressions"
difficulty: "Intermediate"
prerequisites:
  - Wildcards and Bounded Types
estimated_minutes: 30
tags:
  - java
  - lambdas
  - functional-programming
---

# 10.4 Lambda Expressions

## Overview

A **lambda expression** is a compact way to write an anonymous function — code you can pass around and execute later. Introduced in Java 8, lambdas turned verbose anonymous inner classes into one-liners and enabled a functional style: `list.forEach(x -> ...)`, `list.stream().filter(...)`, and callbacks. They're the key to Java's functional features.

## Learning Objectives

After this lesson you will be able to:

- Write lambdas with the `(args) -> body` syntax
- Convert anonymous inner classes into lambdas
- Use lambdas with `forEach`, `sort`, `removeIf`, and streams
- Capture effectively-final variables
- Use method references as shorthand

## Core Concepts

### Lambda syntax

```java
(parameters) -> expression
(parameters) -> { statements; }
```

```java
() -> 42                              // no params, returns 42
x -> x * 2                            // one param (parens optional), returns x*2
(x, y) -> x + y                       // two params
(String s) -> s.length()              // explicit type (optional)
(x, y) -> { int z = x + y; return z; }   // block body with return
```

### Before lambdas — anonymous inner class

```java
Runnable r = new Runnable() {              // old way (verbose)
    @Override
    public void run() {
        System.out.println("running");
    }
};

// With a lambda:
Runnable r2 = () -> System.out.println("running");   // same thing, one line
```

A lambda works wherever a **functional interface** (an interface with one abstract method) is expected.

### Using lambdas with common APIs

```java
// forEach
List<String> names = List.of("Ankit", "Riya");
names.forEach(name -> System.out.println(name));

// sort with a comparator
names.sort((a, b) -> a.compareTo(b));

// removeIf
List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4));
nums.removeIf(n -> n % 2 == 0);       // remove evens
```

### Lambda bodies and returns

```java
Function<Integer, Integer> square = x -> x * x;          // expression body (implicit return)
Function<Integer, Integer> square2 = x -> { return x * x; };   // block body (explicit return)
```

Expression bodies return automatically; block bodies need `return`.

### Effectively final variables

```java
String prefix = "Hello, ";
// prefix = "Hi, ";              // if reassigned, it's not effectively final
names.forEach(n -> System.out.println(prefix + n));   // captures prefix
```

Lambdas can **capture** local variables that are **effectively final** (never reassigned) — they cannot modify them.

### Method references

```java
names.forEach(System.out::println);        // instance method reference
names.sort(String::compareTo);             // class method reference
List<Integer> lengths = names.stream()
    .map(String::length)                   // method reference instead of s -> s.length()
    .toList();
```

Method references (`Class::method`) are shorthand for simple lambdas.

## Visual — Lambda Structure

```
 (x, y)  ->  x + y
   │          │
   │          └── body (expression → returned)
   └── parameters

 Runnable r = () -> System.out.println("hi");
              ↑
              empty parens = no parameters
```

A lambda = parameters + arrow + body, assigned to a functional interface.

## Code Examples

### Example 1 — Sort with a lambda

```java
import java.util.*;

public class Sort {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Rohan", "Ankit", "Priya"));
        names.sort((a, b) -> a.length() - b.length());   // sort by length
        System.out.println(names);   // [Ankit, Priya, Rohan]
    }
}
```

### Example 2 — Runnable with a lambda

```java
public class Threads {
    public static void main(String[] args) {
        Runnable task = () -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Tick " + i);
            }
        };
        new Thread(task).start();
    }
}
```

### Example 3 — Streams with lambdas

```java
import java.util.List;

public class Streams {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
        List<Integer> evens = nums.stream()
            .filter(n -> n % 2 == 0)        // keep evens
            .map(n -> n * n)                // square them
            .toList();
        System.out.println(evens);          // [4, 16, 36]
    }
}
```

## Common Mistakes

1. **Using a lambda where a non-functional interface is expected** — lambdas need a single abstract method.
2. **Modifying captured variables** — captured locals must be effectively final.
3. **Ambiguous overloads** — a lambda's target type must be unambiguous; cast if needed.
4. **Forgetting `return` in a block body** — `{ x * x }` needs `return x * x;`.
5. **Confusing `()` for zero params with one param** — `x -> ...` is one param; `() -> ...` is zero.
6. **Trying to use `this` inside a lambda expecting it to be the enclosing anonymous class** — `this` is the enclosing instance.

## Best Practices

- Use lambdas for short, readable operations; name complex logic in a method.
- Prefer method references over trivial lambdas (`String::length` vs `s -> s.length()`).
- Keep lambdas side-effect-light, especially in streams.
- Use expression bodies for one-liners, block bodies for multi-step logic.
- Use the functional interfaces from `java.util.function` (10.5).

## Practice Questions

1. Write a lambda that squares an integer and assign it to `Function<Integer, Integer>`.
2. Sort a list of strings by length using a lambda comparator.
3. Use `forEach` with a lambda to print a list.
4. Convert an anonymous `Runnable` into a lambda.
5. Use `removeIf` with a lambda to remove negative numbers.

## Multiple Choice Questions (MCQs)

### Q1. Lambdas were introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** c

### Q2. The lambda `x -> x * 2`:
- a) Has no parameters
- b) Has one parameter and returns x*2
- c) Has two parameters
- d) Prints x*2

**Answer:** b

### Q3. A lambda requires a target of type:
- a) Any interface
- b) A functional interface (one abstract method)
- c) Any class
- d) `Object`

**Answer:** b

### Q4. Variables captured by a lambda must be:
- a) Static
- b) Effectively final
- c) Public
- d) Mutable

**Answer:** b

### Q5. `String::length` is a:
- a) Lambda
- b) Method reference
- c) Cast
- d) Constructor

**Answer:** b

## Key Takeaways

- Lambda = `(args) -> body`; assign to a functional interface.
- Replaces anonymous inner classes; works with `forEach`, `sort`, `removeIf`, streams.
- Captured locals must be effectively final.
- Method references (`Class::method`) are concise lambdas.

## Next Topic

[10.5 Functional Interfaces](lesson-10.5-functional-interfaces.md)
