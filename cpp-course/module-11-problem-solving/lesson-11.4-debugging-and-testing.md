---
module: 11
topic: "11.4"
title: "Debugging and Testing"
slug: "debugging-and-testing"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Problem-Solving Approaches
estimated_minutes: 30
tags:
  - debugging
  - testing
  - assertions
---

# 11.4 Debugging and Testing

## Overview

Writing code is half the job — **finding and preventing bugs** is the other half. This lesson teaches systematic debugging (reproduce, isolate, understand, fix) and lightweight testing techniques (`assert`, print-based tracing, and small test functions) that catch errors early and cheaply. The best bug is the one that never ships.

## Learning Objectives

After this lesson you will be able to:

- Follow a systematic debugging process
- Use `assert` and print tracing to locate bugs
- Write small test functions for your code
- Explain the difference between logic errors, memory errors, and undefined behaviour
- Use compiler warnings and sanitizers to catch bugs early

## Core Concepts

### The debugging process

1. **Reproduce** — get a reliable failing input (smallest possible).
2. **Isolate** — narrow down *where* the wrong value first appears.
3. **Understand** — explain the actual behaviour vs expected; find the root cause.
4. **Fix** — correct the cause (not the symptom) and re-run all tests.

### assert — encode expectations

```cpp
#include <cassert>

int divide(int a, int b) {
    assert(b != 0 && "division by zero");   // fails loudly in debug builds
    return a / b;
}
```

`assert(condition)` aborts the program with the file and line if the condition is false. It compiles away in release builds (`NDEBUG`) — use it for **invariants**, not user-input validation.

### Print tracing

```cpp
for (int i = 0; i < n; ++i) {
    std::cerr << "i=" << i << " value=" << a[i] << "\n";  // see what's happening
    // ...
}
```

Temporary `std::cerr` prints reveal control flow and values. Delete them (or use a debugger/breakpoints) once found.

### Small test functions

```cpp
void testMax() {
    assert(maxOf(3, 5) == 5);
    assert(maxOf(5, 3) == 5);
    assert(maxOf(7, 7) == 7);
    std::cout << "testMax passed\n";
}

int main() {
    testMax();
    // ... real program
}
```

Write a tiny test per function; run them whenever you change code (a poor man's unit test).

### The three bug families

| Kind | Example | Symptom |
|---|---|---|
| Logic error | `i <= n` instead of `i < n` | wrong output |
| Memory error | use-after-free, buffer overflow | crash, garbage |
| Undefined behaviour | signed overflow, uninitialized read | anything — worst kind |

### Compiler warnings and sanitizers

```bash
g++ -Wall -Wextra -fsanitize=address,undefined program.cpp -o program
./program
```

- `-Wall -Wextra` — more warnings, treat them as errors.
- `-fsanitize=address` — detects out-of-bounds, use-after-free, leaks.
- `-fsanitize=undefined` — detects signed overflow, bad shifts, etc.

Sanitizers catch whole classes of memory bugs that print-based debugging can't.

## Visual — The Debugging Loop

```
  fails ──▶ Reproduce ──▶ Isolate ──▶ Understand ──▶ Fix
    ▲                                                    │
    └────────────── still fails? ────────────────────────┘

  Each iteration should shrink the problem:
  Reproduce → smallest failing input
  Isolate   → first wrong value / line
  Understand → root cause (why)
  Fix       → correct the cause, not the symptom
```

A systematic loop beats random trial-and-error every time.

## Code Examples

### Example 1 — assert for invariants

```cpp
#include <cassert>
#include <vector>

int& get(std::vector<int>& v, std::size_t i) {
    assert(i < v.size() && "index out of range");
    return v[i];
}

int main() {
    std::vector<int> v = {1, 2, 3};
    get(v, 5) = 0;   // assertion fails here with a clear message
}
```

### Example 2 — Test a function with asserts

```cpp
#include <cassert>
#include <string>

bool isPalindrome(const std::string& s) {
    int i = 0, j = (int)s.size() - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        ++i; --j;
    }
    return true;
}

void testPalindrome() {
    assert(isPalindrome("racecar") == true);
    assert(isPalindrome("hello") == false);
    assert(isPalindrome("a") == true);
    assert(isPalindrome("") == true);
    std::cout << "palindrome tests passed\n";
}
```

### Example 3 — Use sanitizers to catch a real bug

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    int* p = &v[1];
    v.push_back(4);        // reallocation invalidates p!
    std::cout << *p;       // use-after-free / stale pointer
    // Compile with -fsanitize=address to get a precise report here.
}
```

## Common Mistakes

1. **Fixing the symptom** — patching the observed value instead of the root cause.
2. **Not reproducing reliably** — debugging a bug you can't trigger.
3. **Random changes** — tweaking code hoping it works, without understanding why.
4. **Leaving debug prints in production** — noisy output; remove after use.
5. **Ignoring warnings** — many "mysterious" bugs are already flagged by the compiler.
6. **Testing only the happy path** — edge cases are where bugs live.

## Best Practices

- Write the test *before* or alongside the function, not after it's "done."
- Use `assert` for internal invariants; handle user input separately.
- Treat compiler warnings as errors (`-Werror`).
- Run under sanitizers during development for memory-heavy code.
- Make failing inputs as small as possible — the bug usually surfaces then.

## Practice Questions

1. Add `assert` checks to a function that indexes an array.
2. Write test functions (with asserts) for `digitSum` and `isPalindrome`.
3. Find the bug in a loop with `i <= n` off-by-one using a trace print, then fix it.
4. Explain the difference between a logic error and undefined behaviour with examples.
5. Write a small program with an out-of-bounds access and describe what `-fsanitize=address` would report.

## Multiple Choice Questions (MCQs)

### Q1. The first step in debugging is:
- a) Fix the bug
- b) Reproduce it reliably
- c) Rewrite the code
- d) Add comments

**Answer:** b

### Q2. `assert(cond)`:
- a) Always runs, even in release
- b) Aborts if `cond` is false (in debug builds)
- c) Prints a warning only
- d) Catches exceptions

**Answer:** b

### Q3. AddressSanitizer (`-fsanitize=address`) detects:
- a) Syntax errors
- b) Out-of-bounds access and use-after-free
- c) Slow code
- d) Missing comments

**Answer:** b

### Q4. Treating compiler warnings as errors helps because:
- a) It makes code slower
- b) Many bugs are already flagged by warnings
- c) Warnings are always wrong
- d) It removes all bugs

**Answer:** b

### Q5. The best bug fix targets:
- a) The symptom
- b) The root cause
- c) A random line
- d) The output format

**Answer:** b

## Key Takeaways

- Debug systematically: reproduce → isolate → understand → fix (root cause).
- `assert` encodes invariants; print tracing reveals flow; sanitizers catch memory bugs.
- Small test functions catch regressions cheaply.
- Treat warnings as errors and run sanitizers in development.

## Next Topic

[11.5 Competitive Programming Tips](lesson-11.5-competitive-programming-tips.md)
