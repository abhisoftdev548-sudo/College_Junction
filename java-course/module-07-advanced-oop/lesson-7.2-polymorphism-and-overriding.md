---
module: 7
topic: "7.2"
title: "Polymorphism and Method Overriding"
slug: "polymorphism-and-overriding"
difficulty: "Intermediate"
prerequisites:
  - Inheritance
estimated_minutes: 30
tags:
  - java
  - oop
  - polymorphism
  - overriding
---

# 7.2 Polymorphism and Method Overriding

## Overview

**Polymorphism** ("many forms") lets a single reference type work with objects of many actual types — a `Shape` variable can point at a `Circle` or a `Square`, and calling `area()` runs the right version. Java achieves this with **method overriding** and **dynamic dispatch**: the method called is chosen at runtime based on the object's real type.

## Learning Objectives

After this lesson you will be able to:

- Explain compile-time vs runtime binding
- Override methods and use polymorphism with references
- Build polymorphic collections (`List<Shape>` holding `Circle`/`Square`)
- Use `instanceof` and pattern matching for type-specific logic
- Understand virtual dispatch and why `final`/`static`/`private` differ

## Core Concepts

### Overriding — the foundation

```java
public class Animal {
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    @Override
    public void speak() { System.out.println("Woof"); }
}

public class Cat extends Animal {
    @Override
    public void speak() { System.out.println("Meow"); }
}
```

### Polymorphism via superclass references

```java
Animal a1 = new Dog();     // a Dog referenced as an Animal
Animal a2 = new Cat();

a1.speak();    // "Woof" — the ACTUAL object's method runs
a2.speak();    // "Meow"
```

The **reference type** (`Animal`) determines what methods you can call; the **object type** (`Dog`/`Cat`) determines which version runs. This is **dynamic dispatch**.

### Polymorphic collections

```java
List<Animal> zoo = new ArrayList<>();
zoo.add(new Dog());
zoo.add(new Cat());
zoo.add(new Dog());

for (Animal a : zoo) {
    a.speak();        // each object speaks its own way
}
```

One loop, many behaviours — the classic payoff of polymorphism.

### instanceof and pattern matching

```java
for (Animal a : zoo) {
    if (a instanceof Dog d) {        // Java 16 pattern matching
        d.fetch();
    } else if (a instanceof Cat c) {
        c.purr();
    }
}
```

Need type-specific methods? Check with `instanceof` (pattern matching combines check + cast).

### What is NOT polymorphic

```java
public class Animal {
    public static void staticMethod() { /* static → not overridden, bound at compile time */ }
    private void priv() { /* private → not inherited, no dispatch */ }
    public final void finalMethod() { /* final → cannot be overridden */ }
}
```

- `static` methods are bound at compile time (call the reference type's version).
- `private` methods aren't overridden (not visible to subclasses).
- `final` methods can't be overridden at all.

## Visual — Dynamic Dispatch

```
 Animal a = new Dog();
     │           │
 reference     object
 type=Animal   type=Dog

 a.speak()  ──▶  JVM looks at the OBJECT's type ──▶ Dog.speak()  → "Woof"
```

The compiler checks the reference; the **runtime** picks the method from the object's real class.

## Code Examples

### Example 1 — Shape polymorphism

```java
public class Shape {
    public double area() { return 0; }
}

public class Circle extends Shape {
    private double r;
    public Circle(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }
}

public class Square extends Shape {
    private double s;
    public Square(double s) { this.s = s; }
    @Override public double area() { return s * s; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Square(3), new Circle(1) };
        for (Shape sh : shapes) {
            System.out.printf("%.2f%n", sh.area());   // 12.57, 9.00, 3.14
        }
    }
}
```

### Example 2 — instanceof pattern matching

```java
public class Main {
    public static void describe(Shape sh) {
        if (sh instanceof Circle c) {
            System.out.println("Circle with area " + c.area());
        } else if (sh instanceof Square sq) {
            System.out.println("Square with area " + sq.area());
        }
    }
}
```

### Example 3 — A polymorphic print method

```java
public static void printAll(List<Animal> animals) {
    for (Animal a : animals) {
        a.speak();            // polymorphic call
    }
}
```

## Common Mistakes

1. **Forgetting `@Override`** — a typo silently creates a new method instead of overriding.
2. **Changing the signature** — `speak(String s)` overloads, it doesn't override.
3. **Expecting static methods to be polymorphic** — they bind at compile time.
4. **Downcasting without `instanceof`** — `(Dog) animal` throws `ClassCastException` if it isn't a Dog.
5. **Making the method `private` and expecting overriding** — private methods aren't overridden.
6. **Polymorphism on fields** — fields are **not** polymorphic (only methods are); a field uses the reference type.

## Best Practices

- Program to the superclass/interface type (`Shape s = new Circle(...)`).
- Use `@Override` on every override.
- Use `instanceof` pattern matching for safe type-specific access.
- Prefer interfaces (7.3) as the polymorphic type.
- Mark methods you don't want overridden as `final`.

## Practice Questions

1. Create `Animal`, `Dog`, `Cat` and call `speak()` polymorphically through a list.
2. Build `Shape`/`Circle`/`Square` with `area()` and sum the areas of a mixed list.
3. Use `instanceof` pattern matching to call subclass-specific methods safely.
4. Explain why a static method isn't polymorphic.
5. Show the difference between overloading and overriding with code.

## Multiple Choice Questions (MCQs)

### Q1. Polymorphism means:
- a) One class, many constructors
- b) One reference type working with many object types
- c) Many classes, one object
- d) Static dispatch

**Answer:** b

### Q2. Which method version runs at runtime?
- a) The reference type's
- b) The actual object type's
- c) The parent's
- d) A random one

**Answer:** b

### Q3. Static methods are bound at:
- a) Runtime
- b) Compile time
- c) Load time
- d) Random time

**Answer:** b

### Q4. `a instanceof Dog d` (pattern matching) does:
- a) Only checks the type
- b) Checks and binds `d` to the Dog in one step
- c) Casts without checking
- d) Nothing

**Answer:** b

### Q5. To prevent a method from being overridden, mark it:
- a) `static`
- b) `final`
- c) `private`
- d) `abstract`

**Answer:** b

## Key Takeaways

- Overriding + dynamic dispatch = runtime polymorphism in Java.
- The object's type decides the method; the reference type decides what's callable.
- Polymorphic collections are the classic use case.
- `static`/`private`/`final` methods are not polymorphic.

## Next Topic

[7.3 Abstract Classes and Interfaces](lesson-7.3-abstract-classes-and-interfaces.md)
