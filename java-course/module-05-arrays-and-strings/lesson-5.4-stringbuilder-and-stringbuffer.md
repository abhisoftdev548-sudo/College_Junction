---
module: 5
topic: "5.4"
title: "StringBuilder and StringBuffer"
slug: "stringbuilder-and-stringbuffer"
difficulty: "Beginner"
prerequisites:
  - The String Class
estimated_minutes: 25
tags:
  - java
  - stringbuilder
  - stringbuffer
  - performance
---

# 5.4 StringBuilder and StringBuffer

## Overview

Because `String` is immutable, `s = s + "x"` in a loop creates a new string every iteration — O(n²) and wasteful. **`StringBuilder`** (and its thread-safe sibling **`StringBuffer`**) are **mutable** string buffers that build strings efficiently. This lesson shows how to use them and why they matter for performance.

## Learning Objectives

After this lesson you will be able to:

- Explain why string concatenation in loops is slow
- Build strings with `StringBuilder` (`append`, `insert`, `reverse`)
- Distinguish `StringBuilder` (fast, not thread-safe) from `StringBuffer` (thread-safe)
- Convert between `String` and `StringBuilder`
- Choose the right tool for string building

## Core Concepts

### The problem with + in loops

```java
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;        // creates a NEW String every iteration — slow
}
```

Each `+=` copies the entire accumulated string — O(n²) total.

### StringBuilder to the rescue

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);       // mutates the buffer in place — fast
}
String result = sb.toString();
```

`StringBuilder` grows an internal buffer and mutates it — O(n) total.

### Common methods

```java
StringBuilder sb = new StringBuilder("Hello");

sb.append(" World");        // "Hello World"
sb.append(42);              // appends "42"
sb.insert(5, ",");          // insert at index 5
sb.reverse();               // reverses the whole buffer
sb.delete(0, 5);            // delete chars 0..4
sb.replace(0, 5, "Hi");     // replace a range
sb.charAt(0);               // read a char
sb.length();                // current length
String s = sb.toString();   // convert to an immutable String
```

Methods return the **same** `StringBuilder`, so calls can be **chained**:

```java
String s = new StringBuilder()
    .append("Hello")
    .append(" World")
    .toString();            // "Hello World"
```

### StringBuilder vs StringBuffer

| | StringBuilder | StringBuffer |
|---|---|---|
| Thread-safe | No | Yes (synchronized) |
| Speed | Fast | Slower |
| Introduced | Java 5 | Java 1.0 |
| Use case | Single-threaded (default) | Multi-threaded legacy code |

For almost all code, **use `StringBuilder`** — it's faster, and thread-safety is rarely needed in string building.

### Reverse a string idiom

```java
String reversed = new StringBuilder("hello").reverse().toString(); // "olleh"
```

This is the standard way to reverse a string (no built-in `String.reverse`).

## Visual — StringBuilder vs String Concatenation

```
 String s = "";  s += "a";  s += "b";  s += "c";
   each += copies the WHOLE string → O(n²)

 StringBuilder sb;  sb.append("a"); sb.append("b"); sb.append("c");
   appends into one growing buffer → O(n)
```

One mutable buffer beats repeated copying when building strings piece by piece.

## Code Examples

### Example 1 — Build a CSV line

```java
public class BuildCSV {
    public static void main(String[] args) {
        String[] fields = {"Ankit", "21", "8.9"};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < fields.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(fields[i]);
        }
        System.out.println(sb.toString());   // Ankit,21,8.9
    }
}
```

### Example 2 — Reverse and check palindrome

```java
public class Palindrome {
    public static boolean isPalindrome(String s) {
        String clean = s.toLowerCase();
        return clean.equals(new StringBuilder(clean).reverse().toString());
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));   // true
        System.out.println(isPalindrome("hello"));     // false
    }
}
```

### Example 3 — Method chaining

```java
public class Chain {
    public static void main(String[] args) {
        String s = new StringBuilder()
            .append("Score: ")
            .append(95)
            .append(" (")
            .append('A')
            .append(')')
            .toString();
        System.out.println(s);   // Score: 95 (A)
    }
}
```

## Common Mistakes

1. **Using `+` in loops** — O(n²); use `StringBuilder`.
2. **Expecting `StringBuilder` to be a `String`** — call `.toString()` to convert.
3. **Using `StringBuffer` unnecessarily** — it's slower; `StringBuilder` is the default.
4. **Comparing two `StringBuilder`s with `equals`** — it compares references; convert to `String` first.
5. **Forgetting to append the separator** — build CSV/joins with the `if (i > 0)` pattern.
6. **Confusing `delete(start, end)` bounds** — end is exclusive, like `substring`.

## Best Practices

- Use `StringBuilder` for any string built in a loop or piecewise.
- Use plain `+` for a few simple concatenations (the compiler optimizes them).
- Chain `append` calls for readability.
- Convert with `.toString()` when the string is final.
- Prefer `String.join` for joining existing collections — it's cleaner than manual appending.

## Practice Questions

1. Build the string `"1+2+3+...+100"` efficiently with `StringBuilder`.
2. Reverse a string with `StringBuilder` and print it.
3. Explain why `result += i` in a loop is slow and show the fix.
4. Use `StringBuilder` to format a small table row (name, roll, gpa).
5. Compare `StringBuilder` and `StringBuffer` — which is faster and why?

## Multiple Choice Questions (MCQs)

### Q1. `StringBuilder` is used to:
- a) Store immutable text
- b) Build strings efficiently (mutable buffer)
- c) Parse numbers
- d) Sort strings

**Answer:** b

### Q2. `StringBuilder` vs `String` — which is mutable?
- a) `String`
- b) `StringBuilder`
- c) Both
- d) Neither

**Answer:** b

### Q3. To get a `String` from a `StringBuilder`, call:
- a) `.value()`
- b) `.toString()`
- c) `.string()`
- d) `.get()`

**Answer:** b

### Q4. `StringBuffer` differs from `StringBuilder` by being:
- a) Faster
- b) Thread-safe (synchronized)
- c) Immutable
- d) Newer

**Answer:** b

### Q5. Reversing a string is commonly done with:
- a) `String.reverse()`
- b) `new StringBuilder(s).reverse().toString()`
- c) `s.reversed()`
- d) `Arrays.reverse(s)`

**Answer:** b

## Key Takeaways

- `StringBuilder` = mutable string buffer — O(n) for building, vs O(n²) for `+` in loops.
- Methods chain; convert with `.toString()`; reverse with `.reverse()`.
- `StringBuffer` is the thread-safe (slower) sibling — prefer `StringBuilder`.
- Use `String.join` for existing collections, `StringBuilder` for piecewise building.

## Next Topic

[5.5 Arrays and Strings in Methods](lesson-5.5-arrays-strings-in-methods.md)
