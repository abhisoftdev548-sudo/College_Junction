---
module: 15
topic: "15.4"
title: "Recursion and Backtracking"
slug: "recursion-and-backtracking"
difficulty: "Advanced"
prerequisites:
  - Stacks and Queues
estimated_minutes: 35
tags:
  - java
  - recursion
  - backtracking
---

# 15.4 Recursion and Backtracking

## Overview

**Recursion** solves a problem by having a function call itself on smaller inputs, anchored by a **base case**. **Backtracking** is recursion that explores choices, undoes them (backtracks), and tries the next — the engine behind permutations, subsets, N-Queens, and Sudoku. Mastering both is essential for DSA.

## Learning Objectives

After this lesson you will be able to:

- Write recursive functions with correct base cases
- Compute factorial, fibonacci, and power recursively
- Generate subsets and permutations via backtracking
- Solve N-Queens with backtracking
- Understand the call stack and when to use memoization

## Core Concepts

### The two parts of recursion

```java
public static int factorial(int n) {
    if (n <= 1) return 1;              // BASE CASE — stops the recursion
    return n * factorial(n - 1);       // RECURSIVE CASE — smaller problem
}
```

Every recursive function needs a base case (termination) and a recursive case (progress toward it).

### The call stack

```java
factorial(3)
  = 3 * factorial(2)
         = 2 * factorial(1)
                = 1          ← base case, then unwinds
```

Each call pushes a frame; when the base case returns, the frames unwind and combine results.

### Fibonacci (exponential) → memoized (linear)

```java
// Naive — O(2ⁿ):
public static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// Memoized — O(n):
Map<Integer, Long> memo = new HashMap<>();
public static long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long v = fibMemo(n - 1) + fibMemo(n - 2);
    memo.put(n, v);
    return v;
}
```

Storing results (memoization) turns overlapping-subproblem recursion from exponential to linear.

### Backtracking template

```java
void backtrack(choices, path) {
    if (goalReached) { record(path); return; }   // base case
    for (choice : choices) {
        if (valid(choice)) {
            makeChoice(choice);          // add to path
            backtrack(choices, path);    // explore
            undoChoice(choice);          // BACKTRACK — remove
        }
    }
}
```

Backtracking = choose → explore → un-choose. The undo step is what makes it backtracking.

### Generate subsets

```java
public static void subsets(int[] nums, int i, List<Integer> current, List<List<Integer>> result) {
    if (i == nums.length) {
        result.add(new ArrayList<>(current));   // record a copy
        return;
    }
    current.add(nums[i]);        // include nums[i]
    subsets(nums, i + 1, current, result);
    current.remove(current.size() - 1);   // exclude (backtrack)

    subsets(nums, i + 1, current, result);
}
```

### Generate permutations

```java
public static void permute(int[] nums, int start, List<List<Integer>> result) {
    if (start == nums.length) {
        List<Integer> list = new ArrayList<>();
        for (int n : nums) list.add(n);
        result.add(list);
        return;
    }
    for (int i = start; i < nums.length; i++) {
        swap(nums, start, i);           // choose
        permute(nums, start + 1, result);   // explore
        swap(nums, start, i);           // backtrack
    }
}
```

### N-Queens (backtracking classic)

```java
public static void nQueens(int row, int n, boolean[] cols, boolean[] d1, boolean[] d2, int[] board) {
    if (row == n) { /* found a solution */ return; }
    for (int col = 0; col < n; col++) {
        if (!cols[col] && !d1[row + col] && !d2[row - col + n - 1]) {
            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;
            board[row] = col;          // place
            nQueens(row + 1, n, cols, d1, d2, board);
            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;  // backtrack
        }
    }
}
```

## Visual — Recursion Tree and Backtracking

```
 subsets of [1,2]:
              {}
          /        \
        {1}         {}
       /   \       /   \
    {1,2} {1}   {2}    {}
     ↑ record at leaves

 backtracking = walk the tree, un-choose on the way back up
```

Recursion builds a tree of choices; backtracking explores it and undoes choices.

