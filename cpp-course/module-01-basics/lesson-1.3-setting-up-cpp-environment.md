---
module: 1
topic: "1.3"
title: "Setting Up C++ Environment"
slug: "setting-up-cpp-environment"
difficulty: "Beginner"
prerequisites:
  - Introduction to C++
estimated_minutes: 25
tags:
  - cpp
  - setup
  - compiler
---

# 1.3 Setting Up C++ Environment

## Overview

To write and run C++ you need two things: a **text editor** (or IDE) to write code, and a **compiler** to turn it into an executable. This lesson shows you how to install a compiler, choose an editor/IDE, and run your first program from the terminal or the IDE.

## Learning Objectives

After this lesson you will be able to:

- Install a C++ compiler on your system
- Choose an editor or IDE
- Compile and run a program from the terminal
- Understand the role of build tools
- Troubleshoot "command not found" errors

## Core Concepts

### Compilers

| Platform | Common compiler | Command |
|---|---|---|
| Linux | GCC (g++) | `g++` |
| macOS | Clang (or GCC via Xcode tools) | `clang++` / `g++` |
| Windows | MinGW-w64 (g++), MSVC (`cl`) | `g++` / `cl` |

Install one and verify:

```bash
g++ --version      # or clang++ --version
```

### Editors and IDEs

- **VS Code** — lightweight editor with C++ extensions (great for beginners).
- **Visual Studio** — full IDE on Windows.
- **CLion** — powerful (paid) JetBrains IDE.
- **Code::Blocks / Dev-C++** — simple beginner IDEs.

An **IDE** combines editor, compiler, and debugger; a plain **editor** needs you to run the compiler yourself.

### Compiling and running (terminal)

```bash
g++ hello.cpp -o hello    # compile hello.cpp → executable named "hello"
./hello                   # run it (Windows: hello.exe)
```

- `g++` — the compiler.
- `hello.cpp` — your source file.
- `-o hello` — name the output executable.
- `./hello` — execute it.

### The full pipeline

```text
hello.cpp ──(preprocess)──▶ ──(compile)──▶ object file ──(link)──▶ executable
```

The compiler actually runs several stages (preprocessing, compiling, assembling, linking) — `g++` hides them behind one command.

### Build systems (for later)

For real projects you'll use a build system like **CMake** or **Make** to manage many files, libraries, and flags. For learning, a single `g++` command is enough.

## Visual — Write, Compile, Run

```
  editor/IDE            terminal
  ┌───────────┐        g++ hello.cpp -o hello
  │ hello.cpp │ ─────▶ ./hello  ──▶ "Hello, World!"
  └───────────┘
   (you write)    (compile)   (run)
```

Write the source, compile it into an executable, then run the executable.

## Code Examples

### Example 1 — Compile and run from the terminal

```cpp
// hello.cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    return 0;
}
```

```bash
g++ hello.cpp -o hello
./hello
# Hello, World!
```

### Example 2 — Compile with warnings enabled

```bash
g++ -Wall -Wextra hello.cpp -o hello   # show more warnings
```

### Example 3 — Choose a C++ standard

```bash
g++ -std=c++17 hello.cpp -o hello      # use the C++17 standard
```

## Common Mistakes

1. **Compiler not installed** — "`g++` command not found"; install GCC/MinGW/Clang.
2. **Forgetting to compile before running** — editing `.cpp` doesn't update the executable.
3. **Wrong file extension** — save as `.cpp`, not `.txt`.
4. **Running the source** — `./hello.cpp` won't work; run the compiled `hello`.
5. **Editor saves with formatting** — word processors corrupt code; use a plain-text editor.
6. **Old standard** — modern code (C++11+) needs `-std=c++17` (or newer) on some setups.

## Best Practices

- Install a recent compiler and target a recent standard (`-std=c++17`).
- Start with the terminal to learn what the IDE is doing under the hood.
- Always compile with `-Wall -Wextra` and fix the warnings.
- Use a simple editor first; move to an IDE for bigger projects.

## Practice Questions

1. What command compiles `hello.cpp` into an executable named `hello`?
2. Why does the file need a `.cpp` extension?
3. What do `-Wall` and `-std=c++17` do?
4. Name two IDEs and one plain editor suitable for C++.
5. Describe the stages from source file to running executable.

## Multiple Choice Questions (MCQs)

### Q1. Which command compiles a C++ file with GCC?
- a) `gcc hello.cpp`
- b) `g++ hello.cpp`
- c) `java hello.cpp`
- d) `make hello`

**Answer:** b

### Q2. `-o hello` in `g++ hello.cpp -o hello`:
- a) Enables warnings
- b) Names the output executable
- c) Sets the standard
- d) Opens the file

**Answer:** b

### Q3. Which is a full IDE for C++?
- a) Notepad
- b) Visual Studio
- c) Terminal
- d) A browser

**Answer:** b

### Q4. C++ source files use the extension:
- a) `.c`
- b) `.cpp`
- c) `.exe`
- d) `.obj`

**Answer:** b

### Q5. `-std=c++17` tells the compiler to:
- a) Run the program
- b) Use the C++17 standard
- c) Enable debugging
- d) Optimize for speed

**Answer:** b

## Key Takeaways

- You need a compiler (g++/clang++/MSVC) and an editor or IDE.
- Compile with `g++ file.cpp -o name`, then run `./name`.
- Enable warnings (`-Wall -Wextra`) and pick a standard (`-std=c++17`).
- Learn the terminal flow before relying on an IDE.

## Next Topic

[1.4 C++ Program Structure](lesson-1.4-cpp-program-structure.md)
