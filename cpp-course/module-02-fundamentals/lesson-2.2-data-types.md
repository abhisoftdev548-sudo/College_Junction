---
module: 2
topic: "2.2"
title: "Data Types"
slug: "data-types"
difficulty: "Beginner"
prerequisites:
  - Variables and Constants
estimated_minutes: 30
tags:
  - cpp
  - fundamentals
  - data-types
---

# 2.2 Data Types

## Overview

C++ is **statically typed**: every variable has a type decided at compile time, and the type determines the value's size, range, and allowed operations. C++ offers **fundamental types** (`int`, `double`, `char`, `bool`), their **modifiers** (`short`, `long`, `unsigned`), and the fixed-size types from `<cstdint>`. Knowing sizes and ranges prevents overflow bugs.

## Learning Objectives

After this lesson you will be able to:

- List the fundamental C++ types and their typical sizes
- Use modifiers (`short`, `long`, `unsigned`, `signed`)
- Use fixed-width types from `<cstdint>`
- Detect and avoid integer overflow
- Choose the right type for a problem

## Core Concepts

### The fundamental types

| Type | Typical size | Purpose |
|---|---|---|
| `int` | 4 bytes | whole numbers (~ −2.1B to +2.1B) |
| `double` | 8 bytes | floating point (≈15 digits) |
| `float` | 4 bytes | floating point (≈7 digits) |
| `char` | 1 byte | a single character |
| `bool` | 1 byte | `true` / `false` |

```cpp
int count = 42;
double price = 19.99;
float ratio = 0.5f;      // 'f' suffix makes it a float
char letter = 'A';       // single quotes
bool done = true;
```

### Modifiers

```cpp
short s = 30000;            // usually 2 bytes
long l = 100000L;           // usually 4 or 8 bytes
long long big = 9000000000LL;  // at least 8 bytes
unsigned int u = 4294967295U;  // non-negative only — doubles the max
signed int s2 = -10;        // default, explicit
```

`unsigned` doubles the positive range (no negatives); `short`/`long` change the size. `sizeof` tells you the truth on your platform:

```cpp
std::cout << sizeof(int) << " bytes\n";   // prints 4 on most systems
```

### Fixed-width types (portable)

```cpp
#include <cstdint>

int8_t   a;   // exactly 8 bits
int32_t  b;   // exactly 32 bits
int64_t  c;   // exactly 64 bits
uint32_t d;   // unsigned 32 bits
size_t   e;   // unsigned type for sizes/indices
```

`<cstdint>` gives **guaranteed** sizes — use these when the exact size matters (files, networks, embedded).

### Integer overflow

```cpp
int max = 2147483647;    // INT_MAX
int over = max + 1;      // OVERFLOW → wraps to a large negative (undefined behaviour)
```

When a signed integer exceeds its range, C++ says the result is **undefined behaviour** — the program may wrap, crash, or misbehave. Choose a wide enough type (`long long`) or `unsigned` where appropriate.

### Floating point — precision, not exactness

```cpp
double x = 0.1 + 0.2;    // 0.30000000000000004, NOT exactly 0.3
```

Floating-point types can't represent every decimal exactly. Never compare them with `==`; compare with a small tolerance:

```cpp
bool nearly_equal = std::abs((0.1 + 0.2) - 0.3) < 1e-9;
```

### char, bool, and string

```cpp
char c = 'A';            // one character (ASCII value 65)
bool flag = true;        // true/false
#include <string>
std::string name = "Ankit";   // a class type for text (Module 5 covers it fully)
```

`char` stores one character; real text needs `std::string`.

## Visual — Sizes and Ranges

```
 char       1 byte    [ -128 .. 127 ]
 short      2 bytes   [ -32,768 .. 32,767 ]
 int        4 bytes   [ ~ -2.1B .. +2.1B ]
 long long  8 bytes   [ ~ -9.2e18 .. +9.2e18 ]
 float      4 bytes   (~7 significant digits)
 double     8 bytes   (~15 significant digits)
 unsigned int 4 bytes [ 0 .. ~4.2B ]
```

