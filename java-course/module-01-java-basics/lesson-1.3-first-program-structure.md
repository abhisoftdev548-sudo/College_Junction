---
module: 1
topic: "1.3"
title: "Your First Program and Program Structure"
slug: "first-program-structure"
difficulty: "Beginner"
prerequisites:
  - Setting Up Java
estimated_minutes: 25
tags:
  - java
  - basics
  - hello-world
---

# 1.3 Your First Program and Program Structure

## Overview

Every Java program lives inside a **class**, and execution begins at the **`main` method**. This lesson dissects the classic "Hello, World!" line by line so you understand exactly what each part does — the foundation for everything that follows.

## Learning Objectives

After this lesson you will be able to:

- Write and explain a complete `main` method
- Describe the parts of a class declaration
- Understand `public static void main(String[] args)`
- Use single-line, multi-line, and Javadoc comments
- Explain the one-public-class-per-file rule

## Core Concepts

### The smallest program

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Line-by-line anatomy

```java
public class Hello {                       // class declaration
    public static void main(String[] args) {   // the entry point
        System.out.println("Hello, World!");   // the statement
    }
}
```

- `public` — the class/method is accessible from outside.
- `class Hello` — declares a class named `Hello` (must match the filename `Hello.java`).
- `public static void main(String[] args)` — the **entry point** the JVM calls first.
  - `static` — belongs to the class, so the JVM can call it without creating an object.
  - `void` — returns nothing.
  - `String[] args` — command-line arguments array.
- `System.out.println(...)` — prints a line to standard output.

### Why the main signature is exactly this

The JVM looks for a method with the **exact** signature `public static void main(String[] args)`. Change any part and the JVM won't find it:

```java
public static void main(String args[]) { ... }   // same (array brackets either place)
static public void main(String[] args) { ... }   // same (modifier order flexible)
public static void Main(String[] args) { ... }   // WRONG — Main ≠ main
```

### Comments

```java
// single-line comment

/* multi-line
   comment */

/** Javadoc comment — used to document classes/methods */
public class Hello { ... }
```

Comments are ignored by the compiler; they explain code to humans.

### Statements and blocks

```java
{                       // a block — groups statements
    int x = 5;          // a statement (ends with ;)
    System.out.println(x);
}
```

Java statements end with a **semicolon**; blocks are enclosed in **braces** and do not.

## Visual — Anatomy of a Java Program

```
  public class Hello {                       ← class (Hello.java)
      public static void main(String[] args) {   ← entry point
          System.out.println("Hello!");          ← statement
      }
  }

  Execution:  java Hello  →  JVM loads Hello.class  →  calls main  →  prints
```

The `main` method is the single door through which every Java program starts.

## Code Examples

### Example 1 — Hello with a variable

```java
public class Greeting {
    public static void main(String[] args) {
        String name = "Ankit";
        System.out.println("Hello, " + name + "!");
    }
}
// Hello, Ankit!
```

### Example 2 — Multiple statements

```java
public class MathDemo {
    public static void main(String[] args) {
        int a = 7;
        int b = 3;
        int sum = a + b;
        System.out.println("Sum = " + sum);   // Sum = 10
    }
}
```

### Example 3 — Command-line arguments

```java
public class Echo {
    public static void main(String[] args) {
        System.out.println("First argument: " + args[0]);
    }
}
// Run: java Echo hello
// First argument: hello
```

## Common Mistakes

1. **Filename mismatch** — `public class Hello` must be in `Hello.java`.
2. **Wrong main signature** — `Main`, missing `static`, or wrong parameter type.
3. **Missing semicolon** — every statement ends with `;`.
4. **Putting two public classes in one file** — only one public class per file.
5. **Forgetting braces** — mismatched `{}` cause compile errors.
6. **Spelling `System` or `String` with lowercase** — Java is case-sensitive.

## Best Practices

- Save the file as `<ClassName>.java` for the one public class.
- Keep the class name descriptive (PascalCase) — `HelloWorld`, not `h` or `x1`.
- Indent consistently (4 spaces) so blocks are visually clear.
- Use comments to explain *why*, not just restate *what*.
- Start every new program from a working template.

## Practice Questions

1. Write a program that prints three lines about yourself.
2. Explain each keyword in `public static void main(String[] args)`.
3. Write a program that takes a command-line argument and prints it twice.
4. What's wrong with `public static void main(string[] args)`?
5. Why must the public class name match the filename?

## Multiple Choice Questions (MCQs)

### Q1. Execution of a Java program begins at:
- a) The first line of the file
- b) The `main` method
- c) The class name
- d) The last statement

**Answer:** b

### Q2. Which is the correct `main` signature?
- a) `public void main(String[] args)`
- b) `public static void main(String[] args)`
- c) `static void main()`
- d) `public static int main(String args)`

**Answer:** b

### Q3. `String[] args` holds:
- a) The program's source code
- b) Command-line arguments
- c) The class name
- d) All variables

**Answer:** b

### Q4. Every Java statement ends with:
- a) A colon
- b) A period
- c) A semicolon
- d) A comma

**Answer:** c

### Q5. `//` begins a:
- a) Block
- b) Single-line comment
- c) Class
- d) Method

**Answer:** b

## Key Takeaways

- All Java code lives in classes; the JVM calls `main` to start.
- `main` must be exactly `public static void main(String[] args)`.
- Statements end with `;`; blocks use `{}`; the public class name matches the filename.
- Comments document code for humans and are ignored by the compiler.

## Next Topic

[1.4 Variables and Data Types](lesson-1.4-variables-and-data-types.md)
