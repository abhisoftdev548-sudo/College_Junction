---
module: 12
topic: "12.5"
title: "CompletableFuture and Async Basics"
slug: "completablefuture-and-async-basics"
difficulty: "Advanced"
prerequisites:
  - Concurrent Collections
estimated_minutes: 35
tags:
  - java
  - concurrency
  - completablefuture
  - async
  - structured-concurrency
---

# 12.5 CompletableFuture and Async Basics

## Overview

**`CompletableFuture`** (Java 8) is the modern way to write asynchronous, non-blocking code — you chain stages (`thenApply`, `thenAccept`, `thenCombine`) that run when earlier stages finish, without blocking threads. Java 21+ adds **Structured Concurrency** and Java 25 finalizes **Scoped Values** (JEP 506), making async code easier to read and reason about.

## Learning Objectives

After this lesson you will be able to:

- Run async tasks with `supplyAsync`/`runAsync`
- Chain stages with `thenApply`/`thenAccept`/`thenCompose`/`thenCombine`
- Handle errors with `exceptionally`/`handle`
- Combine and wait for multiple futures
- Recognize Java 25's Scoped Values and Structured Concurrency

## Core Concepts

### Running async work

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // runs on a pool thread
    return "result";
});

CompletableFuture<Void> run = CompletableFuture.runAsync(() -> System.out.println("hi"));
```

`supplyAsync` returns a value; `runAsync` doesn't. Both run on the common ForkJoinPool by default.

### Chaining stages

```java
CompletableFuture<String> f = CompletableFuture
    .supplyAsync(() -> "hello")
    .thenApply(String::toUpperCase)         // transform the result
    .thenApply(s -> s + " world");          // chain another transform

f.join();   // "HELLO world"
```

Each `thenApply` runs when the previous stage completes — a non-blocking pipeline.

### thenAccept — consume (no return)

```java
future.thenAccept(result -> System.out.println("Got: " + result));
```

### thenCompose — chain dependent async calls

```java
CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> "Ankit");
CompletableFuture<String> greeting = user.thenCompose(
    name -> CompletableFuture.supplyAsync(() -> "Hello " + name)   // dependent future
);
```

Use `thenCompose` (not `thenApply`) when the next step is itself async — avoids `CompletableFuture<CompletableFuture<T>>`.

### thenCombine — combine two independent futures

```java
CompletableFuture<Integer> a = CompletableFuture.supplyAsync(() -> 10);
CompletableFuture<Integer> b = CompletableFuture.supplyAsync(() -> 20);

CompletableFuture<Integer> sum = a.thenCombine(b, Integer::sum);
sum.join();   // 30
```

### Handling errors

```java
CompletableFuture.supplyAsync(() -> { throw new RuntimeException("boom"); })
    .exceptionally(ex -> "fallback")        // recover
    .join();                                 // "fallback"

CompletableFuture.supplyAsync(() -> "x")
    .handle((result, ex) -> ex == null ? result : "failed")   // always runs
    .join();
```

`exceptionally` recovers from an exception; `handle` runs on success **or** failure.

### allOf / anyOf

```java
CompletableFuture.allOf(f1, f2, f3).join();   // wait for ALL
CompletableFuture.anyOf(f1, f2, f3).join();   // wait for the FIRST
```

### join vs get

`join()` throws unchecked exceptions; `get()` throws checked ones. Both block for the result.

## Modern Java / Java 25 Update

### JEP 506 — Scoped Values (Final in Java 25)

Scoped Values replace `ThreadLocal` for safely passing values through a call tree (including across virtual threads):

```java
import java.util.concurrent.StructuredTaskScope;
// Scoped Value (final in Java 25):
static final ScopedValue<String> USER = ScopedValue.newInstance();

ScopedValue.where(USER, "ankit").run(() -> {
    String currentUser = USER.get();   // available in this scope (and its threads)
    System.out.println("user: " + currentUser);
});
```

### JEP 505 — Structured Concurrency (Preview in Java 25)

Structured concurrency treats related tasks as a **unit** — start them together, wait together, cancel together:

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<String> user = scope.fork(() -> loadUser());     // fork subtasks
    Future<String> orders = scope.fork(() -> loadOrders());
    scope.join();                                           // wait for all
    scope.throwIfFailed();
    return user.resultNow() + " " + orders.resultNow();
}
```

> ⚠️ Scoped Values are **final** in Java 25; Structured Concurrency is still a **preview** (enable with `--enable-preview`). `CompletableFuture` remains the production staple.

