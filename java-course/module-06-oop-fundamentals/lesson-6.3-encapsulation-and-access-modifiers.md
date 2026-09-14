---
module: 6
topic: "6.3"
title: "Encapsulation and Access Modifiers"
slug: "encapsulation-and-access-modifiers"
difficulty: "Intermediate"
prerequisites:
  - Constructors
estimated_minutes: 30
tags:
  - java
  - oop
  - encapsulation
  - access-modifiers
---

# 6.3 Encapsulation and Access Modifiers

## Overview

**Encapsulation** hides an object's internal state behind a controlled interface — you expose behaviour, not fields. Java's **access modifiers** (`private`, default, `protected`, `public`) are the mechanism. The goal is protecting **invariants**: making invalid states impossible to reach from outside.

## Learning Objectives

After this lesson you will be able to:

- Explain encapsulation and its benefits
- Use `private`, default (package-private), `protected`, and `public`
- Write **getters and setters** that validate input
- Enforce invariants with private fields
- Recognize why public fields are an anti-pattern

## Core Concepts

### The four access modifiers

| Modifier | Same class | Same package | Subclass | Everywhere |
|---|---|---|---|---|
| `private` | ✔ | ✘ | ✘ | ✘ |
| *(default)* | ✔ | ✔ | ✘ | ✘ |
| `protected` | ✔ | ✔ | ✔ | ✘ |
| `public` | ✔ | ✔ | ✔ | ✔ |

### Private fields + public methods

```java
public class BankAccount {
    private double balance;          // hidden — can't be set directly

    public void deposit(double amount) {
        if (amount > 0) {            // validate!
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {     // getter — read-only access
        return balance;
    }
}

// acc.balance = 999999;  // ERROR — private
```

Because `balance` is private, the object guarantees it can never become negative.

### Getters and setters

```java
public class Student {
    private String name;
    private int age;

    public String getName() { return name; }

    public void setName(String n) {
        if (n != null && !n.isBlank()) {
            name = n;
        }
    }

    public int getAge() { return age; }

    public void setAge(int a) {
        if (a >= 0 && a <= 150) {    // validate
            age = a;
        }
    }
}
```

A **setter** validates and controls writes; a **getter** controls reads.

### The default (package-private) modifier

```java
class Helper {              // no modifier → visible only within the package
    int value;              // package-private field
}
```

Omitting a modifier gives **package-private** access — visible to classes in the same package, hidden from outside packages.

### Why encapsulation matters

- **Invariants** — the object can't be put in an invalid state.
- **Flexibility** — you can change internals without breaking callers.
- **Control** — you decide what's readable/writable and how.

## Visual — The Encapsulation Wall

```
         outside code
  ────────────┬──────────────
              │  public interface
       ┌──────▼──────┐
       │ deposit()   │
       │ withdraw()  │   ← the only "doors" in
       │ getBalance()│
       ├─────────────┤
       │ balance     │   ← private — hidden behind the wall
       └─────────────┘
```

Callers depend on the interface, not the internals — so internals can change freely.

## Code Examples

### Example 1 — Invariant-protected class

```java
public class Temperature {
    private double celsius;

    public void setCelsius(double c) {
        if (c < -273.15) celsius = -273.15;   // absolute zero guard
        else celsius = c;
    }

    public double getCelsius() { return celsius; }
    public double getFahrenheit() { return celsius * 9.0 / 5.0 + 32.0; }
}
```

### Example 2 — Getter/setter with validation

```java
public class Product {
    private String name;
    private double price;

    public String getName() { return name; }

    public void setName(String n) {
        if (n == null || n.isBlank()) throw new IllegalArgumentException("name required");
        name = n;
    }

    public double getPrice() { return price; }

    public void setPrice(double p) {
        if (p < 0) throw new IllegalArgumentException("negative price");
        price = p;
    }
}
```

### Example 3 — Read-only field via getter

```java
public class ReadOnlyId {
    private final int id;      // final — set once, never changed

    public ReadOnlyId(int id) {
        this.id = id;
    }

    public int getId() { return id; }   // getter only — no setter
}
```

## Common Mistakes

1. **Public fields "for convenience"** — breaks encapsulation and invariants.
2. **Getters returning mutable objects** — `public int[] getData()` lets callers mutate internals; return a copy.
3. **Setters that don't validate** — a setter that blindly assigns is barely better than a public field.
4. **Forgetting the modifier** — fields default to package-private, which may be more visible than intended.
5. **Returning `this` from getters** — leaks the whole object unintentionally.
6. **Over-using getters/setters** — behaviour belongs in methods, not get/set pairs.

## Best Practices

- Make **all fields private**; expose behaviour through methods.
- Validate in setters and constructors.
- Return copies of mutable fields, not the field itself.
- Use `final` for truly read-only fields.
- Keep the public interface minimal and stable.

## Practice Questions

1. Write a `Circle` class with a private `radius` and a validating setter.
2. Add `getArea()` and `getCircumference()` (read-only methods).
3. Write a `Password` class that enforces a minimum length in its setter.
4. Explain why `public int[] getData()` is dangerous and fix it.
5. List the four access modifiers and who can access each.

## Multiple Choice Questions (MCQs)

### Q1. Encapsulation means:
- a) Making all fields public
- b) Hiding data behind a controlled interface
- c) Removing methods
- d) Using only static fields

**Answer:** b

### Q2. A `private` field is accessible:
- a) Everywhere
- b) Only within its own class
- c) In the same package
- d) In subclasses

**Answer:** b

### Q3. The no-modifier (default) access level is:
- a) Public
- b) Private
- c) Package-private
- d) Protected

**Answer:** c

### Q4. A getter's purpose is to:
- a) Mutate a field
- b) Provide controlled read access
- c) Delete a field
- d) Make a field public

**Answer:** b

### Q5. Validating in a setter protects:
- a) Performance
- b) Object invariants (invalid states)
- c) Compile time
- d) Memory usage

**Answer:** b

## Key Takeaways

- Encapsulation hides state; access modifiers enforce it (`private` → `public`).
- Private fields + validated getters/setters preserve invariants.
- Default = package-private; return copies of mutable fields.
- Keep fields private and interfaces minimal.

## Next Topic

[6.4 this and static Members](lesson-6.4-this-and-static-members.md)
