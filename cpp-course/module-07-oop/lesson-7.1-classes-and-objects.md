---
module: 7
topic: "7.1"
title: "Classes and Objects"
slug: "classes-and-objects"
difficulty: "Intermediate"
prerequisites:
  - Data Types
  - Functions
  - Structs (C++ Fundamentals)
estimated_minutes: 30
tags:
  - oop
  - classes
  - objects
---

# 7.1 Classes and Objects

## Overview

A **class** is a blueprint that bundles **data** (member variables) and **behaviour** (member functions) into a single type. An **object** is a concrete instance created from that blueprint. This is the heart of Object-Oriented Programming (OOP): modelling real-world entities as self-contained types.

## Learning Objectives

After this lesson you will be able to:

- Define a class with data members and member functions
- Instantiate objects and access members with the dot (`.`) operator
- Explain the difference between a class and an object
- Use access specifiers (`public`, `private`) correctly
- Separate declaration (header) from definition (source) where useful

## Core Concepts

### Defining a class

```cpp
class Rectangle {
public:                    // accessible from anywhere
    double width;
    double height;

    double area() {        // member function (method)
        return width * height;
    }
};

Rectangle r;               // r is an OBJECT (instance) of class Rectangle
r.width = 5.0;
r.height = 3.0;
std::cout << r.area();     // 15
```

### Member functions inside vs outside

```cpp
class Rectangle {
public:
    double width, height;
    double area();         // declared here...
};

double Rectangle::area() { // ...defined outside with ClassName::
    return width * height;
}
```

Use `ClassName::member` to define a member function outside the class body.

### Access specifiers

```cpp
class BankAccount {
private:                   // only accessible from inside the class
    double balance = 0;

public:
    void deposit(double amount) { balance += amount; }
    double getBalance() const { return balance; }
};

BankAccount acc;
acc.deposit(100);
std::cout << acc.getBalance(); // 100
// acc.balance = 999;          // ERROR: balance is private
```

`private` hides internals; `public` defines the interface. (In a `struct`, members default to `public`; in a `class`, they default to `private`.)

### const member functions

```cpp
class Point {
    int x = 0, y = 0;
public:
    void set(int a, int b) { x = a; y = b; }
    int getX() const { return x; }   // promises NOT to modify the object
};
```

Mark read-only methods `const` so they can be called on `const` objects.

## Visual — Class vs Object

```
  CLASS (blueprint)                OBJECTS (instances)
 ┌──────────────────────┐
 │ class Rectangle {    │        ┌─────────────┐   ┌─────────────┐
 │   double width;      │        │ r1          │   │ r2          │
 │   double height;     │  ───▶  │ width = 5   │   │ width = 2   │
 │   double area();     │        │ height = 3  │   │ height = 8  │
 │ };                   │        └─────────────┘   └─────────────┘
 └──────────────────────┘        Each object has its OWN copy of
                                 the data, sharing the same layout.
```

The class describes the shape and behaviour; each object holds its own independent values.

## Code Examples

### Example 1 — A Student class

```cpp
#include <iostream>
#include <string>

class Student {
public:
    std::string name;
    int rollNo;

    void introduce() const {
        std::cout << "I am " << name << ", roll no " << rollNo << "\n";
    }
};

int main() {
    Student s;
    s.name = "Ankit";
    s.rollNo = 21;
    s.introduce();
    return 0;
}
```

### Example 2 — Private data with accessors

```cpp
#include <iostream>

class Counter {
    int count = 0;              // private by default in a class
public:
    void increment() { ++count; }
    int value() const { return count; }
};

int main() {
    Counter c;
    c.increment();
    c.increment();
    std::cout << c.value();     // 2
}
```

### Example 3 — Method defined outside the class

```cpp
class Circle {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const;        // declared here
};

double Circle::area() const {   // defined here
    return 3.14159 * radius * radius;
}
```

## Common Mistakes

1. **Forgetting the semicolon** after the class body — `};` is required.
2. **Accessing private members from outside** — use public accessors.
3. **Confusing `class` and object** — `Rectangle.width = 5;` fails; you must create an object first.
4. **Missing `const` on read-only methods** — such methods cannot be called on `const` objects.
5. **Uninitialized members** — reading a member before setting it yields garbage.
6. **Defining a method outside without `ClassName::`** — the compiler treats it as a free function.

## Best Practices

- Keep data `private`; expose behaviour through a small public interface.
- Mark methods that don't modify state as `const`.
- Initialize members (use in-class initializers like `int count = 0;`).
- Name classes with PascalCase (`Student`, `BankAccount`) and objects with camelCase.
- Prefer defining short methods inline; put long ones out-of-line.

## Practice Questions

1. Write a `Book` class with `title`, `author`, and `pages`, plus a `describe()` method that prints them.
2. Write a `Temperature` class storing Celsius privately, with `setCelsius`/`getCelsius` and `getFahrenheit` methods.
3. Create two `Rectangle` objects with different dimensions and print both areas.
4. Add a `const` method to a class and call it on a `const` object to confirm it compiles.
5. Convert a plain `struct Point { int x, y; };` into a `class Point` with private members and public getters/setters.

## Multiple Choice Questions (MCQs)

### Q1. What is an object?
- a) A blueprint for data
- b) A concrete instance of a class
- c) A member function
- d) A data type

**Answer:** b

### Q2. In a `class`, members are by default:
- a) `public`
- b) `private`
- c) `protected`
- d) `static`

**Answer:** b — unlike `struct`, where they default to `public`.

### Q3. Which operator accesses members of an object?
- a) `->`
- b) `::`
- c) `.`
- d) `*`

**Answer:** c — dot on objects; `->` is for pointers to objects.

### Q4. Why make a data member `private`?
- a) To make the program faster
- b) To hide internals and control access via methods
- c) To allow access from anywhere
- d) To make it read-only automatically

**Answer:** b

### Q5. What does `double Rectangle::area() { ... }` define?
- a) A global function named `area`
- b) The `area` member of class `Rectangle`, defined outside the class
- c) A new class
- d) A constructor

**Answer:** b

## Key Takeaways

- A **class** is a blueprint; an **object** is an instance with its own data.
- Members are `private` by default in a `class`; control access with `public`/`private`.
- Mark read-only methods `const`; define long methods out-of-line with `ClassName::`.

## Next Topic

[7.2 Constructors and Destructors](lesson-7.2-constructors-destructors.md)
