---
module: 13
topic: "13.3"
title: "Object References and Lifecycle"
slug: "object-references-and-lifecycle"
difficulty: "Advanced"
prerequisites:
  - Garbage Collection
estimated_minutes: 30
tags:
  - java
  - memory
  - references
  - finalize
---

# 13.3 Object References and Lifecycle

## Overview

An object's life spans from `new` to garbage collection. Java gives you four kinds of **references** that control how strongly (and how long) you hold objects: **strong**, **soft**, **weak**, and **phantom** — the building blocks of caches and cleanup hooks. This lesson covers the lifecycle and these reference types (plus why `finalize` is dead).

## Learning Objectives

After this lesson you will be able to:

- Trace an object's lifecycle (creation → use → GC)
- Use `SoftReference` for memory-sensitive caches
- Use `WeakReference` and `WeakHashMap` for non-blocking maps
- Understand `PhantomReference` and `Cleaner`
- Explain why `finalize()` is deprecated

## Core Concepts

### The object lifecycle

```java
Student s = new Student();   // 1. created (constructor runs)
s.name = "Ankit";            // 2. used (fields/methods)
s = null;                    // 3. unreachable (no strong references)
                             // 4. GC reclaims the memory (eventually)
```

Creation is explicit (`new`); destruction is automatic (GC) — you never call a destructor.

### The four reference strengths

| Type | When GC can reclaim | Use case |
|---|---|---|
| Strong (default) | never (while reachable) | normal objects |
| `SoftReference` | only under memory pressure | memory-sensitive caches |
| `WeakReference` | on the next GC | canonical maps, caches that don't block GC |
| `PhantomReference` | after finalization | resource cleanup |

### SoftReference — a cache that gives way under pressure

```java
SoftReference<byte[]> cache = new SoftReference<>(new byte[10 * 1024 * 1024]);

byte[] data = cache.get();   // may be null if the GC reclaimed it under pressure
if (data == null) {
    data = loadFromDisk();
    cache = new SoftReference<>(data);
}
```

`SoftReference` keeps objects alive until memory gets tight — ideal for caches that can be rebuilt.

### WeakReference — don't block GC

```java
WeakReference<Student> weak = new WeakReference<>(new Student("Ankit"));

weak.get();        // the object, until the next GC reclaims it
// after GC: weak.get() returns null
```

A weakly-referenced object is collected as soon as GC runs, even with plenty of memory.

### WeakHashMap — entries vanish with their keys

```java
Map<Key, String> map = new WeakHashMap<>();
Key k = new Key();
map.put(k, "value");
k = null;                 // key now weakly held → entry removed on next GC
```

`WeakHashMap` uses weak keys — great for metadata caches keyed by objects you don't own.

### PhantomReference + Cleaner — post-GC cleanup

```java
Cleaner cleaner = Cleaner.create();
cleaner.register(resource, () -> System.out.println("resource cleaned"));
```

Use `Cleaner` (Java 9) for cleanup after an object is collected — not for critical resources (use try-with-resources instead).

### finalize() is deprecated

```java
// finalize() was removed for finalization in JDK 18+ — do NOT rely on it
@Override
protected void finalize() { ... }   // deprecated, unpredictable, removed
```

`finalize()` ran at unpredictable times, could resurrect objects, and hurt performance. It's deprecated and effectively removed — use `Cleaner` or try-with-resources.

## Visual — Reference Strengths

```
 Strong    ──── always kept (while reachable)
 Soft      ──── kept until memory is low        ← caches
 Weak      ──── reclaimed at the next GC        ← metadata maps
 Phantom   ──── reclaimed + notified after GC   ← cleanup hooks
```

Weaker references let you hold objects *tentatively* without preventing GC.

## Code Examples

### Example 1 — Soft cache

```java
import java.lang.ref.SoftReference;

public class SoftCache {
    public static void main(String[] args) {
        SoftReference<byte[]> cache = new SoftReference<>(new byte[8 * 1024 * 1024]);

        byte[] data = cache.get();
        if (data == null) {
            System.out.println("recomputing (GC reclaimed the cache)");
            data = new byte[8 * 1024 * 1024];
            cache = new SoftReference<>(data);
        } else {
            System.out.println("cache hit");
        }
    }
}
```

### Example 2 — WeakHashMap

```java
import java.util.WeakHashMap;

public class WeakMap {
    static class Key { }

    public static void main(String[] args) {
        WeakHashMap<Key, String> map = new WeakHashMap<>();
        Key k = new Key();
        map.put(k, "metadata");

        k = null;                     // drop the strong reference
        System.gc();                  // (hint) — entry becomes removable

        System.out.println("size: " + map.size());   // likely 0 after GC
    }
}
```

### Example 3 — Cleaner

```java
import java.lang.ref.Cleaner;

public class Cleanup {
    static final Cleaner cleaner = Cleaner.create();

    static class Resource { }

    public static void main(String[] args) {
        Resource res = new Resource();
        cleaner.register(res, () -> System.out.println("cleaning up Resource"));
        res = null;                  // when GC collects res, the action runs
    }
}
```

## Common Mistakes

1. **Relying on `finalize()`** — deprecated/removed and unpredictable; use `Cleaner` or try-with-resources.
2. **Holding a strong reference alongside a weak/soft one** — defeats the purpose.
3. **Using `WeakHashMap` with `String`/`Integer` keys** — they're often strongly cached; keys won't vanish as expected.
4. **`get()` on a weak/soft reference returning null** — always null-check and recompute.
5. **Using phantom references for critical resources** — use try-with-resources for determinism.
6. **Assuming `System.gc()` makes weak refs collect immediately** — it's a hint.

## Best Practices

- Use strong references by default.
- Use `SoftReference` for caches that can be rebuilt under memory pressure.
- Use `WeakReference`/`WeakHashMap` for metadata keyed by objects you don't own.
- Use `Cleaner` for post-GC cleanup of native resources; try-with-resources for heap/IO resources.
- Never depend on `finalize()`.

## Practice Questions

1. Trace the lifecycle of an object from `new` to GC.
2. Write a `SoftReference` cache with a recompute path.
3. Use `WeakHashMap` and explain when entries disappear.
4. Register a cleanup action with `Cleaner`.
5. Explain why `finalize()` was deprecated.

## Multiple Choice Questions (MCQs)

### Q1. The default reference type is:
- a) Soft
- b) Weak
- c) Strong
- d) Phantom

**Answer:** c

### Q2. `SoftReference` objects are reclaimed:
- a) At every GC
- b) Only under memory pressure
- c) Never
- d) Immediately

**Answer:** b

### Q3. `WeakHashMap` keys are:
- a) Strong
- b) Soft
- c) Weak
- d) Phantom

**Answer:** c

### Q4. `finalize()` is:
- a) The recommended cleanup
- b) Deprecated (removed from finalization in JDK 18+)
- c) A constructor
- d) A static method

**Answer:** b

### Q5. `Cleaner` (Java 9) is used for:
- a) Post-GC cleanup actions
- b) Speeding up allocation
- c) Disabling GC
- d) Weak references only

**Answer:** a

## Key Takeaways

- Lifecycle: `new` → use → unreachable → GC reclaims.
- Reference strengths: strong (default), soft (pressure-based caches), weak (non-blocking maps), phantom (cleanup).
- `WeakHashMap` for metadata; `Cleaner` for cleanup; `finalize()` is deprecated/removed.

## Next Topic

[13.4 String Pool and Immutability](lesson-13.4-string-pool-and-immutability.md)
