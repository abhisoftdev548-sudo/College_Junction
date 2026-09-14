---
module: 13
topic: "13.5"
title: "Performance Best Practices"
slug: "performance-best-practices"
difficulty: "Advanced"
prerequisites:
  - String Pool and Immutability
estimated_minutes: 30
tags:
  - java
  - performance
  - optimization
---

# 13.5 Performance Best Practices

## Overview

Performance in Java is mostly about **avoiding the classic pitfalls**: needless object creation, O(n²) string building, unboxing overhead, and over-engineering. This lesson distills practical, high-leverage habits — measure first, optimize the hot path, and use the JVM's profiling tools (including Java 25's JFR improvements).

## Learning Objectives

After this lesson you will be able to:

- Apply common performance rules (string building, collections, loops)
- Avoid needless boxing/unboxing and object churn
- Choose the right collection and loop style
- Measure with `System.nanoTime` and JFR
- Follow a "measure, don't guess" workflow

## Core Concepts

### Rule 1 — Measure, don't guess

```java
long start = System.nanoTime();
// ... code to measure ...
long elapsed = System.nanoTime() - start;
System.out.println(elapsed / 1_000_000 + " ms");
```

Don't optimize by intuition — profile first. Use `nanoTime` for micro-benchmarks (or JMH for serious ones) and JFR/JMC for real profiling.

### Rule 2 — Use StringBuilder, not +=

```java
String s = "";
for (...) s += x;          // O(n²), allocates per iteration

StringBuilder sb = new StringBuilder();
for (...) sb.append(x);    // linear, one buffer
```

### Rule 3 — Avoid boxing in hot loops

```java
List<Integer> list = new ArrayList<>();     // stores Integer objects (boxed)
list.add(42);                               // autoboxes 42 → Integer

// For heavy numeric work, use primitive arrays or IntStream:
int[] arr = {1, 2, 3};
IntStream.of(arr).sum();
```

Autoboxing (int→Integer) allocates objects — costly in tight loops.

### Rule 4 — Pre-size collections

```java
List<String> list = new ArrayList<>(1000);   // avoid repeated resizing
StringBuilder sb = new StringBuilder(1024);  // avoid buffer reallocation
```

When you know the size, tell the collection — it avoids multiple internal array copies.

### Rule 5 — Choose the right collection

| Need | Use |
|---|---|
| random access list | `ArrayList` |
| uniqueness (unordered) | `HashSet` |
| sorted unique | `TreeSet` |
| key→value (unordered) | `HashMap` |
| queue/stack | `ArrayDeque` |

Pick the data structure whose operations match your access pattern (O(1) vs O(log n) vs O(n) matter).

### Rule 6 — Lazy over eager

```java
// Eager — reads everything:
List<String> allLines = Files.readAllLines(path);

// Lazy — streams lines, stops early if possible:
try (var lines = Files.lines(path)) {
    boolean found = lines.anyMatch(l -> l.contains("needle"));
}
```

Prefer lazy streams when you might not need all the data (early termination).

### Rule 7 — Avoid premature optimization

```java
// Write clear code FIRST. Optimize ONLY the measured hot spots.
```

Readability beats micro-optimization almost everywhere. Optimize the 5% that profiling shows is hot.

## Modern Java / Java 25 Update

### JEP 518 & JEP 520 — JFR Improvements (Final in Java 25)

Java Flight Recorder (JFR) is the built-in profiler. Java 25 finalizes:

- **JEP 518** — command-line ergonomics for AOT (ahead-of-time) startup.
- **JEP 520** — JFR method timing & tracing (precise per-method profiling).

```bash
# record a run and dump profiling data:
java -XX:StartFlightRecording=filename=rec.jfr,duration=60s MyApp
```

> ⚠️ These are tooling/JVM features — they help you *measure* your code, which is step one of any performance work.

## Visual — The Optimization Workflow

```
 1. Write clear, correct code
 2. Measure (JFR / nanoTime / benchmarks)
 3. Find the hot path (the 5%)
 4. Optimize ONLY that (right algorithm, right collection)
 5. Re-measure to confirm the win
```

