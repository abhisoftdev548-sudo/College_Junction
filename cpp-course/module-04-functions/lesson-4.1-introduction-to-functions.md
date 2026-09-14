---
module: 4
topic: "4.1"
title: "Introduction to Functions"
slug: "introduction-to-functions"
difficulty: "Beginner"
prerequisites:
  - Loops
  - Pattern Programming
estimated_minutes: 25
tags:
  - cpp
  - functions
  - fundamentals
---

# 4.1 Introduction to Functions

## Overview

A **function** is a named block of code that performs one task — call it, and it runs, optionally returning a result. Functions let you write code **once** and reuse it everywhere, and they break big problems into small, testable pieces. Every C++ program already uses one: `main()`. Now you'll write your own.

## Learning Objectives

After this lesson you will be able to:

- Declare and define a function
- Call a function and use its return value
- Write function prototypes (declarations)
- Explain the benefits of functions (reuse, abstraction, testing)
- Structure a program into functions

## Core Concepts

### Defining and calling a function

```cpp
#include <iostream>

int add(int a, int b) {        // definition: name, params, return type
    return a + b;              // send the result back
}

int main() {
    int result = add(3, 4);    // call — arguments 3 and 4
    std::cout << result;       // 7
    return 0;
}
```

A function has a **return type** (`int`), a **name** (`add`), **parameters** (`a, b`), and a **body** (`{ ... }`).

### void functions — no return value

```cpp
void greet(std::string name) {
    std::cout << "Hello, " << name << "!\n";
    // no return needed
}
```

`void` means "returns nothing" — the function runs for its side effects (printing, etc.).

### Function declaration (prototype)

```cpp
// Declaration (prototype) — tells the compiler the function exists:
int multiply(int a, int b);

int main() {
    std::cout << multiply(3, 4);   // 12 — can call before definition
    return 0;
}

// Definition — the actual body:
int multiply(int a, int b) {
    return a * b;
}
```

A **prototype** declares the signature so you can call a function before (or without seeing) its body — the definition can live later or in another file.

### Return exits immediately

```cpp
int abs_value(int x) {
    if (x < 0) return -x;   // early return
    return x;
}
```

`return` ends the function instantly — control goes back to the caller.

### Why functions?

```cpp
// WITHOUT functions — repeated code:
double a = 3.14 * 2 * 2;
double b = 3.14 * 5 * 5;

// WITH functions — write once, reuse:
double area(double r) { return 3.14159 * r * r; }
double a = area(2);
double b = area(5);
```

Functions give **reuse** (no copy-paste), **abstraction** (name hides details), and **testability** (test each piece alone).

### Functions as building blocks

```cpp
double circle_area(double r) { return 3.14159 * r * r; }

void print_circle_area(double r) {
    std::cout << "Area: " << circle_area(r) << "\n";   // calls another function
}
```

Functions call functions — a program is a tree of small, named pieces.

## Visual — Function Anatomy

```
 int add(int a, int b)
  │    │      │    │
  │    │      └────┴── parameters (inputs)
  │    └── name
  └── return type
 {
     return a + b;   ← output
 }

 call: add(3, 4)  → arguments flow in, result flows out
```

A function maps inputs (arguments) to an output (return value).

## Code Examples

### Example 1 — A reusable greeting

```cpp
#include <iostream>
#include <string>

void greet(std::string name) {
    std::cout << "Hello, " << name << "!\n";
}

int main() {
    greet("Ankit");
    greet("Riya");
    return 0;
}
```

### Example 2 — Function with prototype

```cpp
#include <iostream>

bool isEven(int n);          // prototype

int main() {
    std::cout << isEven(4) << "\n";   // 1 (true)
    return 0;
}

bool isEven(int n) {
    return n % 2 == 0;
}
```

### Example 3 — Compose functions

```cpp
#include <iostream>

double square(double x) { return x * x; }
double sumOfSquares(double a, double b) { return square(a) + square(b); }

int main() {
    std::cout << sumOfSquares(3, 4) << "\n";   // 25
    return 0;
}
```

## Common Mistakes

1. **Missing a return in a non-void function** — undefined behaviour.
2. **Mismatched types** — returning a `double` from an `int` function truncates.
3. **Forgetting the prototype** — calling before declaration fails to compile.
4. **Calling with the wrong number/type of arguments** — compile error.
5. **Using a parameter name that shadows a global** — confusing; rename.
6. **`void main()`** — `main` must return `int`.

## Best Practices

- One function = one responsibility; name it with a verb (`calculateArea`, `print`).
- Use prototypes in headers; keep definitions in `.cpp` files.
- Return results rather than printing inside utility functions (testability).
- Keep functions short — if it doesn't fit on a screen, split it.
- Prefer `const` reference parameters for large inputs (Module 4.2).

## Practice Questions

1. Write a function `square(int)` and call it from `main`.
2. Write a `void` function that prints a greeting with a name parameter.
3. Use a prototype to call a function defined after `main`.
4. Write a function that returns the maximum of two numbers.
5. Refactor a repeated calculation into a reusable function.

## Multiple Choice Questions (MCQs)

### Q1. A function's return type comes:
- a) After the name
- b) Before the name
- c) Inside the body
- d) Nowhere

**Answer:** b — `int add(...)` — return type precedes the name.

### Q2. A function declared `void`:
- a) Returns 0
- b) Returns nothing
- c) Returns `void*`
- d) Cannot be called

**Answer:** b — `void` means no return value.

### Q3. A function prototype:
- a) Contains the full body
- b) Declares the signature only
- c) Runs the function
- d) Is optional in all cases

**Answer:** b — it declares name/params/return so calls compile.

### Q4. `return` inside a function:
- a) Skips to the next function
- b) Exits the function immediately
- c) Loops the function
- d) Prints the value

**Answer:** b — `return` sends the value back and ends the call.

### Q5. The main benefit of functions is:
- a) Slower code
- b) Reuse and abstraction
- c) More global variables
- d) Longer programs

**Answer:** b — write once, reuse, and hide complexity behind a name.

## Key Takeaways

- Function = return type + name + parameters + body; `return` sends a value back.
- `void` = no return; prototypes declare before use.
- Functions enable reuse, abstraction, and testability.
- Keep functions small and single-purpose.

## Next Topic

[4.2 Function Parameters and Return Values](lesson-4.2-function-parameters-and-return-values.md)
