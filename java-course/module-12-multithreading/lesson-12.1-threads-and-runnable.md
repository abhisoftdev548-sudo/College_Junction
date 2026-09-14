---
module: 12
topic: "12.1"
title: "Threads and Runnable"
slug: "threads-and-runnable"
difficulty: "Advanced"
prerequisites:
  - Lambdas and Functional Interfaces
estimated_minutes: 30
tags:
  - java
  - concurrency
  - threads
---

# 12.1 Threads and Runnable

## Overview

A **thread** is an independent path of execution inside a program — several threads run "at the same time" (interleaved on one CPU core, or truly parallel on many). Java's threading is built on the `Thread` class and the `Runnable` interface. This lesson covers creating, starting, and coordinating basic threads.

## Learning Objectives

After this lesson you will be able to:

- Create threads with `Thread` and `Runnable`
- Use `start()` vs `run()`
- Join threads and sleep
- Use daemon threads
- Pass work with lambdas and method references

## Core Concepts

### Creating a thread — Runnable

```java
public class MyTask implements Runnable {
    @Override
    public void run() {                    // the work to do
        System.out.println("Running in " + Thread.currentThread().getName());
    }
}

Thread t = new Thread(new MyTask());
t.start();                                 // begin a NEW thread
```

`Runnable` is a functional interface — its `run()` holds the task. Pass it to a `Thread` and call `start()`.

### start() vs run()

```java
Thread t = new Thread(() -> System.out.println("task"));
t.start();    // correct — launches a new thread, which calls run()
t.run();      // wrong — just calls run() on the CURRENT thread (no concurrency)
```

**Always call `start()`** — `run()` alone executes synchronously on the caller.

### Runnable with a lambda

```java
Thread t = new Thread(() -> {
    for (int i = 0; i < 3; i++) {
        System.out.println("Worker " + i);
    }
});
t.start();
```

Since `Runnable` is a functional interface, a lambda replaces the whole anonymous class.

### Extending Thread (alternative)

```java
public class MyThread extends Thread {
    @Override
    public void run() { System.out.println("custom thread"); }
}

new MyThread().start();
```

Extending `Thread` works but is less flexible (Java is single-inheritance) — **prefer `Runnable`**.

### join — wait for another thread

```java
Thread t = new Thread(() -> {
    try { Thread.sleep(1000); } catch (InterruptedException e) { }
    System.out.println("Worker done");
});

t.start();
t.join();                       // main waits for t to finish
System.out.println("Main continues after worker");
```

`join()` blocks the current thread until `t` finishes.

### sleep — pause

```java
Thread.sleep(1000);   // pause for 1000 ms (throws InterruptedException)
```

### Daemon threads

```java
Thread t = new Thread(() -> { while (true) { /* background work */ } });
t.setDaemon(true);     // daemon — JVM exits when only daemons remain
t.start();
```

Daemon threads (e.g. cleanup, watchdogs) don't keep the JVM alive.

## Visual — Threads Interleaving

```
 main thread:     ── A ── B ── C ── D ── E ──▶
 worker thread:      ── 1 ── 2 ── 3 ──▶

 combined (interleaved): A 1 B 2 C 3 D E
```

Threads run concurrently — their statements interleave in a scheduler-chosen order (not predictable).

## Code Examples

### Example 1 — Two threads printing

```java
public class TwoThreads {
    public static void main(String[] args) {
        Thread a = new Thread(() -> {
            for (int i = 0; i < 5; i++) System.out.print("A");
        });
        Thread b = new Thread(() -> {
            for (int i = 0; i < 5; i++) System.out.print("B");
        });
        a.start();
        b.start();
        // output order varies, e.g. ABABBAABBA...
    }
}
```

### Example 2 — join

```java
public class JoinDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Worker: " + i);
                try { Thread.sleep(200); } catch (InterruptedException e) { }
            }
        });
        worker.start();
        worker.join();                       // wait for worker
        System.out.println("Main finished after worker");
    }
}
```

### Example 3 — Multiple workers with a lambda

```java
public class Workers {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            int id = i;                      // effectively final copy
            new Thread(() ->
                System.out.println("Thread " + id + " on " + Thread.currentThread().getName())
            ).start();
        }
    }
}
```

## Common Mistakes

1. **Calling `run()` instead of `start()`** — no new thread, no concurrency.
2. **Capturing a mutable loop variable** — copy to an effectively-final local.
3. **Forgetting `join` when order matters** — the main thread may exit before workers.
4. **Swallowing `InterruptedException`** — restore the interrupt flag or handle it.
5. **Assuming thread execution order** — scheduling is not deterministic.
6. **Starting the same thread twice** — throws `IllegalThreadStateException`.

## Best Practices

- Prefer `Runnable` (or lambdas) over extending `Thread`.
- Use `start()`, and `join()` when you need to wait.
- Name threads for debugging (`new Thread(task, "worker-1")`).
- Use daemon threads for background, non-critical work.
- Don't rely on execution order — synchronize explicitly (12.2).

## Practice Questions

1. Create a `Runnable` that prints numbers 1–5 and run it in a thread.
2. Convert the `Runnable` to a lambda.
3. Write two threads that print different letters and observe interleaving.
4. Use `join()` to make main wait for a worker.
5. Explain `start()` vs `run()` and daemon threads.

## Multiple Choice Questions (MCQs)

### Q1. A thread is started with:
- a) `run()`
- b) `start()`
- c) `begin()`
- d) `execute()`

**Answer:** b

### Q2. `Runnable` is a:
- a) Class
- b) Functional interface with `run()`
- c) Annotation
- d) Collection

**Answer:** b

### Q3. `t.join()` causes the current thread to:
- a) Stop forever
- b) Wait for `t` to finish
- c) Kill `t`
- d) Sleep

**Answer:** b

### Q4. A daemon thread:
- a) Prevents JVM exit
- b) Doesn't prevent JVM exit when only daemons remain
- c) Is always the main thread
- d) Cannot be interrupted

**Answer:** b

### Q5. `Thread.sleep(1000)` pauses for:
- a) 1000 nanoseconds
- b) 1000 milliseconds (1 second)
- c) 1000 seconds
- d) 1 millisecond

**Answer:** b

## Key Takeaways

- Threads = concurrent execution paths; create via `Runnable`/lambda + `Thread`.
- `start()` launches a thread; `run()` is just a method call.
- `join()` waits; `sleep` pauses; daemon threads don't block JVM exit.
- Execution order is non-deterministic — synchronize when needed.

## Next Topic

[12.2 Thread Lifecycle and Synchronization](lesson-12.2-thread-lifecycle-and-synchronization.md)
