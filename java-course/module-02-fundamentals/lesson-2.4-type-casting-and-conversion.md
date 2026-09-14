---
module: 2
topic: "2.4"
title: "Type Casting and Conversion"
slug: "type-casting-and-conversion"
difficulty: "Beginner"
prerequisites:
  - Operators and Expressions
estimated_minutes: 30
tags:
  - java
  - casting
  - conversion
  - pattern-matching
---

# 2.4 Type Casting and Conversion

## Overview

Java is **statically typed**, but values often need to move between types. Some conversions are automatic (**widening**), others need an explicit **cast** (**narrowing**), and still others use helper methods (strings ↔ numbers). Modern Java adds **pattern matching** for safe, automatic casting of objects.

## Learning Objectives

After this lesson you will be able to:

- Explain implicit widening and explicit narrowing
- Cast safely between numeric types
- Convert between strings and numbers
- Understand overflow and truncation
- Use `instanceof` pattern matching (Java 16+)

## Core Concepts

### Implicit widening (automatic)

```java
int i = 100;
long l = i;       // int → long  ✓ (wider, no data loss)
double d = i;     // int → double ✓
float f = 3.14f;
double d2 = f;    // float → double ✓
```

Widening `byte → short → int → long → float → double` happens automatically when no data is lost.

### Explicit narrowing (cast required)

```java
double d = 3.99;
int i = (int) d;     // 3 — the .99 is TRUNCATED (not rounded)

long big = 300;
byte b = (byte) big; // 44 — overflow! (300 doesn't fit in byte)
```

Narrowing can **lose data** (truncation or overflow). The cast `(type)` tells the compiler "I accept the risk."

### Truncation vs rounding

```java
(int) 3.99;    // 3  — truncates toward zero
Math.round(3.99);   // 4  — rounds properly (see 2.5)
```

### String ↔ number conversion

```java
// number → string
String s = String.valueOf(42);     // "42"
String s2 = 42 + "";               // "42" (concat)

// string → number
int i = Integer.parseInt("42");        // 42 (throws on bad input)
double d = Double.parseDouble("3.14"); // 3.14
```

### Reference casting and instanceof

```java
Object obj = "hello";

if (obj instanceof String) {        // classic check
    String s = (String) obj;        // then cast
    System.out.println(s.length());
}
```

## Modern Java / Java 25 Update

### instanceof pattern matching (Java 16) — check + cast in one step

```java
Object obj = "hello";

if (obj instanceof String s) {      // declares and casts s automatically
    System.out.println(s.length());
}
```

No separate cast needed — cleaner and less error-prone than the classic two-step.

### Java 25 — primitive patterns in instanceof (preview, JEP 507)

Java 25's preview extends pattern matching to primitives:

```java
// Preview in Java 25:
if (value instanceof int i) {      // matches when value fits an int
    IO.println("int: " + i);
}
```

> ⚠️ Preview only — enable with `--enable-preview`. Core (non-preview) Java is what production uses today.

## Visual — Widening vs Narrowing

```
 Widening (safe, automatic):
   byte → short → int → long → float → double
   int i = 5;  double d = i;   ✓ no cast

 Narrowing (risky, explicit):
   double → float → long → int → short → byte
   double d = 3.99;  int i = (int) d;   ⚠ cast + data loss
```

Widening is a safe "bigger box"; narrowing needs a cast and can lose information.

## Code Examples

### Example 1 — Casting in a calculation

```java
public class Average {
    public static void main(String[] args) {
        int total = 20, count = 6;
        double avg = (double) total / count;   // cast BEFORE dividing
        System.out.println(avg);               // 3.333...
    }
}
```

### Example 2 — Parse and format

```java
public class ParseDemo {
    public static void main(String[] args) {
        String input = "42";
        int n = Integer.parseInt(input);
        System.out.println(n + 8);              // 50

        double price = 9.99;
        System.out.println("Price: " + String.valueOf(price));  // "Price: 9.99"
    }
}
```

### Example 3 — Pattern matching (Java 16)

```java
public class PatternDemo {
    public static void main(String[] args) {
        Object value = "hello";

        if (value instanceof String s) {
            System.out.println("String of length " + s.length());
        } else if (value instanceof Integer i) {
            System.out.println("Integer: " + i);
        }
    }
}
```

## Common Mistakes

1. **Integer division before casting** — `(double)(total / count)` still truncates; cast an operand first.
2. **Expecting rounding from a cast** — `(int) 3.99` is 3, not 4.
3. **Silent overflow** — `(byte) 300` wraps to 44.
4. **`parseInt` on invalid input** — throws `NumberFormatException`; validate input.
5. **Casting between unrelated reference types** — causes `ClassCastException`; check with `instanceof` first.
6. **Forgetting that `float` is narrower than `double`** — `double` → `float` needs a cast.

## Best Practices

- Cast operands (not just the result) when dividing for decimals.
- Use `Math.round`/`BigDecimal` when rounding matters.
- Prefer `instanceof` pattern matching over manual casts.
- Validate strings before `parseInt`/`parseDouble`.
- Avoid unnecessary narrowing; widen only when safe.

## Practice Questions

1. Compute `17 / 4` as a `double` correctly and explain the cast placement.
2. Show the difference between `(int) 3.99` and `Math.round(3.99)`.
3. Parse `"123"` to an `int`, add 10, and print the result.
4. Use `instanceof` pattern matching to safely handle a `String`, `Integer`, and `Double`.
5. Explain, with code, why `(byte) 300` doesn't equal 300.

## Multiple Choice Questions (MCQs)

### Q1. Which conversion happens automatically (widening)?
- a) `double` → `int`
- b) `int` → `long`
- c) `long` → `int`
- d) `float` → `int`

**Answer:** b

### Q2. `(int) 3.99` evaluates to:
- a) 4
- b) 3
- c) 3.99
- d) A compile error

**Answer:** b — casting truncates.

### Q3. `Integer.parseInt("42")` returns:
- a) `"42"` (String)
- b) `42` (int)
- c) `42.0` (double)
- d) `char`

**Answer:** b

### Q4. `instanceof String s` (pattern matching) does:
- a) Only checks the type
- b) Checks the type and declares/casts `s` automatically
- c) Converts to a string
- d) Nothing

**Answer:** b

### Q5. `(byte) 300` gives:
- a) 300
- b) 0
- c) 44 (overflow)
- d) A compile error

**Answer:** c — 300 doesn't fit a byte, so it wraps.

## Key Takeaways

- Widening (small→big) is automatic; narrowing (big→small) needs a cast and can lose data.
- Cast truncates; `Math.round` rounds; `parseInt`/`parseDouble` convert strings.
- Pattern matching (`instanceof String s`, Java 16) combines check + cast.
- Java 25 previews primitive patterns — preview-only for now.

## Next Topic

[2.5 Math Class and Wrapper Types](lesson-2.5-math-class-and-wrapper-types.md)
