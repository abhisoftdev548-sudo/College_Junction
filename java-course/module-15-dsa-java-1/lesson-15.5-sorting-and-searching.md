---
module: 15
topic: "15.5"
title: "Sorting and Searching"
slug: "sorting-and-searching"
difficulty: "Advanced"
prerequisites:
  - Recursion and Backtracking
estimated_minutes: 35
tags:
  - java
  - sorting
  - searching
  - binary-search
---

# 15.5 Sorting and Searching

## Overview

**Sorting** orders data to enable efficient algorithms; **searching** finds elements. Java gives you `Arrays.sort`/`Collections.sort` (O(n log n)) and `binarySearch` (O(log n)) — but interviews ask you to *implement* the classics: bubble, selection, insertion, merge, quick, and binary search. This lesson covers them.

## Learning Objectives

After this lesson you will be able to:

- Implement bubble, selection, and insertion sort
- Implement merge sort and quick sort
- Explain each algorithm's time/space complexity and stability
- Implement binary search (iterative and recursive)
- Choose the right sort/search for a scenario

## Core Concepts

### Bubble sort — O(n²)

```java
public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
        }
    }
}
```

Repeatedly swaps adjacent out-of-order elements; largest "bubbles" to the end each pass.

### Selection sort — O(n²)

```java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int min = i;
        for (int j = i + 1; j < arr.length; j++)
            if (arr[j] < arr[min]) min = j;
        swap(arr, i, min);
    }
}
```

Finds the minimum of the unsorted part and swaps it into place. O(n²), few swaps.

### Insertion sort — O(n²), best O(n)

```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];   // shift right
            j--;
        }
        arr[j + 1] = key;
    }
}
```

Inserts each element into the sorted prefix — excellent for nearly-sorted data (best case O(n)).

### Merge sort — O(n log n)

```java
public static void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
```

Divide in half, sort each, merge. **Stable**, O(n log n) time, O(n) extra space.

### Quick sort — O(n log n) average

```java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}
```

Picks a pivot, partitions smaller/larger around it, recurses. O(n log n) average, O(n²) worst.

### Binary search — O(log n)

```java
public static int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // avoids overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

Halves the search range each step — requires a **sorted** array.

### Java's built-ins

```java
Arrays.sort(arr);                       // O(n log n): dual-pivot quicksort (primitives) / TimSort (objects)
Collections.sort(list);                 // TimSort, stable
int i = Arrays.binarySearch(arr, key);  // O(log n)
```

## Visual — Sorting Comparison

```
 Bubble/Selection/Insertion  → O(n²)   simple, for small/nearly-sorted
 Merge sort                  → O(n log n) stable, O(n) space, divide & conquer
 Quick sort                  → O(n log n) avg, in-place, fastest in practice
 Arrays.sort                 → O(n log n) use this in real code
```

Interview: know how to *implement* them; production: use the built-ins.

## Code Examples

### Example 1 — Insertion sort

```java
import java.util.Arrays;

public class Insertion {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i], j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 3};
        insertionSort(arr);
        System.out.println(Arrays.toString(arr));   // [1, 2, 3, 5, 8]
    }
}
```

### Example 2 — Merge sort

```java
import java.util.Arrays;

public class Merge {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        int[] tmp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        while (i <= m) tmp[k++] = arr[i++];
        while (j <= r) tmp[k++] = arr[j++];
        System.arraycopy(tmp, 0, arr, l, tmp.length);
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));   // [3, 9, 10, 27, 38, 43, 82]
    }
}
```

### Example 3 — Binary search

```java
public class Search {
    public static int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println(binarySearch(arr, 7));    // 3
        System.out.println(binarySearch(arr, 4));    // -1
    }
}
```

## Common Mistakes

1. **Binary search on an unsorted array** — results are undefined; sort first.
2. **`(lo + hi) / 2` overflow** — use `lo + (hi - lo) / 2`.
3. **Off-by-one in binary search bounds** — use `lo <= hi` and `mid ± 1`.
4. **In-place merge without a temp array** — merge sort needs O(n) scratch space (or careful in-place code).
5. **Quick sort worst case** — already-sorted data with a bad pivot is O(n²); randomize/median pivot.
6. **Confusing stable vs unstable** — insertion/merge are stable; selection/quick (basic) are not.

## Best Practices

- Use `Arrays.sort`/`Collections.sort` in real code; implement the classics for interviews.
- Know complexity and stability of each algorithm.
- Use binary search whenever data is sorted (or you can sort once, query many).
- Use `lo + (hi - lo) / 2` to avoid overflow.
- Choose insertion sort for small/nearly-sorted data; merge for stable O(n log n).

## Practice Questions

1. Implement bubble, selection, and insertion sort.
2. Implement merge sort and explain its space complexity.
3. Implement quick sort and explain its worst case.
4. Write iterative and recursive binary search.
5. Compare the six algorithms by time, space, and stability.

## Multiple Choice Questions (MCQs)

### Q1. Merge sort's time complexity is:
- a) O(n²)
- b) O(n log n)
- c) O(log n)
- d) O(n)

**Answer:** b

### Q2. Binary search requires:
- a) An unsorted array
- b) A sorted array
- c) A linked list
- d) A hash map

**Answer:** b

### Q3. Insertion sort's best case is:
- a) O(n²)
- b) O(n) (nearly sorted)
- c) O(log n)
- d) O(n log n)

**Answer:** b

### Q4. Quick sort's worst case is:
- a) O(n log n)
- b) O(n²)
- c) O(n)
- d) O(log n)

**Answer:** b

### Q5. `Arrays.sort` on objects uses:
- a) TimSort (stable)
- b) Only quicksort
- c) Bubble sort
- d) Selection sort

**Answer:** a

## Key Takeaways

- O(n²) sorts: bubble, selection, insertion (insertion is best for nearly-sorted).
- O(n log n): merge (stable, O(n) space), quick (in-place, avg).
- Binary search = O(log n), sorted data, `lo + (hi - lo) / 2`.
- Use built-ins in production; know implementations for interviews.

## Module 15 Complete 🎉

You've finished **Module 15 — DSA in Java (1)**. Next up: **Module 16 — DSA in Java (2) and Interview Prep**.
