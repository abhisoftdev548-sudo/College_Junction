---
module: 1
topic: "1.2"
title: "Setting Up Java (JDK, JVM, JRE)"
slug: "setting-up-java"
difficulty: "Beginner"
prerequisites:
  - What is Programming and Java
estimated_minutes: 25
tags:
  - java
  - setup
  - jdk
  - jre
  - jvm
---

# 1.2 Setting Up Java (JDK, JVM, JRE)

## Overview

Before writing Java you need the **JDK (Java Development Kit)**, which bundles everything required to compile and run programs. This lesson explains the difference between the **JDK, JRE, and JVM**, shows how to install and verify the JDK, and introduces the tools (`javac`, `java`) and IDEs you'll use.

## Learning Objectives

After this lesson you will be able to:

- Explain the JDK, JRE, and JVM and how they relate
- Install and verify a JDK on your machine
- Compile a program with `javac` and run it with `java`
- Understand what an IDE provides
- Troubleshoot common "java not found" issues

## Core Concepts

### JDK vs JRE vs JVM

```text
┌───────────────────────── JDK (Development Kit) ─────────────────────────┐
│  javac (compiler), java (launcher), jar, debugging & more tools         │
│  ┌─────────────── JRE (Runtime Environment) ───────────────┐            │
│  │  JVM (Java Virtual Machine)  +  core libraries          │            │
│  └─────────────────────────────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────────┘
```

- **JVM** — executes bytecode (the engine).
- **JRE** — JVM + standard libraries; enough to *run* Java programs.
- **JDK** — JRE + development tools (`javac` etc.); needed to *write and compile*.

As a developer you install the **JDK**; it includes the rest.

### Installing the JDK

- Download from a trusted source (Oracle JDK, or an OpenJDK build like Temurin/Amazon Corretto).
- Run the installer and note the install location.
- Verify from a terminal:

```bash
java -version     # shows the JVM version
javac -version    # shows the compiler version
```

### Compiling and running

```bash
javac Hello.java   # 1. compile → creates Hello.class
java Hello         # 2. run the class (no .class extension)
```

- `javac` = the compiler; `java` = the launcher.
- The class name in `java Hello` must match the `public class Hello` name.

### PATH and environment

If `java`/`javac` are "not recognized", the JDK's `bin` folder is not on your **PATH**. Add it (or reinstall), then open a **new** terminal.

### IDEs

An **IDE** (Integrated Development Environment) bundles an editor, compiler, and debugger:

- **IntelliJ IDEA** — the most popular Java IDE (Community edition is free).
- **Eclipse** — free, widely used.
- **VS Code** + Java extensions — lightweight option.

IDEs hide the `javac`/`java` steps, but understanding them helps you debug and use any tool.

## Visual — From Install to "Hello"

```
  install JDK ──▶ add to PATH ──▶ verify: java -version
                                    │
              Hello.java ──javac──▶ Hello.class ──java──▶ "Hello, Java!"
```

The terminal flow is the same on every OS — only the install differs.

## Code Examples

### Example 1 — Verify your installation

```bash
$ java -version
openjdk version "21.0.2" 2024-01-16
$ javac -version
javac 21.0.2
```

### Example 2 — Compile and run

```java
// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Setup works!");
    }
}
```

```bash
javac Hello.java
java Hello
# Setup works!
```

### Example 3 — The filename-classname rule

```java
// This must be saved as Greeting.java (public class name == filename)
public class Greeting {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

## Common Mistakes

1. **Installing only the JRE** — you can run but not compile; developers need the JDK.
2. **`java Hello.class`** — pass the class name `Hello`, not the filename.
3. **Filename ≠ public class name** — `javac` errors if they don't match.
4. **Editing in a word processor** — files must be plain text with `.java` extension.
5. **Forgetting to recompile after editing** — `java` runs the old `.class`.
6. **Old terminal after changing PATH** — open a new terminal so the change applies.

## Best Practices

- Install a current **LTS** JDK (e.g. Java 17 or 21) for stability.
- Verify with `java -version` and `javac -version` before starting.
- Learn the terminal flow first; then adopt an IDE for bigger projects.
- Keep one JDK version consistent across a project.

## Practice Questions

1. Explain the difference between JDK, JRE, and JVM.
2. What commands compile and run `Hello.java`?
3. Why must the public class name match the filename?
4. What does "`java` is not recognized" mean and how do you fix it?
5. Name two IDEs and one reason to use one.

## Multiple Choice Questions (MCQs)

### Q1. To *develop* (write and compile) Java programs you need the:
- a) JRE
- b) JVM
- c) JDK
- d) Browser

**Answer:** c

### Q2. Which command compiles `Hello.java`?
- a) `java Hello.java`
- b) `javac Hello.java`
- c) `run Hello.java`
- d) `compile Hello`

**Answer:** b

### Q3. After `javac Hello.java`, which command runs it?
- a) `java Hello.class`
- b) `run Hello.class`
- c) `java Hello`
- d) `javac Hello`

**Answer:** c

### Q4. The JVM's job is to:
- a) Edit source code
- b) Execute bytecode
- c) Manage the file system
- d) Design classes

**Answer:** b

### Q5. If `java` is "not recognized", the likely cause is:
- a) The program is too long
- b) The JDK's `bin` folder is not on the PATH
- c) The file is `.class`
- d) Java is compiled

**Answer:** b

## Key Takeaways

- JDK ⊇ JRE ⊇ JVM; install the JDK to develop.
- `javac` compiles (`.java` → `.class`); `java` runs the class.
- Filename must match the public class name; pass the class name (not `.class`) to `java`.
- Verify installs with `java -version` / `javac -version`.

## Next Topic

[1.3 Your First Program and Program Structure](lesson-1.3-first-program-structure.md)
