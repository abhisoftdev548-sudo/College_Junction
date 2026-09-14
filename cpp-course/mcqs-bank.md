# C++ Course — MCQs Bank (Step 3)

Consolidated Multiple-Choice Questions for all 16 modules (80 topics × 5 = 400 MCQs), each with its answer. Extracted from the lesson files.

## Module 1 — Basics

### What is Programming

### Q1. A program is:
- a) A computer's memory
- b) A set of instructions for a computer
- c) A hardware component
- d) A programming language

**Answer:** b

### Q2. The program that translates source code into machine code is a:
- a) Debugger
- b) Compiler
- c) Text editor
- d) Browser

**Answer:** b

### Q3. Source code is written:
- a) In binary
- b) In a human-readable programming language
- c) Only in assembly
- d) In machine code

**Answer:** b

### Q4. C++ is a:
- a) Low-level-only language
- b) High-level language
- c) Database
- d) Web browser

**Answer:** b

### Q5. The most important programming skill is:
- a) Typing speed
- b) Problem solving (breaking tasks into steps)
- c) Memorizing syntax
- d) Using many tools

**Answer:** b


### Introduction to C++

### Q1. Who created C++?
- a) Dennis Ritchie
- b) Bjarne Stroustrup
- c) James Gosling
- d) Guido van Rossum

**Answer:** b

### Q2. C++ was first developed at:
- a) Microsoft
- b) Google
- c) Bell Labs (AT&T)
- d) IBM

**Answer:** c

### Q3. The language was first called:
- a) C#
- b) Objective-C
- c) "C with Classes"
- d) Simula

**Answer:** c

### Q4. It was renamed "C++" in:
- a) 1979
- b) 1983
- c) 1985
- d) 1998

**Answer:** b

### Q5. The first ISO C++ standard was published in:
- a) 1983
- b) 1985
- c) 1998
- d) 2011

**Answer:** c


### Setting Up C++ Environment

### Q1. Which command compiles a C++ file with GCC?
- a) `gcc hello.cpp`
- b) `g++ hello.cpp`
- c) `java hello.cpp`
- d) `make hello`

**Answer:** b

### Q2. `-o hello` in `g++ hello.cpp -o hello`:
- a) Enables warnings
- b) Names the output executable
- c) Sets the standard
- d) Opens the file

**Answer:** b

### Q3. Which is a full IDE for C++?
- a) Notepad
- b) Visual Studio
- c) Terminal
- d) A browser

**Answer:** b

### Q4. C++ source files use the extension:
- a) `.c`
- b) `.cpp`
- c) `.exe`
- d) `.obj`

**Answer:** b

### Q5. `-std=c++17` tells the compiler to:
- a) Run the program
- b) Use the C++17 standard
- c) Enable debugging
- d) Optimize for speed

**Answer:** b


### C++ Program Structure

### Q1. Execution of a C++ program begins at:
- a) The first line
- b) The `main` function
- c) The last function
- d) The `#include` line

**Answer:** b

### Q2. `#include <iostream>` is needed to use:
- a) Comments
- b) `std::cout` and `std::cin`
- c) Variables
- d) Braces

**Answer:** b

### Q3. `return 0;` from `main` indicates:
- a) An error
- b) Success
- c) Nothing
- d) A warning

**Answer:** b

### Q4. A single-line comment starts with:
- a) `/*`
- b) `//`
- c) `#`
- d) `--`

**Answer:** b

### Q5. Every C++ statement ends with:
- a) A period
- b) A colon
- c) A semicolon
- d) A brace

**Answer:** c


### Compilation and Execution

### Q1. Which stage handles `#include` directives?
- a) Linker
- b) Preprocessor
- c) Assembler
- d) Runtime

**Answer:** b

### Q2. An "undefined reference" error occurs at:
- a) Compile time
- b) Link time
- c) Runtime
- d) Preprocessing

**Answer:** b

### Q3. The linker's job is to:
- a) Check syntax
- b) Combine object files and libraries into an executable
- c) Run the program
- d) Format the code

**Answer:** b

### Q4. `g++ main.cpp math.cpp -o app`:
- a) Runs the program
- b) Compiles and links both files into `app`
- c) Preprocesses only
- d) Creates a library

**Answer:** b

### Q5. After editing your source, you must:
- a) Just run the old executable
- b) Recompile, then run
- c) Delete the executable
- d) Restart the OS

**Answer:** b


## Module 2 — Fundamentals

### Variables and Constants

### Q1. Which declares a read-only variable?
- a) `int x`
- b) `const int x = 5`
- c) `var x = 5`
- d) `static x`

**Answer:** b — `const` makes the variable read-only after initialization.

### Q2. Reading an uninitialized `int` gives:
- a) Always 0
- b) A garbage/undefined value
- c) A compile error
- d) `nullptr`

**Answer:** b — built-in types are not auto-initialized.

### Q3. `constexpr` means the value is known at:
- a) Runtime only
- b) Compile time
- c) Link time
- d) Never

**Answer:** b — `constexpr` guarantees a compile-time constant.

### Q4. Which initialization is preferred in modern C++?
- a) `int x(5)`
- b) `int x{5}`
- c) `int x = new int`
- d) `int x[5]`

**Answer:** b — braced initialization is preferred and prevents narrowing.

### Q5. Which is a valid C++ variable name?
- a) `2fast`
- b) `my-var`
- c) `student_count`
- d) `class`

**Answer:** c — snake_case with letters/digits/underscores; `class` is reserved.


### Data Types

### Q1. `sizeof(int)` is typically:
- a) 1 byte
- b) 2 bytes
- c) 4 bytes
- d) 8 bytes

**Answer:** c — 4 bytes on most modern platforms (but not guaranteed).

### Q2. Which type stores only non-negative integers?
- a) `signed int`
- b) `unsigned int`
- c) `double`
- d) `char`

**Answer:** b — `unsigned` reserves all bits for positive values.

### Q3. `long long` is guaranteed to be at least:
- a) 2 bytes
- b) 4 bytes
- c) 8 bytes
- d) 16 bytes

**Answer:** c — `long long` is at least 64 bits (8 bytes).

### Q4. Fixed-width types come from:
- a) `<iostream>`
- b) `<cstdint>`
- c) `<string>`
- d) `<cmath>`

**Answer:** b — `<cstdint>` provides `int32_t`, `uint64_t`, etc.

### Q5. Comparing `0.1 + 0.2` to `0.3` with `==`:
- a) Always true
- b) Is unreliable (floating-point error)
- c) Is a compile error
- d) Returns an integer

**Answer:** b — floating point is approximate; use a tolerance.


### Input and Output

### Q1. Output in C++ uses:
- a) `std::cin`
- b) `std::cout`
- c) `printf` (only)
- d) `scanf`

**Answer:** b — `std::cout <<` writes to standard output.

### Q2. To read a line including spaces, use:
- a) `std::cin >> s`
- b) `std::getline(std::cin, s)`
- c) `std::read`
- d) `std::scan`

**Answer:** b — `getline` reads until the newline.

### Q3. `std::setprecision(2)` comes from:
- a) `<iostream>`
- b) `<iomanip>`
- c) `<string>`
- d) `<cmath>`

**Answer:** b — formatting manipulators live in `<iomanip>`.

### Q4. After `cin >> n`, before `getline`, you should call:
- a) `cin.ignore()`
- b) `cin.flush()`
- c) `cin.clear()` only
- d) Nothing

**Answer:** a — `ignore()` discards the leftover newline.

### Q5. `"\n"` vs `std::endl`:
- a) They're identical
- b) `std::endl` also flushes the stream
- c) `"\n"` flushes
- d) `std::endl` is faster

**Answer:** b — `std::endl` = newline + flush; `"\n"` = newline only.


### Operators

### Q1. `10 / 3` in C++ (both int) equals:
- a) 3.33
- b) 3
- c) 4
- d) 1

**Answer:** b — integer division truncates toward zero.

### Q2. `10 % 3` equals:
- a) 3
- b) 1
- c) 0
- d) 3.33

**Answer:** b — the remainder of 10 ÷ 3 is 1.

### Q3. `&&` means:
- a) OR
- b) AND
- c) NOT
- d) XOR

**Answer:** b — logical AND: both operands must be true.

### Q4. In `int a = i++;`, `a` gets:
- a) The new value
- b) The old value of `i`
- c) Zero
- d) A garbage value

**Answer:** b — postfix yields the old value, then increments.

### Q5. `x << 1`:
- a) Doubles `x` (shifts bits left)
- b) Halves `x`
- c) Clears `x`
- d) Compares `x`

**Answer:** a — a left shift by 1 multiplies by 2.


### Type Conversion and Casting

### Q1. `static_cast<int>(3.99)` equals:
- a) 4
- b) 3
- c) 3.99
- d) 0

**Answer:** b — casting truncates (drops the fraction).

### Q2. To get decimal division from `a / b` (both int), do:
- a) `a / b` as-is
- b) `static_cast<double>(a) / b`
- c) `static_cast<int>(a / b)`
- d) `a % b`

**Answer:** b — cast an operand before dividing.

### Q3. int → double is a:
- a) Narrowing conversion
- b) Widening conversion (safe)
- c) Compile error
- d) Pointer cast

**Answer:** b — widening preserves the value.

### Q4. To round 3.7 to 4, use:
- a) `static_cast<int>(3.7)`
- b) `std::round(3.7)`
- c) `std::floor(3.7)`
- d) `3.7 + 0.5` only

