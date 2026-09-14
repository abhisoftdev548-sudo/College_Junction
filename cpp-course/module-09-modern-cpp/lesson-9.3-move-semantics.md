---
module: 9
topic: "9.3"
title: "Move Semantics"
slug: "move-semantics"
difficulty: "Advanced"
prerequisites:
  - Pointers and References
  - Constructors and Destructors
  - Copy Control
estimated_minutes: 30
tags:
  - modern-cpp
  - move-semantics
  - rvalue-references
---

# 9.3 Move Semantics

## Overview

**Move semantics** (C++11) lets an object **transfer** its resources to another object instead of copying them. Moving a `std::string` or `std::vector` is far cheaper than copying — the new object just "steals" the internal buffer pointer instead of duplicating all the data. This is one of the most important performance features in modern C++.

## Learning Objectives

After this lesson you will be able to:

- Distinguish **lvalues** and **rvalues**
- Explain rvalue references (`T&&`)
- Use `std::move` to request a move
- Write a move constructor and move assignment operator
- Understand why moved-from objects are left "valid but unspecified"

## Core Concepts

### lvalues vs rvalues

```cpp
int x = 5;        // x is an lvalue — a named object with an address
x = 10;           // assign to an lvalue

int y = x + 2;    // (x + 2) is an rvalue — a temporary value
int z = 42;       // 42 is an rvalue
```

Rule of thumb: **lvalue** = has a name/address (can appear left of `=`); **rvalue** = temporary, no stable address.

### rvalue references

```cpp
int&& rref = 5;        // binds to the temporary 5
// int&  lref = 5;     // ERROR — non-const lvalue ref can't bind to a temporary
```

`T&&` is an **rvalue reference** — it binds to temporaries, signalling "this object can be cannibalized."

### std::move

```cpp
std::string a = "hello world (very long)";
std::string b = std::move(a);   // MOVE: b steals a's buffer
// a is now in a valid-but-unspecified state (often empty)
```

`std::move` doesn't move anything itself — it **casts** its argument to an rvalue reference, enabling the move constructor/assignment.

### Move constructor and move assignment

```cpp
class Buffer {
    int* data;
    int size;
public:
    Buffer(int n) : data(new int[n]), size(n) {}
    ~Buffer() { delete[] data; }

    // Copy (deep)
    Buffer(const Buffer& o) : data(new int[o.size]), size(o.size) {
        std::copy(o.data, o.data + size, data);
    }

    // Move (steal)
    Buffer(Buffer&& o) noexcept : data(o.data), size(o.size) {
        o.data = nullptr;      // leave o safe to destroy
        o.size = 0;
    }

    Buffer& operator=(Buffer&& o) noexcept {
        if (this != &o) {
            delete[] data;
            data = o.data;
            size = o.size;
            o.data = nullptr;
            o.size = 0;
        }
        return *this;
    }
};
```

The move constructor **steals the pointer** and nulls out the source so it won't double-free. Mark moves `noexcept` so containers like `std::vector` will actually use them.

### Moved-from objects

```cpp
std::vector<int> a = {1, 2, 3};
std::vector<int> b = std::move(a);
// a is "valid but unspecified": safe to assign to, reset, or destroy,
// but its contents are not guaranteed.
a = std::vector<int>{9, 9};   // fine — reassign and reuse
```

After moving from an object, only **assign to it** or **destroy it** — don't assume its value.

## Visual — Move vs Copy

```
  Copy (deep):                      Move (steal):
  a ┌─────────┐                     a ┌─────────┐
    │ data ──▶│ [1 2 3 ...]           │ data ──▶│ [1 2 3 ...]
    └─────────┘                       └─────────┘
  b ┌─────────┐  allocates &        b ┌─────────┐
    │ data ──▶│ [1 2 3 ...]  copies   │ data ──┘ (points at SAME buffer)
    └─────────┘  all elements         └─────────┘
  (O(n) work)                        a.data = nullptr (O(1) work)
```

