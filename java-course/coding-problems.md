# Java Course — Coding Problems Bank (Step 4)

A curated set of coding problems aligned to each module — 3 per module (Easy → Medium → Hard). Each lists topics, difficulty, a statement, examples, hints, and the target complexity. Solve after finishing the module's lessons.

---

## Module 1 — Java Basics

### P1.1 Hello, World — EASY
**Topics:** program structure, output
**Statement:** Print `Hello, World!` followed by a newline.
**Example:** Output → `Hello, World!`
**Hint:** `System.out.println("Hello, World!");` inside `public static void main(String[] args)`.

### P1.2 Sum of Two Numbers — EASY
**Topics:** input, arithmetic
**Statement:** Read two integers and print their sum.
**Example:** Input `3 7` → Output `10`.
**Hint:** Use `Scanner` (or the Java 25 `java.io.IO.readInt`).

### P1.3 JVM Explain — EASY
**Topics:** compilation, JVM
**Statement:** Compile a class with `javac`, run it with `java`, and explain what bytecode is.
**Hint:** `javac` produces `.class` bytecode; the JVM runs it on any platform.

---

## Module 2 — Fundamentals

### P2.1 Celsius to Fahrenheit — EASY
**Topics:** variables, operators
**Statement:** Read a temperature in Celsius (a `double`) and print Fahrenheit using `F = C * 9.0/5.0 + 32`.
**Example:** Input `100` → Output `212.0`.
**Hint:** Use `double` and `9.0/5.0` to keep decimal division.

### P2.2 Even or Odd — EASY
**Topics:** modulus, conditionals
**Statement:** Read an integer and print `even` or `odd`.
**Example:** Input `4` → Output `even`.
**Hint:** `n % 2 == 0`.

### P2.3 BigInteger Factorial — MEDIUM
**Topics:** wrapper types, BigInteger
**Statement:** Compute `50!` exactly using `BigInteger`.
**Hint:** `BigInteger` avoids overflow that `int`/`long` hit early.

---

## Module 3 — Control Flow

### P3.1 FizzBuzz — EASY
**Topics:** loops, conditionals
**Statement:** Print `1` to `n`; multiples of 3 → `Fizz`, of 5 → `Buzz`, of both → `FizzBuzz`.
**Example:** `n = 15` → `1 2 Fizz 4 Buzz ... 14 FizzBuzz`.
**Hint:** Check `% 15` first.

### P3.2 Sum of Digits — EASY
**Topics:** while loop
**Statement:** Read an integer and print the sum of its digits.
**Example:** Input `123` → Output `6`.
**Hint:** `n % 10` then `n /= 10` until `n == 0`.

### P3.3 Diamond Pattern — MEDIUM
**Topics:** nested loops
**Statement:** Print a diamond of `*` with `n` rows (odd `n`).
**Example:** `n = 5` → a diamond with a middle row of 5 stars.
**Hint:** Upper pyramid (spaces + odd stars) then inverted lower half.

---

## Module 4 — Methods

### P4.1 GCD (Euclid) — EASY
**Topics:** methods, recursion
**Statement:** Write `static int gcd(int a, int b)` returning the greatest common divisor.
**Example:** `gcd(48, 18)` → `6`.
**Hint:** `return b == 0 ? a : gcd(b, a % b);`

### P4.2 Prime Checker — EASY
**Topics:** methods, loops
**Statement:** Write `static boolean isPrime(int n)`.
**Example:** `isPrime(17)` → `true`; `isPrime(18)` → `false`.
**Hint:** Trial division up to `Math.sqrt(n)`.

### P4.3 Tower of Hanoi (count moves) — HARD
**Topics:** recursion
**Statement:** For `n` disks, print the moves (source → destination).
**Example:** `n = 2` → `A→B`, `A→C`, `B→C`.
**Hint:** Move `n-1` to helper, move largest, move `n-1` back.

---

## Module 5 — Arrays and Strings

### P5.1 Array Sum and Average — EASY
**Topics:** arrays, loops
**Statement:** Read `n` numbers into an array and print their sum and average.
**Hint:** Use a `double` for the average.

### P5.2 Reverse a String — EASY
**Topics:** StringBuilder, two pointers
**Statement:** Reverse a string (with `StringBuilder.reverse()` and manually).
**Example:** `"hello"` → `"olleh"`.
**Hint:** Manual: swap `s[i]` and `s[n-1-i]` via a char array.