**Answer:** b — `std::round` rounds to nearest.

### Q5. `static_cast<char>('A' + 1)` equals:
- a) 'A'
- b) 'B'
- c) 66
- d) '1'

**Answer:** b — adding 1 to the code gives the next character.


## Module 3 — Control flow

### Conditional Statements

### Q1. In `if (x == 5)`, `==` means:
- a) Assignment
- b) Comparison (equality)
- c) Increment
- d) Declaration

**Answer:** b — `==` compares; `=` assigns.

### Q2. Without braces, an `if` controls:
- a) The whole program
- b) Only the next single statement
- c) Everything until `else`
- d) Nothing

**Answer:** b — only the immediately following statement.

### Q3. In a `switch`, `break`:
- a) Exits the switch
- b) Jumps to default
- c) Repeats the case
- d) Does nothing

**Answer:** a — `break` stops the fall-through and exits.

### Q4. The ternary `a > b ? a : b` returns:
- a) Always a
- b) The larger of a and b
- c) A boolean
- d) The smaller of a and b

**Answer:** b — returns `a` if true, else `b`.

### Q5. Missing `break` in a switch case causes:
- a) A compile error
- b) Fall-through into the next case
- c) An infinite loop
- d) The switch to exit

**Answer:** b — execution continues into the next case.


### Loops

### Q1. A `for` loop's condition is checked:
- a) Once
- b) Before each iteration
- c) After the loop ends
- d) Never

**Answer:** b — the condition gates every iteration.

### Q2. A `do-while` loop:
- a) May run zero times
- b) Always runs at least once
- c) Never runs
- d) Runs exactly twice

**Answer:** b — the body runs before the first check.

### Q3. The range-based `for (int x : arr)`:
- a) Requires an index
- b) Iterates each element of `arr`
- c) Runs once
- d) Is invalid C++

**Answer:** b — it visits every element in order.

### Q4. `for (int i = 0; i < 5; ++i)` runs the body:
- a) 4 times
- b) 5 times
- c) 6 times
- d) Once

**Answer:** b — i = 0,1,2,3,4 → 5 iterations.

### Q5. Which loop is best when the iteration count is unknown but a condition holds?
- a) `for`
- b) `while`
- c) range-based `for`
- d) none

**Answer:** b — `while` repeats while a condition is true.


### Loop Control Statements

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


### Nested Loops

### Q1. For an outer loop (3×) and inner loop (3×), the inner body runs:
- a) 3 times
- b) 6 times
- c) 9 times
- d) 27 times

**Answer:** c — 3 × 3 = 9 total iterations.

### Q2. In 2D array processing, the outer loop usually represents:
- a) Columns
- b) Rows
- c) Values
- d) Nothing

**Answer:** b — outer = rows, inner = columns.

### Q3. Two nested loops over n are:
- a) O(n)
- b) O(n²)
- c) O(log n)
- d) O(1)

**Answer:** b — n × n iterations.

### Q4. `for (int j = 0; j <= i; ++j)` produces:
- a) A square
- b) A growing triangle
- c) A shrinking triangle
- d) A diagonal only

**Answer:** b — the inner bound grows with i.

### Q5. To print rows on separate lines, add:
- a) A space
- b) `std::cout << "\n"` after the inner loop
- c) A tab
- d) Nothing

**Answer:** b — the newline separates rows.


### Pattern Programming

### Q1. A pyramid row `i` (1-based, `n` rows) has how many stars?
- a) `i`
- b) `2*i - 1`
- c) `n - i`
- d) `i*i`

**Answer:** b — odd counts: 1, 3, 5, ...

### Q2. The number of leading spaces in row `i` of a pyramid is:
- a) `i`
- b) `n - i`
- c) `2*i`
- d) `n + i`

**Answer:** b — spaces shrink as `i` grows.

### Q3. A diamond is usually built from:
- a) One loop
- b) Two halves (upper + lower)
- c) Recursion only
- d) A single nested loop

**Answer:** b — upper half then lower half.

### Q4. In a hollow square, stars print only when:
- a) Inside the shape
- b) On the border (first/last row or column)
- c) Row equals column
- d) Always

**Answer:** b — border cells are stars; interior is spaces.

### Q5. Floyd's triangle prints:
- a) Only stars
- b) Consecutive numbers
- c) Letters
- d) A diamond

**Answer:** b — a running counter of numbers.


## Module 4 — Functions

### Introduction to Functions

### Q1. A function's return type comes:
- a) After the name
- b) Before the name
- c) Inside the body
- d) Nowhere

**Answer:** b — `int add(...)` — return type precedes the name.

### Q2. A function declared `void`:
- a) Returns 0
- b) Returns nothing
- c) Returns `void*`
- d) Cannot be called

**Answer:** b — `void` means no return value.

### Q3. A function prototype:
- a) Contains the full body
- b) Declares the signature only
- c) Runs the function
- d) Is optional in all cases

**Answer:** b — it declares name/params/return so calls compile.

### Q4. `return` inside a function:
- a) Skips to the next function
- b) Exits the function immediately
- c) Loops the function
- d) Prints the value

**Answer:** b — `return` sends the value back and ends the call.

### Q5. The main benefit of functions is:
- a) Slower code
- b) Reuse and abstraction
- c) More global variables
- d) Longer programs

**Answer:** b — write once, reuse, and hide complexity behind a name.


### Function Parameters and Return Values

### Q1. Pass-by-value means:
- a) The original is modified
- b) A copy is passed; the original is untouched
- c) A reference is passed
- d) Nothing is passed

**Answer:** b — the parameter is an independent copy.

### Q2. `int& x` declares:
- a) A pointer
- b) A reference (alias) to an int
- c) A copy
- d) A constant

**Answer:** b — `&` after the type makes it a reference.

### Q3. For a large read-only `vector`, pass by:
- a) Value
- b) `const std::vector<int>&`
- c) Non-const reference
- d) Pointer to pointer

**Answer:** b — `const&` avoids copying and prevents modification.

### Q4. Default arguments must appear:
- a) First
- b) After all non-defaulted parameters
- c) Anywhere
- d) Only in the definition

**Answer:** b — defaults must trail non-defaulted parameters.

### Q5. Returning a reference to a local variable:
- a) Is safe
- b) Creates a dangling reference (undefined behaviour)
- c) Copies the value
- d) Is required

**Answer:** b — the local dies when the function returns.


### Function Overloading

### Q1. Overloading means:
- a) Same name, different parameter lists
- b) Same name, same parameters, different return
- c) Different names, same parameters
- d) One function per program

**Answer:** a — overloads differ in parameters.

### Q2. Two functions can't be overloaded based only on:
- a) Parameter count
- b) Parameter types
- c) Return type
- d) Parameter order

**Answer:** c — return type alone is insufficient.

### Q3. For `f(3.14)` with `f(int)` and `f(double)`, the compiler picks:
- a) `f(int)`
- b) `f(double)` (exact match)
- c) Neither (ambiguous)
- d) Both

**Answer:** b — `double` is an exact match.

### Q4. An ambiguous call happens when:
- a) One candidate is best
- b) Two candidates are equally good
- c) No candidates exist
- d) A default is used

**Answer:** b — ties make the call ambiguous.

### Q5. Overloading helps by:
- a) Slowing the program
- b) Providing one intuitive name for many types
- c) Requiring more names
- d) Removing the compiler

**Answer:** b — a single clean name per concept.


### Scope and Lifetime

### Q1. A local variable's scope is:
- a) The whole program
- b) Its enclosing block
- c) All functions
- d) All files

**Answer:** b — from declaration to the end of its block.

### Q2. A `static` local variable:
- a) Is recreated each call
- b) Persists across calls (initialized once)
- c) Is global
- d) Is always zero

**Answer:** b — it keeps its value between calls.

### Q3. Declaring an inner variable with the same name as an outer one:
- a) Is an error
- b) Shadows the outer variable
- c) Deletes the outer variable
- d) Merges them

**Answer:** b — the inner declaration hides the outer one.

### Q4. A global variable is visible:
- a) Only in main
- b) Throughout the program (after declaration)
- c) Only in one block
- d) Nowhere

**Answer:** b — global scope, program lifetime.

### Q5. Returning a pointer to a local variable yields:
- a) A safe copy
- b) A dangling pointer (undefined behaviour)
- c) A compile error always
- d) Null

**Answer:** b — the local dies at return, leaving a dangling pointer.


### Introduction to Recursion

### Q1. Every recursive function needs:
- a) A loop
- b) A base case and a recursive case
- c) A global variable
- d) Two return statements

**Answer:** b — base case stops; recursive case progresses.

### Q2. The base case:
- a) Calls the function again
- b) Returns directly without recursing
- c) Is optional
- d) Runs last

**Answer:** b — it terminates the recursion.

### Q3. Infinite recursion leads to:
- a) A compile error
- b) Stack overflow
- c) Returning zero
- d) Nothing

**Answer:** b — unbounded calls exhaust the call stack.

### Q4. `factorial(4)` makes how many recursive calls (excluding the base)?
- a) 3
- b) 4
- c) 5
- d) 1

**Answer:** a — factorial(3), factorial(2), factorial(1) then the base.

### Q5. A downside of recursion vs iteration:
- a) Always wrong
- b) Can overflow the stack for deep recursion
- c) Cannot compute sums
- d) Requires global variables

