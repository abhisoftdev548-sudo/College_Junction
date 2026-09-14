---
module: 6
topic: "6.4"
title: "this and static Members"
slug: "this-and-static-members"
difficulty: "Intermediate"
prerequisites:
  - Encapsulation and Access Modifiers
estimated_minutes: 30
tags:
  - java
  - oop
  - this
  - static
---

# 6.4 `this` and `static` Members

## Overview

**`this`** refers to the *current object* — the instance a method is operating on. **`static`** marks members that belong to the *class itself*, not any object. Together they explain a fundamental Java distinction: instance members (per-object) vs static members (shared, class-level). This lesson covers both, plus modern helpers like `static` factory methods.

## Learning Objectives

After this lesson you will be able to:

- Use `this` to disambiguate fields and call constructors/methods
- Declare and use `static` fields, methods, and constants
- Explain instance vs static members
- Use `static` methods as factories/utilities
- Recognize when `this` can't be used (static context)

## Core Concepts

### this — the current object

```java
public class Student {
    private String name;

    public void setName(String name) {
        this.name = name;      // this.name = the FIELD; name = the PARAMETER
    }

    public void describe() {
        System.out.println(this.name);   // explicit this
    }
}
```

`this` resolves the ambiguity when a parameter shadows a field — `this.name` is the object's field.

### this for constructor chaining and method calls

```java
public Student() {
    this("Unknown");           // call the other constructor (must be first)
}

public void print() {
    this.describe();           // explicit call to another method (optional)
}
```

### static fields — shared across all instances

```java
public class Counter {
    public static int total = 0;    // ONE value shared by every Counter
    private int own = 0;

    public Counter() {
        total++;                   // class-level count
    }
}

new Counter(); new Counter(); new Counter();
System.out.println(Counter.total);   // 3
```

A `static` field belongs to the **class** — accessed as `Counter.total`, shared by all objects.

### static methods — no instance needed

```java
public class MathUtil {
    public static int square(int x) { return x * x; }   // no object required
}

MathUtil.square(5);    // call on the CLASS, not an instance
```

Static methods can't use `this` or access instance fields — there's no object.

### static constants

```java
public class Config {
    public static final String APP_NAME = "College Junction";
    public static final int MAX_USERS = 1000;
}

Config.APP_NAME;   // no instance needed
```

`static final` is the Java idiom for class-level constants.

### static factory methods (common pattern)

```java
public class Point {
    private final int x, y;

    private Point(int x, int y) { this.x = x; this.y = y; }

    public static Point of(int x, int y) { return new Point(x, y); }   // factory
    public static Point origin() { return new Point(0, 0); }
}

Point p = Point.of(3, 4);
Point o = Point.origin();
```

Static **factory methods** create objects with descriptive names and can return cached/derived instances.

## Visual — Instance vs Static

```
  instance members (need an object)     static members (on the class)
  ┌──────────────┐                      Counter.total  ← shared, one copy
  │ obj1: own=0  │  this → obj1
  │ obj2: own=0  │  this → obj2
  └──────────────┘
  each object has its OWN "own"         the CLASS has ONE "total"
```

Instance members vary per object; static members are shared and accessed via the class name.

## Code Examples

### Example 1 — this for field/parameter disambiguation

```java
public class Rectangle {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;      // field = parameter
        this.height = height;
    }

    public double area() { return this.width * this.height; }
}
```

### Example 2 — static counter

```java
public class User {
    public static int userCount = 0;
    private String name;

    public User(String name) {
        this.name = name;
        userCount++;
    }

    public static void main(String[] args) {
        new User("Ankit");
        new User("Riya");
        new User("Rohan");
        System.out.println("Total users: " + User.userCount);   // 3
    }
}
```

### Example 3 — static utility method

```java
public class StringUtil {
    public static boolean isNullOrBlank(String s) {
        return s == null || s.isBlank();
    }

    public static void main(String[] args) {
        System.out.println(isNullOrBlank(""));    // true
        System.out.println(isNullOrBlank("hi"));  // false
    }
}
```

## Common Mistakes

1. **Using `this` in a static method** — there's no current object; compile error.
2. **Accessing a static member through an instance** — `obj.total` works but is misleading; use `Class.total`.
3. **Forgetting `this` when a parameter shadows a field** — you assign the parameter to itself.
4. **Expecting static fields to be per-object** — they're shared; one change affects all.
5. **Static method calling an instance method directly** — needs an object first.
6. **Overusing static mutable fields** — shared mutable state causes subtle bugs.

## Best Practices

- Use `this` only when needed (shadowing, chaining); omit it otherwise for readability.
- Access static members via the class name (`Counter.total`), not an instance.
- Use `static final` for constants; keep static mutable state minimal.
- Use static factory methods for descriptive construction.
- Keep utility methods (`MathUtil`) static — they need no state.

## Practice Questions

1. Write a class whose constructor uses `this` to set fields shadowed by parameters.
2. Add a `static` counter that tracks how many objects of a class are created.
3. Write a static utility method `max(int a, int b)` and call it on the class.
4. Explain why a static method can't use `this` or instance fields.
5. Write a static factory method `Point.origin()` returning (0, 0).

## Multiple Choice Questions (MCQs)

### Q1. `this` refers to:
- a) The class
- b) The current object
- c) The superclass
- d) A static field

**Answer:** b

### Q2. A `static` field is:
- a) Per-object
- b) Shared across all instances (class-level)
- c) Always private
- d) Final

**Answer:** b

### Q3. Static methods:
- a) Can use `this`
- b) Cannot use `this` or instance fields
- c) Require an object
- d) Are always public

**Answer:** b

### Q4. `static final` is used for:
- a) Mutable state
- b) Class-level constants
- c) Instance counters
- d) Local variables

**Answer:** b

### Q5. A static factory method:
- a) Requires `new` from outside
- b) Is a static method that creates/returns objects
- c) Is a constructor
- d) Must be private

**Answer:** b

## Key Takeaways

- `this` = current object (disambiguate fields, chain constructors).
- `static` = class-level: shared fields, no-instance methods, constants.
- Static methods can't use `this` or instance fields.
- Static factories give descriptive, controlled object creation.

## Next Topic

[6.5 Packages and Imports](lesson-6.5-packages-and-imports.md)
