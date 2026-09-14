---
module: 10
topic: "10.2"
title: "Generic Classes and Methods"
slug: "generic-classes-and-methods"
difficulty: "Intermediate"
prerequisites:
  - Introduction to Generics
estimated_minutes: 30
tags:
  - java
  - generics
  - generic-classes
  - generic-methods
---

# 10.2 Generic Classes and Methods

## Overview

You can write your own **generic classes** (like `Box<T>`, a class parameterized by a type) and **generic methods** (a method with its own type parameter). These let you build reusable, type-safe containers and algorithms — one implementation, many types. This is how `ArrayList`, `Optional`, and `Pair`-style utilities are built.

## Learning Objectives

After this lesson you will be able to:

- Declare a generic class with type parameters
- Write generic methods (including static ones)
- Use multiple type parameters (`<K, V>`)
- Bound type parameters with `extends`
- Apply generics to interfaces and records

## Core Concepts

### A generic class

```java
public class Box<T> {          // T is the type parameter
    private T value;

    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<String> stringBox = new Box<>();
stringBox.set("hello");
String s = stringBox.get();    // typed — no cast

Box<Integer> intBox = new Box<>();
intBox.set(42);
int i = intBox.get();
```

`Box<T>` is one class that works for any `T` — `Box<String>` and `Box<Integer>` are different parameterized types.

### Multiple type parameters

```java
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> p = new Pair<>("age", 21);
```

The convention is single letters: `T` (type), `E` (element), `K` (key), `V` (value).

### Generic methods

```java
public class Utils {
    public static <T> T firstOrNull(List<T> list) {   // method's own type param
        return list.isEmpty() ? null : list.get(0);
    }

    public static <T> void printAll(List<T> list) {
        for (T item : list) System.out.println(item);
    }
}

String s = Utils.firstOrNull(List.of("a", "b"));   // T inferred as String
```

The `<T>` before the return type declares the method's type parameter; the compiler infers `T` from the call.

### Bounded type parameters

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// T must be Comparable — so we can call compareTo on it
max(3, 5);              // Integer
max("apple", "banana"); // String
```

`<T extends Comparable<T>>` bounds `T` to types that implement `Comparable` — giving the method access to `compareTo`.

### Generic interfaces

```java
public interface Repository<T> {
    void save(T entity);
    T findById(String id);
}

public class UserRepository implements Repository<User> {   // fix T = User
    public void save(User u) { /* ... */ }
    public User findById(String id) { return null; }
}
```

### Generic records (modern)

```java
public record Pair<T, U>(T first, U second) { }   // generics work with records

Pair<String, Integer> p = new Pair<>("name", 21);
```

## Visual — One Class, Many Types

```
 Box<T>  (blueprint)
   │
   ├── Box<String>  → value field is String
   ├── Box<Integer> → value field is Integer
   └── Box<Student> → value field is Student

 One implementation, instantiated for many types — all type-safe.
```

The type parameter is a placeholder the compiler fills in per usage.

## Code Examples

### Example 1 — Generic stack

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Stack<T> {
    private Deque<T> items = new ArrayDeque<>();

    public void push(T item) { items.push(item); }
    public T pop() { return items.pop(); }
    public boolean isEmpty() { return items.isEmpty(); }

    public static void main(String[] args) {
        Stack<String> s = new Stack<>();
        s.push("a");
        s.push("b");
        while (!s.isEmpty()) System.out.println(s.pop());   // b, a
    }
}
```

### Example 2 — Generic max method

```java
public class MathUtil {
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(max(3, 9));               // 9
        System.out.println(max("apple", "banana"));  // banana
    }
}
```

### Example 3 — Generic pair record

```java
public record Entry<K, V>(K key, V value) {
    public static void main(String[] args) {
        Entry<String, Integer> e = new Entry<>("roll", 21);
        System.out.println(e.key() + " = " + e.value());   // roll = 21
    }
}
```

## Common Mistakes

1. **Forgetting `<T>` on a static generic method** — static methods can't use the class's `T`; they need their own.
2. **Using `T` before declaring it** — the type parameter must be declared on the class or method.
3. **Confusing the type parameter with a real class** — `T` is a placeholder, not `T.class`.
4. **Unbounded `T` with methods needing methods on it** — bound it (`<T extends Comparable<T>>`).
5. **Raw instantiation** — `Box box = new Box()` loses safety; use `Box<String>`.
6. **Primitives as type arguments** — `Box<int>` is invalid; use `Integer`.

## Best Practices

- Keep type parameters single-letter and conventional (`T`, `E`, `K`, `V`).
- Bound type parameters only when you need methods on them.
- Use generic records/classes for reusable containers (`Pair`, `Result`).
- Let the compiler infer type arguments (diamond, method inference).
- Don't over-engineer — generics for genuine reusability, not for one usage.

## Practice Questions

1. Write a generic `Box<T>` with `set`/`get` and use it with two types.
2. Write a generic `Pair<K, V>` class (or record) and create an instance.
3. Write a generic static method `lastOrNull(List<T>)`.
4. Write a bounded generic method `min` using `Comparable`.
5. Implement a generic interface `Repository<T>` in a `UserRepository`.

## Multiple Choice Questions (MCQs)

### Q1. In `Box<T>`, `T` is called a:
- a) Class
- b) Type parameter
- c) Type argument
- d) Raw type

**Answer:** b

### Q2. `Box<String>` makes `String` the:
- a) Type parameter
- b) Type argument
- c) Raw type
- d) Bound

**Answer:** b

### Q3. A static generic method declares its type parameter:
- a) After the class name
- b) Before the return type (`<T> ...`)
- c) Inside the body
- d) It can't be generic

**Answer:** b

### Q4. `<T extends Comparable<T>>` means:
- a) T is a subclass of Comparable
- b) T must implement/be Comparable
- c) T is Comparable<T> only at runtime
- d) T is erased

**Answer:** b

### Q5. `Pair<K, V>` uses:
- a) One type parameter
- b) Two type parameters
- c) No type parameters
- d) A wildcard

**Answer:** b

## Key Takeaways

- Generic classes: `class Box<T>`; multiple params `Pair<K, V>`.
- Generic methods: `<T>` before the return type; bounds via `extends`.
- Bounded types unlock methods on `T` (e.g. `Comparable`).
- Works with interfaces and records; static methods need their own `<T>`.

## Next Topic

[10.3 Wildcards and Bounded Types](lesson-10.3-wildcards-and-bounded-types.md)
