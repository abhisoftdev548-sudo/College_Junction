---
module: 12
topic: "12.2"
title: "Thread Lifecycle and Synchronization"
slug: "thread-lifecycle-and-synchronization"
difficulty: "Advanced"
prerequisites:
  - Threads and Runnable
estimated_minutes: 35
tags:
  - java
  - concurrency
  - synchronization
  - thread-lifecycle
---

# 12.2 Thread Lifecycle and Synchronization

## Overview

Threads move through a **lifecycle** of states (NEW → RUNNABLE → BLOCKED/WAITING → TERMINATED). When multiple threads share data, they can corrupt it — a **race condition**. **Synchronization** (the `synchronized` keyword, `volatile`, and `wait`/`notify`) coordinates access so shared state stays consistent.

## Learning Objectives

After this lesson you will be able to:

- Describe the thread lifecycle states
- Explain race conditions
- Use `synchronized` methods and blocks
- Use `volatile` for visibility
- Coordinate threads with `wait`/`notify`

## Core Concepts

### The thread lifecycle

```
 NEW ──start()──▶ RUNNABLE ──▶ TERMINATED
                    │   ▲
                    ▼   │
                BLOCKED / WAITING / TIMED_WAITING
```

- **NEW** — created, not started.
- **RUNNABLE** — running or ready to run.
- **BLOCKED** — waiting for a lock.
- **WAITING / TIMED_WAITING** — waiting (with/without timeout) for `join`/`wait`/`sleep`.
- **TERMINATED** — finished.

### The race condition

```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++;        // NOT atomic: read → add → write
    }
}

// Two threads each increment 10000 times — the final count may be < 20000!
```

`count++` is three steps. Two threads can interleave (both read 5, both write 6) and lose updates. This is a **race condition**.

### synchronized methods

```java
public class Counter {
    private int count = 0;

    public synchronized void increment() {   // one thread at a time
        count++;
    }

    public synchronized int getCount() { return count; }
}
```

`synchronized` makes the method **mutually exclusive**: only one thread can execute it per object (it holds the object's **monitor lock**).

### synchronized blocks (finer control)

```java
public void increment() {
    synchronized (this) {          // lock only the critical section
        count++;
    }
}
```

Blocks let you lock just the critical section (less contention) or lock a different object.

### volatile — visibility

```java
public class Flag {
    private volatile boolean running = true;   // visible to all threads

    public void stop() { running = false; }
    public void run() { while (running) { /* work */ } }
}
```

`volatile` guarantees every read sees the **latest** write (no stale cache) — for a single variable, it's cheaper than `synchronized` (but not atomic for `++`).

### wait / notify — coordination

```java
public class Queue {
    private final Object lock = new Object();
    private boolean ready = false;

    public void produce() {
        synchronized (lock) {
            ready = true;
            lock.notify();       // wake a waiting thread
        }
    }

    public void consume() throws InterruptedException {
        synchronized (lock) {
            while (!ready) {
                lock.wait();     // release lock and wait
            }
        }
    }
}
```

`wait()` releases the lock and waits; `notify()`/`notifyAll()` wake waiters. Use a `while` loop (not `if`) to guard against spurious wakeups.

## Visual — Race Condition

```
 Thread A:  read count(0) ──▶ 0+1=1 ──▶ write 1
 Thread B:        read count(0) ──▶ 0+1=1 ──▶ write 1
                                              ▲
                              two increments, but count == 1 (lost update!)

 with synchronized: A holds the lock, finishes, then B runs → count == 2
```

Unsynchronized `count++` loses updates; `synchronized` serializes the critical section.

## Code Examples

### Example 1 — Synchronized counter

```java
public class SafeCounter {
    private int count = 0;

    public synchronized void increment() { count++; }
    public synchronized int get() { return count; }

    public static void main(String[] args) throws InterruptedException {
        SafeCounter c = new SafeCounter();
        Runnable task = () -> { for (int i = 0; i < 10000; i++) c.increment(); };

        Thread a = new Thread(task);
        Thread b = new Thread(task);
        a.start(); b.start();
        a.join(); b.join();

        System.out.println(c.get());   // 20000 (correct)
    }
}
```

### Example 2 — synchronized block

```java
public class Block {
    private final Object lock = new Object();
    private int value;

    public void add(int amount) {
        synchronized (lock) {      // lock only the critical part
            value += amount;
        }
    }
}
```

### Example 3 — wait/notify

```java
public class PingPong {
    private final Object lock = new Object();
    private boolean ping = true;

    public void ping() throws InterruptedException {
        synchronized (lock) {
            while (!ping) lock.wait();
            System.out.println("ping");
            ping = false;
            lock.notify();
        }
    }

    public void pong() throws InterruptedException {
        synchronized (lock) {
            while (ping) lock.wait();
            System.out.println("pong");
            ping = true;
            lock.notify();
        }
    }
}
```

## Common Mistakes

1. **Unsynchronized shared state** — race conditions corrupt data.
2. **Synchronizing on `null` or a changing object** — lock must be stable and non-null.
3. **`if` instead of `while` around `wait()`** — spurious wakeups break the logic.
4. **Using `volatile` for compound ops** — `volatile count++` is still not atomic.
5. **Calling `wait`/`notify` without holding the lock** — throws `IllegalMonitorStateException`.
6. **Over-synchronizing** — too much locking serializes everything and kills performance.

## Best Practices

- Synchronize the **smallest** critical section needed.
- Use `synchronized` methods for whole-method atomicity; blocks for fine control.
- Use `volatile` for simple flags; `Atomic*` classes for counters (12.4).
- Guard `wait()` with a `while` loop; always `notifyAll()` when in doubt.
- Prefer high-level tools (`Lock`, `Atomic*`, concurrent collections) over raw `wait/notify`.

## Practice Questions

1. Write a counter with a race condition and demonstrate lost updates (or explain them).
2. Fix it with `synchronized` and show the correct total.
3. Use a `volatile` boolean to stop a running loop from another thread.
4. Write a producer/consumer with `wait`/`notify`.
5. Draw the thread lifecycle states and their transitions.

## Multiple Choice Questions (MCQs)

### Q1. A race condition occurs when:
- a) Threads run sequentially
- b) Shared data is modified by interleaving threads without synchronization
- c) A thread sleeps
- d) A lock is held

**Answer:** b

### Q2. `synchronized` on a method locks the:
- a) Class object
- b) Object's monitor (the instance)
- c) CPU
- d) JVM

**Answer:** b

### Q3. `volatile` guarantees:
- a) Atomicity of `++`
- b) Visibility of the latest write
- c) Mutual exclusion
- d) Thread priority

**Answer:** b

### Q4. `wait()` must be called:
- a) From any context
- b) While holding the object's lock
- c) Only in main
- d) After `start()`

**Answer:** b

### Q5. Around `wait()`, you should use:
- a) `if`
- b) `while`
- c) `for(;;)`
- d) no loop

**Answer:** b

## Key Takeaways

- Lifecycle: NEW → RUNNABLE → (BLOCKED/WAITING) → TERMINATED.
- Race conditions come from unsynchronized shared mutation.
- `synchronized` = mutual exclusion; `volatile` = visibility; `wait`/`notify` = coordination.
- Prefer high-level concurrency tools over raw primitives.

## Next Topic

[12.3 Executors and Thread Pools](lesson-12.3-executors-and-thread-pools.md)
