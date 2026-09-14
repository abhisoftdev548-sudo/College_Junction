---
module: 1
topic: "1.2"
title: "Introduction to C++"
slug: "introduction-to-cpp"
difficulty: "Beginner"
prerequisites:
  - What is Programming
estimated_minutes: 30
tags:
  - cpp
  - basics
  - history
  - bjarne-stroustrup
---

# 1.2 Introduction to C++

## Overview

**C++** is a general-purpose programming language created as an extension of the C language, adding classes, objects, and other object-oriented features while keeping C's performance. This lesson covers **who created C++, when, and why** — the history — plus what makes C++ special and how it has evolved.

## Who Created C++ and When

| Fact | Detail |
|---|---|
| **Creator** | **Bjarne Stroustrup** |
| **Where** | AT&T **Bell Labs**, USA |
| **Development started** | **1979** (first called **"C with Classes"**) |
| **Renamed to C++** | **1983** |
| **First commercial release** | **1985** |
| **First ISO standard** | **1998** (C++98) |

### The story in brief

In **1979**, Danish computer scientist **Bjarne Stroustrup** began work at Bell Labs on **"C with Classes"** — C extended with the idea of **classes** (inspired by the Simula language). In **1983** the language was renamed **C++** (the `++` being C's increment operator, meaning "the next C"). It was released commercially in **1985**, and standardized by ISO in **1998**.

> **Why C++?** Stroustrup wanted a language that was both **efficient like C** and capable of **high-level abstraction** (objects, classes) — a combination that powers systems programming, games, and performance-critical software to this day.

## Learning Objectives

After this lesson you will be able to:

- Name the creator of C++ and the key dates
- Explain why C++ was created and what "C with Classes" means
- Describe C++'s defining characteristics
- List the major standard versions
- Explain the relationship between C and C++

## Core Concepts

### What makes C++ special

- **Performance** — compiles to efficient machine code with fine control over memory.
- **Multi-paradigm** — procedural, object-oriented, generic (templates), and functional styles.
- **Systems-level access** — pointers, manual memory, and low-level control.
- **Backward compatible** with C (mostly) — C code often compiles as C++.
- **Standard library (STL)** — containers, algorithms, strings, I/O.

### The C and C++ relationship

```text
  C (1972, Dennis Ritchie)
       │  Stroustrup adds classes + OOP + more
       ▼
  "C with Classes" (1979)  ──▶  C++ (1983)  ──▶  ISO standards
```

C++ began as a superset-style extension of C; today it is its own rich language, still sharing much syntax.

### Standard versions

```text
C++98 (first standard) → C++03 → C++11 (huge update) → C++14
                       → C++17 → C++20 → C++23
```

Each version added features (smart pointers, lambdas, `auto`, concepts, ranges). "Modern C++" usually means **C++11 and later**.

### A first taste

```cpp
#include <iostream>

int main() {
    std::cout << "C++ was created by Bjarne Stroustrup in 1979 (as C with Classes),"
              << " renamed C++ in 1983.\n";
    return 0;
}
```

## Visual — The C++ Timeline

```
 1979 ───────────▶ 1983 ───────────▶ 1985 ───────────▶ 1998 ───────────▶ 2011...
 "C with Classes"    renamed C++      commercial       ISO C++98        C++11
 (started at         (Stroustrup)     release          (standardized)   (modern C++)
  Bell Labs)
      Creator: Bjarne Stroustrup
```

The language evolved from a research project into one of the world's most used programming languages.

## Code Examples

### Example 1 — A tribute program

```cpp
#include <iostream>

int main() {
    std::cout << "Created by : Bjarne Stroustrup\n";
    std::cout << "Started    : 1979 (as C with Classes)\n";
    std::cout << "Renamed    : 1983 (C++)\n";
    std::cout << "First ISO  : 1998\n";
    return 0;
}
```

### Example 2 — Which standard are you using?

```cpp
#include <iostream>

int main() {
    std::cout << "C++ standard: " << __cplusplus << "\n";
    // 201103L = C++11, 201402L = C++14, 201703L = C++17, 202002L = C++20
    return 0;
}
```

### Example 3 — Modern vs classic C++

```cpp
#include <iostream>
#include <vector>

int main() {
    // Classic: raw loops
    std::vector<int> v = {1, 2, 3};
    for (std::size_t i = 0; i < v.size(); ++i) std::cout << v[i] << " ";

    // Modern: range-based for (C++11)
    for (int x : v) std::cout << x << " ";
    return 0;
}
```

## Common Mistakes

1. **Thinking C++ is just "C with a few extras"** — it's a distinct, much larger language.
2. **Forgetting who created it** — Bjarne Stroustrup, at Bell Labs, starting 1979.
3. **Confusing C++ with C#** — C# is a different (Microsoft, 2000) language.
4. **Mixing up the dates** — named C++ in 1983, released 1985, standardized 1998.
5. **Assuming all C++ code is old-style** — modern C++ (11+) looks quite different.
6. **Calling `.cpp` files "C files"** — `.c` is C, `.cpp` is C++.

## Best Practices

- Learn **modern C++** (C++11 and later) — it's safer and more expressive.
- Use the STL rather than reinventing containers and algorithms.
- Enable a recent standard in your compiler (e.g. `-std=c++17`).
- Know the history: it explains *why* C++ has both low-level and high-level features.

## Practice Questions

1. Who created C++ and where did they work?
2. In which year did development start, and what was the language first called?
3. In which year was it renamed C++, and when was the first ISO standard published?
4. Explain the relationship between C and C++ in one or two sentences.
5. List three things that make C++ special compared to other languages.

## Multiple Choice Questions (MCQs)

### Q1. Who created C++?
- a) Dennis Ritchie
- b) Bjarne Stroustrup
- c) James Gosling
- d) Guido van Rossum

**Answer:** b

### Q2. C++ was first developed at:
- a) Microsoft
- b) Google
- c) Bell Labs (AT&T)
- d) IBM

**Answer:** c

### Q3. The language was first called:
- a) C#
- b) Objective-C
- c) "C with Classes"
- d) Simula

**Answer:** c

### Q4. It was renamed "C++" in:
- a) 1979
- b) 1983
- c) 1985
- d) 1998

**Answer:** b

### Q5. The first ISO C++ standard was published in:
- a) 1983
- b) 1985
- c) 1998
- d) 2011

**Answer:** c

## Key Takeaways

- **C++ was created by Bjarne Stroustrup at Bell Labs** — started **1979** as "C with Classes", renamed **C++ in 1983**, released **1985**, standardized **1998**.
- C++ combines C's performance with high-level abstractions.
- "Modern C++" = C++11 and later (smart pointers, lambdas, `auto`, ranges).
- It powers games, systems, browsers, finance, and embedded software.

## Next Topic

[1.3 Setting Up C++ Environment](lesson-1.3-setting-up-cpp-environment.md)
