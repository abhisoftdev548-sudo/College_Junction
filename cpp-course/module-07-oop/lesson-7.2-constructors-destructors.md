---
module: 7
topic: "7.2"
title: "Constructors and Destructors"
slug: "constructors-destructors"
difficulty: "Intermediate"
prerequisites:
  - Classes and Objects
estimated_minutes: 30
tags:
  - oop
  - constructors
  - destructors
  - initializer-lists
---

# 7.2 Constructors and Destructors

## Overview

A **constructor** is a special member function that runs automatically when an object is created — its job is to **initialize** the object into a valid state. A **destructor** runs automatically when the object's lifetime ends — its job is to **clean up** resources. Together they implement RAII: setup on birth, teardown on death.

## Learning Objectives

After this lesson you will be able to:

- Write default, parameterized, and delegating constructors
- Use **member initializer lists** correctly
- Explain when constructors and destructors are called
- Write a destructor that releases owned resources
- Recognize the **Rule of Three/Five** and copy control

## Core Concepts

### Basic constructors

```cpp
class Point {
public:
    int x, y;

    Point() : x(0), y(0) {}                 // default constructor
    Point(int a, int b) : x(a), y(b) {}     // parameterized constructor
};

Point p1;          // calls Point()
Point p2(3, 4);    // calls Point(int, int)
```

A constructor has the **same name as the class** and **no return type**.

### Member initializer list

```cpp
class Person {
    std::string name;
    int age;
public:
    // Preferred: initialize directly, not assign in the body
    Person(const std::string& n, int a) : name(n), age(a) {}
};
```

Initializer lists run **before** the constructor body and are required for `const`/reference members and more efficient for class members.

### Destructor

```cpp
class Buffer {
    int* data;
public:
    Buffer(int n) : data(new int[n]) {}
    ~Buffer() { delete[] data; }   // destructor: frees memory
};
```

A destructor is named `~ClassName`, takes no arguments, and runs automatically when the object goes out of scope.

### Order of construction/destruction

```cpp
{
    Point p(1, 2);   // 1. constructor runs
    // ... use p ...
}                    // 2. destructor runs (object destroyed)
```

Members are constructed **before** the body and destroyed **in reverse order** after it.

### Copy control — the Rule of Three/Five

If your class manages a resource (like `new`-allocated memory), it needs:

1. **Destructor** — free the resource
2. **Copy constructor** — deep-copy when copied
3. **Copy assignment** — deep-copy when assigned

(With move semantics, add the move constructor and move assignment — the **Rule of Five**.)

```cpp
class Buffer {
    int* data;
    int size;
public:
    Buffer(int n) : data(new int[n]), size(n) {}
    ~Buffer() { delete[] data; }                       // 1
    Buffer(const Buffer& o) : data(new int[o.size]), size(o.size) { // 2
        std::copy(o.data, o.data + size, data);
    }
    Buffer& operator=(const Buffer& o) {               // 3
        if (this != &o) {
            delete[] data;
            size = o.size;
            data = new int[size];
            std::copy(o.data, o.data + size, data);
        }
        return *this;
    }
};
```

## Visual — Object Lifetime

```
   Point p(1, 2);          // constructor: x=1, y=2
   ┌─────────────────┐
   │  x = 1   y = 2  │   ← object alive and usable
   └─────────────────┘
   }  // scope ends
   ┌─────────────────┐
   │   ~Point()      │   ← destructor cleans up
   └─────────────────┘
```

Constructors give you a valid starting state; destructors release anything the object owned.

## Code Examples

### Example 1 — A BankAccount with initialization

```cpp
#include <iostream>
#include <string>

class BankAccount {
    std::string owner;
    double balance;
public:
    BankAccount(const std::string& o, double b) : owner(o), balance(b) {}
    void deposit(double amt) { balance += amt; }
    void print() const { std::cout << owner << ": " << balance << "\n"; }
};

int main() {
    BankAccount acc("Ankit", 500.0);
    acc.deposit(250.0);
    acc.print();          // Ankit: 750
    return 0;
}
```

