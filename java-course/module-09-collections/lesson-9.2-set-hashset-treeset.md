---
module: 9
topic: "9.2"
title: "Set — HashSet, TreeSet, LinkedHashSet"
slug: "set-hashset-treeset"
difficulty: "Intermediate"
prerequisites:
  - List — ArrayList and LinkedList
estimated_minutes: 30
tags:
  - java
  - collections
  - set
  - hashset
  - treeset
---

# 9.2 Set — HashSet, TreeSet, LinkedHashSet

## Overview

A **Set** is a collection with **no duplicates** and (usually) no index-based access — it models mathematical sets. The three main implementations differ in ordering and speed: **HashSet** (unordered, O(1)), **TreeSet** (sorted, O(log n)), and **LinkedHashSet** (insertion order, O(1)). Sets are the go-to for uniqueness checks and deduplication.

## Learning Objectives

After this lesson you will be able to:

- Add, remove, and check membership in a Set
- Choose among HashSet, TreeSet, and LinkedHashSet
- Deduplicate a list using a Set
- Sort data using a TreeSet
- Use Set operations (union, intersection, difference)

## Core Concepts

### Creating sets

```java
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

Set<String> hash = new HashSet<>();           // unordered, fastest
Set<String> linked = new LinkedHashSet<>();   // insertion order
Set<String> tree = new TreeSet<>();           // sorted order
Set<String> fixed = Set.of("a", "b", "c");    // Java 9 immutable
```

### Common Set methods

```java
Set<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple");          // duplicate — ignored

set.size();                // 2 (duplicates don't count)
set.contains("apple");     // true — O(1) membership
set.remove("apple");
set.isEmpty();
```

### No duplicates — deduplication

```java
List<String> raw = List.of("a", "b", "a", "c", "b");
Set<String> unique = new HashSet<>(raw);       // pass a collection
System.out.println(unique);                     // [a, b, c] (order not guaranteed)
```

Creating a `HashSet` from a list is the classic one-liner to remove duplicates.

### The three implementations

| Type | Ordering | `contains`/`add` | `null` |
|---|---|---|---|
| `HashSet` | none (hash order) | O(1) | allowed |
| `LinkedHashSet` | insertion order | O(1) | allowed |
| `TreeSet` | sorted (natural/Comparator) | O(log n) | not allowed |

```java
Set<String> hs = new HashSet<>(List.of("banana", "apple", "cherry"));
System.out.println(hs);    // order unpredictable, e.g. [banana, cherry, apple]

Set<String> ls = new LinkedHashSet<>(List.of("banana", "apple", "cherry"));
System.out.println(ls);    // [banana, apple, cherry] — insertion order

Set<String> ts = new TreeSet<>(List.of("banana", "apple", "cherry"));
System.out.println(ts);    // [apple, banana, cherry] — sorted
```

### Set operations

```java
Set<Integer> a = new HashSet<>(List.of(1, 2, 3));
Set<Integer> b = new HashSet<>(List.of(3, 4, 5));

Set<Integer> union = new HashSet<>(a); union.addAll(b);      // 1,2,3,4,5
Set<Integer> inter = new HashSet<>(a); inter.retainAll(b);   // 3
Set<Integer> diff  = new HashSet<>(a); diff.removeAll(b);    // 1,2
```

## Visual — The Three Sets

```
 input order: banana, apple, cherry

 HashSet:        [banana, cherry, apple]   ← hash order (fast, unordered)
 LinkedHashSet:  [banana, apple, cherry]   ← insertion order
 TreeSet:        [apple, banana, cherry]   ← sorted order
```

Same Set contract, different ordering guarantees and performance.

## Code Examples

### Example 1 — Deduplicate emails

```java
import java.util.*;

public class Dedup {
    public static void main(String[] args) {
        List<String> emails = List.of("a@x.com", "b@x.com", "a@x.com", "c@x.com");
        Set<String> unique = new LinkedHashSet<>(emails);   // keeps first-seen order
        System.out.println(unique);   // [a@x.com, b@x.com, c@x.com]
    }
}
```

### Example 2 — Sorted unique names

```java
import java.util.*;

public class SortedNames {
    public static void main(String[] args) {
        Set<String> names = new TreeSet<>();
        names.add("Rohan");
        names.add("Ankit");
        names.add("Priya");
        System.out.println(names);   // [Ankit, Priya, Rohan] — sorted
    }
}
```

### Example 3 — Fast membership

```java
import java.util.*;

public class Lookup {
    public static void main(String[] args) {
        Set<String> dictionary = Set.of("java", "python", "c++", "golang");
        System.out.println(dictionary.contains("java"));   // true — O(1)
        System.out.println(dictionary.contains("rust"));   // false
    }
}
```

## Common Mistakes

1. **Expecting order from a `HashSet`** — it's unordered; use `LinkedHashSet` or `TreeSet`.
2. **Adding `null` to a `TreeSet`** — throws `NullPointerException`.
3. **Mutating objects used as keys** — an object's `hashCode` must stay consistent while in the set.
4. **Forgetting `equals`/`hashCode`** — custom objects are treated as distinct unless you override both.
5. **Using `get(index)` on a Set** — Sets have no index; iterate instead.
6. **`Set.of` disallows duplicates** — `Set.of("a", "a")` throws at creation.

## Best Practices

- Use `HashSet` for fast, unordered membership.
- Use `TreeSet` when you need sorted iteration.
- Use `LinkedHashSet` to preserve insertion order with fast lookup.
- Override `equals` and `hashCode` together for custom key types.
- Use `Set.of` for small immutable sets.

## Practice Questions

1. Deduplicate a list of integers using a `HashSet`.
2. Create a `TreeSet` of strings and show sorted output.
3. Preserve insertion order while deduplicating — which Set and why?
4. Compute the union and intersection of two `Set<Integer>`s.
5. Explain why custom objects need `equals`/`hashCode` to deduplicate properly.

## Multiple Choice Questions (MCQs)

### Q1. A Set:
- a) Allows duplicates
- b) Rejects duplicate elements
- c) Is index-based
- d) Is sorted always

**Answer:** b

### Q2. The unordered, fastest Set is:
- a) `TreeSet`
- b) `HashSet`
- c) `LinkedHashSet`
- d) `SortedSet`

**Answer:** b

### Q3. `TreeSet` keeps elements:
- a) In insertion order
- b) Sorted
- c) In hash order
- d) In reverse insertion order

**Answer:** b

### Q4. `LinkedHashSet` preserves:
- a) Sorted order
- b) Insertion order
- c) Random order
- d) Reverse order

**Answer:** b

### Q5. To compute the union of two sets, use:
- a) `retainAll`
- b) `addAll`
- c) `removeAll`
- d) `clear`

**Answer:** b

## Key Takeaways

- Set = no duplicates, no index; membership in O(1) with hash-based sets.
- `HashSet` (unordered), `LinkedHashSet` (insertion), `TreeSet` (sorted).
- Deduplicate by constructing a Set from a collection; use `addAll`/`retainAll`/`removeAll` for set ops.
- Override `equals`/`hashCode` for custom types.

## Next Topic

[9.3 Map — HashMap, TreeMap, LinkedHashMap](lesson-9.3-map-hashmap-treemap.md)
