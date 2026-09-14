---
module: 15
topic: "15.1"
title: "Arrays and Strings in DSA"
slug: "arrays-and-strings-in-dsa"
difficulty: "Advanced"
prerequisites:
  - Module 14
estimated_minutes: 35
tags:
  - java
  - dsa
  - arrays
  - strings
---

# 15.1 Arrays and Strings in DSA

## Overview

Arrays and strings are the foundation of almost every DSA problem — and the source of most interview questions. This lesson covers the classic operations (reverse, rotate, two-pointer scanning, sliding windows, frequency counting) and string algorithms (anagrams, palindromes, pattern basics) implemented cleanly in Java.

## Learning Objectives

After this lesson you will be able to:

- Reverse, rotate, and shift arrays in place
- Apply two-pointer and sliding-window techniques
- Count frequencies and check anagrams
- Work with 2D arrays
- Use `Arrays` and modern helpers effectively

## Core Concepts

### Reversing an array

```java
public static void reverse(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int tmp = arr[left];
        arr[left] = arr[right];
        arr[right] = tmp;
        left++;
        right--;
    }
}
```

### Rotating an array (k steps right)

```java
public static void rotate(int[] arr, int k) {
    int n = arr.length;
    k %= n;                       // k > n → wrap around
    reverse(arr, 0, n - 1);       // reverse whole
    reverse(arr, 0, k - 1);       // reverse first k
    reverse(arr, k, n - 1);       // reverse rest
}
```

The "three reverses" trick rotates in O(n) time, O(1) space.

### Two pointers (sorted problems)

```java
public static int[] twoSum(int[] sorted, int target) {
    int l = 0, r = sorted.length - 1;
    while (l < r) {
        int sum = sorted[l] + sorted[r];
        if (sum == target) return new int[]{l, r};
        else if (sum < target) l++;
        else r--;
    }
    return new int[]{-1, -1};
}
```

### Sliding window (max sum of size k)

```java
public static int maxWindow(int[] arr, int k) {
    int window = 0;
    for (int i = 0; i < k; i++) window += arr[i];
    int max = window;
    for (int i = k; i < arr.length; i++) {
        window += arr[i] - arr[i - k];
        max = Math.max(max, window);
    }
    return max;
}
```

### Frequency counting / anagrams

```java
public static boolean isAnagram(String a, String b) {
    if (a.length() != b.length()) return false;
    int[] counts = new int[26];
    for (char c : a.toCharArray()) counts[c - 'a']++;
    for (char c : b.toCharArray()) counts[c - 'a']--;
    for (int n : counts) if (n != 0) return false;
    return true;
}
```

A 26-slot int array is the classic O(n) anagram check (no sorting needed).

### Palindrome check

```java
public static boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s.charAt(l) != s.charAt(r)) return false;
        l++; r--;
    }
    return true;
}
```

### 2D arrays

```java
int[][] grid = new int[3][3];
for (int r = 0; r < grid.length; r++)
    for (int c = 0; c < grid[r].length; c++)
        grid[r][c] = r * 3 + c;
```

### Modern helpers

```java
Arrays.sort(arr);                          // dual-pivot quicksort (int), O(n log n)
int idx = Arrays.binarySearch(arr, key);   // on sorted arrays
int[] copy = Arrays.copyOfRange(arr, 0, 5);
Arrays.fill(arr, 0);                       // reset
```

## Visual — Two Pointers vs Sliding Window

```
 two pointers (opposite ends):
 [1, 2, 3, 4, 5]  target 7
  ↑           ↑    → 1+5=6 (<7) → move left in

 sliding window (fixed width):
 [2, 1, 5, 1, 3, 2]  k=3
  └───┘  window=8
     └───┘ window=7 (slide: -2 +1)
```

Two pointers converge; a window slides and updates incrementally.

## Code Examples

### Example 1 — Reverse and rotate

