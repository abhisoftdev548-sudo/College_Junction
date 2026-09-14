---
module: 2
topic: "2.5"
title: "Math Class and Wrapper Types"
slug: "math-class-and-wrapper-types"
difficulty: "Beginner"
prerequisites:
  - Type Casting and Conversion
estimated_minutes: 30
tags:
  - java
  - math
  - wrappers
  - autoboxing
---

# 2.5 Math Class and Wrapper Types

## Overview

Java's **`Math`** class provides common numeric functions (power, square root, rounding, random). **Wrapper classes** (`Integer`, `Double`, etc.) let primitives behave as objects, enable collections like `ArrayList<Integer>`, and offer parsing/constant helpers. Together they round out numeric work — including exact decimals with `BigDecimal`.

## Learning Objectives

After this lesson you will be able to:

- Use key `Math` methods (`pow`, `sqrt`, `abs`, `round`, `random`, `clamp`)
- Explain wrapper classes and **autoboxing/unboxing**
- Parse and format numbers via wrappers
- Use `BigInteger`/`BigDecimal` for huge or exact values
- Recognize Java 25's Stable Values (preview) as a modern constants idea

## Core Concepts

### The Math class

```java
Math.abs(-5);            // 5
Math.max(3, 9);          // 9
Math.min(3, 9);          // 3
Math.pow(2, 10);         // 1024.0
Math.sqrt(16);           // 4.0
Math.round(3.6);         // 4   (rounds)
Math.floor(3.9);         // 3.0 (down)
Math.ceil(3.1);          // 4.0 (up)
Math.random();           // double in [0.0, 1.0)
Math.clamp(x, min, max); // clamps x into [min, max]  (Java 21)
```

`Math.clamp` (Java 21) is a handy modern addition for bounding values.

### Wrapper classes

Each primitive has a wrapper:

| Primitive | Wrapper |
|---|---|
| `int` | `Integer` |
| `long` | `Long` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

```java
int x = 5;
Integer boxed = x;         // autoboxing (int → Integer)
int unboxed = boxed;       // unboxing (Integer → int)
```

**Autoboxing/unboxing** is the automatic conversion between primitive and wrapper — done by the compiler.

### Wrapper helpers

```java
Integer.parseInt("42");        // String → int
Integer.valueOf("42");         // String → Integer
Integer.toString(42);          // int → String
Integer.MAX_VALUE;             // 2147483647
Integer.MIN_VALUE;             // -2147483648
Double.parseDouble("3.14");    // String → double
```

### BigInteger and BigDecimal (exact numbers)

```java
import java.math.BigInteger;
import java.math.BigDecimal;

BigInteger huge = new BigInteger("123456789012345678901234567890");
BigInteger product = huge.multiply(huge);   // exact, no overflow

BigDecimal price = new BigDecimal("19.99");   // exact decimal (for money)
BigDecimal total = price.multiply(new BigDecimal("3"));
// total = 59.97 (no floating-point drift)
```

Use `BigInteger` for integers beyond `long`, and `BigDecimal` for exact decimals (money, scientific data).

## Modern Java / Java 25 Update

### JEP 502 — Stable Values (Preview in Java 25)

Java 25 introduces **Stable Values** — an alternative to `final` fields that allows **lazy, at-most-once** initialization:

```java
// Preview in Java 25 (enable --enable-preview)
StableValue<BigInteger> EXPENSIVE = StableValue.of(() -> computeBigNumber());
// first access runs the lambda once; all later accesses get the same value
```

Benefits over `final` fields: no eager initialization cost at startup, thread-safe, immutable after first set.

> ⚠️ Preview only. For today's production code, `static final` constants (2.1) remain the standard.

## Visual — Autoboxing

```
 int x = 5;                 Integer boxed = x;      // auto-wrap
 ┌─────┐                    ┌───────────┐
 │  5  │  ──autoboxing──▶   │ Integer   │──▶ heap object
 └─────┘  ◀──unboxing──     │ (holds 5) │
          int y = boxed;    └───────────┘
```