**Answer:** b — deep recursion consumes stack space.


## Module 5 — Arrays and strings

### Arrays (1D)

### Q1. What is the index of the first element of an array in C++?
- a) 1
- b) 0
- c) -1
- d) It depends on the array size

**Answer:** b

### Q2. What does `int arr[4] = {7};` contain?
- a) `{7, 7, 7, 7}`
- b) `{7, 0, 0, 0}`
- c) `{7, garbage, garbage, garbage}`
- d) A compile error

**Answer:** b — partial initializers zero-fill the rest.

### Q3. For `int a[] = {1, 2, 3, 4, 5};`, what is the value of `sizeof(a) / sizeof(a[0])`?
- a) 5
- b) 20
- c) 4
- d) Undefined

**Answer:** a — total bytes (20) divided by bytes-per-element (4) equals the count.

### Q4. Accessing `a[5]` when `a` was declared as `int a[5]` is:
- a) Safe, returns 0
- b) A compile-time error
- c) Undefined behaviour
- d) Automatically resizes the array

**Answer:** c — no bounds checking is performed.

### Q5. Which of these correctly initializes an array with all zeros?
- a) `int a[5] = 0;`
- b) `int a[5] = {};`
- c) `int a[5];`
- d) `int a[] = 0;`

**Answer:** b


### Multidimensional Arrays

### Q1. How many elements does `int arr[3][4];` hold?
- a) 7
- b) 12
- c) 34
- d) 16

**Answer:** b — rows × columns = 3 × 4.

### Q2. In a 2D array `int a[3][4]`, which is a valid element access?
- a) `a[3][4]`
- b) `a[2][3]`
- c) `a[0][4]`
- d) `a[4][2]`

**Answer:** b — valid indices are rows 0–2 and columns 0–3.

### Q3. C++ stores a 2D array in memory using which order?
- a) Column-major
- b) Row-major
- c) Random order
- d) Depends on the compiler flag

**Answer:** b — rows are stored contiguously, one after another.

### Q4. Which correctly initializes a 2×2 array with `{ {1,2}, {3,4} }`?
- a) `int a[2][2] = {{1,2},{3,4}};`
- b) `int a[2][2] = {1,2,3,4};`
- c) `int a[][2] = {{1,2},{3,4}};`
- d) All of the above

**Answer:** d — all three forms are valid and equivalent.

### Q5. When passing a 2D array to a function, which dimension must always be specified?
- a) The number of rows
- b) The number of columns
- c) Both
- d) Neither

**Answer:** b — the compiler needs the column count to compute element offsets.


### Strings

### Q1. What is the null terminator in C/C++?
- a) `'\n'`
- b) `'\0'`
- c) `"0"`
- d) `NULL`

**Answer:** b — the character with value zero that ends a C-string.

### Q2. What does `std::string s = "abc"; std::cout << s.length();` print?
- a) 2
- b) 3
- c) 4
- d) It depends on the compiler

**Answer:** b — three characters; the terminator is not counted.

### Q3. Which reads a whole line including spaces?
- a) `std::cin >> line;`
- b) `std::getline(std::cin, line);`
- c) `std::cin.get(line);`
- d) `std::readline(line);`

**Answer:** b

### Q4. What does `std::string a = "abc", b = "abc"; if (a == b)` evaluate?
- a) Compile error
- b) Always false (compares addresses)
- c) True — `std::string` compares contents
- d) Undefined behaviour

**Answer:** c

### Q5. For C-style strings, which is the correct way to compare contents?
- a) `s1 == s2`
- b) `s1 = s2`
- c) `strcmp(s1, s2) == 0`
- d) `s1.compare(s2)`

**Answer:** c — `strcmp` from `<cstring>` compares contents; `s1.compare` is for `std::string`.


### String Operations

### Q1. What does `std::string("abcdef").substr(2, 3)` return?
- a) `"cde"`
- b) `"bcd"`
- c) `"cd"`
- d) `"def"`

**Answer:** a — start at index 2 (`'c'`), take 3 characters.

### Q2. What does `std::string("hello").find("z")` return?
- a) 0
- b) -1
- c) `std::string::npos`
- d) Throws an exception

**Answer:** c — `npos` signals "not found".

### Q3. Which call converts the string `"123"` to an integer?
- a) `std::to_int("123")`
- b) `std::stoi("123")`
- c) `"123".toInt()`
- d) `(int)"123"`

**Answer:** b

### Q4. What does `std::string s = "abc"; s += "de";` make `s`?
- a) `"abc de"`
- b) `"abcde"`
- c) `"deabc"`
- d) Compile error

**Answer:** b — `+=` appends.

### Q5. Which correctly uppercases every character of `std::string s`?
- a) `s.toUpper();`
- b) `for (char c : s) std::toupper(c);`
- c) `std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c){ return std::toupper(c); });`
- d) `std::upper(s);`

**Answer:** c — options a/b/d do not exist or do not modify `s`.


### Arrays and Strings as Function Parameters

### Q1. When an array is passed to a function, what actually gets passed?
- a) A copy of the whole array
- b) A pointer to its first element
- c) The array size only
- d) A reference to the array type

**Answer:** b — the array decays to a pointer.

### Q2. Why is `sizeof(a)` unreliable inside a function with parameter `int a[]`?
- a) `sizeof` is only for types
- b) `a` has decayed to a pointer, so `sizeof` returns the pointer size
- c) The compiler strips array parameters
- d) `sizeof` is banned in functions

**Answer:** b

### Q3. Which signature is valid for a function taking a 2D array?
- a) `void f(int g[][], int r, int c);`
- b) `void f(int g[][4], int rows);`
- c) `void f(int g[3][], int cols);`
- d) `void f(int g[][], int rows);`

**Answer:** b — the column dimension must be specified.

### Q4. Which is the most efficient way to pass a read-only `std::string`?
- a) `void f(std::string s)`
- b) `void f(std::string& s)`
- c) `void f(const std::string& s)`
- d) `void f(std::string* s)`

**Answer:** c — no copy, and `const` prevents modification.

### Q5. A function `void f(std::vector<int> v)` doubles every element of `v`. After the call, the caller's vector is:
- a) Doubled
- b) Unchanged
- c) Empty
- d) Undefined

**Answer:** b — `v` is a copy; the caller's vector is untouched.


## Module 6 — Memory and pointers

### Pointers Basics

### Q1. What does a pointer store?
- a) The value of a variable
- b) The memory address of a variable
- c) The type of a variable
- d) The size of a variable

**Answer:** b

### Q2. If `int x = 5; int* p = &x;`, what prints the value 5?
- a) `std::cout << p;`
- b) `std::cout << *p;`
- c) `std::cout << &x;`
- d) `std::cout << &p;`

**Answer:** b — `*p` dereferences the pointer.

### Q3. What is the safest way to initialize a pointer that currently points to nothing?
- a) `int* p = 0;`
- b) `int* p = nullptr;`
- c) `int* p;`
- d) `int* p = 1;`

**Answer:** b — `nullptr` is the C++11 idiomatic null pointer.

### Q4. What does `p->size()` mean when `p` is a `std::string*`?
- a) Access the `size` member of the pointer
- b) Access the `size()` member of the pointed-to string
- c) Delete the pointer
- d) Take the address of `size()`

**Answer:** b — `p->m` equals `(*p).m`.

### Q5. `int* p, q;` declares:
- a) Two pointers
- b) One pointer and one `int`
- c) Two ints
- d) A syntax error

**Answer:** b — `*` binds to the declarator, so `q` is an `int`.


### Pointer Arithmetic

### Q1. If `p` is an `int*` pointing at element 0, what does `p + 2` point at?
- a) Two bytes ahead
- b) The element at index 2
- c) The address value plus 2
- d) Undefined location

**Answer:** b — pointer arithmetic scales by `sizeof(int)`.

### Q2. `arr[i]` is equivalent to:
- a) `*(arr + i)`
- b) `*arr + i`
- c) `arr + *i`
- d) `&arr[i]`

**Answer:** a — indexing is syntactic sugar for pointer addition plus dereference.

### Q3. For `int a[5]; int* b = a; int* e = a + 5;`, what is `e - b`?
- a) 20
- b) 5
- c) 4
- d) Compile error

**Answer:** b — pointer difference reports the number of elements.

### Q4. Which type moves a pointer by exactly one byte when incremented?
- a) `int*`
- b) `char*`
- c) `double*`
- d) `void*`

**Answer:** b — `char` has size 1.

### Q5. What does `*p++` do?
- a) Increments the pointed-to value
- b) Dereferences `p`, then advances `p` to the next element
- c) Advances `p`, then dereferences
- d) Compile error

**Answer:** b — postfix `++` binds first; the dereference uses the old value, then `p` advances.


### References

### Q1. What is a reference in C++?
- a) A pointer that can be null
- b) An alias for an existing variable
- c) A new copy of a variable
- d) A constant pointer you must free

**Answer:** b

### Q2. Which correctly declares a reference to `int x`?
- a) `int ref = x;`
- b) `int& ref = x;`
- c) `int* ref = &x;`
- d) `int& ref = 5;`

**Answer:** b — and it must initialize from an lvalue like `x`.

### Q3. After `int x = 1; int& r = x; r = 7;`, what is `x`?
- a) 1
- b) 7
- c) Undefined
- d) Compile error

**Answer:** b — `r` aliases `x`, so assigning to `r` changes `x`.

