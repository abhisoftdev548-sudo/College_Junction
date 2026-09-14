---
module: 10
topic: "10.5"
title: "Functional Interfaces"
slug: "functional-interfaces"
difficulty: "Intermediate"
prerequisites:
  - Lambda Expressions
estimated_minutes: 30
tags:
  - java
  - functional-interfaces
  - java.util.function
---

# 10.5 Functional Interfaces

## Overview

A **functional interface** is an interface with exactly **one abstract method** — the shape a lambda fills. Java 8 shipped the `java.util.function` package with the standard ones: `Predicate`, `Function`, `Consumer`, `Supplier`, and more. Knowing them lets you read modern APIs, compose behaviour with `andThen`/`compose`, and write your own with `@FunctionalInterface`.

## Learning Objectives

After this lesson you will be able to:

- Identify and write functional interfaces (`@FunctionalInterface`)
- Use `Predicate`, `Function`, `Consumer`, and `Supplier`
- Compose functions with `andThen`/`compose` and predicates with `and`/`or`/`negate`
- Use `BiFunction`, `BinaryOperator`, and primitive variants
- Recognize functional interfaces in streams and `Optional`

## Core Concepts

### What makes an interface functional

```java
@FunctionalInterface
public interface Greeting {
    String greet(String name);       // exactly ONE abstract method

    // default/static methods don't count:
    default String greetLoudly(String name) { return greet(name).toUpperCase(); }
}
```

`@FunctionalInterface` is optional but lets the compiler enforce the single-abstract-method rule.

### The big four in java.util.function

```java
Predicate<T>      boolean test(T t)          // a condition/test
Function<T, R>    R apply(T t)               // transform T → R
Consumer<T>       void accept(T t)           // do something with T
Supplier<T>       T get()                    // supply a value
```

```java
Predicate<Integer> isEven = n -> n % 2 == 0;
isEven.test(4);                              // true

Function<String, Integer> length = String::length;
length.apply("hello");                       // 5

Consumer<String> printer = System.out::println;
printer.accept("hi");                        // prints hi

Supplier<Double> random = Math::random;
random.get();                                // a random double
```

### Bi and operator variants

```java
BiFunction<T, U, R>   R apply(T t, U u)      // two inputs, one output
BinaryOperator<T>     T apply(T a, T b)      // two same-type inputs, same output
UnaryOperator<T>      T apply(T t)           // one input/output of same type

BinaryOperator<Integer> add = (a, b) -> a + b;
add.apply(2, 3);                             // 5
```

### Composing functions

```java
Function<Integer, Integer> addOne = x -> x + 1;
Function<Integer, Integer> doubleIt = x -> x * 2;

Function<Integer, Integer> f = addOne.andThen(doubleIt);   // (x+1)*2
f.apply(3);   // 8

Function<Integer, Integer> g = addOne.compose(doubleIt);   // (x*2)+1
g.apply(3);   // 7
```

`andThen` runs the caller first, then the argument; `compose` runs the argument first.

### Composing predicates

```java
Predicate<Integer> positive = n -> n > 0;
Predicate<Integer> even = n -> n % 2 == 0;

positive.and(even).test(4);    // true  (positive AND even)
positive.or(even).test(-2);    // true  (positive OR even)
positive.negate().test(-5);    // true  (NOT positive)
```

### Where you'll meet them

```java
list.removeIf(n -> n < 0);                 // Predicate
list.stream().map(String::toUpperCase);    // Function
list.forEach(System.out::println);         // Consumer
Optional.ofNullable(x).orElseGet(() -> 0); // Supplier
```

## Modern Java / Java 25 Update

### JEP 502 — Stable Values (Preview in Java 25) use Suppliers

Java 25's **Stable Values** (preview) build directly on functional interfaces — a `StableValue` initializes lazily from a `Supplier`:

```java
import jdk.incubator.concurrent.StableValue;

StableValue<ExpensiveObject> obj = StableValue.supplier(() -> expensiveSetup());
// the Supplier runs AT MOST ONCE, lazily — first get() computes, later get() reuse
obj.get();
```

`StableValue.supplier(...)` takes a `Supplier<T>` — exactly the interface from this lesson — showing how lambdas/functional interfaces remain the foundation of Java's modern concurrency features.

## Visual — The java.util.function Core

