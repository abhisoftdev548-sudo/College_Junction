---
module: 2
topic: "2.3"
title: "Input and Output"
slug: "input-and-output"
difficulty: "Beginner"
prerequisites:
  - Variables and Constants
  - Data Types
estimated_minutes: 25
tags:
  - cpp
  - fundamentals
  - io
  - cin
  - cout
---

# 2.3 Input and Output

## Overview

C++ talks to the user through **streams**: `std::cout` for output and `std::cin` for input, both from `<iostream>`. The `<<` operator sends data out, and `>>` reads data in. This lesson covers printing, reading, formatting, and the common input pitfalls.

## Learning Objectives

After this lesson you will be able to:

- Print values and text with `std::cout`
- Read values with `std::cin`
- Read whole lines with `std::getline`
- Format output (precision, width, newlines)
- Avoid the classic `cin` + `getline` mixing bug

## Core Concepts

### Output with cout

```cpp
#include <iostream>

std::cout << "Hello, world!" << "\n";
std::cout << "Age: " << 21 << " and PI: " << 3.14 << "\n";
```

`<<` chains values together; `std::endl` or `"\n"` adds a newline (prefer `"\n"` — `std::endl` also flushes, which is slower).

### Input with cin

```cpp
int age;
std::cout << "Enter your age: ";
std::cin >> age;                // reads an int, skipping whitespace
std::cout << "You are " << age << "\n";
```

`>>` reads the next value of the requested type, skipping leading whitespace.

### Reading multiple values

```cpp
int a, b;
std::cin >> a >> b;             // reads two ints (space/newline separated)
```

### Reading a whole line with getline

```cpp
std::string name;
std::getline(std::cin, name);   // reads everything up to the newline
std::cout << "Hello, " << name << "\n";
```

`std::getline` reads the entire line including spaces — essential for names and sentences.

### The mixing bug (cin then getline)

```cpp
int age;
std::cin >> age;                 // reads the number but LEAVES the newline

std::string name;
std::getline(std::cin, name);    // immediately reads the leftover newline → empty!

// Fix: discard the leftover newline first
std::cin.ignore();               // or: std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
std::getline(std::cin, name);
```

After `>>`, a newline stays in the buffer; the next `getline` consumes it. Call `std::cin.ignore()` in between.

### Formatting output

```cpp
#include <iomanip>

std::cout << std::fixed << std::setprecision(2) << 3.14159;  // "3.14"
std::cout << std::setw(10) << 42;                            // right-aligned in 10 columns
```

`<iomanip>` gives `std::setprecision`, `std::setw`, `std::fixed`, and more.

### Basic error handling

```cpp
int n;
if (std::cin >> n) {
    std::cout << "Read: " << n << "\n";
} else {
    std::cout << "Invalid input!\n";
}
```

`cin >> n` returns the stream, which converts to `false` if reading failed.

## Visual — Streams in C++

```
 Keyboard ──▶ std::cin ──▶ [your program] ──▶ std::cout ──▶ Screen
              (input stream)                  (output stream)

 std::cin >> age;        // data flows IN
 std::cout << age;       // data flows OUT
```

Streams connect your program to the outside world — `>>` pulls data in, `<<` pushes it out.

## Code Examples

### Example 1 — Read and echo

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    int age;

    std::cout << "Name: ";
    std::cin >> name;              // single word
    std::cout << "Age: ";
    std::cin >> age;

    std::cout << "Hello " << name << ", you are " << age << " years old.\n";
    return 0;
}
```

### Example 2 — Full name with getline

```cpp
#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::cout << "Full name: ";
    std::getline(std::cin, fullName);
    std::cout << "Welcome, " << fullName << "!\n";
    return 0;
}
```

### Example 3 — Formatted output

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double price = 19.995;
    std::cout << "Default: " << price << "\n";
    std::cout << "Fixed 2: " << std::fixed << std::setprecision(2) << price << "\n";
    std::cout << "|" << std::setw(8) << 42 << "|\n";   // padding
    return 0;
}
```

## Common Mistakes

1. **Forgetting `#include <iostream>`** — `cin`/`cout` live there.
2. **Forgetting `std::`** — or a `using namespace std;` (which is discouraged in headers).
3. **Mixing `cin >>` and `getline`** without `cin.ignore()`.
4. **Using `>>` for full names** — it stops at the first space; use `getline`.
5. **Using `std::endl` everywhere** — it flushes every time; `"\n"` is usually enough.
6. **Not checking whether input succeeded** — invalid input can leave the stream broken.

## Best Practices

- Prefer `"\n"` over `std::endl` unless you specifically need a flush.
- Use `std::getline` for any text that may contain spaces.
- Call `std::cin.ignore()` after `>>` before `getline`.
- Check `if (cin >> x)` to handle bad input.
- Format output with `<iomanip>` for readability.

## Practice Questions

1. Read two integers and print their sum and product.
2. Read a full name with `getline` and greet the user.
3. Print PI with exactly 2 decimal places.
4. Demonstrate the `cin`+`getline` bug and fix it with `ignore()`.
5. Check whether integer input succeeded and print a message.

## Multiple Choice Questions (MCQs)

### Q1. Output in C++ uses:
- a) `std::cin`
- b) `std::cout`
- c) `printf` (only)
- d) `scanf`

**Answer:** b — `std::cout <<` writes to standard output.

### Q2. To read a line including spaces, use:
- a) `std::cin >> s`
- b) `std::getline(std::cin, s)`
- c) `std::read`
- d) `std::scan`

**Answer:** b — `getline` reads until the newline.

### Q3. `std::setprecision(2)` comes from:
- a) `<iostream>`
- b) `<iomanip>`
- c) `<string>`
- d) `<cmath>`

**Answer:** b — formatting manipulators live in `<iomanip>`.

### Q4. After `cin >> n`, before `getline`, you should call:
- a) `cin.ignore()`
- b) `cin.flush()`
- c) `cin.clear()` only
- d) Nothing

**Answer:** a — `ignore()` discards the leftover newline.

### Q5. `"\n"` vs `std::endl`:
- a) They're identical
- b) `std::endl` also flushes the stream
- c) `"\n"` flushes
- d) `std::endl` is faster

**Answer:** b — `std::endl` = newline + flush; `"\n"` = newline only.

## Key Takeaways

- `std::cout <<` prints; `std::cin >>` reads; `std::getline` reads full lines.
- `>>` stops at whitespace; `getline` reads to the newline.
- Use `cin.ignore()` between `>>` and `getline`.
- Format with `<iomanip>`; prefer `"\n"` over `std::endl`.

## Next Topic

[2.4 Operators](lesson-2.4-operators.md)