### Q4. Why pass a `std::string` as `const std::string&`?
- a) To allow modifying it
- b) To avoid copying while preventing modification
- c) To make it faster to copy
- d) To require a null check

**Answer:** b

### Q5. What happens if a function returns a reference to a local variable?
- a) A copy is made automatically
- b) A compile error always occurs
- c) A dangling reference — undefined behaviour
- d) The reference becomes `nullptr`

**Answer:** c — the local is destroyed when the function returns.


### Dynamic Memory Allocation

### Q1. Which operator releases memory allocated with `new[]`?
- a) `delete`
- b) `delete[]`
- c) `free`
- d) `remove`

**Answer:** b — `new[]` pairs with `delete[]`.

### Q2. Memory allocated with `new` lives on the:
- a) Stack
- b) Heap
- c) Code segment
- d) Register

**Answer:** b

### Q3. Losing the last pointer to `new`-allocated memory without deleting causes:
- a) A stack overflow
- b) A memory leak
- c) A compile error
- d) Automatic cleanup

**Answer:** b

### Q4. After `int* p = new int(5); delete p;`, what is `p`?
- a) `nullptr`
- b) A dangling pointer
- c) A copy of the value 5
- d) Automatically freed

**Answer:** b — `delete` does not change `p`'s value; it is now dangling.

### Q5. Which is the safest way to manage a dynamically sized array in modern C++?
- a) `new[]` / `delete[]`
- b) `std::vector`
- c) `malloc` / `free`
- d) A global array

**Answer:** b — RAII frees memory automatically.


### Smart Pointers

### Q1. Which smart pointer has exclusive ownership?
- a) `shared_ptr`
- b) `unique_ptr`
- c) `weak_ptr`
- d) `auto_ptr`

**Answer:** b

### Q2. How do you transfer ownership of a `unique_ptr` to another variable?
- a) Copy assignment
- b) `std::move`
- c) `clone()`
- d) It cannot be transferred

**Answer:** b

### Q3. When is an object managed by `shared_ptr` destroyed?
- a) When created
- b) When the first `shared_ptr` is declared
- c) When the reference count reaches zero
- d) Never

**Answer:** c

### Q4. Which is the recommended way to create a `unique_ptr`?
- a) `new std::unique_ptr<int>(5)`
- b) `std::make_unique<int>(5)`
- c) `std::unique_ptr<int> p = 5;`
- d) `std::make_shared<int>(5)`

**Answer:** b — `make_unique` creates a `unique_ptr`.

### Q5. A `weak_ptr` is used to:
- a) Increase the reference count
- b) Observe an object without owning it
- c) Replace `unique_ptr`
- d) Allocate memory

**Answer:** b — and it is the standard tool for breaking `shared_ptr` cycles.


## Module 7 — Oop

### Classes and Objects

### Q1. What is an object?
- a) A blueprint for data
- b) A concrete instance of a class
- c) A member function
- d) A data type

**Answer:** b

### Q2. In a `class`, members are by default:
- a) `public`
- b) `private`
- c) `protected`
- d) `static`

**Answer:** b — unlike `struct`, where they default to `public`.

### Q3. Which operator accesses members of an object?
- a) `->`
- b) `::`
- c) `.`
- d) `*`

**Answer:** c — dot on objects; `->` is for pointers to objects.

### Q4. Why make a data member `private`?
- a) To make the program faster
- b) To hide internals and control access via methods
- c) To allow access from anywhere
- d) To make it read-only automatically

**Answer:** b

### Q5. What does `double Rectangle::area() { ... }` define?
- a) A global function named `area`
- b) The `area` member of class `Rectangle`, defined outside the class
- c) A new class
- d) A constructor

**Answer:** b


### Constructors and Destructors

### Q1. A constructor has:
- a) The class name and a return type
- b) The class name and no return type
- c) A `~` prefix
- d) A `void` return type

**Answer:** b

### Q2. When is a destructor called?
- a) When the object is created
- b) When the object goes out of scope or is deleted
- c) Only when explicitly invoked
- d) At program start

**Answer:** b

### Q3. Which initializes a member correctly?
- a) `Point(int a) { x = a; }`
- b) `Point(int a) : x(a) {}`
- c) `Point(int a) : { x = a; }`
- d) `Point(int a) { x(a); }`

**Answer:** b — member initializer list syntax.

### Q4. The Rule of Three applies to classes that:
- a) Have no members
- b) Manage a resource like dynamic memory
- c) Are declared `final`
- d) Only contain `int`s

**Answer:** b — they need destructor, copy constructor, and copy assignment.

### Q5. What is a common bug without a custom copy constructor in a resource-owning class?
- a) Compile error
- b) Double free from shallow copies
- c) The class becomes abstract
- d) Members become public

**Answer:** b — the default copy shares the pointer, so both objects free the same memory.


### Encapsulation and Access Specifiers

### Q1. Encapsulation means:
- a) Making all members public
- b) Bundling data with methods and hiding internals
- c) Removing all methods
- d) Using only global variables

**Answer:** b

### Q2. Which member can be accessed by derived classes but not outside code?
- a) `public`
- b) `private`
- c) `protected`
- d) `static`

**Answer:** c

### Q3. Why validate inputs in a setter?
- a) To make the program slower
- b) To preserve object invariants
- c) To force `friend` usage
- d) There is no reason

**Answer:** b

### Q4. What is the main risk of returning `int&` from a getter?
- a) It's always slower
- b) Callers can modify the private data directly
- c) It causes a compile error
- d) It deletes the object

**Answer:** b

### Q5. A `friend` function can:
- a) Access private members of the granting class
- b) Be inherited by derived classes
- c) Access private members of all classes
- d) Replace constructors

**Answer:** a — access is granted by the specific class, only to that function/class.


### Inheritance

### Q1. `class Dog : public Animal` means:
- a) `Dog` has-a `Animal`
- b) `Dog` is-a `Animal`
- c) `Animal` is-a `Dog`
- d) `Dog` copies `Animal`

**Answer:** b — public inheritance models "is-a".

### Q2. In a derived class, what is constructed first?
- a) Derived part
- b) Base part
- c) Both simultaneously
- d) Members only

**Answer:** b — base first, then derived.

### Q3. Which keyword marks a method as overriding a virtual base method?
- a) `new`
- b) `override`
- c) `super`
- d) `extends`

**Answer:** b

### Q4. Why should a base class with virtual functions have a virtual destructor?
- a) To speed up deletion
- b) So deleting via a base pointer calls the correct destructor
- c) To prevent inheritance
- d) It is optional and rarely needed

**Answer:** b

### Q5. What is object slicing?
- a) Deleting a derived object
- b) Copying a derived object into a base object, losing derived data
- c) Creating multiple bases
- d) Making a class abstract

**Answer:** b


### Polymorphism

### Q1. Runtime polymorphism in C++ is achieved with:
- a) Templates
- b) Virtual functions
- c) Macros
- d) Global variables

**Answer:** b

### Q2. A pure virtual function is declared with:
- a) `= delete`
- b) `= 0`
- c) `virtual {}`
- d) `override`

**Answer:** b

### Q3. Calling `speak()` through a `Base&` that refers to a `Derived` object calls the derived version when:
- a) `speak` is `virtual` in the base
- b) The reference is `const`
- c) The derived class is final
- d) Always

**Answer:** a

### Q4. What is the vtable?
- a) A list of virtual destructors
- b) A per-class table of virtual function pointers used for dispatch
- c) A hash table of objects
- d) A compile-time constant

**Answer:** b

### Q5. Passing a polymorphic object **by value** to a function causes:
- a) Faster dispatch
- b) Object slicing — the derived part is lost
- c) A compile error
- d) Automatic cloning

**Answer:** b — pass by reference or pointer to preserve polymorphism.


## Module 8 — Advanced cpp

### Templates

### Q1. Templates are resolved at:
- a) Runtime
- b) Compile time
- c) Link time
- d) First execution

**Answer:** b — each usage generates a concrete function/class during compilation.

### Q2. `template <typename T>` declares:
- a) A runtime variable
- b) A type parameter
- c) A constant
- d) A namespace

**Answer:** b

### Q3. `Box<int> b;` where `Box` is a class template is called:
- a) Specialization
- b) Instantiation
- c) Inheritance
- d) Encapsulation

**Answer:** b — a concrete `Box<int>` class is instantiated.

### Q4. What is the main benefit of templates?
- a) Smaller binaries
- b) Write once, reuse for many types without duplication
- c) Faster runtime than virtual functions in all cases
- d) Automatic memory management

**Answer:** b

### Q5. Which is a valid template parameter list?
- a) `template <int T>`
- b) `template <typename T, typename U>`
- c) `template <T typename>`
- d) `template [typename T]`

**Answer:** b


### Exception Handling

### Q1. Which keyword raises an exception?
- a) `raise`
- b) `throw`
- c) `error`
- d) `abort`

**Answer:** b

### Q2. The correct way to catch a standard exception is:
- a) `catch (std::exception e)`
- b) `catch (const std::exception& e)`
- c) `catch (std::exception* e)`
- d) `catch (e)`

**Answer:** b — by `const&` to avoid slicing.

### Q3. What happens when an exception is thrown and a matching `catch` is found up the stack?
- a) The program always terminates
- b) The stack unwinds, running destructors, until the handler is reached
- c) The exception is ignored
- d) The program restarts the function

