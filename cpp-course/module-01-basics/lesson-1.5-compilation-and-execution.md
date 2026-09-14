---
module: 1
topic: "1.5"
title: "Compilation and Execution"
slug: "compilation-and-execution"
difficulty: "Beginner"
prerequisites:
  - C++ Program Structure
estimated_minutes: 25
tags:
  - cpp
  - compilation
  - execution
---

# 1.5 Compilation and Execution

## Overview

"Compiling and running" a C++ program is actually a **pipeline of stages**: preprocessing, compilation, assembly, and linking. Understanding these stages explains the errors you'll see (syntax errors at compile time, "undefined reference" at link time) and demystifies what the compiler does.

## Learning Objectives

After this lesson you will be able to:

- List the four stages of the C++ build pipeline
- Distinguish compile-time, link-time, and runtime errors
- Explain what object files and linking are
- Compile and run a multi-file program
- Read common error messages

## Core Concepts

### The four stages

```text
source.cpp ──▶ preprocessor ──▶ compiler ──▶ assembler ──▶ linker ──▶ executable
             (#include, macros) (C++ → asm)  (asm → obj)  (objs → exe)
```

1. **Preprocessor** — handles `#include`, `#define`, and removes comments.
2. **Compiler** — translates C++ into assembly (then machine code).
3. **Assembler** — produces an **object file** (`.o`/`.obj`).
4. **Linker** — combines object files and libraries into one **executable**.

### Error types

| Stage | Error | Example |
|---|---|---|
| Compile time | syntax / type errors | missing `;`, unknown name |
| Link time | undefined reference | calling a function you never defined |
| Runtime | logic/behavior errors | wrong output, crash, division by zero |

### The one-command version

```bash
g++ hello.cpp -o hello    # runs all four stages for you
./hello                   # execute the result
```

`g++` is a **driver** — it invokes the preprocessor, compiler, assembler, and linker automatically.

### Multi-file programs

```cpp
// math.cpp
int add(int a, int b) { return a + b; }
```

```cpp
// main.cpp
#include <iostream>
int add(int a, int b);          // declaration (so main.cpp knows it exists)

int main() {
    std::cout << add(2, 3);     // 5
    return 0;
}
```

```bash
g++ main.cpp math.cpp -o app    # compile and link both together
./app                           # 5
```

The linker connects `main.cpp`'s call to `add` with `math.cpp`'s definition.

### What an executable is

The final output is a self-contained binary the OS can load and run directly — no compiler needed on the user's machine (unlike interpreted languages).

## Visual — The Pipeline

```
  hello.cpp ──▶ [preprocessor] ──▶ [compiler] ──▶ [assembler] ──▶ hello.o
                                                                     │
  (library code) ──────────────────────────────────────────────▶ [linker]
                                                                     │
                                                              hello (executable)
```

Source in, one binary out — through four stages, with the linker pulling it all together.

## Code Examples

### Example 1 — Compile a single file

```bash
g++ hello.cpp -o hello
./hello
```

### Example 2 — Multi-file compile

```cpp
// greet.cpp
#include <iostream>

void greet() {
    std::cout << "Hello from another file!\n";
}
```

```cpp
// main.cpp
void greet();          // declaration

int main() {
    greet();           // call — definition lives in greet.cpp
    return 0;
}
```

```bash
g++ main.cpp greet.cpp -o app
./app
# Hello from another file!
```

### Example 3 — See each stage (optional)

```bash
g++ -E hello.cpp -o hello.i    # preprocess only
g++ -S hello.cpp -o hello.s    # compile to assembly
g++ -c hello.cpp -o hello.o    # compile to object file
g++ hello.o -o hello           # link
```

## Common Mistakes

1. **Forgetting to compile after editing** — you keep running the old executable.
2. **Calling a function with no definition** — a link-time "undefined reference" error.
3. **Retyping a function instead of declaring it** — duplicate definitions across files.
4. **Confusing compile and runtime errors** — a program can compile and still crash.
5. **Editing the executable** — you must edit and recompile the source.
6. **Not compiling all `.cpp` files** — every file's definitions must reach the linker.

## Best Practices

- Recompile after every meaningful edit.
- Read the **first** error message first — later errors are often cascading.
- Split code into files as programs grow; declare in headers, define in `.cpp`.
- Keep the pipeline in mind when errors don't make sense at first.

## Practice Questions

1. List the four stages of the C++ build pipeline in order.
2. What kind of error is a missing semicolon, and when is it caught?
3. What does the linker do?
4. Compile and run a two-file program (one file defines a function, the other calls it).
5. Explain why a program can compile successfully yet still produce wrong output.

## Multiple Choice Questions (MCQs)

### Q1. Which stage handles `#include` directives?
- a) Linker
- b) Preprocessor
- c) Assembler
- d) Runtime

**Answer:** b

### Q2. An "undefined reference" error occurs at:
- a) Compile time
- b) Link time
- c) Runtime
- d) Preprocessing

**Answer:** b

### Q3. The linker's job is to:
- a) Check syntax
- b) Combine object files and libraries into an executable
- c) Run the program
- d) Format the code

**Answer:** b

### Q4. `g++ main.cpp math.cpp -o app`:
- a) Runs the program
- b) Compiles and links both files into `app`
- c) Preprocesses only
- d) Creates a library

**Answer:** b

### Q5. After editing your source, you must:
- a) Just run the old executable
- b) Recompile, then run
- c) Delete the executable
- d) Restart the OS

**Answer:** b

## Key Takeaways

- Build pipeline: preprocess → compile → assemble → link → executable.
- Errors come in three flavors: compile-time, link-time, runtime.
- `g++` drives all stages; pass all `.cpp` files when linking.
- Recompile after edits; read the first error message first.

## Module 1 Complete 🎉

You've finished **Module 1 — C++ Basics**. Next up: **Module 2 — C++ Fundamentals: Variables, Data Types, Operators**.