### P5.3 Rotate Array Right by k — MEDIUM
**Topics:** arrays, reversal
**Statement:** Rotate an array right by `k` in O(n) time, O(1) space.
**Example:** `[1,2,3,4,5]`, `k=2` → `[4,5,1,2,3]`.
**Hint:** Three-reverses trick (`k %= n` first).

---

## Module 6 — OOP Fundamentals

### P6.1 Rectangle Class — EASY
**Topics:** classes, encapsulation
**Statement:** A `Rectangle` with private `width`/`height`, a constructor, and `area()`.
**Hint:** Private fields + getters + an `area()` method.

### P6.2 Bank Account — MEDIUM
**Topics:** encapsulation, invariants
**Statement:** A `BankAccount` with `deposit`, `withdraw` (rejecting overdrafts), and `getBalance()`.
**Hint:** Validate in `withdraw`; keep `balance` private.

### P6.3 Immutable Value via a Record — HARD
**Topics:** records (Java 16), immutability
**Statement:** Model a `Point` as a `record Point(int x, int y)` and show value equality and immutability.
**Hint:** Records generate `equals`/`hashCode`/accessors and are immutable.

---

## Module 7 — Advanced OOP

### P7.1 Shape Hierarchy — EASY
**Topics:** inheritance, abstract classes
**Statement:** An abstract `Shape` with `area()`, plus `Circle` and `Square` subclasses.
**Hint:** `abstract double area();` and `@Override`.

### P7.2 Sealed Hierarchy — MEDIUM
**Topics:** sealed classes (Java 17), pattern matching
**Statement:** A `sealed interface Payment` permitted `CardPayment` and `CashPayment` (records); switch over them exhaustively.
**Hint:** `sealed ... permits ...` + pattern-matching `switch`.

### P7.3 Polymorphic Zoo — HARD
**Topics:** polymorphism
**Statement:** A `List<Animal>` of `Dog`/`Cat`; call `speak()` polymorphically and use `instanceof` pattern matching for type-specific behaviour.
**Hint:** `if (a instanceof Dog d) ...`.

---

## Module 8 — Exceptions and File I/O

### P8.1 Safe Division — EASY
**Topics:** exceptions
**Statement:** `divide(int a, int b)` that throws `ArithmeticException` on `/0`, caught in `main`.
**Hint:** `try`/`catch`; `assertThrows` in a test.

### P8.2 Custom Checked Exception — MEDIUM
**Topics:** custom exceptions
**Statement:** An `InsufficientFundsException extends Exception` thrown by `withdraw`.
**Hint:** Extend `Exception`, `super(message)`, declare `throws`.

### P8.3 File Line Counter (try-with-resources) — HARD
**Topics:** NIO.2, try-with-resources
**Statement:** Count lines in a file using `Files.lines` in try-with-resources.
**Hint:** `try (var lines = Files.lines(path)) { ... }`.

---

## Module 9 — Collections

### P9.1 Dedupe a List — EASY
**Topics:** Set
**Statement:** Remove duplicates from a list, preserving order.
**Hint:** `LinkedHashSet` (or `distinct()` with streams).

### P9.2 Word Frequency — MEDIUM
**Topics:** Map
**Statement:** Count word frequencies and print them sorted by word.
**Hint:** `TreeMap` or `HashMap` + sorted keys; `merge`/`getOrDefault`.

### P9.3 Top-K Largest — HARD
**Topics:** PriorityQueue
**Statement:** Find the `k` largest numbers in O(n log k).
**Hint:** A min-heap (`PriorityQueue`) of size `k`.

---

## Module 10 — Generics and Lambdas

### P10.1 Generic Box — EASY
**Topics:** generics
**Statement:** A `Box<T>` with `set`/`get`; use it with `String` and `Integer`.
**Hint:** `class Box<T> { private T value; ... }`.

### P10.2 Bounded Generic Max — MEDIUM
**Topics:** bounded type parameters
**Statement:** `static <T extends Comparable<T>> T max(T a, T b)`.
**Hint:** Bound `T` so you can call `compareTo`.

### P10.3 PECS Copy — HARD
**Topics:** wildcards
**Statement:** `static <T> void copy(List<? extends T> src, List<? super T> dest)`.
**Hint:** Producer extends, Consumer super.

---

## Module 11 — Streams and Modern Java