**Answer:** b

### Q4. `catch (...)` means:
- a) Catch `std::exception` only
- b) Catch any exception type
- c) Catch nothing
- d) A syntax error

**Answer:** b — it is the catch-all.

### Q5. What does `noexcept` declare?
- a) The function returns nothing
- b) The function promises not to throw
- c) The function catches all exceptions
- d) The function is const

**Answer:** b


### Operator Overloading

### Q1. `a + b` on class types is rewritten by the compiler as:
- a) `a.add(b)`
- b) `a.operator+(b)` or `operator+(a, b)`
- c) `plus(a, b)`
- d) A direct byte addition

**Answer:** b

### Q2. Which operator can only be overloaded as a member function?
- a) `+`
- b) `==`
- c) `=`
- d) `<<`

**Answer:** c — assignment, `[]`, `()`, `->` are member-only.

### Q3. Why should `operator[]` return a reference?
- a) To be faster
- b) To allow modification like `a[3] = 5;`
- c) To prevent copies
- d) It must not return a reference

**Answer:** b

### Q4. What should `operator+` return for a value-semantics class?
- a) A reference to `*this`
- b) A new value (by value)
- c) `void`
- d) A pointer

**Answer:** b — arithmetic produces a new result without modifying operands.

### Q5. Why is `operator<<` usually a free function?
- a) It must be `static`
- b) The left operand is `std::ostream`, not the class
- c) Free functions are faster
- d) Members cannot take parameters

**Answer:** b


### Namespaces

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


### File I/O

### Q1. Which class reads from a file?
- a) `ofstream`
- b) `ifstream`
- c) `ostream`
- d) `iostream`

**Answer:** b — "i" = input, "o" = output, "f" = file.

### Q2. What does opening a file with `std::ofstream out("f.txt")` do to existing content?
- a) Appends to it
- b) Truncates (clears) it
- c) Reads it
- d) Leaves it unchanged

**Answer:** b — default `ofstream` mode truncates.

### Q3. Which is the correct read-until-EOF loop?
- a) `while (!in.eof()) { in >> x; }`
- b) `while (in >> x) { ... }`
- c) `while (in) { x = in; }`
- d) `do { in >> x; } while (in);`

**Answer:** b — loop on the read itself.

### Q4. To append to a file, open with:
- a) `std::ios::trunc`
- b) `std::ios::app`
- c) `std::ios::in`
- d) `std::ios::binary`

**Answer:** b

### Q5. After a failed open, the correct check is:
- a) `if (in == nullptr)`
- b) `if (!in)`
- c) `if (in.eof())`
- d) `if (in.close())`

**Answer:** b — the stream converts to `false` on failure.


## Module 9 — Modern cpp

### Auto and Type Deduction

### Q1. `auto x = 3.14;` makes `x` a:
- a) `float`
- b) `double`
- c) `int`
- d) `const double`

**Answer:** b — a floating literal is `double`.

### Q2. For `const int n = 5;`, what type is `auto a = n;`?
- a) `const int`
- b) `int&`
- c) `int` — const is dropped
- d) `const int&`

**Answer:** c — plain `auto` copies and drops const.

### Q3. To modify vector elements in a range-based loop, use:
- a) `for (auto x : v)`
- b) `for (auto& x : v)`
- c) `for (const auto x : v)`
- d) `for (auto* x : v)`

**Answer:** b

### Q4. What does `auto s = "hello";` deduce?
- a) `std::string`
- b) `char*`
- c) `const char*`
- d) `char[6]`

**Answer:** c — string literals are `const char*`.

### Q5. `decltype` differs from `auto` because it:
- a) Is evaluated at runtime
- b) Preserves references and constness
- c) Requires C++20
- d) Cannot be used with templates

**Answer:** b


### Lambda Expressions

### Q1. Which part of a lambda determines what surrounding variables it can access?
- a) Parameter list
- b) Capture list
- c) Return type
- d) Body

**Answer:** b

### Q2. `[=]` captures:
- a) Nothing
- b) All used variables by value
- c) All used variables by reference
- d) Only `this`

**Answer:** b

### Q3. A by-value capture is by default:
- a) Mutable
- b) Const inside the lambda
- c) A reference
- d) Deleted

**Answer:** b — use `mutable` to allow modification of the copy.

### Q4. `[](auto x) { return x; }` is called a:
- a) Const lambda
- b) Generic lambda (C++14)
- c) Capture-less lambda
- d) Mutable lambda

**Answer:** b

### Q5. Modifying a `[&n]` captured variable inside the lambda:
- a) Changes the original `n`
- b) Changes a copy only
- c) Is a compile error
- d) Deletes `n`

**Answer:** a — reference capture aliases the original.


### Move Semantics

### Q1. An rvalue is best described as:
- a) A named object
- b) A temporary value without a stable address
- c) A reference
- d) A constant

**Answer:** b

### Q2. What does `std::move(x)` actually do?
- a) Moves `x`'s data immediately
- b) Casts `x` to an rvalue reference
- c) Deletes `x`
- d) Copies `x`

**Answer:** b — it enables the move constructor/assignment to run.

### Q3. After `std::vector<int> b = std::move(a);`, `a` is:
- a) Guaranteed empty
- b) Valid but unspecified — safe to assign or destroy
- c) Deleted
- d) Deep-copied

**Answer:** b

### Q4. Why mark move operations `noexcept`?
- a) To make them faster
- b) So containers (e.g. `std::vector`) can use them during reallocation
- c) To prevent all exceptions
- d) It is required syntax

**Answer:** b

### Q5. Moving a `const std::string` results in:
- a) A compile error
- b) A copy
- c) A double free
- d) An empty string

**Answer:** b — a const object cannot be moved from, so the copy constructor runs.


### Range-based For and Structured Bindings

### Q1. To modify elements in a range-based loop, the loop variable should be:
- a) `auto`
- b) `auto&`
- c) `const auto&`
- d) `const auto`

**Answer:** b

### Q2. Structured bindings are available since:
- a) C++11
- b) C++14
- c) C++17
- d) C++20

**Answer:** c

### Q3. For `std::pair<std::string,int> p;`, `auto [s, n] = p;` gives:
- a) `s` is `std::string`, `n` is `int`
- b) Both are references
- c) `s` is `int`, `n` is `std::string`
- d) A compile error

**Answer:** a — binds in order.

### Q4. In `for (const auto& [k, v] : myMap)`, what are `k` and `v`?
- a) The key and value of each map element
- b) The map's iterators
- c) Indices
- d) A pair of references to the whole map

**Answer:** a

### Q5. `std::tie(r, g, b) = tuple;` is used to:
- a) Declare new variables
- b) Assign tuple elements into existing variables
- c) Move the tuple
- d) Delete the tuple

**Answer:** b


### constexpr and Compile-Time Programming

### Q1. `constexpr` means a value or function can be evaluated:
- a) Only at runtime
- b) At compile time (when inputs are constant)
- c) Only in templates
- d) Never

**Answer:** b

### Q2. `constexpr int x = square(5);` computes `square(5)`:
- a) At runtime
- b) At compile time
- c) Lazily on first use
- d) It is a compile error

**Answer:** b

### Q3. `static_assert(cond, "msg")` fails:
- a) At runtime
- b) At compile time
- c) Only in debug builds
- d) Never

**Answer:** b

### Q4. `if constexpr` selects a branch based on:
- a) Runtime values
- b) A compile-time (type-dependent) condition, discarding other branches
- c) User input
- d) Random choice

**Answer:** b

### Q5. Which requires evaluation ONLY at compile time (C++20)?
- a) `const`
- b) `constexpr`
- c) `consteval`
- d) `static`

**Answer:** c


## Module 10 — Stl

### Vectors and Sequence Containers

### Q1. `std::vector` stores elements:
- a) In linked nodes
- b) Contiguously in a dynamic array
- c) In a hash table
- d) On the stack only

**Answer:** b

### Q2. `v.size()` returns:
- a) Allocated memory slots
- b) The number of elements currently stored
- c) The maximum possible size
- d) The byte size of the vector

**Answer:** b

### Q3. What does `v.reserve(1000)` do?
- a) Creates 1000 elements
- b) Pre-allocates capacity for 1000 elements without adding any
- c) Removes 1000 elements
- d) Resizes to exactly 1000

**Answer:** b

### Q4. Which access throws on an invalid index?
- a) `v[i]`
- b) `v.at(i)`
- c) `v.front()`
- d) `v.back()`

**Answer:** b

### Q5. Which container gives O(1) insert/erase anywhere but no random access?
- a) `vector`
- b) `deque`
- c) `list`
- d) `array`

**Answer:** c


### Associative Containers (Map and Set)

### Q1. `std::set` stores:
- a) Sorted, unique keys
- b) Unsorted duplicates
- c) Key-value pairs
- d) A fixed array

**Answer:** a

### Q2. `std::map<std::string,int>` lookup with `find` has complexity:
- a) O(1)
- b) O(log n)
- c) O(n)
- d) O(n log n)

**Answer:** b — a balanced tree.

### Q3. What does `m["newkey"]` do when the key is absent?
- a) Throws an exception
- b) Returns an error
- c) Inserts the key with a default value
- d) Returns `nullptr`

**Answer:** c — `operator[]` default-constructs the value.

### Q4. Which gives O(1) average lookup?
- a) `std::map`
- b) `std::unordered_map`
- c) `std::set`
- d) `std::list`

