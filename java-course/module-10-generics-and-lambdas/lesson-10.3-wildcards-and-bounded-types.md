---
module: 10
topic: "10.3"
title: "Wildcards and Bounded Types"
slug: "wildcards-and-bounded-types"
difficulty: "Intermediate"
prerequisites:
  - Generic Classes and Methods
estimated_minutes: 30
tags:
  - java
  - generics
  - wildcards
  - bounded-types
---

# 10.3 Wildcards and Bounded Types

## Overview

Generic types are **invariant** (`List<String>` isn't a `List<Object>`), which is safe but inflexible. **Wildcards** — `?`, `? extends T`, and `? super T` — relax that where it's safe. They answer "how do I write a method that accepts *any* list of numbers, or that can *add* to a list of numbers?" This lesson teaches the **PECS** rule for using them.

## Learning Objectives

After this lesson you will be able to:

- Use unbounded, upper-bounded, and lower-bounded wildcards
- Write methods that read from (`? extends`) and write to (`? super`) collections
- Apply the PECS rule (Producer extends, Consumer super)
- Explain why wildcards keep generics type-safe
- Read method signatures with wildcards

## Core Concepts

### The invariance problem

```java
List<Integer> ints = List.of(1, 2, 3);
printAll(ints);          // fails if printAll(List<Object>)
```

```java
public static void printAll(List<Object> list) { }   // can't take List<Integer>
```

`List<Integer>` is **not** a `List<Object>`, so a method taking `List<Object>` rejects it. Wildcards fix this.

### Unbounded wildcard `?`

```java
public static void printAll(List<?> list) {          // any List, any type
    for (Object o : list) System.out.println(o);     // read as Object
}

printAll(List.of(1, 2, 3));
printAll(List.of("a", "b"));
```

`List<?>` = "a list of some unknown type". You can **read** elements (as `Object`), but you **can't add** (except `null`) — the element type is unknown.

### Upper-bounded wildcard `? extends T`

```java
public static double sum(List<? extends Number> list) {   // any Number subtype
    double total = 0;
    for (Number n : list) total += n.doubleValue();       // read as Number
    return total;
}

sum(List.of(1, 2, 3));           // List<Integer>
sum(List.of(1.5, 2.5));          // List<Double>
```

`? extends Number` accepts `List<Integer>`, `List<Double>`, etc. — but you can only **read** (produce) values as `Number`.

### Lower-bounded wildcard `? super T`

```java
public static void addNumbers(List<? super Integer> list) {   // Integer or above
    list.add(10);        // safe: Integer is always a valid element
    list.add(20);
}

addNumbers(new ArrayList<Number>());
addNumbers(new ArrayList<Object>());
```

`? super Integer` accepts `List<Integer>`, `List<Number>`, `List<Object>` — you can **write** (consume) `Integer` values safely.

### The PECS rule

- **P**roducer (you read from it) → **E**xtends: `? extends T`
- **C**onsumer (you write to it) → **S**uper: `? super T`

```java
public static <T> void copy(List<? extends T> src, List<? super T> dest) {
    for (T item : src) dest.add(item);   // src produces, dest consumes
}
```

## Visual — Wildcards

```
 List<?>            "list of unknown"   — read as Object, can't add
 List<? extends N>  "list of N or subtype" — read as N (producer)
 List<? super N>    "list of N or supertype" — add N (consumer)

         Object
           │
        Number      ←  ? super Integer  covers these
         ╱   ╲
    Integer  Double  ←  ? extends Number covers these
```

`extends` for reading (top-down), `super` for writing (bottom-up).

## Code Examples

### Example 1 — sum of any numbers

```java
import java.util.List;

public class Sum {
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) total += n.doubleValue();
        return total;
    }

    public static void main(String[] args) {
        System.out.println(sum(List.of(1, 2, 3)));        // 6.0
        System.out.println(sum(List.of(1.5, 2.5, 3.0)));  // 7.0
    }
}
```

### Example 2 — writing with super

```java
import java.util.ArrayList;
import java.util.List;

public class Add {
    public static void addIntegers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
    }

    public static void main(String[] args) {
        List<Number> nums = new ArrayList<>();
        addIntegers(nums);
        System.out.println(nums);   // [1, 2]
    }
}
```

### Example 3 — generic copy (PECS)

```java
import java.util.ArrayList;
import java.util.List;

public class Copy {
    public static <T> void copy(List<? extends T> src, List<? super T> dest) {
        dest.addAll(src);
    }

    public static void main(String[] args) {
        List<Integer> ints = List.of(1, 2, 3);
        List<Number> nums = new ArrayList<>();
        copy(ints, nums);
        System.out.println(nums);   // [1, 2, 3]
    }
}
```

## Common Mistakes

1. **Trying to add to `List<? extends T>`** — you can't write into a producer.
2. **Trying to read a specific type from `List<? super T>`** — elements come back as `Object`.
3. **Using `?` everywhere** — prefer concrete types or type parameters when possible.
4. **Confusing `? extends` and `? super`** — remember PECS.
5. **Wildcards in class declarations** — `class C<?>` is invalid; wildcards are for use in methods/fields.
6. **Assuming `List<Object>` is a supertype of `List<String>`** — it isn't; use `List<?>`.

## Best Practices

- Use `? extends T` when the method only reads; `? super T` when it only writes.
- Use a type parameter `<T>` when the method both reads and writes the same type.
- Apply PECS to design flexible, correct APIs.
- Don't use wildcards as return types of public methods (confuses callers) — prefer `<T>`.

## Practice Questions

1. Write `printAll(List<?>)` and call it with `List<Integer>` and `List<String>`.
2. Write `sum(List<? extends Number>)` and call it with two number types.
3. Write a method that adds integers to a `List<? super Integer>`.
4. Implement a generic `copy` method using PECS.
5. Explain the PECS rule in your own words.

## Multiple Choice Questions (MCQs)

### Q1. `List<?>` means:
- a) A list of Object
- b) A list of some unknown type
- c) A raw list
- d) An empty list

**Answer:** b

### Q2. `? extends Number` is a:
- a) Lower-bounded wildcard
- b) Upper-bounded wildcard
- c) Unbounded wildcard
- d) Type parameter

**Answer:** b

### Q3. With `List<? extends Number>`, you can:
- a) Add any Number
- b) Read elements as Number
- c) Add null only
- d) Read as Integer only

**Answer:** b

### Q4. `List<? super Integer>` allows you to:
- a) Add Integer values
- b) Read as Integer
- c) Add String values
- d) Add only null

**Answer:** a

### Q5. PECS stands for:
- a) Producer extends, Consumer super
- b) Producer super, Consumer extends
- c) Public extends, Class super
- d) Parent extends, Child super

**Answer:** a

## Key Takeaways

- Wildcards relax invariance: `?` (unknown), `? extends T` (read), `? super T` (write).
- PECS: Producer → `extends`, Consumer → `super`.
- `List<?>` reads as `Object`, can't add; `? extends` reads as `T`; `? super` accepts `T`.
- Prefer type parameters `<T>` for read+write methods.

## Next Topic

[10.4 Lambda Expressions](lesson-10.4-lambda-expressions.md)