### P11.1 Filter + Map + Sum — EASY
**Topics:** streams
**Statement:** Sum the squares of even numbers in a list using streams.
**Hint:** `filter(n -> n % 2 == 0).map(n -> n * n).reduce(0, Integer::sum)`.

### P11.2 Group By Department — MEDIUM
**Topics:** collectors
**Statement:** Group a list of `Student(name, dept)` records by department using `Collectors.groupingBy`.
**Hint:** `collect(groupingBy(Student::dept))`.

### P11.3 Optional Pipeline — HARD
**Topics:** Optional
**Statement:** Normalize a possibly-empty string (trim → lowercase → validate) using `Optional.map`/`filter`/`orElse`.
**Hint:** Chain `map`, `filter`, then `orElse("invalid")`.

---

## Module 12 — Multithreading and Concurrency

### P12.1 Runnable Counter — EASY
**Topics:** threads
**Statement:** Run a `Runnable` that prints numbers 1–5 in a new thread.
**Hint:** `new Thread(() -> {...}).start();`.

### P12.2 Synchronized Counter — MEDIUM
**Topics:** synchronization
**Statement:** Two threads increment a shared counter 10,000 times each; make it total exactly 20,000.
**Hint:** `synchronized` method (or `AtomicInteger`).

### P12.3 Parallel Downloads with CompletableFuture — HARD
**Topics:** async, CompletableFuture
**Statement:** Fire several `CompletableFuture.supplyAsync` tasks, combine results with `thenCombine`/`allOf`, and handle errors.
**Hint:** `allOf(...).join()` + `exceptionally`.

---

## Module 13 — Memory and Performance

### P13.1 Pass-by-Value Demo — EASY
**Topics:** memory model
**Statement:** Show that reassigning a parameter inside a method doesn't affect the caller's variable.
**Hint:** Java passes references by value.

### P13.2 StringBuilder vs += — MEDIUM
**Topics:** string pool, performance
**Statement:** Time building a 50,000-char string with `+=` vs `StringBuilder` and report the difference.
**Hint:** `System.nanoTime()` around each loop.

### P13.3 Soft-Reference Cache — HARD
**Topics:** references, GC
**Statement:** Implement a `SoftReference`-backed cache that recomputes when the GC clears it.
**Hint:** Check `cache.get()`; on `null`, recompute and re-wrap.

---

## Module 14 — Problem Solving

### P14.1 Two Sum (sorted) — EASY
**Topics:** two pointers
**Statement:** Given a sorted array, return two indices whose values sum to a target.
**Hint:** Left/right pointers converge.

### P14.2 Maximum Subarray Sum — MEDIUM
**Topics:** Kadane's algorithm
**Statement:** Find the contiguous subarray with the largest sum.
**Example:** `[-2,1,-3,4,-1,2,1,-5,4]` → `6`.
**Hint:** `current = max(x, current + x)`.

### P14.3 JUnit Parameterized Test — HARD
**Topics:** testing, JUnit 5
**Statement:** Write a `@ParameterizedTest` for `isPrime` covering 5+ cases including edge cases.
**Hint:** `@ValueSource(ints = {...})`.

---

## Module 15 — DSA in Java (1)

### P15.1 Reverse a Linked List — EASY
**Topics:** linked lists
**Statement:** Reverse a singly linked list iteratively.
**Hint:** Three pointers: `prev`, `cur`, `next`.

### P15.2 Balanced Parentheses — MEDIUM
**Topics:** stacks
**Statement:** Check whether a string of `(){}[]` is balanced.
**Hint:** `ArrayDeque` as a stack; match closes against the top.

### P15.3 Merge Sort — HARD
**Topics:** divide and conquer
**Statement:** Implement merge sort and state its time/space complexity.
**Hint:** Split, recurse, merge with a temp array.

---

## Module 16 — DSA in Java (2) and Interview Prep

### P16.1 Binary Tree Height — EASY
**Topics:** trees
**Statement:** Return the height of a binary tree.
**Hint:** `1 + max(height(left), height(right))`.

### P16.2 Top-K Frequent Elements — MEDIUM
**Topics:** hashing, heaps
**Statement:** Return the `k` most frequent elements.
**Hint:** Frequency map + min-heap of size `k`.

### P16.3 Mini Project: Student Grade Manager — HARD
**Topics:** full project
**Statement:** A console app storing students and grades (in a file), computing averages and top scorers — using records, `List`/`Map`, streams, and NIO file I/O.
**Hint:** Combine `record Student`, `HashMap`, `Files.readAllLines`, and streams.