Wider types hold bigger ranges; unsigned types shift the range above zero.

## Code Examples

### Example 1 — Sizes on your machine

```cpp
#include <iostream>

int main() {
    std::cout << "int: " << sizeof(int) << " bytes\n";
    std::cout << "double: " << sizeof(double) << " bytes\n";
    std::cout << "char: " << sizeof(char) << " byte\n";
    std::cout << "long long: " << sizeof(long long) << " bytes\n";
    return 0;
}
```

### Example 2 — Overflow demonstration

```cpp
#include <iostream>
#include <climits>

int main() {
    int max = INT_MAX;
    std::cout << "INT_MAX = " << max << "\n";
    std::cout << "INT_MAX + 1 = " << max + 1 << "\n";  // wraps (UB in theory)
    return 0;
}
```

### Example 3 — Fixed-width and unsigned

```cpp
#include <iostream>
#include <cstdint>

int main() {
    uint32_t population = 8000000000U;   // fits in 32 bits unsigned
    int64_t distance = 150000000000LL;   // very large signed value

    std::cout << "Population: " << population << "\n";
    std::cout << "Distance: " << distance << "\n";
    return 0;
}
```

## Common Mistakes

1. **Overflowing an `int`** — use `long long` for large values.
2. **Comparing floating-point with `==`** — use a tolerance.
3. **Storing decimals in `int`** — they truncate silently.
4. **Mixing signed and unsigned** — can produce surprising comparisons.
5. **Assuming `int` is always 4 bytes** — it's platform-dependent; use `<cstdint>`.
6. **Using `char` for whole strings** — that's `std::string`'s job.

## Best Practices

- Pick the smallest type that safely holds your range.
- Use `<cstdint>` types when exact size matters.
- Prefer `double` over `float` for general math.
- Never compare floating-point values with `==`.
- Be explicit about `unsigned` — use it only when negatives are impossible.

## Practice Questions

1. Print the sizes of `int`, `double`, `char`, and `long long` on your machine.
2. Declare an `unsigned int` and a `long long`, and explain when each fits.
3. Demonstrate integer overflow with `INT_MAX + 1`.
4. Explain why `0.1 + 0.2 != 0.3` and show a safe comparison.
5. Use a fixed-width type (`int32_t`) and explain why it's portable.

## Multiple Choice Questions (MCQs)

### Q1. `sizeof(int)` is typically:
- a) 1 byte
- b) 2 bytes
- c) 4 bytes
- d) 8 bytes

**Answer:** c — 4 bytes on most modern platforms (but not guaranteed).

### Q2. Which type stores only non-negative integers?
- a) `signed int`
- b) `unsigned int`
- c) `double`
- d) `char`

**Answer:** b — `unsigned` reserves all bits for positive values.

### Q3. `long long` is guaranteed to be at least:
- a) 2 bytes
- b) 4 bytes
- c) 8 bytes
- d) 16 bytes

**Answer:** c — `long long` is at least 64 bits (8 bytes).

### Q4. Fixed-width types come from:
- a) `<iostream>`
- b) `<cstdint>`
- c) `<string>`
- d) `<cmath>`

**Answer:** b — `<cstdint>` provides `int32_t`, `uint64_t`, etc.

### Q5. Comparing `0.1 + 0.2` to `0.3` with `==`:
- a) Always true
- b) Is unreliable (floating-point error)
- c) Is a compile error
- d) Returns an integer

**Answer:** b — floating point is approximate; use a tolerance.

## Key Takeaways

- Fundamental types: `int`, `double`, `float`, `char`, `bool` + modifiers.
- `sizeof` reveals platform sizes; `<cstdint>` guarantees them.
- Integer overflow is undefined behaviour; floating point is approximate.
- Choose types by range, precision, and portability.

## Next Topic

[2.3 Input and Output](lesson-2.3-input-and-output.md)