## Code Examples

### Example 1 — Factorial and power

```java
public class Recursion {
    static int factorial(int n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    static int power(int base, int exp) {
        if (exp == 0) return 1;
        int half = power(base, exp / 2);
        return (exp % 2 == 0) ? half * half : half * half * base;   // O(log exp)
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));   // 120
        System.out.println(power(2, 10));   // 1024
    }
}
```

### Example 2 — Subsets

```java
import java.util.*;

public class Subsets {
    static void subsets(int[] nums, int i, List<Integer> cur, List<List<Integer>> res) {
        if (i == nums.length) { res.add(new ArrayList<>(cur)); return; }
        cur.add(nums[i]);
        subsets(nums, i + 1, cur, res);
        cur.remove(cur.size() - 1);
        subsets(nums, i + 1, cur, res);
    }

    public static void main(String[] args) {
        List<List<Integer>> res = new ArrayList<>();
        subsets(new int[]{1, 2, 3}, 0, new ArrayList<>(), res);
        System.out.println(res);   // [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3],[]]
    }
}
```

### Example 3 — Permutations

```java
import java.util.*;

public class Permutations {
    static void permute(int[] nums, int start, List<List<Integer>> res) {
        if (start == nums.length) {
            List<Integer> list = new ArrayList<>();
            for (int n : nums) list.add(n);
            res.add(list);
            return;
        }
        for (int i = start; i < nums.length; i++) {
            swap(nums, start, i);
            permute(nums, start + 1, res);
            swap(nums, start, i);   // backtrack
        }
    }

    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }

    public static void main(String[] args) {
        List<List<Integer>> res = new ArrayList<>();
        permute(new int[]{1, 2, 3}, 0, res);
        System.out.println(res);   // 6 permutations
    }
}
```

## Common Mistakes

1. **Missing/incorrect base case** — infinite recursion → `StackOverflowError`.
2. **Forgetting to backtrack (undo)** — choices leak into sibling branches.
3. **Adding the same mutable list to results** — add a **copy** (`new ArrayList<>(cur)`).
4. **Not passing updated state** — recurse with `i + 1`/`start + 1`.
5. **Exponential blowup without memoization** — memoize overlapping subproblems.
6. **Deep recursion for large inputs** — prefer iteration when depth can be huge.

## Best Practices

- Always define the base case first.
- Follow choose → explore → un-choose for backtracking.
- Store copies of mutable results.
- Memoize overlapping subproblems (map or array).
- Prefer iteration for linear problems; recursion for tree-like/choice problems.

## Practice Questions

1. Write recursive `factorial` and `fibonacci` (then memoize fibonacci).
2. Compute `x^n` in O(log n) with divide-and-conquer.
3. Generate all subsets of an array.
4. Generate all permutations of an array.
5. Outline (in a comment) how N-Queens backtracking works.

## Multiple Choice Questions (MCQs)

### Q1. Every recursive function needs:
- a) A loop
- b) A base case and a recursive case
- c) A global variable
- d) A stack

**Answer:** b

### Q2. Backtracking means:
- a) Choosing, exploring, and undoing choices
- b) Sorting
- c) Binary search
- d) Memoization

**Answer:** a

### Q3. Naive fibonacci is:
- a) O(n)
- b) O(2ⁿ)
- c) O(log n)
- d) O(1)

**Answer:** b

### Q4. Memoization stores:
- a) The call stack
- b) Results of subproblems to avoid recomputation
- c) The base case only
- d) Comments

**Answer:** b

### Q5. When recording a subset, you should add:
- a) The same list reference
- b) A copy of the current list
- c) Nothing
- d) The array length

**Answer:** b

## Key Takeaways

- Recursion = base case + recursive case; the call stack unwinds results.
- Memoization converts overlapping recursion (fib) from O(2ⁿ) to O(n).
- Backtracking = choose → explore → un-choose (subsets, permutations, N-Queens).
- Record copies; always backtrack; define base cases first.

## Next Topic

[15.5 Sorting and Searching](lesson-15.5-sorting-and-searching.md)
