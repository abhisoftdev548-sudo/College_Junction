---
module: 1
topic: "1.1"
title: "What is Programming"
slug: "what-is-programming"
difficulty: "Beginner"
prerequisites: []
estimated_minutes: 25
tags:
  - cpp
  - basics
  - programming
---

# 1.1 What is Programming

## Overview

**Programming** is the art of writing a precise set of instructions — a **program** — that tells a computer exactly what to do. A **programming language** is the notation you use to write those instructions in a way both humans and machines can understand. C++ is one such language: powerful, fast, and used everywhere from game engines to operating systems.

## Learning Objectives

After this lesson you will be able to:

- Explain what a program and a programming language are
- Distinguish source code from machine code
- Describe the role of a compiler
- Explain why we use high-level languages like C++
- Know where C++ is used in the real world

## Core Concepts

### What is a program?

A **program** is a sequence of instructions a computer executes. Writing those instructions is **programming** (or coding). The person who writes them is a **programmer**.

### Source code → machine code

```text
Source code (what you write)  --compiler-->  Machine code (what the CPU runs)
```

- **Source code** — human-readable instructions in a programming language.
- **Compiler** — a program that translates source code into machine code.
- **Machine code** — binary instructions the processor executes directly.

### Why high-level languages?

```text
  High-level (C++):   std::cout << "Hello";
        │  compiler
        ▼
  Machine code:       10110000 01100001 ... (binary)
```

High-level languages let you write readable logic (`if`, loops, functions) instead of raw binary or assembly. The compiler handles the translation.

### Where C++ is used

- Game engines and graphics (Unreal Engine)
- Operating systems and drivers (Windows, Linux components)
- Browsers (Chrome, Firefox)
- Databases, finance/trading systems, embedded devices
- Scientific computing and AI frameworks

### The programming mindset

Programming is **problem solving**: break a task into steps a computer can execute. Syntax is just the tool; clear thinking is the skill.

## Visual — From Idea to Running Program

```
  Problem ──▶ Algorithm (steps) ──▶ Source code ──▶ compiler ──▶ program
   (idea)       (plan)               (C++ text)                   (runs)
```

The hard part is the middle: turning an idea into precise, ordered steps.

## Code Examples

### Example 1 — A tiny C++ program

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!";
    return 0;
}
```

### Example 2 — A program with input and output

```cpp
#include <iostream>

int main() {
    int age;
    std::cout << "Enter your age: ";
    std::cin >> age;
    std::cout << "You are " << age << " years old.\n";
    return 0;
}
```

### Example 3 — A program that computes

```cpp
#include <iostream>

int main() {
    int a = 7, b = 3;
    std::cout << "Sum: " << a + b << "\n";
    return 0;
}
```

## Common Mistakes

1. **Thinking you must memorize everything** — you learn by writing code, not reading.
2. **Skipping the plan** — coding without an algorithm leads to confusion.
3. **Expecting a computer to "understand" intent** — it does exactly what you say, not what you mean.
4. **Confusing a compiler with an editor** — the editor edits text; the compiler translates it.
5. **Ignoring error messages** — they tell you *where* and often *why*.
6. **Rushing to advanced topics** — strong basics make everything else easy.

## Best Practices

- Write and run small programs constantly — typing beats watching.
- Read every compiler error fully before changing anything.
- Break problems into the smallest possible steps.
- Keep a notebook of concepts and examples.
- Be patient: programming is a skill built by repetition.

## Practice Questions

1. In your own words, what is a program?
2. Explain the difference between source code and machine code.
3. What is the job of a compiler?
4. Name three real-world areas where C++ is used.
5. Describe the steps you'd take to go from a problem idea to a running program.

## Multiple Choice Questions (MCQs)

### Q1. A program is:
- a) A computer's memory
- b) A set of instructions for a computer
- c) A hardware component
- d) A programming language

**Answer:** b

### Q2. The program that translates source code into machine code is a:
- a) Debugger
- b) Compiler
- c) Text editor
- d) Browser

**Answer:** b

### Q3. Source code is written:
- a) In binary
- b) In a human-readable programming language
- c) Only in assembly
- d) In machine code

**Answer:** b

### Q4. C++ is a:
- a) Low-level-only language
- b) High-level language
- c) Database
- d) Web browser

**Answer:** b

### Q5. The most important programming skill is:
- a) Typing speed
- b) Problem solving (breaking tasks into steps)
- c) Memorizing syntax
- d) Using many tools

**Answer:** b

## Key Takeaways

- Programming = writing instructions; a compiler translates them to machine code.
- High-level languages like C++ are readable and portable.
- C++ powers games, systems, browsers, finance, and more.
- The real skill is decomposing problems into precise steps.

## Next Topic

[1.2 Introduction to C++](lesson-1.2-introduction-to-cpp.md)
