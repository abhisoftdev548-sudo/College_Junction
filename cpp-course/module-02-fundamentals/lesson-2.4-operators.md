---
module: 2
topic: "2.4"
title: "Operators"
slug: "operators"
difficulty: "Beginner"
prerequisites:
  - Data Types
  - Input and Output
estimated_minutes: 30
tags:
  - cpp
  - fundamentals
  - operators
---

# 2.4 Operators

## Overview

**Operators** perform computations on values. C++ has **arithmetic** (`+ - * / %`), **assignment** (`= += -=`), **comparison** (`== != < > <= >=`), **logical** (`&& || !`), and **bitwise** (`& | ^ ~ << >>`) operators — plus the prefix/postfix **increment/decrement** (`++ --`). Operator precedence decides what runs first.

## Learning Objectives

After this lesson you will be able to:

- Use arithmetic, assignment, and comparison operators
- Combine conditions with logical operators
- Use increment/decrement correctly (prefix vs postfix)
- Explain operator precedence and use parentheses
- Avoid the classic `=` vs `==` mistake

## Core Concepts

### Arithmetic operators

```cpp
int a = 10, b = 3;
a + b;    // 13
a - b;    // 7
a * b;    // 30
a / b;    // 3  — INTEGER division truncates!
a % b;    // 1  — remainder (integers only)
```

Integer division **drops the fraction**; `%` gives the remainder. For real division, use a floating type:

```cpp
double x = 10.0 / 3.0;   // 3.333...
```

### Assignment and compound assignment

```cpp
int x = 5;
x += 3;    // x = 8   (same as x = x + 3)
x -= 2;    // x = 6
x *= 4;    // x = 24
x /= 3;    // x = 8
x %= 3;    // x = 2
```

### Increment and decrement

```cpp
int i = 5;
i++;       // postfix: i becomes 6
++i;       // prefix:  i becomes 7
int a = i++;   // a = 7 (old value), i = 8
int b = ++i;   // b = 9 (new value), i = 9
```

**Prefix** (`++i`) increments then yields the new value; **postfix** (`i++`) yields the old value then increments.

### Comparison operators

```cpp
a == b;   // equal?
a != b;   // not equal?
a < b;    // less than?
a > b;    // greater than?
a <= b;   // less than or equal?
a >= b;   // greater than or equal?
```

These produce `bool` (`true`/`false`).

### Logical operators

```cpp
bool a = true, b = false;
a && b;    // false — AND (both must be true)
a || b;    // true  — OR  (at least one true)
!a;        // false — NOT (flips)
```

`&&` and `||` **short-circuit**: evaluation stops as soon as the result is known.

### Bitwise operators

```cpp
int a = 5, b = 3;   // 0101 and 0011 in binary
a & b;    // 1   (AND)
a | b;    // 7   (OR)
a ^ b;    // 6   (XOR)
~a;       // -6  (NOT)
a << 1;   // 10  (shift left  = multiply by 2)
a >> 1;   // 2   (shift right = divide by 2)
```

### Precedence and parentheses

```cpp
int result = 2 + 3 * 4;        // 14 — * binds tighter than +
int result2 = (2 + 3) * 4;     // 20 — parentheses override precedence
```

When in doubt, **add parentheses** — they make intent clear and prevent bugs.

## Visual — The Classic Bug

```
 if (x = 5)   ← ASSIGNMENT: sets x to 5, then treats 5 as "true" → always runs!
 if (x == 5)  ← COMPARISON: checks whether x equals 5
```

One `=` assigns; two `==` compares. A single missing `=` is among the most common C++ bugs.

## Code Examples

### Example 1 — Arithmetic and remainder

```cpp
#include <iostream>

int main() {
    int a = 10, b = 3;
    std::cout << "a / b = " << a / b << "\n";   // 3 (integer division)
    std::cout << "a % b = " << a % b << "\n";   // 1
    std::cout << "real  = " << 10.0 / 3.0 << "\n";
    return 0;
}
```

### Example 2 — Logical conditions

```cpp
#include <iostream>

int main() {
    int age = 21;
    bool hasId = true;
    bool canEnter = (age >= 18) && hasId;
    std::cout << "Can enter: " << (canEnter ? "yes" : "no") << "\n";
    return 0;
}
```

### Example 3 — Prefix vs postfix

```cpp
#include <iostream>

int main() {
    int i = 5;
    int a = i++;     // a = 5, i = 6
    int b = ++i;     // b = 7, i = 7
    std::cout << "a=" << a << ", b=" << b << ", i=" << i << "\n";
    return 0;
}
```

## Common Mistakes

1. **`=` instead of `==` in conditions** — assigns instead of compares.
2. **Integer division when you want decimals** — use `10.0 / 3.0`.
3. **Confusing prefix and postfix** — `i++` vs `++i` differ when the value is used.
4. **Ignoring precedence** — `a & b == c` doesn't mean what it looks like; parenthesize.
5. **Assuming `%` works on doubles** — it's integer-only (use `std::fmod` for doubles).
6. **Forgetting `&&`/`||` short-circuit** — the right side may not run.

## Best Practices

- Use parentheses to make precedence explicit.
- Use `==` for comparison, `=` for assignment.
- Prefer prefix `++i` in loops (marginally more efficient, clearer intent).
- Use `std::fmod` for floating-point remainder.
- Break complex conditions into named `bool` variables.

## Practice Questions

1. Compute sum, difference, product, quotient, and remainder of two ints.
2. Demonstrate integer vs floating-point division.
3. Show the difference between `i++` and `++i` in an expression.
4. Write a condition using `&&`, `||`, and `!` and evaluate it.
5. Explain operator precedence with `2 + 3 * 4` vs `(2 + 3) * 4`.

## Multiple Choice Questions (MCQs)

### Q1. `10 / 3` in C++ (both int) equals:
- a) 3.33
- b) 3
- c) 4
- d) 1

**Answer:** b — integer division truncates toward zero.

### Q2. `10 % 3` equals:
- a) 3
- b) 1
- c) 0
- d) 3.33

**Answer:** b — the remainder of 10 ÷ 3 is 1.

### Q3. `&&` means:
- a) OR
- b) AND
- c) NOT
- d) XOR

**Answer:** b — logical AND: both operands must be true.

### Q4. In `int a = i++;`, `a` gets:
- a) The new value
- b) The old value of `i`
- c) Zero
- d) A garbage value

**Answer:** b — postfix yields the old value, then increments.

### Q5. `x << 1`:
- a) Doubles `x` (shifts bits left)
- b) Halves `x`
- c) Clears `x`
- d) Compares `x`

**Answer:** a — a left shift by 1 multiplies by 2.

## Key Takeaways

- Arithmetic (`+ - * / %`), assignment (`= += ...`), comparison (`== != < >`), logical (`&& || !`), bitwise (`& | ^ ~ << >>`).
- Integer division truncates; `%` is integer-only.
- Prefix vs postfix `++`; precedence → use parentheses.
- `=` assigns, `==` compares — never mix them up.

## Next Topic

[2.5 Type Conversion and Casting](lesson-2.5-type-conversion-and-casting.md)
