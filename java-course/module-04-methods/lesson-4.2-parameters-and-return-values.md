---
module: 4
topic: "4.2"
title: "Parameters and Return Values"
slug: "parameters-and-return-values"
difficulty: "Beginner"
prerequisites:
  - Introduction to Methods
estimated_minutes: 30
tags:
  - java
  - methods
  - parameters
  - return
---

# 4.2 Parameters and Return Values

## Overview

**Parameters** let you pass data *into* a method; **return values** let it pass a result *out*. Together they make methods general-purpose — one `add(a, b)` works for any two numbers. This lesson covers parameters, return, pass-by-value semantics, varargs, and modern conveniences.

## Learning Objectives

After this lesson you will be able to:

- Declare parameters and pass arguments
- Return values of any type
- Explain Java's pass-by-value behaviour for primitives and objects
- Use **varargs** for variable argument lists
- Write helper methods that compose into larger logic

## Core Concepts

### Parameters and arguments

```java
public static int add(int a, int b) {   // a, b are PARAMETERS
    return a + b;
}

public static void main(String[] args) {
    int sum = add(5, 3);                // 5, 3 are ARGUMENTS
    System.out.println(sum);            // 8
}
```

**Parameters** are the variables in the declaration; **arguments** are the actual values passed at the call.

### Multiple parameters and any return type

```java
public static String describe(String name, int age) {
    return name + " is " + age + " years old";
}

public static boolean isEven(int n) {
    return n % 2 == 0;
}
```

### Pass-by-value

```java
public static void change(int x) {
    x = 100;          // changes the LOCAL copy, not the caller's variable
}

public static void main(String[] args) {
    int num = 5;
    change(num);
    System.out.println(num);   // 5 — unchanged!
}
```

Java is **pass-by-value**: the method receives a **copy**. For primitives, changes never affect the caller. For objects, the copy is a copy of the **reference** — so the method *can* mutate the object's contents (but can't rebind the caller's variable). Objects are covered in Module 6.

### Varargs (variable-length arguments)

```java
public static int sum(int... numbers) {   // numbers is an int[]
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

sum(1, 2);          // 3
sum(1, 2, 3, 4, 5); // 15
sum();              // 0
```

`int... numbers` lets callers pass any number of arguments (including none). Internally it's an array.

### Returning early

```java
public static int indexOf(int[] a, int target) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == target) return i;   // early return when found
    }
    return -1;                          // not found
}
```

Early `return` keeps search/filter methods clean.

## Visual — Passing Arguments

```
 call: add(5, 3)
              │ copies
              ▼
 method: int add(int a, int b)     a=5, b=3  (local copies)
              │
              ▼
         return a + b  = 8  ──▶  back to the call site
```

Arguments are copied into the method's parameters; the return value flows back to the caller.

## Code Examples

### Example 1 — A temperature converter

```java
public class Convert {
    public static double toFahrenheit(double celsius) {
        return celsius * 9.0 / 5.0 + 32.0;
    }

    public static void main(String[] args) {
        System.out.println(toFahrenheit(0));    // 32.0
        System.out.println(toFahrenheit(100));  // 212.0
    }
}
```

### Example 2 — Varargs average

```java
public class Varargs {
    public static double average(int... values) {
        if (values.length == 0) return 0;
        int total = 0;
        for (int v : values) total += v;
        return (double) total / values.length;
    }

    public static void main(String[] args) {
        System.out.println(average(10, 20, 30));   // 20.0
        System.out.println(average(5));            // 5.0
    }
}
```

### Example 3 — Pass-by-value demonstration

```java
public class ByValue {
    public static void tryChange(int x) {
        x = 999;
        System.out.println("inside: " + x);   // 999
    }

    public static void main(String[] args) {
        int num = 42;
        tryChange(num);
        System.out.println("outside: " + num); // 42 (unchanged)
    }
}
```

## Common Mistakes

1. **Expecting a primitive to change** — pass-by-value means the caller's variable is untouched.
2. **Wrong argument order/count** — `add(5)` or `add(5, 3, 2)` don't match `add(int, int)`.
3. **Mismatched argument types** — passing a `double` where an `int` parameter is expected (without casting).
4. **Varargs not last** — `sum(int... nums, int x)` is invalid; varargs must be the last parameter.
5. **Forgetting `return` on all paths** — a method must return on every branch.
6. **Ignoring the returned value** — calling `add(2,3);` without using the result does nothing useful.

## Best Practices

- Keep the parameter list short (≤ 3–4); group related values into an object when it grows.
- Name parameters clearly (`radius`, `items`, `threshold`).
- Prefer returning a value over mutating shared state.
- Use varargs for genuinely variable lists (like `sum`, `max`).
- Use early returns for guard clauses and search results.

## Practice Questions

1. Write `max(int a, int b)` and `max(int a, int b, int c)`.
2. Write a method that takes a name and age and returns a formatted sentence.
3. Demonstrate pass-by-value with a primitive, showing the caller is unaffected.
4. Write a `product(int... nums)` method using varargs.
5. Write a method that finds the minimum in an array and returns its index (or -1).

## Multiple Choice Questions (MCQs)

### Q1. Parameters are declared in:
- a) The call site
- b) The method's parentheses
- c) The return statement
- d) `main` only

**Answer:** b

### Q2. Java passes arguments by:
- a) Reference
- b) Value
- c) Pointer
- d) Name

**Answer:** b

### Q3. `void` in a method's return type means:
- a) Returns `null`
- b) Returns nothing
- c) Returns 0
- d) Returns a boolean

**Answer:** b

### Q4. Varargs are declared with:
- a) `int[]`
- b) `int...`
- c) `int*`
- d) `int&`

**Answer:** b

### Q5. `int x = add(2, 3);` stores:
- a) Nothing
- b) The return value (5)
- c) The method
- d) A reference

**Answer:** b

## Key Takeaways

- Parameters bring data in; `return` sends a result out.
- Java is pass-by-value: primitives are copied, so the caller is unaffected.
- Varargs (`int... nums`) accept any number of arguments.
- Use early returns for guard clauses and search results.

## Next Topic

[4.3 Method Overloading](lesson-4.3-method-overloading.md)
