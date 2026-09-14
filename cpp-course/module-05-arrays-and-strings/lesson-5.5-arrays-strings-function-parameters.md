---
module: 5
topic: "5.5"
title: "Arrays and Strings as Function Parameters"
slug: "arrays-strings-function-parameters"
difficulty: "Intermediate"
prerequisites:
  - Arrays (1D)
  - Multidimensional Arrays
  - Strings
  - Functions
estimated_minutes: 30
tags:
  - arrays
  - strings
  - functions
  - pointers
---

# 5.5 Arrays and Strings as Function Parameters

## Overview

Passing arrays and strings into functions has one big surprise in C++: **a raw array "decays" into a pointer**, losing its size. Strings and standard containers behave differently. This lesson shows exactly what happens under the hood and how to pass arrays and strings safely and idiomatically.

## Learning Objectives

After this lesson you will be able to:

- Explain **array-to-pointer decay**
- Pass a 1D array to a function with its size
- Pass a 2D array (and why the column count is required)
- Pass `std::string`, `std::vector`, and `std::array` by value and by `const&`
- Avoid the `sizeof`-inside-a-function trap

## Core Concepts

### Array decay

When you pass an array to a function, it **decays to a pointer to its first element**. These two declarations are identical:

```cpp
void print(int a[]);    // actually receives int*
void print(int* a);     // same thing
```

The size is **not** carried along — the function only sees an address.

### Passing size explicitly

```cpp
void print(int a[], int n) {
    for (int i = 0; i < n; ++i) std::cout << a[i] << " ";
}

int arr[5] = {1, 2, 3, 4, 5};
print(arr, 5);            // correct — size passed separately
```

### The `sizeof` trap

```cpp
void bad(int a[]) {
    // WRONG: a is a pointer here, so sizeof(a) == 8 (64-bit), not the array size
    int n = sizeof(a) / sizeof(a[0]); // always 8/4 = 2 on 64-bit
}
```

Because the array decayed, `sizeof` measures the **pointer**, not the original array. Always pass the size.

### Passing 2D arrays

```cpp
void printGrid(int g[][4], int rows) {   // column count is mandatory
    for (int r = 0; r < rows; ++r) {
        for (int c = 0; c < 4; ++c) std::cout << g[r][c] << " ";
        std::cout << "\n";
    }
}

int grid[3][4] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };
printGrid(grid, 3);
```

The compiler needs the number of columns to compute the offset `r * cols + c`; the row count can be a separate parameter.

### Passing std::string

```cpp
void greet(std::string name) {          // by value → makes a copy
    std::cout << "Hello, " << name;
}

void shout(const std::string& name) {   // by const reference → no copy
    std::cout << "HEY " << name << "!";
}

greet("Alice");         // fine — implicit conversion from const char*
shout("Bob");           // fine too
```

Prefer `const std::string&` to avoid copying large strings while still allowing both `std::string` and string literals.

### Passing std::vector and std::array

```cpp
#include <vector>
#include <array>

void show(const std::vector<int>& v) {   // no copy; v.size() is available!
    for (int x : v) std::cout << x << " ";
}

void show(const std::array<int, 5>& a) { // size is part of the type
    for (int x : a) std::cout << x << " ";
}
```

Unlike raw arrays, `std::vector` and `std::array` **remember their size** inside functions — one reason they are preferred over raw arrays.

### Modifying in place vs. copying

```cpp
void doubleAll(int a[], int n) {         // modifies the CALLER's array
    for (int i = 0; i < n; ++i) a[i] *= 2;
}

void safeDouble(std::vector<int> v) {    // copy — caller unaffected
    for (int& x : v) x *= 2;
}
```

Raw arrays are effectively passed **by pointer**, so changes are visible to the caller. Containers passed by value are copied; pass by reference (`&`) if you intend to modify the caller's object.

## Visual — Decay in Action

```
Caller:   int arr[5] = {1,2,3,4,5};
                ┌─────────────────────────────┐
                │ 1 │ 2 │ 3 │ 4 │ 5 │   (5 ints) │
                └──▲──────────────────────────┘
                   │  decay → pointer to first element
   Function:  int* a  ─┘   (only the address + separately-passed size)
```

