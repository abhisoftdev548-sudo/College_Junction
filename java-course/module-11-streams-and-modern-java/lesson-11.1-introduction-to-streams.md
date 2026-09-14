---
module: 11
topic: "11.1"
title: "Introduction to Streams"
slug: "introduction-to-streams"
difficulty: "Intermediate"
prerequisites:
  - Lambdas and Functional Interfaces
estimated_minutes: 30
tags:
  - java
  - streams
  - functional-programming
---

# 11.1 Introduction to Streams

## Overview

A **Stream** is a sequence of elements processed in a pipeline — filter, map, reduce — in a declarative, functional style. Unlike collections (which store data), streams **carry** data through a pipeline of operations and are **lazy**: intermediate operations do nothing until a terminal operation runs. Introduced in Java 8, streams are the heart of modern Java data processing.

## Learning Objectives

After this lesson you will be able to:

- Explain what a stream is and how it differs from a collection
- Build a stream pipeline (source → intermediate → terminal)
- Understand laziness and single-use streams
- Create streams from collections, arrays, and values
- Recognize the benefits of declarative processing

## Core Concepts

### A stream pipeline

```java
List<String> names = List.of("Ankit", "Riya", "Rohan", "Aman");

long count = names.stream()                    // source
    .filter(n -> n.startsWith("A"))            // intermediate (lazy)
    .map(String::toUpperCase)                  // intermediate (lazy)
    .count();                                  // terminal (runs the pipeline)

System.out.println(count);   // 2 (ANKIT, AMAN)
```

A pipeline has three parts:

1. **Source** — where the stream comes from (`.stream()`, `Stream.of`, `IntStream.range`).
2. **Intermediate operations** — transform the stream, return a new stream, are **lazy**.
3. **Terminal operation** — consumes the stream and produces a result, **triggers** execution.

### Streams vs collections

| | Collection | Stream |
|---|---|---|
| Storage | stores all data | no storage — carries data |
| Reuse | reusable | single-use (consumed after a terminal op) |
| Evaluation | eager | lazy (intermediate ops wait for a terminal op) |
| Size | fixed | can be infinite |
| Style | imperative (loops) | declarative (pipeline) |

```java
List<Integer> list = List.of(1, 2, 3);
list.size();              // works again and again

Stream<Integer> s = list.stream();
s.count();                // OK
// s.count();             // ERROR — stream already consumed (IllegalStateException)
```

### Creating streams

```java
Stream.of("a", "b", "c");              // from values
list.stream();                          // from a collection
Arrays.stream(new int[]{1, 2, 3});      // from an array
IntStream.range(1, 5);                  // 1,2,3,4 (primitive stream)
Stream.iterate(1, n -> n + 1);          // infinite: 1,2,3,...
Stream.generate(Math::random);          // infinite random
Stream.empty();                         // empty stream
```

### Laziness in action

```java
Stream<Integer> s = Stream.of(1, 2, 3, 4)
    .filter(n -> { System.out.println("filtering " + n); return n % 2 == 0; });

System.out.println("Nothing ran yet!");   // intermediate ops are lazy
long c = s.count();                       // NOW the pipeline runs
```

The `filter` doesn't execute until `count()` (the terminal op) is called.

### Why streams?

```java
// Imperative (classic):
List<String> result = new ArrayList<>();
for (String n : names) {
    if (n.length() > 4) result.add(n.toUpperCase());
}

// Declarative (streams):
List<String> result = names.stream()
    .filter(n -> n.length() > 4)
    .map(String::toUpperCase)
    .toList();
```

Streams read like "what" you want, not "how" — less boilerplate, fewer off-by-one bugs, easy to parallelize (`.parallelStream()`).

## Visual — The Pipeline

```
 source        intermediate (lazy)         terminal (eager)
  .stream()  ──▶ filter ──▶ map ──▶ sorted ──▶ collect / count / forEach
     │              │         │         │            │
     │              └──── these just describe ────────┘
     └── the terminal op is what triggers actual processing
```

Data flows through each stage; nothing executes until the terminal operation.

## Code Examples

### Example 1 — First pipeline

```java
import java.util.List;

public class FirstStream {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int sum = nums.stream()
            .filter(n -> n % 2 == 0)     // evens
            .map(n -> n * n)             // squares
            .reduce(0, Integer::sum);    // sum → 4+16+36+64+100 = 220
        System.out.println(sum);         // 220
    }
}
```

### Example 2 — Creating streams

```java
import java.util.stream.*;

public class Create {
    public static void main(String[] args) {
        Stream.of(1, 2, 3).forEach(System.out::print);        // 123
        System.out.println();
        IntStream.range(0, 5).forEach(System.out::print);     // 01234
        System.out.println();
        Stream.iterate(2, n -> n * 2)
            .limit(5)
            .forEach(n -> System.out.print(n + " "));         // 2 4 8 16 32
    }
}
```

### Example 3 — Laziness proof

```java
import java.util.stream.Stream;

public class Lazy {
    public static void main(String[] args) {
        Stream<String> s = Stream.of("a", "b", "c")
            .peek(x -> System.out.println("peek: " + x));   // lazy
        System.out.println("before terminal op");
        s.count();   // triggers: peek a, peek b, peek c
    }
}
```

## Common Mistakes

1. **Reusing a consumed stream** — throws `IllegalStateException`; create a fresh stream.
2. **Expecting intermediate ops to run immediately** — they're lazy; a terminal op triggers them.
3. **Side effects in intermediate ops** — keep `map`/`filter` pure; side effects belong in `forEach` (terminal).
4. **Forgetting the terminal operation** — the pipeline silently does nothing.
5. **Using `parallelStream` blindly** — overhead for small data; use when large.
6. **Mixing streams and classic loops for the same task** — pick one style for clarity.

## Best Practices

- Write pipelines: source → intermediate → terminal, one per task.
- Keep lambdas in `map`/`filter` side-effect-free.
- Prefer `toList()`/`collect` over manual accumulation.
- Use primitive streams (`IntStream`, `LongStream`) to avoid boxing.
- Name complex lambdas as methods for readability.

## Practice Questions

1. Sum the squares of even numbers from 1 to 10 using a stream.
2. Create a stream of the first 5 powers of 2 with `Stream.iterate`.
3. Explain the three parts of a stream pipeline.
4. Demonstrate laziness with `peek` and a terminal operation.
5. Explain why a stream can't be reused after a terminal operation.

## Multiple Choice Questions (MCQs)

### Q1. A Stream:
- a) Stores data like a collection
- b) Carries data through a pipeline
- c) Is reusable after consuming
- d) Is eager

**Answer:** b

### Q2. Intermediate operations are:
- a) Eager
- b) Lazy
- c) Terminal
- d) Storage

**Answer:** b

### Q3. A terminal operation:
- a) Returns another stream
- b) Triggers pipeline execution and produces a result
- c) Is always lazy
- d) Creates a source

**Answer:** b

### Q4. Streams were introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** c

### Q5. `.stream()` on a collection creates the:
- a) Terminal operation
- b) Source
- c) Sink
- d) Collector

**Answer:** b

## Key Takeaways

- Stream = pipeline (source → intermediate → terminal); lazy and single-use.
- Collections store; streams carry. Terminal ops trigger execution.
- Create streams via `.stream()`, `Stream.of`, `IntStream.range`, `Stream.iterate`.
- Declarative, readable, parallelizable data processing.

## Next Topic

[11.2 Intermediate Operations](lesson-11.2-intermediate-operations.md)
