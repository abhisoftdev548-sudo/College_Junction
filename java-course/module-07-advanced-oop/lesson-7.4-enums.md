---
module: 7
topic: "7.4"
title: "Enums"
slug: "enums"
difficulty: "Intermediate"
prerequisites:
  - Abstract Classes and Interfaces
estimated_minutes: 25
tags:
  - java
  - enums
  - constants
---

# 7.4 Enums

## Overview

An **enum** (enumeration) is a special class that defines a fixed set of named constants — the days of the week, statuses, card suits, directions. Enums are **type-safe**: you can't assign a random string or int where a `Day` is expected. They're far better than the old "magic int constants" pattern, and they're full classes — they can have fields, methods, and constructors.

## Learning Objectives

After this lesson you will be able to:

- Declare and use a simple enum
- Use `values()`, `valueOf()`, `ordinal()`, and `name()`
- Add fields, constructors, and methods to enums
- Use enums in switch (statement and expression)
- Compare enums correctly with `==` and `compareTo`

## Core Concepts

### A simple enum

```java
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.FRIDAY;
```

### Useful built-in methods

```java
Day[] all = Day.values();        // every constant, in declaration order
Day d = Day.valueOf("MONDAY");   // constant by name (throws if invalid)
int pos = Day.WEDNESDAY.ordinal(); // 2 (zero-based position)
String n = Day.MONDAY.name();    // "MONDAY"
```

### Comparing enums

```java
Day a = Day.MONDAY;
Day b = Day.MONDAY;

a == b;              // true — enum constants are singletons; == is safe
a.equals(b);         // true — equivalent
a.compareTo(b);      // 0 (compares ordinal order)
```

Enums are **singletons** — each constant is one shared instance, so `==` works correctly.

### Enums with fields and methods

```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    EARTH(5.976e+24, 6.37814e6);

    private final double mass;    // field
    private final double radius;

    Planet(double mass, double radius) {   // constructor (private by design)
        this.mass = mass;
        this.radius = radius;
    }

    public double mass() { return mass; }   // method
    public double radius() { return radius; }
}

double earthMass = Planet.EARTH.mass();
```

Enums can carry data and behaviour — each constant is an instance of the enum class.

### Enums in switch

```java
// classic switch statement
switch (day) {
    case MONDAY: System.out.println("Start"); break;
    case FRIDAY: System.out.println("Almost done"); break;
    default: System.out.println("Midweek");
}

// switch expression (Java 14)
String mood = switch (day) {
    case SATURDAY, SUNDAY -> "relaxed";
    case MONDAY -> "groggy";
    default -> "okay";
};
```

### Enum with behaviour (constant-specific methods)

```java
public enum Operation {
    ADD { public int apply(int a, int b) { return a + b; } },
    SUBTRACT { public int apply(int a, int b) { return a - b; } };

    public abstract int apply(int a, int b);   // each constant implements it
}

int result = Operation.ADD.apply(2, 3);   // 5
```

## Visual — An Enum as a Fixed Set

```
 Day enum:
 ┌───────────┬───────────┬───────────┬─────────┐
 │  MONDAY   │  TUESDAY  │ WEDNESDAY │  ...    │  ← 7 fixed constants
 └───────────┴───────────┴───────────┴─────────┘
   each is a SINGLETON instance of class Day

 vs. old-style magic ints (avoid):
   final int MONDAY = 1; final int TUESDAY = 2; ...  // no type safety
```

Enums give you a closed, typed set — the compiler rejects anything outside it.

## Code Examples

### Example 1 — Day of week

```java
public enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }

public class Main {
    public static void main(String[] args) {
        for (Day d : Day.values()) {
            System.out.println(d + " is day #" + (d.ordinal() + 1));
        }
    }
}
```

### Example 2 — Enum with fields

```java
public enum Status {
    PENDING("awaiting action"),
    APPROVED("accepted"),
    REJECTED("declined");

    private final String description;

    Status(String description) { this.description = description; }

    public String getDescription() { return description; }
}
```

### Example 3 — Switch expression over an enum

```java
public class Weekday {
    public static boolean isWeekend(Day d) {
        return switch (d) {
            case SATURDAY, SUNDAY -> true;
            default -> false;
        };
    }
}
```

## Common Mistakes

1. **Using int/string constants instead of enums** — loses type safety.
2. **`new Day(...)`** — enum constructors are private; you can't instantiate.
3. **Comparing enums with `equals` everywhere** — `==` is safe and idiomatic.
4. **Assuming `valueOf` never throws** — `valueOf("FUNDAY")` throws `IllegalArgumentException`.
5. **Confusing `ordinal()` with a stable ID** — ordinals shift if you reorder constants; use explicit fields for stable values.
6. **Forgetting the semicolon** after enum constants when adding fields/methods.

## Best Practices

- Use enums for any fixed set of values (statuses, types, days, directions).
- Prefer enums over `switch`-on-strings/int and magic constants.
- Attach data to enum constants with fields + constructors.
- Compare with `==`; use `values()` for iteration.
- Don't rely on `ordinal()` for persistence — use an explicit field.

## Practice Questions

1. Declare a `Season` enum and iterate over its values.
2. Add a `description` field to a `Status` enum with a constructor.
3. Write a switch expression over a `Day` enum returning a "weekend/weekday" label.
4. Explain why `==` is safe for enum comparison.
5. Write an `Operation` enum with constant-specific `apply` methods.

## Multiple Choice Questions (MCQs)

### Q1. An enum defines:
- a) A variable-length list
- b) A fixed set of named constants
- c) A dynamic array
- d) A number only

**Answer:** b

### Q2. To iterate all constants of an enum, use:
- a) `enum.values()`
- b) `enum.elements()`
- c) `enum.all()`
- d) `enum.list()`

**Answer:** a

### Q3. Enum constants are:
- a) New instances each call
- b) Singletons (one shared instance each)
- c) Strings
- d) Integers

**Answer:** b

### Q4. `Day.valueOf("MONDAY")` throws if:
- a) The day is a weekend
- b) The name doesn't match any constant
- c) The enum is empty
- d) It's called twice

**Answer:** b

### Q5. For enums, `==` is:
- a) Unsafe
- b) Safe and idiomatic
- c) A compile error
- d) Slower than equals

**Answer:** b

## Key Takeaways

- Enums = type-safe fixed sets of constants — better than magic ints/strings.
- Built-ins: `values()`, `valueOf()`, `ordinal()`, `name()`.
- Enums are classes: fields, constructors, methods, constant-specific behaviour.
- Compare with `==`; use switch expressions for enum logic.

## Next Topic

[7.5 Records and Modern Java](lesson-7.5-records-and-modern-java.md)
