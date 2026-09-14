# C++ Course — Coding Problems Bank (Step 4)

A curated set of coding problems aligned to each module — 3 per module (Easy → Medium → Hard). Each lists topics, difficulty, a statement, examples, hints, and the target complexity. Solve after finishing the module's lessons.

---

## Module 1 — C++ Basics

### P1.1 Hello, World — EASY
**Topics:** program structure, output
**Statement:** Print `Hello, World!` followed by a newline.
**Example:** Output → `Hello, World!`
**Hint:** Use `std::cout << "Hello, World!\n";` inside `int main()`.

### P1.2 Sum of Two Numbers — EASY
**Topics:** input, arithmetic
**Statement:** Read two integers `a` and `b` and print their sum.
**Example:** Input `3 7` → Output `10`.
**Hint:** `std::cin >> a >> b;` then `std::cout << a + b;`.

### P1.3 Compile & Explain — EASY
**Topics:** compilation
**Statement:** Write a program that prints your name, then compile it with `g++` and run the executable. Explain what the compiler produced.
**Hint:** Preprocess → compile → assemble → link → executable.

---

## Module 2 — C++ Fundamentals

### P2.1 Celsius to Fahrenheit — EASY
**Topics:** variables, operators, casting
**Statement:** Read a temperature in Celsius (a `double`) and print it in Fahrenheit using `F = C * 9.0/5.0 + 32`.
**Example:** Input `100` → Output `212`.
**Hint:** Use `double` and `/5.0` to keep decimal division.

### P2.2 Even or Odd — EASY
**Topics:** modulus, conditionals
**Statement:** Read an integer and print `even` or `odd`.
**Example:** Input `4` → Output `even`.
**Hint:** `n % 2 == 0`.

### P2.3 Overflow Detector — MEDIUM
**Topics:** data types, overflow
**Statement:** Compute `n!` for `n = 20` using `long long`, then try `int`. Explain the difference and where `int` breaks.
**Hint:** `int` overflows around `13!`; `long long` holds up to ~`20!`.

---

## Module 3 — Control Flow

### P3.1 FizzBuzz — EASY
**Topics:** loops, conditionals
**Statement:** Print `1` to `n`. For multiples of 3 print `Fizz`, of 5 print `Buzz`, of both print `FizzBuzz`.
**Example:** `n = 15` → `1 2 Fizz 4 Buzz ... 14 FizzBuzz`.
**Hint:** Check `% 15` first.

### P3.2 Sum of Digits — EASY
**Topics:** while loop
**Statement:** Read an integer and print the sum of its digits.
**Example:** Input `123` → Output `6`.
**Hint:** Loop `n % 10` then `n /= 10` until `n == 0`.

### P3.3 Diamond Pattern — MEDIUM
**Topics:** nested loops
**Statement:** Print a diamond of `*` with `n` rows (odd `n`).
**Example:** `n = 5` → a diamond with a middle row of 5 stars.
**Hint:** Build the upper pyramid then the lower inverted pyramid.

---

## Module 4 — Functions

### P4.1 GCD (Euclid) — EASY
**Topics:** functions, recursion/iteration
**Statement:** Write `int gcd(int a, int b)` returning the greatest common divisor.
**Example:** `gcd(48, 18)` → `6`.
**Hint:** `b == 0 ? a : gcd(b, a % b)`.

### P4.2 Prime Checker — EASY
**Topics:** functions, loops
**Statement:** Write `bool isPrime(int n)` returning whether `n` is prime.
**Example:** `isPrime(17)` → `true`; `isPrime(18)` → `false`.
**Hint:** Trial division up to `sqrt(n)`.

### P4.3 Tower of Hanoi (count moves) — HARD
**Topics:** recursion
**Statement:** For `n` disks, print the moves (source → destination) using the recursive Hanoi algorithm.
**Example:** `n = 2` → `A→B`, `A→C`, `B→C`.
**Hint:** Move `n-1` to the helper, move the largest, move `n-1` back.

---

## Module 5 — Arrays and Strings

### P5.1 Array Sum and Average — EASY
**Topics:** arrays, loops
**Statement:** Read `n` numbers into an array and print their sum and average.
**Hint:** Use a loop and `double` for the average.

