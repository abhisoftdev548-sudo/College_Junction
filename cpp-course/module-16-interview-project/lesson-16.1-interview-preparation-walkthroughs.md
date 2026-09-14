---
module: 16
topic: "16.1"
title: "Interview Preparation and Problem Walkthroughs"
slug: "interview-preparation-walkthroughs"
difficulty: "Advanced"
prerequisites:
  - All previous modules
  - Complexity Analysis
  - Problem-Solving Approaches
estimated_minutes: 30
tags:
  - interviews
  - walkthrough
  - practice
---

# 16.1 Interview Preparation and Problem Walkthroughs

## Overview

Technical interviews test not just whether you can write code, but **how you think**. The winning formula is a consistent loop: clarify → explore → plan → code → test → discuss complexity. This lesson walks through a real interview problem end-to-end, showing what an interviewer wants to see at each stage.

## Learning Objectives

After this lesson you will be able to:

- Run the full interview loop on any problem
- Ask the right clarifying questions
- Communicate trade-offs and complexity clearly
- Handle hints and edge cases gracefully
- Practice deliberately with a repeatable structure

## Core Concepts

### The interview loop

1. **Clarify** — restate the problem; confirm inputs, outputs, constraints, edge cases.
2. **Explore** — work a small example by hand; mention the brute force first.
3. **Plan** — state the approach and its complexity **before** coding; agree with the interviewer.
4. **Code** — clean, small functions; narrate as you type.
5. **Test** — walk through your own example and edge cases.
6. **Discuss** — name the time/space complexity and possible improvements.

### What interviewers look for

- **Communication** — you talk through reasoning, not silently code.
- **Correctness** — the code handles edge cases.
- **Complexity awareness** — you know *why* your solution is efficient.
- **Adaptability** — you respond well to hints and constraints changes.

### The clarifying questions checklist

```
- Are the inputs sorted? Negative numbers allowed? Duplicates?
- What should I return on empty input / not found?
- What are the constraints on n? (drives the required complexity)
- May I use extra memory, or must it be in-place?
```

### Walkthrough — "Two Sum" done properly

**Clarify:** "Return the indices of two numbers that add to target. One solution guaranteed. Can I assume exactly one pair?" → yes.

**Explore:** `[2, 7, 11, 15], target 9` → indices 0 and 1.

**Plan (brute force → better):**

```cpp
// O(n^2): try every pair
for i in 0..n: for j in i+1..n: if a[i]+a[j]==target return {i,j}

// O(n) with a hash map: store (value → index) as we scan;
// for each x, check if (target - x) was already seen.
```

**Code:**

```cpp
std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};   // per problem constraints, unreachable
}
```

**Test:** walk through `[2,7,11,15], 9`; check duplicate case `[3,3], 6`.

**Discuss:** O(n) time, O(n) space; mention the sorted two-pointer alternative (O(n log n) time, O(1) space) as a trade-off.

## Visual — The Interview Loop

```
 Clarify ──▶ Explore ──▶ Plan ──▶ Code ──▶ Test ──▶ Discuss
   (ask)     (example)  (agree)   (narrate) (edge cases) (complexity)
     ▲                                                    │
     └────────────── (hint / new constraint) ◀────────────┘
```

Each stage produces a concrete artifact the interviewer can follow. Skipping "Plan" and jumping to code is the most common interview mistake.

## Code Examples

### Example 1 — Communicate the brute force first

```cpp
// "Let me start with the simplest correct solution, then optimize."
int maxSubarrayBrute(const std::vector<int>& a) {          // O(n^2)
    int best = INT_MIN;
    for (int i = 0; i < (int)a.size(); ++i) {
        int sum = 0;
        for (int j = i; j < (int)a.size(); ++j) {
            sum += a[j];
            best = std::max(best, sum);
        }
    }
    return best;
}
// "This is O(n^2). Kadane's algorithm improves it to O(n) — want me to code it?"
```

### Example 2 — Handle edge cases explicitly

```cpp
std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};   // no pair (empty input, or none found)
}
```

### Example 3 — Respond to a constraint change

```cpp
// Interviewer: "Now the array is already sorted — can you do O(1) space?"
int twoSumSorted(const std::vector<int>& a, int target) {
    int i = 0, j = a.size() - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s == target) return {i, j};
        if (s < target) ++i; else --j;
    }
    return {-1, -1};
}
```

## Common Mistakes

1. **Coding before planning** — you risk solving the wrong problem.
2. **Silence** — interviewers can't follow unspoken reasoning.
3. **Skipping the brute force** — an O(n²) answer beats no answer; optimize after.
4. **Ignoring edge cases** — empty, single element, duplicates, negatives.
5. **Not stating complexity** — a good solution without analysis reads as guessing.
6. **Fighting a hint** — hints are directions, not criticism; use them.

## Best Practices

- Practice **out loud** — talking while coding is a skill, not a talent.
- Time-box: ~5 min clarify+plan, ~15 min code+test, ~5 min discuss.
- Build a personal problem bank (arrays, strings, maps, graphs, DP) and rotate through it.
- After each practice problem, write down the pattern it used (reinforces retrieval).
- Mock-interview with a friend or timer; review with the rubric above.

## Practice Questions

1. Do a full out-loud walkthrough of "valid parentheses" (clarify → discuss).
2. Write the brute force, then the optimized solution for "contains duplicate".
3. Solve "merge two sorted arrays" twice: with extra space, then in-place.
4. For "longest substring without repeating characters," state complexity and trade-offs.
5. Record yourself solving a problem and check against the interview loop rubric.

## Multiple Choice Questions (MCQs)

### Q1. The first thing to do in a coding interview is:
- a) Start coding
- b) Clarify the problem and constraints
- c) Optimize immediately
- d) Ask about the company

**Answer:** b

### Q2. Before writing code, you should:
- a) State the plan and complexity
- b) Write tests only
- c) Open a debugger
- d) Copy a template

**Answer:** a

### Q3. If you don't see the optimal solution, you should:
- a) Give up
- b) Present the brute force first, then optimize
- c) Code in silence
- d) Skip the problem

**Answer:** b

### Q4. Complexity analysis in an interview demonstrates:
- a) Typing speed
- b) Understanding of your solution's efficiency
- c) Memory of syntax
- d) Nothing

**Answer:** b

### Q5. A good response to a hint is to:
- a) Ignore it
- b) Incorporate it and keep communicating
- c) Argue with the interviewer
- d) Restart the problem

**Answer:** b

## Key Takeaways

- Run the loop: clarify → explore → plan → code → test → discuss.
- Communicate constantly; state the brute force, then optimize.
- Handle edge cases; name time and space complexity.
- Practice out loud with a timer and a pattern journal.

## Next Topic

[16.2 Clean Code and Code Style](lesson-16.2-clean-code-and-code-style.md)
