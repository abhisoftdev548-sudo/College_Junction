---
module: 2
topic: "2.2"
title: "Primitive Data Types"
slug: "primitive-data-types"
difficulty: "Beginner"
prerequisites:
  - Variables and Constants
estimated_minutes: 30
tags:
  - java
  - data-types
  - primitives
  - text-blocks
---

# 2.2 Primitive Data Types

## Overview

Java has **eight primitive types** — the raw building blocks stored directly in memory — plus reference types for objects. This lesson covers each primitive's size and range, literals (including modern niceties like underscores and text blocks), and how Java 25's pattern matching is starting to treat primitives more uniformly.

## Learning Objectives

After this lesson you will be able to:

- List the eight primitive types with sizes and ranges
- Write correct literals for each type
- Use underscores in numeric literals (Java 7) and text blocks (Java 15)
- Distinguish primitives from reference types
- Recognize Java 25's primitive pattern matching (preview)

## Core Concepts

### The eight primitives

| Type | Size | Range / Notes | Example |
|---|---|---|---|
| `byte` | 1 byte | -128 to 127 | `byte b = 100;` |
| `short` | 2 bytes | -32,768 to 32,767 | `short s = 30000;` |
| `int` | 4 bytes | ~±2.1 billion | `int i = 100000;` |
| `long` | 8 bytes | ~±9.2 × 10¹⁸ | `long l = 5000000000L;` |
| `float` | 4 bytes | single precision | `float f = 3.14f;` |
| `double` | 8 bytes | double precision | `double d = 3.14159;` |
| `char` | 2 bytes | one Unicode char | `char c = 'A';` |
| `boolean` | 1 bit (logical) | `true` / `false` | `boolean ok = true;` |

### Literal rules

```java
int decimal = 42;
int hex = 0x2A;            // 42
int binary = 0b101010;     // 42
long big = 5_000_000_000L; // underscores improve readability (Java 7)
double d = 3.14;           // default double
float f = 3.14f;           // needs 'f'
char c = 'A';              // single quotes
String s = "hello";        // double quotes (String is a reference type)
```

### Strings and text blocks (Java 15)

```java
String single = "hello";

String block = """
    This is a
    multi-line text block.
    """;
```

Text blocks use triple quotes and preserve line breaks — great for SQL, JSON, and long messages.

### Primitive vs reference

```java
int x = 42;              // primitive: stores the value
String s = "hello";      // reference: stores a reference to an object
```

Primitives are faster and stored directly; reference types are objects on the heap.

## Modern Java / Java 25 Update

### JEP 507 — Primitive Types in Patterns, instanceof, and switch (Third Preview in Java 25)

Pattern matching has worked for reference types (`instanceof String s`). Java 25's preview extends it to **primitives**, so you can match numeric types uniformly:

```java
// Java 25 (preview): switch over primitives with type patterns
switch (value) {
    case byte b   -> IO.println("byte: " + b);
    case int i    -> IO.println("int: " + i);
    case long l   -> IO.println("long: " + l);
    default       -> IO.println("other");
}
```

> ⚠️ Preview features must be enabled (`--enable-preview`) and may change. For production code, stick to the classic `if`/`switch` you'll learn in Module 3.

## Visual — Primitive Sizes

```
 byte   1 byte   ┌──┐
 short  2 bytes  ┌────┐
 int    4 bytes  ┌────────┐
 long   8 bytes  ┌────────────────┐
 float  4 bytes  ┌────────┐  (decimal, approximate)
 double 8 bytes  ┌────────────────┐  (decimal, approximate)
 char   2 bytes  ┌────┐  (one Unicode character)
 boolean 1 bit    ▪  (true/false)
```

Integer types are exact; floating types are approximate (never use `==` for exact decimal equality).

## Code Examples

### Example 1 — Every primitive in action

```java
public class Primitives {
    public static void main(String[] args) {
        byte level = 5;
        short year = 2026;
        int students = 15000;
        long population = 7_900_000_000L;
        float price = 9.99f;
        double gpa = 8.95;
        char grade = 'A';
        boolean passed = true;

        System.out.println("Students: " + students + ", GPA: " + gpa + ", Passed: " + passed);
    }
}
```

### Example 2 — Numeric literal forms

```java
public class Literals {
    public static void main(String[] args) {
        int dec = 255;
        int hex = 0xFF;        // 255
        int bin = 0b11111111;  // 255
        long big = 1_000_000_000L;   // underscores for readability
        System.out.println(dec + " " + hex + " " + bin + " " + big);
    }
}
```

### Example 3 — Text block (Java 15)

```java
public class TextBlock {
    public static void main(String[] args) {
        String sql = """
                SELECT id, name
                FROM students
                WHERE gpa > 8.5
                """;
        System.out.println(sql);
    }
}
```

## Common Mistakes

1. **`long x = 5000000000;`** without `L` — the literal is an `int` and overflows at compile time.
2. **`float f = 3.14;`** without `f` — a `double` can't auto-narrow to `float`.
3. **`char c = "A";`** — `char` needs single quotes; `"A"` is a `String`.
4. **Comparing `double`s with `==`** — floating point is approximate; compare with a tolerance.
5. **Using `int` for big sums** — products overflow silently; use `long` (or `BigInteger`).
6. **Treating `String` as a primitive** — it's a reference type (a class), though it feels primitive.

## Best Practices

- Use `int` for integers and `double` for decimals by default.
- Reach for `long` when values can exceed ~2.1 billion.
- Add `L`/`f` suffixes and underscores to literals for clarity.
- Prefer `BigDecimal` for money (exact decimals) — see 2.5.
- Use text blocks for multi-line strings; use preview features only in experimentation.

## Practice Questions

1. Declare a variable of each of the eight primitive types with a valid value.
2. Explain why `long x = 5000000000;` fails and show the fix.
3. Write a text block containing a small JSON snippet.
4. What is the difference between a primitive and a reference type? Give examples.
5. Show, with comments, a Java 25 preview switch over primitive type patterns.

## Multiple Choice Questions (MCQs)

### Q1. Which is the correct `long` literal?
- a) `10000000000`
- b) `10000000000L`
- c) `10000000000f`
- d) `10000000000d`

**Answer:** b

### Q2. `float` literals need which suffix?
- a) `d`
- b) `l`
- c) `f`
- d) `s`

**Answer:** c

### Q3. A text block is written with:
- a) Single quotes
- b) Three double quotes (`"""..."""`)
- c) Backticks
- d) Three single quotes

**Answer:** b

### Q4. Which primitive type stores a single Unicode character?
- a) `String`
- b) `char`
- c) `byte`
- d) `short`

**Answer:** b

### Q5. Java 25's JEP 507 (preview) extends pattern matching to:
- a) Classes only
- b) Primitive types in `instanceof` and `switch`
- c) Databases
- d) XML

**Answer:** b

## Key Takeaways

- Eight primitives: byte, short, int, long, float, double, char, boolean.
- Literals: `L` for long, `f` for float, underscores for readability, text blocks for multi-line strings.
- Primitives store values; reference types store references.
- Java 25 previews primitive patterns — optional, preview-only for now.

## Next Topic

[2.3 Operators and Expressions](lesson-2.3-operators-and-expressions.md)
