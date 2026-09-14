---
module: 6
topic: "6.2"
title: "Pointer Arithmetic"
slug: "pointer-arithmetic"
difficulty: "Intermediate"
prerequisites:
  - Pointers Basics
  - Arrays (1D)
estimated_minutes: 30
tags:
  - pointers
  - pointer-arithmetic
  - arrays
---

# 6.2 Pointer Arithmetic

## Overview

Pointer arithmetic lets you move a pointer through memory by adding or subtracting integers. It is the hidden machinery behind array indexing — `a[i]` and `*(a + i)` are literally the same thing in C++. Understanding this makes arrays, dynamic buffers, and low-level code far less mysterious.

## Learning Objectives

After this lesson you will be able to:

- Add and subtract integers from a pointer
- Explain why `p + 1` advances by the **size of the element type**
- Compute the difference between two pointers
- Relate pointer arithmetic to array indexing
- Describe what a `void*` is and why it cannot be dereferenced

## Core Concepts

### The golden rule

When you add `n` to a pointer, the address advances by `n * sizeof(element)`, **not** by `n` bytes. The compiler knows the element size from the pointer's type.

```cpp
int arr[5] = {10, 20, 30, 40, 50};
int* p = arr;      // points to arr[0]

p + 1;             // address of arr[1] (base + 4 bytes on most platforms)
p + 3;             // address of arr[3] (base + 12 bytes)
*(p + 3);          // 40 — same as p[3] or arr[3]
```

### Array indexing is pointer arithmetic

```cpp
arr[i]   ==   *(arr + i)      // identical
&arr[i]  ==   arr + i
```

That is why an array's name **decays to a pointer to its first element** in most contexts.

### Increment and decrement

```cpp
int* p = arr;
++p;               // now points to arr[1]
p += 2;            // now points to arr[3]
--p;               // back to arr[2]
```

### Pointer difference

```cpp
int* start = arr;
int* end   = arr + 5;
std::cout << end - start; // 5 — the number of ELEMENTS between them
```

Subtracting two pointers of the same type gives the number of elements between them (a `std::ptrdiff_t`).

### Pointer comparison

```cpp
int* p = arr;
while (p != arr + 5) {   // iterate until one past the end
    std::cout << *p << " ";
    ++p;
}
```

Comparing pointers with `<`, `>`, `==`, `!=` is well-defined **only within the same array** (including one past the end).

### void pointers

```cpp
int x = 42;
void* vp = &x;        // void* can hold any address
// std::cout << *vp;  // ERROR — void has no size, can't dereference
int* ip = static_cast<int*>(vp); // cast back to use it
std::cout << *ip;     // 42
```

A `void*` is a generic address holder; you must cast it to a concrete type before dereferencing.

## Memory Layout (Visual)

```
int arr[5] = {10, 20, 30, 40, 50};

  address: 0x100  0x104  0x108  0x10C  0x110
           ┌──────┬──────┬──────┬──────┬──────┐
           │  10  │  20  │  30  │  40  │  50  │
           └──────┴──────┴──────┴──────┴──────┘
             arr    arr+1  arr+2  arr+3  arr+4   (arr+5 = one past the end)

  arr + 2  → address 0x108,  *(arr + 2) == arr[2] == 30
```

Each `+1` moves the pointer by `sizeof(int)` (4 bytes here), because the pointer's type is `int*`.

## Code Examples

### Example 1 — Iterate an array with a pointer

```cpp
#include <iostream>

int main() {
    int arr[5] = {2, 4, 6, 8, 10};
    for (int* p = arr; p != arr + 5; ++p) {
        std::cout << *p << " ";  // 2 4 6 8 10
    }
    return 0;
}
```

### Example 2 — Sum using pointer arithmetic

```cpp
int sum(const int* begin, const int* end) {
    int total = 0;
    for (const int* p = begin; p != end; ++p) total += *p;
    return total;
}

int arr[] = {1, 2, 3, 4};
std::cout << sum(arr, arr + 4); // 10
```

### Example 3 — Reverse a range with two pointers

```cpp
void reverse(int* begin, int* end) {   // end = one past last
    --end;                             // move to last element
    while (begin < end) {
        std::swap(*begin, *end);
        ++begin;
        --end;
    }
}
```

## Common Mistakes

1. **Forgetting the element size** — `p + 1` moves by `sizeof(T)`, not one byte; using a `char*` moves by 1 byte.
2. **Arithmetic on `void*`** — `void* + 1` is not standard C++.
3. **Walking past the array** — dereferencing `arr + 5` (one past the end) is undefined behaviour.
4. **Comparing pointers from different arrays** — only same-array comparisons (with one-past-end) are defined.
5. **Confusing `*p++` and `(*p)++`** — `*p++` advances the pointer; `(*p)++` increments the pointed-to value.
6. **Off-by-one in loops** — the loop condition must be `p != end` where `end = arr + n`, not `arr + n - 1`.

## Best Practices

- Prefer iterators (`std::begin`/`std::end`) or range-based `for` over raw pointer loops in real code.
- Use `const int*` when you only read through the pointer.
- Keep a "begin/end" pair (a range) rather than a pointer + length — it composes better.
- Avoid `void*` in application code; it exists mainly for C interop and generic storage.

## Practice Questions

1. Using only pointer arithmetic, print every element of `int a[] = {5,10,15,20,25}`.
2. Write a loop that prints the array of question 1 **in reverse** using pointers.
3. Compute `end - begin` for `begin = a` and `end = a + 5`, and print the result.
4. Write a function `int countEven(const int* begin, const int* end)` that counts even values.
5. Explain why `void* vp; vp + 1;` is invalid, and show the correct way to advance such a pointer.

## Multiple Choice Questions (MCQs)

### Q1. If `p` is an `int*` pointing at element 0, what does `p + 2` point at?
- a) Two bytes ahead
- b) The element at index 2
- c) The address value plus 2
- d) Undefined location

**Answer:** b — pointer arithmetic scales by `sizeof(int)`.

### Q2. `arr[i]` is equivalent to:
- a) `*(arr + i)`
- b) `*arr + i`
- c) `arr + *i`
- d) `&arr[i]`

**Answer:** a — indexing is syntactic sugar for pointer addition plus dereference.

### Q3. For `int a[5]; int* b = a; int* e = a + 5;`, what is `e - b`?
- a) 20
- b) 5
- c) 4
- d) Compile error

**Answer:** b — pointer difference reports the number of elements.

### Q4. Which type moves a pointer by exactly one byte when incremented?
- a) `int*`
- b) `char*`
- c) `double*`
- d) `void*`

**Answer:** b — `char` has size 1.

### Q5. What does `*p++` do?
- a) Increments the pointed-to value
- b) Dereferences `p`, then advances `p` to the next element
- c) Advances `p`, then dereferences
- d) Compile error

**Answer:** b — postfix `++` binds first; the dereference uses the old value, then `p` advances.

## Key Takeaways

- Pointer arithmetic scales by the **size of the element type**.
- `a[i]` is identical to `*(a + i)`.
- Pointer subtraction gives an element count; comparisons are only defined within the same array.
- `void*` holds any address but cannot be dereferenced or arithmetically advanced.

## Next Topic

[6.3 References](lesson-6.3-references.md)
