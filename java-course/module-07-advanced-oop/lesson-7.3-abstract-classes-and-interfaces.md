---
module: 7
topic: "7.3"
title: "Abstract Classes and Interfaces"
slug: "abstract-classes-and-interfaces"
difficulty: "Intermediate"
prerequisites:
  - Polymorphism and Method Overriding
estimated_minutes: 30
tags:
  - java
  - oop
  - abstract
  - interface
---

# 7.3 Abstract Classes and Interfaces

## Overview

**Abstract classes** and **interfaces** both define *contracts* — what a class must do — without (fully) specifying how. An abstract class can hold shared state and partial implementation; an interface is a pure contract (with modern extras). Together they're how Java achieves design-by-contract and multiple behaviour.

## Learning Objectives

After this lesson you will be able to:

- Declare abstract classes and abstract methods
- Declare and implement interfaces
- Use default and static interface methods (Java 8+)
- Choose between an abstract class and an interface
- Implement multiple interfaces (Java's "multiple inheritance" of behaviour)

## Core Concepts

### Abstract classes

```java
public abstract class Shape {           // cannot be instantiated
    private String color;

    public Shape(String color) { this.color = color; }

    public abstract double area();      // abstract — no body, subclasses must implement

    public String getColor() { return color; }   // concrete method
}

public class Circle extends Shape {
    private double r;
    public Circle(String color, double r) { super(color); this.r = r; }

    @Override
    public double area() { return Math.PI * r * r; }   // must implement
}
```

- `abstract` class → can't be instantiated; meant to be extended.
- `abstract` method → no body; the first concrete subclass **must** implement it.
- Abstract classes can have fields, constructors, and concrete methods.

### Interfaces

```java
public interface Drawable {
    void draw();                 // implicitly public abstract
}

public class Circle implements Drawable {
    @Override
    public void draw() { System.out.println("Drawing circle"); }
}
```

- An interface declares methods (implicitly `public abstract`).
- A class **implements** an interface and provides the method bodies.
- A class can implement **many** interfaces.

### default and static methods (Java 8+)

```java
public interface Logger {
    void log(String message);                    // abstract

    default void logError(String message) {      // default — has a body
        log("[ERROR] " + message);
    }

    static Logger console() {                    // static — on the interface
        return System.out::println;
    }
}
```

`default` methods add new behaviour without breaking existing implementers; `static` methods are utility helpers on the interface.

### Multiple interfaces

```java
public class SmartPhone implements Camera, Phone, MusicPlayer {
    // must implement methods from all three interfaces
}
```

Java doesn't allow multiple class inheritance, but a class can implement **many interfaces** — that's how it gets multiple behaviours.

### private interface methods (Java 9)

```java
public interface Parser {
    default int parse(String s) {
        validate(s);            // shared private helper
        return Integer.parseInt(s);
    }

    private void validate(String s) {   // private helper for default methods
        if (s == null || s.isBlank()) throw new IllegalArgumentException();
    }
}
```

## Visual — Abstract Class vs Interface

```
 abstract class Shape              interface Drawable
 ┌──────────────────┐             ┌────────────────┐
 │ fields (color)   │             │ (no fields)    │
 │ constructor      │             │ draw()         │
 │ concrete methods │             │ default/static │
 │ abstract area()  │             └────────────────┘
 └──────────────────┘               a class can implement
  extends (one only)                MANY interfaces
```

Abstract = shared state + partial impl; interface = pure contract (multiple).

## Code Examples

### Example 1 — Abstract class

```java
public abstract class Animal {
    protected String name;

    public Animal(String name) { this.name = name; }

    public abstract String sound();       // subclasses decide

    public void describe() {
        System.out.println(name + " says " + sound());
    }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override public String sound() { return "Woof"; }
}
```

### Example 2 — Interface with default method

```java
public interface Payable {
    double amount();

    default String receipt() {           // concrete default
        return "Amount: " + amount();
    }
}

public class Invoice implements Payable {
    private double total;
    public Invoice(double total) { this.total = total; }
    @Override public double amount() { return total; }
}
```

### Example 3 — Multiple interfaces

```java
public interface Flyable { void fly(); }
public interface Swimmable { void swim(); }

public class Duck implements Flyable, Swimmable {
    @Override public void fly() { System.out.println("flying"); }
    @Override public void swim() { System.out.println("swimming"); }
}
```

## Common Mistakes

1. **Instantiating an abstract class** — `new Shape()` is a compile error.
2. **Forgetting to implement abstract methods** — the subclass must override them all (or be abstract too).
3. **Adding fields to an interface** — interfaces can only have `public static final` constants.
4. **Confusing `extends` and `implements`** — classes `extend`, interfaces `implement`.
5. **Missing `abstract` on the class** when it has abstract methods — compile error.
6. **Using an abstract class where an interface fits better** — prefer interfaces for contracts.

## Best Practices

- Use interfaces for **contracts** (what a type can do); abstract classes for **shared partial implementation**.
- Prefer interfaces for polymorphism — they compose (multiple) better.
- Use `default` methods to evolve interfaces without breaking implementers.
- Name interfaces by capability (`Runnable`, `Comparable`, `Drawable`) or with `-able`.
- Keep interfaces small and focused (Interface Segregation Principle).

## Practice Questions

1. Write an abstract `Shape` with `area()` and concrete `Circle`/`Square`.
2. Write a `Playable` interface with `play()` and a `default stop()` method.
3. Make a class implement two interfaces and call both behaviours.
4. Explain when you'd choose an abstract class over an interface.
5. Show a Java 9 private interface method being used by a default method.

## Multiple Choice Questions (MCQs)

### Q1. An abstract class:
- a) Can be instantiated
- b) Cannot be instantiated
- c) Must have no methods
- d) Is final

**Answer:** b

### Q2. An abstract method has:
- a) A body
- b) No body (subclasses implement it)
- c) A default implementation
- d) Only a return type

**Answer:** b

### Q3. A class implements an interface with:
- a) `extends`
- b) `implements`
- c) `inherits`
- d) `uses`

**Answer:** b

### Q4. `default` methods in interfaces were added in:
- a) Java 1.0
- b) Java 5
- c) Java 8
- d) Java 25

**Answer:** c

### Q5. A class can implement:
- a) One interface only
- b) Many interfaces
- c) Two interfaces at most
- d) No interfaces

**Answer:** b

## Key Takeaways

- Abstract classes: shared state + partial impl; can't instantiate.
- Interfaces: pure contracts; a class can implement many.
- Java 8+ adds `default`/`static` interface methods; Java 9 adds private ones.
- Prefer interfaces for contracts, abstract classes for shared implementation.

## Next Topic

[7.4 Enums](lesson-7.4-enums.md)
