---
module: 10
topic: "10.1"
title: "Introduction to Generics"
slug: "introduction-to-generics"
difficulty: "Intermediate"
prerequisites:
  - Collections Framework
estimated_minutes: 30
tags:
  - java
  - generics
  - type-safety
---

# 10.1 Introduction to Generics

## Overview

**Generics** let you write code that works with *any* type while staying **type-safe** — the compiler checks types at compile time and you avoid casts and `ClassCastException` at runtime. They were introduced in Java 5 and power the Collections Framework: `List<String>` vs a raw `List`. This lesson covers the "why" and the fundamentals.

## Learning Objectives

After this lesson you will be able to:

- Explain why generics exist (type safety)
- Use parameterized types like `List<String>`
- Recognize raw types and why they're dangerous
- Understand compile-time checking vs runtime erasure
- Use the diamond operator `<>`

## Core Concepts

### The problem generics solve

```java
// Before generics (raw types) — unsafe:
List list = new ArrayList();
list.add("hello");
list.add(42);              // anything goes
String s = (String) list.get(0);   // requires a cast
String t = (String) list.get(1);   // ClassCastException at RUNTIME!
```

With generics, the compiler prevents the mistake:

```java
List<String> list = new ArrayList<>();
list.add("hello");
// list.add(42);           // COMPILE ERROR — 42 is not a String
String s = list.get(0);    // no cast needed, guaranteed String
```

### Type parameters

```java
List<String> strings;          // List of String
Map<String, Integer> ages;     // Map from String to Integer
Set<Double> prices;            // Set of Double
```

The type in `<...>` is the **type argument**; you can't use primitives — use wrappers (`Integer`, `Double`).

### The diamond operator (Java 7)

```java
List<String> names = new ArrayList<>();    // <> infers String (since Java 7)
Map<String, Integer> m = new HashMap<>();  // no need to repeat types
```

The diamond `<>` infers the type argument from the declaration — less repetition.

### Raw types — the legacy danger

```java
List raw = new ArrayList();       // raw type — no type argument
raw.add("text");
raw.add(123);                     // compiler can't stop you

List<String> typed = raw;         // unchecked warning — unsafe
```

Raw types exist only for backward compatibility with pre-Java 5 code. Avoid them — they disable type checking.

### Generics are compile-time (type erasure)

```java
List<String> a = new ArrayList<>();
List<Integer> b = new ArrayList<>();
// At runtime, both are just ArrayList — the type info is "erased".
```

Java **erases** the type arguments after checking them (for backward compatibility). This means:

- No `new T()`, no `T.class`, no `instanceof T` with a type parameter.
- You can't overload methods that differ only by type parameter.

### Generic types are invariant

```java
List<String> strings = new ArrayList<>();
List<Object> objects = strings;   // COMPILE ERROR — invariance
```

`List<String>` is **not** a subtype of `List<Object>` even though `String` is an `Object`. (Wildcards in 10.3 relax this.)

## Visual — Raw vs Generic

```
 raw List:                        generic List<String>:
 ┌──────────────────┐             ┌──────────────────┐
 │ "hello"          │             │ "hello"          │  ✓
 │ 42               │  ← mix      │ (42 rejected)    │  ✗ compile error
 │ new Object()     │  of types   │                  │
 └──────────────────┘             └──────────────────┘
 needs casts + runtime checks     checked at COMPILE time, no casts
```

Generics move error detection from runtime (crashes) to compile time (red squiggles).

## Code Examples

### Example 1 — Type-safe list

```java
import java.util.ArrayList;
import java.util.List;

public class SafeList {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ankit");
        names.add("Riya");
        for (String name : names) {     // typed — no cast
            System.out.println(name.toUpperCase());
        }
    }
}
```

### Example 2 — Generic map

```java
import java.util.HashMap;
import java.util.Map;

public class PhoneBook {
    public static void main(String[] args) {
        Map<String, Integer> phone = new HashMap<>();
        phone.put("Ankit", 98765);
        phone.put("Riya", 54321);
        Integer ankitsNumber = phone.get("Ankit");   // Integer, no cast
        System.out.println(ankitsNumber);
    }
}
```

### Example 3 — Catching the compile-time error

```java
import java.util.ArrayList;
import java.util.List;

public class CompileCheck {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>();
        nums.add(10);
        // nums.add("ten");     // uncommenting → compile error, not a runtime crash
        int first = nums.get(0);
        System.out.println(first);
    }
}
```

## Common Mistakes

1. **Using raw types** — `List list` loses all type safety.
2. **Using primitives as type arguments** — `List<int>` is invalid; use `List<Integer>`.
3. **Assuming `List<String>` is a `List<Object>`** — generics are invariant (use wildcards).
4. **Trying `new T()` or `instanceof T`** — erased at runtime; not allowed.
5. **Ignoring unchecked warnings** — they usually indicate a raw-type mixing bug.
6. **Mixing raw and generic types** — pollutes type safety silently.

## Best Practices

- Always parameterize collections and generic types.
- Use the diamond `<>` to reduce boilerplate.
- Avoid raw types entirely (except when interfacing with legacy code, and even then be careful).
- Use wrapper classes for primitives as type arguments.
- Treat unchecked warnings as bugs to fix.

## Practice Questions

1. Create a `List<Integer>` and show that adding a `String` fails to compile.
2. Create a `Map<String, Double>` of product prices and look one up without a cast.
3. Explain what a raw type is and why it's dangerous.
4. Explain why `List<String>` cannot be assigned to `List<Object>`.
5. Show the diamond operator in use and explain what it infers.

## Multiple Choice Questions (MCQs)

### Q1. Generics provide:
- a) Runtime speed only
- b) Compile-time type safety
- c) Reflection
- d) Serialization

**Answer:** b

### Q2. `List<String>` means:
- a) A list that may hold anything
- b) A list that holds only Strings (checked)
- c) A list of characters
- d) A raw list

**Answer:** b

### Q3. The diamond operator `<>` was introduced in:
- a) Java 5
- b) Java 7
- c) Java 8
- d) Java 11

**Answer:** b

### Q4. At runtime, generic type information is:
- a) Kept fully
- b) Erased (type erasure)
- c) Converted to strings
- d) Stored in metadata only

**Answer:** b

### Q5. A raw type is:
- a) A generic type used without a type argument
- b) A primitive
- c) An interface
- d) A lambda

**Answer:** a

## Key Takeaways

- Generics = compile-time type safety; no casts, no runtime `ClassCastException`.
- Diamond `<>` (Java 7) infers type arguments.
- Raw types disable checking — avoid them.
- Type erasure: generics are compile-time only; invariant by default.

## Next Topic

[10.2 Generic Classes and Methods](lesson-10.2-generic-classes-and-methods.md)
