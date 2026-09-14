---
module: 6
topic: "6.4"
title: "Dynamic Memory Allocation"
slug: "dynamic-memory-allocation"
difficulty: "Intermediate"
prerequisites:
  - Pointers Basics
  - References
  - Arrays
estimated_minutes: 30
tags:
  - dynamic-memory
  - new-delete
  - heap
---

# 6.4 Dynamic Memory Allocation

## Overview

So far, every object lived on the **stack** with a size known at compile time. **Dynamic memory allocation** lets you create objects on the **heap** at runtime — useful when the size is unknown until the program runs, when an object must outlive its function, or when data is large. The trade-off: **you** are responsible for freeing what you allocate.

## Learning Objectives

After this lesson you will be able to:

- Contrast **stack** and **heap** storage
- Allocate single objects with `new` and arrays with `new[]`
- Release memory with `delete` and `delete[]`
- Explain memory leaks and dangling pointers
- Recognize why RAII and smart pointers are preferred

## Core Concepts

### Stack vs heap

| | Stack | Heap |
|---|---|---|
| Size known | Compile time | Runtime |
| Lifetime | Automatic (scope ends) | Manual (until `delete`) |
| Speed | Fast | Slower |
| Failure | Stack overflow | `std::bad_alloc` / null |

### `new` and `delete` (single object)

```cpp
int* p = new int;      // allocate one int on the heap
*p = 42;               // use it
delete p;              // release it — REQUIRED
p = nullptr;           // avoid dangling
```

### `new[]` and `delete[]` (arrays)

```cpp
int n;
std::cin >> n;         // size known only at runtime
int* arr = new int[n]; // dynamic array of n ints
for (int i = 0; i < n; ++i) arr[i] = i;
delete[] arr;          // note the [] — matches new[]
arr = nullptr;
```

**Critical rule:** `new` pairs with `delete`; `new[]` pairs with `delete[]`. Mixing them is undefined behaviour.

### Memory leak

```cpp
void leak() {
    int* p = new int(5);
    // no delete — the 4 bytes are lost forever (until process exit)
}
```

A leak happens when you lose the pointer without freeing the memory. In a long-running program, leaks accumulate and exhaust memory.

### Dangling pointer

```cpp
int* p = new int(5);
delete p;      // memory freed
// *p = 10;    // DANGER: p is dangling — undefined behaviour
```

A dangling pointer still holds the old address after the memory is freed. Set pointers to `nullptr` after `delete` and never use a deleted pointer.

### The modern way (RAII)

```cpp
#include <vector>

int n;
std::cin >> n;
std::vector<int> v(n);   // heap memory managed automatically
for (int i = 0; i < n; ++i) v[i] = i;
// no delete needed — v's destructor frees the memory
```

**RAII** (Resource Acquisition Is Initialization) means resources are tied to object lifetimes. `std::vector`, `std::string`, and smart pointers free their memory automatically, eliminating manual `delete`.

## Memory Layout (Visual)

```
 Stack (automatic)          Heap (manual, via new)
 ┌─────────────────┐        ┌───────────────────┐
 │ x (int)         │        │  dynamically       │
 │ p (int*, 0x200)─┼───────▶│  allocated object  │
 │ ...             │        │  (lives until      │
 └─────────────────┘        │   delete)          │
                            └───────────────────┘
```

The pointer `p` lives on the stack and is destroyed automatically, but the **object it points to** lives on the heap and must be deleted manually (or by a smart pointer).

## Code Examples

### Example 1 — Dynamic array of user-specified size

```cpp
#include <iostream>

int main() {
    int n;
    std::cout << "How many scores? ";
    std::cin >> n;

    int* scores = new int[n];
    for (int i = 0; i < n; ++i) scores[i] = (i + 1) * 10;

    for (int i = 0; i < n; ++i) std::cout << scores[i] << " ";

    delete[] scores;
    scores = nullptr;
    return 0;
}
```

### Example 2 — Dynamic single object

```cpp
int* p = new int(7);   // allocate and initialize to 7
std::cout << *p << "\n";
delete p;
p = nullptr;
```

### Example 3 — Safer with std::vector

```cpp
#include <iostream>
#include <vector>

int main() {
    int n;
    std::cin >> n;
    std::vector<int> scores(n);          // automatic cleanup
    for (int i = 0; i < n; ++i) scores[i] = (i + 1) * 10;
    for (int s : scores) std::cout << s << " ";
    return 0;                            // no delete[] needed
}
```

## Common Mistakes

1. **`delete` on `new[]`** (or `delete[]` on `new`) — undefined behaviour.
2. **Forgetting to delete** — a memory leak.
3. **Double delete** — deleting the same pointer twice.
4. **Using after delete** — dangling pointer dereference.
5. **Not handling allocation failure** — `new` throws `std::bad_alloc` on failure.
6. **Manual `new`/`delete` where RAII fits** — prefer `std::vector`/smart pointers (see 6.5).

## Best Practices

- Prefer containers (`std::vector`, `std::string`) over `new[]` — they manage memory for you.
- Prefer `std::make_unique` / `std::make_shared` over raw `new`.
- If you must use `new`, write the matching `delete` immediately (or use RAII).
- Set pointers to `nullptr` after `delete` to make dangling bugs easier to catch.
- Use tools like Valgrind/AddressSanitizer to detect leaks and dangling access.

## Practice Questions

1. Allocate a dynamic array of 100 `int`s, fill it with the numbers 1–100, sum it, then free the memory.
2. Write the matching `delete` for each: `int* a = new int;` and `int* b = new int[10];`.
3. Show a function that leaks memory by forgetting `delete`, then fix it.
4. Demonstrate a dangling pointer by deleting a pointer and (in a comment) showing why using it is wrong.
5. Rewrite question 1 using `std::vector` and explain why it is safer.

## Multiple Choice Questions (MCQs)

### Q1. Which operator releases memory allocated with `new[]`?
- a) `delete`
- b) `delete[]`
- c) `free`
- d) `remove`

**Answer:** b — `new[]` pairs with `delete[]`.

### Q2. Memory allocated with `new` lives on the:
- a) Stack
- b) Heap
- c) Code segment
- d) Register

**Answer:** b

### Q3. Losing the last pointer to `new`-allocated memory without deleting causes:
- a) A stack overflow
- b) A memory leak
- c) A compile error
- d) Automatic cleanup

**Answer:** b

### Q4. After `int* p = new int(5); delete p;`, what is `p`?
- a) `nullptr`
- b) A dangling pointer
- c) A copy of the value 5
- d) Automatically freed

**Answer:** b — `delete` does not change `p`'s value; it is now dangling.

### Q5. Which is the safest way to manage a dynamically sized array in modern C++?
- a) `new[]` / `delete[]`
- b) `std::vector`
- c) `malloc` / `free`
- d) A global array

**Answer:** b — RAII frees memory automatically.

## Key Takeaways

- The **stack** is automatic and fast; the **heap** is manual and flexible.
- `new`→`delete`, `new[]`→`delete[]` — never mix them.
- Leaks lose memory; dangling pointers use freed memory; both are bugs.
- RAII (containers + smart pointers) makes manual memory management largely unnecessary.

## Next Topic

[6.5 Smart Pointers](lesson-6.5-smart-pointers.md)
