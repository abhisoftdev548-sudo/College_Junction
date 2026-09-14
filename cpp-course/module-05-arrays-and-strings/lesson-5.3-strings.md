---
module: 5
topic: "5.3"
title: "Strings"
slug: "strings"
difficulty: "Beginner"
prerequisites:
  - Arrays (1D)
  - Data Types
estimated_minutes: 25
tags:
  - strings
  - std-string
  - c-strings
---

# 5.3 Strings

## Overview

A **string** is a sequence of characters. C++ gives you two ways to represent text: **C-style strings** (arrays of `char` ending in a null terminator) and the modern **`std::string`** class, which manages memory for you. For almost all new code you should use `std::string`, but understanding C-strings matters because they still appear in legacy code, file paths, and C APIs.

## Learning Objectives

After this lesson you will be able to:

- Distinguish C-style strings from `std::string`
- Explain the role of the null terminator `'\0'`
- Create, concatenate, and measure `std::string` objects
- Read strings with `cin` and `getline`
- Choose the correct way to compare strings

## Core Concepts

### C-style strings

A C-string is a `char` array terminated by a special character, `'\0'` (null terminator). It marks where the string ends.

```cpp
char name[20] = "Alice";
// memory: 'A' 'l' 'i' 'c' 'e' '\0'  (rest uninitialized)
```

Because they are arrays, you cannot assign or compare them with `=` or `==` (those operate on **addresses**, not contents). They are also fixed-size and prone to buffer overflow.

### std::string

```cpp
#include <string>
#include <iostream>

std::string s1 = "Hello";
std::string s2("World");
std::string s3;                 // empty string

s3 = s1 + " " + s2;             // "Hello World"
s1 += " there";                 // append
std::cout << s1 << "\n";        // "Hello there"
std::cout << s1.length() << "\n"; // 11
```

`std::string` handles allocation, copying, and concatenation automatically. Use `length()` or `size()` (they are identical) to get the number of characters.

### Accessing characters

```cpp
std::string s = "Hello";
std::cout << s[0];   // 'H' — no bounds checking
std::cout << s.at(1); // 'e' — throws std::out_of_range if invalid
```

### Comparison

```cpp
std::string a = "apple", b = "banana";
if (a == b) { /* ... */ }         // compares CONTENTS
if (a < b)  { /* ... */ }         // lexicographic (dictionary) order
int cmp = a.compare(b);           // <0 if a<b, 0 if equal, >0 if a>b
```

### Input

```cpp
std::string word, line;
std::cin >> word;        // reads until whitespace — "hello" from "hello world"
std::getline(std::cin, line); // reads the ENTIRE line, including spaces
```

## Memory Layout (Visual)

```
C-string:  char name[20] = "Alice";

  ┌───┬───┬───┬───┬───┬────┬───┬─ ... ─┐
  │ A │ l │ i │ c │ e │ \0 │ ? │   ?   │
  └───┴───┴───┴───┴───┴────┴───┴─ ... ─┘
   0    1    2    3    4    5     6..19  (uninitialized)

std::string s = "Alice";
  ┌───────────────────────────────┐
  │ dynamic buffer: A l i c e \0  │  length() == 5 (null not counted)
  └───────────────────────────────┘
```

Note that `length()` reports **5** for `"Alice"` — the null terminator exists internally but is not counted.

## Code Examples

### Example 1 — Concatenation and length

```cpp
#include <iostream>
#include <string>

int main() {
    std::string first = "C++";
    std::string second = "Programming";
    std::string full = first + " " + second;
    std::cout << full << " has " << full.length() << " characters\n";
    return 0;
}
// Output: C++ Programming has 15 characters
```

### Example 2 — Reading a full line

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Enter your full name: ";
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "!\n";
    return 0;
}
```

### Example 3 — Iterating and counting vowels

```cpp
std::string s = "Hello World";
int vowels = 0;
for (char c : s) {
    char lower = std::tolower(c);
    if (lower == 'a' || lower == 'e' || lower == 'i' ||
        lower == 'o' || lower == 'u') ++vowels;
}
std::cout << vowels << " vowels\n"; // 3
```

## Common Mistakes

1. **Comparing C-strings with `==`** — `if (name == "Alice")` compares pointer addresses, not text; use `std::string` or `strcmp`.
2. **Forgetting the null terminator** — writing past a `char` buffer causes buffer overflow.
3. **`cin >> s` when a full line is wanted** — it stops at the first space.
4. **`getline` after `cin >>`** — the leftover newline is consumed first, producing an empty line; insert `std::cin.ignore()`.
5. **Forgetting `#include <string>`** — some headers pull it in transitively, so code compiles by luck.
6. **Confusing `length()` with the array size** — `length()` is the number of characters, not the capacity.

## Best Practices

- Use `std::string` by default; reach for C-strings only when a C API demands it.
- Prefer `s.at(i)` for boundary safety, or `s[i]` after verifying `i < s.length()`.
- Pass strings to functions as `const std::string&` to avoid copies (see 5.5).
- Be explicit about input: use `getline` for lines, `cin >>` for single words.

## Practice Questions

1. Write a program that reads a word and prints its **length**.
2. Reverse a string entered by the user and print the result.
3. Count how many times the letter `'a'` (case-insensitive) appears in a given string.
4. Check whether an input string is a **palindrome** (reads the same forwards and backwards, e.g. `"racecar"`).
5. Read the user's first and last name on a single line and print them as `"LAST, First"`.

## Multiple Choice Questions (MCQs)

### Q1. What is the null terminator in C/C++?
- a) `'\n'`
- b) `'\0'`
- c) `"0"`
- d) `NULL`

**Answer:** b — the character with value zero that ends a C-string.

### Q2. What does `std::string s = "abc"; std::cout << s.length();` print?
- a) 2
- b) 3
- c) 4
- d) It depends on the compiler

**Answer:** b — three characters; the terminator is not counted.

### Q3. Which reads a whole line including spaces?
- a) `std::cin >> line;`
- b) `std::getline(std::cin, line);`
- c) `std::cin.get(line);`
- d) `std::readline(line);`

**Answer:** b

### Q4. What does `std::string a = "abc", b = "abc"; if (a == b)` evaluate?
- a) Compile error
- b) Always false (compares addresses)
- c) True — `std::string` compares contents
- d) Undefined behaviour

**Answer:** c

### Q5. For C-style strings, which is the correct way to compare contents?
- a) `s1 == s2`
- b) `s1 = s2`
- c) `strcmp(s1, s2) == 0`
- d) `s1.compare(s2)`

**Answer:** c — `strcmp` from `<cstring>` compares contents; `s1.compare` is for `std::string`.

## Key Takeaways

- C-strings are `char` arrays with a `'\0'` terminator; `std::string` is the modern, safe alternative.
- `std::string` supports `+` concatenation, `==` comparison, and `length()`.
- `cin >>` reads a word; `getline` reads a line (watch for leftover newlines).
- `length()`/`size()` give the character count — the null terminator is not included.

## Next Topic

[5.4 String Operations](lesson-5.4-string-operations.md)
