---
module: 1
topic: "1.1"
title: "What is Programming and Java"
slug: "what-is-programming-and-java"
difficulty: "Beginner"
prerequisites: []
estimated_minutes: 25
tags:
  - java
  - basics
  - jvm
---

# 1.1 What is Programming and Java

## Overview

**Programming** is writing a precise set of instructions for a computer to follow. **Java** is a high-level, object-oriented language famous for "write once, run anywhere": you compile your code once into **bytecode**, and the **Java Virtual Machine (JVM)** runs that bytecode on any device. This lesson introduces the ideas behind programming and what makes Java special.

## Learning Objectives

After this lesson you will be able to:

- Explain what a program and a programming language are
- Distinguish source code, bytecode, and machine code
- Describe how the JVM enables platform independence
- List the key characteristics of Java
- Understand where Java is used in the real world

## Core Concepts

### What is a program?

A **program** is a sequence of instructions a computer executes to accomplish a task. A **programming language** is the notation you use to write those instructions — Java is one such language, designed to be readable by humans and precisely executable by machines.

### Source code → bytecode → machine code

```text
Source code (Hello.java)   --javac-->   Bytecode (Hello.class)   --JVM-->   Machine code
   (what you write)                     (portable, .class file)             (runs on the CPU)
```

1. You write **source code** in a `.java` file.
2. The Java **compiler** (`javac`) translates it to **bytecode** (`.class`).
3. The **JVM** translates bytecode into the native machine code of whatever computer it runs on.

### Why Java is platform-independent

```text
         Hello.java  (written once)
              │ javac
              ▼
         Hello.class  (bytecode — same everywhere)
   ┌──────────┼──────────┐
   ▼          ▼          ▼
JVM on      JVM on      JVM on
Windows     Linux       macOS
```

Because bytecode targets the JVM (not a specific OS/CPU), the same `.class` file runs anywhere a JVM exists — this is **"write once, run anywhere"**.

### Key characteristics of Java

- **Object-oriented** — everything revolves around classes and objects.
- **Platform-independent** — bytecode + JVM.
- **Robust** — strong type checking, automatic memory management (garbage collection).
- **Secure** — runs inside the JVM sandbox with no direct memory access.
- **Huge ecosystem** — libraries and frameworks for web, mobile (Android), enterprise, and more.

### Where Java is used

- Enterprise backends (Spring, banking systems)
- Android apps
- Big data tools (Hadoop, Kafka, Spark)
- Desktop and embedded systems

## Visual — The Java Execution Model

```
  Hello.java ──(compile: javac)──▶ Hello.class ──(run: java)──▶ JVM ──▶ output
    source                          bytecode                   interprets/JITs
```

The compiler and the JVM split the work: compile once, run everywhere.

## Code Examples

### Example 1 — Your first program

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

Compile and run:

```bash
javac Hello.java      # produces Hello.class
java Hello            # prints: Hello, Java!
```

### Example 2 — A program with a variable

```java
public class Intro {
    public static void main(String[] args) {
        String language = "Java";
        System.out.println("I am learning " + language);
    }
}
```

### Example 3 — Print several lines

```java
public class Lines {
    public static void main(String[] args) {
        System.out.println("Line 1");   // println adds a newline
        System.out.print("Line 2 ");    // print does not
        System.out.print("same line");
    }
}
// Output:
// Line 1
// Line 2 same line
```

## Common Mistakes

1. **Confusing source and bytecode** — you edit `.java`, but you run the compiled `.class`.
2. **Expecting Java to run without a JVM** — the JVM is what executes bytecode.
3. **Editing the `.class` file** — it is generated output, not something to edit.
4. **Forgetting that Java is case-sensitive** — `Main` and `main` are different.
5. **Thinking "write once" means "no install needed"** — every machine still needs a JRE/JVM.
6. **Mixing up `println` and `print`** — one adds a newline, the other doesn't.

## Best Practices

- Write code in `.java` files; let `javac` produce `.class` files.
- Use a consistent, meaningful class name (and match the filename).
- Compile and run from the terminal first — it builds intuition before IDEs hide the steps.
- Remember the flow: **source → bytecode → JVM**.

## Practice Questions

1. In your own words, describe the three stages from source code to execution in Java.
2. Explain why the same `.class` file can run on Windows and Linux.
3. Write a program that prints your name on one line and your city on the next.
4. What is the difference between `print` and `println`? Demonstrate both.
5. Name three real-world areas where Java is used.

## Multiple Choice Questions (MCQs)

### Q1. What does the Java compiler (`javac`) produce?
- a) Machine code
- b) Bytecode (`.class` file)
- c) A `.java` file
- d) An executable `.exe`

**Answer:** b

### Q2. Java's "write once, run anywhere" is possible because of:
- a) The compiler only
- b) The JVM (Java Virtual Machine)
- c) The CPU
- d) The editor

**Answer:** b

### Q3. Which file do you write and edit as a programmer?
- a) `.class`
- b) `.exe`
- c) `.java`
- d) `.bytecode`

**Answer:** c

### Q4. Java is:
- a) Only interpreted
- b) Compiled to bytecode, then run by the JVM
- c) Only compiled to native code
- d) A scripting language only

**Answer:** b

### Q5. `System.out.println(...)`:
- a) Prints without a newline
- b) Prints with a newline at the end
- c) Reads input
- d) Compiles the program

**Answer:** b

## Key Takeaways

- Programming = writing instructions; Java = a platform-independent, object-oriented language.
- Flow: **source (.java) → bytecode (.class) → JVM**.
- The JVM is the secret to running the same code on any OS.
- `print` and `println` differ only by the trailing newline.

## Next Topic

[1.2 Setting Up Java (JDK, JVM, JRE)](lesson-1.2-setting-up-java.md)
