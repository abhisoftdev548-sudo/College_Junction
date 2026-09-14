---
module: 2
topic: "2.5"
title: "Type Conversion and Casting"
slug: "type-conversion-and-casting"
difficulty: "Beginner"
prerequisites:
  - Data Types
  - Operators
estimated_minutes: 25
tags:
  - cpp
  - fundamentals
  - casting
  - type-conversion
---

# 2.5 Type Conversion and Casting

## Overview

C++ converts values between types in two ways: **implicit conversion** (automatic, sometimes surprising) and **explicit casting** (you request it). Casting is essential for mixed-type math — like getting a decimal result from integers — but it can silently lose data. This lesson teaches both, plus C++'s modern named casts.

## Learning Objectives

After this lesson you will be able to:

- Explain implicit vs explicit conversion
- Use C-style and `static_cast` casts
- Convert between int, double, and char
- Recognize and avoid data loss (narrowing)
- Choose the right cast for the job

## Core Concepts

### Implicit conversion (automatic)

```cpp
int a = 5;
double b = a;        // int → double: safe, automatic (5 → 5.0)
double c = 3.99;
int d = c;           // double → int: DANGEROUS, truncates to 3
```

The compiler converts automatically when types don't match — **widening** (int → double) is safe, **narrowing** (double → int) can lose data.

### Explicit cast — C-style

```cpp
double c = 3.99;
int d = (int)c;      // 3 — old C-style cast
```

### Explicit cast — static_cast (preferred)

```cpp
double c = 3.99;
int d = static_cast<int>(c);   // 3 — modern, checked at compile time
```

`static_cast<T>(expr)` is the C++-native way to convert related types. It's safer than C-style casts because the compiler checks that the conversion is legal.

### The classic mixed-math fix

```cpp
int a = 10, b = 3;
double ratio = a / b;                  // 3.0 — integer division first!
double ratio2 = static_cast<double>(a) / b;   // 3.333... — cast BEFORE dividing
```

Cast **before** the division, or you divide integers and convert the already-truncated result.

### int ↔ char conversion

```cpp
char c = 'A';
int code = static_cast<int>(c);    // 65 (ASCII value)
char next = static_cast<char>(code + 1);   // 'B'
```

Characters are stored as numbers; casting shows (or changes) their numeric code.

### Rounding vs truncation

```cpp
#include <cmath>
double x = 3.7;
int t = static_cast<int>(x);     // 3 — truncates (drops fraction)
int r = static_cast<int>(std::round(x));   // 4 — rounds to nearest
int f = static_cast<int>(std::floor(x));   // 3
int ce = static_cast<int>(std::ceil(x));   // 4
```

A cast **truncates** (toward zero); use `<cmath>` helpers when you want real rounding.

### Other named casts (preview)

```cpp
// dynamic_cast  — safe downcasting in class hierarchies (Module 7)
// const_cast    — adds/removes const (rare, often a design smell)
// reinterpret_cast — low-level bit reinterpretation (dangerous)
```

Beginners mostly need `static_cast`; the others appear with OOP and low-level code.

## Visual — Widening vs Narrowing

```
 widening (safe, automatic):
   int 5 ──────────────▶ double 5.0      (no data lost)

 narrowing (lossy, needs care):
   double 3.99 ────────▶ int 3           (fraction dropped!)
```

Widening keeps all information; narrowing drops it — cast narrowing explicitly and deliberately.

## Code Examples

### Example 1 — Mixed-type math

```cpp
#include <iostream>

int main() {
    int a = 10, b = 3;
    std::cout << "int division:   " << a / b << "\n";
    std::cout << "double division: " << static_cast<double>(a) / b << "\n";
    return 0;
}
```

### Example 2 — int ↔ char

```cpp
#include <iostream>

int main() {
    char letter = 'A';
    std::cout << "ASCII of A: " << static_cast<int>(letter) << "\n";

    for (int i = 0; i < 5; ++i) {
        std::cout << static_cast<char>('A' + i);   // ABCDE
    }
    std::cout << "\n";
    return 0;
}
```

### Example 3 — Rounding

```cpp
#include <iostream>
#include <cmath>

int main() {
    double x = 3.7;
    std::cout << "truncate: " << static_cast<int>(x) << "\n";
    std::cout << "round:    " << static_cast<int>(std::round(x)) << "\n";
    std::cout << "floor:    " << static_cast<int>(std::floor(x)) << "\n";
    std::cout << "ceil:     " << static_cast<int>(std::ceil(x)) << "\n";
    return 0;
}
```

## Common Mistakes

1. **Casting after division** — `static_cast<double>(a / b)` still divides ints first.
2. **Assuming a cast rounds** — it truncates; use `std::round` for rounding.
3. **Losing data in narrowing conversions** — `double → int` drops the fraction.
4. **Using C-style casts** — `(int)x` is unchecked; prefer `static_cast`.
5. **Comparing after conversion** — `static_cast<int>(3.99) == 4` is false (it's 3).
6. **Converting pointers with `static_cast`** — use the right cast for pointer work.

## Best Practices

- Prefer `static_cast` over C-style casts.
- Cast **before** the operation to control the result type.
- Use `<cmath>` (`round`, `floor`, `ceil`) for intentional rounding.
- Keep narrowing conversions explicit and deliberate.
- Avoid casting when you can just use the correct type from the start.

## Practice Questions

1. Convert an `int` to `double` and back, and note what changes.
2. Compute `10 / 3` as a proper decimal using a cast.
3. Print the ASCII code of a character and the character of a code.
4. Round 3.7 using `std::round` and compare with a plain cast.
5. Explain why `static_cast` is preferred over a C-style cast.

## Multiple Choice Questions (MCQs)

### Q1. `static_cast<int>(3.99)` equals:
- a) 4
- b) 3
- c) 3.99
- d) 0

**Answer:** b — casting truncates (drops the fraction).

### Q2. To get decimal division from `a / b` (both int), do:
- a) `a / b` as-is
- b) `static_cast<double>(a) / b`
- c) `static_cast<int>(a / b)`
- d) `a % b`

**Answer:** b — cast an operand before dividing.

### Q3. int → double is a:
- a) Narrowing conversion
- b) Widening conversion (safe)
- c) Compile error
- d) Pointer cast

**Answer:** b — widening preserves the value.

### Q4. To round 3.7 to 4, use:
- a) `static_cast<int>(3.7)`
- b) `std::round(3.7)`
- c) `std::floor(3.7)`
- d) `3.7 + 0.5` only

**Answer:** b — `std::round` rounds to nearest.

### Q5. `static_cast<char>('A' + 1)` equals:
- a) 'A'
- b) 'B'
- c) 66
- d) '1'

**Answer:** b — adding 1 to the code gives the next character.

## Key Takeaways

- Implicit = automatic (safe when widening); explicit = you request it.
- Prefer `static_cast` over C-style casts.
- Cast before dividing for decimal results; casts truncate, `round` rounds.
- Narrowing conversions lose data — make them explicit and deliberate.

## Module 2 Complete 🎉

You've finished **Module 2 — C++ Fundamentals: Variables, Data Types, Operators**. Next up: **Module 3 — Control Flow**.
