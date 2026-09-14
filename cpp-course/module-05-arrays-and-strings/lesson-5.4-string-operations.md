---
module: 5
topic: "5.4"
title: "String Operations"
slug: "string-operations"
difficulty: "Beginner"
prerequisites:
  - Strings
  - Loops
estimated_minutes: 30
tags:
  - strings
  - std-string
  - string-manipulation
---

# 5.4 String Operations

## Overview

Now that you can create and read strings, this lesson covers the operations you will use constantly: appending, inserting, erasing, extracting substrings, searching, case conversion, and converting between strings and numbers. Mastering the `std::string` member functions will save you from writing fragile manual character loops.

## Learning Objectives

After this lesson you will be able to:

- Append, insert, erase, and replace parts of a string
- Extract substrings with `substr`
- Search with `find` / `rfind` and handle the `npos` result
- Convert case and convert between strings and numbers
- Avoid the most common `std::string` pitfalls

## Core Concepts

### Size and emptiness

```cpp
std::string s = "abc";
s.size();       // 3 (same as length())
s.empty();      // false
s.clear();      // now empty
```

### Append

```cpp
std::string s = "Hello";
s += " World";      // "Hello World"
s.append("!");      // "Hello World!"
s.push_back('?');   // "Hello World!?"
```

### Insert, erase, replace

```cpp
std::string s = "Hello";
s.insert(5, " C++");    // insert at position 5 → "Hello C++"
s.erase(0, 5);          // erase 5 chars from position 0 → " C++"
s.replace(1, 3, "++");  // replace 3 chars from pos 1 with "++" → " ++"
```

### Substring

```cpp
std::string s = "C++ Programming";
std::string sub = s.substr(4, 11); // start at 4, take 11 chars → "Programming"
std::string tail = s.substr(4);    // from 4 to the end → "Programming"
```

### Search

```cpp
std::string s = "banana";
std::size_t pos = s.find("na");    // 2 (first occurrence)
std::size_t last = s.rfind("na");  // 4 (last occurrence)

if (pos != std::string::npos) { /* found */ }
```

`find` returns `std::string::npos` (a special "not found" value) when the text is absent — always check for it.

### Case conversion

```cpp
#include <cctype>
#include <algorithm>

std::string s = "Hello";
std::transform(s.begin(), s.end(), s.begin(),
               [](unsigned char c) { return std::tolower(c); }); // "hello"
```

Cast to `unsigned char` in the lambda to avoid undefined behaviour with negative `char` values.

### String ↔ number conversion

```cpp
#include <string>

std::string num = std::to_string(42);      // "42"
std::string pi  = std::to_string(3.14);    // "3.140000"

int i  = std::stoi("42");                  // 42
double d = std::stod("3.14");              // 3.14
long l  = std::stol("1000");               // 1000
```

## Visual — Positions and `substr`

```
" C + +   P r o g r a m m i n g "
 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
         ^
         substr(4, 11) → "Programming"
```

Positions are **zero-based character offsets**, and `substr(pos, len)` takes `len` characters starting at `pos`.

## Code Examples

### Example 1 — Count occurrences of a word

```cpp
#include <iostream>
#include <string>

int main() {
    std::string text = "the cat and the hat";
    std::string word = "the";
    int count = 0;
    std::size_t pos = text.find(word);
    while (pos != std::string::npos) {
        ++count;
        pos = text.find(word, pos + 1);
    }
    std::cout << "\"" << word << "\" appears " << count << " times\n";
    return 0;
}
```

### Example 2 — Remove all spaces

```cpp
#include <string>
#include <algorithm>

std::string s = "a b c d";
s.erase(std::remove(s.begin(), s.end(), ' '), s.end()); // "abcd"
```

### Example 3 — Capitalize the first letter of each word

```cpp
std::string s = "hello world";
bool newWord = true;
for (char& c : s) {
    if (std::isspace(static_cast<unsigned char>(c))) { newWord = true; }
    else if (newWord) { c = std::toupper(static_cast<unsigned char>(c)); newWord = false; }
}
// "Hello World"
```

## Common Mistakes

1. **`substr` out of range** — `s.substr(100, 5)` throws `std::out_of_range`; `find` first if the position may be invalid.
2. **Not checking for `npos`** — treating `npos` as a valid index causes wild behaviour.
3. **Off-by-one in `substr`** — `substr(pos, len)` uses **length**, not the end index.
4. **Using `erase`/`insert` while iterating by index** — indices shift and you skip or revisit characters.
5. **`tolower`/`toupper` on `char` directly** — negative `char` values are undefined behaviour; cast to `unsigned char`.
6. **`std::stoi` throwing** — it throws `std::invalid_argument`/`std::out_of_range` on bad input; validate first.

## Best Practices

- Use the standard algorithms (`std::transform`, `std::remove`) instead of hand-written loops.
- Cache `npos` checks in a helper, e.g. a `bool contains(s, sub)` function.
- Prefer `s += x` over `s = s + x` inside loops (avoids extra temporaries).
- Validate input before `stoi`/`stod`, or wrap them in try/catch.

## Practice Questions

1. Extract the file extension from `"report.pdf"` (print `"pdf"`).
2. Count how many times the substring `"is"` occurs in `"this is an island"`.
3. Remove all vowels from a string using `erase` and `remove`.
4. Convert a string of digits to a number, add 10, and print the result back as a string.
5. Write code that checks whether a string **contains** a given substring and prints `"found"` or `"not found"`.

## Multiple Choice Questions (MCQs)

### Q1. What does `std::string("abcdef").substr(2, 3)` return?
- a) `"cde"`
- b) `"bcd"`
- c) `"cd"`
- d) `"def"`

**Answer:** a — start at index 2 (`'c'`), take 3 characters.

### Q2. What does `std::string("hello").find("z")` return?
- a) 0
- b) -1
- c) `std::string::npos`
- d) Throws an exception

**Answer:** c — `npos` signals "not found".

### Q3. Which call converts the string `"123"` to an integer?
- a) `std::to_int("123")`
- b) `std::stoi("123")`
- c) `"123".toInt()`
- d) `(int)"123"`

**Answer:** b

### Q4. What does `std::string s = "abc"; s += "de";` make `s`?
- a) `"abc de"`
- b) `"abcde"`
- c) `"deabc"`
- d) Compile error

**Answer:** b — `+=` appends.

### Q5. Which correctly uppercases every character of `std::string s`?
- a) `s.toUpper();`
- b) `for (char c : s) std::toupper(c);`
- c) `std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c){ return std::toupper(c); });`
- d) `std::upper(s);`

**Answer:** c — options a/b/d do not exist or do not modify `s`.

## Key Takeaways

- `substr(pos, len)` takes a **start position and a length**.
- `find`/`rfind` return `std::string::npos` when nothing is found — always check it.
- `std::to_string` and `std::stoi`/`std::stod` bridge strings and numbers.
- Cast characters to `unsigned char` before `tolower`/`toupper`.

## Next Topic

[5.5 Arrays and Strings as Function Parameters](lesson-5.5-arrays-strings-function-parameters.md)