### P5.2 Reverse a String — EASY
**Topics:** strings, two pointers
**Statement:** Reverse a `std::string` in place.
**Example:** `"hello"` → `"olleh"`.
**Hint:** Swap `s[i]` and `s[n-1-i]`.

### P5.3 Rotate Array Right by k — MEDIUM
**Topics:** arrays, reversal
**Statement:** Rotate an array right by `k` positions in O(n) time, O(1) space.
**Example:** `[1,2,3,4,5]`, `k=2` → `[4,5,1,2,3]`.
**Hint:** The three-reverses trick (`k %= n` first).

---

## Module 6 — Memory and Pointers

### P6.1 Swap via Pointers — EASY
**Topics:** pointers
**Statement:** Write `void swap(int* a, int* b)` that swaps two integers through pointers.
**Hint:** Dereference with `*` to read/write the pointed-to values.

### P6.2 Dynamic Array — MEDIUM
**Topics:** dynamic memory
**Statement:** Read `n`, allocate an `int` array of size `n` with `new`, fill and print it, then `delete[]` it.
**Hint:** `int* arr = new int[n];` … `delete[] arr;`.

### P6.3 Linked List with Smart Pointers — HARD
**Topics:** smart pointers, ownership
**Statement:** Build a singly linked list using `std::unique_ptr<Node>` and print its values.
**Hint:** Each node owns the next via `std::unique_ptr<Node> next;`.

---

## Module 7 — OOP

### P7.1 Rectangle Class — EASY
**Topics:** classes, encapsulation
**Statement:** Write a `Rectangle` class with private `width`/`height`, a constructor, and `area()`.
**Hint:** Private fields + public getters/area.

### P7.2 Bank Account — MEDIUM
**Topics:** classes, encapsulation, invariants
**Statement:** A `BankAccount` with `deposit`, `withdraw` (rejecting overdrafts), and `balance()`. Balance stays private.
**Hint:** Validate inside `withdraw`; never expose the raw field.

### P7.3 Shape Hierarchy with Virtual Functions — HARD
**Topics:** inheritance, polymorphism
**Statement:** Define an abstract `Shape` with `virtual double area()`, plus `Circle` and `Rectangle` subclasses. Sum the areas of a `vector<Shape*>`.
**Hint:** `virtual` + override; iterate via base pointers.

---

## Module 8 — Advanced C++

### P8.1 Generic max — EASY
**Topics:** templates
**Statement:** Write `template <typename T> T mymax(T a, T b)` returning the larger value.
**Hint:** One template function works for any comparable type.

### P8.2 Safe Division — MEDIUM
**Topics:** exceptions
**Statement:** Write `int divide(int a, int b)` that throws `std::invalid_argument` on division by zero, caught in `main`.
**Hint:** `throw` + `try`/`catch`.

### P8.3 File Line Counter — MEDIUM
**Topics:** file I/O
**Statement:** Count and print the number of lines in a text file.
**Hint:** `std::ifstream` + `std::getline` in a loop.

---

## Module 9 — Modern C++

### P9.1 Sum with a Lambda — EASY
**Topics:** lambdas
**Statement:** Use `std::accumulate` with a lambda to sum a `vector<int>`.
**Hint:** `std::accumulate(v.begin(), v.end(), 0, [](int a, int b){ return a+b; });`

### P9.2 Dedupe with Structured Bindings — MEDIUM
**Topics:** auto, structured bindings, map
**Statement:** Count character frequencies in a string using `std::map<char,int>` and print each `(char, count)` pair using a structured binding.
**Hint:** `for (const auto& [ch, cnt] : freq)`.

### P9.3 constexpr Fibonacci — HARD
**Topics:** constexpr, compile-time
**Statement:** Write a `constexpr int fib(int n)` and use it to size a `std::array`.
**Hint:** A `constexpr` function evaluated at compile time can be used as a template/array size.

---

## Module 10 — STL

### P10.1 Reverse a Vector — EASY
**Topics:** vectors, algorithms
**Statement:** Reverse a `vector<int>` using `std::reverse`.
**Hint:** `<algorithm>` — `std::reverse(v.begin(), v.end());`

### P10.2 Word Frequency with map — MEDIUM
**Topics:** associative containers
**Statement:** Read words and print each word with its frequency, sorted by word.
**Hint:** `std::map<std::string, int>` sorts keys automatically.

