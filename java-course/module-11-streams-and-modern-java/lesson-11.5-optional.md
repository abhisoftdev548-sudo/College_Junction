---
module: 11
topic: "11.5"
title: "Optional"
slug: "optional"
difficulty: "Intermediate"
prerequisites:
  - Collectors
estimated_minutes: 30
tags:
  - java
  - optional
  - null-safety
---

# 11.5 Optional

## Overview

**`Optional<T>`** is a container that may or may not hold a value — Java's tool for fighting `NullPointerException`. Instead of returning `null`, methods return `Optional` and force callers to handle the "no value" case explicitly. Introduced in Java 8, it integrates beautifully with streams (`findFirst`, `min`, `max`).

## Learning Objectives

After this lesson you will be able to:

- Create `Optional` with `of`, `ofNullable`, `empty`
- Extract values with `orElse`, `orElseGet`, `orElseThrow`
- Use `ifPresent` and `ifPresentOrElse`
- Transform with `map`/`flatMap` and filter
- Replace null-returning code with `Optional`

## Core Concepts

### Creating Optionals

```java
Optional<String> present = Optional.of("hello");        // non-null only (throws on null)
Optional<String> nullable = Optional.ofNullable(maybeNull);  // null → empty
Optional<String> empty = Optional.empty();              // no value
```

Use `of` when the value is definitely non-null; `ofNullable` when it might be null.

### Checking and extracting

```java
optional.isPresent();        // true if a value exists (old style)
optional.isEmpty();          // true if empty (Java 11)

optional.get();              // value, but throws NoSuchElementException if empty
optional.orElse("default");  // value or default
optional.orElseGet(() -> computeDefault());   // value or lazily-computed default
optional.orElseThrow();      // value or throw (Java 10 no-arg)
optional.orElseThrow(() -> new MyException("missing"));
```

**Prefer `orElse`/`orElseGet`/`orElseThrow` over `get()`** — `get()` defeats the safety.

### ifPresent / ifPresentOrElse

```java
optional.ifPresent(v -> System.out.println(v));   // run only if present

optional.ifPresentOrElse(
    v -> System.out.println("Got " + v),          // present
    () -> System.out.println("Empty")             // empty
);   // Java 9
```

### Transforming with map / flatMap

```java
Optional<String> name = Optional.of("ankit");

Optional<Integer> len = name.map(String::length);      // Optional[5]
Optional<String> up = name.filter(s -> s.length() > 3);  // Optional[ankit]

// flatMap for transformations that return Optional:
Optional<String> cleaned = name.flatMap(s -> s.isBlank() ? Optional.empty() : Optional.of(s.trim()));
```

`map` wraps the result in an `Optional`; `flatMap` expects the lambda to return an `Optional` (avoiding nested `Optional<Optional<T>>`).

### The null-returning pattern it replaces

```java
// Old (dangerous):
public String findName(int id) {
    return id == 1 ? "Ankit" : null;   // caller might forget to check null
}

// New (safe):
public Optional<String> findName(int id) {
    return id == 1 ? Optional.of("Ankit") : Optional.empty();
}

String name = findName(1).orElse("unknown");
```

### With streams

```java
Optional<Integer> firstEven = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findFirst();                        // Optional, not a crash

int result = firstEven.orElse(-1);
```

## Visual — Optional as a Box

```
 Optional<T>
 ┌─────────────┐         ┌─────────────┐
 │  value: 42  │   OR    │  (empty)    │
 └─────────────┘         └─────────────┘
  orElse(0) → 42          orElse(0) → 0
  orElseThrow() → 42      orElseThrow() → throws
```

Instead of `null` (which crashes on use), `Optional` makes "no value" explicit and safe.

## Code Examples

### Example 1 — Safe lookup

```java
import java.util.*;

public class SafeLookup {
    static Map<String, String> users = Map.of("u1", "Ankit", "u2", "Riya");

    public static Optional<String> find(String id) {
        return Optional.ofNullable(users.get(id));
    }

    public static void main(String[] args) {
        System.out.println(find("u1").orElse("unknown"));   // Ankit
        System.out.println(find("u9").orElse("unknown"));   // unknown
    }
}
```

