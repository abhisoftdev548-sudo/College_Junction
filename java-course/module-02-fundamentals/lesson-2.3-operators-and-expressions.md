---
module: 2
topic: "2.3"
title: "Operators and Expressions"
slug: "operators-and-expressions"
difficulty: "Beginner"
prerequisites:
  - Primitive Data Types
estimated_minutes: 30
tags:
  - java
  - operators
  - expressions
  - switch-expressions
---

# 2.3 Operators and Expressions

## Overview

Operators combine values into **expressions**. Java has arithmetic, relational, logical, bitwise, assignment, and conditional operators — plus a modern **`switch` expression** (Java 14) that makes multi-way logic cleaner. This lesson covers every operator family, precedence, and the idiomatic modern forms.

## Learning Objectives

After this lesson you will be able to:

- Use all six operator families
- Apply operator precedence correctly
- Use compound assignment and increment/decrement
- Write modern switch expressions with `->` and `yield` (Java 14)
- Avoid precedence and division pitfalls

## Core Concepts

### Arithmetic

```java
int a = 10, b = 3;
a + b;   // 13
a - b;   // 7
a * b;   // 30
a / b;   // 3   (integer division — truncates!)
a % b;   // 1   (remainder)
```

### Relational and logical

```java
a == b;  a != b;  a < b;  a > b;  a <= b;  a >= b;

boolean t = true, f = false;
t && f;   // AND — false (short-circuits)
t || f;   // OR — true
!t;       // NOT — false
```

`&&`/`||` **short-circuit**: the right side isn't evaluated if the left decides the result.

### Assignment and compound assignment

```java
int x = 5;
x += 3;   // x = 8   (x = x + 3)
x -= 2;   // 6
x *= 2;   // 12
x /= 3;   // 4
x %= 3;   // 1
x++;      // increment (post)
++x;      // increment (pre)
x--;      // decrement
```

### Bitwise (less common, powerful)

```java
int x = 0b1100, y = 0b1010;
x & y;    // AND   0b1000
x | y;    // OR    0b1110
x ^ y;    // XOR   0b0110
~x;       // NOT
x << 1;   // left shift  (multiply by 2)
x >> 1;   // right shift (divide by 2)
```

### Ternary (conditional) operator

```java
int age = 20;
String status = (age >= 18) ? "adult" : "minor";   // adult
```

### Precedence (high → low)

```text
()   ++ -- (postfix)   * / %   + -   << >>   < <= > >=
== !=   &   ^   |   &&   ||   ?:   = += -=
```

When unsure, **use parentheses** — clarity beats cleverness.

## Modern Java / Java 25 Update

### Switch expressions (Java 14) — the modern `switch`

```java
// Old: statement with break
String grade;
switch (score / 10) {
    case 10:
    case 9: grade = "A"; break;
    case 8: grade = "B"; break;
    default: grade = "F";
}

// Modern: arrow form + expression (returns a value)
String grade = switch (score / 10) {
    case 10, 9 -> "A";     // multiple labels, no break needed
    case 8 -> "B";
    case 7 -> "C";
    default -> "F";
};
```

Use `yield` when a branch needs a block:

```java
int result = switch (n) {
    case 1 -> 10;
    case 2 -> 20;
    default -> {
        int doubled = n * 2;
        yield doubled;      // return a value from the block
    }
};
```

### Java 25 — primitive patterns in switch (preview, JEP 507)

Java 25 preview lets you switch on a value with **type patterns**, simplifying type-based dispatch (see 2.2).

## Visual — Short-Circuit Evaluation

```
  false && expensive()     → false   (right side NEVER runs)
  true  || expensive()     → true    (right side NEVER runs)

  This is why you can write:
  if (list != null && !list.isEmpty()) { ... }
  // safe: if list is null, isEmpty() is never called
```

## Code Examples

### Example 1 — Grade calculator with switch expression

```java
public class Grade {
    public static void main(String[] args) {
        int score = 85;
        String grade = switch (score / 10) {
            case 10, 9 -> "A";
            case 8 -> "B";
            case 7 -> "C";
            default -> "F";
        };
        System.out.println("Grade: " + grade);   // B
    }
}
```

### Example 2 — Integer division surprise

```java
public class Division {
    public static void main(String[] args) {
        System.out.println(10 / 3);        // 3 (integer division)
        System.out.println(10.0 / 3.0);    // 3.333...
        System.out.println(10 % 3);        // 1 (remainder)
    }
}
```

### Example 3 — Safe null check with short-circuit

```java
public class SafeCheck {
    public static void main(String[] args) {
        String s = null;
        if (s != null && !s.isEmpty()) {   // isEmpty() skipped when s is null
            System.out.println(s);
        } else {
            System.out.println("empty or null");
        }
    }
}
```

## Common Mistakes

1. **Integer division** — `5 / 2` is `2`, not `2.5`; use `5.0 / 2`.
2. **`=` vs `==`** — `if (x = 5)` assigns; `if (x == 5)` compares.
3. **Confusing `&&` with `&`** — `&&` short-circuits, `&` always evaluates both.
4. **Precedence errors** — `a + b * c` multiplies first; parenthesize to be explicit.
5. **`switch` fall-through in old style** — forgetting `break` runs the next case.
6. **String comparison with `==`** — use `equals()` for content (Module 5 covers strings).

## Best Practices

- Parenthesize anything non-obvious, even if precedence would handle it.
- Prefer modern switch expressions (`->`) over fall-through `break` switches.
- Use `&&`/`||` for boolean logic; reserve `&`/`|` for bitwise work.
- Avoid clever one-liners that hurt readability.
- Watch integer division; cast or use `double` when decimals matter.

## Practice Questions

1. Compute `(5 + 3) * 2` and `5 + 3 * 2` — explain the difference.
2. Write a program that checks if a number is even using `%`.
3. Convert an if-else chain (A/B/C/F grades) into a switch expression.
4. Demonstrate short-circuit evaluation with a `null` string check.
5. Write a ternary that returns "positive"/"negative"/"zero" for a number.

## Multiple Choice Questions (MCQs)

### Q1. What is `7 / 2` in Java?
- a) 3.5
- b) 3
- c) 4
- d) 3.0

**Answer:** b — integer division truncates.

### Q2. Which operator short-circuits?
- a) `&`
- b) `|`
- c) `&&`
- d) `^`

**Answer:** c

### Q3. `x += 5` is equivalent to:
- a) `x = 5`
- b) `x = x + 5`
- c) `x = x - 5`
- d) `x + 5`

**Answer:** b

### Q4. A modern switch expression uses:
- a) `break` only
- b) `->` and `yield`
- c) `goto`
- d) `case` without labels

**Answer:** b

### Q5. The ternary `a ? b : c` returns:
- a) `b` if `a` is true, else `c`
- b) `c` if `a` is true, else `b`
- c) Always `b`
- d) A boolean

**Answer:** a

## Key Takeaways

- Six operator families: arithmetic, relational, logical, bitwise, assignment, ternary.
- Integer division truncates; `&&`/`||` short-circuit; parentheses beat precedence.
- Switch expressions (Java 14) return values via `->`/`yield`.
- Java 25 previews primitive patterns in switch — optional for now.

## Next Topic

[2.4 Type Casting and Conversion](lesson-2.4-type-casting-and-conversion.md)
