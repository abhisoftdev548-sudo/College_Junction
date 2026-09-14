---
module: 6
topic: "6.5"
title: "Smart Pointers"
slug: "smart-pointers"
difficulty: "Intermediate"
prerequisites:
  - Dynamic Memory Allocation
  - References
estimated_minutes: 30
tags:
  - smart-pointers
  - unique-ptr
  - shared-ptr
  - memory-management
---

# 6.5 Smart Pointers

## Overview

Raw `new`/`delete` is error-prone: forget a `delete` and you leak; delete twice and you crash. **Smart pointers** wrap a raw pointer in an object whose **destructor frees the memory automatically** — the RAII idea applied to pointers. In modern C++, `std::unique_ptr` and `std::shared_ptr` replace raw owning pointers almost everywhere.

## Learning Objectives

After this lesson you will be able to:

- Explain the ownership model behind `unique_ptr` and `shared_ptr`
- Create smart pointers with `make_unique` / `make_shared`
- Transfer ownership with `std::move`
- Use `weak_ptr` to break reference cycles
- Choose the right smart pointer for a situation

## Core Concepts

### unique_ptr — exclusive ownership

Exactly **one** `unique_ptr` owns the object at a time. It cannot be copied, only **moved**.

```cpp
#include <memory>

std::unique_ptr<int> p = std::make_unique<int>(42);
std::cout << *p << "\n";     // 42 — works like a pointer

std::unique_ptr<int> q = std::move(p);  // ownership moves to q
// p is now null; q owns the int
```

When a `unique_ptr` goes out of scope (or is reassigned), its object is deleted automatically — no `delete` call needed.

### shared_ptr — shared ownership

Many `shared_ptr`s can own the same object; it is destroyed when the **last** owner is gone. It uses a **reference count**.

```cpp
std::shared_ptr<int> a = std::make_shared<int>(10);
std::shared_ptr<int> b = a;   // ref count now 2
std::cout << a.use_count();   // 2
a.reset();                    // a drops ownership; count → 1
// object still alive because b owns it
b.reset();                    // count → 0; object deleted
```

### weak_ptr — non-owning observer

A `weak_ptr` refers to an object managed by a `shared_ptr` **without** keeping it alive, and it breaks **reference cycles** (e.g. two objects pointing at each other).

```cpp
std::shared_ptr<int> s = std::make_shared<int>(5);
std::weak_ptr<int> w = s;            // doesn't increase the count

if (auto sp = w.lock()) {            // promote to shared_ptr if still alive
    std::cout << *sp;                // 5
}
```

### Prefer make_ over new

```cpp
auto p1 = std::make_unique<int>(7);     // recommended
std::unique_ptr<int> p2(new int(7));    // works, but error-prone
// (e.g. evaluation-order issues when a function has multiple arguments)
```

`make_unique` (C++14) and `make_shared` (C++11) allocate the object and build the smart pointer in one step.

## Visual — Ownership Models

```
unique_ptr:  one owner, moves only

  p ────────▶ [ object ]        (p owns it)
  q = std::move(p)   ⇒   q ───▶ [ object ] ,  p = null

shared_ptr:  many owners, reference-counted

  a ──┐
      ├──▶ [ object ]  refcount = 2
  b ──┘

weak_ptr:  observer only, never owns

  s ────────▶ [ object ]  refcount = 1
  w ─ ─ ─ ─▶  (does not increase the count)
```

## Code Examples

### Example 1 — unique_ptr with a class

```cpp
#include <iostream>
#include <memory>
#include <string>

struct Student {
    std::string name;
    Student(const std::string& n) : name(n) {}
};

int main() {
    auto s = std::make_unique<Student>("Ankit");
    std::cout << s->name << "\n";   // Ankit
    return 0;                        // s's object freed automatically
}
```

### Example 2 — shared_ptr sharing a resource

```cpp
#include <iostream>
#include <memory>

int main() {
    auto a = std::make_shared<int>(100);
    {
        auto b = a;                       // second owner
        std::cout << "count inside: " << a.use_count() << "\n"; // 2
    }                                     // b destroyed, count → 1
    std::cout << "count outside: " << a.use_count() << "\n";    // 1
    return 0;
}
```

### Example 3 — weak_ptr breaking a cycle

```cpp
struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;   // weak: avoids a cycle that would leak
};
```

## Common Mistakes

1. **Copying a `unique_ptr`** — `std::unique_ptr<int> q = p;` is a compile error; use `std::move`.
2. **Using a moved-from pointer** — after `std::move`, the source is null; dereferencing it is a bug.
3. **Mixing raw and smart ownership** — creating two `shared_ptr`s from one raw pointer double-deletes.
4. **Cycles with `shared_ptr`** — two objects owning each other never reach count zero; use `weak_ptr` for one side.
5. **`get()` misuse** — don't call `delete` on `p.get()`; the smart pointer already owns it.
6. **Overusing `shared_ptr`** — prefer `unique_ptr` unless you truly need shared ownership.

## Best Practices

- Default to `std::unique_ptr`; reach for `std::shared_ptr` only when ownership is genuinely shared.
- Always create with `std::make_unique` / `std::make_shared`.
- Pass smart pointers to functions by **reference or raw pointer** (`void f(const Widget* w)`), not by value, unless transferring ownership.
- Use `weak_ptr` to observe or break cycles.
- Raw pointers remain fine for **non-owning** references (function parameters, observers).

## Practice Questions

1. Create a `unique_ptr<int>` initialized to 9 and print the value, with no manual `delete`.
2. Move a `unique_ptr` to a second variable and print which one is null afterwards.
3. Create two `shared_ptr`s to the same string and print `use_count()` before and after one goes out of scope.
4. Use `weak_ptr::lock()` to safely print a value only if the object still exists.
5. Explain why a `unique_ptr` cannot be copied but a `shared_ptr` can.

## Multiple Choice Questions (MCQs)

### Q1. Which smart pointer has exclusive ownership?
- a) `shared_ptr`
- b) `unique_ptr`
- c) `weak_ptr`
- d) `auto_ptr`

**Answer:** b

### Q2. How do you transfer ownership of a `unique_ptr` to another variable?
- a) Copy assignment
- b) `std::move`
- c) `clone()`
- d) It cannot be transferred

**Answer:** b

### Q3. When is an object managed by `shared_ptr` destroyed?
- a) When created
- b) When the first `shared_ptr` is declared
- c) When the reference count reaches zero
- d) Never

**Answer:** c

### Q4. Which is the recommended way to create a `unique_ptr`?
- a) `new std::unique_ptr<int>(5)`
- b) `std::make_unique<int>(5)`
- c) `std::unique_ptr<int> p = 5;`
- d) `std::make_shared<int>(5)`

**Answer:** b — `make_unique` creates a `unique_ptr`.

### Q5. A `weak_ptr` is used to:
- a) Increase the reference count
- b) Observe an object without owning it
- c) Replace `unique_ptr`
- d) Allocate memory

**Answer:** b — and it is the standard tool for breaking `shared_ptr` cycles.

## Key Takeaways

- `unique_ptr`: one owner, movable, not copyable — your default choice.
- `shared_ptr`: reference-counted shared ownership; watch for cycles.
- `weak_ptr`: non-owning observer that breaks cycles and expires safely.
- Smart pointers apply RAII to memory: no manual `delete`, no leaks, no double-free.

## Module 6 Complete 🎉

You've finished **Module 6 — Memory and Pointers**. Next up: **Module 7 — Object-Oriented Programming**.
