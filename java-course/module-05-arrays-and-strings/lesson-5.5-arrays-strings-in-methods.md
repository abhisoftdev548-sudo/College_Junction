---
module: 5
topic: "5.5"
title: "Arrays and Strings in Methods"
slug: "arrays-strings-in-methods"
difficulty: "Beginner"
prerequisites:
  - StringBuilder and StringBuffer
  - Parameters and Return Values
estimated_minutes: 30
tags:
  - java
  - arrays
  - strings
  - methods
---

# 5.5 Arrays and Strings in Methods

## Overview

Passing arrays and strings to methods has one crucial asymmetry: **strings are immutable** (changes never affect the caller), while **arrays are passed by reference value** (the method can modify the caller's array elements). Understanding this difference — and how to return arrays — is essential for writing correct methods.

## Learning Objectives

After this lesson you will be able to:

- Pass arrays and strings to methods
- Explain why array modifications affect the caller but string modifications don't
- Return arrays and strings from methods
- Use varargs methods with arrays
- Write common helper methods (find, sum, filter)

## Core Concepts

### Passing a string (immutable — caller unaffected)

```java
public static void change(String s) {
    s = s.toUpperCase();      // rebinds the LOCAL copy only
}

public static void main(String[] args) {
    String name = "ankit";
    change(name);
    System.out.println(name);   // "ankit" — unchanged
}
```

The method receives a copy of the **reference**. Reassigning it (`s = ...`) never affects the caller. And because strings are immutable, the method *can't* mutate the shared object either.

### Passing an array (caller's elements CAN change)

```java
public static void doubleAll(int[] a) {
    for (int i = 0; i < a.length; i++) {
        a[i] *= 2;               // mutates the SHARED array
    }
}

public static void main(String[] args) {
    int[] nums = {1, 2, 3};
    doubleAll(nums);
    System.out.println(Arrays.toString(nums));   // [2, 4, 6]
}
```

The array reference is copied, but it still points at the **same array object** — so element changes are visible to the caller.

### Returning arrays and strings

```java
public static int[] squares(int n) {
    int[] result = new int[n];
    for (int i = 0; i < n; i++) result[i] = i * i;
    return result;               // return a fresh array
}

public static String greet(String name) {
    return "Hello, " + name + "!";
}
```

### Varargs methods (arrays in disguise)

```java
public static int sum(int... nums) {   // nums is an int[]
    int total = 0;
    for (int n : nums) total += n;
    return total;
}

sum(1, 2, 3);            // 6
sum(new int[]{1, 2});    // 3 — can also pass an explicit array
```

Varargs is syntactic sugar over an array parameter.

### Common helpers

```java
public static boolean contains(int[] a, int target) {
    for (int v : a) if (v == target) return true;
    return false;
}

public static int max(int[] a) {
    int best = a[0];
    for (int v : a) if (v > best) best = v;
    return best;
}
```

## Visual — String vs Array Passing

```
 change(String s):         doubleAll(int[] a):
  caller: name ──▶ "ankit"   caller: nums ──▶ [1,2,3]
                    ▲                          ▲
  method: s ──▶ "ANKIT"       method: a ──▶ SAME array
  (new string, caller       (mutates elements —
   still "ankit")            caller sees [2,4,6])
```

Strings: reassignment/mutation is local. Arrays: the shared object is mutated.

## Code Examples

### Example 1 — A method that returns an array

```java
import java.util.Arrays;

public class EvenNumbers {
    public static int[] evensUpTo(int n) {
        int[] result = new int[n / 2];
        for (int i = 0; i < result.length; i++) {
            result[i] = (i + 1) * 2;
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(evensUpTo(10)));  // [2, 4, 6, 8, 10]
    }
}
```

### Example 2 — Mutating the caller's array

```java
public class InPlace {
    public static void addTen(int[] a) {
        for (int i = 0; i < a.length; i++) a[i] += 10;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        addTen(nums);
        System.out.println(Arrays.toString(nums));   // [11, 12, 13]
    }
}
```

### Example 3 — Varargs vs array parameter

```java
public class VarargsMethod {
    public static int product(int... nums) {
        int result = 1;
        for (int n : nums) result *= n;
        return result;
    }

    public static void main(String[] args) {
        System.out.println(product(2, 3, 4));      // 24
        int[] arr = {5, 6};
        System.out.println(product(arr));          // 30 (array works too)
    }
}
```

## Common Mistakes

1. **Expecting a string to change** — strings are immutable; return the new value instead.
2. **Forgetting that array changes ARE visible** — surprising the caller with mutations.
3. **Returning a reference to a local array is fine** — arrays are objects; the caller can use it (unlike C++ locals).
4. **Not checking an empty array** — `a[0]` throws on an empty array.
5. **Varargs vs array confusion** — `sum(int[] a)` and `sum(int... a)` are interchangeable at the call site.
6. **Returning `null` instead of an empty array** — prefer `new int[0]` to avoid NPEs.

## Best Practices

- Return new values/arrays rather than mutating inputs when possible.
- Document (or name) methods that mutate their array argument.
- Return empty arrays (`new int[0]`), not `null`.
- Use varargs for flexible "list of values" parameters.
- Keep array methods small and focused (`max`, `sum`, `contains`, `filter`).

## Practice Questions

1. Write `reverse(int[] a)` that reverses an array in place.
2. Write `toUpperCaseFirst(String s)` that returns a new capitalized string.
3. Write a method that returns the even numbers of an input array as a new array.
4. Explain why a string method can't change the caller's string but an array method can.
5. Write a varargs `min(int... nums)` method.

## Multiple Choice Questions (MCQs)

### Q1. Passing a `String` to a method and reassigning it inside:
- a) Changes the caller's string
- b) Does NOT affect the caller
- c) Deletes the string
- d) Throws an exception

**Answer:** b

### Q2. Mutating array elements inside a method:
- a) Affects the caller's array
- b) Does not affect the caller
- c) Copies the array
- d) Is a compile error

**Answer:** a

### Q3. `int... nums` is:
- a) A 2D array
- b) Varargs — an array parameter in disguise
- c) A list
- d) Invalid syntax

**Answer:** b

### Q4. Returning an empty array is better done with:
- a) `null`
- b) `new int[0]`
- c) `0`
- d) `void`

**Answer:** b

### Q5. To change a string in the caller's view, you should:
- a) Mutate it in place
- b) Return the new string and assign it
- c) Pass it by reference
- d) Use a pointer

**Answer:** b

## Key Takeaways

- Strings are immutable: methods can't change the caller's string — return the new value.
- Arrays pass their reference: element changes ARE visible to the caller.
- Varargs (`int... nums`) is an array parameter with a friendly call syntax.
- Return empty arrays, not `null`; keep array helpers small and focused.

## Module 5 Complete 🎉

You've finished **Module 5 — Arrays and Strings**. Next up: **Module 6 — Object-Oriented Programming (Fundamentals)**.
