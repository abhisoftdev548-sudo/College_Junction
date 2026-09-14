---
module: 15
topic: "15.5"
title: "Bit Manipulation"
slug: "bit-manipulation"
difficulty: "Advanced"
prerequisites:
  - Data Types
  - Operators
estimated_minutes: 30
tags:
  - bit-manipulation
  - bitwise-operators
  - bitmasking
---

# 15.5 Bit Manipulation

## Overview

Everything in a computer is bits. **Bit manipulation** operates on integers at the level of individual bits, enabling extremely fast and compact solutions — checking/setting flags, counting set bits, finding the unique element, generating subsets — that are often faster (and more elegant) than arithmetic or data-structure approaches.

## Learning Objectives

After this lesson you will be able to:

- Use `&`, `|`, `^`, `~`, `<<`, `>>` fluently
- Set, clear, toggle, and test individual bits
- Count set bits and find the lowest set bit
- Solve "single number" and power-of-two problems
- Enumerate subsets with bitmasks

## Core Concepts

### The operators

```cpp
int a = 0b1100, b = 0b1010;

a & b;    // 0b1000  AND
a | b;    // 0b1110  OR
a ^ b;    // 0b0110  XOR (different bits)
~a;       // NOT (flips all bits)
a << 1;   // 0b11000  left shift (multiply by 2)
a >> 1;   // 0b0110   right shift (divide by 2)
```

### Bit tricks (for the n-th bit)

```cpp
int x = 0b1010;

x & (1 << n)       // TEST bit n (nonzero → set)
x | (1 << n)       // SET bit n
x & ~(1 << n)      // CLEAR bit n
x ^ (1 << n)       // TOGGLE bit n

x & (x - 1)        // CLEAR the LOWEST set bit  (0b1010 & 0b1001 = 0b1000)
x & -x             // ISOLATE the lowest set bit
```

### Count set bits (Brian Kernighan)

```cpp
int popcount(int x) {
    int count = 0;
    while (x) {
        x &= (x - 1);   // drop the lowest set bit
        ++count;
    }
    return count;
}
```

O(number of set bits) instead of O(number of bits).

### Power of two check

```cpp
bool isPowerOfTwo(int x) {
    return x > 0 && (x & (x - 1)) == 0;
}
// a power of two has exactly one set bit: 1, 2, 4, 8, ...
```

### XOR properties (single-number problems)

```cpp
// XOR is its own inverse and pairs cancel: a ^ a = 0, a ^ 0 = a
int singleNumber(const std::vector<int>& nums) {
    int result = 0;
    for (int x : nums) result ^= x;   // every paired number cancels
    return result;
}
```

### Subset enumeration with bitmasks

```cpp
int n = 3;   // enumerate all subsets of {0,1,2}
for (int mask = 0; mask < (1 << n); ++mask) {
    for (int i = 0; i < n; ++i)
        if (mask & (1 << i)) { /* element i is in this subset */ }
}
```

Each integer from 0 to 2ⁿ−1 is one subset; bit i set means element i is included.

## Visual — Bit Tricks

```
 x      = 0b1010
 1<<1   = 0b0010

 test bit 1:  x & (1<<1) = 0b0010 (nonzero → set)
 set bit 0:   x | (1<<0) = 0b1011
 clear bit 1: x & ~(1<<1) = 0b1000
 toggle bit 0: x ^ (1<<0) = 0b1011

 clear lowest set bit: x & (x-1) = 0b1010 & 0b1001 = 0b1000
 isolate lowest set bit: x & -x = 0b0010
```

Once you internalize these, complex flag and set operations become one-liners.

## Code Examples

### Example 1 — Count set bits

```cpp
#include <iostream>

int main() {
    int x = 0b110101;              // 53
    int count = 0;
    while (x) { x &= (x - 1); ++count; }
    std::cout << count;            // 4 set bits
}
```

### Example 2 — Two numbers appear once, others twice

```cpp
// After XOR-ing everything, result = a ^ b.
// The lowest set bit of (a ^ b) separates a and b.
std::pair<int,int> singleNumbers(const std::vector<int>& nums) {
    int xr = 0;
    for (int x : nums) xr ^= x;
    int bit = xr & -xr;            // lowest differing bit
    int a = 0, b = 0;
    for (int x : nums) {
        if (x & bit) a ^= x; else b ^= x;
    }
    return {a, b};
}
```

### Example 3 — Generate all subsets

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a = {1, 2, 3};
    int n = a.size();
    for (int mask = 0; mask < (1 << n); ++mask) {
        for (int i = 0; i < n; ++i)
            if (mask & (1 << i)) std::cout << a[i];
        std::cout << "\n";   // prints all 8 subsets
    }
}
```

## Common Mistakes

1. **Shift overflow** — `1 << 40` overflows a 32-bit `int`; use `1LL << n` for n ≥ 31.
2. **Operator precedence** — `x & 1 == 0` parses as `x & (1 == 0)`; always parenthesize: `(x & 1) == 0`.
3. **Signed right shift** — `>>` on negative ints is implementation-defined (arithmetic vs logical); use unsigned types for bit work.
4. **Confusing `^` (XOR) with `**` (power)** — C++ has no power operator.
5. **Assuming `~x` flips only n bits** — it flips all bits of the type's width.
6. **Off-by-one in bitmask enumeration** — subsets are `0 .. (1<<n)-1`, not `1<<n`.

## Best Practices

- Use `unsigned`/`std::uint32_t` for bit manipulation to avoid sign surprises.
- Parenthesize every bit expression with shifts and comparisons.
- Use `1LL << n` for wide shifts.
- Prefer the built-in `__builtin_popcount` (GCC/Clang) or `std::popcount` (C++20) in real code.
- Use bitmasks for small fixed sets (permissions, options, subsets) — compact and fast.

## Practice Questions

1. Set, clear, toggle, and test bit 3 of an integer, showing each result.
2. Count the number of set bits in a number using Brian Kernighan's method.
3. Check whether a number is a power of two.
4. Find the single number that appears once while all others appear twice.
5. Enumerate all subsets of `{a, b, c, d}` using bitmasks.

## Multiple Choice Questions (MCQs)

### Q1. `x & (x - 1)` clears:
- a) The highest set bit
- b) The lowest set bit
- c) All bits
- d) The sign bit

**Answer:** b

### Q2. `a ^ a` equals:
- a) a
- b) 1
- c) 0
- d) ~a

**Answer:** c

### Q3. A number that is a power of two has:
- a) All bits set
- b) Exactly one bit set
- c) Zero bits set
- d) Two bits set

**Answer:** b

### Q4. To set bit n of x, use:
- a) `x & (1 << n)`
- b) `x | (1 << n)`
- c) `x ^ (1 << n)`
- d) `x >> n`

**Answer:** b

### Q5. Enumerating subsets of n elements needs masks from:
- a) 0 to n
- b) 0 to `(1 << n) - 1`
- c) 0 to `1 << n`
- d) 1 to n

**Answer:** b

## Key Takeaways

- `& | ^ ~ << >>` are the building blocks; test/set/clear/toggle with `1 << n`.
- `x & (x-1)` drops the lowest set bit (popcount, power-of-two); `x & -x` isolates it.
- XOR cancels pairs → single-number problems.
- Bitmasks enumerate subsets of up to ~20–64 elements compactly.

## Module 15 Complete 🎉

You've finished **Module 15 — Hashing and Advanced Topics**. Next up: **Module 16 — Interview and Project Practice** (the final module).
