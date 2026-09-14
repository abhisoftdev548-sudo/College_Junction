---
module: 6
topic: "6.5"
title: "Packages and Imports"
slug: "packages-and-imports"
difficulty: "Intermediate"
prerequisites:
  - this and static Members
estimated_minutes: 25
tags:
  - java
  - packages
  - imports
  - modules
---

# 6.5 Packages and Imports

## Overview

A **package** groups related classes into a namespace, preventing name collisions and organizing large codebases. **Imports** bring classes from other packages into scope. Everything in Java lives in a package (implicitly or explicitly), and the module system (Java 9) — plus Java 25's **module import declarations** — build on top of this.

## Learning Objectives

After this lesson you will be able to:

- Declare packages and place classes in them
- Use `import` statements (single, wildcard, static)
- Explain the default (unnamed) package and why it's discouraged
- Use `java.lang` (auto-imported) vs other packages
- Recognize Java 25's module import declarations (JEP 511)

## Core Concepts

### Declaring a package

```java
package com.college.models;      // must be the FIRST line (after comments)

public class Student {
    // ...
}
```

The class file lives in a matching directory: `com/college/models/Student.java`. Package names are lowercase, reverse-domain style (`com.company.project`).

### Importing classes

```java
import java.util.ArrayList;         // single import
import java.util.List;
import java.util.*;                 // wildcard (all classes in java.util)

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();   // no fully-qualified name needed
    }
}
```

Without an import, you'd write the **fully qualified name** `java.util.ArrayList`.

### java.lang is automatic

```java
String s = "hi";        // java.lang.String — imported automatically
Math.max(3, 5);         // java.lang.Math
System.out.println();   // java.lang.System
```

Every program implicitly imports `java.lang` — that's why `String`, `Math`, and `System` always work.

### Static imports

```java
import static java.lang.Math.PI;
import static java.lang.Math.pow;

double area = PI * pow(r, 2);   // no Math. prefix
```

Static imports bring in **static members** (constants/methods) directly — handy, but use sparingly to keep code readable.

### The default (unnamed) package

```java
// no package declaration → default package
public class Main { /* ... */ }
```

Small scripts/examples work in the default package, but real projects **always declare packages** — the default package can't be imported from elsewhere.

### Packages vs directories

```text
src/
└── com/
    └── college/
        ├── models/Student.java      → package com.college.models
        └── services/StudentService.java → package com.college.services
```

Package structure mirrors directory structure.

## Modern Java / Java 25 Update

### JEP 511 — Module Import Declarations (Final in Java 25)

Java 9 introduced **modules** (`module-info.java`), which group packages into explicit units. Java 25 adds **module import declarations** — a shorter way to import a whole module:

```java
import module java.base;     // Java 25 — imports everything from java.base

public class Demo {
    public static void main(String[] args) {
        // classes from java.base are now in scope without per-class imports
        var list = List.of("a", "b");
        System.out.println(list);
    }
}
```

> ⚠️ This is for code inside the module system. For everyday learning, classic `import java.util.*;` is what you'll use — module imports are a new convenience for larger modular projects.

## Visual — Package Namespace

```
 java.util.ArrayList   ← package: java.util, class: ArrayList
 com.college.models.Student ← package: com.college.models, class: Student

 Two libraries can each have a "User" class without conflict:
 com.acme.User   vs   com.globex.User
```

Packages are namespaces: the fully qualified name is unique across all libraries.

## Code Examples

### Example 1 — Package + import

```java
// File: com/college/models/Student.java
package com.college.models;

public class Student {
    private String name;
    public Student(String name) { this.name = name; }
    public String getName() { return name; }
}
```

```java
// File: com/college/Main.java
package com.college;

import com.college.models.Student;

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ankit");
        System.out.println(s.getName());
    }
}
```

### Example 2 — Wildcard and static import

```java
import java.util.*;
import static java.lang.Math.PI;

public class Shapes {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("circle");
        System.out.println(PI);           // 3.14159...
    }
}
```

### Example 3 — Fully qualified name (no import)

```java
public class NoImport {
    public static void main(String[] args) {
        java.util.List<String> list = new java.util.ArrayList<>();
        list.add("no import needed");
        System.out.println(list.get(0));
    }
}
```

## Common Mistakes

1. **Forgetting the package declaration** — the class lands in the default package.
2. **Wrong directory structure** — the package must match the folder path.
3. **Missing import** — "cannot find symbol" for `ArrayList`; add `import java.util.ArrayList`.
4. **Importing two classes with the same name** — ambiguity; use fully qualified names.
5. **Wildcard overuse** — `import java.util.*;` is convenient but can hide what's used.
6. **Package name starting with uppercase** — convention is lowercase (reverse domain).

## Best Practices

- Always declare a package in real projects (`com.company.project.module`).
- Match package to directory structure.
- Prefer explicit single imports over wildcards (clearer; tools manage them anyway).
- Import `java.lang` implicitly — never write `import java.lang.String;`.
- Use static imports sparingly, for well-known constants like `Math.PI`.

## Practice Questions

1. Create a `com.school.models.Student` class and use it from another package.
2. Explain why `String` and `Math` need no import.
3. Write a program using `ArrayList` with a single import and with a wildcard import.
4. Use a static import to call `Math.sqrt` without the `Math.` prefix.
5. Explain, in a comment, Java 25's `import module` feature.

## Multiple Choice Questions (MCQs)

### Q1. A package groups:
- a) Methods
- b) Related classes into a namespace
- c) Variables
- d) Statements

**Answer:** b

### Q2. The `package` declaration must be:
- a) The last line
- b) The first statement (after comments)
- c) Inside `main`
- d) Optional in all code

**Answer:** b

### Q3. `java.lang` is:
- a) Imported manually
- b) Imported automatically in every program
- c) A user package
- d) Deprecated

**Answer:** b

### Q4. `import java.util.*;` is a:
- a) Static import
- b) Wildcard import
- c) Package declaration
- d) Module import

**Answer:** b

### Q5. Java 25's `import module java.base;`:
- a) Imports all of `java.base` in one declaration
- b) Is a wildcard import
- c) Declares a package
- d) Is invalid

**Answer:** a

## Key Takeaways

- Packages namespace classes; structure mirrors directories.
- Imports bring classes into scope; `java.lang` is automatic.
- Static imports pull in static members; use sparingly.
- Java 25 adds module import declarations for modular code.

## Module 6 Complete 🎉

You've finished **Module 6 — Object-Oriented Programming (Fundamentals)**. Next up: **Module 7 — Advanced Object-Oriented Programming**.
