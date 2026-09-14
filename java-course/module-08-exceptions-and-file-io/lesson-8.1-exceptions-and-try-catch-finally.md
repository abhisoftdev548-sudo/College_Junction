---
module: 8
topic: "8.1"
title: "Exceptions and try-catch-finally"
slug: "exceptions-and-try-catch-finally"
difficulty: "Intermediate"
prerequisites:
  - Methods
  - Arrays and Strings
estimated_minutes: 30
tags:
  - java
  - exceptions
  - try-catch
---

# 8.1 Exceptions and try-catch-finally

## Overview

An **exception** is an object that signals an unexpected condition during program execution (divide by zero, missing file, bad input). If not handled, it propagates up the call stack and crashes the program. Java's **try-catch-finally** blocks let you detect, handle, and clean up after exceptions gracefully.

## Learning Objectives

After this lesson you will be able to:

- Explain exceptions vs normal errors
- Use `try`, `catch`, and `finally`
- Catch multiple exception types (and multi-catch)
- Access exception details (`getMessage`, `printStackTrace`)
- Understand exception propagation up the call stack

## Core Concepts

### The basic try-catch

```java
try {
    int result = 10 / 0;              // risky code
} catch (ArithmeticException e) {     // handle it
    System.out.println("Cannot divide by zero: " + e.getMessage());
}
```

- `try` — the code that might throw.
- `catch` — runs only if a matching exception is thrown.
- The program **continues** after the catch block (it doesn't crash).

### Catching multiple types

```java
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[5]);        // ArrayIndexOutOfBoundsException
    int x = Integer.parseInt("abc");   // NumberFormatException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index out of range");
} catch (NumberFormatException e) {
    System.out.println("Not a number");
}
```

Catch blocks are checked **in order** — put more specific exceptions first.

### Multi-catch (Java 7)

```java
try {
    // risky code
} catch (ArithmeticException | NumberFormatException e) {   // one block, two types
    System.out.println("Bad number: " + e);
}
```

The `|` syntax handles several types in one block (the variable is implicitly final).

### finally — always runs

```java
try {
    System.out.println("Opening file...");
    // risky code
} catch (IOException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup — always runs");
}
```

`finally` runs **whether or not** an exception occurred — perfect for cleanup (closing resources). Note: modern Java prefers **try-with-resources** (8.5) for closable resources.

### Exception details

```java
catch (Exception e) {
    e.getMessage();        // human-readable message
    e.toString();          // type + message
    e.printStackTrace();   // full stack trace (for debugging)
}
```

### How exceptions propagate

```java
public static void a() { b(); }          // a calls b
public static void b() { c(); }          // b calls c
public static void c() { throw new RuntimeException("boom"); }

// the exception unwinds c → b → a → main until a catch handles it
```

If no method catches it, the JVM prints the stack trace and terminates.

## Visual — try-catch-finally Flow

```
 try { risky code }
    │
    ├── no exception ──▶ skip catch ──▶ finally ──▶ continue
    │
    └── exception ──▶ matching catch? ──yes──▶ finally ──▶ continue
                             │
                             └─ no match ──▶ propagate up the call stack
```

`finally` always runs; uncaught exceptions unwind the call stack.

## Code Examples

### Example 1 — Graceful division

```java
public class Divide {
    public static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("Division by zero → returning 0");
            return 0;
        }
    }

    public static void main(String[] args) {
        System.out.println(safeDivide(10, 2));   // 5
        System.out.println(safeDivide(10, 0));   // 0 (handled)
    }
}
```

### Example 2 — finally for cleanup

```java
public class Cleanup {
    public static void main(String[] args) {
        try {
            System.out.println("Working...");
            throw new RuntimeException("something went wrong");
        } catch (RuntimeException e) {
            System.out.println("Handled: " + e.getMessage());
        } finally {
            System.out.println("Cleanup done");   // always printed
        }
        System.out.println("Program continues");
    }
}
```

### Example 3 — multi-catch

```java
public class Parse {
    public static void main(String[] args) {
        String[] inputs = {"10", "abc"};
        for (String s : inputs) {
            try {
                int n = Integer.parseInt(s);
                System.out.println(100 / n);
            } catch (ArithmeticException | NumberFormatException e) {
                System.out.println("Skipping '" + s + "': " + e);
            }
        }
    }
}
```

## Common Mistakes

1. **Swallowing exceptions** — an empty `catch` block hides bugs.
2. **Catching too broadly first** — `catch (Exception e)` before specific catches makes them unreachable.
3. **Putting code after `return` in `finally` thinking it won't run** — `finally` runs even with `return`.
4. **Forgetting that `finally` runs on exceptions too** — don't put critical-only-on-success logic there.
5. **Catching exceptions you can't handle** — let them propagate if you can't recover.
6. **Using exceptions for normal control flow** — they're for exceptional conditions.

## Best Practices

- Catch the **most specific** exception type you can handle.
- Always log or report — never silently swallow.
- Use `finally` (or try-with-resources) for cleanup.
- Use multi-catch when several types share handling.
- Throw/handle at the right level — don't catch just to rethrow unchanged.

## Practice Questions

1. Write try-catch for `int x = 10 / 0;` that prints a friendly message.
2. Catch `ArrayIndexOutOfBoundsException` and `NullPointerException` with multi-catch.
3. Write a try-finally block and explain when `finally` runs.
4. Demonstrate exception propagation across three methods.
5. Print the message and stack trace of a caught exception.

## Multiple Choice Questions (MCQs)

### Q1. An exception is:
- a) A syntax error
- b) An object signalling a runtime condition
- c) A compiler warning
- d) A memory leak

**Answer:** b

### Q2. `finally` runs:
- a) Only on success
- b) Only on exception
- c) Whether or not an exception occurred
- d) Only if no catch matches

**Answer:** c

### Q3. Multi-catch uses which syntax?
- a) `catch (A, B e)`
- b) `catch (A | B e)`
- c) `catch (A & B e)`
- d) `catch (A; B e)`

**Answer:** b

### Q4. `e.printStackTrace()` prints:
- a) Only the message
- b) The full stack trace
- c) Nothing
- d) The exception type only

**Answer:** b

### Q5. An uncaught exception:
- a) Is ignored
- b) Propagates up the call stack (and may crash the program)
- c) Is auto-fixed
- d) Becomes a warning

**Answer:** b

## Key Takeaways

- Exceptions are objects; handle with try-catch-finally.
- `finally` always runs; multi-catch handles several types at once.
- Uncaught exceptions unwind the call stack until handled (or the program stops).
- Catch specific types; never swallow exceptions silently.

## Next Topic

[8.2 Checked vs Unchecked and Custom Exceptions](lesson-8.2-checked-vs-unchecked-and-custom-exceptions.md)
