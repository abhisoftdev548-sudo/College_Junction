---
module: 9
topic: "9.5"
title: "Iterators and Collections Utilities"
slug: "iterators-and-collections-utilities"
difficulty: "Intermediate"
prerequisites:
  - Queue, Deque, and PriorityQueue
estimated_minutes: 30
tags:
  - java
  - collections
  - iterator
  - utilities
---

# 9.5 Iterators and Collections Utilities

## Overview

The **Iterator** pattern lets you traverse a collection uniformly — and crucially, **remove elements safely while iterating**. The **`Collections`** utility class provides static helpers: sorting, searching, reversing, min/max, and synchronization wrappers. Together they round out the Collections Framework.

## Learning Objectives

After this lesson you will be able to:

- Iterate collections with `Iterator` and `ListIterator`
- Remove elements safely during iteration
- Use `Collections` helpers (sort, reverse, shuffle, min/max, frequency)
- Create unmodifiable and synchronized views
- Use `removeIf` (Java 8) and modern immutable copies

## Core Concepts

### Iterator basics

```java
import java.util.Iterator;
import java.util.List;

List<String> list = new ArrayList<>(List.of("a", "b", "c"));

Iterator<String> it = list.iterator();
while (it.hasNext()) {          // is there another element?
    String s = it.next();       // get it and advance
    System.out.println(s);
}
```

### Safe removal while iterating

```java
// WRONG — throws ConcurrentModificationException:
for (String s : list) {
    if (s.equals("b")) list.remove(s);
}

// RIGHT — use the iterator's remove():
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) it.remove();
}
```

Modifying a collection with `remove` during enhanced-for iteration throws — the iterator's `remove()` is the safe way. Even simpler, Java 8's `removeIf`:

```java
list.removeIf(s -> s.equals("b"));   // clean, no iterator needed
```

### ListIterator — bidirectional

```java
ListIterator<String> li = list.listIterator();
li.next();          // forward
li.next();
li.previous();      // backward
li.add("x");        // insert at the cursor
li.set("y");        // replace last-returned
```

`ListIterator` extends `Iterator` with previous/next, add, and set.

### Collections utilities

```java
import java.util.Collections;
import java.util.List;

List<Integer> nums = new ArrayList<>(List.of(4, 1, 3, 2));

Collections.sort(nums);          // [1, 2, 3, 4]
Collections.reverse(nums);       // [4, 3, 2, 1]
Collections.shuffle(nums);       // random order
Collections.min(nums);           // smallest
Collections.max(nums);           // largest
Collections.frequency(nums, 3);  // count of 3
Collections.rotate(nums, 1);     // rotate by distance
Collections.swap(nums, 0, 1);    // swap two positions
```

### Unmodifiable and synchronized views

```java
List<String> fixed = Collections.unmodifiableList(list);    // read-only view
List<String> sync  = Collections.synchronizedList(list);    // thread-safe view
```

These return **views** — wrappers over the original collection.

### Immutable copies (Java 10)

```java
List<String> copy = List.copyOf(list);   // truly immutable snapshot
Set<String> copySet = Set.copyOf(list);
Map<String, Integer> copyMap = Map.copyOf(map);
```

Unlike `unmodifiableList` (a live view), `copyOf` makes an independent immutable copy.

## Visual — Iterator Cursor

```
 list:  [ a | b | c ]
 cursor: ↑              (before first)

 it.next() → "a", cursor moves past a
 it.next() → "b", cursor moves past b
 it.remove() → removes "b" (the last returned)

 hasNext() = true if an element remains after the cursor
```

The iterator maintains a cursor; `remove` targets the last `next()` element.

## Code Examples

### Example 1 — Filter with removeIf

```java
import java.util.*;

public class Filter {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Ankit", "Riya", "Rohan", "Aman"));
        names.removeIf(n -> n.startsWith("A"));   // remove names starting with A
        System.out.println(names);   // [Riya, Rohan]
    }
}
```

### Example 2 — Iterator with safe remove

```java
import java.util.*;

public class SafeRemove {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();   // remove evens safely
        }
        System.out.println(nums);   // [1, 3, 5]
    }
}
```

### Example 3 — Collections utilities

```java
import java.util.*;

public class Utils {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(5, 2, 8, 2, 1));
        Collections.sort(nums);
        System.out.println("sorted: " + nums);                    // [1, 2, 2, 5, 8]
        System.out.println("min: " + Collections.min(nums));      // 1
        System.out.println("max: " + Collections.max(nums));      // 8
        System.out.println("freq(2): " + Collections.frequency(nums, 2));  // 2
        Collections.reverse(nums);
        System.out.println("reversed: " + nums);                  // [8, 5, 2, 2, 1]
    }
}
```

## Common Mistakes

1. **Calling `list.remove` inside enhanced-for** — throws `ConcurrentModificationException`.
2. **Calling `it.remove()` before `it.next()`** — `remove` must follow a `next()`.
3. **Calling `it.remove()` twice in a row** — only one removal per `next()`.
4. **Using `unmodifiableList` thinking it's a snapshot** — it's a live view; use `List.copyOf` for a snapshot.
5. **Forgetting `hasNext()` before `next()`** — throws `NoSuchElementException`.
6. **Modifying the collection during iteration via another reference** — also causes `ConcurrentModificationException`.

## Best Practices

- Use enhanced-for for read-only traversal.
- Use `removeIf` for filtering (cleanest).
- Use `Iterator.remove()` when you need in-place conditional removal.
- Use `ListIterator` for bidirectional traversal and insertion.
- Prefer `List.copyOf`/`Set.copyOf`/`Map.copyOf` for true immutable snapshots.

## Practice Questions

1. Traverse a list with an `Iterator` and remove all negative numbers.
2. Rewrite the removal using `removeIf` and a lambda.
3. Use `ListIterator` to traverse a list backward.
4. Sort, reverse, and shuffle a list with `Collections`.
5. Explain the difference between `unmodifiableList` and `List.copyOf`.

## Multiple Choice Questions (MCQs)

### Q1. `it.remove()` removes:
- a) The first element
- b) The last element returned by `next()`
- c) The whole collection
- d) A random element

**Answer:** b

### Q2. Removing via `list.remove()` during enhanced-for causes:
- a) Nothing
- b) `ConcurrentModificationException`
- c) `NullPointerException`
- d) Silent skip

**Answer:** b

### Q3. `removeIf` was added in:
- a) Java 5
- b) Java 8
- c) Java 11
- d) Java 25

**Answer:** b

### Q4. `Collections.frequency(list, x)` returns:
- a) The index of x
- b) How many times x appears
- c) The total size
- d) A boolean

**Answer:** b

### Q5. `List.copyOf(list)` produces:
- a) A live view
- b) An immutable snapshot copy
- c) A synchronized view
- d) A sorted list

**Answer:** b

## Key Takeaways

- Iterator: `hasNext()`/`next()`/`remove()`; safe removal during iteration.
- `removeIf` (Java 8) is the cleanest filtering tool.
- `Collections`: sort, reverse, shuffle, min, max, frequency, unmodifiable/synchronized views.
- `List.copyOf`/`Set.copyOf`/`Map.copyOf` (Java 10) = immutable snapshots.

## Module 9 Complete 🎉

You've finished **Module 9 — Collections Framework**. Next up: **Module 10 — Generics and Lambdas**.
