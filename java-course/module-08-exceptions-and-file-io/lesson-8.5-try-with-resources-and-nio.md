---
module: 8
topic: "8.5"
title: "try-with-resources and NIO.2"
slug: "try-with-resources-and-nio"
difficulty: "Intermediate"
prerequisites:
  - Reading and Writing Files
estimated_minutes: 30
tags:
  - java
  - try-with-resources
  - nio
  - files
---

# 8.5 try-with-resources and NIO.2

## Overview

**try-with-resources** (Java 7) automatically closes resources (files, streams, sockets) — eliminating the leak-prone "close in finally" boilerplate. **NIO.2** is the modern file API: `Path` + `Files` with powerful operations like walking directory trees, copying/moving files, and streaming over lines. This lesson ties both together.

## Learning Objectives

After this lesson you will be able to:

- Use try-with-resources to auto-close resources
- Explain `AutoCloseable` and resource order/exception handling
- Copy, move, and walk directory trees with `Files`
- Stream file lines and directory entries with NIO.2
- Recognize Java 25's `java.io.IO` helper

## Core Concepts

### try-with-resources

```java
try (BufferedReader br = new BufferedReader(new FileReader("notes.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
// br is closed AUTOMATICALLY — no finally block needed
```

Any resource declared in `try (...)` (that implements `AutoCloseable`) is closed automatically when the block ends — on success or exception. Java 9 lets you use an **effectively final** variable:

```java
BufferedReader br = new BufferedReader(new FileReader("notes.txt"));
try (br) {            // Java 9+ — existing resource
    // ...
}
```

### Multiple resources

```java
try (BufferedReader in = new BufferedReader(new FileReader("in.txt"));
     BufferedWriter out = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = in.readLine()) != null) {
        out.write(line);
        out.newLine();
    }
}
```

Resources are closed in **reverse order** of declaration. A `close()` exception doesn't hide the original exception — it's added as a **suppressed exception**.

### Your own AutoCloseable

```java
public class DbConnection implements AutoCloseable {
    public void query() { System.out.println("querying"); }

    @Override
    public void close() {
        System.out.println("connection closed");
    }
}

try (DbConnection db = new DbConnection()) {
    db.query();
}
// prints: querying, then connection closed
```

### NIO.2 — copy, move, walk

```java
import java.nio.file.Files;
import java.nio.file.Path;

Files.copy(Path.of("a.txt"), Path.of("b.txt"));                 // copy
Files.move(Path.of("b.txt"), Path.of("backup/b.txt"));          // move
Files.createDirectories(Path.of("a/b/c"));                      // nested dirs at once

try (var paths = Files.walk(Path.of("project"))) {              // walk a tree
    paths.filter(Files::isRegularFile).forEach(System.out::println);
}
```

### NIO.2 — streaming lines (memory-friendly)

```java
try (var lines = Files.lines(Path.of("big.txt"))) {   // lazy stream of lines
    long count = lines.filter(l -> l.contains("Java")).count();
    System.out.println("Lines containing 'Java': " + count);
}
```

`Files.lines` returns a **Stream<String>** — process huge files lazily without loading them into memory.

### Files.mismatch (Java 12)

```java
long diff = Files.mismatch(Path.of("a.txt"), Path.of("b.txt"));
// -1 if identical; otherwise the index of the first differing byte
```

## Modern Java / Java 25 Update

### JEP 512 — the java.io.IO helper (finalized in Java 25)

Java 25 (with compact source files) introduced `java.io.IO`, a tiny convenience class for simple input/output — ideal for beginners and scripts:

```java
void main() {                        // compact source (JEP 512)
    String name = IO.readln("Your name: ");   // prompt + read a line
    IO.println("Hello, " + name);              // print a line
    int age = IO.readInt("Age: ");             // read an int
    IO.println("Next year: " + (age + 1));
}
```

> ⚠️ `java.io.IO` complements `System.out`/`Scanner` for quick console I/O — for file I/O, `Files` + try-with-resources remains the workhorse.

## Visual — try-with-resources Lifecycle

```
 try (resource) {
    use resource...
 }   ──▶  (normal exit or exception)
            │
            ▼
 resource.close()  ← automatic
            │
            ▼
 (close() errors become suppressed exceptions, attached to the original)
```

