---
module: 6
topic: "6.3"
title: "References"
slug: "references"
difficulty: "Intermediate"
prerequisites:
  - Pointers Basics
  - Functions
estimated_minutes: 25
tags:
  - references
  - functions
  - lvalue
---

# 6.3 References

## Overview

A **reference** is an alias — another name for an existing variable. It looks like a pointer with friendlier syntax: no `*`, no `&` at every use, and no null. References are the idiomatic way to pass large objects to functions without copying, and to let a function modify the caller's variable.

## Learning Objectives

After this lesson you will be able to:

- Declare and use an lvalue reference
- Explain how references differ from pointers
- Pass parameters by value, by reference, and by `const` reference
- Choose the right parameter passing style for a given situation
- Recognize and avoid dangling references

## Core Concepts

### Declaration

```cpp
int x = 10;
int& ref = x;    // ref is an alias for x

ref = 20;        // same as x = 20
std::cout << x;  // 20
```

The `&` here means "reference", not "address-of". A reference must be **initialized when declared** and **cannot be re-seated** to refer to a different variable.

### References vs pointers

| | Reference | Pointer |
|---|---|---|
| Can be null | No | Yes (`nullptr`) |
| Can be reassigned to another object | No | Yes |
| Syntax to access value | `ref` | `*p` |
| Must be initialized at declaration | Yes | Recommended |
| Memory/address taken | The referred object's | Its own |

Think of a reference as a pointer that is automatically dereferenced and cannot be null or rebound.

### Pass by reference

```cpp
void increment(int& n) {   // n is an alias for the caller's variable
    ++n;
}

int x = 5;
increment(x);
std::cout << x;            // 6 — the caller's variable changed
```

### Pass by const reference

```cpp
void print(const std::string& s) {  // no copy, read-only
    std::cout << s;
}

print("Hello");  // works with literals too
```

`const&` gives you the efficiency of a reference with the safety of "this cannot be modified."

### Choosing a passing style

```cpp
void byValue(std::string s);          // copy — caller's string unaffected
void byRef(std::string& s);           // alias — can modify caller's string
void byConstRef(const std::string& s);// no copy, read-only — preferred for reads
```

Rule of thumb: **small/primitive → by value; large/class → `const&`; modify in place → `&`.**

## Memory Layout (Visual)

```
int x = 10;
int& ref = x;      // ref is just another name for x — no separate object

  address: 0x100
  ┌──────────┐
  │    10    │  ◄── x  and  ref (both refer to this single int)
  └──────────┘
```

Unlike a pointer, a reference typically occupies no storage of its own — the compiler just treats `ref` as `x`. Modifying either changes the same object.

## Code Examples

### Example 1 — Swap via references

```cpp
#include <iostream>

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 9;
    swap(x, y);
    std::cout << x << " " << y; // 9 3
    return 0;
}
```

### Example 2 — Read a big string efficiently

```cpp
#include <iostream>
#include <string>

void describe(const std::string& s) {
    std::cout << "Length: " << s.size() << "\n";
}

int main() {
    std::string text = "a very long string...";
    describe(text);          // no copy made
    describe("literal");     // binds to a const& too
}
```

### Example 3 — Return a reference to an existing element

```cpp
#include <array>

int& getElement(std::array<int, 3>& a, std::size_t i) {
    return a[i];   // returns a reference — no copy
}

int main() {
    std::array<int, 3> a = {1, 2, 3};
    getElement(a, 1) = 42;   // modifies a[1]
    // a is now {1, 42, 3}
}
```

## Common Mistakes

1. **Returning a reference to a local variable** — the local dies, leaving a **dangling reference**.
2. **Declaring a reference without initializing** — `int& r;` is a compile error.
3. **Trying to rebind** — `ref = other;` assigns the value, it does not make `ref` alias `other`.
4. **Binding a non-const reference to a temporary** — `int& r = 5;` is illegal; use `const int&`.
5. **Confusing `&` meanings** — in a declaration it's a reference; in an expression it's address-of.
6. **Forgetting `const`** — passing a `const` object to a non-const reference parameter fails to compile.

## Best Practices

- Pass read-only objects as `const T&` to avoid copies.
- Pass objects you must modify as `T&` — but prefer returning a value when that reads clearer.
- Pass primitives (int, double, char) by value; a reference buys nothing there.
- Never return a reference to a local; return by value or `std::optional` for "maybe nothing."

## Practice Questions

1. Write a function `void doubleIt(int& n)` and show it changing the caller's variable.
2. Explain the difference between `int&` and `const int&` with an example of each.
3. Write a function `const std::string& longer(const std::string& a, const std::string& b)` that returns the longer string.
4. Identify the bug: `int& makeRef() { int x = 5; return x; }` and explain the fix.
5. Swap two `std::string`s using reference parameters and print the results.

## Multiple Choice Questions (MCQs)

### Q1. What is a reference in C++?
- a) A pointer that can be null
- b) An alias for an existing variable
- c) A new copy of a variable
- d) A constant pointer you must free

**Answer:** b

### Q2. Which correctly declares a reference to `int x`?
- a) `int ref = x;`
- b) `int& ref = x;`
- c) `int* ref = &x;`
- d) `int& ref = 5;`

**Answer:** b — and it must initialize from an lvalue like `x`.

### Q3. After `int x = 1; int& r = x; r = 7;`, what is `x`?
- a) 1
- b) 7
- c) Undefined
- d) Compile error

**Answer:** b — `r` aliases `x`, so assigning to `r` changes `x`.

### Q4. Why pass a `std::string` as `const std::string&`?
- a) To allow modifying it
- b) To avoid copying while preventing modification
- c) To make it faster to copy
- d) To require a null check

**Answer:** b

### Q5. What happens if a function returns a reference to a local variable?
- a) A copy is made automatically
- b) A compile error always occurs
- c) A dangling reference — undefined behaviour
- d) The reference becomes `nullptr`

**Answer:** c — the local is destroyed when the function returns.

## Key Takeaways

- A reference is an **alias**: no null, no rebinding, no dereference operator.
- Use `T&` to modify the caller's object; `const T&` for efficient read-only access.
- References shine as function parameters and return values from accessors.
- Never return a reference to a local variable.

## Next Topic

[6.4 Dynamic Memory Allocation](lesson-6.4-dynamic-memory-allocation.md)
