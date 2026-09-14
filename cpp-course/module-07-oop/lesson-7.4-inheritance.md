---
module: 7
topic: "7.4"
title: "Inheritance"
slug: "inheritance"
difficulty: "Intermediate"
prerequisites:
  - Classes and Objects
  - Constructors and Destructors
  - Encapsulation
estimated_minutes: 30
tags:
  - oop
  - inheritance
  - polymorphism
---

# 7.4 Inheritance

## Overview

**Inheritance** lets a class (**derived**) reuse and extend another class (**base**), modelling "is-a" relationships: a `Dog` is-a `Animal`, a `Car` is-a `Vehicle`. It eliminates duplication and sets up polymorphism. C++ supports multiple base classes, but single inheritance is the most common.

## Learning Objectives

After this lesson you will be able to:

- Declare a derived class and control its access specifier
- Explain how base-class constructors and destructors are called
- Override base-class methods
- Use `protected` to share state with derived classes
- Recognize the role of virtual functions (bridging to 7.5)

## Core Concepts

### Basic inheritance

```cpp
class Animal {
public:
    void eat() { /* ... */ }
};

class Dog : public Animal {   // Dog inherits Animal publicly
public:
    void bark() { /* ... */ }
};

Dog d;
d.eat();    // inherited from Animal
d.bark();   // Dog's own method
```

The syntax is `class Derived : accessSpecifier Base`. Public inheritance means the "is-a" relationship holds.

### Constructor and destructor order

```cpp
class Base {
public:
    Base()  { std::cout << "Base ctor\n"; }
    ~Base() { std::cout << "Base dtor\n"; }
};

class Derived : public Base {
public:
    Derived()  { std::cout << "Derived ctor\n"; }
    ~Derived() { std::cout << "Derived dtor\n"; }
};

// Derived d;   prints: Base ctor, Derived ctor, Derived dtor, Base dtor
```

**Base is constructed first, destroyed last.**

### Passing arguments to the base constructor

```cpp
class Animal {
    std::string name;
public:
    Animal(const std::string& n) : name(n) {}
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}   // forward to base ctor
};
```

If the base has no default constructor, the derived constructor **must** call a base constructor in its initializer list.

### Overriding methods

```cpp
class Animal {
public:
    virtual void speak() const { std::cout << "...\n"; }
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof\n"; }   // override
};
```

Mark the base method `virtual` and the derived one `override`. This is what enables **polymorphism** (7.5): calling `speak()` through an `Animal*` dispatches to the real type.

### protected members

```cpp
class Animal {
protected:                    // visible to derived classes
    int age = 0;
public:
    virtual void describe() const = 0;   // pure virtual → abstract class
};

class Dog : public Animal {
public:
    void describe() const override {
        std::cout << "Dog, age " << age; // age is accessible here
    }
};
```

`protected` lets derived classes read shared state without making it fully public.

## Visual — Inheritance Hierarchy

```
              ┌─────────────┐
              │   Animal    │  base class
              │  eat()      │
              │  speak()    │  (virtual)
              └──────┬──────┘
              ┌──────┴──────┐
        ┌─────┴─────┐  ┌────┴──────┐
        │    Dog    │  │   Cat     │  derived classes
        │  speak()  │  │  speak()  │
        │  bark()   │  │  meow()   │
        └───────────┘  └───────────┘
   "Dog is-a Animal", "Cat is-a Animal"
```

Both share the base interface; each provides its own `speak()`.

## Code Examples

### Example 1 — Vehicle hierarchy

```cpp
#include <iostream>
#include <string>

class Vehicle {
protected:
    std::string brand;
public:
    Vehicle(const std::string& b) : brand(b) {}
    virtual void describe() const {
        std::cout << "Vehicle: " << brand << "\n";
    }
};

class Car : public Vehicle {
    int doors;
public:
    Car(const std::string& b, int d) : Vehicle(b), doors(d) {}
    void describe() const override {
        std::cout << "Car: " << brand << ", " << doors << " doors\n";
    }
};

int main() {
    Car c("Toyota", 4);
    c.describe();   // Car: Toyota, 4 doors
    return 0;
}
```

