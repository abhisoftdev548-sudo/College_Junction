---
module: 5
topic: "5.1"
title: "Arrays (1D)"
slug: "arrays-1d"
difficulty: "Beginner"
prerequisites:
  - Loops
  - Methods
estimated_minutes: 30
tags:
  - java
  - arrays
  - fundamentals
---

# 5.1 Arrays (1D)

## Overview

An **array** stores a fixed-size sequence of elements of the **same type** under one name. Instead of `int a, b, c, d, e;` you write `int[] marks = new int[5];` and access each element by index. Arrays are the foundation of collections in Java — but Java arrays are **objects** (reference types), which matters for how they're copied and passed.

## Learning Objectives

After this lesson you will be able to:

- Declare, initialize, and access a 1D array
- Use zero-based indexing and `length`
- Iterate with classic and enhanced `for` loops
- Copy, sort, and search arrays with the `Arrays` utility
- Explain why Java arrays are reference types

## Core Concepts

### Declaration and creation

```java
int[] marks;               // declare (preferred style)
marks = new int[5];        // create — 5 zeros

int[] scores = new int[5]; // declare + create
int[] nums = {10, 20, 30}; // create + initialize in one line
```

The size is **fixed at creation** and cannot change (use `ArrayList` for dynamic size, Module 9).

### Accessing elements (zero-based)

```java
int[] nums = {10, 20, 30, 40, 50};

nums[0] = 100;              // modify first element
System.out.println(nums[1]);    // 20
System.out.println(nums[4]);    // 50 (last element)
System.out.println(nums.length); // 5 (number of elements)
```

`length` is a **field** on arrays (not a method like `String.length()`).

### Iteration

```java
// classic index loop
for (int i = 0; i < nums.length; i++) {
    System.out.println(nums[i]);
}

// enhanced for (for-each) — cleanest when you only need values
for (int n : nums) {
    System.out.println(n);
}
```

### Default values

```java
int[] ints = new int[3];        // {0, 0, 0}
double[] ds = new double[3];    // {0.0, 0.0, 0.0}
boolean[] bs = new boolean[3];  // {false, false, false}
String[] ss = new String[3];    // {null, null, null}
```

New arrays are filled with **defaults**: `0` for numbers, `false` for boolean, `null` for objects.

### The Arrays utility class

```java
import java.util.Arrays;

int[] a = {5, 1, 4, 2, 3};

Arrays.sort(a);                      // sort in place → {1,2,3,4,5}
int[] b = Arrays.copyOf(a, a.length); // copy (proper way!)
boolean eq = Arrays.equals(a, b);    // true
int idx = Arrays.binarySearch(a, 3); // 2 (must be sorted)
System.out.println(Arrays.toString(a)); // [1, 2, 3, 4, 5]
```

## Visual — An Array in Memory

```
 int[] nums = {10, 20, 30};

 nums (reference) ──▶ ┌────┬────┬────┐
                      │ 10 │ 20 │ 30 │   ← the array object (heap)
                      └────┴────┴────┘
 index:                 0    1    2
```

`nums` is a **reference** to the array object; elements live contiguously on the heap.

## Code Examples

### Example 1 — Sum and average

```java
public class Average {
    public static void main(String[] args) {
        int[] marks = {85, 92, 78, 90, 88};
        int sum = 0;
        for (int m : marks) sum += m;
        double avg = (double) sum / marks.length;
        System.out.println("Average = " + avg);   // 86.6
    }
}
```

### Example 2 — Find the maximum

```java
public class MaxValue {
    public static void main(String[] args) {
        int[] a = {3, 7, 2, 9, 4};
        int max = a[0];
        for (int i = 1; i < a.length; i++) {
            if (a[i] > max) max = a[i];
        }
        System.out.println("Max = " + max);   // 9
    }
}
```

### Example 3 — Sort and search with Arrays

```java
import java.util.Arrays;

public class SortSearch {
    public static void main(String[] args) {
        int[] a = {5, 1, 4, 2, 3};
        Arrays.sort(a);
        System.out.println(Arrays.toString(a));      // [1, 2, 3, 4, 5]
        System.out.println(Arrays.binarySearch(a, 4)); // 3
    }
}
```

## Common Mistakes

1. **Out-of-bounds access** — `nums[5]` on a size-5 array throws `ArrayIndexOutOfBoundsException`.
2. **Off-by-one** — the last index is `length - 1`, not `length`.
3. **`=` to copy arrays** — `int[] b = a;` copies the **reference**, not the elements; use `Arrays.copyOf`.
4. **Forgetting arrays are fixed-size** — you can't add elements; use `ArrayList`.
5. **`nums.length()`** — `length` is a field, no parentheses (unlike `String`).
6. **Reading uninitialized object arrays** — `String[]` elements start as `null`.

## Best Practices

- Prefer the enhanced `for` when you don't need the index.
- Use `Arrays.toString`, `Arrays.sort`, `Arrays.copyOf`, `Arrays.equals` instead of hand-rolling.
- Declare arrays as `int[] a` (type-adjacent) for clarity.
- Use `Arrays.copyOf` (or `System.arraycopy`) for copies — never `=`.
- Use `ArrayList` when the size must change (Module 9).

## Practice Questions

1. Read 5 integers into an array and print them in reverse order.
2. Count how many elements of `{4, 7, 12, 5, 8, 3}` are even.
3. Write a method that returns the index of a target value (or -1).
4. Copy an array correctly with `Arrays.copyOf` and verify they're independent.
5. Sort an array and find the second-largest element.

## Multiple Choice Questions (MCQs)

### Q1. The index of the first element of a Java array is:
- a) 1
- b) 0
- c) -1
- d) `length`

**Answer:** b

### Q2. `int[] a = new int[4];` fills the array with:
- a) `null`
- b) `0`
- c) Random values
- d) `false`

**Answer:** b

### Q3. `a.length` returns:
- a) The last index
- b) The number of elements
- c) The byte size
- d) The first element

**Answer:** b

### Q4. Which correctly copies an array's elements?
- a) `int[] b = a;`
- b) `int[] b = Arrays.copyOf(a, a.length);`
- c) `int[] b = a.clone(0);`
- d) `int[] b = new a;`

**Answer:** b

### Q5. Accessing `a[5]` on a size-5 array causes:
- a) Nothing
- b) `ArrayIndexOutOfBoundsException`
- c) A compile error
- d) A negative index

**Answer:** b

## Key Takeaways

- Arrays: fixed-size, same-type, zero-based, with a `length` field.
- Java arrays are reference types; `=` copies the reference, `Arrays.copyOf` copies elements.
- Iterate with classic or enhanced `for`; sort/search with `java.util.Arrays`.
- Out-of-bounds access throws `ArrayIndexOutOfBoundsException`.

## Next Topic

[5.2 Multidimensional Arrays](lesson-5.2-multidimensional-arrays.md)
