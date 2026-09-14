---
module: 11
topic: "11.2"
title: "Intermediate Operations"
slug: "intermediate-operations"
difficulty: "Intermediate"
prerequisites:
  - Introduction to Streams
estimated_minutes: 30
tags:
  - java
  - streams
  - intermediate-operations
---

# 11.2 Intermediate Operations

## Overview

**Intermediate operations** transform a stream into another stream — they're the shaping steps of a pipeline. The workhorses are `filter` (select), `map` (transform), `flatMap` (flatten), `distinct`, `sorted`, `limit`/`skip`, plus the modern `takeWhile`/`dropWhile`. They're lazy: they just describe what to do until a terminal operation runs.

## Learning Objectives

After this lesson you will be able to:

- Filter, map, and flatten streams
- Remove duplicates and sort
- Limit, skip, and inspect with `peek`
- Use `takeWhile`/`dropWhile` (Java 9)
- Chain intermediate operations into a pipeline

## Core Concepts

### filter — keep matching elements

```java
Stream<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0);        // Predicate → keep only evens
```

### map — transform each element

```java
Stream<String> lengths = names.stream()
    .map(n -> n.toUpperCase());      // Function → one output per input
```

### flatMap — flatten nested structures

```java
List<List<Integer>> nested = List.of(List.of(1, 2), List.of(3, 4));

List<Integer> flat = nested.stream()
    .flatMap(List::stream)           // each List → its own stream, merged
    .toList();                       // [1, 2, 3, 4]
```

`map` gives you a stream of lists; `flatMap` gives you a stream of elements.

### distinct — remove duplicates

```java
Stream.of(1, 2, 2, 3, 3, 3)
    .distinct()
    .toList();                       // [1, 2, 3]
```

### sorted — order the stream

```java
Stream.of("banana", "apple", "cherry").sorted().toList();      // natural order
people.stream().sorted(Comparator.comparing(Person::age));     // custom comparator
```

### limit and skip

```java
Stream.iterate(1, n -> n + 1)
    .limit(5)                        // first 5 → 1,2,3,4,5
    .skip(2)                         // drop first 2 → 3,4,5
    .toList();
```

`limit(n)` truncates; `skip(n)` drops the first n. Useful for pagination.

### peek — inspect (debugging)

```java
numbers.stream()
    .peek(n -> System.out.println("before: " + n))
    .filter(n -> n > 2)
    .peek(n -> System.out.println("after: " + n))
    .toList();
```

`peek` passes each element through while running a side effect — handy for debugging.

### takeWhile / dropWhile (Java 9)

```java
Stream.of(1, 2, 3, 4, 1)
    .takeWhile(n -> n < 4).toList();   // [1, 2, 3] — stops at first failure
Stream.of(1, 2, 3, 4, 1)
    .dropWhile(n -> n < 4).toList();   // [4, 1] — drops until first failure
```

Unlike `filter`, they stop at the **first** element that fails the predicate (they don't scan the rest).

### Chaining

```java
List<String> result = words.stream()
    .filter(w -> w.length() > 2)
    .map(String::toLowerCase)
    .distinct()
    .sorted()
    .toList();
```

Order matters — `filter` before `map` avoids work on dropped elements.

## Visual — Each Operation

```
 [1, 2, 2, 3, 4]  (source)
   ├─ filter (n>1)     → [2, 2, 3, 4]
   ├─ map    (n*10)    → [20, 20, 30, 40]
   ├─ distinct         → [20, 30, 40]
   ├─ sorted           → [20, 30, 40]
   └─ limit  (2)       → [20, 30]

 flatMap: [[1,2],[3,4]] ──▶ [1, 2, 3, 4]
```

Intermediate ops return new streams, so you can chain them in any order.

## Code Examples

### Example 1 — filter + map + sorted

```java
import java.util.List;

public class Pipeline {
    public static void main(String[] args) {
        List<String> words = List.of("cat", "elephant", "dog", "tiger", "ant");

        List<String> result = words.stream()
            .filter(w -> w.length() >= 4)      // elephant, tiger
            .map(String::toUpperCase)          // ELEPHANT, TIGER
            .sorted()                          // ELEPHANT, TIGER
            .toList();
        System.out.println(result);            // [ELEPHANT, TIGER]
    }
}
```

### Example 2 — flatMap

```java
import java.util.List;

public class Flatten {
    public static void main(String[] args) {
        List<List<Integer>> groups = List.of(
            List.of(1, 2),
            List.of(3, 4, 5),
            List.of(6)
        );
        List<Integer> all = groups.stream()
            .flatMap(List::stream)
            .toList();
        System.out.println(all);   // [1, 2, 3, 4, 5, 6]
    }
}
```

### Example 3 — limit + skip (pagination)

```java
import java.util.List;
import java.util.stream.IntStream;

public class Paginate {
    public static void main(String[] args) {
        int page = 2, size = 5;
        List<Integer> pageData = IntStream.rangeClosed(1, 30)   // 1..30
            .boxed()
            .skip((page - 1) * size)     // skip first page
            .limit(size)                 // take this page
            .toList();
        System.out.println(pageData);    // [6, 7, 8, 9, 10]
    }
}
```

## Common Mistakes

1. **Using `map` where `flatMap` is needed** — `map` on `List<List>` gives nested lists.
2. **Expecting `takeWhile` to filter out all non-matching** — it stops at the first non-match.
3. **Ordering `sorted` before `limit`** — sorts everything when you might only need the top few.
4. **Side effects in `map`/`filter`** — keep them pure; use `peek` for debugging only.
5. **Sorting with a bad comparator** — inconsistent comparator gives unpredictable order.
6. **`peek` in production** — remove debug peeks; they're not guaranteed to run in some terminal ops.

## Best Practices

- Chain `filter` → `map` → `sorted` → `limit` in an order that minimizes work.
- Use `flatMap` to flatten nested collections.
- Use `takeWhile`/`dropWhile` on sorted/ordered streams for early stopping.
- Keep intermediate lambdas pure and side-effect-free.
- Use method references (`String::toUpperCase`) for readability.

## Practice Questions

1. Given a list of numbers, filter even, map to square, and collect.
2. Flatten a list of lists of strings into one list of strings.
3. Deduplicate and sort a list of words.
4. Implement pagination with `skip` and `limit`.
5. Demonstrate the difference between `takeWhile` and `filter`.

## Multiple Choice Questions (MCQs)

### Q1. `filter` uses which functional interface?
- a) `Function`
- b) `Predicate`
- c) `Consumer`
- d) `Supplier`

**Answer:** b

### Q2. `map` transforms:
- a) One input to one output
- b) One input to many outputs
- c) Inputs to a boolean
- d) Nothing

**Answer:** a

### Q3. To flatten `List<List<T>>` into `Stream<T>`, use:
- a) `map`
- b) `flatMap`
- c) `filter`
- d) `reduce`

**Answer:** b

### Q4. `takeWhile` (Java 9):
- a) Filters out all non-matching
- b) Stops at the first non-matching element
- c) Sorts the stream
- d) Drops duplicates

**Answer:** b

### Q5. `distinct()` removes:
- a) Nulls
- b) Duplicate elements
- c) Empty strings
- d) The first element

**Answer:** b

## Key Takeaways

- Core intermediate ops: `filter`, `map`, `flatMap`, `distinct`, `sorted`, `limit`, `skip`, `peek`.
- Java 9: `takeWhile`/`dropWhile` (early stop).
- All lazy — chain them; order affects performance.
- Keep them pure; `flatMap` flattens nested streams.

## Next Topic

[11.3 Terminal Operations](lesson-11.3-terminal-operations.md)