No `finally` needed; closing is guaranteed and correctly ordered.

## Code Examples

### Example 1 — Copy with try-with-resources

```java
import java.io.*;
import java.nio.file.*;

public class Copy {
    public static void main(String[] args) throws IOException {
        try (var in = Files.newBufferedReader(Path.of("in.txt"));
             var out = Files.newBufferedWriter(Path.of("out.txt"))) {
            String line;
            while ((line = in.readLine()) != null) {
                out.write(line);
                out.newLine();
            }
        }
        System.out.println("Copied.");
    }
}
```

### Example 2 — NIO.2 copy/move

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class NioOps {
    public static void main(String[] args) throws Exception {
        Path src = Path.of("notes.txt");
        Path copy = Path.of("backup/notes-copy.txt");
        Files.createDirectories(copy.getParent());
        Files.copy(src, copy);
        Files.move(copy, Path.of("backup/notes-final.txt"));
        System.out.println("Done: " + Files.exists(Path.of("backup/notes-final.txt")));
    }
}
```

### Example 3 — walk and lines

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class Analyze {
    public static void main(String[] args) throws Exception {
        try (var files = Files.walk(Path.of("src"))) {
            long javaFiles = files.filter(p -> p.toString().endsWith(".java")).count();
            System.out.println(".java files: " + javaFiles);
        }
        try (var lines = Files.lines(Path.of("data.txt"))) {
            System.out.println("Total lines: " + lines.count());
        }
    }
}
```

## Common Mistakes

1. **Manual close() in finally instead of try-with-resources** — more code, more leak risk.
2. **Using a resource outside try-with-resources without closing it** — leak.
3. **Forgetting `Files.lines`/`Files.walk` return streams that must be closed** — they're in try-with-resources.
4. **Catching the close() exception and losing the original** — try-with-resources preserves it as suppressed.
5. **Assuming close order doesn't matter** — resources close in reverse order.
6. **Using `IO` (Java 25) for file I/O** — it's for console I/O, not files.

## Best Practices

- Use try-with-resources for **every** `AutoCloseable` resource.
- Prefer `Files.copy`/`move`/`walk`/`lines` for file operations.
- Stream large files with `Files.lines` instead of `readAllLines`.
- Let resources close in reverse order automatically.
- Keep resource usage scoped to the try block.

## Practice Questions

1. Rewrite a BufferedReader example to use try-with-resources.
2. Create a custom `AutoCloseable` class and use it in try-with-resources.
3. Copy and then move a file using `Files.copy` and `Files.move`.
4. Count lines containing a keyword in a large file with `Files.lines`.
5. List all `.txt` files in a directory tree with `Files.walk`.

## Multiple Choice Questions (MCQs)

### Q1. try-with-resources automatically:
- a) Deletes the resource
- b) Closes the resource (calls close())
- c) Copies the resource
- d) Retries the resource

**Answer:** b

### Q2. Resources in try-with-resources are closed in:
- a) Declaration order
- b) Reverse declaration order
- c) Random order
- d) Alphabetical order

**Answer:** b

### Q3. `Files.walk(path)` returns:
- a) A list of files
- b) A Stream of paths (a directory tree)
- c) A single file
- d) A reader

**Answer:** b

### Q4. `Files.lines` is useful because it:
- a) Loads everything at once
- b) Streams lines lazily (memory-friendly)
- c) Only reads one line
- d) Deletes empty lines

**Answer:** b

### Q5. Java 25's `java.io.IO` class provides:
- a) File tree walking
- b) Simple console I/O helpers (print/readln)
- c) Database access
- d) Networking

**Answer:** b

## Key Takeaways

- try-with-resources auto-closes `AutoCloseable` resources (reverse order, suppressed exceptions).
- NIO.2: `Files.copy`/`move`/`walk`/`lines`/`mismatch`.
- `Files.lines` streams large files lazily.
- Java 25's `java.io.IO` adds simple console I/O (JEP 512).

## Module 8 Complete 🎉

You've finished **Module 8 — Exception Handling and File I/O**. Next up: **Module 9 — Collections Framework**.
