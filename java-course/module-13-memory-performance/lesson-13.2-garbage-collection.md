---
module: 13
topic: "13.2"
title: "Garbage Collection"
slug: "garbage-collection"
difficulty: "Advanced"
prerequisites:
  - JVM Memory Model (Heap and Stack)
estimated_minutes: 30
tags:
  - java
  - memory
  - garbage-collection
---

# 13.2 Garbage Collection

## Overview

**Garbage Collection (GC)** automatically frees heap memory that's no longer reachable — Java's biggest convenience over manual memory management. The modern JVM uses **generational** collectors: most objects die young (collected in the Minor GC), survivors age into the Old generation (Major GC). Java 25 adds **Generational Shenandoah** (JEP 521).

## Learning Objectives

After this lesson you will be able to:

- Explain reachability and when objects become garbage
- Describe the young/old generation layout
- Recognize the main collectors (G1, ZGC, Shenandoah)
- Use `System.gc` (and why to avoid it)
- Understand Java 25's Generational Shenandoah (JEP 521)

## Core Concepts

### Reachability — what "garbage" means

```java
Student s = new Student();   // reachable via s
s = null;                    // object now UNREACHABLE → garbage (eligible for GC)
```

An object is garbage when **no live reference** can reach it. The GC finds and reclaims unreachable objects automatically.

### Generational hypothesis

- Most objects **die young** (temporary values, local objects).
- A few live long (caches, singletons, long-lived state).

So the heap is split:

```
 Young Generation              Old Generation
 ┌──────────────┬─────────┐   ┌──────────────────┐
 │ Eden         │ Survivor│   │ long-lived objects│
 │ (new objects)│ (S0/S1) │──▶│ (promoted after   │
 └──────────────┴─────────┘   │  surviving GCs)   │
      Minor GC (fast, frequent)  Major/Full GC (slower)
```

### Minor vs Major GC

- **Minor GC** — cleans the Young generation (fast, frequent, low pause).
- **Major/Full GC** — cleans the Old generation (slower, higher pause).

Objects that survive several Minor GCs are **promoted** to the Old generation.

### The main collectors

| Collector | Style | Notes |
|---|---|---|
| Serial | single-threaded | small apps |
| Parallel | multi-threaded throughput | batch |
| G1 | regional, incremental | **default** since Java 9, balanced pauses |
| ZGC | concurrent, ultra-low pause | large heaps |
| Shenandoah | concurrent, low pause | Java 25 adds generational mode |

### System.gc() — don't rely on it

```java
System.gc();   // a HINT to run GC — the JVM may ignore it
```

Calling `System.gc()` doesn't force collection and can cause avoidable pauses. Let the JVM manage GC — it's usually right.

### Observing GC

```java
Runtime.getRuntime().totalMemory();    // heap allocated to JVM
Runtime.getRuntime().freeMemory();     // free within that
```

Run with `-verbose:gc` or `-Xlog:gc` to see GC activity.

### Memory leaks in Java

Java has GC, but you can still **leak** by holding references longer than needed:

```java
List<Object> cache = new ArrayList<>();
// adding objects forever without removing → they stay reachable → "leak"
```

Leaks come from forgotten references (static collections, listeners, unclosed resources) — the GC can't free what's still reachable.

## Modern Java / Java 25 Update

### JEP 521 — Generational Shenandoah (Final in Java 25)

Shenandoah (a low-pause collector) historically managed the whole heap at once. Java 25 finalizes **Generational Shenandoah**, which splits work into young/old generations:

- **Shorter, more predictable pauses** for latency-sensitive apps.
- Better **sustained throughput** on large heaps.
- Enable with `-XX:+UseShenandoahGC` (it now defaults to generational mode).

> ⚠️ This is a runtime/GC improvement — no code changes; it's about choosing the right collector and JVM flags.

## Visual — Generational GC

```
  Young Gen                    Old Gen
 ┌─────────────┬──────────┐   ┌───────────────┐
 │ Eden        │ Survivor │──▶│ Tenured space │
 │ new objects │  survive │   │ long-lived    │
 └─────────────┴──────────┘   └───────────────┘
     Minor GC (young)            Major GC (old)
     frequent, cheap             rare, expensive
```

New objects start in Eden; survivors move up; long-lived objects reach the Old generation.

## Code Examples

### Example 1 — Making objects garbage

```java
public class Garbage {
    public static void main(String[] args) {
        String s = new String("temp");
        s = null;                    // the String is now unreachable → garbage
        System.out.println("done");
    }
}
```

### Example 2 — Observing memory

```java
public class Memory {
    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        long before = rt.freeMemory();
        int[] big = new int[10_000_000];   // ~40 MB
        long after = rt.freeMemory();
        System.out.println("Allocated ~" + ((before - after) / 1024 / 1024) + " MB");
    }
}
```

### Example 3 — A subtle leak (holding references)

```java
import java.util.ArrayList;
import java.util.List;

public class Leak {
    static List<byte[]> keep = new ArrayList<>();   // static → lives forever

    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            keep.add(new byte[1024 * 1024]);   // each 1 MB, never removed → leak
        }
        System.out.println("Held " + keep.size() + " MB");
    }
}
```

## Common Mistakes

1. **Calling `System.gc()` expecting immediate collection** — it's a hint, not a command.
2. **Forgetting to null/remove references** — static collections and caches leak.
3. **Not closing resources** — native handles (files, connections) aren't heap GC'd.
4. **Over-focusing on GC tuning** — fix algorithmic/memory issues first.
5. **Creating needless garbage in hot loops** — reuse objects where it matters.
6. **Assuming GC means no memory management** — you still manage references.

## Best Practices

- Let the JVM run GC; don't call `System.gc()`.
- Null out large references you no longer need (especially in long-lived collections).
- Use try-with-resources for non-heap resources (files, sockets).
- Profile before tuning; choose collectors for your latency/throughput goals.
- Prefer small, short-lived objects — they're collected cheaply.

## Practice Questions

1. Explain what makes an object eligible for garbage collection.
2. Describe the young vs old generation and promotion.
3. List the main collectors and when each fits.
4. Explain why `System.gc()` is only a hint.
5. Describe (in a comment) Java 25's Generational Shenandoah and its benefit.

## Multiple Choice Questions (MCQs)

### Q1. An object is garbage when:
- a) It's large
- b) No live reference reaches it
- c) It's old
- d) It's static

**Answer:** b

### Q2. Most objects die:
- a) Old
- b) Young (collected in Minor GC)
- c) At startup only
- d) Never

**Answer:** b

### Q3. The default collector since Java 9 is:
- a) Serial
- b) Parallel
- c) G1
- d) CMS

**Answer:** c

### Q4. `System.gc()`:
- a) Forces immediate collection
- b) Is a hint the JVM may ignore
- c) Deletes all objects
- d) Frees the stack

**Answer:** b

### Q5. JEP 521 (Java 25) makes Shenandoah:
- a) Deprecated
- b) Generational (young/old split)
- c) Single-threaded
- d) Removed

**Answer:** b

## Key Takeaways

- GC frees unreachable heap objects automatically; you manage references, not freeing.
- Generational GC: young (Eden/Survivor) + old; Minor vs Major collections.
- Collectors: G1 (default), ZGC, Shenandoah, Parallel, Serial.
- Java 25: Generational Shenandoah (JEP 521). Don't rely on `System.gc()`.

## Next Topic

[13.3 Object References and Lifecycle](lesson-13.3-object-references-and-lifecycle.md)
