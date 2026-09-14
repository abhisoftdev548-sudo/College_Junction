---
module: 7
topic: "7.5"
title: "Polymorphism"
slug: "polymorphism"
difficulty: "Intermediate"
prerequisites:
  - Inheritance
  - Pointers and References
estimated_minutes: 30
tags:
  - oop
  - polymorphism
  - virtual-functions
  - abstract-classes
---

# 7.5 Polymorphism

## Overview

**Polymorphism** ("many forms") lets a single interface work with objects of different types. The most important kind in C++ is **runtime (dynamic) polymorphism** via **virtual functions**: a pointer or reference to a base class calls the version of a method that matches the object's *actual* type. This is what makes frameworks, plugins, and clean extensible designs possible.

## Learning Objectives

After this lesson you will be able to:

- Explain static vs dynamic binding
- Use virtual functions and `override`
- Build polymorphic containers of base-class pointers
- Define abstract classes with pure virtual functions
- Explain how the **vtable** makes dynamic dispatch work

## Core Concepts

### Static vs dynamic binding

```cpp
class Base {
public:
    virtual void who() const { std::cout << "Base\n"; }
};

class Derived : public Base {
public:
    void who() const override { std::cout << "Derived\n"; }
};

Derived d;
Base& r = d;      // a base REFERENCE to a derived object
r.who();          // "Derived" — resolved at RUNTIME via virtual dispatch
```

Without `virtual`, the call would be bound at **compile time** to `Base::who` — always printing "Base". With `virtual`, the call is dispatched through the object's **vtable**.

### How the vtable works (concept)

```
 Base object                 vtable for Base
 ┌──────────────┐            ┌──────────────┐
 │ vptr ────────┼──────────▶ │ &Base::who   │
 └──────────────┘            └──────────────┘

 Derived object              vtable for Derived
 ┌──────────────┐            ┌──────────────────┐
 │ vptr ────────┼──────────▶ │ &Derived::who    │   ← points at override
 └──────────────┘            └──────────────────┘
```

Each polymorphic object carries a hidden **vptr** to its class's **vtable** — a table of function pointers. Calling `r.who()` looks up the right function at runtime.

### Abstract classes and interfaces

```cpp
class Shape {
public:
    virtual double area() const = 0;   // pure virtual → abstract
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return 3.14159 * r * r; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double a, double b) : w(a), h(b) {}
    double area() const override { return w * h; }
};
```

A class with a pure virtual function is **abstract** — you cannot instantiate it, but you can point at derived objects through it.

### Polymorphic containers

```cpp
#include <memory>
#include <vector>

std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(2.0));
shapes.push_back(std::make_unique<Rectangle>(3.0, 4.0));

for (const auto& s : shapes) {
    std::cout << s->area() << "\n";   // each calls ITS OWN area()
}
```

Store **base pointers** (or `unique_ptr<Base>`) to hold mixed derived types and dispatch polymorphically.

## Visual — How a Virtual Call Dispatches

```
 Shape& s = circle;        // s is a Base reference to a Circle
     │
     ▼
 s.area()                  // the call is VIRTUAL
     │
     ▼
 [s's vtable pointer] ──▶ Circle's vtable
                          ┌────────────────┐
                          │ 0: Circle::area │──▶ runs the DERIVED area()
                          └────────────────┘
```

Each polymorphic object carries a hidden **vtable pointer**. A virtual call looks up the actual function in the object's vtable — so `s.area()` runs `Circle::area()`, not `Shape::area()`.

## Code Examples

### Example 1 — A shape area calculator

```cpp
#include <iostream>
#include <memory>
#include <vector>

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(2));
    shapes.push_back(std::make_unique<Rectangle>(3, 4));

    double total = 0;
    for (const auto& s : shapes) total += s->area();
    std::cout << "Total area: " << total << "\n";
    return 0;
}
```

### Example 2 — Runtime dispatch on references

```cpp
void announce(const Shape& s) {
    std::cout << "Area is " << s.area() << "\n";   // dispatched at runtime
}

Circle c(1);
Rectangle r(2, 3);
announce(c);
announce(r);
```

### Example 3 — Extending with a new type (no existing code changes)

```cpp
class Triangle : public Shape {
    double base, height;
public:
    Triangle(double b, double h) : base(b), height(h) {}
    double area() const override { return 0.5 * base * height; }
};

// Add triangles to the SAME vector — nothing else changes:
shapes.push_back(std::make_unique<Triangle>(4, 5));
```

This is polymorphism's payoff: you can add new behaviour without modifying existing code.

## Common Mistakes

1. **Omitting `virtual`** — the base method is called statically, not the override.
2. **Passing by value** — `void f(Shape s)` slices the object and kills polymorphism; pass by reference/pointer.
3. **Missing virtual destructor** — deleting a derived through a base pointer is undefined behaviour.
4. **Calling virtual functions from a constructor** — they dispatch as the base version, not the derived one.
5. **Forgetting `= 0`** — a class you meant to be abstract remains instantiable.
6. **Shadowing instead of overriding** — a signature mismatch silently creates a new method.

## Best Practices

- Use `virtual` on base methods intended to be overridden, and `override` in derived classes.
- Make base destructors `virtual` for any polymorphic hierarchy.
- Prefer **interfaces** (abstract base classes with pure virtuals) to keep coupling low.
- Store polymorphic objects via `unique_ptr<Base>` in containers.
- Prefer composition and templates where static dispatch suffices — virtual calls have a small cost.

## Practice Questions

1. Create a base `Animal` with `virtual void speak()`, and `Dog`/`Cat` overrides; call `speak()` through base references.
2. Write an abstract `Payment` class with pure virtual `process()`, and `CardPayment`/`CashPayment` derived classes.
3. Store several derived objects in a `std::vector<std::unique_ptr<Shape>>` and print each `area()`.
4. Explain, with a short example, what happens if you forget `virtual` on the base method.
5. Add a new `Triangle` shape to an existing shape vector to demonstrate the open/closed principle.

## Multiple Choice Questions (MCQs)

### Q1. Runtime polymorphism in C++ is achieved with:
- a) Templates
- b) Virtual functions
- c) Macros
- d) Global variables

**Answer:** b

### Q2. A pure virtual function is declared with:
- a) `= delete`
- b) `= 0`
- c) `virtual {}`
- d) `override`

**Answer:** b

### Q3. Calling `speak()` through a `Base&` that refers to a `Derived` object calls the derived version when:
- a) `speak` is `virtual` in the base
- b) The reference is `const`
- c) The derived class is final
- d) Always

**Answer:** a

### Q4. What is the vtable?
- a) A list of virtual destructors
- b) A per-class table of virtual function pointers used for dispatch
- c) A hash table of objects
- d) A compile-time constant

**Answer:** b

### Q5. Passing a polymorphic object **by value** to a function causes:
- a) Faster dispatch
- b) Object slicing — the derived part is lost
- c) A compile error
- d) Automatic cloning

**Answer:** b — pass by reference or pointer to preserve polymorphism.

## Key Takeaways

- Virtual functions + `override` give **runtime dispatch** through base pointers/references.
- Abstract classes (pure virtuals) define interfaces that derived classes must implement.
- The **vtable** is the per-class table that makes dynamic dispatch work.
- Pass polymorphic objects by reference/pointer; never by value.

## Module 7 Complete 🎉

You've finished **Module 7 — Object-Oriented Programming**. Next up: **Module 8 — Advanced C++**.