Copying duplicates the buffer; moving just transfers the pointer — constant time regardless of size.

## Code Examples

### Example 1 — Moving strings and vectors

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::string s1 = "a very long string with lots of characters";
    std::string s2 = std::move(s1);      // no copy of the characters

    std::vector<int> v1(1000, 7);
    std::vector<int> v2 = std::move(v1); // steals v1's buffer

    std::cout << "s2: " << s2 << "\n";
    std::cout << "s1 now empty? " << (s1.empty() ? "yes" : "no") << "\n";
}
```

### Example 2 — A movable Buffer

```cpp
#include <iostream>
#include <utility>

int main() {
    Buffer a(100);
    Buffer b = std::move(a);   // move constructor — steals the 100 ints

    Buffer c(10);
    c = std::move(b);          // move assignment — frees c's old buffer, steals b's
    return 0;
}
```

### Example 3 — Move into a container

```cpp
std::vector<std::string> names;
std::string big = "a really large name string";
names.push_back(std::move(big));   // moves instead of copying
// big is now unspecified; the data lives in names
```

## Common Mistakes

1. **Using a moved-from object** — reading it yields unspecified results.
2. **`std::move` on a `const` object** — it can't move, so it silently **copies**.
3. **Forgetting `noexcept` on move operations** — `std::vector` falls back to copying during reallocation.
4. **Not nulling the source pointer in the move constructor** — causes double free.
5. **Returning `std::move` of a local** — `return std::move(x);` defeats NRVO; just `return x;`.
6. **Thinking `std::move` moves** — it only casts; the move happens in the move constructor/assignment.

## Best Practices

- Mark move constructors and move assignments `noexcept`.
- Follow the **Rule of Five** when managing raw resources: destructor, copy ctor/assign, move ctor/assign.
- Move into containers (`push_back(std::move(x))`) when the source is no longer needed.
- Don't move from `const` objects; don't use moved-from objects beyond reassignment/destruction.
- For many classes, you need **no** custom moves — the compiler generates good ones if members are movable.

## Practice Questions

1. Write a small class owning a `std::string` and observe that `std::move` avoids copying (e.g. by printing messages in copy vs move constructors).
2. Implement a move constructor and move assignment for a class that owns a raw `int*` buffer.
3. Explain what state a moved-from `std::string` is in and what operations are safe on it.
4. Show why moving a `const std::string` results in a copy.
5. Add `noexcept` to your move operations and explain why containers care about it.

## Multiple Choice Questions (MCQs)

### Q1. An rvalue is best described as:
- a) A named object
- b) A temporary value without a stable address
- c) A reference
- d) A constant

**Answer:** b

### Q2. What does `std::move(x)` actually do?
- a) Moves `x`'s data immediately
- b) Casts `x` to an rvalue reference
- c) Deletes `x`
- d) Copies `x`

**Answer:** b — it enables the move constructor/assignment to run.

### Q3. After `std::vector<int> b = std::move(a);`, `a` is:
- a) Guaranteed empty
- b) Valid but unspecified — safe to assign or destroy
- c) Deleted
- d) Deep-copied

**Answer:** b

### Q4. Why mark move operations `noexcept`?
- a) To make them faster
- b) So containers (e.g. `std::vector`) can use them during reallocation
- c) To prevent all exceptions
- d) It is required syntax

**Answer:** b

### Q5. Moving a `const std::string` results in:
- a) A compile error
- b) A copy
- c) A double free
- d) An empty string

**Answer:** b — a const object cannot be moved from, so the copy constructor runs.

## Key Takeaways

- Move semantics **transfers resources** instead of copying them.
- `T&&` binds to rvalues; `std::move` casts to an rvalue reference.
- Move constructor/assignment steal the pointer and null the source.
- Moved-from objects are valid but unspecified; mark moves `noexcept`.

## Next Topic

[9.4 Range-based For and Structured Bindings](lesson-9.4-range-for-structured-bindings.md)
