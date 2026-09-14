---
module: 12
topic: "12.4"
title: "Concurrent Collections"
slug: "concurrent-collections"
difficulty: "Advanced"
prerequisites:
  - Executors and Thread Pools
estimated_minutes: 30
tags:
  - java
  - concurrency
  - concurrent-collections
  - atomic
---

# 12.4 Concurrent Collections

## Overview

Regular collections (`ArrayList`, `HashMap`) are **not thread-safe** — concurrent access corrupts them or throws `ConcurrentModificationException`. Java provides **concurrent collections** (`ConcurrentHashMap`, `CopyOnWriteArrayList`, blocking queues) and **atomic classes** (`AtomicInteger`) that are safe for multiple threads without manual locking.

## Learning Objectives

After this lesson you will be able to:

- Explain why plain collections fail under concurrency
- Use `ConcurrentHashMap` for concurrent maps
- Use `CopyOnWriteArrayList` for read-heavy lists
- Use `BlockingQueue` for producer-consumer
- Use `AtomicInteger` for lock-free counters

## Core Concepts

### Why plain collections aren't safe

```java
List<Integer> list = new ArrayList<>();   // NOT thread-safe
// two threads calling list.add(x) can corrupt the internal array
```

`ArrayList`/`HashMap` are designed for single-threaded use. Concurrent versions handle internal synchronization.

### ConcurrentHashMap

```java
ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();

map.put("a", 1);
map.get("a");
map.putIfAbsent("b", 2);
map.computeIfAbsent("c", k -> 3);   // atomic compute
map.merge("a", 10, Integer::sum);   // atomic merge
```

Unlike `HashMap`, `ConcurrentHashMap` is safe for concurrent reads/writes — it doesn't lock the whole map (and never throws `ConcurrentModificationException`).

### CopyOnWriteArrayList

```java
List<String> list = new CopyOnWriteArrayList<>();
list.add("a");
list.add("b");

for (String s : list) { ... }   // safe to iterate while others write
```

On every write, it copies the underlying array — great for **read-heavy** scenarios (listeners, caches), expensive for frequent writes.

### BlockingQueue — producer/consumer

```java
BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);

queue.put("item");        // blocks if full
String item = queue.take();   // blocks if empty

queue.offer("x");         // non-blocking add (returns false if full)
queue.poll();             // non-blocking take (returns null if empty)
```

`BlockingQueue` (implementations: `LinkedBlockingQueue`, `ArrayBlockingQueue`) coordinates producers and consumers safely — the classic pattern.

### Atomic classes — lock-free updates

```java
AtomicInteger counter = new AtomicInteger(0);

counter.incrementAndGet();   // atomic ++
counter.addAndGet(5);        // atomic += 5
counter.get();               // read
counter.compareAndSet(10, 20); // CAS: set to 20 only if currently 10
```

`AtomicInteger`/`AtomicLong`/`AtomicReference` use low-level CAS (compare-and-swap) — correct and faster than `synchronized` for simple counters.

### ConcurrentMap as a cache (atomic putIfAbsent)

```java
ConcurrentMap<String, Object> cache = new ConcurrentHashMap<>();
Object value = cache.computeIfAbsent(key, k -> loadExpensive(k));  // load once
```

## Visual — Concurrent vs Plain

```
 plain HashMap/ArrayList           concurrent versions
  (single-threaded)                 (thread-safe)
  ┌──────────────┐                 ┌────────────────────┐
  │ no locking   │                 │ ConcurrentHashMap  │
  │ may corrupt  │   ──▶           │ CopyOnWriteArrayList│
  │ throws CME   │                 │ BlockingQueue       │
  └──────────────┘                 │ AtomicInteger       │
                                    └────────────────────┘
```

Concurrent collections manage locking internally — you get safety without hand-written `synchronized`.

## Code Examples

