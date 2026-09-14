---
module: 16
topic: "16.2"
title: "Clean Code and Code Style"
slug: "clean-code-and-code-style"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Classes and Objects
  - Namespaces
estimated_minutes: 25
tags:
  - clean-code
  - style
  - best-practices
---

# 16.2 Clean Code and Code Style

## Overview

Code is read far more often than it is written. **Clean code** — good names, small functions, clear structure — makes programs easier to understand, debug, and extend. This lesson collects the style rules and refactoring habits that separate maintainable C++ from "it works but nobody can touch it."

## Learning Objectives

After this lesson you will be able to:

- Choose meaningful, consistent names
- Write small, single-responsibility functions
- Apply common C++ formatting and style conventions
- Refactor messy code into clean code
- Use `const`, references, and scope to make intent explicit

## Core Concepts

### Naming

```cpp
// Bad
int d;                 // days? distance? duration?
void f1(vector<int>& v) { /* ??? */ }

// Good
int daysSinceStart;
void removeEvenNumbers(std::vector<int>& numbers) { /* ... */ }
```

Rules: variables = nouns (`totalCost`), functions = verbs (`computeTotal`), booleans = questions (`isReady`, `hasNext`), classes = PascalCase (`Student`), everything else camelCase.

### Small, single-purpose functions

```cpp
// Bad — one function does everything
void process() {
    // read input, validate, compute, format, print...
}

// Good — decompose
std::vector<int> readNumbers();
std::vector<int> validate(const std::vector<int>& numbers);
int compute(const std::vector<int>& numbers);
void report(int result);
```

Each function should do **one thing** and do it well. If a function needs a "and" in its description, split it.

### Use const and references

```cpp
// read-only access, no copy
void print(const std::vector<int>& v);      // const& — efficient and safe

// a member function that doesn't modify the object
double area() const;
```

`const` documents and enforces "this won't change" — compilers catch violations.

### Formatting conventions

```cpp
// 4-space indent (or 2 — be consistent), braces on their own line or K&R — pick one
if (condition) {
    doSomething();
}

// one statement per line; keep lines under ~100 chars
// spaces around operators: a + b, not a+b
// blank lines between logical blocks
```

Pick a style (Google, LLVM, or your team's) and apply it **consistently**. Use `clang-format` to automate it.

### Avoid magic numbers

```cpp
// Bad
if (score > 75) { /* ??? */ }

// Good
constexpr int PASSING_SCORE = 75;
if (score > PASSING_SCORE) { /* pass */ }
```

Named constants explain *why* the number exists.

### Refactor: extract, rename, simplify

```cpp
// Before
if (a[i] > 0 && a[i] % 2 == 0 && a[i] < 100) { ... }

// After
bool isSmallPositiveEven(int x) { return x > 0 && x % 2 == 0 && x < 100; }
if (isSmallPositiveEven(a[i])) { ... }
```

A named helper turns a cryptic condition into self-documenting code.

## Visual — The Readability Test

```
 Bad:                              Good:
 double f(double a,double b){       double average(double x, double y) {
   double r=(a+b)/2;                    double result = (x + y) / 2.0;
   return r;                            return result;
 }                                   }
```

If you can read a function aloud and immediately know what it does, it's clean. Good names and spacing do most of the work.

## Code Examples

### Example 1 — Before and after refactoring

```cpp
// Before — hard to read
int g(std::vector<int>& v) {
    int s = 0;
    for (int i = 0; i < v.size(); i++) {
        if (v[i] > 0) s += v[i];
    }
    return s;
}

// After — self-documenting
int sumOfPositives(const std::vector<int>& values) {
    int total = 0;
    for (int value : values) {
        if (value > 0) total += value;
    }
    return total;
}
```

### Example 2 — const-correct accessor

```cpp
class BankAccount {
    double balance = 0;
public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    double getBalance() const { return balance; }   // read-only, const
};
```

### Example 3 — Named constants instead of magic numbers

```cpp
constexpr int MAX_RETRIES = 3;
constexpr double TAX_RATE = 0.18;

double withTax(double price) {
    return price * (1.0 + TAX_RATE);
}
```

## Common Mistakes

1. **Vague names** — `data`, `tmp`, `x1`, `foo` tell the reader nothing.
2. **God functions** — 200-line functions that mix reading, computing, and printing.
3. **Magic numbers** — unexplained literals scattered through the logic.
4. **Inconsistent style** — mixing brace styles and indentation.
5. **Over-commenting the obvious** — `// increment i` on `++i`; comment the *why*, not the *what*.
6. **Ignoring `const`** — mutating things that should be read-only invites bugs.

## Best Practices

- Name things for what they mean, not how they're stored.
- Keep functions short (roughly a screenful or less) and single-purpose.
- Mark read-only parameters `const&` and read-only methods `const`.
- Replace magic numbers with named constants.
- Use `clang-format` and a linter; let tools enforce style.
- Refactor mercilessly: extract, rename, simplify — then re-run tests.

## Practice Questions

1. Refactor a messy function (provided in your head or notes) into small, named functions.
2. Rename vague variables in a snippet to meaningful names.
3. Add `const` and `const&` where appropriate in a given function.
4. Replace magic numbers with named constants in a small program.
5. Apply a consistent style (indentation, braces, spacing) to an unstyled snippet.

## Multiple Choice Questions (MCQs)

### Q1. A function name should typically be:
- a) A noun
- b) A verb (an action)
- c) A single letter
- d) A number

**Answer:** b

### Q2. Passing a read-only `std::vector` is best done with:
- a) by value
- b) `const std::vector<int>&`
- c) a raw pointer
- d) a copy

**Answer:** b

### Q3. A "magic number" is:
- a) A large number
- b) An unexplained literal constant in code
- c) A prime number
- d) A floating-point value

**Answer:** b

### Q4. A member function that doesn't modify the object should be marked:
- a) `static`
- b) `const`
- c) `mutable`
- d) `virtual`

**Answer:** b

### Q5. The main purpose of clean code is:
- a) Fewer lines at any cost
- b) Readability and maintainability
- c) Faster execution
- d) Smaller binaries

**Answer:** b

## Key Takeaways

- Meaningful names, small functions, and `const` make intent explicit.
- Replace magic numbers with named constants.
- Consistency (enforced by `clang-format`) beats any particular style.
- Refactor by extracting and renaming; keep tests to guard the changes.

## Next Topic

[16.3 Building a Complete Mini Project](lesson-16.3-building-a-complete-mini-project.md)
