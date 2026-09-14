---
module: 13
topic: "13.4"
title: "String Pool and Immutability"
slug: "string-pool-and-immutability"
difficulty: "Advanced"
prerequisites:
  - Object References and Lifecycle
estimated_minutes: 30
tags:
  - java
  - strings
  - immutability
  - string-pool
---

# 13.4 String Pool and Immutability

## Overview

Strings are **immutable** — once created, a `String`'s content never changes. This single design choice enables the **string pool** (literal reuse), thread safety, and safe use as map keys. It also explains the classic `==` vs `equals` confusion and why string concatenation in loops should use `StringBuilder`.

## Learning Objectives

After this lesson you will be able to:

- Explain String immutability and its benefits
- Distinguish `==` (reference) from `equals` (value)
- Explain the string pool and `intern()`
- Avoid accidental O(n²) string building
- Recognize `new String(...)` vs literals

## Core Concepts

### Immutability

```java
String s = "hello";
s.toUpperCase();        // returns a NEW string — doesn't change s
System.out.println(s);  // still "hello"

String t = s.toUpperCase();   // "HELLO" is a separate object
```

No method on `String` mutates the original — they return new strings. (Why? Security, thread safety, caching hash codes, and the pool all depend on it.)

### == vs equals

```java
String a = "hello";
String b = "hello";
String c = new String("hello");

a == b;              // true — both point to the SAME pooled literal
a == c;              // false — c is a new object (not the pool)
a.equals(c);         // true — content equality
```

`==` compares **references**; `equals` compares **content**. Literals pool, `new String(...)` doesn't (by default).

### The string pool

```java
String x = "java";        // literal → interned in the pool
String y = "java";        // same pooled object (reused!)
```

When the JVM sees a string literal, it checks the **string pool** — if an equal string exists, it reuses it. That's why `"java" == "java"` is true and why literals save memory.

### intern() — pool a string manually

```java
String s1 = new String("java");   // not pooled
String s2 = s1.intern();          // return the pooled version
s2 == "java";                     // true
```

`intern()` puts (or finds) the string in the pool. Use sparingly — the pool is in the heap and overuse can bloat it.

### Concatenation — the O(n²) trap

```java
// BAD — creates a new String each iteration (O(n²) time + garbage):
String result = "";
for (int i = 0; i < 100000; i++) {
    result += i;              // each += builds a brand-new String
}

// GOOD — one mutable buffer:
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

Strings are immutable, so `+`/`+=` in a loop keeps allocating. Use `StringBuilder` (or `StringBuffer` when thread-safe) for repeated building.

### String is final

```java
// class MutableString extends String { }   // ERROR — String is final
```

`String` is `final` — you can't subclass it to break immutability.

## Visual — The String Pool

```
 literals:            heap objects:
 "java" ──────▶ ┌─────────────┐
 "java" ──────▶ │  "java"     │  ← ONE pooled object, shared
                └─────────────┘
 new String("java") ─▶ ┌─────────────┐   ← separate object (not pooled)
                       │  "java"     │
                       └─────────────┘
```

Literals deduplicate through the pool; `new String` creates a fresh object.

## Code Examples

### Example 1 — == vs equals

```java
public class Compare {
    public static void main(String[] args) {
        String a = "hello";
        String b = "hello";
        String c = new String("hello");

        System.out.println(a == b);        // true  (same pooled object)
        System.out.println(a == c);        // false (different objects)
        System.out.println(a.equals(c));   // true  (same content)
    }
}
```

### Example 2 — Immutability

```java
public class Immutable {
    public static void main(String[] args) {
        String s = "Java";
        s.concat(" 25");         // returns a new string, ignored
        System.out.println(s);   // Java (unchanged)

        String t = s.concat(" 25");
        System.out.println(t);   // Java 25
    }
}
```

### Example 3 — StringBuilder vs +=

```java
public class Build {
    public static void main(String[] args) {
        long start = System.nanoTime();
        String bad = "";
        for (int i = 0; i < 20000; i++) bad += "x";       // slow
        long mid = System.nanoTime();

        StringBuilder good = new StringBuilder();
        for (int i = 0; i < 20000; i++) good.append("x"); // fast
        long end = System.nanoTime();

        System.out.println("+= : " + (mid - start) / 1_000_000 + " ms");
        System.out.println("SB : " + (end - mid) / 1_000_000 + " ms");
    }
}
```

## Common Mistakes

1. **Using `==` to compare strings** — compares references; use `equals`.
2. **`+`/`+=` in loops** — O(n²); use `StringBuilder`.
3. **Assuming `new String("x")` is pooled** — it's a distinct object unless interned.
4. **Overusing `intern()`** — can bloat the pool and hurt performance.
5. **Trying to subclass `String`** — it's final.
6. **Expecting mutation methods to change the string** — they return new strings.

## Best Practices

- Compare strings with `equals` (or `equalsIgnoreCase`).
- Build repeated strings with `StringBuilder`.
- Let literals pool naturally; avoid `new String("literal")`.
- Use `intern()` only for deliberate, bounded deduplication.
- Rely on immutability for thread safety and map keys.

## Practice Questions

1. Show `==` vs `equals` with a literal and `new String(...)`.
2. Demonstrate immutability with `toUpperCase`/`concat`.
3. Compare `+=` vs `StringBuilder` performance in a loop.
4. Explain what `intern()` does and when to use it.
5. List three benefits of String immutability.

## Multiple Choice Questions (MCQs)

### Q1. Strings are:
- a) Mutable
- b) Immutable
- c) Primitives
- d) Not final

**Answer:** b

### Q2. `==` on two strings compares:
- a) Content
- b) References
- c) Length
- d) Hash codes

**Answer:** b

### Q3. String literals are stored in the:
- a) Stack
- b) String pool
- c) Metaspace only
- d) CPU cache

**Answer:** b

### Q4. For repeated string building in a loop, use:
- a) `+=`
- b) `StringBuilder`
- c) `concat` in a loop
- d) `intern`

**Answer:** b

### Q5. `intern()` returns:
- a) A new object always
- b) The pooled (canonical) version of the string
- c) The length
- d) A substring

**Answer:** b

## Key Takeaways

- Strings are immutable and final — enabling the pool, thread safety, safe keys.
- `==` = reference; `equals` = content; literals pool, `new String` doesn't.
- Use `StringBuilder` for loop concatenation (avoid O(n²)).
- `intern()` pools manually; use sparingly.

## Next Topic

[13.5 Performance Best Practices](lesson-13.5-performance-best-practices.md)