### Example 1 — Atomic counter across threads

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicCounter {
    static AtomicInteger count = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 10000; i++) count.incrementAndGet();
        };
        Thread a = new Thread(task);
        Thread b = new Thread(task);
        a.start(); b.start();
        a.join(); b.join();
        System.out.println(count.get());   // 20000 (correct, lock-free)
    }
}
```

### Example 2 — Producer/consumer with BlockingQueue

```java
import java.util.concurrent.*;

public class ProdCons {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(5);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) queue.put(i);
            } catch (InterruptedException e) { }
        });

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    System.out.println("got " + queue.take());
                }
            } catch (InterruptedException e) { }
        });

        producer.start(); consumer.start();
        producer.join(); consumer.join();
    }
}
```

### Example 3 — ConcurrentHashMap

```java
import java.util.concurrent.*;

public class ConcurrentMapDemo {
    public static void main(String[] args) {
        ConcurrentMap<String, Integer> scores = new ConcurrentHashMap<>();
        scores.put("Ankit", 10);
        scores.merge("Ankit", 5, Integer::sum);   // atomic: 10 + 5
        scores.computeIfAbsent("Riya", k -> 7);
        System.out.println(scores);   // {Ankit=15, Riya=7}
    }
}
```

## Common Mistakes

1. **Using plain `ArrayList`/`HashMap` across threads** — corruption or `ConcurrentModificationException`.
2. **Iterating a `CopyOnWriteArrayList` expecting live updates** — iterators see a snapshot.
3. **Using `synchronizedList` wrapper thinking it's as good** — it locks per-operation, but compound ops still need manual sync.
4. **Forgetting `BlockingQueue` bounds** — unbounded queues can grow without limit.
5. **Busy-waiting instead of `take`/`put`** — `take`/`put` block efficiently.
6. **`AtomicInteger` for complex multi-variable invariants** — CAS is for single variables.

## Best Practices

- Use `ConcurrentHashMap` for shared maps; `CopyOnWriteArrayList` for read-heavy lists.
- Use `BlockingQueue` for producer-consumer instead of `wait`/`notify`.
- Use `AtomicInteger`/`AtomicLong` for counters; `computeIfAbsent`/`merge` for atomic map updates.
- Prefer concurrent collections over manual `synchronized` wrappers.
- Avoid `Vector`/`Hashtable` (legacy synchronized collections) — use the modern ones.

## Practice Questions

1. Replace a racy counter with `AtomicInteger` and verify the total.
2. Write a producer/consumer using `LinkedBlockingQueue`.
3. Use `ConcurrentHashMap.merge` to atomically accumulate values.
4. Explain when `CopyOnWriteArrayList` is a good choice (and when not).
5. Explain why `ArrayList` can throw `ConcurrentModificationException` under concurrency.

## Multiple Choice Questions (MCQs)

### Q1. `ConcurrentHashMap` is:
- a) Not thread-safe
- b) Thread-safe (concurrent reads/writes)
- c) A blocking queue
- d) A legacy class

**Answer:** b

### Q2. `AtomicInteger.incrementAndGet()` is:
- a) Lock-based
- b) An atomic, lock-free increment
- c) Non-atomic
- d) A blocking call

**Answer:** b

### Q3. `BlockingQueue.take()`:
- a) Blocks if the queue is empty
- b) Returns null if empty
- c) Throws if empty
- d) Never blocks

**Answer:** a

### Q4. `CopyOnWriteArrayList` is best for:
- a) Write-heavy workloads
- b) Read-heavy workloads
- c) Single elements only
- d) Primitive types

**Answer:** b

### Q5. `queue.offer(x)` (non-blocking):
- a) Blocks until space
- b) Returns false if full
- c) Throws if full
- d) Deletes an element

**Answer:** b

## Key Takeaways

- Plain collections aren't thread-safe; use concurrent versions.
- `ConcurrentHashMap`, `CopyOnWriteArrayList`, `BlockingQueue` handle locking internally.
- `AtomicInteger`/CAS = lock-free counters and single-variable updates.
- `BlockingQueue` is the standard producer-consumer building block.

## Next Topic

[12.5 CompletableFuture and Async Basics](lesson-12.5-completablefuture-and-async-basics.md)
