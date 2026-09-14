---
module: 3
topic: "3.1"
title: "Conditional Statements (if-else, switch)"
slug: "conditional-statements"
difficulty: "Beginner"
prerequisites:
  - Operators and Expressions
estimated_minutes: 30
tags:
  - java
  - control-flow
  - if-else
  - switch
---

# 3.1 Conditional Statements (if-else, switch)

## Overview

Programs make decisions with **conditional statements**: `if`, `else if`, `else`, and `switch`. This lesson covers the classic forms (used everywhere for decades), then shows the modern `switch` **expression** (Java 14) and pattern-matching `switch` (Java 21), plus Java 25's preview of primitive patterns.

## Learning Objectives

After this lesson you will be able to:

- Write if / else if / else chains
- Use the classic `switch` statement with `break`
- Use the modern switch **expression** with `->` and `yield` (Java 14)
- Use pattern matching in switch (Java 21)
- Recognize Java 25's primitive patterns (preview)

## Core Concepts

### if / else if / else

```java
int score = 85;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
```

Conditions are evaluated top-down; only the **first true** branch runs. Braces `{}` group the branch — always use them.

### Single-line if (braces optional but discouraged)

```java
if (age >= 18) System.out.println("Adult");   // works, but...
if (age >= 18) {                              // ...prefer braces
    System.out.println("Adult");
}
```

### The classic switch statement (Java 1.0 → today)

```java
int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 2: System.out.println("Tue"); break;
    case 3: System.out.println("Wed"); break;
    default: System.out.println("Other");
}
```

- `switch` works on `int`, `char`, `String` (Java 7+), and enums.
- **Fall-through**: without `break`, execution falls into the next case.
- `default` handles unmatched values.

### Ternary as a compact if-else

```java
String status = (age >= 18) ? "adult" : "minor";
```

## Modern Java / Java 25 Update

### Switch expression with `->` (Java 14)

```java
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Unknown";
};
```

No `break` needed, and the switch **returns a value**. Use `yield` for multi-statement branches:

```java
String type = switch (n) {
    case 1, 2, 3 -> "small";
    default -> {
        int doubled = n * 2;
        yield "large (" + doubled + ")";   // yield a value from a block
    }
};
```

### Pattern matching switch (Java 21)

```java
Object obj = "hello";

String result = switch (obj) {
    case String s  -> "String: " + s;
    case Integer i -> "Integer: " + i;
    case null      -> "null";
    default        -> "other";
};
```

The switch tests **types**, binding the value to a pattern variable automatically.

### Java 25 — primitive patterns in switch (Preview, JEP 507)

Java 25's preview extends pattern matching to **primitive types**, letting you switch on numbers with type patterns:

```java
// Preview in Java 25 (enable --enable-preview)
String kind = switch (value) {
    case byte b  -> "byte";
    case int i   -> "int";
    case long l  -> "long";
    default      -> "other";
};
```

> ⚠️ Preview only — may change. Production code today uses classic `switch`/if-else and Java 14/21 stable features.

## Visual — How if-else Chains Decide

```
 score = 85
   │
   ▼
 score >= 90?  no
   │
   ▼
 score >= 80?  yes ──▶ "B"   (first true branch wins)
   │
   (score >= 70 never checked)
```

Each condition is tested in order until one is true; the rest are skipped.

## Code Examples

### Example 1 — Grade with if-else

```java
public class Grade {
    public static void main(String[] args) {
        int score = 78;
        if (score >= 90) System.out.println("A");
        else if (score >= 80) System.out.println("B");
        else if (score >= 70) System.out.println("C");
        else System.out.println("F");
    }
}
```

### Example 2 — Classic switch with fall-through

```java
public class Weekday {
    public static void main(String[] args) {
        int day = 6;
        switch (day) {
            case 1: case 2: case 3: case 4: case 5:
                System.out.println("Weekday");
                break;
            case 6: case 7:
                System.out.println("Weekend");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}
```

### Example 3 — Modern switch expression

```java
public class ModernSwitch {
    public static void main(String[] args) {
        int day = 3;
        String name = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6, 7 -> "Weekend";
            default -> "Invalid";
        };
        System.out.println(name);   // Wednesday
    }
}
```

## Common Mistakes

1. **Forgetting `break`** in classic switch — fall-through runs the next case unexpectedly.
2. **`if (x = 5)` instead of `if (x == 5)`** — assignment, not comparison.
3. **Comparing strings with `==`** — use `equals()` (Module 5).
4. **Dangling else** — an `else` binds to the nearest `if`; brace carefully.
5. **Missing `default`** — unmatched switch values silently do nothing.
6. **`switch` on unsupported types** — can't switch on `double`/`boolean`/`long`.

## Best Practices

- Always brace if/else branches, even single statements.
- Prefer switch **expressions** (`->`) over fall-through statements.
- Include a `default` branch in every switch.
- Use pattern-matching switch for type-based dispatch (Java 21+).
- Keep conditions simple; extract complex conditions into named boolean methods.

## Practice Questions

1. Write an if-else chain that classifies a temperature (hot/warm/cold/freezing).
2. Convert a day-of-week if-else chain into a classic switch statement.
3. Rewrite that switch as a modern switch expression with `->`.
4. Use a pattern-matching switch to handle a `String`, `Integer`, and `null`.
5. Write (in a comment) a Java 25 preview switch over primitive type patterns.

## Multiple Choice Questions (MCQs)

### Q1. In an if/else-if chain, how many branches run?
- a) All true branches
- b) Only the first true branch
- c) Always the last
- d) None

**Answer:** b

### Q2. In a classic switch, forgetting `break` causes:
- a) A compile error
- b) Fall-through into the next case
- c) The switch to restart
- d) Nothing

**Answer:** b

### Q3. A switch expression (Java 14) uses:
- a) `break` to return
- b) `->` and `yield`
- c) `return` only
- d) `goto`

**Answer:** b

### Q4. `switch` works on which of these?
- a) `double`
- b) `boolean`
- c) `String` (Java 7+)
- d) `long`

**Answer:** c

### Q5. Pattern-matching switch (Java 21) matches on:
- a) Only integers
- b) The runtime type of an object
- c) Method names
- d) Class files

**Answer:** b

## Key Takeaways

- `if/else if/else` = ordered conditions; first true wins.
- Classic switch needs `break`; prefer modern switch expressions (`->`/`yield`).
- Java 21 adds pattern-matching switch; Java 25 previews primitive patterns.
- Always brace branches and include a `default`.

## Next Topic

[3.2 Loops (for, while, do-while)](lesson-3.2-loops.md)