**Answer:** b — hash table.

### Q5. To check membership without inserting, use:
- a) `m[key]`
- b) `m.find(key) != m.end()`
- c) `m.at(key)`
- d) `m[key] = 0`

**Answer:** b


### Iterators and Ranges

### Q1. In the range `[begin, end)`, `end` points to:
- a) The last element
- b) One past the last element
- c) The first element
- d) A null element

**Answer:** b

### Q2. Which iterator category supports `it + 3`?
- a) Input
- b) Forward
- c) Bidirectional
- d) Random-access

**Answer:** d

### Q3. `v.rbegin()` points to:
- a) The first element
- b) The last element
- c) One before the first
- d) One past the last

**Answer:** b — reverse iterators start at the back.

### Q4. `std::begin(arr)` works on a raw C array:
- a) True
- b) False
- c) Only for `std::array`
- d) Only with `std::end`

**Answer:** a — `std::begin`/`std::end` support arrays.

### Q5. Dereferencing `v.end()` is:
- a) Safe, returns 0
- b) Undefined behaviour
- c) A compile error
- d) Returns the last element

**Answer:** b


### STL Algorithms

### Q1. `std::sort` requires:
- a) Input iterators
- b) Random-access iterators
- c) A linked list
- d) A hash table

**Answer:** b

### Q2. The erase–remove idiom is:
- a) `v.erase(std::remove(...), v.end())`
- b) `std::remove(v)` alone
- c) `v.remove(...)`
- d) `std::erase(v)`

**Answer:** a

### Q3. `std::binary_search` assumes the range is:
- a) Empty
- b) Sorted
- c) Reversed
- d) A set

**Answer:** b

### Q4. Which algorithm checks if every element satisfies a predicate?
- a) `any_of`
- b) `count_if`
- c) `all_of`
- d) `find_if`

**Answer:** c

### Q5. `std::accumulate(v.begin(), v.end(), 0)` computes:
- a) The product
- b) The sum
- c) The maximum
- d) The average

**Answer:** b


### STL in Practice

### Q1. To deduplicate and sort a vector, the cleanest tool is:
- a) `std::sort` only
- b) `std::set`
- c) `std::list`
- d) `std::queue`

**Answer:** b — a set removes duplicates and keeps order.

### Q2. For O(1) average key lookup, use:
- a) `std::map`
- b) `std::vector`
- c) `std::unordered_map`
- d) `std::deque`

**Answer:** c

### Q3. `std::back_inserter(v)` is used to:
- a) Read from the back
- b) Append elements to `v` via an output iterator
- c) Reverse `v`
- d) Sort `v`

**Answer:** b

### Q4. The two-pointer pattern requires the array to be:
- a) Sorted
- b) A hash map
- c) Empty
- d) Linked

**Answer:** a

### Q5. Which is the idiomatic way to count word frequencies?
- a) Nested loops over a vector
- b) `std::unordered_map` with `++freq[word]`
- c) `std::set` only
- d) `std::sort` only

**Answer:** b


## Module 11 — Problem solving

### Problem-Solving Approaches

### Q1. The first step of the problem-solving method is:
- a) Write code
- b) Understand the problem
- c) Choose a language
- d) Optimize

**Answer:** b

### Q2. A greedy strategy:
- a) Tries all possibilities
- b) Makes the locally optimal choice at each step
- c) Always uses recursion
- d) Never works

**Answer:** b

### Q3. Pseudocode is useful because it:
- a) Runs faster than code
- b) Separates thinking from syntax
- c) Replaces the compiler
- d) Requires no logic

**Answer:** b

### Q4. Which strategy stores results of overlapping subproblems?
- a) Greedy
- b) Divide and conquer
- c) Dynamic programming
- d) Brute force

**Answer:** c

### Q5. Constraints (e.g. n ≤ 10⁵) matter because they:
- a) Are cosmetic
- b) Determine whether an algorithm's complexity is fast enough
- c) Only matter in interviews
- d) Are always wrong

**Answer:** b


### Common Patterns

### Q1. The two-pointer pattern typically requires the array to be:
- a) Sorted
- b) Empty
- c) A linked list
- d) Random

**Answer:** a

### Q2. A prefix sum array allows range-sum queries in:
- a) O(n)
- b) O(1)
- c) O(log n)
- d) O(n²)

**Answer:** b

### Q3. The sliding window pattern is used for:
- a) Sorted pairs
- b) Contiguous subarray/substring problems
- c) Graph traversal
- d) Hashing passwords

**Answer:** b

### Q4. A monotonic stack helps find:
- a) The sum of an array
- b) The next greater/smaller element
- c) The median
- d) Unique values

**Answer:** b

### Q5. Binary search on the answer works when:
- a) The array is random
- b) A `possible(mid)` check is monotonic
- c) The answer is a string
- d) Recursion is forbidden

**Answer:** b


### Complexity Analysis (Big-O)

### Q1. O(n) means the work grows:
- a) Exponentially with n
- b) Linearly with n
- c) Quadratically with n
- d) Not at all

**Answer:** b

### Q2. `for (int i = 0; i < n; i *= 2)` runs:
- a) O(n)
- b) O(log n)
- c) O(n log n)
- d) O(1)

**Answer:** b — i doubles (multiplicative), halving the remaining steps.

### Q3. Two nested loops over n each are:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** c

### Q4. Which is the largest growth rate?
- a) O(n log n)
- b) O(n²)
- c) O(2ⁿ)
- d) O(n!)

**Answer:** d — factorial grows fastest among these.

### Q5. Big-O notation is used to:
- a) Measure exact nanoseconds
- b) Describe growth as input size increases
- c) Count lines of code
- d) Debug memory leaks

**Answer:** b


### Debugging and Testing

### Q1. The first step in debugging is:
- a) Fix the bug
- b) Reproduce it reliably
- c) Rewrite the code
- d) Add comments

**Answer:** b

### Q2. `assert(cond)`:
- a) Always runs, even in release
- b) Aborts if `cond` is false (in debug builds)
- c) Prints a warning only
- d) Catches exceptions

**Answer:** b

### Q3. AddressSanitizer (`-fsanitize=address`) detects:
- a) Syntax errors
- b) Out-of-bounds access and use-after-free
- c) Slow code
- d) Missing comments

**Answer:** b

### Q4. Treating compiler warnings as errors helps because:
- a) It makes code slower
- b) Many bugs are already flagged by warnings
- c) Warnings are always wrong
- d) It removes all bugs

**Answer:** b

### Q5. The best bug fix targets:
- a) The symptom
- b) The root cause
- c) A random line
- d) The output format

**Answer:** b


### Competitive Programming Tips

### Q1. `std::ios::sync_with_stdio(false)` is used to:
- a) Disable output
- b) Speed up C++ stream I/O
- c) Enable threads
- d) Compress input

**Answer:** b

### Q2. For n = 10⁵, which complexity is generally too slow?
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** c

### Q3. To avoid overflow when multiplying two large `int`s, use:
- a) `float`
- b) `long long` (e.g. `1LL * a * b`)
- c) `short`
- d) `char`

**Answer:** b

### Q4. Which is faster for repeated line output?
- a) `std::cout << "\n";`
- b) `std::cout << std::endl;`
- c) They are identical
- d) `printf` is always slow

**Answer:** a — `endl` also flushes, which is costly.

### Q5. When an answer must be mod M, you should:
- a) Apply mod only at the end
- b) Apply mod after each operation to avoid overflow
- c) Never use mod
- d) Use a float

**Answer:** b


## Module 12 — Dsa prep

### Arrays and Strings in DSA

### Q1. Rotating an array by three reversals uses:
- a) O(n) time and O(n) space
- b) O(n) time and O(1) space
- c) O(n²) time and O(1) space
- d) O(1) time and O(n) space

**Answer:** b

### Q2. Kadane's algorithm finds:
- a) The longest subarray
- b) The maximum subarray sum
- c) The minimum element
- d) The median

**Answer:** b

### Q3. To check if a pair sums to a target in O(n), use:
- a) Nested loops
- b) A hash set of "seen" values
- c) `std::sort` only
- d) Recursion

**Answer:** b

### Q4. For a fixed small alphabet, counting characters is fastest with:
- a) A hash map
- b) An array of size 256
- c) A linked list
- d) Sorting the string

**Answer:** b

### Q5. In-place array algorithms are valued because they:
- a) Run slower
- b) Avoid allocating extra memory (O(1) space)
- c) Are always simpler
- d) Cannot have bugs

**Answer:** b


### Linked Lists

### Q1. A singly linked list node contains:
- a) Data and a previous pointer
- b) Data and a next pointer
- c) Two data fields
- d) An array

**Answer:** b

### Q2. What is the time to insert at the head of a singly linked list?
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** c

### Q3. Reversing a linked list iteratively uses:
- a) O(n) time, O(1) extra space
- b) O(n²) time
- c) O(n) extra space
- d) Sorting

**Answer:** a

### Q4. Floyd's cycle detection uses:
- a) A hash set
- b) Two pointers moving at different speeds
- c) Sorting the list
- d) Doubling the list

**Answer:** b

### Q5. Which operation is a linked list typically BETTER at than an array?
- a) Random access by index
- b) Insert/delete in the middle (given a pointer)
- c) Cache-friendly traversal
- d) Binary search

**Answer:** b


### Stacks and Queues