Correctness first, measure second, optimize last — and only where it matters.

## Code Examples

### Example 1 — Pre-sizing and primitive loops

```java
import java.util.ArrayList;
import java.util.List;

public class PreSize {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(100_000);   // pre-sized
        long start = System.nanoTime();
        for (int i = 0; i < 100_000; i++) list.add(i);
        long elapsed = System.nanoTime() - start;
        System.out.println("took " + elapsed / 1_000_000 + " ms");
    }
}
```

### Example 2 — Boxing vs primitives

```java
public class Boxing {
    public static void main(String[] args) {
        long start = System.nanoTime();
        int sum = 0;
        for (int i = 0; i < 10_000_000; i++) sum += i;   // primitive (fast)
        long prim = System.nanoTime() - start;

        start = System.nanoTime();
        Integer boxed = 0;
        for (int i = 0; i < 10_000_000; i++) boxed += i; // autoboxing (slower)
        long box = System.nanoTime() - start;

        System.out.println("primitive: " + prim / 1_000_000 + " ms");
        System.out.println("boxed:     " + box / 1_000_000 + " ms");
    }
}
```

### Example 3 — Lazy vs eager

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class Lazy {
    public static void main(String[] args) throws Exception {
        Path p = Path.of("data.txt");
        // lazy: stop as soon as a match is found
        try (var lines = Files.lines(p)) {
            boolean has = lines.anyMatch(l -> l.startsWith("ERROR"));
            System.out.println("has ERROR: " + has);
        }
    }
}
```

## Common Mistakes

1. **Optimizing without measuring** — guessing usually makes code worse.
2. **`+=` string building** — O(n²); use `StringBuilder`.
3. **Boxed types in numeric loops** — use primitives.
4. **Wrong collection** — `LinkedList.get(i)` in a loop is O(n²).
5. **Growing collections without pre-sizing** — repeated array copies.
6. **Micro-optimizing cold code** — optimize only the measured hot path.

## Best Practices

- Profile first (JFR, nanoTime, JMH); optimize second.
- Use `StringBuilder`, primitive loops, and pre-sized collections.
- Match collections to access patterns.
- Prefer lazy streams for potentially-early-exit processing.
- Keep code readable; avoid premature optimization.

## Practice Questions

1. Time a `+=` loop vs a `StringBuilder` loop and compare.
2. Show autoboxing overhead with an `Integer` loop vs an `int` loop.
3. Explain why pre-sizing a collection helps.
4. Choose the right collection for each of five scenarios.
5. Describe (in a comment) Java 25's JFR improvements (JEP 518/520) and when you'd use JFR.

## Multiple Choice Questions (MCQs)

### Q1. The first step in performance work is:
- a) Optimize everything
- b) Measure/profile
- c) Rewrite in C
- d) Add more threads

**Answer:** b

### Q2. `String +=` in a loop is:
- a) O(1)
- b) O(n²) (new string each iteration)
- c) O(log n)
- d) Free

**Answer:** b

### Q3. Autoboxing is:
- a) Free
- b) Converting primitives to wrapper objects (allocates)
- c) Removing objects
- d) A GC setting

**Answer:** b

### Q4. `LinkedList.get(i)` in a loop is:
- a) O(1)
- b) O(n) per call (O(n²) overall)
- c) O(log n)
- d) Constant

**Answer:** b

### Q5. JFR (Java Flight Recorder) is used for:
- a) Profiling/measuring performance
- b) Writing code
- c) Compiling
- d) Garbage collection only

**Answer:** a

## Key Takeaways

- Measure before optimizing; optimize only the hot path.
- Use `StringBuilder`, primitives, pre-sized collections, and the right data structures.
- Prefer lazy streams for early-exit processing.
- Java 25: JFR improvements (JEP 518/520) for better profiling.

## Module 13 Complete 🎉

You've finished **Module 13 — Memory and Performance**. Next up: **Module 14 — Problem Solving**.
