---
module: 9
topic: "9.3"
title: "Map — HashMap, TreeMap, LinkedHashMap"
slug: "map-hashmap-treemap"
difficulty: "Intermediate"
prerequisites:
  - Set — HashSet, TreeSet, LinkedHashSet
estimated_minutes: 30
tags:
  - java
  - collections
  - map
  - hashmap
  - treemap
---

# 9.3 Map — HashMap, TreeMap, LinkedHashMap

## Overview

A **Map** stores **key-value pairs** — each key maps to one value (like a dictionary). Lookup is by key, not index. The three main implementations mirror the Sets: **HashMap** (unordered, O(1)), **TreeMap** (sorted by key, O(log n)), and **LinkedHashMap** (insertion order, O(1)). Maps are the backbone of caching, counting, and lookups.

## Learning Objectives

After this lesson you will be able to:

- Add, get, and remove entries from a Map
- Iterate over keys, values, and entries
- Use `getOrDefault`, `putIfAbsent`, and `compute` helpers
- Count frequencies with a Map
- Choose among HashMap, TreeMap, LinkedHashMap

## Core Concepts

### Creating maps

```java
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

Map<String, Integer> hash = new HashMap<>();          // unordered, O(1)
Map<String, Integer> linked = new LinkedHashMap<>();  // insertion order
Map<String, Integer> tree = new TreeMap<>();          // sorted by key
Map<String, Integer> fixed = Map.of("a", 1, "b", 2);  // Java 9 immutable
```

### Common Map methods

```java
Map<String, Integer> ages = new HashMap<>();

ages.put("Ankit", 21);       // insert or update
ages.put("Riya", 22);
ages.get("Ankit");           // 21 (null if absent)
ages.getOrDefault("Rohan", 0); // 0 — default when absent
ages.containsKey("Ankit");   // true
ages.containsValue(21);      // true
ages.remove("Ankit");        // remove by key
ages.size();                 // number of entries
ages.keySet();               // Set of keys
ages.values();               // Collection of values
ages.entrySet();             // Set of Map.Entry (key+value)
```

### Iterating over a Map

```java
for (Map.Entry<String, Integer> e : ages.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}

ages.forEach((k, v) -> System.out.println(k + " = " + v));   // Java 8 lambda
```

### Counting frequencies (classic pattern)

```java
String text = "the cat and the dog and the bird";
Map<String, Integer> freq = new HashMap<>();

for (String word : text.split(" ")) {
    freq.put(word, freq.getOrDefault(word, 0) + 1);
}
System.out.println(freq);   // {the=3, cat=1, and=2, ...}
```

### Helpful modern methods (Java 8+)

```java
ages.putIfAbsent("Ankit", 30);        // only if key absent
ages.computeIfAbsent("Rohan", k -> 0);   // compute lazily if absent
ages.merge("Rohan", 1, Integer::sum);    // combine old and new
ages.replace("Ankit", 23);               // update only if present
```

### The three implementations

| Type | Ordering | `get`/`put` |
|---|---|---|
| `HashMap` | none | O(1) |
| `LinkedHashMap` | insertion order | O(1) |
| `TreeMap` | sorted by key | O(log n) |

```java
Map<String, Integer> tm = new TreeMap<>();
tm.put("banana", 2); tm.put("apple", 1); tm.put("cherry", 3);
System.out.println(tm);   // {apple=1, banana=2, cherry=3} — sorted by key
```

## Visual — A Map as Key→Value

```
 HashMap:
 ┌───────────┬───────────┐
 │   key     │   value   │
 ├───────────┼───────────┤
 │ "Ankit"   │    21     │   get("Ankit") → 21
 │ "Riya"    │    22     │   (lookup by key, not index)
 │ "Rohan"   │    20     │
 └───────────┴───────────┘
   keys are unique; values may repeat
```

A Map = a set of keys, each pointing at a value.

## Code Examples

### Example 1 — Word frequency counter

