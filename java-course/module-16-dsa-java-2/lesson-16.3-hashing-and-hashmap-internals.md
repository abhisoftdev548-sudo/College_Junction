---
module: 16
topic: "16.3"
title: "Hashing and HashMap Internals"
slug: "hashing-and-hashmap-internals"
difficulty: "Advanced"
prerequisites:
  - Heaps and Priority Queues
estimated_minutes: 35
tags:
  - java
  - hashing
  - hashmap
  - equals
  - hashcode
---

# 16.3 Hashing and HashMap Internals

## Overview

**Hashing** maps a key to an integer (a **hash code**), which indexes into a table for O(1) average lookup. `HashMap` is the classic implementation: an array of buckets, each holding entries. Collisions are handled by chaining, and long chains become red-black trees. Understanding `hashCode`/`equals` and the internals makes you a much stronger Java developer.

## Learning Objectives

After this lesson you will be able to:

- Explain how hashing gives O(1) lookup
- Implement `hashCode` and `equals` correctly
- Describe HashMap buckets, collisions, and treeification
- Understand capacity, load factor, and rehashing
- Recognize Java 25's Key Derivation Function API (JEP 510)

## Core Concepts

### The hash → index mapping

```java
int hash = key.hashCode();           // any int
int index = hash & (capacity - 1);   // map to a bucket (capacity = power of 2)
```

A hash function spreads keys across buckets; `hash & (n-1)` works because `n` is a power of 2.

### equals and hashCode — the contract

```java
class Person {
    String name;
    int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return age == p.age && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);   // must match equals
    }
}
```