```java
import java.util.Arrays;

public class Rotate {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverse(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));   // [5, 4, 3, 2, 1]

        int[] arr2 = {1, 2, 3, 4, 5};
        rotate(arr2, 2);
        System.out.println(Arrays.toString(arr2));  // [4, 5, 1, 2, 3]
    }

    static void reverse(int[] a, int l, int r) {
        while (l < r) { int t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
    }

    static void rotate(int[] a, int k) {
        int n = a.length; k %= n;
        reverse(a, 0, n - 1); reverse(a, 0, k - 1); reverse(a, k, n - 1);
    }
}
```

### Example 2 — Anagram check

```java
public class Anagram {
    public static boolean isAnagram(String a, String b) {
        if (a.length() != b.length()) return false;
        int[] counts = new int[26];
        for (char c : a.toLowerCase().toCharArray()) counts[c - 'a']++;
        for (char c : b.toLowerCase().toCharArray()) counts[c - 'a']--;
        for (int n : counts) if (n != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent"));   // true
        System.out.println(isAnagram("hello", "world"));     // false
    }
}
```

### Example 3 — Two sum in a sorted array

```java
import java.util.Arrays;

public class TwoSum {
    public static int[] twoSum(int[] sorted, int target) {
        int l = 0, r = sorted.length - 1;
        while (l < r) {
            int sum = sorted[l] + sorted[r];
            if (sum == target) return new int[]{l, r};
            else if (sum < target) l++;
            else r--;
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 6};
        System.out.println(Arrays.toString(twoSum(arr, 6)));   // [1, 3]
    }
}
```

## Common Mistakes

1. **Off-by-one in window/reverse bounds** — trace small cases.
2. **Forgetting `k %= n` in rotation** — k > n breaks without the wrap.
3. **Sorting for anagrams when O(n) frequency works** — both fine, but frequency is faster.
4. **`Arrays.binarySearch` on unsorted arrays** — undefined results; sort first.
5. **Comparing strings with `==`** — use `equals` for content.
6. **Indexing a 2D array as `grid[r, c]`** — Java uses `grid[r][c]`.

## Best Practices

- Master reverse, rotate, two-pointer, sliding window, and frequency templates.
- Use `Arrays.sort`/`binarySearch`/`copyOfRange` for built-in power.
- Prefer O(n) frequency arrays for alphabet problems.
- Handle empty/single-element/negative edge cases.
- Draw the pointers/window when logic gets tricky.

## Practice Questions

1. Reverse an array in place.
2. Rotate an array right by k using the three-reverses trick.
3. Check if two strings are anagrams in O(n).
4. Find a pair in a sorted array summing to a target with two pointers.
5. Find the max sum of any k consecutive elements with a sliding window.

## Multiple Choice Questions (MCQs)

### Q1. In-place array reversal uses:
- a) Extra array
- b) Two pointers swapping
- c) Sorting
- d) Recursion only

**Answer:** b

### Q2. The three-reverses trick performs:
- a) Sorting
- b) Array rotation in O(n), O(1) space
- c) Reversal only
- d) Binary search

**Answer:** b

### Q3. An O(n) anagram check uses:
- a) Sorting
- b) A frequency array
- c) Nested loops
- d) `contains`

**Answer:** b

### Q4. `Arrays.binarySearch` requires the array to be:
- a) Empty
- b) Sorted
- c) Reversed
- d) A string array

**Answer:** b

### Q5. For rotation by k > n, you should:
- a) Return the array
- b) Use `k %= n` first
- c) Throw an error
- d) Rotate k times

**Answer:** b

## Key Takeaways

- Templates: reverse, rotate (three reverses), two pointers, sliding window, frequency counting.
- Anagram/palindrome checks are O(n) with frequency arrays and two pointers.
- Use `Arrays.sort`/`binarySearch`/`copyOfRange`; handle edge cases.

## Next Topic

[15.2 Linked Lists](lesson-15.2-linked-lists.md)
