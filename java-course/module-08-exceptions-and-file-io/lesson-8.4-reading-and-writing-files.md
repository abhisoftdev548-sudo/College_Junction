---
module: 8
topic: "8.4"
title: "Reading and Writing Files"
slug: "reading-and-writing-files"
difficulty: "Intermediate"
prerequisites:
  - Introduction to File I/O
estimated_minutes: 30
tags:
  - java
  - file-io
  - reader
  - writer
---

# 8.4 Reading and Writing Files

## Overview

Reading and writing file **content** (not just paths) is done with readers/writers (text) or streams (bytes). Java offers many layers: classic `BufferedReader`/`FileWriter`, and the modern one-liners `Files.readString`/`Files.writeString` (Java 11) and `Files.readAllLines`. This lesson covers the common patterns you'll actually use.

## Learning Objectives

After this lesson you will be able to:

- Read a whole file as a string and line-by-line
- Write strings and lists of lines to files
- Use `BufferedReader`/`BufferedWriter` (classic, massively-used)
- Handle text encodings
- Choose the right reading/writing approach

## Core Concepts

### Modern one-liners (Java 11+)

```java
import java.nio.file.Files;
import java.nio.file.Path;

String content = Files.readString(Path.of("notes.txt"));   // whole file → String

Files.writeString(Path.of("notes.txt"), "Hello, world!");  // String → file

List<String> lines = Files.readAllLines(Path.of("notes.txt"));  // file → List<String>

Files.write(Path.of("notes.txt"), lines);                  // List<String> → file
```

These are the fastest way to read/write small-to-medium text files. They throw `IOException`.

### Classic BufferedReader (massively-used)

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadLines {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("notes.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {   // read until end
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

`BufferedReader.readLine()` returns `null` at end-of-file — efficient for large files (reads line by line, not all at once).

### Classic FileWriter / BufferedWriter

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class WriteLines {
    public static void main(String[] args) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"))) {
            bw.write("First line");
            bw.newLine();
            bw.write("Second line");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

`FileWriter` opens for writing (overwrites by default); `BufferedWriter` adds buffering.

### Reading with a Scanner (simple input)

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ScanFile {
    public static void main(String[] args) throws FileNotFoundException {
        try (Scanner sc = new Scanner(new File("numbers.txt"))) {
            while (sc.hasNextInt()) {
                System.out.println(sc.nextInt());
            }
        }
    }
}
```

`Scanner` is convenient for parsing tokens/numbers from a file.

### Writing with PrintWriter (formatted)

```java
import java.io.IOException;
import java.io.PrintWriter;

public class PrintFile {
    public static void main(String[] args) throws IOException {
        try (PrintWriter pw = new PrintWriter("report.txt")) {
            pw.printf("Name: %s, Score: %.2f%n", "Ankit", 8.9);   // formatted
        }
    }
}
```

### Encodings

```java
Files.readString(path, StandardCharsets.UTF_8);    // explicit charset
Files.writeString(path, "नमस्ते", StandardCharsets.UTF_8);
```

Always specify `UTF_8` when text isn't plain ASCII.

## Visual — The I/O Layers

```
 high-level (text, easy)          low-level (bytes, verbose)
 ┌─────────────────────┐         ┌─────────────────────┐
 │ Files.readString()  │         │ FileInputStream     │
 │ Files.writeString() │         │ FileOutputStream    │
 │ BufferedReader      │  ◀───▶  │ (bytes → chars via  │
 │ PrintWriter         │         │  InputStreamReader) │
 └─────────────────────┘         └─────────────────────┘
   text files — use these          binary files (images, etc.)
```

For text, use readers/writers and `Files.readString/writeString`. For binary, use streams.

## Code Examples

### Example 1 — Read whole file and print

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadWhole {
    public static void main(String[] args) {
        try {
            String text = Files.readString(Path.of("notes.txt"));
            System.out.println(text);
        } catch (Exception e) {
            System.out.println("Could not read: " + e.getMessage());
        }
    }
}
```

### Example 2 — Write and append

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class Append {
    public static void main(String[] args) throws Exception {
        Path p = Path.of("log.txt");
        Files.writeString(p, "start\n");
        Files.writeString(p, "more\n", StandardOpenOption.APPEND);   // append, not overwrite
        System.out.println(Files.readString(p));   // start\nmore\n
    }
}
```

### Example 3 — Read lines with BufferedReader

```java
import java.io.BufferedReader;
import java.io.FileReader;

public class LineByLine {
    public static void main(String[] args) throws Exception {
        try (BufferedReader br = new BufferedReader(new FileReader("data.csv"))) {
            String line;
            int count = 0;
            while ((line = br.readLine()) != null) {
                count++;
            }
            System.out.println("Total lines: " + count);
        }
    }
}
```

## Common Mistakes

1. **Reading a huge file with `readString`** — loads everything into memory; use `BufferedReader` for large files.
2. **Forgetting to close readers/writers** — use try-with-resources (8.5).
3. **Overwriting when you meant to append** — pass `StandardOpenOption.APPEND`.
4. **Ignoring encoding** — default charset varies; specify `UTF_8`.
5. **`readLine()` at end of file** — it returns `null`; don't print it as a line.
6. **FileWriter truncating on every open** — opening again wipes existing content.

## Best Practices

- Small files: `Files.readString`/`writeString`/`readAllLines`.
- Large files: `BufferedReader`/`BufferedWriter` line-by-line.
- Always use try-with-resources for closable resources.
- Specify `StandardCharsets.UTF_8` explicitly.
- Use `APPEND` to add without overwriting.

## Practice Questions

1. Read a text file and print its contents using `Files.readString`.
2. Write a `List<String>` to a file using `Files.write`.
3. Count lines in a large file with `BufferedReader`.
4. Append a line to an existing file.
5. Read integers from a file with `Scanner` and sum them.

## Multiple Choice Questions (MCQs)

### Q1. `Files.readString(path)` (Java 11) reads:
- a) One line
- b) The whole file as a String
- c) One byte
- d) A directory

**Answer:** b

### Q2. `BufferedReader.readLine()` returns `null` when:
- a) The file is empty only
- b) End of file is reached
- c) An error occurs
- d) The line is blank

**Answer:** b

### Q3. To append (not overwrite), use:
- a) `StandardOpenOption.APPEND`
- b) `FileWriter` (always appends)
- c) `FileReader`
- d) `StandardOpenOption.OVERWRITE`

**Answer:** a

### Q4. For very large text files, prefer:
- a) `Files.readString`
- b) `BufferedReader` line-by-line
- c) `Files.readAllBytes`
- d) `String` concatenation

**Answer:** b

### Q5. `StandardCharsets.UTF_8` is used to:
- a) Speed up I/O
- b) Specify the character encoding
- c) Close a file
- d) Delete a file

**Answer:** b

## Key Takeaways

- Modern: `Files.readString`/`writeString`/`readAllLines` for small files.
- Classic: `BufferedReader`/`BufferedWriter`/`Scanner`/`PrintWriter` (massively-used).
- Use try-with-resources; specify UTF-8; append with `APPEND`.
- `readLine()` returns `null` at EOF.

## Next Topic

[8.5 try-with-resources and NIO.2](lesson-8.5-try-with-resources-and-nio.md)