### Example 2 — Destructor order

```cpp
#include <iostream>

struct Tracer {
    Tracer(const char* n) : name(n) { std::cout << "ctor " << name << "\n"; }
    ~Tracer() { std::cout << "dtor " << name << "\n"; }
    const char* name;
};

int main() {
    Tracer a("a");
    {
        Tracer b("b");
    }                     // b destroyed here
    Tracer c("c");
    return 0;
}
// Output: ctor a, ctor b, dtor b, ctor c, dtor c, dtor a
```

### Example 3 — A simple dynamic array class (Rule of Three)

```cpp
class IntArray {
    int* data;
    int n;
public:
    explicit IntArray(int size) : data(new int[size]()), n(size) {}
    ~IntArray() { delete[] data; }
    IntArray(const IntArray& o) : data(new int[o.n]), n(o.n) {
        std::copy(o.data, o.data + n, data);
    }
    IntArray& operator=(const IntArray& o) {
        if (this != &o) {
            delete[] data;
            n = o.n;
            data = new int[n];
            std::copy(o.data, o.data + n, data);
        }
        return *this;
    }
    int& at(int i) { return data[i]; }
};
```

## Common Mistakes

1. **Forgetting the initializer list** — `const` and reference members cannot be assigned in the body.
2. **Return type on a constructor** — `void Point() {...}` is a compile error.
3. **Missing destructor for owned resources** — leaks memory or file handles.
4. **Shallow copying** — the default copy copies the pointer, so two objects `delete[]` the same memory (double free).
5. **Not checking self-assignment** in `operator=` — `a = a;` can delete the data first.
6. **Calling a destructor manually** — it runs again automatically, causing double deletion.

## Best Practices

- Use **member initializer lists** for all members.
- Let containers/smart pointers own resources so you often need **no** custom destructor.
- Follow the **Rule of Three/Five** when you manage a raw resource — or better, avoid raw resources.
- Mark single-argument constructors `explicit` to prevent surprising implicit conversions.

## Practice Questions

1. Write a `Car` class with a parameterized constructor for `brand` and `year`, and a default constructor that uses "Unknown"/0.
2. Write a `Logger` class that prints "started" in its constructor and "stopped" in its destructor, and observe the output with two objects.
3. Write a class that owns a `new int[10]` and implement the destructor, copy constructor, and copy assignment.
4. Explain, with code, why a member initializer list is required for a `const int` member.
5. Trace the order of construction/destruction for three objects created in a single scope.

## Multiple Choice Questions (MCQs)

### Q1. A constructor has:
- a) The class name and a return type
- b) The class name and no return type
- c) A `~` prefix
- d) A `void` return type

**Answer:** b

### Q2. When is a destructor called?
- a) When the object is created
- b) When the object goes out of scope or is deleted
- c) Only when explicitly invoked
- d) At program start

**Answer:** b

### Q3. Which initializes a member correctly?
- a) `Point(int a) { x = a; }`
- b) `Point(int a) : x(a) {}`
- c) `Point(int a) : { x = a; }`
- d) `Point(int a) { x(a); }`

**Answer:** b — member initializer list syntax.

### Q4. The Rule of Three applies to classes that:
- a) Have no members
- b) Manage a resource like dynamic memory
- c) Are declared `final`
- d) Only contain `int`s

**Answer:** b — they need destructor, copy constructor, and copy assignment.

### Q5. What is a common bug without a custom copy constructor in a resource-owning class?
- a) Compile error
- b) Double free from shallow copies
- c) The class becomes abstract
- d) Members become public

**Answer:** b — the default copy shares the pointer, so both objects free the same memory.

## Key Takeaways

- Constructors **initialize**; destructors **clean up**; both run automatically.
- Use **member initializer lists**; they're required for `const`/reference members.
- Resource-owning classes need the **Rule of Three/Five** (or use smart pointers instead).
- Objects are destroyed in **reverse order** of construction.

## Next Topic

[7.3 Encapsulation and Access Specifiers](lesson-7.3-encapsulation-access-specifiers.md)