```
 Function<T,R>  T ──▶ R      transform (map)
 Predicate<T>   T ──▶ boolean  test (filter)
 Consumer<T>    T ──▶ (void)   act (forEach)
 Supplier<T>    (void) ──▶ T   produce (orElseGet)
```

Each is a role your lambda can fill — the compiler matches the lambda to the interface.

## Code Examples

### Example 1 — Using the big four

```java
import java.util.function.*;

public class BigFour {
    public static void main(String[] args) {
        Predicate<String> longWord = s -> s.length() > 5;
        Function<String, Integer> len = String::length;
        Consumer<String> show = System.out::println;
        Supplier<Double> rand = Math::random;

        show.accept("hello");                  // hello
        System.out.println(longWord.test("hello"));      // false
        System.out.println(len.apply("hello"));          // 5
        System.out.println(rand.get());                  // random double
    }
}
```

### Example 2 — Function composition

```java
import java.util.function.Function;

public class Compose {
    public static void main(String[] args) {
        Function<String, String> trim = String::trim;
        Function<String, String> upper = String::toUpperCase;
        Function<String, String> pipeline = trim.andThen(upper);

        System.out.println(pipeline.apply("  hello  "));   // HELLO
    }
}
```

### Example 3 — Custom functional interface

```java
@FunctionalInterface
interface Validator {
    boolean isValid(String input);

    default Validator and(Validator other) {
        return input -> this.isValid(input) && other.isValid(input);
    }
}

public class Custom {
    public static void main(String[] args) {
        Validator notEmpty = s -> s != null && !s.isBlank();
        Validator shortEnough = s -> s.length() <= 10;

        Validator combined = notEmpty.and(shortEnough);
        System.out.println(combined.isValid("Ankit"));   // true
        System.out.println(combined.isValid("aVeryLongNameHere"));   // false
    }
}
```

## Common Mistakes

1. **Two abstract methods** — the interface isn't functional; a lambda can't target it.
2. **Forgetting the return type** — `Function` needs both `T` and `R`.
3. **Confusing `andThen` and `compose` order** — `f.andThen(g)` = f then g; `f.compose(g)` = g then f.
4. **`Predicate` vs `Function<Boolean>`** — use `Predicate` for tests.
5. **Writing your own interface when `java.util.function` has one** — reuse the standard ones.
6. **Primitives** — `Function<Integer, ...>` boxes; use `IntFunction`/`ToIntFunction` when performance matters.

## Best Practices

- Mark custom functional interfaces with `@FunctionalInterface`.
- Prefer the standard `java.util.function` interfaces over custom ones.
- Use method references to fill functions concisely.
- Compose with `andThen`/`compose`/`and`/`or`/`negate` instead of nesting lambdas.
- Use primitive specializations (`IntPredicate`, `LongFunction`) in hot paths.

## Practice Questions

1. Use a `Predicate` to test if a number is positive and even.
2. Use a `Function` to convert a string to its length, composed with `x -> x * 2`.
3. Use a `Consumer` to print each element of a list.
4. Use a `Supplier` to lazily provide a default value.
5. Write a custom `@FunctionalInterface` with a default `and` method.

## Multiple Choice Questions (MCQs)

### Q1. A functional interface has:
- a) Two abstract methods
- b) Exactly one abstract method
- c) Only default methods
- d) No methods

**Answer:** b

### Q2. `Predicate<T>`'s method is:
- a) `apply`
- b) `test`
- c) `accept`
- d) `get`

**Answer:** b

### Q3. `Function<T, R>` transforms:
- a) T to boolean
- b) T to R
- c) R to T
- d) nothing to T

**Answer:** b

### Q4. `f.andThen(g)` executes:
- a) g then f
- b) f then g
- c) f and g in parallel
- d) Neither

**Answer:** b

### Q5. `@FunctionalInterface`:
- a) Is required for all interfaces
- b) Lets the compiler enforce the single-abstract-method rule
- c) Makes the interface final
- d) Adds a default method

**Answer:** b

## Key Takeaways

- Functional interface = one abstract method; mark with `@FunctionalInterface`.
- `Predicate`/`Function`/`Consumer`/`Supplier` + `BiFunction`/`BinaryOperator`.
- Compose with `andThen`/`compose`; combine predicates with `and`/`or`/`negate`.
- Java 25's Stable Values (JEP 502, preview) consume `Supplier` — functional interfaces are everywhere.

## Module 10 Complete 🎉

You've finished **Module 10 — Generics and Lambdas**. Next up: **Module 11 — Streams and Modern Java**.
