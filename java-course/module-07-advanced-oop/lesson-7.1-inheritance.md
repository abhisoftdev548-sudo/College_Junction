---
module: 7
topic: "7.1"
title: "Inheritance"
slug: "inheritance"
difficulty: "Intermediate"
prerequisites:
  - Classes and Objects
  - Constructors
estimated_minutes: 30
tags:
  - java
  - oop
  - inheritance
---

# 7.1 Inheritance

## Overview

**Inheritance** lets a class (**subclass/child**) reuse and extend another class (**superclass/parent**), modelling "is-a" relationships: a `Dog` is-a `Animal`, a `Car` is-a `Vehicle`. In Java, inheritance uses `extends`, and every class ultimately extends `Object`. Inheritance eliminates duplication and sets up polymorphism (7.2).

## Learning Objectives

After this lesson you will be able to:

- Extend a class with `extends`
- Call superclass constructors and methods with `super`
- Override methods (and call `super.method()`)
- Understand the `Object` class and `toString`/`equals`
- Explain the "is-a" relationship and Java's single inheritance

## Core Concepts

### Basic inheritance

```java
public class Animal {
    public void eat() {
        System.out.println("eating...");
    }
}

public class Dog extends Animal {       // Dog inherits Animal
    public void bark() {
        System.out.println("Woof");
    }
}

Dog d = new Dog();
d.eat();     // inherited from Animal
d.bark();    // Dog's own method
```

`extends` makes `Dog` a subclass of `Animal` — it inherits all non-private members.

### Calling superclass constructors with super()

```java
public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);        // MUST call the superclass constructor first
    }
}
```

If the superclass has no no-arg constructor, the subclass constructor **must** call `super(...)` as its first statement (classic rule — Java 25 relaxes it, see 6.2).

### super.method() — calling the parent's version

```java
public class Animal {
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    @Override
    public void speak() {
        super.speak();              // call the parent's version
        System.out.println("Woof");
    }
}
```

### Method overriding

```java
public class Animal {
    public void speak() { System.out.println("generic"); }
}

public class Cat extends Animal {
    @Override                          // annotate overrides
    public void speak() { System.out.println("Meow"); }
}
```

A subclass redefines a superclass method with the **same signature** — the subclass version runs (see 7.2 for polymorphism).

### The Object class and toString

```java
public class Student {
    private String name;
    // ...

    @Override
    public String toString() {         // override Object.toString
        return "Student{name='" + name + "'}";
    }
}
```

Every class inherits from `Object`, which provides `toString()`, `equals(Object)`, and `hashCode()`. Override `toString` for readable output.

### Single inheritance

Java supports **one superclass** per class (single inheritance). Multiple behaviour is achieved via **interfaces** (7.3).

## Visual — The Inheritance Hierarchy

```
          ┌────────────┐
          │   Object   │   ← every class's ultimate parent
          └─────┬──────┘
          ┌─────▼──────┐
          │   Animal   │   superclass
          │  eat()     │
          └─────┬──────┘
        ┌───────┴───────┐
   ┌────▼────┐    ┌─────▼────┐
   │   Dog   │    │   Cat    │   subclasses
   │  bark() │    │  meow()  │
   └─────────┘    └──────────┘
```

A subclass inherits "down" the chain; the top is always `Object`.

## Code Examples

### Example 1 — Vehicle hierarchy

```java
public class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public void describe() {
        System.out.println("Vehicle: " + brand);
    }
}

public class Car extends Vehicle {
    private int doors;

    public Car(String brand, int doors) {
        super(brand);          // forward to Vehicle's constructor
        this.doors = doors;
    }

    @Override
    public void describe() {
        System.out.println("Car: " + brand + ", " + doors + " doors");
    }
}
```

### Example 2 — toString override

```java
public class Student {
    private String name;
    private int rollNo;

    public Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    @Override
    public String toString() {
        return name + " (#" + rollNo + ")";
    }

    public static void main(String[] args) {
        System.out.println(new Student("Ankit", 21));   // Ankit (#21)
    }
}
```

### Example 3 — super.method()

```java
public class Shape {
    public void draw() { System.out.println("Drawing shape"); }
}

public class Circle extends Shape {
    @Override
    public void draw() {
        super.draw();                    // parent behaviour first
        System.out.println("Drawing circle");
    }
}
```

## Common Mistakes

1. **Forgetting `super(...)`** when the superclass has no no-arg constructor.
2. **Trying multiple inheritance** — `class C extends A, B` is invalid; use interfaces.
3. **Confusing overload and override** — override needs the same signature; `@Override` catches mistakes.
4. **Private members aren't inherited** — use `protected` or accessors to share with subclasses.
5. **Calling `super` methods in the wrong order** — know whether parent or child logic should run first.
6. **Expecting constructors to be inherited** — they aren't; subclasses define their own.

## Best Practices

- Use inheritance only for true "is-a" relationships; prefer composition otherwise.
- Mark overrides with `@Override` — the compiler verifies them.
- Use `protected` (not public) for members intended for subclasses.
- Override `toString`, `equals`, and `hashCode` for value-like classes.
- Keep hierarchies shallow — deep inheritance is hard to reason about.

## Practice Questions

1. Write `Person` (base) and `Student` (subclass adding `rollNo`), forwarding name to `super`.
2. Override `toString` in a class and print an object.
3. Write a subclass that calls `super.method()` before adding its own behaviour.
4. Explain why `class C extends A, B` doesn't compile in Java.
5. Demonstrate `@Override` catching a signature mismatch.

## Multiple Choice Questions (MCQs)

### Q1. Inheritance in Java uses the keyword:
- a) `implements`
- b) `extends`
- c) `inherits`
- d) `super`

**Answer:** b

### Q2. Every Java class ultimately extends:
- a) `Object`
- b) `Class`
- c) `Base`
- d) `Root`

**Answer:** a

### Q3. To call a superclass constructor, use:
- a) `this(...)`
- b) `super(...)`
- c) `parent(...)`
- d) `base(...)`

**Answer:** b

### Q4. Java supports:
- a) Multiple class inheritance
- b) Single class inheritance (plus interfaces)
- c) No inheritance
- d) Inheritance only from `Object`

**Answer:** b

### Q5. The `@Override` annotation:
- a) Forces overriding
- b) Lets the compiler verify the method actually overrides
- c) Makes a method static
- d) Is required by the JVM

**Answer:** b

## Key Takeaways

- `extends` = inheritance; subclass inherits non-private members.
- Call the superclass constructor with `super(...)`; call parent methods with `super.method()`.
- Override methods with `@Override`; every class extends `Object`.
- Java is single-inheritance; use interfaces for multiple behaviour.

## Next Topic

[7.2 Polymorphism and Method Overriding](lesson-7.2-polymorphism-and-overriding.md)
