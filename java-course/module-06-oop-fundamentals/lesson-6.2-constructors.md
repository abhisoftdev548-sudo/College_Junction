---
module: 6
topic: "6.2"
title: "Constructors"
slug: "constructors"
difficulty: "Intermediate"
prerequisites:
  - Classes and Objects
estimated_minutes: 30
tags:
  - java
  - oop
  - constructors
---

# 6.2 Constructors

## Overview

A **constructor** is a special method that runs automatically when an object is created with `new` — its job is to **initialize** the object into a valid state. Java gives a default no-arg constructor if you write none, but real classes usually define their own (often several, via overloading). Java 25 adds **flexible constructor bodies** (JEP 513), which relaxes the old ordering rules.

## Learning Objectives

After this lesson you will be able to:

- Write default and parameterized constructors
- Use constructor overloading and `this(...)` chaining
- Explain the default constructor and when it disappears
- Initialize fields in the constructor
- Understand Java 25's flexible constructor bodies (JEP 513)

## Core Concepts

### Basic constructors

```java
public class Point {
    int x, y;

    Point() {                // default (no-arg) constructor
        x = 0;
        y = 0;
    }

    Point(int a, int b) {    // parameterized constructor
        x = a;
        y = b;
    }
}

Point p1 = new Point();       // calls Point()
Point p2 = new Point(3, 4);   // calls Point(int, int)
```

A constructor has **the same name as the class** and **no return type** (not even `void`).

### The default constructor

If you write **no** constructor, Java supplies a no-arg default that sets fields to their defaults:

```java
public class Thing {
    int value;               // no constructor written
}
Thing t = new Thing();       // default constructor exists → value = 0
```

If you write **any** constructor, the default disappears:

```java
public class Thing {
    Thing(int v) { /* ... */ }
}
Thing t = new Thing();       // COMPILE ERROR — no no-arg constructor anymore
```

### Constructor overloading and this(...)

```java
public class Point {
    int x, y;

    Point() {
        this(0, 0);          // call the other constructor
    }

    Point(int a, int b) {
        x = a;
        y = b;
    }
}
```

`this(...)` calls another constructor of the same class. It must be the **first statement** (in classic Java).

### Field initialization vs constructor

```java
public class Point {
    int x = 5;               // field initializer runs first
    int y;

    Point(int b) {
        y = b;               // then the constructor body
    }
}
```

Order: field initializers run, then the constructor body.

### Copy constructor

```java
public class Student {
    String name;
    int rollNo;

    Student(Student other) {       // copy constructor
        this.name = other.name;
        this.rollNo = other.rollNo;
    }
}
```

## Modern Java / Java 25 Update

### JEP 513 — Flexible Constructor Bodies (Final in Java 25)

Before Java 25, `this(...)`/`super(...)` had to be the **first statement** in a constructor, and you couldn't run statements before them. Java 25 **relaxes this**:

```java
// Java 25: statements BEFORE this()/super() are now allowed
class Rectangle extends Shape {
    Rectangle(int width, int height) {
        if (width <= 0 || height <= 0) {
            throw new IllegalArgumentException("must be positive");  // validation first!
        }
        this.width = width;    // early statements
        super();               // super() no longer must be first
    }
}
```

Benefits:

- **Validate arguments before** calling the superclass constructor.
- **Prepare arguments** (compute, transform) before `this(...)`/`super(...)`.
- Cleaner, more natural constructor logic.

> ⚠️ This is a **final** Java 25 feature (not preview) — but most existing code still follows the old "super/this first" rule, so learn both.

## Visual — Constructor Execution Order

```
 new Point(3, 4)
   │
   ▼
 field initializers (x = 5, y = 0)
   │
   ▼
 constructor body (x = a; y = b;)   → x=3, y=4
   │
   ▼
 object returned (reference to caller)
```

Initializers run first, then the constructor body, then the object is ready.

## Code Examples

### Example 1 — Overloaded constructors

```java
public class Student {
    String name;
    int rollNo;

    Student() {
        this("Unknown", 0);        // chain to the full constructor
    }

    Student(String n, int r) {
        name = n;
        rollNo = r;
    }

    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student("Ankit", 21);
        System.out.println(a.name);   // Unknown
        System.out.println(b.name);   // Ankit
    }
}
```

### Example 2 — Parameterized constructor with validation

```java
public class BankAccount {
    double balance;

    BankAccount(double initial) {
        if (initial < 0) {
            throw new IllegalArgumentException("Negative balance");
        }
        balance = initial;
    }
}
```

### Example 3 — Java 25 flexible constructor body

```java
// Java 25 (JEP 513) — validate before calling super()
class PositiveNumber {
    int value;

    PositiveNumber(int v) {
        if (v <= 0) {
            throw new IllegalArgumentException("must be positive");
        }
        this.value = v;
    }
}
```

## Common Mistakes

1. **Adding a return type to a constructor** — `void Point()` is a method, not a constructor.
2. **Expecting the default constructor after defining another** — it vanishes; add a no-arg explicitly.
3. **`this(...)` not first** — in classic Java it must be the first statement (Java 25 relaxes this).
4. **Recursive constructor calls** — `Point() { this(); }` is infinite.
5. **Not initializing all fields** — objects can end up in invalid states.
6. **Forgetting `new`** — constructors are called with `new`, not directly.

## Best Practices

- Use parameterized constructors to require valid initial state.
- Chain with `this(...)` to avoid duplicating initialization logic.
- Validate arguments in the constructor — fail fast on bad input.
- Keep constructors short; heavy setup belongs in a factory or method.
- Add a no-arg constructor explicitly when you need both forms.

## Practice Questions

1. Write a `Car` class with default and parameterized constructors.
2. Use `this(...)` to chain a no-arg constructor to a parameterized one.
3. Explain when the default constructor disappears.
4. Write a copy constructor for a `Student` class.
5. Show (in a comment) a Java 25 flexible constructor that validates before `super()`.

## Multiple Choice Questions (MCQs)

### Q1. A constructor has:
- a) The class name and a return type
- b) The class name and no return type
- c) A `~` prefix
- d) A `void` return type

**Answer:** b

### Q2. If you define no constructor, Java provides:
- a) Nothing
- b) A no-arg default constructor
- c) A copy constructor
- d) A static constructor

**Answer:** b

### Q3. `this(...)` inside a constructor:
- a) Calls another constructor of the same class
- b) Calls the superclass
- c) Returns the object
- d) Is invalid

**Answer:** a

### Q4. Once you define any constructor, the default no-arg constructor:
- a) Still exists
- b) Disappears
- c) Becomes static
- d) Is auto-added

**Answer:** b

### Q5. Java 25's JEP 513 allows:
- a) Statements before `super()`/`this()`
- b) No constructors at all
- c) Constructors with return types
- d) Removing `new`

**Answer:** a

## Key Takeaways

- Constructors initialize objects; same name as class, no return type.
- Overload and chain with `this(...)`; the default constructor vanishes once you define one.
- Field initializers run before the constructor body.
- Java 25 (JEP 513) allows statements before `super()`/`this()` — flexible constructor bodies.

## Next Topic

[6.3 Encapsulation and Access Modifiers](lesson-6.3-encapsulation-and-access-modifiers.md)
