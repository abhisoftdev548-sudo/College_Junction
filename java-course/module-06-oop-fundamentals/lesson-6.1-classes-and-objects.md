---
module: 6
topic: "6.1"
title: "Classes and Objects"
slug: "classes-and-objects"
difficulty: "Intermediate"
prerequisites:
  - Methods
  - Arrays and Strings
estimated_minutes: 30
tags:
  - java
  - oop
  - classes
  - objects
---

# 6.1 Classes and Objects

## Overview

A **class** is a blueprint that bundles **data** (fields) and **behaviour** (methods) into one type. An **object** is a concrete instance created from that blueprint with the `new` keyword. This is the heart of Object-Oriented Programming (OOP) in Java: modelling real-world entities as self-contained types.

## Learning Objectives

After this lesson you will be able to:

- Define a class with fields and methods
- Create objects with `new` and access members with `.`
- Explain the difference between a class and an object
- Understand instance fields vs local variables
- Use `new` to allocate objects on the heap

## Core Concepts

### Defining a class

```java
public class Student {
    // fields (data) — one copy per object
    String name;
    int rollNo;
    double gpa;

    // method (behaviour)
    void introduce() {
        System.out.println("I am " + name + ", roll no " + rollNo);
    }
}
```

### Creating and using objects

```java
public class Main {
    public static void main(String[] args) {
        Student s = new Student();   // create an object (instance)
        s.name = "Ankit";            // set fields with .
        s.rollNo = 21;
        s.introduce();               // call methods with .
    }
}
```

- `new Student()` allocates the object on the heap and runs its constructor.
- `s` is a **reference** to that object.
- `.` accesses fields and methods.

### Class vs object

```java
Student s1 = new Student();
Student s2 = new Student();

s1.name = "Ankit";
s2.name = "Riya";
// s1 and s2 are separate objects with their OWN copies of the fields
```

The class is the blueprint (written once); each object has its own independent state.

### Instance fields vs local variables

```java
public class Counter {
    int count = 0;          // instance field — lives with the object

    void increment() {
        int step = 1;       // local variable — lives for one call
        count += step;
    }
}
```

Fields persist across method calls; locals are recreated each call.

### Multiple objects are independent

```java
Counter a = new Counter();
Counter b = new Counter();
a.increment();             // a.count = 1
a.increment();             // a.count = 2
b.increment();             // b.count = 1 (b is separate)
```

## Visual — Class vs Objects

```
 CLASS (blueprint)                  OBJECTS (instances on the heap)
 ┌──────────────────────┐
 │ class Student {      │        ┌──────────────┐   ┌──────────────┐
 │   String name;       │        │ name=Ankit   │   │ name=Riya    │
 │   int rollNo;        │ ────▶  │ rollNo=21    │   │ rollNo=22    │
 │   void introduce();  │        └──────────────┘   └──────────────┘
 │ }                    │         each object has its OWN field values
 └──────────────────────┘
```

One blueprint, many instances — each with independent state.

## Code Examples

### Example 1 — A Book class

```java
public class Book {
    String title;
    String author;
    int pages;

    void describe() {
        System.out.println(title + " by " + author + " (" + pages + " pages)");
    }

    public static void main(String[] args) {
        Book b = new Book();
        b.title = "Clean Code";
        b.author = "Robert C. Martin";
        b.pages = 464;
        b.describe();
    }
}
```

### Example 2 — Independent objects

```java
public class BankAccount {
    double balance;

    void deposit(double amount) {
        balance += amount;
    }

    public static void main(String[] args) {
        BankAccount a = new BankAccount();
        BankAccount b = new BankAccount();
        a.deposit(100);
        b.deposit(250);
        System.out.println(a.balance);   // 100.0
        System.out.println(b.balance);   // 250.0
    }
}
```

### Example 3 — An object with a reference

```java
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = s1;        // s2 points at the SAME object
        s1.name = "Ankit";
        System.out.println(s2.name);   // "Ankit" — same object
    }
}
```

## Common Mistakes

1. **Forgetting `new`** — `Student s;` declares a reference but no object (it's `null`).
2. **Accessing fields of a `null` reference** — throws `NullPointerException`.
3. **Confusing class and object** — `Student.name = "x";` (without an object) is invalid.
4. **Uninitialized fields** — fields default (`0`/`false`/`null`), locals do not.
5. **`=` copying references** — `s2 = s1` shares one object, not a copy.
6. **Defining a class without a matching file** — public classes need their own `.java` file.

## Best Practices

- Keep fields **private** and expose behaviour through methods (6.3).
- Initialize fields where declared, or in constructors (6.2).
- Use meaningful class names in PascalCase (`Student`, `BankAccount`).
- One public class per file; the filename matches the class name.
- Let constructors set state rather than assigning fields from outside.

## Practice Questions

1. Write a `Circle` class with a `radius` field and an `area()` method.
2. Create two `Circle` objects with different radii and print both areas.
3. Add a `Laptop` class with fields and a method; create and use two instances.
4. Explain the difference between a class and an object with an example.
5. Demonstrate that assigning one reference to another shares the same object.

## Multiple Choice Questions (MCQs)

### Q1. An object is created with the keyword:
- a) `class`
- b) `new`
- c) `object`
- d) `instance`

**Answer:** b

### Q2. A field in a class holds:
- a) A method
- b) Per-object data
- c) Shared code
- d) Only constants

**Answer:** b

### Q3. `Student s;` (without `new`) makes `s`:
- a) A valid object
- b) `null` (no object yet)
- c) An error
- d) An empty string

**Answer:** b

### Q4. `s1 = s2;` where both are references results in:
- a) A copy of the object
- b) Both pointing to the same object
- c) Two new objects
- d) A compile error

**Answer:** b

### Q5. The blueprint for objects is the:
- a) Object
- b) Class
- c) Method
- d) Variable

**Answer:** b

## Key Takeaways

- Class = blueprint (fields + methods); object = instance created with `new`.
- Each object has its own field values; references share objects via `=`.
- Fields default to 0/false/null; locals don't.
- Access members with `.` on a reference.

## Next Topic

[6.2 Constructors](lesson-6.2-constructors.md)
