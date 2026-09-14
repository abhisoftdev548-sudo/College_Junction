---
module: 3
topic: "3.1"
title: "Conditional Statements"
slug: "conditional-statements"
difficulty: "Beginner"
prerequisites:
  - Operators
  - Input and Output
estimated_minutes: 30
tags:
  - cpp
  - control-flow
  - conditionals
---

# 3.1 Conditional Statements

## Overview

**Conditional statements** let a program choose between different paths based on a condition: `if` runs code when something is true, `else` when it's false, `else if` chains multiple checks, and `switch` selects among many constant cases. Conditions are the program's decision-making machinery.

## Learning Objectives

After this lesson you will be able to:

- Use `if`, `else if`, and `else`
- Build conditions with comparison and logical operators
- Use the ternary operator `?:`
- Use `switch` with `case`, `break`, and `default`
- Write nested conditionals clearly

## Core Concepts

### if / else

```cpp
int age = 21;
if (age >= 18) {
    std::cout << "Adult\n";
} else {
    std::cout << "Minor\n";
}
```

The condition must be a boolean expression; the block runs only when it's `true`.

### else if — multiple branches

```cpp
int score = 85;
if (score >= 90) {
    std::cout << "A\n";
} else if (score >= 80) {
    std::cout << "B\n";
} else if (score >= 70) {
    std::cout << "C\n";
} else {
    std::cout << "F\n";
}
```

Conditions are checked **top to bottom**; the first `true` branch runs, and the rest are skipped.

### Braces matter

```cpp
if (age >= 18)
    std::cout << "Adult\n";
    std::cout << "Always runs!\n";   // NOT part of the if — only one statement attaches
```

Without braces, only the **next single statement** belongs to the `if`. Always use braces to avoid this classic bug.

### Ternary operator ?:

```cpp
int age = 20;
std::string status = (age >= 18) ? "adult" : "minor";
```

`condition ? value_if_true : value_if_false` — a compact if/else for expressions.

### switch

```cpp
char grade = 'B';
switch (grade) {
    case 'A':
        std::cout << "Excellent\n";
        break;
    case 'B':
        std::cout << "Good\n";
        break;
    default:
        std::cout << "Keep trying\n";
}
```

`switch` jumps to the matching `case` and runs until a `break`. `default` handles unmatched values. Works with integers and characters (integral types).

### The fall-through trap

```cpp
switch (n) {
    case 1:
        std::cout << "one\n";   // no break!
    case 2:
        std::cout << "two\n";   // runs too when n == 1
}
```

Missing `break` causes **fall-through** — the next case's code runs. Usually a bug (unless you intend it).

### Nested conditionals

```cpp
if (loggedIn) {
    if (isAdmin) {
        std::cout << "Admin panel\n";
    } else {
        std::cout << "User dashboard\n";
    }
}
```

## Visual — Decision Flow

```
         ┌─── true ──▶ "Adult"
 age≥18? ┤
         └─── false ─▶ age≥13? ── true ─▶ "Teen"
                           └── false ─▶ "Child"
```

Conditions branch the program like a flowchart — exactly one path is taken.

## Code Examples

### Example 1 — Grade calculator

```cpp
#include <iostream>

int main() {
    int marks;
    std::cout << "Enter marks (0-100): ";
    std::cin >> marks;

    if (marks >= 90) std::cout << "Grade: A\n";
    else if (marks >= 75) std::cout << "Grade: B\n";
    else if (marks >= 60) std::cout << "Grade: C\n";
    else if (marks >= 40) std::cout << "Grade: D\n";
    else std::cout << "Grade: F\n";
    return 0;
}
```

### Example 2 — Even or odd

```cpp
#include <iostream>

int main() {
    int n;
    std::cout << "Number: ";
    std::cin >> n;

    std::cout << (n % 2 == 0 ? "even" : "odd") << "\n";
    return 0;
}
```

### Example 3 — Day of the week (switch)

```cpp
#include <iostream>

int main() {
    int day;
    std::cout << "Day (1-7): ";
    std::cin >> day;

    switch (day) {
        case 1: std::cout << "Monday\n"; break;
        case 2: std::cout << "Tuesday\n"; break;
        case 3: std::cout << "Wednesday\n"; break;
        case 4: std::cout << "Thursday\n"; break;
        case 5: std::cout << "Friday\n"; break;
        case 6: std::cout << "Saturday\n"; break;
        case 7: std::cout << "Sunday\n"; break;
        default: std::cout << "Invalid day\n";
    }
    return 0;
}
```

## Common Mistakes

1. **Using `=` instead of `==`** — `if (x = 5)` assigns and is always true.
2. **Missing braces** — a second statement silently escapes the `if`.
3. **Forgetting `break` in `switch`** — fall-through runs extra cases.
4. **Using `else if` when conditions overlap incorrectly** — order matters; check the most specific first.
5. **Comparing floating point with `==`** — use a tolerance (Module 2.2).
6. **`switch` on a non-integral type** — `switch` doesn't work with strings.

## Best Practices

- Always use braces, even for single statements.
- Check the most restrictive condition first in `if/else if` chains.
- Use `switch` for many constant-case comparisons.
- Use the ternary operator only for short, readable expressions.
- Keep nesting shallow; extract complex logic into functions (Module 4).

## Practice Questions

1. Write an if/else that prints "positive", "negative", or "zero" for a number.
2. Convert marks (0–100) to a letter grade with `else if`.
3. Use a `switch` to print the number of days in a month number.
4. Write a ternary that returns the larger of two numbers.
5. Demonstrate the fall-through bug in `switch` and fix it.

## Multiple Choice Questions (MCQs)

### Q1. In `if (x == 5)`, `==` means:
- a) Assignment
- b) Comparison (equality)
- c) Increment
- d) Declaration

**Answer:** b — `==` compares; `=` assigns.

### Q2. Without braces, an `if` controls:
- a) The whole program
- b) Only the next single statement
- c) Everything until `else`
- d) Nothing

**Answer:** b — only the immediately following statement.

### Q3. In a `switch`, `break`:
- a) Exits the switch
- b) Jumps to default
- c) Repeats the case
- d) Does nothing

**Answer:** a — `break` stops the fall-through and exits.

### Q4. The ternary `a > b ? a : b` returns:
- a) Always a
- b) The larger of a and b
- c) A boolean
- d) The smaller of a and b

**Answer:** b — returns `a` if true, else `b`.

### Q5. Missing `break` in a switch case causes:
- a) A compile error
- b) Fall-through into the next case
- c) An infinite loop
- d) The switch to exit

**Answer:** b — execution continues into the next case.

## Key Takeaways

- `if`/`else if`/`else` = branching; checked top to bottom.
- Braces define the branch; `=` vs `==` is the classic bug.
- Ternary `?:` for compact expressions; `switch` for constant cases.
- `break` stops fall-through; `default` catches unmatched values.

## Next Topic

[3.2 Loops](lesson-3.2-loops.md)