### Q1. A stack follows which order?
- a) FIFO
- b) LIFO
- c) Sorted
- d) Random

**Answer:** b

### Q2. `s.top()` returns:
- a) The oldest element
- b) The most recently pushed element (without removing it)
- c) The element and removes it
- d) The middle element

**Answer:** b

### Q3. Which is the classic stack application?
- a) Balanced brackets
- b) Sorting
- c) Hashing
- d) Binary search

**Answer:** a

### Q4. Breadth-first search uses a:
- a) Stack
- b) Queue
- c) Heap
- d) Set only

**Answer:** b

### Q5. A monotonic stack solves:
- a) Next greater/smaller element
- b) Random access
- c) String sorting
- d) Hash collisions

**Answer:** a


### Recursion and Backtracking

### Q1. The base case in recursion:
- a) Makes the problem bigger
- b) Stops the recursion
- c) Is optional
- d) Runs first every call

**Answer:** b

### Q2. Backtracking is:
- a) Choose → explore → un-choose
- b) Sort → search → return
- c) Push → pop → peek
- d) Divide → conquer → merge

**Answer:** a

### Q3. Without a base case, recursion causes:
- a) A compile error
- b) Stack overflow (infinite recursion)
- c) Slower but correct results
- d) Nothing

**Answer:** b

### Q4. Memoization converts many recursive solutions from exponential to:
- a) Logarithmic
- b) Polynomial
- c) Constant
- d) Factorial

**Answer:** b

### Q5. Pruning in backtracking means:
- a) Trying every option
- b) Skipping branches that can't lead to a solution
- c) Deleting the output
- d) Sorting first

**Answer:** b


### Sorting and Searching

### Q1. Merge sort's time complexity is:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(log n)

**Answer:** b

### Q2. Binary search requires the array to be:
- a) Empty
- b) Sorted
- c) Random
- d) A linked list

**Answer:** b

### Q3. `std::lower_bound(v, x)` returns an iterator to:
- a) The last element < x
- b) The first element >= x
- c) The first element > x
- d) The element == x only

**Answer:** b

### Q4. Quicksort's worst case is:
- a) O(n)
- b) O(n log n)
- c) O(n²)
- d) O(2ⁿ)

**Answer:** c

### Q5. Why use `lo + (hi - lo) / 2` instead of `(lo + hi) / 2`?
- a) It's faster
- b) It avoids integer overflow
- c) It's required syntax
- d) It sorts the array

**Answer:** b


## Module 13 — Trees

### Binary Trees

### Q1. A binary tree node has at most:
- a) One child
- b) Two children
- c) Three children
- d) No children

**Answer:** b

### Q2. Inorder traversal visits a node:
- a) Before its children
- b) Between its left and right subtrees
- c) After its children
- d) Only at the leaves

**Answer:** b — left → root → right.

### Q3. Level-order traversal uses:
- a) A stack
- b) A queue
- c) A priority queue
- d) Recursion only

**Answer:** b — BFS.

### Q4. The base case for most tree recursions is:
- a) The root
- b) `if (!n) return ...;`
- c) The leaves only
- d) A cycle check

**Answer:** b

### Q5. The height of a single-node tree (nodes convention) is:
- a) 0
- b) 1
- c) -1
- d) Undefined

**Answer:** b — one node is height 1 by the "count nodes" convention.


### Binary Search Trees (BST)

### Q1. In a BST, all values in the left subtree of a node are:
- a) Greater than the node
- b) Smaller than the node
- c) Equal to the node
- d) Random

**Answer:** b

### Q2. Inorder traversal of a BST produces:
- a) Random order
- b) Values in sorted order
- c) Reverse order
- d) Level order

**Answer:** b

### Q3. Search in a *balanced* BST is:
- a) O(n)
- b) O(log n)
- c) O(n log n)
- d) O(1)

**Answer:** b

### Q4. To delete a node with two children, you typically:
- a) Delete the whole subtree
- b) Replace it with its inorder successor's value
- c) Replace it with the root
- d) Leave it in place

**Answer:** b

### Q5. A BST that degenerates into a chain has operations of:
- a) O(log n)
- b) O(n)
- c) O(1)
- d) O(n log n)

**Answer:** b — this is why self-balancing trees exist.


### Tree Traversals

### Q1. Which traversal visits the root BEFORE its children?
- a) Inorder
- b) Postorder
- c) Preorder
- d) Level-order

**Answer:** c

### Q2. To delete a whole tree safely, use:
- a) Preorder
- b) Postorder (children first)
- c) Inorder
- d) Any order works identically

**Answer:** b

### Q3. Reconstructing a unique binary tree requires:
- a) Preorder only
- b) Inorder + (preorder or postorder)
- c) Level-order only
- d) Postorder only

**Answer:** b

### Q4. Serialization with `#` markers uses which traversal commonly?
- a) Preorder
- b) Inorder only
- c) Postorder only
- d) Random

**Answer:** a

### Q5. Level-order traversal is implemented with:
- a) A stack
- b) A queue
- c) A heap
- d) A hash map

**Answer:** b


### Heaps and Priority Queues

### Q1. `std::priority_queue` is by default a:
- a) Min-heap
- b) Max-heap
- c) FIFO queue
- d) Stack

**Answer:** b

### Q2. `push` and `pop` on a heap are:
- a) O(1)
- b) O(log n)
- c) O(n)
- d) O(n log n)

**Answer:** b

### Q3. In the array layout, the left child of index `i` is:
- a) `i + 1`
- b) `2*i + 1`
- c) `2*i + 2`
- d) `i / 2`

**Answer:** b

### Q4. To find the k LARGEST elements efficiently, use a:
- a) Max-heap of size n
- b) Min-heap of size k
- c) Stack
- d) Queue

**Answer:** b

### Q5. Which is guaranteed by a heap?
- a) The whole array is sorted
- b) The top element is the extreme (min or max)
- c) Every node has two children
- d) O(1) search by value

**Answer:** b


### Tries (Prefix Trees)

### Q1. Each node in a trie typically represents:
- a) A whole word
- b) A single character
- c) A sentence
- d) A byte count

**Answer:** b

### Q2. `search("ca")` on a trie containing "cat" returns:
- a) True, because the path exists
- b) False, because "ca" is not marked as a word end
- c) True, if the root is "ca"
- d) Undefined

**Answer:** b — search requires `isEnd`.

### Q3. The main advantage of a trie over a hash set is:
- a) Faster exact lookup
- b) Efficient prefix/startsWith queries
- c) Less memory always
- d) Built-in sorting

**Answer:** b

### Q4. A word's "end" in a trie is marked with:
- a) A null child
- b) A boolean flag (`isEnd`)
- c) A special root
- d) The string's length

**Answer:** b

### Q5. Insert and search in a trie are O(L) where L is:
- a) The number of words
- b) The length of the word
- c) The alphabet size
- d) The tree height

**Answer:** b


## Module 14 — Graphs

### Graph Representation

### Q1. An adjacency list uses space:
- a) O(V²)
- b) O(V + E)
- c) O(E²)
- d) O(1)

**Answer:** b

### Q2. Checking "is there an edge u→v?" is O(1) with:
- a) An adjacency list
- b) An edge list
- c) An adjacency matrix
- d) A stack

**Answer:** c

### Q3. For an undirected edge (u, v), you must add:
- a) Only `adj[u].push_back(v)`
- b) Both `adj[u].push_back(v)` and `adj[v].push_back(u)`
- c) Only the weight
- d) Nothing

**Answer:** b

### Q4. Kruskal's MST algorithm is most natural with:
- a) An adjacency matrix
- b) An edge list
- c) A binary tree
- d) A trie

**Answer:** b

### Q5. A weighted adjacency list stores each neighbour as:
- a) Just an index
- b) A `(to, weight)` pair
- c) A boolean
- d) A string

**Answer:** b


### Graph Traversal (BFS and DFS)

### Q1. BFS uses which data structure?
- a) Stack
- b) Queue
- c) Heap
- d) Trie

**Answer:** b

### Q2. In BFS, when should a vertex be marked visited?
- a) When dequeued
- b) When enqueued
- c) At the end
- d) Never

**Answer:** b

### Q3. BFS on an unweighted graph finds:
- a) The longest path
- b) The shortest path (in edges)
- c) A cycle
- d) The maximum degree

**Answer:** b

### Q4. In undirected cycle detection, you must ignore the edge back to:
- a) The root
- b) The parent vertex
- c) The smallest vertex
- d) A leaf

**Answer:** b

### Q5. DFS typically uses:
- a) A queue
- b) Recursion (or an explicit stack)
- c) A priority queue
- d) A hash set only

**Answer:** b


### Shortest Paths

### Q1. Dijkstra's algorithm requires:
- a) Negative weights
- b) Non-negative weights
- c) Unweighted edges
- d) A tree

**Answer:** b

### Q2. Dijkstra with a priority queue runs in:
- a) O(V·E)
- b) O((V + E) log V)
- c) O(V³)
- d) O(E²)

**Answer:** b

### Q3. Which algorithm handles negative edges (and detects negative cycles)?
- a) Dijkstra
- b) BFS
- c) Bellman-Ford
- d) Prim's

**Answer:** c

### Q4. Floyd-Warshall computes:
- a) Single-source shortest paths
- b) All-pairs shortest paths
- c) Minimum spanning tree
- d) Topological order

**Answer:** b

