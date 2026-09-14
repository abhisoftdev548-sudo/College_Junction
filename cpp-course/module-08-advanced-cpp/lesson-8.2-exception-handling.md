---
module: 8
topic: "8.2"
title: "Exception Handling"
slug: "exception-handling"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Classes and Objects
estimated_minutes: 30
tags:
  - exceptions
  - error-handling
  - try-catch
---

# 8.2 Exception Handling

## Overview

Exceptions let you separate **normal logic** from **error handling**. When something goes wrong (division by zero, a bad index, a failed file open), you `throw` an exception; somewhere up the call stack, a `try`/`catch` block handles it. This keeps error handling out of the happy path and lets errors propagate cleanly.

## Learning Objectives

After this lesson you will be able to:

- Throw and catch exceptions with `throw` / `try` / `catch`
- Use standard exceptions like `std::runtime_error`
- Catch exceptions by type and by `const&`
- Explain stack unwinding and RAII during exceptions
- Write a custom exception class

## Core Concepts

### try / throw / catch

```cpp
#include <iostream>
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0) {
        throw std::runtime_error("division by zero");
    }
    return a / b;
}

int main() {
    try {
        std::cout << divide(10, 0);
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << "\n";  // "division by zero"
    }
}
```

- `throw` signals an error and immediately exits the current function.
- `try` wraps code that might throw.
- `catch` matches the exception by type and handles it.

### Multiple catch blocks

```cpp
try {
    risky();
} catch (const std::out_of_range& e) {   // most specific first
    std::cout << "out of range: " << e.what();
} catch (const std::runtime_error& e) {
    std::cout << "runtime: " << e.what();
} catch (...) {                            // catch-all — last resort
    std::cout << "unknown error";
}
```

Order matters: catch **specific types before** more general ones (a base class catches derived exceptions too).

### Stack unwinding

```cpp
void f() { throw std::runtime_error("boom"); }

void g() {
    f();            // f throws → g exits immediately, no cleanup code needed
}

int main() {
    try { g(); }
    catch (const std::exception& e) { std::cout << e.what(); }
}
```

When an exception is thrown, the call stack **unwinds** — each function exits in turn, destroying its local objects — until a matching `catch` is found. Destructors run during unwinding, so RAII resources are released correctly.

### Custom exceptions

```cpp
class InsufficientFunds : public std::runtime_error {
public:
    InsufficientFunds() : std::runtime_error("insufficient funds") {}
};

// throw InsufficientFunds();
```

Deriving from `std::runtime_error` (or `std::logic_error`) gives your exception a type and a `what()` message for free.

### noexcept

```cpp
void safe() noexcept { /* promises not to throw */ }
```

`noexcept` tells callers (and the compiler) that a function won't throw. Throwing from a `noexcept` function calls `std::terminate`.

## Visual — Exception Propagation

```
  main
   │ try
   ▼
   g()
   │
   ▼
   f()  ─── throw std::runtime_error("boom")
   │
   └────────▶ unwind: f exits, g exits ──▶ main's catch(e)
                                          └── e.what() = "boom"
```

The error jumps from the throw site up the stack to the nearest matching handler, running destructors along the way.

## Code Examples

### Example 1 — Safe division with try/catch

```cpp
#include <iostream>
#include <stdexcept>

int main() {
    int a = 10, b = 0;
    try {
        if (b == 0) throw std::runtime_error("cannot divide by zero");
        std::cout << a / b;
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << "\n";
    }
    return 0;
}
```

### Example 2 — Standard library exception (out_of_range)

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    try {
        std::cout << v.at(10);   // at() throws std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Index error: " << e.what() << "\n";
    }
    return 0;
}
```

### Example 3 — RAII during unwinding

```cpp
#include <iostream>
#include <stdexcept>
#include <memory>

void risky() {
    auto p = std::make_unique<int>(42);   // owned resource
    throw std::runtime_error("oops");
    // p is never explicitly freed — but its destructor runs during unwinding
}

int main() {
    try { risky(); }
    catch (const std::exception& e) { std::cout << e.what(); }
}
```

## Common Mistakes

1. **Catching by value** — `catch (std::exception e)` slices the exception; catch by `const&`.
2. **Swallowing errors** — an empty `catch (...) {}` hides real bugs.
3. **Throwing from a destructor** — during stack unwinding this can call `std::terminate`.
4. **Using exceptions for normal control flow** — they are for *exceptional* conditions, not loops.
5. **Catching base before derived** — a `catch (std::exception&)` before `catch (std::out_of_range&)` makes the latter unreachable.
6. **Forgetting that `new` throws** — allocation failure throws `std::bad_alloc`, not returning `nullptr`.

## Best Practices

- Throw by value, catch by `const&`.
- Use standard exception types (`std::runtime_error`, `std::logic_error`, `std::out_of_range`) or derive from them.
- Let RAII (containers, smart pointers) clean up — don't write manual `try`/`catch` cleanup.
- Put `try` blocks around the smallest region that can be handled meaningfully.
- Reserve exceptions for genuinely exceptional situations; prefer return codes/`std::optional` for expected failures.

## Practice Questions

1. Write a function `int safeDivide(int a, int b)` that throws `std::runtime_error` on division by zero, and handle it in `main`.
2. Catch a `std::out_of_range` from `std::vector::at` and print the error message.
3. Write a custom exception `EmptyQueue` deriving from `std::logic_error`, and throw it from a queue's `pop()`.
4. Show the order of `catch` blocks (specific to general) and explain why order matters.
5. Demonstrate with a small program that a `unique_ptr` is freed when an exception unwinds the stack.

## Multiple Choice Questions (MCQs)

### Q1. Which keyword raises an exception?
- a) `raise`
- b) `throw`
- c) `error`
- d) `abort`

**Answer:** b

### Q2. The correct way to catch a standard exception is:
- a) `catch (std::exception e)`
- b) `catch (const std::exception& e)`
- c) `catch (std::exception* e)`
- d) `catch (e)`

**Answer:** b — by `const&` to avoid slicing.

### Q3. What happens when an exception is thrown and a matching `catch` is found up the stack?
- a) The program always terminates
- b) The stack unwinds, running destructors, until the handler is reached
- c) The exception is ignored
- d) The program restarts the function

**Answer:** b

### Q4. `catch (...)` means:
- a) Catch `std::exception` only
- b) Catch any exception type
- c) Catch nothing
- d) A syntax error

**Answer:** b — it is the catch-all.

### Q5. What does `noexcept` declare?
- a) The function returns nothing
- b) The function promises not to throw
- c) The function catches all exceptions
- d) The function is const

**Answer:** b

## Key Takeaways

- Use `throw` / `try` / `catch` to separate error handling from normal logic.
- Catch by `const&`, specific types first, and `catch (...)` last.
- Stack unwinding runs destructors, so RAII keeps programs safe during exceptions.
- Derive custom exceptions from `std::runtime_error` / `std::logic_error`.

## Next Topic

[8.3 Operator Overloading](lesson-8.3-operator-overloading.md)
