---
module: 5
topic: "5.1"
title: "Arrays (1D)"
slug: "arrays-1d"
difficulty: "Beginner"
prerequisites:
  - Variables and Constants
  - Data Types
  - Loops
estimated_minutes: 25
tags:
  - arrays
  - fundamentals
---

# 5.1 Arrays (1D)

## Overview

An array is a **fixed-size, contiguous block of memory** that stores multiple values of the **same data type** under a single name. Instead of declaring `int a, b, c, d, e;`, you declare `int marks[5];` and access each element with an index. Arrays are the foundation of almost every data structure in C++.

## Learning Objectives

After this lesson you will be able to:

- Declare and initialize a one-dimensional array
- Access and modify elements using **zero-based** indexing
- Iterate over an array with classic and range-based `for` loops
- Compute the element count with `sizeof`
- Explain how an array is laid out in memory

## Core Concepts

### Declaration

```cpp
type name[size];

int marks[5];      // an array of 5 ints (currently uninitialized)
double prices[10]; // an array of 10 doubles
```

The `size` must be a **compile-time constant** (a literal, a `const int`, or a `constexpr`). Standard C++ does **not** allow variable-length arrays whose size is read at runtime.

### Initialization

```cpp
int a[5] = {10, 20, 30, 40, 50}; // full initializer
int b[5] = {1, 2};               // partial: remaining elements become 0
int c[]  = {1, 2, 3};            // size deduced as 3
int d[5] = {};                   // all zero
```

Rules worth remembering:

- If you supply fewer values than the size, the **rest are zero-initialized**.
- If you omit the size, the compiler infers it from the number of values.
- You cannot use `a = b;` to copy arrays — you must copy **element by element** (or use `std::copy` / `std::array`).

### Accessing Elements

Indexing is **zero-based**: the first element is at index `0`, the last is at `size - 1`.

```cpp
int a[5] = {10, 20, 30, 40, 50};
a[0] = 100;          // modify first element
std::cout << a[1];   // prints 20
std::cout << a[4];   // prints 50 (last element)
```

### Iteration

```cpp
int a[5] = {10, 20, 30, 40, 50};

// classic index loop
for (int i = 0; i < 5; ++i) {
    std::cout << a[i] << " ";
}

// range-based for (C++11) — cleanest when you only need values
for (int value : a) {
    std::cout << value << " ";
}
```

### Getting the Size

```cpp
int a[] = {10, 20, 30, 40, 50};
int n = sizeof(a) / sizeof(a[0]); // 20 / 4 = 5
```

This works **only on a real array**, not on a pointer that an array has decayed into (see 5.5).

## Memory Layout (Visual)

An array is one continuous block; elements sit next to each other with no gaps.

```
int a[5] = {10, 20, 30, 40, 50};

 memory address →  0x100   0x104   0x108   0x10C   0x110
                  ┌───────┬───────┬───────┬───────┬───────┐
   element  →     │  10   │  20   │  30   │  40   │  50   │
                  └───────┴───────┴───────┴───────┴───────┘
   index    →        [0]     [1]     [2]     [3]     [4]
```

That contiguity is why an array is so fast: jumping to `a[3]` is just `base_address + 3 * sizeof(int)`.

## Code Examples

### Example 1 — Sum and average

```cpp
#include <iostream>

int main() {
    int marks[5] = {85, 92, 78, 90, 88};
    int sum = 0;
    for (int m : marks) sum += m;
    double avg = sum / 5.0;
    std::cout << "Sum: " << sum << ", Average: " << avg << "\n";
    return 0;
}
```

### Example 2 — Find the maximum

```cpp
int a[] = {3, 7, 2, 9, 4};
int n = sizeof(a) / sizeof(a[0]);
int maxVal = a[0];
for (int i = 1; i < n; ++i) {
    if (a[i] > maxVal) maxVal = a[i];
}
std::cout << "Maximum = " << maxVal << "\n"; // 9
```

## Common Mistakes

1. **Out-of-bounds access** — `a[5]` on a size-5 array is **undefined behaviour**; C++ performs no bounds checking and will silently read/write neighbouring memory.
2. **Off-by-one loops** — using `i <= 5` instead of `i < 5` walks one element past the end.
3. **Reading uninitialized elements** — `int a[5];` then printing `a[0]` prints garbage.
4. **`sizeof` on a pointer** — inside a function an array parameter is a pointer, so `sizeof(a)` returns 8 (pointer size), not the array size.
5. **Copying with `=`** — `int b[5] = a;` does not compile; copy element-wise.
6. **Non-constant size** — `int n; std::cin >> n; int a[n];` is not standard C++.

## Best Practices

- Prefer `std::array<int, 5>` (fixed size, `.at()` bounds-checks, copyable) or `std::vector<int>` (dynamic size) over raw arrays in real code.
- Name the size with a `constexpr` constant so the number appears once.
- Use a **range-based** `for` loop whenever you don't need the index.
- Always initialize arrays before reading from them.

## Practice Questions

1. Write a program that reads 5 integers into an array and prints them in **reverse** order.
2. Count how many elements of `{4, 7, 12, 5, 8, 3}` are **even**.
3. Write a function that returns the **index** of a target value in an array, or `-1` if not found (linear search).
4. Given `{1, 2, 3, 4, 5}`, write code that shifts every element one position to the **left** (result: `{2, 3, 4, 5, 1}`).
5. Create an array of 10 elements where each element is the square of its index (`a[i] = i * i`) and print it.

## Multiple Choice Questions (MCQs)

### Q1. What is the index of the first element of an array in C++?
- a) 1
- b) 0
- c) -1
- d) It depends on the array size

**Answer:** b

### Q2. What does `int arr[4] = {7};` contain?
- a) `{7, 7, 7, 7}`
- b) `{7, 0, 0, 0}`
- c) `{7, garbage, garbage, garbage}`
- d) A compile error

**Answer:** b — partial initializers zero-fill the rest.

### Q3. For `int a[] = {1, 2, 3, 4, 5};`, what is the value of `sizeof(a) / sizeof(a[0])`?
- a) 5
- b) 20
- c) 4
- d) Undefined

**Answer:** a — total bytes (20) divided by bytes-per-element (4) equals the count.

### Q4. Accessing `a[5]` when `a` was declared as `int a[5]` is:
- a) Safe, returns 0
- b) A compile-time error
- c) Undefined behaviour
- d) Automatically resizes the array

**Answer:** c — no bounds checking is performed.

### Q5. Which of these correctly initializes an array with all zeros?
- a) `int a[5] = 0;`
- b) `int a[5] = {};`
- c) `int a[5];`
- d) `int a[] = 0;`

**Answer:** b

## Key Takeaways

- An array stores fixed-size, same-type, **contiguous** data with **zero-based** indexing.
- Partial initializers fill the remaining slots with **zero**.
- `sizeof(arr)/sizeof(arr[0])` gives the count, but only for a true array.
- Out-of-bounds access is your responsibility — C++ does not check it.

## Next Topic

[5.2 Multidimensional Arrays](lesson-5.2-multidimensional-arrays.md)
