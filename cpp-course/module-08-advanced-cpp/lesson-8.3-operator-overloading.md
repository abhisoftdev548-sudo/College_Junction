---
module: 8
topic: "8.3"
title: "Operator Overloading"
slug: "operator-overloading"
difficulty: "Advanced"
prerequisites:
  - Classes and Objects
  - Constructors
estimated_minutes: 30
tags:
  - operator-overloading
  - classes
  - arithmetic
---

# 8.3 Operator Overloading

## Overview

**Operator overloading** lets you define what operators like `+`, `==`, `[]`, and `<<` mean for your own classes — so you can write `v1 + v2` for vectors or `a == b` for dates, reading as naturally as built-in arithmetic. Done well it makes classes intuitive; done badly it makes code baffling.

## Learning Objectives

After this lesson you will be able to:

- Overload arithmetic and comparison operators as members and free functions
- Overload `operator[]` and assignment
- Overload `operator<<` for custom output
- Explain the difference between member and non-member overloading
- Follow the principle of least surprise

## Core Concepts

### Member operator

```cpp
class Vector2 {
public:
    double x, y;
    Vector2(double a, double b) : x(a), y(b) {}

    Vector2 operator+(const Vector2& o) const {   // member overload
        return Vector2(x + o.x, y + o.y);
    }
};

Vector2 a(1, 2), b(3, 4);
Vector2 c = a + b;   // c.x == 4, c.y == 6
```

`a + b` is rewritten by the compiler as `a.operator+(b)`.

### Comparison operators

```cpp
bool operator==(const Vector2& o) const {
    return x == o.x && y == o.y;
}
bool operator!=(const Vector2& o) const { return !(*this == o); }
```

Implement `==` and derive `!=` from it to stay consistent.

### operator[] (subscript)

```cpp
class Array10 {
    int data[10];
public:
    int& operator[](int i) { return data[i]; }              // writable
    const int& operator[](int i) const { return data[i]; }  // read-only
};
```

Return a **reference** so `a[3] = 5;` can modify the element.

### Assignment operator

```cpp
Vector2& operator=(const Vector2& o) {
    x = o.x;
    y = o.y;
    return *this;   // enables chaining: a = b = c;
}
```

Always return `*this` by reference to support chained assignment.

### Stream insertion (free function)

```cpp
#include <iostream>

std::ostream& operator<<(std::ostream& os, const Vector2& v) {
    os << "(" << v.x << ", " << v.y << ")";
    return os;
}

std::cout << a;   // (1, 2)
```

`operator<<` is usually a **free function** (not a member) because the left operand is `std::ostream`, not your class.

### Member vs free function

| Operator | Typical form |
|---|---|
| `=`, `[]`, `()`, `->` | Must be a **member** |
| `+`, `-`, `==`, `<` | Member **or** free (free preferred for symmetry) |
| `<<`, `>>` | **Free** function (left operand is the stream) |

## Visual — What the Compiler Sees

```
  source:   a + b
            │
            ▼  compiler rewrites to
  a.operator+(b)          (member form)
      or
  operator+(a, b)         (free form)

  The overload just defines what "add" means for your type.
```

Operator overloading is syntactic sugar over ordinary function calls — no magic, just named functions with operator spelling.

## Code Examples

### Example 1 — A Fraction with arithmetic

```cpp
#include <iostream>

class Fraction {
    int num, den;
public:
    Fraction(int n, int d) : num(n), den(d) {}

    Fraction operator+(const Fraction& o) const {
        return Fraction(num * o.den + o.num * den, den * o.den);
    }

    friend std::ostream& operator<<(std::ostream& os, const Fraction& f) {
        os << f.num << "/" << f.den;
        return os;
    }
};

int main() {
    Fraction a(1, 2), b(1, 3);
    std::cout << a + b;   // 5/6
}
```

### Example 2 — A wrapper with [] and ==

```cpp
#include <iostream>

class Point3 {
    int c[3];
public:
    Point3(int x, int y, int z) { c[0] = x; c[1] = y; c[2] = z; }
    int& operator[](int i) { return c[i]; }
    bool operator==(const Point3& o) const {
        return c[0] == o.c[0] && c[1] == o.c[1] && c[2] == o.c[2];
    }
};

int main() {
    Point3 p(1, 2, 3), q(1, 2, 3);
    p[1] = 9;
    std::cout << p[1];        // 9
    std::cout << (p == q);    // 0 (false) — p was modified
}
```

### Example 3 — Chained assignment

```cpp
class Counter {
    int n = 0;
public:
    Counter& operator=(const Counter& o) {
        n = o.n;
        return *this;
    }
    Counter& increment() { ++n; return *this; }
    int get() const { return n; }
};

Counter a, b, c;
a = b = c;   // chained — works because operator= returns *this
```

## Common Mistakes

1. **Surprising semantics** — overloading `+` to subtract, or `==` to do something unrelated.
2. **Forgetting to return a reference** from `operator[]` or `operator=` — breaks mutation/chaining.
3. **Making `<<` a member** — then it can't take `std::ostream` as the left operand.
4. **Changing operands** — `a + b` should not modify `a` or `b`; declare it `const`.
5. **Not defining `!=` when defining `==`** — users expect both.
6. **Overloading `&&`, `||`, or `,`** — they lose short-circuit/sequencing behaviour; avoid them.

## Best Practices

- Follow the **principle of least surprise**: operators should mimic built-in behaviour.
- Overload only when it genuinely improves readability (vectors, matrices, money, dates).
- Return references from `[]`, `=`, `+=`; return **values** from `+`, `-`, `*`.
- Implement `!=`, `>`, `<=`, `>=` in terms of `==` and `<` for consistency.
- Make symmetric binary operators free functions, and `const` where they don't mutate.

## Practice Questions

1. Overload `operator+` for a `Money` class (rupees and paise), carrying over correctly.
2. Overload `operator==` and `operator!=` for a `Date` class.
3. Add `operator[]` (read and write) to a simple `String`-like wrapper class.
4. Overload `operator<<` to print a `Student` object's name and roll number.
5. Explain why `operator=` must return a reference and what breaks if it doesn't.

## Multiple Choice Questions (MCQs)

### Q1. `a + b` on class types is rewritten by the compiler as:
- a) `a.add(b)`
- b) `a.operator+(b)` or `operator+(a, b)`
- c) `plus(a, b)`
- d) A direct byte addition

**Answer:** b

### Q2. Which operator can only be overloaded as a member function?
- a) `+`
- b) `==`
- c) `=`
- d) `<<`

**Answer:** c — assignment, `[]`, `()`, `->` are member-only.

### Q3. Why should `operator[]` return a reference?
- a) To be faster
- b) To allow modification like `a[3] = 5;`
- c) To prevent copies
- d) It must not return a reference

**Answer:** b

### Q4. What should `operator+` return for a value-semantics class?
- a) A reference to `*this`
- b) A new value (by value)
- c) `void`
- d) A pointer

**Answer:** b — arithmetic produces a new result without modifying operands.

### Q5. Why is `operator<<` usually a free function?
- a) It must be `static`
- b) The left operand is `std::ostream`, not the class
- c) Free functions are faster
- d) Members cannot take parameters

**Answer:** b

## Key Takeaways

- Operator overloading defines operators for your types as ordinary functions.
- `=`, `[]`, `()`, `->` are member-only; `<<`/`>>` are free functions.
- Return references for mutating/lvalue operators, values for arithmetic.
- Follow least surprise: operators should behave like their built-in counterparts.

## Next Topic

[8.4 Namespaces](lesson-8.4-namespaces.md)
