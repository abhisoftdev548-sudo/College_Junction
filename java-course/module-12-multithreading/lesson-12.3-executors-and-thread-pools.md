---
module: 12
topic: "12.3"
title: "Executors and Thread Pools"
slug: "executors-and-thread-pools"
difficulty: "Advanced"
prerequisites:
  - Thread Lifecycle and Synchronization
estimated_minutes: 35
tags:
  - java
  - concurrency
  - executors
  - thread-pool
  - virtual-threads
---

# 12.3 Executors and Thread Pools

## Overview

Creating a new `Thread` for every task is wasteful — thread creation is expensive. The **Executor framework** (Java 5) manages a **thread pool** that reuses threads, queues tasks, and returns results via `Future`/`Callable`. Java 21 added **virtual threads** — millions of cheap, lightweight threads — and Java 25 continues that model (e.g. `Thread.ofVirtual`).

## Learning Objectives

After this lesson you will be able to:

- Create `ExecutorService` pools (fixed, cached, single)
- Submit `Runnable` and `Callable` tasks
- Retrieve results with `Future.get`
- Shut down executors correctly
- Use virtual threads (Java 21+)

## Core Concepts

### Creating a pool

```java
ExecutorService pool = Executors.newFixedThreadPool(4);   // 4 worker threads
ExecutorService single = Executors.newSingleThreadExecutor();
ExecutorService cached = Executors.newCachedThreadPool(); // grows/shrinks on demand
```

### Submitting tasks

```java
pool.execute(() -> System.out.println("task"));   // Runnable (no result)

Future<Integer> result = pool.submit(() -> {       // Callable (returns a result)
    int sum = 0;
    for (int i = 1; i <= 100; i++) sum += i;
    return sum;
});
Integer value = result.get();                      // blocks until done → 5050
```

`execute` runs a `Runnable` (fire-and-forget); `submit` accepts `Runnable` or `Callable` and returns a `Future`.

### Future.get and timeouts

```java
Integer v = result.get(2, TimeUnit.SECONDS);   // wait at most 2 s
result.isDone();                                // finished?
result.cancel(true);                            // try to cancel
```

`get()` blocks; the timeout overload avoids hanging forever.

### Shutting down

```java
pool.shutdown();              // stop accepting tasks, finish running ones
pool.awaitTermination(5, TimeUnit.SECONDS);   // wait for completion
pool.shutdownNow();           // attempt immediate stop
```

**Always shut down** the pool or the JVM won't exit (non-daemon pool threads).

### InvokeAll — run many tasks

```java
List<Callable<Integer>> tasks = List.of(() -> 1, () -> 2, () -> 3);
List<Future<Integer>> results = pool.invokeAll(tasks);
for (Future<Integer> f : results) System.out.println(f.get());   // 1, 2, 3
```

### Virtual threads (Java 21)

```java
Thread.ofVirtual().start(() -> System.out.println("virtual task"));

ExecutorService vPool = Executors.newVirtualThreadPerTaskExecutor();
vPool.submit(() -> System.out.println("cheap thread per task"));
```

Virtual threads are **cheap** (you can have millions), ideal for blocking I/O tasks. Platform threads (the classic kind) are heavy and limited.

## Visual — Thread Pool

```
          tasks queue            worker threads (reused)
        ┌──────────────┐        ┌──────┐ ┌──────┐ ┌──────┐
 submit ─▶ T5 T4 T3 T2 T1 ──▶   │  W1  │ │  W2  │ │  W3  │
        └──────────────┘        └──────┘ └──────┘ └──────┘
         queued work            workers pull tasks, finish, pull again
```

A fixed pool reuses N threads to process a queue of tasks — no per-task thread creation.

## Code Examples

### Example 1 — Fixed pool with results

```java
import java.util.concurrent.*;

public class Pool {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        Future<Integer> f1 = pool.submit(() -> sum(1, 100));
        Future<Integer> f2 = pool.submit(() -> sum(1, 50));

        System.out.println(f1.get());   // 5050
        System.out.println(f2.get());   // 1275

        pool.shutdown();
    }

    static int sum(int from, int to) {
        int s = 0;
        for (int i = from; i <= to; i++) s += i;
        return s;
    }
}
```

### Example 2 — InvokeAll

```java
import java.util.*;
import java.util.concurrent.*;

public class InvokeAllDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Callable<String>> tasks = List.of(
            () -> "task1", () -> "task2", () -> "task3"
        );
        for (Future<String> f : pool.invokeAll(tasks)) {
            System.out.println(f.get());
        }
        pool.shutdown();
    }
}
```

### Example 3 — Virtual threads (Java 21+)

```java
import java.util.concurrent.Executors;

public class VirtualDemo {
    public static void main(String[] args) throws Exception {
        try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 10; i++) {
                int id = i;
                pool.submit(() ->
                    System.out.println("Task " + id + " on " + Thread.currentThread()));
            }
        }
    }
}
```

## Common Mistakes

1. **Forgetting `shutdown()`** — the JVM hangs on exit.
2. **Calling `get()` without a timeout** — can block forever on a stuck task.
3. **Sharing a single-thread executor for blocking tasks** — tasks serialize unexpectedly.
4. **Creating threads manually instead of a pool** — expensive and unmanageable at scale.
5. **Ignoring `InterruptedException` from `get`** — handle or propagate it.
6. **Using a cached pool for unbounded submissions** — can spawn unbounded threads.

## Best Practices

- Use pools instead of raw `new Thread` for repeated tasks.
- Size fixed pools to CPU-bound work (`cores`), or use virtual threads for I/O-bound work.
- Always `shutdown()` (or use try-with-resources, since `ExecutorService` is `AutoCloseable`).
- Use `Future.get(timeout)` to avoid indefinite blocking.
- Use virtual threads (Java 21+) when you need many lightweight concurrent tasks.

## Practice Questions

1. Create a fixed thread pool and submit 5 tasks that each return a result.
2. Use `invokeAll` to run several `Callable`s and collect results.
3. Add a timeout to a `Future.get` call.
4. Write a virtual-thread example with `Executors.newVirtualThreadPerTaskExecutor`.
5. Explain why you must call `shutdown()` on an executor.

## Multiple Choice Questions (MCQs)

### Q1. A thread pool:
- a) Creates a thread per task forever
- b) Reuses a fixed set of threads to process tasks
- c) Runs only one task
- d) Is a collection

**Answer:** b

### Q2. `submit` with a `Callable` returns:
- a) `void`
- b) A `Future` (for the result)
- c) A `Thread`
- d) A `Runnable`

**Answer:** b

### Q3. `Future.get()`:
- a) Never blocks
- b) Blocks until the result is available
- c) Cancels the task
- d) Returns a thread

**Answer:** b

### Q4. Virtual threads were finalized in:
- a) Java 8
- b) Java 11
- c) Java 17
- d) Java 21

**Answer:** d

### Q5. `pool.shutdown()`:
- a) Kills tasks immediately
- b) Stops accepting new tasks and finishes running ones
- c) Restarts the pool
- d) Creates new threads

**Answer:** b

## Key Takeaways

- Executors manage thread pools: fixed, single, cached; `execute`/`submit`.
- `Callable` + `Future.get` for results; `invokeAll` for batches.
- Always `shutdown()`; use timeouts on `get`.
- Virtual threads (Java 21+) = cheap threads per task; ideal for I/O-bound workloads.

## Next Topic

[12.4 Concurrent Collections](lesson-12.4-concurrent-collections.md)
