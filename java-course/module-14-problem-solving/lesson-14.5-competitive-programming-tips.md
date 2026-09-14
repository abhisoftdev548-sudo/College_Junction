---
module: 14
topic: "14.5"
title: "Competitive Programming Tips"
slug: "competitive-programming-tips"
difficulty: "Advanced"
prerequisites:
  - Debugging and Testing (JUnit)
estimated_minutes: 30
tags:
  - java
  - competitive-programming
  - io
---

# 14.5 Competitive Programming Tips

## Overview

Competitive programming (Codeforces, CodeChef, LeetCode) rewards **fast, correct** solutions. In Java, the difference between accepted and TLE (time limit exceeded) is often **fast I/O** and idiomatic shortcuts. This lesson distills the habits: fast input, avoiding slow patterns, and modern Java one-liners that save typing and bugs.

## Learning Objectives

After this lesson you will be able to:

- Set up fast I/O for contests
- Avoid common Java TLE pitfalls
- Use modern Java shortcuts (switch expressions, records, `Math.clamp`)
- Solve under time pressure with a checklist
- Recognize when to use preview features like JEP 507

## Core Concepts

### Fast I/O — avoid Scanner slowness

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder out = new StringBuilder();          // buffer output too

        int t = Integer.parseInt(br.readLine());          // test cases
        while (t-- > 0) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            out.append(a + b).append('\n');
        }
        System.out.print(out);                            // one flush
    }
}
```

`Scanner` is convenient but slow for large input — use `BufferedReader` + `StringTokenizer`, and accumulate output in a `StringBuilder`.

### Avoid slow patterns

```java
// SLOW: string += in a loop
// SLOW: list.contains(x) in a loop (O(n²)) — use a HashSet
// SLOW: LinkedList.get(i) in a loop — use ArrayList or index arrays
// SLOW: System.out.println in a loop — buffer it
```

### Modern Java shortcuts

```java
// switch expression (Java 14):
String label = switch (n) {
    case 1 -> "one";
    case 2 -> "two";
    default -> "many";
};

// records for pairs/points (Java 16):
record Point(int x, int y) { }

// Math.clamp (Java 21):
int clamped = Math.clamp(x, 0, 100);

// Integer comparisons:
Integer.compare(a, b);

// concise var + List.of for fixed data:
var days = List.of("mon", "tue", "wed");
```

These cut boilerplate and reduce typos under time pressure.

### The contest checklist

1. Read **all** constraints and the sample I/O.
2. Pick complexity that fits (14.3) before coding.
3. Write a brute force for small inputs if unsure; then optimize.
4. Handle edge cases (0, 1, empty, negative, extremes).
5. Test on the samples, then your own cases.
6. Use fast I/O from the start.

### Debug under pressure

```java
// quick check with asserts or targeted prints:
if (n <= 5) { /* print intermediate state for small n */ }
```

Print intermediate state for the smallest failing input, then trace by hand.

## Modern Java / Java 25 Update

### JEP 507 — Primitive Types in Patterns (3rd Preview in Java 25)

For concise branching over primitive values, Java 25's preview extends pattern matching to primitives:

```java
// preview: match a primitive in switch with patterns (enable --enable-preview)
String kind = switch (x) {
    case 0 -> "zero";
    case int n when n < 0 -> "negative";
    case int n when n > 0 -> "positive";
};
```

> ⚠️ JEP 507 is a **preview** (needs `--enable-preview`). In contests, plain `switch` expressions (Java 14) work everywhere without preview flags — use those for portability.

## Visual — The Contest Loop

```
 Read problem ──▶ constraints → complexity ──▶ code
     ▲                                          │
     │                                          ▼
  submit ◀────── verify edge cases ◀──── test samples
```

Fast I/O, correct complexity, edge cases — the three pillars of an accepted submission.

## Code Examples

### Example 1 — Fast I/O template

```java
import java.io.*;
import java.util.*;

public class FastIO {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder out = new StringBuilder();

        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        long sum = 0;
        while (n-- > 0) sum += Long.parseLong(st.nextToken());
        out.append(sum).append('\n');

        System.out.print(out);
    }
}
```

### Example 2 — Modern shortcuts

```java
import java.util.*;

public class Shortcuts {
    public static void main(String[] args) {
        // switch expression
        System.out.println(label(2));       // two

        // Math.clamp (Java 21)
        System.out.println(Math.clamp(150, 0, 100));   // 100

        // record as a pair
        record Pair(int a, int b) { }
        Pair p = new Pair(3, 4);
        System.out.println(p.a() + p.b());   // 7
    }

    static String label(int n) {
        return switch (n) {
            case 1 -> "one";
            case 2 -> "two";
            default -> "many";
        };
    }
}
```

### Example 3 — Avoiding O(n²) contains

```java
import java.util.*;

public class FastLookup {
    public static void main(String[] args) {
        int[] arr = {1, 5, 3, 8, 2};
        Set<Integer> set = new HashSet<>();
        for (int x : arr) set.add(x);

        int target = 3;
        System.out.println(set.contains(target));   // O(1), not O(n)
    }
}
```

## Common Mistakes

1. **`Scanner` on 10⁵+ input** — too slow; use `BufferedReader`.
2. **`System.out.println` in a tight loop** — buffer with `StringBuilder`.
3. **`list.contains` in a loop** — O(n²); use a `HashSet`.
4. **`+=` string building** — O(n²); use `StringBuilder`.
5. **Wrong complexity for the constraints** — analyze first (14.3).
6. **Submitting without edge-case tests** — test 0, 1, empty, extremes.

## Best Practices

- Use the fast I/O template for every contest problem.
- Analyze complexity from constraints before coding.
- Use modern shortcuts (switch expressions, records, `Math.clamp`) for clarity.
- Buffer output; avoid slow collection operations.
- Keep a personal template and snippet library.

## Practice Questions

1. Write the fast-I/O template and read two integers and print their sum.
2. Convert a slow `Scanner`-based program to `BufferedReader`.
3. Use a `switch` expression and a record in one small program.
4. Rewrite a `list.contains` loop with a `HashSet`.
5. List the contest checklist items in order.

## Multiple Choice Questions (MCQs)

### Q1. For fast contest input, use:
- a) `Scanner`
- b) `BufferedReader`
- c) `System.in.read()` only
- d) `Console`

**Answer:** b

### Q2. `String +=` in a loop is:
- a) Fast
- b) O(n²) — slow
- c) O(1)
- d) Required

**Answer:** b

### Q3. To avoid O(n²) membership checks, use:
- a) `ArrayList.contains`
- b) `HashSet`
- c) `LinkedList.contains`
- d) `String.indexOf`

**Answer:** b

### Q4. `Math.clamp` was added in:
- a) Java 8
- b) Java 11
- c) Java 17
- d) Java 21

**Answer:** d

### Q5. JEP 507 (Java 25, preview) extends pattern matching to:
- a) Arrays
- b) Primitive types in switch/instanceof
- c) Strings only
- d) Collections

**Answer:** b

## Key Takeaways

- Fast I/O (`BufferedReader` + `StringBuilder`) avoids TLE.
- Avoid `+=`, `list.contains` loops, and per-line printing.
- Modern shortcuts: switch expressions (14), records (16), `Math.clamp` (21).
- Checklist: constraints → complexity → code → edge cases → submit.

## Module 14 Complete 🎉

You've finished **Module 14 — Problem Solving**. Next up: **Module 15 — DSA in Java (1)**.