## Visual — CompletableFuture Chaining

```
 supplyAsync ──▶ thenApply ──▶ thenApply ──▶ thenAccept
    (async)       (transform)    (transform)    (consume)
      │              │              │
      └────────── each runs when the previous completes ──────────┘
       error path: exceptionally / handle
```

Each stage registers a callback that fires when the previous future completes — no thread sits blocked.

## Code Examples

### Example 1 — Chained pipeline

```java
import java.util.concurrent.CompletableFuture;

public class Chain {
    public static void main(String[] args) {
        CompletableFuture<String> f = CompletableFuture
            .supplyAsync(() -> "java")
            .thenApply(String::toUpperCase)
            .thenApply(s -> s + " 25")
            .thenApply(s -> "Learning " + s);

        System.out.println(f.join());   // Learning JAVA 25
    }
}
```

### Example 2 — Combine two futures

```java
import java.util.concurrent.CompletableFuture;

public class Combine {
    public static void main(String[] args) {
        CompletableFuture<Integer> price = CompletableFuture.supplyAsync(() -> 100);
        CompletableFuture<Integer> tax = CompletableFuture.supplyAsync(() -> 18);

        CompletableFuture<Integer> total = price.thenCombine(tax, (p, t) -> p + t);
        System.out.println(total.join());   // 118
    }
}
```

### Example 3 — Error handling

```java
import java.util.concurrent.CompletableFuture;

public class Errors {
    public static void main(String[] args) {
        CompletableFuture<String> f = CompletableFuture
            .supplyAsync(() -> {
                if (true) throw new RuntimeException("failed");
                return "ok";
            })
            .exceptionally(ex -> "recovered: " + ex.getMessage());

        System.out.println(f.join());   // recovered: failed
    }
}
```

## Common Mistakes

1. **Using `thenApply` for async next steps** — use `thenCompose` to avoid nested futures.
2. **Calling `get()` without a timeout** — can block forever; `join()` shares the risk.
3. **Swallowing exceptions** — add `exceptionally`/`handle` to every async chain.
4. **Blocking in callbacks** — a blocking stage ties up the pool thread.
5. **Using `ThreadLocal` across virtual threads** — prefer Scoped Values (Java 25).
6. **Forgetting the common pool is daemon** — long-lived `supplyAsync` work may be cut off at exit; submit to an executor if needed.

## Best Practices

- Chain with `thenApply`/`thenAccept`/`thenCompose`/`thenCombine`; never block in the middle.
- Always attach `exceptionally` or `handle`.
- Use `thenCompose` for dependent async calls; `thenCombine`/`allOf` for independent ones.
- Prefer Scoped Values over `ThreadLocal` (Java 25, JEP 506).
- Explore Structured Concurrency (preview) for task groups with clear lifetimes.

## Practice Questions

1. Run `supplyAsync` and chain two `thenApply` transformations.
2. Combine two futures with `thenCombine` and print the sum.
3. Recover from a failing future with `exceptionally`.
4. Wait for three futures with `allOf`.
5. Write (in a comment) a Scoped Value example (Java 25).

## Multiple Choice Questions (MCQs)

### Q1. `supplyAsync` runs:
- a) On the calling thread only
- b) Asynchronously (on a pool thread)
- c) Never
- d) Synchronously

**Answer:** b

### Q2. `thenApply`:
- a) Transforms the result into a new value
- b) Consumes the result
- c) Blocks the thread
- d) Cancels the future

**Answer:** a

### Q3. For a dependent async call, use:
- a) `thenApply`
- b) `thenCompose`
- c) `thenRun`
- d) `thenAccept`

**Answer:** b

### Q4. `exceptionally`:
- a) Throws the exception
- b) Recovers with a fallback value
- c) Logs only
- d) Cancels

**Answer:** b

### Q5. Scoped Values (JEP 506) are a Java 25:
- a) Preview feature
- b) Final feature (replacing ThreadLocal-style usage)
- c) Removed feature
- d) Incubator module

**Answer:** b

## Key Takeaways

- `CompletableFuture`: `supplyAsync`/`runAsync` + `thenApply`/`thenAccept`/`thenCompose`/`thenCombine`.
- Handle errors with `exceptionally`/`handle`; wait with `allOf`/`anyOf`.
- Java 25: Scoped Values final (JEP 506); Structured Concurrency preview (JEP 505).

## Module 12 Complete 🎉

You've finished **Module 12 — Multithreading and Concurrency**. Next up: **Module 13 — Memory and Performance**.
