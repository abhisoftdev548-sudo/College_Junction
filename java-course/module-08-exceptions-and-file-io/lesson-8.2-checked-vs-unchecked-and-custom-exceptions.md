---
module: 8
topic: "8.2"
title: "Checked vs Unchecked and Custom Exceptions"
slug: "checked-vs-unchecked-and-custom-exceptions"
difficulty: "Intermediate"
prerequisites:
  - Exceptions and try-catch-finally
estimated_minutes: 30
tags:
  - java
  - exceptions
  - checked
  - custom-exceptions
---

# 8.2 Checked vs Unchecked and Custom Exceptions

## Overview

Java divides exceptions into two families. **Checked exceptions** (like `IOException`) must be handled or declared — the compiler forces you to deal with them. **Unchecked exceptions** (`RuntimeException` and its subclasses, plus `Error`) don't. Understanding the difference — and writing your own **custom exceptions** — is key to designing clear, reliable APIs.

## Learning Objectives

After this lesson you will be able to:

- Distinguish checked vs unchecked exceptions
- Use `throws` to declare exceptions
- Throw exceptions with `throw`
- Write custom checked and unchecked exceptions
- Choose the right exception type for your API

## Core Concepts

### The hierarchy

```
Throwable
 ├── Exception
 │    ├── RuntimeException          ← unchecked
 │    │    ├── NullPointerException
 │    │    ├── ArithmeticException
 │    │    └── IllegalArgumentException
 │    └── IOException               ← checked
 │         └── FileNotFoundException
 └── Error                          ← unchecked (serious JVM problems)
```

### Checked exceptions — the compiler demands handling

```java
import java.io.*;

public class ReadFile {
    public static void main(String[] args) {
        FileReader fr = new FileReader("data.txt");   // COMPILE ERROR — checked
    }
}
```

Fix it either by catching, or by declaring with `throws`:

```java
public static void main(String[] args) throws IOException {   // option 2: declare
    FileReader fr = new FileReader("data.txt");
}
```

Checked exceptions force callers to consciously handle recoverable conditions (missing file, network failure).

### Unchecked exceptions — no compiler requirement

```java
String s = null;
s.length();               // NullPointerException — compiles fine, throws at runtime
int x = 10 / 0;           // ArithmeticException
```

These are usually **programming bugs** — fix the code, don't catch-and-ignore.

### throw — raising an exception yourself

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
}
```

`throw` creates and raises an exception; `throws` (on a method) declares what may escape.

### Custom checked exception

```java
public class InsufficientFundsException extends Exception {   // checked
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {
    private double balance;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Needed " + amount + ", have " + balance);
        }
        balance -= amount;
    }
}
```

### Custom unchecked exception

```java
public class InvalidAgeException extends RuntimeException {   // unchecked
    public InvalidAgeException(String message) { super(message); }
}
```

Extend `Exception` for checked (forces handling); extend `RuntimeException` for unchecked (programming errors).

## Visual — Checked vs Unchecked Decision

```
 Recoverable, caller CAN do something about it?
   ├── yes ──▶ checked exception (extend Exception) — compiler enforces handling
   └── no (programming bug) ──▶ unchecked (extend RuntimeException) — fix the code
```

The rule of thumb: checked = expected/recoverable; unchecked = bugs and invalid usage.

## Code Examples

### Example 1 — throws declaration

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileReader2 {
    public static String read(String file) throws IOException {
        return Files.readString(Path.of(file));   // may throw checked IOException
    }

    public static void main(String[] args) {
        try {
            System.out.println(read("data.txt"));
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}
```

### Example 2 — custom checked exception

```java
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) { super(message); }
}

public class Bank {
    private double balance = 100;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }
        balance -= amount;
    }

    public static void main(String[] args) {
        Bank b = new Bank();
        try {
            b.withdraw(500);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());   // Insufficient funds
        }
    }
}
```

### Example 3 — custom unchecked exception

```java
public class InvalidGradeException extends RuntimeException {
    public InvalidGradeException(String message) { super(message); }
}

public class Student {
    public void setGrade(double g) {
        if (g < 0 || g > 10) {
            throw new InvalidGradeException("Grade out of range: " + g);
        }
    }
}
```

## Common Mistakes

1. **Catching `Exception` and doing nothing** — swallows checked and unchecked alike.
2. **Making everything checked** — forces try/catch everywhere for programming bugs.
3. **Throwing generic `Exception`** — prefer specific custom types.
4. **Confusing `throw` and `throws`** — `throw` raises; `throws` declares.
5. **Catching `Error`** — JVM-level errors are usually not recoverable; don't catch them.
6. **Forgetting `throws` on a method that throws checked exceptions** — compile error.

## Best Practices

- Checked for recoverable, expected failures (I/O, network); unchecked for bugs/invalid input.
- Give custom exceptions clear messages and names (`InsufficientFundsException`).
- Extend `Exception` (checked) or `RuntimeException` (unchecked) — rarely `Throwable` directly.
- Add useful fields (e.g. the offending amount) for programmatic recovery.
- Don't catch unless you can meaningfully handle or enrich the exception.

## Practice Questions

1. Write a method that declares `throws IOException` and call it with try-catch.
2. Create a checked `InsufficientFundsException` and throw it from `withdraw`.
3. Create an unchecked `InvalidInputException` and throw it on bad input.
4. Explain the difference between `throw` and `throws`.
5. Draw (in a comment) the `Throwable` → `Exception` → `RuntimeException` hierarchy.

## Multiple Choice Questions (MCQs)

### Q1. Checked exceptions must be:
- a) Ignored
- b) Handled (caught) or declared with `throws`
- c) Converted to errors
- d) Marked final

**Answer:** b

### Q2. `NullPointerException` is:
- a) Checked
- b) Unchecked (a RuntimeException)
- c) An Error
- d) A custom exception

**Answer:** b

### Q3. `throw` is used to:
- a) Declare an exception
- b) Raise an exception
- c) Catch an exception
- d) Import an exception

**Answer:** b

### Q4. To make a custom checked exception, extend:
- a) `RuntimeException`
- b) `Error`
- c) `Exception`
- d) `Throwable` (always)

**Answer:** c

### Q5. The parent of all exceptions and errors is:
- a) `Exception`
- b) `Throwable`
- c) `Error`
- d) `RuntimeException`

**Answer:** b

## Key Takeaways

- Checked (compile-enforced) vs unchecked (bugs) — recoverable vs programming errors.
- `throw` raises; `throws` declares.
- Custom exceptions: extend `Exception` (checked) or `RuntimeException` (unchecked).
- Provide clear messages and meaningful types.

## Next Topic

[8.3 Introduction to File I/O](lesson-8.3-introduction-to-file-io.md)
