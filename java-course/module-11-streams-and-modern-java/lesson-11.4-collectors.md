---
module: 11
topic: "11.4"
title: "Collectors"
slug: "collectors"
difficulty: "Intermediate"
prerequisites:
  - Terminal Operations
estimated_minutes: 30
tags:
  - java
  - streams
  - collectors
---

# 11.4 Collectors

## Overview

**Collectors** are the reusable recipes passed to `stream.collect(...)` that gather stream elements into results — lists, sets, maps, joined strings, and more. The big ones: `toList`/`toSet`/`toMap`, `joining`, `groupingBy`, `partitioningBy`, and `summarizing*`. They turn multi-line accumulation into one expressive call.

## Learning Objectives

After this lesson you will be able to:

- Collect into List, Set, and Map
- Join strings with `Collectors.joining`
- Group elements with `groupingBy`
- Partition with `partitioningBy`
- Summarize data with `summarizingInt` and friends

## Core Concepts

### toList, toSet, toMap

```java
List<String> list = stream.collect(Collectors.toList());
Set<String> set = stream.collect(Collectors.toSet());
Map<String, Integer> map = stream.collect(
    Collectors.toMap(Person::name, Person::age)      // key, value
);
```

`toMap` needs unique keys — duplicates throw `IllegalStateException` unless you add a merge function.

### joining — concatenate strings

```java
String csv = names.stream().collect(Collectors.joining(", "));
String tagged = names.stream().collect(Collectors.joining(", ", "[", "]"));
```

`joining(delimiter, prefix, suffix)` builds one string — great for CSV/display.

### groupingBy — group into a Map

```java
Map<String, List<Student>> byDept = students.stream()
    .collect(Collectors.groupingBy(Student::department));

// count per group:
Map<String, Long> countByDept = students.stream()
    .collect(Collectors.groupingBy(Student::department, Collectors.counting()));
```

`groupingBy(classifier)` returns `Map<K, List<T>>`; add a downstream collector to aggregate (`counting`, `summingInt`, `toList`).

### partitioningBy — split into true/false

```java
Map<Boolean, List<Integer>> split = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

// split.get(true)  → evens
// split.get(false) → odds
```

`partitioningBy` is a special `groupingBy` with exactly two groups (true/false).

### summarizing — statistics

```java
IntSummaryStatistics stats = numbers.stream()
    .collect(Collectors.summarizingInt(Integer::intValue));

stats.getCount();
stats.getSum();
stats.getMin();
stats.getMax();
stats.getAverage();
```

### reducing and mapping downstream

```java
Map<String, Integer> totalByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::department,
        Collectors.summingInt(Employee::salary)   // downstream: sum salaries
    ));
```

## Visual — Collectors at a Glance

```
 collect(...)
   ├── toList / toSet        → a collection
   ├── toMap                 → key→value map
   ├── joining               → one string
   ├── groupingBy            → Map<key, List> (or aggregated)
   ├── partitioningBy        → Map<Boolean, List>
   └── summarizingInt        → count/sum/min/max/avg
```

A collector = "how to gather the stream into a result."

## Code Examples

### Example 1 — joining

```java
import java.util.List;
import java.util.stream.Collectors;

public class Join {
    public static void main(String[] args) {
        List<String> names = List.of("Ankit", "Riya", "Rohan");
        String csv = names.stream().collect(Collectors.joining(", "));
        System.out.println(csv);                       // Ankit, Riya, Rohan
        System.out.println("[" + csv + "]");           // [Ankit, Riya, Rohan]
    }
}
```

### Example 2 — groupingBy

```java
import java.util.*;
import java.util.stream.Collectors;

record Student(String name, String dept) { }

public class Group {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Ankit", "CS"),
            new Student("Riya", "EE"),
            new Student("Rohan", "CS"),
            new Student("Priya", "ME")
        );
        Map<String, List<Student>> byDept = students.stream()
            .collect(Collectors.groupingBy(Student::dept));
        System.out.println(byDept.get("CS"));   // [Student[name=Ankit...], Student[name=Rohan...]]
    }
}
```

### Example 3 — partitioningBy and summarizing

```java
import java.util.*;
import java.util.stream.Collectors;

public class Stats {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);

        Map<Boolean, List<Integer>> parity = nums.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
        System.out.println("evens: " + parity.get(true));    // [2, 4, 6]
        System.out.println("odds:  " + parity.get(false));   // [1, 3, 5]

        IntSummaryStatistics stats = nums.stream()
            .collect(Collectors.summarizingInt(Integer::intValue));
        System.out.println("sum=" + stats.getSum() + ", avg=" + stats.getAverage());
    }
}
```

## Common Mistakes

1. **Duplicate keys in `toMap`** — throws; pass a merge function `(a, b) -> a`.
2. **`null` keys/values in `toMap`** — `HashMap` allows null but the collector may not.
3. **Forgetting a downstream collector in `groupingBy`** — you get `List<T>` per key by default.
4. **Confusing `groupingBy` and `partitioningBy`** — partitioning is for two groups (true/false).
5. **Using `toList()` collector vs `Stream.toList()`** — `Collectors.toList()` returns a mutable `ArrayList`; `Stream.toList()` (Java 16) returns an unmodifiable list.
6. **Summing with `mapToInt` vs collector** — `mapToInt(...).sum()` is often simpler than `summingInt`.

## Best Practices

- Use `Collectors.joining` for CSV and display strings.
- Use `groupingBy` with a downstream collector for aggregated reports.
- Use `partitioningBy` for binary splits.
- Prefer `mapToInt(...).sum()`/`average()` for simple numeric sums.
- Give `toMap` a merge function when keys can collide.

## Practice Questions

1. Collect a list of strings into a comma-separated string.
2. Group a list of students by department using `groupingBy`.
3. Partition a list of numbers into evens and odds.
4. Summarize (count, sum, min, max, avg) a list of integers.
5. Build a `Map<String, Integer>` of name → age with `toMap`, handling duplicates.

## Multiple Choice Questions (MCQs)

### Q1. `Collectors.joining(", ")` produces:
- a) A list
- b) A single joined string
- c) A map
- d) A set

**Answer:** b

### Q2. `groupingBy` returns:
- a) `List<T>`
- b) `Map<K, List<T>>`
- c) `Set<T>`
- d) A boolean

**Answer:** b

### Q3. `partitioningBy` produces:
- a) `Map<Boolean, List<T>>`
- b) `Map<K, List<T>>`
- c) Two lists
- d) A summary

**Answer:** a

### Q4. `summarizingInt` gives:
- a) Only the sum
- b) Count, sum, min, max, average
- c) Only the average
- d) A joined string

**Answer:** b

### Q5. `Collectors.toList()` vs `Stream.toList()` (Java 16):
- a) Both are mutable
- b) `toList()` (Stream) returns an unmodifiable list
- c) Both are unmodifiable
- d) They're identical

**Answer:** b

## Key Takeaways

- Collectors = recipes for `collect(...)`: `toList/toSet/toMap`, `joining`, `groupingBy`, `partitioningBy`, `summarizing*`.
- `groupingBy` + downstream = grouped aggregation.
- `partitioningBy` = true/false split.
- `Stream.toList()` (16) = unmodifiable; `Collectors.toList()` = mutable.

## Next Topic

[11.5 Optional](lesson-11.5-optional.md)