The contract: **equal objects must have equal hash codes** (the reverse isn't required). If you override one, override the other — `HashMap` depends on both.

### What happens without hashCode

```java
Map<Person, String> map = new HashMap<>();
map.put(new Person("Ankit", 21), "value");
map.get(new Person("Ankit", 21));   // null — unless equals AND hashCode are correct
```

`HashMap` first compares hash codes, then `equals` within the bucket. A broken `hashCode` means lookups miss.

### HashMap internals

```
 array of buckets (capacity = 16 default)
 ┌────┬────┬────┬────┬────┬─...
 │ b0 │ b1 │ b2 │ b3 │ b4 │
 └─┬──┴────┴──┬─┴────┴────┘
   │          │
 [k,v] → [k,v] → [k,v]     ← chain (collision)
   │
   └── becomes a red-black tree if the chain exceeds 8 (treeify threshold)
```

- **put(key, value):** hash → bucket → add/overwrite entry.
- **Collision:** two keys hash to the same bucket → chained.
- **Treeification:** a chain longer than 8 becomes a red-black tree (O(log n) worst case).
- **Load factor (0.75):** when 75% full, the table **rehashes** (doubles capacity, redistributes).

### Records auto-generate equals/hashCode

```java
record Point(int x, int y) { }   // equals + hashCode generated automatically

Map<Point, String> map = new HashMap<>();
map.put(new Point(1, 2), "p");
map.get(new Point(1, 2));        // "p" — works out of the box
```

### HashMap vs HashSet vs Hashtable

- `HashSet` is a `HashMap` with only keys (values are a dummy).
- `HashMap` allows one null key; `Hashtable` (legacy, synchronized) does not.
- Use `ConcurrentHashMap` for thread safety (12.4).

### A simple string hash (learning)

```java
int h = 0;
for (char c : s.toCharArray()) h = h * 31 + c;   // Java's classic polynomial hash
```

## Modern Java / Java 25 Update

### JEP 510 — Key Derivation Function API (Final in Java 25)

Hashing isn't just for maps — cryptography **derives keys** from passwords. Java 25 finalizes a standard **KDF API** (HKDF) in `javax.crypto`:

```java
import javax.crypto.KDF;

// Derive a key from a secret using HKDF (RFC 5869):
KDF kdf = KDF.getInstance("HKDF-SHA256");
SecretKey key = kdf.deriveKey("password".toCharArray(), salt, 32);   // 32-byte key
```

> ⚠️ This is **cryptographic** key derivation, not `HashMap`'s `hashCode` — but it's the same "hash" idea applied to security, and it's now a standard Java 25 API.

## Visual — HashMap Lookup

```
 get(key):
   hashCode(key) ──▶ hash & (n-1) ──▶ bucket index
                                         │
                                    scan the bucket:
                                     equals(key)? ──▶ value (or null)
```

Two steps: hash to a bucket, then `equals` within the bucket. Correct `hashCode` + `equals` make this O(1).

## Code Examples

### Example 1 — Correct equals/hashCode

```java
import java.util.*;

public class Person {
    String name;
    int age;

    Person(String name, int age) { this.name = name; this.age = age; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return age == p.age && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() { return Objects.hash(name, age); }

    public static void main(String[] args) {
        Map<Person, String> map = new HashMap<>();
        map.put(new Person("Ankit", 21), "student");
        System.out.println(map.get(new Person("Ankit", 21)));   // student
    }
}
```

### Example 2 — Records as map keys

```java
import java.util.*;

record Point(int x, int y) { }

public class RecordKey {
    public static void main(String[] args) {
        Map<Point, String> grid = new HashMap<>();
        grid.put(new Point(2, 3), "treasure");
        System.out.println(grid.get(new Point(2, 3)));   // treasure (record equals/hashCode)
    }
}
```

### Example 3 — Character frequency

```java
import java.util.*;

public class Frequency {
    public static void main(String[] args) {
        String s = "abracadabra";
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        System.out.println(freq);   // {a=5, b=2, r=2, c=1, d=1}
    }
}
```

## Common Mistakes

1. **Overriding `equals` without `hashCode`** — lookups silently fail in hash collections.
2. **`hashCode` not matching `equals`** — two equal objects must hash equally.
3. **Using mutable fields in `hashCode`** — changing a key's fields after insertion breaks lookup.
4. **Comparing with `==` for keys** — use `equals`.
5. **`HashMap` iteration order assumptions** — it's unordered; use `LinkedHashMap`/`TreeMap`.
6. **Using `Hashtable`** — legacy; prefer `HashMap` or `ConcurrentHashMap`.

## Best Practices

- Always override `equals` **and** `hashCode` together (or use records).
- Use immutable fields (or immutable keys) in hash-based collections.
- Prefer `Objects.hash(...)`/`Objects.equals(...)` for correctness.
- Use records for simple data keys — `equals`/`hashCode` come free.
- Know the load factor and capacity when tuning performance.

## Practice Questions

1. Write a `Person` class with correct `equals` and `hashCode`.
2. Show what happens when `hashCode` is missing (lookup returns null).
3. Use a record as a `HashMap` key and look it up.
4. Explain collisions, chaining, treeification, and rehashing.
5. Describe (in a comment) Java 25's KDF API (JEP 510) and its purpose.

## Multiple Choice Questions (MCQs)

### Q1. `HashMap` lookup is on average:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q2. Equal objects must have:
- a) Different hash codes
- b) Equal hash codes
- c) The same reference
- d) No hash code

**Answer:** b

### Q3. A HashMap collision means:
- a) Two keys hash to the same bucket
- b) The map is full
- c) A null key
- d) A sorted entry

**Answer:** a

### Q4. A chain longer than 8 becomes:
- a) A list
- b) A red-black tree (treeification)
- c) A set
- d) Deleted

**Answer:** b

### Q5. JEP 510 (Java 25) provides:
- a) A faster HashMap
- b) A Key Derivation Function (HKDF) API
- c) Sorting
- d) GC improvements

**Answer:** b

## Key Takeaways

- Hashing maps keys to buckets for O(1) average lookup.
- Override `equals` **and** `hashCode` together; records do it automatically.
- HashMap: buckets + chaining + treeification + load-factor rehashing.
- Java 25 adds a standard KDF (HKDF) API (JEP 510).

## Next Topic

[16.4 Graphs and Traversal](lesson-16.4-graphs-and-traversal.md)
