---
module: 9
topic: "9.1"
title: "List — ArrayList and LinkedList"
slug: "list-arraylist-linkedlist"
difficulty: "Intermediate"
prerequisites:
  - Arrays and Strings
  - Classes and Objects
estimated_minutes: 30
tags:
  - java
  - collections
  - list
  - arraylist
  - linkedlist
---

# 9.1 List — ArrayList and LinkedList

## Overview

A **List** is an ordered collection that allows duplicates and index-based access. The two workhorses are **ArrayList** (dynamic array — fast random access) and **LinkedList** (doubly-linked nodes — fast insertion/removal at ends). Both implement the `List` interface, so you program to the interface and swap implementations freely.

## Learning Objectives

After this lesson you will be able to:

- Use the `List` interface and its common methods
- Choose between `ArrayList` and `LinkedList`
- Add, remove, get, and iterate over lists
- Sort and search lists
- Create immutable lists with `List.of`

## Core Concepts

### Creating lists

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

List<String> names = new ArrayList<>();          // dynamic array
List<String> queue = new LinkedList<>();         // linked nodes
List<String> fixed = List.of("A", "B", "C");     // Java 9 immutable list
```

Program to the `List` interface (`List<String> names`) so you can change implementations later.

### Common List methods

```java
List<String> list = new ArrayList<>();

list.add("Java");              // append
list.add(0, "C");              // insert at index
list.get(1);                   // "Java" — access by index
list.set(0, "C++");            // replace at index
list.remove("C++");            // remove by object
list.remove(0);                // remove by index
list.size();                   // number of elements
list.contains("Java");         // membership
list.indexOf("Java");          // first index (or -1)
list.isEmpty();                // is it empty?
```

### Iterating

```java
for (String s : list) {           // enhanced for
    System.out.println(s);
}

for (int i = 0; i < list.size(); i++) {   // index loop
    System.out.println(list.get(i));
}
```

### ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|---|---|---|
| `get(i)` / random access | O(1) — fast | O(n) — walk the list |
| `add` at end | O(1) amortized | O(1) |
| add/remove at middle | O(n) — shifting | O(n) to reach + O(1) link |
| add/remove at ends | O(n) (front) | O(1) |
| memory | contiguous array | nodes + pointers |

**Rule of thumb:** use `ArrayList` for read-heavy, index-based work; use `LinkedList` (or better, `ArrayDeque`, see 9.4) for frequent add/remove at the ends.

### Sorting

```java
import java.util.Collections;
import java.util.List;

List<Integer> nums = new ArrayList<>(List.of(3, 1, 2));
Collections.sort(nums);              // natural order → [1, 2, 3]
nums.sort(null);                     // equivalent, List.sort (Java 8)
```

`Collections.sort` (or `list.sort`) sorts in place; the elements must be `Comparable` (or pass a `Comparator`).

### Searching (sorted list)

```java
int idx = Collections.binarySearch(nums, 2);   // must be sorted first
```

## Visual — ArrayList vs LinkedList

```
 ArrayList (contiguous array):
 ┌───┬───┬───┬───┬───┐
 │ A │ B │ C │ D │   │   get(2) → direct jump, O(1)
 └───┴───┴───┴───┴───┘

 LinkedList (nodes with pointers):
  [A]──▶[B]──▶[C]──▶[D]     get(2) → walk 2 hops, O(n)
  head                  tail  addFirst/addLast → O(1)
```

Arrays are random-access; linked lists are efficient at the ends.

## Code Examples

### Example 1 — Basic ArrayList

```java
import java.util.ArrayList;
import java.util.List;

public class GroceryList {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Milk");
        items.add("Bread");
        items.add("Eggs");

        items.remove("Bread");               // by object
        System.out.println(items);           // [Milk, Eggs]
        System.out.println("Size: " + items.size());   // 2
        System.out.println("First: " + items.get(0));  // Milk
    }
}
```

### Example 2 — Sort and search

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SortDemo {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(List.of(45, 78, 12, 90, 33));
        Collections.sort(scores);
        System.out.println(scores);                      // [12, 33, 45, 78, 90]
        int idx = Collections.binarySearch(scores, 78);
        System.out.println("78 at index " + idx);        // 3
    }
}
```

### Example 3 — LinkedList as a queue-ish structure

```java
import java.util.LinkedList;
import java.util.List;

public class LinkedDemo {
    public static void main(String[] args) {
        List<String> tasks = new LinkedList<>();
        tasks.add("design");
        tasks.add("code");
        tasks.add(0, "plan");          // insert at front (O(1) here)
        System.out.println(tasks);     // [plan, design, code]
    }
}
```

## Common Mistakes

1. **Index out of bounds** — `list.get(list.size())` throws `IndexOutOfBoundsException` (valid range is `0..size-1`).
2. **`remove(int)` vs `remove(Object)`** — `list.remove(0)` removes by index; `list.remove("0")` by object.
3. **Modifying while iterating with enhanced for** — throws `ConcurrentModificationException`; use an `Iterator` (9.5).
4. **Using `LinkedList` for random access** — O(n); use `ArrayList`.
5. **Forgetting `List.of` is immutable** — `list.add` on it throws `UnsupportedOperationException`.
6. **`get` on an empty list** — throws; check `isEmpty()`.

## Best Practices

- Declare as `List` (interface), instantiate as `ArrayList`/`LinkedList`.
- Default to `ArrayList`; use `LinkedList` only when end-insert/remove dominates.
- Use `List.of` for small, fixed, immutable lists.
- Use `Collections.sort`/`binarySearch` on sorted lists.
- Use `isEmpty()` rather than `size() == 0`.

## Practice Questions

1. Create an `ArrayList` of 5 numbers, add/remove elements, and print it.
2. Sort a list of strings alphabetically and find one with `binarySearch`.
3. Compare `ArrayList.get(1000)` vs `LinkedList.get(1000)` performance-wise (explain).
4. Create an immutable list with `List.of` and try (in a comment) to explain why adding fails.
5. Insert an element at the front and middle of both list types and print results.

## Multiple Choice Questions (MCQs)

### Q1. A `List` is:
- a) An unordered set
- b) An ordered collection that allows duplicates
- c) A key-value map
- d) A fixed-size array

**Answer:** b

### Q2. `ArrayList` random access (`get`) is:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q3. `List.of("a", "b")` returns a list that is:
- a) Mutable
- b) Immutable
- c) Synchronized
- d) Sorted

**Answer:** b

### Q4. `Collections.binarySearch` requires the list to be:
- a) Empty
- b) Sorted
- c) A LinkedList
- d) Unmodifiable

**Answer:** b

### Q5. `list.remove(0)` removes:
- a) The element "0"
- b) The element at index 0
- c) Nothing
- d) All zeros

**Answer:** b

## Key Takeaways

- `List` = ordered, duplicates allowed, index access.
- `ArrayList` for random access; `LinkedList` for end-heavy insertion/removal.
- `List.of` = immutable factory (Java 9); `Collections.sort`/`binarySearch` for ordering.
- Program to the `List` interface.

## Next Topic

[9.2 Set — HashSet, TreeSet, LinkedHashSet](lesson-9.2-set-hashset-treeset.md)
