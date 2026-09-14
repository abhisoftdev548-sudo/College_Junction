---
module: 2
topic: "2.1"
title: "Variables and Constants"
slug: "variables-and-constants"
difficulty: "Beginner"
prerequisites:
  - C++ Program Structure
estimated_minutes: 25
tags:
  - cpp
  - fundamentals
  - variables
  - constants
---

# 2.1 Variables and Constants

## Overview

A **variable** is a named box in memory that stores a value you can change. A **constant** is the same idea, except its value is fixed at compile time (or at initialization) and cannot be changed afterwards. Together they are how every C++ program keeps track of state.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize variables
- Use C++'s modern initialization forms (`{}` and `=`)
- Declare constants with `const` and `constexpr`
- Choose meaningful names and follow naming conventions
- Explain variable scope at a basic level

## Core Concepts

### Declaration and initialization

```cpp
int age;            // declaration — value is uninitialized (garbage!)
int age = 21;       // copy initialization
int marks{85};      // brace (list) initialization — preferred in modern C++
double price = 9.99;
char grade = 'A';
```

Declaring without initializing leaves a **garbage value** for built-in types — always initialize when you declare.

### Braced initialization

```cpp
int a{10};          // fine
int b = 10;         // also fine
// int c{3.14};     // ERROR — narrowing conversion is not allowed with braces
int d(10);          // direct initialization (older style)
```

Braces `{}` protect you from **narrowing** (losing data silently), which is why modern C++ prefers them.

### Assignment vs initialization

```cpp
int x = 5;    // initialization — happens at creation
x = 10;       // assignment — changes an existing variable
```

### Constants — const

```cpp
const double PI = 3.14159;   // value fixed at initialization
// PI = 3.14;                // ERROR — cannot change a const

const int DAYS_IN_WEEK = 7;
```

`const` makes a variable read-only. It must be initialized when declared.

### Constants — constexpr

```cpp
constexpr int MAX_USERS = 1000;    // must be known at COMPILE time
constexpr double square(double x) { return x * x; }
```

`constexpr` guarantees the value is a **compile-time constant** — required for array sizes and template arguments.

### Naming rules and conventions

```cpp
int student_count;      // snake_case is the C++ community convention
int StudentCount;       // PascalCase — uncommon for variables
int 2fast;              // ERROR — can't start with a digit
int my-var;             // ERROR — hyphens are not allowed
```

Rules: start with a letter or underscore, then letters/digits/underscores; keywords are reserved. Convention: `snake_case` for variables and functions.

### Variable scope (basic)

```cpp
#include <iostream>
int global = 100;        // global — visible everywhere

int main() {
    int local = 5;       // local — visible only inside main
    {
        int inner = 10;  // visible only inside this block
    }
    // inner is gone here
}
```

A variable is visible from its declaration to the end of its enclosing block `{ }`.

## Visual — A Variable as a Box

```
 int age = 21;
  ┌─────────────┐
  │  name: age  │ ── label you use in code
  │  type: int  │ ── what kind of data
  │  value: 21  │ ── current contents (changeable)
  └─────────────┘

 const double PI = 3.14159;   ← the box is locked (read-only)
```

A variable = a labelled, typed memory box; a constant = the same box, locked.

## Code Examples

### Example 1 — Declaring and printing variables

```cpp
#include <iostream>

int main() {
    int age{21};
    double height{5.9};
    char grade{'A'};

    std::cout << "Age: " << age << "\n";
    std::cout << "Height: " << height << "\n";
    std::cout << "Grade: " << grade << "\n";
    return 0;
}
```

### Example 2 — Constants

```cpp
#include <iostream>

int main() {
    const double PI = 3.14159;
    constexpr int SIDES = 4;

    double radius = 5.0;
    double area = PI * radius * radius;
    std::cout << "Area: " << area << "\n";
    std::cout << "Sides: " << SIDES << "\n";
    return 0;
}
```

### Example 3 — Braced initialization catches narrowing

```cpp
#include <iostream>

int main() {
    int whole{42};          // fine
    // int bad{3.99};       // would NOT compile — narrowing
    int ok = 3.99;          // compiles, but silently truncates to 3
    std::cout << "whole = " << whole << ", ok = " << ok << "\n";
    return 0;
}
```

## Common Mistakes

1. **Using an uninitialized variable** — reading it gives garbage (undefined behaviour).
2. **Forgetting to initialize a `const`** — a `const` must be set when declared.
3. **Trying to assign to a `const`** — the compiler rejects it.
4. **Mixing up `const` and `constexpr`** — `constexpr` requires a compile-time value.
5. **Starting names with digits or using hyphens** — not allowed.
6. **Using `=` where you want `==`** — assignment vs comparison (see Operators).

## Best Practices

- Initialize every variable when you declare it.
- Prefer `{}` initialization to catch narrowing.
- Use `const` for values that shouldn't change; `constexpr` for compile-time constants.
- Use descriptive `snake_case` names.
- Keep variables in the smallest possible scope.

## Practice Questions

1. Declare and initialize variables of type `int`, `double`, and `char`.
2. Write a `const double` for PI and compute a circle's area.
3. Explain the difference between `const` and `constexpr`.
4. Show how braced initialization prevents a narrowing conversion.
5. List three invalid C++ variable names and explain why they are invalid.

## Multiple Choice Questions (MCQs)

### Q1. Which declares a read-only variable?
- a) `int x`
- b) `const int x = 5`
- c) `var x = 5`
- d) `static x`

**Answer:** b — `const` makes the variable read-only after initialization.

### Q2. Reading an uninitialized `int` gives:
- a) Always 0
- b) A garbage/undefined value
- c) A compile error
- d) `nullptr`

**Answer:** b — built-in types are not auto-initialized.

### Q3. `constexpr` means the value is known at:
- a) Runtime only
- b) Compile time
- c) Link time
- d) Never

**Answer:** b — `constexpr` guarantees a compile-time constant.

### Q4. Which initialization is preferred in modern C++?
- a) `int x(5)`
- b) `int x{5}`
- c) `int x = new int`
- d) `int x[5]`

**Answer:** b — braced initialization is preferred and prevents narrowing.

### Q5. Which is a valid C++ variable name?
- a) `2fast`
- b) `my-var`
- c) `student_count`
- d) `class`

**Answer:** c — snake_case with letters/digits/underscores; `class` is reserved.

## Key Takeaways

- Variables = named, typed memory boxes; constants lock the value.
- Initialize at declaration; prefer `{}` to catch narrowing.
- `const` = read-only; `constexpr` = compile-time constant.
- Use `snake_case`, meaningful names, and small scopes.

## Next Topic

[2.2 Data Types](lesson-2.2-data-types.md)
