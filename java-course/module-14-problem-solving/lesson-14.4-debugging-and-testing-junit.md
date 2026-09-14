---
module: 14
topic: "14.4"
title: "Debugging and Testing (JUnit)"
slug: "debugging-and-testing-junit"
difficulty: "Advanced"
prerequisites:
  - Complexity Analysis (Big-O)
estimated_minutes: 35
tags:
  - java
  - testing
  - junit
  - debugging
---

# 14.4 Debugging and Testing (JUnit)

## Overview

Correct code isn't written — it's **verified**. Debugging finds bugs systematically (reproduce → locate → fix → confirm), and **JUnit 5** automates the checks so regressions are caught instantly. Together they're the difference between "it seems to work" and "it works." This lesson covers both.

## Learning Objectives

After this lesson you will be able to:

- Follow a systematic debugging process
- Use print statements and assertions to localize bugs
- Write JUnit 5 tests with assertions and lifecycle hooks
- Test edge cases and use parameterized tests
- Interpret test failures and measure coverage

## Core Concepts

### The debugging process

1. **Reproduce** — make the bug happen reliably.
2. **Locate** — narrow it down (binary-search the code, print state, use a debugger).
3. **Fix** — change one thing at a time.
4. **Confirm** — the bug is gone and nothing else broke (write a test!).

### Debugging tools

```java
// temporary prints (localize):
System.out.println("at line X, value=" + value);

// assertions (fail fast on wrong assumptions):
assert value > 0 : "value must be positive";   // enable with -ea

// conditional breakpoints + step-through in an IDE debugger
```

Use the IDE debugger for state inspection; prints for quick checks; `assert` for invariants.

### JUnit 5 — writing a test

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MathUtilTest {

    @Test
    void add_twoPositiveNumbers_returnsSum() {
        int result = MathUtil.add(2, 3);
        assertEquals(5, result);          // expected, actual
    }

    @Test
    void divide_byZero_throws() {
        assertThrows(ArithmeticException.class,
            () -> MathUtil.divide(10, 0));
    }
}
```

`@Test` marks a test method; `assertEquals`/`assertThrows`/`assertTrue`/`assertNull` check results.

### Common assertions

```java
assertEquals(expected, actual);          // equality
assertTrue(condition);                   // truth
assertFalse(condition);
assertNull(x);
assertNotNull(x);
assertSame(a, b);                        // same reference
assertArrayEquals(exp, act);
assertThrows(Exception.class, () -> ...);
assertTimeout(Duration.ofMillis(100), () -> ...);   // perf guard
```

### Lifecycle hooks

```java
@BeforeEach void setup() { /* runs before EACH test */ }
@AfterEach  void teardown() { /* runs after EACH test */ }
@BeforeAll  static void init() { /* once before all tests */ }
@AfterAll   static void cleanup() { /* once after all tests */ }
```

`@BeforeEach`/`@AfterEach` isolate tests; `@BeforeAll`/`@AfterAll` handle one-time setup.

### Parameterized tests

```java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 10})
void isEven_returnsFalse_forOdd(int n) {
    assertFalse(MathUtil.isEven(n));
}
```

Run the same test over many inputs — perfect for edge cases.

### Test-driven thinking

```java
// Write the test FIRST, then make it pass:
@Test void reverse_emptyString_returnsEmpty() {
    assertEquals("", StringUtil.reverse(""));
}
@Test void reverse_abc_returnsCba() {
    assertEquals("cba", StringUtil.reverse("abc"));
}
```

TDD: test → fail → implement → pass → refactor.

## Visual — The Debug/TDD Cycle

```
 Debugging:                TDD:
 reproduce ──▶ locate        RED   (write a failing test)
    ▲            │            │
    │            ▼            ▼
 confirm ◀─── fix          GREEN  (make it pass)
                              │
                              ▼
                           REFACTOR (clean up, stay green)
```

Both are loops: find the failing case, fix it, and lock it in with a test.

## Code Examples

### Example 1 — JUnit test class

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StringUtilTest {

    static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    @Test
    void reverse_reversesString() {
        assertEquals("cba", reverse("abc"));
    }

    @Test
    void reverse_emptyString() {
        assertEquals("", reverse(""));
    }

    @Test
    void reverse_null_throws() {
        assertThrows(NullPointerException.class, () -> reverse(null));
    }
}
```

### Example 2 — Lifecycle hooks

```java
import org.junit.jupiter.api.*;
import java.util.*;

class ListTest {
    List<String> list;

    @BeforeEach
    void setUp() { list = new ArrayList<>(); }   // fresh list each test

    @Test
    void startsEmpty() { assertTrue(list.isEmpty()); }

    @Test
    void canAddElement() {
        list.add("a");
        assertEquals(1, list.size());
    }
}
```

### Example 3 — Parameterized test

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class ParityTest {
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 100})
    void isEven_trueForEvens(int n) {
        assertTrue(n % 2 == 0);
    }
}
```

## Common Mistakes

1. **Not testing edge cases** — empty, null, zero, negative, boundary values.
2. **Tests that depend on each other** — each test must be independent.
3. **Asserting nothing** — a test that never asserts can't fail (false confidence).
4. **Catching exceptions in tests instead of `assertThrows`** — the test may pass wrongly.
5. **Fixing without a regression test** — the bug will return.
6. **Ignoring a failing test** — investigate immediately, don't disable it.

## Best Practices

- Follow reproduce → locate → fix → confirm for every bug.
- Write a failing test that reproduces the bug before fixing it.
- Test edge cases and boundaries, not just happy paths.
- Use `@BeforeEach` to isolate tests; parameterized tests for many inputs.
- Keep tests fast and deterministic (no flaky sleeps/randomness).

## Practice Questions

1. Write JUnit tests for a `max(int a, int b)` method, including ties and negatives.
2. Use `assertThrows` for a division-by-zero case.
3. Write a parameterized test for a prime-checking method.
4. Use `@BeforeEach` to set up shared test data.
5. Outline the debugging process for a real bug you've seen.

## Multiple Choice Questions (MCQs)

### Q1. `@Test` marks:
- a) A production method
- b) A test method
- c) A constructor
- d) A field

**Answer:** b

### Q2. `assertEquals(expected, actual)`:
- a) Compares order of args loosely
- b) Checks expected equals actual
- c) Runs the code
- d) Prints a message

**Answer:** b

### Q3. `assertThrows` verifies:
- a) A return value
- b) That an exception is thrown
- c) That no exception occurs
- d) A timeout

**Answer:** b

### Q4. `@BeforeEach` runs:
- a) Once before all tests
- b) Before each test
- c) After each test
- d) Only on failure

**Answer:** b

### Q5. The first step of debugging is:
- a) Fix the code
- b) Reproduce the bug
- c) Write tests
- d) Refactor

**Answer:** b

## Key Takeaways

- Debug: reproduce → locate → fix → confirm.
- JUnit 5: `@Test`, assertions, `@BeforeEach`/`@AfterEach`, parameterized tests.
- Test edge cases; make tests independent and always-asserting.
- Lock every fix in with a regression test.

## Next Topic

[14.5 Competitive Programming Tips](lesson-14.5-competitive-programming-tips.md)
