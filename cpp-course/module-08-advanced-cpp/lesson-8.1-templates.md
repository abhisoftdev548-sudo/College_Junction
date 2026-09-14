---
module: 8
topic: "8.1"
title: "Templates"
slug: "templates"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Classes and Objects
  - Overloading (C++ Fundamentals)
estimated_minutes: 30
tags:
  - templates
  - generics
  - metaprogramming
---

# 8.1 Templates

## Overview

A **template** lets you write a function or class **once** and use it with many types, without copy-pasting. Instead of writing separate `max(int,int)` and `max(double,double)` functions, you write one `max` that works for any type. Templates are the foundation of `std::vector<T>`, `std::sort`, and the whole C++ standard library.

## Learning Objectives

After this lesson you will be able to:

- Write function templates with `template <typename T>`
- Write class templates like `Box<T>`
- Explain how template instantiation works at compile time
- Use multiple template parameters and non-type parameters
- Recognize common template pitfalls and error messages

## Core Concepts

### Function templates

```cpp
template <typename T>
T myMax(T a, T b) {
    return (a > b) ? a : b;
}

myMax(3, 5);          // T deduced as int
myMax(2.5, 1.5);      // T deduced as double
myMax(std::string("a"), std::string("b")); // works if operator> exists
```

`typename T` (or `class T`) is a **type parameter**. The compiler generates a concrete function for each type used — this is called **instantiation**.

### Class templates

```cpp
template <typename T>
class Box {
    T value;
public:
    explicit Box(const T& v) : value(v) {}
    T get() const { return value; }
};

Box<int> bi(42);              // Box of int
Box<std::string> bs("hi");    // Box of string
std::cout << bi.get();        // 42
```

When you write `Box<int>`, the compiler stamps out a whole class with `T` replaced by `int`.

### Multiple and non-type parameters

```cpp
template <typename K, typename V>     // two type parameters
class Pair {
    K key;
    V value;
public:
    Pair(const K& k, const V& v) : key(k), value(v) {}
};

template <typename T, int N>          // type + non-type parameter
class FixedArray {
    T data[N];
public:
    T& operator[](int i) { return data[i]; }
};

FixedArray<int, 10> a;   // 10-element int array, size fixed at compile time
```

### Template specialization

```cpp
template <typename T> T absValue(T v) { return v < 0 ? -v : v; }

template <>                       // full specialization for bool
bool absValue<bool>(bool v) { return v; }
```

Specialization lets you provide a custom version for a particular type.

## Visual — Instantiation

```
 template <typename T>          write ONCE
 T add(T a, T b) { return a + b; }
            │
            │   compile-time instantiation
   ┌────────┼─────────┬─────────────┐
   ▼        ▼         ▼             ▼
add(int,int)  add(double,double)  add(string,string)

Each usage generates a REAL, fully-typed function —
no runtime cost, the work happens when compiling.
```

Templates trade compile time for generality: you write once, and the compiler generates the specialized code for you.

## Code Examples

### Example 1 — A generic swap

```cpp
#include <iostream>

template <typename T>
void mySwap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    mySwap(x, y);
    std::cout << x << " " << y;   // 2 1

    std::string s = "a", t = "b";
    mySwap(s, t);
    std::cout << " " << s << t;   // "b a"
}
```

### Example 2 — A template stack

```cpp
#include <iostream>
#include <vector>

template <typename T>
class Stack {
    std::vector<T> items;
public:
    void push(const T& item) { items.push_back(item); }
    void pop() { items.pop_back(); }
    const T& top() const { return items.back(); }
    bool empty() const { return items.empty(); }
};

int main() {
    Stack<int> s;
    s.push(10);
    s.push(20);
    std::cout << s.top();   // 20
}
```

### Example 3 — A templated function with two types

```cpp
#include <iostream>
#include <string>

template <typename A, typename B>
void printPair(const A& a, const B& b) {
    std::cout << "(" << a << ", " << b << ")\n";
}

int main() {
    printPair(1, "one");        // (1, one)
    printPair(3.14, 'x');       // (3.14, x)
}
```

## Common Mistakes

1. **Calling with mismatched types** — `myMax(3, 2.5)` fails deduction because `T` can't be both `int` and `double`; use `myMax<double>(3, 2.5)`.
2. **Forgetting `typename` before dependent types** — inside templates, `typename T::iterator` needs the `typename` keyword.
3. **Putting template definitions in a `.cpp` file** — the compiler needs the definition at the call site; keep them in headers.
4. **Assuming `>` works for every type** — a template that uses `>` fails to compile for types without `operator>`.
5. **Confusing `typename` and `class`** — in template parameters they are equivalent; in dependent-name disambiguation only `typename` works.
6. **Bloated compile errors** — a type mismatch deep inside `std::vector` produces a wall of error text; read the first error first.

## Best Practices

- Prefer the standard library's templates (`std::vector`, `std::sort`) over rolling your own.
- Name type parameters meaningfully (`T`, `Key`, `Value`) rather than cryptic single letters when helpful.
- Keep template definitions in headers so every translation unit can instantiate them.
- Use `static_assert` or C++20 concepts to constrain template parameters with clear errors.
- Start from a concrete (non-template) function and generalize it — this usually reads clearer.

## Practice Questions

1. Write a template `larger(T a, T b)` that returns the larger of two values, and test it with `int` and `double`.
2. Write a class template `Pair<K, V>` with `getKey()` and `getValue()` and use it with mixed types.
3. Write a template function `countOccurrences(const std::vector<T>& v, const T& target)` returning the number of matches.
4. Write a `FixedArray<T, N>` with bounds-checked `operator[]` that prints an error for out-of-range indices.
5. Explain why `myMax(3, 2.5)` fails to compile and show the fix.

## Multiple Choice Questions (MCQs)

### Q1. Templates are resolved at:
- a) Runtime
- b) Compile time
- c) Link time
- d) First execution

**Answer:** b — each usage generates a concrete function/class during compilation.

### Q2. `template <typename T>` declares:
- a) A runtime variable
- b) A type parameter
- c) A constant
- d) A namespace

**Answer:** b

### Q3. `Box<int> b;` where `Box` is a class template is called:
- a) Specialization
- b) Instantiation
- c) Inheritance
- d) Encapsulation

**Answer:** b — a concrete `Box<int>` class is instantiated.

### Q4. What is the main benefit of templates?
- a) Smaller binaries
- b) Write once, reuse for many types without duplication
- c) Faster runtime than virtual functions in all cases
- d) Automatic memory management

**Answer:** b

### Q5. Which is a valid template parameter list?
- a) `template <int T>`
- b) `template <typename T, typename U>`
- c) `template <T typename>`
- d) `template [typename T]`

**Answer:** b

## Key Takeaways

- Templates write generic code once; the compiler **instantiates** concrete versions.
- `template <typename T>` for functions and classes; `Box<T>` for class templates.
- Deduction is automatic for function templates; explicit types can disambiguate.
- Keep template definitions in headers; constrain parameters for better errors.

## Next Topic

[8.2 Exception Handling](lesson-8.2-exception-handling.md)
