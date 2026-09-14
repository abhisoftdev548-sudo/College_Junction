---
module: 4
topic: "4.4"
title: "Scope and Lifetime"
slug: "scope-and-lifetime"
difficulty: "Beginner"
prerequisites:
  - Function Parameters and Return Values
estimated_minutes: 25
tags:
  - cpp
  - functions
  - scope
  - lifetime
---

# 4.4 Scope and Lifetime

## Overview

**Scope** answers "where can this name be used?"; **lifetime** answers "how long does this variable exist?". C++ has **local** (inside a block), **global** (whole program), and **static** (persists across calls) variables. Understanding scope prevents name clashes and the classic "use-after-scope" bug.

## Learning Objectives

After this lesson you will be able to:

- Distinguish local, global, and static variables
- Explain block scope and shadowing
- Use `static` local variables to persist state
- Explain why globals are discouraged
- Avoid returning references to locals (lifetime!)

## Core Concepts

### Block scope — local variables

```cpp
void f() {
    int x = 5;      // local to f
    {
        int y = 10; // local to this inner block
        std::cout << x + y;   // 15 — x is visible here too
    }
    // y is gone here — out of scope
}
// x is gone here too
```

A variable is visible from its declaration to the end of its enclosing block `{ }`. Inner blocks see outer variables; outer blocks can't see inner ones.

### Global scope

```cpp
#include <iostream>
int counter = 0;     // global — visible everywhere

void increment() { counter++; }

int main() {
    increment();
    std::cout << counter;   // 1
}
```

Globals live for the whole program and are visible everywhere — but they make code harder to reason about (any function can change them).

### Shadowing

```cpp
int x = 10;          // outer x

int main() {
    int x = 20;      // inner x SHADOWS the outer one
    std::cout << x;  // 20 — the nearest x wins
}
```

Declaring a variable with the same name in an inner scope **shadows** (hides) the outer one. Avoid it when possible — it's confusing.

### static local variables — persist across calls

```cpp
int countCalls() {
    static int calls = 0;   // initialized ONCE, then persists
    return ++calls;
}

countCalls();   // 1
countCalls();   // 2
countCalls();   // 3
```

A `static` local is initialized once and **keeps its value between calls** (its lifetime is the whole program, but its scope stays local).

### Lifetime vs scope

```cpp
int* bad() {
    int x = 42;
    return &x;      // DANGER — x dies when bad() returns
}
```

A local variable's lifetime ends when its block exits. Returning a pointer/reference to it creates a **dangling reference** — undefined behaviour. (This is why we learn pointers carefully in Module 6.)

### Function parameters

```cpp
void f(int x) {     // x is local to f (a copy of the argument)
    // x's lifetime ends when f returns
}
```

Parameters are local variables — they live for the duration of the call.

## Visual — Scope and Lifetime

```
 global counter ─────────────────────────────▶ (whole program)
 main:
    int a ────────────▶ (until main ends)
    {  int b ────────▶ (until this block ends)  }
 f():
    static int s ─────────────────────────▶ (whole program, but only visible in f)
    int x ──────────▶ (until f returns)
```

Scope = visibility region; lifetime = existence duration. `static` breaks the usual link (long life, local scope).

## Code Examples

### Example 1 — Block scope

```cpp
#include <iostream>

int main() {
    int a = 1;
    {
        int b = 2;
        std::cout << a + b << "\n";   // 3 — both visible
    }
    // std::cout << b;   // ERROR — b is out of scope
    return 0;
}
```

### Example 2 — static counter

```cpp
#include <iostream>

int nextId() {
    static int id = 0;   // initialized once
    return ++id;
}

int main() {
    std::cout << nextId() << "\n";   // 1
    std::cout << nextId() << "\n";   // 2
    std::cout << nextId() << "\n";   // 3
    return 0;
}
```

### Example 3 — Shadowing

```cpp
#include <iostream>

int value = 100;   // global

int main() {
    int value = 50;   // local shadows global
    std::cout << value << "\n";   // 50
    {
        int value = 10;
        std::cout << value << "\n";   // 10 (innermost)
    }
    std::cout << value << "\n";   // 50 again
    return 0;
}
```

## Common Mistakes

1. **Using a variable outside its block** — compile error (out of scope).
2. **Returning a reference/pointer to a local** — dangling, undefined behaviour.
3. **Shadowing accidentally** — same name in inner scope hides the outer variable.
4. **Overusing globals** — any function can change them; bugs are hard to trace.
5. **Expecting a non-static local to persist** — it's recreated on every call.
6. **Confusing scope (visibility) with lifetime (existence)** — `static` locals separate them.

## Best Practices

- Keep variables in the smallest scope that works.
- Avoid shadowing; use distinct names.
- Prefer locals over globals; pass data explicitly through parameters.
- Use `static` locals only for genuine "remember across calls" needs.
- Never return references/pointers to local variables.

## Practice Questions

1. Show a variable that's visible in an inner block but not outside it.
2. Write a function with a `static` counter and call it three times.
3. Demonstrate shadowing with a global and a local of the same name.
4. Explain the difference between scope and lifetime.
5. Explain why returning a pointer to a local variable is a bug.

## Multiple Choice Questions (MCQs)

### Q1. A local variable's scope is:
- a) The whole program
- b) Its enclosing block
- c) All functions
- d) All files

**Answer:** b — from declaration to the end of its block.

### Q2. A `static` local variable:
- a) Is recreated each call
- b) Persists across calls (initialized once)
- c) Is global
- d) Is always zero

**Answer:** b — it keeps its value between calls.

### Q3. Declaring an inner variable with the same name as an outer one:
- a) Is an error
- b) Shadows the outer variable
- c) Deletes the outer variable
- d) Merges them

**Answer:** b — the inner declaration hides the outer one.

### Q4. A global variable is visible:
- a) Only in main
- b) Throughout the program (after declaration)
- c) Only in one block
- d) Nowhere

**Answer:** b — global scope, program lifetime.

### Q5. Returning a pointer to a local variable yields:
- a) A safe copy
- b) A dangling pointer (undefined behaviour)
- c) A compile error always
- d) Null

**Answer:** b — the local dies at return, leaving a dangling pointer.

## Key Takeaways

- Scope = where a name is visible; lifetime = how long it exists.
- Locals die at block end; `static` locals persist; globals live everywhere.
- Shadowing hides outer names; dangling references come from returning locals.
- Prefer small scopes, locals over globals, and never return locals by reference.

## Next Topic

[4.5 Introduction to Recursion](lesson-4.5-introduction-to-recursion.md)