### P10.3 Top-K with Priority Queue — HARD
**Topics:** heaps, priority_queue
**Statement:** Find the `k` largest numbers in an array in O(n log k).
**Hint:** A min-heap (`std::priority_queue<int, vector<int>, greater<>>`) of size `k`.

---

## Module 11 — Problem Solving

### P11.1 Two Sum (sorted) — EASY
**Topics:** two pointers
**Statement:** Given a sorted array, return two indices whose values sum to a target.
**Hint:** Left/right pointers converge.

### P11.2 Maximum Subarray Sum — MEDIUM
**Topics:** Kadane's algorithm
**Statement:** Find the contiguous subarray with the largest sum.
**Example:** `[-2,1,-3,4,-1,2,1,-5,4]` → `6`.
**Hint:** Track `current = max(x, current + x)`.

### P11.3 Analyze Complexity — HARD
**Topics:** Big-O
**Statement:** For three given code snippets, state their time and space complexity and justify it.
**Hint:** Nested loops multiply; sequential loops add.

---

## Module 12 — DSA Prep

### P12.1 Reverse a Linked List — EASY
**Topics:** linked lists
**Statement:** Reverse a singly linked list iteratively.
**Hint:** Three pointers: `prev`, `cur`, `next`.

### P12.2 Balanced Parentheses — MEDIUM
**Topics:** stacks
**Statement:** Check whether a string of `(){}[]` is balanced.
**Hint:** Push opens, match closes against the stack top.

### P12.3 Merge Sort — HARD
**Topics:** divide and conquer, recursion
**Statement:** Implement merge sort and state its time and space complexity.
**Hint:** Split, recurse, merge with a temp buffer.

---

## Module 13 — Trees

### P13.1 Binary Tree Height — EASY
**Topics:** trees, recursion
**Statement:** Return the height of a binary tree.
**Hint:** `1 + max(height(left), height(right))`.

### P13.2 Validate a BST — MEDIUM
**Topics:** BST
**Statement:** Check whether a binary tree is a valid BST.
**Hint:** Pass min/max bounds down the recursion.

### P13.3 Level-Order Traversal — HARD
**Topics:** BFS, queues
**Statement:** Print a binary tree level by level (one line per level).
**Hint:** Queue-based BFS; track the level size.

---

## Module 14 — Graphs

### P14.1 BFS Traversal — EASY
**Topics:** graphs, BFS
**Statement:** Traverse an undirected graph from node 0 and print nodes in BFS order.
**Hint:** Queue + visited set.

### P14.2 Connected Components — MEDIUM
**Topics:** DFS/union-find
**Statement:** Count the number of connected components in an undirected graph.
**Hint:** Count fresh DFS (or union) starts.

### P14.3 Dijkstra's Shortest Path — HARD
**Topics:** shortest paths
**Statement:** Find shortest distances from a source in a weighted graph.
**Hint:** Priority queue of `(distance, node)`.

---

## Module 15 — Hashing and Advanced Topics

### P15.1 First Non-Repeating Character — EASY
**Topics:** hashing, frequency
**Statement:** Return the first character that appears exactly once.
**Hint:** Two passes with a frequency array/map.

### P15.2 Coin Change (Greedy/DP) — MEDIUM
**Topics:** dynamic programming
**Statement:** Find the minimum coins to make an amount (classic DP).
**Hint:** `dp[a] = min(dp[a], dp[a - coin] + 1)`.

### P15.3 Count Set Bits — HARD
**Topics:** bit manipulation
**Statement:** Count the number of 1-bits in an integer without iterating 32 times.
**Hint:** `n & (n-1)` clears the lowest set bit.

---

## Module 16 — Interview Prep and Project

### P16.1 Two-Sum Walkthrough — EASY
**Topics:** interview process
**Statement:** Solve "two sum" while narrating your approach, complexity, and edge cases (empty, duplicates, no answer).
**Hint:** Use the UMPIRE structure.

### P16.2 LRU Cache — HARD
**Topics:** data structure design
**Statement:** Design an LRU cache with `get` and `put` in O(1).
**Hint:** Hash map + doubly linked list.

### P16.3 Mini Project: Student Grade Manager — HARD
**Topics:** full project
**Statement:** Build a console app that stores student names and grades (in a file), computes averages, and lists top scorers — using classes, STL, and file I/O.
**Hint:** Combine `Student` class, `vector`/`map`, and `fstream`.