### Example 2 — Polymorphic call via base pointer

```cpp
#include <iostream>
#include <memory>
#include <vector>

int main() {
    std::vector<std::unique_ptr<Vehicle>> fleet;
    fleet.push_back(std::make_unique<Car>("Honda", 4));
    fleet.push_back(std::make_unique<Vehicle>("Generic"));

    for (const auto& v : fleet) {
        v->describe();   // dispatches to the right type at runtime
    }
    // Car: Honda, 4 doors
    // Vehicle: Generic
}
```

### Example 3 — Abstract base class

```cpp
class Shape {
public:
    virtual double area() const = 0;   // pure virtual — no implementation
    virtual ~Shape() = default;        // virtual destructor is essential
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() const override { return side * side; }
};

// Shape s;        // ERROR — cannot instantiate an abstract class
Square sq(5);
// sq.area() == 25
```

## Common Mistakes

1. **Forgetting `virtual` destructor** — deleting a derived object through a base pointer leaks/UB.
2. **Not calling the base constructor** — fails when the base lacks a default constructor.
3. **Slicing** — copying a derived object into a base **by value** cuts off derived members.
4. **Hiding instead of overriding** — omitting `virtual` in the base causes name hiding, not polymorphism.
5. **Forgetting `override`** — a typo silently creates a new method instead of overriding.
6. **Assuming base-first destruction** — it's derived-first, base-last.

## Best Practices

- Make base destructors `virtual` whenever a class is meant to be inherited.
- Use `override` on every overridden method — let the compiler check you.
- Prefer **composition over inheritance** when the relationship isn't a true "is-a".
- Keep hierarchies shallow; deep inheritance is hard to reason about.
- Use pure virtual functions to define abstract interfaces.

## Practice Questions

1. Write `Person` (base, with `name`) and `Student` (derived, adds `rollNo`), forwarding the name to the base constructor.
2. Print the order of construction/destruction for a two-level hierarchy.
3. Write an abstract `Shape` with pure virtual `area()`, and `Circle` and `Square` derived classes.
4. Use a `std::vector<std::unique_ptr<Shape>>` to call `area()` polymorphically.
5. Demonstrate (in a comment) what object slicing does when assigning a derived object to a base by value.

## Multiple Choice Questions (MCQs)

### Q1. `class Dog : public Animal` means:
- a) `Dog` has-a `Animal`
- b) `Dog` is-a `Animal`
- c) `Animal` is-a `Dog`
- d) `Dog` copies `Animal`

**Answer:** b — public inheritance models "is-a".

### Q2. In a derived class, what is constructed first?
- a) Derived part
- b) Base part
- c) Both simultaneously
- d) Members only

**Answer:** b — base first, then derived.

### Q3. Which keyword marks a method as overriding a virtual base method?
- a) `new`
- b) `override`
- c) `super`
- d) `extends`

**Answer:** b

### Q4. Why should a base class with virtual functions have a virtual destructor?
- a) To speed up deletion
- b) So deleting via a base pointer calls the correct destructor
- c) To prevent inheritance
- d) It is optional and rarely needed

**Answer:** b

### Q5. What is object slicing?
- a) Deleting a derived object
- b) Copying a derived object into a base object, losing derived data
- c) Creating multiple bases
- d) Making a class abstract

**Answer:** b

## Key Takeaways

- Inheritance models **"is-a"** and reuses base behaviour via `class D : public B`.
- Construction is **base → derived**; destruction is **derived → base**.
- `virtual` + `override` enable runtime polymorphism (next lesson).
- Always give polymorphic base classes a **virtual destructor**.

## Next Topic

[7.5 Polymorphism](lesson-7.5-polymorphism.md)