```java
import java.util.*;

public class WordCount {
    public static void main(String[] args) {
        String sentence = "to be or not to be";
        Map<String, Integer> counts = new HashMap<>();

        for (String word : sentence.split(" ")) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        for (Map.Entry<String, Integer> e : counts.entrySet()) {
            System.out.println(e.getKey() + ": " + e.getValue());
        }
    }
}
```

### Example 2 — Sorted by key (TreeMap)

```java
import java.util.*;

public class SortedScores {
    public static void main(String[] args) {
        Map<String, Integer> scores = new TreeMap<>();
        scores.put("Rohan", 88);
        scores.put("Ankit", 95);
        scores.put("Priya", 91);
        System.out.println(scores);   // {Ankit=95, Priya=91, Rohan=88}
    }
}
```

### Example 3 — merge and computeIfAbsent

```java
import java.util.*;

public class ModernMap {
    public static void main(String[] args) {
        Map<String, Integer> stock = new HashMap<>();
        stock.put("apple", 10);
        stock.merge("apple", 5, Integer::sum);   // 10 + 5 = 15
        stock.merge("banana", 3, Integer::sum);  // absent → 3
        stock.computeIfAbsent("cherry", k -> 1); // absent → 1
        System.out.println(stock);   // {banana=3, apple=15, cherry=1}
    }
}
```

## Common Mistakes

1. **Using a mutable key whose hash changes** — breaks lookups; keys should be immutable.
2. **`get` returning `null`** — either absent or mapped to null; use `containsKey`/`getOrDefault`.
3. **Overwriting accidentally** — `put` replaces existing values; use `putIfAbsent` to guard.
4. **Expecting order from `HashMap`** — use `LinkedHashMap`/`TreeMap`.
5. **Modifying a Map while iterating** — throws `ConcurrentModificationException`; use an iterator or `removeIf`.
6. **`null` keys in `TreeMap`** — not allowed (needs comparison).

## Best Practices

- Prefer `HashMap` for general key-value storage.
- Use `TreeMap` for sorted-by-key iteration; `LinkedHashMap` for insertion order.
- Use `getOrDefault`/`merge`/`computeIfAbsent` for counting and defaulting.
- Use immutable keys (e.g. `String`, records, `Integer`).
- Iterate with `entrySet()` for both key and value.

## Practice Questions

1. Store student names → marks in a `HashMap` and look up one by name.
2. Count character frequencies in a string using a Map.
3. Use `merge` to add quantities to a shopping-cart map.
4. Show the sorted key order of a `TreeMap`.
5. Explain `getOrDefault` vs `get` + null check.

## Multiple Choice Questions (MCQs)

### Q1. A Map stores:
- a) Indexed values only
- b) Key-value pairs
- c) Unique values only
- d) A sorted list

**Answer:** b

### Q2. To retrieve a value by key:
- a) `map.valueAt(key)`
- b) `map.get(key)`
- c) `map.find(key)`
- d) `map[key]`

**Answer:** b

### Q3. `TreeMap` orders entries by:
- a) Insertion order
- b) Key (sorted)
- c) Value
- d) Hash order

**Answer:** b

### Q4. `getOrDefault(key, default)` returns the default when:
- a) The key is absent
- b) The value is zero
- c) The map is a TreeMap
- d) The key is a String

**Answer:** a

### Q5. `merge(key, value, remapping)` is used to:
- a) Delete a key
- b) Combine old and new values
- c) Sort the map
- d) Clear the map

**Answer:** b

## Key Takeaways

- Map = key-value pairs; lookup by key (HashMap O(1), TreeMap sorted, LinkedHashMap insertion).
- Classic frequency counting via `getOrDefault`.
- Java 8+ helpers: `putIfAbsent`, `computeIfAbsent`, `merge`, `replace`.
- Iterate with `entrySet()` or `forEach`; use immutable keys.

## Next Topic

[9.4 Queue, Deque, and PriorityQueue](lesson-9.4-queue-deque-priorityqueue.md)