### Example 2 — ifPresentOrElse

```java
import java.util.Optional;

public class PresentOrElse {
    public static void main(String[] args) {
        Optional<String> opt = Optional.of("Java");
        opt.ifPresentOrElse(
            v -> System.out.println("Value: " + v),
            () -> System.out.println("No value")
        );   // Value: Java

        Optional<String> empty = Optional.empty();
        empty.ifPresentOrElse(
            v -> System.out.println("Value: " + v),
            () -> System.out.println("No value")
        );   // No value
    }
}
```

### Example 3 — Chaining map/filter

```java
import java.util.Optional;

public class Chain {
    public static void main(String[] args) {
        Optional<String> email = Optional.of("  ANKIT@EXAMPLE.COM  ");

        String normalized = email
            .map(String::trim)
            .map(String::toLowerCase)
            .filter(e -> e.contains("@"))
            .orElse("invalid email");

        System.out.println(normalized);   // ankit@example.com
    }
}
```

## Common Mistakes

1. **Calling `.get()` without checking** — throws `NoSuchElementException`; use `orElse*`.
2. **`Optional.of(null)`** — throws `NullPointerException`; use `ofNullable`.
3. **Returning `Optional` from getters/serialization** — not idiomatic; use for return types of lookups.
4. **`orElse` with an expensive default** — `orElse` evaluates eagerly; use `orElseGet` for lazy defaults.
5. **`map` returning `Optional`** — gives `Optional<Optional<T>>`; use `flatMap`.
6. **Using `isPresent` + `get`** — `if (o.isPresent()) o.get()` is an anti-pattern; prefer `ifPresent`/`orElse`.

## Best Practices

- Return `Optional` from methods that may legitimately have "no result".
- Prefer `orElse`/`orElseGet`/`orElseThrow` over `get()`.
- Use `orElseGet` for expensive defaults; `orElse` for cheap constants.
- Use `map`/`flatMap`/`filter` to transform chains without unwrapping.
- Don't use `Optional` as a field or method parameter — it's for return values.

## Practice Questions

1. Write a `find` method returning `Optional<String>` and call it safely.
2. Use `orElseGet` with a lazily-computed default.
3. Chain `map` and `filter` on an `Optional` to normalize an email.
4. Show `ifPresentOrElse` with both branches.
5. Explain why `get()` is discouraged and what to use instead.

## Multiple Choice Questions (MCQs)

### Q1. `Optional.of(null)`:
- a) Returns empty
- b) Throws `NullPointerException`
- c) Returns `Optional.empty()`
- d) Returns null

**Answer:** b

### Q2. To provide a default value, use:
- a) `get()`
- b) `orElse(default)`
- c) `isPresent()`
- d) `of()`

**Answer:** b

### Q3. `Optional` was introduced in:
- a) Java 5
- b) Java 8
- c) Java 11
- d) Java 25

**Answer:** b

### Q4. `flatMap` on an `Optional`:
- a) Wraps in another Optional
- b) Expects a lambda returning Optional (avoids nesting)
- c) Filters the value
- d) Returns a list

**Answer:** b

### Q5. `optional.isEmpty()` was added in:
- a) Java 8
- b) Java 9
- c) Java 11
- d) Java 16

**Answer:** c

## Key Takeaways

- `Optional` = a box that may hold a value; replaces null returns.
- Create: `of`/`ofNullable`/`empty`; extract: `orElse`/`orElseGet`/`orElseThrow`.
- `ifPresent`/`ifPresentOrElse` (9), `map`/`flatMap`/`filter` transform safely.
- Avoid `get()` and `isPresent()+get()`; use stream-friendly methods.

## Module 11 Complete 🎉

You've finished **Module 11 — Streams and Modern Java**. Next up: **Module 12 — Multithreading and Concurrency**.