### Q5. In Dijkstra, a stale heap entry is skipped with:
- a) `if (d < dist[u]) continue;`
- b) `if (d > dist[u]) continue;`
- c) `if (d == 0) break;`
- d) No check is needed

**Answer:** b


### Minimum Spanning Tree

### Q1. A spanning tree of a connected graph with V vertices has:
- a) V edges
- b) V−1 edges
- c) V+1 edges
- d) E edges

**Answer:** b

### Q2. Kruskal's algorithm uses:
- a) A priority queue only
- b) Edge sorting + disjoint set union
- c) A stack
- d) Topological sort

**Answer:** b

### Q3. Prim's algorithm grows:
- a) Multiple trees at once
- b) One tree from a start vertex
- c) Only cycles
- d) The edge list

**Answer:** b

### Q4. An edge is skipped in Kruskal when its endpoints are:
- a) Both leaves
- b) Already in the same component
- c) Both unvisited
- d) The same weight

**Answer:** b

### Q5. The MST minimizes:
- a) The longest path
- b) The total edge weight connecting all vertices
- c) The number of edges
- d) The shortest path between two nodes

**Answer:** b


### Disjoint Set Union (Union-Find)

### Q1. Initially, in a DSU of size n, each element:
- a) Points to element 0
- b) Is its own parent (its own set)
- c) Points to null
- d) Has no parent

**Answer:** b

### Q2. Path compression makes `find`:
- a) O(n)
- b) Nearly O(1) amortized
- c) O(n²)
- d) Unusable

**Answer:** b

### Q3. Union by size attaches:
- a) The larger set under the smaller
- b) The smaller set under the larger
- c) Both at random
- d) The root under itself

**Answer:** b

### Q4. `unite(a, b)` returning `false` means:
- a) An error occurred
- b) `a` and `b` were already in the same set
- c) The sets merged
- d) `a` equals `b`

**Answer:** b

### Q5. The number of components after k successful unions starting from n is:
- a) n + k
- b) n − k
- c) k
- d) n

**Answer:** b


## Module 15 — Hashing advanced

### Hash Functions and Collisions

### Q1. A hash function maps a key to:
- a) A sorted position
- b) A fixed-size integer (hash value)
- c) A linked list
- d) A string

**Answer:** b

### Q2. A collision occurs when:
- a) The table is empty
- b) Two different keys hash to the same bucket
- c) A key is deleted
- d) The map is iterated

**Answer:** b

### Q3. Chaining resolves collisions by:
- a) Rehashing all keys
- b) Storing multiple keys in a bucket's list
- c) Deleting one key
- d) Sorting the table

**Answer:** b

### Q4. Average-case lookup in a hash table is:
- a) O(n)
- b) O(log n)
- c) O(1)
- d) O(n²)

**Answer:** c

### Q5. For two equal objects used as keys, their hashes must be:
- a) Different
- b) Equal
- c) Zero
- d) Unrelated

**Answer:** b — this is the `==`/hash contract.


### Greedy Algorithms

### Q1. A greedy algorithm:
- a) Tries all options
- b) Makes the locally optimal choice at each step
- c) Always backtracks
- d) Uses memoization

**Answer:** b

### Q2. Activity selection sorts intervals by:
- a) Start time
- b) End time
- c) Length
- d) Random

**Answer:** b

### Q3. Fractional knapsack works greedily because:
- a) Items are integers
- b) You can take fractions, so highest-ratio-first is optimal
- c) Weights are equal
- d) It never works greedily

**Answer:** b

### Q4. Greedy coin change with denominations {1, 3, 4} for amount 6:
- a) Gives the optimal answer
- b) Gives 4+1+1 (3 coins), but the optimum is 3+3 (2 coins)
- c) Cannot run
- d) Returns 0

**Answer:** b — the classic greedy failure.

### Q5. The "exchange argument" is used to:
- a) Debug code
- b) Prove a greedy choice can be part of an optimal solution
- c) Sort the input
- d) Measure complexity

**Answer:** b


### Dynamic Programming

### Q1. DP requires:
- a) Random subproblems
- b) Optimal substructure and overlapping subproblems
- c) A sorted input
- d) Greedy choices

**Answer:** b

### Q2. Memoization is:
- a) Bottom-up table filling
- b) Top-down caching of subproblem results
- c) Sorting the input
- d) Removing duplicates

**Answer:** b

### Q3. 0/1 knapsack solved by DP runs in:
- a) O(n)
- b) O(n·W)
- c) O(2ⁿ)
- d) O(W log n)

**Answer:** b

### Q4. The recurrence `dp[i] = dp[i-1] + dp[i-2]` (with base 1,1) computes:
- a) Factorials
- b) Fibonacci/climbing-stairs counts
- c) Coin change
- d) LCS

**Answer:** b

### Q5. A common DP space optimization is:
- a) Using a 3D array
- b) Keeping only the previous row(s)
- c) Sorting the table
- d) Using a linked list

**Answer:** b


### Two Pointers and Sliding Windows

### Q1. The opposite-ends two-pointer pattern typically requires a:
- a) Sorted array
- b) Hash map
- c) Linked list
- d) Heap

**Answer:** a

### Q2. A sliding window is useful for:
- a) Sorted pair sums
- b) Contiguous subarray/substring constraints
- c) Tree traversal
- d) Hashing passwords

**Answer:** b

### Q3. The shrink step in a variable window should be:
- a) `if` (shrink once)
- b) `while` (shrink until valid)
- c) Never
- d) `for` over all elements

**Answer:** b

### Q4. The overall complexity of a well-implemented sliding window is:
- a) O(n²)
- b) O(n)
- c) O(n log n)
- d) O(log n)

**Answer:** b

### Q5. For "at most k distinct characters," you also need:
- a) A hash map tracking counts inside the window
- b) A stack
- c) A priority queue
- d) Sorting

**Answer:** a


### Bit Manipulation

### Q1. `x & (x - 1)` clears:
- a) The highest set bit
- b) The lowest set bit
- c) All bits
- d) The sign bit

**Answer:** b

### Q2. `a ^ a` equals:
- a) a
- b) 1
- c) 0
- d) ~a

**Answer:** c

### Q3. A number that is a power of two has:
- a) All bits set
- b) Exactly one bit set
- c) Zero bits set
- d) Two bits set

**Answer:** b

### Q4. To set bit n of x, use:
- a) `x & (1 << n)`
- b) `x | (1 << n)`
- c) `x ^ (1 << n)`
- d) `x >> n`

**Answer:** b

### Q5. Enumerating subsets of n elements needs masks from:
- a) 0 to n
- b) 0 to `(1 << n) - 1`
- c) 0 to `1 << n`
- d) 1 to n

**Answer:** b


## Module 16 — Interview project

### Interview Preparation and Problem Walkthroughs

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


### Clean Code and Code Style

### Q1. A function name should typically be:
- a) A noun
- b) A verb (an action)
- c) A single letter
- d) A number

**Answer:** b

### Q2. Passing a read-only `std::vector` is best done with:
- a) by value
- b) `const std::vector<int>&`
- c) a raw pointer
- d) a copy

**Answer:** b

### Q3. A "magic number" is:
- a) A large number
- b) An unexplained literal constant in code
- c) A prime number
- d) A floating-point value

**Answer:** b

### Q4. A member function that doesn't modify the object should be marked:
- a) `static`
- b) `const`
- c) `mutable`
- d) `virtual`

**Answer:** b

### Q5. The main purpose of clean code is:
- a) Fewer lines at any cost
- b) Readability and maintainability
- c) Faster execution
- d) Smaller binaries

**Answer:** b


### Building a Complete Mini Project

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


### Common C++ Pitfalls and Gotchas

### Q1. Undefined behaviour means:
- a) A compile error
- b) The program's behaviour is unpredictable (anything may happen)
- c) A runtime exception
- d) A warning

**Answer:** b

### Q2. Returning a reference to a local variable produces:
- a) A copy
- b) A dangling reference
- c) `nullptr`
- d) A compile error always

**Answer:** b

### Q3. `Widget w();` declares:
- a) A default-constructed object
- b) A function named `w` returning a `Widget`
- c) A pointer
- d) Nothing

**Answer:** b — the most vexing parse.

### Q4. Signed integer overflow is:
- a) Wraparound like unsigned
- b) Undefined behaviour
- c) A compile error
- d) Always zero

**Answer:** b

### Q5. The Rule of Five applies to classes that:
- a) Are empty
- b) Manage a raw resource
- c) Only contain `int`s
- d) Are `final`

**Answer:** b


### Course Wrap-Up and Next Steps

### Q1. The most important post-course activity is:
- a) Reading more tutorials
- b) Consistent problem-solving and building
- c) Memorizing syntax
- d) Watching videos only

**Answer:** b

### Q2. The authoritative C++ reference is:
- a) A random forum
- b) cppreference.com
- c) Social media
- d) A single textbook

**Answer:** b

### Q3. A pattern journal helps you:
- a) Count lines of code
- b) Map problems to the patterns they use
- c) Store passwords
- d) Avoid writing code

**Answer:** b

### Q4. "Step 6 — AI review using official documentation" means:
- a) Ignoring documentation
- b) Verifying generated content against cppreference/Core Guidelines
- c) Deleting all code
- d) Trusting nothing

**Answer:** b

### Q5. Mastery comes primarily from:
- a) Passive reading
- b) Spaced practice and building
- c) Copying code
- d) Watching once

**Answer:** b


