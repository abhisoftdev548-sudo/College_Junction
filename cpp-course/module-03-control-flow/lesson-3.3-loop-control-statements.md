---
module: 3
topic: "3.3"
title: "Loop Control Statements"
slug: "loop-control-statements"
difficulty: "Beginner"
prerequisites:
  - Loops
estimated_minutes: 25
tags:
  - cpp
  - control-flow
  - break
  - continue
---

# 3.3 Loop Control Statements

## Overview

Sometimes you need to **exit a loop early** or **skip an iteration**. C++ provides `break` (exit the loop immediately) and `continue` (skip to the next iteration). They give you fine control over loop execution — search-and-stop, filtering, and validation patterns all rely on them.

## Learning Objectives

After this lesson you will be able to:

- Use `break` to exit a loop early
- Use `continue` to skip an iteration
- Apply break/continue in search and filter patterns
- Handle the `switch`-`break` vs loop-`break` distinction
- Avoid infinite and logic errors with these statements

## Core Concepts

### break — exit the loop

```cpp
for (int i = 0; i < 10; ++i) {
    if (i == 5) break;     // exit the loop at i == 5
    std::cout << i << " "; // prints 0 1 2 3 4
}
```

`break` terminates the **nearest enclosing loop** (or `switch`) immediately — execution continues after the loop.

### continue — skip this iteration

```cpp
for (int i = 0; i < 10; ++i) {
    if (i % 2 == 0) continue;   // skip even numbers
    std::cout << i << " ";      // prints 1 3 5 7 9
}
```

`continue` skips the **rest of the current iteration** and moves to the next check — it doesn't exit the loop.

### Search-and-stop pattern

```cpp
int target = 42;
int arr[] = {10, 20, 42, 55};
bool found = false;

for (int x : arr) {
    if (x == target) {
        found = true;
        break;               // no need to keep searching
    }
}
```

Use `break` when the answer is found — no point scanning the rest.

### Filter pattern

```cpp
for (int x : arr) {
    if (x < 0) continue;     // skip negatives
    std::cout << x << " ";   // print only non-negative values
}
```

Use `continue` to skip elements you don't want to process.

### break in nested loops

```cpp
for (int i = 0; i < 3; ++i) {
    for (int j = 0; j < 3; ++j) {
        if (j == 1) break;        // breaks only the INNER loop
    }
    // still runs for all i
}
```

`break` only exits the **innermost** loop. To exit an outer loop, use a flag or refactor into a function (Module 4).

### Early return as an alternative

```cpp
// Sometimes cleaner than break: return from a function
bool contains(int arr[], int n, int target) {
    for (int i = 0; i < n; ++i)
        if (arr[i] == target) return true;   // early return
    return false;
}
```

### break vs continue (quick contrast)

| Statement | Effect |
|---|---|
| `break` | exits the loop entirely |
| `continue` | skips the rest of this iteration |

## Visual — break vs continue

```
 for i = 0..9:
   i=0 → continue ──▶ (skip print)
   i=1 → print 1
   i=2 → continue ──▶ (skip print)
   i=3 → print 3
   ...
   i=5 → break ──▶ EXIT the loop
```

`continue` jumps to the next iteration; `break` jumps out of the loop.

## Code Examples

### Example 1 — Find and stop

```cpp
#include <iostream>

int main() {
    int numbers[] = {4, 8, 15, 16, 23, 42};
    int target = 16;
    int index = -1;

    for (int i = 0; i < 6; ++i) {
        if (numbers[i] == target) {
            index = i;
            break;
        }
    }
    std::cout << "Found at index: " << index << "\n";
    return 0;
}
```

### Example 2 — Skip invalid values

```cpp
#include <iostream>

int main() {
    int values[] = {5, -3, 8, -1, 12};
    for (int v : values) {
        if (v < 0) continue;   // ignore negatives
        std::cout << v << " ";
    }
    std::cout << "\n";         // 5 8 12
    return 0;
}
```

### Example 3 — Input validation with break

```cpp
#include <iostream>

int main() {
    int n;
    while (true) {
        std::cout << "Enter a positive number (0 to stop): ";
        std::cin >> n;
        if (n == 0) break;         // sentinel → exit
        if (n < 0) { std::cout << "Ignoring negative\n"; continue; }
        std::cout << "You entered: " << n << "\n";
    }
    return 0;
}
```

## Common Mistakes

1. **Confusing `break` and `continue`** — `break` exits, `continue` skips.
2. **Expecting `break` to exit outer loops** — it only exits the innermost loop.
3. **`continue` in a `for` vs `while`** — in `while`, `continue` can skip the update → infinite loop.
4. **Unreachable code after `break`/`continue`** — the compiler warns; it never runs.
5. **Forgetting to break a `switch`** — falls through (see 3.1).
6. **Using a flag incorrectly with `break`** — the flag may be set but the loop logic still off.

## Best Practices

- Use `break` for search-and-stop; `continue` for filtering.
- Prefer an early `return` (from a function) over complex break logic.
- For outer-loop exit, use a flag or extract a function.
- Keep loops simple — many break/continue conditions hurt readability.
- Watch `continue` in `while` loops (update the counter before it).

## Practice Questions

1. Use `break` to find the first even number in an array and print its index.
2. Use `continue` to print only the odd numbers of an array.
3. Write a sentinel loop that exits on input 0.
4. Explain what `break` does inside nested loops.
5. Rewrite a break-based search as a function with an early `return`.

## Multiple Choice Questions (MCQs)

### Q1. `break` inside a loop:
- a) Skips one iteration
- b) Exits the loop immediately
- c) Restarts the loop
- d) Pauses the loop

**Answer:** b — `break` terminates the nearest loop/switch.

### Q2. `continue` inside a loop:
- a) Exits the loop
- b) Skips to the next iteration
- c) Stops the program
- d) Repeats the same iteration

**Answer:** b — it skips the rest of the current iteration.

### Q3. In nested loops, `break` exits:
- a) All loops
- b) The innermost loop only
- c) The outermost loop
- d) Nothing

**Answer:** b — only the nearest enclosing loop.

### Q4. `break` is commonly used for:
- a) Filtering
- b) Search-and-stop
- c) Sorting
- d) Declaring variables

**Answer:** b — stop once the answer is found.

### Q5. A danger of `continue` in a `while` loop:
- a) It never executes
- b) It may skip the update → infinite loop
- c) It exits the loop
- d) It prints twice

**Answer:** b — if the update is after `continue`, it can loop forever.

## Key Takeaways

- `break` exits the loop; `continue` skips to the next iteration.
- Search-and-stop → `break`; filtering → `continue`.
- `break` only exits the innermost loop; prefer early `return` for clarity.
- Beware `continue` skipping the update in `while` loops.

## Next Topic

[3.4 Nested Loops](lesson-3.4-nested-loops.md)
