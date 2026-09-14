---
module: 6
topic: "6.1"
title: "Pointers Basics"
slug: "pointers-basics"
difficulty: "Intermediate"
prerequisites:
  - Data Types
  - Functions
  - Arrays (1D)
estimated_minutes: 30
tags:
  - pointers
  - memory
  - addresses
---

# 6.1 Pointers Basics

## Overview

A **pointer** is a variable that stores the **memory address** of another variable. Pointers are what give C++ its fine-grained control over memory and are the foundation for dynamic allocation, data structures, and efficient function parameters. They are also the single biggest source of bugs for beginners — so read carefully.

## Learning Objectives

After this lesson you will be able to:

- Declare a pointer of the correct type
- Take an address with `&` and dereference with `*`
- Explain the difference between a pointer variable and the value it points to
- Initialize pointers safely with `nullptr`
- Recognize pointer-related syntax in declarations and expressions

## Core Concepts

### Declaration

```cpp
int* p;         // pointer to an int
double* q;      // pointer to a double
std::string* s; // pointer to a std::string
```

The `*` binds to the variable name. Read `int* p` as "`p` is a pointer to `int`."

### Taking an address (`&`)

```cpp
int x = 42;
int* p = &x;   // p now holds the address of x
```

### Dereferencing (`*`)

```cpp
int x = 42;
int* p = &x;

std::cout << p;   // the ADDRESS (something like 0x7ffd...)
std::cout << *p;  // 42 — the VALUE at that address

*p = 100;         // write through the pointer
std::cout << x;   // 100 — x was changed!
```

Dereferencing lets you read or write the variable a pointer refers to.

### The null pointer

```cpp
int* p = nullptr;  // points to nothing (C++11 style)
// int* p = NULL;  // old C style — avoid
// int* p = 0;     // also valid but less clear

if (p != nullptr) {
    std::cout << *p; // safe only when p is not null
}
```

Always initialize a pointer. An uninitialized pointer holds a garbage address, and dereferencing it is **undefined behaviour**.

### Pointer to a struct/class member

```cpp
std::string s = "hi";
std::string* p = &s;
p->length();   // same as (*p).length()
```

The `->` operator dereferences **and** accesses a member in one step.

## Memory Layout (Visual)

```
int x = 42;          int* p = &x;

  address: 0x100       address: 0x200
  ┌──────────┐         ┌──────────┐
  │    42    │  ◄────  │  0x100   │
  └──────────┘         └──────────┘
      x                     p

  p  holds 0x100 (the address of x)
  *p gives 42     (the value stored at 0x100)
```

The pointer itself is stored somewhere in memory; what makes it useful is that its **value** is another location's address.

## Code Examples

### Example 1 — Read and write through a pointer

```cpp
#include <iostream>

int main() {
    int value = 10;
    int* p = &value;

    std::cout << "value = " << value << "\n";
    std::cout << "address = " << p << "\n";
    std::cout << "dereferenced = " << *p << "\n";

    *p = 99;
    std::cout << "after *p = 99, value = " << value << "\n"; // 99
    return 0;
}
```

### Example 2 — Swap two variables via pointers

```cpp
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 7;
    swap(&x, &y);           // pass addresses
    std::cout << x << " " << y; // 7 5
}
```

### Example 3 — Guard against null before use

```cpp
#include <iostream>

void printValue(const int* p) {
    if (p != nullptr) {
        std::cout << *p << "\n";
    } else {
        std::cout << "(null)\n";
    }
}
```

## Common Mistakes

1. **Uninitialized pointers** — `int* p; std::cout << *p;` dereferences a garbage address.
2. **Confusing `p` and `*p`** — `p` is the address, `*p` is the pointed-to value.
3. **Null dereference** — dereferencing `nullptr` crashes the program.
4. **Type mismatch** — assigning a `double*` to an `int*` does not compile without a cast.
5. **Returning a pointer to a local variable** — the local is destroyed, leaving a **dangling pointer**.
6. **`int* p, q;`** — only `p` is a pointer; `q` is a plain `int`. Write `int *p, *q;` or declare on separate lines.

## Best Practices

- Always initialize pointers — use `nullptr` when there is nothing to point to yet.
- Check for `nullptr` before dereferencing when a pointer *might* be null.
- Prefer references (`int&`) over pointers when the object must exist (see 6.3).
- In modern C++, prefer smart pointers over raw owning pointers (see 6.5).
- Read types right-to-left when confused: `const int* p` = "pointer to a const int".

## Practice Questions

1. Declare an `int`, a pointer to it, print both the address and the value, then double the value through the pointer.
2. Write a function `void setZero(int* p)` that sets the pointed-to value to 0, and call it on a variable.
3. Write code that swaps two `std::string` values using pointers.
4. Declare a pointer, initialize it to `nullptr`, and write an `if` that prints `"empty"` when it is null.
5. Point a `const int*` at a variable and try to modify through it — explain the compile error.

## Multiple Choice Questions (MCQs)

### Q1. What does a pointer store?
- a) The value of a variable
- b) The memory address of a variable
- c) The type of a variable
- d) The size of a variable

**Answer:** b

### Q2. If `int x = 5; int* p = &x;`, what prints the value 5?
- a) `std::cout << p;`
- b) `std::cout << *p;`
- c) `std::cout << &x;`
- d) `std::cout << &p;`

**Answer:** b — `*p` dereferences the pointer.

### Q3. What is the safest way to initialize a pointer that currently points to nothing?
- a) `int* p = 0;`
- b) `int* p = nullptr;`
- c) `int* p;`
- d) `int* p = 1;`

**Answer:** b — `nullptr` is the C++11 idiomatic null pointer.

### Q4. What does `p->size()` mean when `p` is a `std::string*`?
- a) Access the `size` member of the pointer
- b) Access the `size()` member of the pointed-to string
- c) Delete the pointer
- d) Take the address of `size()`

**Answer:** b — `p->m` equals `(*p).m`.

### Q5. `int* p, q;` declares:
- a) Two pointers
- b) One pointer and one `int`
- c) Two ints
- d) A syntax error

**Answer:** b — `*` binds to the declarator, so `q` is an `int`.

## Key Takeaways

- A pointer stores an **address**; `&` gets an address, `*` dereferences one.
- `p` is the address, `*p` is the value at that address.
- Always initialize pointers; use `nullptr` and check before dereferencing.
- Dereferencing null, uninitialized, or dangling pointers is undefined behaviour.

## Next Topic

[6.2 Pointer Arithmetic](lesson-6.2-pointer-arithmetic.md)
