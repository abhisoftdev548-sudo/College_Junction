---
module: 8
topic: "8.3"
title: "Introduction to File I/O"
slug: "introduction-to-file-io"
difficulty: "Intermediate"
prerequisites:
  - Checked vs Unchecked and Custom Exceptions
estimated_minutes: 30
tags:
  - java
  - file-io
  - path
  - files
---

# 8.3 Introduction to File I/O

## Overview

File I/O lets programs persist data — read from and write to the filesystem. Java offers two main approaches: the **classic `java.io`** (`File`, streams, readers/writers) and the **modern `java.nio.file`** (`Path`, `Files`) introduced in Java 7. You'll learn both, with emphasis on the modern, cleaner `Files` API.

## Learning Objectives

After this lesson you will be able to:

- Represent files with `File` (classic) and `Path` (modern)
- Create, check, and list files and directories
- Explain absolute vs relative paths
- Use `Files` for metadata (exists, size, permissions)
- Choose between `java.io` and `java.nio.file`

## Core Concepts

### Classic File

```java
import java.io.File;

File f = new File("notes.txt");        // relative path
File abs = new File("/home/user/notes.txt");   // absolute path

f.exists();       // does it exist?
f.isFile();       // is it a file (not a directory)?
f.isDirectory();
f.length();       // size in bytes
f.getName();      // "notes.txt"
f.getPath();      // full path as given
f.delete();       // delete
f.mkdir();        // create a directory
```

`File` is a **path representation** (it doesn't open/read content) — good for metadata and navigation.

### Modern Path and Path.of

```java
import java.nio.file.Path;

Path p = Path.of("data", "notes.txt");   // Java 11 shorthand (replaces Paths.get)
Path abs = Path.of("/home/user/notes.txt");

p.getFileName();     // notes.txt
p.getParent();       // data
p.toAbsolutePath();  // full path
p.getNameCount();    // number of path elements
```

`Path` is the modern, more powerful replacement for `File` — it works with `Files`.

### The Files class (metadata and operations)

```java
import java.nio.file.Files;
import java.nio.file.Path;

Path p = Path.of("notes.txt");

Files.exists(p);          // exists?
Files.isDirectory(p);
Files.size(p);            // bytes (throws if missing)
Files.createFile(p);      // create empty file (throws if exists)
Files.createDirectory(p); // create directory
Files.delete(p);          // delete (throws if missing)
Files.deleteIfExists(p);  // delete quietly
```

`Files` is the all-in-one utility for file operations (no `new` — it's all static methods).

### Listing directory contents

```java
try (var paths = Files.list(Path.of("."))) {     // streams over entries
    paths.forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}
```

### Absolute vs relative

```java
Path rel = Path.of("data/file.txt");      // relative to the working directory
Path abs = Path.of("/data/file.txt");     // absolute from the filesystem root

rel.toAbsolutePath();                      // resolves relative against the current dir
rel.normalize();                           // clean up "." and ".."
```

## Visual — java.io vs java.nio.file

```
 classic java.io              modern java.nio.file (Java 7+)
 ┌────────────────┐          ┌──────────────────────┐
 │ File           │          │ Path (immutable)     │
 │ FileInputStream│          │ Files (static utils) │
 │ FileReader     │          │ Files.readString()   │
 │ FileWriter     │          │ Files.writeString()  │
 └────────────────┘          └──────────────────────┘
 works everywhere           cleaner, richer, preferred for new code
```

Both coexist; modern code prefers `Path` + `Files`.

## Code Examples

### Example 1 — Classic File metadata

```java
import java.io.File;

public class FileInfo {
    public static void main(String[] args) {
        File f = new File("notes.txt");
        System.out.println("Exists: " + f.exists());
        System.out.println("Is file: " + f.isFile());
        System.out.println("Size: " + f.length() + " bytes");
        System.out.println("Name: " + f.getName());
    }
}
```

### Example 2 — Modern Path + Files

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class PathInfo {
    public static void main(String[] args) {
        Path p = Path.of("data", "notes.txt");
        System.out.println("File name: " + p.getFileName());
        System.out.println("Parent: " + p.getParent());
        System.out.println("Absolute: " + p.toAbsolutePath());
        System.out.println("Exists: " + Files.exists(p));
    }
}
```

### Example 3 — Create and delete

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class CreateDelete {
    public static void main(String[] args) throws Exception {
        Path p = Path.of("temp.txt");
        Files.createFile(p);          // create
        System.out.println("Created: " + Files.exists(p));   // true
        Files.deleteIfExists(p);      // delete
        System.out.println("Exists after delete: " + Files.exists(p));   // false
    }
}
```

## Common Mistakes

1. **Confusing `File` (path) with actual file content** — you need readers/streams or `Files.readString` for content.
2. **Using `Files.delete` on a missing file** — throws; use `deleteIfExists`.
3. **`Files.size` on a missing file** — throws `NoSuchFileException`.
4. **Hard-coding absolute paths** — use relative paths or config for portability.
5. **Forgetting to handle `IOException`** — file operations throw checked exceptions.
6. **Not closing directory streams** — use try-with-resources (8.5).

## Best Practices

- Prefer `Path` + `Files` for new code.
- Use try-with-resources for streams (8.5).
- Handle `IOException` explicitly — file operations can always fail.
- Use `deleteIfExists`, `createDirectories` for idempotent operations.
- Avoid hard-coded absolute paths; keep data under a configurable base.

## Practice Questions

1. Print the name, size, and absolute path of a file using `File`.
2. Do the same using `Path` and `Files`.
3. Write code to create a directory and a file inside it, then list the directory.
4. Explain the difference between `File` and `Path`.
5. Show `Files.createDirectories` creating nested directories in one call.

## Multiple Choice Questions (MCQs)

### Q1. The classic class for file paths is:
- a) `Path`
- b) `File`
- c) `Files`
- d) `Directory`

**Answer:** b

### Q2. The modern path type is:
- a) `File`
- b) `Path` (java.nio.file)
- c) `Stream`
- d) `Reader`

**Answer:** b

### Q3. `Path.of("a", "b.txt")` creates:
- a) A file on disk
- b) A path object (no file created yet)
- c) A directory
- d) A string only

**Answer:** b

### Q4. To check if a file exists (modern API):
- a) `f.exists()`
- b) `Files.exists(path)`
- c) `path.exists()`
- d) `File.exists(path)`

**Answer:** b

### Q5. `Files.delete` on a missing file:
- a) Does nothing
- b) Throws an exception
- c) Returns false
- d) Creates the file

**Answer:** b

## Key Takeaways

- Classic `File` vs modern `Path` + `Files` (Java 7+).
- `File`/`Path` represent locations; `Files` does operations.
- Handle `IOException`; prefer modern `Path`/`Files` for new code.
- Use `deleteIfExists`/`createDirectories` for safe, idempotent ops.

## Next Topic

[8.4 Reading and Writing Files](lesson-8.4-reading-and-writing-files.md)