The compiler inserts `Integer.valueOf(x)` / `boxed.intValue()` automatically — invisible but real (and slightly slower than plain primitives).

## Code Examples

### Example 1 — Math utilities

```java
public class MathDemo {
    public static void main(String[] args) {
        System.out.println(Math.pow(2, 10));          // 1024.0
        System.out.println(Math.sqrt(144));           // 12.0
        System.out.println(Math.round(3.6));          // 4
        System.out.println(Math.clamp(150, 0, 100));  // 100 (Java 21)
    }
}
```

### Example 2 — Parsing and constants

```java
public class WrapperDemo {
    public static void main(String[] args) {
        int n = Integer.parseInt("42");
        System.out.println(n * 2);              // 84
        System.out.println(Integer.MAX_VALUE);   // 2147483647

        double d = Double.parseDouble("3.14");
        System.out.println(d);
    }
}
```

### Example 3 — Exact money with BigDecimal

```java
import java.math.BigDecimal;

public class Money {
    public static void main(String[] args) {
        BigDecimal price = new BigDecimal("19.99");
        BigDecimal qty = new BigDecimal("3");
        BigDecimal total = price.multiply(qty);
        System.out.println(total);   // 59.97 (exact)
    }
}
```

## Common Mistakes

1. **Using `double` for money** — `0.1 + 0.2` ≠ `0.3`; use `BigDecimal`.
2. **`Math.random()` for integers** — it returns `[0.0, 1.0)`; scale it: `(int)(Math.random() * 10)`.
3. **`parseInt` on non-numeric strings** — throws `NumberFormatException`.
4. **`==` on wrapper objects** — compares references, not values (caching makes small values "work" misleadingly); use `equals` or unbox.
5. **Ignoring `BigDecimal`'s scale** — use string constructors (`new BigDecimal("0.1")`), not `double`.
6. **Overusing wrappers in hot loops** — autoboxing adds overhead; prefer primitives.

## Best Practices

- Use `Math` methods instead of hand-rolled equivalents.
- Use `BigDecimal` for money/exact decimals; `BigInteger` for huge integers.
- Prefer primitives for performance-critical code; wrappers for collections.
- Parse with `parseXxx` inside try/catch or after validation.
- Use `Math.clamp` (Java 21+) to bound values cleanly.

## Practice Questions

1. Compute the square root of 2 and round it to 2 decimal places.
2. Parse two integers from strings, add them, and print the sum.
3. Generate a random integer between 1 and 6 (a dice roll).
4. Add `0.1` and `0.2` as `double` and as `BigDecimal` — explain the difference.
5. Write a comment-only snippet showing Java 25's Stable Value idea vs a `final` field.

## Multiple Choice Questions (MCQs)

### Q1. `Math.pow(2, 3)` returns:
- a) 6
- b) 8.0
- c) 9
- d) 5

**Answer:** b

### Q2. The wrapper class for `int` is:
- a) `Int`
- b) `Integer`
- c) `Number`
- d) `Int32`

**Answer:** b

### Q3. Autoboxing is:
- a) Manual casting
- b) Automatic primitive ↔ wrapper conversion
- c) Boxing a class
- d) Serialization

**Answer:** b

### Q4. For exact decimal arithmetic (money), use:
- a) `double`
- b) `float`
- c) `BigDecimal`
- d) `int`

**Answer:** c

### Q5. `Integer.parseInt("abc")` throws:
- a) `NullPointerException`
- b) `NumberFormatException`
- c) `ClassCastException`
- d) Nothing (returns 0)

**Answer:** b

## Key Takeaways

- `Math` gives power/sqrt/abs/round/random and (Java 21) `clamp`.
- Wrappers add object behaviour to primitives; autoboxing converts automatically.
- `BigInteger` = huge exact integers; `BigDecimal` = exact decimals (money).
- Java 25 previews Stable Values for lazy immutable initialization.

## Module 2 Complete 🎉

You've finished **Module 2 — Fundamentals: Variables, Data Types, Operators**. Next up: **Module 3 — Control Flow**.
