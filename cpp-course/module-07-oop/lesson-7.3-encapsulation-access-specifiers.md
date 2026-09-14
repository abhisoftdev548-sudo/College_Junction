---
module: 7
topic: "7.3"
title: "Encapsulation and Access Specifiers"
slug: "encapsulation-access-specifiers"
difficulty: "Intermediate"
prerequisites:
  - Classes and Objects
  - Constructors and Destructors
estimated_minutes: 25
tags:
  - oop
  - encapsulation
  - access-specifiers
---

# 7.3 Encapsulation and Access Specifiers

## Overview

**Encapsulation** bundles data and the methods that operate on it, then **hides the internals** behind a controlled interface. Access specifiers — `public`, `private`, and `protected` — are the mechanism. The goal is not secrecy for its own sake, but making invalid states hard to reach and changes safe to make.

## Learning Objectives

After this lesson you will be able to:

- Explain the purpose of encapsulation
- Use `public`, `private`, and `protected` correctly
- Enforce invariants with private data + validated setters
- Use `friend` judiciously to grant controlled access
- Write getters/setters that preserve object integrity

## Core Concepts

### The three access specifiers

```cpp
class Demo {
public:       // accessible from anywhere
    void run() {}

private:      // accessible only from inside this class
    int secret_ = 1;
    void helper() {}

protected:    // accessible from this class AND derived classes (see 7.4)
    int shared_ = 2;
};
```

| Specifier | Same class | Derived class | Outside |
|---|---|---|---|
| `public` | ✔ | ✔ | ✔ |
| `protected` | ✔ | ✔ | ✘ |
| `private` | ✔ | ✘ | ✘ |

### Enforcing invariants with setters

```cpp
class Temperature {
    double celsius;                 // private — can't be set to nonsense directly
public:
    void setCelsius(double c) {
        if (c < -273.15) {          // absolute zero guard
            celsius = -273.15;
        } else {
            celsius = c;
        }
    }
    double getCelsius() const { return celsius; }
    double getFahrenheit() const { return celsius * 9.0 / 5.0 + 32.0; }
};

Temperature t;
t.setCelsius(25);
// t.celsius = -9999;  // ERROR — invariant protected
```

Because the data is private, the object can guarantee it never holds a physically impossible value.

### Getters vs exposing data

```cpp
class BadDesign {
public:
    double celsius;   // anyone can write invalid values — no encapsulation
};

class GoodDesign {
    double celsius;
public:
    double getCelsius() const;      // read-only access
    void setCelsius(double c);      // validated write access
};
```

### friend — controlled exception

```cpp
class Secret {
    int value = 42;
    friend void reveal(const Secret& s);   // grants this ONE function access
};

void reveal(const Secret& s) {
    std::cout << s.value;   // allowed because it is a friend
}
```

`friend` grants access to a specific function or class without making members public — use it sparingly.

## Visual — Encapsulation Wall

```
           outside world
  ──────────────┬────────────────
                │  public interface
        ┌───────▼───────┐
        │   getX()      │
        │   setX(val)   │   ← the only "doors" into the object
        ├───────────────┤
        │  private: x   │   ← internals hidden behind the wall
        │  private: y   │
        └───────────────┘
```

External code depends on the **interface**, not the internals — so you can change the internals freely.

## Code Examples

### Example 1 — Validated setter

```cpp
#include <iostream>

class BankAccount {
    double balance;
public:
    void deposit(double amt) {
        if (amt > 0) balance += amt;   // reject invalid deposits
    }
    bool withdraw(double amt) {
        if (amt > 0 && amt <= balance) {
            balance -= amt;
            return true;
        }
        return false;
    }
    double getBalance() const { return balance; }
};

int main() {
    BankAccount a;
    a.deposit(100);
    a.withdraw(40);
    std::cout << a.getBalance();   // 60
}
```

### Example 2 — friend function

```cpp
#include <iostream>

class Box {
    double side;
public:
    Box(double s) : side(s) {}
    friend double volume(const Box& b);  // friend can read private side
};

double volume(const Box& b) {
    return b.side * b.side * b.side;
}

int main() {
    Box b(3);
    std::cout << volume(b);   // 27
}
```

### Example 3 — Read-only member via getter

```cpp
class ReadOnlyId {
    const int id;
public:
    ReadOnlyId(int i) : id(i) {}
    int getId() const { return id; }   // getter only — no setter
};
```

## Common Mistakes

1. **Public data "for convenience"** — breaks invariants and couples code to internals.
2. **Getters returning mutable references** — `int& getX()` lets callers bypass validation.
3. **Overusing `friend`** — if many classes are friends, the encapsulation is gone.
4. **Forgetting the specifier** — in a `class` everything is private, so "public" methods accidentally become unreachable.
5. **Setters that don't validate** — a setter that blindly assigns is little better than public data.
6. **Returning raw pointers to internals** — the caller can mutate or dangle the object's state.

## Best Practices

- Keep **all data private**; expose behaviour, not fields.
- Validate in setters; make fields read-only via const members or getters-only.
- Keep the public interface minimal and stable.
- Use `friend` only for tightly-coupled helpers like `operator<<` or `swap`.
- Prefer member functions over getters/setters where an operation belongs to the object.

## Practice Questions

1. Write a `Circle` class with a private `radius` and a setter that rejects negative values.
2. Add `getArea()` and `getCircumference()` to `Circle` (read-only methods).
3. Write a `Password` class that stores a private `std::string` and validates a minimum length in its setter.
4. Use a `friend` function to print the private state of a class without a public getter.
5. Explain why `int& getX()` is dangerous and how to fix it with `const int&` or by-value return.

## Multiple Choice Questions (MCQs)

### Q1. Encapsulation means:
- a) Making all members public
- b) Bundling data with methods and hiding internals
- c) Removing all methods
- d) Using only global variables

**Answer:** b

### Q2. Which member can be accessed by derived classes but not outside code?
- a) `public`
- b) `private`
- c) `protected`
- d) `static`

**Answer:** c

### Q3. Why validate inputs in a setter?
- a) To make the program slower
- b) To preserve object invariants
- c) To force `friend` usage
- d) There is no reason

**Answer:** b

### Q4. What is the main risk of returning `int&` from a getter?
- a) It's always slower
- b) Callers can modify the private data directly
- c) It causes a compile error
- d) It deletes the object

**Answer:** b

### Q5. A `friend` function can:
- a) Access private members of the granting class
- b) Be inherited by derived classes
- c) Access private members of all classes
- d) Replace constructors

**Answer:** a — access is granted by the specific class, only to that function/class.

## Key Takeaways

- Encapsulation hides data behind a controlled **interface**, protecting invariants.
- `private` = this class only; `protected` = + derived; `public` = everyone.
- Setters validate; getters can be read-only; avoid returning mutable references.
- `friend` is a precise escape hatch — use it rarely.

## Next Topic

[7.4 Inheritance](lesson-7.4-inheritance.md)
