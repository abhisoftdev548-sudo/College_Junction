---
module: 8
topic: "8.5"
title: "File I/O"
slug: "file-io"
difficulty: "Advanced"
prerequisites:
  - Strings
  - Loops
  - Input and Output
estimated_minutes: 30
tags:
  - file-io
  - fstream
  - streams
---

# 8.5 File I/O

## Overview

Programs often need to read from and write to **files** — configuration, logs, data, and text. C++ provides file streams in `<fstream>`: `ifstream` for reading, `ofstream` for writing, and `fstream` for both. They behave like `cin`/`cout`, so everything you know about streams carries over.

## Learning Objectives

After this lesson you will be able to:

- Open, read from, and close files with `ifstream`
- Write to files with `ofstream`
- Check whether a file opened successfully
- Read line-by-line with `getline` and word-by-word with `>>`
- Use append mode and handle missing files gracefully

## Core Concepts

### Writing to a file (ofstream)

```cpp
#include <fstream>

std::ofstream out("data.txt");     // opens for writing (truncates existing)
if (!out) {
    std::cerr << "Could not open file\n";
    return 1;
}
out << "Hello, file!\n";
out << 42 << " " << 3.14 << "\n";
out.close();                       // explicit close (optional — destructor does it)
```

By default `ofstream` **truncates** the file. Use `std::ios::app` to append.

### Reading from a file (ifstream)

```cpp
#include <fstream>
#include <iostream>
#include <string>

std::ifstream in("data.txt");
if (!in) {
    std::cerr << "Could not open file\n";
    return 1;
}

std::string line;
while (std::getline(in, line)) {   // read line by line until EOF
    std::cout << line << "\n";
}
```

`getline` returns the stream, which converts to `false` at end-of-file — the idiomatic loop condition.

### Reading word-by-word and values

```cpp
int n;
double d;
in >> n >> d;                 // reads two whitespace-separated values
```

`>>` skips whitespace and parses typed values, just like with `cin`.

### Opening modes

```cpp
std::ofstream app("log.txt", std::ios::app);     // append
std::ifstream in("data.txt", std::ios::in);      // read (default)
std::fstream io("data.txt", std::ios::in | std::ios::out); // read+write
```

Combine modes with `|`. Common ones: `in`, `out`, `app` (append), `binary`, `trunc`.

### The state of a stream

```cpp
if (in.fail())  { /* last operation failed */ }
if (in.eof())   { /* reached end of file */ }
if (in.good())  { /* stream is usable */ }
```

Check `if (!in)` (or `in.fail()`) after opening and after critical reads.

## Visual — Streams as Pipes

```
   program                file
  ┌─────────┐           ┌──────────┐
  │         │  ofstream │          │
  │   out ──┼──────────▶│ data.txt │   (writing)
  │         │           │          │
  └─────────┘           └──────────┘

  ┌─────────┐           ┌──────────┐
  │  in  ◀──┼───────────┤ data.txt │   (reading)
  │         │  ifstream │          │
  └─────────┘           └──────────┘
```

File streams connect your program to a file the same way `cout`/`cin` connect to the console.

## Code Examples

### Example 1 — Write numbers 1–10 to a file

```cpp
#include <fstream>

int main() {
    std::ofstream out("numbers.txt");
    if (!out) return 1;

    for (int i = 1; i <= 10; ++i) {
        out << i << "\n";
    }
    return 0;   // destructor closes the file
}
```

### Example 2 — Read and sum numbers from a file

```cpp
#include <fstream>
#include <iostream>

int main() {
    std::ifstream in("numbers.txt");
    if (!in) return 1;

    int value, sum = 0;
    while (in >> value) {     // reads until a non-int or EOF
        sum += value;
    }
    std::cout << "Sum = " << sum << "\n";   // 55
    return 0;
}
```

### Example 3 — Append a log line

```cpp
#include <fstream>
#include <string>

void log(const std::string& message) {
    std::ofstream out("app.log", std::ios::app);   // append mode
    if (out) out << message << "\n";
}

int main() {
    log("started");
    log("processing");
    log("done");
}
```

## Common Mistakes

1. **Not checking `if (!file)`** — reading/writing a failed stream silently does nothing.
2. **Truncating by accident** — reopening with `ofstream` wipes existing content; use `std::ios::app` to append.
3. **Testing `eof()` in the loop condition** — `while (!in.eof())` reads one extra (bad) iteration; loop on the read itself.
4. **Mixing `>>` and `getline`** — `>>` leaves the newline, so the next `getline` reads an empty line; use `in.ignore()`.
5. **Forgetting to close before re-opening** — or forgetting the destructor closes it anyway.
6. **Hardcoding paths** — relative paths depend on the working directory; be explicit.

## Best Practices

- Always check the stream after opening (`if (!in)`) and after important reads.
- Loop on the read operation (`while (in >> x)`, `while (std::getline(in, line))`), not on `eof()`.
- Use `std::ios::app` to append; be deliberate about truncation.
- Prefer `std::filesystem` (C++17) for path manipulation and existence checks.
- Keep file processing in small, testable functions; pass streams by reference.

## Practice Questions

1. Write a program that writes your name and age to a file, then reads them back and prints them.
2. Read a text file line by line and print each line with its line number.
3. Count the number of words in a file by reading with `>>`.
4. Append three log messages to a file using `std::ios::app`, then print the file's contents.
5. Read integers from a file and print their average; handle a missing file gracefully with an error message.

## Multiple Choice Questions (MCQs)

### Q1. Which class reads from a file?
- a) `ofstream`
- b) `ifstream`
- c) `ostream`
- d) `iostream`

**Answer:** b — "i" = input, "o" = output, "f" = file.

### Q2. What does opening a file with `std::ofstream out("f.txt")` do to existing content?
- a) Appends to it
- b) Truncates (clears) it
- c) Reads it
- d) Leaves it unchanged

**Answer:** b — default `ofstream` mode truncates.

### Q3. Which is the correct read-until-EOF loop?
- a) `while (!in.eof()) { in >> x; }`
- b) `while (in >> x) { ... }`
- c) `while (in) { x = in; }`
- d) `do { in >> x; } while (in);`

**Answer:** b — loop on the read itself.

### Q4. To append to a file, open with:
- a) `std::ios::trunc`
- b) `std::ios::app`
- c) `std::ios::in`
- d) `std::ios::binary`

**Answer:** b

### Q5. After a failed open, the correct check is:
- a) `if (in == nullptr)`
- b) `if (!in)`
- c) `if (in.eof())`
- d) `if (in.close())`

**Answer:** b — the stream converts to `false` on failure.

## Key Takeaways

- `ifstream` reads, `ofstream` writes; both live in `<fstream>`.
- Check `if (!file)` after opening; loop on the read, not on `eof()`.
- Default `ofstream` truncates; use `std::ios::app` to append.
- `getline` reads lines; `>>` reads whitespace-separated tokens.

## Module 8 Complete 🎉

You've finished **Module 8 — Advanced C++**. Next up: **Module 9 — Modern C++**.