Inside the function, `a` is just a pointer — the function has no idea the original array had 5 elements unless you pass `n`.

## Code Examples

### Example 1 — Sum of an array

```cpp
#include <iostream>

int sum(const int a[], int n) {
    int total = 0;
    for (int i = 0; i < n; ++i) total += a[i];
    return total;
}

int main() {
    int nums[] = {3, 1, 4, 1, 5};
    std::cout << sum(nums, 5) << "\n"; // 14
    return 0;
}
```

### Example 2 — Reverse a vector in place

```cpp
#include <vector>
#include <algorithm>

void reverse(std::vector<int>& v) {     // reference → affects caller
    std::reverse(v.begin(), v.end());
}
```

### Example 3 — Print a string by const reference

```cpp
#include <iostream>
#include <string>

void printUpper(const std::string& s) {
    for (unsigned char c : s)
        std::cout << static_cast<char>(std::toupper(c));
    std::cout << "\n";
}
```

## Common Mistakes

1. **Using `sizeof` inside a function** on a decayed array parameter.
2. **Forgetting to pass the size**, then reading out of bounds.
3. **Omitting the column count** in a 2D array parameter (`int g[][]`) — compile error.
4. **Passing `std::string` by value in a hot loop** — needless copies.
5. **Passing `const char*` and trying `==`** to compare contents.
6. **Expecting a by-value container to modify the caller** — changes are lost when the function returns.

## Best Practices

- Prefer `std::vector`, `std::string`, and `std::array` over raw arrays — they carry their size.
- Pass read-only parameters as `const T&`; pass modifiable ones as `T&`.
- If you must use a raw array, always pass the size as a second parameter.
- In modern C++ (C++20), consider `std::span` to pass an array *with* its size without decay.

## Practice Questions

1. Write a function `int findMax(const int a[], int n)` and call it with a 5-element array.
2. Write a function that reverses an array **in place** using only the array and its size.
3. Write a function `void printGrid(int g[][3], int rows)` and call it with a 2×3 array.
4. Write a function `std::string join(const std::string& a, const std::string& b)` that returns `a + " " + b`, and print the result.
5. Write a function that takes `std::vector<int>& v` and removes all odd numbers, then demonstrate it changes the caller's vector.

## Multiple Choice Questions (MCQs)

### Q1. When an array is passed to a function, what actually gets passed?
- a) A copy of the whole array
- b) A pointer to its first element
- c) The array size only
- d) A reference to the array type

**Answer:** b — the array decays to a pointer.

### Q2. Why is `sizeof(a)` unreliable inside a function with parameter `int a[]`?
- a) `sizeof` is only for types
- b) `a` has decayed to a pointer, so `sizeof` returns the pointer size
- c) The compiler strips array parameters
- d) `sizeof` is banned in functions

**Answer:** b

### Q3. Which signature is valid for a function taking a 2D array?
- a) `void f(int g[][], int r, int c);`
- b) `void f(int g[][4], int rows);`
- c) `void f(int g[3][], int cols);`
- d) `void f(int g[][], int rows);`

**Answer:** b — the column dimension must be specified.

### Q4. Which is the most efficient way to pass a read-only `std::string`?
- a) `void f(std::string s)`
- b) `void f(std::string& s)`
- c) `void f(const std::string& s)`
- d) `void f(std::string* s)`

**Answer:** c — no copy, and `const` prevents modification.

### Q5. A function `void f(std::vector<int> v)` doubles every element of `v`. After the call, the caller's vector is:
- a) Doubled
- b) Unchanged
- c) Empty
- d) Undefined

**Answer:** b — `v` is a copy; the caller's vector is untouched.

## Key Takeaways

- Raw arrays **decay to pointers** when passed to functions; pass the size separately.
- 2D array parameters must declare the **column** count.
- `std::vector`, `std::string`, and `std::array` keep their size and are the preferred types.
- Use `const T&` for read-only parameters, `T&` for in-place modification, and by-value only when a copy is intended.

## Module 5 Complete 🎉

You've finished **Module 5 — Arrays and Strings**. Next up: **Module 6 — Memory and Pointers**.
