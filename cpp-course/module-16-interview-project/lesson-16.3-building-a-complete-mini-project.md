---
module: 16
topic: "16.3"
title: "Building a Complete Mini Project"
slug: "building-a-complete-mini-project"
difficulty: "Advanced"
prerequisites:
  - All previous modules
  - File I/O
  - STL in Practice
estimated_minutes: 35
tags:
  - projects
  - design
  - architecture
---

# 16.3 Building a Complete Mini Project

## Overview

A small project cements everything you've learned — more than any number of isolated exercises. In this lesson we design and build a **Student Record Management System**: a console app that stores records in memory, supports CRUD operations, persists to a file, and demonstrates clean architecture. The structure transfers to any real C++ project.

## Learning Objectives

After this lesson you will be able to:

- Structure a project into files and classes
- Separate data, logic, and I/O (a simple layered design)
- Implement a menu-driven console loop
- Persist and reload data with file I/O
- Extend the project with new features cleanly

## Core Concepts

### Project structure

```
student-manager/
├── main.cpp        # entry point, menu loop
├── student.h       # the Student record type
├── student.cpp
├── registry.h      # stores and queries students (the "database")
├── registry.cpp
└── storage.h/.cpp  # load/save to a text file
```

Three layers: **data** (`Student`), **logic** (`Registry`), **I/O** (`main` menu + `Storage`). Each layer knows only the layer below it.

### The data type

```cpp
// student.h
#pragma once
#include <string>

struct Student {
    int rollNo;
    std::string name;
    double gpa;

    std::string toCSV() const;
    static Student fromCSV(const std::string& line);
};
```

### The registry (logic)

```cpp
// registry.h
#pragma once
#include <vector>
#include "student.h"

class Registry {
    std::vector<Student> students;
public:
    void add(const Student& s);
    bool remove(int rollNo);
    Student* find(int rollNo);
    const std::vector<Student>& all() const;
};
```

### The storage layer

```cpp
// storage.h
#pragma once
#include <string>
#include "registry.h"

bool save(const Registry& r, const std::string& path);
bool load(Registry& r, const std::string& path);
```

### The menu loop (I/O)

```cpp
int main() {
    Registry reg;
    load(reg, "students.csv");

    while (true) {
        std::cout << "1. Add  2. Find  3. Remove  4. List  5. Save & Exit\n";
        int choice; std::cin >> choice;
        switch (choice) {
            case 1: addStudent(reg); break;
            case 2: findStudent(reg); break;
            case 3: removeStudent(reg); break;
            case 4: listStudents(reg); break;
            case 5: save(reg, "students.csv"); return 0;
        }
    }
}
```

## Visual — Layered Design

```
 ┌──────────────────────────────┐
 │  main.cpp (menu, prompts)    │  ← presentation / I/O
 ├──────────────────────────────┤
 │  Registry (add/find/remove)  │  ← business logic
 ├──────────────────────────────┤
 │  Student (the data record)   │  ← data model
 ├──────────────────────────────┤
 │  Storage (file load/save)    │  ← persistence
 └──────────────────────────────┘
```

Each layer depends only downward — you can replace the file storage with a database without touching the menu or the registry.

## Code Examples

### Example 1 — Student record and CSV

```cpp
#include <sstream>
#include "student.h"

std::string Student::toCSV() const {
    std::ostringstream os;
    os << rollNo << "," << name << "," << gpa;
    return os.str();
}

Student Student::fromCSV(const std::string& line) {
    std::istringstream is(line);
    std::string field;
    Student s;
    std::getline(is, field, ','); s.rollNo = std::stoi(field);
    std::getline(is, field, ','); s.name = field;
    std::getline(is, field, ','); s.gpa = std::stod(field);
    return s;
}
```

### Example 2 — Registry operations

```cpp
#include "registry.h"
#include <algorithm>

void Registry::add(const Student& s) { students.push_back(s); }

Student* Registry::find(int rollNo) {
    auto it = std::find_if(students.begin(), students.end(),
        [rollNo](const Student& s) { return s.rollNo == rollNo; });
    return it != students.end() ? &*it : nullptr;
}

bool Registry::remove(int rollNo) {
    auto it = std::remove_if(students.begin(), students.end(),
        [rollNo](const Student& s) { return s.rollNo == rollNo; });
    if (it == students.end()) return false;
    students.erase(it, students.end());
    return true;
}
```

### Example 3 — Save and load

```cpp
#include <fstream>
#include "storage.h"

bool save(const Registry& r, const std::string& path) {
    std::ofstream out(path);
    if (!out) return false;
    for (const auto& s : r.all()) out << s.toCSV() << "\n";
    return true;
}

bool load(Registry& r, const std::string& path) {
    std::ifstream in(path);
    if (!in) return false;
    std::string line;
    while (std::getline(in, line))
        if (!line.empty()) r.add(Student::fromCSV(line));
    return true;
}
```

## Common Mistakes

1. **One giant `main`** — mixing data, logic, and I/O into a single function.
2. **No separation of concerns** — the menu shouldn't know file formats.
3. **Not checking file open** — silently working on an empty/missing dataset.
4. **Circular dependencies** — headers including each other; use forward declarations.
5. **Hardcoding paths/filenames** — accept them as parameters.
6. **No error reporting** — a failed save should tell the user, not vanish.

## Best Practices

- Lay out the project with a clear folder/file structure from the start.
- Use `#pragma once` (or include guards) in every header.
- Keep the menu logic in `main.cpp`; put domain logic in its own classes.
- Return `bool`/status from I/O functions and check the result.
- Add features incrementally: one operation at a time, testing each.

## Practice Questions

1. Implement `addStudent`, `findStudent`, `removeStudent`, and `listStudents` for the menu.
2. Add a "update GPA" operation to the registry and menu.
3. Write `save`/`load` and verify data survives a program restart.
4. Sort the student list by roll number or GPA when listing.
5. Extend the project: reject duplicate roll numbers on add.

## Multiple Choice Questions (MCQs)

### Q1. Separating data, logic, and I/O is an example of:
- a) Micro-optimization
- b) Layered architecture / separation of concerns
- c) Code golf
- d) Inlining

**Answer:** b

### Q2. `#pragma once` in a header:
- a) Speeds up the program
- b) Prevents multiple inclusion of the header
- c) Enables templates
- d) Links libraries

**Answer:** b

### Q3. A function that saves data should typically:
- a) Print nothing
- b) Return a success/failure status and be checked by the caller
- c) Exit the program on failure
- d) Ignore errors

**Answer:** b

### Q4. The menu/UI code should:
- a) Know the file format
- b) Call into logic classes, not manipulate data directly
- c) Be one giant function
- d) Contain business rules

**Answer:** b

### Q5. Forward declarations help avoid:
- a) Slow code
- b) Circular header dependencies
- c) Compiler warnings
- d) Memory leaks

**Answer:** b

## Key Takeaways

- Structure projects into data / logic / I-O layers with clear files.
- Use `#pragma once`; forward-declare to avoid cycles.
- Check I/O results and report errors.
- Build incrementally — one feature, tested, at a time.

## Next Topic

[16.4 Common C++ Pitfalls and Gotchas](lesson-16.4-common-cpp-pitfalls-and-gotchas.md)
