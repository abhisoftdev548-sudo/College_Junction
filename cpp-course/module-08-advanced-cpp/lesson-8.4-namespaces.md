---
module: 8
topic: "8.4"
title: "Namespaces"
slug: "namespaces"
difficulty: "Advanced"
prerequisites:
  - Functions
  - Classes and Objects
estimated_minutes: 25
tags:
  - namespaces
  - scoping
  - using
---

# 8.4 Namespaces

## Overview

A **namespace** groups related names (functions, classes, variables) and prevents **name collisions**. Two libraries can each have a `print()` or a `Window` class without conflicting, because each lives in its own namespace. Namespaces are how `std` keeps the entire standard library organized.

## Learning Objectives

After this lesson you will be able to:

- Declare and reopen namespaces
- Qualify names with `::`
- Use `using` declarations and `using` directives safely
- Create nested and inline namespaces
- Avoid collisions between your code and libraries

## Core Concepts

### Declaring and using a namespace

```cpp
namespace math {
    const double PI = 3.14159;
    double square(double x) { return x * x; }
}

std::cout << math::PI;            // qualified access
std::cout << math::square(5);     // 25
```

Use `namespaceName::name` to reach inside a namespace.

### Reopening namespaces

```cpp
namespace math { const double PI = 3.14159; }
// ... elsewhere, possibly another file ...
namespace math { double cube(double x) { return x * x * x; } }
```

Namespaces can be **reopened** and extended anywhere — this is how a library's header and source files cooperate.

### using declarations vs using directives

```cpp
using std::cout;        // using DECLARATION: brings in ONE name
cout << "hi";           // now cout works unqualified

using namespace std;    // using DIRECTIVE: brings in EVERYTHING from std
cout << "hello";        // also works — but risks collisions
```

- `using std::cout;` — imports a single name (safe, scoped).
- `using namespace std;` — imports everything (convenient, riskier).

### Nested namespaces and aliases

```cpp
namespace company {
    namespace product {
        class Widget {};
    }
}

company::product::Widget w;                    // fully qualified
namespace cp = company::product;               // namespace alias
cp::Widget w2;                                 // shorter

namespace app::ui { /* ... */ }                // C++17 nested syntax
```

### Anonymous namespaces

```cpp
namespace {                 // no name — internal linkage
    int helper() { return 1; }
}
// helper() is visible in this file only — like a modern static
```

An anonymous namespace gives its contents **internal linkage** — a clean way to keep file-local helpers private.

## Visual — Avoiding Collisions

```
  Without namespaces:                With namespaces:

  libA: print()  ──┐  ✗ collision    math::print()
                    ├── same name    audio::print()
  libB: print()  ──┘                 net::print()
                                       ↑ each is distinct
```

Namespaces turn "print" into "math::print", "audio::print", etc., so independent libraries can't trample each other.

## Code Examples

### Example 1 — Two libraries, same function name

```cpp
#include <iostream>

namespace audio {
    void play() { std::cout << "Playing audio\n"; }
}

namespace video {
    void play() { std::cout << "Playing video\n"; }
}

int main() {
    audio::play();   // Playing audio
    video::play();   // Playing video
    return 0;
}
```

### Example 2 — using declaration

```cpp
#include <iostream>

int main() {
    using std::cout;      // only cout is imported
    using std::endl;
    cout << "Hello" << endl;
    // std::cin is NOT imported — still needs std::cin
}
```

### Example 3 — Anonymous namespace for helpers

```cpp
#include <iostream>

namespace {
    int internalOnly() { return 99; }   // file-local
}

int main() {
    std::cout << internalOnly();        // 99 — callable here, hidden elsewhere
    return 0;
}
```

## Common Mistakes

1. **`using namespace std;` in headers** — pollutes every file that includes the header; keep headers clean.
2. **Relying on `using namespace std;` to resolve ambiguity** — it can silently pick the wrong overload.
3. **Name hiding** — a local `sqrt` can shadow `std::sqrt`, causing subtle bugs.
4. **Forgetting the scope operator** — `PI` is not `math::PI`.
5. **Assuming namespaces create separate memory** — they are compile-time name groupings, not objects.
6. **Collisions between `using` declarations** — importing two `foo`s from different namespaces makes `foo` ambiguous.

## Best Practices

- Always qualify standard names (`std::cout`) in headers and library code.
- Prefer `using std::cout;` over `using namespace std;`, and keep both inside the smallest scope.
- Wrap your own library code in a namespace named after the project.
- Use anonymous namespaces (or `static`) for file-local helpers.
- Use namespace aliases to shorten deeply nested qualified names.

## Practice Questions

1. Create two namespaces, each with a function named `version()`, and call both unambiguously.
2. Wrap a small `math` library (square, cube, PI) in a namespace and use qualified access.
3. Show the difference between `using std::cout;` and `using namespace std;` with a small program.
4. Use an anonymous namespace to define a helper function that is visible only in one file.
5. Demonstrate a name collision that occurs when two `using` declarations import the same name.

## Multiple Choice Questions (MCQs)

### Q1. The primary purpose of a namespace is to:
- a) Speed up the program
- b) Group names and prevent collisions
- c) Allocate memory
- d) Replace classes

**Answer:** b

### Q2. How do you access `PI` inside `namespace math`?
- a) `PI`
- b) `math.PI`
- c) `math::PI`
- d) `math->PI`

**Answer:** c

### Q3. `using std::cout;` is called a:
- a) using directive
- b) using declaration
- c) namespace alias
- d) forward declaration

**Answer:** b — it imports a single name.

### Q4. Which should you avoid in header files?
- a) `#include <string>`
- b) Fully qualified names
- c) `using namespace std;`
- d) Function declarations

**Answer:** c — it pollutes every includer's namespace.

### Q5. A namespace with no name is called:
- a) A global namespace
- b) An anonymous namespace (internal linkage)
- c) A nested namespace
- d) An inline namespace

**Answer:** b

## Key Takeaways

- Namespaces group names and prevent collisions; access members with `::`.
- `using std::cout;` imports one name; `using namespace std;` imports all (use sparingly).
- Namespaces can be reopened, nested, aliased, and made anonymous for file-local helpers.
- Keep `using namespace std;` out of headers.

## Next Topic

[8.5 File I/O](lesson-8.5-file-io.md)
