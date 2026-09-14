---
module: 7
topic: "7.5"
title: "Records and Modern Java"
slug: "records-and-modern-java"
difficulty: "Intermediate"
prerequisites:
  - Enums
  - Encapsulation and Access Modifiers
estimated_minutes: 30
tags:
  - java
  - records
  - sealed-classes
  - modern-java
---

# 7.5 Records and Modern Java

## Overview

Modern Java added features that cut out mountains of boilerplate. **Records** (Java 16) are immutable data carriers that auto-generate constructors, accessors, `equals`, `hashCode`, and `toString`. **Sealed classes** (Java 17) restrict which classes may extend a type. This lesson covers both — the modern way to model data and closed type hierarchies.

## Learning Objectives

After this lesson you will be able to:

- Declare records and use their generated members
- Add custom constructors and methods to records
- Explain records' immutability and when to use them
- Use sealed classes/interfaces (Java 17)
- Convert classic "POJO" boilerplate into a record

## Core Concepts

### A record — one line replaces a whole class

```java
public record Point(int x, int y) { }
```

This single line automatically provides:

- A constructor `Point(int x, int y)`
- Accessors `x()` and `y()` (not `getX()`)
- `equals`, `hashCode`, and `toString` based on the components

```java
Point p = new Point(3, 4);
p.x();                    // 3 (accessor)
p.y();                    // 4
System.out.println(p);    // Point[x=3, y=4]
```

### The classic boilerplate it replaces

```java
// Before records — 50+ lines:
public class PointOld {
    private final int x, y;
    public PointOld(int x, int y) { this.x = x; this.y = y; }
    public int getX() { return x; }
    public int getY() { return y; }
    public boolean equals(Object o) { /* ... */ }
    public int hashCode() { /* ... */ }
    public String toString() { /* ... */ }
}

// After records — 1 line:
public record Point(int x, int y) { }
```

### Compact constructors and custom methods

```java
public record Rectangle(int width, int height) {
    // compact constructor — validates before fields are assigned
    public Rectangle {
        if (width <= 0 || height <= 0) {
            throw new IllegalArgumentException("positive only");
        }
    }

    // extra methods
    public int area() { return width * height; }
}
```

A **compact constructor** (no parameter list) lets you validate — the assignments happen automatically after.

### Records are immutable

```java
Point p = new Point(1, 2);
// p.x = 5;        // ERROR — no setter; components are final
```

Records are **immutable data carriers** — perfect for DTOs, tuples, config, and value objects. They cannot be extended (they're implicitly `final`).

### Sealed classes and interfaces (Java 17)

```java
public sealed class Shape permits Circle, Square { }

public final class Circle extends Shape { }
public final class Square extends Shape { }
// public class Triangle extends Shape { }  // ERROR — not permitted
```

`sealed` declares an **exhaustive, closed** set of subclasses — ideal with pattern-matching switch:

```java
double area(Shape s) {
    return switch (s) {           // exhaustive — no default needed
        case Circle c -> Math.PI * c.r() * c.r();
        case Square sq -> sq.s() * sq.s();
    };
}
```

## Visual — Record vs Classic Class

```
 classic POJO:                    record:
  fields + getters                  public record Point(int x, int y) {}
  + setters?  no
  + equals/hashCode/toString   ──▶  all generated automatically
  + constructor
  (50 lines)                        (1 line, immutable)
```

Records = boilerplate-free immutable data. Use them when the "identity" of the object is just its data.

## Code Examples

### Example 1 — A record for a student

```java
public record Student(String name, int rollNo, double gpa) { }

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ankit", 21, 8.9);
        System.out.println(s.name());       // Ankit
        System.out.println(s);              // Student[name=Ankit, rollNo=21, gpa=8.9]

        Student t = new Student("Ankit", 21, 8.9);
        System.out.println(s.equals(t));    // true (value equality)
    }
}
```

### Example 2 — Record with validation

```java
public record BankAccount(String owner, double balance) {
    public BankAccount {
        if (owner == null || owner.isBlank()) throw new IllegalArgumentException("owner required");
        if (balance < 0) throw new IllegalArgumentException("negative balance");
    }

    public double balanceInRupees() { return balance; }
}
```

### Example 3 — Sealed hierarchy + switch

```java
public sealed interface Payment permits CardPayment, CashPayment { }

public record CardPayment(String cardNo, double amount) implements Payment { }
public record CashPayment(double amount) implements Payment { }

public class Processor {
    public static String describe(Payment p) {
        return switch (p) {
            case CardPayment c -> "Card " + c.cardNo() + ": " + c.amount();
            case CashPayment c -> "Cash: " + c.amount();
        };
    }
}
```

## Common Mistakes

1. **Trying to add setters to a record** — components are final and immutable by design.
2. **Expecting `getX()` accessors** — records use `x()`, not `getX()`.
3. **Extending a record** — records are implicitly `final`.
4. **Using records for mutable state** — use a normal class for entities that change.
5. **Forgetting `permits`** — a sealed type must list its permitted subclasses.
6. **Non-exhaustive switch over a sealed type** — the compiler needs all cases (or a default).

## Best Practices

- Use records for immutable data: DTOs, tuples, config values, results.
- Use compact constructors for validation.
- Use sealed types + pattern-matching switch for closed hierarchies.
- Keep records small and value-like; use classes for mutable entities.
- Prefer records over hand-written POJOs wherever immutability fits.

## Practice Questions

1. Convert a `Person` class (name, age + getters + equals + toString) into a record.
2. Write a record with a compact constructor that validates its fields.
3. Add a custom method to a record (e.g. `area()`).
4. Create a sealed interface with two permitted records and switch over it.
5. Explain why records can't be extended and have no setters.

## Multiple Choice Questions (MCQs)

### Q1. Records were finalized in:
- a) Java 8
- b) Java 11
- c) Java 16
- d) Java 25

**Answer:** c

### Q2. A record's accessors are named:
- a) `getX()`
- b) `x()`
- c) `x`
- d) `accessX()`

**Answer:** b

### Q3. Record components are:
- a) Mutable
- b) Final (immutable)
- c) Static
- d) Optional

**Answer:** b

### Q4. A sealed class uses which keyword to list allowed subclasses?
- a) `allows`
- b) `permits`
- c) `extends`
- d) `limits`

**Answer:** b

### Q5. A compact constructor in a record:
- a) Takes no parameter list
- b) Cannot validate
- c) Must be public
- d) Adds a field

**Answer:** a

## Key Takeaways

- Records (Java 16) = immutable data carriers with generated constructor/accessors/equals/hashCode/toString.
- Use compact constructors for validation; accessors are `x()` not `getX()`.
- Sealed types (Java 17) restrict subclasses — perfect with exhaustive switch.
- Records for data; classes for mutable entities.

## Module 7 Complete 🎉

You've finished **Module 7 — Advanced Object-Oriented Programming**. Next up: **Module 8 — Exception Handling and File I/O**.
