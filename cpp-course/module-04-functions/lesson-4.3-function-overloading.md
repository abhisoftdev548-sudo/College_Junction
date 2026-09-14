---
module: 4
topic: "4.3"
title: "Function Overloading"
slug: "function-overloading"
difficulty: "Beginner"
prerequisites:
  - Function Parameters and Return Values
estimated_minutes: 25
tags:
  - cpp
  - functions
  - overloading
---

# 4.3 Function Overloading

## Overview

**Function overloading** lets you define multiple functions with the **same name** but different parameter lists. The compiler picks the right one based on the arguments you pass. It's how you get one intuitive name (`print`, `add`, `max`) that works for many types — a hallmark of clean C++ APIs.

## Learning Objectives

After this lesson you will be able to:

- Overload functions by parameter count and type
- Explain why return type alone isn't enough to overload
- Predict which overload the compiler chooses
- Use overloading for intuitive APIs
- Avoid ambiguous overloads

## Core Concepts

### Overloading by parameter types

```cpp
int max(int a, int b) { return a > b ? a : b; }
double max(double a, double b) { return a > b ? a : b; }

max(3, 5);        // calls the int version
max(3.5, 2.5);    // calls the double version
```

Same name, different parameter types — the compiler matches the call to the signature.

### Overloading by number of parameters

```cpp
int add(int a, int b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

add(1, 2);        // 2-arg version
add(1, 2, 3);     // 3-arg version
```

### The rule — the parameter list must differ

```cpp
// NOT overloadable — same parameter list, different return type:
int    foo(int x);
// double foo(int x);   // ERROR — return type alone isn't enough
```

Overloads must differ in **type, count, or order** of parameters. Return type alone cannot distinguish overloads (the compiler wouldn't know which you meant).

### How the compiler chooses

```cpp
void f(int x)      { std::cout << "int\n"; }
void f(double x)   { std::cout << "double\n"; }

f(1);      // "int"    — exact match
f(1.5);    // "double" — exact match
f('A');    // "int"    — char promotes to int
```

The compiler picks the **best match** using conversion rules: exact match → promotion → conversion. If two candidates tie, the call is **ambiguous**.

### Ambiguous calls

```cpp
void g(int x)    { }
void g(long x)   { }

// g(3.14);   // ERROR — ambiguous: double → int or double → long both valid
```

When multiple overloads are equally good, the compiler refuses — resolve it with an explicit cast.

### Overloading with defaults — a trap

```cpp
void h(int a)        { }
void h(int a, int b = 0) { }

// h(5);   // ERROR — ambiguous: matches both
```

Overloads combined with default arguments can collide. Avoid defaults where they create ambiguity.

### Why overload? Intuitive APIs

```cpp
void print(int x)      { std::cout << "int: " << x << "\n"; }
void print(double x)   { std::cout << "double: " << x << "\n"; }
void print(std::string s) { std::cout << "string: " << s << "\n"; }

print(42);
print(3.14);
print("hello");
```

One name, many types — callers don't need to remember `printInt`, `printDouble`, `printString`.

## Visual — Overload Resolution

```
 call: max(3.5, 2.5)
        │
        ▼
 candidates:  max(int, int)      ← needs double→int conversion
              max(double, double) ← EXACT match ✓
        │
        ▼
 picks max(double, double)
```

The compiler ranks candidates and picks the best (exact match wins).

## Code Examples

### Example 1 — Overloaded max

```cpp
#include <iostream>

int max(int a, int b) { return a > b ? a : b; }
double max(double a, double b) { return a > b ? a : b; }

int main() {
    std::cout << max(3, 5) << "\n";       // 5 (int)
    std::cout << max(3.5, 2.5) << "\n";   // 3.5 (double)
    return 0;
}
```

### Example 2 — Overloaded print

```cpp
#include <iostream>
#include <string>

void print(int v)    { std::cout << "int: " << v << "\n"; }
void print(double v) { std::cout << "double: " << v << "\n"; }
void print(std::string v) { std::cout << "string: " << v << "\n"; }

int main() {
    print(42);
    print(3.14);
    print("hello");
    return 0;
}
```

### Example 3 — Overloaded area

```cpp
#include <iostream>

double area(double radius) { return 3.14159 * radius * radius; }   // circle
double area(double w, double h) { return w * h; }                  // rectangle

int main() {
    std::cout << area(2.0) << "\n";       // circle (12.57)
    std::cout << area(3.0, 4.0) << "\n";  // rectangle (12)
    return 0;
}
```

## Common Mistakes

1. **Trying to overload on return type alone** — not allowed.
2. **Creating ambiguous overloads** — two equally-good candidates.
3. **Overloads + default arguments colliding** — call becomes ambiguous.
4. **Assuming promotion picks the "expected" overload** — `'A'` promotes to `int`, not `char`.
5. **Changing behaviour drastically between overloads** — same name should mean the same intent.
6. **Overloading with subtly different types** (`int` vs `long` vs `unsigned`) — invites ambiguity.

## Best Practices

- Overload when the same operation applies to multiple types (max, print, add).
- Keep behaviour consistent across overloads.
- Avoid overloading that creates ambiguity with implicit conversions.
- Prefer templates (Module 8) when the implementation is identical for every type.
- Watch default-argument interactions with overloads.

## Practice Questions

1. Overload `max` for `int` and `double` and call both.
2. Overload `add` for 2 and 3 arguments.
3. Explain why two functions differing only in return type can't be overloaded.
4. Write an overloaded `print` for `int`, `double`, and `std::string`.
5. Give an example of an ambiguous overload and how to fix it.

## Multiple Choice Questions (MCQs)

### Q1. Overloading means:
- a) Same name, different parameter lists
- b) Same name, same parameters, different return
- c) Different names, same parameters
- d) One function per program

**Answer:** a — overloads differ in parameters.

### Q2. Two functions can't be overloaded based only on:
- a) Parameter count
- b) Parameter types
- c) Return type
- d) Parameter order

**Answer:** c — return type alone is insufficient.

### Q3. For `f(3.14)` with `f(int)` and `f(double)`, the compiler picks:
- a) `f(int)`
- b) `f(double)` (exact match)
- c) Neither (ambiguous)
- d) Both

**Answer:** b — `double` is an exact match.

### Q4. An ambiguous call happens when:
- a) One candidate is best
- b) Two candidates are equally good
- c) No candidates exist
- d) A default is used

**Answer:** b — ties make the call ambiguous.

### Q5. Overloading helps by:
- a) Slowing the program
- b) Providing one intuitive name for many types
- c) Requiring more names
- d) Removing the compiler

**Answer:** b — a single clean name per concept.

## Key Takeaways

- Overload = same name, different parameter list (type/count/order).
- Return type alone can't overload; compiler picks the best match.
- Ambiguity = compile error; defaults can collide with overloads.
- Use overloading for intuitive, consistent APIs.

## Next Topic

[4.4 Scope and Lifetime](lesson-4.4-scope-and-lifetime.md)
