---
module: 5
topic: "5.3"
title: "The String Class"
slug: "the-string-class"
difficulty: "Beginner"
prerequisites:
  - Arrays (1D)
  - Methods
estimated_minutes: 30
tags:
  - java
  - strings
  - string-class
---

# 5.3 The String Class

## Overview

`String` is Java's built-in type for text. Unlike arrays, `String` is a full class with dozens of useful methods — and it's **immutable**: once created, a string can never change. This lesson covers the most-used `String` methods, the string pool, `equals` vs `==`, and the modern convenience methods every real codebase uses.

## Learning Objectives

After this lesson you will be able to:

- Create strings and understand immutability
- Use core methods: `length`, `charAt`, `substring`, `indexOf`, `split`
- Compare strings correctly with `equals` (never `==`)
- Use modern methods: `isBlank`, `strip`, `repeat`, `join`, `lines` (Java 11)
- Use text blocks (Java 15)

## Core Concepts

### Creation and immutability

```java
String s = "hello";
String t = new String("hello");   // explicit — rarely needed
String u = s + " world";          // concatenation creates a NEW string
// s is unchanged — strings are immutable
```

Because strings are **immutable**, every "modification" returns a new string; the original is untouched. Repeated concatenation in a loop is slow — use `StringBuilder` (5.4).

### Core methods

```java
String s = "Hello, World";

s.length();              // 12
s.charAt(0);             // 'H'
s.substring(7);          // "World"
s.substring(0, 5);       // "Hello"  (start, end-exclusive)
s.indexOf("World");      // 7
s.indexOf('o');          // 4
s.toLowerCase();         // "hello, world"
s.toUpperCase();         // "HELLO, WORLD"
s.contains("Hello");     // true
s.startsWith("He");      // true
s.endsWith("ld");        // true
s.split(", ");           // ["Hello", "World"]
s.replace("World", "Java"); // "Hello, Java"
```

### equals vs ==

```java
String a = "hello";
String b = "hello";
String c = new String("hello");

a.equals(b);    // true  — compares CONTENT (use this!)
a == b;         // true  — same pooled object (coincidence!)
a == c;         // false — different objects
a.equals(c);    // true  — content equal
```

**Always use `equals`** for content comparison. `==` compares references.

### The string pool

Literal strings (`"hello"`) are **interned** in a shared pool — identical literals point to the same object, saving memory. That's why `a == b` is true for literals but not for `new String(...)`.

## Modern Java / Java 25 Update

### Java 11 string methods (used everywhere today)

```java
"  hi  ".strip();          // "hi"     (Unicode-aware trim)
"  hi  ".trim();           // "hi"     (older, ASCII-only)
"".isBlank();              // true     (empty or only whitespace)
"   ".isBlank();           // true
"ab".repeat(3);            // "ababab"
String.join("-", "a", "b"); // "a-b"
"a\nb\nc".lines().count(); // 3        (stream of lines)
```

### Text blocks (Java 15)

```java
String json = """
    {
      "name": "Ankit",
      "age": 21
    }
    """;
```

Triple quotes preserve formatting and newlines — ideal for SQL/JSON/HTML.

### String.formatted (Java 15) and modern formatting

```java
String s = "Hello, %s!".formatted("Ankit");   // "Hello, Ankit!"
String s2 = String.format("Value: %.2f", 3.14159);  // "Value: 3.14"
```

## Visual — Immutability and the Pool

```
 String s = "hello";
 s.toUpperCase();      // returns a NEW "HELLO", s is unchanged
 s = s.toUpperCase();  // now s points at the new string

 Pool:  "hello" ◀── a, b (shared literal)
        "hello" (new object) ◀── c  (NOT pooled)
```

Immutability makes strings safe to share; the pool deduplicates literals.

## Code Examples

### Example 1 — Basic string operations

```java
public class StringOps {
    public static void main(String[] args) {
        String email = "ankit@example.com";
        int at = email.indexOf('@');
        String user = email.substring(0, at);
        String domain = email.substring(at + 1);
        System.out.println("User: " + user + ", Domain: " + domain);
    }
}
```

### Example 2 — Correct comparison

```java
public class Compare {
    public static void main(String[] args) {
        String input = "admin";
        if (input.equals("admin")) {      // content comparison
            System.out.println("Access granted");
        }
    }
}
```

### Example 3 — Modern methods

```java
public class ModernStrings {
    public static void main(String[] args) {
        String csv = "apple,banana,cherry";
        for (String item : csv.split(",")) {
            System.out.println(item.strip().toUpperCase());
        }
        System.out.println("=".repeat(20));      // ====================
        System.out.println(String.join(" | ", "a", "b", "c")); // a | b | c
    }
}
```

## Common Mistakes

1. **`==` to compare strings** — compares references; use `equals`.
2. **Forgetting immutability** — `s.toUpperCase();` alone does nothing; assign the result.
3. **`substring` end index** — it's exclusive: `substring(0, 5)` is chars 0–4.
4. **String concatenation in loops** — O(n²); use `StringBuilder`.
5. **`charAt` out of range** — `StringIndexOutOfBoundsException`; check `length`.
6. **Confusing `length` (array field) and `length()` (String method)**.

## Best Practices

- Always use `equals`/`equalsIgnoreCase` for comparison.
- Assign the result of string methods (they return new strings).
- Use `isBlank`/`strip` (Java 11) for whitespace checks.
- Use text blocks for multi-line strings; `formatted`/`format` for formatting.
- Use `StringBuilder` in loops; prefer `join` over manual concatenation.

## Practice Questions

1. Write a program that counts the vowels in a string.
2. Reverse a string entered by the user.
3. Check whether a string is a palindrome (use `equals` + `reverse`).
4. Extract the file extension from `"report.pdf"`.
5. Use a text block to print a small JSON and `repeat` to draw a divider.

## Multiple Choice Questions (MCQs)

### Q1. Java `String` is:
- a) Mutable
- b) Immutable
- c) A primitive
- d) An array

**Answer:** b

### Q2. To compare two strings by content, use:
- a) `==`
- b) `equals`
- c) `compare`
- d) `=`

**Answer:** b

### Q3. `"Hello".substring(0, 3)` returns:
- a) `"Hel"`
- b) `"Hell"`
- c) `"H"`
- d) `"Hello"`

**Answer:** a — end index is exclusive.

### Q4. `"  hi  ".strip()` returns:
- a) `"  hi  "`
- b) `"hi"`
- c) `" hi "`
- d) `"HI"`

**Answer:** b

### Q5. Text blocks use:
- a) `"""..."""`
- b) `"..."`
- c) `'...'`
- d) `#...#`

**Answer:** a

## Key Takeaways

- `String` is immutable; methods return new strings — assign the result.
- Use `equals` (not `==`) for content comparison.
- Core methods: `length`, `charAt`, `substring`, `indexOf`, `split`, `contains`.
- Modern (Java 11+): `strip`, `isBlank`, `repeat`, `join`, `lines`, text blocks, `formatted`.

## Next Topic

[5.4 StringBuilder and StringBuffer](lesson-5.4-stringbuilder-and-stringbuffer.md)
