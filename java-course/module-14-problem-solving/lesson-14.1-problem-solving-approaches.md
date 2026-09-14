---
module: 14
topic: "14.1"
title: "Problem-Solving Approaches"
slug: "problem-solving-approaches"
difficulty: "Advanced"
prerequisites:
  - Modules 1–13
estimated_minutes: 30
tags:
  - java
  - problem-solving
  - algorithms
---

# 14.1 Problem-Solving Approaches

## Overview

Problem solving is a **skill**, not luck — a repeatable process. Great problem solvers follow a structured approach: understand the problem, explore examples, break it into sub-problems, choose an approach (brute force → optimize), and verify. This lesson teaches that framework, applied in Java.

## Learning Objectives

After this lesson you will be able to:

- Follow a 5-step problem-solving process
- Restate and decompose problems
- Distinguish brute-force vs optimized approaches
- Choose among common strategies (greedy, divide-and-conquer, dynamic programming)
- Translate a plan into Java code

## Core Concepts

### The 5-step process

1. **Understand** — restate the problem in your own words; identify inputs, outputs, constraints.
2. **Explore examples** — try small, edge, and counter-examples by hand.
3. **Break it down** — decompose into smaller, solvable sub-problems.
4. **Solve & optimize** — start with a brute force, then improve (14.3 measures it).
5. **Verify** — test against your examples, then the real test cases.

### Understand first

```java
// Problem: "Given an array, find the maximum subarray sum."
// Input:  int[] nums          Output: int (max sum)
// Constraints: 1 ≤ n ≤ 10^5, values can be negative
```

Restating and pinning down constraints changes the approach — constraints hint at the required complexity (10^5 rules out O(n²)).

### Explore small examples

```java
// nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// hand-trace the expected answer: 6 (subarray [4,-1,2,1])
```

Working small examples by hand reveals patterns and edge cases (all negative? empty?).

### Break it down (decompose)

```java
// "Validate a phone number" →
//   1. length check   2. digits-only check   3. format check
// Each sub-problem is a small, testable method.
```

### Common strategies

| Strategy | Idea | Classic problems |
|---|---|---|
| Brute force | try all possibilities | baseline, small inputs |
| Greedy | best local choice | coin change (some), activity selection |
| Divide & conquer | split, solve, merge | merge sort, binary search |
| Dynamic programming | solve sub-problems, store results | knapsack, LCS, fibonacci |
| Two pointers | walk from both ends | pair sums, palindromes |
| Sliding window | maintain a window | max subarray, substrings |

### The brute force → optimize path

```java
// Brute force max subarray sum — O(n²):
int max = Integer.MIN_VALUE;
for (int i = 0; i < nums.length; i++) {
    int sum = 0;
    for (int j = i; j < nums.length; j++) {
        sum += nums[j];
        max = Math.max(max, sum);
    }
}

// Optimized (Kadane's) — O(n):
int best = nums[0], current = nums[0];
for (int i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
}
```

Start correct (brute force), then optimize the hot spot.

## Visual — The Problem-Solving Loop

```
 Understand ──▶ Explore examples ──▶ Decompose
     ▲                                    │
     │                                    ▼
   Verify  ◀──── Optimize  ◀────  Solve (brute force)
```

Correct first, then fast. Loop back with new examples when verification fails.

## Code Examples

### Example 1 — Restate and solve: FizzBuzz

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            if (i % 15 == 0) System.out.println("FizzBuzz");
            else if (i % 3 == 0) System.out.println("Fizz");
            else if (i % 5 == 0) System.out.println("Buzz");
            else System.out.println(i);
        }
    }
}
```

### Example 2 — Two-pointer palindrome check

```java
public class Palindrome {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}
```

### Example 3 — Decomposed validation

```java
public class Validate {
    public static boolean validEmail(String email) {
        return hasAt(email) && hasDotAfterAt(email) && noSpaces(email);
    }

    static boolean hasAt(String e) { return e.indexOf('@') > 0; }
    static boolean hasDotAfterAt(String e) {
        int at = e.indexOf('@');
        return at != -1 && e.indexOf('.', at) > at + 1;
    }
    static boolean noSpaces(String e) { return !e.contains(" "); }
}
```

## Common Mistakes

1. **Coding before understanding** — restate the problem and constraints first.
2. **Skipping examples** — edge cases (empty, single, negative) catch bugs early.
3. **Jumping straight to "optimal"** — get a brute force working, then optimize.
4. **Ignoring constraints** — they dictate the required complexity.
5. **One big method** — decompose into small, testable pieces.
6. **Not verifying against hand-computed answers** — never trust the first run.

## Best Practices

- Follow the 5-step process explicitly until it's habit.
- Write down inputs, outputs, and constraints.
- Hand-trace small examples including edge cases.
- Solve brute-force first; optimize measured bottlenecks.
- Decompose into small methods you can reason about and test.

## Practice Questions

1. Restate this problem in your own words: "find the two numbers in a sorted array that sum to a target."
2. Solve it with a brute force, then with two pointers.
3. List three strategies and a classic problem for each.
4. Decompose "is a string a valid password" into sub-checks and code them.
5. Hand-trace the max-subarray problem on a small example.

## Multiple Choice Questions (MCQs)

### Q1. The first step in problem solving is:
- a) Write code
- b) Understand the problem
- c) Optimize
- d) Choose a language

**Answer:** b

### Q2. Constraints in a problem hint at:
- a) Variable names
- b) The required time complexity
- c) Indentation style
- d) Comments

**Answer:** b

### Q3. "Split, solve, merge" describes:
- a) Greedy
- b) Divide and conquer
- c) Two pointers
- d) Brute force

**Answer:** b

### Q4. Dynamic programming:
- a) Tries every combination blindly
- b) Solves sub-problems and stores their results
- c) Always picks the greedy choice
- d) Uses two pointers

**Answer:** b

### Q5. The recommended order is:
- a) Optimize → solve → verify
- b) Solve (brute force) → optimize → verify
- c) Verify → solve
- d) Optimize only

**Answer:** b

## Key Takeaways

- Follow the 5-step process: understand, explore, decompose, solve+optimize, verify.
- Constraints dictate complexity; small examples reveal edge cases.
- Brute force first, optimize second; decompose into testable methods.
- Strategies: brute force, greedy, divide & conquer, DP, two pointers, sliding window.

## Next Topic

[14.2 Common Patterns](lesson-14.2-common-patterns.md)
