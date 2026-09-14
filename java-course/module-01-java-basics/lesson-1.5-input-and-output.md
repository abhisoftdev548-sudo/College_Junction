---
module: 1
topic: "1.5"
title: "Input and Output"
slug: "input-and-output"
difficulty: "Beginner"
prerequisites:
  - Variables and Data Types
estimated_minutes: 25
tags:
  - java
  - io
  - scanner
---

# 1.5 Input and Output

## Overview

Programs are useful when they interact with users. **Output** sends data to the screen (`System.out`); **input** reads data from the keyboard (usually with the **`Scanner`** class). This lesson covers printing, formatting, and reading numbers, words, and full lines.

## Learning Objectives

After this lesson you will be able to:

- Print with `print`, `println`, and `printf`
- Read input with `Scanner`
- Read integers, doubles, words, and full lines
- Avoid the classic `nextLine()` after `nextInt()` pitfall
- Close the scanner and handle basic input errors

## Core Concepts

### Output

```java
System.out.print("no newline ");
System.out.println("with newline");
System.out.printf("Formatted: %d and %.2f%n", 42, 3.14159);
```

- `print` — no newline.
- `println` — appends a newline.
- `printf` — formatted output using placeholders (`%d` int, `%f` float, `%s` string, `%n` newline).

### Input with Scanner

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);   // read from the keyboard

int age = sc.nextInt();                // read an int
double price = sc.nextDouble();        // read a double
String word = sc.next();               // read one word (until whitespace)
String line = sc.nextLine();           // read the whole line

sc.close();                            // release the resource
```

### The nextLine() gotcha

```java
System.out.print("Age: ");
int age = sc.nextInt();        // reads "21" but leaves the newline

System.out.print("Name: ");
String name = sc.nextLine();   // reads the leftover newline → empty string!
```

Fix: consume the leftover newline before reading the line:

```java
sc.nextLine();                 // discard the newline after nextInt()
String name = sc.nextLine();   // now reads the actual line
```

### Formatted output

```java
int a = 7, b = 3;
System.out.printf("%d + %d = %d%n", a, b, a + b);     // 7 + 3 = 10
System.out.printf("%.2f%n", 3.14159);                 // 3.14
```

Common format specifiers:

- `%d` — integer
- `%f` — floating point (add `.2` for two decimals)
- `%s` — string
- `%c` — character
- `%n` — platform newline

## Visual — Reading vs Printing

```
  user types: 21 Ankit 8.9
      │
      ▼
  Scanner ──▶ nextInt() = 21
         ──▶ next()    = "Ankit"
         ──▶ nextDouble() = 8.9

  program ──▶ System.out.println(...) ──▶ screen
```

`Scanner` breaks input into **tokens** (whitespace-separated pieces) and converts each to the requested type.

## Code Examples

### Example 1 — Read and echo

```java
import java.util.Scanner;

public class Echo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name + "!");
        sc.close();
    }
}
```

### Example 2 — Add two numbers

```java
import java.util.Scanner;

public class AddTwo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter two integers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Sum = " + (a + b));
        sc.close();
    }
}
```

### Example 3 — Mixed input with the newline fix

```java
import java.util.Scanner;

public class Profile {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Age: ");
        int age = sc.nextInt();
        sc.nextLine();                      // consume leftover newline
        System.out.print("Full name: ");
        String name = sc.nextLine();
        System.out.println(name + " is " + age);
        sc.close();
    }
}
```

## Common Mistakes

1. **`nextLine()` right after `nextInt()`** — you get an empty string (the leftover newline).
2. **Forgetting `import java.util.Scanner;`** — `Scanner` isn't available by default.
3. **Not closing the scanner** — leaks the resource (minor for small programs).
4. **Reading the wrong type** — `nextInt()` on non-numeric input throws `InputMismatchException`.
5. **Using `next()` when you want a whole line** — it stops at the first space.
6. **Confusing `print` and `printf`** — `printf` needs format specifiers.

## Best Practices

- `import java.util.Scanner;` at the top of any file that reads input.
- Use `println` for messages and `printf` for aligned/formatted numbers.
- After `nextInt()`/`nextDouble()`, call `nextLine()` before reading a full line.
- Close the scanner (`sc.close()`) when done.
- Prompt the user (`System.out.print`) before reading — it clarifies what's expected.

## Practice Questions

1. Write a program that reads a number and prints its square.
2. Read the user's first and last name on one line and print them reversed.
3. Read a temperature in Celsius and print it in Fahrenheit (formatted to 2 decimals).
4. Fix the `nextInt()`/`nextLine()` bug in a small program.
5. Read three integers and print their average with `printf`.

## Multiple Choice Questions (MCQs)

### Q1. Which class is commonly used to read console input?
- a) `Console`
- b) `Scanner`
- c) `Reader`
- d) `Input`

**Answer:** b

### Q2. `sc.next()` reads:
- a) The whole line
- b) One token (until whitespace)
- c) A single character
- d) An integer only

**Answer:** b

### Q3. `System.out.printf("%.2f", 3.14159)` prints:
- a) `3.14159`
- b) `3.14`
- c) `3`
- d) `%f`

**Answer:** b

### Q4. After `sc.nextInt()`, the next `sc.nextLine()` may return empty because:
- a) Scanner is broken
- b) The newline after the number is still buffered
- c) The program ended
- d) `nextInt` closes input

**Answer:** b

### Q5. Which statement prints a newline at the end?
- a) `System.out.print`
- b) `System.out.println`
- c) `System.in`
- d) `System.err`

**Answer:** b

## Key Takeaways

- Output: `print` (no newline), `println` (newline), `printf` (formatted).
- Input: `Scanner` with `nextInt`, `nextDouble`, `next`, `nextLine`.
- After `nextInt()`/`nextDouble()`, consume the leftover newline before `nextLine()`.
- Import `java.util.Scanner` and close the scanner when finished.

## Module 1 Complete 🎉

You've finished **Module 1 — Java Basics**. Next up: **Module 2 — Fundamentals: Variables, Data Types, Operators**.
