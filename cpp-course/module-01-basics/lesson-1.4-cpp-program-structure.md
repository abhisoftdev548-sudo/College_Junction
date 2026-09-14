---
module: 1
topic: "1.4"
title: "C++ Program Structure"
slug: "cpp-program-structure"
difficulty: "Beginner"
prerequisites:
  - Setting Up C++ Environment
estimated_minutes: 25
tags:
  - cpp
  - basics
  - structure
---

# 1.4 C++ Program Structure

## Overview

Every C++ program has a predictable skeleton: `#include` directives, a `main` function, and statements that run top-to-bottom. Understanding this skeleton — and what each part means — is the foundation for writing anything bigger.

## Learning Objectives

After this lesson you will be able to:

- Identify the parts of a C++ program
- Explain `#include`, `main`, and `return`
- Use `std::cout` and `std::cin`
- Write comments of all three kinds
- Follow consistent formatting

## Core Concepts

### The minimal program

```cpp
#include <iostream>      // bring in input/output tools

int main() {             // the entry point — where execution starts
    std::cout << "Hello";// print to the console
    return 0;            // tell the OS "success"
}
```

### Line-by-line anatomy

- `#include <iostream>` — a **preprocessor directive** that pulls in the standard I/O header so `std::cout`/`std::cin` exist.
- `int main()` — the function the OS calls first; every program needs exactly one.
- `{ ... }` — the function body; statements run top-to-bottom.
- `std::cout << "Hello";` — prints text (`std::` means "from the standard namespace").
- `return 0;` — returns 0 to indicate success (non-zero = error).

### Comments

```cpp
// single-line comment

/* multi-line
   comment */

/// documentation-style comment
```

### Statements and blocks

```cpp
{
    int x = 5;            // statement — ends with ;
    int y = x + 1;        // another statement
}                         // block — grouped statements
```

### Whitespace and formatting

C++ mostly ignores whitespace, but consistent formatting makes code readable:

```cpp
int main() {
    std::cout << "Line 1\n";
    std::cout << "Line 2\n";
    return 0;
}
```

Use `\n` (or `std::endl`) for newlines.

## Visual — Anatomy of a Program

```
  #include <iostream>      ← preprocessor: brings in std::cout/cin

  int main() {             ← entry point (the OS calls this)
      std::cout << "Hi";   ← statement: print
      return 0;            ← return success
  }

  execution: main() → statements top-to-bottom → return 0
```

## Code Examples

### Example 1 — Print with newlines

```cpp
#include <iostream>

int main() {
    std::cout << "First line\n";
    std::cout << "Second line\n";
    return 0;
}
```

### Example 2 — Read a number and respond

```cpp
#include <iostream>

int main() {
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age;                      // read input
    std::cout << "You entered " << age << ".\n";
    return 0;
}
```

### Example 3 — Comments in action

```cpp
#include <iostream>

// Program: greets the user by name
int main() {
    std::string name;                     // store the user's name
    std::cout << "Name? ";
    std::cin >> name;
    std::cout << "Hello, " << name << "!\n";   // greet them
    return 0;
}
```

## Common Mistakes

1. **Forgetting `#include <iostream>`** — `std::cout` won't be declared.
2. **Missing `int main()`** — there's no entry point; the program won't link.
3. **Forgetting semicolons** — each statement needs `;`.
4. **Mismatched braces** — every `{` needs a matching `}`.
5. **Forgetting `std::`** — `cout` alone isn't defined (unless `using namespace std;`, which is discouraged).
6. **`return 0;` inside `main` is fine to omit** (implicit 0), but writing it is clearer.

## Best Practices

- Always start from the standard skeleton.
- Indent consistently (4 spaces per level).
- Use `\n` for newlines inside strings (or `std::endl` when flushing matters).
- Avoid `using namespace std;` in headers and large programs — keep `std::` explicit.
- One statement per line for readability.

## Practice Questions

1. Write a program that prints your name and age on separate lines.
2. Explain what each part of `int main() { ... return 0; }` does.
3. Read two integers and print their sum.
4. What happens if you forget `#include <iostream>`?
5. Add a multi-line comment to a program explaining what it does.

## Multiple Choice Questions (MCQs)

### Q1. Execution of a C++ program begins at:
- a) The first line
- b) The `main` function
- c) The last function
- d) The `#include` line

**Answer:** b

### Q2. `#include <iostream>` is needed to use:
- a) Comments
- b) `std::cout` and `std::cin`
- c) Variables
- d) Braces

**Answer:** b

### Q3. `return 0;` from `main` indicates:
- a) An error
- b) Success
- c) Nothing
- d) A warning

**Answer:** b

### Q4. A single-line comment starts with:
- a) `/*`
- b) `//`
- c) `#`
- d) `--`

**Answer:** b

### Q5. Every C++ statement ends with:
- a) A period
- b) A colon
- c) A semicolon
- d) A brace

**Answer:** c

## Key Takeaways

- Structure: `#include` → `int main()` → statements → `return 0;`.
- `main` is the entry point; `std::cout`/`std::cin` handle output/input.
- Statements end with `;`, blocks use `{}`, comments use `//`, `/* */`, `///`.
- Formatting and `std::` prefixes keep code clear and safe.

## Next Topic

[1.5 Compilation and Execution](lesson-1.5-compilation-and-execution.md)
